---
title: "IDBVersionChangeEvent: newVersion property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbversionchangeevent/newversion/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBVersionChangeEvent: newVersion property

The **`newVersion`** read-only property of the
`IDBVersionChangeEvent` interface returns the new version number of the
database.

## Value

A number that is a 64-bit integer or null if the database is being deleted.

## Examples

In the following code snippet, we make a request to open a database, and include
handlers for the success and error cases. These events are fired via the custom
`IDBVersionChangeEvent` interface. For a full working example, see our To-do Notifications app (view example live).

```js
const note = document.querySelector("ul");

// Let us open version 4 of our database
const DBOpenRequest = window.indexedDB.open("toDoList", 4);

// these two event handlers act on the database being opened
DBOpenRequest.onerror = (event) => {
  note.appendChild(document.createElement("li")).textContent =
    "Error loading database.";
};

DBOpenRequest.onsuccess = (event) => {
  note.appendChild(document.createElement("li")).textContent =
    "Database initialized.";

  // store the result of opening the database in the db variable.
  // This is used a lot later on, for opening transactions and suchlike.
  const db = DBOpenRequest.result;
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
