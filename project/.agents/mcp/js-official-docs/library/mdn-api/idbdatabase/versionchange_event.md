---
title: "IDBDatabase: versionchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbdatabase/versionchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBDatabase: versionchange event

The `versionchange` event is fired when a database structure change (`upgradeneeded` event send on an `IDBOpenDBRequest` or `IDBFactory.deleteDatabase`) was requested elsewhere (most probably in
another window/tab on the same computer).

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("versionchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onversionchange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

This example opens a database and, on success, adds a listener to `versionchange`:

```js
// Open the database
const dBOpenRequest = window.indexedDB.open("Nonexistent", 4);

dBOpenRequest.onupgradeneeded = (event) => {
  const db = event.target.result;
  // Create an objectStore for this database
  const objectStore = db.createObjectStore("toDoList", {
    keyPath: "taskTitle",
  });

  // define what data items the objectStore will contain
  objectStore.createIndex("hours", "hours", { unique: false });
  objectStore.createIndex("minutes", "minutes", { unique: false });
  objectStore.createIndex("day", "day", { unique: false });
  objectStore.createIndex("month", "month", { unique: false });
  objectStore.createIndex("year", "year", { unique: false });
};

dBOpenRequest.addEventListener("success", (event) => {
  const db = event.target.result;
  db.addEventListener("versionchange", (event) => {
    console.log("The version of this database has changed");
  });
});
```

The same example, using the `onversionchange` event handler property (but note that this replaces other event listeners added using `onversionchange` and `onsuccess`, if any):

```js
// Open the database
const dBOpenRequest = window.indexedDB.open("Nonexistent", 4);

dBOpenRequest.onupgradeneeded = (event) => {
  const db = event.target.result;
  // Create an objectStore for this database
  const objectStore = db.createObjectStore("toDoList", {
    keyPath: "taskTitle",
  });

  // define what data items the objectStore will contain
  objectStore.createIndex("hours", "hours", { unique: false });
  objectStore.createIndex("minutes", "minutes", { unique: false });
  objectStore.createIndex("day", "day", { unique: false });
  objectStore.createIndex("month", "month", { unique: false });
  objectStore.createIndex("year", "year", { unique: false });
};

dBOpenRequest.onsuccess = (event) => {
  const db = event.target.result;
  db.onversionchange = (event) => {
    console.log("The version of this database has changed");
  };
};
```

## See also

- Using IndexedDB
