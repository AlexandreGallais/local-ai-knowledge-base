---
title: "IDBObjectStore: count() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbobjectstore/count/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBObjectStore: count() method

The **`count()`** method of the `IDBObjectStore`
interface returns an `IDBRequest` object, and, in a separate thread,
returns the total number of records that match the provided key or
`IDBKeyRange`. If no arguments are provided, it returns the total number
of records in the store.

## Syntax

```js
count()
count(query)
```

### Parameters

- `query` (optional)
    A key or `IDBKeyRange` object that specifies a range of records you
    want to count.

### Return value

An `IDBRequest` object on which subsequent events related to this operation are fired.

If the operation is successful, the value of the request's `result` property is the number of records that match the given query.

### Exceptions

This method may raise a `DOMException` of one of the following types:

- `InvalidStateError` `DOMException`
    Thrown if this `IDBObjectStore` has been deleted.
- `TransactionInactiveError` `DOMException`
    Thrown if this `IDBObjectStore`'s transaction is inactive.
- `DataError` `DOMException`
    Thrown if the specified key or key range is invalid.

## Examples

In this simple fragment we create a transaction, retrieve an object store, then count
the number of records in the store using `count()` — when the success handler
fires, we log the count value (an integer) to the console.

```js
const transaction = db.transaction(["fThings"], "readonly");
const objectStore = transaction.objectStore("fThings");

const countRequest = objectStore.count();
countRequest.onsuccess = () => {
  console.log(countRequest.result);
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
