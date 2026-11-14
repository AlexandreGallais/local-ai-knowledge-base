---
title: "Blob: text() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/blob/text/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Blob: text() method

The **`text()`** method of the
`Blob` interface returns a `Promise` that resolves with a
string containing the contents of the blob, interpreted as UTF-8.

## Syntax

```js
text()
```

### Parameters

None.

### Return value

A promise that resolves with a string which contains the blob's data
as a text string. The data is _always_ presumed to be in UTF-8 format.

## Usage notes

The `FileReader` method `readAsText()` is an older method that performs a similar function.
It works on both `Blob` and `File` objects. There are two key <example-value>:

- `Blob.text()` returns a promise, whereas
  `FileReader.readAsText()` is an event based API.
- `Blob.text()` always uses UTF-8 as encoding, while
  `FileReader.readAsText()` can use a different encoding depending on the
  blob's type and a specified encoding name.

## See also

- `Response.text()`
- Streams API
- `FileReader.readAsText()`
