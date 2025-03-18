import { remultNextApp } from "remult/remult-next";
import { MongoClient } from "mongodb";
import { MongoDataProvider } from "remult/remult-mongo";
import { User } from "./shared/Users";
import { remult } from "remult";

const DATABASE_URL = process.env.NEXT_PUBLIC_MONGO_DB_URL!;
const DATABASE_NAME = process.env.NEXT_PUBLIC_MONGO_DB_SCHEMA;

const client = new MongoClient(DATABASE_URL);

export const api = remultNextApp({
  entities: [User],
  dataProvider: DATABASE_URL
    ? new MongoDataProvider(client.db(DATABASE_NAME), client)
    : undefined,
});