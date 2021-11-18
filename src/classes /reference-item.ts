/* eslint-disable no-underscore-dangle */

// ===============================================================================
// Task 06.04 Re-Export

import { timeout } from '../decorators';

class ReferenceItem {
    // title: string
    // year: number
    //
    // constructor(newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem...');
    //
    //     this.title = newTitle;
    //     this.year = newYear;
    // }

    private _publisher: string;
    readonly #id: number;
    static department: string = 'Classical Literature';

    constructor(public title: string, protected year: number, id: number) {
        console.log('Creating a new ReferenceItem...');

        this.#id = id;
    }

    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    @timeout(5000)
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department ${ReferenceItem.department}`);
    }

    getID(): number {
        return this.#id;
    }
}

abstract class ReferenceItemAbstract {
    private _publisher: string;
    readonly #id: number;
    static department: string = 'Classical Literature';

    constructor(public title: string, protected year: number, id: number) {
        console.log('Creating a new ReferenceItem...');

        this.#id = id;
    }

    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department ${ReferenceItem.department}`);
    }

    getID(): number {
        return this.#id;
    }

    abstract printCitation(): void;
}

export { ReferenceItem, ReferenceItemAbstract };
