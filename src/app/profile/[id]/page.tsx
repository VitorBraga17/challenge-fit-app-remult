"use client";
import { use, useEffect, useState } from "react";
import { remult } from "remult";
import { ActivityType, RegisterDay, User } from "../../../shared/Users";
import AddHabit from "../../components/atoms/AddHabit/AddHabit";
import DatePicker from "../../components/molecules/DatePicker/DatePicker";
import HabitListComponent from "../../components/molecules/HabitItem/HabitListComponent";
import customDateFormatter from "../../components/utils/CustomDateFormatter";
import ErrorDialog from "../../components/atoms/ErrorDialog/ErrorDialog";
import BlobUploadButton from "../../components/atoms/UploadButton/BlobUploadButtons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { habitItems } from "../../types/IconNameMap";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const usersRepo = remult.repo(User);
export const dynamic = "force-dynamic";
export default function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date());
  const [registerDay, setRegisterDay] = useState<RegisterDay>();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        // First make sure remult is properly initialized
        if (!remult.apiClient.url) {
          remult.apiClient.url = "/api";
        }
        
        const users = await usersRepo.find({ 
          where: { id: id } 
        });
        
        if (users && users.length > 0) {
          setCurrentUser(users[0]);
        } else {
          setErrorMessage("Usuário não encontrado");
          setIsError(true);
          setTimeout(() => {
            router.push('/');
          }, 2000);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setErrorMessage("Erro ao carregar o perfil do usuário");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, router]);

  useEffect(() => {
    if (currentUser && currentDate) {
      setRegisterDay(findCurrentUserDate(currentDate));
    }
  }, [currentUser, currentDate]);

  function findCurrentUserDate(date: Date | null): RegisterDay | undefined {
    if (!currentUser || !date) return undefined;
    
    return currentUser.register_day.find(
      (item) => item.date === customDateFormatter(date)
    );
  }

  function fetchByDate(date: Date | null) {
    if (!date) return;
    
    setCurrentDate(date);
    setRegisterDay(findCurrentUserDate(date));
  }

  function saveNewHabit(habitsForSaving: string[], pointsOfTheDay: number) {
    if (!currentUser || !currentDate) {
      setErrorMessage("Usuário não encontrado ou data inválida");
      setIsError(true);
      return;
    }

    try {
      const formattedDate = customDateFormatter(currentDate);
      
      if (!currentUser.register_day.find(day => day.date === formattedDate)) {
        const updatedUser = { ...currentUser };
        updatedUser.points += pointsOfTheDay;
        updatedUser.register_day.push({
          date: formattedDate,
          activities: habitsForSaving as ActivityType[],
          pointsOfTheDay: pointsOfTheDay,
        });
        
        setCurrentUser(updatedUser);
        setRegisterDay(findCurrentUserDate(currentDate));
        
        // Save to database
        usersRepo.save(updatedUser)
          .catch(error => {
            console.error("Error saving habits:", error);
            setErrorMessage("Erro ao salvar os hábitos");
            setIsError(true);
          });
      } else {
        setErrorMessage("Não é possível alterar uma data já salva");
        setIsError(true);
      }
    } catch (error) {
      console.error("Error in saveNewHabit:", error);
      setErrorMessage("Erro ao salvar os hábitos");
      setIsError(true);
    }
  }

  function savePhotoToUser(fileName: string) {
    if (!currentUser) return;
    
    try {
      const updatedUser = { ...currentUser };
      updatedUser.photo = fileName;
      
      setCurrentUser(updatedUser);
      
      // Save to database
      usersRepo.save(updatedUser)
        .catch(error => {
          console.error("Error saving photo:", error);
          setErrorMessage("Erro ao salvar a foto");
          setIsError(true);
        });
    } catch (error) {
      console.error("Error in savePhotoToUser:", error);
      setErrorMessage("Erro ao salvar a foto");
      setIsError(true);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando perfil do usuário...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Usuário não encontrado</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4 bg-gray-100" >
      <ErrorDialog
        open={isError}
        onClose={() => {
          setIsError(false);
          setErrorMessage("");
        }}
        message={errorMessage}
      />
      
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="flex items-center">
            <ArrowBackIcon
              style={{
                cursor: "pointer",
                fontSize: "2.5rem",
                color: "#4A5568",
              }}
            />
            <span className="ml-2">Voltar para o Leaderboard</span>
          </Link>
          
          <BlobUploadButton onUploadComplete={savePhotoToUser} />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex items-center">
            {currentUser.photo && (
              <img 
                src={currentUser.photo} 
                alt={currentUser.name} 
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">{currentUser.name}</h1>
              <p className="text-gray-600">Pontos: {currentUser.points}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl mt-4 flex justify-between items-center">
        <AddHabit
          habitsList={habitItems || []}
          date={customDateFormatter(currentDate!)}
          saveHabit={(habitsSaved, pointsOfTheDay) => {
            saveNewHabit(habitsSaved, pointsOfTheDay);
          }}
        />
        <DatePicker
          value={currentDate}
          onChange={(date: Date | null) => {
            fetchByDate(date);
          }}
        />
      </div>

      <div className="w-full max-w-2xl mt-4">
        <HabitListComponent habitsDone={registerDay?.activities} />
      </div>
    </div>
  );
}