---
title: "IDBIndex: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbindex/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBIndex: name property

The **`name`** property of the `IDBIndex`
interface contains a string which names the index.

## Value

A string specifying a name for the index.

### Exceptions

There are a several exceptions that can occur when you attempt to change an index's
name.

- `InvalidStateError` `DOMException`
    Thrown if the index, or its object store, has been deleted or if the current transaction is not
    an upgrade transaction. You can only rename indexes during upgrade transactions; that
    is, when the mode is `"versionchange"`.
- `TransactionInactiveError` `DOMException`
    Thrown if the current transaction is not active.
- `ConstraintError` `DOMException`
    Thrown if an index is already using the specified `name`.

## Examples

In the following example we open a transaction and an object store, then get the
index `lName` from a simple contacts database. We then open a basic <example-value> on
the index using `IDBIndex.openCursor()` — this works the same as opening a
cursor directly on an `IDBObjectStore` using
`openCursor()` except that the returned
records are sorted based on the index, not the primary key.

The name of the index is logged to the console: it should be returned as
`lName`.

Finally, we iterate through each record, inserting the data into an HTML table. For a
complete working example, see our IndexedDB-examples demo repo (View the example live).

```js
function displayDataByIndex() {
  tableEntry.textContent = "";
  const transaction = db.transaction(["contactsList"], "readonly");
  const objectStore = transaction.objectStore("contactsList");

  const myIndex = objectStore.index("lName");
  console.log(myIndex.name);

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
