---
title: "IDBCursor: source property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbcursor/source/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBCursor: source property

The **`source`** read-only property of the
`IDBCursor` interface returns the `IDBObjectStore` or
`IDBIndex` that the cursor is iterating over. This function never returns
null or throws an exception, even if the cursor is currently being iterated, has
iterated past its end, or its transaction is not active.

## Value

The `IDBObjectStore` or `IDBIndex` that the cursor is
iterating over.

## Examples

In this simple fragment we create a transaction, retrieve an object store, then use a
cursor to iterate through all the records in the object store. Within each iteration we
log the source of the cursor, which will log our `IDBObjectStore` object to
the console.

The cursor does not require us to select the data based
on a key; we can just grab all of it. Also note that in each iteration of the loop,
you can grab data from the current record under the cursor object using `cursor.value.foo`. For a complete working example, see our IDBCursor example (View the example live).

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

      console.log(cursor.source);
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
