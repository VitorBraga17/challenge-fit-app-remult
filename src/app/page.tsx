"use client";
import { use, useEffect, useState } from "react";
import { remult } from "remult";
import { ActivityType, RegisterDay, User } from "./shared/Users";
import ProfileDropdown from "./components/molecules/ProfileDropdown.tsx/ProfileDropdown";
import AddHabit from "./components/atoms/AddHabit/AddHabit";
import DatePicker from "./components/molecules/DatePicker/DatePicker";
import useCurrentUserStore from "./store/currentUserStore";
import HabitListComponent from "./components/molecules/HabitItem/HabitListComponent";
import customDateFormatter from "./components/utils/CustomDateFormatter";
import Leaderboard, {
  LeaderboardEntry,
} from "./components/atoms/LeaderBoard/LeaderBoard";
import { habitItems } from "./types/IconNameMap";
import ErrorDialog from "./components/atoms/ErrorDialog/ErrorDialog";
import S3UploadButton from "./components/atoms/UploadButton/S3UploadButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getObjectFromS3 } from "./clients/s3Client";

//TODO -> contabilizar os pontos e somar para por no perfil do usuário
const usersRepo = remult.repo(User);

export default function Home() {
  const [users, setUsers] = useState<User[]>();
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date());
  const { currentUser, setCurrentUser } = useCurrentUserStore();
  const [registerDay, setRegisterDay] = useState<RegisterDay>();

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchUsersData = async () => {
    try {
      const fetchedUsers = await usersRepo.find();
      console.log("Fetched users:", fetchedUsers);
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const profileList = users?.map(({ id, name, photo, points }) => ({
    id,
    name,
    photo,
    points,
    setProfile: (id: string) => {
      const selectedUser = users?.find((user) => user.name === name);
      setCurrentUser(selectedUser!);
    },
  }));

  const leaderboardEntries: LeaderboardEntry[] | undefined = users?.map(
    ({ name, points, photo }) => ({
      name: name,
      points: points,
      avatarUrl: photo,
    })
  );

  useEffect(() => {
    fetchUsersData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setRegisterDay(findCurrentUserDate(currentDate));
    };
    fetchData();
  }, [currentUser]);

  useEffect(() => {
    setRegisterDay(findCurrentUserDate(currentDate));
  }, [currentDate]);

  function fetchByDate(date: Date | null) {
    setCurrentDate(date);
    setRegisterDay(findCurrentUserDate(currentDate));
  }

  function findCurrentUserDate(date: Date | null): RegisterDay | undefined {
    return (
      currentUser?.register_day.find(
        (item) => item.date === customDateFormatter(date!)
      ) || undefined
    );
  }

  function saveNewHabit(habitsForSaving: string[], pointsOfTheDay: number) {
    //console.log("Saving habits:", currentUser);
    if (currentUser) {
      if (
        !currentUser.register_day.find(
          (day) => day.date == customDateFormatter(currentDate)
        )
      ) {
        currentUser.points += pointsOfTheDay;
        currentUser.register_day.push({
          date: customDateFormatter(currentDate),
          activities: habitsForSaving as ActivityType[],
          pointsOfTheDay: pointsOfTheDay,
        });
        setRegisterDay(findCurrentUserDate(currentDate));
        //usersRepo.save(currentUser);
      } else {
        console.error("Date already exists in register_day");
        setErrorMessage("Não é possível alterar uma data já salva");
        setIsError(true);
      }
    } else {
      console.error("Cannot save: currentUser is null");
      setErrorMessage("Selecione um usuário antes de tentar cadastrar algo");
      setIsError(true);
    }
  }

  function setUserByLeaderBoard(name: string): void {
    setCurrentUser(users?.find((user) => user.name === name) || null);
  }

  function savePhotoToUser(fileName: string) {
    if (currentUser) {
      currentUser.photo = fileName;
      usersRepo.save(currentUser);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4 bg-gray-100">
      {currentUser && <S3UploadButton onUploadComplete={savePhotoToUser} />}
      {currentUser && (
        <div className="w-full max-w-2xl flex justify-start mb-4">
          <ArrowBackIcon
            onClick={() => setCurrentUser(null)}
            style={{
              cursor: "pointer",
              fontSize: "2.5rem",
              color: "#4A5568",
            }}
          />
        </div>
      )}
      <ErrorDialog
        open={isError}
        onClose={() => {
          setIsError(false);
          setErrorMessage("");
        }}
        message={errorMessage}
      />
      <div className="w-full max-w-2xl">
        <ProfileDropdown profileList={profileList || []} />
      </div>
      {currentUser && (
        <div className="w-full max-w-2xl mt-4 flex justify-between items-center">
          <AddHabit
            habitsList={habitItems || []}
            date={customDateFormatter(currentDate)}
            saveHabit={(habitsSaved, pointsOfTheDay) => {
              saveNewHabit(habitsSaved, pointsOfTheDay);
            }}
          />
          {currentUser && (
            <DatePicker
              value={currentDate}
              onChange={(date: Date | null) => {
                fetchByDate(date);
              }}
            />
          )}
        </div>
      )}
      {currentUser && (
        <div className="w-full max-w-2xl mt-4">
          <HabitListComponent habitsDone={registerDay?.activities} />
        </div>
      )}
      {!currentUser && (
        <div className="w-full max-w-2xl mt-4">
          <Leaderboard
            entries={leaderboardEntries || []}
            setUser={setUserByLeaderBoard}
          />
        </div>
      )}
    </div>
  );
}
