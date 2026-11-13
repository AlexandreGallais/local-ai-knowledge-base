---
title: "IDBObjectStore: getAllKeys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbobjectstore/getallkeys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBObjectStore: getAllKeys() method

The `getAllKeys()` method of the `IDBObjectStore`
interface returns an `IDBRequest` object retrieves record keys for all
objects in the object store matching the specified parameter or all objects in the
store if no parameters are given.

If a value is successfully found, then a structured clone of it is created and set as
the result of the request object.

This method produces the same result for:

- a record that doesn't exist in the database
- a record that has an undefined value

To tell these situations apart, you need to call the
`openCursor()` method with the same key. That
method provides a cursor if the record exists, and no cursor if it does not.

## Syntax

```js
getAllKeys()
getAllKeys(query)
getAllKeys(query, count)
getAllKeys(options)
```

### Parameters

The `getAllKeys()` method can take separate parameters or a single options object containing the parameters as properties.

The parameters can include:

- `query` (optional)
    A value that is or resolves to an `IDBKeyRange`. If this value is not specified, this will
    default to a key range that selects all the records in this object store.
- `count` (optional)
    Specifies the number of values to return if more than one is found. If it is lower
    than `0` or greater than `2^32 - 1` a
    `TypeError` exception will be thrown.

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
        The objects are traversed from the beginning, in increasing key order. This will yield the same keys as `next`, because duplicate keys are not allowed in `IDBObjectStore`s.
    - `prev`
        The objects are traversed from the end, in decreasing key order.
    - `prevunique`
        The objects are traversed from the end, in decreasing key order. This will yield the same keys as `prev`, because duplicate keys are not allowed in `IDBObjectStore`s.

### Return value

An `IDBRequest` object on which subsequent events related to this operation are fired.

If the operation is successful, the value of the request's `result` property is an `Array` of the keys for all records matching the given query, up to the value of `count`, if `count` was supplied.

### Exceptions

This method may raise a `DOMException` of one of the following types:

- `TransactionInactiveError` `DOMException`
    Thrown if this `IDBObjectStore`'s transaction is inactive.
- `DataError` `DOMException`
    Thrown if the key or key range provided contains an invalid key or is null.
- `InvalidStateError` `DOMException`
    Thrown if the `IDBObjectStore` has been deleted or removed.
- `TypeError`
    Thrown if the `count` parameter is not between `0` and `2^32 - 1`, inclusive.

## See also

- Using IndexedDB
- Starting transactions: `IDBDatabase`
- Using transactions: `IDBTransaction`
- Setting a range of keys: `IDBKeyRange`
- Retrieving and making changes to your data: `IDBObjectStore`
- Using cursors: `IDBCursor`
- Reference example: To-do Notifications (View the example live).
