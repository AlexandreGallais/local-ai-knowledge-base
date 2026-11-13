---
title: "URLSearchParams: sort() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlsearchparams/sort/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLSearchParams: sort() method

The **`URLSearchParams.sort()`** method sorts all key/value
pairs contained in this object in place and returns `undefined`. Key/value pairs are sorted by the values of the UTF-16 code units of the keys. This method uses a stable sorting
algorithm (i.e., the relative order between key/value pairs with equal keys will be
preserved).

## Syntax

```js
sort()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
// Create a test URLSearchParams object
const searchParams = new URLSearchParams("c=4&a=2&b=3&a=1");

// Sort the key/value pairs
searchParams.sort();

// Display the sorted query string
console.log(searchParams.toString());
```

The result is:

```plain
a=2&a=1&b=3&c=4
```
