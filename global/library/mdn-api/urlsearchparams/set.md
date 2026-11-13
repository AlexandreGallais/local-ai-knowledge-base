---
title: "URLSearchParams: set() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlsearchparams/set/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLSearchParams: set() method

The **`set()`** method of the `URLSearchParams`
interface sets the value associated with a given search parameter to the given value.
If there were several matching values, this method deletes the others. If the search
parameter doesn't exist, this method creates it.

## Syntax

```js
set(name, value)
```

### Parameters

- `name`
    The name of the parameter to set.
- `value`
    The value of the parameter to set.

### Return value

None (`undefined`).

## Examples

```js
let url = new URL("https://example.com?foo=1&bar=2");
let params = new URLSearchParams(url.search);

// Add a third parameter.
params.set("baz", 3);
params.toString(); // "foo=1&bar=2&baz=3"
```
