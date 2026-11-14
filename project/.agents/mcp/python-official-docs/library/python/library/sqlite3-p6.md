---
title: "sqlite3 --- DB-API 2.0 interface for SQLite databases (part 6 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/sqlite3.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# sqlite3 --- DB-API 2.0 interface for SQLite databases (part 6 of 7)

## How-to guides

### How to use placeholders to bind values in SQL queries

SQL operations usually need to use values from Python variables. However,
beware of using Python's string operations to assemble queries, as they
are vulnerable to SQL injection attacks. For example, an attacker can simply
close the single quote and inject `OR TRUE` to select all rows:

```
>>> # Never do this -- insecure!
>>> symbol = input()
' OR TRUE; --
>>> sql = "SELECT * FROM stocks WHERE symbol = '%s'" % symbol
>>> print(sql)
SELECT * FROM stocks WHERE symbol = '' OR TRUE; --'
>>> cur.execute(sql)
```

Instead, use the DB-API's parameter substitution. To insert a variable into a
query string, use a placeholder in the string, and substitute the actual values
into the query by providing them as a `tuple` of values to the second
argument of the cursor's `execute()` method.

An SQL statement may use one of two kinds of placeholders:
question marks (qmark style) or named placeholders (named style).
For the qmark style, *parameters* must be a
sequence whose length must match the number of placeholders,
or a `ProgrammingError` is raised.
For the named style, *parameters* must be
an instance of a `dict` (or a subclass),
which must contain keys for all named parameters;
any extra items are ignored.
Here's an example of both styles:

```python

con = sqlite3.connect(":memory:")
cur = con.execute("CREATE TABLE lang(name, first_appeared)")

# This is the named style used with executemany():
data = (
    {"name": "C", "year": 1972},
    {"name": "Fortran", "year": 1957},
    {"name": "Python", "year": 1991},
    {"name": "Go", "year": 2009},
)
cur.executemany("INSERT INTO lang VALUES(:name, :year)", data)

# This is the qmark style used in a SELECT query:
params = (1972,)
cur.execute("SELECT * FROM lang WHERE first_appeared = ?", params)
print(cur.fetchall())
con.close()
```

```python

[('C', 1972)]
```

> **Note:** PEP 249 numeric placeholders are *not* supported.
> If used, they will be interpreted as named placeholders.

### How to adapt custom Python types to SQLite values

SQLite supports only a limited set of data types natively.
To store custom Python types in SQLite databases, *adapt* them to one of the
Python types SQLite natively understands.

There are two ways to adapt Python objects to SQLite types:
letting your object adapt itself, or using an *adapter callable*.
The latter will take precedence above the former.
For a library that exports a custom type,
it may make sense to enable that type to adapt itself.
As an application developer, it may make more sense to take direct control by
registering custom adapter functions.

#### How to write adaptable objects

Suppose we have a `Point` class that represents a pair of coordinates,
`x` and `y`, in a Cartesian coordinate system.
The coordinate pair will be stored as a text string in the database,
using a semicolon to separate the coordinates.
This can be implemented by adding a `__conform__(self, protocol)`
method which returns the adapted value.
The object passed to *protocol* will be of type `PrepareProtocol`.

```python

class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __conform__(self, protocol):
        if protocol is sqlite3.PrepareProtocol:
            return f"{self.x};{self.y}"

con = sqlite3.connect(":memory:")
cur = con.cursor()

cur.execute("SELECT ?", (Point(4.0, -3.2),))
print(cur.fetchone()[0])
con.close()
```

```python

4.0;-3.2
```

#### How to register adapter callables

The other possibility is to create a function that converts the Python object
to an SQLite-compatible type.
This function can then be registered using `register_adapter()`.

```python

class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

def adapt_point(point):
    return f"{point.x};{point.y}"

sqlite3.register_adapter(Point, adapt_point)

con = sqlite3.connect(":memory:")
cur = con.cursor()

cur.execute("SELECT ?", (Point(1.0, 2.5),))
print(cur.fetchone()[0])
con.close()
```

```python

1.0;2.5
```

### How to convert SQLite values to custom Python types

Writing an adapter lets you convert *from* custom Python types *to* SQLite
values.
To be able to convert *from* SQLite values *to* custom Python types,
we use *converters*.

Let's go back to the `Point` class. We stored the x and y coordinates
separated via semicolons as strings in SQLite.

First, we'll define a converter function that accepts the string as a parameter
and constructs a `Point` object from it.

> **Note:** Converter functions are **always** passed a `bytes` object,
> no matter the underlying SQLite data type.

```python

def convert_point(s):
    x, y = map(float, s.split(b";"))
    return Point(x, y)
```

We now need to tell `sqlite3` when it should convert a given SQLite value.
This is done when connecting to a database, using the *detect_types* parameter
of `connect()`. There are three options:

- Implicit: set *detect_types* to `PARSE_DECLTYPES`
- Explicit: set *detect_types* to `PARSE_COLNAMES`
- Both: set *detect_types* to
`sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES`.
Column names take precedence over declared types.

The following example illustrates the implicit and explicit approaches:

```python

class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

def adapt_point(point):
    return f"{point.x};{point.y}"

def convert_point(s):
    x, y = list(map(float, s.split(b";")))
    return Point(x, y)

# Register the adapter and converter
sqlite3.register_adapter(Point, adapt_point)
sqlite3.register_converter("point", convert_point)

# 1) Parse using declared types
p = Point(4.0, -3.2)
con = sqlite3.connect(":memory:", detect_types=sqlite3.PARSE_DECLTYPES)
cur = con.execute("CREATE TABLE test(p point)")

cur.execute("INSERT INTO test(p) VALUES(?)", (p,))
cur.execute("SELECT p FROM test")
print("with declared types:", cur.fetchone()[0])
cur.close()
con.close()

# 2) Parse using column names
con = sqlite3.connect(":memory:", detect_types=sqlite3.PARSE_COLNAMES)
cur = con.execute("CREATE TABLE test(p)")

cur.execute("INSERT INTO test(p) VALUES(?)", (p,))
cur.execute('SELECT p AS "p [point]" FROM test')
print("with column names:", cur.fetchone()[0])
cur.close()
con.close()
```

```python

with declared types: Point(4.0, -3.2)
with column names: Point(4.0, -3.2)
```

### Adapter and converter recipes

This section shows recipes for common adapters and converters.

```python

import datetime as dt
import sqlite3

def adapt_date_iso(val):
    """Adapt datetime.date to ISO 8601 date."""
    return val.isoformat()

def adapt_datetime_iso(val):
    """Adapt datetime.datetime to timezone-naive ISO 8601 date."""
    return val.replace(tzinfo=None).isoformat()

def adapt_datetime_epoch(val):
    """Adapt datetime.datetime to Unix timestamp."""
    return int(val.timestamp())

sqlite3.register_adapter(dt.date, adapt_date_iso)
sqlite3.register_adapter(dt.datetime, adapt_datetime_iso)
sqlite3.register_adapter(dt.datetime, adapt_datetime_epoch)

def convert_date(val):
    """Convert ISO 8601 date to datetime.date object."""
    return dt.date.fromisoformat(val.decode())

def convert_datetime(val):
    """Convert ISO 8601 datetime to datetime.datetime object."""
    return dt.datetime.fromisoformat(val.decode())

def convert_timestamp(val):
    """Convert Unix epoch timestamp to datetime.datetime object."""
    return dt.datetime.fromtimestamp(int(val))

sqlite3.register_converter("date", convert_date)
sqlite3.register_converter("datetime", convert_datetime)
sqlite3.register_converter("timestamp", convert_timestamp)
```

```python

when = dt.datetime(2019, 5, 18, 15, 17, 8, 123456)

assert adapt_date_iso(when.date()) == "2019-05-18"
assert convert_date(b"2019-05-18") == when.date()

assert adapt_datetime_iso(when) == "2019-05-18T15:17:08.123456"
assert convert_datetime(b"2019-05-18T15:17:08.123456") == when

# Using current time as fromtimestamp() returns local date/time.
# Dropping microseconds as adapt_datetime_epoch truncates fractional second part.
now = dt.datetime.now().replace(microsecond=0)
current_timestamp = int(now.timestamp())

assert adapt_datetime_epoch(now) == current_timestamp
assert convert_timestamp(str(current_timestamp).encode()) == now
```

### How to use connection shortcut methods

Using the `execute()`,
`executemany()`, and `executescript()`
methods of the `Connection` class, your code can
be written more concisely because you don't have to create the (often
superfluous) `Cursor` objects explicitly. Instead, the `Cursor`
objects are created implicitly and these shortcut methods return the cursor
objects. This way, you can execute a `SELECT` statement and iterate over it
directly using only a single call on the `Connection` object.

```python

# Create and fill the table.
con = sqlite3.connect(":memory:")
con.execute("CREATE TABLE lang(name, first_appeared)")
data = [
    ("C++", 1985),
    ("Objective-C", 1984),
]
con.executemany("INSERT INTO lang(name, first_appeared) VALUES(?, ?)", data)

# Print the table contents
for row in con.execute("SELECT name, first_appeared FROM lang"):
    print(row)

print("I just deleted", con.execute("DELETE FROM lang").rowcount, "rows")

# close() is not a shortcut method and it's not called automatically;
# the connection object should be closed manually
con.close()
```

```python

('C++', 1985)
('Objective-C', 1984)
I just deleted 2 rows
```

### How to use the connection context manager

A `Connection` object can be used as a context manager that
automatically commits or rolls back open transactions when leaving the body of
the context manager.
If the body of the `with` statement finishes without exceptions,
the transaction is committed.
If this commit fails,
or if the body of the `with` statement raises an uncaught exception,
the transaction is rolled back.
If `autocommit` is `False`,
a new transaction is implicitly opened after committing or rolling back.

If there is no open transaction upon leaving the body of the `with` statement,
or if `autocommit` is `True`,
the context manager does nothing.

> **Note:** The context manager neither implicitly opens a new transaction
> nor closes the connection. If you need a closing context manager, consider
> using `contextlib.closing()`.

```python

con = sqlite3.connect(":memory:")
con.execute("CREATE TABLE lang(id INTEGER PRIMARY KEY, name VARCHAR UNIQUE)")

# Successful, con.commit() is called automatically afterwards
with con:
    con.execute("INSERT INTO lang(name) VALUES(?)", ("Python",))

# con.rollback() is called after the with block finishes with an exception,
# the exception is still raised and must be caught
try:
    with con:
        con.execute("INSERT INTO lang(name) VALUES(?)", ("Python",))
except sqlite3.IntegrityError:
    print("couldn't add Python twice")

# Connection object used as context manager only commits or rollbacks transactions,
# so the connection object should be closed manually
con.close()
```

```python

couldn't add Python twice
```

### How to work with SQLite URIs

Some useful URI tricks include:

- Open a database in read-only mode:

```python

>>> con = sqlite3.connect("file:tutorial.db?mode=ro", uri=True)
>>> con.execute("CREATE TABLE readonly(data)")
Traceback (most recent call last):
OperationalError: attempt to write a readonly database
>>> con.close()
```

- Do not implicitly create a new database file if it does not already exist;
will raise `OperationalError` if unable to create a new file:

```python

>>> con = sqlite3.connect("file:nosuchdb.db?mode=rw", uri=True)
Traceback (most recent call last):
OperationalError: unable to open database file
```

- Create a shared named in-memory database:

```python

db = "file:mem1?mode=memory&cache=shared"
con1 = sqlite3.connect(db, uri=True)
con2 = sqlite3.connect(db, uri=True)
with con1:
    con1.execute("CREATE TABLE shared(data)")
    con1.execute("INSERT INTO shared VALUES(28)")
res = con2.execute("SELECT data FROM shared")
assert res.fetchone() == (28,)

con1.close()
con2.close()
```

More information about this feature, including a list of parameters,
can be found in the SQLite URI documentation.

### How to create and use row factories

By default, `sqlite3` represents each row as a `tuple`.
If a `tuple` does not suit your needs,
you can use the `sqlite3.Row` class
or a custom `row_factory`.

While `row_factory` exists as an attribute both on the
`Cursor` and the `Connection`,
it is recommended to set `Connection.row_factory`,
so all cursors created from the connection will use the same row factory.

`Row` provides indexed and case-insensitive named access to columns,
with minimal memory overhead and performance impact over a `tuple`.
To use `Row` as a row factory,
assign it to the `row_factory` attribute:

```python

>>> con = sqlite3.connect(":memory:")
>>> con.row_factory = sqlite3.Row
```

Queries now return `Row` objects:

```python

>>> res = con.execute("SELECT 'Earth' AS name, 6378 AS radius")
>>> row = res.fetchone()
>>> row.keys()
['name', 'radius']
>>> row[0]         # Access by index.
'Earth'
>>> row["name"]    # Access by name.
'Earth'
>>> row["RADIUS"]  # Column names are case-insensitive.
6378
>>> con.close()
```

> **Note:** The `FROM` clause can be omitted in the `SELECT` statement, as in the
> above example. In such cases, SQLite returns a single row with columns
> defined by expressions, e.g. literals, with the given aliases
> `expr AS alias`.

You can create a custom `row_factory`
that returns each row as a `dict`, with column names mapped to values:

```python

def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}
```

Using it, queries now return a `dict` instead of a `tuple`:

```python

>>> con = sqlite3.connect(":memory:")
>>> con.row_factory = dict_factory
>>> for row in con.execute("SELECT 1 AS a, 2 AS b"):
...     print(row)
{'a': 1, 'b': 2}
>>> con.close()
```

The following row factory returns a named tuple:

```python

from collections import namedtuple

def namedtuple_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    cls = namedtuple("Row", fields)
    return cls._make(row)
```

`namedtuple_factory()` can be used as follows:

```python

>>> con = sqlite3.connect(":memory:")
>>> con.row_factory = namedtuple_factory
>>> cur = con.execute("SELECT 1 AS a, 2 AS b")
>>> row = cur.fetchone()
>>> row
Row(a=1, b=2)
>>> row[0]  # Indexed access.
1
>>> row.b   # Attribute access.
2
>>> con.close()
```

With some adjustments, the above recipe can be adapted to use a
`dataclass`, or any other custom class,
instead of a `namedtuple`.
