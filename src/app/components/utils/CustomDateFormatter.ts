import { formatDate } from "date-fns"

export default function customDateFormatter(date: Date | null) {
     return formatDate(date ? date: new Date(), "dd/MM/yyyy")
}