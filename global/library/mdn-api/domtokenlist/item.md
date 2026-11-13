---
title: "DOMTokenList: item() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domtokenlist/item/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMTokenList: item() method

The **`item()`** method of the `DOMTokenList` interface returns an item in the list,
determined by its position in the list, its index.

> **Note:**
> This method is equivalent as the bracket notation.
> So `list.item(i)` is the same as `list[i]`.

## Syntax

```js
item(index)
```

### Parameters

- `index`
    A number representing the index of the item you want to return. If it isn't an integer, only the integer part is considered.

### Return value

A string representing the returned item,
or `null` if the number is greater than or equal to the `length` of the list.

### Exceptions

- `TypeError`
    Thrown if the `index` cannot be converted to an integer.

## Examples

In the following example we retrieve the list of classes set on a
`` element as a `DOMTokenList` using
`Element.classList`. We then retrieve the last item in the list using
`item(tokenList.length - 1)`, and write it into the
``'s `Node.textContent`.

First, the HTML:

```html
<span class="a b c"></span>
```

Now the JavaScript:

```js
const span = document.querySelector("span");
const classes = span.classList;
const item = classes.item(classes.length - 1);
span.textContent = item;
```

The output looks like this:
