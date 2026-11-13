---
title: "URL: toString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/url/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URL: toString() method

The **`toString()`** method of the `URL` interface returns a string containing the whole URL, which is the same value as `URL.href`.

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string.

## Examples

```js
const url = new URL(
  "https://developer.mozilla.org/en-US/docs/Web/API/URL/toString",
);
url.toString(); // should return the URL as a string
```

## See also

- The `URL` interface it belongs to.
