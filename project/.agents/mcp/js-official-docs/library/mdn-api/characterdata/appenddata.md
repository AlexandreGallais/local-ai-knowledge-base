---
title: "CharacterData: appendData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/characterdata/appenddata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CharacterData: appendData() method

The **`appendData()`** method of the `CharacterData` interface
adds the provided data to the end of the node's current data.

## Syntax

```js
appendData(data)
```

### Parameters

- `data`
    The data to append to the current node.

### Return value

None.

## Example

```html
<span>Result: </span>A text
```

```js
const span = document.querySelector("span");
const textNode = span.nextSibling;

textNode.appendData(" - appended text.");
```

## See also

- `CharacterData.deleteData()`, `CharacterData.insertData()`, `CharacterData.replaceData()`
- `CharacterData.data`
