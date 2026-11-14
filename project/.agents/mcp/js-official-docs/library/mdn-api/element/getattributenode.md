---
title: "Element: getAttributeNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/getattributenode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: getAttributeNode() method

The **`getAttributeNode()`** method of the `Element` interface returns the specified attribute of the specified element, as an `Attr` node. It returns `null` if the element doesn't have an attribute with the given name.

This method is useful if you need the attribute's instance properties.
If you only need the attribute's value, you can use the `getAttribute()` method instead.

## Syntax

```js
getAttributeNode(attrName)
```

### Parameters

- `attrName`
    A string specifying the name of the attribute. When called on an HTML element in a DOM flagged as an HTML document, the name is normalized to lowercase.

### Return value

An `Attr` node for the attribute, or `null` if the element doesn't have an attribute with the given name.

> **Note:**
> The `Attr` node inherits from `Node`, but is not considered a part of the document tree. Common `Node` attributes like `parentNode`, `previousSibling`, and `nextSibling` are `null` for an `Attr` node. You can, however, get the element to which the attribute belongs with the `ownerElement` property.

## Examples

```js
// html: <div id="top" />
const t = document.getElementById("top");
const idAttr = t.getAttributeNode("id");
console.log(idAttr.value); // "top"
```

## See also

- `Document.createAttribute()`
- `Element.setAttributeNode()`
- `Element.removeAttributeNode()`
