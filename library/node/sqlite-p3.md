---
title: "SQLite (part 3 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/sqlite.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# SQLite (part 3 of 6)

### `database.setAuthorizer(callback)`

* `callback` {Function|null} The authorizer function to set, or `null` to
  clear the current authorizer.

Sets an authorizer callback that SQLite will invoke whenever it attempts to
access data or modify the database schema through prepared statements.
This can be used to implement security policies, audit access, or restrict certain operations.
This method is a wrapper around `sqlite3_set_authorizer()`.

When invoked, the callback receives five arguments:

* `actionCode` {number} The type of operation being performed (e.g.,
  `SQLITE_INSERT`, `SQLITE_UPDATE`, `SQLITE_SELECT`).
* `arg1` {string|null} The first argument (context-dependent, often a table name).
* `arg2` {string|null} The second argument (context-dependent, often a column name).
* `dbName` {string|null} The name of the database.
* `triggerOrView` {string|null} The name of the trigger or view causing the access.

The callback must return one of the following constants:

* `SQLITE_OK` - Allow the operation.
* `SQLITE_DENY` - Deny the operation (causes an error).
* `SQLITE_IGNORE` - Ignore the operation (silently skip).

SQLite requires that the authorizer callback not modify the database connection
that invoked it, which includes preparing and stepping statements. Methods that
would do so throw an error with code `ERR_INVALID_STATE` while the callback is
on the stack, including `database.prepare()`, `database.exec()`, the execution
methods of that connection's statements, iterators, and tag stores, and
`database.setAuthorizer()` itself. Other connections remain usable.

The callback can also be invoked from within `statement.run()`,
`statement.get()`, and similar methods, because SQLite may re-prepare a
statement during execution after a schema change.

Separately, a statement that is currently being executed cannot be reentered.
Calling `statement.close()` on it would free the virtual machine that is
running, and re-running it through `statement.run()`, `statement.get()`,
`statement.all()`, `statement.iterate()`, `iterator.next()`,
`iterator.return()`, or the equivalent tag store methods would reset that
virtual machine mid-execution. All of these throw an `ERR_INVALID_STATE` error
instead. This applies to any callback SQLite invokes during execution, such as a
user-defined function. Other statements on the connection remain usable.

Operations that touch no SQLite state stay available from the callback:
`sqlTagStore.clear()`, which only drops cached statements, and `next()` and
`return()` on an already-drained iterator, which keep returning
`{ done: true }`.

```cjs
const { Database, constants } = require('node:sqlite');
const db = new Database(':memory:');

// Set up an authorizer that denies all table creation
db.setAuthorizer((actionCode) => {
  if (actionCode === constants.SQLITE_CREATE_TABLE) {
    return constants.SQLITE_DENY;
  }
  return constants.SQLITE_OK;
});

// This will work
using query = db.prepare('SELECT 1');
query.get();

// This will throw an error due to authorization denial
try {
  db.exec('CREATE TABLE blocked (id INTEGER)');
} catch (err) {
  console.log('Operation blocked:', err.message);
}
```

```mjs
import { Database, constants } from 'node:sqlite';
const db = new Database(':memory:');

// Set up an authorizer that denies all table creation
db.setAuthorizer((actionCode) => {
  if (actionCode === constants.SQLITE_CREATE_TABLE) {
    return constants.SQLITE_DENY;
  }
  return constants.SQLITE_OK;
});

// This will work
using query = db.prepare('SELECT 1');
query.get();

// This will throw an error due to authorization denial
try {
  db.exec('CREATE TABLE blocked (id INTEGER)');
} catch (err) {
  console.log('Operation blocked:', err.message);
}
```

### `database.isOpen`

* Type: {boolean} Whether the database is currently open or not.

### `database.isTransaction`

* Type: {boolean} Whether the database is currently within a transaction. This method
  is a wrapper around `sqlite3_get_autocommit()`.

### `database.limits`

* Type: {Object}

An object for getting and setting SQLite database limits at runtime.
Each property corresponds to an SQLite limit and can be read or written.

```js
const db = new Database(':memory:');

// Read current limit
console.log(db.limits.length);

// Set a new limit
db.limits.sqlLength = 100000;

// Reset a limit to its compile-time maximum
db.limits.sqlLength = Infinity;
```

Available properties: `length`, `sqlLength`, `column`, `exprDepth`,
`compoundSelect`, `vdbeOp`, `functionArg`, `attach`, `likePatternLength`,
`variableNumber`, `triggerDepth`.

Setting a property to `Infinity` resets the limit to its compile-time maximum value.

### `database.open()`

Opens the database specified in the `path` argument of the `Database`
constructor. This method should only be used when the database is not opened via
the constructor. An exception is thrown if the database is already open.

### `database.serialize([dbName])`

* `dbName` {string} Name of the database to serialize. This can be `'main'`
  (the default primary database) or any other database that has been added with
  `ATTACH DATABASE`. **Default:** `'main'`.
* Returns: {Uint8Array} A binary representation of the database.

Serializes the database into a binary representation, returned as a
`Uint8Array`. This is useful for saving, cloning, or transferring an in-memory
database. This method is a wrapper around `sqlite3_serialize()`.

```mjs
import { Database } from 'node:sqlite';

const db = new Database(':memory:');
db.exec('CREATE TABLE t(key INTEGER PRIMARY KEY, value TEXT)');
db.exec("INSERT INTO t VALUES (1, 'hello')");
const buffer = db.serialize();
console.log(buffer.length); // Prints the byte length of the database
```

```cjs
const { Database } = require('node:sqlite');

const db = new Database(':memory:');
db.exec('CREATE TABLE t(key INTEGER PRIMARY KEY, value TEXT)');
db.exec("INSERT INTO t VALUES (1, 'hello')");
const buffer = db.serialize();
console.log(buffer.length); // Prints the byte length of the database
```

### `database.deserialize(buffer[, options])`

* `buffer` {Uint8Array} A binary representation of a database, such as the
  output of `database.serialize()`.
* `options` {Object} Optional configuration for the deserialization.
  * `dbName` {string} Name of the database to deserialize into.
    **Default:** `'main'`.

Loads a serialized database into this connection, replacing the current
database. The deserialized database is writable. Existing prepared statements
are finalized before deserialization is attempted, even if the operation
subsequently fails. An `ERR_INVALID_STATE` error is thrown if the method is
called while a database callback is on the stack, for example a user-defined
function, an aggregate function, an authorizer, or a changeset filter or conflict
handler. This method is a wrapper around `sqlite3_deserialize()`.

```mjs
import { Database } from 'node:sqlite';

const original = new Database(':memory:');
original.exec('CREATE TABLE t(key INTEGER PRIMARY KEY, value TEXT)');
original.exec("INSERT INTO t VALUES (1, 'hello')");
const buffer = original.serialize();
original.close();

const clone = new Database(':memory:');
clone.deserialize(buffer);
using query = clone.prepare('SELECT value FROM t');
console.log(query.get());
// Prints: { value: 'hello' }
```

```cjs
const { Database } = require('node:sqlite');

const original = new Database(':memory:');
original.exec('CREATE TABLE t(key INTEGER PRIMARY KEY, value TEXT)');
original.exec("INSERT INTO t VALUES (1, 'hello')");
const buffer = original.serialize();
original.close();

const clone = new Database(':memory:');
clone.deserialize(buffer);
using query = clone.prepare('SELECT value FROM t');
console.log(query.get());
// Prints: { value: 'hello' }
```

### `database.prepare(sql[, options])`

* `sql` {string} A SQL string to compile to a prepared statement.
* `options` {Object} Optional configuration for the prepared statement.
  * `readBigInts` {boolean} If `true`, integer fields are read as `BigInt`s.
    **Default:** inherited from database options or `false`.
  * `returnArrays` {boolean} If `true`, results are returned as arrays.
    **Default:** inherited from database options or `false`.
  * `allowBareNamedParameters` {boolean} If `true`, allows binding named
    parameters without the prefix character. **Default:** inherited from
    database options or `true`.
  * `allowUnknownNamedParameters` {boolean} If `true`, unknown named parameters
    are ignored. **Default:** inherited from database options or `false`.
  * `persistent` {boolean} If `true`, hints to SQLite that this statement will
    be retained for a long time and likely reused many times. SQLite currently
    responds to this hint by avoiding lookaside memory. Corresponds to the
    `SQLITE_PREPARE_PERSISTENT` flag. **Default:** `false`.
* Returns: {Statement} The prepared statement.

Compiles a SQL statement into a prepared statement. This method is a wrapper
around `sqlite3_prepare_v3()`.

### `database.createTagStore([maxSize])`

* `maxSize` {integer} The maximum number of prepared statements to cache.
  **Default:** `1000`.
* Returns: {SQLTagStore} A new SQL tag store for caching prepared statements.

Creates a new `SQLTagStore`, which is a Least Recently Used (LRU) cache
for storing prepared statements. This allows for the efficient reuse of
prepared statements by tagging them with a unique identifier.

When a tagged SQL literal is executed, the `SQLTagStore` checks if a prepared
statement for the corresponding SQL query string already exists in the cache.
If it does, the cached statement is used. If not, a new prepared statement is
created, executed, and then stored in the cache for future use. This mechanism
helps to avoid the overhead of repeatedly parsing and preparing the same SQL
statements.

Tagged statements bind the placeholder values from the template literal as
parameters to the underlying prepared statement. For example:

```js
sqlTagStore.get`SELECT ${value}`;
```

is equivalent to:

```js
using statement = db.prepare('SELECT ?');
statement.get(value);
```

However, in the first example, the tag store will cache the underlying prepared
statement for future use.

> **Note:** The `${value}` syntax in tagged statements _binds_ a parameter to
> the prepared statement. This differs from its behavior in _untagged_ template
> literals, where it performs string interpolation.
>
> ```js
> // This a safe example of binding a parameter to a tagged statement.
> sqlTagStore.run`INSERT INTO t1 (id) VALUES (${id})`;
>
> // This is an *unsafe* example of an untagged template string.
> // `id` is interpolated into the query text as a string.
> // This can lead to SQL injection and data corruption.
> db.run(`INSERT INTO t1 (id) VALUES (${id})`);
> ```

The tag store will match a statement from the cache if the query strings
(including the positions of any bound placeholders) are identical.

```js
// The following statements will match in the cache:
sqlTagStore.get`SELECT * FROM t1 WHERE id = ${id} AND active = 1`;
sqlTagStore.get`SELECT * FROM t1 WHERE id = ${12345} AND active = 1`;

// The following statements will not match, as the query strings
// and bound placeholders differ:
sqlTagStore.get`SELECT * FROM t1 WHERE id = ${id} AND active = 1`;
sqlTagStore.get`SELECT * FROM t1 WHERE id = 12345 AND active = 1`;

// The following statements will not match, as matches are case-sensitive:
sqlTagStore.get`SELECT * FROM t1 WHERE id = ${id} AND active = 1`;
sqlTagStore.get`select * from t1 where id = ${id} and active = 1`;
```

The only way of binding parameters in tagged statements is with the `${value}`
syntax. Do not add parameter binding placeholders (`?` etc.) to the SQL query
string itself.

```mjs
import { Database } from 'node:sqlite';

const db = new Database(':memory:');
const sql = db.createTagStore();

db.exec('CREATE TABLE users (id INT, name TEXT)');

// Using the 'run' method to insert data.
// The tagged literal is used to identify the prepared statement.
sql.run`INSERT INTO users VALUES (1, 'Alice')`;
sql.run`INSERT INTO users VALUES (2, 'Bob')`;

// Using the 'get' method to retrieve a single row.
const name = 'Alice';
const user = sql.get`SELECT * FROM users WHERE name = ${name}`;
console.log(user); // { id: 1, name: 'Alice' }

// Using the 'all' method to retrieve all rows.
const allUsers = sql.all`SELECT * FROM users ORDER BY id`;
console.log(allUsers);
// [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' }
// ]
```

```cjs
const { Database } = require('node:sqlite');

const db = new Database(':memory:');
const sql = db.createTagStore();

db.exec('CREATE TABLE users (id INT, name TEXT)');

// Using the 'run' method to insert data.
// The tagged literal is used to identify the prepared statement.
sql.run`INSERT INTO users VALUES (1, 'Alice')`;
sql.run`INSERT INTO users VALUES (2, 'Bob')`;

// Using the 'get' method to retrieve a single row.
const name = 'Alice';
const user = sql.get`SELECT * FROM users WHERE name = ${name}`;
console.log(user); // { id: 1, name: 'Alice' }

// Using the 'all' method to retrieve all rows.
const allUsers = sql.all`SELECT * FROM users ORDER BY id`;
console.log(allUsers);
// [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' }
// ]
```
