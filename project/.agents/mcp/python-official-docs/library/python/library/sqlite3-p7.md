---
title: "sqlite3 --- DB-API 2.0 interface for SQLite databases (part 7 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/sqlite3.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# sqlite3 --- DB-API 2.0 interface for SQLite databases (part 7 of 7)

### How to handle non-UTF-8 text encodings

By default, `sqlite3` uses `str` to adapt SQLite values
with the `TEXT` data type.
This works well for UTF-8 encoded text, but it might fail for other encodings
and invalid UTF-8.
You can use a custom `text_factory` to handle such cases.

Because of SQLite's flexible typing, it is not uncommon to encounter table
columns with the `TEXT` data type containing non-UTF-8 encodings,
or even arbitrary data.
To demonstrate, let's assume we have a database with ISO-8859-2 (Latin-2)
encoded text, for example a table of Czech-English dictionary entries.
Assuming we now have a `Connection` instance `con`
connected to this database,
we can decode the Latin-2 encoded text using this `text_factory`:

```python

con.text_factory = lambda data: str(data, encoding="latin2")
```

For invalid UTF-8 or arbitrary data in stored in `TEXT` table columns,
you can use the following technique, borrowed from the unicode-howto:

```python

con.text_factory = lambda data: str(data, errors="surrogateescape")
```

> **Note:** The `sqlite3` module API does not support strings
> containing surrogates.

> **See also:** unicode-howto

## Explanation

### Transaction control

`sqlite3` offers multiple methods of controlling whether,
when and how database transactions are opened and closed.
sqlite3-transaction-control-autocommit is recommended,
while sqlite3-transaction-control-isolation-level
retains the pre-Python 3.12 behaviour.

#### Transaction control via the `autocommit` attribute

The recommended way of controlling transaction behaviour is through
the `Connection.autocommit` attribute,
which should preferably be set using the *autocommit* parameter
of `connect()`.

It is suggested to set *autocommit* to `False`,
which implies PEP 249-compliant transaction control.
This means:

- `sqlite3` ensures that a transaction is always open,
so `connect()`, `Connection.commit()`, and `Connection.rollback()`
will implicitly open a new transaction
(immediately after closing the pending one, for the latter two).
`sqlite3` uses `BEGIN DEFERRED` statements when opening transactions.
- Transactions should be committed explicitly using `commit()`.
- Transactions should be rolled back explicitly using `rollback()`.
- An implicit rollback is performed if the database is
`close()`-ed with pending changes.

Set *autocommit* to `True` to enable SQLite's autocommit mode.
In this mode, `Connection.commit()` and `Connection.rollback()`
have no effect.
Note that SQLite's autocommit mode is distinct from
the PEP 249-compliant `Connection.autocommit` attribute;
use `Connection.in_transaction` to query
the low-level SQLite autocommit mode.

Set *autocommit* to `LEGACY_TRANSACTION_CONTROL`
to leave transaction control behaviour to the
`Connection.isolation_level` attribute.
See sqlite3-transaction-control-isolation-level for more information.

#### Transaction control via the `isolation_level` attribute

> **Note:** The recommended way of controlling transactions is via the
> `autocommit` attribute.
> See sqlite3-transaction-control-autocommit.

If `Connection.autocommit` is set to
`LEGACY_TRANSACTION_CONTROL` (the default),
transaction behaviour is controlled using
the `Connection.isolation_level` attribute.
Otherwise, `isolation_level` has no effect.

If the connection attribute `isolation_level`
is not `None`,
new transactions are implicitly opened before
`execute()` and `executemany()` executes
`INSERT`, `UPDATE`, `DELETE`, or `REPLACE` statements;
for other statements, no implicit transaction handling is performed.
Use the `commit()` and `rollback()` methods
to respectively commit and roll back pending transactions.
You can choose the underlying SQLite transaction behaviour —
that is, whether and what type of `BEGIN` statements `sqlite3`
implicitly executes –
via the `isolation_level` attribute.

If `isolation_level` is set to `None`,
no transactions are implicitly opened at all.
This leaves the underlying SQLite library in autocommit mode,
but also allows the user to perform their own transaction handling
using explicit SQL statements.
The underlying SQLite library autocommit mode can be queried using the
`in_transaction` attribute.

The `executescript()` method implicitly commits
any pending transaction before execution of the given SQL script,
regardless of the value of `isolation_level`.

> *Changed in version 3.6.*
> `sqlite3` used to implicitly commit an open transaction before DDL
> statements.  This is no longer the case.

> *Changed in version 3.12.*
> The recommended way of controlling transactions is now via the
> `autocommit` attribute.
