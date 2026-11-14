---
title: "Set.prototype.add()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/set/add/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Set.prototype.add()

The **`add()`** method of `Set` instances inserts the specified value into this set, if it is not already present.

```js
const set = new Set();

set.add(42);
set.add(42);
set.add(13);

for (const item of set) {
  console.log(item);
  // Expected output: 42
  // Expected output: 13
}
```

## Syntax

```js
add(value)
```

### Parameters

- `value`
    The value to add to the `Set` object. Objects are compared by reference, not by value.

### Return value

The `Set` object.

## Examples

### Using add()

```js
const mySet = new Set();

mySet.add(1);
mySet.add(5).add("some text"); // chainable

console.log(mySet);
// Set [1, 5, "some text"]
```

## See also

- `Set`
- `Set.prototype.delete()`
- `Set.prototype.has()`
