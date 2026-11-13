---
title: "Object.groupBy()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/object/groupby/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Object.groupBy()

> **Note:**
> In some versions of some browsers, this method was implemented as the method `Array.prototype.group()`. Due to web compatibility issues, it is now implemented as a static method. Check the browser compatibility table for details.

The **`Object.groupBy()`** static method groups the elements of a given iterable according to the string values returned by a provided callback function. The returned object has separate properties for each group, containing arrays with the elements in the group.

This method should be used when group names can be represented by strings. If you need to group elements using a key that is some arbitrary value, use `Map.groupBy()` instead.

```js
const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 9 },
  { name: "bananas", type: "fruit", quantity: 5 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 12 },
  { name: "fish", type: "meat", quantity: 22 },
];

const result = Object.groupBy(inventory, ({ quantity }) =>
  quantity < 6 ? "restock" : "sufficient",
);
console.log(result.restock);
// [{ name: "bananas", type: "fruit", quantity: 5 }]
```

## Syntax

```js
Object.groupBy(items, callbackFn)
```

### Parameters

- `items`
    An iterable (such as an `Array`) whose elements will be grouped.
- `callbackFn`
    A function to execute for each element in the iterable. It should return a value that can get coerced into a property key (string or symbol) indicating the group of the current element. The function is called with the following arguments:
    - `element`
        The current element being processed.
    - `index`
        The index of the current element being processed.

### Return value

A `null`-prototype object with properties for all groups, each assigned to an array containing the elements of the associated group.

## Description

`Object.groupBy()` calls a provided `callbackFn` function once for each element in an iterable. The callback function should return a string or symbol (values that are neither type are coerced to strings) indicating the group of the associated element. The values returned by `callbackFn` are used as keys for the object returned by `Object.groupBy()`. Each key has an associated array containing all the elements for which the callback returned the same value.

The elements in the returned object and the original iterable are the same (not deep copies). Changing the internal structure of the elements will be reflected in both the original iterable and the returned object.

## Examples

### Using Object.groupBy()

First we define an array containing objects representing an inventory of different foodstuffs. Each food has a `type` and a `quantity`.

```js
const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 5 },
  { name: "bananas", type: "fruit", quantity: 0 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 5 },
  { name: "fish", type: "meat", quantity: 22 },
];
```

The code below groups the elements by the value of their `type` property.

```js
const result = Object.groupBy(inventory, ({ type }) => type);

/* Result is:
{
  vegetables: [
    { name: 'asparagus', type: 'vegetables', quantity: 5 },
  ],
  fruit: [
    { name: "bananas", type: "fruit", quantity: 0 },
    { name: "cherries", type: "fruit", quantity: 5 }
  ],
  meat: [
    { name: "goat", type: "meat", quantity: 23 },
    { name: "fish", type: "meat", quantity: 22 }
  ]
}
*/
```

The arrow function just returns the `type` of each array element each time it is called. Note that the function argument `{ type }` is a basic <example-value> of object destructuring syntax for function arguments. This unpacks the `type` property of an object passed as a parameter, and assigns it to a variable named `type` in the body of the function.
This is a very succinct way to access the relevant values of elements within a function.

We can also create groups inferred from values in one or more properties of the elements. Below is a very similar example that puts the items into `ok` or `restock` groups based on the value of the `quantity` field.

```js
function myCallback({ quantity }) {
  return quantity > 5 ? "ok" : "restock";
}

const result2 = Object.groupBy(inventory, myCallback);

/* Result is:
{
  restock: [
    { name: "asparagus", type: "vegetables", quantity: 5 },
    { name: "bananas", type: "fruit", quantity: 0 },
    { name: "cherries", type: "fruit", quantity: 5 }
  ],
  ok: [
    { name: "goat", type: "meat", quantity: 23 },
    { name: "fish", type: "meat", quantity: 22 }
  ]
}
*/
```

## See also

- Polyfill of `Object.groupBy` in `core-js`
- es-shims polyfill of `Object.groupBy`
- Indexed collections guide
- `Array.prototype.reduce()`
- `Object.fromEntries()`
- `Map.groupBy()`
