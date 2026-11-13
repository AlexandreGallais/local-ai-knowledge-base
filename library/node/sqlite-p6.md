---
title: "SQLite (part 6 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/sqlite.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# SQLite (part 6 of 6)

## Class: `SQLTagStore`

This class represents a single LRU (Least Recently Used) cache for storing
prepared statements.

Instances of this class are created via the `database.createTagStore()`
method, not by using a constructor. The store caches prepared statements based
on the provided SQL query string. When the same query is seen again, the store
retrieves the cached statement and safely applies the new values through
parameter binding, thereby preventing attacks like SQL injection.

The cache has a maxSize that defaults to 1000 statements, but a custom size can
be provided (e.g., `database.createTagStore(100)`). All APIs exposed by this
class execute synchronously.

### `sqlTagStore.all(stringElements[, ...boundParameters])`

* `stringElements` {string\[]} Template literal elements containing the SQL
  query.
* `...boundParameters`
  {undefined|null|number|bigint|boolean|string|Buffer|TypedArray|DataView|ArrayBuffer|SharedArrayBuffer}
  Parameter values to be bound to placeholders in the template string.
* Returns: {Array} An array of objects representing the rows returned by the query.

Executes the given SQL query and returns all resulting rows as an array of
objects.

This function is intended to be used as a template literal tag, not to be
called directly.

### `sqlTagStore.get(stringElements[, ...boundParameters])`

* `stringElements` {string\[]} Template literal elements containing the SQL
  query.
* `...boundParameters`
  {undefined|null|number|bigint|boolean|string|Buffer|TypedArray|DataView|ArrayBuffer|SharedArrayBuffer}
  Parameter values to be bound to placeholders in the template string.
* Returns: {Object | undefined} An object representing the first row returned by
  the query, or `undefined` if no rows are returned.

Executes the given SQL query and returns the first resulting row as an object.

This function is intended to be used as a template literal tag, not to be
called directly.

### `sqlTagStore.iterate(stringElements[, ...boundParameters])`

* `stringElements` {string\[]} Template literal elements containing the SQL
  query.
* `...boundParameters`
  {undefined|null|number|bigint|boolean|string|Buffer|TypedArray|DataView|ArrayBuffer|SharedArrayBuffer}
  Parameter values to be bound to placeholders in the template string.
* Returns: {Iterator} An iterator that yields objects representing the rows returned by the query.

Executes the given SQL query and returns an iterator over the resulting rows.

This function is intended to be used as a template literal tag, not to be
called directly.

### `sqlTagStore.run(stringElements[, ...boundParameters])`

* `stringElements` {string\[]} Template literal elements containing the SQL
  query.
* `...boundParameters`
  {undefined|null|number|bigint|boolean|string|Buffer|TypedArray|DataView|ArrayBuffer|SharedArrayBuffer}
  Parameter values to be bound to placeholders in the template string.
* Returns: {Object} An object containing information about the execution, including `changes` and `lastInsertRowid`.

Executes the given SQL query, which is expected to not return any rows (e.g., INSERT, UPDATE, DELETE).

This function is intended to be used as a template literal tag, not to be
called directly.

### `sqlTagStore.size`

* Type: {integer}

A read-only property that returns the number of prepared statements currently in the cache.

### `sqlTagStore.capacity`

* Type: {integer}

A read-only property that returns the maximum number of prepared statements the cache can hold.

### `sqlTagStore.db`

* Type: {Database}

A read-only property that returns the `Database` object associated with this `SQLTagStore`.

### `sqlTagStore.clear()`

Resets the LRU cache, clearing all stored prepared statements.

## `sqlite.backup(sourceDb, path[, options])`

* `sourceDb` {Database} The database to backup. The source database must be open.
* `path` {string | Buffer | URL} The path where the backup will be created. If the file already exists,
  the contents will be overwritten.
* `options` {Object} Optional configuration for the backup. The
  following properties are supported:
  * `source` {string} Name of the source database. This can be `'main'` (the default primary database) or any other
    database that have been added with `ATTACH DATABASE` **Default:** `'main'`.
  * `target` {string} Name of the target database. This can be `'main'` (the default primary database) or any other
    database that have been added with `ATTACH DATABASE` **Default:** `'main'`.
  * `rate` {integer} Positive number of pages to be transmitted in each batch of the backup. **Default:** `100`.
  * `progress` {Function} An optional callback function that will be called after each backup step. The argument passed
    to this callback is an {Object} with `remainingPages` and `totalPages` properties, describing the current progress
    of the backup operation.
* Returns: {Promise} A promise that fulfills with the total number of backed-up pages upon completion, or rejects if an
  error occurs.

This method makes a database backup. This method abstracts the `sqlite3_backup_init()`, `sqlite3_backup_step()`
and `sqlite3_backup_finish()` functions.

The backed-up database can be used normally during the backup process. Mutations coming from the same connection - same
{Database} - object will be reflected in the backup right away. However, mutations from other connections will cause
the backup process to restart.

```cjs
const { backup, Database } = require('node:sqlite');

(async () => {
  const sourceDb = new Database('source.db');
  const totalPagesTransferred = await backup(sourceDb, 'backup.db', {
    rate: 1, // Copy one page at a time.
    progress: ({ totalPages, remainingPages }) => {
      console.log('Backup in progress', { totalPages, remainingPages });
    },
  });

  console.log('Backup completed', totalPagesTransferred);
})();
```

```mjs
import { backup, Database } from 'node:sqlite';

const sourceDb = new Database('source.db');
const totalPagesTransferred = await backup(sourceDb, 'backup.db', {
  rate: 1, // Copy one page at a time.
  progress: ({ totalPages, remainingPages }) => {
    console.log('Backup in progress', { totalPages, remainingPages });
  },
});

console.log('Backup completed', totalPagesTransferred);
```

## `sqlite.constants`

* Type: {Object}

An object containing commonly used constants for SQLite operations.

### SQLite constants

The following constants are exported by the `sqlite.constants` object.

#### Conflict resolution constants

One of the following constants is available as an argument to the `onConflict`
conflict resolution handler passed to `database.applyChangeset()`. See also
Constants Passed To The Conflict Handler in the SQLite documentation.

     | Constant
     | Description

     | `SQLITE_CHANGESET_DATA`
     | The conflict handler is invoked with this constant when processing a DELETE or UPDATE change if a row with the required PRIMARY KEY <example-value> is present in the database, but one or more other (non primary-key) fields modified by the update do not contain the expected "before" values.

     | `SQLITE_CHANGESET_NOTFOUND`
     | The conflict handler is invoked with this constant when processing a DELETE or UPDATE change if a row with the required PRIMARY KEY <example-value> is not present in the database.

     | `SQLITE_CHANGESET_CONFLICT`
     | This constant is passed to the conflict handler while processing an INSERT change if the operation would result in duplicate primary key values.

     | `SQLITE_CHANGESET_CONSTRAINT`
     | If any other constraint violation occurs while applying a change (i.e. a UNIQUE, CHECK or NOT NULL constraint), the conflict handler is invoked with this constant.

     | `SQLITE_CHANGESET_FOREIGN_KEY`
     | If foreign key <example-value> is enabled, and applying a changeset leaves the database in a state containing foreign key <example-value>, the conflict handler is invoked with this constant exactly once before the changeset is committed. If the conflict handler returns `SQLITE_CHANGESET_OMIT`, the changes, including those that caused the foreign key <example-value> violation, are committed. Or, if it returns `SQLITE_CHANGESET_ABORT`, the changeset is rolled back.

One of the following constants must be returned from the `onConflict` conflict
resolution handler passed to `database.applyChangeset()`. See also
Constants Returned From The Conflict Handler in the SQLite documentation.

     | Constant
     | Description

     | `SQLITE_CHANGESET_OMIT`
     | Conflicting changes are omitted.

     | `SQLITE_CHANGESET_REPLACE`
     | Conflicting changes replace existing values. Note that this value can only be returned when the type of conflict is either `SQLITE_CHANGESET_DATA` or `SQLITE_CHANGESET_CONFLICT`.

     | `SQLITE_CHANGESET_ABORT`
     | Abort when a change encounters a conflict and roll back database.

#### Authorization constants

The following constants are used with the `database.setAuthorizer()` method.

##### Authorization result codes

One of the following constants must be returned from the authorizer callback
function passed to `database.setAuthorizer()`.

     | Constant
     | Description

     | `SQLITE_OK`
     | Allow the operation to proceed normally.

     | `SQLITE_DENY`
     | Deny the operation and cause an error to be returned.

     | `SQLITE_IGNORE`
     | Ignore the operation and continue as if it had never been requested.

##### Authorization action codes

The following constants are passed as the first argument to the authorizer
callback function to indicate what type of operation is being authorized.

     | Constant
     | Description

     | `SQLITE_CREATE_INDEX`
     | Create an index

     | `SQLITE_CREATE_TABLE`
     | Create a table

     | `SQLITE_CREATE_TEMP_INDEX`
     | Create a temporary index

     | `SQLITE_CREATE_TEMP_TABLE`
     | Create a temporary table

     | `SQLITE_CREATE_TEMP_TRIGGER`
     | Create a temporary trigger

     | `SQLITE_CREATE_TEMP_VIEW`
     | Create a temporary view

     | `SQLITE_CREATE_TRIGGER`
     | Create a trigger

     | `SQLITE_CREATE_VIEW`
     | Create a view

     | `SQLITE_DELETE`
     | Delete from a table

     | `SQLITE_DROP_INDEX`
     | Drop an index

     | `SQLITE_DROP_TABLE`
     | Drop a table

     | `SQLITE_DROP_TEMP_INDEX`
     | Drop a temporary index

     | `SQLITE_DROP_TEMP_TABLE`
     | Drop a temporary table

     | `SQLITE_DROP_TEMP_TRIGGER`
     | Drop a temporary trigger

     | `SQLITE_DROP_TEMP_VIEW`
     | Drop a temporary view

     | `SQLITE_DROP_TRIGGER`
     | Drop a trigger

     | `SQLITE_DROP_VIEW`
     | Drop a view

     | `SQLITE_INSERT`
     | Insert into a table

     | `SQLITE_PRAGMA`
     | Execute a PRAGMA statement

     | `SQLITE_READ`
     | Read from a table

     | `SQLITE_SELECT`
     | Execute a SELECT statement

     | `SQLITE_TRANSACTION`
     | Begin, commit, or rollback a transaction

     | `SQLITE_UPDATE`
     | Update a table

     | `SQLITE_ATTACH`
     | Attach a database

     | `SQLITE_DETACH`
     | Detach a database

     | `SQLITE_ALTER_TABLE`
     | Alter a table

     | `SQLITE_REINDEX`
     | Reindex

     | `SQLITE_ANALYZE`
     | Analyze the database

     | `SQLITE_CREATE_VTABLE`
     | Create a virtual table

     | `SQLITE_DROP_VTABLE`
     | Drop a virtual table

     | `SQLITE_FUNCTION`
     | Use a function

     | `SQLITE_SAVEPOINT`
     | Create, release, or rollback a savepoint

     | `SQLITE_COPY`
     | Copy data (legacy)

     | `SQLITE_RECURSIVE`
     | Recursive query
