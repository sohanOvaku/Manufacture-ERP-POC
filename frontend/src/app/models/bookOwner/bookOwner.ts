import { IBook } from "../book/book";
import { IOwner } from "../owner/owner";

export interface IBookOwner {
    id: number,
    book:IBook,
    owner:IOwner,
    royalty:number,
    isActive: boolean,
}