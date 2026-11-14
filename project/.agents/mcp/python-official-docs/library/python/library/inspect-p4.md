---
title: "inspect --- Inspect live objects (part 4 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/inspect.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# inspect --- Inspect live objects (part 4 of 8)

```text
|                 |                   | ``GEN_CLOSED``            |
+-----------------+-------------------+---------------------------+
| async generator | __name__          | name                      |
+-----------------+-------------------+---------------------------+
|                 | __qualname__      | qualified name            |
+-----------------+-------------------+---------------------------+
|                 | ag_await          | object being awaited on,  |
|                 |                   | or ``None``               |
+-----------------+-------------------+---------------------------+
|                 | ag_frame          | frame                     |
+-----------------+-------------------+---------------------------+
|                 | ag_running        | is the generator running? |
+-----------------+-------------------+---------------------------+
|                 | ag_suspended      | is the generator          |
|                 |                   | suspended?                |
+-----------------+-------------------+---------------------------+
|                 | ag_code           | code                      |
+-----------------+-------------------+---------------------------+
|                 | ag_state          | state of the async        |
|                 |                   | generator, one of         |
|                 |                   | ``AGEN_CREATED``,         |
|                 |                   | ``AGEN_RUNNING``,         |
|                 |                   | ``AGEN_SUSPENDED``, or    |
|                 |                   | ``AGEN_CLOSED``           |
+-----------------+-------------------+---------------------------+
| coroutine       | __name__          | name                      |
+-----------------+-------------------+---------------------------+
|                 | __qualname__      | qualified name            |
+-----------------+-------------------+---------------------------+
|                 | cr_await          | object being awaited on,  |
|                 |                   | or ``None``               |
+-----------------+-------------------+---------------------------+
|                 | cr_frame          | frame                     |
+-----------------+-------------------+---------------------------+
|                 | cr_running        | is the coroutine running? |
+-----------------+-------------------+---------------------------+
|                 | cr_suspended      | is the coroutine          |
|                 |                   | suspended?                |
+-----------------+-------------------+---------------------------+
|                 | cr_code           | code                      |
+-----------------+-------------------+---------------------------+
|                 | cr_origin         | where coroutine was       |
|                 |                   | created, or ``None``. See |
|                 |                   | |coroutine-origin-link|   |
+-----------------+-------------------+---------------------------+
|                 | cr_state          | state of the coroutine,   |
|                 |                   | one of ``CORO_CREATED``,  |
|                 |                   | ``CORO_RUNNING``,         |
|                 |                   | ``CORO_SUSPENDED``, or    |
|                 |                   | ``CORO_CLOSED``           |
+-----------------+-------------------+---------------------------+
| builtin         | __doc__           | documentation string      |
+-----------------+-------------------+---------------------------+
|                 | __name__          | original name of this     |
|                 |                   | function or method        |
+-----------------+-------------------+---------------------------+
|                 | __qualname__      | qualified name            |
+-----------------+-------------------+---------------------------+
|                 | __self__          | instance to which a       |
|                 |                   | method is bound, or       |
|                 |                   | module object a function  |
|                 |                   | was defined in, or        |
|                 |                   | ``None``                  |
+-----------------+-------------------+---------------------------+
```

> *Changed in version 3.5.*
> Add `__qualname__` and `gi_yieldfrom` attributes to generators.
>
> The `__name__` attribute of generators is now set from the function
> name, instead of the code name, and it can now be modified.

> *Changed in version 3.7.*
> Add `cr_origin` attribute to coroutines.

> *Changed in version 3.10.*
> Add `__builtins__` attribute to functions.

> *Changed in version 3.11.*
> Add `gi_suspended` attribute to generators.

> *Changed in version 3.11.*
> Add `cr_suspended` attribute to coroutines.

> *Changed in version 3.12.*
> Add `ag_suspended` attribute to async generators.

> *Changed in version 3.14.*
> Add `f_generator` attribute to frames.

> *Changed in version 3.15.*
> Add `gi_state` attribute to generators, `cr_state` attribute to
> coroutines, and `ag_state` attribute to async generators.

### `getmembers(object[, predicate])`

Return all the members of an object in a list of `(name, value)`
pairs sorted by name. If the optional *predicate* argument—which will be
called with the `value` object of each member—is supplied, only members
for which the predicate returns a true value are included.

> **Note:** `getmembers()` will only return class attributes defined in the
> metaclass when the argument is a class and those attributes have been
> listed in the metaclass' custom `__dir__()`.

### `getmembers_static(object[, predicate])`

Return all the members of an object in a list of `(name, value)`
pairs sorted by name without triggering dynamic lookup via the descriptor
protocol, __getattr__ or __getattribute__. Optionally, only return members
that satisfy a given predicate.

> **Note:** `getmembers_static()` may not be able to retrieve all members
> that getmembers can fetch (like dynamically created attributes)
> and may find members that getmembers can't (like descriptors
> that raise AttributeError). It can also return descriptor objects
> instead of instance members in some cases.

> *Added in version 3.11.*

### `getmodulename(path)`

Return the name of the module named by the file *path*, without including the
names of enclosing packages. The file extension is checked against all of
the entries in `importlib.machinery.all_suffixes()`. If it matches,
the final path component is returned with the extension removed.
Otherwise, `None` is returned.

Note that this function *only* returns a meaningful name for actual
Python modules - paths that potentially refer to Python packages will
still return `None`.

> *Changed in version 3.3.*
> The function is based directly on `importlib`.

### `ismodule(object)`

Return `True` if the object is a module.

### `isclass(object)`

Return `True` if the object is a class, whether built-in or created in Python
code.

This function returns `False` for generic aliases of classes,
such as `list[int]`.

### `ismethod(object)`

Return `True` if the object is a bound method written in Python.

> **Note:** For example, given this class:
>
>
> ```
> >>> class Greeter:
> ...     def say_hello(self):
> ...         print('hello!')
> ```
>
>
> A bound method (also known as an *instance method*) is created when
> accessing `say_hello` (a function defined in the
> `Greeter` namespace) through an instance of the `Greeter` class:
>
>
> ```
> >>> instance = Greeter()
>
> >>> instance.say_hello
> <bound method Greeter.say_hello of <__main__.Greeter object ...>>
> >>> ismethod(instance.say_hello)
> True
> >>> isfunction(instance.say_hello)
> False
> ```
>
>
> Accessing `say_hello` through the `Greeter` class will return the
> function itself. For this function, `ismethod()` will return
> `False`, but `isfunction()` will return `True`:
>
>
> ```
> >>> Greeter.say_hello
> <function Greeter.say_hello at 0x7f7503854a90>
> >>> ismethod(Greeter.say_hello)
> False
> >>> isfunction(Greeter.say_hello)
> True
> ```
>
>
> See typesmethods for details.

### `isfunction(object)`

Return `True` if the object is a Python function, which includes functions
created by a lambda expression.

See the note for `ismethod()` for an example.

### `ispackage(object)`

Return `True` if the object is a package.

> *Added in version 3.14.*

### `isgeneratorfunction(object)`

Return `True` if the object is a Python generator function.

It also returns `True` for bound methods created from Python generator functions
(see typesmethods for more information).

> *Changed in version 3.8.*
> Functions wrapped in `functools.partial()` now return `True` if the
> wrapped function is a Python generator function.

> *Changed in version 3.10.6.*
> Duck-typed function-like objects now return
> `True` if their code object has the `CO_GENERATOR` flag.

> *Changed in version 3.13.*
> Functions wrapped in `functools.partialmethod()` now return `True`
> if the wrapped function is a Python generator function.

### `isgenerator(object)`

Return `True` if the object is a generator.

### `iscoroutinefunction(object)`

Return `True` if the object is a coroutine function (a function
defined with an `async def` syntax), a `functools.partial()`
wrapping a coroutine function, or a sync function marked with
`markcoroutinefunction()`.

> *Added in version 3.5.*

> *Changed in version 3.8.*
> Functions wrapped in `functools.partial()` now return `True` if the
> wrapped function is a coroutine function.

> *Changed in version 3.10.6.*
> Duck-typed function-like objects now return
> `True` if their code object has the `CO_COROUTINE` flag.

> *Changed in version 3.12.*
> Sync functions marked with `markcoroutinefunction()` now return
> `True`.

> *Changed in version 3.13.*
> Functions wrapped in `functools.partialmethod()` now return `True`
> if the wrapped function is a coroutine function.

### `markcoroutinefunction(func)`

Decorator to mark a callable as a coroutine function if it would not
otherwise be detected by `iscoroutinefunction()`.

This may be of use for sync functions that return a coroutine, if
the function is passed to an API that requires `iscoroutinefunction()`.

When possible, using an `async def` function is preferred. Also
acceptable is calling the function and testing the return with
`iscoroutine()`.

> *Added in version 3.12.*

### `iscoroutine(object)`

Return `True` if the object is a coroutine created by an
`async def` function.

> *Added in version 3.5.*

### `isawaitable(object)`

Return `True` if the object can be used in `await` expression.

Can also be used to distinguish generator-based coroutines from regular
generators:

```python

import types

def gen():
    yield
@types.coroutine
def gen_coro():
    yield

assert not isawaitable(gen())
assert isawaitable(gen_coro())
```

> *Added in version 3.5.*

### `isasyncgenfunction(object)`

Return `True` if the object is an asynchronous generator function,
for example:

```python

>>> async def agen():
...     yield 1
...
>>> inspect.isasyncgenfunction(agen)
True
```

> *Added in version 3.6.*

> *Changed in version 3.8.*
> Functions wrapped in `functools.partial()` now return `True` if the
> wrapped function is an asynchronous generator function.

> *Changed in version 3.10.6.*
> Duck-typed function-like objects now return
> `True` if their code object has the `CO_ASYNC_GENERATOR` flag.

> *Changed in version 3.13.*
> Functions wrapped in `functools.partialmethod()` now return `True`
> if the wrapped function is a asynchronous generator function.

### `isasyncgen(object)`

Return `True` if the object is an asynchronous generator iterator
created by an asynchronous generator function.

> *Added in version 3.6.*

### `istraceback(object)`

Return `True` if the object is a traceback.

### `isframe(object)`

Return `True` if the object is a frame.

### `iscode(object)`

Return `True` if the object is a code.

### `isbuiltin(object)`

Return `True` if the object is a built-in function or a bound built-in method.

### `ismethodwrapper(object)`

Return `True` if the type of object is a `MethodWrapperType`.

These are instances of `MethodWrapperType, such as str__()`,
`__eq__() and repr__()`.

> *Added in version 3.11.*

### `isroutine(object)`

Return `True` if the object is a user-defined or built-in function or method.

### `isabstract(object)`

Return `True` if the object is an abstract base class.

### `ismethoddescriptor(object)`

Return `True` if the object is a method descriptor, but not if
`isclass()`, `ismethod()` or `isfunction()` is true.

This, for example, is true of `int.__add__`.  An object passing this test
has a `__get__() method, but not a set__()`
method or a `__delete__()` method.  Beyond that, the set of
attributes varies.  A `__name__` attribute is usually
sensible, and `__doc__` often is.

Method descriptors that also pass any of the other tests (`isclass()`,
`ismethod()` or `isfunction()`) make this function return `False`,
simply because those other tests promise more -- you can, for example, count
on having the `__func__` attribute when an object passes
`ismethod()`.

> *Changed in version 3.13.*
> This function no longer incorrectly reports objects with `__get__()`
> and `__delete__(), but not set__()`, as being method
> descriptors (such objects are data descriptors, not method descriptors).

### `isdatadescriptor(object)`

Return `True` if the object is a data descriptor, but not if
`isclass()`, `ismethod()` or `isfunction()` is true.

Data descriptors always have a `__set__()` method and/or
a `__delete__()` method.  Optionally, they may also have a
`__get__()` method.

Examples of data descriptors are `properties()`, getsets and
member descriptors.  Note that for the latter two (defined only in C extension
modules), more specific tests are available: `isgetsetdescriptor()` and
`ismemberdescriptor()`, respectively.

While data descriptors may also have `__name__` and
`__doc__` attributes (as properties, getsets and member descriptors
do), this is not necessarily the case in general.

> *Changed in version 3.8.*
> This function now reports objects with only a `__set__()` method
> as being data descriptors (the presence of `__get__()` is no
> longer required for that).  Moreover, objects with `__delete__()`,
> but not `__set__()`, are now properly recognized as data
> descriptors as well, which was not the case previously.

### `isgetsetdescriptor(object)`

Return `True` if the object is a getset descriptor.

> **CPython implementation detail:** getsets are attributes defined in extension modules via
> `PyGetSetDef` structures.  For Python implementations without such
> types, this method will always return `False`.
