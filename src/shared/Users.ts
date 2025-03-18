import { Entity, Fields } from "remult";

@Entity("users", { allowApiCrud: true })
export class User {
  @Fields.string()
  id: string;

  @Fields.string()
  name: string;

  @Fields.string()
  photo?: string | undefined;

  @Fields.number()
  points: number;

  @Fields.json()
  register_day: RegisterDay[];

  constructor(
    id: string,
    name: string,
    photo: string | undefined,
    points: number,
    register_day: RegisterDay[]
  ) {
    this.id = id;
    this.name = name;
    this.photo = photo;
    this.points = points;
    this.register_day = register_day;
  }
}

export interface RegisterDay {
  date: string;
  activities: ActivityType[];
  pointsOfTheDay: number;
}

export type ActivityType =
  | "treino"
  | "salada"
  | "fruta"
  | "agua"
  | "x9"
  | "alcool"
  | "besteira";
