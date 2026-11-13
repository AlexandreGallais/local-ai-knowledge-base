---
title: "URLSearchParams: toString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlsearchparams/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLSearchParams: toString() method

The **`toString()`** method of the
`URLSearchParams` interface returns a query string suitable for use in a
URL.

> **Note:**
> This method returns the query string without the question mark. This is different from `Location.search`, `HTMLAnchorElement.search`, and `URL.search`, which all include the question mark.

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string, without the question mark. Returns an empty string if no search parameters have been set. Characters in the `application/x-www-form-urlencoded` percent-encode set (which contains all code points except ASCII alphanumeric, `*`, `-`, `.`, and `_`) are percent-encoded, and U+0020 SPACE is encoded as `+`.

## Examples

```js
const url = new URL("https://example.com?foo=1&bar=2");
const params = new URLSearchParams(url.search);

// Add a second foo parameter.
params.append("foo", 4);
console.log(params.toString()); // Prints 'foo=1&bar=2&foo=4'
```

## See also

- The `URL` interface.
- Google Developers: Easy URL manipulation with URLSearchParams
