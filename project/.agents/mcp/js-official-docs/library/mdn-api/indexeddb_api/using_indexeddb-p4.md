---
title: "Using IndexedDB (part 4 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/indexeddb_api/using_indexeddb/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using IndexedDB (part 4 of 4)

### Using an index

Storing customer data using the SSN as a key is logical since the SSN uniquely identifies an individual. (Whether this is a good idea for privacy is a different question, and outside the scope of this article.) If you need to look up a customer by name, however, you'll need to iterate over every SSN in the database until you find the right one. Searching in this fashion would be very slow, so instead you can use an index.

```js
// First, make sure you created index in request.onupgradeneeded:
// objectStore.createIndex("name", "name");
// Otherwise you will get DOMException.

const index = objectStore.index("name");

index.get("Donna").onsuccess = (event) => {
  console.log(`Donna's SSN is ${event.target.result.ssn}`);
};
```

The "name" index isn't unique, so there could be more than one entry with the `name` set to `"Donna"`. In that case you always get the one with the lowest key value.

If you need to access all the entries with a given `name` you can use a cursor. You can open two different types of cursors on indexes. A normal cursor maps the index property to the object in the object store. A key <example-value> maps the index property to the key used to store the object in the object store. The differences are illustrated here:

```js
// Using a normal cursor to grab whole customer record objects
index.openCursor().onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    // cursor.key is a name, like "Bill", and cursor.value is the whole object.
    console.log(
      `Name: ${cursor.key}, SSN: ${cursor.value.ssn}, email: ${cursor.value.email}`,
    );
    cursor.continue();
  }
};

// Using a key <example-value> to grab customer record object keys
index.openKeyCursor().onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    // cursor.key is a name, like "Bill", and cursor.primaryKey is the SSN.
    // No way to directly get the rest of the stored object.
    console.log(`Name: ${cursor.key}, SSN: ${cursor.primaryKey}`);
    cursor.continue();
  }
};
```

The index can also be created on multiple properties, allowing you to look up records using a combination of values, such as finding a person by both their name and email. To create a compound index, pass an array of property names as the key path when calling `createIndex`. You can then query the index by passing an array of values in the same order.

First, make sure you created the index in `request.onupgradeneeded`:

```js
const index = objectStore.createIndex("name_email", ["name", "email"]);
```

Then later you can query the index like this:

```js
const index = objectStore.index("name_email");

index.get(["Donna", "user@example.com"]).onsuccess = (event) => {
  console.log(event.target.result);
  // {ssn: '555-55-5555', name: 'Donna', age: 32, email: 'user@example.com'}
};
```

### Specifying the range and direction of cursors

If you would like to limit the range of values you see in a cursor, you can use an `IDBKeyRange` object and pass it as the first argument to `openCursor()` or `openKeyCursor()`. You can make a key range that only allows a single key, or one that has a lower or upper bound, or one that has both a lower and upper bound. The bound may be "closed" (i.e., the key range includes the given value(s)) or "open" (i.e., the key range does not include the given value(s)). Here's how it works:

```js
// Only match "Donna"
const singleKeyRange = IDBKeyRange.only("Donna");

// Match anything past "Bill", including "Bill"
const lowerBoundKeyRange = IDBKeyRange.lowerBound("Bill");

// Match anything past "Bill", but don't include "Bill"
const lowerBoundOpenKeyRange = IDBKeyRange.lowerBound("Bill", true);

// Match anything up to, but not including, "Donna"
const upperBoundOpenKeyRange = IDBKeyRange.upperBound("Donna", true);

// Match anything between "Bill" and "Donna", but not including "Donna"
const boundKeyRange = IDBKeyRange.bound("Bill", "Donna", false, true);

// To use one of the key <example-value>, pass it in as the first argument of openCursor()/openKeyCursor()
index.openCursor(boundKeyRange).onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    // Do something with the matches.
    cursor.continue();
  }
};
```

Sometimes you may want to iterate in descending order rather than in ascending order (the default direction for all cursors). Switching direction is accomplished by passing `prev` to the `openCursor()` function as the second argument:

```js
objectStore.openCursor(boundKeyRange, "prev").onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    // Do something with the entries.
    cursor.continue();
  }
};
```

If you just want to specify a change of direction but not constrain the results shown, you can just pass in null as the first argument:

```js
objectStore.openCursor(null, "prev").onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    // Do something with the entries.
    cursor.continue();
  }
};
```

Since the "name" index isn't unique, there might be multiple entries where `name` is the same. Note that such a situation cannot occur with object stores since the key must always be unique. If you wish to filter out duplicates during cursor iteration over indexes, you can pass `nextunique` (or `prevunique` if you're going backwards) as the direction parameter. When `nextunique` or `prevunique` is used, the entry with the lowest key is always the one returned.

```js
index.openKeyCursor(null, "nextunique").onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    // Do something with the entries.
    cursor.continue();
  }
};
```

Please see "IDBCursor Constants" for the valid direction arguments.

## Version changes while a web app is open in another tab

When your web app changes in such a way that a version change is required for your database, you need to consider what happens if the user has the old version of your app open in one tab and then loads the new version of your app in another. When you call `open()` with a greater version than the actual version of the database, all other open databases must explicitly acknowledge the request before you can start making changes to the database (an `onblocked` event is fired until they are closed or reloaded). Here's how it works:

```js
const openReq = mozIndexedDB.open("MyTestDatabase", 2);

openReq.onblocked = (event) => {
  // If some other tab is loaded with the database, then it needs to be closed
  // before we can proceed.
  console.log("Please close all other tabs with this site open!");
};

openReq.onupgradeneeded = (event) => {
  // All other databases have been closed. Set everything up.
  db.createObjectStore(/* … */);
  useDatabase(db);
};

openReq.onsuccess = (event) => {
  const db = event.target.result;
  useDatabase(db);
};

function useDatabase(db) {
  // Make sure to add a handler to be notified if another page requests a version
  // change. We must close the database. This allows the other page to upgrade the database.
  // If you don't do this then the upgrade won't happen until the user closes the tab.
  db.onversionchange = (event) => {
    db.close();
    console.log(
      "A new version of this page is ready. Please reload or close this tab!",
    );
  };

  // Do stuff with the database.
}
```

You should also listen for `VersionError` errors to handle the situation where already opened apps may initiate code leading to a new attempt to open the database, but using an outdated version.

## Security

IndexedDB uses the same-origin principle, which means that it ties the store to the origin of the site that creates it (typically, this is the site domain or subdomain), so it cannot be accessed by any other origin.

Third party window content (e.g., `` content) cannot access IndexedDB if the browser is set to never accept third-party cookies (see Firefox bug 1147821).

## Warning about browser shutdown

When the browser shuts down (because the user chose the Quit or Exit option), the disk containing the database is removed unexpectedly, or permissions are lost to the database store, the following things happen:

1. Each transaction on every affected database (or all open databases, in the case of browser shutdown) is aborted with an `AbortError`. The effect is the same as if `IDBTransaction.abort()` is called on each transaction.
2. Once all of the transactions have completed, the database connection is closed.
3. Finally, the `IDBDatabase` object representing the database connection receives a `close` event. You can use the `IDBDatabase.onclose` event handler to listen for these events, so that you know when a database is unexpectedly closed.

The behavior described above is new, and is only available as of the following browser releases: Firefox 50, Google Chrome 31 (approximately).

Prior to these browser versions, the transactions are aborted silently, and no `close` event is fired, so there is no way to detect an unexpected database closure.

Since the user can exit the browser at any time, this means that you cannot rely upon any particular transaction to complete, and on older browsers, you don't even get told when they don't complete. There are several implications of this behavior.

First, you should take care to always leave your database in a consistent state at the end of every transaction. For example, suppose that you are using IndexedDB to store a list of items that you allow the user to edit. You save the list after the edit by clearing the object store and then writing out the new list. If you clear the object store in one transaction and write the new list in another transaction, there is a danger that the browser will close after the clear but before the write, leaving you with an empty database. To avoid this, you should combine the clear and the write into a single transaction.

Second, you should never tie database transactions to unload events. If the unload event is triggered by the browser closing, any transactions created in the unload event handler will never complete. An intuitive approach to maintaining some information across browser sessions is to read it from the database when the browser (or a particular page) is opened, update it as the user interacts with the browser, and then save it to the database when the browser (or page) closes. However, this will not work. The database transactions will be created in the unload event handler, but because they are asynchronous they will be aborted before they can execute.

In fact, there is no way to guarantee that IndexedDB transactions will complete, even with normal browser shutdown. See Firefox bug 870645. As a workaround for this normal shutdown notification, you might track your transactions and add a `beforeunload` event to warn the user if any transactions have not yet completed at the time of unloading.

At least with the addition of the abort notifications and `IDBDatabase.onclose`, you can know when this has happened.

## Full IndexedDB example

We have a complete example using the IndexedDB API. The example uses IndexedDB to store and retrieve publications.

- Try the example
- See the source code

## See also

Further reading for you to find out more information if desired.

### Reference

- IndexedDB API Reference
- Indexed Database API Specification
- IndexedDB interface files in the Firefox source code

### Tutorials and guides

- Databinding UI Elements with IndexedDB (2012)
- IndexedDB — The Store in Your Browser

### Libraries

- localForage: A Polyfill providing a simple name:value syntax for client-side data storage, which uses IndexedDB in the background, but falls back to Web SQL (deprecated) and then localStorage in browsers that don't support IndexedDB.
- Dexie.js: A wrapper for IndexedDB that allows much faster code development via nice, simple syntax.
- JsStore: A simple and advanced IndexedDB wrapper having SQL like syntax.
- MiniMongo: A client-side in-memory MongoDB backed by localstorage with server sync over http. MiniMongo is used by MeteorJS.
- PouchDB: A client-side implementation of CouchDB in the browser using IndexedDB
- IDB: A tiny library that mostly mirrors the IndexedDB API but with small usability improvements.
- idb-keyval: A super-simple-small (\~600B) promise-based key-value store implemented with IndexedDB
- $mol_db: Tiny (\~1.3kB) TypeScript facade with promise-based API and automatic migrations.
- RxDB: A NoSQL client-side database that can be used on top of IndexedDB. Supports indexes, compression and replication. Also adds cross tab functionality and observability to IndexedDB.
