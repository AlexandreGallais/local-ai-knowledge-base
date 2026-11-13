---
title: "Using IndexedDB (part 3 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/indexeddb_api/using_indexeddb/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using IndexedDB (part 3 of 4)

## Adding, retrieving, and removing data

Before you can do anything with your new database, you need to start a transaction. Transactions come from the database object, and you have to specify which object stores you want the transaction to span. Once you are inside the transaction, you can access the object stores that hold your data and make your requests. Next, you need to decide if you're going to make changes to the database or if you just need to read from it. Transactions have three available modes: `readonly`, `readwrite`, and `versionchange`.

To change the "schema" or structure of the database—which involves creating or deleting object stores or indexes—the transaction must be in `versionchange` mode. This transaction is opened by calling the `IDBFactory.open` method with a `version` specified.

To read the records of an existing object store, the transaction can either be in `readonly` or `readwrite` mode. To make changes to an existing object store, the transaction must be in `readwrite` mode. You open such transactions with `IDBDatabase.transaction`. The method accepts two parameters: the `storeNames` (the scope, defined as an array of object stores that you want to access) and the `mode` (`readonly` or `readwrite`) for the transaction. The method returns a transaction object containing the `IDBIndex.objectStore` method, which you can use to access your object store. By default, where no mode is specified, transactions open in `readonly` mode.

> **Note:**
> As of Firefox 40, IndexedDB transactions have relaxed durability guarantees to increase performance (see Firefox bug 1112702.) Previously in a `readwrite` transaction, a `complete` event was fired only when all data was guaranteed to have been flushed to disk. In Firefox 40+ the `complete` event is fired after the OS has been told to write the data but potentially before that data has actually been flushed to disk. The `complete` event may thus be delivered quicker than before, however, there exists a small chance that the entire transaction will be lost if the OS crashes or there is a loss of system power before the data is flushed to disk. Since such catastrophic events are rare most consumers should not need to concern themselves further. If you must ensure durability for some reason (e.g., you're storing critical data that cannot be recomputed later) you can force a transaction to flush to disk before delivering the `complete` event by creating a transaction using the experimental (non-standard) `readwriteflush` mode (see `IDBDatabase.transaction`).

You can speed up data access by using the right scope and mode in the transaction. Here are a couple of tips:

- When defining the scope, specify only the object stores you need. This way, you can run multiple transactions with non-overlapping scopes concurrently.
- Only specify a `readwrite` transaction mode when necessary. You can concurrently run multiple `readonly` transactions with overlapping scopes, but you can have only one `readwrite` transaction for an object store. To learn more, see the definition for transaction in the IndexedDB key <example-value> and basic <example-value> article.

### Adding data to the database

If you've just created a database, then you probably want to write to it. Here's what that looks like:

```js
const transaction = db.transaction(["customers"], "readwrite");
// Note: Older experimental implementations use the deprecated constant IDBTransaction.READ_WRITE instead of "readwrite".
// In case you want to support such an implementation, you can write:
// const transaction = db.transaction(["customers"], IDBTransaction.READ_WRITE);
```

The `transaction()` function takes two arguments (though one is optional) and returns a transaction object. The first argument is a list of object stores that the transaction will span. You can pass an empty array if you want the transaction to span all object stores, but don't do it because the spec says an empty array should generate an InvalidAccessError. If you don't specify anything for the second argument, you get a read-only transaction. Since you want to write to it here you need to pass the `"readwrite"` flag.

Now that you have a transaction you need to understand its lifetime. Transactions are tied very closely to the event loop. If you make a transaction and return to the event loop without using it then the transaction will become inactive. The only way to keep the transaction active is to make a request on it. When the request is finished you'll get a DOM event and, assuming that the request succeeded, you'll have another opportunity to extend the transaction during that callback. If you return to the event loop without extending the transaction then it will become inactive, and so on. As long as there are pending requests the transaction remains active. Transaction lifetimes are really very simple but it might take a little time to get used to. A few more examples will help, too. If you start seeing `TRANSACTION_INACTIVE_ERR` error codes then you've messed something up.

Transactions can receive DOM events of three different types: `error`, `abort`, and `complete`. We've talked about the way that `error` events bubble, so a transaction receives error events from any requests that are generated from it. A more subtle point here is that the default behavior of an error is to abort the transaction in which it occurred. Unless you handle the error by first calling `stopPropagation()` on the error event then doing something else, the entire transaction is rolled back. This design forces you to think about and handle errors, but you can always add a catchall error handler to the database if fine-grained error handling is too cumbersome. If you don't handle an error event or if you call `abort()` on the transaction, then the transaction is rolled back and an `abort` event is fired on the transaction. Otherwise, after all pending requests have completed, you'll get a `complete` event. If you're doing lots of database operations, then tracking the transaction rather than individual requests can certainly aid your sanity.

Now that you have a transaction, you'll need to get the object store from it. Transactions only let you have an object store that you specified when creating the transaction. Then you can add all the data you need.

```js
// Do something when all the data is added to the database.
transaction.oncomplete = (event) => {
  console.log("All done!");
};

transaction.onerror = (event) => {
  // Don't forget to handle errors!
};

const objectStore = transaction.objectStore("customers");
customerData.forEach((customer) => {
  const request = objectStore.add(customer);
  request.onsuccess = (event) => {
    // event.target.result === customer.ssn;
  };
});
```

The `result` of a request generated from a call to `add()` is the key of the value that was added. So in this case, it should equal the `ssn` property of the object that was added, since the object store uses the `ssn` property for the key path. Note that the `add()` function requires that no object already be in the database with the same key. If you're trying to modify an existing entry, or you don't care if one exists already, you can use the `put()` function, as shown below in the Updating an entry in the database section.

### Removing data from the database

Removing data is very similar:

```js
const request = db
  .transaction(["customers"], "readwrite")
  .objectStore("customers")
  .delete("444-44-4444");
request.onsuccess = (event) => {
  // It's gone!
};
```

### Getting data from the database

Now that the database has some info in it, you can retrieve it in several ways. First, the simple `get()`. You need to provide the key to retrieve the value, like so:

```js
const transaction = db.transaction(["customers"]);
const objectStore = transaction.objectStore("customers");
const request = objectStore.get("444-44-4444");
request.onerror = (event) => {
  // Handle errors!
};
request.onsuccess = (event) => {
  // Do something with the request.result!
  console.log(`Name for SSN 444-44-4444 is ${request.result.name}`);
};
```

That's a lot of code for a "simple" retrieval. Here's how you can shorten it up a bit, assuming that you handle errors at the database level:

```js
db
  .transaction("customers")
  .objectStore("customers")
  .get("444-44-4444").onsuccess = (event) => {
  console.log(`Name for SSN 444-44-4444 is ${event.target.result.name}`);
};
```

See how this works? Since there's only one object store, you can avoid passing a list of object stores you need in your transaction and just pass the name as a string. Also, you're only reading from the database, so you don't need a `"readwrite"` transaction. Calling `transaction()` with no mode specified gives you a `"readonly"` transaction. Another subtlety here is that you don't actually save the request object to a variable. Since the DOM event has the request as its target you can use the event to get to the `result` property.

### Updating an entry in the database

Now we've retrieved some data, updating it and inserting it back into the IndexedDB is pretty simple. Let's update the previous example somewhat:

```js
const objectStore = db
  .transaction(["customers"], "readwrite")
  .objectStore("customers");
const request = objectStore.get("444-44-4444");
request.onerror = (event) => {
  // Handle errors!
};
request.onsuccess = (event) => {
  // Get the old value that we want to update
  const data = event.target.result;

  // update the value(s) in the object that you want to change
  data.age = 42;

  // Put this updated object back into the database.
  const requestUpdate = objectStore.put(data);
  requestUpdate.onerror = (event) => {
    // Do something with the error
  };
  requestUpdate.onsuccess = (event) => {
    // Success - the data is updated!
  };
};
```

So here we're creating an `objectStore` and requesting a customer record out of it, identified by its ssn value (`444-44-4444`). We then put the result of that request in a variable (`data`), update the `age` property of this object, then create a second request (`requestUpdate`) to put the customer record back into the `objectStore`, overwriting the previous value.

> **Note:**
> In this case we've had to specify a `readwrite` transaction because we want to write to the database, not just read from it.

### Using a cursor

Using `get()` requires that you know which key you want to retrieve. If you want to step through all the values in your object store, then you can use a cursor. Here's what it looks like:

```js
const objectStore = db.transaction("customers").objectStore("customers");

objectStore.openCursor().onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    console.log(`Name for SSN ${cursor.key} is ${cursor.value.name}`);
    cursor.continue();
  } else {
    console.log("No more entries!");
  }
};
```

The `openCursor()` function takes several arguments. First, you can limit the range of items that are retrieved by using a key range object that we'll get to in a minute. Second, you can specify the direction that you want to iterate. In the above example, we're iterating over all objects in ascending order. The success callback for cursors is a little special. The cursor object itself is the `result` of the request (above we're using the shorthand, so it's `event.target.result`). Then the actual key and value can be found on the `key` and `value` properties of the cursor object. If you want to keep going, then you have to call `continue()` on the cursor. When you've reached the end of the data (or if there were no entries that matched your `openCursor()` request) you still get a success callback, but the `result` property is `undefined`.

One common pattern with cursors is to retrieve all objects in an object store and add them to an array, like this:

```js
const customers = [];

objectStore.openCursor().onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    customers.push(cursor.value);
    cursor.continue();
  } else {
    console.log(`Got all customers: ${customers}`);
  }
};
```

> **Note:**
> Alternatively, you can use `getAll()` to handle this case (and `getAllKeys()`). The following code does precisely the same thing as above:
>
> ```js
> objectStore.getAll().onsuccess = (event) => {
>   console.log(`Got all customers: ${event.target.result}`);
> };
> ```
>
> There is a performance cost associated with looking at the `value` property of a cursor, because the object is created lazily. When you use `getAll()` for example, the browser must create all the objects at once. If you're just interested in looking at each of the keys, for instance, it is much more efficient to use a cursor than to use `getAll()`. If you're trying to get an array of all the objects in an object store, though, use `getAll()`.
