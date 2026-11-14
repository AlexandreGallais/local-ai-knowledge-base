---
title: "inspect --- Inspect live objects (part 7 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/inspect.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# inspect --- Inspect live objects (part 7 of 8)

## Classes and functions

### `getclasstree(classes, unique=False)`

Arrange the given list of classes into a hierarchy of nested lists. Where a
nested list appears, it contains classes derived from the class whose entry
immediately precedes the list.  Each entry is a 2-tuple containing a class and a
tuple of its base classes.  If the *unique* argument is true, exactly one entry
appears in the returned structure for each class in the given list.  Otherwise,
classes using multiple inheritance and their descendants will appear multiple
times.

### `getfullargspec(func, *, annotation_format=Format.VALUE)`

Get the names and default values of a Python function's parameters.  A
named tuple is returned:

``FullArgSpec(args, varargs, varkw, defaults, kwonlyargs, kwonlydefaults,
annotations)``

*args* is a list of the positional parameter names.
*varargs* is the name of the `*` parameter or `None` if arbitrary
positional arguments are not accepted.
*varkw* is the name of the `**` parameter or `None` if arbitrary
keyword arguments are not accepted.
*defaults* is an *n*-tuple of default argument values corresponding to the
last *n* positional parameters, or `None` if there are no such defaults
defined.
*kwonlyargs* is a list of keyword-only parameter names in declaration order.
*kwonlydefaults* is a dictionary mapping parameter names from *kwonlyargs*
to the default values used if no argument is supplied.
*annotations* is a dictionary mapping parameter names to annotations.
The special key `"return"` is used to report the function return value
annotation (if any).

Note that `signature()` and
Signature Object provide the recommended
API for callable introspection, and support additional behaviours (like
positional-only arguments) that are sometimes encountered in extension module
APIs. This function is retained primarily for use in code that needs to
maintain compatibility with the Python 2 `inspect` module API.

A member of the
`annotationlib.Format` enum can be passed to the
*annotation_format* parameter to control the format of the returned
annotations. For example, use
`annotation_format=annotationlib.Format.STRING` to return annotations in string
format. Note that with the default `VALUE` format, creation of some argspecs
may raise an exception.

> *Changed in version 3.4.*
> This function is now based on `signature()`, but still ignores
> `__wrapped__` attributes and includes the already bound first
> parameter in the signature output for bound methods.

> *Changed in version 3.6.*
> This method was previously documented as deprecated in favour of
> `signature()` in Python 3.5, but that decision has been reversed
> in order to restore a clearly supported standard interface for
> single-source Python 2/3 code migrating away from the legacy
> `getargspec()` API.

> *Changed in version 3.7.*
> Python only explicitly guaranteed that it preserved the declaration
> order of keyword-only parameters as of version 3.7, although in practice
> this order had always been preserved in Python 3.

> *Changed in version 3.15.*
> The *annotation_format* parameter was added.

### `getargvalues(frame)`

Get information about arguments passed into a particular frame.  A
named tuple `ArgInfo(args, varargs, keywords, locals)` is
returned. *args* is a list of the argument names.  *varargs* and *keywords*
are the names of the `*` and `**` arguments or `None`.  *locals* is the
locals dictionary of the given frame.

> **Note:** This function was inadvertently marked as deprecated in Python 3.5.

### `formatargvalues(args[, varargs, varkw, locals, formatarg, formatvarargs, formatvarkw, formatvalue])`

Format a pretty argument spec from the four values returned by
`getargvalues()`.  The format* arguments are the corresponding optional
formatting functions that are called to turn names and values into strings.

> **Note:** This function was inadvertently marked as deprecated in Python 3.5.

### `getmro(cls)`

Return a tuple of class cls's base classes, including cls, in method resolution
order.  No class appears more than once in this tuple. Note that the method
resolution order depends on cls's type.  Unless a very peculiar user-defined
metatype is in use, cls will be the first element of the tuple.

### `getcallargs(func, /, *args, **kwds)`

Bind the *args* and *kwds* to the argument names of the Python function or
method *func*, as if it was called with them. For bound methods, bind also the
first argument (typically named `self`) to the associated instance. A dict
is returned, mapping the argument names (including the names of the `*` and
`**` arguments, if any) to their values from *args* and *kwds*. In case of
invoking *func* incorrectly, i.e. whenever `func(*args, **kwds)` would raise
an exception because of incompatible signature, an exception of the same type
and the same or similar message is raised. For example:

```python

>>> from inspect import getcallargs
>>> def f(a, b=1, *pos, **named):
...     pass
...
>>> getcallargs(f, 1, 2, 3) == {'a': 1, 'named': {}, 'b': 2, 'pos': (3,)}
True
>>> getcallargs(f, a=2, x=4) == {'a': 2, 'named': {'x': 4}, 'b': 1, 'pos': ()}
True
>>> getcallargs(f)
Traceback (most recent call last):
...
TypeError: f() missing 1 required positional argument: 'a'
```

> *Added in version 3.2.*

> *Deprecated since version 3.5.*
> Use `Signature.bind()` and `Signature.bind_partial()` instead.

### `getclosurevars(func)`

Get the mapping of external name references in a Python function or
method *func* to their current values. A
named tuple `ClosureVars(nonlocals, globals, builtins, unbound)`
is returned. *nonlocals* maps referenced names to lexical closure
variables, *globals* to the function's module globals and *builtins* to
the builtins visible from the function body. *unbound* is the set of names
referenced in the function that could not be resolved at all given the
current module globals and builtins.

`TypeError` is raised if *func* is not a Python function or method.

> *Added in version 3.3.*

### `unwrap(func, *, stop=None)`

Get the object wrapped by *func*. It follows the chain of `__wrapped__`
attributes returning the last object in the chain.

*stop* is an optional callback accepting an object in the wrapper chain
as its sole argument that allows the unwrapping to be terminated early if
the callback returns a true value. If the callback never returns a true
value, the last object in the chain is returned as usual. For example,
`signature()` uses this to stop unwrapping if any object in the
chain has a `__signature__` attribute defined.

`ValueError` is raised if a cycle is encountered.

> *Added in version 3.4.*

### `get_annotations(obj, *, globals=None, locals=None, eval_str=False, format=annotationlib.Format.VALUE)`

Compute the annotations dict for an object.

This is an alias for `annotationlib.get_annotations()`; see the documentation
of that function for more information.

> **Caution:** This function may execute arbitrary code contained in annotations.
> See annotationlib-security for more information.

> *Added in version 3.10.*

> *Changed in version 3.14.*
> This function is now an alias for `annotationlib.get_annotations()`.
> Calling it as `inspect.get_annotations` will continue to work.

## The interpreter stack

Some of the following functions return
`FrameInfo` objects. For backwards compatibility these objects allow
tuple-like operations on all attributes except `positions`. This behavior
is considered deprecated and may be removed in the future.

### `frame`

The frame object that the record corresponds to.

### `filename`

The file name associated with the code being executed by the frame this record
corresponds to.

### `lineno`

The line number of the current line associated with the code being
executed by the frame this record corresponds to.

### `function`

The function name that is being executed by the frame this record corresponds to.

### `code_context`

A list of lines of context from the source code that's being executed by the frame
this record corresponds to.

### `index`

The index of the current line being executed in the `code_context` list.

### `positions`

A `dis.Positions` object containing the start line number, end line
number, start column offset, and end column offset associated with the
instruction being executed by the frame this record corresponds to.

> *Changed in version 3.5.*
> Return a named tuple instead of a `tuple`.

> *Changed in version 3.11.*
> `FrameInfo` is now a class instance
> (that is backwards compatible with the previous named tuple).

### `filename`

The file name associated with the code being executed by the frame this traceback
corresponds to.

### `lineno`

The line number of the current line associated with the code being
executed by the frame this traceback corresponds to.

### `function`

The function name that is being executed by the frame this traceback corresponds to.

### `code_context`

A list of lines of context from the source code that's being executed by the frame
this traceback corresponds to.

### `index`

The index of the current line being executed in the `code_context` list.

### `positions`

A `dis.Positions` object containing the start line number, end
line number, start column offset, and end column offset associated with
the instruction being executed by the frame this traceback corresponds
to.

> *Changed in version 3.11.*
> `Traceback` is now a class instance
> (that is backwards compatible with the previous named tuple).

> **Note:** Keeping references to frame objects, as found in the first element of the frame
> records these functions return, can cause your program to create reference
> cycles.  Once a reference cycle has been created, the lifespan of all objects
> which can be accessed from the objects which form the cycle can become much
> longer even if Python's optional cycle detector is enabled.  If such cycles must
> be created, it is important to ensure they are explicitly broken to avoid the
> delayed destruction of objects and increased memory consumption which occurs.
>
> Though the cycle detector will catch these, destruction of the frames (and local
> variables) can be made deterministic by removing the cycle in a
> `finally` clause.  This is also important if the cycle detector was
> disabled when Python was compiled or using `gc.disable()`.  For example:
>
>
> ```
> def handle_stackframe_without_leak():
>     frame = inspect.currentframe()
>     try:
>         # do something with the frame
>     finally:
>         del frame
> ```
>
>
> If you want to keep the frame around (for example to print a traceback
> later), you can also break reference cycles by using the
> `frame.clear()` method.

The optional *context* argument supported by most of these functions specifies
the number of lines of context to return, which are centered around the current
line.

### `getframeinfo(frame, context=1)`

Get information about a frame or traceback object.  A `Traceback` object
is returned.

> *Changed in version 3.11.*
> A `Traceback` object is returned instead of a named tuple.

### `getouterframes(frame, context=1)`

Get a list of `FrameInfo` objects for a frame and all outer frames.
These frames represent the calls that lead to the creation of *frame*. The
first entry in the returned list represents *frame*; the last entry
represents the outermost call on *frame*'s stack.

> *Changed in version 3.5.*
> A list of named tuples
> `FrameInfo(frame, filename, lineno, function, code_context, index)`
> is returned.

> *Changed in version 3.11.*
> A list of `FrameInfo` objects is returned.

### `getinnerframes(traceback, context=1)`

Get a list of `FrameInfo` objects for a traceback's frame and all
inner frames.  These frames represent calls made as a consequence of *frame*.
The first entry in the list represents *traceback*; the last entry represents
where the exception was raised.

> *Changed in version 3.5.*
> A list of named tuples
> `FrameInfo(frame, filename, lineno, function, code_context, index)`
> is returned.

> *Changed in version 3.11.*
> A list of `FrameInfo` objects is returned.

### `currentframe()`

Return the frame object for the caller's stack frame.

> **CPython implementation detail:** This function relies on Python stack frame support in the interpreter,
> which isn't guaranteed to exist in all implementations of Python.  If
> running in an implementation without Python stack frame support this
> function returns `None`.

### `stack(context=1)`

Return a list of `FrameInfo` objects for the caller's stack.  The
first entry in the returned list represents the caller; the last entry
represents the outermost call on the stack.

> *Changed in version 3.5.*
> A list of named tuples
> `FrameInfo(frame, filename, lineno, function, code_context, index)`
> is returned.

> *Changed in version 3.11.*
> A list of `FrameInfo` objects is returned.

### `trace(context=1)`

Return a list of `FrameInfo` objects for the stack between the current
frame and the frame in which an exception currently being handled was raised
in.  The first entry in the list represents the caller; the last entry
represents where the exception was raised.

> *Changed in version 3.5.*
> A list of named tuples
> `FrameInfo(frame, filename, lineno, function, code_context, index)`
> is returned.

> *Changed in version 3.11.*
> A list of `FrameInfo` objects is returned.
