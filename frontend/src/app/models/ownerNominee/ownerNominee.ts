import { INominee } from "../nominee/nominee";
import { IOwner } from "../owner/owner";

export interface IBookAuthor {
    id: number,
    owner:IOwner,
    nominee:INominee,
    isActive: boolean,
}