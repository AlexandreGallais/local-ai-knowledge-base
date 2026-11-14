---
title: "Debugging C API extensions and CPython Internals with GDB (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/gdb_helpers.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Debugging C API extensions and CPython Internals with GDB

This document explains how the Python GDB extension, `python-gdb.py`, can
be used with the GDB debugger to debug CPython extensions and the
CPython interpreter itself.

When debugging low-level problems such as crashes or deadlocks, a low-level
debugger, such as GDB, is useful to diagnose and correct the issue.
By default, GDB (or any of its front-ends) doesn't support high-level
information specific to the CPython interpreter.

The `python-gdb.py` extension adds CPython interpreter information to GDB.
The extension helps introspect the stack of currently executing Python functions.
Given a Python object represented by a `PyObject *` pointer,
the extension surfaces the type and value of the object.

Developers who are working on CPython extensions or tinkering with parts
of CPython that are written in C can use this document to learn how to use the
`python-gdb.py` extension with GDB.

> **Note:** This document assumes that you are familiar with the basics of GDB and the
> CPython C API. It consolidates guidance from the
> devguide  and the
> Python wiki.

## Prerequisites

You need to have:

- GDB 7 or later. (For earlier versions of GDB, see `Misc/gdbinit` in the
sources of Python 3.11 or earlier.)
- GDB-compatible debugging information for Python and any extension you are
debugging.
- The `python-gdb.py` extension.

The extension is built with Python, but might be distributed separately or
not at all. Below, we include tips for a few common systems as examples.
Note that even if the instructions match your system, they might be outdated.

### Setup with Python built from source

When you build CPython from source, debugging information should be available,
and the build should add a `python-gdb.py` file to the root directory of
your repository.

To activate support, you must add the directory containing `python-gdb.py`
to GDB's "auto-load-safe-path".
If you haven't done this, recent versions of GDB will print out a warning
with instructions on how to do this.

> **Note:** If you do not see instructions for your version of GDB, put this in your
> configuration file (`~/.gdbinit` or `~/.config/gdb/gdbinit`):
>
>
> ```
> add-auto-load-safe-path /path/to/cpython
> ```
>
>
> You can also add multiple paths, separated by `:`.

### Setup for Python from a Linux distro

Most Linux systems provide debug information for the system Python
in a package called `python-debuginfo`, `python-dbg` or similar.
For example:

- Fedora:

```shell
sudo dnf install gdb
sudo dnf debuginfo-install python3
```

- Ubuntu:

```shell
sudo apt install gdb python3-dbg
```

On several recent Linux systems, GDB can download debugging symbols
automatically using *debuginfod*.
However, this will not install the `python-gdb.py` extension;
you generally do need to install the debug info package separately.

## Using the Debug build and Development mode

For easier debugging, you might want to:

- Use a debug build of Python. (When building from source,
use `configure --with-pydebug`. On Linux distros, install and run a package
like `python-debug` or `python-dbg`, if available.)
- Use the runtime development mode (`-X dev`).

Both enable extra assertions and disable some optimizations.
Sometimes this hides the bug you are trying to find, but in most cases they
make the process easier.
