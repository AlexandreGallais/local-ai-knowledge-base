---
title: "FormData: getAll() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/formdata/getall/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FormData: getAll() method

The **`getAll()`** method of the `FormData` interface returns all the values associated with a given key from within a `FormData` object.

## Syntax

```js
getAll(name)
```

### Parameters

- `name`
    A string representing the name of the key you want to retrieve.

### Return value

An array of values whose key <example-value> the specified `name`. Otherwise, an empty list.

## Examples

If we add two `username` values to a `FormData` using `append()`:

```js
formData.append("username", "Chris");
formData.append("username", "Bob");
```

The following `getAll()` method will return both `username` values in an array:

```js
formData.getAll("username"); // Returns ["Chris", "Bob"]
```

## See also

- Using FormData objects
- `<Form>`
