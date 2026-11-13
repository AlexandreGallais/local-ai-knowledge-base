---
title: "SQLite (part 4 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/sqlite.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# SQLite (part 4 of 6)

### `database.createModule(name, options)`

* `name` {string} The name of the virtual table module. This name is used in
  `CREATE VIRTUAL TABLE ... USING name` statements and as an eponymous table
  name.
* `options` {Object} Module configuration settings.
  * `columns` {Array} An array of column definitions. Each element is an object
    with the following properties:
    * `name` {string} The name of the column.
    * `type` {string} The declared type of the column. Must be one of
      `'INTEGER'`, `'TEXT'`, `'REAL'`, `'BLOB'`, or `'ANY'`.
    * `hidden` {boolean} If `true`, the column is hidden and acts as a
      parameter for table-valued function usage. **Default:** `false`.
  * `rows` {Function} A function called to produce rows when the virtual table
    is queried. The function receives values for hidden columns (parameters) as
    arguments, in the order they are defined. Must return an iterable (such as
    an array or generator) where each element is an array of column values.
  * `directOnly` {boolean} If `true`, the virtual table can only be used in
    top-level SQL statements and cannot be used inside triggers or views.
    **Default:** `false`.
  * `useBigIntArguments` {boolean} If `true`, integer parameters passed to
    `rows` are converted to `BigInt`s. **Default:** `false`.

Registers a virtual table module with the database. This method is a wrapper
around `sqlite3_create_module_v2()`. Virtual tables allow JavaScript code
to provide the backing data for SQL tables. The registered module can be used
in two ways:

* **Eponymous table**: Query the module name directly without creating a table
  (e.g., `SELECT * FROM module_name`).
* **Named virtual table**: Use `CREATE VIRTUAL TABLE t USING module_name` to
  create a persistent virtual table.

Hidden columns can be used to pass <example-value> to the `rows` function using
table-valued function syntax (e.g., `SELECT * FROM module_name(param1, param2)`).

Values yielded by `rows` follow the conversion rules in Type conversion between
JavaScript and SQLite: a {number} is stored as `REAL` and a {bigint} is
stored as `INTEGER`, regardless of the column's declared `type`. Unlike an
ordinary table, a virtual table does not apply column affinity to the values it
returns, so yield a {bigint} when a column needs `INTEGER` storage:

```js
db.createModule('counter', {
  columns: [{ name: 'value', type: 'INTEGER' }],
  *rows() {
    yield [1];   // typeof(value) is 'real'
    yield [2n];  // typeof(value) is 'integer'
  },
});
```

```cjs
const { Database } = require('node:sqlite');

const db = new Database(':memory:');

db.createModule('generate_series', {
  columns: [
    { name: 'value', type: 'INTEGER' },
    { name: 'start', type: 'INTEGER', hidden: true },
    { name: 'stop', type: 'INTEGER', hidden: true },
    { name: 'step', type: 'INTEGER', hidden: true },
  ],
  *rows(start, stop, step) {
    start ??= 0;
    stop ??= 10;
    step ??= 1;
    for (let i = start; i <= stop; i += step) {
      yield [i];
    }
  },
});

console.log(db.prepare('SELECT * FROM generate_series(1, 5, 1)').all());
// Prints: [ { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 } ]
```

```mjs
import { Database } from 'node:sqlite';

const db = new Database(':memory:');

db.createModule('generate_series', {
  columns: [
    { name: 'value', type: 'INTEGER' },
    { name: 'start', type: 'INTEGER', hidden: true },
    { name: 'stop', type: 'INTEGER', hidden: true },
    { name: 'step', type: 'INTEGER', hidden: true },
  ],
  *rows(start, stop, step) {
    start ??= 0;
    stop ??= 10;
    step ??= 1;
    for (let i = start; i <= stop; i += step) {
      yield [i];
    }
  },
});

console.log(db.prepare('SELECT * FROM generate_series(1, 5, 1)').all());
// Prints: [ { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 } ]
```

### `database.createSession([options])`

* `options` {Object} The configuration options for the session.
  * `table` {string} A specific table to track changes for. By default, changes to all tables are tracked.
  * `db` {string} Name of the database to track. This is useful when multiple databases have been added using `ATTACH DATABASE`. **Default**: `'main'`.
* Returns: {Session} A session handle.

Creates and attaches a session to the database. This method is a wrapper around `sqlite3session_create()` and `sqlite3session_attach()`.

### `database.applyChangeset(changeset[, options])`

* `changeset` {Uint8Array} A binary changeset or patchset.

* `options` {Object} The configuration options for how the changes will be applied.
  * `filter` {Function} for each table affected by at least
    one change in the changeset, the `filter` callback is invoked with the
    table name as the first argument. If the return value is falsy, then no
    attempt is made to apply any changes to the table.
    Otherwise, if the return value is truthy or no `filter` callback is provided,
    all changes related to the table are attempted.
  * `onConflict` {Function} A function that determines how to handle conflicts. The function receives one argument,
    which can be one of the following values:

    * `SQLITE_CHANGESET_DATA`: A `DELETE` or `UPDATE` change does not contain the expected "before" values.
    * `SQLITE_CHANGESET_NOTFOUND`: A row matching the primary key of the `DELETE` or `UPDATE` change does not exist.
    * `SQLITE_CHANGESET_CONFLICT`: An `INSERT` change results in a duplicate primary key.
    * `SQLITE_CHANGESET_FOREIGN_KEY`: Applying a change would result in a foreign key violation.
    * `SQLITE_CHANGESET_CONSTRAINT`: Applying a change results in a `UNIQUE`, `CHECK`, or `NOT NULL` constraint
      violation.

    The function should return one of the following values:

    * `SQLITE_CHANGESET_OMIT`: Omit conflicting changes.
    * `SQLITE_CHANGESET_REPLACE`: Replace existing values with conflicting changes (only valid with
      `SQLITE_CHANGESET_DATA` or `SQLITE_CHANGESET_CONFLICT` conflicts).
    * `SQLITE_CHANGESET_ABORT`: Abort on conflict and roll back the database.

    When an error is thrown in the conflict handler or when any other value is returned from the handler,
    applying the changeset is aborted and the database is rolled back.

    **Default**: A function that returns `SQLITE_CHANGESET_ABORT`.

* Returns: {boolean} Whether the changeset was applied successfully without being aborted.

An exception is thrown if the database is not
open. This method is a wrapper around `sqlite3changeset_apply()`.

```mjs
import { Database } from 'node:sqlite';

const sourceDb = new Database(':memory:');
const targetDb = new Database(':memory:');

sourceDb.exec('CREATE TABLE data(key <example-value> PRIMARY KEY, value TEXT)');
targetDb.exec('CREATE TABLE data(key <example-value> PRIMARY KEY, value TEXT)');

const session = sourceDb.createSession();

using insert = sourceDb.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
insert.run(1, 'hello');
insert.run(2, 'world');

const changeset = session.changeset();
targetDb.applyChangeset(changeset);
// Now that the changeset has been applied, targetDb contains the same data as sourceDb.
```

```cjs
const { Database } = require('node:sqlite');

const sourceDb = new Database(':memory:');
const targetDb = new Database(':memory:');

sourceDb.exec('CREATE TABLE data(key <example-value> PRIMARY KEY, value TEXT)');
targetDb.exec('CREATE TABLE data(key <example-value> PRIMARY KEY, value TEXT)');

const session = sourceDb.createSession();

using insert = sourceDb.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
insert.run(1, 'hello');
insert.run(2, 'world');

const changeset = session.changeset();
targetDb.applyChangeset(changeset);
// Now that the changeset has been applied, targetDb contains the same data as sourceDb.
```

### `databaseSymbol.dispose`

Closes the database connection. If the database connection is already closed
then this is a no-op.

## Class: `Session`

### `session.changeset()`

* Returns: {Uint8Array} Binary changeset that can be applied to other databases.

Retrieves a changeset containing all changes since the changeset was created. Can be called multiple times.
An exception is thrown if the database or the session is not open. This method is a wrapper around `sqlite3session_changeset()`.

### `session.patchset()`

* Returns: {Uint8Array} Binary patchset that can be applied to other databases.

Similar to the method above, but generates a more compact patchset. See Changesets and Patchsets
in the documentation of SQLite. An exception is thrown if the database or the session is not open. This method is a
wrapper around `sqlite3session_patchset()`.

### `session.close()`

Closes the session. An exception is thrown if the database or the session is not open,
or if the session is currently generating a changeset or patchset. An
`ERR_INVALID_STATE` error is thrown if the method is called from a callback that
SQLite invoked, such as an authorizer callback, a user-defined function, or a
`'sqlite.db.query'` subscriber, because SQLite may still be using the session.
This method is a wrapper around `sqlite3session_delete()`.

### `sessionSymbol.dispose`

Closes the session. If the session is already closed, then this is a no-op. An
`ERR_INVALID_STATE` error is thrown if the session is currently generating
a changeset or patchset, or if the method is called from a callback that SQLite
invoked, under the same conditions as `session.close()`.
