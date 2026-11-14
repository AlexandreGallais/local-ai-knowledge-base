---
title: "Data model (part 10 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/datamodel.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Data model (part 10 of 10)

### Customizing positional arguments in class pattern matching

When using a class name in a pattern, positional arguments in the pattern are not
allowed by default, i.e. `case MyClass(x, y)` is typically invalid without special
support in `MyClass`. To be able to use that kind of pattern, the class needs to
define a *__match_args__* attribute.

### `object.__match_args__`

This class variable can be assigned a tuple of strings. When this class is
used in a class pattern with positional arguments, each positional argument will
be converted into a keyword argument, using the corresponding value in
*__match_args__* as the keyword. The absence of this attribute is equivalent to
setting it to `()`.

For example, if `MyClass.__match_args__` is `("left", "center", "right")` that means
that `case MyClass(x, y)` is equivalent to `case MyClass(left=x, center=y)`. Note
that the number of arguments in the pattern must be smaller than or equal to the number
of elements in *__match_args__*; if it is larger, the pattern match attempt will raise
a `TypeError`.

> *Added in version 3.10.*

> **See also:** PEP 634 - Structural Pattern Matching
> The specification for the Python `match` statement.

### Emulating buffer types

The buffer protocol provides a way for Python
objects to expose efficient access to a low-level memory array. This protocol
is implemented by builtin types such as `bytes` and `memoryview`,
and third-party libraries may define additional buffer types.

While buffer types are usually implemented in C, it is also possible to
implement the protocol in Python.

### `object.__buffer__(self, flags)`

Called when a buffer is requested from *self* (for example, by the
`memoryview` constructor). The *flags* argument is an integer
representing the kind of buffer requested, affecting for example whether
the returned buffer is read-only or writable. `inspect.BufferFlags`
provides a convenient way to interpret the flags. The method must return
a `memoryview` object.

**Thread safety:** In free-threaded Python,
implementations must manage any internal export counter using atomic
operations. The method must be safe to call concurrently from multiple
threads, and the returned buffer's underlying data must remain valid
until the corresponding `__release_buffer__()` call
completes. See thread-safety-memoryview for details.

### `object.__release_buffer__(self, buffer)`

Called when a buffer is no longer needed. The *buffer* argument is a
`memoryview` object that was previously returned by
`__buffer__()`. The method must release any resources associated
with the buffer. This method should return `None`.

**Thread safety:** In free-threaded Python,
any export counter decrement must use atomic operations. Resource
cleanup must be thread-safe, as the final release may race with
concurrent releases from other threads.

Buffer objects that do not need to perform any cleanup are not required
to implement this method.

> *Added in version 3.12.*

> **See also:** PEP 688 - Making the buffer protocol accessible in Python
> Introduces the Python `__buffer__` and `__release_buffer__` methods.
>
> `collections.abc.Buffer`
> ABC for buffer types.

### Annotations

Functions, classes, and modules may contain annotations,
which are a way to associate information (usually type hints)
with a symbol.

### `object.__annotations__`

This attribute contains the annotations for an object. It is
lazily evaluated, so accessing the attribute may
execute arbitrary code and raise exceptions. If evaluation is successful, the
attribute is set to a dictionary mapping from variable names to annotations.

> *Changed in version 3.14.*
> Annotations are now lazily evaluated.

### `object.__annotate__(format)`

An annotate function.
Returns a new dictionary object mapping attribute/parameter names to their annotation values.

Takes a format parameter specifying the format in which annotations values should be provided.
It must be a member of the `annotationlib.Format` enum, or an integer with
a value corresponding to a member of the enum.

If an annotate function doesn't support the requested format, it must raise
`NotImplementedError`. Annotate functions must always support
`VALUE` format; they must not raise
`NotImplementedError()` when called with this format.

When called with  `VALUE` format, an annotate function may raise
`NameError`; it must not raise `NameError` when called requesting any other format.

If an object does not have any annotations, `__annotate__` should preferably be set
to `None` (it can’t be deleted), rather than set to a function that returns an empty dict.

> *Added in version 3.14.*

> **See also:** PEP 649 --- Deferred evaluation of annotation using descriptors
> Introduces lazy evaluation of annotations and the `__annotate__` function.

### Special method lookup

For custom classes, implicit invocations of special methods are only guaranteed
to work correctly if defined on an object's type, not in the object's instance
dictionary.  That behaviour is the reason why the following code raises an
exception:

```
>>> class C:
...     pass
...
>>> c = C()
>>> c.__len__ = lambda: 5
>>> len(c)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: object of type 'C' has no len()
```

The rationale behind this behaviour lies with a number of special methods such
as `__hash__() and repr__()` that are implemented
by all objects,
including type objects. If the implicit lookup of these methods used the
conventional lookup process, they would fail when invoked on the type object
itself:

```
>>> 1 .__hash__() == hash(1)
True
>>> int.__hash__() == hash(int)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: descriptor '__hash__' of 'int' object needs an argument
```

Incorrectly attempting to invoke an unbound method of a class in this way is
sometimes referred to as 'metaclass confusion', and is avoided by bypassing
the instance when looking up special methods:

```
>>> type(1).__hash__(1) == hash(1)
True
>>> type(int).__hash__(int) == hash(int)
True
```

In addition to bypassing any instance attributes in the interest of
correctness, implicit special method lookup generally also bypasses the
`__getattribute__()` method even of the object's metaclass:

```
>>> class Meta(type):
...     def __getattribute__(*args):
...         print("Metaclass getattribute invoked")
...         return type.__getattribute__(*args)
...
>>> class C(object, metaclass=Meta):
...     def __len__(self):
...         return 10
...     def __getattribute__(*args):
...         print("Class getattribute invoked")
...         return object.__getattribute__(*args)
...
>>> c = C()
>>> c.__len__()                 # Explicit lookup via instance
Class getattribute invoked
10
>>> type(c).__len__(c)          # Explicit lookup via type
Metaclass getattribute invoked
10
>>> len(c)                      # Implicit lookup
10
```

Bypassing the `__getattribute__()` machinery in this fashion
provides significant scope for speed optimisations within the
interpreter, at the cost of some flexibility in the handling of
special methods (the special method *must* be set on the class
object itself in order to be consistently invoked by the interpreter).

## Coroutines

### Awaitable Objects

An awaitable object generally implements an `__await__()` method.
Coroutine objects returned from `async def` functions
are awaitable.

> **Note:** The generator iterator objects returned from generators
> decorated with `types.coroutine()`
> are also awaitable, but they do not implement `__await__()`.

### `object.__await__(self)`

Must return an iterator.  Should be used to implement
awaitable objects.  For instance, `asyncio.Future` implements
this method to be compatible with the `await` expression.
The `object` class itself is not awaitable and does not provide
this method.

> **Note:** The language doesn't place any restriction on the type or value of the
> objects yielded by the iterator returned by `__await__`, as this is
> specific to the implementation of the asynchronous execution framework
> (e.g. `asyncio`) that will be managing the awaitable object.

> *Added in version 3.5.*

> **See also:** PEP 492 for additional information about awaitable objects.

### Coroutine Objects

Coroutine objects are awaitable objects.
A coroutine's execution can be controlled by calling `__await__()` and
iterating over the result.  When the coroutine has finished executing and
returns, the iterator raises `StopIteration`, and the exception's
`value` attribute holds the return value.  If the
coroutine raises an exception, it is propagated by the iterator.  Coroutines
should not directly raise unhandled `StopIteration` exceptions.

Coroutines also have the methods listed below, which are analogous to
those of generators (see generator-methods).  However, unlike
generators, coroutines do not directly support iteration.

Coroutines are generic over the types of their yield, send,
and return values, respectively.

> *Changed in version 3.5.2.*
> It is a `RuntimeError` to await on a coroutine more than once.

### `coroutine.send(value)`

Starts or resumes execution of the coroutine.  If *value* is `None`,
this is equivalent to advancing the iterator returned by
`__await__()`.  If *value* is not `None`, this method delegates
to the `send()` method of the iterator that caused
the coroutine to suspend.  The result (return value,
`StopIteration`, or other exception) is the same as when
iterating over the `__await__()` return value, described above.

### `coroutine.throw(value)`

```python
coroutine.throw(type[, value[, traceback]])
```

Raises the specified exception in the coroutine.  This method delegates
to the `throw()` method of the iterator that caused
the coroutine to suspend, if it has such a method.  Otherwise,
the exception is raised at the suspension point.  The result
(return value, `StopIteration`, or other exception) is the same as
when iterating over the `__await__()` return value, described
above.  If the exception is not caught in the coroutine, it propagates
back to the caller.

> *Changed in version 3.12.*
> The second signature \(type\[, value\[, traceback\]\]\) is deprecated and
> may be removed in a future version of Python.

### `coroutine.close()`

Causes the coroutine to clean itself up and exit.  If the coroutine
is suspended, this method first delegates to the `close()`
method of the iterator that caused the coroutine to suspend, if it
has such a method.  Then it raises `GeneratorExit` at the
suspension point, causing the coroutine to immediately clean itself up.
Finally, the coroutine is marked as having finished executing, even if
it was never started.

Coroutine objects are automatically closed using the above process when
they are about to be destroyed.

### Asynchronous Iterators

An *asynchronous iterator* can call asynchronous code in
its `__anext__` method.

Asynchronous iterators can be used in an `async for` statement.

The `object` class itself does not provide these methods.

### `object.__aiter__(self)`

Must return an *asynchronous iterator* object.

### `object.__anext__(self)`

Must return an *awaitable* resulting in a next value of the iterator.  Should
raise a `StopAsyncIteration` error when the iteration is over.

An example of an asynchronous iterable object:

```
class Reader:
    async def readline(self):
        ...

    def __aiter__(self):
        return self

    async def __anext__(self):
        val = await self.readline()
        if val == b'':
            raise StopAsyncIteration
        return val
```

> *Added in version 3.5.*

> *Changed in version 3.7.*
> Prior to Python 3.7, `__aiter__()` could return an *awaitable*
> that would resolve to an
> asynchronous iterator.
> Starting with Python 3.7, `__aiter__()` must return an
> asynchronous iterator object.  Returning anything else
> will result in a `TypeError` error.

### Asynchronous Context Managers

An *asynchronous context manager* is a *context manager* that is able to
suspend execution in its `__aenter__` and `__aexit__` methods.

Asynchronous context managers can be used in an `async with` statement.

The `object` class itself does not provide these methods.

### `object.__aenter__(self)`

Semantically similar to `__enter__()`, the only
difference being that it must return an *awaitable*.

### `object.__aexit__(self, exc_type, exc_value, traceback)`

Semantically similar to `__exit__()`, the only
difference being that it must return an *awaitable*.

An example of an asynchronous context manager class:

```
class AsyncContextManager:
    async def __aenter__(self):
        await log('entering context')

    async def __aexit__(self, exc_type, exc, tb):
        await log('exiting context')
```

> *Added in version 3.5.*

**Footnotes**
