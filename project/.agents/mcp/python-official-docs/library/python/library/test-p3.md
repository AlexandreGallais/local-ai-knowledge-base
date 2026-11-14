---
title: "test --- Regression tests package for Python (part 3 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/test.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# test --- Regression tests package for Python (part 3 of 5)

### decorator `run_with_locale(catstr, *locales)`

A decorator for running a function in a different locale, correctly
resetting it after it has finished.  *catstr* is the locale category as
a string (for example `"LC_ALL"`).  The *locales* passed will be tried
sequentially, and the first valid locale will be used.

### decorator `run_with_tz(tz)`

A decorator for running a function in a specific timezone, correctly
resetting it after it has finished.

### decorator `requires_freebsd_version(*min_version)`

Decorator for the minimum version when running test on FreeBSD.  If the
FreeBSD version is less than the minimum, the test is skipped.

### decorator `requires_linux_version(*min_version)`

Decorator for the minimum version when running test on Linux.  If the
Linux version is less than the minimum, the test is skipped.

### decorator `requires_mac_version(*min_version)`

Decorator for the minimum version when running test on macOS.  If the
macOS version is less than the minimum, the test is skipped.

### decorator `requires_gil_enabled`

Decorator for skipping tests on the free-threaded build.  If the
GIL is disabled, the test is skipped.

### decorator `requires_IEEE_754`

Decorator for skipping tests on non-IEEE 754 platforms.

### decorator `requires_zlib`

Decorator for skipping tests if `zlib` doesn't exist.

### decorator `requires_gzip`

Decorator for skipping tests if `gzip` doesn't exist.

### decorator `requires_bz2`

Decorator for skipping tests if `bz2` doesn't exist.

### decorator `requires_lzma`

Decorator for skipping tests if `lzma` doesn't exist.

### decorator `requires_resource(resource)`

Decorator for skipping tests if *resource* is not available.

### decorator `requires_docstrings`

Decorator for only running the test if `HAVE_DOCSTRINGS`.

### decorator `requires_limited_api`

Decorator for only running the test if Limited C API
is available.

### decorator `cpython_only`

Decorator for tests only applicable to CPython.

### decorator `impl_detail(msg=None, **guards)`

Decorator for invoking `check_impl_detail()` on *guards*.  If that
returns `False`, then uses *msg* as the reason for skipping the test.

### decorator `thread_unsafe(reason=None)`

Decorator for marking tests as thread-unsafe.  This test always runs in one
thread even when invoked with `--parallel-threads`.

### decorator `no_tracing`

Decorator to temporarily turn off tracing for the duration of the test.

### decorator `refcount_test`

Decorator for tests which involve reference counting.  The decorator does
not run the test if it is not run by CPython.  Any trace function is unset
for the duration of the test to prevent unexpected refcounts caused by
the trace function.

### decorator `bigmemtest(size, memuse, dry_run=True)`

Decorator for bigmem tests.

*size* is a requested size for the test (in arbitrary, test-interpreted
units.)  *memuse* is the number of bytes per unit for the test, or a good
estimate of it.  For example, a test that needs two byte buffers, of 4 GiB
each, could be decorated with `@bigmemtest(size=_4G, memuse=2)`.

The *size* argument is normally passed to the decorated test method as an
extra argument.  If *dry_run* is `True`, the value passed to the test
method may be less than the requested value.  If *dry_run* is `False`, it
means the test doesn't support dummy runs when `-M` is not specified.

### decorator `bigaddrspacetest`

Decorator for tests that fill the address space.

### `linked_to_musl()`

Return `False` if there is no evidence the interpreter was compiled with
`musl`, otherwise return a version triple, either `(0, 0, 0)` if the
version is unknown, or the actual version if it is known.  Intended for use
in `skip` decorators.  `emscripten` and `wasi` are assumed to be
compiled with `musl`; otherwise `platform.libc_ver` is checked.

### `check_syntax_error(testcase, statement, errtext='', *, lineno=None, offset=None)`

Test for syntax errors in *statement* by attempting to compile *statement*.
*testcase* is the `unittest` instance for the test.  *errtext* is the
regular expression which should match the string representation of the
raised `SyntaxError`.  If *lineno* is not `None`, compares to
the line of the exception.  If *offset* is not `None`, compares to
the offset of the exception.

### `open_urlresource(url, *args, **kw)`

Open *url*.  If open fails, raises `TestFailed`.

### `reap_children()`

Call this from `setUp()`,
`tearDown()`, or `tearDownModule()` in tests
that start subprocesses. This will help ensure that no extra children
(zombies) stick around to hog resources and create problems when looking
for refleaks.

### `get_attribute(obj, name)`

Get an attribute, raising `unittest.SkipTest` if `AttributeError`
is raised.

### `catch_unraisable_exception()`

Context manager catching unraisable exception using
`sys.unraisablehook()`.

Storing the exception value (`cm.unraisable.exc_value`) creates a
reference cycle. The reference cycle is broken explicitly when the context
manager exits.

Storing the object (`cm.unraisable.object`) can resurrect it if it is set
to an object which is being finalized. Exiting the context manager clears
the stored object.

Usage:

```
with support.catch_unraisable_exception() as cm:
    # code creating an "unraisable exception"
    ...

    # check the unraisable exception: use cm.unraisable
    ...

# cm.unraisable attribute no longer exists at this point
# (to break a reference cycle)
```

> *Added in version 3.8.*

### `load_package_tests(pkg_dir, loader, standard_tests, pattern)`

Generic implementation of the `unittest` `load_tests` protocol for
use in test packages.  *pkg_dir* is the root directory of the package;
*loader*, *standard_tests*, and *pattern* are the arguments expected by
`load_tests`.  In simple cases, the test package's `__init__.py`
can be the following:

```
import os
from test.support import load_package_tests

def load_tests(*args):
    return load_package_tests(os.path.dirname(__file__), *args)
```

### `detect_api_mismatch(ref_api, other_api, *, ignore=())`

Returns the set of attributes, functions or methods of *ref_api* not
found on *other_api*, except for a defined list of items to be
ignored in this check specified in *ignore*.

By default this skips private attributes beginning with '_' but
includes all magic methods, i.e. those starting and ending in '__'.

> *Added in version 3.5.*

### `patch(test_instance, object_to_patch, attr_name, new_value)`

Override *object_to_patch.attr_name* with *new_value*.  Also add
cleanup procedure to *test_instance* to restore *object_to_patch* for
*attr_name*.  The *attr_name* should be a valid attribute for
*object_to_patch*.

### `run_in_subinterp(code)`

Run *code* in subinterpreter.  Raise `unittest.SkipTest` if
`tracemalloc` is enabled.

### decorator `runInSubprocess(*, options=(), env=None, timeout=None)`

Decorator that runs the decorated test in a fresh interpreter subprocess, in
isolation, so that it does not share global or interpreter state with the
rest of the test run.  It can decorate a test method or a whole
`TestCase` subclass.  Decorated methods must take no extra
arguments.  A failure, error or skip in the subprocess is reported for the
corresponding test, and individual :meth:`subtests
<unittest.TestCase.subTest>` that fail or are skipped are reported
individually.  A reported failure or error shows the original subprocess
traceback as the cause of the exception.

When a **method** is decorated, only that method runs in a subprocess; all
fixtures (`setUp()` / `tearDown()`,
`setUpClass()` / `tearDownClass()`
and `setUpModule()` / `tearDownModule()`) run both in the parent process
(as usual) and in the subprocess around the method.

When a **class** is decorated, the whole class runs in a single subprocess,
and `setUpClass()`,
`tearDownClass()`, `setUp()`
and `tearDown()` run once each in the subprocess and
are skipped in the parent process.  A failure or skip of
`setUpClass()` in the subprocess is reported for the
whole class.  `setUpModule()` cannot be controlled by a class decorator,
so it still runs in the parent process too; test it with
`runningInSubprocess` if needed.

The subprocess inherits the enabled resources (`-u`), memory limit
(`-M`) and verbosity (`-v`) of the parent test run, so that
`requires_resource()`, `requires()`,
`bigmemtest()` and the like behave consistently in both
processes.

*options* is a sequence of interpreter command line options
to run the subprocess with,
and *env* is a mapping of environment variables to set in it,
on top of the inherited environment.
A value of `None` in *env* unsets the variable.
Note that `-E` and `-I` make the subprocess ignore
the `PYTHON*` environment variables, including `PYTHONPATH`.

*timeout* is the number of seconds to wait for the subprocess;
the test is reported as an error if it does not complete in time.
By default there is no timeout,
and a hung test is left to the timeout of the test runner.

The test is skipped on platforms without subprocess support.

### `runningInSubprocess`

`True` while the code runs in the isolated subprocess spawned by
`runInSubprocess()`, and `False` otherwise (including in the parent
process and in a normal, non-isolated test run).  Fixtures such as
`setUp()`, `tearDown()`,
`setUpClass()`, `tearDownClass()`,
`setUpModule()` and `tearDownModule()` can test it to choose which code
to run in the subprocess.

### `check_free_after_iterating(test, iter, cls, args=())`

Assert instances of *cls* are deallocated after iterating.

### `missing_compiler_executable(cmd_names=[])`

Check for the existence of the compiler executables whose names are listed
in *cmd_names* or all the compiler executables when *cmd_names* is empty
and return the first missing executable or `None` when none is found
missing.

### `check__all__(test_case, module, name_of_module=None, extra=(), not_exported=())`

Assert that the `__all__` variable of *module* contains all public names.

The module's public names (its API) are detected automatically
based on whether they match the public name convention and were defined in
*module*.

The *name_of_module* argument can specify (as a string or tuple thereof) what
module(s) an API could be defined in order to be detected as a public
API. One case for this is when *module* imports part of its public API from
other modules, possibly a C backend (like `csv` and its `_csv`).

The *extra* argument can be a set of names that wouldn't otherwise be automatically
detected as "public", like objects without a proper `__module__`
attribute. If provided, it will be added to the automatically detected ones.

The *not_exported* argument can be a set of names that must not be treated
as part of the public API even though their names indicate otherwise.

Example use:

```
import bar
import foo
import unittest
from test import support

class MiscTestCase(unittest.TestCase):
    def test__all__(self):
        support.check__all__(self, foo)

class OtherTestCase(unittest.TestCase):
    def test__all__(self):
        extra = {'BAR_CONST', 'FOO_CONST'}
        not_exported = {'baz'}  # Undocumented name.
        # bar imports part of its API from _bar.
        support.check__all__(self, bar, ('bar', '_bar'),
                             extra=extra, not_exported=not_exported)
```

> *Added in version 3.6.*

### `skip_if_broken_multiprocessing_synchronize()`

Skip tests if the `multiprocessing.synchronize` module is missing, if
there is no available semaphore implementation, or if creating a lock raises
an `OSError`.

> *Added in version 3.10.*

### `check_disallow_instantiation(test_case, tp, *args, **kwds)`

Assert that type *tp* cannot be instantiated using *args* and *kwds*.

> *Added in version 3.10.*

### `adjust_int_max_str_digits(max_digits)`

This function returns a context manager that will change the global
`sys.set_int_max_str_digits()` setting for the duration of the
context to allow execution of test code that needs a different limit
on the number of digits when converting between an integer and string.

> *Added in version 3.11.*

The `test.support` module defines the following classes:

### class `SuppressCrashReport()`

A context manager used to try to prevent crash dialog popups on tests that
are expected to crash a subprocess.

On Windows, it disables Windows Error Reporting dialogs using
SetErrorMode.

On UNIX, `resource.setrlimit()` is used to set
`resource.RLIMIT_CORE`'s soft limit to 0 to prevent coredump file
creation.

On both platforms, the old value is restored by `__exit__()`.

### class `SaveSignals()`

Class to save and restore signal handlers registered by the Python signal
handler.

### `save(self)`

Save the signal handlers to a dictionary mapping signal numbers to the
current signal handler.

### `restore(self)`

Set the signal numbers from the `save()` dictionary to the saved
handler.

### `matches(self, d, **kwargs)`

Try to match a single dict with the supplied arguments.

### `match_value(self, k, dv, v)`

Try to match a single stored value (*dv*) with a supplied value (*v*).

# `test.support.socket_helper` --- Utilities for socket tests

Module `test.support.socket_helper`.

The `test.support.socket_helper` module provides support for socket tests.

> *Added in version 3.9.*

### `IPV6_ENABLED`

Set to `True` if IPv6 is enabled on this host, `False` otherwise.

### `find_unused_port(family=socket.AF_INET, socktype=socket.SOCK_STREAM)`

Returns an unused port that should be suitable for binding.  This is
achieved by creating a temporary socket with the same family and type as
the `sock` parameter (default is `AF_INET`,
`SOCK_STREAM`),
and binding it to the specified host address (defaults to `0.0.0.0`)
with the port set to 0, eliciting an unused ephemeral port from the OS.
The temporary socket is then closed and deleted, and the ephemeral port is
returned.

Either this method or `bind_port()` should be used for any tests
where a server socket needs to be bound to a particular port for the
duration of the test.
Which one to use depends on whether the calling code is creating a Python
socket, or if an unused port needs to be provided in a constructor
or passed to an external program (i.e. the `-accept` argument to
openssl's s_server mode).  Always prefer `bind_port()` over
`find_unused_port()` where possible.  Using a hard coded port is
discouraged since it can make multiple instances of the test impossible to
run simultaneously, which is a problem for buildbots.
