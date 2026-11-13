---
title: "IDBKeyRange: lowerBound() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbkeyrange/lowerbound_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBKeyRange: lowerBound() static method

The **`lowerBound()`** static method of the
`IDBKeyRange` interface creates a new key range with only a lower bound.
By default, it includes the lower endpoint value and is closed.

## Syntax

```js
IDBKeyRange.lowerBound(lower)
IDBKeyRange.lowerBound(lower, open)
```

### Parameters

- `lower`
    Specifies the lower bound of the new key range.
- `open` (optional)
    Indicates whether the lower bound excludes the endpoint value. The default is
    false.

### Return value

`IDBKeyRange`: The newly created key range.

### Exceptions

- `DataError` `DOMException`
    Thrown if the key <example-value> with the `lower` parameter is not a valid key.

## Examples

The following example illustrates how you'd use a lower bound key range. Here we
declare `keyRangeValue = IDBKeyRange.lowerBound("F", false);` — a range that
includes the value "F" and everything after it. We open a transaction (using
`IDBTransaction`) and an object store, and open a Cursor with
`IDBObjectStore.openCursor`, declaring `keyRangeValue` as its
optional key range value. This means that the cursor will only retrieve the record with
the key value "F" and all that come after it. If we used
`IDBKeyRange.lowerBound("F", true);`, then the range would not include "F";
only the values after it.

> **Note:**
> For a more complete example allowing you to experiment with
> key range, have a look at our IDBKeyRange-example repo
> (view the example live too.)

```js
function displayData() {
  const keyRangeValue = IDBKeyRange.lowerBound("F");

  const transaction = db.transaction(["fThings"], "readonly");
  const objectStore = transaction.objectStore("fThings");

  objectStore.openCursor(keyRangeValue).onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const listItem = document.createElement("li");
      listItem.textContent = `${cursor.value.fThing}, ${cursor.value.fRating}`;
      list.appendChild(listItem);

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
