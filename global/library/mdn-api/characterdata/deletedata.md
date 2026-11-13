---
title: "CharacterData: deleteData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/characterdata/deletedata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CharacterData: deleteData() method

The **`deleteData()`** method of the `CharacterData` interface
removes all or part of the data from this `CharacterData` node.

## Syntax

```js
deleteData(offset, count)
```

### Parameters

- `offset`
    The number of bytes from the start of the data to remove from.
    `0` is the first character of the string.
- `count`
    The number of bytes to remove.

### Return value

None.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if `offset` is greater than the length of the contained data.

## Example

```html
<span>Result: </span>A long string.
```

```js
const span = document.querySelector("span");
const textNode = span.nextSibling;

textNode.deleteData(1, 5);
```

## See also

- `CharacterData.appendData()`, `CharacterData.insertData()`, `CharacterData.replaceData()`
- `CharacterData.data`
