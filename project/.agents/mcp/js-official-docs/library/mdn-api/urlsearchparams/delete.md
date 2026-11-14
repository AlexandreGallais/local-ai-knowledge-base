---
title: "URLSearchParams: delete() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlsearchparams/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLSearchParams: delete() method

The **`delete()`** method of the `URLSearchParams` interface deletes specified parameters and their associated value(s) from the list of all search parameters.

A parameter name and optional value are used to match parameters.
If only a parameter name is specified, then all search parameters that match the name are deleted, along with their associated values.
If both a parameter name and value are specified, then all search parameters that match both the parameter name and value are deleted.

## Syntax

```js
delete(name)
delete(name, value)
```

### Parameters

- `name`
    The name of the parameters to be deleted.
- `value` (optional)
    The value that parameters must match, along with the given name, to be deleted.

### Return value

None (`undefined`).

## Examples

### Delete all parameters with specified name

This example shows how to delete all query parameters (and values) that have a particular name.

```js
const url = new URL("https://example.com?foo=1&bar=2&foo=3");
const params = new URLSearchParams(url.search);
console.log(`Query string (before):\t ${params}`);
params.delete("foo");
console.log(`Query string (after):\t ${params}`);
```

The log below shows that all parameters that have the name of `foo` are deleted.

```plain
Query string (before):  foo=1&bar=2&foo=3
Query string (after):   bar=2
```

### Delete parameters with specified name and value

This example shows how to delete query parameters that match a particular name and value.

```js
const url = new URL("https://example.com?foo=1&bar=2&foo=3&foo=1");
const params = new URLSearchParams(url.search);
console.log(`Query string (before):\t ${params}`);
params.delete("foo", "1");
console.log(`Query string (after):\t ${params}`);
```

All parameters that match both the parameter `name` and `value` should be deleted (there is no reason to specify two parameters with the same name and value as shown above).

```plain
Query string (before):  foo=1&bar=2&foo=3&foo=1
Query string (after):   bar=2&foo=3
```

If your browser supports the `value` option, the "after" string should be `bar=2&foo=3`.
Otherwise the result will be the same as in the previous example (`bar=2`).

## See also

- Polyfill of `URLSearchParams` in `core-js`
