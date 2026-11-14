---
title: "typing --- Support for type hints (part 7 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/typing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# typing --- Support for type hints (part 7 of 10)

### class `TypedDict(dict)`

Special construct to add type hints to a dictionary.
At runtime "`TypedDict` instances" are simply `dicts`.

`TypedDict` declares a dictionary type that expects all of its
instances to have a certain set of keys, where each key is
associated with a value of a consistent type. This expectation
is not checked at runtime but is only enforced by type checkers.
Usage:

```
class Point2D(TypedDict):
    x: int
    y: int
    label: str

a: Point2D = {'x': 1, 'y': 2, 'label': 'good'}  # OK
b: Point2D = {'z': 3, 'label': 'bad'}           # Fails type check

assert Point2D(x=1, y=2, label='first') == dict(x=1, y=2, label='first')
```

An alternative way to create a `TypedDict` is by using
function-call syntax. The second argument must be a literal `dict`:

```
Point2D = TypedDict('Point2D', {'x': int, 'y': int, 'label': str})
```

This functional syntax allows defining keys which are not valid
identifiers, for example because they are
keywords or contain hyphens, or when key names must not be
mangled like regular private names:

```
# raises SyntaxError
class Point2D(TypedDict):
    in: int  # 'in' is a keyword
    x-y: int  # name with hyphens

class Definition(TypedDict):
    __schema: str  # mangled to `_Definition__schema`

# OK, functional syntax
Point2D = TypedDict('Point2D', {'in': int, 'x-y': int})
Definition = TypedDict('Definition', {'__schema': str})  # not mangled
```

By default, all keys must be present in a `TypedDict`. It is possible to
mark individual keys as non-required using `NotRequired`:

```
class Point2D(TypedDict):
    x: int
    y: int
    label: NotRequired[str]

# Alternative syntax
Point2D = TypedDict('Point2D', {'x': int, 'y': int, 'label': NotRequired[str]})
```

This means that a `Point2D` `TypedDict` can have the `label`
key omitted.

It is also possible to mark all keys as non-required by default
by specifying a totality of `False`:

```
class Point2D(TypedDict, total=False):
    x: int
    y: int

# Alternative syntax
Point2D = TypedDict('Point2D', {'x': int, 'y': int}, total=False)
```

This means that a `Point2D` `TypedDict` can have any of the keys
omitted. A type checker is only expected to support a literal `False` or
`True` as the value of the `total` argument. `True` is the default,
and makes all items defined in the class body required.

Individual keys of a `total=False` `TypedDict` can be marked as
required using `Required`:

```
class Point2D(TypedDict, total=False):
    x: Required[int]
    y: Required[int]
    label: str

# Alternative syntax
Point2D = TypedDict('Point2D', {
    'x': Required[int],
    'y': Required[int],
    'label': str
}, total=False)
```

It is possible for a `TypedDict` type to inherit from one or more other `TypedDict` types
using the class-based syntax.
Usage:

```
class Point3D(Point2D):
    z: int
```

`Point3D` has three items: `x`, `y` and `z`. It is equivalent to this
definition:

```
class Point3D(TypedDict):
    x: int
    y: int
    z: int
```

By default, a `TypedDict` is open, meaning that it may contain additional keys
at runtime beyond those defined in the class body. The *closed* class argument can
be used to control this; if `closed=True`, the `TypedDict` cannot contain additional keys.

```
class ClosedPoint(TypedDict, closed=True):
    x: int
    y: int

class ClosedPoint3D(ClosedPoint):  # type checker error: cannot add keys to a closed TypedDict
    z: int
```

Setting `closed=False` explicitly requests the default open behavior. If the argument is not
passed, this state is inherited from the parent class.

In addition to being open or closed, a `TypedDict` can also be configured to have extra items.
If the *extra_items* class argument is set to a type, the `TypedDict` can contain arbitrary
additional keys, but the values of those keys must be of the specified type.

```
class ExtraItemsPoint(TypedDict, extra_items=int):
    x: int
    y: int

point: ExtraItemsPoint = {'x': 1, 'y': 2, 'anything': 3}  # OK
```

The *extra_items* argument is also inherited through subclassing. It is unset
by default, and it may not be used together with the *closed* argument.

A `TypedDict` cannot inherit from a non-`TypedDict` class,
except for `Generic`. For example:

```
class X(TypedDict):
    x: int

class Y(TypedDict):
    y: int

class Z(object): pass  # A non-TypedDict class

class XY(X, Y): pass  # OK

class XZ(X, Z): pass  # raises TypeError
```

A `TypedDict` can be generic:

```
class Group[T](TypedDict):
    key: T
    group: list[T]
```

To create a generic `TypedDict` that is compatible with Python 3.11
or lower, inherit from `Generic` explicitly:

```python

T = TypeVar("T")

class Group(TypedDict, Generic[T]):
    key: T
    group: list[T]
```

A `TypedDict` can be introspected via `annotationlib.get_annotations()`
(see annotations-howto for more information on annotations best practices)
and the following attributes:

### `__total__`

`Point2D.__total__` gives the value of the `total` argument.
Example:

```python

>>> from typing import TypedDict
>>> class Point2D(TypedDict): pass
>>> Point2D.__total__
True
>>> class Point2D(TypedDict, total=False): pass
>>> Point2D.__total__
False
>>> class Point3D(Point2D): pass
>>> Point3D.__total__
True
```

This attribute reflects *only* the value of the `total` argument
to the current `TypedDict` class, not whether the class is semantically
total. For example, a `TypedDict` with `__total__` set to `True` may
have keys marked with `NotRequired`, or it may inherit from another
`TypedDict` with `total=False`. Therefore, it is generally better to use
`__required_keys__ and optional_keys__` for introspection.

### `__required_keys__`

> *Added in version 3.9.*

### `__optional_keys__`

`Point2D.__required_keys__` and `Point2D.__optional_keys__` return
`frozenset` objects containing required and non-required keys, respectively.

Keys marked with `Required` will always appear in `__required_keys__`
and keys marked with `NotRequired` will always appear in `__optional_keys__`.

For backwards compatibility with Python 3.10 and below,
it is also possible to use inheritance to declare both required and
non-required keys in the same `TypedDict`. This is done by declaring a
`TypedDict` with one value for the `total` argument and then
inheriting from it in another `TypedDict` with a different value for
`total`:

```python

>>> class Point2D(TypedDict, total=False):
...     x: int
...     y: int
...
>>> class Point3D(Point2D):
...     z: int
...
>>> Point3D.__required_keys__ == frozenset({'z'})
True
>>> Point3D.__optional_keys__ == frozenset({'x', 'y'})
True
```

> *Added in version 3.9.*

> **Note:** If `from __future__ import annotations` is used or if annotations
> are given as strings, annotations are not evaluated when the
> `TypedDict` is defined. Therefore, the runtime introspection that
> `__required_keys__` and `__optional_keys__` rely on may not work
> properly, and the values of the attributes may be incorrect.

### `__readonly_keys__`

A `frozenset` containing the names of all read-only keys. Keys
are read-only if they carry the `ReadOnly` qualifier.

> *Added in version 3.13.*

### `__mutable_keys__`

A `frozenset` containing the names of all mutable keys. Keys
are mutable if they do not carry the `ReadOnly` qualifier.

> *Added in version 3.13.*

### `__closed__`

The value of the *closed* class argument. It can be `True`, `False`, or `None`.

### `__extra_items__`

The value of the *extra_items* class argument. It can be a valid type or `NoExtraItems`.

See the TypedDict section in the typing documentation for more examples and detailed rules.

> *Added in version 3.8.*

> *Changed in version 3.9.*
> `TypedDict` is now a function rather than a class.
> It can still be used as a class base, as described above.

> *Changed in version 3.11.*
> Added support for marking individual keys as `Required` or `NotRequired`.
> See PEP 655.

> *Changed in version 3.11.*
> Added support for generic `TypedDict`s.

> *Changed in version 3.13.*
> Removed support for the keyword-argument method of creating `TypedDict`s.

> *Changed in version 3.13.*
> Support for the `ReadOnly` qualifier was added. See PEP 705.

> *Changed in version 3.15.*
> Support for the *closed* and *extra_items* class arguments was added. See PEP 728.

### Protocols

The following protocols are provided by the `typing` module. All are decorated
with runtime_checkable.

### class `SupportsAbs`

A protocol with one abstract method `__abs__` that is covariant
in its return type.

### class `SupportsBytes`

A protocol with one abstract method `__bytes__`.

### class `SupportsComplex`

A protocol with one abstract method `__complex__`.

### class `SupportsFloat`

A protocol with one abstract method `__float__`.

### class `SupportsIndex`

A protocol with one abstract method `__index__`.

> *Added in version 3.8.*

### class `SupportsInt`

A protocol with one abstract method `__int__`.

### class `SupportsRound`

A protocol with one abstract method `__round__`
that is covariant in its return type.

### class `IO[AnyStr]`

```python
TextIO
BinaryIO
```

Generic class `IO[AnyStr]` and its subclasses `TextIO(IO[str])`
and `BinaryIO(IO[bytes])`
represent the types of I/O streams such as returned by
`open()`. Please note that these classes are not protocols, and
their interface is fairly broad.

The protocols `io.Reader` and `io.Writer` offer a simpler
alternative for argument types, when only the `read()` or `write()`
methods are accessed, respectively:

```
def read_and_write(reader: Reader[str], writer: Writer[bytes]):
    data = reader.read()
    writer.write(data.encode())
```

Also consider using `collections.abc.Iterable` for iterating over
the lines of an input stream:

```
def read_config(stream: Iterable[str]):
    for line in stream:
        ...
```

### `cast(typ, val)`

Cast a value to a type.

This returns the value unchanged.  To the type checker this
signals that the return value has the designated type, but at
runtime we intentionally don't check anything (we want this
to be as fast as possible).

### `assert_type(val, typ, /)`

Ask a static type checker to confirm that *val* has an inferred type of *typ*.

At runtime this does nothing: it returns the first argument unchanged with no
checks or side effects, no matter the actual type of the argument.

When a static type checker encounters a call to `assert_type()`, it
emits an error if the value is not of the specified type:

```
def greet(name: str) -> None:
    assert_type(name, str)  # OK, inferred type of `name` is `str`
    assert_type(name, int)  # type checker error
```

This function is useful for ensuring the type checker's understanding of a
script is in line with the developer's intentions:

```
def complex_function(arg: object):
    # Do some complex type-narrowing logic,
    # after which we hope the inferred type will be `int`
    ...
    # Test whether the type checker correctly understands our function
    assert_type(arg, int)
```

> *Added in version 3.11.*

### `assert_never(arg, /)`

Ask a static type checker to confirm that a line of code is unreachable.

Example:

```
def int_or_str(arg: int | str) -> None:
    match arg:
        case int():
            print("It's an int")
        case str():
            print("It's a str")
        case _ as unreachable:
            assert_never(unreachable)
```

Here, the annotations allow the type checker to infer that the
last case can never execute, because `arg` is either
an `int` or a `str`, and both options are covered by
earlier cases.

If a type checker finds that a call to `assert_never()` is
reachable, it will emit an error. For example, if the type annotation
for `arg` was instead `int | str | float`, the type checker would
emit an error pointing out that `unreachable` is of type `float`.
For a call to `assert_never` to pass type checking, the inferred type of
the argument passed in must be the bottom type, `Never`, and nothing
else.

At runtime, this throws an exception when called.

> **See also:** `Unreachable Code and Exhaustiveness Checking
> <https://typing.python.org/en/latest/guides/unreachable.html>`__ has more
> information about exhaustiveness checking with static typing.

> *Added in version 3.11.*

### `reveal_type(obj, /)`

Ask a static type checker to reveal the inferred type of an expression.

When a static type checker encounters a call to this function,
it emits a diagnostic with the inferred type of the argument. For example:

```
x: int = 1
reveal_type(x)  # Revealed type is "builtins.int"
```

This can be useful when you want to debug how your type checker
handles a particular piece of code.

At runtime, this function prints the runtime type of its argument to
`sys.stderr` and returns the argument unchanged (allowing the call to
be used within an expression):

```
x = reveal_type(1)  # prints "Runtime type is int"
print(x)  # prints "1"
```

Note that the runtime type may be different from (more or less specific
than) the type statically inferred by a type checker.

Most type checkers support `reveal_type()` anywhere, even if the
name is not imported from `typing`. Importing the name from
`typing`, however, allows your code to run without runtime errors and
communicates intent more clearly.

> *Added in version 3.11.*
