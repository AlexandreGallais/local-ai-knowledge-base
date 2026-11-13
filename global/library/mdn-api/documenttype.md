---
title: "DocumentType"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documenttype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentType

The **`DocumentType`** interface represents a `Node` containing a doctype.

## Instance properties

_Inherits properties from its parent, `Node`._

- `DocumentType.name` (read-only)
    The type of the document. It is always `"html"` for HTML documents, but will vary for XML documents.
- `DocumentType.publicId` (read-only)
    A string with an identifier of the type of document. Empty if the doctype given specifies no public ID.
- `DocumentType.systemId` (read-only)
    A string containing the URL to the associated DTD. Empty if the doctype given specifies no system ID.

## Instance methods

_Inherits methods from its parent, `Node`._

- `DocumentType.after()`
    Inserts a set of `Node` objects or strings in the children list of the
    object's parent, just after this node.
- `DocumentType.before()`
    Inserts a set of `Node` objects or strings in the children list of the
    object's parent, just before this node.
- `DocumentType.remove()`
    Removes this object from its parent children list.
- `DocumentType.replaceWith()`
    Replaces the document type with a set of given nodes.

## See also

- The DOM interfaces index.
- `DOMImplementation.createDocumentType()` to create a new `DocumentType` node.
