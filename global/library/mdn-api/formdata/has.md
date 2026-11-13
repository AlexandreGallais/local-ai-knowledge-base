---
title: "FormData: has() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/formdata/has/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FormData: has() method

The **`has()`** method of the `FormData` interface returns whether a `FormData` object contains a certain key.

## Syntax

```js
has(name)
```

### Parameters

- `name`
    A string representing the name of the key you want to test for.

### Return value

`true` if a key of `FormData` matches the specified `name`. Otherwise, `false`.

## Examples

The following snippet shows the results of testing for the existence of `username` in a `FormData` object, before and after appending a `username` value to it with `append()`:

```js
formData.has("username"); // Returns false
formData.append("username", "Chris");
formData.has("username"); // Returns true
```

## See also

- Using FormData objects
- `<Form>`
