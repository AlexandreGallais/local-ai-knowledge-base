---
title: "IDBObjectStore: openKeyCursor() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbobjectstore/openkeycursor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBObjectStore: openKeyCursor() method

The **`openKeyCursor()`** method of the
`IDBObjectStore` interface returns an `IDBRequest` object
whose result will be set to an `IDBCursor` that can be used to iterate
through matching results. Used for iterating through the keys of an object store with
a cursor.

To determine if the add operation has completed successfully, listen for the
results's `success` event.

## Syntax

```js
openKeyCursor()
openKeyCursor(query)
openKeyCursor(query, direction)
```

### Parameters

- `query` (optional)
    The key range to be queried. If a single valid key is passed, this will default to a
    range containing only that key. If nothing is passed, this will default to a key range
    that selects all the records in this object store.
- `direction` (optional)
    A string telling the cursor which direction to travel. The default is `next`. Valid values are:
    - `next`
        The cursor is opened at the start of the store; then, the cursor returns all records, even duplicates,
        in the increasing order of keys.
    - `nextunique`
        The cursor is opened at the start of the store; then, the cursor returns all records, that are not duplicates,
        in the increasing order of keys.
    - `prev`
        The cursor is opened at the end of the store; then, the cursor returns all records, even duplicates,
        in the decreasing order of keys.
    - `prevunique`
        The cursor is opened at the end of the store; then, the cursor returns all records, that are not duplicates,
        in the decreasing order of keys.

### Return value

An `IDBRequest` object on which subsequent events related to this operation are fired.

If the operation is successful, the value of the request's `result` property is:

- an `IDBCursor` object pointing at the first record matching the given query
- `null` if no matching records were found.

### Exceptions

This method may raise a `DOMException` of one of the following types:

- `InvalidStateError` `DOMException`
    Thrown if this `IDBObjectStore` or `IDBIndex` has been deleted.
- `TransactionInactiveError` `DOMException`
    Thrown if this `IDBObjectStore`'s transaction is inactive.
- `DataError` `DOMException`
    Thrown if the specified key or key range is invalid.

## Examples

In this simple fragment we create a transaction, retrieve an object store, then use a
cursor to iterate through all the records in the object store:

```js
const transaction = db.transaction("name", "readonly");
const objectStore = transaction.objectStore("name");
const request = objectStore.openKeyCursor();
request.onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    // cursor.key <example-value> the key of the current record being iterated through
    // note that there is no cursor.value, unlike for openCursor
    // this is where you'd do something with the result
    cursor.continue();
  } else {
    // no more results
  }
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
