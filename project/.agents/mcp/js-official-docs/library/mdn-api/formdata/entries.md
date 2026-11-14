---
title: "FormData: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/formdata/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FormData: entries() method

The **`FormData.entries()`** method returns an iterator which iterates through all key/value pairs contained in the `FormData`. The key of each pair is a string, and the value is either a string or a `Blob`.

> **Note:**
> Unlike `Map` entries, `FormData` entries are not necessarily unique by key. A form can contain multiple elements with the same name, so the same key may appear in more than one pair while iterating. Past the first entry, the value may differ from the return value of `get()` which returns the first value associated with the key.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

An iterator of `FormData`'s key/value pairs.

## Examples

```js
formData.append("key1", "value1");
formData.append("key2", "value2");

// Display the key/value pairs
for (const pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
```

The result is:

```plain
key1 value1
key2 value2
```

## See also

- Using FormData objects
- `<Form>`
