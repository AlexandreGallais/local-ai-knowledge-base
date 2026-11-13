---
title: "URLSearchParams: has() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlsearchparams/has/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLSearchParams: has() method

The **`has()`** method of the `URLSearchParams` interface returns a boolean value that indicates whether the specified parameter is in the search parameters.

A parameter name and optional value are used to match parameters.
If only a parameter name is specified, then the method will return `true` if any parameters in the query string match the name, and `false` otherwise.
If both a parameter name and value are specified, then the method will return `true` if a parameter matches both the name and value.

## Syntax

```js
has(name)
has(name, value)
```

### Parameters

- `name`
    The name of the parameter to match.
- `value`
    The value of the parameter, along with the given name, to match.

### Return value

A boolean value.

## Examples

### Check for parameter with specified name

This example shows how to check if the query string has any parameters with a particular name.

```js
const url = new URL("https://example.com?foo=1&bar=2&foo=3");
const params = new URLSearchParams(url.search);

// has() returns true if the parameter is in the query string
console.log(`bar?:\t${params.has("bar")}`);
console.log(`bark?:\t${params.has("bark")}`);
console.log(`foo?:\t${params.has("foo")}`);
```

The log below shows whether the parameters `bar`, `bark`, and `foo`, are present in the query string.

```plain
bar?:  true
bark?: false
foo?:  true
```

### Check for parameter with specified name and value

This example shows how to check whether the query string has a parameter that matches both a particular name and value.

```js
const url = new URL("https://example.com?foo=1&bar=2&foo=3");
const params = new URLSearchParams(url.search);

// has() returns true if a parameter with the matching name and value is in the query string
console.log(`bar=1?:\t${params.has("bar", "1")}`);
console.log(`bar=2?:\t${params.has("bar", "2")}`);
console.log(`foo=4?:\t${params.has("foo", "4")}`);
```

Only the second value above should be `true`, as only the parameter name `bar` with value `2` is matched.

```plain
bar=1?: false
bar=2?: true
foo=4?: false
```

If your browser does not support the `value` option the method will match on the name, and all the results should be `true`.

## See also

- Polyfill of `URLSearchParams` in `core-js`
