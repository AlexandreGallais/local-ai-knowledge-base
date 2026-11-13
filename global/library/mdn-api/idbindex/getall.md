---
title: "IDBIndex: getAll() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbindex/getall/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBIndex: getAll() method

The **`getAll()`** method of the `IDBIndex`
interface retrieves all objects that are inside the index.

There is a performance cost associated with looking at the `value` property
of a cursor, because the object is created lazily. To use a feature
like `getAll()`, the browser has to create all the objects at once. If you
are just interested in looking at each of the keys, for instance, it is more efficient
to use a cursor. If you are trying to get an
array of all the objects in an object store, though, you should
use `getAll()`.

## Syntax

```js
getAll()
getAll(query)
getAll(query, count)
getAll(options)

```

### Parameters

The `getAll()` method can take separate parameters or a single options object containing the parameters as properties.

The parameters can include:

- `query` (optional)
    A key or an `IDBKeyRange` identifying the records to retrieve. If this value is `null` or not specified, the browser will use an unbound key range.
- `count` (optional)
    The number of records to return. If this value exceeds the number of records in the
    query, the browser will only retrieve the queried records. If it is lower than
    `0` or greater than `2^32 - 1` a `TypeError`
    exception will be thrown.

If an object parameter is specified, its properties can include:

- `query` (optional)
    See the earlier `query` definition.
- `count` (optional)
    See the earlier `count` definition.
- `direction` (optional)
    An enumerated value specifying the direction in which the objects are traversed. Possible values are:
    - `next`
        The objects are traversed from the beginning, in increasing key order. This is the default value.
    - `nextunique`
        The objects are traversed from the beginning, in increasing key order. For every key with duplicate objects, only the object closest to the start is yielded.
    - `prev`
        The objects are traversed from the end, in decreasing key order.
    - `prevunique`
        The objects are traversed from the end, in decreasing key order. For every key with duplicate objects, only the object closest to the start is yielded.

### Return value

An `IDBRequest` object on which subsequent events related to this operation are fired.

If the operation is successful, the value of the request's `result` property is an `Array` of the values of all records matching the given query, up to the value of `count`, if `count` was supplied.

### Exceptions

This method may raise a `DOMException` of the following types:

- `TransactionInactiveError` `DOMException`
    Thrown if this `IDBIndex`'s transaction is inactive.
- `InvalidStateError` `DOMException`
    Thrown if the `IDBIndex` has been deleted or removed.
- `TypeError`
    Thrown if the `count` parameter is not between `0` and `2^32 - 1`, inclusive.

## Examples

```js
const myIndex = objectStore.index("index");
const getAllRequest = myIndex.getAll();
getAllRequest.onsuccess = () => {
  console.log(getAllRequest.result);
};
```

## See also

- Using IndexedDB
- Starting transactions: `IDBDatabase`
- Using transactions: `IDBTransaction`
- Setting a range of keys: `IDBKeyRange`
- Retrieving and making changes to your data: `IDBObjectStore`
- Using cursors: `IDBCursor`
- Reference example: To-do Notifications (View the example live).
