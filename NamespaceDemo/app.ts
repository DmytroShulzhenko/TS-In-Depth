// ===============================================================================
// Task 06.01 Using Namespaces

/// <reference path='./utility-functions.ts' />

import util = Utility.Fees;

const result = util.calculateLateFee(10);
const result2 = Utility.maxBooksAllowed(25);

console.log(result);
console.log(result2);
