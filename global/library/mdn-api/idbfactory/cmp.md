---
title: "IDBFactory: cmp() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbfactory/cmp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBFactory: cmp() method

The **`cmp()`** method of the `IDBFactory`
interface compares two values as keys to determine equality and ordering for IndexedDB
operations, such as storing and iterating.

> **Note:**
> Do not use this method for comparing arbitrary JavaScript
> values, because many JavaScript values are either not valid IndexedDB keys (booleans
> and objects, for example) or are treated as equivalent IndexedDB keys (for example,
> since IndexedDB ignores arrays with non-numeric properties and treats them as empty
> arrays, so any non-numeric arrays are treated as equivalent). This throws an exception
> if either of the values is not a valid key.

## Syntax

```js
cmp(first, second)
```

### Parameters

- `first`
    The first key to compare.
- `second`
    The second key to compare.

### Return value

An integer that indicates the result of the comparison; the table below lists the
possible values and their meanings:

| Returned value | Description                         |
| -------------- | ----------------------------------- |
| -1             | 1st key is less than the 2nd key    |
| 0              | 1st key is equal to the 2nd key     |
| 1              | 1st key is greater than the 2nd key |

### Exceptions

- `DataError` `DOMException`
    Thrown if one of the supplied keys was not a valid key.

## Examples

```js
const a = 1;
const b = 2;
const result = window.indexedDB.cmp(a, b);
console.log(`Comparison results: ${result}`);
```

## See also

- Using IndexedDB
- Starting transactions: `IDBDatabase`
- Using transactions: `IDBTransaction`
- Setting a range of keys: `IDBKeyRange`
- Retrieving and making changes to your data: `IDBObjectStore`
- Using cursors: `IDBCursor`
- Reference example: To-do Notifications (View the example live).
