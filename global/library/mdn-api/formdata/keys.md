---
title: "FormData: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/formdata/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FormData: keys() method

The **`FormData.keys()`** method returns an iterator which iterates through all keys contained in the `FormData`. The keys are strings.

> **Note:**
> Unlike `Map` keys, `FormData` keys are not necessarily unique. A form can contain multiple elements with the same name, so the same key may appear more than once while iterating. To retrieve all values associated with a single key, use the `getAll()` method (or `get()` for only the first value).

## Syntax

```js
keys()
```

### Parameters

None.

### Return value

An `iterator` of `FormData`'s keys.

## Examples

```js
const formData = new FormData();
formData.append("key1", "value1");
formData.append("key2", "value2");

// Display the keys
for (const key of formData.keys()) {
  console.log(key);
}
```

The result is:

```plain
key1
key2
```

## See also

- Using FormData objects
- `<Form>`
