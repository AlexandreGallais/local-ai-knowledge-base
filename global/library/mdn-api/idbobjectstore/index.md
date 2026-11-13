---
title: "IDBObjectStore: index() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbobjectstore/index/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBObjectStore: index() method

The **`index()`** method of the `IDBObjectStore`
interface opens a named index in the current object store, after which it can be used
to, for example, return a series of records sorted by that index using a cursor.

## Syntax

```js
index(name)
```

### Parameters

- `name`
    The name of the index to open.

### Return value

An `IDBIndex` object for accessing the index.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the source object store has been deleted, or the transaction for the object store has finished.
- `NotFoundError` `DOMException`
    Thrown if there is no index with the given name (case-sensitive) in the database.

## Examples

In the following example we open a transaction and an object store, then get the index
`lName` from a simple contacts database. We then open a basic <example-value> on the
index using `IDBIndex.openCursor` — this works the same as opening a cursor
directly on an `ObjectStore` using `IDBObjectStore.openCursor`
except that the returned records are sorted based on the index, not the primary key.

Finally, we iterate through each record, and insert the data into an HTML table. For a
complete working example, see our IDBIndex example in IndexedDB-examples demo repo (View the example live.)

```js
function displayDataByIndex() {
  tableEntry.textContent = "";
  const transaction = db.transaction(["contactsList"], "readonly");
  const objectStore = transaction.objectStore("contactsList");

  const myIndex = objectStore.index("lName");
  myIndex.openCursor().onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const tableRow = document.createElement("tr");
      for (const cell of [
        cursor.value.id,
        cursor.value.lName,
        cursor.value.fName,
        cursor.value.jTitle,
        cursor.value.company,
        cursor.value.eMail,
        cursor.value.phone,
        cursor.value.age,
      ]) {
        const tableCell = document.createElement("td");
        tableCell.textContent = cell;
        tableRow.appendChild(tableCell);
      }
      tableEntry.appendChild(tableRow);

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
