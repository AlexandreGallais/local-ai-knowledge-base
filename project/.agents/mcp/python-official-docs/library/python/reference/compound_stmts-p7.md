---
title: "Compound statements (part 7 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/compound_stmts.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Compound statements (part 7 of 7)

## Type parameter lists

> *Added in version 3.12.*

> *Changed in version 3.13.*
> Support for default values was added (see PEP 696).

```text
python-grammar
type_params: "[" `type_param` ("," `type_param`)* "]"
type_param: `typevar` | `typevartuple` | `paramspec`
typevar: `identifier` (":" `expression`)? ("=" `expression`)?
typevartuple: "*" `identifier` ("=" `expression`)?
paramspec: "**" `identifier` ("=" `expression`)?
```

Functions (including coroutines),
classes and type aliases may
contain a type parameter list:

```
def max[T](args: list[T]) -> T:
    ...

async def amax[T](args: list[T]) -> T:
    ...

class Bag[T]:
    def __iter__(self) -> Iterator[T]:
        ...

    def add(self, arg: T) -> None:
        ...

type ListOrSet[T] = list[T] | set[T]
```

Semantically, this indicates that the function, class, or type alias is
generic over a type variable. This information is primarily used by static
type checkers, and at runtime, generic objects behave much like their
non-generic counterparts.

Type parameters are declared in square brackets (`[]`) immediately
after the name of the function, class, or type alias. The type parameters
are accessible within the scope of the generic object, but not elsewhere.
Thus, after a declaration `def funcT: pass`, the name `T` is not available in
the module scope. Below, the semantics of generic objects are described
with more precision. The scope of type parameters is modeled with a special
function (technically, an annotation scope) that
wraps the creation of the generic object.

Generic functions, classes, and type aliases have a
`__type_params__` attribute listing their type parameters.

Type parameters come in three kinds:

- `typing.TypeVar`, introduced by a plain name (e.g., `T`). Semantically, this
represents a single type to a type checker.
- `typing.TypeVarTuple`, introduced by a name prefixed with a single
asterisk (e.g., `*Ts`). Semantically, this stands for a tuple of any
number of types.
- `typing.ParamSpec`, introduced by a name prefixed with two asterisks
(e.g., `**P`). Semantically, this stands for the parameters of a callable.

`typing.TypeVar` declarations can define *bounds* and *constraints* with
a colon (`:`) followed by an expression. A single expression after the colon
indicates a bound (e.g. `T: int`). Semantically, this means
that the `typing.TypeVar` can only represent types that are a subtype of
this bound. A parenthesized tuple of expressions after the colon indicates a
set of constraints (e.g. `T: (str, bytes)`). Each member of the tuple should be a
type (again, this is not enforced at runtime). Constrained type variables can only
take on one of the types in the list of constraints.

For `typing.TypeVar`s declared using the type parameter list syntax,
the bound and constraints are not evaluated when the generic object is created,
but only when the value is explicitly accessed through the attributes `__bound__`
and `__constraints__`. To accomplish this, the bounds or constraints are
evaluated in a separate annotation scope.

`typing.TypeVarTuple`s and `typing.ParamSpec`s cannot have bounds
or constraints.

All three flavors of type parameters can also have a *default value*, which is used
when the type parameter is not explicitly provided. This is added by appending
a single equals sign (`=`) followed by an expression. Like the bounds and
constraints of type variables, the default value is not evaluated when the
object is created, but only when the type parameter's `__default__` attribute
is accessed. To this end, the default value is evaluated in a separate
annotation scope. If no default value is specified
for a type parameter, the `__default__` attribute is set to the special
sentinel object `typing.NoDefault`.

The following example indicates the full set of allowed type parameter declarations:

```
def overly_generic[
   SimpleTypeVar,
   TypeVarWithDefault = int,
   TypeVarWithBound: int,
   TypeVarWithConstraints: (str, bytes),
   *SimpleTypeVarTuple = (int, float),
   **SimpleParamSpec = (str, bytearray),
](
   a: SimpleTypeVar,
   b: TypeVarWithDefault,
   c: TypeVarWithBound,
   d: Callable[SimpleParamSpec, TypeVarWithConstraints],
   *e: SimpleTypeVarTuple,
): ...
```

### Generic functions

Generic functions are declared as follows:

```
def func[T](arg: T): ...
```

This syntax is equivalent to:

```
annotation-def TYPE_PARAMS_OF_func():
    T = typing.TypeVar("T")
    def func(arg: T): ...
    func.__type_params__ = (T,)
    return func
func = TYPE_PARAMS_OF_func()
```

Here `annotation-def` indicates an annotation scope,
which is not actually bound to any name at runtime. (One
other liberty is taken in the translation: the syntax does not go through
attribute access on the `typing` module, but creates an instance of
`typing.TypeVar` directly.)

The annotations of generic functions are evaluated within the annotation scope
used for declaring the type parameters, but the function's defaults and
decorators are not.

The following example illustrates the scoping rules for these cases,
as well as for additional flavors of type parameters:

```
@decorator
def func[T: int, *Ts, **P](*args: *Ts, arg: Callable[P, T] = some_default):
    ...
```

Except for the lazy evaluation of the
`TypeVar` bound, this is equivalent to:

```
DEFAULT_OF_arg = some_default

annotation-def TYPE_PARAMS_OF_func():

    annotation-def BOUND_OF_T():
        return int
    # In reality, BOUND_OF_T() is evaluated only on demand.
    T = typing.TypeVar("T", bound=BOUND_OF_T())

    Ts = typing.TypeVarTuple("Ts")
    P = typing.ParamSpec("P")

    def func(*args: *Ts, arg: Callable[P, T] = DEFAULT_OF_arg):
        ...

    func.__type_params__ = (T, Ts, P)
    return func
func = decorator(TYPE_PARAMS_OF_func())
```

The capitalized names like `DEFAULT_OF_arg` are not actually
bound at runtime.

### Generic classes

Generic classes are declared as follows:

```
class Bag[T]: ...
```

This syntax is equivalent to:

```
annotation-def TYPE_PARAMS_OF_Bag():
    T = typing.TypeVar("T")
    class Bag(typing.Generic[T]):
        __type_params__ = (T,)
        ...
    return Bag
Bag = TYPE_PARAMS_OF_Bag()
```

Here again `annotation-def` (not a real keyword) indicates an
annotation scope, and the name
`TYPE_PARAMS_OF_Bag` is not actually bound at runtime.

Generic classes implicitly inherit from `typing.Generic`.
The base classes and keyword arguments of generic classes are
evaluated within the type scope for the type parameters,
and decorators are evaluated outside that scope. This is illustrated
by this example:

```
@decorator
class Bag(Base[T], arg=T): ...
```

This is equivalent to:

```
annotation-def TYPE_PARAMS_OF_Bag():
    T = typing.TypeVar("T")
    class Bag(Base[T], typing.Generic[T], arg=T):
        __type_params__ = (T,)
        ...
    return Bag
Bag = decorator(TYPE_PARAMS_OF_Bag())
```

### Generic type aliases

The `type` statement can also be used to create a generic type alias:

```
type ListOrSet[T] = list[T] | set[T]
```

Except for the lazy evaluation of the value,
this is equivalent to:

```
annotation-def TYPE_PARAMS_OF_ListOrSet():
    T = typing.TypeVar("T")

    annotation-def VALUE_OF_ListOrSet():
        return list[T] | set[T]
    # In reality, the value is lazily evaluated
    return typing.TypeAliasType("ListOrSet", VALUE_OF_ListOrSet(), type_params=(T,))
ListOrSet = TYPE_PARAMS_OF_ListOrSet()
```

Here, `annotation-def` (not a real keyword) indicates an
annotation scope. The capitalized names
like `TYPE_PARAMS_OF_ListOrSet` are not actually bound at runtime.

## Annotations

> *Changed in version 3.14.*
> Annotations are now lazily evaluated by default.

Variables and function parameters may carry annotations,
created by adding a colon after the name, followed by an expression:

```
x: annotation = 1
def f(param: annotation): ...
```

Functions may also carry a return annotation following an arrow:

```
def f() -> annotation: ...
```

Annotations are conventionally used for type hints, but this
is not enforced by the language, and in general annotations may contain arbitrary
expressions. The presence of annotations does not change the runtime semantics of
the code, except if some mechanism is used that introspects and uses the annotations
(such as `dataclasses` or functools.singledispatch).

By default, annotations are lazily evaluated in an annotation scope.
This means that they are not evaluated when the code containing the annotation is evaluated.
Instead, the interpreter saves information that can be used to evaluate the annotation later
if requested. The `annotationlib` module provides tools for evaluating annotations.

If the future statement `from __future__ import annotations` is present,
all annotations are instead stored as strings:

```
>>> from __future__ import annotations
>>> def f(param: annotation): ...
>>> f.__annotations__
{'param': 'annotation'}
```

This future statement will be deprecated and removed in a future version of Python,
but not before Python 3.13 reaches its end of life (see PEP 749).
When it is used, introspection tools like
`annotationlib.get_annotations()` and `typing.get_type_hints()` are
less likely to be able to resolve annotations at runtime.

**Footnotes**
