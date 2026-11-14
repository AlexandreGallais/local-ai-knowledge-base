---
title: "NodeList: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/nodelist/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NodeList: forEach() method

The **`forEach()`** method of the `NodeList`
interface calls the callback given in parameter once for each value pair in the list, in
insertion order.

## Syntax

```js
forEach(callback)
forEach(callback, thisArg)
```

### Parameters

- `callback`
    A function to execute on each element of `someNodeList`. It
    accepts 3 parameters:
    - `currentValue`
        The current element being processed in `someNodeList`.
    - `currentIndex` (optional)
        The index of the `currentValue` being processed in
        `someNodeList`.
    - `listObj` (optional)
        The `someNodeList` that `forEach()` is being
        applied to.

- `thisArg` (optional)
    Value to use as
    `this`
    when executing `callback`.

### Return value

`undefined`.

## Example

```js
const node = document.createElement("div");
const kid1 = document.createElement("p");
const kid2 = document.createTextNode("hey");
const kid3 = document.createElement("span");

node.appendChild(kid1);
node.appendChild(kid2);
node.appendChild(kid3);

const list = node.childNodes;

list.forEach(function (currentValue, currentIndex, listObj) {
  console.log(`${currentValue}, ${currentIndex}, ${this}`);
}, "myThisArg");
```

The above code results in the following:

```plain
[object HTMLParagraphElement], 0, myThisArg
[object Text], 1, myThisArg
[object HTMLSpanElement], 2, myThisArg
```

## See also

- Polyfill of `NodeList.prototype.forEach` in `core-js`
- `Node`
- `NodeList`
