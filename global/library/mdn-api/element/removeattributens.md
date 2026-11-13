---
title: "Element: removeAttributeNS() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/removeattributens/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: removeAttributeNS() method

The **`removeAttributeNS()`** method of the
`Element` interface removes the specified attribute with the specified namespace from an element.

If you are working with HTML and you don't need to specify the requested attribute as being part of a specific namespace, use the `removeAttribute()` method instead.

## Syntax

```js
removeAttributeNS(namespace, attrName)
```

### Parameters

- `namespace`
    A string that contains the namespace of the attribute.
- `attrName`
    A string that names the attribute to be removed from the
    current node.

### Return value

None (`undefined`).

## Examples

```js
// Given:
//   <div id="div1" xmlns:special="http://www.mozilla.org/ns/specialspace"
//     special:specialAlign="utterleft" width="200px" />
d = document.getElementById("div1");
d.removeAttributeNS("http://www.mozilla.org/ns/specialspace", "specialAlign");
// Now: <div id="div1" width="200px" />
```

## See also

- `Element.hasAttributeNS()`
- `Element.getAttributeNS()`
- `Element.setAttributeNS()`
