---
title: "JavaScript language overview (part 1 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/language_overview/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# JavaScript language overview

JavaScript is a multi-paradigm, dynamic language with types and operators, standard built-in objects, and methods. Its syntax is based on the Java and C languages — many structures from those languages apply to JavaScript as well. JavaScript supports object-oriented programming with object prototypes and classes. It also supports functional programming since functions are first-class objects that can be easily created via expressions and passed around like any other object.

This page serves as a quick overview of various JavaScript language features, written for readers with background in other languages, such as C or Java.

## Data types

Let's start off by looking at the building blocks of any language: the types. JavaScript programs manipulate values, and those values all belong to a type. JavaScript offers seven _primitive types_:

- Number: used for all number values (integer and floating point) except for _very_ big integers.
- BigInt: used for arbitrarily large integers.
- String: used to store text.
- Boolean: `true` and `false` — usually used for conditional logic.
- Symbol: used for creating unique identifiers that won't collide.
- Undefined: indicating that a variable has not been assigned a value.
- Null: indicating a deliberate non-value.

Everything else is known as an Object. Common object types include:

- `Function`
- `Array`
- `Map`
- `RegExp`
- `Error`

Functions aren't special data structures in JavaScript — they are just a special type of object that can be called.

### Numbers

JavaScript has two built-in numeric types: Number and BigInt.

The Number type is an IEEE 754 64-bit double-precision floating point value, which means integers can be safely represented between -(253 − 1) and 253 − 1 without loss of precision, and floating point numbers can be stored all the way up to 1.79 × 10308. Within numbers, JavaScript does not distinguish between floating point numbers and integers.

```js
console.log(3 / 2); // 1.5, not 1
```

So an _apparent integer_ is in fact _implicitly a float_. Because of IEEE 754 encoding, sometimes floating point arithmetic can be imprecise.

```js
console.log(0.1 + 0.2); // 0.30000000000000004
```

For operations that expect integers, such as bitwise operations, the number will be converted to a 32-bit integer.

Number literals can also have prefixes to indicate the base (binary, octal, decimal, or hexadecimal), or an exponent suffix.

```js
console.log(0b111110111); // 503
console.log(0o767); // 503
console.log(0x1f7); // 503
console.log(5.03e2); // 503
```

The BigInt type is an arbitrary length integer. Its behavior is similar to C's integer types (e.g., division truncates to zero), except it can grow indefinitely. BigInts are specified with a number literal and an `n` suffix.

```js
console.log(-3n / 2n); // -1n
```

The standard arithmetic operators are supported, including addition, subtraction, remainder arithmetic, etc. BigInts and numbers cannot be mixed in arithmetic operations.

The `Math` object provides standard mathematical functions and constants.

```js
Math.sin(3.5);
const circumference = 2 * Math.PI * r;
```

There are three ways to convert a string to a number:

- `parseInt()`, which parses the string for an integer.
- `parseFloat()`, which parses the string for a floating-point number.
- The `Number()` function, which parses a string as if it's a number literal and supports many different number representations.

You can also use the unary plus `+` as a shorthand for `Number()`.

Number values also include `NaN` (short for "Not a Number") and `Infinity`. Many "invalid math" operations will return `NaN` — for example, if attempting to parse a non-numeric string, or using `Math.log()` on a negative value. Division by zero produces `Infinity` (positive or negative).

`NaN` is contagious: if you provide it as an operand to any mathematical operation, the result will also be `NaN`. `NaN` is the only value in JavaScript that's not equal to itself (per IEEE 754 specification).

### Strings

Strings in JavaScript are sequences of Unicode characters. This should be welcome news to anyone who has had to deal with internationalization. More accurately, they are UTF-16 encoded.

```js
console.log("Hello, world");
console.log("你好，世界！"); // Nearly all Unicode characters can be written literally in string literals
```

Strings can be written with either single or double quotes — JavaScript does not have the distinction between characters and strings. If you want to represent a single character, you just use a string consisting of that single character.

```js
console.log("Hello"[1] === "e"); // true
```

To find the length of a string (in code units), access its `length` property.

Strings have utility methods to manipulate the string and access information about the string. Because all primitives are immutable by design, these methods return new strings.

The `+` operator is overloaded for strings: when one of the operands is a string, it performs string concatenation instead of number addition. A special template literal syntax allows you to write strings with embedded expressions more succinctly. Unlike Python's f-strings or C#'s interpolated strings, template literals use backticks (not single or double quotes).

```js
const age = 25;
console.log("I am " + age + " years old."); // String concatenation
console.log(`I am ${age} years old.`); // Template literal
```

### Other types

JavaScript distinguishes between `null`, which indicates a deliberate non-value (and is only accessible through the `null` keyword), and `undefined`, which indicates absence of value. There are many ways to obtain `undefined`:

- A `return` statement with no value (`return;`) implicitly returns `undefined`.
- Accessing a nonexistent object property (`obj.iDontExist`) returns `undefined`.
- A variable declaration without initialization (`let x;`) will implicitly initialize the variable to `undefined`.

JavaScript has a Boolean type, with possible values `true` and `false` — both of which are keywords. Any value can be converted to a boolean according to the following rules:

1. `false`, `0`, empty strings (`""`), `NaN`, `null`, and `undefined` all become `false`.
2. All other values become `true`.

You can perform this conversion explicitly using the `Boolean()` function:

```js
Boolean(""); // false
Boolean(234); // true
```

However, this is rarely necessary, as JavaScript will silently perform this conversion when it expects a boolean, such as in an `if` statement (see Control structures). For this reason, we sometimes speak of "truthy" and "falsy", meaning values that become `true` and `false`, respectively, when used in boolean contexts.

Boolean operations such as `&&` (logical _and_), `||` (logical _or_), and `!` (logical _not_) are supported; see Operators.

The Symbol type is often used to create unique identifiers. Every symbol created with the `Symbol()` function is guaranteed to be unique. In addition, there are registered symbols, which are shared constants, and well-known symbols, which are utilized by the language as "protocols" for certain operations. You can read more about them in the symbol reference.

## Variables

Variables in JavaScript are declared using one of three keywords: `let`, `const`, or `var`.

`let` allows you to declare block-level variables. The declared variable is available from the _block_ it is enclosed in.

```js
let a;
let name = "Simon";

// myLetVariable is *not* visible out here

for (let myLetVariable = 0; myLetVariable < 5; myLetVariable++) {
  // myLetVariable is only visible in here
}

// myLetVariable is *not* visible out here
```

`const` allows you to declare variables whose values are never intended to change. The variable is available from the _block_ it is declared in.

```js
const Pi = 3.14; // Declare variable Pi
console.log(Pi); // 3.14
```

A variable declared with `const` cannot be reassigned.

```js
const Pi = 3.14;
Pi = 1; // will throw an error because you cannot change a constant variable.
```

`const` declarations only prevent _reassignments_ — they don't prevent _mutations_ of the variable's value, if it's an object.

```js
const obj = {};
obj.a = 1; // no error
console.log(obj); // { a: 1 }
```

`var` declarations can have surprising behaviors (for example, they are not block-scoped), and they are discouraged in modern JavaScript code.

If you declare a variable without assigning any value to it, its value is `undefined`. You can't declare a `const` variable without an initializer, because you can't change it later anyway.

`let` and `const` declared variables still occupy the entire scope they are defined in, and are in a region known as the temporal dead zone before the actual line of declaration. This has some interesting interactions with variable shadowing, which don't occur in other languages.

```js
function foo(x, condition) {
  if (condition) {
    console.log(x);
    const x = 2;
    console.log(x);
  }
}

foo(1, true);
```

In most other languages, this would log "1" and "2", because before the `const x = 2` line, `x` should still refer to the parameter `x` in the upper scope. In JavaScript, because each declaration occupies the entire scope, this would throw an error on the first `console.log`: "Cannot access 'x' before initialization". For more information, see the reference page of `let`.

JavaScript is _dynamically typed_. Types (as described in the previous section) are only associated with values, but not with variables. For `let`-declared variables, you can always change its type through reassignment.

```js
let a = 1;
a = "foo";
```

## Operators

JavaScript's numeric operators include `+`, `-`, `*`, `/`, `%` (remainder), and `**` (exponentiation). Values are assigned using `=`. Each binary operator also has a compound assignment counterpart such as `+=` and `-=`, which extend out to `x = x operator y`.

```js
x += 5;
x = x + 5;
```

You can use `++` and `--` to increment and decrement respectively. These can be used as a prefix or postfix operators.

The `+` operator also does string concatenation:

```js
"hello" + " world"; // "hello world"
```

If you add a string to a number (or other value) everything is converted into a string first. This might trip you up:

```js
"3" + 4 + 5; // "345"
3 + 4 + "5"; // "75"
```

Adding an empty string to something is a useful way of converting it to a string itself.

Comparisons in JavaScript can be made using `<`, `>`, `<=` and `>=`, which work for both strings and numbers. For equality, the double-equals operator performs type coercion if you give it different types, with sometimes interesting results. On the other hand, the triple-equals operator does not attempt type coercion, and is usually preferred.

```js
123 == "123"; // true
1 == true; // true

123 === "123"; // false
1 === true; // false
```

The double-equals and triple-equals also have their inequality counterparts: `!=` and `!==`.

JavaScript also has bitwise operators and logical operators. Notably, logical operators don't work with boolean values only — they work by the "truthiness" of the value.

```js
const a = 0 && "Hello"; // 0 because 0 is "falsy"
const b = "Hello" || "world"; // "Hello" because both "Hello" and "world" are "truthy"
```

The `&&` and `||` operators use short-circuit logic, which means whether they will execute their second operand is dependent on the first. This is useful for checking for null objects before accessing their attributes:

```js
const name = o && o.getName();
```

Or for caching values (when falsy values are invalid):

```js
const name = cachedName || (cachedName = getName());
```

For a comprehensive list of operators, see the guide page or reference section. You may be especially interested in the operator precedence.

## Grammar

JavaScript grammar is very similar to the C family. There are a few points worth mentioning:

- Identifiers can have Unicode characters, but they cannot be one of the reserved words.
- Comments are commonly `//` or `/* */`, while many other scripting languages like Perl, Python, and Bash use `#`.
- Semicolons are optional in JavaScript — the language automatically inserts them when needed. However, there are certain caveats to watch out for, since unlike Python, semicolons are still part of the syntax.

For an in-depth look at the JavaScript grammar, see the reference page for lexical grammar.
