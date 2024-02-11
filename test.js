// Testing out different array methods
function arrayMethods() {
    var manipStr = "Hello World!";
    // Array.from() - converts sets/maps into arrays
    let aFrom = Array.from(manipStr);
    console.log("Take a string and make it into an array: " + aFrom);

    // Array.of() - Creates an array of one value, rather than an array with that many values
    let aOf = Array.of(42);
    console.log("Array of just one number: " + aOf);


    // Array.prototype.entries() - An array of arrays, each child array representing the key and value
    var colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];
    var aEntries = colors.entries();

    console.log("Array.entries() gets the indicies and values of an array, and turns that into an array!")
    for (entry in aEntries) {
        console.log(entry);
    }

    // Array.prototype.keys() - Creates an array of just the keys/indicies of an array
    var aKeys = colors.keys();
    console.log(...aKeys); // Spread operator, another way to loop through an array

}

// Example 1 of recursion
function getNthFibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return getNthFibonacci(n - 1) + getNthFibonacci(n - 2);
}

// Example 2 of recursion
function getFactorial(n) {
    if (n == 0) {
        return 1;
    }
    return n * getFactorial(n - 1);
}

arrayMethods();

let n = 4;
let result = getNthFibonacci(n);
console.log("Fibonacci number " + n + " is " + result);

result = getFactorial(n);
console.log(n + "! equals " + result);