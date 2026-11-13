---
title: "URLSearchParams: append() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlsearchparams/append/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLSearchParams: append() method

The **`append()`** method of the `URLSearchParams`
interface appends a specified key/value pair as a new search parameter.

As shown in the example below, if the same key is appended multiple times it will
appear in the parameter string multiple times for each value.

## Syntax

```js
append(name, value)
```

### Parameters

- `name`
    The name of the parameter to append.
- `value`
    The value of the parameter to append.

### Return value

None (`undefined`).

## Examples

### Adding the same parameter multiple times

```js
const url = new URL("https://example.com?foo=1&bar=2");
const params = new URLSearchParams(url.search);

// Add a second foo parameter.
params.append("foo", 4);
// Query string is now: 'foo=1&bar=2&foo=4'
```

## See also

- `URL`
- Google Developers: Easy URL manipulation with URLSearchParams
