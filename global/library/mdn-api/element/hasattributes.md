---
title: "Element: hasAttributes() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/hasattributes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: hasAttributes() method

The **`hasAttributes()`** method of the `Element`
interface returns a boolean value indicating whether the current element has any
attributes or not.

## Syntax

```js
hasAttributes()
```

### Parameters

None.

### Return value

A boolean.

## Examples

```js
let foo = document.getElementById("foo");
if (foo.hasAttributes()) {
  // Do something with 'foo.attributes'
}
```

## See also

- `Element.attributes`
- `Element.hasAttribute()`
- `Element.getAttribute()`
- `Element.setAttribute()`
- `Element.removeAttribute()`
- `Element.toggleAttribute()`
