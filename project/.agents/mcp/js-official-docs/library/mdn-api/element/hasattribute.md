---
title: "Element: hasAttribute() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/hasattribute/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: hasAttribute() method

The **`Element.hasAttribute()`** method returns a
**Boolean** value indicating whether the specified element has the
specified attribute or not.

## Syntax

```js
hasAttribute(name)
```

### Parameters

- `name`
    is a string representing the name of the attribute.

### Return value

A boolean.

## Examples

```js
const foo = document.getElementById("foo");
if (foo.hasAttribute("bar")) {
  // do something
}
```

## See also

- `Element.hasAttributes()`
- `Element.getAttribute()`
- `Element.setAttribute()`
- `Element.removeAttribute()`
- `Element.toggleAttribute()`
