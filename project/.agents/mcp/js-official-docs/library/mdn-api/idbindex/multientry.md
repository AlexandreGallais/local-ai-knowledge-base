---
title: "IDBIndex: multiEntry property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbindex/multientry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBIndex: multiEntry property

The **`multiEntry`** read-only property of the
`IDBIndex` interface returns a boolean value that affects how the index
behaves when the result of evaluating the index's key path yields an array.

This is decided when the index is created, using the
`IDBObjectStore.createIndex` method. This method takes an optional
`options` parameter whose `multiEntry` property is set to `true`/`false`.

## Value

A boolean value:

| Value | Effect                                                              |
| ----- | ------------------------------------------------------------------- |
| true  | There is one record in the index for each item in an array of keys. |
| false | There is one record for each key that is an array.                  |

## Examples

In the following example we open a transaction and an object store, then get the
index `lName` from a simple contacts database. We then open a basic <example-value> on
the index using `IDBIndex.openCursor` — this works the same as opening a
cursor directly on an `ObjectStore` using
`IDBObjectStore.openCursor` except that the returned records are sorted
based on the index, not the primary key.

The multi-entry status of the index is logged to the console: it should be returned
as `false`.

Finally, we iterate through each record, and insert the data into an HTML table. For a
complete working example, see our IndexedDB-examples demo repo (View the example live).

```js
function displayDataByIndex() {
  tableEntry.textContent = "";
  const transaction = db.transaction(["contactsList"], "readonly");
  const objectStore = transaction.objectStore("contactsList");

  const myIndex = objectStore.index("lName");
  console.log(myIndex.multiEntry);

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
