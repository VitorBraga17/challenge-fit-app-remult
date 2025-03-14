import { Entity, Fields } from "remult"
import { v4 as uuidv4 } from 'uuid';

@Entity('users', {
    allowApiCrud: true,
})
export class Users {
    @Fields.uuid()
    id : string = uuidv4() ;
    @Fields.string()
    name? : string;
    @Fields.string()
    photo? : string;
    @Fields.string()
    email? : string;
    @Fields.integer()
    points : number = 0;
}