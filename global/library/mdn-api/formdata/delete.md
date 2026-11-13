---
title: "FormData: delete() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/formdata/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FormData: delete() method

The **`delete()`** method of the `FormData` interface deletes a key and its value(s) from a `FormData` object.

## Syntax

```js
delete(name)
```

### Parameters

- `name`
    The name of the key you want to delete.

### Return value

None (`undefined`).

## Examples

You can delete a key and its values using `delete()`:

```js
formData.delete("username");
```

## See also

- Using FormData objects
- `<Form>`
