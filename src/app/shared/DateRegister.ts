import { Entity, Fields, Relations } from "remult";
import { Users } from "./Users";
import { v4 as uuidv4 } from "uuid";
import { DateRegisterHabits } from "./DateRegisterHabits";

@Entity("date_register", {
  allowApiCrud: true,
})
export class DateRegister {
  @Fields.uuid()
  id: string = uuidv4();
  @Relations.toOne(() => Users)
  user?: Users;
  @Fields.string()
  dateString!: string;

  // One-to-Many Relationship with DateRegisterHabits
  @Relations.toMany(() => DateRegisterHabits, {
    field: "dateRegister", // Reference field in DateRegisterHabits
  })
  habits!: DateRegisterHabits[];
}
