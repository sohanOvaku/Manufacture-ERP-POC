import { IAuthor } from "../auhtor/author";
import { IBook } from "../book/book";

export interface IBookAuthor {
    id: number,
    book:IBook,
    auhtor:IAuthor,
    isActive: boolean,
}