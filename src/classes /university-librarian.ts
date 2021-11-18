// ===============================================================================
// Task 06.04 Re-Export

import * as Interfaces from '../interfaces';
import { format, logger, logMethod, logParameter, sealed, writable } from '../decorators';

// @sealed('UniversityLibrarian')
// @logger
class UniversityLibrarian implements Interfaces.Librarian {
    @format() name: string;
    email: string;
    department: string;

    // @logMethod
    assistCustomer(/* @logParameter */ custName: string): void {
        console.log(`${this.name} is assisting ${custName}`);
    }

    /*
    // Error expected but not present
    assistCustomer(): void {
        console.log(`${this.name} is assisting `);
    }*/

    @writable(true)
    assistFaculty() {
        console.log('Assisting faculty');
    }

    @writable(false)
    teachCommunity() {
        console.log('Teaching community');
    }
}

export { UniversityLibrarian };
