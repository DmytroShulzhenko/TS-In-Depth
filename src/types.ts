// ===============================================================================
// Task 06.02 Export and Import

import { Author, Book, Person } from './interfaces';

import { createCustomer, getBooksByCategoryPromise } from './functions';

type BookProperties = keyof Book;

type PersonBook = Person & Book;

type BookOrUndefined = Book | undefined;

type BookRequiredFields = Required<Book>;

type UpdatedBook = Partial<Book>;

type AuthorWoEmail = Omit<Author, 'email'>;

// type CreateCustomerFunctionType = (name: string, age?: number, city?: string) => void;
// almost the same
type CreateCustomerFunctionType = typeof createCustomer;

// Task 09.02 Promises
type Unpromisify<T> = T extends Promise<infer R> ? R : never;

type FT = Unpromisify<ReturnType<typeof getBooksByCategoryPromise>>;

export {
    BookProperties,
    PersonBook,
    BookOrUndefined,
    BookRequiredFields,
    UpdatedBook,
    AuthorWoEmail,
    CreateCustomerFunctionType,
    Unpromisify,
    FT
};

// ===============================================================================
// Task 07.05 Conditional Types Utility Types
type fn = (p1: string, p2: number, p3: boolean) => symbol;

type Param1<T> = T extends (p1: infer R, p2: number, p3: boolean) => symbol ? R : never;
type Param2<T> = T extends (p1: string, p2: infer R, p3: boolean) => symbol ? R : never;
type Param3<T> = T extends (p1: string, p2: number, p3: infer R) => symbol ? R : never;

type P1 = Param1<fn>;
type P2 = Param2<fn>;
type P3 = Param3<fn>;

// ===============================================================================
// recursive type alias
type Json = string | number | boolean | { [property: string]: Json } | Json[];

// Writable<Type>
type Writable<Type> = {
    -readonly [K in keyof Type]: Type[K]
};

type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type LazyBook = Getters<Book>;
// result
/*
type LazyBook1 = {
    getId: () => Book['id'];
    getTitle: () => Book['title'];
    getAuthor: () => Book['author'];
    getAvailable: () => Book['available'];
    getCategory: () => Book['category'];
    getPages?: () => Book['pages'];
    getMarkDamaged?: () => Book['markDamaged'];
};
*/

type LazyBookReadonly = Readonly<LazyBook>;
// result
/*
type LazyBookReadonly1 = {
    readonly getId: () => Book['id'];
    readonly getTitle: () => Book['title'];
    readonly getAuthor: () => Book['author'];
    readonly getAvailable: () => Book['available'];
    readonly getCategory: () => Book['category'];
    readonly getPages?: () => Book['pages'];
    readonly getMarkDamaged?: () => Book['markDamaged'];
};
*/

type LazyBookPartial = Partial<LazyBook>;
// result
/*
type LazyBookPartial1 = {
    getId?: () => Book['id'];
    getTitle?: () => Book['title'];
    getAuthor?: () => Book['author'];
    getAvailable?: () => Book['available'];
    getCategory?: () => Book['category'];
    getPages?: () => Book['pages'];
    getMarkDamaged?: () => Book['markDamaged'];
};
*/

type LazyBookRequired = Required<LazyBook>;
// result
/*
type LazyBookRequired1 = {
    getId: () => Book['id'];
    getTitle: () => Book['title'];
    getAuthor: () => Book['author'];
    getAvailable: () => Book['available'];
    getCategory: () => Book['category'];
    getPages: () => Book['pages'];
    getMarkDamaged: () => Book['markDamaged'];
};
*/

type LazyBookReadonlyAndRequired = Readonly<Required<LazyBook>>;
// result
/*
type LazyBookReadonlyAndRequired1 = {
    readonly getId: () => Book['id'];
    readonly getTitle: () => Book['title'];
    readonly getAuthor: () => Book['author'];
    readonly getAvailable: () => Book['available'];
    readonly getCategory: () => Book['category'];
    readonly getPages: () => Book['pages'];
    readonly getMarkDamaged: () => Book['markDamaged'];
};
*/

type BookWithTitleAndAuthor = Pick<Book, 'title' | 'author'>;
// result
/*
type BookWithTitleAndAuthor1 = {
    title: string;
    author: string;
};
*/

type BookWithoutTitleAndCategoryAndMarkDamaged = Omit<Book, 'title' | 'category' | 'markDamaged'>;
// result
/*
type BookWithTitleAndCategory1 = {
    id: number;
    author: string;
    available: boolean;
    pages?: number;
};
*/
