---
title: "XMLSerializer: serializeToString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlserializer/serializetostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLSerializer: serializeToString() method

The `XMLSerializer` method
**`serializeToString()`** constructs a string representing the
specified DOM tree in XML form.

## Syntax

```js
serializeToString(rootNode)
```

### Parameters

- `rootNode`
    The `Node` to use as the root of the DOM tree or subtree for which to
    construct an XML representation.

### Return value

A string containing the XML representation of the specified DOM tree.

### Exceptions

- `TypeError`
    Thrown if the specified `rootNode` is not a compatible node type. The root node
    must be either `Node` or `Attr`.
- `InvalidStateError` `DOMException`
    Thrown if the tree could not be successfully serialized, probably due to issues with the
    content's compatibility with XML serialization.
- `SyntaxError` `DOMException`
    Thrown if a serialization of HTML was requested but could not succeed due to the content not
    being well-formed.

## Usage notes

### Compatible node types

The specified root node—and all of its descendants—must be compatible with the XML
serialization algorithm. The root node itself must be either a `Node` or
`Attr` object.

The following types are also permitted as descendants of the root node, in addition to
`Node` and `Attr`:

- `DocumentType`
- `Document`
- `DocumentFragment`
- `Element`
- `Comment`
- `Text`
- `ProcessingInstruction`
- `Attr`

If any other type is encountered, a `TypeError` exception is thrown.

### Notes on the resulting XML

There are some things worth noting about the XML output by
`serializeToString()`:

- For XML serializations, `Element` and `Attr` nodes are always
  serialized with their `namespaceURI` intact. This
  may mean that a previously-specified `prefix` or default
  namespace may be dropped or altered.
- The resulting XML is compatible with the HTML parser.
- Elements in the HTML namespace that have no child nodes (thereby representing empty
  tags) are serialized with both begin and end tags
  (`"<someelement></someelement>"`) instead of using the
  empty-element tag (`"<someelement/>"`).

## See also

- Parsing and serializing XML
- Serializing to HTML: `Element.innerHTML` and
  `Element.outerHTML`
- Parsing HTML or XML to create a DOM tree: `DOMParser`
