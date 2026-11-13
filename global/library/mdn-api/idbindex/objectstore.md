---
title: "IDBIndex: objectStore property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbindex/objectstore/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBIndex: objectStore property

The **`objectStore`** read-only property of the `IDBIndex` interface returns the object store referenced by the current index.

## Value

An `IDBObjectStore`.

## Examples

In the following example we open a transaction and an object store, then get the
index `lName` from a simple contacts database. We then open a basic <example-value> on
the index using `IDBIndex.openCursor`. This works the same as opening a
cursor directly on an `ObjectStore` using
`IDBObjectStore.openCursor` except that the returned records are sorted
based on the index, not the primary key.

The current object store is logged to the console: it should be returned something like
this:

```plain
IDBObjectStore { name: "contactsList", keyPath: "id", indexNames: DOMStringList[7], transaction: IDBTransaction, autoIncrement: false }
```

Finally, we iterate through each record, and insert the data into an HTML table. For a
complete working example, see our IndexedDB-examples demo repo (View the example live).

```js
function displayDataByIndex() {
  tableEntry.textContent = "";
  const transaction = db.transaction(["contactsList"], "readonly");
  const objectStore = transaction.objectStore("contactsList");

  const myIndex = objectStore.index("lName");
  console.log(myIndex.objectStore);

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
