---
title: "typing --- Support for type hints (part 5 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/typing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# typing --- Support for type hints (part 5 of 10)

### class `TypeVar(name, *constraints, bound=None, covariant=False, contravariant=False, infer_variance=False, default=typing.NoDefault)`

Type variable.

The preferred way to construct a type variable is via the dedicated syntax
for generic functions,
generic classes, and
generic type aliases:

```
class Sequence[T]:  # T is a TypeVar
    ...
```

This syntax can also be used to create bounded and constrained type
variables:

```
class StrSequence[S: str]:  # S is a TypeVar with a `str` upper bound;
    ...                     # we can say that S is "bounded by `str`"

class StrOrBytesSequence[A: (str, bytes)]:  # A is a TypeVar constrained to str or bytes
    ...
```

However, if desired, reusable type variables can also be constructed manually, like so:

```
T = TypeVar('T')  # Can be anything
S = TypeVar('S', bound=str)  # Can be any subtype of str
A = TypeVar('A', str, bytes)  # Must be exactly str or bytes
```

Type variables exist primarily for the benefit of static type
checkers.  They serve as the parameters for generic types as well
as for generic function and type alias definitions.
See `Generic` for more
information on generic types.  Generic functions work as follows:

```
def repeat[T](x: T, n: int) -> Sequence[T]:
    """Return a list containing n references to x."""
    return [x]*n

def print_capitalized[S: str](x: S) -> S:
    """Print x capitalized, and return x."""
    print(x.capitalize())
    return x

def concatenate[A: (str, bytes)](x: A, y: A) -> A:
    """Add two strings or bytes objects together."""
    return x + y
```

Note that type variables can be *bounded*, *constrained*, or neither, but
cannot be both bounded *and* constrained.

The variance of type variables is inferred by type checkers when they are created
through the type parameter syntax or when
`infer_variance=True` is passed.
Manually created type variables may be explicitly marked covariant or contravariant by passing
`covariant=True` or `contravariant=True`.
By default, manually created type variables are invariant.
See PEP 484 and PEP 695 for more details.

Bounded type variables and constrained type variables have different
semantics in several important ways. Using a *bounded* type variable means
that the `TypeVar` will be solved using the most specific type possible:

```
x = print_capitalized('a string')
reveal_type(x)  # revealed type is str

class StringSubclass(str):
    pass

y = print_capitalized(StringSubclass('another string'))
reveal_type(y)  # revealed type is StringSubclass

z = print_capitalized(45)  # error: int is not a subtype of str
```

The upper bound of a type variable can be a concrete type, abstract type
(ABC or Protocol), or even a union of types:

```
# Can be anything with an __abs__ method
def print_abs[T: SupportsAbs](arg: T) -> None:
    print("Absolute value:", abs(arg))

U = TypeVar('U', bound=str|bytes)  # Can be any subtype of the union str|bytes
V = TypeVar('V', bound=SupportsAbs)  # Can be anything with an __abs__ method
```

Using a *constrained* type variable, however, means that the `TypeVar`
can only ever be solved as being exactly one of the constraints given:

```
a = concatenate('one', 'two')
reveal_type(a)  # revealed type is str

b = concatenate(StringSubclass('one'), StringSubclass('two'))
reveal_type(b)  # revealed type is str, despite StringSubclass being passed in

c = concatenate('one', b'two')  # error: type variable 'A' can be either str or bytes in a function call, but not both
```

At runtime, `isinstance(x, T)` will raise `TypeError`.

### `__name__`

The name of the type variable.

### `__covariant__`

Whether the type var has been explicitly marked as covariant.

### `__contravariant__`

Whether the type var has been explicitly marked as contravariant.

### `__infer_variance__`

Whether the type variable's variance should be inferred by type checkers.

> *Added in version 3.12.*

### `__bound__`

The upper bound of the type variable, if any.

> *Changed in version 3.12.*
> For type variables created through type parameter syntax,
> the bound is evaluated only when the attribute is accessed, not when
> the type variable is created (see lazy-evaluation).

### `evaluate_bound`

An evaluate function corresponding to the `__bound__` attribute.
When called directly, this method supports only the `VALUE`
format, which is equivalent to accessing the `__bound__` attribute directly,
but the method object can be passed to `annotationlib.call_evaluate_function()`
to evaluate the value in a different format.

> *Added in version 3.14.*

### `__constraints__`

A tuple containing the constraints of the type variable, if any.

> *Changed in version 3.12.*
> For type variables created through type parameter syntax,
> the constraints are evaluated only when the attribute is accessed, not when
> the type variable is created (see lazy-evaluation).

### `evaluate_constraints`

An evaluate function corresponding to the `__constraints__` attribute.
When called directly, this method supports only the `VALUE`
format, which is equivalent to accessing the `__constraints__` attribute directly,
but the method object can be passed to `annotationlib.call_evaluate_function()`
to evaluate the value in a different format.

> *Added in version 3.14.*

### `__default__`

The default value of the type variable, or `typing.NoDefault` if it
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

Return whether or not the type variable has a default value. This is equivalent
to checking whether `__default__` is not the `typing.NoDefault`
singleton, except that it does not force evaluation of the
lazily evaluated default value.

> *Added in version 3.13.*

> *Changed in version 3.12.*
> Type variables can now be declared using the
> type parameter syntax introduced by PEP 695.
> The `infer_variance` parameter was added.

> *Changed in version 3.13.*
> Support for default values was added.

### class `TypeVarTuple(name, *, bound=None, covariant=False, contravariant=False, infer_variance=False, default=typing.NoDefault)`

Type variable tuple. A specialized form of type variable
that enables *variadic* generics.

Type variable tuples can be declared in type parameter lists
using a single asterisk (`*`) before the name:

```
def move_first_element_to_last[T, *Ts](tup: tuple[T, *Ts]) -> tuple[*Ts, T]:
    return (*tup[1:], tup[0])
```

Or by explicitly invoking the `TypeVarTuple` constructor:

```
T = TypeVar("T")
Ts = TypeVarTuple("Ts")

def move_first_element_to_last(tup: tuple[T, *Ts]) -> tuple[*Ts, T]:
    return (*tup[1:], tup[0])
```

A normal type variable enables parameterization with a single type. A type
variable tuple, in contrast, allows parameterization with an
*arbitrary* number of types by acting like an *arbitrary* number of type
variables wrapped in a tuple. For example:

```
# T is bound to int, Ts is bound to ()
# Return value is (1,), which has type tuple[int]
move_first_element_to_last(tup=(1,))

# T is bound to int, Ts is bound to (str,)
# Return value is ('spam', 1), which has type tuple[str, int]
move_first_element_to_last(tup=(1, 'spam'))

# T is bound to int, Ts is bound to (str, float)
# Return value is ('spam', 3.0, 1), which has type tuple[str, float, int]
move_first_element_to_last(tup=(1, 'spam', 3.0))

# This fails to type check (and fails at runtime)
# because tuple[()] is not compatible with tuple[T, *Ts]
# (at least one element is required)
move_first_element_to_last(tup=())
```

Note the use of the unpacking operator `*` in `tuple[T, *Ts]`.
Conceptually, you can think of `Ts` as a tuple of type variables
`(T1, T2, ...)`. `tuple[T, *Ts]` would then become
`tuple[T, *(T1, T2, ...)]`, which is equivalent to
`tuple[T, T1, T2, ...]`. (Note that in older versions of Python, you might
see this written using `Unpack` instead, as
`Unpack[Ts]`.)

Type variable tuples must *always* be unpacked. This helps distinguish type
variable tuples from normal type variables:

```
x: Ts          # Not valid
x: tuple[Ts]   # Not valid
x: tuple[*Ts]  # The correct way to do it
```

Type variable tuples can be used in the same contexts as normal type
variables. For example, in class definitions, arguments, and return types:

```
class Array[*Shape]:
    def __getitem__(self, key: tuple[*Shape]) -> float: ...
    def __abs__(self) -> "Array[*Shape]": ...
    def get_shape(self) -> tuple[*Shape]: ...
```

Type variable tuples can be happily combined with normal type variables:

```python

class Array[DType, *Shape]:  # This is fine
    pass

class Array2[*Shape, DType]:  # This would also be fine
    pass

class Height: ...
class Width: ...

float_array_1d: Array[float, Height] = Array()     # Totally fine
int_array_2d: Array[int, Height, Width] = Array()  # Yup, fine too
```

However, note that at most one type variable tuple may appear in a single
list of type arguments or type parameters:

```
x: tuple[*Ts, *Ts]            # Not valid
class Array[*Shape, *Shape]:  # Not valid
    pass
```

Finally, an unpacked type variable tuple can be used as the type annotation
of `*args`:

```
def call_soon[*Ts](
    callback: Callable[[*Ts], None],
    *args: *Ts
) -> None:
    ...
    callback(*args)
```

In contrast to non-unpacked annotations of `*args` - e.g. `*args: int`,
which would specify that *all* arguments are `int` - `*args: *Ts`
enables reference to the types of the *individual* arguments in `*args`.
Here, this allows us to ensure the types of the `*args` passed
to `call_soon` match the types of the (positional) arguments of
`callback`.

See PEP 646 for more details on type variable tuples.

### `__name__`

The name of the type variable tuple.

### `__covariant__`

Whether the type variable tuple has been explicitly marked as covariant.

> *Added in version 3.15.*

### `__contravariant__`

Whether the type variable tuple has been explicitly marked as contravariant.

> *Added in version 3.15.*

### `__infer_variance__`

Whether the type variable tuple's variance should be inferred by type checkers.

> *Added in version 3.15.*

### `__default__`

The default value of the type variable tuple, or `typing.NoDefault` if it
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

Return whether or not the type variable tuple has a default value. This is equivalent
to checking whether `__default__` is not the `typing.NoDefault`
singleton, except that it does not force evaluation of the
lazily evaluated default value.

> *Added in version 3.13.*

Type variable tuples created with `covariant=True` or
`contravariant=True` can be used to declare covariant or contravariant
generic types.  The `bound` argument is also accepted, similar to
`TypeVar`, but its actual semantics are yet to be decided.

> *Added in version 3.11.*

> *Changed in version 3.12.*
> Type variable tuples can now be declared using the
> type parameter syntax introduced by PEP 695.

> *Changed in version 3.13.*
> Support for default values was added.

> *Changed in version 3.15.*
> Added support for the `bound`, `covariant`, `contravariant`, and
> `infer_variance` parameters.

### class `ParamSpec(name, *, bound=None, covariant=False, contravariant=False, infer_variance=False, default=typing.NoDefault)`

Parameter specification variable.  A specialized version of
type variables.

In type parameter lists, parameter specifications
can be declared with two asterisks (`**`):

```
type IntFunc[**P] = Callable[P, int]
```

For compatibility with Python 3.11 and earlier, `ParamSpec` objects
can also be created as follows:

```
P = ParamSpec('P')
```

Parameter specification variables exist primarily for the benefit of static
type checkers.  They are used to forward the parameter types of one
callable to another callable -- a pattern commonly found in higher order
functions and decorators.  They are only valid when used in `Concatenate`,
or as the first argument to `Callable`, or as parameters for user-defined
Generics.  See `Generic` for more information on generic types.

For example, to add basic <example-value> to a function, one can create a decorator
`add_logging` to log function calls.  The parameter specification variable
tells the type checker that the callable passed into the decorator and the
new callable returned by it have inter-dependent type parameters:

```
from collections.abc import Callable
import logging

def add_logging[T, **P](f: Callable[P, T]) -> Callable[P, T]:
    '''A type-safe decorator to add logging to a function.'''
    def inner(*args: P.args, **kwargs: P.kwargs) -> T:
        logging.info(f'{f.__name__} was called')
        return f(*args, **kwargs)
    return inner

@add_logging
def add_two(x: float, y: float) -> float:
    '''Add two numbers together.'''
    return x + y
```

Without `ParamSpec`, the simplest way to annotate this previously was to
use a `TypeVar` with upper bound `Callable[..., Any]`.  However this
causes two problems:

1. The type checker can't type check the `inner` function because
`*args` and `**kwargs` have to be typed `Any`.
1. `cast()` may be required in the body of the `add_logging`
decorator when returning the `inner` function, or the static type
checker must be told to ignore the `return inner`.

### `kwargs`

Since `ParamSpec` captures both positional and keyword parameters,
`P.args` and `P.kwargs` can be used to split a `ParamSpec` into its
components.  `P.args` represents the tuple of positional parameters in a
given call and should only be used to annotate `*args`.  `P.kwargs`
represents the mapping of keyword parameters to their values in a given call,
and should be only be used to annotate `**kwargs`.  Both
attributes require the annotated parameter to be in scope. At runtime,
`P.args` and `P.kwargs` are instances respectively of
`ParamSpecArgs` and `ParamSpecKwargs`.

### `__name__`

The name of the parameter specification.

### `__covariant__`

Whether the parameter specification has been explicitly marked as covariant.

### `__contravariant__`

Whether the parameter specification has been explicitly marked as contravariant.

### `__infer_variance__`

Whether the parameter specification's variance should be inferred by type checkers.

> *Added in version 3.12.*
