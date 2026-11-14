---
title: "dbm --- Interfaces to Unix \"databases\" (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/dbm.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# dbm --- Interfaces to Unix "databases" (part 2 of 2)

## `dbm.dumb` --- Portable DBM implementation

Module `dbm.dumb`.

**Source code:** Lib/dbm/dumb.py

> **Note:** The `dbm.dumb` module is intended as a last resort fallback for the
> `dbm` module when a more robust module is not available. The `dbm.dumb`
> module is not written for speed and is not nearly as heavily used as the other
> database modules.

The `dbm.dumb` module provides a persistent `dict`-like
interface which is written entirely in Python.
Unlike other `dbm` backends, such as `dbm.gnu`, no
external library is required.

The `dbm.dumb` module defines the following:

### exception `error`

Raised on `dbm.dumb`-specific errors, such as I/O errors.  `KeyError` is
raised for general mapping errors like specifying an incorrect key.

### `open(filename, flag="c", mode=0o666)`

Open a `dbm.dumb` database.

- **param `filename`:**
The basename of the database file (without extensions).
A new database creates the following files:

- `{filename}.dat`
- `{filename}.dir`
- **type `database`:** path-like object

- **param `str flag`:**
- `'r'`: flag_r
- `'w'`: flag_w
- `'c'` (default): flag_c
- `'n'`: flag_n

- **param `int mode`:**
mode_param_doc

> **Warning:** It is possible to crash the Python interpreter when loading a database
> with a sufficiently large/complex entry due to stack depth limitations in
> Python's AST compiler.

> **Warning:** `dbm.dumb` does not support concurrent read/write access. (Multiple
> simultaneous read accesses are safe.) When a program has the database open
> for writing, no other program should have it open for reading or writing.

> *Changed in version 3.5.*
> `open()` always creates a new database when *flag* is `'n'`.

> *Changed in version 3.8.*
> A database opened read-only if *flag* is `'r'`.
> A database is not created if it does not exist if *flag* is `'r'` or `'w'`.

> *Changed in version 3.11.*
> *filename* accepts a path-like object.

The returned database object behaves similar to a mutable mapping,
but the `keys()` and `items()` methods return lists, and
the `setdefault()` method requires two arguments.
It also supports a "closing" context manager via the `with` keyword.

The following methods are also provided:

### `dumbdbm.close()`

Close the database.

### `dumbdbm.reorganize()`

If you have carried out a lot of deletions and would like to shrink the space
used on disk, this method will reorganize the database; otherwise, deleted file
space will not be reused.

> **Note:** While reorganizing, no additional free disk space is required. However, be aware
> that this factor changes for each `dbm` submodule.

> *Added in version 3.15.*

### `dumbdbm.sync()`

Synchronize the on-disk directory and data files.  This method is called
by the `shelve.Shelf.sync()` method.
