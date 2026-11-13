---
title: "IDBKeyRange: only() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbkeyrange/only_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBKeyRange: only() static method

The **`only()`** static method of the `IDBKeyRange`
interface creates a new key range containing a single value.

## Syntax

```js
IDBKeyRange.only(value)
```

### Parameters

- `value`
    The value for the new key range.

### Return value

`IDBKeyRange`: The newly created key range.

### Exceptions

- `DataError` `DOMException`
    Thrown if the `value` parameter was not a valid key.

## Examples

The following example illustrates how you'd use an only key range. Here we declare
a `keyRangeValue = IDBKeyRange.only("A");` — a range that only includes the
value "A". We open a transaction (using `IDBTransaction`) and an object
store, and open a Cursor with `IDBObjectStore.openCursor`,
declaring `keyRangeValue` as its optional key range value. This means that
the cursor will only retrieve the record with the key value "A".

> **Note:**
> For a more complete example allowing you to experiment with
> key range, have a look at our IDBKeyRange
> repo (view the example live too.)

```js
function displayData() {
  const keyRangeValue = IDBKeyRange.only("A");

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
