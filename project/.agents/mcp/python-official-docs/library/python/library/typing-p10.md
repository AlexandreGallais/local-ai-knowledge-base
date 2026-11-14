---
title: "typing --- Support for type hints (part 10 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/typing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# typing --- Support for type hints (part 10 of 10)

### class `AsyncIterator(AsyncIterable[T_co])`

Deprecated alias to `collections.abc.AsyncIterator`.

> *Added in version 3.5.2.*

> *Deprecated since version 3.9.*
> `collections.abc.AsyncIterator` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `Awaitable(Generic[T_co])`

Deprecated alias to `collections.abc.Awaitable`.

> *Added in version 3.5.2.*

> *Deprecated since version 3.9.*
> `collections.abc.Awaitable` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

#### Aliases to other ABCs in `collections.abc`

### class `Iterable(Generic[T_co])`

Deprecated alias to `collections.abc.Iterable`.

> *Deprecated since version 3.9.*
> `collections.abc.Iterable` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `Iterator(Iterable[T_co])`

Deprecated alias to `collections.abc.Iterator`.

> *Deprecated since version 3.9.*
> `collections.abc.Iterator` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### `Callable`

Deprecated alias to `collections.abc.Callable`.

See annotating-callables for details on how to use
`collections.abc.Callable` and `typing.Callable` in type annotations.

> *Deprecated since version 3.9.*
> `collections.abc.Callable` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

> *Changed in version 3.10.*
> `Callable` now supports `ParamSpec` and `Concatenate`.
> See PEP 612 for more details.

### class `Generator(Iterator[YieldType], Generic[YieldType, SendType, ReturnType])`

Deprecated alias to `collections.abc.Generator`.

See annotating-generators-and-coroutines
for details on using `collections.abc.Generator`
and `typing.Generator` in type annotations.

> *Deprecated since version 3.9.*
> `collections.abc.Generator` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

> *Changed in version 3.13.*
> Default values for the send and return types were added.

### class `Hashable`

Deprecated alias to `collections.abc.Hashable`.

> *Deprecated since version 3.12.*
> Use `collections.abc.Hashable` directly instead.

### class `Reversible(Iterable[T_co])`

Deprecated alias to `collections.abc.Reversible`.

> *Deprecated since version 3.9.*
> `collections.abc.Reversible` now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

### class `Sized`

Deprecated alias to `collections.abc.Sized`.

> *Deprecated since version 3.12.*
> Use `collections.abc.Sized` directly instead.

#### Aliases to `contextlib` ABCs

### class `ContextManager(Generic[T_co, ExitT_co])`

Deprecated alias to `contextlib.AbstractContextManager`.

The first type parameter, `T_co`, represents the type returned by
the `__enter__()` method. The optional second type parameter, `ExitT_co`,
which defaults to `bool | None`, represents the type returned by the
`__exit__()` method.

> *Added in version 3.5.4.*

> *Deprecated since version 3.9.*
> `contextlib.AbstractContextManager`
> now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

> *Changed in version 3.13.*
> Added the optional second type parameter, `ExitT_co`.

### class `AsyncContextManager(Generic[T_co, AExitT_co])`

Deprecated alias to `contextlib.AbstractAsyncContextManager`.

The first type parameter, `T_co`, represents the type returned by
the `__aenter__()` method. The optional second type parameter, `AExitT_co`,
which defaults to `bool | None`, represents the type returned by the
`__aexit__()` method.

> *Added in version 3.6.2.*

> *Deprecated since version 3.9.*
> `contextlib.AbstractAsyncContextManager`
> now supports subscripting (`[]`).
> See PEP 585 and types-genericalias.

> *Changed in version 3.13.*
> Added the optional second type parameter, `AExitT_co`.

## Deprecation Timeline of Major Features

Certain features in `typing` are deprecated and may be removed in a future
version of Python. The following table summarizes major deprecations for your
convenience. This is subject to change, and not all deprecations are listed.

- - Feature
- Deprecated in
- Projected removal
- PEP/issue
- - `typing` versions of standard collections
- 3.9
- Undecided (see deprecated-aliases for more information)
- PEP 585
- - `typing.ByteString`
- 3.9
- 3.17
- 91896
- - `typing.Text`
- 3.11
- Undecided
- 92332
- - `typing.Hashable` and `typing.Sized`
- 3.12
- Undecided
- 94309
- - `typing.TypeAlias`
- 3.12
- Undecided
- PEP 695
- - `typing.AnyStr`
- 3.13
- 3.18
- 105578
