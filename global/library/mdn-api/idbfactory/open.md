---
title: "IDBFactory: open() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbfactory/open/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBFactory: open() method

The **`open()`** method of the `IDBFactory` interface requests opening a connection to a database.

The method returns an `IDBOpenDBRequest` object immediately, and performs the open operation asynchronously.
If the operation is successful, a `success` event is fired on the request object that is returned from this method, with its `result` attribute set to the new `IDBDatabase` object for the connection.

May trigger `upgradeneeded`, `blocked` or `versionchange` events.

## Syntax

```js
open(name)
open(name, version)
```

### Parameters

- `name`
    The name of the database.
- `version` (optional)
    Optional. The version to open the database with. If the version is not provided and the database exists, then a connection to the database will be opened without changing its version.
    If the version is not provided and the database does not exist, then it will be created with version `1`.

### Return value

An `IDBOpenDBRequest` object on which subsequent events related to this request are fired.

If the operation is successful, the value of the request's `result` property is an `IDBDatabase` object representing the connection to the database.

### Exceptions

- `TypeError`
    Thrown if the value of `version` is not a number greater than zero.

## Examples

Example of calling `open` with the current specification's `version` parameter:

```js
const request = window.indexedDB.open("toDoList", 4);
```

In the following code snippet, we make a request to open a database, and include handlers for the success and error cases.
For a full working example, see our To-do Notifications app (View the example live).

```js
const note = document.querySelector("ul");

// Let us open version 4 of our database
const DBOpenRequest = window.indexedDB.open("toDoList", 4);

// these two event handlers act on the database being opened
// successfully, or not
DBOpenRequest.onerror = (event) => {
  note.appendChild(document.createElement("li")).textContent =
    "Error loading database.";
};

DBOpenRequest.onsuccess = (event) => {
  note.appendChild(document.createElement("li")).textContent =
    "Database initialized.";

  // store the result of opening the database in the db
  // variable. This is used a lot later on, for opening
  // transactions and suchlike.
  db = DBOpenRequest.result;
};
```

## See also

- Using IndexedDB
- Browser storage quotas and eviction criteria.
- Starting transactions: `IDBDatabase`
- Using transactions: `IDBTransaction`
- Setting a range of keys: `IDBKeyRange`
- Retrieving and making changes to your data: `IDBObjectStore`
- Using cursors: `IDBCursor`
- Reference example: To-do Notifications (View the example live).
