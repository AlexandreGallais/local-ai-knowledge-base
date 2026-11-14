---
title: "IDBRequest: readyState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbrequest/readystate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBRequest: readyState property

The **`readyState`** read-only property of the
`IDBRequest` interface returns the state of the request.

Every request starts in the `pending` state. The state changes to
`done` when the request completes successfully or when an error
occurs.

## Value

One of the following strings:

- `pending`
    Returned if the request is still ongoing.
- `done`
    Returned if the request has already completed.

## Examples

The following example requests a given record title, `onsuccess` gets the
associated record from the `IDBObjectStore` (made available
as `objectStoreTitleRequest.result`), updates
one property of the record, and then puts the updated record back into the object
store in another request. The `readyState` of the 2nd request is logged to
the developer console. For a full working example, see our
To-do Notifications app
(View the example live).

```js
const title = "Walk dog";

// Open up a transaction as usual
const objectStore = db
  .transaction(["toDoList"], "readwrite")
  .objectStore("toDoList");

// Get the to-do list object that has this title as its title
const objectStoreTitleRequest = objectStore.get(title);

objectStoreTitleRequest.onsuccess = () => {
  // Grab the data object returned as the result
  const data = objectStoreTitleRequest.result;

  // Update the notified value in the object to "yes"
  data.notified = "yes";

  // Create another request that inserts the item
  // back into the database
  const updateTitleRequest = objectStore.put(data);

  // Log the readyState of this request
  console.log(
    `The readyState of this request is ${updateTitleRequest.readyState}`,
  );

  // When this new request succeeds, run the displayData()
  // function again to update the display
  updateTitleRequest.onsuccess = () => {
    displayData();
  };
};
```

## See also

- Using IndexedDB
- Starting transactions: `IDBDatabase`
- Using transactions: `IDBTransaction`
- Setting a range of keys: `IDBKeyRange`
- Retrieving and making changes to your data: `IDBObjectStore`
- Using cursors: `IDBCursor`
- Reference example: To-do Notifications (View the example live).
