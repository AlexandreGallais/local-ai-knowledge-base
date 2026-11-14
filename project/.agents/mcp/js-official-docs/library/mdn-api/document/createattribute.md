---
title: "Document: createAttribute() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/createattribute/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: createAttribute() method

The **`createAttribute()`** method of the `Document` interface creates a new attribute node.

The object created is a node implementing the `Attr` interface.
The DOM does not enforce what sort of attributes can be added to a particular element in this manner.

> **Note:**
> The string given in parameter is converted to lowercase.

## Syntax

```js
createAttribute(localName)
```

### Parameters

- `localName`
    A string containing the name of the attribute.
    The value is used to initialize the new attribute's `localName` property.

### Return value

An `Attr` node.

### Exceptions

- `InvalidCharacterError` `DOMException`
    Thrown if the `localName` value is not a valid attribute name.
    It must have at least one character, and may not contain ASCII whitespace, `NULL`, `/`, `=` or `>` (U+0000, U+002F, U+003D, or U+003E, respectively).

    > **Note:**
    > Earlier versions of the specification were more restrictive, requiring that the `localName` be a valid XML name.

## Examples

### Basic <example-value>

```js
const node = document.getElementById("div1");
const a = document.createAttribute("my_attrib");
a.value = "newVal";
node.setAttributeNode(a);
console.log(node.getAttribute("my_attrib")); // "newVal"
```

## See also

- `Document.createAttributeNS()`
- `Document.createElement()`
- `Element.setAttribute()`
- `Element.setAttributeNode()`
