---
title: "CharacterData: substringData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/characterdata/substringdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CharacterData: substringData() method

The **`substringData()`** method of the `CharacterData` interface
returns a portion of the existing data,
starting at the specified index
and extending for a given number of characters afterwards.

## Syntax

```js
substringData(offset, count)
```

### Parameters

- `offset`
    The index of the first character to include in the returned substring.
    `0` is the first character of the string.
- `count`
    The number of characters to return.

### Return value

A string with the substring.

### Exceptions

- `IndexSizeError` `DOMException`
    Thrown if `offset` + `count` is larger than the length of the contained data.
