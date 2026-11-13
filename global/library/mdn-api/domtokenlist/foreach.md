---
title: "DOMTokenList: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domtokenlist/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMTokenList: forEach() method

The **`forEach()`** method of the `DOMTokenList` interface
calls the callback given in parameter once for each value pair in the list, in
insertion order.

## Syntax

```js
forEach(callback)
forEach(callback, thisArg)
```

### Parameters

- `callback`
    The function to execute for each element, eventually taking three arguments:
    - `currentValue`
        The current element being processed in the array.
    - `currentIndex`
        The index of the current element being processed in the array.
    - `listObj`
        The array that `forEach()` is being applied to.

- `thisArg` (optional)
    The value to use as `this` when executing `callback`.

### Return value

None.

## Example

In the following example we retrieve the list of classes set on a
`<pre>` element as a `DOMTokenList` using
`Element.classList`. We then retrieve an iterator containing the values
using `forEach()`, writing each one to the `<pre>`'s
`Node.textContent` inside the `forEach()` inner function.

### HTML

```html
<pre class="a b c"></pre>
```

### JavaScript

```js
const pre = document.querySelector("pre");
const classes = pre.classList;
const iterator = classes.values();

classes.forEach(function (value, key, listObj) {
  pre.textContent += `(${value} ${key})/${this}\n`;
}, "arg");
```

## See also

- Polyfill of `DOMTokenList.prototype.forEach` in `core-js`
- `DOMTokenList.entries()`, `DOMTokenList.keys` and `DOMTokenList.values`.
