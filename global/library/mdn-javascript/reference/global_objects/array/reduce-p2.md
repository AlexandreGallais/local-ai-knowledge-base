---
title: "Array.prototype.reduce() (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/reduce/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array.prototype.reduce() (part 2 of 2)

## Examples

### How reduce() works without an initial value

The code below shows what happens if we call `reduce()` with an array and no initial value.

```js
const array = [15, 16, 17, 18, 19];

function reducer(accumulator, currentValue, index) {
  const returns = accumulator + currentValue;
  console.log(
    `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`,
  );
  return returns;
}

array.reduce(reducer);
```

The callback would be invoked four times, with the arguments and return values in each call being as follows:

|             | `accumulator` | `currentValue` | `index` | Return value |
| ----------- | ------------- | -------------- | ------- | ------------ |
| First call  | `15`          | `16`           | `1`     | `31`         |
| Second call | `31`          | `17`           | `2`     | `48`         |
| Third call  | `48`          | `18`           | `3`     | `66`         |
| Fourth call | `66`          | `19`           | `4`     | `85`         |

The `array` parameter never changes through the process — it's always `[15, 16, 17, 18, 19]`. The value returned by `reduce()` would be that of the last callback invocation (`85`).

### How reduce() works with an initial value

Here we reduce the same array using the same algorithm, but with an `initialValue` of `10` passed as the second argument to `reduce()`:

```js
[15, 16, 17, 18, 19].reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  10,
);
```

The callback would be invoked five times, with the arguments and return values in each call being as follows:

|             | `accumulator` | `currentValue` | `index` | Return value |
| ----------- | ------------- | -------------- | ------- | ------------ |
| First call  | `10`          | `15`           | `0`     | `25`         |
| Second call | `25`          | `16`           | `1`     | `41`         |
| Third call  | `41`          | `17`           | `2`     | `58`         |
| Fourth call | `58`          | `18`           | `3`     | `76`         |
| Fifth call  | `76`          | `19`           | `4`     | `95`         |

The value returned by `reduce()` in this case would be `95`.

### Sum of values in an object array

To sum up the values contained in an array of objects, you **must** supply
an `initialValue`, so that each item passes through your function.

```js
const objects = [{ x: 1 }, { x: 2 }, { x: 3 }];
const sum = objects.reduce(
  (accumulator, currentValue) => accumulator + currentValue.x,
  0,
);

console.log(sum); // 6
```

### Function sequential piping

The `pipe` function takes a sequence of functions and returns a new function. When the new function is called with an argument, the sequence of functions are called in order, which each one receiving the return value of the previous function.

```js
const pipe =
  (...functions) =>
  (initialValue) =>
    functions.reduce((acc, fn) => fn(acc), initialValue);

// Building blocks to use for composition
const double = (x) => 2 * x;
const triple = (x) => 3 * x;
const quadruple = (x) => 4 * x;

// Composed functions for multiplication of specific values
const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);

// Usage
multiply6(6); // 36
multiply9(9); // 81
multiply16(16); // 256
multiply24(10); // 240
```

### Running promises in sequence

Promise sequencing is essentially function piping demonstrated in the previous section, except done asynchronously.

```js
// Compare this with pipe: fn(acc) is changed to acc.then(fn),
// and initialValue is ensured to be a promise
const asyncPipe =
  (...functions) =>
  (initialValue) =>
    functions.reduce((acc, fn) => acc.then(fn), Promise.resolve(initialValue));

// Building blocks to use for composition
const p1 = async (a) => a * 5;
const p2 = async (a) => a * 2;
// The composed functions can also return non-promises, because the values are
// all eventually wrapped in promises
const f3 = (a) => a * 3;
const p4 = async (a) => a * 4;

asyncPipe(p1, p2, f3, p4)(10).then(console.log); // 1200
```

`asyncPipe` can also be implemented using `async`/`await`, which better demonstrates its similarity with `pipe`:

```js
const asyncPipe =
  (...functions) =>
  (initialValue) =>
    functions.reduce(async (acc, fn) => fn(await acc), initialValue);
```

### Using reduce() with sparse arrays

`reduce()` skips missing elements in sparse arrays, but it does not skip `undefined` values.

```js
console.log([1, 2, , 4].reduce((a, b) => a + b)); // 7
console.log([1, 2, undefined, 4].reduce((a, b) => a + b)); // NaN
```

### Calling reduce() on non-array objects

The `reduce()` method reads the `length` property of `this` and then accesses each property whose key is a nonnegative integer less than `length`.

```js
const arrayLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4,
  3: 99, // ignored by reduce() since length is 3
};
console.log(Array.prototype.reduce.call(arrayLike, (x, y) => x + y));
// 9
```

### When to not use reduce()

Multipurpose higher-order functions like `reduce()` can be powerful but sometimes difficult to understand, especially for less-experienced JavaScript developers. If code becomes clearer when using other array methods, developers must weigh the readability tradeoff against the other benefits of using `reduce()`.

Note that `reduce()` is always equivalent to a `for...of` loop, except that instead of mutating a variable in the upper scope, we now return the new value for each iteration:

```js
const val = array.reduce((acc, cur) => update(acc, cur), initialValue);

// Is equivalent to:
let val = initialValue;
for (const cur of array) {
  val = update(val, cur);
}
```

As previously stated, the reason why people may want to use `reduce()` is to mimic functional programming practices of immutable data. Therefore, developers who uphold the immutability of the accumulator often copy the entire accumulator for each iteration, like this:

```js
const names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];
const countedNames = names.reduce((allNames, name) => {
  const currCount = Object.hasOwn(allNames, name) ? allNames[name] : 0;
  return {
    ...allNames,
    [name]: currCount + 1,
  };
}, {});
```

This code is ill-performing, because each iteration has to copy the entire `allNames` object, which could be big, depending how many unique names there are. This code has worst-case `O(N^2)` performance, where `N` is the length of `names`.

A better alternative is to _mutate_ the `allNames` object on each iteration. However, if `allNames` gets mutated anyway, you may want to convert the `reduce()` to a `for` loop instead, which is much clearer:

```js
const names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];
const countedNames = names.reduce((allNames, name) => {
  const currCount = allNames[name] ?? 0;
  allNames[name] = currCount + 1;
  // return allNames, otherwise the next iteration receives undefined
  return allNames;
}, Object.create(null));
```

```js
const names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];
const countedNames = Object.create(null);
for (const name of names) {
  const currCount = countedNames[name] ?? 0;
  countedNames[name] = currCount + 1;
}
```

Therefore, if your accumulator is an array or an object and you are copying the array or object on each iteration, you may accidentally introduce quadratic complexity into your code, causing performance to quickly degrade on large data. This has happened in real-world code — see for example Making Tanstack Table 1000x faster with a 1 line change.

Some of the acceptable use cases of `reduce()` are given above (most notably, summing an array, promise sequencing, and function piping). There are other cases where better alternatives than `reduce()` exist.

- Flattening an array of arrays. Use `flat()` instead.

  ```js
  const flattened = array.reduce((acc, cur) => acc.concat(cur), []);
  ```

  ```js
  const flattened = array.flat();
  ```

- Grouping objects by a property. Use `Object.groupBy()` instead.

  ```js
  const groups = array.reduce((acc, obj) => {
    const key = obj.name;
    const curGroup = acc[key] ?? [];
    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
  ```

  ```js
  const groups = Object.groupBy(array, (obj) => obj.name);
  ```

- Concatenating arrays contained in an array of objects. Use `flatMap()` instead.

  ```js
  const friends = [
    { name: "Anna", books: ["Bible", "Harry Potter"] },
    { name: "Bob", books: ["War and peace", "Romeo and Juliet"] },
    { name: "Alice", books: ["The Lord of the Rings", "The Shining"] },
  ];
  const allBooks = friends.reduce((acc, cur) => [...acc, ...cur.books], []);
  ```

  ```js
  const allBooks = friends.flatMap((person) => person.books);
  ```

- Removing duplicate items in an array. Use `Set` and `Array.from()` instead.

  ```js
  const uniqArray = array.reduce(
    (acc, cur) => (acc.includes(cur) ? acc : [...acc, cur]),
    [],
  );
  ```

  ```js
  const uniqArray = Array.from(new Set(array));
  ```

- Eliminating or adding elements in an array. Use `flatMap()` instead.

  ```js
  // Takes an array of numbers and splits perfect squares into its square roots
  const roots = array.reduce((acc, cur) => {
    if (cur < 0) return acc;
    const root = Math.sqrt(cur);
    if (Number.isInteger(root)) return [...acc, root, root];
    return [...acc, cur];
  }, []);
  ```

  ```js
  const roots = array.flatMap((val) => {
    if (val < 0) return [];
    const root = Math.sqrt(val);
    if (Number.isInteger(root)) return [root, root];
    return [val];
  });
  ```

  If you are only eliminating elements from an array, you also can use `filter()`.

- Searching for elements or testing if elements satisfy a condition. Use `find()` and `findIndex()`, or `some()` and `every()` instead. These methods have the additional benefit that they return as soon as the result is certain, without iterating the entire array.

  ```js
  const allEven = array.reduce((acc, cur) => acc && cur % 2 === 0, true);
  ```

  ```js
  const allEven = array.every((val) => val % 2 === 0);
  ```

In cases where `reduce()` is the best choice, documentation and semantic variable naming can help mitigate readability drawbacks.

## See also

- Polyfill of `Array.prototype.reduce` in `core-js`
- es-shims polyfill of `Array.prototype.reduce`
- Indexed collections guide
- `Array`
- `Array.prototype.map()`
- `Array.prototype.flat()`
- `Array.prototype.flatMap()`
- `Array.prototype.reduceRight()`
- `TypedArray.prototype.reduce()`
- `Object.groupBy()`
- `Map.groupBy()`
