---
title: "SQLite (part 2 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/sqlite.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# SQLite (part 2 of 6)

## Class: `Database`

This class represents a single connection to a SQLite database. All APIs
exposed by this class execute synchronously.

`DatabaseSync` is a deprecated alias for `Database`, kept for backward
compatibility with the class's previous name. See
DEP0210.

### `new Database(path[, options])`

* `path` {string | Buffer | URL} The path of the database. A SQLite database can be
  stored in a file or completely in memory. To use a file-backed database,
  the path should be a file path. To use an in-memory database, the path
  should be the special name `':memory:'`.
* `options` {Object} Configuration options for the database connection. The
  following options are supported:
  * `open` {boolean} If `true`, the database is opened by the constructor. When
    this value is `false`, the database must be opened via the `open()` method.
    **Default:** `true`.
  * `readOnly` {boolean} If `true`, the database is opened in read-only mode.
    If the database does not exist, opening it will fail. **Default:** `false`.
  * `enableForeignKeyConstraints` {boolean} If `true`, foreign key constraints
    are enabled. This is recommended but can be disabled for compatibility with
    legacy database schemas. The enforcement of foreign key constraints can be
    enabled and disabled after opening the database using
    `PRAGMA foreign_keys`. **Default:** `true`.
  * `enableDoubleQuotedStringLiterals` {boolean} If `true`, SQLite will accept
    double-quoted string literals. This is not recommended but can be
    enabled for compatibility with legacy database schemas.
    **Default:** `false`.
  * `allowExtension` {boolean} If `true`, the `loadExtension` SQL function
    and the `loadExtension()` method are enabled.
    You can call `enableLoadExtension(false)` later to disable this feature.
    **Default:** `false`.
  * `timeout` {number} The busy timeout in milliseconds. This is the maximum amount of
    time that SQLite will wait for a database lock to be released before
    returning an error. **Default:** `0`.
  * `readBigInts` {boolean} If `true`, integer fields are read as JavaScript `BigInt` values. If `false`,
    integer fields are read as JavaScript numbers. **Default:** `false`.
  * `returnArrays` {boolean} If `true`, query results are returned as arrays instead of objects.
    **Default:** `false`.
  * `allowBareNamedParameters` {boolean} If `true`, allows binding named parameters without the prefix
    character (e.g., `foo` instead of `:foo`). **Default:** `true`.
  * `allowUnknownNamedParameters` {boolean} If `true`, unknown named parameters are ignored when binding.
    If `false`, an exception is thrown for unknown named parameters. **Default:** `false`.
  * `defensive` {boolean} If `true`, enables the defensive flag. When the defensive flag is enabled,
    language features that allow ordinary SQL to deliberately corrupt the database file are disabled.
    The defensive flag can also be set using `enableDefensive()`.
    **Default:** `true`.
  * `limits` {Object} Configuration for various SQLite limits. These limits
    can be used to prevent excessive resource consumption when handling
    potentially malicious input. See Run-Time Limits and Limit Constants
    in the SQLite documentation for details. Default values are determined by
    SQLite's compile-time defaults and may vary depending on how SQLite was
    built. The following properties are supported:
    * `length` {number} Maximum length of a string or BLOB.
    * `sqlLength` {number} Maximum length of an SQL statement.
    * `column` {number} Maximum number of columns.
    * `exprDepth` {number} Maximum depth of an expression tree.
    * `compoundSelect` {number} Maximum number of terms in a compound SELECT.
    * `vdbeOp` {number} Maximum number of VDBE instructions.
    * `functionArg` {number} Maximum number of function arguments.
    * `attach` {number} Maximum number of attached databases.
    * `likePatternLength` {number} Maximum length of a LIKE pattern.
    * `variableNumber` {number} Maximum number of SQL variables.
    * `triggerDepth` {number} Maximum trigger recursion depth.

Constructs a new `Database` instance.

### `database.aggregate(name, options)`

Registers a new aggregate function with the SQLite database. This method is a wrapper around
`sqlite3_create_window_function()`.

* `name` {string} The name of the SQLite function to create.
* `options` {Object} Function configuration settings.
  * `deterministic` {boolean} If `true`, the `SQLITE_DETERMINISTIC` flag is
    set on the created function. **Default:** `false`.
  * `directOnly` {boolean} If `true`, the `SQLITE_DIRECTONLY` flag is set on
    the created function. **Default:** `false`.
  * `useBigIntArguments` {boolean} If `true`, integer arguments to `options.step` and `options.inverse`
    are converted to `BigInt`s. If `false`, integer arguments are passed as
    JavaScript numbers. **Default:** `false`.
  * `varargs` {boolean} If `true`, `options.step` and `options.inverse` may be invoked with any number of
    arguments (between zero and `SQLITE_MAX_FUNCTION_ARG`). If `false`,
    `inverse` and `step` must be invoked with exactly `length` arguments, and
    their `length` properties must be integers.
    **Default:** `false`.
  * `start` {number | string | null | Array | Object | Function} The identity
    value for the aggregation function. This value is used when the aggregation
    function is initialized. When a {Function} is passed the identity will be its return value.
  * `step` {Function} The function to call for each row in the aggregation. The
    function receives the current state and the row value. The return value of
    this function should be the new state.
  * `result` {Function} The function to call to get the result of the
    aggregation. The function receives the final state and should return the
    result of the aggregation.
  * `inverse` {Function} When this function is provided, the `aggregate` method will work as a window function.
    The function receives the current state and the dropped row value. The return value of this function should be the
    new state.

When used as a window function, the `result` function will be called multiple times.

```cjs
const { Database } = require('node:sqlite');

const db = new Database(':memory:');
db.exec(`
  CREATE TABLE t3(x, y);
  INSERT INTO t3 VALUES ('a', 4),
                        ('b', 5),
                        ('c', 3),
                        ('d', 8),
                        ('e', 1);
`);

db.aggregate('sumint', {
  start: 0,
  step: (acc, value) => acc + value,
});

using query = db.prepare('SELECT sumint(y) as total FROM t3');
query.get(); // { total: 21 }
```

```mjs
import { Database } from 'node:sqlite';

const db = new Database(':memory:');
db.exec(`
  CREATE TABLE t3(x, y);
  INSERT INTO t3 VALUES ('a', 4),
                        ('b', 5),
                        ('c', 3),
                        ('d', 8),
                        ('e', 1);
`);

db.aggregate('sumint', {
  start: 0,
  step: (acc, value) => acc + value,
});

using query = db.prepare('SELECT sumint(y) as total FROM t3');
query.get(); // { total: 21 }
```

### `database.close()`

Closes the database connection. An exception is thrown if the database is not
open. An `ERR_INVALID_STATE` error is thrown if the method is called while
a statement is executing, such as inside a user-defined function, an aggregate
function, an authorizer callback, or a `'sqlite.db.query'` subscriber. This
method is a wrapper around `sqlite3_close_v2()`.

### `database.loadExtension(path[, entryPoint])`

* `path` {string} The path to the shared library to load.
* `entryPoint` {string} The name of the extension's entry-point function. When
  omitted, SQLite derives the entry point from the shared library's filename;
  pass this argument explicitly when the derived name does not match.

Loads a shared library into the database connection. This method is a wrapper
around `sqlite3_load_extension()`. It is required to enable the
`allowExtension` option when constructing the `Database` instance.

```mjs
import { Database } from 'node:sqlite';
const database = new Database(':memory:', { allowExtension: true });

// Load using the entry point derived from the filename.
database.loadExtension('./decimal.dylib');

// Override the entry point when the derived name does not match.
database.loadExtension('./base64.dylib', 'sqlite3_base64_init');
```

```cjs
const { Database } = require('node:sqlite');
const database = new Database(':memory:', { allowExtension: true });

// Load using the entry point derived from the filename.
database.loadExtension('./decimal.dylib');

// Override the entry point when the derived name does not match.
database.loadExtension('./base64.dylib', 'sqlite3_base64_init');
```

### `database.enableLoadExtension(allow)`

* `allow` {boolean} Whether to allow loading extensions.

Enables or disables the `loadExtension` SQL function, and the `loadExtension()`
method. When `allowExtension` is `false` when constructing, you cannot enable
loading extensions for security reasons.

### `database.enableDefensive(active)`

* `active` {boolean} Whether to set the defensive flag.

Enables or disables the defensive flag. When the defensive flag is active,
language features that allow ordinary SQL to deliberately corrupt the database file are disabled.
See `SQLITE_DBCONFIG_DEFENSIVE` in the SQLite documentation for details.

### `database.location([dbName])`

* `dbName` {string} Name of the database. This can be `'main'` (the default primary database) or any other
  database that has been added with `ATTACH DATABASE` **Default:** `'main'`.
* Returns: {string | null} The location of the database file. When using an in-memory database,
  this method returns null.

This method is a wrapper around `sqlite3_db_filename()`

### `database.exec(sql)`

* `sql` {string} A SQL string to execute.

This method allows one or more SQL statements to be executed without returning
any results. This method is useful when executing SQL statements read from a
file. This method is a wrapper around `sqlite3_exec()`.

### `database.function(name[, options], fn)`

* `name` {string} The name of the SQLite function to create.
* `options` {Object} Optional configuration settings for the function. The
  following properties are supported:
  * `deterministic` {boolean} If `true`, the `SQLITE_DETERMINISTIC` flag is
    set on the created function. **Default:** `false`.
  * `directOnly` {boolean} If `true`, the `SQLITE_DIRECTONLY` flag is set on
    the created function. **Default:** `false`.
  * `useBigIntArguments` {boolean} If `true`, integer arguments to `function`
    are converted to `BigInt`s. If `false`, integer arguments are passed as
    JavaScript numbers. **Default:** `false`.
  * `varargs` {boolean} If `true`, `function` may be invoked with any number of
    arguments (between zero and `SQLITE_MAX_FUNCTION_ARG`). If `false`,
    `function` must be invoked with exactly `function.length` arguments, which
    must be an integer.
    **Default:** `false`.
* `fn` {Function} The JavaScript function to call when the SQLite function is
  invoked. The return value of this function should be a valid SQLite data type:
  see Type conversion between JavaScript and SQLite. The result defaults to
  `NULL` if the return value is `undefined`.

This method is used to create SQLite user-defined functions. This method is a
wrapper around `sqlite3_create_function_v2()`.
