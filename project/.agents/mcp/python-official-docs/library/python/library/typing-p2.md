---
title: "typing --- Support for type hints (part 2 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/typing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# typing --- Support for type hints (part 2 of 10)

## Annotating generators and coroutines

A generator can be annotated using the generic type
`Generator[YieldType, SendType, ReturnType]`.
For example:

```
def echo_round() -> Generator[int, float, str]:
    sent = yield 0
    while sent >= 0:
        sent = yield round(sent)
    return 'Done'
```

Note that unlike many other generic classes in the standard library,
the `SendType` of `Generator` behaves
contravariantly, not covariantly or invariantly.

The `SendType` and `ReturnType` parameters default to `None`:

```
def infinite_stream(start: int) -> Generator[int]:
    while True:
        yield start
        start += 1
```

It is also possible to set these types explicitly:

```
def infinite_stream(start: int) -> Generator[int, None, None]:
    while True:
        yield start
        start += 1
```

Simple generators that only ever yield values can also be annotated
as having a return type of either
`Iterable[YieldType]`
or `Iterator[YieldType]`:

```
def infinite_stream(start: int) -> Iterator[int]:
    while True:
        yield start
        start += 1
```

Async generators are handled in a similar fashion, but don't
expect a `ReturnType` type argument
(`AsyncGenerator[YieldType, SendType]`).
The `SendType` argument defaults to `None`, so the following definitions
are equivalent:

```
async def infinite_stream(start: int) -> AsyncGenerator[int]:
    while True:
        yield start
        start = await increment(start)

async def infinite_stream(start: int) -> AsyncGenerator[int, None]:
    while True:
        yield start
        start = await increment(start)
```

As in the synchronous case,
`AsyncIterable[YieldType]`
and `AsyncIterator[YieldType]` are
available as well:

```
async def infinite_stream(start: int) -> AsyncIterator[int]:
    while True:
        yield start
        start = await increment(start)
```

Coroutines can be annotated using
`Coroutine[YieldType, SendType, ReturnType]`.
Generic arguments correspond to those of `Generator`,
for example:

```
from collections.abc import Coroutine
c: Coroutine[list[str], str, int]  # Some coroutine defined elsewhere
x = c.send('hi')                   # Inferred type of 'x' is list[str]
async def bar() -> None:
    y = await c                    # Inferred type of 'y' is int
```

## User-defined generic types

A user-defined class can be defined as a generic class.

```
from logging import Logger

class LoggedVar[T]:
    def __init__(self, value: T, name: str, logger: Logger) -> None:
        self.name = name
        self.logger = logger
        self.value = value

    def set(self, new: T) -> None:
        self.log('Set ' + repr(self.value))
        self.value = new

    def get(self) -> T:
        self.log('Get ' + repr(self.value))
        return self.value

    def log(self, message: str) -> None:
        self.logger.info('%s: %s', self.name, message)
```

This syntax indicates that the class `LoggedVar` is parameterised around a
single type variable `T` . This also makes `T` valid as
a type within the class body.

Generic classes implicitly inherit from `Generic`. For compatibility
with Python 3.11 and lower, it is also possible to inherit explicitly from
`Generic` to indicate a generic class:

```
from typing import TypeVar, Generic

T = TypeVar('T')

class LoggedVar(Generic[T]):
    ...
```

Generic classes have `__class_getitem__()` methods, meaning they
can be parameterised at runtime (e.g. `LoggedVar[int]` below):

```
from collections.abc import Iterable

def zero_all_vars(vars: Iterable[LoggedVar[int]]) -> None:
    for var in vars:
        var.set(0)
```

A generic type can have any number of type variables. All varieties of
`TypeVar` are permissible as parameters for a generic type:

```
from typing import TypeVar, Generic, Sequence

class WeirdTrio[T, B: Sequence[bytes], S: (int, str)]:
    ...

OldT = TypeVar('OldT', contravariant=True)
OldB = TypeVar('OldB', bound=Sequence[bytes], covariant=True)
OldS = TypeVar('OldS', int, str)

class OldWeirdTrio(Generic[OldT, OldB, OldS]):
    ...
```

Each type variable argument to `Generic` must be distinct.
This is thus invalid:

```
from typing import TypeVar, Generic
...

class Pair[M, M]:  # SyntaxError
    ...

T = TypeVar('T')

class Pair(Generic[T, T]):   # INVALID
    ...
```

Generic classes can also inherit from other classes:

```
from collections.abc import Sized

class LinkedList[T](Sized):
    ...
```

When inheriting from generic classes, some type parameters could be fixed:

```
from collections.abc import Mapping

class MyDict[T](Mapping[str, T]):
    ...
```

In this case `MyDict` has a single parameter, `T`.

Using a generic class without specifying type parameters assumes
`Any` for each position. In the following example, `MyIterable` is
not generic but implicitly inherits from `Iterable[Any]`:

```python

from collections.abc import Iterable

class MyIterable(Iterable): # Same as Iterable[Any]
    ...
```

User-defined generic type aliases are also supported. Examples:

```
from collections.abc import Iterable

type Response[S] = Iterable[S] | int

# Return type here is same as Iterable[str] | int
def response(query: str) -> Response[str]:
    ...

type Vec[T] = Iterable[tuple[T, T]]

def inproduct[T: (int, float, complex)](v: Vec[T]) -> T: # Same as Iterable[tuple[T, T]]
    return sum(x*y for x, y in v)
```

For backward compatibility, generic type aliases can also be created
through a simple assignment:

```
from collections.abc import Iterable
from typing import TypeVar

S = TypeVar("S")
Response = Iterable[S] | int
```

> *Changed in version 3.7.*
> `Generic` no longer has a custom metaclass.

> *Changed in version 3.12.*
> Syntactic support for generics and type aliases is new in version 3.12.
> Previously, generic classes had to explicitly inherit from `Generic`
> or contain a type variable in one of their bases.

User-defined generics for parameter expressions are also supported via parameter
specification variables in the form `[**P]`.  The behavior is consistent
with type variables' described above as parameter specification variables are
treated by the `typing` module as a specialized type variable.  The one exception
to this is that a list of types can be used to substitute a `ParamSpec`:

```
>>> class Z[T, **P]: ...  # T is a TypeVar; P is a ParamSpec
...
>>> Z[int, [dict, float]]
__main__.Z[int, [dict, float]]
```

Classes generic over a `ParamSpec` can also be created using explicit
inheritance from `Generic`. In this case, `**` is not used:

```
from typing import ParamSpec, Generic

P = ParamSpec('P')

class Z(Generic[P]):
    ...
```

Another difference between `TypeVar` and `ParamSpec` is that a
generic with only one parameter specification variable will accept
parameter lists in the forms `X[[Type1, Type2, ...]]` and also
`X[Type1, Type2, ...]` for aesthetic reasons.  Internally, the latter is converted
to the former, so the following are equivalent:

```
>>> class X[**P]: ...
...
>>> X[int, str]
__main__.X[[int, str]]
>>> X[[int, str]]
__main__.X[[int, str]]
```

Note that generics with `ParamSpec` may not have correct
`__parameters__` after substitution in some cases because they
are intended primarily for static type checking.

> *Changed in version 3.10.*
> `Generic` can now be parameterized over parameter expressions.
> See `ParamSpec` and PEP 612 for more details.

A user-defined generic class can have ABCs as base classes without a metaclass
conflict. Generic metaclasses are not supported. The outcome of parameterizing
generics is cached, and most types in the `typing` module are hashable and
comparable for equality.

## The `Any` type

A special kind of type is `Any`. A static type checker will treat
every type as assignable to `Any` and `Any` as assignable to
every type.

This means that it is possible to perform any operation or method call on a
value of type `Any` and assign it to any variable:

```
from typing import Any

a: Any = None
a = []          # OK
a = 2           # OK

s: str = ''
s = a           # OK

def foo(item: Any) -> int:
    # Passes type checking; 'item' could be any type,
    # and that type might have a 'bar' method
    item.bar()
    ...
```

Notice that no type checking is performed when assigning a value of type
`Any` to a more precise type. For example, the static type checker did
not report an error when assigning `a` to `s` even though `s` was
declared to be of type `str` and receives an `int` value at
runtime!

Furthermore, all functions without a return type or parameter types will
implicitly default to using `Any`:

```
def legacy_parser(text):
    ...
    return data

# A static type checker will treat the above
# as having the same signature as:
def legacy_parser(text: Any) -> Any:
    ...
    return data
```

This behavior allows `Any` to be used as an *escape hatch* when you
need to mix dynamically and statically typed code.

Contrast the behavior of `Any` with the behavior of `object`.
Similar to `Any`, every type is a subtype of `object`. However,
unlike `Any`, the reverse is not true: `object` is *not* a
subtype of every other type.

That means when the type of a value is `object`, a type checker will
reject almost all operations on it, and assigning it to a variable (or using
it as a return value) of a more specialized type is a type error. For example:

```
def hash_a(item: object) -> int:
    # Fails type checking; an object does not have a 'magic' method.
    item.magic()
    ...

def hash_b(item: Any) -> int:
    # Passes type checking
    item.magic()
    ...

# Passes type checking, since ints and strs are subclasses of object
hash_a(42)
hash_a("foo")

# Passes type checking, since Any is assignable to all types
hash_b(42)
hash_b("foo")
```

Use `object` to indicate that a value could be any type in a typesafe
manner. Use `Any` to indicate that a value is dynamically typed.

## Nominal vs structural subtyping

Initially PEP 484 defined the Python static type system as using
*nominal subtyping*. This means that a class `A` is allowed where
a class `B` is expected if and only if `A` is a subclass of `B`.

This requirement previously also applied to abstract base classes, such as
`Iterable`. The problem with this approach is that a class had
to be explicitly marked to support them, which is unpythonic and unlike
what one would normally do in idiomatic dynamically typed Python code.
For example, this conforms to PEP 484:

```
from collections.abc import Sized, Iterable, Iterator

class Bucket(Sized, Iterable[int]):
    ...
    def __len__(self) -> int: ...
    def __iter__(self) -> Iterator[int]: ...
```

PEP 544 solves this problem by allowing users to write
the above code without explicit base classes in the class definition,
allowing `Bucket` to be implicitly considered a subtype of both `Sized`
and `Iterable[int]` by static type checkers. This is known as
*structural subtyping* (or static duck-typing):

```
from collections.abc import Iterator, Iterable

class Bucket:  # Note: no base classes
    ...
    def __len__(self) -> int: ...
    def __iter__(self) -> Iterator[int]: ...

def collect(items: Iterable[int]) -> int: ...
result = collect(Bucket())  # Passes type check
```

Moreover, by subclassing a special class `Protocol`, a user
can define new custom protocols to fully enjoy structural subtyping
(see examples below).
