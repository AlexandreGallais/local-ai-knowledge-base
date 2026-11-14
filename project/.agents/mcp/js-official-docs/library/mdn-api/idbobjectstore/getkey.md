---
title: "IDBObjectStore: getKey() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbobjectstore/getkey/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBObjectStore: getKey() method

The **`getKey()`** method of the
`IDBObjectStore` interface returns an `IDBRequest` object,
and, in a separate thread, returns the key <example-value> by the specified query. This is
for retrieving specific records from an object store.

If a key is successfully found, then a structured clone of it is created and set as the
result of the request object.

## Syntax

```js
getKey(key)
```

### Parameters

- `key`
    The key or key range that identifies the record to be retrieved.

### Return value

An `IDBRequest` object on which subsequent events related to this operation are fired.

If the operation is successful, the value of the request's `result` property is the key for the first record matching the given key or key range.

### Exceptions

This method may raise a `DOMException` of one of the following types:

- `InvalidStateError` `DOMException`
    Thrown if the `IDBObjectStore` has been deleted or removed.
- `TransactionInactiveError` `DOMException`
    Thrown if this `IDBObjectStore`'s transaction is inactive.
- `DataError` `DOMException`
    Thrown if the key or key range provided contains an invalid key.

## Example

```js
let openRequest = indexedDB.open("telemetry");
openRequest.onsuccess = (event) => {
  let db = event.target.result;
  let store = db.transaction("net-logs").objectStore("net-logs");

  let today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  let request = store.getKey(IDBKeyRange(yesterday, today));
  request.onsuccess = (event) => {
    let when = event.target.result;
    alert(`The 1st activity in last 24 hours was occurred at ${when}`);
  };
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
