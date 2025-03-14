"use client";
import ProfileDropdown from "./components/molecules/ProfileDropdown.tsx/ProfileDropdown";
import DatePicker from "./components/molecules/DatePicker/DatePicker";
import Leaderboard from "./components/atoms/LeaderBoard/LeaderBoard";
import { mockDaysData } from "./mock/mockData";
import useSelectedUserStore from "./store/selectedUser";
import customDateFormatter from "./components/utils/CustomDateFormatter";
import { useEffect, useState } from "react";
import HabitListComponent from "./components/molecules/HabitItem/HabitListComponent";
import { Users } from "./shared/Users";
import { remult } from "remult";
import AddHabit from "./components/atoms/AddHabit/AddHabit";
import { habitItems } from "./types/HabitConfig";

const entries = [
  { name: "Alice", points: 1200 },
  { name: "Bob", points: 950 },
  { name: "Charlie", points: 800 },
  { name: "Diana", points: 750 },
  { name: "Eve", points: 600 },
];

const usersRepo = remult.repo(Users);

export default function Home() {
  const { selectedUser } = useSelectedUserStore();
  const [habit, setHabit] = useState<string[] | null>(null);
  const [users, setUsers] = useState<Users[]>([]);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      usersRepo.find().then((users: Users[]) => setUsers(users));
    };
    fetchUsers();
  }, []);

  const fetchByDate = (date: Date | null) => {
    const foundHabit = mockDaysData.find(
      (day) => day.dateString === customDateFormatter(date)
    );
    setHabit(foundHabit?.value || null);
  };

  const profiles = [
    {
      name: "John Doe",
      photoUrl: "https://via.placeholder.com/150",
      points: 1234,
      onClick: () => alert("John Doe clicked!"),
    },
    {
      name: "Jane Smith",
      photoUrl: "https://via.placeholder.com/150",
      points: 5678,
      onClick: () => alert("Jane Smith clicked!"),
    },
    {
      name: "Alice Johnson",
      photoUrl: "https://via.placeholder.com/150",
      points: 9101,
      onClick: () => alert("Alice Johnson clicked!"),
    },
  ];

  return (
    <div>
      <ProfileDropdown profiles={users} />
      <AddHabit
        habitsList={habitItems}
        date={customDateFormatter(currentDate)}
      />
      {selectedUser && (
        <DatePicker
          value={null}
          onChange={function (date: Date | null): void {
            fetchByDate(date);
            setCurrentDate(date);
          }}
        />
      )}
      {selectedUser && (
        <HabitListComponent userDoneHabits={habit ? habit : []} />
      )}
      {!selectedUser && <Leaderboard entries={entries} />}
    </div>
  );
}
