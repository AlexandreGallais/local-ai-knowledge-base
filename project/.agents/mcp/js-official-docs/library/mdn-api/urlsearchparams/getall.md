---
title: "URLSearchParams: getAll() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlsearchparams/getall/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLSearchParams: getAll() method

The **`getAll()`** method of the `URLSearchParams`
interface returns all the values associated with a given search parameter as an array.

## Syntax

```js
getAll(name)
```

### Parameters

- `name`
    The name of the parameter to return.

### Return value

An array of strings, which may be empty if no values for the given parameter are found.

## Examples

```js
const url = new URL("https://example.com?foo=1&bar=2");
const params = new URLSearchParams(url.search);

// Add a second foo parameter.
params.append("foo", 4);

console.log(params.getAll("foo")); // ["1", "4"]
```
