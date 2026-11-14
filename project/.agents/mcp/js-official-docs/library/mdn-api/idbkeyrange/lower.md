---
title: "IDBKeyRange: lower property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbkeyrange/lower/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBKeyRange: lower property

The **`lower`** read-only property of the
`IDBKeyRange` interface returns the lower bound of the key range.

## Value

The lower bound of the key range (can be any
type.)

## Examples

The following example illustrates how you'd use a key range. Here we
declare `keyRangeValue = IDBKeyRange.upperBound("F", "W", true, true);` — a
range that includes everything between "F" and "W" but not including them — since both
the upper and lower bounds have been declared as open (`true`). We open a
transaction (using `IDBTransaction`) and an object store, and open a Cursor
with `IDBObjectStore.openCursor`, declaring `keyRangeValue` as
its optional key range value.

After declaring the key range, we log its `lower` property value to the
console, which should appear as "F".

> **Note:**
> For a more complete example allowing you to experiment with
> key range, have a look at our IDBKeyRange-example repo.
> (View the example live too.

```js
function displayData() {
  const keyRangeValue = IDBKeyRange.bound("F", "W", true, true);
  console.log(keyRangeValue.lower);

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
