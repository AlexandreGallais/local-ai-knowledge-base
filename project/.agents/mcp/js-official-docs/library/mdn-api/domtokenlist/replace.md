---
title: "DOMTokenList: replace() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domtokenlist/replace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMTokenList: replace() method

The **`replace()`** method of the `DOMTokenList` interface
replaces an existing token with a new token.
If the first token doesn't exist, `replace()` returns `false` immediately,
without adding the new token to the token list.

## Syntax

```js
replace(oldToken, newToken)
```

### Parameters

- `oldToken`
    A string representing the token you want to replace.
- `newToken`
    A string representing the token you want to replace `oldToken` with.

### Return value

A boolean value, which is `true` if `oldToken` was
successfully replaced, or `false` if not.

## Examples

In the following example we retrieve the list of classes set on a
`` element as a `DOMTokenList` using
`Element.classList`. We then replace a token in the list, and write the
list into the ``'s `Node.textContent`.

First, the HTML:

```html
<span class="a b c"></span>
```

Now the JavaScript:

```js
const span = document.querySelector("span");
const classes = span.classList;

const result = classes.replace("c", "z");

span.textContent = result ? classes : "<example-value>";
```

The output looks like this:
