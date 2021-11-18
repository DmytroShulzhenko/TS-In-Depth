/* eslint-disable no-underscore-dangle */

// ===============================================================================
// Task 06.03 Default Export

import { ReferenceItem, ReferenceItemAbstract } from './reference-item';
import { positiveInteger } from '../decorators';

export default class Encyclopedia extends ReferenceItem {
    private _copies: number;

    constructor(title: string, year: number, id: number, public edition: number) {
        super(title, year, id);

        this.edition = edition;
    }

    get copies(): number {
        return this._copies;
    }

    @positiveInteger
    set copies(copies: number) {
        this._copies = copies;
    }

    printItem(): void {
        super.printItem();

        console.log(`Edition: ${this.edition} ${this.year}`);
    }
}

class EncyclopediaAbstract extends ReferenceItemAbstract {
    constructor(title: string, year: number, id: number, public edition: number) {
        super(title, year, id);

        this.edition = edition;
    }

    printItem(): void {
        super.printItem();

        console.log(`Edition: ${this.edition} ${this.year}`);
    }

    printCitation(): void {
        console.log(`${this.title} - ${this.year}`);
    }
}

export { EncyclopediaAbstract };
