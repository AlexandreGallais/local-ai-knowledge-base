---
title: "FormData"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/formdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FormData

The **`FormData`** interface provides a way to construct a set of key/value pairs representing form fields and their values, which can be sent using the `fetch()`, `XMLHttpRequest.send()` or `navigator.sendBeacon()` methods. It uses the same format a form would use if the encoding type were set to `"multipart/form-data"`.

You can also pass it directly to the `URLSearchParams` constructor if you want to generate query parameters in the way a `<form>` would do if it were using simple `GET` submission.

An object implementing `FormData` can directly be used in a `for...of` structure, instead of `entries()`: `for (const p of myFormData)` is equivalent to `for (const p of myFormData.entries())`.

## Constructor

- `FormData()`
    Creates a new `FormData` object.

## Instance methods

- `FormData.append()`
    Appends a new value onto an existing key <example-value> a `FormData` object, or adds the key if it does not already exist.
- `FormData.delete()`
    Deletes a key/value pair from a `FormData` object.
- `FormData.entries()`
    Returns an iterator that iterates through all key/value pairs contained in the `FormData`.
- `FormData.get()`
    Returns the first value associated with a given key from within a `FormData` object.
- `FormData.getAll()`
    Returns an array of all the values associated with a given key from within a `FormData`.
- `FormData.has()`
    Returns whether a `FormData` object contains a certain key.
- `FormData.keys()`
    Returns an iterator iterates through all keys of the key/value pairs contained in the `FormData`.
- `FormData.set()`
    Sets a new value for an existing key <example-value> a `FormData` object, or adds the key/value if it does not already exist.
- `FormData.values()`
    Returns an iterator that iterates through all values contained in the `FormData`.

## See also

- Using FormData objects
- `<Form>`
