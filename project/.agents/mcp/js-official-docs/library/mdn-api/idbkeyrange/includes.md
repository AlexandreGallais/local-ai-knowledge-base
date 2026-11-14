---
title: "IDBKeyRange: includes() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbkeyrange/includes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBKeyRange: includes() method

The `includes()` method of the `IDBKeyRange`
interface returns a boolean indicating whether a specified key is inside the key
range.

## Syntax

```js
includes(key)
```

### Parameters

- `key`
    The key you want to check for in your key range. This can be any type.

### Return value

A boolean value.

### Exceptions

- `DataError` `DOMException`
    Thrown if the supplied key was not a valid key.

## Examples

```js
const keyRangeValue = IDBKeyRange.bound("A", "K", false, false);

keyRangeValue.includes("F");
// Returns true

keyRangeValue.includes("W");
// Returns false
```

## See also

- Using IndexedDB
- Starting transactions: `IDBDatabase`
- Using transactions: `IDBTransaction`
- Setting a range of keys: `IDBKeyRange`
- Retrieving and making changes to your data: `IDBObjectStore`
- Using cursors: `IDBCursor`
- Reference example: To-do Notifications (View the example live).
