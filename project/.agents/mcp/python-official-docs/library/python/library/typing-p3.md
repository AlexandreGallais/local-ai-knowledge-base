---
title: "typing --- Support for type hints (part 3 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/typing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# typing --- Support for type hints (part 3 of 10)

## Module contents

The `typing` module defines the following classes, functions and decorators.

### Special typing primitives

#### Special types

These can be used as types in annotations. They do not support subscription
using `[]`.

### `Any`

Special type indicating an unconstrained type.

- Every type is assignable to `Any`.
- `Any` is assignable to every type.

> *Changed in version 3.11.*
> `Any` can now be used as a base class. This can be useful for
> avoiding type checker errors with classes that can duck type anywhere or
> are highly dynamic.

### `AnyStr`

A constrained type variable.

Definition:

```
AnyStr = TypeVar('AnyStr', str, bytes)
```

`AnyStr` is meant to be used for functions that may accept `str` or
`bytes` arguments but cannot allow the two to mix.

For example:

```
def concat(a: AnyStr, b: AnyStr) -> AnyStr:
    return a + b

concat("foo", "bar")    # OK, output has type 'str'
concat(b"foo", b"bar")  # OK, output has type 'bytes'
concat("foo", b"bar")   # Error, cannot mix str and bytes
```

Note that, despite its name, `AnyStr` has nothing to do with the
`Any` type, nor does it mean "any string". In particular, `AnyStr`
and `str | bytes` are different from each other and have different use
cases:

```
# Invalid use of AnyStr:
# The type variable is used only once in the function signature,
# so cannot be "solved" by the type checker
def greet_bad(cond: bool) -> AnyStr:
    return "hi there!" if cond else b"greetings!"

# The better way of annotating this function:
def greet_proper(cond: bool) -> str | bytes:
    return "hi there!" if cond else b"greetings!"
```

> *Deprecated since version 3.13, removed in version 3.18.*
> Deprecated in favor of the new type parameter syntax.
> Use `class A[T: (str, bytes)]: ...` instead of importing `AnyStr`. See
> PEP 695 for more details.
> In Python 3.16, `AnyStr` will be removed from `typing.__all__`, and
> deprecation warnings will be emitted at runtime when it is accessed or
> imported from `typing`. `AnyStr` will be removed from `typing`
> in Python 3.18.

### `LiteralString`

Special type that includes only literal strings.

Any string
literal is compatible with `LiteralString`, as is another
`LiteralString`. However, an object typed as just `str` is not.
A string created by composing `LiteralString`-typed objects
is also acceptable as a `LiteralString`.

Example:

```python

def run_query(sql: LiteralString) -> None:
    ...

def caller(arbitrary_string: str, literal_string: LiteralString) -> None:
    run_query("SELECT * FROM students")  # OK
    run_query(literal_string)  # OK
    run_query("SELECT * FROM " + literal_string)  # OK
    run_query(arbitrary_string)  # type checker error
    run_query(  # type checker error
        f"SELECT * FROM students WHERE name = {arbitrary_string}"
    )
```

`LiteralString` is useful for sensitive APIs where arbitrary user-generated
strings could generate problems. For example, the two cases above
that generate type checker errors could be vulnerable to an SQL
injection attack.

See PEP 675 for more details.

> *Added in version 3.11.*

### `Never`

```python
NoReturn
```

`Never` and `NoReturn` represent the
bottom type,
a type that has no members.

They can be used to indicate that a function never returns,
such as `sys.exit()`:

```
from typing import Never  # or NoReturn

def stop() -> Never:
    raise RuntimeError('no way')
```

Or to define a function that should never be
called, as there are no valid arguments, such as
`assert_never()`:

```
from typing import Never  # or NoReturn

def never_call_me(arg: Never) -> None:
    pass

def int_or_str(arg: int | str) -> None:
    never_call_me(arg)  # type checker error
    match arg:
        case int():
            print("It's an int")
        case str():
            print("It's a str")
        case _:
            never_call_me(arg)  # OK, arg is of type Never (or NoReturn)
```

`Never` and `NoReturn` have the same meaning in the type system
and static type checkers treat both equivalently.

> *Added in version 3.6.2.*
> Added `NoReturn`.

> *Added in version 3.11.*
> Added `Never`.

### `Self`

Special type to represent the current enclosed class.

For example:

```
from typing import Self, reveal_type

class Foo:
    def return_self(self) -> Self:
        ...
        return self

class SubclassOfFoo(Foo): pass

reveal_type(Foo().return_self())  # Revealed type is "Foo"
reveal_type(SubclassOfFoo().return_self())  # Revealed type is "SubclassOfFoo"
```

This annotation is semantically equivalent to the following,
albeit in a more succinct fashion:

```
from typing import TypeVar

Self = TypeVar("Self", bound="Foo")

class Foo:
    def return_self(self: Self) -> Self:
        ...
        return self
```

In general, if something returns `self`, as in the above examples, you
should use `Self` as the return annotation. If `Foo.return_self` was
annotated as returning `"Foo"`, then the type checker would infer the
object returned from `SubclassOfFoo.return_self` as being of type `Foo`
rather than `SubclassOfFoo`.

Other common use cases include:

- `classmethod`\s that are used as alternative constructors and return instances
of the `cls` parameter.
- Annotating an `__enter__()` method which returns self.

You should not use `Self` as the return annotation if the method is not
guaranteed to return an instance of a subclass when the class is
subclassed:

```
class Eggs:
    # Self would be an incorrect return annotation here,
    # as the object returned is always an instance of Eggs,
    # even in subclasses
    def returns_eggs(self) -> "Eggs":
        return Eggs()
```

See PEP 673 for more details.

> *Added in version 3.11.*

### `TypeAlias`

Special annotation for explicitly declaring a type alias.

For example:

```
from typing import TypeAlias

Factors: TypeAlias = list[int]
```

`TypeAlias` is particularly useful on older Python versions for annotating
aliases that make use of forward references, as it can be hard for type
checkers to distinguish these from normal variable assignments:

```python

from typing import Generic, TypeAlias, TypeVar

T = TypeVar("T")

# "Box" does not exist yet,
# so we have to use quotes for the forward reference on Python <3.12.
# Using ``TypeAlias`` tells the type checker that this is a type alias declaration,
# not a variable assignment to a string.
BoxOfStrings: TypeAlias = "Box[str]"

class Box(Generic[T]):
    @classmethod
    def make_box_of_strings(cls) -> BoxOfStrings: ...
```

See PEP 613 for more details.

> *Added in version 3.10.*

> *Deprecated since version 3.12.*
> `TypeAlias` is deprecated in favor of the `type` statement,
> which creates instances of `TypeAliasType`
> and which natively supports forward references.
> Note that while `TypeAlias` and `TypeAliasType` serve
> similar purposes and have similar names, they are distinct and the
> latter is not the type of the former.
> Removal of `TypeAlias` is not currently planned, but users
> are encouraged to migrate to `type` statements.

#### Special forms

These can be used as types in annotations. They all support subscription using
`[]`, but each has a unique syntax.

### class `Union`

Union type; `Union[X, Y]` is equivalent to `X | Y` and means either X or Y.

To define a union, use e.g. `Union[int, str]` or the shorthand `int | str`. Using that shorthand is recommended. Details:

- The arguments must be types and there must be at least one.

- Unions of unions are flattened, e.g.::

Union[Union[int, str], float] == Union[int, str, float]

However, this does not apply to unions referenced through a type
alias, to avoid forcing evaluation of the underlying `TypeAliasType`:

```
type A = Union[int, str]
Union[A, float] != Union[int, str, float]
```

- Unions of a single argument vanish, e.g.::

Union[int] == int  # The constructor actually returns int

- Redundant arguments are skipped, e.g.::

Union[int, str, int] == Union[int, str] == int | str

- When comparing unions, the argument order is ignored, e.g.::

Union[int, str] == Union[str, int]

- You cannot subclass or instantiate a `Union`.

- You cannot write `UnionX`.

> *Changed in version 3.7.*
> Don't remove explicit subclasses from unions at runtime.

> *Changed in version 3.10.*
> Unions can now be written as `X | Y`. See
> union type expressions.

> *Changed in version 3.14.*
> `types.UnionType` is now an alias for `Union`, and both
> `Union[int, str]` and `int | str` create instances of the same class.
> To check whether an object is a `Union` at runtime, use
> `isinstance(obj, Union)`. For compatibility with earlier versions of
> Python, use
> `get_origin(obj) is typing.Union or get_origin(obj) is types.UnionType`.

### `Optional`

`Optional[X]` is equivalent to `X | None` (or `Union[X, None]`).

Note that this is not the same concept as an optional argument,
which is one that has a default.  An optional argument with a
default does not require the `Optional` qualifier on its type
annotation just because it is optional. For example:

```
def foo(arg: int = 0) -> None:
    ...
```

On the other hand, if an explicit value of `None` is allowed, the
use of `Optional` is appropriate, whether the argument is optional
or not. For example:

```
def foo(arg: Optional[int] = None) -> None:
    ...
```

> *Changed in version 3.10.*
> Optional can now be written as `X | None`. See
> union type expressions.

### `Concatenate`

Special form for annotating higher-order functions.

`Concatenate` can be used in conjunction with Callable and
`ParamSpec` to annotate a higher-order callable which adds, removes,
or transforms parameters of another
callable.  Usage is in the form
`Concatenate[Arg1Type, Arg2Type, ..., ParamSpecVariable]`. `Concatenate`
is valid when used in Callable type hints
and when instantiating user-defined generic classes with `ParamSpec` parameters.
The last parameter to `Concatenate` must be a `ParamSpec` or
ellipsis (`...`).

For example, to annotate a decorator `with_lock` which provides a
`threading.Lock` to the decorated function,  `Concatenate` can be
used to indicate that `with_lock` expects a callable which takes in a
`Lock` as the first argument, and returns a callable with a different type
signature.  In this case, the `ParamSpec` indicates that the returned
callable's parameter types are dependent on the parameter types of the
callable being passed in:

```
from collections.abc import Callable
from threading import Lock
from typing import Concatenate

# Use this lock to ensure that only one thread is executing a function
# at any time.
my_lock = Lock()

def with_lock[**P, R](f: Callable[Concatenate[Lock, P], R]) -> Callable[P, R]:
    '''A type-safe decorator which provides a lock.'''
    def inner(*args: P.args, **kwargs: P.kwargs) -> R:
        # Provide the lock as the first argument.
        return f(my_lock, *args, **kwargs)
    return inner

@with_lock
def sum_threadsafe(lock: Lock, numbers: list[float]) -> float:
    '''Add a list of numbers together in a thread-safe manner.'''
    with lock:
        return sum(numbers)

# We don't need to pass in the lock ourselves thanks to the decorator.
sum_threadsafe([1.1, 2.2, 3.3])
```

> *Added in version 3.10.*

> **See also:** - PEP 612 -- Parameter Specification Variables (the PEP which introduced
> `ParamSpec` and `Concatenate`)
> - `ParamSpec`
> - annotating-callables

### `Literal`

Special typing form to define "literal types".

`Literal` can be used to indicate to type checkers that the
annotated object has a value equivalent to one of the
provided literals.

For example:

```
def validate_simple(data: Any) -> Literal[True]:  # always returns True
    ...

type Mode = Literal['r', 'rb', 'w', 'wb']
def open_helper(file: str, mode: Mode) -> str:
    ...

open_helper('/some/path', 'r')      # Passes type check
open_helper('/other/path', 'typo')  # Error in type checker
```

`Literal[...]` cannot be subclassed. At runtime, an arbitrary value
is allowed as type argument to `Literal[...]`, but type checkers may
impose restrictions. See PEP 586 for more details about literal types.

Additional details:

- The arguments must be literal values and there must be at least one.

- Nested `Literal` types are flattened, e.g.::

assert Literal[Literal[1, 2], 3] == Literal[1, 2, 3]

However, this does not apply to `Literal` types referenced through a type
alias, to avoid forcing evaluation of the underlying `TypeAliasType`:

```
type A = Literal[1, 2]
assert Literal[A, 3] != Literal[1, 2, 3]
```

- Redundant arguments are skipped, e.g.::

assert Literal[1, 2, 1] == Literal[1, 2]

- When comparing literals, the argument order is ignored, e.g.::

assert Literal[1, 2] == Literal[2, 1]

- You cannot subclass or instantiate a `Literal`.

- You cannot write `LiteralX`.

> *Added in version 3.8.*

> *Changed in version 3.9.1.*
> `Literal` now de-duplicates parameters.  Equality comparisons of
> `Literal` objects are no longer order dependent. `Literal` objects
> will now raise a `TypeError` exception during equality comparisons
> if one of their parameters are not hashable.

### `ClassVar`

Special type construct to mark class variables.

As introduced in PEP 526, a variable annotation wrapped in ClassVar
indicates that a given attribute is intended to be used as a class variable
and should not be set on instances of that class. Usage:

```
class Starship:
    stats: ClassVar[dict[str, int]] = {} # class variable
    damage: int = 10                     # instance variable
```

`ClassVar` accepts only types and cannot be further subscribed.

`ClassVar` is not a class itself, and cannot
be used with `isinstance()` or `issubclass()`.
`ClassVar` does not change Python runtime behavior, but
it can be used by static type checkers. For example, a type checker
might flag the following code as an error:

```
enterprise_d = Starship(3000)
enterprise_d.stats = {} # Error, setting class variable on instance
Starship.stats = {}     # This is OK
```

> *Added in version 3.5.3.*

> *Changed in version 3.13.*
> `ClassVar` can now be nested in `Final` and vice versa.

### `Final`

Special typing construct to indicate final names to type checkers.

Final names cannot be reassigned in any scope. Final names declared in class
scopes cannot be overridden in subclasses.

For example:

```
MAX_SIZE: Final = 9000
MAX_SIZE += 1  # Error reported by type checker

class Connection:
    TIMEOUT: Final[int] = 10

class FastConnector(Connection):
    TIMEOUT = 1  # Error reported by type checker
```

There is no runtime checking of these properties. See PEP 591 for
more details.

> *Added in version 3.8.*

> *Changed in version 3.13.*
> `Final` can now be nested in `ClassVar` and vice versa.

### `Required`

Special typing construct to mark a `TypedDict` key as required.

This is mainly useful for `total=False` TypedDicts. See `TypedDict`
and PEP 655 for more details.

> *Added in version 3.11.*
