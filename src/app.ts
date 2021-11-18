import { Category } from './enums';
import { Book, Logger, Person, Author, Librarian, Magazine } from './interfaces';
import {
    BookProperties,
    PersonBook,
    BookOrUndefined,
    BookRequiredFields,
    UpdatedBook,
    CreateCustomerFunctionType,
} from './types';
import { ReferenceItem, RefBook, UL, EncyclopediaAbstract, Shelf } from './classes ';
import {
    getAllBooks,
    logFirstAvailable,
    getBookTitlesByCategory,
    logBookTitles,
    getBookAuthorByIndex,
    calcTotalPages,
    createCustomerID,
    createCustomer,
    getBookByID,
    checkoutBooks1,
    checkoutBooks,
    getTitles,
    assertStringValue,
    bookTitleTransform,
    printBook,
    getProperty,
    printRefBook,
    purge,
    getBooksByCategory,
    logCategorySearch,
    getBooksByCategoryGeneric,
    getBooksByCategoryPromise,
    logSearchResults,
} from './functions';
import { logger } from './decorators';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// ===============================================================================
/*
let myTuple: [(string | number), (string | number)?]; // Tuple
let myTuple2: (string | number)[];

myTuple = [1, 'string'];
myTuple = [1];
myTuple = ['string'];
// myTuple = [1, 'sss', 1]; // Source has 3 element(s) but target allows only 2.

myTuple2 = [1, 2, 3, 'string'];

let myArray: Array<string | number> = [ 12,'string', 12]; // Array<string | number> == (string | number)[]
let myArray2: (string | number)[] = [ 12, 'string', 12];

myArray = [12, 12, 12, 'string'];
myArray2 = [12, 12, 12, 'string'];
*/
// ===============================================================================

// ===============================================================================
// Task 02.01 Types Basics

/*
logFirstAvailable(getAllBooks());
logBookTitles(getBookTitlesByCategory(Category.JavaScript));

const result = getBookAuthorByIndex(1);
console.log(result);

console.log(calcTotalPages());
*/

// ===============================================================================
// Task 02.02 Const Assertions

/*
// ======== Type Assertion ========
// ------ "angle-bracket" syntax ------
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;

// ------ as-syntax ------
let someValue2: any = 'this is a string';
let strLength2: number = (someValue2 as string).length;
*/

/*
// ======== Const Assertion ========
let x = "hello" as const;           // Type '"hello"'
let y = [10, 20] as const;          // Type 'readonly [10, 20]'
let z = { text: "hello" } as const; // Type '{ readonly text: "hello" }'
// the same
let x2 = <const>"hello";            // Type '"hello"'
let y2 = <const>[10, 20];           // Type 'readonly [10, 20]'
let z2 = <const>{ text: "hello" };  // Type '{ readonly text: "hello" }'

// Error, A 'const' assertions can only be applied to references to enum members, or string, number, boolean, array, or object literals.
// let a = (Math.random() < 0.5 ? 0 : 1) as const;
*/

// ===============================================================================
// Task 03.01 Function Type

/*
const myID: string = createCustomerID('Ann', 10);
console.log(myID);

const idGenerator1: (name: string, id: number) => string = createCustomerID;
// or
let idGenerator: (name: string, id: number) => string;
idGenerator = createCustomerID;
// the same
// idGenerator = (name: string, id: number) => `${id}-${name}`;

console.log(idGenerator('Boris', 2));
*/

// ===============================================================================
// Task 03.02 Optional, Default and Rest Parameters

/*
createCustomer('Oleg');
createCustomer('Boris', 23);
createCustomer('Ann', 20, 'Kiev');

console.log(getBookTitlesByCategory());

logFirstAvailable();

console.log(getBookByID(1));

const myBooks1 = checkoutBooks1('Ann', [1, 2, 4]);
const myBooks = checkoutBooks('Ann', 1, 2, 4);
const myBooks2 = checkoutBooks('Ann', ...[1, 2]);
console.log(myBooks);
console.log(myBooks2);
*/

// ===============================================================================
// Task 03.03 Function Overloading

/*
console.log(getTitles('Anna'));
console.log(getTitles(true));
console.log(getTitles(1, true));
// getTitles(1); // Error
// getTitles(1,true, 1); // Error

const checkedOutBooks = getTitles(false);
console.log(checkedOutBooks);
*/

// ===============================================================================
// Task 03.04 Assertion Functions

/*
console.log(bookTitleTransform('TypeScript'));
console.log(bookTitleTransform(100)); // Error
*/

// ===============================================================================
// Task 04.01 Defining an Interface

/*
const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 200,
    markDamaged: (reason: string) => console.log(`Damaged: ${reason}`)
};

printBook(myBook);
myBook.markDamaged('missing back cover');
*/

// ===============================================================================
// Task 04.02 Defining an Interface for Function Types

/*
// const logDamage: DamageLogger = (reason: string) => console.log(`Damaged: ${reason}`);
const logDamage: Logger = (reason: string) => console.log(`Damaged: ${reason}`);
logDamage('missing back cover');
*/

// ===============================================================================
// Task 04.03 Extending Interface

/*
const favoriteAuthor: Author = {
    name: 'Anna',
    email: 'anna@example.com',
    numBooksPublished: 4,
};

const favoriteLibrarian: Librarian = {
    name: 'Boris',
    email: 'boreis@example.com',
    department: 'Research Dep',
    assistCustomer: null,
};
*/

// ===============================================================================
// Task 04.04 Optional Chaining

/*
const offer: any = {
    book: {
        title: 'Essential TypeScript',
    },
};

console.log(offer.magazine);
console.log(offer.magazine?.getTitle());
console.log(offer.book.getTitle?.());
console.log(offer.book.authors?.[0]);
*/

// ===============================================================================
// Task 04.05 Keyof Operator

/*
console.log(getProperty(getAllBooks()[0], 'title'));
console.log(getProperty(getAllBooks()[0], 'markDamaged'));
// Error Argument of type '"isbn"' is not assignable to parameter of type 'keyof Book'.
// console.log(getProperty(getAllBooks()[0], 'isbn'));
*/

// ===============================================================================
// Task 05.01 Creating and Using Classes

/*
const ref: ReferenceItem = new ReferenceItem('TypeScript', 2021, 1);
ref.printItem();
ref.publisher = 'abc';

console.log(ref);
console.log(ref.publisher);
console.log(ref.getID());
*/

// ===============================================================================
// Task 05.02 Extending Classes

/*
// const refBook = new Encyclopedia('TypeScript', 2021, 2, 3);
const refBook = new RefBook('TypeScript', 2021, 2, 3);

console.log(refBook);
refBook.printItem();
console.log(Object.getPrototypeOf(refBook));
*/

// ===============================================================================
// Task 05.03 Creating Abstract Classes

/*
// Error: Cannot create an instance of an abstract class.
// const ref: ReferenceItemAbstract = new ReferenceItemAbstract('TypeScript', 2021, 1);

const refBook = new EncyclopediaAbstract('TypeScript', 2021, 2, 3);
refBook.printCitation();
*/

// ===============================================================================
// Task 05.04 Interfaces for Class Types

/*
const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
// the same
// const favoriteLibrarian = new UL.UniversityLibrarian();
// the same
// const favoriteLibrarian: Librarian & UniversityLibrarian = new UL.UniversityLibrarian();

favoriteLibrarian.name = 'Anna';
favoriteLibrarian.assistCustomer('Boris');
*/

// ===============================================================================
// Task 05.05 Intersection and Union Types

/*
const personBook: PersonBook = {
    author: 'Anna',
    available: false,
    category: Category.HTML,
    email: 'anna@example.com',
    id: 1,
    name: 'Anna',
    title: 'Unknown',
};

console.log(personBook);
*/

// ===============================================================================
// Task 06.03 Default Export

/*
const refBook = new RefBook('TypeScript', 2021, 2, 3);
printRefBook(refBook);

const uLibrarian = new UL.UniversityLibrarian();
printRefBook(uLibrarian);
*/

// ===============================================================================
// Task 06.05 Dynamic Import Expression

/*
const flag = true;

if(flag) {
    const modules = await import('./classes /index');
    const reader = new modules.Reader();

    reader.name = 'Anna';
    reader.take(getAllBooks()[0]);

    console.log(reader);
}

// promise
if(flag) {
    import('./classes /index').then(modules => {
        const reader = new modules.Reader();

        reader.name = 'Anna';
        reader.take(getAllBooks()[0]);

        console.log(reader);
    });
}
*/

// ===============================================================================
// Task 06.06 Type-Only Imports and Exports

/*
import type { Library } from './classes /library';

// const lib: Library = new Library();
const lib: Library = {
    id: 1,
    name: 'Anna',
    address: 'Kiev',
};
*/

// ===============================================================================
// Task 07.01 Generic Functions

/*
const inventory: Book[] = [
    {
        id: 10,
        title: 'The C Programming Language',
        author: 'K & R',
        available: true,
        category: Category.Software
    },
    {
        id: 11,
        title: 'Code Complete',
        author: 'Steve McConnell',
        available: true,
        category: Category.Software
    },
    {
        id: 12,
        title: '8-Bit Graphics with Cobol',
        author: 'A. B.',
        available: true,
        category: Category.Software
    },
    {
        id: 13,
        title: 'Cool autoexec.bat Scripts!',
        author: 'C. D.',
        available: true,
        category: Category.Software
    }
];
// const result = purge<Book>(inventory);

console.log(purge(inventory));
console.log(purge([1, 2, 3, 4, 5, 6, 7]));
*/

// ===============================================================================
// Task 07.02 Generic Interfaces and Classes

/*
const inventory: Book[] = [
    {
        id: 10,
        title: 'The C Programming Language',
        author: 'K & R',
        available: true,
        category: Category.Software
    },
    {
        id: 11,
        title: 'Code Complete',
        author: 'Steve McConnell',
        available: true,
        category: Category.Software
    },
    {
        id: 12,
        title: '8-Bit Graphics with Cobol',
        author: 'A. B.',
        available: true,
        category: Category.Software
    },
    {
        id: 13,
        title: 'Cool autoexec.bat Scripts!',
        author: 'C. D.',
        available: true,
        category: Category.Software
    }
];
const bookShelf = new Shelf<Book>();

inventory.forEach(book => bookShelf.add(book));

console.log(bookShelf.getFirst().title);

const magazines: Magazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];
const magazineShelf = new Shelf<Magazine>();

magazines.forEach(mag => magazineShelf.add(mag));

console.log(magazineShelf.getFirst().title);
*/

// ===============================================================================
// Task 07.03 Generic Constraints

/*
const magazines: Magazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];
const magazineShelf = new Shelf<Magazine>();

magazines.forEach(mag => magazineShelf.add(mag));

magazineShelf.printTitles();

console.log(magazineShelf.find('Five Points'));

console.log(getProperty(getAllBooks()[0], 'id'));
console.log(getProperty(magazines[0], 'publisher'));
*/

// ===============================================================================
// Task 07.04 Utility Types

/*
const bookRequiredFields: BookRequiredFields = {
    id: 1,
    title: 'Learn Angular',
    author: 'Anna',
    available: false,
    category: Category.Angular,
    pages: 404,
    markDamaged: null
};
const updatedBook: UpdatedBook = {
    id: 101
};

console.log(bookRequiredFields);
console.log(updatedBook);

const params: Parameters<CreateCustomerFunctionType> = ['Anna', 25];
// the same
const params2: Parameters<typeof createCustomer> = ['Anna', 30, 'Kiev'];

createCustomer(...params);
createCustomer(...params2);
*/

// ===============================================================================
// Task 08.01 Class Decorators (sealed)

/*
const uL = new UL.UniversityLibrarian();

console.log(uL);

// UL.UniversityLibrarian['a'] = 'A';
uL.assistCustomer = null;
uL.assistCustomer = function() {};

const pr = Object.getPrototypeOf(uL);

console.log(pr);

pr.assistCustomer = null;
// pr.assistCustomer2 = function() {};
*/

// ===============================================================================
// Task 08.02 Class Decorators that replace constructor functions (logger)

/*
const fLibrarian  = new UL.UniversityLibrarian();

console.log(fLibrarian );

fLibrarian.name = 'Anna';
fLibrarian['printLibrarian']();
*/

// ===============================================================================
// Task 08.03 Method Decorator (writable)

/*
const uL  = new UL.UniversityLibrarian();

uL.assistFaculty = null;
// uL.teachCommunity = null; // Error read only property
*/

// ===============================================================================
// Task 08.04 Method Decorator (timeout)

/*
const enc = new RefBook('TypeScript', 2021, 2, 3);
enc.printItem();
*/

// ===============================================================================
// Task 08.05 Parameter Decorator (logParameter)

/*
const uL  = new UL.UniversityLibrarian();

uL.name = 'Anna';
uL.assistCustomer('Boris');

console.log(uL);
*/

// ===============================================================================
// Task 08.06 Property Decorator

/*
const uL  = new UL.UniversityLibrarian();

uL.name = 'Anna';

console.log(uL.name);

uL.assistCustomer('Boris');

console.log(uL);
*/

// ===============================================================================
// Task 08.07 Accessor Decorator

/*
const enc = new RefBook('TypeScript', 2021, 2, 3);
// enc.copies = -10; // Error Invalid value
enc.copies = 10;

console.log(enc);
*/

// ===============================================================================
// Task 09.01 Callback Functions

/*
console.log('Begin');
getBooksByCategory(Category.JavaScript, logCategorySearch);
getBooksByCategory(Category.Software, logCategorySearch);
console.log('End');

console.log('Begin');
getBooksByCategoryGeneric(Category.CSS, logCategorySearch);
getBooksByCategoryGeneric(Category.Nodejs, logCategorySearch);
console.log('End');
*/

// ===============================================================================
// Task 09.02 Promises

/*
console.log('Begin');
getBooksByCategoryPromise(Category.JavaScript)
    .then((titles) => {
        console.log(titles);

        return titles.length;
    }).then((len) => {
        console.log(len);

        return Promise.resolve(len);
    }).then(len => {
        console.log(len);
    }).catch((err) => {
        console.log(err);
    });

getBooksByCategoryPromise(Category.Software)
    .then((titles) => {
        console.log(titles);
    }).catch((err) => {
        console.log(err);
    });
console.log('End');
*/

// ===============================================================================
// Task 09.03 Async Functions

/*
console.log('Begin');
logSearchResults(Category.JavaScript)
    .catch(err => console.log(err));
logSearchResults(Category.Software)
    .catch(err => console.log(err));
console.log('End');
*/
