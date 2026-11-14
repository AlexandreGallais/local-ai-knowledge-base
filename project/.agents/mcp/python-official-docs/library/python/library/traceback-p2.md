---
title: "traceback --- Print or retrieve a stack traceback (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/traceback.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# traceback --- Print or retrieve a stack traceback (part 2 of 2)

## `StackSummary` Objects

> *Added in version 3.5.*

`StackSummary` objects represent a call stack ready for formatting.

### classmethod `extract(frame_gen, *, limit=None, lookup_lines=True, capture_locals=False)`

Construct a `StackSummary` object from a frame generator (such as
is returned by `walk_stack()` or
`walk_tb()`).

If *limit* is supplied, only this many frames are taken from *frame_gen*.
If *lookup_lines* is `False`, the returned `FrameSummary`
objects will not have read their lines in yet, making the cost of
creating the `StackSummary` cheaper (which may be valuable if it
may not actually get formatted). If *capture_locals* is `True` the
local variables in each `FrameSummary` are captured as object
representations.

> *Changed in version 3.12.*
> Exceptions raised from `repr()` on a local variable (when
> *capture_locals* is `True`) are no longer propagated to the caller.

### classmethod `from_list(a_list)`

Construct a `StackSummary` object from a supplied list of
`FrameSummary` objects or old-style list of tuples.  Each tuple
should be a 4-tuple with *filename*, *lineno*, *name*, *line* as the
elements.

### `format()`

Returns a list of strings ready for printing.  Each string in the
resulting list corresponds to a single frame from
the stack.
Each string ends in a newline; the strings may contain internal
newlines as well, for those items with source text lines.

For long sequences of the same frame and line, the first few
repetitions are shown, followed by a summary line stating the exact
number of further repetitions.

> *Changed in version 3.6.*
> Long sequences of repeated frames are now abbreviated.

### `format_frame_summary(frame_summary)`

Returns a string for printing one of the frames
involved in the stack.
This method is called for each `FrameSummary` object to be
printed by `StackSummary.format()`. If it returns `None`, the
frame is omitted from the output.

> *Added in version 3.11.*

## `FrameSummary` Objects

> *Added in version 3.5.*

A `FrameSummary` object represents a single frame
in a traceback.

### class `FrameSummary(filename, lineno, name, *,\`

```python
lookup_line=True, locals=None,\
line=None, end_lineno=None, colno=None, end_colno=None)
```

Represents a single frame in the
traceback or stack that is being formatted
or printed. It may optionally have a stringified version of the frame's
locals included in it. If *lookup_line* is `False`, the source code is not
looked up until the `FrameSummary` has the `line`
attribute accessed (which also happens when casting it to a `tuple`).
`line` may be directly provided, and will prevent line
lookups happening at all. *locals* is an optional local variable
mapping, and if supplied the variable representations are stored in the
summary for later display.

`FrameSummary` instances have the following attributes:

### `FrameSummary.filename`

The filename of the source code for this frame. Equivalent to accessing
`f.f_code.co_filename` on a
frame object *f*.

### `FrameSummary.lineno`

The line number of the source code for this frame.

### `FrameSummary.name`

Equivalent to accessing `f.f_code.co_name` on
a frame object *f*.

### `FrameSummary.line`

A string representing the source code for this frame, with leading and
trailing whitespace stripped.
If the source is not available, it is `None`.

### `FrameSummary.end_lineno`

The last line number of the source code for this frame.
By default, it is set to `lineno` and indexation starts from 1.

> *Changed in version 3.13.*
> The default value changed from `None` to `lineno`.

### `FrameSummary.colno`

The column number of the source code for this frame.
By default, it is `None` and indexation starts from 0.

### `FrameSummary.end_colno`

The last column number of the source code for this frame.
By default, it is `None` and indexation starts from 0.

## Examples of Using the Module-Level Functions

This simple example implements a basic <example-value> loop, similar to (but
less useful than) the standard Python interactive interpreter loop.  For a more
complete implementation of the interpreter loop, refer to the `code`
module.:

```
import sys, traceback

def run_user_code(envdir):
    source = input(">>> ")
    try:
        exec(source, envdir)
    except Exception:
        print("Exception in user code:")
        print("-"*60)
        traceback.print_exc(file=sys.stdout)
        print("-"*60)

envdir = {}
while True:
    run_user_code(envdir)
```

The following example demonstrates the different ways to print and format the
exception and traceback:

```python

import sys, traceback

def lumberjack():
    bright_side_of_life()

def bright_side_of_life():
    return tuple()[0]

try:
    lumberjack()
except IndexError as exc:
    print("*** print_tb:")
    traceback.print_tb(exc.__traceback__, limit=1, file=sys.stdout)
    print("*** print_exception:")
    traceback.print_exception(exc, limit=2, file=sys.stdout)
    print("*** print_exc:")
    traceback.print_exc(limit=2, file=sys.stdout)
    print("*** format_exc, first and last line:")
    formatted_lines = traceback.format_exc().splitlines()
    print(formatted_lines[0])
    print(formatted_lines[-1])
    print("*** format_exception:")
    print(repr(traceback.format_exception(exc)))
    print("*** extract_tb:")
    print(repr(traceback.extract_tb(exc.__traceback__)))
    print("*** format_tb:")
    print(repr(traceback.format_tb(exc.__traceback__)))
    print("*** tb_lineno:", exc.__traceback__.tb_lineno)
```

The output for the example would look similar to this:

```python

*** print_tb:
  File "<doctest...>", line 10, in <module>
    lumberjack()
    ~~~~~~~~~~^^
*** print_exception:
Traceback (most recent call last):
  File "<doctest...>", line 10, in <module>
    lumberjack()
    ~~~~~~~~~~^^
  File "<doctest...>", line 4, in lumberjack
    bright_side_of_life()
    ~~~~~~~~~~~~~~~~~~~^^
IndexError: tuple index out of range
*** print_exc:
Traceback (most recent call last):
  File "<doctest...>", line 10, in <module>
    lumberjack()
    ~~~~~~~~~~^^
  File "<doctest...>", line 4, in lumberjack
    bright_side_of_life()
    ~~~~~~~~~~~~~~~~~~~^^
IndexError: tuple index out of range
*** format_exc, first and last line:
Traceback (most recent call last):
IndexError: tuple index out of range
*** format_exception:
['Traceback (most recent call last):\n',
 '  File "<doctest default[0]>", line 10, in <module>\n    lumberjack()\n    ~~~~~~~~~~^^\n',
 '  File "<doctest default[0]>", line 4, in lumberjack\n    bright_side_of_life()\n    ~~~~~~~~~~~~~~~~~~~^^\n',
 '  File "<doctest default[0]>", line 7, in bright_side_of_life\n    return tuple()[0]\n           ~~~~~~~^^^\n',
 'IndexError: tuple index out of range\n']
*** extract_tb:
[<FrameSummary file <doctest...>, line 10 in <module>>,
 <FrameSummary file <doctest...>, line 4 in lumberjack>,
 <FrameSummary file <doctest...>, line 7 in bright_side_of_life>]
*** format_tb:
['  File "<doctest default[0]>", line 10, in <module>\n    lumberjack()\n    ~~~~~~~~~~^^\n',
 '  File "<doctest default[0]>", line 4, in lumberjack\n    bright_side_of_life()\n    ~~~~~~~~~~~~~~~~~~~^^\n',
 '  File "<doctest default[0]>", line 7, in bright_side_of_life\n    return tuple()[0]\n           ~~~~~~~^^^\n']
*** tb_lineno: 10
```

The following example shows the different ways to print and format the stack:

```
>>> import traceback
>>> def another_function():
...     lumberstack()
...
>>> def lumberstack():
...     traceback.print_stack()
...     print(repr(traceback.extract_stack()))
...     print(repr(traceback.format_stack()))
...
>>> another_function()
  File "<doctest>", line 10, in <module>
    another_function()
  File "<doctest>", line 3, in another_function
    lumberstack()
  File "<doctest>", line 6, in lumberstack
    traceback.print_stack()
[('<doctest>', 10, '<module>', 'another_function()'),
 ('<doctest>', 3, 'another_function', 'lumberstack()'),
 ('<doctest>', 7, 'lumberstack', 'print(repr(traceback.extract_stack()))')]
['  File "<doctest>", line 10, in <module>\n    another_function()\n',
 '  File "<doctest>", line 3, in another_function\n    lumberstack()\n',
 '  File "<doctest>", line 8, in lumberstack\n    print(repr(traceback.format_stack()))\n']
```

This last example demonstrates the final few formatting functions:

```python

>>> import traceback
>>> traceback.format_list([('spam.py', 3, '<module>', 'spam.eggs()'),
...                        ('eggs.py', 42, 'eggs', 'return "bacon"')])
['  File "spam.py", line 3, in <module>\n    spam.eggs()\n',
 '  File "eggs.py", line 42, in eggs\n    return "bacon"\n']
>>> an_error = IndexError('tuple index out of range')
>>> traceback.format_exception_only(an_error)
['IndexError: tuple index out of range\n']
```

## Examples of Using `TracebackException`

With the helper class, we have more options:

```
>>> import sys
>>> from traceback import TracebackException
>>>
>>> def lumberjack():
...     bright_side_of_life()
...
>>> def bright_side_of_life():
...     t = "bright", "side", "of", "life"
...     return t[5]
...
>>> try:
...     lumberjack()
... except IndexError as e:
...     exc = e
...
>>> try:
...     try:
...         lumberjack()
...     except:
...         1/0
... except Exception as e:
...     chained_exc = e
...
>>> # limit works as with the module-level functions
>>> TracebackException.from_exception(exc, limit=-2).print()
Traceback (most recent call last):
  File "<python-input-1>", line 6, in lumberjack
    bright_side_of_life()
    ~~~~~~~~~~~~~~~~~~~^^
  File "<python-input-1>", line 10, in bright_side_of_life
    return t[5]
           ~^^^
IndexError: tuple index out of range

>>> # capture_locals adds local variables in frames
>>> TracebackException.from_exception(exc, limit=-2, capture_locals=True).print()
Traceback (most recent call last):
  File "<python-input-1>", line 6, in lumberjack
    bright_side_of_life()
    ~~~~~~~~~~~~~~~~~~~^^
  File "<python-input-1>", line 10, in bright_side_of_life
    return t[5]
           ~^^^
    t = ("bright", "side", "of", "life")
IndexError: tuple index out of range

>>> # The *chain* kwarg to print() controls whether chained
>>> # exceptions are displayed
>>> TracebackException.from_exception(chained_exc).print()
Traceback (most recent call last):
  File "<python-input-19>", line 4, in <module>
    lumberjack()
    ~~~~~~~~~~^^
  File "<python-input-8>", line 7, in lumberjack
    bright_side_of_life()
    ~~~~~~~~~~~~~~~~~~~^^
  File "<python-input-8>", line 11, in bright_side_of_life
    return t[5]
           ~^^^
IndexError: tuple index out of range

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "<python-input-19>", line 6, in <module>
    1/0
    ~^~
ZeroDivisionError: division by zero

>>> TracebackException.from_exception(chained_exc).print(chain=False)
Traceback (most recent call last):
  File "<python-input-19>", line 6, in <module>
    1/0
    ~^~
ZeroDivisionError: division by zero
```
