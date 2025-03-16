import { remultNextApp } from "remult/remult-next";
import { MongoClient } from "mongodb";
import { MongoDataProvider } from "remult/remult-mongo";
import { User } from "./shared/Users";

const DATABASE_URL =
  "mongodb+srv://joaovitor1702:X9rKlJq8AadG8gsf@cluster0.nmxip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASE_NAME = "fitnessApp"; // Replace with your actual database name

const client = new MongoClient(DATABASE_URL);

export const api = remultNextApp({
  entities: [User],
  dataProvider: DATABASE_URL
    ? new MongoDataProvider(client.db(DATABASE_NAME), client)
    : undefined,
});