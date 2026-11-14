---
title: "URLSearchParams: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlsearchparams/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLSearchParams: forEach() method

The **`forEach()`** method of the
`URLSearchParams` interface allows iteration through all values contained
in this object via a callback function.

## Syntax

```js
forEach(callback)
forEach(callback, thisArg)
```

### Parameters

- `callback`
    Function to execute on each element, which is passed the following arguments:
    - `value`
        The value of the current entry being processed in the `URLSearchParams` object.
    - `key`
        The key of the current entry being processed in the `URLSearchParams` object.
    - `searchParams`
        The `URLSearchParams` object the `forEach()` was called upon.

- `thisArg` (optional)
    Value to use as `this` when executing `callback`.

### Return value

None (`undefined`).

## Examples

```js
// Create a test URLSearchParams object
const searchParams = new URLSearchParams("key1=value1&key2=value2");

// Log the values
searchParams.forEach((value, key) => {
  console.log(value, key);
});
```

The result is:

```plain
value1 key1
value2 key2
```

## See also

- The `URL` interface.
