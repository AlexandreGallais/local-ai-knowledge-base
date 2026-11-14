---
title: "DOMTokenList: contains() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domtokenlist/contains/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMTokenList: contains() method

The **`contains()`** method of the `DOMTokenList` interface
returns a boolean value — `true` if the underlying list contains the given token,
otherwise `false`.

## Syntax

```js
contains(token)
```

### Parameters

- `token`
    A string representing the token
    you want to check for the existence of in the list.

### Return value

A boolean value, which is `true` if the calling list contains
`token`, otherwise `false`.

## Examples

In the following example we retrieve the list of classes set on a
`` element as a `DOMTokenList` using
`Element.classList`. We then test for the existence of `"c"` in
the list, and write the result into the ``'s
`Node.textContent`.

First, the HTML:

```html
<span class="a b c"></span>
```

Now the JavaScript:

```js
const span = document.querySelector("span");
span.textContent = span.classList.contains("c")
  ? "The classList contains 'c'"
  : "The classList does not contain 'c'";
```

The output looks like this:
