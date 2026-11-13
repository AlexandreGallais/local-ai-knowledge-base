---
title: "IDBIndex: locale property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbindex/locale/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBIndex: locale property

The **`locale`** read-only property of the `IDBIndex` interface returns the locale of the index (for example `en-US`, or `pl`) if it had a `locale` value specified upon its creation (see the `options` parameter to `IDBObjectStore.createIndex()`.) Note that this property always returns the current locale being used in this index, in other words, it never returns `"auto"`.

## Value

A string.

## Examples

In the following example we open a transaction and an object store, then get the index `lName` from a simple contacts database. We then open a basic <example-value> on the index using `IDBIndex.openCursor` — this works the same as opening a cursor directly on an `ObjectStore` using `IDBObjectStore.openCursor` except that the returned records are sorted based on the index, not the primary key.

The `locale` value is logged to the console.

```js
function displayDataByIndex() {
  tableEntry.textContent = "";
  const transaction = db.transaction(["contactsList"], "readonly");
  const objectStore = transaction.objectStore("contactsList");

  const myIndex = objectStore.index("lName");
  console.log(myIndex.locale);

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

## Specifications

Not currently part of any specification.

## See also

- Using IndexedDB
- Starting transactions: `IDBDatabase`
- Using transactions: `IDBTransaction`
- Setting a range of keys: `IDBKeyRange`
- Retrieving and making changes to your data: `IDBObjectStore`
- Using cursors: `IDBCursor`
- Reference example: To-do Notifications (View the example live).
