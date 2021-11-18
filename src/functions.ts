/* eslint-disable no-redeclare */

// ===============================================================================
// Task 06.02 Export and Import

import { Book, LibMgrCallback, CallBack } from './interfaces';
import { Category } from './enums';
import { BookOrUndefined, BookProperties, Unpromisify } from './types';

import RefBook from './classes /encyclopedia';

export function getAllBooks(): readonly Book[] {
    const books: readonly Book[] = <const>[
        {
            id: 1,
            title: 'Refactoring JavaScript',
            category: Category.JavaScript,
            author: 'Evan Burchard',
            available: true,
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            category: Category.JavaScript,
            author: 'Liang Yuxian Eugene',
            available: false,
        },
        {
            id: 3,
            title: 'CSS Secrets',
            category: Category.CSS,
            author: 'Lea Verou',
            available: true,
        },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            category: Category.JavaScript,
            author: 'Andrea Chiarelli',
            available: true,
        },
    ];

    return books;
}

export function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    const title = books.find(book => book.available === true)?.title;

    console.log(`Number of books: ${books.length}`);
    console.log(`First Available Book: ${title}`);
}

// function getBookTitlesByCategory(category: Category): string[] {  //  string[] == Array<string>
export function getBookTitlesByCategory(category: Category = Category.JavaScript): Array<string> {
    const books = getAllBooks();

    return books.filter(book => book.category === category).map(book => book.title);
}

export function logBookTitles(titles: string[]): void {
    titles.forEach(title => console.log(title));
}

export function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index];

    return [title, author];
}

export function calcTotalPages(): bigint {
    const data = <const>[
        {
            lib: 'libName1',
            books: 1_000_000_000, // 1_000_000_000 == 1000000000
            avgPagesPerBook: 250,
        },
        {
            lib: 'libName2',
            books: 5_000_000_000,
            avgPagesPerBook: 300,
        },
        {
            lib: 'libName3',
            books: 3_000_000_000,
            avgPagesPerBook: 280,
        },
    ];

    // 0n - BigInt literals
    // Error BigInt literals are not available when targeting lower than ES2020.
    // data.reduce((acc: bigint, obj) => acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook), 0n);

    return data.reduce((acc: bigint, obj) => acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook), BigInt(0));
}

export function createCustomerID(name: string, id: number): string {
    return `${id}-${name}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer Name: ${name}${age ? `, age: ${age}` : ''}${city ? `, city: ${city}` : ''}`);
    // or
    // console.log(`Customer Name: ${name}`);
    //
    // if(age) {
    //     console.log(`Customer Age: ${age}`);
    // }
    //
    // if(city) {
    //     console.log(`Customer city: ${city}`);
    // }
}

export function getBookByID1(id: number): object {
    const books: readonly object[] = getAllBooks();

    // ======== Type Assertion ========
    // return books.find((book: Book) => book.id === id);
    // almost the same
    // return books.find((book: {id: number}) => book.id === id);
    // almost the same
    // return books.find(book => (book as Book).id === id);
    // almost the same
    return books.find(book => (<Book>book).id === id);
}

export function getBookByID(id: number): BookOrUndefined {
    const books = getAllBooks();

    return books.find(book => book.id === id);
}

export function checkoutBooks1(customer: string, bookIds: number[]): string[] {
    console.log(`Customer Name: ${customer}`);

    return bookIds.filter(bookId => getBookByID(bookId).available).map(book => getBookByID(book).title);
}

export function checkoutBooks(customer: string, ...bookIds: number[]): string[] {
    console.log(`Customer Name: ${customer}`);

    // return bookIds.map(bookId => getBookByID(bookId)).filter(book => book.available ).map(book => book.title);
    // or
    return bookIds.filter(bookId => getBookByID(bookId).available).map(book => getBookByID(book).title);
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: any[]): string[] {
    const books = getAllBooks();
    let result: string[] = [];

    if (args.length === 1) {
        const [arg] = args;

        if (typeof arg === 'string') {
            result = books.filter(book => book.author === arg).map(book => book.title);
        } else if (typeof arg === 'boolean') {
            result = books.filter(book => book.available === arg).map(book => book.title);
        }
    } else if (args.length === 2) {
        const [id, available] = args;

        if (typeof id === 'number' && typeof available === 'boolean') {
            result = books.filter(book => book.id === id && book.available === available).map(book => book.title);
        }
    }

    return result;
}

export function assertStringValue1(condition: string): asserts condition {
    if (!condition) {
        throw new Error('value should have been a string');
    }
}

export function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should have been a string');
    }
}

export function bookTitleTransform(title: any): string {
    // assertStringValue1(bookName);
    assertStringValue(title);

    return [...title].reverse().join('');
}

export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

/*
export function getProperty(book: Book, prop: BookProperties): any {
    if(typeof book[prop] === 'function') {
        // return prop;
        return book[prop]['name'];
    }

    return book[prop];
}*/

// Task 07.03 Generic Constraints
export function getProperty<TObject, TKey extends keyof TObject>(obj: TObject, prop: TKey): TObject[TKey] | string {
    if (typeof obj[prop] === 'function') {
        // return prop;
        return obj[prop]['name'];
    }

    return obj[prop];
}

export function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) {
        throw new Error('It is not instance of RefBook');
    }
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);

    data.printItem();
}

// export function purge<T>(inventory: T[]): T[] {
// the same
export function purge<T>(inventory: Array<T>): Array<T> {
    return inventory.slice(2);
}

// Task 08.06 Property Decorator
export default function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer: (value: any) => T,
    setTransformer: (value: any) => T,
) {
    const values = new Map<any, T>();

    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if(getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if(setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true,
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true,
    });
}

// Task 09.01 Callback Functions
export function getBooksByCategory(category: Category, callback: LibMgrCallback ) {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);

            if(titles.length > 0) {
                callback(null, titles);
            } else {
                throw new Error('No books found.');
            }
        } catch (err) {
            callback(err, null);
        }
    }, 2000);
}

export function getBooksByCategoryGeneric(category: Category, callback: CallBack<string[]> ) {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);

            if(titles.length > 0) {
                callback(null, titles);
            } else {
                throw new Error('No books found.');
            }
        } catch (err) {
            callback(err, null);
        }
    }, 2000);
}

export function logCategorySearch(err: Error, titles: string[]): void {
    if(err) {
        console.log(err.message);
    } else {
        console.log(titles);
    }
}

// Task 09.02 Promises
export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitlesByCategory(category);

            if(titles.length > 0) {
                resolve(titles);
            } else {
                reject('No books found.');
            }
        }, 2000);
    });
}

// Task 09.03 Async Functions
export async function logSearchResults(category: Category): Promise<void> {
    // const titles: Unpromisify<ReturnType<typeof getBooksByCategoryPromise>>  = await getBooksByCategoryPromise(category);
    const titles1 = await getBooksByCategoryPromise(category);
    const titles2 = await getBooksByCategoryPromise(category);
    const titles3 = await Promise.all([getBooksByCategoryPromise(category), getBooksByCategoryPromise(category)]);

    console.log(titles1, titles2, titles3);
}
