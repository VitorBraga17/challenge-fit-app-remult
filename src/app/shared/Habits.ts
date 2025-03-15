import { Entity, Fields } from "remult";



@Entity("habits", {
  allowApiCrud: true,
})
export class Habits {
  @Fields.string()
  name!: string;
  @Fields.string()
  label!: string;
  @Fields.string()
  icon!: string;
  @Fields.integer()
  value!: number;
}