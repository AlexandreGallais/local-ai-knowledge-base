---
title: "IndexedDB key characteristics and basic terminology (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/indexeddb_api/basic_terminology/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IndexedDB key characteristics and basic terminology

This article describes the key <example-value> of IndexedDB, and introduces some essential terminology relevant to understanding the IndexedDB API.

You'll also find the following articles useful:

- For a detailed tutorial on how to use the API, see Using IndexedDB.
- For the reference documentation on the IndexedDB API, refer back to the main IndexedDB API article and its subpages, which document the types of objects used by IndexedDB.
- For more information on how the browser handles storing your data in the background, read Browser storage quotas and eviction criteria.

## Key <example-value>

IndexedDB is a way for you to persistently store data inside a user's browser. Because it lets you create web applications with rich query abilities regardless of network availability, these applications can work both online and offline. IndexedDB is useful for applications that store a large amount of data (for example, a catalog of DVDs in a lending library) and applications that don't need persistent internet connectivity to work (for example, mail clients, to-do lists, and notepads).

IndexedDB lets you store and retrieve objects that are indexed with a "key." All changes that you make to the database happen within transactions. Like most web storage solutions, IndexedDB follows a same-origin policy. So while you can access stored data within a domain, you cannot access data across different domains.

If you have assumptions from working with other types of databases, you might get thrown off when working with IndexedDB. So the following key <example-value> of IndexedDB are important to keep in mind:

- **IndexedDB databases store key-value pairs.** The values can be complex structured objects, and keys can be properties of those objects. You can create indexes that use any property of the objects for quick searching, as well as sorted enumeration. Keys can be binary objects.
- **IndexedDB is built on a transactional database model**. Everything you do in IndexedDB always happens in the context of a transaction. The IndexedDB API provides lots of objects that represent indexes, tables, cursors, and so on, but each of these is tied to a particular transaction. Thus, you cannot execute commands or open cursors outside of a transaction. Transactions have a well-defined lifetime, so attempting to use a transaction after it has completed throws exceptions. Also, transactions auto-commit if no new requests are made when the transaction is active.

  This transaction model is really useful when you consider what might happen if a user opened two instances of your web app in two different tabs simultaneously. Without transactional operations, the two instances could interfere with each other's modifications. If you are not familiar with transactions in a database, read the Wikipedia article on transactions. Also see transaction under the Definitions section.

- **The IndexedDB API is mostly asynchronous.** The API doesn't give you data by returning values; instead, you have to pass a callback function. You don't "store" a value into the database, or "retrieve" a value out of the database through synchronous means. Instead, you "request" that a database operation happens. You get notified by a DOM event when the operation finishes, and the type of event you get lets you know if the operation succeeded or failed.
- **IndexedDB uses a lot of requests.** Requests are objects that receive the success or failure DOM events that were mentioned previously. They have `onsuccess` and `onerror` properties, and you can call `addEventListener()` and `removeEventListener()` on them. They also have `readyState`, `result`, and `errorCode` properties that tell you the status of the request. The `result` property is particularly magical, as it can be many different things, depending on how the request was generated (for example, an `IDBCursor` instance, or the key for a value that you just inserted into the database).
- **IndexedDB uses DOM events to notify you when results are available.** DOM events always have a `type` property (in IndexedDB, it is most commonly set to `"success"` or `"error"`). DOM events also have a `target` property that indicates where the event is headed. In most cases, the `target` of an event is the `IDBRequest` object that was generated as a result of doing some database operation. Success events don't bubble up and they can't be canceled. Error events, on the other hand, do bubble, and can be canceled. This is quite important, as error events abort whatever transactions they're running in, unless they are canceled.
- **IndexedDB is object-oriented.** IndexedDB is not a relational database with tables representing collections of rows and columns. This important and fundamental difference affects the way you design and build your applications.

  In a traditional relational data store, you would have a table that stores a collection of rows of data and columns of named types of data. IndexedDB, on the other hand, requires you to create an object store for a type of data and persist JavaScript objects to that store. Each object store can have a collection of indexes that makes it efficient to query and iterate across. If you are not familiar with object-oriented database management systems, read the Wikipedia article on object database.

- **IndexedDB does not use Structured Query Language (SQL).** It uses queries on an index that produces a cursor, which you use to iterate across the result set. If you are not familiar with NoSQL systems, read the Wikipedia article on NoSQL.
- **IndexedDB adheres to a same-origin policy**. An origin is the domain, application layer protocol, and port of a URL of the document where the script is being executed. Each origin has its own associated set of databases. Every database has a name that identifies it within an origin.

  The security boundary imposed on IndexedDB prevents applications from accessing data with a different origin. For example, while an app or a page in `http://www.example.com/app/` can retrieve data from `http://www.example.com/dir/`, because they have the same origin, it cannot retrieve data from `http://www.example.com:8080/dir/` (different port) or `https://www.example.com/dir/` (different protocol), because they have different origins.

  > **Note:**
  > Third party window content (e.g., `` content) can access the IndexedDB store for the origin it is embedded into, unless the browser is set to never accept third-party cookies (see Firefox bug 1147821.)

### Limitations

IndexedDB is designed to cover most cases that need client-side storage. However, it is not designed for a few cases like the following:

- Internationalized sorting. Not all languages sort strings in the same way, so internationalized sorting is not supported. While the database can't store data in a specific internationalized order, you can sort the data that you've read out of the database yourself.
- Synchronizing. The API is not designed to take care of synchronizing with a server-side database. You have to write code that synchronizes a client-side indexedDB database with a server-side database.
- Full text searching. The API does not have an equivalent of the `LIKE` operator in SQL.

In addition, be aware that browsers can wipe out the database, such as in the following conditions:

- The user requests a wipe out. Many browsers have settings that let users wipe all data stored for a given website, including cookies, bookmarks, stored passwords, and IndexedDB data.
- The browser is in private browsing mode. Some browsers, have "private browsing" (Firefox) or "incognito" (Chrome) modes. At the end of the session, the browser wipes out the database.
- The disk or quota limit has been reached.
- The data is corrupt.
- An incompatible change is made to the feature.

The exact circumstances and browser capabilities change over time, but the general philosophy of the browser vendors is to make the best effort to keep the data when possible.
