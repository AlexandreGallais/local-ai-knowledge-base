---
title: "warnings --- Warning control (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/warnings.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# warnings --- Warning control (part 2 of 3)

## Temporarily Suppressing Warnings

If you are using code that you know will raise a warning, such as a deprecated
function, but do not want to see the warning (even when warnings have been
explicitly configured via the command line), then it is possible to suppress
the warning using the `catch_warnings` context manager:

```
import warnings

def fxn():
    warnings.warn("deprecated", DeprecationWarning)

with warnings.catch_warnings():
    warnings.simplefilter("ignore")
    fxn()
```

While within the context manager all warnings will simply be ignored. This
allows you to use known-deprecated code without having to see the warning while
not suppressing the warning for other code that might not be aware of its use
of deprecated code.

> **Note:** See warning-concurrent-safe for details on the
> concurrency-safety of the `catch_warnings` context manager when
> used in programs using multiple threads or async functions.

## Testing Warnings

To test warnings raised by code, use the `catch_warnings` context
manager. With it you can temporarily mutate the warnings filter to facilitate
your testing. For instance, do the following to capture all raised warnings to
check:

```
import warnings

def fxn():
    warnings.warn("deprecated", DeprecationWarning)

with warnings.catch_warnings(record=True) as w:
    # Cause all warnings to always be triggered.
    warnings.simplefilter("always")
    # Trigger a warning.
    fxn()
    # Verify some things
    assert len(w) == 1
    assert issubclass(w[-1].category, DeprecationWarning)
    assert "deprecated" in str(w[-1].message)
```

One can also cause all warnings to be exceptions by using `error` instead of
`always`. One thing to be aware of is that if a warning has already been
raised because of a `once`/`default` rule, then no matter what filters are
set the warning will not be seen again unless the warnings registry related to
the warning has been cleared.

Once the context manager exits, the warnings filter is restored to its state
when the context was entered. This prevents tests from changing the warnings
filter in unexpected ways between tests and leading to indeterminate test
results.

> **Note:** See warning-concurrent-safe for details on the
> concurrency-safety of the `catch_warnings` context manager when
> used in programs using multiple threads or async functions.

When testing multiple operations that raise the same kind of warning, it
is important to test them in a manner that confirms each operation is raising
a new warning (e.g. set warnings to be raised as exceptions and check the
operations raise exceptions, check that the length of the warning list
continues to increase after each operation, or else delete the previous
entries from the warnings list before each new operation).

## Updating Code For New Versions of Dependencies

Warning categories that are primarily of interest to Python developers (rather
than end users of applications written in Python) are ignored by default.

Notably, this "ignored by default" list includes `DeprecationWarning`
(for every module except `__main__`), which means developers should make sure
to test their code with typically ignored warnings made visible in order to
receive timely notifications of future breaking API changes (whether in the
standard library or third party packages).

In the ideal case, the code will have a suitable test suite, and the test runner
will take care of implicitly enabling all warnings when running tests
(the test runner provided by the `unittest` module does this).

In less ideal cases, applications can be checked for use of deprecated
interfaces by passing `-Wd` to the Python interpreter (this is
shorthand for `-W default`) or setting `PYTHONWARNINGS=default` in
the environment. This enables default handling for all warnings, including those
that are ignored by default. To change what action is taken for encountered
warnings you can change what argument is passed to `-W` (e.g.
`-W error`). See the `-W` flag for more details on what is
possible.

## Available Functions

### `warn(message, category=None, stacklevel=1, source=None, *, skip_file_prefixes=())`

Issue a warning, or maybe ignore it or raise an exception.  The *category*
argument, if given, must be a warning category class; it
defaults to `UserWarning`.  Alternatively, *message* can be a `Warning` instance,
in which case *category* will be ignored and `message.__class__` will be used.
In this case, the message text will be `str(message)`. This function raises an
exception if the particular warning issued is changed into an error by the
warnings filter.  The *stacklevel* argument can be used by wrapper
functions written in Python, like this:

```
def deprecated_api(message):
    warnings.warn(message, DeprecationWarning, stacklevel=2)
```

This makes the warning refer to `deprecated_api`'s caller, rather than to
the source of `deprecated_api` itself (since the latter would defeat the
purpose of the warning message).

The *skip_file_prefixes* keyword argument can be used to indicate which
stack frames are ignored when counting stack levels. This can be useful when
you want the warning to always appear at call sites outside of a package
when a constant *stacklevel* does not fit all call paths or is otherwise
challenging to maintain. If supplied, it must be a tuple of strings. When
prefixes are supplied, stacklevel is implicitly overridden to be ``max(2,
stacklevel)``. To cause a warning to be attributed to the caller from
outside of the current package you might write:

```
# example/lower.py
_warn_skips = (os.path.dirname(__file__),)

def one_way(r_luxury_yacht=None, t_wobbler_mangrove=None):
    if r_luxury_yacht:
        warnings.warn("Please migrate to t_wobbler_mangrove=.",
                      skip_file_prefixes=_warn_skips)

# example/higher.py
from . import lower

def another_way(**kw):
    lower.one_way(**kw)
```

This makes the warning refer to both the `example.lower.one_way()` and
`example.higher.another_way()` call sites only from calling code living
outside of `example` package.

*source*, if supplied, is the destroyed object which emitted a
`ResourceWarning`.

> *Changed in version 3.6.*
> Added *source* parameter.

> *Changed in version 3.12.*
> Added *skip_file_prefixes*.

### `warn_explicit(message, category, filename, lineno, module=None, registry=None, module_globals=None, source=None)`

This is a low-level interface to the functionality of `warn()`, passing in
explicitly the message, category, filename and line number, and optionally
other arguments.
*message* must be a string and *category* a subclass of `Warning` or
*message* may be a `Warning` instance, in which case *category* will be
ignored.

*module*, if supplied, should be the module name.
If no module is passed, the module regular expression in
warnings filter will be tested against the module
names constructed from the path components starting from all parent
directories (with `/__init__.py`, `.py` and, on Windows, `.pyw`
stripped) and against the filename with `.py` stripped.
For example, when the filename is `'/path/to/package/module.py'`, it will
be tested against  `'path.to.package.module'`, `'to.package.module'`
`'package.module'`, `'module'`, and `'/path/to/package/module'`.

*registry*, if supplied, should be the `__warningregistry__` dictionary
of the module.
If no registry is passed, each warning is treated as the first occurrence,
that is, filter actions `"default"`, `"module"` and `"once"` are
handled as `"always"`.

*module_globals*, if supplied, should be the global namespace in use by the code
for which the warning is issued.  (This argument is used to support displaying
source for modules found in zipfiles or other non-filesystem import
sources).

*source*, if supplied, is the destroyed object which emitted a
`ResourceWarning`.

> *Changed in version 3.6.*
> Add the *source* parameter.

> *Changed in version 3.15.*
> If no module is passed, test the filter regular expression against
> module names created from the path, not only the path itself.

### `showwarning(message, category, filename, lineno, file=None, line=None)`

Write a warning to a file.  The default implementation calls
`formatwarning(message, category, filename, lineno, line)` and writes the
resulting string to *file*, which defaults to `sys.stderr`.  You may replace
this function with any callable by assigning to `warnings.showwarning`.
*line* is a line of source code to be included in the warning
message; if *line* is not supplied, `showwarning()` will
try to read the line specified by *filename* and *lineno*.

### `formatwarning(message, category, filename, lineno, line=None)`

Format a warning the standard way.  This returns a string which may contain
embedded newlines and ends in a newline.  *line* is a line of source code to
be included in the warning message; if *line* is not supplied,
`formatwarning()` will try to read the line specified by *filename* and
*lineno*.

### `filterwarnings(action, message='', category=Warning, module='', lineno=0, append=False)`

Insert an entry into the list of :ref:`warnings filter specifications
<warning-filter>`.  The entry is inserted at the front by default; if
*append* is true, it is inserted at the end.  This checks the types of the
arguments, compiles the *message* and *module* regular expressions, and
inserts them as a tuple in the list of warnings filters.  Entries closer to
the front of the list override entries later in the list, if both match a
particular warning.  Omitted arguments default to a value that matches
everything.

### `simplefilter(action, category=Warning, lineno=0, append=False)`

Insert a simple entry into the list of :ref:`warnings filter specifications
<warning-filter>`.  The meaning of the function parameters is as for
`filterwarnings()`, but regular expressions are not needed as the filter
inserted always matches any message in any module as long as the category and
line number match.

### `resetwarnings()`

Reset the warnings filter.  This discards the effect of all previous calls to
`filterwarnings()`, including that of the `-W` command line options
and calls to `simplefilter()`.

### decorator `deprecated(message, /, *, category=DeprecationWarning, stacklevel=1)`

Decorator to indicate that a class, function or overload is deprecated.

When this decorator is applied to an object,
deprecation warnings may be emitted at runtime when the object is used.
static type checkers
will also generate a diagnostic on usage of the deprecated object.

Usage:

```
from warnings import deprecated
from typing import overload

@deprecated("Use B instead")
class A:
    pass

@deprecated("Use g instead")
def f():
    pass

@overload
@deprecated("int support is deprecated")
def g(x: int) -> int: ...
@overload
def g(x: str) -> int: ...
```

The warning specified by *category* will be emitted at runtime
on use of deprecated objects. For functions, that happens on calls;
for classes, on instantiation and on creation of subclasses.
If the *category* is `None`, no warning is emitted at runtime.
The *stacklevel* determines where the
warning is emitted. If it is `1` (the default), the warning
is emitted at the direct caller of the deprecated object; if it
is higher, it is emitted further up the stack.
Static type checker behavior is not affected by the *category*
and *stacklevel* arguments.

The deprecation message passed to the decorator is saved in the
`__deprecated__` attribute on the decorated object.
If applied to an overload, the decorator
must be after the overload decorator
for the attribute to exist on the overload as returned by
`typing.get_overloads()`.

> *Added in version 3.13.*
> See PEP 702.

## Available Context Managers

### class `catch_warnings(*, record=False, module=None, action=None, category=Warning, lineno=0, append=False)`

A context manager that copies and, upon exit, restores the warnings filter
and the `showwarning()` function.
If the *record* argument is `False` (the default) the context manager
returns `None` on entry. If *record* is `True`, a list is
returned that is progressively populated with objects as seen by a custom
`showwarning()` function (which also suppresses output to `sys.stderr`).
Each object in the list is guaranteed to have the following attributes:

- `message`: the warning message (an instance of `Warning`)
- `category`: the warning category (a subclass of `Warning`)
- `filename`: the file name where the warning occurred (`str`)
- `lineno`: the line number in the file (`int`)
- `file`: the file object used for output (if any), or `None`
- `line`: the line of source code (if available), or `None`
- `source`: the original object that generated the warning (if
available), or `None`
- `module`: the module name where the warning occurred
(`str`), or `None`

> *Changed in version 3.6.*
> The `source` attribute was added.

> *Changed in version 3.15.*
> The `module` attribute was added.

The type of these objects is not specified and may change; only the
presence of these attributes is guaranteed.

The *module* argument takes a module that will be used instead of the
module returned when you import `warnings` whose filter will be
protected. This argument exists primarily for testing the `warnings`
module itself.

If the *action* argument is not `None`, the remaining arguments are
passed to `simplefilter()` as if it were called immediately on
entering the context.

See warning-filter for the meaning of the *category* and *lineno*
parameters.

> **Note:** See warning-concurrent-safe for details on the
> concurrency-safety of the `catch_warnings` context manager when
> used in programs using multiple threads or async functions.

> *Changed in version 3.11.*
> Added the *action*, *category*, *lineno*, and *append* parameters.
