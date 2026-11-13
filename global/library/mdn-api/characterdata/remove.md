---
title: "CharacterData: remove() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/characterdata/remove/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CharacterData: remove() method

The **`remove()`** method of the `CharacterData` interface removes the `CharacterData` node from its parent node. Nothing happens if `parentNode` is `null`.

## Syntax

```js
remove()
```

### Parameters

None.

### Return value

None (`undefined`).

## Example

### Using `remove()`

```html
<span>Result: </span>A long string.
```

```js
const span = document.querySelector("span");
const textNode = span.nextSibling;

textNode.remove(); // Removes the text
```

## See also

- `CharacterData.deleteData()`
- `DocumentType.remove()`
- `Element.remove()`
