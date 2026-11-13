---
title: "Array.prototype.shift()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/shift/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array.prototype.shift()

The **`shift()`** method of `Array` instances removes the **first**
element from an array and returns that removed element. This method changes the length
of the array.

```js
const array = [1, 2, 3];

const firstElement = array.shift();

console.log(array);
// Expected output: Array [2, 3]

console.log(firstElement);
// Expected output: 1
```

## Syntax

```js
shift()
```

### Parameters

None.

### Return value

The removed element from the array; `undefined` if the array is empty.

## Description

The `shift()` method shifts all values to the left by 1 and decrements the length by 1, resulting in the first element being removed. If the `length` property is 0, `undefined` is returned.

The `pop()` method has similar behavior to `shift()`, but applied to the last element in an array.

The `shift()` method is a mutating method. It changes the length and the content of `this`. In case you want the value of `this` to be the same, but return a new array with the first element removed, you can use `arr.slice(1)` instead.

The `shift()` method is generic. It only expects the `this` value to have a `length` property and integer-keyed properties. Although strings are also array-like, this method is not suitable to be applied on them, as strings are immutable.

## Examples

### Removing an element from an array

The following code displays the `myFish` array before and after removing its
first element. It also displays the removed element:

```js
const myFish = ["angel", "clown", "mandarin", "surgeon"];

console.log("myFish before:", myFish);
// myFish before: ['angel', 'clown', 'mandarin', 'surgeon']

const shifted = myFish.shift();

console.log("myFish after:", myFish);
// myFish after: ['clown', 'mandarin', 'surgeon']

console.log("Removed this element:", shifted);
// Removed this element: angel
```

### Using shift() method in while loop

The shift() method is often used in condition inside while loop. In the following
example every iteration will remove the next element from an array, until it is empty:

```js
const names = ["Andrew", "Tyrone", "Paul", "Maria", "Gayatri"];

while (typeof (i = names.shift()) !== "undefined") {
  console.log(i);
}
// Andrew, Tyrone, Paul, Maria, Gayatri
```

### Calling shift() on non-array objects

The `shift()` method reads the `length` property of `this`. If the normalized length is 0, `length` is set to `0` again (whereas it may be negative or `undefined` before). Otherwise, the property at `0` is returned, and the rest of the properties are shifted left by one. The property at `length - 1` is deleted, and the `length` property is decremented by one.

```js
const arrayLike = {
  length: 3,
  unrelated: "foo",
  2: 4,
};
console.log(Array.prototype.shift.call(arrayLike));
// undefined, because it is an empty slot
console.log(arrayLike);
// { '1': 4, length: 2, unrelated: 'foo' }

const plainObj = {};
// There's no length property, so the length is 0
Array.prototype.shift.call(plainObj);
console.log(plainObj);
// { length: 0 }
```

## See also

- Indexed collections guide
- `Array`
- `Array.prototype.push()`
- `Array.prototype.pop()`
- `Array.prototype.unshift()`
- `Array.prototype.concat()`
- `Array.prototype.splice()`
