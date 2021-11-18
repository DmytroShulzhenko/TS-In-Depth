// ===============================================================================
// Task 06.02 Export and Import

import { Category } from './enums';

// type Book = {
//     id: number;
//     title: string;
//     category: Category;
//     author: string;
//     available: boolean;
// }
// the same
interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    // markDamaged?(reason: string): void;
    // the same
    // markDamaged?: (reason: string) => void;
    // the same
    markDamaged?: DamageLogger;
}

// type DamageLogger = (reason: string) => void;
// the same
interface DamageLogger {
    (reason: string): void;
}

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string) => void;
}

interface Magazine {
    title: string;
    publisher: string;
}

interface ShelfItem {
    title: string;
}

interface LibMgrCallback {
    (err: Error, titles: string[]): void;
}

interface CallBack<T> {
    (err: Error, data: T): void;
}

export {
    Book,
    DamageLogger as Logger,
    Person,
    Author,
    Librarian,
    Magazine,
    ShelfItem,
    LibMgrCallback,
    CallBack
};
