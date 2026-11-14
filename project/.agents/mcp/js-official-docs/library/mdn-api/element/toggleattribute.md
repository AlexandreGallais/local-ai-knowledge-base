---
title: "Element: toggleAttribute() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/toggleattribute/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: toggleAttribute() method

The **`toggleAttribute()`** method of the `Element` interface toggles a Boolean attribute on the given element, removing it if present and adding it if not present.

## Syntax

```js
toggleAttribute(name)
toggleAttribute(name, force)
```

### Parameters

- `name`
    A string specifying the name of the attribute to be toggled.
    The attribute name is automatically converted to all lower-case when `toggleAttribute()` is called on an HTML element in an HTML document.
- `force` (optional)
    A boolean value which has the following effects:
    - if not specified at all, the `toggleAttribute` method "toggles" the attribute named `name` — removing it if it is present, or else adding it if it is not present
    - if true, the `toggleAttribute` method adds an attribute named `name`
    - if false, the `toggleAttribute` method removes the attribute named `name`

### Return value

`true` if attribute **`name`** is eventually
present, and `false` otherwise.

### Exceptions

- `InvalidCharacterError` `DOMException`
    The specified attribute `name` contains one or more characters that are not valid in attribute names.
    The `name` must have at least one character, and may not contain ASCII whitespace, `NULL`, `/`, `=` or `>` (U+0000, U+002F, U+003D, or U+003E, respectively).

## Examples

### Basic usage

In the following example, `toggleAttribute()` is used to toggle the `disabled` attribute of an ``.

### HTML

```html
<input value="text" /> <button>toggleAttribute("disabled")</button>
```

### JavaScript

```js
const button = document.querySelector("button");
const input = document.querySelector("input");

button.addEventListener("click", () => {
  input.toggleAttribute("disabled");
});
```

## See also

- `Element.hasAttribute()`
- `Element.getAttribute()`
- `Element.removeAttribute()`
- `Element.setAttribute()`
