---
title: "Using IndexedDB (part 2 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/indexeddb_api/using_indexeddb/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using IndexedDB (part 2 of 4)

## Creating and structuring the store

### Opening a database

We start the whole process like this:

```js
// Let us open our database
const request = window.indexedDB.open("MyTestDatabase", 3);
```

See that? Opening a database is just like any other operation — you have to "request" it.

The open request doesn't open the database or start the transaction right away. The call to the `open()` function returns an `IDBOpenDBRequest` object with a result (success) or error value that you handle as an event. Most other asynchronous functions in IndexedDB do the same thing - return an `IDBRequest` object with the result or error. The result for the open function is an instance of an `IDBDatabase`.

The second parameter to the open method is the version of the database. The version of the database determines the database schema — the object stores in the database and their structure. If the database doesn't already exist, it is created by the `open` operation, then an `onupgradeneeded` event is triggered and you create the database schema in the handler for this event. If the database does exist but you are specifying an upgraded version number, an `onupgradeneeded` event is triggered straight away, allowing you to provide an updated schema in its handler. More on this later in Creating or updating the version of the database below, and the `IDBFactory.open` reference page.

> **Warning:**
> Version numbers are integers, so the values passed are subject to rounding—for example, values of 2.1 and 2.4 are both rounded to 2.
> Attempting to upgrade between numbers that round to the same integer will not fire an `onupgradeneeded` event.
> When working with large version numbers please also note the range of integers representable in JavaScript.

#### Generating handlers

The first thing you'll want to do with almost all of the requests you generate is to add success and error handlers:

```js
request.onerror = (event) => {
  // Do something with request.error!
};
request.onsuccess = (event) => {
  // Do something with request.result!
};
```

If the request succeeds, the `success` event is fired, and the function assigned to `onsuccess` is called. If the request fails, the `error` event is fired, and the function assigned to `onerror` is called.

The IndexedDB API is designed to minimize the need for error handling, so you're not likely to see many error events (at least, not once you're used to the API!). In the case of opening a database, however, there are some common conditions that generate error events. The most likely problem is that the user decided not to give your web app permission to create a database. One of the main design goals of IndexedDB is to allow large amounts of data to be stored for offline use. (To learn more about how much storage you can have for each browser, see How much data can be stored? on the Browser storage quotas and eviction criteria page.)

Obviously, browsers do not want to allow some advertising network or malicious website to pollute your computer, so browsers used to prompt the user the first time any given web app attempts to open an IndexedDB for storage. The user could choose to allow or deny access. Also, IndexedDB storage in browsers' privacy modes only lasts in-memory until the incognito session is closed.

Now, assuming that the user allowed your request to create a database, and you've received a success event to trigger the success callback; What's next? The request here was generated with a call to `indexedDB.open()`, so `request.result` is an instance of `IDBDatabase`, and you definitely want to save that for later. Your code might look something like this:

```js
let db;
const request = indexedDB.open("MyTestDatabase");
request.onerror = (event) => {
  console.error("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = (event) => {
  db = event.target.result;
};
```

#### Handling Errors

As mentioned above, error events bubble. Error events are targeted at the request that generated the error, then the event bubbles to the transaction, and then finally to the database object. If you want to avoid adding error handlers to every request, you can instead add a single error handler on the database object, like so:

```js
db.onerror = (event) => {
  // Generic error handler for all errors targeted at this database's
  // requests!
  console.error(`Database error: ${event.target.error?.message}`);
};
```

One of the common possible errors when opening a database is `VER_ERR`. It indicates that the version of the database stored on the disk is _greater_ than the version that you are trying to open. This is an error case that must always be handled by the error handler.

### Creating or updating the version of the database

When you create a new database or increase the version number of an existing database (by specifying a higher version number than you did previously, when Opening a database), the `onupgradeneeded` event will be triggered and an IDBVersionChangeEvent object will be passed to any `onversionchange` event handler set up on `request.result` (i.e., `db` in the example). In the handler for the `upgradeneeded` event, you should create the object stores needed for this version of the database:

```js
// This event is only implemented in recent browsers
request.onupgradeneeded = (event) => {
  // Save the IDBDatabase interface
  const db = event.target.result;

  // Create an objectStore for this database
  const objectStore = db.createObjectStore("name", { keyPath: "myKey" });
};
```

In this case, the database will already have the object stores from the previous version of the database, so you do not have to create these object stores again. You only need to create any new object stores, or delete object stores from the previous version that are no longer needed. If you need to change an existing object store (e.g., to change the `keyPath`), then you must delete the old object store and create it again with the new options. (Note that this will delete the information in the object store! If you need to save that information, you should read it out and save it somewhere else before upgrading the database.)

Trying to create an object store with a name that already exists (or trying to delete an object store with a name that does not already exist) will throw an error.

If the `onupgradeneeded` event exits successfully, the `onsuccess` handler of the open database request will then be triggered.

### Structuring the database

Now to structure the database. IndexedDB uses object stores rather than tables, and a single database can contain any number of object stores. Whenever a value is stored in an object store, it is associated with a key. There are several different ways that a key can be supplied depending on whether the object store uses a key path or a key generator.

The following table shows the different ways the keys are supplied:

       | Key Path (`keyPath`)
       | Key <example-value> (`autoIncrement`)
       | Description

       | No
       | No
       |
        This object store can hold any kind of value, even primitive values like
        numbers and strings. You must supply a separate key <example-value> whenever
        you want to add a new value.

       | Yes
       | No
       |
        This object store can only hold JavaScript objects. The objects must
        have a property with the same name as the key path.

       | No
       | Yes
       |
        This object store can hold any kind of value. The key is generated for
        you automatically, or you can supply a separate key <example-value> if you want
        to use a specific key.

       | Yes
       | Yes
       |
        This object store can only hold JavaScript objects. Usually a key is
        generated and the value of the generated key is stored in the object in
        a property with the same name as the key path. However, if such a
        property already exists, the value of that property is used as key
        rather than generating a new key.

You can also create indices on any object store, provided the object store holds objects, not primitives. An index lets you look up the values stored in an object store using the value of a property of the stored object, rather than the object's key.

Additionally, indexes have the ability to enforce simple constraints on the stored data. By setting the unique flag when creating the index, the index ensures that no two objects are stored with both having the same value for the index's key path. So, for example, if you have an object store which holds a set of people, and you want to ensure that no two people have the same email address, you can use an index with the unique flag set to enforce this.

That may sound confusing, but this simple example should illustrate the concepts. First, we'll define some customer data to use in our example:

```js
// This is what our customer data looks like.
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "user@example.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "user@example.com" },
];
```

Of course, you wouldn't use someone's social security number as the primary key to a customer table because not everyone has a social security number, and you would store their birth date instead of their age, but let's ignore those unfortunate choices for the sake of convenience and move along.

Now let's look at creating an IndexedDB to store our data:

```js
const dbName = "the_name";

const request = indexedDB.open(dbName, 2);

request.onerror = (event) => {
  // Handle errors.
};
request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex("name", "name", { unique: false });

  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.
  objectStore.createIndex("email", "email", { unique: true });

  // Use transaction oncomplete to make sure the objectStore creation is
  // finished before adding data into it.
  objectStore.transaction.oncomplete = (event) => {
    // Store values in the newly created objectStore.
    const customerObjectStore = db
      .transaction("customers", "readwrite")
      .objectStore("customers");
    customerData.forEach((customer) => {
      customerObjectStore.add(customer);
    });
  };
};
```

As indicated previously, `onupgradeneeded` is the only place where you can alter the structure of the database. In it, you can create and delete object stores and build and remove indices.

Object stores are created with a single call to `createObjectStore()`. The method takes a name of the store, and a parameter object. Even though the parameter object is optional, it is very important, because it lets you define important optional properties and refine the type of object store you want to create. In our case, we've asked for an object store named "customers" and defined a `keyPath`, which is the property that makes an individual object in the store unique. That property in this example is "ssn" since a social security number is guaranteed to be unique. "ssn" must be present on every object that is stored in the `objectStore`.

We've also asked for an index named "name" that looks at the `name` property of the stored objects. As with `createObjectStore()`, `createIndex()` takes an optional `options` object that refines the type of index that you want to create. Adding objects that don't have a `name` property still succeeds, but the objects won't appear in the "name" index.

We can now retrieve the stored customer objects using their `ssn` from the object store directly, or using their name by using the index. To learn how this is done, see the section on using an index.

### Using a key <example-value>

Setting up an `autoIncrement` flag when creating the object store would enable the key <example-value> for that object store. By default this flag is not set.

With the key <example-value>, the key would be generated automatically as you add the value to the object store. The current number of a key <example-value> is always set to 1 when the object store for that key <example-value> is first created. Basically the newly auto-generated key is increased by 1 based on the previous key. The current number for a key <example-value> never decreases, other than as a result of database operations being reverted, for example, the database transaction is aborted. Therefore deleting a record or even clearing all records from an object store never affects the object store's key generator.

We can create another object store with the key <example-value> as below:

```js
// Open the indexedDB.
const request = indexedDB.open(dbName, 3);

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Create another object store called "names" with the autoIncrement flag set as true.
  const objStore = db.createObjectStore("names", { autoIncrement: true });

  // Because the "names" object store has the key <example-value>, the key for the name value is generated automatically.
  // The added records would be like:
  // key : 1 => value : "Bill"
  // key : 2 => value : "Donna"
  customerData.forEach((customer) => {
    objStore.add(customer.name);
  });
};
```

For more details about the key <example-value>, see Key <example-value> in the spec.
