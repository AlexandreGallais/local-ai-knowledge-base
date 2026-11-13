---
title: "IDBOpenDBRequest: blocked event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbopendbrequest/blocked_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBOpenDBRequest: blocked event

The `blocked` handler is executed when an open connection to a database is blocking a `versionchange` transaction on the same database.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("blocked", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onblocked = (event) => { }
```

## Event type

An `IDBVersionChangeEvent`. Inherits from `Event`.

## Examples

Using `addEventListener()`:

```js
// Open the database
const DBOpenRequest = window.indexedDB.open("toDoList", 4);

DBOpenRequest.onupgradeneeded = (event) => {
  const db = event.target.result;

  db.onerror = () => {
    console.log("Error creating database");
  };

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

DBOpenRequest.onsuccess = (event) => {
  // Let's try to open the same database with a higher revision version
  const req2 = indexedDB.open("toDoList", 5);

  // In this case the onblocked handler will be executed
  req2.addEventListener("blocked", () => {
    console.log("Request was blocked");
  });
};
```

Using the `onblocked` property (but note that this replaces other event listeners added using `onblocked`, if any):

```js
// Open the database
const DBOpenRequest = window.indexedDB.open("toDoList", 4);

DBOpenRequest.onupgradeneeded = (event) => {
  const db = event.target.result;

  db.onerror = () => {
    console.log("Error creating database");
  };

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

DBOpenRequest.onsuccess = (event) => {
  // Let's try to open the same database with a higher revision version
  const req2 = indexedDB.open("toDoList", 5);

  // In this case the onblocked handler will be executed
  req2.onblocked = () => {
    console.log("Request was blocked");
  };
};
```

## See also

- Using IndexedDB
