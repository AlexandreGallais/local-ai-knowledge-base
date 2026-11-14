---
title: "DOMTokenList: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domtokenlist/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMTokenList: length property

The read-only **`length`** property of the `DOMTokenList` interface is an `integer` representing the number
of objects stored in the object.

## Value

A positive integer, or `0` if the list is empty.

## Examples

In the following example we retrieve the list of classes set on a
`` element as a `DOMTokenList` using
`Element.classList`, then write the length of the list to the
``'s `Node.textContent`.

First, the HTML:

```html
<span class="a b c"></span>
```

Now the JavaScript:

```js
const span = document.querySelector("span");
const classes = span.classList;
const length = classes.length;

span.textContent = `classList length = ${length}`;
```

The output looks like this:
