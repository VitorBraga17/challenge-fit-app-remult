import { remultNextApp } from "remult/remult-next";
import { Users } from "./shared/Users";
import { Habits } from "./shared/Habits";
import { DateRegister } from "./shared/DateRegister";
import { DateRegisterHabits } from "./shared/DateRegisterHabits";
import { DayPoints } from "./shared/DayPoints";
import { SqlDatabase } from "remult";
import { TursoDataProvider } from "remult/remult-turso";
import { createClient } from "@libsql/client";

const DATABASE_URL = process.env.DATABASE_URL!;
const TOKEN = process.env.DATABASE_TOKEN;

if (!DATABASE_URL || !TOKEN) {
  console.error(
    "Missing DATABASE_URL or DATABASE_TOKEN in environment variables"
  );
  process.exit(1); // Exit if environment variables are missing
}

const client = createClient({
  url: DATABASE_URL,
  authToken: TOKEN,
});

console.log("Connecting to Turso database...");

export const api = remultNextApp({
  entities: [Users, Habits, DateRegister, DateRegisterHabits, DayPoints],
  dataProvider: new SqlDatabase(new TursoDataProvider(client)),
});

console.log("Remult API initialized with Turso database.");
