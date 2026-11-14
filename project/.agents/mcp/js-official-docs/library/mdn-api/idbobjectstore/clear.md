---
title: "IDBObjectStore: clear() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbobjectstore/clear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBObjectStore: clear() method

The **`clear()`** method of the `IDBObjectStore`
interface creates and immediately returns an `IDBRequest` object, and
clears this object store in a separate thread. This is for deleting all the current
data out of an object store.

Clearing an object store consists of removing all records from the object store and
removing all records in indexes that reference the object store. To remove only some of
the records in a store, use `IDBObjectStore.delete` passing a key
or `IDBKeyRange`.

## Syntax

```js
clear()
```

### Parameters

None.

### Return value

An `IDBRequest` object on which subsequent events related to this operation are fired.

If the operation is successful, the value of the request's `result` property is `undefined`.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the object store has been deleted.
- `ReadOnlyError` `DOMException`
    Thrown if the transaction associated with this operation is in read-only mode.
- `TransactionInactiveError` `DOMException`
    Thrown if this `IDBObjectStore`'s transaction is inactive.

## Examples

In the following code snippet, we open a read/write transaction on our database and
clear all the current data out of the object store using `clear()`. For a
full working example, see our To-do Notifications app
(view example live).

```js
// Let us open our database
const DBOpenRequest = window.indexedDB.open("toDoList", 4);

DBOpenRequest.onsuccess = (event) => {
  note.appendChild(document.createElement("li")).textContent =
    "Database initialized.";

  // store the result of opening the database in the db variable.
  // This is used a lot below
  db = DBOpenRequest.result;

  // Clear all the data from the object store
  clearData();
};

function clearData() {
  // open a read/write db transaction, ready for clearing the data
  const transaction = db.transaction(["toDoList"], "readwrite");

  // report on the success of the transaction completing, when everything is done
  transaction.oncomplete = (event) => {
    note.appendChild(document.createElement("li")).textContent =
      "Transaction completed.";
  };

  transaction.onerror = (event) => {
    note.appendChild(document.createElement("li")).textContent =
      `Transaction not opened due to error: ${transaction.error}`;
  };

  // create an object store on the transaction
  const objectStore = transaction.objectStore("toDoList");

  // Make a request to clear all the data out of the object store
  const objectStoreRequest = objectStore.clear();

  objectStoreRequest.onsuccess = (event) => {
    // report the success of our request
    note.appendChild(document.createElement("li")).textContent =
      "Request successful.";
  };
}
```

## See also

- Using IndexedDB
- Starting transactions: `IDBDatabase`
- Using transactions: `IDBTransaction`
- Setting a range of keys: `IDBKeyRange`
- Retrieving and making changes to your data: `IDBObjectStore`
- Using cursors: `IDBCursor`
- Reference example: To-do Notifications (View the example live).
