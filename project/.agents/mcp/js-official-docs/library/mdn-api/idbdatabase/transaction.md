---
title: "IDBDatabase: transaction() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbdatabase/transaction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBDatabase: transaction() method

The **`transaction`** method of the `IDBDatabase` interface immediately returns a transaction object (`IDBTransaction`) containing the `IDBTransaction.objectStore` method, which you can use to access your object store.

## Syntax

```js
transaction(storeNames)
transaction(storeNames, mode)
transaction(storeNames, mode, options)
```

### Parameters

- `storeNames`
    The names of object stores that are in the scope of the new transaction, declared as an array of strings. Specify only the object stores that you need to access.
    If you need to access only one object store, you can specify its name as a string.
    Therefore the following lines are equivalent:

    ```js
    db.transaction(["my-store-name"]);
    db.transaction("my-store-name");
    ```

    If you need to access all object stores in the database, you can use the property `IDBDatabase.objectStoreNames`:

    ```js
    const transaction = db.transaction(db.objectStoreNames);
    ```

    Passing an empty array will throw an exception.

- `mode` (optional)
    The types of access that can be performed in the transaction.
    Transactions are opened in one of three modes:
    - `readonly`
        Open a transaction for reading from an object store. This is the default mode.
    - `readwrite`
        Open a transaction for both reading and writing from an object store.
        This should only be used if need to write into the database.
    - `readwriteflush` (non-standard) (experimental)
        Force a transaction to flush to disk before delivering the `complete` event.
        This might be used for storing critical data that cannot be recomputed later.

- `options` (optional)
    Object defining additional options, including:
    - `durability`
        One of the three string-literal values below:
        - `"strict"`
            The user agent may consider that the transaction has successfully committed only after verifying that all outstanding changes have been successfully written to a persistent storage medium.
            This is recommended where the risk of data loss outweighs the impact of its use on performance and power (compared to `relaxed`).
        - `"relaxed"`
            The user agent may consider that the transaction has successfully committed as soon as all outstanding changes have been written to the operating system, without subsequent verification.
            This offers better performance than `strict`, and is recommended for ephemeral data such as caches or quickly changing records.
        - `"default"`
            The user agent should use its default durability behavior for the storage bucket.
            This is the default for transactions if not otherwise specified.

### Return value

An `IDBTransaction` object.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `close()` method has previously been called on this `IDBDatabase` instance.
- `NotFoundError` `DOMException`
    Thrown if an object store specified in the 'storeNames' parameter has been deleted or removed.
- `TypeError`
    Thrown if the value for the `mode` parameter is invalid.
- `InvalidAccessError` `DOMException`
    Thrown if the function was called with an empty list of store names.

## Examples

In this example we open a database connection, then use transaction() to open a transaction on the database.
For a complete example, see our To-do Notifications app (view example live).

```js
let db;

// Let us open our database
const DBOpenRequest = window.indexedDB.open("toDoList", 4);

DBOpenRequest.onsuccess = (event) => {
  note.appendChild(document.createElement("li")).textContent =
    "Database initialized.";

  // store the result of opening the database in the db variable.
  // This is used a lot below
  db = DBOpenRequest.result;

  // Run the displayData() function to populate the task list with
  // all the to-do list data already in the IDB
  displayData();
};

// open a read/write db transaction, ready for adding the data
const transaction = db.transaction(["toDoList"], "readwrite");

// report on the success of opening the transaction
transaction.oncomplete = (event) => {
  note.appendChild(document.createElement("li")).textContent =
    "Transaction completed: database modification finished.";
};

transaction.onerror = (event) => {
  note.appendChild(document.createElement("li")).textContent =
    "Transaction not opened due to error. Duplicate items not allowed.";
};

// you would then go on to do something to this database
// via an object store
const objectStore = transaction.objectStore("toDoList");
// etc.
```

## See also

- Using IndexedDB
- Starting transactions: `IDBDatabase`
- Using transactions: `IDBTransaction`
- Setting a range of keys: `IDBKeyRange`
- Retrieving and making changes to your data: `IDBObjectStore`
- Using cursors: `IDBCursor`
- Reference example: To-do Notifications (View the example live).
