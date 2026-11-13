---
title: "Element: removeAttributeNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/removeattributenode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: removeAttributeNode() method

The **`removeAttributeNode()`** method of the `Element` interface removes the specified `Attr` node from the element.

If you don't need to inspect the attribute node before removing it, you can use the `Element.removeAttribute()` method instead.

## Syntax

```js
removeAttributeNode(attributeNode)
```

### Parameters

- `attributeNode`
    The attribute node to remove from the element.

### Return value

The attribute node that was removed.

### Exceptions

- `NotFoundError` `DOMException`
    Thrown when the element's attribute list does not contain the attribute node.

## Examples

```js
// Given: <div id="foo" lang="en-US" />
const d = document.getElementById("foo");
const dLang = d.getAttributeNode("lang");
d.removeAttributeNode(dLang);
// lang is now removed: <div id="foo" />
```

## Notes

If the removed attribute has a default value, it is immediately replaced. The replacing
attribute has the same namespace URI and local name, as well as the original prefix,
when applicable.

There is no `removeAttributeNodeNS` method; the
`removeAttributeNode` method can remove both namespaced attributes and
non-namespaced attributes.

## See also

- `Document.createAttribute()`
- `Element.getAttributeNode()`
- `Element.setAttributeNode()`
