---
title: "URLSearchParams: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlsearchparams/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLSearchParams: keys() method

The **`keys()`** method of the `URLSearchParams`
interface returns an `iterator` allowing iteration
through all keys contained in this object. The keys are strings.

## Syntax

```js
keys()
```

### Parameters

None.

### Return value

Returns an `iterator`.

## Examples

```js
// Create a test URLSearchParams object
const searchParams = new URLSearchParams("key1=value1&key2=value2");

// Display the keys
for (const key of searchParams.keys()) {
  console.log(key);
}
```

The result is:

```plain
key1
key2
```

## See also

- The `URL` interface.
