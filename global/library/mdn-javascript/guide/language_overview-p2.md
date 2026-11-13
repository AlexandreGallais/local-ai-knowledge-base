---
title: "JavaScript language overview (part 2 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/language_overview/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# JavaScript language overview (part 2 of 3)

## Control structures

JavaScript has a similar set of control structures to other languages in the C family. Conditional statements are supported by `if` and `else`; you can chain them together:

```js
let name = "kittens";
if (name === "puppies") {
  name += " woof";
} else if (name === "kittens") {
  name += " meow";
} else {
  name += "!";
}
name === "kittens meow";
```

JavaScript doesn't have `elif`, and `else if` is really just an `else` branch comprised of a single `if` statement.

JavaScript has `while` loops and `do...while` loops. The first is good for basic <example-value>; the second is for loops where you wish to ensure that the body of the loop is executed at least once:

```js
while (true) {
  // an infinite loop!
}

let input;
do {
  input = get_input();
} while (inputIsNotValid(input));
```

JavaScript's `for` loop is the same as that in C and Java: it lets you provide the control information for your loop on a single line.

```js
for (let i = 0; i < 5; i++) {
  // Will execute 5 times
}
```

JavaScript also contains two other prominent for loops: `for...of`, which iterates over iterables, most notably arrays, and `for...in`, which visits all enumerable properties of an object.

```js
for (const value of array) {
  // do something with value
}

for (const property in object) {
  // do something with object property
}
```

The `switch` statement can be used for multiple branches based on equality checking.

```js
switch (action) {
  case "draw":
    drawIt();
    break;
  case "eat":
    eatIt();
    break;
  default:
    doNothing();
}
```

Similar to C, case clauses are conceptually the same as labels, so if you don't add a `break` statement, execution will "fall through" to the next level. However, they are not actually jump tables — any expression can be part of the `case` clause, not just string or number literals, and they would be evaluated one-by-one until one equals the value being matched. Comparison takes place between the two using the `===` operator.

Unlike some languages like Rust, control-flow structures are statements in JavaScript, meaning you can't assign them to a variable, like `const a = if (x) { 1 } else { 2 }`.

JavaScript errors are handled using the `try...catch` statement.

```js
try {
  buildMySite("./website");
} catch (e) {
  console.error("Building site failed:", e);
}
```

Errors can be thrown using the `throw` statement. Many built-in operations may throw as well.

```js
function buildMySite(siteDirectory) {
  if (!pathExists(siteDirectory)) {
    throw new Error("Site directory does not exist");
  }
}
```

In general, you can't tell the type of the error you just caught, because anything can be thrown from a `throw` statement. However, you can usually assume it's an `Error` instance, as is the example above. There are some subclasses of `Error` built-in, like `TypeError` and `RangeError`, that you can use to provide extra semantics about the error. There's no conditional catch in JavaScript — if you only want to handle one type of error, you need to catch everything, identify the type of error using `instanceof`, and then rethrow the other cases.

```js
try {
  buildMySite("./website");
} catch (e) {
  if (e instanceof RangeError) {
    console.error("Seems like a parameter is out of range:", e);
    console.log("Retrying...");
    buildMySite("./website");
  } else {
    // Don't know how to handle other error types; throw them so
    // something else up in the call stack may catch and handle it
    throw e;
  }
}
```

If an error is uncaught by any `try...catch` in the call stack, the program will exit.

For a comprehensive list of control flow statements, see the reference section.

## Objects

JavaScript objects can be thought of as collections of key-value pairs. As such, they are similar to:

- Dictionaries in Python.
- Hashes in Perl and Ruby.
- Hash tables in C and C++.
- HashMaps in Java.
- Associative arrays in PHP.

JavaScript objects are hashes. Unlike objects in statically typed languages, objects in JavaScript do not have fixed shapes — properties can be added, deleted, re-ordered, mutated, or dynamically queried at any time. Object keys are always strings or symbols — even array indices, which are canonically integers, are actually strings under the hood.

Objects are usually created using the literal syntax:

```js
const obj = {
  name: "Carrot",
  for: "Max",
  details: {
    color: "orange",
    size: 12,
  },
};
```

Object properties can be accessed using dot (`.`) or square brackets (`[]`). When using the dot notation, the key must be a valid identifier. Square brackets, on the other hand, allow indexing the object with a dynamic key value.

```js
// Dot notation
obj.name = "Simon";
const name = obj.name;

// Bracket notation
obj["name"] = "Simon";
const name = obj["name"];

// Can use a variable to define a key
const userName = prompt("what is your key?");
obj[userName] = prompt("what is its value?");
```

Property access can be chained together:

```js
obj.details.color; // orange
obj["details"]["size"]; // 12
```

Objects are always references, so unless something is explicitly copying the object, mutations to an object would be visible to the outside.

```js
const obj = {};
function doSomething(o) {
  o.x = 1;
}
doSomething(obj);
console.log(obj.x); // 1
```

This also means two separately created objects will never be equal (`!==`), because they are different references. If you hold two references of the same object, mutating one would be observable through the other.

```js
const me = {};
const stillMe = me;
me.x = 1;
console.log(stillMe.x); // 1
```

For more on objects and prototypes, see the `Object` reference page. For more information on the object initializer syntax, see its reference page.

This page has omitted all details about object prototypes and inheritance because you can usually achieve inheritance with classes without touching the underlying mechanism (which you may have heard to be abstruse). To learn about them, see Inheritance and the prototype chain.

## Arrays

Arrays in JavaScript are actually a special type of object. They work very much like regular objects (numerical properties can naturally be accessed only using `[]` syntax) but they have one magic property called `length`. This is always one more than the highest index in the array.

Arrays are usually created with array literals:

```js
const a = ["dog", "cat", "hen"];
a.length; // 3
```

JavaScript arrays are still objects — you can assign any properties to them, including arbitrary number indices. The only "magic" is that `length` will be automatically updated when you set a particular index.

```js
const a = ["dog", "cat", "hen"];
a[100] = "fox";
console.log(a.length); // 101
console.log(a); // ['dog', 'cat', 'hen', empty × 97, 'fox']
```

The array we got above is called a _sparse array_ because there are uninhabited slots in the middle, and will cause the engine to deoptimize it from an array to a hash table. Make sure your array is densely populated!

Out-of-bounds indexing doesn't throw. If you query a non-existent array index, you'll get a value of `undefined` in return:

```js
const a = ["dog", "cat", "hen"];
console.log(typeof a[90]); // undefined
```

Arrays can have any elements and can grow or shrink arbitrarily.

```js
const arr = [1, "foo", true];
arr.push({});
// arr = [1, "foo", true, {}]
```

Arrays can be iterated with the `for` loop, as you can in other C-like languages:

```js
for (let i = 0; i < a.length; i++) {
  // Do something with a[i]
}
```

Or, since arrays are iterable, you can use the `for...of` loop, which is synonymous to C++/Java's `for (int x : arr)` syntax:

```js
for (const currentValue of a) {
  // Do something with currentValue
}
```

Arrays come with a plethora of array methods. Many of them would iterate the array — for example, `map()` would apply a callback to every array element, and return a new array:

```js
const babies = ["dog", "cat", "hen"].map((name) => `baby ${name}`);
// babies = ['baby dog', 'baby cat', 'baby hen']
```
