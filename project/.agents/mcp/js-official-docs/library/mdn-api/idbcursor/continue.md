---
title: "IDBCursor: continue() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbcursor/continue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBCursor: continue() method

The **`continue()`** method of the `IDBCursor`
interface advances the cursor to the next position along its direction, to the item
whose key <example-value> the optional key parameter. If no key is specified, the cursor
advances to the immediate next position, based on its direction.

## Syntax

```js
continue()
continue(key)
```

### Parameters

- `key` (optional)
    The key to position the cursor at.

### Return value

None (`undefined`).

### Exceptions

This method may raise a `DOMException` of one of the following types:

- `TransactionInactiveError` `DOMException`
    Thrown if this `IDBCursor`'s transaction is inactive.
- `DataError` `DOMException`
    Thrown if the key <example-value> has any of the following conditions:
    - The key is not a valid key.
    - The key is less than or equal to this cursor's position, and the cursor's direction is `next` or `nextunique`.
    - The key is greater than or equal to this cursor's position and this cursor's direction is `prev` or `prevunique`.
- `InvalidStateError` `DOMException`
    Thrown if the cursor is currently being iterated or has iterated past its end.

## Examples

In this simple fragment we create a transaction, retrieve an object store, then use a
cursor to iterate through all the records in the object store. The cursor does not
require us to select the data based on a key; we can just grab all of it. Also note that
in each iteration of the loop, you can grab data from the current record under the
cursor object using `cursor.value.foo`. For a complete working example, see
our IDBCursor example (View the example live).

```js
function displayData() {
  const transaction = db.transaction(["rushAlbumList"], "readonly");
  const objectStore = transaction.objectStore("rushAlbumList");

  objectStore.openCursor().onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const listItem = document.createElement("li");
      listItem.textContent = `${cursor.value.albumTitle}, ${cursor.value.year}`;
      list.appendChild(listItem);

      cursor.continue();
    } else {
      console.log("Entries all displayed.");
    }
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
