---
title: "DOMTokenList: values() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domtokenlist/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMTokenList: values() method

The **`values()`** method of the `DOMTokenList` interface
returns an `iterator`
allowing the caller to go through all values contained in the `DOMTokenList`.
The individual values are strings.

## Syntax

```js
values()
```

### Parameters

None.

### Return value

Returns an `iterator`.

## Examples

In the following example we retrieve the list of classes set on a
`` element as a `DOMTokenList` using
`Element.classList`. We then retrieve an iterator containing the values
using `values()`, then iterate through those values using a for...of loop,
writing each one to the ``'s `Node.textContent`.

First, the HTML:

```html
<span class="a b c"></span>
```

Now the JavaScript:

```js
const span = document.querySelector("span");
const classes = span.classList;
const iterator = classes.values();

for (const value of iterator) {
  span.textContent += `(${value}) `;
}
```

The output looks like this:

## See also

- Polyfill of `DOMTokenList.prototype.values` in `core-js`
