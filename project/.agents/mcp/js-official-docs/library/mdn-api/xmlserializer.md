---
title: "XMLSerializer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlserializer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLSerializer

The `XMLSerializer` interface provides the `serializeToString()` method to construct an XML string representing a DOM tree.

> **Note:**
> The resulting XML string is not guaranteed to be well-formed XML.

## Constructor

- `XMLSerializer()`
    Creates a new `XMLSerializer` object.

## Instance methods

- `serializeToString()`
    Returns the serialized subtree of a string.

## Examples

### Serializing XML into a string

This example just serializes an entire document into a string containing XML.

```js
const s = new XMLSerializer();
const str = s.serializeToString(document);
saveXML(str);
```

This involves creating a new `XMLSerializer` object, then passing the `Document` to be serialized into `serializeToString()`, which returns the XML equivalent of the document. `saveXML()` represents a function that would then save the serialized string.

### Inserting nodes into a DOM based on XML

This example uses the `Element.insertAdjacentHTML()` method to insert a new DOM `Node` into the body of the `Document`, based on XML created by serializing an `Element` object.

> **Note:**
> In the real world, you should usually instead call `importNode()` method to import the new node into the DOM, then call one of the following methods to add the node to the DOM tree:
>
> - The `Element.append()`/`Element.prepend()` and `Document.append()`/`Document.prepend()` methods.
> - The `Element.replaceWith` method (to replace an existing node with the new one)
> - The `Element.insertAdjacentElement()` method.

Because `insertAdjacentHTML()` accepts a string and not a `Node` as its second parameter, `XMLSerializer` is used to first convert the node into a string.

```js
const inp = document.createElement("input");
const XMLS = new XMLSerializer();
const inpSerialized = XMLS.serializeToString(inp); // First convert DOM node into a string

// Insert the newly created node into the document's body
document.body.insertAdjacentHTML("afterbegin", inpSerialized);
```

The code creates a new `` element by calling `Document.createElement()`, then serializes it into XML using `serializeToString()`.

Once that's done, `insertAdjacentHTML()` is used to insert the `` element into the DOM.

## See also

- Parsing and serializing XML
- `DOMParser`
