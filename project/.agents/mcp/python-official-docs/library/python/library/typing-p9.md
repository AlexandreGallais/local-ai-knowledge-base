---
title: "typing --- Support for type hints (part 9 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/typing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# typing --- Support for type hints (part 9 of 10)

### `is_protocol(tp)`

Determine if a type is a `Protocol`.

For example:

```python

class P(Protocol):
    def a(self) -> str: ...
    b: int

assert is_protocol(P)
assert not is_protocol(int)
```

This function only returns true for `Protocol` classes, not for
generic aliases of them:

```python

class GenericP[T](Protocol):
    def a(self) -> T: ...
    b: int

assert not is_protocol(GenericP[int])
```

> *Added in version 3.13.*

### `is_typeddict(tp)`

Check if a type is a `TypedDict`.

For example:

```python

class Film(TypedDict):
    title: str
    year: int

assert is_typeddict(Film)
assert not is_typeddict(list | str)

# TypedDict is a factory for creating typed dicts,
# not a typed dict itself
assert not is_typeddict(TypedDict)
```

This function only returns true for `TypedDict` classes, not for
generic aliases of them:

```python

class GenericFilm[T](TypedDict):
    title: str
    year: T

assert not is_typeddict(GenericFilm[int])
```

> *Added in version 3.10.*

### class `ForwardRef`

Class used for internal typing representation of string forward references.

For example, `List["SomeClass"]` is implicitly transformed into
`List[ForwardRef("SomeClass")]`.  `ForwardRef` should not be instantiated by
a user, but may be used by introspection tools.

> **Note:** PEP 585 generic types such as `list["SomeClass"]` will not be
> implicitly transformed into `list[ForwardRef("SomeClass")]` and thus
> will not automatically resolve to `list[SomeClass]`.

> *Added in version 3.7.4.*

> *Changed in version 3.14.*
> This is now an alias for `annotationlib.ForwardRef`. Several undocumented
> behaviors of this class have been changed; for example, after a `ForwardRef` has
> been evaluated, the evaluated value is no longer cached.

### `evaluate_forward_ref(forward_ref, *, owner=None, globals=None, locals=None, type_params=None, format=annotationlib.Format.VALUE)`

Evaluate an `annotationlib.ForwardRef` as a type hint.

This is similar to calling `annotationlib.ForwardRef.evaluate()`,
but unlike that method, `evaluate_forward_ref()` also
recursively evaluates forward references nested within the type hint.

See the documentation for `annotationlib.ForwardRef.evaluate()` for
the meaning of the *owner*, *globals*, *locals*, *type_params*, and *format* parameters.

> **Caution:** This function may execute arbitrary code contained in annotations.
> See annotationlib-security for more information.

> *Added in version 3.14.*

### `NoDefault`

A sentinel object used to indicate that a type parameter has no default
value. For example:

```python

>>> T = TypeVar("T")
>>> T.__default__ is typing.NoDefault
True
>>> S = TypeVar("S", default=None)
>>> S.__default__ is None
True
```

> *Added in version 3.13.*

### `NoExtraItems`

A `sentinel` object used to indicate that a `TypedDict`
does not have the *extra_items* class argument.

```python

>>> from typing import TypedDict, NoExtraItems
>>> class Point(TypedDict):
...     x: int
...     y: int
...
>>> Point.__extra_items__ is NoExtraItems
True
```

### `TYPE_CHECKING`

A special constant that is assumed to be `True` by static
type checkers. It's `False` at runtime.

A module which is expensive to import, and which only contain types
used for typing annotations, can be safely imported inside an
`if TYPE_CHECKING:` block.  This prevents the module from actually
being imported at runtime; annotations aren't eagerly evaluated
(see PEP 649) so using undefined symbols in annotations is
harmless--as long as you don't later examine them.
Your static type analysis tool will set `TYPE_CHECKING` to
`True` during static type analysis, which means the module will
be imported and the types will be checked properly during such analysis.

Usage:

```
if TYPE_CHECKING:
    import expensive_mod

def fun(arg: expensive_mod.SomeType) -> None:
    local_var: expensive_mod.AnotherType = other_fun()
```

If you occasionally need to examine type annotations at runtime
which may contain undefined symbols, use
`annotationlib.get_annotations()` with a `format` parameter
of `annotationlib.Format.STRING` or
`annotationlib.Format.FORWARDREF` to safely retrieve the
annotations without raising `NameError`.

> *Added in version 3.5.2.*

### Deprecated aliases

This module defines several deprecated aliases to pre-existing
standard library classes. These were originally included in the `typing`
module in order to support parameterizing these generic classes using `[]`.
However, the aliases became redundant in Python 3.9 when the
corresponding pre-existing classes were enhanced to support `[]` (see
PEP 585).

The redundant types are deprecated as of Python 3.9. However, while the aliases
may be removed at some point, removal of these aliases is not currently
planned. As such, no deprecation warnings are currently issued by the
interpreter for these aliases.

If at some point it is decided to remove these deprecated aliases, a
deprecation warning will be issued by the interpreter for at least two releases
prior to removal. The aliases are guaranteed to remain in the `typing` module
without deprecation warnings until at least Python 3.14.

Type checkers are encouraged to flag uses of the deprecated types if the
program they are checking targets a minimum Python version of 3.9 or newer.

#### Aliases to built-in types

### class `Dict(dict, MutableMapping[KT, VT])`

Deprecated alias to `dict`.

Note that to annotate arguments, it is preferred
to use an abstract collection type such as `Mapping`
rather than to use `dict` or `typing.Dict`.

> *Deprecated since version 3.9.*
> `builtins.dict` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `List(list, MutableSequence[T])`

Deprecated alias to `list`.

Note that to annotate arguments, it is preferred
to use an abstract collection type such as
`Sequence` or `Iterable`
rather than to use `list` or `typing.List`.

> *Deprecated since version 3.9.*
> `builtins.list` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `Set(set, MutableSet[T])`

Deprecated alias to `builtins.set`.

Note that to annotate arguments, it is preferred
to use an abstract collection type such as `collections.abc.Set`
rather than to use `set` or `typing.Set`.

> *Deprecated since version 3.9.*
> `builtins.set` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `FrozenSet(frozenset, AbstractSet[T_co])`

Deprecated alias to `builtins.frozenset`.

> *Deprecated since version 3.9.*
> `builtins.frozenset`
> now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### `Tuple`

Deprecated alias for `tuple`.

`tuple` and `Tuple` are special-cased in the type system; see
annotating-tuples for more details.

> *Deprecated since version 3.9.*
> `builtins.tuple` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `Type(Generic[CT_co])`

Deprecated alias to `type`.

See type-of-class-objects for details on using `type` or
`typing.Type` in type annotations.

> *Added in version 3.5.2.*

> *Deprecated since version 3.9.*
> `builtins.type` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

#### Aliases to types in `collections`

### class `DefaultDict(collections.defaultdict, MutableMapping[KT, VT])`

Deprecated alias to `collections.defaultdict`.

> *Added in version 3.5.2.*

> *Deprecated since version 3.9.*
> `collections.defaultdict` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `OrderedDict(collections.OrderedDict, MutableMapping[KT, VT])`

Deprecated alias to `collections.OrderedDict`.

> *Added in version 3.7.2.*

> *Deprecated since version 3.9.*
> `collections.OrderedDict` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `ChainMap(collections.ChainMap, MutableMapping[KT, VT])`

Deprecated alias to `collections.ChainMap`.

> *Added in version 3.6.1.*

> *Deprecated since version 3.9.*
> `collections.ChainMap` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `Counter(collections.Counter, Dict[T, int])`

Deprecated alias to `collections.Counter`.

> *Added in version 3.6.1.*

> *Deprecated since version 3.9.*
> `collections.Counter` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `Deque(deque, MutableSequence[T])`

Deprecated alias to `collections.deque`.

> *Added in version 3.6.1.*

> *Deprecated since version 3.9.*
> `collections.deque` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

#### Aliases to other concrete types

### class `Pattern`

```python
Match
```

Deprecated aliases corresponding to the return types from
`re.compile()` and `re.search()`.

These types (and the corresponding functions) are generic over
`AnyStr`. `Pattern` can be specialised as `Pattern[str]` or
`Pattern[bytes]`; `Match` can be specialised as `Match[str]` or
`Match[bytes]`.

> *Deprecated since version 3.9.*
> Classes `Pattern` and `Match` from `re` now support `[]`.
> See PEP 585 and types-genericalias.

### class `Text`

Deprecated alias for `str`.

`Text` is provided to supply a forward
compatible path for Python 2 code: in Python 2, `Text` is an alias for
`unicode`.

Use `Text` to indicate that a value must contain a unicode string in
a manner that is compatible with both Python 2 and Python 3:

```
def add_unicode_checkmark(text: Text) -> Text:
    return text + u' \u2713'
```

> *Added in version 3.5.2.*

> *Deprecated since version 3.11.*
> Python 2 is no longer supported, and most type checkers also no longer
> support type checking Python 2 code. Removal of the alias is not
> currently planned, but users are encouraged to use
> `str` instead of `Text`.

#### Aliases to container ABCs in `collections.abc`

### class `AbstractSet(Collection[T_co])`

Deprecated alias to `collections.abc.Set`.

> *Deprecated since version 3.9.*
> `collections.abc.Set` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `ByteString(Sequence[int])`

Deprecated alias to `collections.abc.ByteString`.

Use `isinstance(obj, collections.abc.Buffer)` to test if `obj`
implements the buffer protocol at runtime. For use in
type annotations, either use `Buffer` or a union
that explicitly specifies the types your code supports (e.g.,
`bytes | bytearray | memoryview`).

`ByteString` was originally intended to be an abstract class that
would serve as a supertype of both `bytes` and `bytearray`.
However, since the ABC never had any methods, knowing that an object was an
instance of `ByteString` never actually told you anything useful
about the object. Other common buffer types such as `memoryview` were
also never understood as subtypes of `ByteString` (either at runtime
or by static type checkers).

See PEP PEP 688 for more details.

> *Deprecated since version 3.9, removed in version 3.17.*

### class `Collection(Sized, Iterable[T_co], Container[T_co])`

Deprecated alias to `collections.abc.Collection`.

> *Added in version 3.6.*

> *Deprecated since version 3.9.*
> `collections.abc.Collection` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `Container(Generic[T_co])`

Deprecated alias to `collections.abc.Container`.

> *Deprecated since version 3.9.*
> `collections.abc.Container` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `ItemsView(MappingView, AbstractSet[tuple[KT_co, VT_co]])`

Deprecated alias to `collections.abc.ItemsView`.

> *Deprecated since version 3.9.*
> `collections.abc.ItemsView` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `KeysView(MappingView, AbstractSet[KT_co])`

Deprecated alias to `collections.abc.KeysView`.

> *Deprecated since version 3.9.*
> `collections.abc.KeysView` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `Mapping(Collection[KT], Generic[KT, VT_co])`

Deprecated alias to `collections.abc.Mapping`.

> *Deprecated since version 3.9.*
> `collections.abc.Mapping` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `MappingView(Sized)`

Deprecated alias to `collections.abc.MappingView`.

> *Deprecated since version 3.9.*
> `collections.abc.MappingView` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `MutableMapping(Mapping[KT, VT])`

Deprecated alias to `collections.abc.MutableMapping`.

> *Deprecated since version 3.9.*
> `collections.abc.MutableMapping`
> now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `MutableSequence(Sequence[T])`

Deprecated alias to `collections.abc.MutableSequence`.

> *Deprecated since version 3.9.*
> `collections.abc.MutableSequence`
> now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `MutableSet(AbstractSet[T])`

Deprecated alias to `collections.abc.MutableSet`.

> *Deprecated since version 3.9.*
> `collections.abc.MutableSet` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `Sequence(Reversible[T_co], Collection[T_co])`

Deprecated alias to `collections.abc.Sequence`.

> *Deprecated since version 3.9.*
> `collections.abc.Sequence` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `ValuesView(MappingView, Collection[_VT_co])`

Deprecated alias to `collections.abc.ValuesView`.

> *Deprecated since version 3.9.*
> `collections.abc.ValuesView` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

#### Aliases to asynchronous ABCs in `collections.abc`

### class `Coroutine(Awaitable[ReturnType], Generic[YieldType, SendType, ReturnType])`

Deprecated alias to `collections.abc.Coroutine`.

See annotating-generators-and-coroutines
for details on using `collections.abc.Coroutine`
and `typing.Coroutine` in type annotations.

> *Added in version 3.5.3.*

> *Deprecated since version 3.9.*
> `collections.abc.Coroutine` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `AsyncGenerator(AsyncIterator[YieldType], Generic[YieldType, SendType])`

Deprecated alias to `collections.abc.AsyncGenerator`.

See annotating-generators-and-coroutines
for details on using `collections.abc.AsyncGenerator`
and `typing.AsyncGenerator` in type annotations.

> *Added in version 3.6.1.*

> *Deprecated since version 3.9.*
> `collections.abc.AsyncGenerator`
> now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

> *Changed in version 3.13.*
> The `SendType` parameter now has a default.

### class `AsyncIterable(Generic[T_co])`

Deprecated alias to `collections.abc.AsyncIterable`.

> *Added in version 3.5.2.*

> *Deprecated since version 3.9.*
> `collections.abc.AsyncIterable` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.
