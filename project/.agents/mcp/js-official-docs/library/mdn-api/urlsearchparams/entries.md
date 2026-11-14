---
title: "URLSearchParams: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlsearchparams/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLSearchParams: entries() method

The **`entries()`** method of the
`URLSearchParams` interface returns an
`iterator` allowing iteration through all key/value
pairs contained in this object. The iterator returns key/value pairs in the same order as they appear in the query string. The key and value of each pair are strings.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

Returns an `iterator`.

## Examples

```js
// Create a test URLSearchParams object
const searchParams = new URLSearchParams("key1=value1&key2=value2");

// Display the key/value pairs
for (const [key, value] of searchParams.entries()) {
  console.log(`${key}, ${value}`);
}
```

The result is:

```plain
key1, value1
key2, value2
```

## See also

- The `URL` interface.
