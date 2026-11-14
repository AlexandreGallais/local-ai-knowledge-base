---
title: "DOMTokenList: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domtokenlist/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMTokenList: entries() method

The **`entries()`** method of the `DOMTokenList` interface
returns an `iterator` allowing you
to go through all key/value pairs contained in this object. The values are
`Array`s which have [key, value] pairs, each representing a single token.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

Returns an `iterator`.

## Examples

In the following example we retrieve the list of classes set on a
`` element as a `DOMTokenList` using
`Element.classList`. We then retrieve an iterator containing the key/value
pairs using `entries()`, then iterate through each one using a
`for...of` loop, writing them to the
``'s `Node.textContent`.

First, the HTML:

```html
<span class="a b c"></span>
```

Now the JavaScript:

```js
const span = document.querySelector("span");
const classes = span.classList;
const iterator = classes.entries();

for (const value of iterator) {
  span.textContent += `(${value})`;
}
```

The output looks like this:

## See also

- Polyfill of `DOMTokenList.prototype.entries` in `core-js`
- `DOMTokenList.foreach()`, `DOMTokenList.keys` and `DOMTokenList.values`.
