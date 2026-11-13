---
title: "URLSearchParams: values() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlsearchparams/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLSearchParams: values() method

The **`values()`** method of the `URLsearchParams`
interface returns an `iterator` allowing iteration
through all values contained in this object. The values are strings.

## Syntax

```js
values()
```

### Parameters

None.

### Return value

Returns an `iterator`.

## Examples

The following example passes a URL search string to the `URLSearchParams` constructor, then uses the iterator returned by `values()` to print the values to the console.

```js
const searchParams = new URLSearchParams("key1=value1&key2=value2");

for (const value of searchParams.values()) {
  console.log(value);
}
```

The result is:

```plain
value1
value2
```

This example does much the same as above, but first casts the iterator into an array.

```js
const searchParams = new URLSearchParams("key1=value1&key2=value2");

console.log(Array.from(searchParams.values()));
```

The result is:

```plain
['value1', 'value2']
```

## See also

- The `URL` interface.
