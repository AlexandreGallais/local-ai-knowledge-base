---
title: "JSDoc Reference (part 1 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/javascript/JSDoc Reference.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# JSDoc Reference

The list below outlines which constructs are currently supported
when using JSDoc annotations to provide type information in JavaScript files.

Note:
- Any tags which are not explicitly listed below (such as `@async`) are not yet supported.
- Only documentation tags are supported in TypeScript files. The rest of the tags are only supported in JavaScript files.

## Types

- `@type`
- `@import`
- `@param` (or `@arg` or `@argument`)
- `@returns` (or `@return`)
- `@typedef`
- `@callback`
- `@template`
- `@satisfies`

## Classes

- Property Modifiers `@public`, `@private`, `@protected`, `@readonly`
- `@override`
- `@extends` (or `@augments`)
- `@implements`
- `@class` (or `@constructor`)
- `@this`

## Documentation

Documentation tags work in both TypeScript and JavaScript.

- `@deprecated`
- `@see`
- `@link`

## Other

- `@enum`
- `@author`
- Other supported patterns
- Unsupported patterns
- Unsupported tags

The meaning is usually the same, or a superset, of the meaning of the tag given at jsdoc.app.
The code below describes the differences and gives some example usage of each tag.

**Note:** You can use the playground to explore JSDoc support.

## Types

### `@type`

You can reference types with the "@type" tag. The type can be:

1. Primitive, like `string` or `number`.
2. Declared in a TypeScript declaration, either global or imported.
3. Declared in a JSDoc `@typedef` tag.

You can use most JSDoc type syntax and any TypeScript syntax, from the most basic like `string` to the most advanced, like conditional types.

```js
/**
 * @type {string}
 */
var s;

/** @type {Window} */
var win;

/** @type {PromiseLike<string>} */
var promisedString;

// You can specify an HTML Element with DOM properties
/** @type {HTMLElement} */
var myElement = document.querySelector(selector);
element.dataset.myData = "";
```

`@type` can specify a union type — for example, something can be either a string or a boolean.

```js
/**
 * @type {string | boolean}
 */
var sb;
```

You can specify array types using a variety of syntaxes:

```js
/** @type {number[]} */
var ns;
/** @type {Array.<number>} */
var jsdoc;
/** @type {Array<number>} */
var nas;
```

You can also specify object literal types.
For example, an object with properties 'a' (string) and 'b' (number) uses the following syntax:

```js
/** @type {{ a: string, b: number }} */
var var9;
```

You can specify map-like and array-like objects using string and number index signatures, using either standard JSDoc syntax or TypeScript syntax.

```js
/**
 * A map-like object that maps arbitrary `string` properties to `number`s.
 *
 * @type {Object.<string, number>}
 */
var stringToNumber;

/** @type {Object.<number, object>} */
var arrayLike;
```

The preceding two types are equivalent to the TypeScript types `{ [x: string]: number }` and `{ [x: number]: any }`. The compiler understands both syntaxes.

You can specify function types using either TypeScript or Google Closure syntax:

```js
/** @type {function(string, boolean): number} Closure syntax */
var sbn;
/** @type {(s: string, b: boolean) => number} TypeScript syntax */
var sbn2;
```

Or you can just use the unspecified `Function` type:

```js
/** @type {Function} */
var fn7;
/** @type {function} */
var fn6;
```

Other types from Closure also work:

```js
/**
 * @type {*} - can be 'any' type
 */
var star;
/**
 * @type {?} - unknown type (same as 'any')
 */
var question;
```

#### Casts

TypeScript borrows cast syntax from Google Closure.
This lets you cast types to other types by adding a `@type` tag before any parenthesized expression.

```js
/**
 * @type {number | string}
 */
var numberOrString = Math.random() < 0.5 ? "hello" : 100;
var typeAssertedNumber = /** @type {number} */ (numberOrString);
```

You can even cast to `const` just like TypeScript:

```js
let one = /** @type {const} */(1);
```

#### Import types

You can import declarations from other files using import types.
This syntax is TypeScript-specific and differs from the JSDoc standard:

```js
export type Pet = {
  name: string,
};

/**
 * @param {import("./types").Pet} p
 */
function walk(p) {
  console.log(`Walking ${p.name}...`);
}
```

import types can be used to get the type of a value from a module if you don't know the type, or if it has a large type that is annoying to type:

```js
export const userAccount = {
  name: "Name",
  address: "An address",
  postalCode: "",
  country: "",
  planet: "",
  system: "",
  galaxy: "",
  universe: "",
};
/**
 * @type {typeof import("./accounts").userAccount}
 */
var x = require("./accounts").userAccount;
```

### `@import`

The `@import` tag can let us reference exports from other files.

```js
export type Pet = {
  name: string,
};
/**
 * @import {Pet} from "./types"
 */

/**
 * @type {Pet}
 */
var myPet;
myPet.name;
```

These tags don't actually import files at runtime, and the symbols they bring into scope can only be used within JSDoc comments for type-checking.

```js
export class Dog {
  woof() {
    console.log("Woof!");
  }
}

/** @import { Dog } from "./dog.js" */

const d = new Dog(); // error!
```

### `@param` and `@returns`

`@param` uses the same type syntax as `@type`, but adds a parameter name.
The parameter may also be declared optional by surrounding the name with square brackets:

```js
// Parameters may be declared in a variety of syntactic forms
/**
 * @param {string}  p1 - A string param.
 * @param {string=} p2 - An optional param (Google Closure syntax)
 * @param {string} [p3] - Another optional param (JSDoc syntax).
 * @param {string} [p4="test"] - An optional param with a default value
 * @returns {string} This is the result
 */
function stringsStringStrings(p1, p2, p3, p4) {
  // TODO
}
```

Likewise, for the return type of a function:

```js
/**
 * @return {PromiseLike<string>}
 */
function ps() {}

/**
 * @returns {{ a: string, b: number }} - May use '@returns' as well as '@return'
 */
function ab() {}
```

### `@typedef`, `@callback`, and `@param`

You can define complex types with `@typedef`.
Similar syntax works with `@param`.

```js
/**
 * @typedef {Object} SpecialType - creates a new type named 'SpecialType'
 * @property {string} prop1 - a string property of SpecialType
 * @property {number} prop2 - a number property of SpecialType
 * @property {number=} prop3 - an optional number property of SpecialType
 * @prop {number} [prop4] - an optional number property of SpecialType
 * @prop {number} [prop5=42] - an optional number property of SpecialType with default
 */

/** @type {SpecialType} */
var specialTypeObject;
specialTypeObject.prop3;
```

You can use either `object` or `Object` on the first line.

```js
/**
 * @typedef {object} SpecialType1 - creates a new type named 'SpecialType1'
 * @property {string} prop1 - a string property of SpecialType1
 * @property {number} prop2 - a number property of SpecialType1
 * @property {number=} prop3 - an optional number property of SpecialType1
 */

/** @type {SpecialType1} */
var specialTypeObject1;
```

`@param` allows a similar syntax for one-off type specifications.
Note that the nested property names must be prefixed with the name of the parameter:

```js
/**
 * @param {Object} options - The shape is the same as SpecialType above
 * @param {string} options.prop1
 * @param {number} options.prop2
 * @param {number=} options.prop3
 * @param {number} [options.prop4]
 * @param {number} [options.prop5=42]
 */
function special(options) {
  return (options.prop4 || 1001) + options.prop5;
}
```

`@callback` is similar to `@typedef`, but it specifies a function type instead of an object type:

```js
/**
 * @callback Predicate
 * @param {string} data
 * @param {number} [index]
 * @returns {boolean}
 */

/** @type {Predicate} */
const ok = (s) => !(s.length % 2);
```

Of course, any of these types can be declared using TypeScript syntax in a single-line `@typedef`:

```js
/** @typedef {{ prop1: string, prop2: string, prop3?: number }} SpecialType */
/** @typedef {(data: string, index?: number) => boolean} Predicate */
```

### `@template`

You can declare type parameters with the `@template` tag.
This lets you make functions, classes, or types that are generic:

```js
/**
 * @template T
 * @param {T} x - A generic parameter that flows through to the return type
 * @returns {T}
 */
function id(x) {
  return x;
}

const a = id("string");
const b = id(123);
const c = id({});
```

Use comma or multiple tags to declare multiple type parameters:

```js
/**
 * @template T,U,V
 * @template W,X
 */
```

You can also specify a type constraint before the type parameter name.
Only the first type parameter in a list is constrained:

```js
/**
 * @template {string} K - K must be a string or string literal
 * @template {{ serious(): string }} Seriousalizable - must have a serious method
 * @param {K} key
 * @param {Seriousalizable} object
 */
function seriousalize(key, object) {
  // ????
}
```

Finally, you can specify a default for a type parameter:

```js
/** @template [T=object] */
class Cache {
    /** @param {T} initial */
    constructor(initial) {
    }
}
let c = new Cache()
```

### `@satisfies`

`@satisfies` provides access to the postfix operator `satisfies` in TypeScript. Satisfies is used to declare that a value implements a type but does not affect the type of the value.

```js
/**
 * @typedef {"hello world" | "Hello, world"} WelcomeMessage
 */

/** @satisfies {WelcomeMessage} */
const message = "hello world"

/** @satisfies {WelcomeMessage} */
const failingMessage = "Hello world!"

/** @type {WelcomeMessage} */
const messageUsingType = "hello world"
```

## Classes

Classes can be declared as ES6 classes.

```js
class C {
  /**
   * @param {number} data
   */
  constructor(data) {
    // property types can be inferred
    this.name = "foo";

    // or set explicitly
    /** @type {string | null} */
    this.title = null;

    // or simply annotated, if they're set elsewhere
    /** @type {number} */
    this.size;

    this.initialize(data); // Should error, initializer expects a string
  }
  /**
   * @param {string} s
   */
  initialize = function (s) {
    this.size = s.length;
  };
}

var c = new C(0);

// C should only be called with new, but
// because it is JavaScript, this is allowed and
// considered an 'any'.
var result = C(1);
```

They can also be declared as constructor functions; use `@constructor` along with `@this` for this.

### Property Modifiers

`@public`, `@private`, and `@protected` work exactly like `public`, `private`, and `protected` in TypeScript:

```js

class Car {
  constructor() {
    /** @private */
    this.identifier = 100;
  }

  printIdentifier() {
    console.log(this.identifier);
  }
}

const c = new Car();
console.log(c.identifier);
```

- `@public` is always implied and can be left off, but means that a property can be reached from anywhere.
- `@private` means that a property can only be used within the containing class.
- `@protected` means that a property can only be used within the containing class, and all derived subclasses, but not on dissimilar instances of the containing class.

`@public`, `@private`, and `@protected` do not work in constructor functions.

### `@readonly`

The `@readonly` modifier ensures that a property is only ever written to during initialization.

```js

class Car {
  constructor() {
    /** @readonly */
    this.identifier = 100;
  }

  printIdentifier() {
    console.log(this.identifier);
  }
}

const c = new Car();
console.log(c.identifier);
```

### `@override`

`@override` works the same way as in TypeScript; use it on methods that override a method from a base class:

```js
export class C {
  m() { }
}
class D extends C {
  /** @override */
  m() { }
}
```

Set `noImplicitOverride: true` in tsconfig to check overrides.

### `@extends`

When JavaScript classes extend a generic base class, there is no JavaScript syntax for passing a type argument. The `@extends` tag allows this:

```js
/**
 * @template T
 * @extends {Set<T>}
 */
class SortableSet extends Set {
  // ...
}
```

Note that `@extends` only works with classes. Currently, there is no way for a constructor function to extend a class.

### `@implements`

In the same way, there is no JavaScript syntax for implementing a TypeScript interface. The `@implements` tag works just like in TypeScript:

```js
/** @implements {Print} */
class TextBook {
  print() {
    // TODO
  }
}
```

### `@constructor`

The compiler infers constructor functions based on this-property assignments, but you can make checking stricter and suggestions better if you add a `@constructor` tag:

```js
/**
 * @constructor
 * @param {number} data
 */
function C(data) {
  // property types can be inferred
  this.name = "foo";

  // or set explicitly
  /** @type {string | null} */
  this.title = null;

  // or simply annotated, if they're set elsewhere
  /** @type {number} */
  this.size;

  this.initialize(data);
}
/**
 * @param {string} s
 */
C.prototype.initialize = function (s) {
  this.size = s.length;
};

var c = new C(0);
c.size;

var result = C(1);
```

> Note: Error messages only show up in JS codebases with a JSConfig and `checkJs` enabled.

With `@constructor`, `this` is checked inside the constructor function `C`, so you will get suggestions for the `initialize` method and an error if you pass it a number. Your editor may also show warnings if you call `C` instead of constructing it.

Unfortunately, this means that constructor functions that are also callable cannot use `@constructor`.

### `@this`

The compiler can usually figure out the type of `this` when it has some context to work with. When it doesn't, you can explicitly specify the type of `this` with `@this`:

```js
/**
 * @this {HTMLElement}
 * @param {*} e
 */
function callbackForLater(e) {
  this.clientHeight = parseInt(e); // should be fine!
}
```
