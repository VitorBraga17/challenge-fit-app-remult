"use client";
import styles from "./page.module.css";
import ProfileDropdown from "./components/molecules/ProfileDropdown.tsx/ProfileDropdown";
import DatePicker from "./components/molecules/DatePicker/DatePicker";
import { Divider } from "@mui/material";
import HabitList from "./components/molecules/HabitItem/HabitItem";
import { habitItems } from "./types/HabitConfig";
import Leaderboard from "./components/atoms/LeaderBoard/LeaderBoard";
import { use, useEffect } from "react";
import useSelectedUserStore from "./store/selectedUser";

const entries = [
  { name: "Alice", points: 1200 },
  { name: "Bob", points: 950 },
  { name: "Charlie", points: 800 },
  { name: "Diana", points: 750 },
  { name: "Eve", points: 600 },
];

export default function Home() {
  const { selectedUser } = useSelectedUserStore();

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

  useEffect(() => {
    console.log("TODO: fetch data from API");
  }, []);

  return (
    <div>
      <h1>Selecione Seu Perfil</h1>
      <ProfileDropdown profiles={profiles} />
      <Divider />
      <DatePicker
        value={null}
        onChange={function (date: Date | null): void {
          console.log("TODO: handle date change", date);
        }}
      />
      {selectedUser && <HabitList habits={habitItems} />}
      {!selectedUser && <Leaderboard entries={entries} />}
    </div>
  );
}
