---
title: "JavaScript language overview (part 3 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/language_overview/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# JavaScript language overview (part 3 of 3)

## Functions

Along with objects, functions are the core component in understanding JavaScript. The most basic <example-value> declaration looks like this:

```js
function add(x, y) {
  const total = x + y;
  return total;
}
```

A JavaScript function can take 0 or more parameters. The function body can contain as many statements as you like and can declare its own variables which are local to that function. The `return` statement can be used to return a value at any time, terminating the function. If no return statement is used (or an empty return with no value), JavaScript returns `undefined`.

Functions can be called with more or fewer parameters than it specifies. If you call a function without passing the parameters it expects, they will be set to `undefined`. If you pass more parameters than it expects, the function will ignore the extra parameters.

```js
add(); // NaN
// Equivalent to add(undefined, undefined)

add(2, 3, 4); // 5
// added the first two; 4 was ignored
```

There are a number of other parameter syntaxes available. For example, the rest parameter syntax allows collecting all the extra parameters passed by the caller into an array, similar to Python's `*args`. (Since JS doesn't have named parameters on the language level, there's no `**kwargs`.)

```js
function avg(...args) {
  let sum = 0;
  for (const item of args) {
    sum += item;
  }
  return sum / args.length;
}

avg(2, 3, 4, 5); // 3.5
```

In the above code, the variable `args` holds all the values that were passed into the function.

The rest parameter will store all arguments _after_ where it's declared, but not before. In other words, `function avg(firstValue, ...args)` will store the first value passed into the function in the `firstValue` variable and the remaining arguments in `args`.

If a function accepts a list of arguments and you already hold them in an array, you can use the spread syntax in the function call to _spread_ the array as a list of elements. For instance: `avg(...numbers)`.

We mentioned that JavaScript doesn't have named parameters. It's possible, though, to implement them using object destructuring, which allows objects to be conveniently packed and unpacked.

```js
// Note the { } braces: this is destructuring an object
function area({ width, height }) {
  return width * height;
}

// The { } braces here create a new object
console.log(area({ width: 2, height: 3 }));
```

There's also the _default parameter_ syntax, which allows omitted parameters (or those passed as `undefined`) to have a default value.

```js
function avg(firstValue, secondValue, thirdValue = 0) {
  return (firstValue + secondValue + thirdValue) / 3;
}

avg(1, 2); // 1, instead of NaN
```

### Anonymous functions

JavaScript lets you create anonymous functions — that is, functions without names. In practice, anonymous functions are typically used as arguments to other functions, immediately assigned to a variable that can be used to invoke the function, or returned from another function.

```js
// Note that there's no function name before the parentheses
const avg = function (...args) {
  let sum = 0;
  for (const item of args) {
    sum += item;
  }
  return sum / args.length;
};
```

That makes the anonymous function invocable by calling `avg()` with some arguments — that is, it's semantically equivalent to declaring the function using the `function avg() {}` declaration syntax.

There's another way to define anonymous functions — using an arrow function expression.

```js
// Note that there's no function name before the parentheses
const avg = (...args) => {
  let sum = 0;
  for (const item of args) {
    sum += item;
  }
  return sum / args.length;
};

// You can omit the `return` when simply returning an expression
const sum = (a, b, c) => a + b + c;
```

Arrow functions are not semantically equivalent to function expressions — for more information, see its reference page.

There's another way that anonymous functions can be useful: it can be simultaneously declared and invoked in a single expression, called an Immediately invoked function expression (IIFE):

```js
(function () {
  // …
})();
```

For use-cases of IIFEs, you can read emulating private methods with closures.

### Recursive functions

JavaScript allows you to call functions recursively. This is particularly useful for dealing with tree structures, such as those found in the browser DOM.

```js
function countChars(elm) {
  if (elm.nodeType === 3) {
    // TEXT_NODE
    return elm.nodeValue.length;
  }
  let count = 0;
  for (let i = 0, child; (child = elm.childNodes[i]); i++) {
    count += countChars(child);
  }
  return count;
}
```

Function expressions can be named as well, which allows them to be recursive.

```js
const charsInBody = (function counter(elm) {
  if (elm.nodeType === 3) {
    // TEXT_NODE
    return elm.nodeValue.length;
  }
  let count = 0;
  for (let i = 0, child; (child = elm.childNodes[i]); i++) {
    count += counter(child);
  }
  return count;
})(document.body);
```

The name provided to a function expression as above is only available to the function's own scope. This allows more optimizations to be done by the engine and results in more readable code. The name also shows up in the debugger and some stack traces, which can save you time when debugging.

If you are used to functional programming, beware of the performance implications of recursion in JavaScript. Although the language specification specifies tail-call optimization, only JavaScriptCore (used by Safari) has implemented it, due to the difficulty of recovering stack traces and debuggability. For deep recursion, consider using iteration instead to avoid stack overflow.

### Functions are first-class objects

JavaScript functions are first-class objects. This means that they can be assigned to variables, passed as arguments to other functions, and returned from other functions. In addition, JavaScript supports closures out-of-the-box without explicit capturing, allowing you to conveniently apply functional programming styles.

```js
// Function returning function
const add = (x) => (y) => x + y;
// Function accepting function
const babies = ["dog", "cat", "hen"].map((name) => `baby ${name}`);
```

Note that JavaScript functions are themselves objects — like everything else in JavaScript — and you can add or change properties on them just like we've seen earlier in the Objects section.

### Inner functions

JavaScript function declarations are allowed inside other functions. An important detail of nested functions in JavaScript is that they can access variables in their parent function's scope:

```js
function parentFunc() {
  const a = 1;

  function nestedFunc() {
    const b = 4; // parentFunc can't use this
    return a + b;
  }
  return nestedFunc(); // 5
}
```

This provides a great deal of utility in writing more maintainable code. If a called function relies on one or two other functions that are not useful to any other part of your code, you can nest those utility functions inside it. This keeps the number of functions that are in the global scope down.

This is also a great counter to the lure of global variables. When writing complex code, it is often tempting to use global variables to share values between multiple functions, which leads to code that is hard to maintain. Nested functions can share variables in their parent, so you can use that mechanism to couple functions together without polluting your global namespace.

## Classes

JavaScript offers the class syntax that's very similar to languages like Java.

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    return `Hello, I'm ${this.name}!`;
  }
}

const p = new Person("Maria");
console.log(p.sayHello());
```

JavaScript classes are just functions that must be instantiated with the `new` operator. Every time a class is instantiated, it returns an object containing the methods and properties that the class specified. Classes don't enforce any code organization — for example, you can have functions returning classes, or you can have multiple classes per file. Here's an example of how ad hoc the creation of a class can be: it's just an expression returned from an arrow function. This pattern is called a mixin.

```js
const withAuthentication = (cls) =>
  class extends cls {
    authenticate() {
      // …
    }
  };

class Admin extends withAuthentication(Person) {
  // …
}
```

Static properties are created by prepending `static`. Private fields and methods are created by prepending a hash `#` (not `private`). The hash is an integral part of the element's name, and distinguishes it from a regular string-keyed property. (Think about `#` as `_` in Python.) Unlike most other languages, there's absolutely no way to read a private element outside the class body — not even in derived classes.

For a detailed guide on various class features, you can read the guide page.

## Asynchronous programming

JavaScript is single-threaded by nature. There's no paralleling; only concurrency. Asynchronous programming is powered by an event loop, which allows a set of tasks to be queued and polled for completion.

There are three idiomatic ways to write asynchronous code in JavaScript:

- Callback-based (such as `setTimeout()`)
- `Promise`-based
- `async`/`await`, which is a syntactic sugar for Promises

For example, here's what a file-read operation might look like in JavaScript:

```js
// Callback-based
fs.readFile(filename, (err, content) => {
  // This callback is invoked when the file is read, which could be after a while
  if (err) {
    throw err;
  }
  console.log(content);
});
// Code here will be executed while the file is waiting to be read

// Promise-based
fs.readFile(filename)
  .then((content) => {
    // What to do when the file is read
    console.log(content);
  })
  .catch((err) => {
    throw err;
  });
// Code here will be executed while the file is waiting to be read

// Async/await
async function readFile(filename) {
  const content = await fs.readFile(filename);
  console.log(content);
}
```

The core language doesn't specify any asynchronous programming features, but it's crucial when interacting with the external environment — from asking user permissions, to fetching data, to reading files. Keeping the potentially long-running operations async ensures that other processes can still run while this one waits — for example, the browser will not freeze while waiting for the user to click a button to grant permission.

If you have an async value, it's not possible to get its value synchronously. For example, if you have a promise, you can only access the eventual result via the `then()` method. Similarly, `await` can only be used in an async context, which is usually an async function or a module. Promises are _never blocking_ — only the logic depending on the promise's result will be deferred; everything else continues to execute in the meantime. If you are a functional programmer, you may recognize promises as monads which can be mapped with `then()` (however, they are not _proper_ monads because they auto-flatten; i.e., you can't have a `Promise<Promise<T>>`).

In fact, the single-threaded model has made Node.js a popular choice for server-side programming due to its non-blocking IO, making handling a large number of database or file-system requests very performant. However, CPU-bound (computationally intensive) tasks that are pure JavaScript will still block the main thread. To achieve real paralleling, you may need to use workers.

To learn more about asynchronous programming, you can read about using promises or follow the asynchronous JavaScript tutorial.

## Modules

JavaScript also specifies a module system supported by most runtimes. A module is usually a file, identified by its file path or URL. You can use the `import` and `export` statements to exchange data between modules:

```js
import { foo } from "./foo.js";

// Unexported variables are local to the module
const b = 2;

export const a = 1;
```

Unlike Haskell, Python, Java, etc., JavaScript module resolution is entirely host-defined — it's usually based on URLs or file paths, so relative file paths "just work" and are relative to the current module's path instead of some project root path.

However, the JavaScript language doesn't offer standard library modules — all core functionalities are powered by global variables like `Math` and `Intl` instead. This is due to the long history of JavaScript lacking a module system, and the fact that opting into the module system involves some changes to the runtime setup.

Different runtimes may use different module systems. For example, Node.js uses the package manager npm and is mostly file-system based, while Deno and browsers are fully URL-based and modules can be resolved from HTTP URLs.

For more information, see the modules guide page.

## Language and runtime

Throughout this page, we've constantly mentioned that certain features are _language-level_ while others are _runtime-level_.

JavaScript is a general-purpose scripting language. The core language specification focuses on pure computational logic. It doesn't deal with any input/output — in fact, without extra runtime-level APIs (most notably `console.log()`), a JavaScript program's behavior is entirely unobservable.

A runtime, or a host, is something that feeds data to the JavaScript engine (the interpreter), provides extra global properties, and provides hooks for the engine to interact with the outside world. Module resolution, reading data, printing messages, sending network requests, etc. are all runtime-level operations. Since its inception, JavaScript has been adopted in various environments, such as browsers (which provide APIs like DOM), Node.js (which provides APIs like file system access), etc. JavaScript has been successfully integrated in web (which was its primary purpose), mobile apps, desktop apps, server-side apps, serverless, embedded systems, and more. While you learn about JavaScript core features, it's also important to understand host-provided features in order to put the knowledge to use. For example, you can read about all web platform APIs, which are implemented by browsers, and sometimes non-browsers.

## Further exploration

This page offers a very basic <example-value> into how various JavaScript features compare with other languages. If you want to learn more about the language itself and the nuances of each feature, you can read the JavaScript guide and the JavaScript reference.

There are some essential parts of the language that we have omitted due to space and complexity, but you can explore on your own:

- Inheritance and the prototype chain
- Closures
- Regular expressions
- Iteration
