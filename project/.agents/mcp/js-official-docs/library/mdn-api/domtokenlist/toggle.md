---
title: "DOMTokenList: toggle() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domtokenlist/toggle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMTokenList: toggle() method

The **`toggle()`** method of the `DOMTokenList` interface
removes an existing token from the list and returns `false`.
If the token doesn'<example-value>'s added and the function returns `true`.

## Syntax

```js
toggle(token)
toggle(token, force)
```

### Parameters

- `token`
    A string representing the token you want to toggle.
- `force` (optional)
    If included, turns the toggle into a one way-only operation.
    If set to `false`, then `token` will _only_ be removed, but not added.
    If set to `true`, then `token` will _only_ be added, but not removed.

### Return value

A boolean value, `true` or `false`, indicating whether `token` is in the
list after the call or not.

## Examples

### Toggling a class on click

In the following example we retrieve the list of classes set on a
`` element as a `DOMTokenList` using
`Element.classList`. We then replace a token in the list, and write the
list into the ``'s `Node.textContent`.

First, the HTML:

```html
<span class="a b">classList is 'a b'</span>
```

Now the JavaScript:

```js
const span = document.querySelector("span");
const classes = span.classList;

span.addEventListener("click", () => {
  const result = classes.toggle("c");
  span.textContent = `'c' ${
    result ? "added" : "removed"
  }; classList is now "${classes}".`;
});
```

The output looks like this and it will change each time you click on the text:

### Setting the force parameter

The second parameter can be used to determine whether the class is included or not. This example would include the 'c' class only if the browser window is over 1000 pixels wide:

```js
span.classList.toggle("c", window.innerWidth > 1000);
```
