---
title: "DocumentType: before() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documenttype/before/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentType: before() method

The **`before()`** method of the `DocumentType` interface inserts a set of `Node` objects or strings in the children list of this `DocumentType`'s parent, just before this `DocumentType`. Strings are inserted as equivalent `Text` nodes. Nothing happens if `parentNode` is `null`.

## Syntax

```js
before(param1)
before(param1, param2)
before(param1, param2, /* …, */ paramN)
```

### Parameters

- `param1`, …, `paramN`
    A set of `Node` objects or strings to insert.

### Return value

None (`undefined`).

### Exceptions

- `HierarchyRequestError` `DOMException`
    Thrown when the node cannot be inserted at the specified point in the hierarchy.

## Examples

### Adding a conditional comment

Comment nodes are valid before doctype declarations but not advisable
given they trigger quirks mode in IE. A
conditional comment
works for IE as well, though:

```js
const docType = document.implementation.createDocumentType("html", "", "");
const myDoc = document.implementation.createDocument("", "", docType);

docType.before(
  document.createComment("<!--[if !IE]> conditional comment <![endif]-->"),
);

myDoc.childNodes;
// NodeList [<!--[if !IE]> conditional comment <![endif]-->, <!DOCTYPE html>]
```

## See also

- `DocumentType.after()`
- `CharacterData.before()`
- `Element.before()`
