---
title: "Array.prototype.pop()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/pop/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array.prototype.pop()

The **`pop()`** method of `Array` instances removes the **last**
element from an array and returns that element. This method changes the length of the
array.

```js
const plants = ["broccoli", "cauliflower", "cabbage", "kale", "tomato"];

console.log(plants.pop());
// Expected output: "tomato"

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]

plants.pop();

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage"]
```

## Syntax

```js
pop()
```

### Parameters

None.

### Return value

The removed element from the array; `undefined` if the array is empty.

## Description

The `pop()` method removes the last element from an array and returns that value to the caller. If you call `pop()` on an empty array, it returns `undefined`.

`Array.prototype.shift()` has similar behavior to `pop()`, but applied to the first element in an array.

The `pop()` method is a mutating method. It changes the length and the content of `this`. In case you want the value of `this` to be the same, but return a new array with the last element removed, you can use `arr.slice(0, -1)` instead.

The `pop()` method is generic. It only expects the `this` value to have a `length` property and integer-keyed properties. Although strings are also array-like, this method is not suitable to be applied on them, as strings are immutable.

## Examples

### Removing the last element of an array

The following code creates the `myFish` array containing four elements, then
removes its last element.

```js
const myFish = ["angel", "clown", "mandarin", "sturgeon"];

const popped = myFish.pop();

console.log(myFish); // ['angel', 'clown', 'mandarin' ]

console.log(popped); // 'sturgeon'
```

### Calling pop() on non-array objects

The `pop()` method reads the `length` property of `this`. If the normalized length is 0, `length` is set to `0` again (whereas it may be negative or `undefined` before). Otherwise, the property at `length - 1` is returned and deleted.

```js
const arrayLike = {
  length: 3,
  unrelated: "foo",
  2: 4,
};
console.log(Array.prototype.pop.call(arrayLike));
// 4
console.log(arrayLike);
// { length: 2, unrelated: 'foo' }

const plainObj = {};
// There's no length property, so the length is 0
Array.prototype.pop.call(plainObj);
console.log(plainObj);
// { length: 0 }
```

### Using an object in an array-like fashion

`push` and `pop` are intentionally generic, and we can use that to our advantage — as the following example shows.

Note that in this example, we don't create an array to store a collection of objects. Instead, we store the collection on the object itself and use `call` on `Array.prototype.push` and `Array.prototype.pop` to trick those methods into thinking we're dealing with an array.

```js
const collection = {
  length: 0,
  addElements(...elements) {
    // obj.length will be incremented automatically
    // every time an element is added.

    // Returning what push returns; that is
    // the new value of length property.
    return [].push.call(this, ...elements);
  },
  removeElement() {
    // obj.length will be decremented automatically
    // every time an element is removed.

    // Returning what pop returns; that is
    // the removed element.
    return [].pop.call(this);
  },
};

collection.addElements(10, 20, 30);
console.log(collection.length); // 3
collection.removeElement();
console.log(collection.length); // 2
```

## See also

- Indexed collections guide
- `Array`
- `Array.prototype.push()`
- `Array.prototype.shift()`
- `Array.prototype.unshift()`
- `Array.prototype.concat()`
- `Array.prototype.splice()`
