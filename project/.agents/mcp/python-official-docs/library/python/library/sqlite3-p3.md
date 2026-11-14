---
title: "sqlite3 --- DB-API 2.0 interface for SQLite databases (part 3 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/sqlite3.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# sqlite3 --- DB-API 2.0 interface for SQLite databases (part 3 of 7)

### `create_function(name, narg, func, /, *, deterministic=False)`

Create or remove a user-defined SQL function.

- **param `str name`:**
The name of the SQL function.

- **param `int narg`:**
The number of arguments the SQL function can accept.
If `-1`, it may take any number of arguments.

- **param `func`:**
A callable that is called when the SQL function is invoked.
The callable must return :ref:`a type natively supported by SQLite
<sqlite3-types>`.
Set to `None` to remove an existing SQL function.
- **type `func`:** callback | None

- **param `bool deterministic`:**
If `True`, the created SQL function is marked as
deterministic,
which allows SQLite to perform additional optimizations.

> *Changed in version 3.8.*
> Added the *deterministic* parameter.

> *Changed in version 3.15.*
> The first three parameters are now positional-only.

Example:

```python

>>> import hashlib
>>> def md5sum(t):
...     return hashlib.md5(t).hexdigest()
>>> con = sqlite3.connect(":memory:")
>>> con.create_function("md5", 1, md5sum)
>>> for row in con.execute("SELECT md5(?)", (b"foo",)):
...     print(row)
('acbd18db4cc2f85cedef654fccc4a4d8',)
>>> con.close()
```

### `create_aggregate(name, n_arg, aggregate_class, /)`

Create or remove a user-defined SQL aggregate function.

- **param `str name`:**
The name of the SQL aggregate function.

- **param `int n_arg`:**
The number of arguments the SQL aggregate function can accept.
If `-1`, it may take any number of arguments.

- **param `aggregate_class`:**
A class must implement the following methods:

- `step()`: Add a row to the aggregate.
- `finalize()`: Return the final result of the aggregate as
a type natively supported by SQLite.

The number of arguments that the `step()` method must accept
is controlled by *n_arg*.

Set to `None` to remove an existing SQL aggregate function.
- **type `aggregate_class`:** class | None

> *Changed in version 3.15.*
> All three parameters are now positional-only.

Example:

```python

class MySum:
    def __init__(self):
        self.count = 0

    def step(self, value):
        self.count += value

    def finalize(self):
        return self.count

con = sqlite3.connect(":memory:")
con.create_aggregate("mysum", 1, MySum)
cur = con.execute("CREATE TABLE test(i)")
cur.execute("INSERT INTO test(i) VALUES(1)")
cur.execute("INSERT INTO test(i) VALUES(2)")
cur.execute("SELECT mysum(i) FROM test")
print(cur.fetchone()[0])

con.close()
```

```python

3
```

### `create_window_function(name, num_params, aggregate_class, /)`

Create or remove a user-defined aggregate window function.

- **param `str name`:**
The name of the SQL aggregate window function to create or remove.

- **param `int num_params`:**
The number of arguments the SQL aggregate window function can accept.
If `-1`, it may take any number of arguments.

- **param `aggregate_class`:**
A class that must implement the following methods:

- `step()`: Add a row to the current window.
- `value()`: Return the current value of the aggregate.
- `inverse()`: Remove a row from the current window.
- `finalize()`: Return the final result of the aggregate as
a type natively supported by SQLite.

The number of arguments that the `step()` and `value()` methods
must accept is controlled by *num_params*.

Set to `None` to remove an existing SQL aggregate window function.

- **raises `NotSupportedError`:**
If used with a version of SQLite older than 3.25.0,
which does not support aggregate window functions.

- **type `aggregate_class`:** class | None

> *Added in version 3.11.*

Example:

```python

# Example taken from https://www.sqlite.org/windowfunctions.html#udfwinfunc
class WindowSumInt:
    def __init__(self):
        self.count = 0

    def step(self, value):
        """Add a row to the current window."""
        self.count += value

    def value(self):
        """Return the current value of the aggregate."""
        return self.count

    def inverse(self, value):
        """Remove a row from the current window."""
        self.count -= value

    def finalize(self):
        """Return the final value of the aggregate.

        Any clean-up actions should be placed here.
        """
        return self.count

con = sqlite3.connect(":memory:")
cur = con.execute("CREATE TABLE test(x, y)")
values = [
    ("a", 4),
    ("b", 5),
    ("c", 3),
    ("d", 8),
    ("e", 1),
]
cur.executemany("INSERT INTO test VALUES(?, ?)", values)
con.create_window_function("sumint", 1, WindowSumInt)
cur.execute("""
    SELECT x, sumint(y) OVER (
        ORDER BY x ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    ) AS sum_y
    FROM test ORDER BY x
""")
print(cur.fetchall())
con.close()
```

```python

[('a', 9), ('b', 12), ('c', 16), ('d', 12), ('e', 9)]
```

### `create_collation(name, callable, /)`

Create a collation named *name* using the collating function *callable*.
*callable* is passed two `string` arguments,
and it should return an `integer`:

- `1` if the first is ordered higher than the second
- `-1` if the first is ordered lower than the second
- `0` if they are ordered equal

The following example shows a reverse sorting collation:

```python

def collate_reverse(string1, string2):
    if string1 == string2:
        return 0
    elif string1 < string2:
        return 1
    else:
        return -1

con = sqlite3.connect(":memory:")
con.create_collation("reverse", collate_reverse)

cur = con.execute("CREATE TABLE test(x)")
cur.executemany("INSERT INTO test(x) VALUES(?)", [("a",), ("b",)])
cur.execute("SELECT x FROM test ORDER BY x COLLATE reverse")
for row in cur:
    print(row)
con.close()
```

```python

('b',)
('a',)
```

Remove a collation function by setting *callable* to `None`.

> *Changed in version 3.11.*
> The collation name can contain any Unicode character.  Earlier, only
> ASCII characters were allowed.

### `interrupt()`

Call this method from a different thread to abort any queries that might
be executing on the connection.
Aborted queries will raise an `OperationalError`.

### `set_authorizer(authorizer_callback, /)`

Register callable *authorizer_callback* to be invoked
for each attempt to access a column of a table in the database.
The callback should return one of `SQLITE_OK`,
`SQLITE_DENY`, or `SQLITE_IGNORE`
to signal how access to the column should be handled
by the underlying SQLite library.

The first argument to the callback signifies what kind of operation is to be
authorized. The second and third argument will be arguments or `None`
depending on the first argument. The 4th argument is the name of the database
("main", "temp", etc.) if applicable. The 5th argument is the name of the
inner-most trigger or view that is responsible for the access attempt or
`None` if this access attempt is directly from input SQL code.

Please consult the SQLite documentation about the possible values for the first
argument and the meaning of the second and third argument depending on the first
one. All necessary constants are available in the `sqlite3` module.

Passing `None` as *authorizer_callback* will disable the authorizer.

> *Changed in version 3.11.*
> Added support for disabling the authorizer using `None`.

> *Changed in version 3.15.*
> The only parameter is now positional-only.

### `set_progress_handler(progress_handler, /, n)`

Register callable *progress_handler* to be invoked for every *n*
instructions of the SQLite virtual machine. This is useful if you want to
get called from SQLite during long-running operations, for example to update
a GUI.

If you want to clear any previously installed progress handler, call the
method with `None` for *progress_handler*.

Returning a non-zero value from the handler function will terminate the
currently executing query and cause it to raise a `DatabaseError`
exception.

> *Changed in version 3.15.*
> The first parameter is now positional-only.

### `set_trace_callback(trace_callback, /)`

Register callable *trace_callback* to be invoked
for each SQL statement that is actually executed by the SQLite backend.

The only argument passed to the callback is the statement (as
`str`) that is being executed. The return value of the callback is
ignored. Note that the backend does not only run statements passed to the
`Cursor.execute()` methods.  Other sources include the
transaction management of the
`sqlite3` module and the execution of triggers defined in the current
database.

Passing `None` as *trace_callback* will disable the trace callback.

> **Note:** Exceptions raised in the trace callback are not propagated. As a
> development and debugging aid, use
> `enable_callback_tracebacks()` to enable printing
> tracebacks from exceptions raised in the trace callback.

> *Added in version 3.3.*

> *Changed in version 3.15.*
> The first parameter is now positional-only.

### `enable_load_extension(enabled, /)`

Enable the SQLite engine to load SQLite extensions from shared libraries
if *enabled* is `True`;
else, disallow loading SQLite extensions.
SQLite extensions can define new functions,
aggregates or whole new virtual table implementations.  One well-known
extension is the fulltext-search extension distributed with SQLite.

> **Note:** The `sqlite3` module is not built with loadable extension support by
> default, because some platforms (notably macOS) have SQLite
> libraries which are compiled without this feature.
> To get loadable extension support,
> you must pass the `--enable-loadable-sqlite-extensions` option
> to `configure`.

> *Added in version 3.2.*

> *Changed in version 3.10.*
> Added the `sqlite3.enable_load_extension` auditing event.

```
con.enable_load_extension(True)

# Load the fulltext search extension
con.execute("select load_extension('./fts3.so')")

# alternatively you can load the extension using an API call:
# con.load_extension("./fts3.so")

# disable extension loading again
con.enable_load_extension(False)

# example from SQLite wiki
con.execute("CREATE VIRTUAL TABLE recipe USING fts3(name, ingredients)")
con.executescript("""
    INSERT INTO recipe (name, ingredients) VALUES('broccoli stew', 'broccoli peppers cheese tomatoes');
    INSERT INTO recipe (name, ingredients) VALUES('pumpkin stew', 'pumpkin onions garlic celery');
    INSERT INTO recipe (name, ingredients) VALUES('broccoli pie', 'broccoli cheese onions flour');
    INSERT INTO recipe (name, ingredients) VALUES('pumpkin pie', 'pumpkin sugar flour butter');
    """)
for row in con.execute("SELECT rowid, name, ingredients FROM recipe WHERE name MATCH 'pie'"):
    print(row)
```

### `load_extension(path, /, *, entrypoint=None)`

Load an SQLite extension from a shared library.
Enable extension loading with `enable_load_extension()` before
calling this method.

- **param `str path`:**

The path to the SQLite extension.

- **param `entrypoint`:**

Entry point name.
If `None` (the default),
SQLite will come up with an entry point name of its own;
see the SQLite docs Loading an Extension for details.

- **type `entrypoint`:** str | None

> *Added in version 3.2.*

> *Changed in version 3.10.*
> Added the `sqlite3.load_extension` auditing event.

> *Changed in version 3.12.*
> Added the *entrypoint* parameter.

### `iterdump(*, filter=None)`

Return an iterator to dump the database as SQL source code.
Useful when saving an in-memory database for later restoration.
Similar to the `.dump` command in the `sqlite3` shell.

- **param `filter`:**

An optional `LIKE` pattern for database objects to dump, e.g. `prefix_%`.
If `None` (the default), all database objects will be included.

- **type `filter`:** str | None

Example:

```python

# Convert file example.db to SQL dump file dump.sql
con = sqlite3.connect('example.db')
with open('dump.sql', 'w') as f:
    for line in con.iterdump():
        f.write('%s\n' % line)
con.close()
```

> **See also:** sqlite3-howto-encoding

> *Changed in version 3.13.*
> Added the *filter* parameter.

### `backup(target, *, pages=-1, progress=None, name="main", sleep=0.250)`

Create a backup of an SQLite database.

Works even if the database is being accessed by other clients
or concurrently by the same connection.

- **param `~sqlite3.Connection target`:**
The database connection to save the backup to.

- **param `int pages`:**
The number of pages to copy at a time.
If equal to or less than `0`,
the entire database is copied in a single step.
Defaults to `-1`.

- **param `progress`:**
If set to a callable,
it is invoked with three integer arguments for every backup iteration:
the *status* of the last iteration,
the *remaining* number of pages still to be copied,
and the *total* number of pages.
Defaults to `None`.
- **type `progress`:** callback | None

- **param `str name`:**
The name of the database to back up.
Either `"main"` (the default) for the main database,
`"temp"` for the temporary database,
or the name of a custom database as attached using the
`ATTACH DATABASE` SQL statement.

- **param `float sleep`:**
The number of seconds to sleep between successive attempts
to back up remaining pages.

Example 1, copy an existing database into another:

```python

def progress(status, remaining, total):
    print(f'Copied {total-remaining} of {total} pages...')

src = sqlite3.connect('example.db')
dst = sqlite3.connect('backup.db')
with dst:
    src.backup(dst, pages=1, progress=progress)
dst.close()
src.close()
```

```python

Copied 0 of 0 pages...
```

Example 2, copy an existing database into a transient copy:

```python

src = sqlite3.connect('example.db')
dst = sqlite3.connect(':memory:')
src.backup(dst)
dst.close()
src.close()
```

> *Added in version 3.7.*

> **See also:** sqlite3-howto-encoding

### `getlimit(category, /)`

Get a connection runtime limit.

- **param `int category`:**
The SQLite limit category to be queried.

- **rtype:** int

- **raises `ProgrammingError`:**
If *category* is not recognised by the underlying SQLite library.

Example, query the maximum length of an SQL statement
for `Connection` `con` (the default is 1000000000):

```python
sqlite3.limits

>>> con.getlimit(sqlite3.SQLITE_LIMIT_SQL_LENGTH)
1000000000
```

> *Added in version 3.11.*

### `setlimit(category, limit, /)`

Set a connection runtime limit.
Attempts to increase a limit above its hard upper bound are silently
truncated to the hard upper bound. Regardless of whether or not the limit
was changed, the prior value of the limit is returned.

- **param `int category`:**
The SQLite limit category to be set.

- **param `int limit`:**
The value of the new limit.
If negative, the current limit is unchanged.

- **rtype:** int

- **raises `ProgrammingError`:**
If *category* is not recognised by the underlying SQLite library.

Example, limit the number of attached databases to 1
for `Connection` `con` (the default limit is 10):

```python
sqlite3.limits

>>> con.setlimit(sqlite3.SQLITE_LIMIT_ATTACHED, 1)
10
>>> con.getlimit(sqlite3.SQLITE_LIMIT_ATTACHED)
1
```

> *Added in version 3.11.*
