"use client";
import ProfileDropdown from "./components/molecules/ProfileDropdown.tsx/ProfileDropdown";
import DatePicker from "./components/molecules/DatePicker/DatePicker";
import Leaderboard from "./components/atoms/LeaderBoard/LeaderBoard";
import { mockDaysData } from "./mock/mockData";
import useSelectedUserStore from "./store/selectedUser";
import customDateFormatter from "./components/utils/CustomDateFormatter";
import { useEffect, useState } from "react";
import HabitListComponent, {
  HabitListProps,
} from "./components/molecules/HabitItem/HabitListComponent";
import { Users } from "./shared/Users";
import { remult } from "remult"; // eslint-disable-line
import AddHabit from "./components/atoms/AddHabit/AddHabit";
import { Habits } from "./shared/Habits";
import useSelectedChallengeHabitsStore from "./store/ChallengeHabits";
import { DateRegister } from "./shared/DateRegister";
import { DateRegisterHabits } from "./shared/DateRegisterHabits";

const entries = [
  { name: "Alice", points: 1200 },
  { name: "Bob", points: 950 },
  { name: "Charlie", points: 800 },
  { name: "Diana", points: 750 },
  { name: "Eve", points: 600 },
];

const usersRepo = remult.repo(Users);
const dateRegisterRepo = remult.repo(DateRegister);
const dateRegisterHabitsRepo = remult.repo(DateRegisterHabits);
const habitsRepo = remult.repo(Habits);

export default function Home() {
  const { selectedUser } = useSelectedUserStore();
  const { selectedChallengeHabits, setSelectedChallengeHabits } =
    useSelectedChallengeHabitsStore();
  const [users, setUsers] = useState<Users[]>([]);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [dateRegisterHabits, setDateRegisterHabits] = useState<
    DateRegisterHabits[]
  >([]);

  useEffect(() => {
    const fetchHabitsList = async () => {
      habitsRepo
        .find()
        .then((habits: Habits[]) => setSelectedChallengeHabits(habits));
    };
    fetchHabitsList();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      usersRepo.find().then((users: Users[]) => setUsers(users));
    };
    fetchUsers();
  }, []);

  const fetchByDate = async (date: Date | null) => {
    if (!date || !selectedUser) return;

    try {
      const dateString = customDateFormatter(date);
      const dateRegister = await dateRegisterRepo.find({
        where: {
          dateString,
          user: selectedUser,
        },
      });

      if (dateRegister.length > 0) {
        const habits = await dateRegisterHabitsRepo.find({
          where: { dateRegister: dateRegister[0] },
        });
        setDateRegisterHabits(habits);
      } else {
        setDateRegisterHabits([]);
      }
    } catch (error) {
      console.error("Error fetching habits by date:", error);
      setDateRegisterHabits([]);
    }
  };

  const transformHabitsToListFormat = () => {
    if (!selectedChallengeHabits) return [];

    return selectedChallengeHabits.map((habit) => {
      const isDone = dateRegisterHabits.some(
        (drh) => drh.habits?.name === habit.name && drh.didIt
      );

      const iconName =
        habit.icon
          .split("_")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join("") + "Icon";

      return {
        habitName: habit.name,
        done: isDone,
        icon: iconName,
      };
    });
  };

  async function saveNewHabit(habitsSaved: string[]) {
    if (!selectedUser || !currentDate) return;

    try {
      const dateRegister = await createDateRegister();
      await saveHabitsForDateRegister(habitsSaved, dateRegister);
    } catch (error) {
      console.error("Error saving new habits:", error);
    }
  }

  async function createDateRegister() {
    return await dateRegisterRepo.save({
      user: selectedUser!, //selectedUser is not null on line 63
      dateString: customDateFormatter(currentDate),
    });
  }

  async function saveHabitsForDateRegister(
    habitsSaved: string[],
    dateRegister: DateRegister
  ) {
    const habitPromises = habitsSaved.map((habit) => {
      const matchedHabit = selectedChallengeHabits?.find(
        (challengeHabit) => challengeHabit.name === habit
      );

      if (matchedHabit) {
        return dateRegisterHabitsRepo.save({
          didIt: true,
          dateRegister,
          habits: matchedHabit,
        });
      }
    });

    await Promise.all(habitPromises);
  }

  return (
    <div>
      <ProfileDropdown profiles={users} />
      {selectedUser && (
        <AddHabit
          habitsList={selectedChallengeHabits!}
          date={customDateFormatter(currentDate)}
          saveHabit={(habitsSaved) => {
            saveNewHabit(habitsSaved.map((habit) => habit.name));
          }}
        />
      )}
      {selectedUser && (
        <DatePicker
          value={currentDate}
          onChange={function (date: Date | null): void {
            setCurrentDate(date);
            fetchByDate(date);
          }}
        />
      )}
      {selectedUser && (
        <HabitListComponent userDoneHabits={transformHabitsToListFormat()} />
      )}
      {!selectedUser && <Leaderboard entries={entries} />}
    </div>
  );
}
