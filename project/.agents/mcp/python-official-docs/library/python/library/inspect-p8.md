---
title: "inspect --- Inspect live objects (part 8 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/inspect.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# inspect --- Inspect live objects (part 8 of 8)

## Fetching attributes statically

Both `getattr()` and `hasattr()` can trigger code execution when
fetching or checking for the existence of attributes. Descriptors, like
properties, will be invoked and `__getattr__()` and
`__getattribute__()`
may be called.

For cases where you want passive introspection, like documentation tools, this
can be inconvenient. `getattr_static()` has a similar signature as `getattr()`
but avoids executing code when it fetches attributes.

### `getattr_static(obj, attr)`

```python
getattr_static(obj, attr, default)
```

Retrieve attributes without triggering dynamic lookup via the
descriptor protocol, `__getattr__()`
or `__getattribute__()`.

Note: this function may not be able to retrieve all attributes
that getattr can fetch (like dynamically created attributes)
and may find attributes that getattr can't (like descriptors
that raise AttributeError). It can also return descriptors objects
instead of instance members.

If the instance `__dict__` is shadowed by another member (for
example a property) then this function will be unable to find instance
members.

> *Added in version 3.2.*

`getattr_static()` does not resolve descriptors, for example slot descriptors or
getset descriptors on objects implemented in C. The descriptor object
is returned instead of the underlying attribute.

You can handle these with code like the following. Note that
for arbitrary getset descriptors invoking these may trigger
code execution:

```
# example code for resolving the builtin descriptor types
class _foo:
    __slots__ = ['foo']

slot_descriptor = type(_foo.foo)
getset_descriptor = type(type(open(__file__)).name)
wrapper_descriptor = type(str.__dict__['__add__'])
descriptor_types = (slot_descriptor, getset_descriptor, wrapper_descriptor)

result = getattr_static(some_object, 'foo')
if type(result) in descriptor_types:
    try:
        result = result.__get__()
    except AttributeError:
        # descriptors can raise AttributeError to
        # indicate there is no underlying value
        # in which case the descriptor itself will
        # have to do
        pass
```

## Current State of Generators, Coroutines, and Asynchronous Generators

When implementing coroutine schedulers and for other advanced uses of
generators, it is useful to determine whether a generator is currently
executing, is waiting to start or resume or execution, or has already
terminated. `getgeneratorstate()` allows the current state of a
generator to be determined easily.

### `getgeneratorstate(generator)`

Get current state of a generator-iterator.

Possible states are:

- GEN_CREATED: Waiting to start execution.
- GEN_RUNNING: Currently being executed by the interpreter.
- GEN_SUSPENDED: Currently suspended at a yield expression.
- GEN_CLOSED: Execution has completed.

> *Added in version 3.2.*

### `getcoroutinestate(coroutine)`

Get current state of a coroutine object.  The function is intended to be
used with coroutine objects created by `async def` functions, but
will accept any coroutine-like object that has `cr_running` and
`cr_frame` attributes.

Possible states are:

- CORO_CREATED: Waiting to start execution.
- CORO_RUNNING: Currently being executed by the interpreter.
- CORO_SUSPENDED: Currently suspended at an await expression.
- CORO_CLOSED: Execution has completed.

> *Added in version 3.5.*

### `getasyncgenstate(agen)`

Get current state of an asynchronous generator object.  The function is
intended to be used with asynchronous iterator objects created by
`async def` functions which use the `yield` statement,
but will accept any asynchronous generator-like object that has
`ag_running` and `ag_frame` attributes.

Possible states are:

- AGEN_CREATED: Waiting to start execution.
- AGEN_RUNNING: Currently being executed by the interpreter.
- AGEN_SUSPENDED: Currently suspended at a yield expression.
- AGEN_CLOSED: Execution has completed.

> *Added in version 3.12.*

The current internal state of the generator can also be queried. This is
mostly useful for testing purposes, to ensure that internal state is being
updated as expected:

### `getgeneratorlocals(generator)`

Get the mapping of live local variables in *generator* to their current
values.  A dictionary is returned that maps from variable names to values.
This is the equivalent of calling `locals()` in the body of the
generator, and all the same caveats apply.

If *generator* is a generator with no currently associated frame,
then an empty dictionary is returned.  `TypeError` is raised if
*generator* is not a Python generator object.

> **CPython implementation detail:** This function relies on the generator exposing a Python stack frame
> for introspection, which isn't guaranteed to be the case in all
> implementations of Python. In such cases, this function will always
> return an empty dictionary.

> *Added in version 3.3.*

### `getcoroutinelocals(coroutine)`

This function is analogous to `getgeneratorlocals()`, but
works for coroutine objects created by `async def` functions.

> *Added in version 3.5.*

### `getasyncgenlocals(agen)`

This function is analogous to `getgeneratorlocals()`, but
works for asynchronous generator objects created by `async def`
functions which use the `yield` statement.

> *Added in version 3.12.*

## Code Objects Bit Flags

Python code objects have a `co_flags` attribute,
which is a bitmap of the following flags:

### `CO_OPTIMIZED`

The code object is optimized, using fast locals.

### `CO_NEWLOCALS`

If set, a new dict will be created for the frame's `f_locals`
when the code object is executed.

### `CO_VARARGS`

The code object has a variable positional parameter (`*args`-like).

### `CO_VARKEYWORDS`

The code object has a variable keyword parameter (`**kwargs`-like).

### `CO_NESTED`

The flag is set when the code object is a nested function.

### `CO_GENERATOR`

The flag is set when the code object is a generator function, i.e.
a generator object is returned when the code object is executed.

### `CO_COROUTINE`

The flag is set when the code object is a coroutine function.
When the code object is executed it returns a coroutine object.
See PEP 492 for more details.

> *Added in version 3.5.*

### `CO_ITERABLE_COROUTINE`

The flag is used to transform generators into generator-based
coroutines.  Generator objects with this flag can be used in
`await` expression, and can `yield from` coroutine objects.
See PEP 492 for more details.

> *Added in version 3.5.*

### `CO_ASYNC_GENERATOR`

The flag is set when the code object is an asynchronous generator
function.  When the code object is executed it returns an
asynchronous generator object.  See PEP 525 for more details.

> *Added in version 3.6.*

### `CO_HAS_DOCSTRING`

The flag is set when there is a docstring for the code object in
the source code. If set, it will be the first item in
`co_consts`.

> *Added in version 3.14.*

### `CO_METHOD`

The flag is set when the code object is a function defined in class
scope.

> *Added in version 3.14.*

> **Note:** The flags are specific to CPython, and may not be defined in other
> Python implementations.  Furthermore, the flags are an implementation
> detail, and can be removed or deprecated in future Python releases.
> It's recommended to use public APIs from the `inspect` module
> for any introspection needs.

## Buffer flags

### class `BufferFlags`

This is an `enum.IntFlag` that represents the flags that
can be passed to the `__buffer__()` method of objects
implementing the buffer protocol.

The meaning of the flags is explained at buffer-request-types.

### `BufferFlags.WRITE`

> *Added in version 3.12.*

## Command-line interface

The `inspect` module also provides a basic <example-value> capability
from the command line.

inspect

By default, accepts the name of a module and prints the source of that
module. A class or function within the module can be printed instead by
appending a colon and the qualified name of the target object.

### option `--details`

Print information about the specified object rather than the source code

> *Changed in version 3.15.*
> The `--details` option now supports basic <example-value> for modules
> without available source code and indicates when modules are frozen.
> It also indicates when the given target reference is not the canonical
> name of the referenced object.
