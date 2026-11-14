---
title: "sqlite3 --- DB-API 2.0 interface for SQLite databases (part 5 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/sqlite3.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# sqlite3 --- DB-API 2.0 interface for SQLite databases (part 5 of 7)

### exception `Warning`

This exception is not currently raised by the `sqlite3` module,
but may be raised by applications using `sqlite3`,
for example if a user-defined function truncates data while inserting.
`Warning` is a subclass of `Exception`.

### exception `Error`

The base class of the other exceptions in this module.
Use this to catch all errors with one single `except` statement.
`Error` is a subclass of `Exception`.

If the exception originated from within the SQLite library,
the following two attributes are added to the exception:

### `sqlite_errorcode`

The numeric error code from the
SQLite API

> *Added in version 3.11.*

### `sqlite_errorname`

The symbolic name of the numeric error code
from the SQLite API

> *Added in version 3.11.*

### exception `InterfaceError`

Exception raised for misuse of the low-level SQLite C API.
In other words, if this exception is raised, it probably indicates a bug in the
`sqlite3` module.
`InterfaceError` is a subclass of `Error`.

### exception `DatabaseError`

Exception raised for errors that are related to the database.
This serves as the base exception for several types of database errors.
It is only raised implicitly through the specialised subclasses.
`DatabaseError` is a subclass of `Error`.

### exception `DataError`

Exception raised for errors caused by problems with the processed data,
like numeric values out of range, and strings which are too long.
`DataError` is a subclass of `DatabaseError`.

### exception `OperationalError`

Exception raised for errors that are related to the database's operation,
and not necessarily under the control of the programmer.
For example, the database path is not found,
or a transaction could not be processed.
`OperationalError` is a subclass of `DatabaseError`.

### exception `IntegrityError`

Exception raised when the relational integrity of the database is affected,
e.g. a foreign key check fails.  It is a subclass of `DatabaseError`.

### exception `InternalError`

Exception raised when SQLite encounters an internal error.
If this is raised, it may indicate that there is a problem with the runtime
SQLite library.
`InternalError` is a subclass of `DatabaseError`.

### exception `ProgrammingError`

Exception raised for `sqlite3` API programming errors,
for example supplying the wrong number of bindings to a query,
or trying to operate on a closed `Connection`.
`ProgrammingError` is a subclass of `DatabaseError`.

### exception `NotSupportedError`

Exception raised in case a method or database API is not supported by the
underlying SQLite library. For example, setting *deterministic* to
`True` in `create_function()`, if the underlying SQLite library
does not support deterministic functions.
`NotSupportedError` is a subclass of `DatabaseError`.

### SQLite and Python types

SQLite natively supports the following types: `NULL`, `INTEGER`,
`REAL`, `TEXT`, `BLOB`.

The following Python types can thus be sent to SQLite without any problem:

```text
+-------------------------------+-------------+
| Python type                   | SQLite type |
+===============================+=============+
| ``None``                      | ``NULL``    |
+-------------------------------+-------------+
| :class:`int`                  | ``INTEGER`` |
+-------------------------------+-------------+
| :class:`float`                | ``REAL``    |
+-------------------------------+-------------+
| :class:`str`                  | ``TEXT``    |
+-------------------------------+-------------+
| :class:`bytes`                | ``BLOB``    |
+-------------------------------+-------------+
```

This is how SQLite types are converted to Python types by default:

```text
+-------------+----------------------------------------------+
| SQLite type | Python type                                  |
+=============+==============================================+
| ``NULL``    | ``None``                                     |
+-------------+----------------------------------------------+
| ``INTEGER`` | :class:`int`                                 |
+-------------+----------------------------------------------+
| ``REAL``    | :class:`float`                               |
+-------------+----------------------------------------------+
| ``TEXT``    | depends on :attr:`~Connection.text_factory`, |
|             | :class:`str` by default                      |
+-------------+----------------------------------------------+
| ``BLOB``    | :class:`bytes`                               |
+-------------+----------------------------------------------+
```

The type system of the `sqlite3` module is extensible in two ways: you can
store additional Python types in an SQLite database via
object adapters,
and you can let the `sqlite3` module convert SQLite types to
Python types via converters.

### Default adapters and converters (deprecated)

> **Note:** The default adapters and converters are deprecated as of Python 3.12.
> Instead, use the sqlite3-adapter-converter-recipes
> and tailor them to your needs.

The deprecated default adapters and converters consist of:

- An adapter for `datetime.date` objects to `strings` in
ISO 8601 format.
- An adapter for `datetime.datetime` objects to strings in
ISO 8601 format.
- A converter for declared "date" types to
`datetime.date` objects.
- A converter for declared "timestamp" types to
`datetime.datetime` objects.
Fractional parts will be truncated to 6 digits (microsecond precision).

> **Note:** The default "timestamp" converter ignores UTC offsets in the database and
> always returns a naive `datetime.datetime` object. To preserve UTC
> offsets in timestamps, either leave converters disabled, or register an
> offset-aware converter with `register_converter()`.

> *Deprecated since version 3.12.*

### Command-line interface

The `sqlite3` module can be invoked as a script,
using the interpreter's `-m` switch,
in order to provide a simple SQLite shell.
The argument signature is as follows:

```
python -m sqlite3 [-h] [-v] [filename] [sql]
```

Type `.quit` or CTRL-D to exit the shell.

python -m sqlite3 [-h] [-v] [filename] [sql]

### option `-h, --help`

Print CLI help.

### option `-v, --version`

Print underlying SQLite library version.

> *Added in version 3.12.*
