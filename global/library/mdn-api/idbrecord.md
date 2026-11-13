---
title: "IDBRecord"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbrecord/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBRecord

The **`IDBRecord`** interface of the IndexedDB API represents a snapshot of a single record in an `IDBObjectStore` or `IDBIndex`.

A request for records using `IDBObjectStore.getAllRecords()` or `IDBIndex.getAllRecords()` returns an `IDBRequest` instance.
On success, the returned object's `result` property is populated with an array of `IDBRecord` instances.

## Instance properties

- `key` (read-only)
    A value representing the record's secondary key.
    For an object store record, this will be the same as `primaryKey`.
    For an index record, it will be the record's key <example-value> the index.
- `primaryKey` (read-only)
    A value representing the record's primary key.
    This key is used to represent the record in the `IDBObjectStore`.
- `value` (read-only)
    A value representing the record's value.

## Instance methods

_None._

## Examples

### Basic usage

This example queries an `IDBObjectStore` for up to 100 records whose keys come after `"myKey"`, with results sorted in reverse order.

The code first creates a transaction on an `IDBDatabase` named `db` (omitting the code to open the database), and then uses it to get an `IDBObjectStore` containing a contacts list.
It then calls `getAllRecords()` on the object store, returning an `IDBRequest` instance.
Event listeners are added to this request for the `success` and `error` events.
On success, the result `event.target.result` is logged (this is also available as `request.result`).
This result contains an array of `IDBRecord` instances.
Note that because this is a query on an `IDBObjectStore`, the `key` and `primaryKey` in each record have the same value.

```js
// Create a transaction on the database and use it to get the contained store
const transaction = db.transaction(["contactsList"], "readonly");
const objectStore = transaction.objectStore("contactsList");

const query = IDBKeyRange.lowerBound("myKey", true);

const request = objectStore.getAllRecords({
  query,
  count: 100,
  direction: "prev",
});

request.addEventListener("success", (event) => {
  const myRecords = event.target.result; // Array of IDBRecord instances
  console.log(myRecords);
});

request.addEventListener("error", (event) => {
  console.error("Error retrieving records:", event.target.error);
});
```

## See also

- `IDBObjectStore.getAllRecords()`
- `IDBIndex.getAllRecords()`
- Using IndexedDB
- Reference example: To-do Notifications (View the example live).
