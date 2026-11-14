---
title: "test --- Regression tests package for Python (part 5 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/test.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# test --- Regression tests package for Python (part 5 of 5)

### `import_fresh_module(name, fresh=(), blocked=(), deprecated=False)`

This function imports and returns a fresh copy of the named Python module
by removing the named module from `sys.modules` before doing the import.
Note that unlike `importlib.reload()`, the original module is not
affected by this operation.

*fresh* is an iterable of additional module names that are also removed
from the `sys.modules` cache before doing the import.

*blocked* is an iterable of module names that are replaced with `None`
in the module cache during the import to ensure that attempts to import
them raise `ImportError`.

The named module and any modules named in the *fresh* and *blocked*
parameters are saved before starting the import and then reinserted into
`sys.modules` when the fresh import is complete.

Module and package deprecation messages are suppressed during this import
if *deprecated* is `True`.

This function will raise `ImportError` if the named module cannot be
imported.

Example use:

```
# Get copies of the warnings module for testing without affecting the
# version being used by the rest of the test suite. One copy uses the
# C implementation, the other is forced to use the pure Python fallback
# implementation
py_warnings = import_fresh_module('warnings', blocked=['_warnings'])
c_warnings = import_fresh_module('warnings', fresh=['_warnings'])
```

> *Added in version 3.1.*

### `import_module(name, deprecated=False, *, required_on=())`

This function imports and returns the named module. Unlike a normal
import, this function raises `unittest.SkipTest` if the module
cannot be imported.

Module and package deprecation messages are suppressed during this import
if *deprecated* is `True`.  If a module is required on a platform but
optional for others, set *required_on* to an iterable of platform prefixes
which will be compared against `sys.platform`.

> *Added in version 3.1.*

### `modules_setup()`

Return a copy of `sys.modules`.

### `modules_cleanup(oldmodules)`

Remove modules except for *oldmodules* and `encodings` in order to
preserve internal cache.

### `unload(name)`

Delete *name* from `sys.modules`.

### `make_legacy_pyc(source)`

Move a PEP 3147/PEP 488 pyc file to its legacy pyc location and return the file
system path to the legacy pyc file.  The *source* value is the file system
path to the source file.  It does not need to exist, however the PEP
3147/488 pyc file must exist.

### class `CleanImport(*module_names)`

A context manager to force import to return a new module reference.  This
is useful for testing module-level behaviors, such as the emission of a
`DeprecationWarning` on import.  Example usage:

```
with CleanImport('foo'):
    importlib.import_module('foo')  # New reference.
```

### class `DirsOnSysPath(*paths)`

A context manager to temporarily add directories to `sys.path`.

This makes a copy of `sys.path`, appends any directories given
as positional arguments, then reverts `sys.path` to the copied
settings when the context ends.

Note that *all* `sys.path` modifications in the body of the
context manager, including replacement of the object,
will be reverted at the end of the block.

# `test.support.warnings_helper` --- Utilities for warnings tests

Module `test.support.warnings_helper`.

The `test.support.warnings_helper` module provides support for warnings tests.

> *Added in version 3.10.*

### `ignore_warnings(*, category)`

Suppress warnings that are instances of *category*,
which must be `Warning` or a subclass.
Roughly equivalent to `warnings.catch_warnings()`
with `warnings.simplefilter('ignore', category=category)`.
For example:

```
@warning_helper.ignore_warnings(category=DeprecationWarning)
def test_suppress_warning():
    # do something
```

> *Added in version 3.8.*

### `check_no_resource_warning(testcase)`

Context manager to check that no `ResourceWarning` was raised.  You
must remove the object which may emit `ResourceWarning` before the
end of the context manager.

### `check_syntax_warning(testcase, statement, errtext='', *, lineno=1, offset=None)`

Test for syntax warning in *statement* by attempting to compile *statement*.
Test also that the `SyntaxWarning` is emitted only once, and that it
will be converted to a `SyntaxError` when turned into error.
*testcase* is the `unittest` instance for the test.  *errtext* is the
regular expression which should match the string representation of the
emitted `SyntaxWarning` and raised `SyntaxError`.  If *lineno*
is not `None`, compares to the line of the warning and exception.
If *offset* is not `None`, compares to the offset of the exception.

> *Added in version 3.8.*

### `check_warnings(*filters, quiet=True)`

A convenience wrapper for `warnings.catch_warnings()` that makes it
easier to test that a warning was correctly raised.  It is approximately
equivalent to calling `warnings.catch_warnings(record=True)` with
`warnings.simplefilter()` set to `always` and with the option to
automatically validate the results that are recorded.

`check_warnings` accepts 2-tuples of the form ``("message regexp",
WarningCategory)`` as positional arguments. If one or more *filters* are
provided, or if the optional keyword argument *quiet* is `False`,
it checks to make sure the warnings are as expected:  each specified filter
must match at least one of the warnings raised by the enclosed code or the
test fails, and if any warnings are raised that do not match any of the
specified filters the test fails.  To disable the first of these checks,
set *quiet* to `True`.

If no arguments are specified, it defaults to:

```
check_warnings(("", Warning), quiet=True)
```

In this case all warnings are caught and no errors are raised.

On entry to the context manager, a `WarningsRecorder` instance is
returned. The recorded warnings are available via its
`warnings` attribute, and its
`reset()` method discards previously recorded warnings.

The context manager is designed to be used like this:

```
with check_warnings(("assertion is always true", SyntaxWarning),
                    ("", UserWarning)):
    exec('assert(False, "Hey!")')
    warnings.warn(UserWarning("Hide me!"))
```

In this case if either warning was not raised, or some other warning was
raised, `check_warnings()` would raise an error.

When a test needs to look more deeply into the warnings, rather than
just checking whether or not they occurred, code like this can be used:

```
with check_warnings(quiet=True) as w:
    warnings.warn("foo")
    assert str(w.message) == "foo"
    warnings.warn("bar")
    assert str(w.message) == "bar"
    assert str(w.warnings[0].message) == "foo"
    assert str(w.warnings[1].message) == "bar"
    w.reset()
    assert len(w.warnings) == 0
```

Here all warnings will be caught, and the test code tests the captured
warnings directly.

> *Changed in version 3.2.*
> New optional arguments *filters* and *quiet*.

### class `WarningsRecorder(warnings_list)`

Class used to record warnings for unit tests. Wraps the warnings list
returned by `warnings.catch_warnings()` when recording is enabled.
`check_warnings()` returns an instance of this class.

As a convenience, the attributes of the object representing the most recent
warning can also be accessed directly through the recorder object.
If no warning has been raised since the recorder was created or last reset,
these attributes return `None`.

### `warnings`

A list of warnings recorded since the recorder was created or last reset.

### `reset()`

Discard previously recorded warnings from the recorder's view.
The underlying warnings list is not modified.
