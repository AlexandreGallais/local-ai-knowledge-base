---
title: "DocumentType: after() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documenttype/after/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentType: after() method

The **`after()`** method of the `DocumentType` interface inserts a set of `Node` objects or strings in the children list of the `DocumentType`'s parent, just after the `DocumentType`. Strings are inserted as equivalent `Text` nodes. Nothing happens if `parentNode` is `null`.

## Syntax

```js
after(param1)
after(param1, param2)
after(param1, param2, /* …, */ paramN)
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

```js
const docType = document.implementation.createDocumentType("html", "", "");
const myDoc = document.implementation.createDocument("", "", docType);

docType.after(document.createElement("html"));

myDoc.childNodes;
// NodeList [<!DOCTYPE html>, <html>]
```

## See also

- `DocumentType.before()`
- `CharacterData.after()`
- `Element.after()`
