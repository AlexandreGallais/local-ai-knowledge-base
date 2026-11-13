---
title: "DOMTokenList: add() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domtokenlist/add/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMTokenList: add() method

The **`add()`** method of the `DOMTokenList` interface adds the given tokens to the list, omitting any that are already present.

## Syntax

```js
add(token1)
add(token1, token2)
add(token1, token2, /* …, */ tokenN)
```

### Parameters

- `tokenN`
    A string representing a token (or tokens) to add to the `DOMTokenList`.

### Return value

None.

### Exceptions

- `SyntaxError` `DOMException`
    Thrown if one of the arguments is an empty string
- `InvalidCharacterError` `DOMException`
    Thrown if a token <example-value> ASCII whitespace.

## Examples

In the following example, we retrieve the list of classes set on a `` element as a `DOMTokenList`, using `Element.classList`.
We then add a new token to the list, and write the list into the ``'s `Node.textContent`.

First, the HTML:

```html
<span class="a b c"></span>
```

Now the JavaScript:

```js
const span = document.querySelector("span");
const classes = span.classList;
classes.add("d");
span.textContent = classes;
```

The output looks like this:

You can add multiple tokens as well:

```js
span.classList.add("d", "e", "f");
```
