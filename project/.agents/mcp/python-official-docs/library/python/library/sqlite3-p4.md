---
title: "sqlite3 --- DB-API 2.0 interface for SQLite databases (part 4 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/sqlite3.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# sqlite3 --- DB-API 2.0 interface for SQLite databases (part 4 of 7)

### `getconfig(op, /)`

Query a boolean connection configuration option.

- **param `int op`:**
A SQLITE_DBCONFIG code.

- **rtype:** bool

> *Added in version 3.12.*

### `setconfig(op, enable=True, /)`

Set a boolean connection configuration option.

- **param `int op`:**
A SQLITE_DBCONFIG code.

- **param `bool enable`:**
`True` if the configuration option should be enabled (default);
`False` if it should be disabled.

> *Added in version 3.12.*

### `serialize(*, name="main")`

Serialize a database into a `bytes` object.  For an
ordinary on-disk database file, the serialization is just a copy of the
disk file.  For an in-memory database or a "temp" database, the
serialization is the same sequence of bytes which would be written to
disk if that database were backed up to disk.

- **param `str name`:**
The database name to be serialized.
Defaults to `"main"`.

- **rtype:** bytes

> **Note:** This method is only available if the underlying SQLite library has the
> serialize API.

> *Added in version 3.11.*

### `deserialize(data, /, *, name="main")`

Deserialize a `serialized()` database into a
`Connection`.
This method causes the database connection to disconnect from database
*name*, and reopen *name* as an in-memory database based on the
serialization contained in *data*.

- **param `bytes data`:**
A serialized database.

- **param `str name`:**
The database name to deserialize into.
Defaults to `"main"`.

- **raises `OperationalError`:**
If the database connection is currently involved in a read
transaction or a backup operation.

- **raises `DatabaseError`:**
If *data* does not contain a valid SQLite database.

- **raises `OverflowError`:**
If `len(data)` is larger than `2**63 - 1`.

> **Note:** This method is only available if the underlying SQLite library has the
> deserialize API.

> *Added in version 3.11.*

### `autocommit`

This attribute controls PEP 249-compliant transaction behaviour.
`autocommit` has three allowed values:

- `False`: Select PEP 249-compliant transaction behaviour,
implying that `sqlite3` ensures a transaction is always open.
Use `commit()` and `rollback()` to close transactions.

This is the recommended value of `autocommit`.

- `True`: Use SQLite's autocommit mode.
`commit()` and `rollback()` have no effect in this mode.

- `LEGACY_TRANSACTION_CONTROL`:
Pre-Python 3.12 (non-PEP 249-compliant) transaction control.
See `isolation_level` for more details.

This is currently the default value of `autocommit`.

Changing `autocommit` to `False` will open a new transaction,
and changing it to `True` will commit any pending transaction.

See sqlite3-transaction-control-autocommit for more details.

> **Note:** The `isolation_level` attribute has no effect unless
> `autocommit` is `LEGACY_TRANSACTION_CONTROL`.

> *Added in version 3.12.*

### `in_transaction`

This read-only attribute corresponds to the low-level SQLite
autocommit mode.

`True` if a transaction is active (there are uncommitted changes),
`False` otherwise.

> *Added in version 3.2.*

### `isolation_level`

Controls the :ref:`legacy transaction handling mode
<sqlite3-transaction-control-isolation-level>` of `sqlite3`.
If set to `None`, transactions are never implicitly opened.
If set to one of `"DEFERRED"`, `"IMMEDIATE"`, or `"EXCLUSIVE"`,
corresponding to the underlying SQLite transaction behaviour,
:ref:`implicit transaction management
<sqlite3-transaction-control-isolation-level>` is performed.

If not overridden by the *isolation_level* parameter of `connect()`,
the default is `""`, which is an alias for `"DEFERRED"`.

> **Note:** Using `autocommit` to control transaction handling is
> recommended over using `isolation_level`.
> `isolation_level` has no effect unless `autocommit` is
> set to `LEGACY_TRANSACTION_CONTROL` (the default).

### `row_factory`

The initial `row_factory`
for `Cursor` objects created from this connection.
Assigning to this attribute does not affect the `row_factory`
of existing cursors belonging to this connection, only new ones.
Is `None` by default,
meaning each row is returned as a `tuple`.

See sqlite3-howto-row-factory for more details.

> *Changed in version 3.15.*
> Deleting the `row_factory` attribute is no longer allowed.

### `text_factory`

A callable that accepts a `bytes` parameter
and returns a text representation of it.
The callable is invoked for SQLite values with the `TEXT` data type.
By default, this attribute is set to `str`.

See sqlite3-howto-encoding for more details.

> *Changed in version 3.15.*
> Deleting the `text_factory` attribute is no longer allowed.

### `total_changes`

Return the total number of database rows that have been modified, inserted, or
deleted since the database connection was opened.

### Cursor objects

A `Cursor` object represents a database cursor
which is used to execute SQL statements,
and manage the context of a fetch operation.
Cursors are created using `Connection.cursor()`,
or by using any of the :ref:`connection shortcut methods
<sqlite3-connection-shortcuts>`.

Cursor objects are iterators,
meaning that if you `execute()` a `SELECT` query,
you can simply iterate over the cursor to fetch the resulting rows:

```python
sqlite3.cursor

for row in cur.execute("SELECT t FROM data"):
    print(row)
```

```python
sqlite3.cursor

(1,)
```

### class `Cursor`

A `Cursor` instance has the following attributes and methods.

### `execute(sql, parameters=(), /)`

Execute a single SQL statement,
optionally binding Python values using
placeholders.

- **param `str sql`:**
A single SQL statement.

- **param `parameters`:**
Python values to bind to placeholders in *sql*.
A `dict` if named placeholders are used.
A sequence if unnamed placeholders are used.
See sqlite3-placeholders.
- **type `parameters`:** `dict` | sequence

- **raises `ProgrammingError`:**
When *sql* contains more than one SQL statement.
When named placeholders are used
and *parameters* is a sequence instead of a `dict`.

If `autocommit` is
`LEGACY_TRANSACTION_CONTROL`,
`isolation_level` is not `None`,
*sql* is an `INSERT`, `UPDATE`, `DELETE`, or `REPLACE` statement,
and there is no open transaction,
a transaction is implicitly opened before executing *sql*.

> *Changed in version 3.14.*
> `ProgrammingError` is emitted if
> named placeholders are used
> and *parameters* is a sequence instead of a `dict`.

Use `executescript()` to execute multiple SQL statements.

### `executemany(sql, parameters, /)`

For every item in *parameters*,
repeatedly execute the parameterized
DML (Data Manipulation Language) SQL statement *sql*.

Uses the same implicit transaction handling as `execute()`.

- **param `str sql`:**
A single SQL DML statement.

- **param `parameters`:**
An iterable of parameters to bind with
the placeholders in *sql*.
See sqlite3-placeholders.
- **type `parameters`:** iterable

- **raises `ProgrammingError`:**
When *sql* contains more than one SQL statement
or is not a DML statement,
When named placeholders are used
and the items in *parameters* are sequences instead of `dict`\s.

Example:

```python
sqlite3.cursor

rows = [
    ("row1",),
    ("row2",),
]
# cur is an sqlite3.Cursor object
cur.executemany("INSERT INTO data VALUES(?)", rows)
```

> **Note:** Any resulting rows are discarded,
> including DML statements with RETURNING clauses.

> *Changed in version 3.14.*
> `ProgrammingError` is emitted if
> named placeholders are used
> and the items in *parameters* are sequences
> instead of `dict`\s.

### `executescript(sql_script, /)`

Execute the SQL statements in *sql_script*.
If the `autocommit` is
`LEGACY_TRANSACTION_CONTROL`
and there is a pending transaction,
an implicit `COMMIT` statement is executed first.
No other implicit transaction control is performed;
any transaction control must be added to *sql_script*.

*sql_script* must be a `string`.

Example:

```python
sqlite3.cursor

# cur is an sqlite3.Cursor object
cur.executescript("""
    BEGIN;
    CREATE TABLE person(firstname, lastname, age);
    CREATE TABLE book(title, author, published);
    CREATE TABLE publisher(name, address);
    COMMIT;
""")
```

### `fetchone()`

If `row_factory` is `None`,
return the next row query result set as a `tuple`.
Else, pass it to the row factory and return its result.
Return `None` if no more data is available.

### `fetchmany(size=cursor.arraysize)`

Return the next set of rows of a query result as a `list`.
Return an empty list if no more rows are available.

The number of rows to fetch per call is specified by the *size* parameter.
If *size* is not given, `arraysize` determines the number of rows
to be fetched.
If fewer than *size* rows are available,
as many rows as are available are returned.

Note there are performance considerations involved with the *size* parameter.
For optimal performance, it is usually best to use the arraysize attribute.
If the *size* parameter is used, then it is best for it to retain the same
value from one `fetchmany()` call to the next.

> *Changed in version 3.15.*
> Negative *size* values are rejected by raising `ValueError`.

### `fetchall()`

Return all (remaining) rows of a query result as a `list`.
Return an empty list if no rows are available.
Note that the `arraysize` attribute can affect the performance of
this operation.

### `close()`

Close the cursor now (rather than whenever `__del__` is called).

The cursor will be unusable from this point forward; a `ProgrammingError`
exception will be raised if any operation is attempted with the cursor.

### `setinputsizes(sizes, /)`

Required by the DB-API. Does nothing in `sqlite3`.

### `setoutputsize(size, column=None, /)`

Required by the DB-API. Does nothing in `sqlite3`.

### `arraysize`

Read/write attribute that controls the number of rows returned by `fetchmany()`.
The default value is 1 which means a single row would be fetched per call.

> *Changed in version 3.15.*
> Negative values are rejected by raising `ValueError`.

### `connection`

Read-only attribute that provides the SQLite database `Connection`
belonging to the cursor.  A `Cursor` object created by
calling `con.cursor()` will have a
`connection` attribute that refers to *con*:

```python

>>> con = sqlite3.connect(":memory:")
>>> cur = con.cursor()
>>> cur.connection == con
True
>>> con.close()
```

### `description`

Read-only attribute that provides the column names of the last query. To
remain compatible with the Python DB API, it returns a 7-tuple for each
column where the last six items of each tuple are `None`.

It is set for `SELECT` statements without any matching rows as well.

### `lastrowid`

Read-only attribute that provides the row id of the last inserted row. It
is only updated after successful `INSERT` or `REPLACE` statements
using the `execute()` method.  For other statements, after
`executemany()` or `executescript()`, or if the insertion failed,
the value of `lastrowid` is left unchanged.  The initial value of
`lastrowid` is `None`.

> **Note:** Inserts into `WITHOUT ROWID` tables are not recorded.

> *Changed in version 3.6.*
> Added support for the `REPLACE` statement.

### `rowcount`

Read-only attribute that provides the number of modified rows for
`INSERT`, `UPDATE`, `DELETE`, and `REPLACE` statements;
is `-1` for other statements,
including CTE (Common Table Expression) queries.
It is only updated by the `execute()` and `executemany()` methods,
after the statement has run to completion.
This means that any resulting rows must be fetched in order for
`rowcount` to be updated.

### `row_factory`

Control how a row fetched from this `Cursor` is represented.
If `None`, a row is represented as a `tuple`.
Can be set to the included `sqlite3.Row`;
or a callable that accepts two arguments,
a `Cursor` object and the `tuple` of row values,
and returns a custom object representing an SQLite row.

Defaults to what `Connection.row_factory` was set to
when the `Cursor` was created.
Assigning to this attribute does not affect
`Connection.row_factory` of the parent connection.

See sqlite3-howto-row-factory for more details.

> *Changed in version 3.15.*
> Deleting the `row_factory` attribute is no longer allowed.

### class `Row`

A `Row` instance serves as a highly optimized
`row_factory` for `Connection` objects.
It supports iteration, equality testing, `len()`,
and mapping access by column name and index.

Two `Row` objects compare equal
if they have identical column names and values.

See sqlite3-howto-row-factory for more details.

### `keys`

Return a `list` of column names as `strings`.
Immediately after a query,
it is the first member of each tuple in `Cursor.description`.

> *Changed in version 3.5.*
> Added support of slicing.

### class `Blob`

> *Added in version 3.11.*

A `Blob` instance is a file-like object
that can read and write data in an SQLite BLOB (Binary Large OBject).
Call `len(blob)` to get the size (number of bytes) of the blob.
Use indices and slices for direct access to the blob data.

Use the `Blob` as a context manager to ensure that the blob
handle is closed after use.

```python

con = sqlite3.connect(":memory:")
con.execute("CREATE TABLE test(blob_col blob)")
con.execute("INSERT INTO test(blob_col) VALUES(zeroblob(13))")

# Write to our blob, using two write operations:
with con.blobopen("test", "blob_col", 1) as blob:
    blob.write(b"hello, ")
    blob.write(b"world.")
    # Modify the first and last bytes of our blob
    blob[0] = ord("H")
    blob[-1] = ord("!")

# Read the contents of our blob
with con.blobopen("test", "blob_col", 1) as blob:
    greeting = blob.read()

print(greeting)  # outputs "b'Hello, world!'"
con.close()
```

```python

b'Hello, world!'
```

### `close()`

Close the blob.

The blob will be unusable from this point onward.  An
`Error` (or subclass) exception will be raised if any
further operation is attempted with the blob.

### `read(length=-1, /)`

Read *length* bytes of data from the blob at the current offset position.
If the end of the blob is reached, the data up to
EOF (End of File) will be returned.  When *length* is not
specified, or is negative, `read()` will read until the end of
the blob.

### `write(data, /)`

Write *data* to the blob at the current offset.  This function cannot
change the blob length.  Writing beyond the end of the blob will raise
`ValueError`.

### `tell()`

Return the current access position of the blob.

### `seek(offset, origin=os.SEEK_SET, /)`

Set the current access position of the blob to *offset*.  The *origin*
argument defaults to `os.SEEK_SET` (absolute blob positioning).
Other values for *origin* are `os.SEEK_CUR` (seek relative to the
current position) and `os.SEEK_END` (seek relative to the blob’s
end).

### class `PrepareProtocol`

The PrepareProtocol type's single purpose is to act as a PEP 246 style
adaption protocol for objects that can :ref:`adapt themselves
<sqlite3-conform>` to native SQLite types.

### Exceptions

The exception hierarchy is defined by the DB-API 2.0 (PEP 249).
