---
title: "IDBKeyRange: bound() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbkeyrange/bound_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBKeyRange: bound() static method

The **`bound()`** static method of the `IDBKeyRange`
interface creates a new key range with the specified upper and lower bounds. The
bounds can be open (that is, the bounds exclude the endpoint values) or closed (that
is, the bounds include the endpoint values). By default, the bounds are closed.

## Syntax

```js
IDBKeyRange.bound(lower, upper)
IDBKeyRange.bound(lower, upper, lowerOpen)
IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen)
```

### Parameters

- `lower`
    specifies the lower bound of the new key range.
- `upper`
    specifies the upper bound of the new key range.
- `lowerOpen` (optional)
    indicates whether the lower bound excludes the endpoint value. The default is
    false.
- `upperOpen` (optional)
    Indicates whether the upper bound excludes the endpoint value. The default is
    false.

### Return value

`IDBKeyRange`: The newly created key range.

### Exceptions

- `DataError` `DOMException`
    Thrown when one of the following conditions is met:
    - The lower or upper parameters were not passed a valid key.
    - The lower key is greater than the upper key.
    - The lower key and upper key match and either of the bounds are open.

## Examples

The following example illustrates how you'd use a bound key range. Here we declare
a `keyRangeValue = IDBKeyRange.bound("A", "F");` — a range between values of
"A" and "F". We open a transaction (using `IDBTransaction`) and an object
store, and open a Cursor with `IDBObjectStore.openCursor`,
declaring `keyRangeValue` as its optional key range value. This means that
the cursor will only retrieve records with keys inside that range. This range includes
the values "A" and "F", as we haven't declared that they should be open bounds. If we
used `IDBKeyRange.bound("A", "F", true, true);`, then the range would not
include `"A"` and `"F"`, only the values between them.

> **Note:**
> For a more complete example allowing you to experiment with
> key range, have a look at the idbkeyrange directory in the indexeddb-examples repo. (View the example live too.

```js
function displayData() {
  const keyRangeValue = IDBKeyRange.bound("A", "F");

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
