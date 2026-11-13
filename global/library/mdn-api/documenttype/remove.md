---
title: "DocumentType: remove() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documenttype/remove/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentType: remove() method

The **`remove()`** method of the `DocumentType` interface removes the `DocumentType` node from its parent node. Nothing happens if `parentNode` is `null`.

## Syntax

```js
remove()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Using `remove()`

```js
document.doctype; // "<!doctype html>'
document.doctype.remove();
document.doctype; // null
```

## See also

- `Document.doctype`
- `CharacterData.remove()`
- `Element.remove()`
