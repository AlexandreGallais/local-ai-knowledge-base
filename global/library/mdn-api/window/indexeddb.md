---
title: "Window: indexedDB property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/indexeddb/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: indexedDB property

The **`indexedDB`** read-only property of the `Window` interface provides a mechanism for applications to
asynchronously access the capabilities of indexed databases.

## Value

An `IDBFactory` object.

## Examples

The following code creates a request for a database to be opened asynchronously, after
which the database is opened when the request's `onsuccess` handler is fired:

```js
let db;
function openDB() {
  const DBOpenRequest = window.indexedDB.open("toDoList");
  DBOpenRequest.onsuccess = (e) => {
    db = DBOpenRequest.result;
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
