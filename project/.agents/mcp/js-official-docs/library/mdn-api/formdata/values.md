---
title: "FormData: values() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/formdata/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FormData: values() method

The **`FormData.values()`** method returns an iterator which iterates through all values contained in the `FormData`. The values are strings or `Blob` objects.

> **Note:**
> `FormData` keys are not necessarily unique. A form can contain multiple elements with the same name, so values sharing one key each appear while iterating. To retrieve all values associated with a single key, use the `getAll()` method (or `get()` for only the first value).

## Syntax

```js
values()
```

### Parameters

None.

### Return value

An `iterator` of `FormData`'s values.

## Examples

```js
const formData = new FormData();
formData.append("key1", "value1");
formData.append("key2", "value2");

// Display the values
for (const value of formData.values()) {
  console.log(value);
}
```

The result is:

```plain
value1
value2
```

## See also

- Using FormData objects
- `<Form>`
