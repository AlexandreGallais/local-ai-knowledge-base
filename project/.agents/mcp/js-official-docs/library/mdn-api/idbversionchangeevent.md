---
title: "IDBVersionChangeEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbversionchangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBVersionChangeEvent

The **`IDBVersionChangeEvent`** interface of the IndexedDB API indicates that the version of the database has changed, as the result of an `onupgradeneeded` event handler function.

## Constructor

- `IDBVersionChangeEvent()`
    Creates and returns a new `IDBVersionChangeEvent` object which is used to represent when a version of the database has changed.

## Instance properties

_Also inherits properties from its parent, `Event` interface._

- `IDBVersionChangeEvent.oldVersion` (read-only)
    Returns the old version of the database.
- `IDBVersionChangeEvent.newVersion` (read-only)
    Returns the new version of the database.

## Instance methods

_No specific method, but inherits methods from its parent, `Event` interface._

## Example

In the following code snippet, we make a request to open a database, and include handlers for the success and error cases. Upon a version change (after an `upgradeneeded` event), the `success` event will implement the `IDBVersionChangeEvent` interface. For a full working example, see our To-do Notifications app (view example live).

```js
const note = document.querySelector("ul");

// Let us open version 4 of our database
const DBOpenRequest = window.indexedDB.open("toDoList", 4);

// these two event handlers act on the database being opened successfully, or not
DBOpenRequest.onerror = (event) => {
  note.appendChild(document.createElement("li")).textContent =
    "Error loading database.";
};

DBOpenRequest.onsuccess = (event) => {
  note.appendChild(document.createElement("li")).textContent =
    "Database initialized.";

  // store the result of opening the database in the db variable. This is used a lot later on, for opening transactions and suchlike.
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
