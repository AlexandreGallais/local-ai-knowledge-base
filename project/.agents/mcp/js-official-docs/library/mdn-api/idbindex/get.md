---
title: "IDBIndex: get() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbindex/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBIndex: get() method

The **`get()`** method of the `IDBIndex`
interface returns an `IDBRequest` object, and, in a separate thread,
finds either the value in the referenced object store that corresponds to the given
key or the first corresponding value, if `key` is set to an
`IDBKeyRange`.

If a value is found, then a structured clone of it is created and set as the
`result` of the request object: this returns the record the key is associated
with.

## Syntax

```js
get()
get(key)
```

### Parameters

- `key` (optional)
    A key or `IDBKeyRange` that identifies the record to be retrieved. If
    this value is null or missing, the browser will use an unbound key range.

### Return value

An `IDBRequest` object on which subsequent events related to this operation are fired.

If the operation is successful, the value of the request's `result` property is the value of the first record matching the given key or key range.

### Exceptions

This method may raise a `DOMException` of one of the following types:

- `TransactionInactiveError` `DOMException`
    Thrown if this `IDBIndex`'s transaction is inactive.
- `DataError` `DOMException`
    Thrown if the key or key range provided contains an invalid key.
- `InvalidStateError` `DOMException`
    Thrown if the `IDBIndex` has been deleted or removed.

## Examples

In the following example we open a transaction and an object store, then get the
index `lName` from a simple contacts database. We then open a basic <example-value> on
the index using `IDBIndex.openCursor` — this works the same as opening a
cursor directly on an `ObjectStore` using
`IDBObjectStore.openCursor` except that the returned records are sorted
based on the index, not the primary key.

`myIndex.get('Bungle')` is then used to retrieve the record with an
`lName` of `Bungle`, and the result of that request is logged to
the console when its success callback returns.

Finally, we iterate through each record, and insert the data into an HTML table. For a
complete working example, see our IndexedDB-examples demo repo (View the example live).

```js
function displayDataByIndex() {
  tableEntry.textContent = "";
  const transaction = db.transaction(["contactsList"], "readonly");
  const objectStore = transaction.objectStore("contactsList");

  const myIndex = objectStore.index("lName");
  const getRequest = myIndex.get("Bungle");
  getRequest.onsuccess = () => {
    console.log(getRequest.result);
  };

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
