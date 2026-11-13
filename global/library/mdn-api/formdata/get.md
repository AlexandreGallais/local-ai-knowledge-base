---
title: "FormData: get() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/formdata/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FormData: get() method

The **`get()`** method of the `FormData` interface
returns the first value associated with a given key from within a `FormData`
object. If you expect multiple values and want all of them, use the
`getAll()` method instead.

## Syntax

```js
get(name)
```

### Parameters

- `name`
    A string representing the name of the key you want to retrieve.

### Return value

A value whose key <example-value> the specified `name`. Otherwise, `null`.

## Examples

If we add two `username` values to a `FormData` using `append()`:

```js
formData.append("username", "Chris");
formData.append("username", "Bob");
```

The following `get()` method will only return the first `username` value:

```js
formData.get("username"); // Returns "Chris"
```

## See also

- Using FormData objects
- `<Form>`
