---
title: "Data model (part 5 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/datamodel.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Data model (part 5 of 10)

### `codeobject.co_positions()`

Returns an iterable over the source code positions of each bytecode
instruction in the code object.

The iterator returns `tuple`\s containing the ``(start_line, end_line,
start_column, end_column)``. The *i-th* tuple corresponds to the
position of the source code that compiled to the *i-th* code unit.
Column information is 0-indexed utf-8 byte offsets on the given source
line.

This positional information can be missing. A non-exhaustive lists of
cases where this may happen:

- Running the interpreter with `-X` `no_debug_ranges`.
- Loading a pyc file compiled while using `-X` `no_debug_ranges`.
- Position tuples corresponding to artificial instructions.
- Line and column numbers that can't be represented due to
implementation specific limitations.

When this occurs, some or all of the tuple elements can be
`None`.

> *Added in version 3.11.*

> **Note:** This feature requires storing column positions in code objects which may
> result in a small increase of disk usage of compiled Python files or
> interpreter memory usage. To avoid storing the extra information and/or
> deactivate printing the extra traceback information, the
> `-X` `no_debug_ranges` command line flag or the `PYTHONNODEBUGRANGES`
> environment variable can be used.

### `codeobject.co_lines()`

Returns an iterator that yields information about successive ranges of
bytecode\s. Each item yielded is a `(start, end, lineno)`
`tuple`:

- `start` (an `int`) represents the offset (inclusive) of the start
of the bytecode range
- `end` (an `int`) represents the offset (exclusive) of the end of
the bytecode range
- `lineno` is an `int` representing the line number of the
bytecode range, or `None` if the bytecodes in the given range
have no line number

The items yielded will have the following properties:

- The first range yielded will have a `start` of 0.
- The `(start, end)` ranges will be non-decreasing and consecutive. That
is, for any pair of `tuple`\s, the `start` of the second will be
equal to the `end` of the first.
- No range will be backwards: `end >= start` for all triples.
- The last `tuple` yielded will have `end` equal to the size of the
bytecode.

Zero-width ranges, where `start == end`, are allowed. Zero-width ranges
are used for lines that are present in the source code, but have been
eliminated by the bytecode compiler.

> *Added in version 3.10.*

> **See also:** PEP 626 - Precise line numbers for debugging and other tools.
> The PEP that introduced the `co_lines()` method.

### `codeobject.replace(**kwargs)`

Return a copy of the code object with new values for the specified fields.

Code objects are also supported by the generic function `copy.replace()`.

> *Added in version 3.8.*

#### Frame objects

Frame objects represent execution frames.  They may occur in
traceback objects,
and are also passed to registered trace functions.

##### Special read-only attributes

- - .. attribute:: frame.f_back
- Points to the previous stack frame (towards the caller),
or `None` if this is the bottom stack frame

- - .. attribute:: frame.f_code
- The code object being executed in this frame.
Accessing this attribute raises an auditing event
`object.__getattr__` with arguments `obj` and `"f_code"`.

- - .. attribute:: frame.f_locals
- The mapping used by the frame to look up
local variables.
If the frame refers to an optimized scope,
this may return a write-through proxy object.

> *Changed in version 3.13.*
> Return a proxy for optimized scopes.

- - .. attribute:: frame.f_globals
- The dictionary used by the frame to look up
global variables

- - .. attribute:: frame.f_builtins
- The dictionary used by the frame to look up
built-in (intrinsic) names

- - .. attribute:: frame.f_lasti
- The "precise instruction" of the frame object
(this is an index into the bytecode string of the
code object)

- - .. attribute:: frame.f_generator
- The generator or coroutine object that owns this frame,
or `None` if the frame is a normal function.

> *Added in version 3.14.*

##### Special writable attributes

- - .. attribute:: frame.f_trace
- If not `None`, this is a function called for various events during
code execution (this is used by debuggers). Normally an event is
triggered for each new source line (see `f_trace_lines`).

- - .. attribute:: frame.f_trace_lines
- Set this attribute to `False` to disable triggering a tracing
event for each source line.

- - .. attribute:: frame.f_trace_opcodes
- Set this attribute to `True` to allow per-opcode events to be
requested. Note that this may lead to
undefined interpreter behaviour if exceptions raised by the trace
function escape to the function being traced.

- - .. attribute:: frame.f_lineno
- The current line number of the frame -- writing to this
from within a trace function jumps to the given line (only for the bottom-most
frame).  A debugger can implement a Jump command (aka Set Next Statement)
by writing to this attribute.

##### Frame object methods

Frame objects support one method:

### `frame.clear()`

This method clears all references to local variables held by the
frame.  Also, if the frame belonged to a generator, the generator
is finalized.  This helps break reference cycles involving frame
objects (for example when catching an exception
and storing its traceback for later use).

`RuntimeError` is raised if the frame is currently executing
or suspended.

> *Added in version 3.4.*

> *Changed in version 3.13.*
> Attempting to clear a suspended frame raises `RuntimeError`
> (as has always been the case for executing frames).

#### Traceback objects

Traceback objects represent the stack trace of an exception.
A traceback object
is implicitly created when an exception occurs, and may also be explicitly
created by calling `types.TracebackType`.

> *Changed in version 3.7.*
> Traceback objects can now be explicitly instantiated from Python code.

For implicitly created tracebacks, when the search for an exception handler
unwinds the execution stack, at each unwound level a traceback object is
inserted in front of the current traceback.  When an exception handler is
entered, the stack trace is made available to the program. (See section
try.) It is accessible as the third item of the
tuple returned by `sys.exc_info()`, and as the
`__traceback__` attribute
of the caught exception.

When the program contains no suitable
handler, the stack trace is written (nicely formatted) to the standard error
stream; if the interpreter is interactive, it is also made available to the user
as `sys.last_traceback`.

For explicitly created tracebacks, it is up to the creator of the traceback
to determine how the `tb_next` attributes should be linked to
form a full stack trace.

Special read-only attributes:

- - .. attribute:: traceback.tb_frame
- Points to the execution frame of the current
level.

Accessing this attribute raises an
auditing event `object.__getattr__` with arguments
`obj` and `"tb_frame"`.

- - .. attribute:: traceback.tb_lineno
- Gives the line number where the exception occurred

- - .. attribute:: traceback.tb_lasti
- Indicates the "precise instruction".

The line number and last instruction in the traceback may differ from the
line number of its frame object if the exception
occurred in a
`try` statement with no matching except clause or with a
`finally` clause.

### `traceback.tb_next`

The special writable attribute `tb_next` is the next level in the
stack trace (towards the frame where the exception occurred), or `None` if
there is no next level.

> *Changed in version 3.7.*
> This attribute is now writable

#### Slice objects

Slice objects are used to represent slices for
`__getitem__()`
methods.  They are also created by the built-in `slice()` function.

> *Added in version 3.15.*
> The `slice()` type now supports subscription. For
> example, `slice[float]` may be used in type annotations to indicate a slice
> containing `float` objects.

Special read-only attributes: `start` is the lower bound;
`stop` is the upper bound; `step` is the step
value; each is `None` if omitted.  These attributes can have any type.

Slice objects support one method:

### `slice.indices(self, length)`

This method takes a single integer argument *length* and computes
information about the slice that the slice object would describe if
applied to a sequence of *length* items.  It returns a tuple of three
integers; respectively these are the *start* and *stop* indices and the
*step* or stride length of the slice. Missing or out-of-bounds indices
are handled in a manner consistent with regular slices.

#### Static method objects

Static method objects provide a way of defeating the transformation of function
objects to method objects described above. A static method object is a wrapper
around any other object, usually a user-defined method object. When a static
method object is retrieved from a class or a class instance, the object actually
returned is the wrapped object, which is not subject to any further
transformation. Static method objects are also callable. Static method
objects are created by the built-in `staticmethod()` constructor.

#### Class method objects

A class method object, like a static method object, is a wrapper around another
object that alters the way in which that object is retrieved from classes and
class instances. The behaviour of class method objects upon such retrieval is
described above, under "instance methods". Class method objects are created
by the built-in `classmethod()` constructor.
