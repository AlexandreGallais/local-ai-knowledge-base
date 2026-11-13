---
title: "Element: getAttributeNodeNS() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/getattributenodens/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: getAttributeNodeNS() method

The **`getAttributeNodeNS()`** method of the `Element` interface returns the specified namespaced attribute of the specified element, as an `Attr` node. It returns `null` if the element doesn't have an attribute with the given name in the namespace.

This method is useful if you need the namespaced attribute's instance properties.
If you only need the namespaced attribute's value, you can use the `getAttributeNS()` method instead.

If you are working with HTML documents and you don't need to specify the requested attribute as being part of a specific namespace, use the `getAttributeNode()` method instead.

## Syntax

```js
getAttributeNodeNS(namespace, localName)
```

### Parameters

- `namespace`
    A string specifying the namespace of the attribute, or `null` for no explicit namespace.
- `localName`
    A string specifying the name of the attribute.

### Return value

An `Attr` node for the attribute, or `null` if the element doesn't have an attribute with the given name in the namespace.

## See also

- `Document.createAttribute()`
- `Document.createAttributeNS()`
- `Element.setAttributeNodeNS()`
