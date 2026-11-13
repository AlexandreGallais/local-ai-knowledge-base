---
title: "CharacterData: replaceData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/characterdata/replacedata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CharacterData: replaceData() method

The **`replaceData()`** method of the `CharacterData` interface removes a certain number of characters of the existing text in a given `CharacterData` node and replaces those characters with the text provided.

## Syntax

```js
replaceData(offset, count, data)
```

### Parameters

- `offset`
    The number of characters from the start of the data to insert at.
    `0` is the first character of the string.
- `count`
    The number of characters to replace with the provided data.
- `data`
    The data to insert.

### Return value

None.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if `offset` or `count` is negative or `offset` is greater than the length of the contained data.

## Example

```html
<span>Result: </span>A long string.
```

```js
const span = document.querySelector("span");
const textNode = span.nextSibling;

textNode.replaceData(2, 4, "replaced");
```

## See also

- `CharacterData.appendData()`
- `CharacterData.deleteData()`
- `CharacterData.insertData()`
- `CharacterData.data`
