---
title: "sqlite3 --- DB-API 2.0 interface for SQLite databases (part 1 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/sqlite3.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `sqlite3` --- DB-API 2.0 interface for SQLite databases

Module `sqlite3`.

**Source code:** Lib/sqlite3/

SQLite is a C library that provides a lightweight disk-based database that
doesn't require a separate server process and allows accessing the database
using a nonstandard variant of the SQL query language. Some applications can use
SQLite for internal data storage.  It's also possible to prototype an
application using SQLite and then port the code to a larger database such as
PostgreSQL or Oracle.

The `sqlite3` module was written by Gerhard Häring.  It provides an SQL interface
compliant with the DB-API 2.0 specification described by PEP 249, and
requires the third-party SQLite library.

This document includes four main sections:

- sqlite3-tutorial teaches how to use the `sqlite3` module.
- sqlite3-reference describes the classes and functions this module
defines.
- sqlite3-howtos details how to handle specific tasks.
- sqlite3-explanation provides in-depth background on
transaction control.

> **See also:** https://www.sqlite.org
> The SQLite web page; the documentation describes the syntax and the
> available data types for the supported SQL dialect.
>
> https://www.w3schools.com/sql/
> Tutorial, reference and examples for learning SQL syntax.
>
> PEP 249 - Database API Specification 2.0
> PEP written by Marc-André Lemburg.

## Tutorial

In this tutorial, you will create a database of Monty Python movies
using basic `sqlite3` functionality.
It assumes a fundamental understanding of database concepts,
including cursors and transactions.

First, we need to create a new database and open
a database connection to allow `sqlite3` to work with it.
Call `sqlite3.connect()` to create a connection to
the database `tutorial.db` in the current working directory,
implicitly creating it if it does not exist:

```python

import sqlite3
con = sqlite3.connect("tutorial.db")
```

The returned `Connection` object `con`
represents the connection to the on-disk database.

In order to execute SQL statements and fetch results from SQL queries,
we will need to use a database cursor.
Call `con.cursor()` to create the `Cursor`:

```python

cur = con.cursor()
```

Now that we've got a database connection and a cursor,
we can create a database table `movie` with columns for title,
release year, and review score.
For simplicity, we can just use column names in the table declaration --
thanks to the flexible typing feature of SQLite,
specifying the data types is optional.
Execute the `CREATE TABLE` statement
by calling `cur.execute(...)`:

```python

cur.execute("CREATE TABLE movie(title, year, score)")
```

We can verify that the new table has been created by querying
the `sqlite_master` table built-in to SQLite,
which should now contain an entry for the `movie` table definition
(see The Schema Table for details).
Execute that query by calling `cur.execute(...)`,
assign the result to `res`,
and call `res.fetchone()` to fetch the resulting row:

```python

>>> res = cur.execute("SELECT name FROM sqlite_master")
>>> res.fetchone()
('movie',)
```

We can see that the table has been created,
as the query returns a `tuple` containing the table's name.
If we query `sqlite_master` for a non-existent table `spam`,
`res.fetchone()` will return `None`:

```python

>>> res = cur.execute("SELECT name FROM sqlite_master WHERE name='spam'")
>>> res.fetchone() is None
True
```

Now, add two rows of data supplied as SQL literals
by executing an `INSERT` statement,
once again by calling `cur.execute(...)`:

```python

cur.execute("""
    INSERT INTO movie VALUES
        ('Monty Python and the Holy Grail', 1975, 8.2),
        ('And Now for Something Completely Different', 1971, 7.5)
""")
```

The `INSERT` statement implicitly opens a transaction,
which needs to be committed before changes are saved in the database
(see sqlite3-controlling-transactions for details).
Call `con.commit()` on the connection object
to commit the transaction:

```python

con.commit()
```

We can verify that the data was inserted correctly
by executing a `SELECT` query.
Use the now-familiar `cur.execute(...)` to
assign the result to `res`,
and call `res.fetchall()` to return all resulting rows:

```python

>>> res = cur.execute("SELECT score FROM movie")
>>> res.fetchall()
[(8.2,), (7.5,)]
```

The result is a `list` of two `tuple`\s, one per row,
each containing that row's `score` value.

Now, insert three more rows by calling
`cur.executemany(...)`:

```python

data = [
    ("Monty Python Live at the Hollywood Bowl", 1982, 7.9),
    ("Monty Python's The Meaning of Life", 1983, 7.5),
    ("Monty Python's Life of Brian", 1979, 8.0),
]
cur.executemany("INSERT INTO movie VALUES(?, ?, ?)", data)
con.commit()  # Remember to commit the transaction after executing INSERT.
```

Notice that `?` placeholders are used to bind `data` to the query.
Always use placeholders instead of string formatting
to bind Python values to SQL statements,
to avoid SQL injection attacks
(see sqlite3-placeholders for more details).

We can verify that the new rows were inserted
by executing a `SELECT` query,
this time iterating over the results of the query:

```python

>>> for row in cur.execute("SELECT year, title FROM movie ORDER BY year"):
...     print(row)
(1971, 'And Now for Something Completely Different')
(1975, 'Monty Python and the Holy Grail')
(1979, "Monty Python's Life of Brian")
(1982, 'Monty Python Live at the Hollywood Bowl')
(1983, "Monty Python's The Meaning of Life")
```

Each row is a two-item `tuple` of `(year, title)`,
matching the columns selected in the query.

Finally, verify that the database has been written to disk
by calling `con.close()`
to close the existing connection, opening a new one,
creating a new cursor, then querying the database:

```python

>>> con.close()
>>> new_con = sqlite3.connect("tutorial.db")
>>> new_cur = new_con.cursor()
>>> res = new_cur.execute("SELECT title, year FROM movie ORDER BY score DESC")
>>> title, year = res.fetchone()
>>> print(f'The highest scoring Monty Python movie is {title!r}, released in {year}')
The highest scoring Monty Python movie is 'Monty Python and the Holy Grail', released in 1975
>>> new_con.close()
```

You've now created an SQLite database using the `sqlite3` module,
inserted data and retrieved values from it in multiple ways.

> **See also:** - sqlite3-howtos for further reading:
>
> - sqlite3-placeholders
> - sqlite3-adapters
> - sqlite3-converters
> - sqlite3-connection-context-manager
> - sqlite3-howto-row-factory
>
> - sqlite3-explanation for in-depth background on transaction control.
