---
title: "JSDoc Reference (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/javascript/JSDoc Reference.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# JSDoc Reference (part 2 of 2)

## Documentation

### `@deprecated`

When a function, method, or property is deprecated you can let users know by marking it with a `/** @deprecated */` JSDoc comment. That information is surfaced in completion lists and as a suggestion diagnostic that editors can handle specially. In an editor like VS Code, deprecated values are typically displayed in a strike-through style ~~like this~~.

```js
/** @deprecated */
const apiV1 = {};
const apiV2 = {};

apiV;

```

### `@see`

`@see` lets you link to other names in your program:

```ts
type Box<T> = { t: T }
/** @see Box for implementation details */
type Boxify<T> = { [K in keyof T]: Box<T> };
```

Some editors will turn `Box` into a link to make it easy to jump there and back.

### `@link`

`@link` is like `@see`, except that it can be used inside other tags:

```ts
type Box<T> = { t: T }
/** @returns A {@link Box} containing the parameter. */
function box<U>(u: U): Box<U> {
  return { t: u };
}
```

You can also link a property:

```ts
type Pet = {
  name: string
  hello: () => string
}

/**
 * Note: you should implement the {@link Pet.hello} method of Pet.
 */
function hello(p: Pet) {
  p.hello()
}
```

Or with an optional name:

```ts
type Pet = {
  name: string
  hello: () => string
}

/**
 * Note: you should implement the {@link Pet.hello | hello} method of Pet.
 */
function hello(p: Pet) {
  p.hello()
}
```

## Other

### `@enum`

The `@enum` tag allows you to create an object literal whose members are all of a specified type. Unlike most object literals in JavaScript, it does not allow other members.
`@enum` is intended for compatibility with Google Closure's `@enum` tag.

```js
/** @enum {number} */
const JSDocState = {
  BeginningOfLine: 0,
  SawAsterisk: 1,
  SavingComments: 2,
};

JSDocState.SawAsterisk;
```

Note that `@enum` is quite different from, and much simpler than, TypeScript's `enum`. However, unlike TypeScript's enums, `@enum` can have any type:

```js
/** @enum {function(number): number} */
const MathFuncs = {
  add1: (n) => n + 1,
  id: (n) => -n,
  sub1: (n) => n - 1,
};

MathFuncs.add1;
```

### `@author`

You can specify the author of an item with `@author`:

```ts
/**
 * Welcome to awesome.ts
 * @author Ian Awesome <i.am.awesome@example.com>
 */
```

Remember to surround the email address with angle brackets.
Otherwise, `@example` will be parsed as a new tag.

### Other supported patterns

```js
class Foo {}
var someObj = {
  /**
   * @param {string} param1 - JSDocs on property assignments work
   */
  x: function (param1) {},
};

/**
 * As do jsdocs on variable assignments
 * @return {Window}
 */
let someFunc = function () {};

/**
 * And class methods
 * @param {string} greeting The greeting to use
 */
Foo.prototype.sayHi = (greeting) => console.log("Hi!");

/**
 * And arrow function expressions
 * @param {number} x - A multiplier
 */
let myArrow = (x) => x * x;

/**
 * Which means it works for function components in JSX too
 * @param {{a: string, b: number}} props - Some param
 */
var fc = (props) => <div>{props.a.charAt(0)}</div>;

/**
 * A parameter can be a class constructor, using Google Closure syntax.
 *
 * @param {{new(...args: any[]): object}} C - The class to register
 */
function registerClass(C) {}

/**
 * @param {...string} p1 - A 'rest' arg (array) of strings. (treated as 'any')
 */
function fn10(p1) {}

/**
 * @param {...string} p1 - A 'rest' arg (array) of strings. (treated as 'any')
 */
function fn9(p1) {
  return p1.join();
}
```

### Unsupported patterns

Postfix equals on a property type in an object literal type doesn't specify an optional property:

```js
/**
 * @type {{ a: string, b: number= }}
 */
var wrong;
/**
 * Use postfix question on the property name instead:
 * @type {{ a: string, b?: number }}
 */
var right;
```

Nullable types only have meaning if `strictNullChecks` is on:

```js
/**
 * @type {?number}
 * With strictNullChecks: true  -- number | null
 * With strictNullChecks: false -- number
 */
var nullable;
```

The TypeScript-native syntax is a union type:

```js
/**
 * @type {number | null}
 * With strictNullChecks: true  -- number | null
 * With strictNullChecks: false -- number
 */
var unionNullable;
```

Non-nullable types have no meaning and are treated just as their original type:

```js
/**
 * @type {!number}
 * Just has type number
 */
var normal;
```

Unlike JSDoc's type system, TypeScript only allows you to mark types as containing null or not.
There is no explicit non-nullability -- if strictNullChecks is on, then `number` is not nullable.
If it is off, then `number` is nullable.

### Unsupported tags

TypeScript ignores any unsupported JSDoc tags.

The following tags have open issues to support them:

- `@memberof` (issue #7237)
- `@yields` (issue #23857)
- `@member` (issue #56674)

### Legacy type synonyms

A number of common types are given aliases for compatibility with old JavaScript code.
Some of the aliases are the same as existing types, although most of those are rarely used.
For example, `String` is treated as an alias for `string`.
Even though `String` is a type in TypeScript, old JSDoc often uses it to mean `string`.
Besides, in TypeScript, the capitalized versions of primitive types are wrapper types -- almost always a mistake to use.
So the compiler treats these types as synonyms based on usage in old JSDoc:

- `String -> string`
- `Number -> number`
- `Boolean -> boolean`
- `Void -> void`
- `Undefined -> undefined`
- `Null -> null`
- `function -> Function`
- `array -> Array<any>`
- `promise -> Promise<any>`
- `Object -> any`
- `object -> any`

The last four aliases are turned off when `noImplicitAny: true`:

- `object` and `Object` are built-in types, although `Object` is rarely used.
- `array` and `promise` are not built-in, but might be declared somewhere in your program.
