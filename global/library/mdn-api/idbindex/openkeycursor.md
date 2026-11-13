---
title: "IDBIndex: openKeyCursor() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbindex/openkeycursor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBIndex: openKeyCursor() method

The **`openKeyCursor()`** method of the
`IDBIndex` interface returns an `IDBRequest` object, and, in
a separate thread, creates a cursor over the specified key range, as arranged by this
index.

The method sets the position of the cursor to the appropriate key, based on the
specified direction.

If the key range is not specified or is null, then the range includes all the keys.

> **Note:**
> Cursors returned by `openKeyCursor()` do not
> make the referenced value available as `IDBIndex.openCursor` does.
> This makes obtaining a list of keys much more efficient.

## Syntax

```js
openKeyCursor()
openKeyCursor(range)
openKeyCursor(range, direction)
```

### Parameters

- `range` (optional)
    A key or `IDBKeyRange` to use as the cursor's range. If nothing is
    passed, this will default to a key range that selects all the records in this object
    store.
- `direction` (optional)
    The cursor's direction. See IDBCursor Constants for possible
    values.

### Return value

An `IDBRequest` object on which subsequent events related to this operation are fired.

If the operation is successful, the value of the request's `result` property is:

- an `IDBCursor` object pointing at the first record matching the given query
- `null` if no matching records were found.

### Exceptions

This method may raise a `DOMException` of one of the following types:

- `TransactionInactiveError` `DOMException`
    Thrown if this `IDBIndex`'s transaction is inactive.
- `TypeError`
    Thrown if the value for the direction parameter is invalid.
- `DataError` `DOMException`
    Thrown if the key or key range provided contains an invalid key.
- `InvalidStateError` `DOMException`
    Thrown if the `IDBIndex` has been deleted or removed.

## Examples

In the following example we open a transaction and an object store, then get the
index `lName` from a simple contacts database. We then open a key <example-value> on
the index using `openKeyCursor()` — this works the same as opening a cursor
directly on an `ObjectStore` using
`IDBObjectStore.openKeyCursor` except that the returned records are sorted
based on the index, not the primary key.

Finally, we iterate through each record in the index, and insert the last name and the
corresponding primary key of the referenced record into an HTML table.

```js
function displayDataByIndex() {
  tableEntry.textContent = "";
  const transaction = db.transaction(["contactsList"], "readonly");
  const objectStore = transaction.objectStore("contactsList");

  const myIndex = objectStore.index("lName");

  myIndex.openKeyCursor().onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const tableRow = document.createElement("tr");
      tableRow.appendChild(document.createElement("td")).textContent =
        cursor.key;
      tableRow.appendChild(document.createElement("td")).textContent =
        cursor.primaryKey;
      tableEntry.appendChild(tableRow);

      cursor.continue();
    } else {
      console.log("All last names displayed.");
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
