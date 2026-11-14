---
title: "unittest.mock --- mock object library (part 7 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/unittest.mock.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# unittest.mock --- mock object library (part 7 of 10)

## MagicMock and magic method support

#### Mocking Magic Methods

`Mock` supports mocking the Python protocol methods, also known as
"magic methods". This allows mock objects to replace
containers or other objects that implement Python protocols.

Because magic methods are looked up differently from normal methods, this
support has been specially implemented. This means that only specific magic
methods are supported. The supported list includes *almost* all of them. If
there are any missing that you need please let us know.

You mock magic methods by setting the method you are interested in to a function
or a mock instance. If you are using a function then it *must* take `self` as
the first argument.

```python
>>> def __str__(self):
...     return 'fooble'
...
>>> mock = Mock()
>>> mock.__str__ = __str__
>>> str(mock)
'fooble'
```

```python
>>> mock = Mock()
>>> mock.__str__ = Mock()
>>> mock.__str__.return_value = 'fooble'
>>> str(mock)
'fooble'
```

```python
>>> mock = Mock()
>>> mock.__iter__ = Mock(return_value=iter([]))
>>> list(mock)
[]
```

One use case for this is for mocking objects used as context managers in a
`with` statement:

```python
>>> mock = Mock()
>>> mock.__enter__ = Mock(return_value='foo')
>>> mock.__exit__ = Mock(return_value=False)
>>> with mock as m:
...     assert m == 'foo'
...
>>> mock.__enter__.assert_called_with()
>>> mock.__exit__.assert_called_with(None, None, None)
```

Calls to magic methods do not appear in `method_calls`, but they
are recorded in `mock_calls`.

> **Note:** If you use the *spec* keyword argument to create a mock then attempting to
> set a magic method that isn't in the spec will raise an `AttributeError`.

The full list of supported magic methods is:

- `__hash__`, `__sizeof__`, `__repr__` and `__str__`
- `__dir__`, `__format__` and `__subclasses__`
- `__round__`, `__floor__`, `__trunc__` and `__ceil__`
- Comparisons: `__lt__`, `__gt__`, `__le__`, `__ge__`,
`__eq__` and `__ne__`
- Container methods: `__getitem__`, `__setitem__`, `__delitem__`,
`__contains__`, `__len__`, `__iter__`, `__reversed__`
and `__missing__`
- Context manager: `__enter__`, `__exit__`, `__aenter__` and `__aexit__`
- Unary numeric methods: `__neg__`, `__pos__` and `__invert__`
- The numeric methods (including right hand and in-place variants):
`__add__`, `__sub__`, `__mul__`, `__matmul__`, `__truediv__`,
`__floordiv__`, `__mod__`, `__divmod__`, `__lshift__`,
`__rshift__`, `__and__`, `__xor__`, `__or__`, and `__pow__`
- Numeric conversion methods: `__complex__`, `__int__`, `__float__`
and `__index__`
- Descriptor methods: `__get__`, `__set__` and `__delete__`
- Pickling: `__reduce__`, `__reduce_ex__`, `__getinitargs__`,
`__getnewargs__`, `__getstate__` and `__setstate__`
- File system path representation: `__fspath__`
- Asynchronous iteration methods: `__aiter__` and `__anext__`

> *Changed in version 3.8.*
> Added support for `os.PathLike.__fspath__()`.

> *Changed in version 3.8.*
> Added support for `__aenter__`, `__aexit__`, `__aiter__` and `__anext__`.

The following methods exist but are *not* supported as they are either in use
by mock, can't be set dynamically, or can cause problems:

- `__getattr__`, `__setattr__`, `__init__` and `__new__`
- `__prepare__`, `__instancecheck__`, `__subclasscheck__`, `__del__`

#### Magic Mock

There are two `MagicMock` variants: `MagicMock` and `NonCallableMagicMock`.

### class `MagicMock(*args, **kw)`

`MagicMock` is a subclass of `Mock` with default implementations
of most of the magic methods. You can use
`MagicMock` without having to configure the magic methods yourself.

The constructor parameters have the same meaning as for `Mock`.

If you use the *spec* or *spec_set* arguments then *only* magic methods
that exist in the spec will be created.

### class `NonCallableMagicMock(*args, **kw)`

A non-callable version of `MagicMock`.

The constructor parameters have the same meaning as for
`MagicMock`, with the exception of *return_value* and
*side_effect* which have no meaning on a non-callable mock.

The magic methods are setup with `MagicMock` objects, so you can configure them
and use them in the usual way:

```python
>>> mock = MagicMock()
>>> mock[3] = 'fish'
>>> mock.__setitem__.assert_called_with(3, 'fish')
>>> mock.__getitem__.return_value = 'result'
>>> mock[2]
'result'
```

By default many of the protocol methods are required to return objects of a
specific type. These methods are preconfigured with a default return value, so
that they can be used without you having to do anything if you aren't interested
in the return value. You can still *set* the return value manually if you want
to change the default.

Methods and their defaults:

- `__lt__`: `NotImplemented`
- `__gt__`: `NotImplemented`
- `__le__`: `NotImplemented`
- `__ge__`: `NotImplemented`
- `__int__`: `1`
- `__contains__`: `False`
- `__len__`: `0`
- `__iter__`: `iter([])`
- `__exit__`: `False`
- `__aexit__`: `False`
- `__complex__`: `1j`
- `__float__`: `1.0`
- `__bool__`: `True`
- `__index__`: `1`
- `__hash__`: default hash for the mock
- `__str__`: default str for the mock
- `__sizeof__`: default sizeof for the mock

For example:

```python
>>> mock = MagicMock()
>>> int(mock)
1
>>> len(mock)
0
>>> list(mock)
[]
>>> object() in mock
False
```

The two equality methods, `__eq__() and ne__()`, are special.
They do the default equality comparison on identity, using the
`side_effect` attribute, unless you change their return value to
return something else:

```
>>> MagicMock() == 3
False
>>> MagicMock() != 3
True
>>> mock = MagicMock()
>>> mock.__eq__.return_value = True
>>> mock == 3
True
```

The return value of `__iter__()` can be any iterable object and isn't
required to be an iterator:

```python
>>> mock = MagicMock()
>>> mock.__iter__.return_value = ['a', 'b', 'c']
>>> list(mock)
['a', 'b', 'c']
>>> list(mock)
['a', 'b', 'c']
```

If the return value *is* an iterator, then iterating over it once will consume
it and subsequent iterations will result in an empty list:

```python
>>> mock.__iter__.return_value = iter(['a', 'b', 'c'])
>>> list(mock)
['a', 'b', 'c']
>>> list(mock)
[]
```

`MagicMock` has all of the supported magic methods configured except for some
of the obscure and obsolete ones. You can still set these up if you want.

Magic methods that are supported but not setup by default in `MagicMock` are:

- `__subclasses__`
- `__dir__`
- `__format__`
- `__get__`, `__set__` and `__delete__`
- `__reversed__` and `__missing__`
- `__reduce__`, `__reduce_ex__`, `__getinitargs__`, `__getnewargs__`,
`__getstate__` and `__setstate__`
- `__getformat__`
