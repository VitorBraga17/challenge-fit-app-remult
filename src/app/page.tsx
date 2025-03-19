"use client";
import { useEffect, useState } from "react";
import { remult } from "remult";
import { User } from "../shared/Users";
import Leaderboard, {
  LeaderboardEntry,
} from "./components/atoms/LeaderBoard/LeaderBoard";
import { useRouter } from "next/navigation";

const usersRepo = remult.repo(User);

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  const fetchUsersData = async () => {
    try {
      const fetchedUsers = await usersRepo.find();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const leaderboardEntries: LeaderboardEntry[] = users.map(
    ({ id, name, points, photo }) => ({
      id: id,
      name: name,
      points: points,
      avatarUrl: photo,
    })
  );

  function navigateToUserProfile(id: string): void {
    router.push(`profile/${id}`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Desafio São João 2025</h1>
      <div className="w-full max-w-2xl mt-4">
        <Leaderboard
          entries={leaderboardEntries}
          setUser={navigateToUserProfile}
        />
      </div>
    </div>
  );
}