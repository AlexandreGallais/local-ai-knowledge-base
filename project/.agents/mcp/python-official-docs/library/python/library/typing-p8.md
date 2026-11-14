---
title: "typing --- Support for type hints (part 8 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/typing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# typing --- Support for type hints (part 8 of 10)

### decorator `dataclass_transform(*, eq_default=True, order_default=False, \`

```python
kw_only_default=False, frozen_default=False, \
field_specifiers=(), **kwargs)
```

Decorator to mark an object as providing
`dataclass()`-like behavior.

`@dataclass_transform` may be used to
decorate a class, metaclass, or a function that is itself a decorator.
The presence of `@dataclass_transform()` tells a static type checker that the
decorated object performs runtime "magic" that
transforms a class in a similar way to
dataclasses.dataclass.

Example usage with a decorator function:

```python

@dataclass_transform()
def create_model[T](cls: type[T]) -> type[T]:
    ...
    return cls

@create_model
class CustomerModel:
    id: int
    name: str
```

On a base class:

```
@dataclass_transform()
class ModelBase: ...

class CustomerModel(ModelBase):
    id: int
    name: str
```

On a metaclass:

```
@dataclass_transform()
class ModelMeta(type): ...

class ModelBase(metaclass=ModelMeta): ...

class CustomerModel(ModelBase):
    id: int
    name: str
```

The `CustomerModel` classes defined above will
be treated by type checkers similarly to classes created with
dataclasses.dataclass.
For example, type checkers will assume these classes have
`__init__` methods that accept `id` and `name`.

The decorated class, metaclass, or function may accept the following bool
arguments which type checkers will assume have the same effect as they
would have on the
dataclasses.dataclass decorator: `init`,
`eq`, `order`, `unsafe_hash`, `frozen`, `match_args`,
`kw_only`, and `slots`. It must be possible for the value of these
arguments (`True` or `False`) to be statically evaluated.

The arguments to the `@dataclass_transform` decorator can be used to
customize the default behaviors of the decorated class, metaclass, or
function:

- **param `bool eq_default`:**
Indicates whether the `eq` parameter is assumed to be
`True` or `False` if it is omitted by the caller.
Defaults to `True`.

- **param `bool order_default`:**
Indicates whether the `order` parameter is
assumed to be `True` or `False` if it is omitted by the caller.
Defaults to `False`.

- **param `bool kw_only_default`:**
Indicates whether the `kw_only` parameter is
assumed to be `True` or `False` if it is omitted by the caller.
Defaults to `False`.

- **param `bool frozen_default`:**
Indicates whether the `frozen` parameter is
assumed to be `True` or `False` if it is omitted by the caller.
Defaults to `False`.

> *Added in version 3.12.*

- **param `field_specifiers`:**
Specifies a static list of supported classes
or functions that describe fields, similar to `dataclasses.field()`.
Defaults to `()`.
- **type `field_specifiers`:** tuple[Callable[..., Any], ...]

- **param `Any \**kwargs`:**
Arbitrary other keyword arguments are accepted in order to allow for
possible future extensions.

Type checkers recognize the following optional parameters on field
specifiers:

**Recognised parameters for field specifiers**

- - Parameter name
- Description
- - `init`
- Indicates whether the field should be included in the
synthesized `__init__` method. If unspecified, `init` defaults to
`True`.
- - `default`
- Provides the default value for the field.
- - `default_factory`
- Provides a runtime callback that returns the
default value for the field. If neither `default` nor
`default_factory` are specified, the field is assumed to have no
default value and must be provided a value when the class is
instantiated.
- - `factory`
- An alias for the `default_factory` parameter on field specifiers.
- - `kw_only`
- Indicates whether the field should be marked as
keyword-only. If `True`, the field will be keyword-only. If
`False`, it will not be keyword-only. If unspecified, the value of
the `kw_only` parameter on the object decorated with
`@dataclass_transform` will be used, or if that is unspecified, the
value of `kw_only_default` on `@dataclass_transform` will be used.
- - `alias`
- Provides an alternative name for the field. This alternative
name is used in the synthesized `__init__` method.

At runtime, this decorator records its arguments in the
`__dataclass_transform__` attribute on the decorated object.
It has no other runtime effect.

See PEP 681 for more details.

> *Added in version 3.11.*

### decorator `overload`

Decorator for creating overloaded functions and methods.

The `@overload` decorator allows describing functions and methods
that support multiple different combinations of argument types. A series
of `@overload`-decorated definitions must be followed by exactly one
non-`@overload`-decorated definition (for the same function/method).

`@overload`-decorated definitions are for the benefit of the
type checker only, since they will be overwritten by the
non-`@overload`-decorated definition. The non-`@overload`-decorated
definition, meanwhile, will be used at
runtime but should be ignored by a type checker.  At runtime, calling
an `@overload`-decorated function directly will raise
`NotImplementedError`.

An example of overload that gives a more
precise type than can be expressed using a union or a type variable:

```python

@overload
def process(response: None) -> None:
    ...
@overload
def process(response: int) -> tuple[int, str]:
    ...
@overload
def process(response: bytes) -> str:
    ...
def process(response):
    ...  # actual implementation goes here
```

See PEP 484 for more details and comparison with other typing semantics.

> *Changed in version 3.11.*
> Overloaded functions can now be introspected at runtime using
> `get_overloads()`.

### `get_overloads(func)`

Return a sequence of overload-decorated definitions for
*func*.

*func* is the function object for the implementation of the
overloaded function. For example, given the definition of `process` in
the documentation for overload,
`get_overloads(process)` will return a sequence of three function objects
for the three defined overloads. If called on a function with no overloads,
`get_overloads()` returns an empty sequence.

`get_overloads()` can be used for introspecting an overloaded function at
runtime.

> *Added in version 3.11.*

### `clear_overloads()`

Clear all registered overloads in the internal registry.

This can be used to reclaim the memory used by the registry.

> *Added in version 3.11.*

### decorator `final`

Decorator to indicate final methods and final classes.

Decorating a method with `@final` indicates to a type checker that the
method cannot be overridden in a subclass. Decorating a class with `@final`
indicates that it cannot be subclassed.

For example:

```
class Base:
    @final
    def done(self) -> None:
        ...
class Sub(Base):
    def done(self) -> None:  # Error reported by type checker
        ...

@final
class Leaf:
    ...
class Other(Leaf):  # Error reported by type checker
    ...
```

There is no runtime checking of these properties. See PEP 591 for
more details.

> *Added in version 3.8.*

> *Changed in version 3.11.*
> The decorator will now attempt to set a `__final__` attribute to `True`
> on the decorated object. Thus, a check like
> `if getattr(obj, "__final__", False)` can be used at runtime
> to determine whether an object `obj` has been marked as final.
> If the decorated object does not support setting attributes,
> the decorator returns the object unchanged without raising an exception.

### decorator `no_type_check`

Decorator to indicate that annotations are not type hints.

This works as a class or function decorator.  With a class, it
applies recursively to all methods and classes defined in that class
(but not to methods defined in its superclasses or subclasses). Type
checkers will ignore all annotations in a function or class with this
decorator.

`@no_type_check` mutates the decorated object in place.

### decorator `override`

Decorator to indicate that a method in a subclass is intended to override a
method or attribute in a superclass.

Type checkers should emit an error if a method decorated with `@override`
does not, in fact, override anything.
This helps prevent bugs that may occur when a base class is changed without
an equivalent change to a child class.

For example:

```python

class Base:
    def log_status(self) -> None:
        ...

class Sub(Base):
    @override
    def log_status(self) -> None:  # Okay: overrides Base.log_status
        ...

    @override
    def done(self) -> None:  # Error reported by type checker
        ...
```

There is no runtime checking of this property.

The decorator will attempt to set an `__override__` attribute to `True` on
the decorated object. Thus, a check like
`if getattr(obj, "__override__", False)` can be used at runtime to determine
whether an object `obj` has been marked as an override.  If the decorated object
does not support setting attributes, the decorator returns the object unchanged
without raising an exception.

See PEP 698 for more details.

> *Added in version 3.12.*

### decorator `disjoint_base`

Decorator to mark a class as a disjoint base.

Type checkers do not allow child classes of a disjoint base `C` to
inherit from other disjoint bases that are not parent or child classes of `C`.

For example:

```
@disjoint_base
class Disjoint1: pass

@disjoint_base
class Disjoint2: pass

class Disjoint3(Disjoint1, Disjoint2): pass  # Type checker error
```

Type checkers can use knowledge of disjoint bases to detect unreachable code
and determine when two types can overlap.

The corresponding runtime concept is a solid base (see multiple-inheritance).
Classes that are solid bases at runtime can be marked with `@disjoint_base` in stub files.
Users may also mark other classes as disjoint bases to indicate to type checkers that
multiple inheritance with other disjoint bases should not be allowed.

Note that the concept of a solid base is a CPython implementation
detail, and the exact set of standard library classes that are
disjoint bases at runtime may change in future versions of Python.

> *Added in version 3.15.*

### decorator `type_check_only`

Decorator to mark a class or function as unavailable at runtime.

This decorator is itself not available at runtime. It is mainly
intended to mark classes that are defined in type stub files if
an implementation returns an instance of a private class:

```
@type_check_only
class Response:  # private or not available at runtime
    code: int
    def get_header(self, name: str) -> str: ...

def fetch_response() -> Response: ...
```

Note that returning instances of private classes is not recommended.
It is usually preferable to make such classes public.

### `get_type_hints(obj, globalns=None, localns=None, include_extras=False, *, format=Format.VALUE)`

Return a dictionary containing type hints for a function, method, module,
class object, or other callable object.

This is often the same as `annotationlib.get_annotations()`, but this
function makes the following changes to the annotations dictionary:

- Forward references encoded as string literals or `ForwardRef`
objects are handled by evaluating them in *globalns*, *localns*, and
(where applicable) *obj*'s type parameter namespace.
If *globalns* or *localns* is not given, appropriate namespace
dictionaries are inferred from *obj*.
- `None` is replaced with `types.NoneType`.
- If no_type_check has been applied to *obj*, an
empty dictionary is returned.
- If *obj* is a class `C`, the function returns a dictionary that merges
annotations from `C`'s base classes with those on `C` directly. This
is done by traversing `C.__mro__` and iteratively
combining
annotations of each base class. Annotations
on classes appearing earlier in the method resolution order always
take precedence over annotations on classes appearing later in the method
resolution order.
- The function recursively replaces all occurrences of
`Annotated[T, ...]`, `Required[T]`, `NotRequired[T]`, and `ReadOnly[T]`
with `T`, unless *include_extras* is set to `True` (see
`Annotated` for more information).

> **Caution:** This function may execute arbitrary code contained in annotations.
> See annotationlib-security for more information.

> **Note:** If `Format.VALUE` is used and any
> forward references in the annotations of *obj* are not resolvable, a
> `NameError` exception is raised. For example, this can happen
> with names imported under `if TYPE_CHECKING`.
> More generally, any kind of exception can be raised if an annotation
> contains invalid Python code.

> **Note:** Calling `get_type_hints()` on an instance is not supported.
> To retrieve annotations for an instance, call
> `get_type_hints()` on the instance's class instead
> (for example, `get_type_hints(type(obj))`).

> *Changed in version 3.9.*
> Added `include_extras` parameter as part of PEP 593.
> See the documentation on `Annotated` for more information.

> *Changed in version 3.11.*
> Previously, `Optional[t]` was added for function and method annotations
> if a default value equal to `None` was set.
> Now the annotation is returned unchanged.

> *Changed in version 3.14.*
> Added the `format` parameter. See the documentation on
> `annotationlib.get_annotations()` for more information.

> *Changed in version 3.14.*
> Calling `get_type_hints()` on instances is no longer supported.
> Some instances were accepted in earlier versions as an undocumented
> implementation detail.

### `get_origin(tp)`

Get the unsubscripted version of a type: for a typing object of the form
`X[Y, Z, ...]` return `X`.

If `X` is a typing-module alias for a builtin or
`collections` class, it will be normalized to the original class.
If `X` is an instance of `ParamSpecArgs` or `ParamSpecKwargs`,
return the underlying `ParamSpec`.
Return `None` for unsupported objects.

Examples:

```python

assert get_origin(str) is None
assert get_origin(Dict[str, int]) is dict
assert get_origin(Union[int, str]) is Union
assert get_origin(Annotated[str, "metadata"]) is Annotated
P = ParamSpec('P')
assert get_origin(P.args) is P
assert get_origin(P.kwargs) is P
```

> *Added in version 3.8.*

### `get_args(tp)`

Get type arguments with all substitutions performed: for a typing object
of the form `X[Y, Z, ...]` return `(Y, Z, ...)`.

If `X` is a union or `Literal` contained in another
generic type, the order of `(Y, Z, ...)` may be different from the order
of the original arguments `[Y, Z, ...]` due to type caching.
Return `()` for unsupported objects.

Examples:

```python

assert get_args(int) == ()
assert get_args(Dict[int, str]) == (int, str)
assert get_args(Union[int, str]) == (int, str)
```

> *Added in version 3.8.*

### `get_protocol_members(tp)`

Return the set of members defined in a `Protocol`.

```python

>>> from typing import Protocol, get_protocol_members
>>> class P(Protocol):
...     def a(self) -> str: ...
...     b: int
>>> get_protocol_members(P) == frozenset({'a', 'b'})
True
```

Raise `TypeError` for arguments that are not Protocols.

> *Added in version 3.13.*
