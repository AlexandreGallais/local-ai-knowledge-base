---
title: "test --- Regression tests package for Python (part 2 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/test.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# test --- Regression tests package for Python (part 2 of 5)

## Running tests using the command-line interface

Module `test.regrtest`.

The `test` package can be run as a script to drive Python's regression
test suite, thanks to the `-m` option: `python -m test`. Under
the hood, it uses `test.regrtest`; the call :program:`python -m
test.regrtest` used in previous Python versions still works.  Running the
script by itself automatically starts running all regression tests in the
`test` package. It does this by finding modules and packages whose names
start with `test_`, importing each one, and loading its tests with
`unittest.TestLoader.loadTestsFromModule()`. See the
load_tests protocol for how a module or package
can customize what is loaded. Defining a module-level `test_main()` function
is not supported and causes the test to fail. The names of tests to
execute may also be passed to the script. Specifying a single
regression test (`python -m test test_spam`) will minimize output and
only print whether the test passed or failed.

Running `test` directly allows what resources are available for
tests to use to be set. You do this by using the `-u` command-line
option. Specifying `all` as the value for the `-u` option enables all
possible resources: `python -m test -uall`.
If all but one resource is desired (a more common case), a
comma-separated list of resources that are not desired may be listed after
`all`. The command `python -m test -uall,-audio,-largefile`
will run `test` with all resources except the `audio` and
`largefile` resources. For a list of all resources and more command-line
options, run `python -m test -h`.

Some other ways to execute the regression tests depend on what platform the
tests are being executed on. On Unix, you can run `make test` at the
top-level directory where Python was built. On Windows,
executing `rt.bat` from your `PCbuild` directory will run all
regression tests.

> *Added in version 3.14.*
> Output is colorized by default and can be
> controlled using environment variables.

# `test.support` --- Utilities for the Python test suite

Module `test.support`.

The `test.support` module provides support for Python's regression
test suite.

> **Note:** `test.support` is not a public module.  It is documented here to help
> Python developers write tests.  The API of this module is subject to change
> without backwards compatibility concerns between releases.

This module defines the following exceptions:

### exception `TestFailed`

Exception to be raised when a test fails. This is deprecated in favor of
`unittest`-based tests and `unittest.TestCase`'s assertion
methods.

### exception `ResourceDenied`

Subclass of `unittest.SkipTest`. Raised when a resource (such as a
network connection) is not available. Raised by the `requires()`
function.

The `test.support` module defines the following constants:

### `verbose`

`True` when verbose output is enabled. Should be checked when more
detailed information is desired about a running test. *verbose* is set by
`test.regrtest`.

### `is_jython`

`True` if the running interpreter is Jython.

### `is_android`

`True` if `sys.platform` is `android`.

### `is_emscripten`

`True` if `sys.platform` is `emscripten`.

### `is_wasi`

`True` if `sys.platform` is `wasi`.

### `is_apple_mobile`

`True` if `sys.platform` is `ios`, `tvos`, or `watchos`.

### `is_apple`

`True` if `sys.platform` is `darwin` or `is_apple_mobile` is `True`.

### `unix_shell`

Path for shell if not on Windows; otherwise `None`.

### `LOOPBACK_TIMEOUT`

Timeout in seconds for tests using a network server listening on the network
local loopback interface like `127.0.0.1`.

The timeout is long enough to prevent test failure: it takes into account
that the client and the server can run in different threads or even
different processes.

The timeout should be long enough for `connect()`,
`recv()` and `send()` methods of
`socket.socket`.

Its default value is 10 seconds.

See also `INTERNET_TIMEOUT`.

### `INTERNET_TIMEOUT`

Timeout in seconds for network requests going to the internet.

The timeout is short enough to prevent a test to wait for too long if the
internet request is blocked for whatever reason.

Usually, a timeout using `INTERNET_TIMEOUT` should not mark a test as
failed, but skip the test instead: see
`transient_internet()`.

Its default value is 1 minute.

See also `LOOPBACK_TIMEOUT`.

### `SHORT_TIMEOUT`

Timeout in seconds to mark a test as failed if the test takes "too long".

The timeout value depends on the regrtest `--timeout` command line option.

If a test using `SHORT_TIMEOUT` starts to fail randomly on slow
buildbots, use `LONG_TIMEOUT` instead.

Its default value is 30 seconds.

### `LONG_TIMEOUT`

Timeout in seconds to detect when a test hangs.

It is long enough to reduce the risk of test failure on the slowest Python
buildbots. It should not be used to mark a test as failed if the test takes
"too long".  The timeout value depends on the regrtest `--timeout` command
line option.

Its default value is 5 minutes.

See also `LOOPBACK_TIMEOUT`, `INTERNET_TIMEOUT` and
`SHORT_TIMEOUT`.

### `PGO`

Set when tests can be skipped when they are not useful for PGO.

### `PIPE_MAX_SIZE`

A constant that is likely larger than the underlying OS pipe buffer size,
to make writes blocking.

### `Py_DEBUG`

`True` if Python was built with the `Py_DEBUG` macro
defined, that is, if
Python was built in debug mode.

> *Added in version 3.12.*

### `SOCK_MAX_SIZE`

A constant that is likely larger than the underlying OS socket buffer size,
to make writes blocking.

### `TEST_SUPPORT_DIR`

Set to the top level directory that contains `test.support`.

### `TEST_HOME_DIR`

Set to the top level directory for the test package.

### `TEST_DATA_DIR`

Set to the `data` directory within the test package.

### `MAX_Py_ssize_t`

Set to `sys.maxsize` for big memory tests.

### `max_memuse`

Set by `set_memlimit()` as the memory limit for big memory tests.
Limited by `MAX_Py_ssize_t`.

### `real_max_memuse`

Set by `set_memlimit()` as the memory limit for big memory tests.  Not
limited by `MAX_Py_ssize_t`.

### `MISSING_C_DOCSTRINGS`

Set to `True` if Python is built without docstrings (the
`WITH_DOC_STRINGS` macro is not defined).
See the `configure --without-doc-strings` option.

See also the `HAVE_DOCSTRINGS` variable.

### `HAVE_DOCSTRINGS`

Set to `True` if function docstrings are available.
See the `python -OO` option, which strips docstrings of functions implemented in Python.

See also the `MISSING_C_DOCSTRINGS` variable.

### `TEST_HTTP_URL`

Define the URL of a dedicated HTTP server for the network tests.

### `ALWAYS_EQ`

Object that is equal to anything.  Used to test mixed type comparison.

### `NEVER_EQ`

Object that is not equal to anything (even to `ALWAYS_EQ`).
Used to test mixed type comparison.

### `LARGEST`

Object that is greater than anything (except itself).
Used to test mixed type comparison.

### `SMALLEST`

Object that is less than anything (except itself).
Used to test mixed type comparison.

The `test.support` module defines the following functions:

### `busy_retry(timeout, err_msg=None, /, *, error=True)`

Run the loop body until `break` stops the loop.

After *timeout* seconds, raise an `AssertionError` if *error* is true,
or just stop the loop if *error* is false.

Example:

```
for _ in support.busy_retry(support.SHORT_TIMEOUT):
    if check():
        break
```

Example of error=False usage:

```
for _ in support.busy_retry(support.SHORT_TIMEOUT, error=False):
    if check():
        break
else:
    raise RuntimeError('my custom error')
```

### `sleeping_retry(timeout, err_msg=None, /, *, init_delay=0.010, max_delay=1.0, error=True)`

Wait strategy that applies exponential backoff.

Run the loop body until `break` stops the loop. Sleep at each loop
iteration, but not at the first iteration. The sleep delay is doubled at
each iteration (up to *max_delay* seconds).

See `busy_retry()` documentation for the parameters usage.

Example raising an exception after SHORT_TIMEOUT seconds:

```
for _ in support.sleeping_retry(support.SHORT_TIMEOUT):
    if check():
        break
```

Example of error=False usage:

```
for _ in support.sleeping_retry(support.SHORT_TIMEOUT, error=False):
    if check():
        break
else:
    raise RuntimeError('my custom error')
```

### `is_resource_enabled(resource)`

Return `True` if *resource* is enabled and available. The list of
available resources is only set when `test.regrtest` is executing the
tests.

### `get_resource_value(resource)`

Return the value specified for *resource* (as `-u {resource}={value}`).
Return `None` if *resource* is disabled or no value is specified.

### `python_is_optimized()`

Return `True` if Python was not built with `-O0` or `-Og`.

### `with_pymalloc()`

Return `True` if Python was built with pymalloc enabled
and is not a free-threaded build.

### `requires(resource, msg=None)`

Raise `ResourceDenied` if *resource* is not available. *msg* is the
argument to `ResourceDenied` if it is raised. Always returns
`True` if called by a function whose `__name__` is `'__main__'`.
Used when tests are executed by `test.regrtest`.

### `sortdict(dict)`

Return a repr of *dict* with keys sorted.

### `findfile(filename, subdir=None)`

Return the path to the file named *filename*. If no match is found
*filename* is returned. This does not equal a failure since it could be the
path to the file.

Setting *subdir* indicates a relative path to use to find the file
rather than looking directly in the path directories.

### `get_pagesize()`

Get size of a page in bytes.

> *Added in version 3.12.*

### `setswitchinterval(interval)`

Set the `sys.setswitchinterval()` to the given *interval*.  Defines
a minimum interval for Android systems to prevent the system from hanging.

### `check_impl_detail(**guards)`

Use this check to guard CPython's implementation-specific tests or to
run them only on the implementations guarded by the arguments.  This
function returns `True` or `False` depending on the host platform.
Example usage:

```
check_impl_detail()               # Only on CPython (default).
check_impl_detail(jython=True)    # Only on Jython.
check_impl_detail(cpython=False)  # Everywhere except CPython.
```

### `set_memlimit(limit)`

Set the values for `max_memuse` and `real_max_memuse` for big
memory tests.

### `record_original_stdout(stdout)`

Store the value from *stdout*.  It is meant to hold the stdout at the
time the regrtest began.

### `get_original_stdout()`

Return the original stdout set by `record_original_stdout()` or
`sys.stdout` if it's not set.

### `args_from_interpreter_flags()`

Return a list of command line arguments reproducing the current settings
in `sys.flags` and `sys.warnoptions`.

### `optim_args_from_interpreter_flags()`

Return a list of command line arguments reproducing the current
optimization settings in `sys.flags`.

### `captured_stdin()`

```python
captured_stdout()
captured_stderr()
```

A context managers that temporarily replaces the named stream with
`io.StringIO` object.

Example use with output streams:

```
with captured_stdout() as stdout, captured_stderr() as stderr:
    print("hello")
    print("error", file=sys.stderr)
assert stdout.getvalue() == "hello\n"
assert stderr.getvalue() == "error\n"
```

Example use with input stream:

```
with captured_stdin() as stdin:
    stdin.write('hello\n')
    stdin.seek(0)
    # call test code that consumes from sys.stdin
    captured = input()
self.assertEqual(captured, "hello")
```

### `disable_faulthandler()`

A context manager that temporary disables `faulthandler`.

### `gc_collect()`

Force as many objects as possible to be collected.  This is needed because
timely deallocation is not guaranteed by the garbage collector.  This means
that `__del__` methods may be called later than expected and weakrefs
may remain alive for longer than expected.

### `disable_gc()`

A context manager that disables the garbage collector on entry. On
exit, the garbage collector is restored to its prior state.

### `swap_attr(obj, attr, new_val)`

Context manager to swap out an attribute with a new object.

Usage:

```
with swap_attr(obj, "attr", 5):
    ...
```

This will set `obj.attr` to 5 for the duration of the `with` block,
restoring the old value at the end of the block.  If `attr` doesn't
exist on `obj`, it will be created and then deleted at the end of the
block.

The old value (or `None` if it doesn't exist) will be assigned to the
target of the "as" clause, if there is one.

### `swap_item(obj, attr, new_val)`

Context manager to swap out an item with a new object.

Usage:

```
with swap_item(obj, "item", 5):
    ...
```

This will set `obj["item"]` to 5 for the duration of the `with` block,
restoring the old value at the end of the block. If `item` doesn't
exist on `obj`, it will be created and then deleted at the end of the
block.

The old value (or `None` if it doesn't exist) will be assigned to the
target of the "as" clause, if there is one.

### `flush_std_streams()`

Call the `flush()` method on `sys.stdout` and then on
`sys.stderr`. It can be used to make sure that the logs order is
consistent before writing into stderr.

> *Added in version 3.11.*

### `print_warning(msg)`

Print a warning into `sys.__stderr__`. Format the message as:
`f"Warning -- {msg}"`. If *msg* is made of multiple lines, add
`"Warning -- "` prefix to each line.

> *Added in version 3.9.*

### `wait_process(pid, *, exitcode, timeout=None)`

Wait until process *pid* completes and check that the process exit code is
*exitcode*.

Raise an `AssertionError` if the process exit code is not equal to
*exitcode*.

If the process runs longer than *timeout* seconds (`SHORT_TIMEOUT` by
default), kill the process and raise an `AssertionError`. The timeout
feature is not available on Windows.

> *Added in version 3.9.*

### `calcobjsize(fmt)`

Return the size of the `PyObject` whose structure members are
defined by *fmt*. The returned value includes the size of the Python object header and alignment.

### `calcvobjsize(fmt)`

Return the size of the `PyVarObject` whose structure members are
defined by *fmt*. The returned value includes the size of the Python object header and alignment.

### `checksizeof(test, o, size)`

For testcase *test*, assert that the `sys.getsizeof` for *o* plus the GC
header size equals *size*.

### decorator `anticipate_failure(condition)`

A decorator to conditionally mark tests with
unittest.expectedFailure. Any use of this decorator should
have an associated comment identifying the relevant tracker issue.

### `system_must_validate_cert(f)`

A decorator that skips the decorated test on TLS certification validation failures.
