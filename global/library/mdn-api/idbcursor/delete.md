---
title: "IDBCursor: delete() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbcursor/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBCursor: delete() method

The **`delete()`** method of the `IDBCursor`
interface returns an `IDBRequest` object, and, in a separate thread,
deletes the record at the cursor's position, without changing the cursor's position.
Once the record is deleted, the cursor's value is set to null.

Be aware that you can't call `delete()` (or
`IDBCursor.update()`) on cursors obtained from
`IDBIndex.openKeyCursor()`. For such needs, you have to use
`IDBIndex.openCursor()` instead.

## Syntax

```js
delete()
```

### Parameters

None.

### Return value

An `IDBRequest` object on which subsequent events related to this
operation are fired.

If the operation is successful, the value of the request's `result` property is `undefined`.

### Exceptions

This method may raise a `DOMException` of one of the following types:

- `TransactionInactiveError` `DOMException`
    Thrown if this IDBCursor's transaction is inactive.
- `ReadOnlyError` `DOMException`
    Thrown if the transaction mode is read-only.
- `InvalidStateError` `DOMException`
    Thrown if the cursor was created using `IDBindex.openKeyCursor`, is currently being iterated, or has iterated past its end.

## Examples

In this simple fragment we create a transaction, retrieve an object store, then use a
cursor to iterate through all the records in the object store. If the
`albumTitle` of the current cursor is "Grace under pressure", we delete that
entire record using `const request = cursor.delete();`.

The cursor does not require us to select the data based on a key; we can just grab all
of it. Also note that in each iteration of the loop, you can grab data from the current
record under the cursor object using `cursor.value.foo`. For a complete
working example, see our IDBCursor example (View the example live).

```js
function deleteResult() {
  list.textContent = "";
  const transaction = db.transaction(["rushAlbumList"], "readwrite");
  const objectStore = transaction.objectStore("rushAlbumList");

  objectStore.openCursor().onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      if (cursor.value.albumTitle === "Grace under pressure") {
        const request = cursor.delete();
        request.onsuccess = () => {
          console.log(
            "Deleted that mediocre album from 1984. Even Power windows is better.",
          );
        };
      } else {
        const listItem = document.createElement("li");
        listItem.textContent = `${cursor.value.albumTitle}, ${cursor.value.year}`;
        list.appendChild(listItem);
      }
      cursor.continue();
    } else {
      console.log("Entries displayed.");
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
