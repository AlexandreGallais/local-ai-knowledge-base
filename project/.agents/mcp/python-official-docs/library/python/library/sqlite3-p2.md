---
title: "sqlite3 --- DB-API 2.0 interface for SQLite databases (part 2 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/sqlite3.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# sqlite3 --- DB-API 2.0 interface for SQLite databases (part 2 of 7)

## Reference

### `connect(database, *, timeout=5.0, detect_types=0, \`

```python
isolation_level="DEFERRED", check_same_thread=True, \
factory=sqlite3.Connection, cached_statements=128, \
uri=False, \
autocommit=sqlite3.LEGACY_TRANSACTION_CONTROL)
```

Open a connection to an SQLite database.

- **param `database`:**
The path to the database file to be opened.
You can pass `":memory:"` to create an `SQLite database existing only
in memory <https://sqlite.org/inmemorydb.html>`_, and open a connection
to it.
- **type `database`:** path-like object

- **param `float timeout`:**
How many seconds the connection should wait before raising
an `OperationalError` when a table is locked.
If another connection opens a transaction to modify a table,
that table will be locked until the transaction is committed.
Default five seconds.

- **param `int detect_types`:**
Control whether and how data types not
natively supported by SQLite
are looked up to be converted to Python types,
using the converters registered with `register_converter()`.
Set it to any combination (using `|`, bitwise or) of
`PARSE_DECLTYPES` and `PARSE_COLNAMES`
to enable this.
Column names take precedence over declared types if both flags are set.
By default (`0`), type detection is disabled.

- **param `isolation_level`:**
Control legacy transaction handling behaviour.
See `Connection.isolation_level` and
sqlite3-transaction-control-isolation-level for more information.
Can be `"DEFERRED"` (default), `"EXCLUSIVE"` or `"IMMEDIATE"`;
or `None` to disable opening transactions implicitly.
Has no effect unless `Connection.autocommit` is set to
`LEGACY_TRANSACTION_CONTROL` (the default).
- **type `isolation_level`:** str | None

- **param `bool check_same_thread`:**
If `True` (default), `ProgrammingError` will be raised
if the database connection is used by a thread
other than the one that created it.
If `False`, the connection may be accessed in multiple threads;
write operations may need to be serialized by the user
to avoid data corruption.
See `threadsafety` for more information.

- **param `~sqlite3.Connection factory`:**
A custom subclass of `Connection` to create the connection with,
if not the default `Connection` class.

- **param `int cached_statements`:**
The number of statements that `sqlite3`
should internally cache for this connection, to avoid parsing overhead.
By default, 128 statements.

- **param `bool uri`:**
If set to `True`, *database* is interpreted as a
URI (Uniform Resource Identifier) with a file path
and an optional query string.
The scheme part *must* be `"file:"`,
and the path can be relative or absolute.
The query string allows passing parameters to SQLite,
enabling various sqlite3-uri-tricks.

- **param `autocommit`:**
Control PEP 249 transaction handling behaviour.
See `Connection.autocommit` and
sqlite3-transaction-control-autocommit for more information.
*autocommit* currently defaults to
`LEGACY_TRANSACTION_CONTROL`.
The default will change to `False` in a future Python release.
- **type `autocommit`:** bool

- **rtype:** ~sqlite3.Connection

> *Changed in version 3.4.*
> Added the *uri* parameter.

> *Changed in version 3.7.*
> *database* can now also be a path-like object, not only a string.

> *Changed in version 3.10.*
> Added the `sqlite3.connect/handle` auditing event.

> *Changed in version 3.12.*
> Added the *autocommit* parameter.

> *Changed in version 3.15.*
> All parameters except *database* are now keyword-only.

### `complete_statement(statement)`

Return `True` if the string *statement* appears to contain
one or more complete SQL statements.
No syntactic verification or parsing of any kind is performed,
other than checking that there are no unclosed string literals
and the statement is terminated by a semicolon.

For example:

```python

>>> sqlite3.complete_statement("SELECT foo FROM bar;")
True
>>> sqlite3.complete_statement("SELECT foo")
False
```

This function may be useful during command-line input
to determine if the entered text seems to form a complete SQL statement,
or if additional input is needed before calling `execute()`.

See `runsource()` in Lib/sqlite3/__main__.py
for real-world use.

### `enable_callback_tracebacks(flag, /)`

Enable or disable callback tracebacks.
By default you will not get any tracebacks in user-defined functions,
aggregates, converters, authorizer callbacks etc. If you want to debug them,
you can call this function with *flag* set to `True`. Afterwards, you
will get tracebacks from callbacks on `sys.stderr`. Use `False`
to disable the feature again.

> **Note:** Errors in user-defined function callbacks are logged as unraisable exceptions.
> Use an `unraisable hook handler()` for
> introspection of the failed callback.

### `register_adapter(type, adapter, /)`

Register an *adapter* callable to adapt the Python type *type*
into an SQLite type.
The adapter is called with a Python object of type *type* as its sole
argument, and must return a value of a
type that SQLite natively understands.

### `register_converter(typename, converter, /)`

Register the *converter* callable to convert SQLite objects of type
*typename* into a Python object of a specific type.
The converter is invoked for all SQLite values of type *typename*;
it is passed a `bytes` object and should return an object of the
desired Python type.
Consult the parameter *detect_types* of
`connect()` for information regarding how type detection works.

Note: *typename* and the name of the type in your query are matched
case-insensitively.

### `LEGACY_TRANSACTION_CONTROL`

Set `autocommit` to this constant to select
old style (pre-Python 3.12) transaction control behaviour.
See sqlite3-transaction-control-isolation-level for more information.

### `PARSE_DECLTYPES`

Pass this flag value to the *detect_types* parameter of
`connect()` to look up a converter function using
the declared types for each column.
The types are declared when the database table is created.
`sqlite3` will look up a converter function using the first word of the
declared type as the converter dictionary key.
For example:

```sql
CREATE TABLE test(
   i integer primary key,  ! will look up a converter named "integer"
   p point,                ! will look up a converter named "point"
   n number(10)            ! will look up a converter named "number"
 )
```

This flag may be combined with `PARSE_COLNAMES` using the `|`
(bitwise or) operator.

> **Note:** Generated fields (for example `MAX(p)`) are returned as `str`.
> Use `PARSE_COLNAMES` to enforce types for such queries.

### `PARSE_COLNAMES`

Pass this flag value to the *detect_types* parameter of
`connect()` to look up a converter function by
using the type name, parsed from the query column name,
as the converter dictionary key.
The query column name must be wrapped in double quotes (`"`)
and the type name must be wrapped in square brackets (`[]`).

```sql
SELECT MAX(p) as "p [point]" FROM test;  ! will look up converter "point"
```

This flag may be combined with `PARSE_DECLTYPES` using the `|`
(bitwise or) operator.

### `SQLITE_OK`

```python
SQLITE_DENY
SQLITE_IGNORE
```

Flags that should be returned by the *authorizer_callback* callable
passed to `Connection.set_authorizer()`, to indicate whether:

- Access is allowed (`SQLITE_OK`),
- The SQL statement should be aborted with an error (`SQLITE_DENY`)
- The column should be treated as a `NULL` value (`SQLITE_IGNORE`)

### `apilevel`

String constant stating the supported DB-API level. Required by the DB-API.
Hard-coded to `"2.0"`.

### `paramstyle`

String constant stating the type of parameter marker formatting expected by
the `sqlite3` module. Required by the DB-API. Hard-coded to
`"qmark"`.

> **Note:** The `named` DB-API parameter style is also supported.

### `sqlite_version`

Version number of the runtime SQLite library as a `string`.

### `sqlite_version_info`

Version number of the runtime SQLite library as a `tuple` of
`integers`.

### `SQLITE_KEYWORDS`

A `tuple` containing all SQLite keywords.

This constant is only available if Python was compiled with SQLite
3.24.0 or greater.

> *Added in version 3.15.*

### `threadsafety`

Integer constant required by the DB-API 2.0, stating the level of thread
safety the `sqlite3` module supports. This attribute is set based on
the default threading mode the
underlying SQLite library is compiled with. The SQLite threading modes are:

1. **Single-thread**: In this mode, all mutexes are disabled and SQLite is
unsafe to use in more than a single thread at once.
1. **Multi-thread**: In this mode, SQLite can be safely used by multiple
threads provided that no single database connection is used
simultaneously in two or more threads.
1. **Serialized**: In serialized mode, SQLite can be safely used by
multiple threads with no restriction.

The mappings from SQLite threading modes to DB-API 2.0 threadsafety levels
are as follows:

```text
+------------------+----------------------+----------------------+-------------------------------+
| SQLite threading | :pep:`threadsafety   | `SQLITE_THREADSAFE`_ | DB-API 2.0 meaning            |
| mode             | <0249#threadsafety>` |                      |                               |
+==================+======================+======================+===============================+
| single-thread    | 0                    | 0                    | Threads may not share the     |
|                  |                      |                      | module                        |
+------------------+----------------------+----------------------+-------------------------------+
| multi-thread     | 1                    | 2                    | Threads may share the module, |
|                  |                      |                      | but not connections           |
+------------------+----------------------+----------------------+-------------------------------+
| serialized       | 3                    | 1                    | Threads may share the module, |
|                  |                      |                      | connections and cursors       |
+------------------+----------------------+----------------------+-------------------------------+
```

> *Changed in version 3.11.*
> Set *threadsafety* dynamically instead of hard-coding it to `1`.

### `SQLITE_DBCONFIG_DEFENSIVE`

```python
SQLITE_DBCONFIG_DQS_DDL
SQLITE_DBCONFIG_DQS_DML
SQLITE_DBCONFIG_ENABLE_FKEY
SQLITE_DBCONFIG_ENABLE_FTS3_TOKENIZER
SQLITE_DBCONFIG_ENABLE_LOAD_EXTENSION
SQLITE_DBCONFIG_ENABLE_QPSG
SQLITE_DBCONFIG_ENABLE_TRIGGER
SQLITE_DBCONFIG_ENABLE_VIEW
SQLITE_DBCONFIG_LEGACY_ALTER_TABLE
SQLITE_DBCONFIG_LEGACY_FILE_FORMAT
SQLITE_DBCONFIG_NO_CKPT_ON_CLOSE
SQLITE_DBCONFIG_RESET_DATABASE
SQLITE_DBCONFIG_TRIGGER_EQP
SQLITE_DBCONFIG_TRUSTED_SCHEMA
SQLITE_DBCONFIG_WRITABLE_SCHEMA
```

These constants are used for the `Connection.setconfig()`
and `getconfig()` methods.

The availability of these constants varies depending on the version of SQLite
Python was compiled with.

> *Added in version 3.12.*

> **See also:** https://www.sqlite.org/c3ref/c_dbconfig_defensive.html
> SQLite docs: Database Connection Configuration Options

> *Deprecated since version 3.12, removed in version 3.14.*
> The `version` and `version_info` constants.

### class `Connection`

Each open SQLite database is represented by a `Connection` object,
which is created using `sqlite3.connect()`.
Their main purpose is creating `Cursor` objects,
and sqlite3-controlling-transactions.

> **See also:** - sqlite3-connection-shortcuts
> - sqlite3-connection-context-manager

> *Changed in version 3.13.*
> A `ResourceWarning` is emitted if `close()` is not called before
> a `Connection` object is deleted.

An SQLite database connection has the following attributes and methods:

### `cursor(factory=Cursor)`

Create and return a `Cursor` object.
The cursor method accepts a single optional parameter *factory*. If
supplied, this must be a callable returning
an instance of `Cursor` or its subclasses.

### `blobopen(table, column, rowid, /, *, readonly=False, name="main")`

Open a `Blob` handle to an existing
BLOB (Binary Large OBject).

- **param `str table`:**
The name of the table where the blob is located.

- **param `str column`:**
The name of the column where the blob is located.

- **param `int rowid`:**
The row id where the blob is located.

- **param `bool readonly`:**
Set to `True` if the blob should be opened without write
permissions.
Defaults to `False`.

- **param `str name`:**
The name of the database where the blob is located.
Defaults to `"main"`.

- **raises `OperationalError`:**
When trying to open a blob in a `WITHOUT ROWID` table.

- **rtype:** Blob

> **Note:** The blob size cannot be changed using the `Blob` class.
> Use the SQL function `zeroblob` to create a blob with a fixed size.

> *Added in version 3.11.*

### `commit()`

Commit any pending transaction to the database.
If `autocommit` is `True`, or there is no open transaction,
this method does nothing.
If `autocommit` is `False`, a new transaction is implicitly
opened if a pending transaction was committed by this method.

### `rollback()`

Roll back to the start of any pending transaction.
If `autocommit` is `True`, or there is no open transaction,
this method does nothing.
If `autocommit` is `False`, a new transaction is implicitly
opened if a pending transaction was rolled back by this method.

### `close()`

Close the database connection.
If `autocommit` is `False`,
any pending transaction is implicitly rolled back.
If `autocommit` is `True` or `LEGACY_TRANSACTION_CONTROL`,
no implicit transaction control is executed.
Make sure to `commit()` before closing
to avoid losing pending changes.

### `execute(sql, parameters=(), /)`

Create a new `Cursor` object and call
`execute()` on it with the given *sql* and *parameters*.
Return the new cursor object.

### `executemany(sql, parameters, /)`

Create a new `Cursor` object and call
`executemany()` on it with the given *sql* and *parameters*.
Return the new cursor object.

### `executescript(sql_script, /)`

Create a new `Cursor` object and call
`executescript()` on it with the given *sql_script*.
Return the new cursor object.
