---
title: "traceback --- Print or retrieve a stack traceback (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/traceback.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `traceback` --- Print or retrieve a stack traceback

Module `traceback`.

**Source code:** Lib/traceback.py

This module provides a standard interface to extract, format and print
stack traces of Python programs. It is more flexible than the
interpreter's default traceback display, and therefore makes it
possible to configure certain aspects of the output. Finally,
it contains a utility for capturing enough information about an
exception to print it later, without the need to save a reference
to the actual exception. Since exceptions can be the roots of large
objects graph, this utility can significantly improve
memory management.

The module uses traceback objects --- these are
objects of type `types.TracebackType`,
which are assigned to the `__traceback__` field of
`BaseException` instances.

> **See also:** Module `faulthandler`
> Used to dump Python tracebacks explicitly, on a fault, after a timeout, or on a user signal.
>
> Module `pdb`
> Interactive source code debugger for Python programs.

The module's API can be divided into two parts:

- Module-level functions offering basic <example-value>, which are useful for interactive
inspection of exceptions and tracebacks.

- `TracebackException` class and its helper classes
`StackSummary` and `FrameSummary`. These offer both more
flexibility in the output generated and the ability to store the information
necessary for later formatting without holding references to actual exception
and traceback objects.

## Module-Level Functions

### `print_tb(tb, limit=None, file=None)`

Print up to *limit* stack trace entries from
traceback object *tb* (starting
from the caller's frame) if *limit* is positive.  Otherwise, print the last
`abs(limit)` entries.  If *limit* is omitted or `None`, all entries are
printed.  If *file* is omitted or `None`, the output goes to
`sys.stderr`; otherwise it should be an open
file or file-like object to
receive the output.

> **Note:** The meaning of the *limit* parameter is different than the meaning
> of `sys.tracebacklimit`. A negative *limit* value corresponds to
> a positive value of `sys.tracebacklimit`, whereas the behaviour of
> a positive *limit* value cannot be achieved with
> `sys.tracebacklimit`.

> *Changed in version 3.5.*
> Added negative *limit* support.

### `print_exception(exc, /[, value, tb], limit=None, \`

```python
file=None, chain=True)
```

Print exception information and stack trace entries from
traceback object
*tb* to *file*. This differs from `print_tb()` in the following
ways:

- if *tb* is not `None`, it prints a header ``Traceback (most recent
call last):``

- it prints the exception type and *value* after the stack trace

- if *type(value)* is `SyntaxError` and *value* has the appropriate
format, it prints the line where the syntax error occurred with a caret
indicating the approximate position of the error.

Since Python 3.10, instead of passing *value* and *tb*, an exception object
can be passed as the first argument. If *value* and *tb* are provided, the
first argument is ignored in order to provide backwards compatibility.

The optional *limit* argument has the same meaning as for `print_tb()`.
If *chain* is true (the default), then chained exceptions (the
`__cause__ or context__`
attributes of the exception) will be
printed as well, like the interpreter itself does when printing an unhandled
exception.

> *Changed in version 3.5.*
> The *etype* argument is ignored and inferred from the type of *value*.

> *Changed in version 3.10.*
> The *etype* parameter has been renamed to *exc* and is now
> positional-only.

### `print_exc(limit=None, file=None, chain=True)`

This is a shorthand for ``print_exception(sys.exception(), limit=limit, file=file,
chain=chain)``.

### `print_last(limit=None, file=None, chain=True)`

This is a shorthand for ``print_exception(sys.last_exc, limit=limit, file=file,
chain=chain)``.  In general it will work only after an exception has reached
an interactive prompt (see `sys.last_exc`).

### `print_stack(f=None, limit=None, file=None)`

Print up to *limit* stack trace entries (starting from the invocation
point) if *limit* is positive.  Otherwise, print the last `abs(limit)`
entries.  If *limit* is omitted or `None`, all entries are printed.
The optional *f* argument can be used to specify an alternate
stack frame
to start.  The optional *file* argument has the same meaning as for
`print_tb()`.

> *Changed in version 3.5.*
> Added negative *limit* support.

### `extract_tb(tb, limit=None)`

Return a `StackSummary` object representing a list of "pre-processed"
stack trace entries extracted from the
traceback object *tb*.  It is useful
for alternate formatting of stack traces.  The optional *limit* argument has
the same meaning as for `print_tb()`.  A "pre-processed" stack trace
entry is a `FrameSummary` object with attributes representing the
information that is usually printed for a stack trace.

### `extract_stack(f=None, limit=None)`

Extract the raw traceback from the current
stack frame.  The return value has
the same format as for `extract_tb()`.  The optional *f* and *limit*
arguments have the same meaning as for `print_stack()`.

### `print_list(extracted_list, file=None)`

Print the list of tuples as returned by `extract_tb()` or
`extract_stack()` as a formatted stack trace to the given file.
If *file* is `None`, the output is written to `sys.stderr`.

### `format_list(extracted_list)`

Given a list of tuples or `FrameSummary` objects as returned by
`extract_tb()` or `extract_stack()`, return a list of strings ready
for printing.  Each string in the resulting list corresponds to the item with
the same index in the argument list.  Each string ends in a newline; the
strings may contain internal newlines as well, for those items whose source
text line is not `None`.

### `format_exception_only(exc, /[, value], *, show_group=False)`

Format the exception part of a traceback using an exception value such as
given by `sys.last_exc`.  The return value is a list of strings, each
ending in a newline.  The list contains the exception's message, which is
normally a single string; however, for `SyntaxError` exceptions, it
contains several lines that (when printed) display detailed information
about where the syntax error occurred. Following the message, the list
contains the exception's `notes`.

Since Python 3.10, instead of passing *value*, an exception object
can be passed as the first argument.  If *value* is provided, the first
argument is ignored in order to provide backwards compatibility.

When *show_group* is `True`, and the exception is an instance of
`BaseExceptionGroup`, the nested exceptions are included as
well, recursively, with indentation relative to their nesting depth.

> *Changed in version 3.10.*
> The *etype* parameter has been renamed to *exc* and is now
> positional-only.

> *Changed in version 3.11.*
> The returned list now includes any
> `notes` attached to the exception.

> *Changed in version 3.13.*
> *show_group* parameter was added.

### `format_exception(exc, /[, value, tb], limit=None, chain=True)`

Format a stack trace and the exception information.  The arguments  have the
same meaning as the corresponding arguments to `print_exception()`.  The
return value is a list of strings, each ending in a newline and some
containing internal newlines.  When these lines are concatenated and printed,
exactly the same text is printed as does `print_exception()`.

> *Changed in version 3.5.*
> The *etype* argument is ignored and inferred from the type of *value*.

> *Changed in version 3.10.*
> This function's behavior and signature were modified to match
> `print_exception()`.

### `format_exc(limit=None, chain=True)`

This is like `print_exc(limit)` but returns a string instead of printing to
a file.

### `format_tb(tb, limit=None)`

A shorthand for `format_list(extract_tb(tb, limit))`.

### `format_stack(f=None, limit=None)`

A shorthand for `format_list(extract_stack(f, limit))`.

### `clear_frames(tb)`

Clears the local variables of all the stack frames in a
traceback *tb*
by calling the `clear()` method of each
frame object.

> *Added in version 3.4.*

### `walk_stack(f)`

Walk a stack following `f.f_back` from the given frame,
yielding the frame
and line number for each frame. If *f* is `None`, the current stack is
used. This helper is used with `StackSummary.extract()`.

> *Added in version 3.5.*

> *Changed in version 3.14.*
> This function previously returned a generator that would walk the stack
> when first iterated over. The generator returned now is the state of the
> stack when `walk_stack` is called.

### `walk_tb(tb)`

Walk a traceback following `tb_next` yielding the frame and
line number
for each frame. This helper is used with `StackSummary.extract()`.

> *Added in version 3.5.*

## `TracebackException` Objects

> *Added in version 3.5.*

`TracebackException` objects are created from actual exceptions to
capture data for later printing.  They offer a more lightweight method of
storing this information by avoiding holding references to
traceback and frame objects.
In addition, they expose more options to configure the output compared to
the module-level functions described above.

### class `TracebackException(exc_type, exc_value, exc_traceback, *, limit=None, lookup_lines=True, capture_locals=False, compact=False, max_group_width=15, max_group_depth=10)`

Capture an exception for later rendering. The meaning of *limit*,
*lookup_lines* and *capture_locals* are as for the `StackSummary`
class.

If *compact* is true, only data that is required by
`TracebackException`'s `format()` method
is saved in the class attributes. In particular, the
`__context__ field is calculated only if cause__` is
`None` and `__suppress_context__` is false.

Note that when locals are captured, they are also shown in the traceback.

*max_group_width* and *max_group_depth* control the formatting of exception
groups (see `BaseExceptionGroup`). The depth refers to the nesting
level of the group, and the width refers to the size of a single exception
group's exceptions array. The formatted output is truncated when either
limit is exceeded.

> *Changed in version 3.10.*
> Added the *compact* parameter.

> *Changed in version 3.11.*
> Added the *max_group_width* and *max_group_depth* parameters.

### `__cause__`

A `TracebackException` of the original
`__cause__`.

### `__context__`

A `TracebackException` of the original
`__context__`.

### `exceptions`

If `self` represents an `ExceptionGroup`, this field holds a list of
`TracebackException` instances representing the nested exceptions.
Otherwise it is `None`.

> *Added in version 3.11.*

### `__suppress_context__`

The `__suppress_context__` value from the original
exception.

### `__notes__`

The `__notes__` value from the original exception,
or `None`
if the exception does not have any notes. If it is not `None`
is it formatted in the traceback after the exception string.

> *Added in version 3.11.*

### `stack`

A `StackSummary` representing the traceback.

### `exc_type`

The class of the original exception.

> *Deprecated since version 3.13.*

### `exc_type_str`

String display of the class of the original exception.

> *Added in version 3.13.*

### `filename`

For syntax errors - the file name where the error occurred.

### `lineno`

For syntax errors - the line number where the error occurred.

### `end_lineno`

For syntax errors - the end line number where the error occurred.
Can be `None` if not present.

> *Added in version 3.10.*

### `text`

For syntax errors - the text where the error occurred.

### `offset`

For syntax errors - the offset into the text where the error occurred.

### `end_offset`

For syntax errors - the end offset into the text where the error occurred.
Can be `None` if not present.

> *Added in version 3.10.*

### `msg`

For syntax errors - the compiler error message.

### classmethod `from_exception(exc, *, limit=None, lookup_lines=True, capture_locals=False, compact=False, max_group_width=15, max_group_depth=10)`

Capture an exception for later rendering. *limit*, *lookup_lines* and
*capture_locals* are as for the `StackSummary` class.

Note that when locals are captured, they are also shown in the traceback.

### `print(*, file=None, chain=True)`

Print to *file* (default `sys.stderr`) the exception information returned by
`format()`.

> *Added in version 3.11.*

### `format(*, chain=True)`

Format the exception.

If *chain* is not `True`, `__cause__ and context__`
will not be formatted.

The return value is a generator of strings, each ending in a newline and
some containing internal newlines. `print_exception()`
is a wrapper around this method which just prints the lines to a file.

### `format_exception_only(*, show_group=False)`

Format the exception part of the traceback.

The return value is a generator of strings, each ending in a newline.

When *show_group* is `False`, the generator emits the exception's
message followed by its notes (if it has any). The exception message
is normally a single string; however, for `SyntaxError` exceptions,
it consists of several lines that (when printed) display detailed
information about where the syntax error occurred.

When *show_group* is `True`, and the exception is an instance of
`BaseExceptionGroup`, the nested exceptions are included as
well, recursively, with indentation relative to their nesting depth.

> *Changed in version 3.11.*
> The exception's `notes` are now
> included in the output.

> *Changed in version 3.13.*
> Added the *show_group* parameter.
