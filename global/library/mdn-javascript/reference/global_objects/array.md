---
title: "Array (part 1 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array

The **`Array`** object, as with arrays in other programming languages, enables storing a collection of multiple items under a single variable name, and has members for performing common array operations.

## Description

In JavaScript, arrays aren't primitives but are instead `Array` objects with the following core characteristics:

- **JavaScript arrays are resizable** and **can contain a mix of different data types**. (When those characteristics are undesirable, use typed arrays instead.)
- **JavaScript arrays are not associative arrays** and so, array elements cannot be accessed using arbitrary strings as indexes, but must be accessed using nonnegative integers (or their respective string form) as indexes.
- **JavaScript arrays are zero-indexed**: the first element of an array is at index `0`, the second is at index `1`, and so on — and the last element is at the value of the array's `length` property minus `1`.
- **JavaScript array-copy operations create shallow copies**. (All standard built-in copy operations with _any_ JavaScript objects create shallow copies, rather than deep copies).

### Array indices

`Array` objects cannot use arbitrary strings as element indexes (as in an associative array) but must use nonnegative integers (or their respective string form). Setting or accessing via non-integers will not set or retrieve an element from the array list itself, but will set or access a variable associated with that array's object property collection. The array's object properties and list of array elements are separate, and the array's traversal and mutation operations cannot be applied to these named properties.

Array elements are object properties in the same way that `toString` is a property (to be specific, however, `toString()` is a method). Nevertheless, trying to access an element of an array as follows throws a syntax error because the property name is not valid:

```js
arr.0; // a syntax error
```

JavaScript syntax requires properties beginning with a digit to be accessed using bracket notation instead of dot notation. It's also possible to quote the array indices (e.g., `years['2']` instead of `years[2]`), although usually not necessary.

The `2` in `years[2]` is coerced into a string by the JavaScript engine through an implicit `toString` conversion. As a result, `'2'` and `'02'` would refer to two different slots on the `years` object, and the following example could be `true`:

```js
console.log(years["2"] !== years["02"]);
```

Only `years['2']` is an actual array index. `years['02']` is an arbitrary string property that will not be visited in array iteration.

### Relationship between length and numerical properties

A JavaScript array's `length` property and numerical properties are connected.

Several of the built-in array methods (e.g., `join()`, `slice()`, `indexOf()`, etc.) take into account the value of an array's `length` property when they're called.

Other methods (e.g., `push()`, `splice()`, etc.) also result in updates to an array's `length` property.

```js
const fruits = [];
fruits.push("banana", "apple", "peach");
console.log(fruits.length); // 3
```

When setting a property on a JavaScript array when the property is a valid array index and that index is outside the current bounds of the array, the engine will update the array's `length` property accordingly:

```js
fruits[5] = "mango";
console.log(fruits[5]); // 'mango'
console.log(Object.keys(fruits)); // ['0', '1', '2', '5']
console.log(fruits.length); // 6
```

Increasing the `length` extends the array by adding empty slots without creating any new elements — not even `undefined`.

```js
fruits.length = 10;
console.log(fruits); // ['banana', 'apple', 'peach', empty x 2, 'mango', empty x 4]
console.log(Object.keys(fruits)); // ['0', '1', '2', '5']
console.log(fruits.length); // 10
console.log(fruits[8]); // undefined
```

Decreasing the `length` property does, however, delete elements.

```js
fruits.length = 2;
console.log(Object.keys(fruits)); // ['0', '1']
console.log(fruits.length); // 2
```

This is explained further on the `length` page.

### Array methods and empty slots

Array methods have different behaviors when encountering empty slots in sparse arrays. In general, older methods (e.g., `forEach`) treat empty slots differently from indices that contain `undefined`.

Methods that have special treatment for empty slots include the following: `concat()`, `copyWithin()`, `every()`, `filter()`, `flat()`, `flatMap()`, `forEach()`, `indexOf()`, `lastIndexOf()`, `map()`, `reduce()`, `reduceRight()`, `reverse()`, `slice()`, `some()`, `sort()`, and `splice()`. Iteration methods such as `forEach` don't visit empty slots at all. Other methods, such as `concat`, `copyWithin`, etc., preserve empty slots when doing the copying, so in the end the array is still sparse.

```js
const colors = ["red", "yellow", "blue"];
colors[5] = "purple";
colors.forEach((item, index) => {
  console.log(`${index}: ${item}`);
});
// Output:
// 0: red
// 1: yellow
// 2: blue
// 5: purple

colors.reverse(); // ['purple', empty × 2, 'blue', 'yellow', 'red']
```

Newer methods (e.g., `keys`) do not treat empty slots specially and treat them as if they contain `undefined`. Methods that conflate empty slots with `undefined` elements include the following: `entries()`, `fill()`, `find()`, `findIndex()`, `findLast()`, `findLastIndex()`, `includes()`, `join()`, `keys()`, `toLocaleString()`, `toReversed()`, `toSorted()`, `toSpliced()`, `values()`, and `with()`.

```js
const colors = ["red", "yellow", "blue"];
colors[5] = "purple";
const iterator = colors.keys();
for (const key of iterator) {
  console.log(`${key}: ${colors[key]}`);
}
// Output
// 0: red
// 1: yellow
// 2: blue
// 3: undefined
// 4: undefined
// 5: purple

const newColors = colors.toReversed(); // ['purple', undefined, undefined, 'blue', 'yellow', 'red']
```

### Copying methods and mutating methods

Some methods do not mutate the existing array that the method was called on, but instead return a new array. They do so by first constructing a new array and then populating it with elements. The copy always happens _shallowly_ — the method never copies anything beyond the initially created array. Elements of the original array(s) are copied into the new array as follows:

- Objects: the object reference is copied into the new array. Both the original and new array refer to the same object. That is, if a referenced object is modified, the changes are visible to both the new and original arrays.
- Primitive types such as strings, numbers and booleans (not `String`, `Number`, and `Boolean` objects): their values are copied into the new array.

Other methods mutate the array that the method was called on, in which case their return value differs depending on the method: sometimes a reference to the same array, sometimes the length of the new array.

The following methods create new arrays by accessing `this.constructor[Symbol.species]` to determine the constructor to use: `concat()`, `filter()`, `flat()`, `flatMap()`, `map()`, `slice()`, and `splice()` (to construct the array of removed elements that's returned).

The following methods always create new arrays with the `Array` base constructor: `toReversed()`, `toSorted()`, `toSpliced()`, and `with()`.

The following table lists the methods that mutate the original array, and the corresponding non-mutating alternative:

| Mutating method                                | Non-mutating alternative                                 |
| ---------------------------------------------- | -------------------------------------------------------- |
| `copyWithin()` | No one-method alternative                                |
| `fill()`             | No one-method alternative                                |
| `pop()`               | `slice(0, -1)`                |
| `push(v1, v2)`       | `concat([v1, v2])`           |
| `reverse()`       | `toReversed()`           |
| `shift()`           | `slice(1)`                    |
| `sort()`             | `toSorted()`               |
| `splice()`         | `toSpliced()`             |
| `unshift(v1, v2)` | `toSpliced(0, 0, v1, v2)` |

An easy way to change a mutating method into a non-mutating alternative is to use the spread syntax or `slice()` to create a copy first:

```js
arr.copyWithin(0, 1, 2); // mutates arr
const arr2 = arr.slice().copyWithin(0, 1, 2); // does not mutate arr
const arr3 = [...arr].copyWithin(0, 1, 2); // does not mutate arr
```

### Iterative methods

Many array methods take a callback function as an argument. The callback function is called sequentially and at most once for each element in the array, and the return value of the callback function is used to determine the return value of the method. They all share the same signature:

```js
method(callbackFn, thisArg)
```

Where `callbackFn` takes three arguments:

- `element`
    The current element being processed in the array.
- `index`
    The index of the current element being processed in the array.
- `array`
    The array that the method was called upon.

What `callbackFn` is expected to return depends on the array method that was called.

The `thisArg` argument (defaults to `undefined`) will be used as the `this` value when calling `callbackFn`. The `this` value ultimately observable by `callbackFn` is determined according to the usual rules: if `callbackFn` is non-strict, primitive `this` values are wrapped into objects, and `undefined`/`null` is substituted with `globalThis`. The `thisArg` argument is irrelevant for any `callbackFn` defined with an arrow function, as arrow functions don't have their own `this` binding.

The `array` argument passed to `callbackFn` is most useful if you want to read another index during iteration, because you may not always have an existing variable that refers to the current array. You should generally not mutate the array during iteration (see mutating initial array in iterative methods), but you can also use this argument to do so. The `array` argument is _not_ the array that is being built, in the case of methods like `map()`, `filter()`, and `flatMap()` — there is no way to access the array being built from the callback function.

All iterative methods are copying and generic, although they behave differently with empty slots.

The following methods are iterative: `every()`, `filter()`, `find()`, `findIndex()`, `findLast()`, `findLastIndex()`, `flatMap()`, `forEach()`, `map()`, and `some()`.

In particular, `every()`, `find()`, `findIndex()`, `findLast()`, `findLastIndex()`, and `some()` do not always invoke `callbackFn` on every element — they stop iteration as soon as the return value is determined.

The `reduce()` and `reduceRight()` methods also take a callback function and run it at most once for each element in the array, but they have slightly different signatures from typical iterative methods (for example, they don't accept `thisArg`).

The `sort()` method also takes a callback function, but it is not an iterative method. It mutates the array in-place, doesn't accept `thisArg`, and may invoke the callback multiple times on an index.

Iterative methods iterate the array like the following (with a lot of technical details omitted):

```js
function method(callbackFn, thisArg) {
  const length = this.length;
  for (let i = 0; i < length; i++) {
    if (i in this) {
      const result = callbackFn.call(thisArg, this[i], i, this);
      // Do something with result; maybe return early
    }
  }
}
```

Note the following:

1. Not all methods do the `i in this` test. The `find`, `findIndex`, `findLast`, and `findLastIndex` methods do not, but other methods do.
2. The `length` is memorized before the loop starts. This affects how insertions and deletions during iteration are handled (see mutating initial array in iterative methods).
3. The method doesn't memorize the array contents, so if any index is modified during iteration, the new value might be observed.
4. The code above iterates the array in ascending order of index. Some methods iterate in descending order of index (`for (let i = length - 1; i >= 0; i--)`): `reduceRight()`, `findLast()`, and `findLastIndex()`.
5. `reduce` and `reduceRight` have slightly different signatures and do not always start at the first/last element.

### Generic array methods

Array methods are always generic — they don't access any internal data of the array object. They only access the array elements through the `length` property and the indexed elements. This means that they can be called on array-like objects as well.

```js
const arrayLike = {
  0: "a",
  1: "b",
  length: 2,
};
console.log(Array.prototype.join.call(arrayLike, "+")); // 'a+b'
```

#### Normalization of the length property

The `length` property is converted to an integer and then clamped to the range between 0 and 253 - 1. `NaN` becomes `0`, so even when `length` is not present or is `undefined`, it behaves as if it has value `0`.

The language avoids setting `length` to an unsafe integer. All built-in methods will throw a `TypeError` if `length` will be set to a number greater than 253 - 1. However, because the `length` property of arrays throws an error if it's set to greater than 232 - 1, the safe integer threshold is usually not reached unless the method is called on a non-array object.

```js
Array.prototype.flat.call({}); // []
```

Some array methods set the `length` property of the array object. They always set the value after normalization, so `length` always ends as an integer.

```js
const a = { length: 0.7 };
Array.prototype.push.call(a);
console.log(a.length); // 0
```

#### Array-like objects

The term _array-like object_ refers to any object that doesn't throw during the `length` conversion process described above. In practice, such object is expected to actually have a `length` property and to have indexed elements in the range `0` to `length - 1`. (If it doesn't have all indices, it will be functionally equivalent to a sparse array.) Any integer index less than zero or greater than `length - 1` is ignored when an array method operates on an array-like object.

Many DOM objects are array-like — for example, `NodeList` and `HTMLCollection`. The `arguments` object is also array-like. You can call array methods on them even if they don't have these methods themselves.

```js
function f() {
  console.log(Array.prototype.join.call(arguments, "+"));
}

f("a", "b"); // 'a+b'
```

## Constructor

- `Array()`
    Creates a new `Array` object.

## Static properties

- `Array[Symbol.species]`
    Returns the `Array` constructor.
