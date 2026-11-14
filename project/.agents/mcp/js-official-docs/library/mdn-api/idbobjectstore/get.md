---
title: "IDBObjectStore: get() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbobjectstore/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBObjectStore: get() method

The **`get()`** method of the `IDBObjectStore`
interface returns an `IDBRequest` object, and, in a separate thread,
returns the object selected by the specified key. This is for retrieving
specific records from an object store.

If a value is successfully found, then a structured clone of it is created and set as
the `result` of the
request object.

> **Note:**
> This method produces the same result for: a) a record that doesn't exist in the database and b) a record that has an undefined value.
> To tell these situations apart, call the `openCursor()` method with the same key. That method provides a cursor if the record exists, and no cursor if it does not.

## Syntax

```js
get(key)
```

### Parameters

- `key`
    The key or key range that identifies the record to be retrieved.

### Return value

An `IDBRequest` object on which subsequent events related to this operation are fired.

If the operation is successful, the value of the request's `result` property is the value of the first record matching the given key or key range.

### Exceptions

This method may raise a `DOMException` of one of the following types:

- `TransactionInactiveError` `DOMException`
    Thrown if this `IDBObjectStore`'s transaction is inactive.
- `DataError` `DOMException`
    Thrown if key or key range provided contains an invalid key.
- `InvalidStateError` `DOMException`
    Thrown if the `IDBObjectStore` has been deleted or removed.

## Examples

In the following code snippet, we open a read/write transaction on our database and get
one specific record from object store using `get()` — a sample record with
the key "Walk dog". Once this data object is retrieved, you could then update it using
normal JavaScript, then put it back into the database using a
`put()` operation. For a full working example, see our To-do Notifications app
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

  // Run the getData() function to get the data from the database
  getData();
};

function getData() {
  // open a read/write db transaction, ready for retrieving the data
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

  // Make a request to get a record by key from the object store
  const objectStoreRequest = objectStore.get("Walk dog");

  objectStoreRequest.onsuccess = (event) => {
    // report the success of our request
    note.appendChild(document.createElement("li")).textContent =
      "Request successful.";

    const myRecord = objectStoreRequest.result;
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
