---
title: "IDBDatabase: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbdatabase/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBDatabase: close() method

The **`close()`** method of the `IDBDatabase`
interface returns immediately and closes the connection in a separate thread.

The connection is not actually closed until all transactions created using this
connection are complete. No new transactions can be created for this connection once
this method is called. Methods that create transactions throw an exception if a closing
operation is pending.

## Syntax

```js
close()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
// Let us open our database
const DBOpenRequest = window.indexedDB.open("toDoList", 4); // opening a database.

// Create event handlers for both success and failure of
DBOpenRequest.onerror = (event) => {
  note.appendChild(document.createElement("li")).textContent =
    "Error loading database.";
};

DBOpenRequest.onsuccess = (event) => {
  note.appendChild(document.createElement("li")).textContent =
    "Database initialized.";

  // store the result of opening the database in the db variable.
  db = DBOpenRequest.result;

  // now let's close the database again!
  db.close();
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
