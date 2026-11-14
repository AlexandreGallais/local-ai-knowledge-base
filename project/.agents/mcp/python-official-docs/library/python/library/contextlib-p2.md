---
title: "contextlib --- Utilities for with-statement contexts (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/contextlib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# contextlib --- Utilities for with-statement contexts (part 2 of 4)

## Utilities

Functions and classes provided:

### class `AbstractContextManager`

An abstract base class for classes that implement
`__enter__() and exit__()`. A default
implementation for `__enter__()` is provided which returns
`self` while `__exit__()` is an abstract method which by default
returns `None`. See also the definition of typecontextmanager.

> *Added in version 3.6.*

### class `AbstractAsyncContextManager`

An abstract base class for classes that implement
`__aenter__() and aexit__()`. A default
implementation for `__aenter__()` is provided which returns
`self` while `__aexit__()` is an abstract method which by default
returns `None`. See also the definition of
async-context-managers.

> *Added in version 3.7.*

### decorator `contextmanager`

This function is a decorator that can be used to define a factory
function for `with` statement context managers, without needing to
create a class or separate `__enter__() and exit__()` methods.

While many objects natively support use in with statements, sometimes a
resource needs to be managed that isn't a context manager in its own right,
and doesn't implement a `close()` method for use with `contextlib.closing`.

An abstract example would be the following to ensure correct resource
management:

```
from contextlib import contextmanager

@contextmanager
def managed_resource(*args, **kwds):
    # Code to acquire resource, e.g.:
    resource = acquire_resource(*args, **kwds)
    try:
        yield resource
    finally:
        # Code to release resource, e.g.:
        release_resource(resource)
```

The function can then be used like this:

```
>>> with managed_resource(timeout=3600) as resource:
...     # Resource is released at the end of this block,
...     # even if code in the block raises an exception
```

The function being decorated must return a generator-iterator when
called. This iterator must yield exactly one value, which will be bound to
the targets in the `with` statement's `as` clause, if any.

At the point where the generator yields, the block nested in the `with`
statement is executed.  The generator is then resumed after the block is exited.
If an unhandled exception occurs in the block, it is reraised inside the
generator at the point where the yield occurred.  Thus, you can use a
`try`...`except`...`finally` statement to trap
the error (if any), or ensure that some cleanup takes place. If an exception is
trapped merely in order to log it or to perform some action (rather than to
suppress it entirely), the generator must reraise that exception. Otherwise the
generator context manager will indicate to the `with` statement that
the exception has been handled, and execution will resume with the statement
immediately following the `with` statement.

contextmanager uses `ContextDecorator` so the context managers
it creates can be used as decorators as well as in `with` statements.
When used as a decorator, a new generator instance is implicitly created on
each function call (this allows the otherwise "one-shot" context managers
created by contextmanager to meet the requirement that context
managers support multiple invocations in order to be used as decorators).

> *Changed in version 3.2.*
> Use of `ContextDecorator`.

### decorator `asynccontextmanager`

Similar to contextmanager, but creates an
asynchronous context manager.

This function is a decorator that can be used to define a factory
function for `async with` statement asynchronous context managers,
without needing to create a class or separate `__aenter__()` and
`__aexit__()` methods. It must be applied to an :term:`asynchronous
generator` function.

A simple example:

```
from contextlib import asynccontextmanager

@asynccontextmanager
async def get_connection():
    conn = await acquire_db_connection()
    try:
        yield conn
    finally:
        await release_db_connection(conn)

async def get_all_users():
    async with get_connection() as conn:
        return conn.query('SELECT ...')
```

> *Added in version 3.7.*

Context managers defined with asynccontextmanager can be used
either as decorators or with `async with` statements:

```
import time
from contextlib import asynccontextmanager

@asynccontextmanager
async def timeit():
    now = time.monotonic()
    try:
        yield
    finally:
        print(f'it took {time.monotonic() - now}s to run')

@timeit()
async def main():
    # ... async code ...
```

When used as a decorator, a new generator instance is implicitly created on
each function call. This allows the otherwise "one-shot" context managers
created by asynccontextmanager to meet the requirement that context
managers support multiple invocations in order to be used as decorators.

> *Changed in version 3.10.*
> Async context managers created with asynccontextmanager can
> be used as decorators.

### `closing(thing)`

Return a context manager that closes *thing* upon completion of the block.  This
is basically equivalent to:

```
from contextlib import contextmanager

@contextmanager
def closing(thing):
    try:
        yield thing
    finally:
        thing.close()
```

And lets you write code like this:

```
from contextlib import closing
from urllib.request import urlopen

with closing(urlopen('https://www.python.org')) as page:
    for line in page:
        print(line)
```

without needing to explicitly close `page`.  Even if an error occurs,
`page.close()` will be called when the `with` block is exited.

> **Note:** Most types managing resources support the context manager protocol,
> which closes *thing* on leaving the `with` statement.
> As such, `closing()` is most useful for third party types that don't
> support context managers.
> This example is purely for illustration purposes,
> as `urlopen()` would normally be used in a context manager.

### `aclosing(thing)`

Return an async context manager that calls the `aclose()` method of *thing*
upon completion of the block.  This is basically equivalent to:

```
from contextlib import asynccontextmanager

@asynccontextmanager
async def aclosing(thing):
    try:
        yield thing
    finally:
        await thing.aclose()
```

Significantly, `aclosing()` supports deterministic cleanup of async
generators when they happen to exit early by `break` or an
exception.  For example:

```
from contextlib import aclosing

async with aclosing(my_generator()) as values:
    async for value in values:
        if value == 42:
            break
```

This pattern ensures that the generator's async exit code is executed in
the same context as its iterations (so that exceptions and context
variables work as expected, and the exit code isn't run after the
lifetime of some task it depends on).

> *Added in version 3.10.*

### `nullcontext(enter_result=None)`

Return a context manager that returns *enter_result* from `__enter__()`, but
otherwise does nothing. It is intended to be used as a stand-in for an
optional context manager, for example:

```
def myfunction(arg, ignore_exceptions=False):
    if ignore_exceptions:
        # Use suppress to ignore all exceptions.
        cm = contextlib.suppress(Exception)
    else:
        # Do not ignore any exceptions, cm has no effect.
        cm = contextlib.nullcontext()
    with cm:
        # Do something
```

An example using *enter_result*:

```
def process_file(file_or_path):
    if isinstance(file_or_path, str):
        # If string, open file
        cm = open(file_or_path)
    else:
        # Caller is responsible for closing file
        cm = nullcontext(file_or_path)

    with cm as file:
        # Perform processing on the file
```

It can also be used as a stand-in for
asynchronous context managers:

```
async def send_http(session=None):
    if not session:
        # If no http session, create it with aiohttp
        cm = aiohttp.ClientSession()
    else:
        # Caller is responsible for closing the session
        cm = nullcontext(session)

    async with cm as session:
        # Send http requests with session
```

> *Added in version 3.7.*

> *Changed in version 3.10.*
> asynchronous context manager support was added.

### `suppress(*exceptions)`

Return a context manager that suppresses any of the specified exceptions
if they occur in the body of a `with` statement and then
resumes execution with the first statement following the end of the
`with` statement.

As with any other mechanism that completely suppresses exceptions, this
context manager should be used only to cover very specific errors where
silently continuing with program execution is known to be the right
thing to do.

For example:

```
from contextlib import suppress

with suppress(FileNotFoundError):
    os.remove('somefile.tmp')

with suppress(FileNotFoundError):
    os.remove('someotherfile.tmp')
```

This code is equivalent to:

```
try:
    os.remove('somefile.tmp')
except FileNotFoundError:
    pass

try:
    os.remove('someotherfile.tmp')
except FileNotFoundError:
    pass
```

This context manager is reentrant.

If the code within the `with` block raises a
`BaseExceptionGroup`, suppressed exceptions are removed from the
group.  Any exceptions of the group which are not suppressed are re-raised in
a new group which is created using the original group's `derive()`
method.

> *Added in version 3.4.*

> *Changed in version 3.12.*
> `suppress` now supports suppressing exceptions raised as
> part of a `BaseExceptionGroup`.

### `redirect_stdout(new_target)`

Context manager for temporarily redirecting `sys.stdout` to
another file object.

This tool adds flexibility to existing functions or classes whose output
is hardwired to `sys.stdout`.

For example, the output of `help()` normally is sent to *sys.stdout*.
You can capture that output in a string by redirecting the output to an
`io.StringIO` object. The replacement stream is returned from the
`__enter__()` method and so is available as the target of the
`with` statement:

```
with redirect_stdout(io.StringIO()) as f:
    help(pow)
s = f.getvalue()
```

To send the output of `help()` to a file on disk, redirect the output
to a regular file:

```
with open('help.txt', 'w') as f:
    with redirect_stdout(f):
        help(pow)
```

To send the output of `help()` to *sys.stderr*:

```
with redirect_stdout(sys.stderr):
    help(pow)
```

Note that the global side effect on `sys.stdout` means that this
context manager is not suitable for use in library code and most threaded
applications. It also has no effect on the output of subprocesses.
However, it is still a useful approach for many utility scripts.

This context manager is reentrant.

> *Added in version 3.4.*

### `redirect_stderr(new_target)`

Similar to `redirect_stdout()` but redirecting the global
`sys.stderr` to another file object.

This context manager is reentrant.

> *Added in version 3.5.*

### `chdir(path)`

Non parallel-safe context manager to change the current working directory.
As this changes a global state, the working directory, it is not suitable
for use in most threaded or async contexts. It is also not suitable for most
non-linear code execution, like generators, where the program execution is
temporarily relinquished -- unless explicitly desired, you should not yield
when this context manager is active.

This is a simple wrapper around `chdir()`, it changes the current
working directory upon entering and restores the old one on exit.

This context manager is reentrant.

> *Added in version 3.11.*

### class `ContextDecorator()`

A base class that enables a context manager to also be used as a decorator.

Context managers inheriting from `ContextDecorator` have to implement
`__enter__() and exit__()` as normal.
`__exit__` retains its optional
exception handling even when used as a decorator.

`ContextDecorator` is used by contextmanager, so you get this
functionality automatically.

Example of `ContextDecorator`:

```
from contextlib import ContextDecorator

class mycontext(ContextDecorator):
    def __enter__(self):
        print('Starting')
        return self

    def __exit__(self, *exc):
        print('Finishing')
        return False
```

The class can then be used like this:

```
>>> @mycontext()
... def function():
...     print('The bit in the middle')
...
>>> function()
Starting
The bit in the middle
Finishing

>>> with mycontext():
...     print('The bit in the middle')
...
Starting
The bit in the middle
Finishing
```

This change is just syntactic sugar for any construct of the following form:

```
def f():
    with cm():
        # Do stuff
```

`ContextDecorator` lets you instead write:

```
@cm()
def f():
    # Do stuff
```

It makes it clear that the `cm` applies to the whole function, rather than
just a piece of it (and saving an indentation level is nice, too).

Existing context managers that already have a base class can be extended by
using `ContextDecorator` as a mixin class:

```
from contextlib import ContextDecorator

class mycontext(ContextBaseClass, ContextDecorator):
    def __enter__(self):
        return self

    def __exit__(self, *exc):
        return False
```

> **Note:** As the decorated function must be able to be called multiple times, the
> underlying context manager must support use in multiple `with`
> statements. If this is not the case, then the original construct with the
> explicit `with` statement inside the function should be used.

When the decorated callable is a generator function, coroutine function, or
asynchronous generator function, the returned wrapper is of the same kind
and keeps the context manager open for the lifetime of the iteration or
await rather than only for the call that creates the generator or coroutine
object.  Wrapped generators and asynchronous generators are explicitly
closed when iteration ends, as if by `closing()` or `aclosing()`.

> **Note:** For asynchronous generators the wrapper re-yields each value with
> `async for`; values sent with `asend()` and exceptions
> thrown with `athrow()` are not forwarded to the wrapped
> generator.

> *Added in version 3.2.*

> *Changed in version 3.15.*
> Decorating a generator function, coroutine function, or asynchronous
> generator function now keeps the context manager open across iteration
> or await.  Previously the context manager exited as soon as the
> generator or coroutine object was created.
