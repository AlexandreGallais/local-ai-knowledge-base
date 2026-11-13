---
title: "CharacterData: insertData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/characterdata/insertdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CharacterData: insertData() method

The **`insertData()`** method of the `CharacterData` interface
inserts the provided data into this `CharacterData` node's current data,
at the provided offset from the start of the existing data.
The provided data is spliced into the existing data.

## Syntax

```js
insertData(offset, data)
```

### Parameters

- `offset`
    The offset number of characters to insert the provided data at.
    `0` is the first character of the string.
- `data`
    The data to insert.

### Return value

None.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if offset is negative or greater than the length of the contained data.

## Example

```html
<span>Result: </span>A string.
```

```js
const span = document.querySelector("span");
const textNode = span.nextSibling;

textNode.insertData(2, "long ");
```

## See also

- `CharacterData.appendData()`, `CharacterData.deleteData()`, `CharacterData.replaceData()`
- `CharacterData.data`
