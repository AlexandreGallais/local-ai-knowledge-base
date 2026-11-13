---
title: "Document: createAttributeNS() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/createattributens/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: createAttributeNS() method

The **`createAttributeNS()`** method of the `Document` interface creates a new attribute node with the specified namespace URI and qualified name.

The object created is a node implementing the `Attr` interface.
The DOM does not enforce what sort of attributes can be added to a particular element in this manner.

## Syntax

```js
createAttributeNS(namespaceURI, qualifiedName)
```

### Parameters

- `namespaceURI`
    A string that specifies the `namespaceURI` to associate with the attribute, or the empty string.
    In HTML documents, most attributes are in the **null namespace** — use the empty string for these.
    Use a specific namespace URI only when creating a namespaced attribute, such as `xml:lang` or `xml:space`.
    Some namespace URIs are:
    - XML: `http://www.w3.org/XML/1998/namespace` (for `xml:lang`, `xml:space`)
    - XMLNS: `http://www.w3.org/2000/xmlns/` (for `xmlns`, `xmlns:*`)
    - XLink: `http://www.w3.org/1999/xlink` (for `xlink:href`, `xlink:title`, etc.)
- `qualifiedName`
    A string containing the qualified name of the new attribute.
    The `name` property of the created attribute is initialized with this value.

    The format of the qualified name is `prefix:localName` or `localName`, where the parts are defined as:
    - `prefix` (optional)
        A "short alias" for the namespace.
        The prefix is optional, but if it is specified the `namespaceURI` parameter must also be specified.
        If the prefix is set to `xml` or `xmlns`, the `namespaceURI` must be set to `http://www.w3.org/XML/1998/namespace` or `http://www.w3.org/2000/xmlns/`, respectively.

        The value is used to initialize the new attribute's `prefix` property.
        Defaults to `null`.

    - `localName`
        The local name of the attribute.
        The value is used to initialize the new attribute's `localName` property.

### Return value

The new `Attr` node.

### Exceptions

- `NamespaceError` `DOMException`
    Thrown if the `namespaceURI` value is:
    - not a valid namespace URI.
    - set to the empty string when `prefix` has a value.
    - not the value `http://www.w3.org/XML/1998/namespace` or `http://www.w3.org/2000/xmlns/` when `prefix` is set to `xml` or `xmlns`, respectively.
- `InvalidCharacterError` `DOMException`
    Thrown if either the `prefix` or `localName` is not valid:
    - The `prefix` must have at least one character, and cannot contain ASCII whitespace, `NULL`, `/`, or `>` (U+0000, U+002F, or U+003E, respectively).
    - The `localName` must have at least one character, and may not contain ASCII whitespace, `NULL`, `/`, `=` or `>` (U+0000, U+002F, U+003D, or U+003E, respectively).

    > **Note:**
    > Earlier versions of the specification were more restrictive, requiring that the `localName` be a valid XML name.

## Examples

### Creating a namespaced attribute

This example creates an `xml:lang` attribute with the XML namespace and attaches it to a paragraph element.
This attribute specifies the language of the element's content for XML processing.

```html
<p id="greeting">Bonjour!</p>
```

```js
const el = document.getElementById("greeting");
const attr = document.createAttributeNS(
  "http://www.w3.org/XML/1998/namespace",
  "xml:lang",
);
attr.value = "fr";
el.setAttributeNode(attr);
```

### Creating an unprefixed attribute

In HTML documents, unprefixed attributes (such as SVG presentation attributes like `viewBox`) are in the null namespace.
Use the empty string for the `namespaceURI` parameter to match this.

```html
<svg id="svg"></svg>
```

```js
const svg = document.getElementById("svg");
const attr = document.createAttributeNS("", "viewBox");
attr.value = "0 0 100 100";
svg.setAttributeNode(attr);
console.log(svg.getAttribute("viewBox")); // "0 0 100 100"
```

Note that, in most cases, you can use `Element.setAttribute()` instead of `createAttributeNS()` for unprefixed attributes:

```js
svg.setAttribute("viewBox", "0 0 100 100");
```

## See also

- `Document.createAttribute()`
- `Document.createElementNS()`
- `Element.setAttributeNS()`
- `Element.setAttributeNode()`
- `Element.setAttributeNodeNS()`
