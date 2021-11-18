// ===============================================================================
// Task 06.05 Dynamic Import Expression

import { Book } from '../interfaces';

export const Reader =  class {
    name: string;
    books: Book[] = [];

    take(book: Book): void {
        // ??
        // this.books ?? (this.books = []).push(book);
        // short form
        // (this.books ??= []).push(book);
        this.books.push(book);
    }
};
