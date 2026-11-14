---
title: "typing --- Support for type hints (part 6 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/typing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# typing --- Support for type hints (part 6 of 10)

### `__default__`

The default value of the parameter specification, or `typing.NoDefault` if it
has no default.

> *Added in version 3.13.*

### `evaluate_default`

An evaluate function corresponding to the `__default__` attribute.
When called directly, this method supports only the `VALUE`
format, which is equivalent to accessing the `__default__` attribute directly,
but the method object can be passed to `annotationlib.call_evaluate_function()`
to evaluate the value in a different format.

> *Added in version 3.14.*

### `has_default()`

Return whether or not the parameter specification has a default value. This is equivalent
to checking whether `__default__` is not the `typing.NoDefault`
singleton, except that it does not force evaluation of the
lazily evaluated default value.

> *Added in version 3.13.*

Parameter specification variables created with `covariant=True` or
`contravariant=True` can be used to declare covariant or contravariant
generic types.  The `bound` argument is also accepted, similar to
`TypeVar`.  However the actual semantics of these keywords are yet to
be decided.

> *Added in version 3.10.*

> *Changed in version 3.12.*
> Parameter specifications can now be declared using the
> type parameter syntax introduced by PEP 695.

> *Changed in version 3.13.*
> Support for default values was added.

> **Note:** Only parameter specification variables defined in global scope can
> be pickled.

> **See also:** - PEP 612 -- Parameter Specification Variables (the PEP which introduced
> `ParamSpec` and `Concatenate`)
> - `Concatenate`
> - annotating-callables

### class `ParamSpecArgs`

```python
ParamSpecKwargs
```

Arguments and keyword arguments attributes of a `ParamSpec`. The
`P.args` attribute of a `ParamSpec` is an instance of `ParamSpecArgs`,
and `P.kwargs` is an instance of `ParamSpecKwargs`. They are intended
for runtime introspection and have no special meaning to static type checkers.

Calling `get_origin()` on either of these objects will return the
original `ParamSpec`:

```python

>>> from typing import ParamSpec, get_origin
>>> P = ParamSpec("P")
>>> get_origin(P.args) is P
True
>>> get_origin(P.kwargs) is P
True
```

> *Added in version 3.10.*

### class `TypeAliasType(name, value, *, type_params=(), qualname=None)`

The type of type aliases created through the `type` statement.

Example:

```python

>>> type Alias = int
>>> type(Alias)
<class 'typing.TypeAliasType'>
```

> *Added in version 3.12.*

### `__name__`

The name of the type alias:

```python

>>> type Alias = int
>>> Alias.__name__
'Alias'
```

### `__qualname__`

The qualified name of the type alias:

```python

>>> class Class:
...     type Alias = int
...
>>> Class.Alias.__qualname__
'Class.Alias'
```

> *Added in version 3.15.*

### `__module__`

The name of the module in which the type alias was defined:

```
>>> type Alias = int
>>> Alias.__module__
'__main__'
```

This attribute is writable.

> *Changed in version 3.15.*
> The attribute is now writable.

### `__type_params__`

The type parameters of the type alias, or an empty tuple if the alias is
not generic:

```python

>>> type ListOrSet[T] = list[T] | set[T]
>>> ListOrSet.__type_params__
(T,)
>>> type NotGeneric = int
>>> NotGeneric.__type_params__
()
```

### `__value__`

The type alias's value. This is lazily evaluated,
so names used in the definition of the alias are not resolved until the
`__value__` attribute is accessed:

```python

>>> type Mutually = Recursive
>>> type Recursive = Mutually
>>> Mutually
Mutually
>>> Recursive
Recursive
>>> Mutually.__value__
Recursive
>>> Recursive.__value__
Mutually
```

### `evaluate_value`

An evaluate function corresponding to the `__value__` attribute.
When called directly, this method supports only the `VALUE`
format, which is equivalent to accessing the `__value__` attribute directly,
but the method object can be passed to `annotationlib.call_evaluate_function()`
to evaluate the value in a different format:

```python

>>> type Alias = undefined
>>> Alias.__value__
Traceback (most recent call last):
...
NameError: name 'undefined' is not defined
>>> from annotationlib import Format, call_evaluate_function
>>> Alias.evaluate_value(Format.VALUE)
Traceback (most recent call last):
...
NameError: name 'undefined' is not defined
>>> call_evaluate_function(Alias.evaluate_value, Format.FORWARDREF)
ForwardRef('undefined')
```

> *Added in version 3.14.*

**Unpacking**

Type aliases support star unpacking using the `*Alias` syntax.
This is equivalent to using `Unpack[Alias]` directly:

```python

>>> type Alias = tuple[int, str]
>>> type Unpacked = tuple[bool, *Alias]
>>> Unpacked.__value__
tuple[bool, typing.Unpack[Alias]]
```

> *Added in version 3.14.*

#### Other special directives

These functions and classes should not be used directly as annotations.
Their intended purpose is to be building blocks for creating and declaring
types.

### class `NamedTuple`

Typed version of `collections.namedtuple()`.

Usage:

```
class Employee(NamedTuple):
    name: str
    id: int
```

This is equivalent to:

```
Employee = collections.namedtuple('Employee', ['name', 'id'])
```

To give a field a default value, you can assign to it in the class body:

```
class Employee(NamedTuple):
    name: str
    id: int = 3

employee = Employee('Guido')
assert employee.id == 3
```

Fields with a default value must come after any fields without a default.

The types for each field name can be retrieved by calling
`annotationlib.get_annotations()` on the resulting class. (The field
names are in the `_fields` attribute and the default values are in the
`_field_defaults` attribute, both of which are part of the `namedtuple()`
API.)

`NamedTuple` subclasses can also have docstrings and methods:

```
class Employee(NamedTuple):
    """Represents an employee."""
    name: str
    id: int = 3

    def __repr__(self) -> str:
        return f'<Employee {self.name}, id={self.id}>'
```

`NamedTuple` subclasses can be generic:

```
class Group[T](NamedTuple):
    key: T
    group: list[T]
```

Backward-compatible usage:

```
# For creating a generic NamedTuple on Python 3.11
T = TypeVar("T")

class Group(NamedTuple, Generic[T]):
    key: T
    group: list[T]

# A functional syntax is also supported
Employee = NamedTuple('Employee', [('name', str), ('id', int)])
```

> *Changed in version 3.6.*
> Added support for PEP 526 variable annotation syntax.

> *Changed in version 3.6.1.*
> Added support for default values, methods, and docstrings.

> *Changed in version 3.8.*
> The `_field_types` and `__annotations__` attributes are
> now regular dictionaries instead of instances of `OrderedDict`.

> *Changed in version 3.9.*
> Removed the `_field_types` attribute in favor of the more
> standard `__annotations__` attribute which has the same information.

> *Changed in version 3.9.*
> `NamedTuple` is now a function rather than a class.
> It can still be used as a class base, as described above.

> *Changed in version 3.11.*
> Added support for generic namedtuples.

> *Changed in version 3.14.*
> Using `super()` (and the `__class__` closure variable) in methods of `NamedTuple` subclasses
> is unsupported and causes a `TypeError`.

### class `NewType(name, tp)`

Helper class to create low-overhead distinct types.

A `NewType` is considered a distinct type by a type checker. At runtime,
however, calling a `NewType` returns its argument unchanged.

Usage:

```
UserId = NewType('UserId', int)  # Declare the NewType "UserId"
first_user = UserId(1)  # "UserId" returns the argument unchanged at runtime
```

### `__module__`

The name of the module in which the new type is defined.

### `__name__`

The name of the new type.

### `__supertype__`

The type that the new type is based on.

> *Added in version 3.5.2.*

> *Changed in version 3.10.*
> `NewType` is now a class rather than a function.

### class `Protocol(Generic)`

Base class for protocol classes.

Protocol classes are defined like this:

```
class Proto(Protocol):
    def meth(self) -> int:
        ...
```

Such classes are primarily used with static type checkers that recognize
structural subtyping (static duck-typing), for example:

```
class C:
    def meth(self) -> int:
        return 0

def func(x: Proto) -> int:
    return x.meth()

func(C())  # Passes static type check
```

See PEP 544 for more details. Protocol classes decorated with
runtime_checkable (described later) act as simple-minded runtime
protocols that check only the presence of given attributes, ignoring their
type signatures. Protocol classes without this decorator cannot be used
as the second argument to `isinstance()` or `issubclass()`.

Protocol classes can be generic, for example:

```
class GenProto[T](Protocol):
    def meth(self) -> T:
        ...
```

In code that needs to be compatible with Python 3.11 or older, generic
Protocols can be written as follows:

```
T = TypeVar("T")

class GenProto(Protocol[T]):
    def meth(self) -> T:
        ...
```

> *Added in version 3.8.*

> *Deprecated since version 3.15, removed in version 3.20.*
> It is deprecated to call `isinstance()` and `issubclass()` checks on
> protocol classes that were not explicitly decorated with `runtime_checkable()`
> but that inherit from a runtime-checkable protocol class. This will throw
> a `TypeError` in Python 3.20.

### decorator `runtime_checkable`

Mark a protocol class as a runtime protocol.

Such a protocol can be used with `isinstance()` and `issubclass()`.
This allows a simple-minded structural check, very similar to "one-trick ponies"
in `collections.abc` such as `Iterable`.  For example:

```
@runtime_checkable
class Closable(Protocol):
    def close(self): ...

assert isinstance(open('/some/file'), Closable)

@runtime_checkable
class Named(Protocol):
    name: str

import threading
assert isinstance(threading.Thread(name='Bob'), Named)
```

Runtime checkability of protocols is not inherited. A subclass of a runtime-checkable protocol
is only runtime-checkable if it is explicitly marked as such, regardless of class hierarchy:

```
@runtime_checkable
class Iterable(Protocol):
    def __iter__(self): ...

# Without @runtime_checkable, Reversible would no longer be runtime-checkable.
@runtime_checkable
class Reversible(Iterable, Protocol):
    def __reversed__(self): ...
```

This decorator raises `TypeError` when applied to a non-protocol class.

> **Note:** runtime_checkable will check only the presence of the required
> methods or attributes, not their type signatures or types.
> For example, `ssl.SSLObject`
> is a class, therefore it passes an `issubclass()`
> check against Callable. However, the
> `ssl.SSLObject.__init__` method exists only to raise a
> `TypeError` with a more informative message, therefore making
> it impossible to call (instantiate) `ssl.SSLObject`.

> **Note:** An `isinstance()` check against a runtime-checkable protocol can be
> surprisingly slow compared to an `isinstance()` check against
> a non-protocol class. Consider using alternative idioms such as
> `hasattr()` calls for structural checks in performance-sensitive
> code.

> *Added in version 3.8.*

> *Changed in version 3.12.*
> The internal implementation of `isinstance()` checks against
> runtime-checkable protocols now uses `inspect.getattr_static()`
> to look up attributes (previously, `hasattr()` was used).
> As a result, some objects which used to be considered instances
> of a runtime-checkable protocol may no longer be considered instances
> of that protocol on Python 3.12+, and vice versa.
> Most users are unlikely to be affected by this change.

> *Changed in version 3.12.*
> The members of a runtime-checkable protocol are now considered "frozen"
> at runtime as soon as the class has been created. Monkey-patching
> attributes onto a runtime-checkable protocol will still work, but will
> have no impact on `isinstance()` checks comparing objects to the
> protocol. See What's new in Python 3.12
> for more details.

> *Deprecated since version 3.15, removed in version 3.20.*
> It is deprecated to call `isinstance()` and `issubclass()` checks on
> protocol classes that were not explicitly decorated with `runtime_checkable()`
> but that inherit from a runtime-checkable protocol class. This will throw
> a `TypeError` in Python 3.20.
