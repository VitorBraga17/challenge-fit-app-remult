import { Entity, Fields, Relations } from "remult";
import { v4 as uuidv4 } from 'uuid';
import { DateRegister } from "./DateRegister";
import { Users } from "./Users";


@Entity('day_points', {
    allowApiCrud: true,
})
export class DayPoints {
    @Fields.uuid()
    id : string = uuidv4();
    @Fields.boolean()
    points: number = 0; 
    @Relations.toOne(() => Users)
    user?: Users
    @Relations.toOne(() => DateRegister)
    dateRegister?: DateRegister
}