---
title: "Grammar and types (part 2 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/grammar_and_types/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Grammar and types (part 2 of 3)

## Literals

_Literals_ represent values in JavaScript. These are fixed values—not variables—that you _literally_ provide in your script. This section describes the following types of literals:

- Array literals
- Boolean literals
- Numeric literals
- Object literals
- RegExp literals
- String literals

### Array literals

An array literal is a list of zero or more expressions, each of which represents an array element, enclosed in square brackets (`[]`). When you create an array using an array literal, it is initialized with the specified values as its elements, and its `length` is set to the number of arguments specified.

The following example creates the `coffees` array with three elements and a `length` of three:

```js
const coffees = ["French Roast", "Colombian", "Kona"];
```

An array literal creates a new array object every time the literal is evaluated. For example, an array defined with a literal in the global scope is created once when the script loads. However, if the array literal is inside a function, a new array is instantiated every time that function is called.

> **Note:**
> Array literals create `Array` objects. See `Array` and Indexed collections for details on `Array` objects.

#### Extra commas in array literals

If you put two commas in a row in an array literal, the array leaves an empty slot for the unspecified element. The following example creates the `fish` array:

```js
const fish = ["Lion", , "Angel"];
```

When you log this array, you will see:

```js
console.log(fish);
// [ 'Lion', <1 empty item>, 'Angel' ]
```

Note that the second item is "empty", which is not exactly the same as the actual `undefined` value. When using array-traversing methods like `Array.prototype.map`, empty slots are skipped. However, index-accessing `fish[1]` still returns `undefined`.

If you include a trailing comma at the end of the list of elements, the comma is ignored.

In the following example, the `length` of the array is three. There is no `myList[3]` and `myList[1]` is empty. All other commas in the list indicate a new element.

```js
const myList = ["home", , "school"];
```

In the following example, the `length` of the array is four, and `myList[0]` and `myList[2]` are missing.

```js
const myList = [, "home", , "school"];
```

In the following example, the `length` of the array is four, and `myList[1]` and `myList[3]` are missing. **Only the last comma is ignored.**

```js
const myList = ["home", , "school", ,];
```

> **Note:**
> Trailing commas help keep git diffs clean when you have a multi-line array, because appending an item to the end only adds one line, but does not modify the previous line.
>
> ```diff
> const myList = [
>   "home",
>   "school",
> + "hospital",
> ];
> ```

Understanding the behavior of extra commas is important to understanding JavaScript as a language.

However, when writing your own code, you should explicitly declare the missing elements as `undefined`, or at least insert a comment to highlight its absence. Doing this increases your code's clarity and maintainability.

```js
const myList = ["home", /* empty */, "school", /* empty */, ];
```

### Boolean literals

The Boolean type has two literal values: `true` and `false`.

> **Note:**
> Do not confuse the primitive Boolean values `true` and `false` with the true and false values of the `Boolean` object.
>
> The Boolean object is a wrapper around the primitive Boolean data type. See `Boolean` for more information.

### Numeric literals

JavaScript numeric literals include integer literals in different bases as well as floating-point literals in base-10.

Note that the language specification requires numeric literals to be unsigned. Nevertheless, code fragments like `-123.4` are fine, being interpreted as a unary `-` operator applied to the numeric literal `123.4`.

#### Integer literals

Integer and `BigInt` literals can be written in decimal (base 10), hexadecimal (base 16), octal (base 8) and binary (base 2).

- A _decimal_ integer literal is a sequence of digits without a leading `0` (zero).
- A leading `0` (zero) on an integer literal, or a leading `0o` (or `0O`) indicates it is in _octal_. Octal integer literals can include only the digits `0` – `7`.
- A leading `0x` (or `0X`) indicates a _hexadecimal_ integer literal. Hexadecimal integers can include digits (`0` – `9`) and the letters `a` – `f` and `A` – `F`. (The case of a character does not change its value. Therefore: `0xa` = `0xA` = `10` and `0xf` = `0xF` = `15`.)
- A leading `0b` (or `0B`) indicates a _binary_ integer literal. Binary integer literals can only include the digits `0` and `1`.
- A trailing `n` suffix on an integer literal indicates a `BigInt` literal. The `BigInt` literal can use any of the above bases. Note that leading-zero octal syntax like `0123n` is not allowed, but `0o123n` is fine.

Some examples of integer literals are:

```plain
0, 117, 123456789123456789n             (decimal, base 10)
015, 0001, 0o777777777777n              (octal, base 8)
0x1123, 0x00111, 0x123456789ABCDEFn     (hexadecimal, "hex" or base 16)
0b11, 0b0011, 0b11101001010101010101n   (binary, base 2)
```

For more information, see Numeric literals in the Lexical grammar reference.

#### Floating-point literals

A floating-point literal can have the following parts:

- An unsigned decimal integer,
- A decimal point (`.`),
- A fraction (another decimal number),
- An exponent.

The exponent part is an `e` or `E` followed by an integer, which can be signed (preceded by `+` or `-`). A floating-point literal must have at least one digit, and either a decimal point or `e` (or `E`).

More succinctly, the syntax is:

```plain
[digits].[digits][(E|e)[(+|-)]digits]
```

For example:

```js
3.1415926
.123456789
3.1E+12
.1e-23
```

### Object literals

An object literal is a list of zero or more pairs of property names and associated values of an object, enclosed in curly braces (`{}`).

> **Warning:**
> Do not use an object literal at the beginning of a statement! This will lead to an error (or not behave as you expect), because the `{` will be interpreted as the beginning of a block.

The following is an example of an object literal. The first element of the `car` object defines a property, `myCar`, and assigns to it a new string, `"Saturn"`; the second element, the `getCar` property, is immediately assigned the result of invoking the function `(carTypes("Honda"))`; the third element, the `special` property, uses an existing variable (`sales`).

```js
const sales = "Toyota";

function carTypes(name) {
  return name === "Honda" ? name : `Sorry, we don't sell ${name}.`;
}

const car = { myCar: "Saturn", getCar: carTypes("Honda"), special: sales };

console.log(car.myCar); // Saturn
console.log(car.getCar); // Honda
console.log(car.special); // Toyota
```

Additionally, you can use a numeric or string literal for the name of a property or nest an object inside another. The following example uses these options.

```js
const car = { manyCars: { a: "Saab", b: "Jeep" }, 7: "Mazda" };

console.log(car.manyCars.b); // Jeep
console.log(car[7]); // Mazda
```

Object property names can be any string, including the empty string. If the property name would not be a valid JavaScript identifier or number, it must be enclosed in quotes.

Property names that are not valid identifiers cannot be accessed as a dot (`.`) property.

```js
const unusualPropertyNames = {
  "": "An empty string",
  "!": "Bang!",
};
console.log(unusualPropertyNames.""); // SyntaxError: Unexpected string
console.log(unusualPropertyNames.!); // SyntaxError: Unexpected token !
```

Instead, they must be accessed with the bracket notation (`[]`).

```js
console.log(unusualPropertyNames[""]); // An empty string
console.log(unusualPropertyNames["!"]); // Bang!
```

#### Enhanced Object literals

Object literals support a range of shorthand syntaxes that include setting the prototype at construction, shorthand for `foo: foo` assignments, defining methods, making `super` calls, and computing property names with expressions.

Together, these also bring object literals and class declarations closer together, and allow object-based design to benefit from some of the same conveniences.

```js
const theProtoObj = {};
const handler = {};
const obj = {
  // __proto__
  __proto__: theProtoObj,
  // Shorthand for 'handler: handler'
  handler,
  // Methods
  toString() {
    // Super calls
    return `d ${super.toString()}`;
  },
  // Computed (dynamic) property names
  ["prop_" + (() => 42)()]: 42,
};
```

### RegExp literals

A regex literal (which is defined in detail later) is a pattern enclosed between slashes. The following is an example of a regex literal.

```js
const re = /ab+c/;
```
