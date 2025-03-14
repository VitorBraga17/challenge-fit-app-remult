import { Entity, Fields } from "remult";



@Entity('habits', {
    allowApiCrud: true,
})
export class Habits {
    @Fields.string()
    name!: string;
    @Fields.integer()
    value!: number;
}