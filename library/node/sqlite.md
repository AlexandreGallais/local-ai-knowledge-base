---
title: "SQLite (part 1 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/sqlite.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# SQLite

> Stability: 1.2 - Release candidate.

The `node:sqlite` module facilitates working with SQLite databases.
To access it:

```mjs
import sqlite from 'node:sqlite';
```

```cjs
const sqlite = require('node:sqlite');
```

This module is only available under the `node:` scheme. SQL trace events can
be observed via the `diagnostics_channel` module. See
`'sqlite.db.query'` for details.

The following example shows the basic usage of the `node:sqlite` module to open
an in-memory database, write data to the database, and then read the data back.

```mjs
import { Database } from 'node:sqlite';
const database = new Database(':memory:');

// Execute SQL statements from strings.
database.exec(`
  CREATE TABLE data(
    key INTEGER PRIMARY KEY,
    value TEXT
  ) STRICT
`);
// Create a prepared statement to insert data into the database.
const insert = database.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
// Execute the prepared statement with bound values.
insert.run(1, 'hello');
insert.run(2, 'world');
// Finalize the prepared statement once it is no longer needed.
insert.close();
// Create a prepared statement to read data from the database.
const query = database.prepare('SELECT * FROM data ORDER BY key');
// Execute the prepared statement and log the result set.
console.log(query.all());
// Prints: [ { key: 1, value: 'hello' }, { key: 2, value: 'world' } ]
query.close();
```

```cjs
const { Database } = require('node:sqlite');
const database = new Database(':memory:');

// Execute SQL statements from strings.
database.exec(`
  CREATE TABLE data(
    key INTEGER PRIMARY KEY,
    value TEXT
  ) STRICT
`);
// Create a prepared statement to insert data into the database.
const insert = database.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
// Execute the prepared statement with bound values.
insert.run(1, 'hello');
insert.run(2, 'world');
// Finalize the prepared statement once it is no longer needed.
insert.close();
// Create a prepared statement to read data from the database.
const query = database.prepare('SELECT * FROM data ORDER BY key');
// Execute the prepared statement and log the result set.
console.log(query.all());
// Prints: [ { key: 1, value: 'hello' }, { key: 2, value: 'world' } ]
query.close();
```

## Type conversion between JavaScript and SQLite

When Node.js writes to or reads from SQLite, it is necessary to convert between
JavaScript data types and SQLite's data types. Because JavaScript supports
more data types than SQLite, only a subset of JavaScript types are supported.
Attempting to write an unsupported data type to SQLite will result in an
exception.

| Storage class | JavaScript to SQLite                                            | SQLite to JavaScript                  |
| ------------- | --------------------------------------------------------------- | ------------------------------------- |
| `NULL`        | {null} or {undefined}                                           | {null}                                |
| `INTEGER`     | {number}, {bigint}, or {boolean}                                | {number} or {bigint} _(configurable)_ |
| `REAL`        | {number}                                                        | {number}                              |
| `TEXT`        | {string}                                                        | {string}                              |
| `BLOB`        | {TypedArray}, {DataView}, {ArrayBuffer}, or {SharedArrayBuffer} | {Uint8Array}                          |

Booleans are written as the `INTEGER` values `1` and `0`. Like any other
`INTEGER` value, they are read back as {number} by default, or as {bigint}
values (`1n` and `0n`) when reading BigInts is enabled. Writing a {bigint} that
does not fit in a signed 64-bit integer throws an `ERR_INVALID_ARG_VALUE`
error.

`undefined` is written as `NULL`, so passing it explicitly is equivalent to
omitting a named parameter. `NULL` always reads back as {null}, never
`undefined`.

APIs that read values from SQLite have a configuration option that determines
whether `INTEGER` values are converted to `number` or `bigint` in JavaScript,
such as the `readBigInts` option for statements and the `useBigIntArguments`
option for user-defined functions. If Node.js reads an `INTEGER` value from
SQLite that is outside the JavaScript safe integer range, and the option to
read BigInts is not enabled, then an `ERR_OUT_OF_RANGE` error will be thrown.
