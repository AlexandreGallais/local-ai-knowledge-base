---
title: "TypeError: 'x' is not iterable"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/is_not_iterable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: 'x' is not iterable

The JavaScript exception "is not iterable" occurs when the value which is spread into an array or function call, given as the
right-hand side of `for...of`,
as an argument of a function such as `Promise.all` or `Set()`,
or as the right-hand side of an array destructuring,
is not an iterable object. This error is also encountered when `Array.fromAsync()` or `for await...of` is used with a non-async iterable.

## Message

```plain
TypeError: Spread syntax requires ...iterable[Symbol.iterator] to be a function (V8-based & Safari)
TypeError: %Array%.from requires that the property of the first argument, items[Symbol.iterator], when exists, be a function (V8-based & Safari)
TypeError: Array.fromAsync requires that the property of the first argument, items[Symbol.asyncIterator], when exists, be a function (V8-based & Safari)
TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator)) (V8-based)
TypeError: x is not async iterable (V8-based)
TypeError: x is not iterable (V8-based & Firefox)
TypeError: undefined is not a function (near '...y of x...') (Safari)
TypeError: Array.from: no function (Safari)
TypeError: Type error (Safari)
```

## Error type

`TypeError`

## What went wrong?

The value which is spread into an array or function call, given as the right-hand side of `for...of`,
or as an argument of a function such as `Promise.all` or `Set()`,
or as the source of an array destructuring pattern,
is not an iterable object.
An iterable can be a built-in iterable type such as
`Array`, `String` or `Map`, a generator result, or
an object implementing the iterable protocol.

```js
const nonIterable1 = {};
const nonIterable2 = { [Symbol.iterator]: 1 };

[...nonIterable1];
Math.max(...nonIterable1);
for (const x of nonIterable1);
new Set(nonIterable1);
Array.from(nonIterable2);
new Int8Array(nonIterable2);
const [] = nonIterable1;
```

## Examples

### Array destructuring a non-iterable

```js
const myObj = { arrayOrObjProp1: {}, arrayOrObjProp2: [42] };

const {
  arrayOrObjProp1: [value1],
  arrayOrObjProp2: [value2],
} = myObj; // TypeError: object is not iterable

console.log(value1, value2);
```

The non-iterable might turn to be `undefined` in some runtime environments.

### Iterating over Object properties

In JavaScript, `Object`s are not iterable unless they implement
the iterable protocol.
Therefore, you cannot use `for...of`
to iterate over the properties of an object.

```js
const obj = { France: "Paris", England: "London" };
for (const p of obj) {
  // …
} // TypeError: obj is not iterable
```

Instead you have to use `Object.keys` or `Object.entries`, to
iterate over the properties or entries of an object.

```js
const obj = { France: "Paris", England: "London" };
// Iterate over the property names:
for (const country of Object.keys(obj)) {
  const capital = obj[country];
  console.log(country, capital);
}

for (const [country, capital] of Object.entries(obj)) {
  console.log(country, capital);
}
```

Another option for this use case might be to use a `Map`:

```js
const map = new Map();
map.set("France", "Paris");
map.set("England", "London");
// Iterate over the property names:
for (const country of map.keys()) {
  const capital = map.get(country);
  console.log(country, capital);
}

for (const capital of map.values()) {
  console.log(capital);
}

for (const [country, capital] of map.entries()) {
  console.log(country, capital);
}
```

### Iterating over a generator

Generator functions
are functions you call to produce an iterable object.

```js
function* generate(a, b) {
  yield a;
  yield b;
}

for (const x of generate) {
  console.log(x);
} // TypeError: generate is not iterable
```

When they are not called, the `Function` object corresponding to the
generator is callable, but not iterable. Calling a generator produces an iterable
object which will iterate over the values yielded during the execution of the
generator.

```js
function* generate(a, b) {
  yield a;
  yield b;
}

for (const x of generate(1, 2)) {
  console.log(x);
}
```

### Iterating over a custom iterable

Custom iterables can be created by implementing the
`Symbol.iterator` method. You must be certain that your iterator method
returns an object which is an iterator, which is to say it must have a next method.

```js
const myEmptyIterable = {
  [Symbol.iterator]() {
    return []; // [] is iterable, but it is not an iterator — it has no next method.
  },
};

Array.from(myEmptyIterable); // TypeError: myEmptyIterable is not iterable
```

Here is a correct implementation:

```js
const myEmptyIterable = {
  [Symbol.iterator]() {
    return [][Symbol.iterator]();
  },
};

Array.from(myEmptyIterable); // []
```

## See also

- Iterable protocol
- `Object.keys`
- `Object.entries`
- `Map`
- Generator functions
- for...of
