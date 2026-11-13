---
title: "Headers: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/headers/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Headers: forEach() method

The **`Headers.forEach()`** method executes a callback function once per each key/value pair in the `Headers` object.

## Syntax

```js
forEach(callbackFn)
forEach(callbackFn, thisArg)
```

### Parameters

- `callbackFn`
    Function to execute for each entry in the map. It takes the following arguments:
    - `value`
        Value of the currently visited header entry.
    - `key`
        Name of the currently visited header entry.
    - `object`
        The Headers object being iterated.
- `thisArg` (optional)
    Value to use as `this` when executing `callback`.

### Return value

`undefined`.

## Description

The `Headers.forEach()` method executes the provided callback once for each key of the Headers which actually exist. It is not invoked for keys which have been deleted. However, it is executed for keys which are present but have the value undefined.

## Examples

### Printing the contents of Headers object

The following code logs a line for each key/value in the `myHeaders` object.

```js
// Create a new test Headers object
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "This is a demo cookie");
myHeaders.append("compression", "gzip");

// Display the key/value pairs
myHeaders.forEach((value, key) => {
  console.log(`${key} ==> ${value}`);
});
```

The result is:

```plain
compression ==> gzip
content-type ==> application/json
cookie ==> This is a demo cookie
```

## See also

- `Map.prototype.forEach()`
- ServiceWorker API
- HTTP access control (CORS)
- HTTP
