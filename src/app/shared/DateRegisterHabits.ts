import { DateRegister } from "./DateRegister";
import { Entity, Fields, Relations } from "remult";
import { v4 as uuidv4 } from "uuid";
import { Habits } from "./Habits";

@Entity("date_register_habits", {
  allowApiCrud: true,
})
export class DateRegisterHabits {
  @Fields.uuid()
  id: string = uuidv4();
  @Fields.boolean()
  didIt: boolean = false;
  @Relations.toOne(() => Habits)
  habits?: Habits;
  @Relations.toOne(() => DateRegister)
  dateRegister?: DateRegister;
}
