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

const usersRepo = remult.repo(User);

export default function Home() {
  const [users, setUsers] = useState<User[]>();
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date());
  const { currentUser, setCurrentUser } = useCurrentUserStore();
  const [registerDay, setRegisterDay] = useState<RegisterDay>();

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
    console.log("Current User:", currentUser);
    setRegisterDay(findCurrentUserDate(currentDate));
    console.log("current Date:", customDateFormatter(currentDate));
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

  function saveNewHabit(habitsForSaving: string[]) {
    console.log("Saving habits:", currentUser);
    if (currentUser) {
      if (
        currentUser.register_day.find(
          (day) => (day.date = customDateFormatter(currentDate))
        )
      ) {
        currentUser.register_day.push({
          date: customDateFormatter(currentDate),
          activities: habitsForSaving as ActivityType[],
        });
        console.log(currentUser);
        //usersRepo.save(currentUser);
      } else {
        console.error("Date already exists in register_day");
      }
    } else {
      console.error("Cannot save: currentUser is null");
    }
  }

  return (
    <div>
      <ProfileDropdown profileList={profileList || []} />
      {currentUser && (
        <AddHabit
          habitsList={habitItems || []}
          date={customDateFormatter(currentDate)}
          saveHabit={(habitsSaved) => {
            saveNewHabit(habitsSaved);
          }}
        />
      )}
      {currentUser && (
        <DatePicker
          value={currentDate}
          onChange={function (date: Date | null): void {
            fetchByDate(date);
          }}
        />
      )}
      {currentUser && (
        <HabitListComponent habitsDone={registerDay?.activities} />
      )}
      {!currentUser && <Leaderboard entries={leaderboardEntries || []} />}
    </div>
  );
}
