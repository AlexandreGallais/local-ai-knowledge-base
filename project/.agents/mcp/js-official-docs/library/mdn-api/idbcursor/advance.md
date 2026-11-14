---
title: "IDBCursor: advance() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbcursor/advance/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBCursor: advance() method

The **`advance()`** method of the `IDBCursor`
interface sets the number of times a cursor should move
its position forward.

## Syntax

```js
advance(count)
```

### Parameters

- `count`
    The number of times to move the cursor forward.

### Return value

None (`undefined`).

### Exceptions

This method may raise a `DOMException` of one of the following types:

- `TransactionInactiveError` `DOMException`
    Thrown if this `IDBCursor`'s transaction is inactive.
- `TypeError`
    Thrown if the value passed into the `count` parameter was zero or a negative number.
- `InvalidStateError` `DOMException`
    Thrown if the cursor is currently being iterated or has iterated past its end.

## Examples

In this simple fragment we create a transaction, retrieve an object store, then use a
cursor to iterate through the records in the object store. Here we use
`cursor.advance(2)` to jump 2 places forward each time, meaning that only
every other result will be displayed. `advance()` works in a similar way to
`IDBCursor.continue`, except that it allows you to jump multiple records at
a time, not just always go onto the next record.

Note that in each iteration of the loop, you can grab
data from the current record under the cursor object using `cursor.value.foo`. For a complete working example, see our IDBCursor example (View the example live).

```js
function advanceResult() {
  list.textContent = "";
  const transaction = db.transaction(["rushAlbumList"], "readonly");
  const objectStore = transaction.objectStore("rushAlbumList");

  objectStore.openCursor().onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const listItem = document.createElement("li");
      listItem.textContent = `${cursor.value.albumTitle}, ${cursor.value.year}`;
      list.appendChild(listItem);
      cursor.advance(2);
    } else {
      console.log("Every other entry displayed.");
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
