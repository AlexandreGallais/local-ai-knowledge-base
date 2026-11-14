---
title: "DOMTokenList: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domtokenlist/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMTokenList: value property

The **`value`** property of the `DOMTokenList`
interface is a stringifier that returns the value of the list serialized as a
string, or clears and sets the list to the given value.

## Value

A string representing the serialized content of the list.
Each item is separated by a space.

## Examples

In the following example we retrieve the list of classes set on a
`` element as a `DOMTokenList` using
`Element.classList`, then write the value of the list to the
``'s `Node.textContent`.

First, the HTML:

```html
<span class="a b c"></span>
```

Now the JavaScript:

```js
const span = document.querySelector("span");
const classes = span.classList;
span.textContent = classes.value;
```

The output looks like this:
