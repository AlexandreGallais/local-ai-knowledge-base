---
title: "URLSearchParams: get() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlsearchparams/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLSearchParams: get() method

The **`get()`** method of the `URLSearchParams`
interface returns the first value associated to the given search parameter.

## Syntax

```js
get(name)
```

### Parameters

- `name`
    The name of the parameter to return.

### Return value

A string if the given search parameter is found; otherwise,
**`null`**.

## Examples

If the URL of your page is `https://example.com/?name=Jonathan&age=18`
you could parse out the 'name' and 'age' parameters using:

```js
let params = new URLSearchParams(document.location.search);
let name = params.get("name"); // is the string "Jonathan"
let age = parseInt(params.get("age"), 10); // is the number 18
```

Requesting a parameter that isn't present in the query string will return
**`null`**:

```js
let address = params.get("address"); // null
```
