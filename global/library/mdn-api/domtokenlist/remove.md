---
title: "DOMTokenList: remove() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domtokenlist/remove/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMTokenList: remove() method

The **`remove()`** method of the `DOMTokenList` interface
removes the specified _tokens_ from the list.

## Syntax

```js
remove(token1)
remove(token1, token2)
remove(token1, token2, /* …, */ tokenN)
```

### Parameters

- `token1`, …, `tokenN`
    A string representing the token you want to remove from the list.
    If the string is not in the list, no error is thrown, and nothing happens.

### Return value

None (`undefined`).

## Examples

In the following example we retrieve the list of classes set on a
`` element as a `DOMTokenList` using
`Element.classList`. We then remove a token from the list, and write the
list into the ``'s `Node.textContent`.

First, the HTML:

```html
<span id="ab" class="a b c"></span> <span id="a" class="a b c"></span>
```

Now the JavaScript:

```js
const span = document.getElementById("ab");
const classes = span.classList;
classes.remove("c");
span.textContent = classes;
```

To remove multiple classes at once, you can supply multiple tokens. The order you
supply the tokens doesn't have to match the order they appear in the list:

```js
const span2 = document.getElementById("a");
const classes2 = span2.classList;

classes2.remove("c", "b");
span2.textContent = classes2;
```

The output looks like this:
