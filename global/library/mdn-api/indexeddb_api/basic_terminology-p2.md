---
title: "IndexedDB key characteristics and basic terminology (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/indexeddb_api/basic_terminology/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IndexedDB key characteristics and basic terminology (part 2 of 2)

## Core terminology

This section defines and explains core terminology relevant to understanding the IndexedDB API.

### Database

#### database

A repository of information, typically comprising one or more _object stores_. Each database must have the following:

- Name. This identifies the database within a specific origin and stays constant throughout its lifetime. The name can be any string value (including an empty string).
- Current _version_. When a database is first created, its version is the integer 1 if not specified otherwise. Each database can have only one version at any given time.

#### database connection

An operation created by opening a _database_. A given database can have multiple connections at the same time.

#### durable

In Firefox, IndexedDB used to be **durable**, meaning that in a readwrite transaction a `complete` event was fired only when all data was guaranteed to have been flushed to disk.

As of Firefox 40, IndexedDB transactions have relaxed durability guarantees to increase performance (see Firefox bug 1112702), which is the same behavior as other IndexedDB-supporting browsers. In this case the `complete` event is fired after the OS has been told to write the data but potentially before that data has actually been flushed to disk. The event may thus be delivered quicker than before, however, there exists a small chance that the entire transaction will be lost if the OS crashes or there is a loss of system power before the data is flushed to disk. Since such catastrophic events are rare, most consumers should not need to concern themselves further.

> **Note:**
> In Firefox, if you wish to ensure durability for some reason (e.g., you're storing critical data that cannot be recomputed later) you can force a transaction to flush to disk before delivering the `complete` event by creating a transaction using the experimental (non-standard) `readwriteflush` mode (see `IDBDatabase.transaction`.) This is currently experimental, and can only be used if the `dom.indexedDB.experimental` pref is set to `true` in `about:config`.

#### index

An index is a specialized object store for looking up records in another object store, called the _referenced object store_. The index is a persistent key-value storage where the value part of its records is the key part of a record in the referenced object store. The records in an index are automatically populated whenever records in the referenced object store are inserted, updated, or deleted. Each record in an index can point to only one record in its referenced object store, but several indexes can reference the same object store. When the object store changes, all indexes that refer to the object store are automatically updated.

Alternatively, you can also look up records in an object store using the key.

To learn more on using indexes, see Using IndexedDB. For the reference documentation on index, see IDBKeyRange.

#### object store

The mechanism by which data is stored in the database. The object store persistently holds records, which are key-value pairs. Records within an object store are sorted according to the _keys_ in an ascending order.

Every object store must have a name that is unique within its database. The object store can optionally have a _key <example-value> and a _key path_. If the object store has a key path, it is using _in-line keys_; otherwise, it is using _out-of-line keys_.

For the reference documentation on object store, see `IDBObjectStore`.

#### request

The operation by which reading and writing on a database is done. Every request represents one read or write operation.

#### transaction

An atomic set of data-access and data-modification operations on a particular database. It is how you interact with the data in a database. In fact, any reading or changing of data in the database must happen in a transaction.

A database connection can have several active transactions associated with it at a time, so long as the writing transactions do not have overlapping _scopes_. The scope of transactions, which is defined at creation, determines which object stores the transaction can interact with and remains constant for the lifetime of the transaction. So, for example, if a database connection already has a writing transaction with a scope that just covers the `flyingMonkey` object store, you can start a second transaction with a scope of the `unicornCentaur` and `unicornPegasus` object stores. As for reading transactions, you can have several of them — even overlapping ones.

Transactions are expected to be short-lived, so the browser can terminate a transaction that takes too long, in order to free up storage resources that the long-running transaction has locked. You can abort the transaction, which rolls back the changes made to the database in the transaction. And you don't even have to wait for the transaction to start or be active to abort it.

The three modes of transactions are: `readwrite`, `readonly`, and `versionchange`. The only way to create and delete object stores and indexes is by using a `versionchange` transaction. To learn more about transaction types, see the reference article for IndexedDB.

Because everything happens within a transaction, it is a very important concept in IndexedDB. To learn more about transactions, especially on how they relate to versioning, see `IDBTransaction`, which also has reference documentation.

#### version

When a database is first created, its version is the integer 1. Each database has one version at a time; a database can't exist in multiple versions at once. The only way to change the version is by opening it with a greater version than the current one.

### Key and value

#### in-line key

A key that is stored as part of the stored value. It is found using a _key path_. An in-line key can be generated using a generator. After the key has been generated, it can then be stored in the value using the key path or it can also be used as a key.

#### key

A data value by which stored values are organized and retrieved in the object store. The object store can derive the key from one of three sources: a _key <example-value>, a _key path_, or an explicitly specified value. The key must be of a data type that has a number that is greater than the one before it. Each record in an object store must have a key that is unique within the same store, so you cannot have multiple records with the same key in a given object store.

A key can be one of the following types: string, date, float, binary data (represented by an `ArrayBuffer` or a `TypedArray` view such as a `Uint8Array`), and array. The length of an array key can range from `0` (an empty array) to infinity, and you can include an array within an array.

Alternatively, you can also look up records in an object store using the _index._

#### key <example-value>

A mechanism for producing new keys in an ordered sequence. If an object store does not have a key <example-value>, then the application must provide keys for records being stored. Generators are not shared between stores. This is more a browser implementation detail, because in web development, you don't really create or access key generators.

#### key path

Defines where the browser should extract the key from in the object store or index. A valid key path can include one of the following: an empty string, a JavaScript identifier, or multiple JavaScript identifiers separated by periods or an array containing any of those. It cannot include spaces.

#### out-of-line key

A key that is stored separately from the value being stored.

#### value

Each record has a value, which could include anything that can be expressed in JavaScript, including boolean, number, string, date, object, array, regexp, undefined, and null.

When an object or array is stored, the properties and values in that object or array can also be anything that is a valid value.

Blobs and files can be stored, cf. specification.

### Range and scope

#### cursor

A mechanism for iterating over multiple records with a _key range_. The cursor has a source that indicates which index or object store it is iterating. It has a position within the range, and moves in a direction that is increasing or decreasing in the order of record keys. For the reference documentation on cursors, see `IDBCursor`.

#### key range

A continuous interval over some data type used for keys. Records can be retrieved from object stores and indexes using keys or a range of keys. You can limit or filter the range using lower and upper bounds. For example, you can iterate over all values of a key <example-value> x and y.

For the reference documentation on key range, see `IDBKeyRange`.

#### scope

The set of object stores and indexes to which a transaction applies. The scopes of read-only transactions can overlap and execute at the same time. On the other hand, the scopes of writing transactions cannot overlap. You can still start several transactions with the same scope at the same time, but they just queue up and execute one after another.

## Next steps

With an understanding of IndexedDB's key <example-value> and core terminology under our belts, we can get to more concrete stuff. For a tutorial on how to use the API, see Using IndexedDB.

## See also

- Indexed Database API Specification
- IndexedDB API Reference
- Using IndexedDB
- IndexedDB — The Store in Your Browser
