---
title: "contextlib --- Utilities for with-statement contexts (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/contextlib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# contextlib --- Utilities for with-statement contexts (part 3 of 4)

### class `AsyncContextDecorator`

Similar to `ContextDecorator`, but the context manager is entered
and exited with `async with`.  Decorate coroutine functions and
asynchronous generator functions with this class; the returned wrapper is
of the same kind.

> **Note:** Synchronous functions and generators are accepted, but the wrapper is
> always asynchronous, so the decorated callable must then be awaited or
> iterated with `async for`.  If that change of calling convention is
> not intended, use `ContextDecorator` instead.

Example of `AsyncContextDecorator`:

```
from asyncio import run
from contextlib import AsyncContextDecorator

class mycontext(AsyncContextDecorator):
    async def __aenter__(self):
        print('Starting')
        return self

    async def __aexit__(self, *exc):
        print('Finishing')
        return False
```

The class can then be used like this:

```
>>> @mycontext()
... async def function():
...     print('The bit in the middle')
...
>>> run(function())
Starting
The bit in the middle
Finishing

>>> async def function():
...    async with mycontext():
...         print('The bit in the middle')
...
>>> run(function())
Starting
The bit in the middle
Finishing
```

> *Added in version 3.10.*

> *Changed in version 3.15.*
> Decorating an asynchronous generator function now keeps the context
> manager open across iteration.  Previously the context manager exited
> as soon as the generator object was created.  Synchronous functions
> and synchronous generator functions are also now accepted, with an
> asynchronous wrapper returned.

### class `ExitStack()`

A context manager that is designed to make it easy to programmatically
combine other context managers and cleanup functions, especially those
that are optional or otherwise driven by input data.

For example, a set of files may easily be handled in a single with
statement as follows:

```
with ExitStack() as stack:
    files = [stack.enter_context(open(fname)) for fname in filenames]
    # All opened files will automatically be closed at the end of
    # the with statement, even if attempts to open files later
    # in the list raise an exception
```

The `__enter__()` method returns the `ExitStack` instance, and
performs no additional operations.

Each instance maintains a stack of registered callbacks that are called in
reverse order when the instance is closed (either explicitly or implicitly
at the end of a `with` statement). Note that callbacks are *not*
invoked implicitly when the context stack instance is garbage collected.

This stack model is used so that context managers that acquire their
resources in their `__init__` method (such as file objects) can be
handled correctly.

Since registered callbacks are invoked in the reverse order of
registration, this ends up behaving as if multiple nested `with`
statements had been used with the registered set of callbacks. This even
extends to exception handling - if an inner callback suppresses or replaces
an exception, then outer callbacks will be passed arguments based on that
updated state.

This is a relatively low level API that takes care of the details of
correctly unwinding the stack of exit callbacks. It provides a suitable
foundation for higher level context managers that manipulate the exit
stack in application specific ways.

> *Added in version 3.3.*

### `enter_context(cm)`

Enters a new context manager and adds its `__exit__()` method to
the callback stack. The return value is the result of the context
manager's own `__enter__()` method.

These context managers may suppress exceptions just as they normally
would if used directly as part of a `with` statement.

> *Changed in version 3.11.*
> Raises `TypeError` instead of `AttributeError` if *cm*
> is not a context manager.

> *Changed in version 3.15.*
> Added support for arbitrary descriptors `__enter__()` and
> `__exit__()`.

### `push(exit)`

Adds a context manager's `__exit__()` method to the callback stack.

As `__enter__` is *not* invoked, this method can be used to cover
part of an `__enter__()` implementation with a context manager's own
`__exit__()` method.

If passed an object that is not a context manager, this method assumes
it is a callback with the same signature as a context manager's
`__exit__()` method and adds it directly to the callback stack.

By returning true values, these callbacks can suppress exceptions the
same way context manager `__exit__()` methods can.

The passed in object is returned from the function, allowing this
method to be used as a function decorator.

> *Changed in version 3.15.*
> Added support for arbitrary descriptors `__exit__()`.

### `callback(callback, /, *args, **kwds)`

Accepts an arbitrary callback function and arguments and adds it to
the callback stack.

Unlike the other methods, callbacks added this way cannot suppress
exceptions (as they are never passed the exception details).

The passed in callback is returned from the function, allowing this
method to be used as a function decorator.

### `pop_all()`

Transfers the callback stack to a fresh `ExitStack` instance
and returns it. No callbacks are invoked by this operation - instead,
they will now be invoked when the new stack is closed (either
explicitly or implicitly at the end of a `with` statement).

For example, a group of files can be opened as an "all or nothing"
operation as follows:

```
with ExitStack() as stack:
    files = [stack.enter_context(open(fname)) for fname in filenames]
    # Hold onto the close method, but don't call it yet.
    close_files = stack.pop_all().close
    # If opening any file fails, all previously opened files will be
    # closed automatically. If all files are opened successfully,
    # they will remain open even after the with statement ends.
    # close_files() can then be invoked explicitly to close them all.
```

### `close()`

Immediately unwinds the callback stack, invoking callbacks in the
reverse order of registration. For any context managers and exit
callbacks registered, the arguments passed in will indicate that no
exception occurred.

### class `AsyncExitStack()`

An asynchronous context manager, similar
to `ExitStack`, that supports combining both synchronous and
asynchronous context managers, as well as having coroutines for
cleanup logic.

The `close()` method is not implemented; `aclose()` must be used
instead.

### `enter_async_context(cm)`

Similar to `ExitStack.enter_context()` but expects an asynchronous context
manager.

> *Changed in version 3.11.*
> Raises `TypeError` instead of `AttributeError` if *cm*
> is not an asynchronous context manager.

> *Changed in version 3.15.*
> Added support for arbitrary descriptors `__aenter__() and aexit__()`.

### `push_async_exit(exit)`

Similar to `ExitStack.push()` but expects either an asynchronous context manager
or a coroutine function.

> *Changed in version 3.15.*
> Added support for arbitrary descriptors `__aexit__()`.

### `push_async_callback(callback, /, *args, **kwds)`

Similar to `ExitStack.callback()` but expects a coroutine function.

### `aclose()`

Similar to `ExitStack.close()` but properly handles awaitables.

Continuing the example for asynccontextmanager:

```
async with AsyncExitStack() as stack:
    connections = [await stack.enter_async_context(get_connection())
        for i in range(5)]
    # All opened connections will automatically be released at the end of
    # the async with statement, even if attempts to open a connection
    # later in the list raise an exception.
```

> *Added in version 3.7.*
