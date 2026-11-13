---
title: "SQLite (part 5 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/sqlite.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# SQLite (part 5 of 6)

## Class: `Statement`

This class represents a single prepared statement. This class cannot be
instantiated via its constructor. Instead, instances are created via the
`database.prepare()` method. All APIs exposed by this class execute
synchronously.

`StatementSync` is a deprecated alias for `Statement`, kept for backward
compatibility with the class's previous name. See
DEP0211.

A prepared statement is an efficient binary representation of the SQL used to
create it. Prepared statements are parameterizable, and can be invoked multiple
times with different bound values. Parameters also offer protection against
SQL injection attacks. For these reasons, prepared statements are preferred
over hand-crafted SQL strings when handling user input.

### Binding parameters

The `all()`, `get()`, `iterate()`, and `run()` methods bind their arguments to
the parameters of the prepared statement before executing it. Parameters are
either anonymous or named.

Anonymous parameters are written as `?` in SQL and are bound in order from the
arguments passed to the method. The `?NNN` form assigns SQLite parameter index
`NNN` to a placeholder. Avoid mixing numbered and named parameters because they
share parameter indexes.

```js
db.prepare('SELECT ? AS a, ? AS b').get('x', 42);
// { a: 'x', b: 42 }
db.prepare('SELECT ?2 AS a, ?1 AS b').get('first', 'second');
// { a: 'second', b: 'first' }
```

Named parameters begin with one of the prefix characters `$`, `:`, or `@` in
SQL. They are bound from an object passed as the first argument. Repeating a
name in the SQL binds the same value to every occurrence.

```js
db.prepare('SELECT $a AS a, $b AS b').get({ $a: 1, $b: 2 });
// { a: 1, b: 2 }
db.prepare('SELECT :a AS a').get({ ':a': 1 });
// { a: 1 }
db.prepare('SELECT @a AS a').get({ '@a': 1 });
// { a: 1 }
db.prepare('SELECT $k AS a, $k AS b').get({ k: 7 });
// { a: 7, b: 7 }
```

The last example omits the prefix character from the object key. Bare names are
allowed by default; see `statement.setAllowBareNamedParameters()` for their
caveats.

Binding a key that does not name a parameter of the statement throws an
`ERR_INVALID_STATE` error unless unknown named parameters are ignored. See
`statement.setAllowUnknownNamedParameters()`.

Parameters that are never bound are `NULL`, and binding `undefined` has the same
effect, so `{ $a: undefined }` and `{}` are equivalent. Because `undefined` is
not an object, passing it in place of `namedParameters` binds it as an anonymous
parameter instead.

See Type conversion between JavaScript and SQLite for the values that can be
bound. Binding any other value throws an `ERR_INVALID_ARG_TYPE` error.

### `statement.all(namedParameters)`

* `namedParameters` {Object} An optional object used to bind named parameters.
  The keys of this object are used to configure the mapping.
* `...anonymousParameters`
  {undefined|null|number|bigint|boolean|string|Buffer|TypedArray|DataView|ArrayBuffer|SharedArrayBuffer}
  Zero or more values to bind to anonymous parameters.
* Returns: {Array} An array of objects. Each object corresponds to a row
  returned by executing the prepared statement. The keys and values of each
  object correspond to the column names and values of the row.

This method executes a prepared statement and returns all results as an array of
objects. If the prepared statement does not return any results, this method
returns an empty array. The prepared statement parameters are bound using
the values in `namedParameters` and `anonymousParameters`. See
Binding parameters.

### `statement.close()`

Finalizes the prepared statement. An exception is thrown if the statement is
already finalized. An `ERR_INVALID_STATE` error is thrown if this statement
is currently executing, which happens when the method is called from a callback
that the statement itself triggered, such as a user-defined function, an
aggregate function, or a `'sqlite.db.query'` subscriber. Idle statements
on the same connection can be finalized from such a callback. This method is a
wrapper around `sqlite3_finalize()`.

### `statement.columns()`

* Returns: {Array} An array of objects. Each object corresponds to a column
  in the prepared statement, and contains the following properties:
  * `column` {string|null} The unaliased name of the column in the origin
    table, or `null` if the column is the result of an expression or subquery.
    This property is the result of `sqlite3_column_origin_name()`.
  * `database` {string|null} The unaliased name of the origin database, or
    `null` if the column is the result of an expression or subquery. This
    property is the result of `sqlite3_column_database_name()`.
  * `name` {string} The name assigned to the column in the result set of a
    `SELECT` statement. This property is the result of
    `sqlite3_column_name()`.
  * `table` {string|null} The unaliased name of the origin table, or `null` if
    the column is the result of an expression or subquery. This property is the
    result of `sqlite3_column_table_name()`.
  * `type` {string|null} The declared data type of the column, or `null` if the
    column is the result of an expression or subquery. This property is the
    result of `sqlite3_column_decltype()`.

This method is used to retrieve information about the columns returned by the
prepared statement.

### `statement.expandedSQL`

* Type: {string} The source SQL expanded to include parameter values.

The source SQL text of the prepared statement with parameter
placeholders replaced by the values that were used during the most recent
execution of this prepared statement. This property is a wrapper around
`sqlite3_expanded_sql()`.

### `statement.get(namedParameters)`

* `namedParameters` {Object} An optional object used to bind named parameters.
  The keys of this object are used to configure the mapping.
* `...anonymousParameters`
  {undefined|null|number|bigint|boolean|string|Buffer|TypedArray|DataView|ArrayBuffer|SharedArrayBuffer}
  Zero or more values to bind to anonymous parameters.
* Returns: {Object|undefined} An object corresponding to the first row returned
  by executing the prepared statement. The keys and values of the object
  correspond to the column names and values of the row. If no rows were returned
  from the database then this method returns `undefined`.

This method executes a prepared statement and returns the first result as an
object. If the prepared statement does not return any results, this method
returns `undefined`. The prepared statement parameters are bound using the
values in `namedParameters` and `anonymousParameters`. See
Binding parameters.

### `statement.iterate(namedParameters)`

* `namedParameters` {Object} An optional object used to bind named parameters.
  The keys of this object are used to configure the mapping.
* `...anonymousParameters`
  {undefined|null|number|bigint|boolean|string|Buffer|TypedArray|DataView|ArrayBuffer|SharedArrayBuffer}
  Zero or more values to bind to anonymous parameters.
* Returns: {Iterator} An iterable iterator of objects. Each object corresponds to a row
  returned by executing the prepared statement. The keys and values of each
  object correspond to the column names and values of the row.

This method executes a prepared statement and returns an iterator of
objects. If the prepared statement does not return any results, this method
returns an empty iterator. The prepared statement parameters are bound using
the values in `namedParameters` and `anonymousParameters`. See
Binding parameters.

### `statement.resetStats()`

Resets every counter reported by `statement.stat()` back to zero, except
`memused`, which reports current memory usage and cannot be reset. This
method is a wrapper around `sqlite3_stmt_status()` and is useful for
measuring a specific workload without the counts accumulated by earlier
executions of the same prepared statement.

### `statement.run(namedParameters)`

* `namedParameters` {Object} An optional object used to bind named parameters.
  The keys of this object are used to configure the mapping.
* `...anonymousParameters`
  {undefined|null|number|bigint|boolean|string|Buffer|TypedArray|DataView|ArrayBuffer|SharedArrayBuffer}
  Zero or more values to bind to anonymous parameters.
* Returns: {Object}
  * `changes` {number|bigint} The number of rows modified, inserted, or deleted
    by the most recently completed `INSERT`, `UPDATE`, or `DELETE` statement.
    This field is either a number or a `BigInt` depending on the prepared
    statement's configuration. This property is the result of
    `sqlite3_changes64()`.
  * `lastInsertRowid` {number|bigint} The most recently inserted rowid. This
    field is either a number or a `BigInt` depending on the prepared statement's
    configuration. This property is the result of
    `sqlite3_last_insert_rowid()`.

This method executes a prepared statement and returns an object summarizing the
resulting changes. The prepared statement parameters are bound using the
values in `namedParameters` and `anonymousParameters`. See
Binding parameters.

### `statement.setAllowBareNamedParameters(enabled)`

* `enabled` {boolean} Enables or disables support for binding named parameters
  without the prefix character.

The names of SQLite parameters begin with a prefix character. However, with the
exception of the dollar sign character, these prefix characters also require
extra quoting when used in object keys.

To improve ergonomics, `node:sqlite` allows bare named parameters, which do not
require the prefix character in JavaScript code, by default. This method can be
used to disable that behavior, requiring the prefix character when binding.
There are several caveats to be aware of when bare named parameters are
allowed:

* The prefix character is still required in SQL.
* The prefix character is still allowed in JavaScript. In fact, prefixed names
  will have slightly better binding performance.
* Using ambiguous named parameters, such as `$k` and `@k`, in the same prepared
  statement will result in an exception as it cannot be determined how to bind
  a bare name.

### `statement.setAllowUnknownNamedParameters(enabled)`

* `enabled` {boolean} Enables or disables support for unknown named parameters.

By default, if an unknown name is encountered while binding parameters, an
exception is thrown. This method allows unknown named parameters to be ignored.

### `statement.setReturnArrays(enabled)`

* `enabled` {boolean} Enables or disables the return of query results as arrays.

When enabled, query results returned by the `all()`, `get()`, and `iterate()` methods will be returned as arrays instead
of objects.

### `statement.setReadBigInts(enabled)`

* `enabled` {boolean} Enables or disables the use of `BigInt`s when reading
  `INTEGER` fields from the database.

When reading from the database, SQLite `INTEGER`s are mapped to JavaScript
numbers by default. However, SQLite `INTEGER`s can store values larger than
JavaScript numbers are capable of representing. In such cases, this method can
be used to read `INTEGER` data using JavaScript `BigInt`s. This method has no
impact on database write operations where numbers and `BigInt`s are both
supported at all times.

### `statement.sourceSQL`

* Type: {string} The source SQL used to create this prepared statement.

The source SQL text of the prepared statement. This property is a
wrapper around `sqlite3_sql()`.

### `statementSymbol.dispose`

Finalizes the prepared statement. If the prepared statement is already
finalized, then this is a no-op. An `ERR_INVALID_STATE` error is thrown if
this statement is currently executing, under the same conditions as
`statement.close()`.

### `statement.stat(counter)`

* `counter` {string} The name of the counter to read. One of:

  * `'fullscanStep'` The number of times SQLite has stepped forward in a table
    as part of a full table scan.
  * `'sort'` The number of sort operations that have occurred.
  * `'autoindex'` The number of rows inserted into transient indices that were
    created automatically to help joins run faster.
  * `'vmStep'` The number of virtual machine operations executed by the
    prepared statement.
  * `'reprepare'` The number of times the statement has been automatically
    reprepared due to schema changes or changes to bound parameters.
  * `'run'` The number of execution cycles started by the prepared statement.
  * `'filterMiss'` The number of times the Bloom filter returned a result that
    required the join step to be processed as normal.
  * `'filterHit'` The number of times a join step was bypassed because a Bloom
    filter returned not-found.
  * `'memused'` The approximate number of bytes of heap memory used to store
    the prepared statement.

* Returns: {number} The current value of the requested counter.

Returns one of the runtime counters that SQLite tracks for this prepared
statement. This method is a wrapper around `sqlite3_stmt_status()` and does
not reset the counter. Asserting that a statement does not perform a full table
scan (`statement.stat('fullscanStep') === 0`) is a useful check to guard
against degenerate performance.

The `'filterMiss'` and `'filterHit'` counters require SQLite 3.38.0 or later.
Builds linked against an older SQLite with `--shared-sqlite` do not expose them,
and passing either name throws `ERR_INVALID_ARG_VALUE`.
