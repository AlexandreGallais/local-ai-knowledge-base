---
title: "IDBFactory: deleteDatabase() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbfactory/deletedatabase/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBFactory: deleteDatabase() method

The **`deleteDatabase()`** method of the `IDBFactory` interface requests the deletion of a database. The method returns an `IDBOpenDBRequest` object immediately, and performs the deletion operation asynchronously.

## Syntax

```js
deleteDatabase(name)
// Non-standard
deleteDatabase(name, options)
```

### Parameters

- `name`
    The name of the database you want to delete. Note that attempting to delete a
    database that doesn't exist does not throw an exception, in contrast to
    `IDBDatabase.deleteObjectStore()`, which does throw an exception if the
    named object store does not exist.
- `options` (optional) (non-standard)
    In Gecko, since version 26, you can include
    a non-standard optional storage parameter that specifies whether you want to delete a
    `permanent` (the default value) indexedDB, or an indexedDB in
    `temporary` storage (a.k.a. shared pool.)

### Return value

An `IDBOpenDBRequest` on which subsequent events related to this request are fired.

If the operation is successful, the value of the request's `result` property is `undefined`.

## Description

If the database is successfully deleted, then a `success` event is fired on the request object returned from `deleteDatabase()`, with its `result` set to `undefined`. If an error occurs during deletion, an `error` event is fired on the request object returned from this method.

When `deleteDatabase()` is called, any other open connections to this particular database are sent a `versionchange` event, allowing them to close so that the deletion can proceed.

If a connection is not closed in response to the `versionchange` event, the deletion is blocked: the request's `success` event does not fire, and a `blocked` event is fired on the request instead. The deletion stays pending until every connection to the database is closed. In the meantime, connections that are still open keep working as normal: they can still run transactions until they are closed. Any later `open()` or `deleteDatabase()` request for the same database is queued behind the pending deletion, and only proceeds once the deletion has completed.

## Examples

### Basic usage

```js
const dbDeleteRequest = indexedDB.deleteDatabase("toDoList");

dbDeleteRequest.onerror = (event) => {
  console.error("Error deleting database.");
};

dbDeleteRequest.onsuccess = (event) => {
  console.log("Database deleted successfully");

  console.log(dbDeleteRequest.result); // undefined
};
```

### Handling a blocked deletion

Imagine two browser tabs sharing access to the same database. The first tab requests deletion, but the second does not respond by closing the database. A `blocked` event fires on the request in the first tab. In this case, you may show the user a warning asking them to close the other tabs.

```js
const dbDeleteRequest = indexedDB.deleteDatabase("toDoList");

dbDeleteRequest.onblocked = (event) => {
  console.warn(
    "Deletion is blocked: close other tabs that have this app open to continue.",
  );
};

dbDeleteRequest.onsuccess = (event) => {
  console.log("Database deleted successfully");
};
```

Usually, you should just handle it automatically by calling `IDBDatabase.close()` from inside the `versionchange` event handler in the second tab:

```js
// db is an open connection (e.g. from a previous indexedDB.open() success)
db.addEventListener("versionchange", () => {
  db.close();
});
```

## See also

- Using IndexedDB
- Starting transactions: `IDBDatabase`
- Using transactions: `IDBTransaction`
- Setting a range of keys: `IDBKeyRange`
- Retrieving and making changes to your data: `IDBObjectStore`
- Using cursors: `IDBCursor`
- Reference example: To-do Notifications (View the example live).
