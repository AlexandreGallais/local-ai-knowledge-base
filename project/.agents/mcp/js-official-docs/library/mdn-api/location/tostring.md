---
title: "Location: toString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/location/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Location: toString() method

The **`toString()`** stringifier method of the `Location` interface returns a string containing the whole URL, which is the same value as `Location.href`.

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string representing the object's URL.

## Examples

```js
// Let's imagine this code is executed on https://example.com/path?search#hash
const result = window.location.toString(); // Returns: 'https://example.com/path?search#hash'
```
