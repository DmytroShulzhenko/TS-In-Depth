// ===============================================================================
// Task 08.01 Class Decorators (sealed)

import makeProperty from './functions';

export function sealed(param: string) {
    return function(target: Function): void {
        console.log(`Sealing the constructor ${param}`);

        Object.seal(target);                // static
        Object.seal(target.prototype);      // methods
        // Object.freeze();
        // Object.preventExtensions();

        // Object.keys();
        // Object.values();
        // Object.entries();
    };
}

// Task 08.02 Class Decorators that replace constructor functions (logger)
export function logger<TFunction extends Function>(target: TFunction): TFunction {
    const newConstructor: Function = function() {
        console.log('Creating new instance');
        console.log(target);

        this.age = 30;
    };

    newConstructor.prototype = Object.create(target.prototype);

    newConstructor.prototype.printLibrarian = function() {
        console.log(`Librarian name:  ${this.name}, Librarian age: ${this.age}`);
    };

    return newConstructor as TFunction;
}

// Task 08.03 Method Decorator (writable)
export function writable(isWritable: boolean) {
    // return function(target: Function | object, ): void {
    return function(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        console.log(`Decorator writable sets value isWritable: ${isWritable}`);

        descriptor.writable = isWritable;

        return descriptor;
    };
}

// Task 08.04 Method Decorator (timeout)
export function timeout(ms: number = 0) {
    return function(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]): void {
            if(window.confirm('Are you sure?')) {
                setTimeout(() => {
                    originalMethod.apply(this, args);
                }, ms);
            }
        };

        return descriptor;
    };
}

// Task 08.05 Parameter Decorator (logParameter)
export function logParameter(target: any, methodName: string, index: number): void {
    const key = `${methodName}_decor_params_indexes`;

    if(Array.isArray(target[key])) {
        target[key].push(index);
    } else {
        target[key] = [index];
    }
}

export function logMethod(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]): any {
        const key = `${methodName}_decor_params_indexes`;
        const indexes = target[key];

        if(Array.isArray(indexes)) {
            args.forEach((arg, index) => {
                if(indexes.includes(index)) {
                    console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`);
                }
            });
        }

        return originalMethod.apply(this, args);
    };

    return descriptor;
}

// Task 08.06 Property Decorator
export function format(pref: string = 'Mr./Mrs.') {
    return function(target: any, propertyName: string): void {
        makeProperty(target, propertyName, value => `${pref} ${value}`, value => value);
    };
}

// Task 08.07 Accessor Decorator
export function positiveInteger(target: any, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalSer = descriptor.set;

    descriptor.set  = function(value: number) {
        if(value < 1 || !Number.isInteger(value)) {
            throw new Error('Invalid value');
        }

        originalSer.call(this, value);
    };

    return descriptor;
}
