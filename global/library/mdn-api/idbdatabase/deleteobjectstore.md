---
title: "IDBDatabase: deleteObjectStore() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbdatabase/deleteobjectstore/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBDatabase: deleteObjectStore() method

The **`deleteObjectStore()`** method of the
`IDBDatabase` interface destroys the object store with the given name in
the connected database, along with any indexes that reference it.

As with `IDBDatabase.createObjectStore`, this method can be called
_only_ within a `versionchange`
transaction.

## Syntax

```js
deleteObjectStore(name)
```

### Parameters

- `name`
    The name of the object store you want to delete. Names are
    case sensitive.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the method was not called from a `versionchange` transaction callback.
- `TransactionInactiveError` `DOMException`
    Thrown if a request is made on a source database that doesn't exist (E.g. has been deleted or removed.)
- `NotFoundError` `DOMException`
    Thrown when trying to delete an object store that does not exist.

## Examples

```js
const dbName = "sampleDB";
const dbVersion = 2;
const request = indexedDB.open(dbName, dbVersion);

request.onupgradeneeded = (event) => {
  const db = request.result;
  if (event.oldVersion < 1) {
    db.createObjectStore("store1");
  }

  if (event.oldVersion < 2) {
    db.deleteObjectStore("store1");
    db.createObjectStore("store2");
  }

  // etc. for version < 3, 4…
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
