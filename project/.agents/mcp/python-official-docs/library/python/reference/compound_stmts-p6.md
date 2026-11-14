---
title: "Compound statements (part 6 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/compound_stmts.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Compound statements (part 6 of 7)

## Class definitions

A class definition defines a class object (see section types):

```text
python-grammar
classdef: [`decorators`] "class" `classname` [`type_params`] [`inheritance`] ":" `suite`
inheritance: "(" [`argument_list`] ")"
classname: `identifier`
```

A class definition is an executable statement.  The inheritance list usually
gives a list of base classes (see metaclasses for more advanced uses), so
each item in the list should evaluate to a class object which allows
subclassing.  Classes without an inheritance list inherit, by default, from the
base class `object`; hence,:

```
class Foo:
    pass
```

is equivalent to:

```
class Foo(object):
    pass
```

There may be one or more base classes; see multiple-inheritance below for more
information.

The class's suite is then executed in a new execution frame (see naming),
using a newly created local namespace and the original global namespace.
(Usually, the suite contains mostly function definitions.)  When the class's
suite finishes execution, its execution frame is discarded but its local
namespace is saved. A class object is then created using the inheritance
list for the base classes and the saved local namespace for the attribute
dictionary.  The class name is bound to this class object in the original local
namespace.

The order in which attributes are defined in the class body is preserved
in the new class's `__dict__`.  Note that this is reliable only right
after the class is created and only for classes that were defined using
the definition syntax.

Class creation can be customized heavily using metaclasses.

Classes can also be decorated: just like when decorating functions,:

```
@f1(arg)
@f2
class Foo: pass
```

is roughly equivalent to:

```
class Foo: pass
Foo = f1(arg)(f2(Foo))
```

The evaluation rules for the decorator expressions are the same as for function
decorators.  The result is then bound to the class name.

> *Changed in version 3.9.*
> Classes may be decorated with any valid
> `python-grammar:assignment_expression`. Previously, the grammar was
> much more restrictive; see PEP 614 for details.

A list of type parameters may be given in square brackets
immediately after the class's name.
This indicates to static type checkers that the class is generic. At runtime,
the type parameters can be retrieved from the class's
`__type_params__` attribute. See generic-classes for more.

> *Changed in version 3.12.*
> Type parameter lists are new in Python 3.12.

**Programmer's note:** Variables defined in the class definition are class
attributes; they are shared by instances.  Instance attributes can be set in a
method with `self.name = value`.  Both class and instance attributes are
accessible through the notation "`self.name`", and an instance attribute hides
a class attribute with the same name when accessed in this way.  Class
attributes can be used as defaults for instance attributes, but using mutable
values there can lead to unexpected results.  Descriptors
can be used to create instance variables with different implementation details.

> **See also:** PEP 3115 - Metaclasses in Python 3000
> The proposal that changed the declaration of metaclasses to the current
> syntax, and the semantics for how classes with metaclasses are
> constructed.
>
> PEP 3129 - Class Decorators
> The proposal that added class decorators.  Function and method decorators
> were introduced in PEP 318.

### Multiple inheritance

Python classes may have multiple base classes, a technique known as
*multiple inheritance*.  The base classes are specified in the class definition
by listing them in parentheses after the class name, separated by commas.
For example, the following class definition:

```python

>>> class A: pass
>>> class B: pass
>>> class C(A, B): pass
```

defines a class `C` that inherits from classes `A` and `B`.

The method resolution order (MRO) is the order in which base classes are
searched when looking up an attribute on a class. See python_2.3_mro for a
description of how Python determines the MRO for a class.

Multiple inheritance is not always allowed. Attempting to define a class with multiple
inheritance will raise an error if one of the bases does not allow subclassing, if a consistent MRO
cannot be created, if no valid metaclass can be determined, or if there is an instance
layout conflict. We'll discuss each of these in turn.

First, all base classes must allow subclassing. While most classes allow subclassing,
some built-in classes do not, such as `bool`:

```python

>>> class SubBool(bool):  # TypeError
...    pass
Traceback (most recent call last):
   ...
TypeError: type 'bool' is not an acceptable base type
```

In the resolved MRO of a class, the class's bases appear in the order they were
specified in the class's bases list. Additionally, the MRO always lists a child
class before any of its bases. A class definition will fail if it is impossible to
resolve a consistent MRO that satisfies these rules from the list of bases provided:

```python

>>> class Base: pass
>>> class Child(Base): pass
>>> class Grandchild(Base, Child): pass  # TypeError
Traceback (most recent call last):
   ...
TypeError: Cannot create a consistent method resolution order (MRO) for bases Base, Child
```

In the MRO of `Grandchild`, `Base` must appear before `Child` because it is first
in the base class list, but it must also appear after `Child` because it is a parent of
`Child`. This is a contradiction, so the class cannot be defined.

If some of the bases have a custom metaclass, the metaclass of the resulting class
is chosen among the metaclasses of the bases and the explicitly specified metaclass of the
child class. It must be a metaclass that is a subclass of
all other candidate metaclasses. If no such metaclass exists among the candidates,
the class cannot be created, as explained in metaclass-determination.

Finally, the instance layouts of the bases must be compatible. This means that it must be
possible to compute a *solid base* for the class. Exactly which classes are solid bases
depends on the Python implementation.

> **CPython implementation detail:** In CPython, a class is a solid base if it has a
> nonempty `__slots__` definition.
> Many but not all classes defined in C are also solid bases, including most
> builtins (such as `int` or `BaseException`)
> but excluding most concrete `Exception` classes. Generally, a C class
> is a solid base if its underlying struct is different in size from its base class.

Every class has a solid base. `object`, the base class, has itself as its solid base.
If there is a single base, the child class's solid base is that class if it is a solid base,
or else the base class's solid base. If there are multiple bases, we first find the solid base
for each base class to produce a list of candidate solid bases. If there is a unique solid base
that is a subclass of all others, then that class is the solid base. Otherwise, class creation
fails.

Example:

```python

>>> class Solid1:
...    __slots__ = ("solid1",)
>>>
>>> class Solid2:
...    __slots__ = ("solid2",)
>>>
>>> class SolidChild(Solid1):
...    __slots__ = ("solid_child",)
>>>
>>> class C1:  # solid base is `object`
...    pass
>>>
>>> # OK: solid bases are `Solid1` and `object`, and `Solid1` is a subclass of `object`.
>>> class C2(Solid1, C1):  # solid base is `Solid1`
...    pass
>>>
>>> # OK: solid bases are `SolidChild` and `Solid1`, and `SolidChild` is a subclass of `Solid1`.
>>> class C3(SolidChild, Solid1):  # solid base is `SolidChild`
...    pass
>>>
>>> # Error: solid bases are `Solid1` and `Solid2`, but neither is a subclass of the other.
>>> class C4(Solid1, Solid2):  # error: no single solid base
...    pass
Traceback (most recent call last):
  ...
TypeError: multiple bases have instance lay-out conflict
```

## Coroutines

> *Added in version 3.5.*

### Coroutine function definition

```text
python-grammar
async_funcdef: [`decorators`] "async" "def" `funcname` "(" [`parameter_list`] ")"
             : ["->" `expression`] ":" `suite`
```

Execution of Python coroutines can be suspended and resumed at many points
(see coroutine). `await` expressions, `async for` and
`async with` can only be used in the body of a coroutine function.

Functions defined with `async def` syntax are always coroutine functions,
even if they do not contain `await` or `async` keywords.

It is a `SyntaxError` to use a `yield from` expression inside the body
of a coroutine function.

An example of a coroutine function:

```
async def func(param1, param2):
    do_stuff()
    await some_coroutine()
```

> *Changed in version 3.7.*
> `await` and `async` are now keywords; previously they were only
> treated as such inside the body of a coroutine function.

### The `async for` statement

```text
python-grammar
async_for_stmt: "async" `for_stmt`
```

An asynchronous iterable provides an `__aiter__` method that directly
returns an asynchronous iterator, which can call asynchronous code in
its `__anext__` method.

The `async for` statement allows convenient iteration over asynchronous
iterables.

The following code:

```
async for TARGET in ITER:
    SUITE
else:
    SUITE2
```

Is semantically equivalent to:

```
iter = (ITER).__aiter__()
running = True

while running:
    try:
        TARGET = await iter.__anext__()
    except StopAsyncIteration:
        running = False
    else:
        SUITE
else:
    SUITE2
```

except that implicit special method lookup is used
for `__aiter__() and anext__()`.

It is a `SyntaxError` to use an `async for` statement outside the
body of a coroutine function.

### The `async with` statement

```text
python-grammar
async_with_stmt: "async" `with_stmt`
```

An asynchronous context manager is a context manager that is
able to suspend execution in its *enter* and *exit* methods.

The following code:

```
async with EXPRESSION as TARGET:
    SUITE
```

is semantically equivalent to:

```
manager = (EXPRESSION)
aenter = manager.__aenter__
aexit = manager.__aexit__
value = await aenter()
hit_except = False

try:
    TARGET = value
    SUITE
except:
    hit_except = True
    if not await aexit(*sys.exc_info()):
        raise
finally:
    if not hit_except:
        await aexit(None, None, None)
```

except that implicit special method lookup is used
for `__aenter__() and aexit__()`.

It is a `SyntaxError` to use an `async with` statement outside the
body of a coroutine function.

> **See also:** PEP 492 - Coroutines with async and await syntax
> The proposal that made coroutines a proper standalone concept in Python,
> and added supporting syntax.
