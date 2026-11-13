---
title: "Element: hasAttributeNS() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/hasattributens/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: hasAttributeNS() method

The **`hasAttributeNS()`** method of the `Element` interface returns a boolean value indicating whether the current element has the specified attribute with the specified namespace.

If you are working with HTML documents and you don't need to specify the requested attribute as being part of a specific namespace, use the `hasAttribute()` method instead.

## Syntax

```js
hasAttributeNS(namespace,localName)
```

### Parameters

- `namespace`
    A string specifying the namespace of the attribute.
- `localName`
    The name of the attribute.

### Return value

A boolean.

## Examples

```js
// Check that the attribute exists before you set a value
const d = document.getElementById("div1");
if (
  d.hasAttributeNS("http://www.mozilla.org/ns/specialspace/", "special-align")
) {
  d.setAttribute("align", "center");
}
```

## See also

- `Element.getAttributeNS()`
- `Element.setAttributeNS()`
- `Element.removeAttributeNS()`
