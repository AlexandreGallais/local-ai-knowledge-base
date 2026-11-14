---
title: "test --- Regression tests package for Python (part 4 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/test.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# test --- Regression tests package for Python (part 4 of 5)

### `bind_port(sock, host=HOST)`

Bind the socket to a free port and return the port number.  Relies on
ephemeral ports in order to ensure we are using an unbound port.  This is
important as many tests may be running simultaneously, especially in a
buildbot environment.  This method raises an exception if the
`sock.family` is `AF_INET` and `sock.type` is
`SOCK_STREAM`, and the socket has
`SO_REUSEADDR` or `SO_REUSEPORT` set on it.
Tests should never set these socket options for TCP/IP sockets.
The only case for setting these options is testing multicasting via
multiple UDP sockets.

Additionally, if the `SO_EXCLUSIVEADDRUSE` socket option is
available (i.e. on Windows), it will be set on the socket.  This will
prevent anyone else from binding to our host/port for the duration of the
test.

### `bind_unix_socket(sock, addr)`

Bind a Unix socket, raising `unittest.SkipTest` if
`PermissionError` is raised.

### decorator `skip_unless_bind_unix_socket`

A decorator for running tests that require a functional `bind()` for Unix
sockets.

### `transient_internet(resource_name, *, timeout=30.0, errnos=())`

A context manager that raises `ResourceDenied` when
various issues with the internet connection manifest themselves as
exceptions.

# `test.support.script_helper` --- Utilities for the Python execution tests

Module `test.support.script_helper`.

The `test.support.script_helper` module provides support for Python's
script execution tests.

### `interpreter_requires_environment()`

Return `True` if `sys.executable interpreter` requires environment
variables in order to be able to run at all.

This is designed to be used with `@unittest.skipIf()` to annotate tests
that need to use an `assert_python*()` function to launch an isolated
mode (`-I`) or no environment mode (`-E`) sub-interpreter process.

A normal build & test does not run into this situation but it can happen
when trying to run the standard library test suite from an interpreter that
doesn't have an obvious home with Python's current home finding logic.

Setting `PYTHONHOME` is one way to get most of the testsuite to run
in that situation.  `PYTHONPATH` or `PYTHONNOUSERSITE` are
other common environment variables that might impact whether or not the
interpreter can start.

### `run_python_until_end(*args, **env_vars)`

Set up the environment based on *env_vars* for running the interpreter
in a subprocess.  The values can include `__isolated`, `__cleanenv`,
`__cwd`, and `TERM`.

> *Changed in version 3.9.*
> The function no longer strips whitespaces from *stderr*.

### `assert_python_ok(*args, **env_vars)`

Assert that running the interpreter with *args* and optional environment
variables *env_vars* succeeds (`rc == 0`) and return a ``(return code,
stdout, stderr)`` tuple.

If the *__cleanenv* keyword-only parameter is set, *env_vars* is used as a fresh
environment.

Python is started in isolated mode (command line option `-I`),
except if the *__isolated* keyword-only parameter is set to `False`.

> *Changed in version 3.9.*
> The function no longer strips whitespaces from *stderr*.

### `assert_python_failure(*args, **env_vars)`

Assert that running the interpreter with *args* and optional environment
variables *env_vars* fails (`rc != 0`) and return a ``(return code,
stdout, stderr)`` tuple.

See `assert_python_ok()` for more options.

> *Changed in version 3.9.*
> The function no longer strips whitespaces from *stderr*.

### `spawn_python(*args, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, **kw)`

Run a Python subprocess with the given arguments.

*kw* is extra keyword args to pass to `subprocess.Popen()`. Returns a
`subprocess.Popen` object.

### `kill_python(p)`

Run the given `subprocess.Popen` process until completion and return
stdout.

### `make_script(script_dir, script_basename, source, omit_suffix=False)`

Create script containing *source* in path *script_dir* and *script_basename*.
If *omit_suffix* is `False`, append `.py` to the name.  Return the full
script path.

### `make_zip_script(zip_dir, zip_basename, script_name, name_in_zip=None)`

Create zip file at *zip_dir* and *zip_basename* with extension `zip` which
contains the files in *script_name*. *name_in_zip* is the archive name.
Return a tuple containing `(full path, full path of archive name)`.

### `make_pkg(pkg_dir, init_source='')`

Create a directory named *pkg_dir* containing an `__init__` file with
*init_source* as its contents.

### `make_zip_pkg(zip_dir, zip_basename, pkg_name, script_basename, \`

```python
source, depth=1, compiled=False)
```

Create a zip package directory with a path of *zip_dir* and *zip_basename*
containing an empty `__init__` file and a file *script_basename*
containing the *source*.  If *compiled* is `True`, both source files will
be compiled and added to the zip package.  Return a tuple of the full zip
path and the archive name for the zip file.

# `test.support.bytecode_helper` --- Support tools for testing correct bytecode generation

Module `test.support.bytecode_helper`.

The `test.support.bytecode_helper` module provides support for testing
and inspecting bytecode generation.

> *Added in version 3.9.*

The module defines the following class:

### class `BytecodeTestCase(unittest.TestCase)`

This class has custom assertion methods for inspecting bytecode.

### `BytecodeTestCase.get_disassembly_as_string(co)`

Return the disassembly of *co* as string.

### `BytecodeTestCase.assertInBytecode(x, opname, argval=_UNSPECIFIED)`

Return instr if *opname* is found, otherwise throws `AssertionError`.

### `BytecodeTestCase.assertNotInBytecode(x, opname, argval=_UNSPECIFIED)`

Throws `AssertionError` if *opname* is found.

# `test.support.threading_helper` --- Utilities for threading tests

Module `test.support.threading_helper`.

The `test.support.threading_helper` module provides support for threading tests.

> *Added in version 3.10.*

### `join_thread(thread, timeout=None)`

Join a *thread* within *timeout*.  Raise an `AssertionError` if thread
is still alive after *timeout* seconds.

### decorator `reap_threads`

Decorator to ensure the threads are cleaned up even if the test fails.

### `start_threads(threads, unlock=None)`

Context manager to start *threads*, which is a sequence of threads.
*unlock* is a function called after the threads are started, even if an
exception was raised; an example would be `threading.Event.set()`.
`start_threads` will attempt to join the started threads upon exit.

### `threading_cleanup(*original_values)`

Cleanup up threads not specified in *original_values*.  Designed to emit
a warning if a test leaves running threads in the background.

### `threading_setup()`

Return current thread count and copy of dangling threads.

### `wait_threads_exit(timeout=None)`

Context manager to wait until all threads created in the `with` statement
exit.

### `catch_threading_exception()`

Context manager catching `threading.Thread` exception using
`threading.excepthook()`.

Attributes set when an exception is caught:

- `exc_type`
- `exc_value`
- `exc_traceback`
- `thread`

See `threading.excepthook()` documentation.

These attributes are deleted at the context manager exit.

Usage:

```
with threading_helper.catch_threading_exception() as cm:
    # code spawning a thread which raises an exception
    ...

    # check the thread exception, use cm attributes:
    # exc_type, exc_value, exc_traceback, thread
    ...

# exc_type, exc_value, exc_traceback, thread attributes of cm no longer
# exists at this point
# (to avoid reference cycles)
```

> *Added in version 3.8.*

### `run_concurrently(worker_func, nthreads, args=(), kwargs={})`

Run the worker function concurrently in multiple threads.
Re-raises an exception if any thread raises one, after all threads have
finished.

# `test.support.os_helper` --- Utilities for os tests

Module `test.support.os_helper`.

The `test.support.os_helper` module provides support for os tests.

> *Added in version 3.10.*

### `FS_NONASCII`

A non-ASCII character encodable by `os.fsencode()`.

### `SAVEDCWD`

Set to `os.getcwd()`.

### `TESTFN`

Set to a name that is safe to use as the name of a temporary file.  Any
temporary file that is created should be closed and unlinked (removed).

### `TESTFN_NONASCII`

Set to a filename containing the `FS_NONASCII` character, if it exists.
This guarantees that if the filename exists, it can be encoded and decoded
with the default filesystem encoding. This allows tests that require a
non-ASCII filename to be easily skipped on platforms where they can't work.

### `TESTFN_UNENCODABLE`

Set to a filename (str type) that should not be able to be encoded by file
system encoding in strict mode.  It may be `None` if it's not possible to
generate such a filename.

### `TESTFN_UNDECODABLE`

Set to a filename (bytes type) that should not be able to be decoded by
file system encoding in strict mode.  It may be `None` if it's not
possible to generate such a filename.

### `TESTFN_UNICODE`

Set to a non-ASCII name for a temporary file.

### class `EnvironmentVarGuard()`

Class used to temporarily set or unset environment variables.  Instances can
be used as a context manager and have a complete dictionary interface for
querying/modifying the underlying `os.environ`. After exit from the
context manager all changes to environment variables done through this
instance will be rolled back.

> *Changed in version 3.1.*
> Added dictionary interface.

### class `FakePath(path)`

Simple path-like object.  It implements the
`__fspath__()`
method which just returns the *path* argument.  If *path* is an exception,
it will be raised in `__fspath__()`.

### `EnvironmentVarGuard.set(envvar, value)`

Temporarily set the environment variable `envvar` to the value of
`value`.

### `EnvironmentVarGuard.unset(envvar, *others)`

Temporarily unset one or more environment variables.

> *Changed in version 3.14.*
> More than one environment variable can be unset.

### `can_symlink()`

Return `True` if the OS supports symbolic links, `False`
otherwise.

### `can_xattr()`

Return `True` if the OS supports xattr, `False`
otherwise.

### `change_cwd(path, quiet=False)`

A context manager that temporarily changes the current working
directory to *path* and yields the directory.

If *quiet* is `False`, the context manager raises an exception
on error.  Otherwise, it issues only a warning and keeps the current
working directory the same.

### `create_empty_file(filename)`

Create an empty file with *filename*.  If it already exists, truncate it.

### `fd_count()`

Count the number of open file descriptors.

### `fs_is_case_insensitive(directory)`

Return `True` if the file system for *directory* is case-insensitive.

### `make_bad_fd()`

Create an invalid file descriptor by opening and closing a temporary file,
and returning its descriptor.

### `rmdir(filename)`

Call `os.rmdir()` on *filename*.  On Windows platforms, this is
wrapped with a wait loop that checks for the existence of the file,
which is needed due to antivirus programs that can hold files open and prevent
deletion.

### `rmtree(path)`

Call `shutil.rmtree()` on *path* or call `os.lstat()` and
`os.rmdir()` to remove a path and its contents.  As with `rmdir()`,
on Windows platforms
this is wrapped with a wait loop that checks for the existence of the files.

### decorator `skip_unless_symlink`

A decorator for running tests that require support for symbolic links.

### decorator `skip_unless_xattr`

A decorator for running tests that require support for xattr.

### `temp_cwd(name='tempcwd', quiet=False)`

A context manager that temporarily creates a new directory and
changes the current working directory (CWD).

The context manager creates a temporary directory in the current
directory with name *name* before temporarily changing the current
working directory.  If *name* is `None`, the temporary directory is
created using `tempfile.mkdtemp()`.

If *quiet* is `False` and it is not possible to create or change
the CWD, an error is raised.  Otherwise, only a warning is raised
and the original CWD is used.

### `temp_dir(path=None, quiet=False)`

A context manager that creates a temporary directory at *path* and
yields the directory.

If *path* is `None`, the temporary directory is created using
`tempfile.mkdtemp()`.  If *quiet* is `False`, the context manager
raises an exception on error.  Otherwise, if *path* is specified and
cannot be created, only a warning is issued.

### `temp_umask(umask)`

A context manager that temporarily sets the process umask.

### `unlink(filename)`

Call `os.unlink()` on *filename*.  As with `rmdir()`,
on Windows platforms, this is
wrapped with a wait loop that checks for the existence of the file.

### decorator `with_source_date_epoch(*, epoch=123456789)`

A decorator for running tests with the `SOURCE_DATE_EPOCH`
environment variable set to *epoch*.

### decorator `without_source_date_epoch`

A decorator for running tests with the `SOURCE_DATE_EPOCH`
environment variable unset.

### class `SourceDateEpochTestMeta`

Metaclass wrapping all test methods of the class with
`with_source_date_epoch()` if the *source_date_epoch* keyword class
argument is true, or with `without_source_date_epoch()` otherwise.
For example:

```
class TestsWithSourceEpoch(Tests,
                           metaclass=SourceDateEpochTestMeta,
                           source_date_epoch=True):
    pass
```

# `test.support.import_helper` --- Utilities for import tests

Module `test.support.import_helper`.

The `test.support.import_helper` module provides support for import tests.

> *Added in version 3.10.*

### `forget(module_name)`

Remove the module named *module_name* from `sys.modules` and delete any
byte-compiled files of the module.
