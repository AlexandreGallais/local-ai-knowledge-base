---
title: "IDBObjectStore: add() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbobjectstore/add/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBObjectStore: add() method

The **`add()`** method of the `IDBObjectStore` interface returns an `IDBRequest` object, and, in a separate thread, creates a structured clone of the value, and stores the cloned value in the object store. This is for adding new records to an object store.

To determine if the add operation has completed successfully, listen for the
transaction's `complete` event in addition to the
`IDBObjectStore.add` request's `success` event, because the
transaction may still fail after the success event fires. In other words, the success
event is only triggered when the transaction has been successfully queued.

The add method is an _insert only_ method. If a
record already exists in the object store with the `key` parameter as its
key, then an error `ConstraintError` event is fired on the returned request
object. For updating existing records, you should use the
`IDBObjectStore.put` method instead.

## Syntax

```js
add(value)
add(value, key)
```

### Parameters

- `value`
    The value to be stored.
- `key` (optional)
    The key to use to identify the record. If unspecified, it results to null.

### Return value

An `IDBRequest` object on which subsequent events related to this operation are fired.

If the operation is successful, the value of the request's `result` property is the key for the new record.

### Exceptions

This method may raise a `DOMException` of
one of the following types:

- `ReadOnlyError` `DOMException`
    Thrown if the transaction associated with this operation is in read-only mode.
- `TransactionInactiveError` `DOMException`
    Thrown if this `IDBObjectStore`'s transaction is inactive.
- `DataError` `DOMException`
    Thrown if any of the following conditions apply:
    - The object store uses in-line keys or has a key <example-value>, and a key <example-value> was provided.
    - The object store uses out-of-line keys and has no key <example-value>, and no key <example-value> was provided.
    - The object store uses in-line keys but no key <example-value>, and the object store's key path does not yield a valid key.
    - The key <example-value> was provided but does not contain a valid key.
- `InvalidStateError` `DOMException`
    Thrown if the `IDBObjectStore` has been deleted or removed.
- `DataCloneError` `DOMException`
    Thrown if the data being stored could not be cloned by the internal structured cloning algorithm.
- `ConstraintError` `DOMException`
    Thrown if an insert operation failed because the primary key <example-value> was
    violated (due to an already existing record with the same primary key
    value).

## Examples

In the following code snippet, we open a read/write transaction on our database and add
some data to an object store using `add()`. Note also the functions attached
to transaction event handlers to report on the outcome of the transaction opening in the
event of success or failure. For a full working example, see our To-do Notifications app (view example live).

```js
// Let us open our database
const DBOpenRequest = window.indexedDB.open("toDoList", 4);

DBOpenRequest.onsuccess = (event) => {
  note.appendChild(document.createElement("li")).textContent =
    "Database initialized.";

  // store the result of opening the database in the db variable.
  // This is used a lot below
  db = DBOpenRequest.result;

  // Run the addData() function to add the data to the database
  addData();
};

function addData() {
  // Create a new object ready to insert into the IDB
  const newItem = [
    {
      taskTitle: "Walk dog",
      hours: 19,
      minutes: 30,
      day: 24,
      month: "December",
      year: 2013,
      notified: "no",
    },
  ];

  // open a read/write db transaction, ready for adding the data
  const transaction = db.transaction(["toDoList"], "readwrite");

  // report on the success of the transaction completing, when everything is done
  transaction.oncomplete = (event) => {
    note.appendChild(document.createElement("li")).textContent =
      "Transaction completed.";
  };

  transaction.onerror = (event) => {
    note.appendChild(document.createElement("li")).textContent =
      "Transaction not opened due to error. Duplicate items not allowed.";
  };

  // create an object store on the transaction
  const objectStore = transaction.objectStore("toDoList");

  // Make a request to add our newItem object to the object store
  const objectStoreRequest = objectStore.add(newItem[0]);

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
