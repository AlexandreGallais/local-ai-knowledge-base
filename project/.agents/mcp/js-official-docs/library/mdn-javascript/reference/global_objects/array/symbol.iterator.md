---
title: "Array.prototype[Symbol.iterator]()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/symbol.iterator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array.prototype[Symbol.iterator]()

The **`Symbol.iterator`** method of `Array` instances implements the iterable protocol and allows arrays to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns an array iterator object that yields the value of each index in the array.

The initial value of this property is the same function object as the initial value of the `Array.prototype.values` property.

```js
const array = ["a", "b", "c"];
const iterator = array[Symbol.iterator]();

for (const value of iterator) {
  console.log(value);
}

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"
```

## Syntax

```js
array[Symbol.iterator]()
```

### Parameters

None.

### Return value

The same return value as `Array.prototype.values()`: a new iterable iterator object that yields the value of each index in the array.

## Examples

### Iteration using for...of loop

Note that you seldom need to call this method directly. The existence of the `Symbol.iterator` method makes arrays iterable, and iterating syntaxes like the `for...of` loop automatically call this method to obtain the iterator to loop over.

#### HTML

```html
<ul id="letterResult"></ul>
```

#### JavaScript

```js
const arr = ["a", "b", "c"];
const letterResult = document.getElementById("letterResult");
for (const letter of arr) {
  const li = document.createElement("li");
  li.textContent = letter;
  letterResult.appendChild(li);
}
```

#### Result

### Manually hand-rolling the iterator

You may still manually call the `next()` method of the returned iterator object to achieve maximum control over the iteration process.

```js
const arr = ["a", "b", "c", "d", "e"];
const arrIter = arr[Symbol.iterator]();
console.log(arrIter.next().value); // a
console.log(arrIter.next().value); // b
console.log(arrIter.next().value); // c
console.log(arrIter.next().value); // d
console.log(arrIter.next().value); // e
```

### Handling strings and string arrays with the same function

Because both strings and arrays implement the iterable protocol, a generic function can be designed to handle both inputs in the same fashion. This is better than calling `Array.prototype.values()` directly, which requires the input to be an array, or at least an object with such a method.

```js
function logIterable(it) {
  if (typeof it[Symbol.iterator] !== "function") {
    console.log(it, "is not iterable.");
    return;
  }
  for (const letter of it) {
    console.log(letter);
  }
}

// Array
logIterable(["a", "b", "c"]);
// a
// b
// c

// String
logIterable("abc");
// a
// b
// c

// Number
logIterable(123);
// 123 is not iterable.
```

## See also

- Polyfill of `Array.prototype[Symbol.iterator]` in `core-js`
- Indexed collections guide
- `Array`
- `Array.prototype.keys()`
- `Array.prototype.entries()`
- `Array.prototype.values()`
- `TypedArray.prototype[Symbol.iterator]()`
- `String.prototype[Symbol.iterator]()`
- `Symbol.iterator`
- Iteration protocols
