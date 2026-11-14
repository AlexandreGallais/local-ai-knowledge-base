---
title: "typing --- Support for type hints (part 4 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/typing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# typing --- Support for type hints (part 4 of 10)

### `NotRequired`

Special typing construct to mark a `TypedDict` key as potentially
missing.

See `TypedDict` and PEP 655 for more details.

> *Added in version 3.11.*

### `ReadOnly`

A special typing construct to mark an item of a `TypedDict` as read-only.

For example:

```
class Movie(TypedDict):
   title: ReadOnly[str]
   year: int

def mutate_movie(m: Movie) -> None:
   m["year"] = 1999  # allowed
   m["title"] = "The Matrix"  # type checker error
```

There is no runtime checking for this property.

See `TypedDict` and PEP 705 for more details.

> *Added in version 3.13.*

### `Annotated`

Special typing form to add context-specific metadata to an annotation.

Add metadata `x` to a given type `T` by using the annotation
`Annotated[T, x]`. Metadata added using `Annotated` can be used by
static analysis tools or at runtime. At runtime, the metadata is stored
in a `__metadata__` attribute.

If a library or tool encounters an annotation `Annotated[T, x]` and has
no special logic for the metadata, it should ignore the metadata and simply
treat the annotation as `T`. As such, `Annotated` can be useful for code
that wants to use annotations for purposes outside Python's static typing
system.

Using `Annotated[T, x]` as an annotation still allows for static
typechecking of `T`, as type checkers will simply ignore the metadata `x`.
In this way, `Annotated` differs from the
no_type_check decorator, which can also be used for
adding annotations outside the scope of the typing system, but
completely disables typechecking for a function or class.

The responsibility of how to interpret the metadata
lies with the tool or library encountering an
`Annotated` annotation. A tool or library encountering an `Annotated` type
can scan through the metadata elements to determine if they are of interest
(e.g., using `isinstance()`).

### `Annotated[<type>, <metadata>]`

Here is an example of how you might use `Annotated` to add metadata to
type annotations if you were doing range analysis:

```python

@dataclass
class ValueRange:
    lo: int
    hi: int

T1 = Annotated[int, ValueRange(-10, 5)]
T2 = Annotated[T1, ValueRange(-20, 3)]
```

The first argument to `Annotated` must be a valid type. Multiple metadata
elements can be supplied as `Annotated` supports variadic arguments. The
order of the metadata elements is preserved and matters for equality checks:

```
@dataclass
class ctype:
     kind: str

a1 = Annotated[int, ValueRange(3, 10), ctype("char")]
a2 = Annotated[int, ctype("char"), ValueRange(3, 10)]

assert a1 != a2  # Order matters
```

It is up to the tool consuming the annotations to decide whether the
client is allowed to add multiple metadata elements to one annotation and how to
merge those annotations.

Nested `Annotated` types are flattened. The order of the metadata elements
starts with the innermost annotation:

```
assert Annotated[Annotated[int, ValueRange(3, 10)], ctype("char")] == Annotated[
    int, ValueRange(3, 10), ctype("char")
]
```

However, this does not apply to `Annotated` types referenced through a type
alias, to avoid forcing evaluation of the underlying `TypeAliasType`:

```
type From3To10[T] = Annotated[T, ValueRange(3, 10)]
assert Annotated[From3To10[int], ctype("char")] != Annotated[
   int, ValueRange(3, 10), ctype("char")
]
```

Duplicated metadata elements are not removed:

```
assert Annotated[int, ValueRange(3, 10)] != Annotated[
    int, ValueRange(3, 10), ValueRange(3, 10)
]
```

`Annotated` can be used with nested and generic aliases:

```python

@dataclass
class MaxLen:
    value: int

type Vec[T] = Annotated[list[tuple[T, T]], MaxLen(10)]

# When used in a type annotation, a type checker will treat "V" the same as
# ``Annotated[list[tuple[int, int]], MaxLen(10)]``:
type V = Vec[int]
```

`Annotated` cannot be used with an unpacked `TypeVarTuple`:

```
type Variadic[*Ts] = Annotated[*Ts, Ann1] = Annotated[T1, T2, T3, ..., Ann1]  # NOT valid
```

where `T1`, `T2`, ... are `TypeVars`. This is invalid as
only one type should be passed to Annotated.

By default, `get_type_hints()` strips the metadata from annotations.
Pass `include_extras=True` to have the metadata preserved:

```python

>>> from typing import Annotated, get_type_hints
>>> def func(x: Annotated[int, "metadata"]) -> None: pass
...
>>> get_type_hints(func)
{'x': <class 'int'>, 'return': <class 'NoneType'>}
>>> get_type_hints(func, include_extras=True)
{'x': typing.Annotated[int, 'metadata'], 'return': <class 'NoneType'>}
```

At runtime, the metadata associated with an `Annotated` type can be
retrieved via the `__metadata__` attribute:

```python

>>> from typing import Annotated
>>> X = Annotated[int, "very", "important", "metadata"]
>>> X
typing.Annotated[int, 'very', 'important', 'metadata']
>>> X.__metadata__
('very', 'important', 'metadata')
```

If you want to retrieve the original type wrapped by `Annotated`, use the
`__origin__` attribute:

```python

>>> from typing import Annotated, get_origin
>>> Password = <example-value>[str, "<example-value>"]
>>> Password.__origin__
<class 'str'>
```

Note that using `get_origin()` will return `Annotated` itself:

```python

>>> get_origin(Password)
typing.Annotated
```

> **See also:** PEP 593 - Flexible function and variable annotations
> The PEP introducing `Annotated` to the standard library.

> *Added in version 3.9.*

### `TypeForm`

A special form representing the value that results from evaluating a
type expression.

This value encodes the information supplied in the type expression, and
it represents the type described by that type expression.

When used in a type expression, `TypeForm` describes a set of type form
objects. It accepts a single type argument, which must be a valid type
expression. `TypeForm[T]` describes the set of all type form objects that
represent the type `T` or types assignable to `T`.

`TypeForm(obj)` simply returns `obj` unchanged. This is useful for
explicitly marking a value as a type form for static type checkers.

Example:

```
from typing import Any, TypeForm

def cast[T](typ: TypeForm[T], value: Any) -> T: ...

reveal_type(cast(int, "x"))  # Revealed type is "int"
```

See PEP 747 for details.

> *Added in version 3.15.*

### `TypeIs`

Special typing construct for marking user-defined type predicate functions.

`TypeIs` can be used to annotate the return type of a user-defined
type predicate function.  `TypeIs` only accepts a single type argument.
At runtime, functions marked this way should return a boolean and take at
least one positional argument.

`TypeIs` aims to benefit *type narrowing* -- a technique used by static
type checkers to determine a more precise type of an expression within a
program's code flow.  Usually type narrowing is done by analyzing
conditional code flow and applying the narrowing to a block of code.  The
conditional expression here is sometimes referred to as a "type predicate":

```
def is_str(val: str | float):
    # "isinstance" type predicate
    if isinstance(val, str):
        # Type of ``val`` is narrowed to ``str``
        ...
    else:
        # Else, type of ``val`` is narrowed to ``float``.
        ...
```

Sometimes it would be convenient to use a user-defined boolean function
as a type predicate.  Such a function should use `TypeIs[...]` or
`TypeGuard` as its return type to alert static type checkers to
this intention.  `TypeIs` usually has more intuitive behavior than
`TypeGuard`, but it cannot be used when the input and output types
are incompatible (e.g., `list[object]` to `list[int]`) or when the
function does not return `True` for all instances of the narrowed type.

Using  `-> TypeIs[NarrowedType]` tells the static type checker that for a given
function:

1. The return value is a boolean.
1. If the return value is `True`, the type of its argument
is the intersection of the argument's original type and `NarrowedType`.
1. If the return value is `False`, the type of its argument
is narrowed to exclude `NarrowedType`.

For example:

```
from typing import assert_type, final, TypeIs

class Parent: pass
class Child(Parent): pass
@final
class Unrelated: pass

def is_parent(val: object) -> TypeIs[Parent]:
    return isinstance(val, Parent)

def run(arg: Child | Unrelated):
    if is_parent(arg):
        # Type of ``arg`` is narrowed to the intersection
        # of ``Parent`` and ``Child``, which is equivalent to
        # ``Child``.
        assert_type(arg, Child)
    else:
        # Type of ``arg`` is narrowed to exclude ``Parent``,
        # so only ``Unrelated`` is left.
        assert_type(arg, Unrelated)
```

The type inside `TypeIs` must be consistent with the type of the
function's argument; if it is not, static type checkers will raise
an error.  An incorrectly written `TypeIs` function can lead to
unsound behavior in the type system; it is the user's responsibility
to write such functions in a type-safe manner.

If a `TypeIs` function is a class or instance method, then the type in
`TypeIs` maps to the type of the second parameter (after `cls` or
`self`).

In short, the form `def foo(arg: TypeA) -> TypeIs[TypeB]: ...`,
means that if `foo(arg)` returns `True`, then `arg` is an instance
of `TypeB`, and if it returns `False`, it is not an instance of `TypeB`.

`TypeIs` also works with type variables.  For more information, see
PEP 742 (Narrowing types with `TypeIs`).

> *Added in version 3.13.*

### `TypeGuard`

Special typing construct for marking user-defined type predicate functions.

Type predicate functions are user-defined functions that return whether their
argument is an instance of a particular type.
`TypeGuard` works similarly to `TypeIs`, but has subtly different
effects on type checking behavior (see below).

Using  `-> TypeGuard` tells the static type checker that for a given
function:

1. The return value is a boolean.
1. If the return value is `True`, the type of its argument
is the type inside `TypeGuard`.

`TypeGuard` also works with type variables.  See PEP 647 for more details.

For example:

```
def is_str_list(val: list[object]) -> TypeGuard[list[str]]:
    '''Determines whether all objects in the list are strings'''
    return all(isinstance(x, str) for x in val)

def func1(val: list[object]):
    if is_str_list(val):
        # Type of ``val`` is narrowed to ``list[str]``.
        print(" ".join(val))
    else:
        # Type of ``val`` remains as ``list[object]``.
        print("Not a list of strings!")
```

`TypeIs` and `TypeGuard` differ in the following ways:

- `TypeIs` requires the narrowed type to be a subtype of the input type, while
`TypeGuard` does not.  The main reason is to allow for things like
narrowing `list[object]` to `list[str]` even though the latter
is not a subtype of the former, since `list` is invariant.
- When a `TypeGuard` function returns `True`, type checkers narrow the type of the
variable to exactly the `TypeGuard` type. When a `TypeIs` function returns `True`,
type checkers can infer a more precise type combining the previously known type of the
variable with the `TypeIs` type. (Technically, this is known as an intersection type.)
- When a `TypeGuard` function returns `False`, type checkers cannot narrow the type of
the variable at all. When a `TypeIs` function returns `False`, type checkers can narrow
the type of the variable to exclude the `TypeIs` type.

> *Added in version 3.10.*

### `Unpack`

Typing operator to conceptually mark an object as having been unpacked.

For example, using the unpack operator `*` on a
type variable tuple is equivalent to using `Unpack`
to mark the type variable tuple as having been unpacked:

```
Ts = TypeVarTuple('Ts')
tup: tuple[*Ts]
# Effectively does:
tup: tuple[Unpack[Ts]]
```

In fact, `Unpack` can be used interchangeably with `*` in the context
of `typing.TypeVarTuple` and
`builtins.tuple` types. You might see `Unpack` being used
explicitly in older versions of Python, where `*` couldn't be used in
certain places:

```
# In older versions of Python, TypeVarTuple and Unpack
# are located in the `typing_extensions` backports package.
from typing_extensions import TypeVarTuple, Unpack

Ts = TypeVarTuple('Ts')
tup: tuple[*Ts]         # Syntax error on Python <= 3.10!
tup: tuple[Unpack[Ts]]  # Semantically equivalent, and backwards-compatible
```

`Unpack` can also be used along with `typing.TypedDict` for typing
`**kwargs` in a function signature:

```
from typing import TypedDict, Unpack

class Movie(TypedDict):
    name: str
    year: int

# This function expects two keyword arguments - `name` of type `str`
# and `year` of type `int`.
def foo(**kwargs: Unpack[Movie]): ...
```

See PEP 692 for more details on using `Unpack` for `**kwargs` typing.

> *Added in version 3.11.*

#### Building generic types and type aliases

The following classes should not be used directly as annotations.
Their intended purpose is to be building blocks
for creating generic types and type aliases.

These objects can be created through special syntax
(type parameter lists and the `type` statement).
For compatibility with Python 3.11 and earlier, they can also be created
without the dedicated syntax, as documented below.

### class `Generic`

Abstract base class for generic types.

A generic type is typically declared by adding a list of type parameters
after the class name:

```
class Mapping[KT, VT]:
    def __getitem__(self, key: KT) -> VT:
        ...
        # Etc.
```

Such a class implicitly inherits from `Generic`.
The runtime semantics of this syntax are discussed in the
Language Reference.

This class can then be used as follows:

```
def lookup_name[X, Y](mapping: Mapping[X, Y], key: X, default: Y) -> Y:
    try:
        return mapping[key]
    except KeyError:
        return default
```

Here the brackets after the function name indicate a
generic function.

For backwards compatibility, generic classes can also be
declared by explicitly inheriting from
`Generic`. In this case, the type parameters must be declared
separately:

```
KT = TypeVar('KT')
VT = TypeVar('VT')

class Mapping(Generic[KT, VT]):
    def __getitem__(self, key: KT) -> VT:
        ...
        # Etc.
```
