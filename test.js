// Testing out different array methods
function arrayMethods() {
    let manipStr = "Hello World!";
    // Array.from() - converts sets/maps into arrays
    let aFrom = Array.from(manipStr);
    console.log("Take a string and make it into an array: " + aFrom);

    // Array.of() - Creates an array of one value, rather than an array with that many values
    let aOf = Array.of(42);
    console.log("\nArray of just one number: " + aOf);

    // Array.prototype.entries() - An array of arrays, each child array representing the key and value
    let colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];
    let aEntries = colors.entries();

    console.log("\nArray.entries() gets the indicies and values of an array, and turns that into an array!")
    console.log(...aEntries); // Print all entries

    // Array.prototype.keys() - Creates an array of just the keys/indicies of an array
    let aKeys = colors.keys();
    console.log("\n Array.keys() gets the keys of an array");
    console.log(...aKeys); // Spread operator, another way to loop through an array
}

// Getting the nth number in the Fibonacci sequence
function getNthFibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return getNthFibonacci(n - 1) + getNthFibonacci(n - 2);
}

// Calculating Factorial of a number
function getFactorial(n) {
    if (n == 0) {
        return 1;
    }
    return n * getFactorial(n - 1);
}

arrayMethods();

let n = 4;
let result = getNthFibonacci(n);
console.log("\nFibonacci number " + n + " is " + result);

result = getFactorial(n);
console.log("\n" + n + "! equals " + result);