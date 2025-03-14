import { Entity, Fields, Relations } from "remult";
import { Users } from "./Users";
import { v4 as uuidv4 } from 'uuid';


@Entity('date_register', {
    allowApiCrud: true,
})
export class DateRegister {
    @Fields.uuid()
    id : string = uuidv4() ;
    @Relations.toOne(() => Users)
    user?: Users
    @Fields.string()
    dateString!: string 
}