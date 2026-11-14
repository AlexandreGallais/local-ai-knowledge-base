---
title: "unittest.mock --- mock object library (part 1 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/unittest.mock.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `unittest.mock` --- mock object library

Module `unittest.mock`.

> *Added in version 3.3.*

**Source code:** Lib/unittest/mock.py

`unittest.mock` is a library for testing in Python. It allows you to
replace parts of your system under test with mock objects and make assertions
about how they have been used.

`unittest.mock` provides a core `Mock` class removing the need to
create a host of stubs throughout your test suite. After performing an
action, you can make assertions about which methods / attributes were used
and arguments they were called with. You can also specify return values and
set needed attributes in the normal way.

Additionally, mock provides a `patch()` decorator that handles patching
module and class level attributes within the scope of a test, along with
`sentinel` for creating unique objects. See the quick guide for
some examples of how to use `Mock`, `MagicMock` and
`patch()`.

Mock is designed for use with `unittest` and
is based on the 'action -> assertion' pattern instead of 'record -> replay'
used by many mocking frameworks.

There is a backport of `unittest.mock` for earlier versions of Python,
available as mock on PyPI.

## Quick Guide

`Mock` and `MagicMock` objects create all attributes and
methods as you access them and store details of how they have been used. You
can configure them, to specify return values or limit what attributes are
available, and then make assertions about how they have been used:

```python
>>> from unittest.mock import MagicMock
>>> thing = ProductionClass()
>>> thing.method = MagicMock(return_value=3)
>>> thing.method(3, 4, 5, key='value')
3
>>> thing.method.assert_called_with(3, 4, 5, key='value')
```

`side_effect` allows you to perform side effects, including raising an
exception when a mock is called:

```python
>>> from unittest.mock import Mock
>>> mock = Mock(side_effect=KeyError('foo'))
>>> mock()
Traceback (most recent call last):
```

KeyError: 'foo'

```python
>>> values = {'a': 1, 'b': 2, 'c': 3}
>>> def side_effect(arg):
...     return values[arg]
...
>>> mock.side_effect = side_effect
>>> mock('a'), mock('b'), mock('c')
(1, 2, 3)
>>> mock.side_effect = [5, 4, 3, 2, 1]
>>> mock(), mock(), mock()
(5, 4, 3)
```

Mock has many other ways you can configure it and control its behaviour. For
example the *spec* argument configures the mock to take its specification
from another object. Attempting to access attributes or methods on the mock
that don't exist on the spec will fail with an `AttributeError`.

The `patch()` decorator / context manager makes it easy to mock classes or
objects in a module under test. The object you specify will be replaced with a
mock (or other object) during the test and restored when the test ends:

```
>>> from unittest.mock import patch
>>> @patch('module.ClassName2')
... @patch('module.ClassName1')
... def test(MockClass1, MockClass2):
...     module.ClassName1()
...     module.ClassName2()
...     assert MockClass1 is module.ClassName1
...     assert MockClass2 is module.ClassName2
...     assert MockClass1.called
...     assert MockClass2.called
...
>>> test()
```

> **Note:** When you nest patch decorators the mocks are passed in to the decorated
> function in the same order they applied (the normal *Python* order that
> decorators are applied). This means from the bottom up, so in the example
> above the mock for `module.ClassName1` is passed in first.
>
> With `patch()` it matters that you patch objects in the namespace where they
> are looked up. This is normally straightforward, but for a quick guide
> read where to patch.

As well as a decorator `patch()` can be used as a context manager in a with
statement:

```python
>>> with patch.object(ProductionClass, 'method', return_value=None) as mock_method:
...     thing = ProductionClass()
...     thing.method(1, 2, 3)
...
>>> mock_method.assert_called_once_with(1, 2, 3)
```

There is also `patch.dict()` for setting values in a dictionary just
during a scope and restoring the dictionary to its original state when the test
ends:

```python
>>> foo = {'key': 'value'}
>>> original = foo.copy()
>>> with patch.dict(foo, {'newkey': 'newvalue'}, clear=True):
...     assert foo == {'newkey': 'newvalue'}
...
>>> assert foo == original
```

Mock supports the mocking of Python magic methods. The
easiest way of using magic methods is with the `MagicMock` class. It
allows you to do things like:

```python
>>> mock = MagicMock()
>>> mock.__str__.return_value = 'foobarbaz'
>>> str(mock)
'foobarbaz'
>>> mock.__str__.assert_called_with()
```

Mock allows you to assign functions (or other Mock instances) to magic methods
and they will be called appropriately. The `MagicMock` class is just a Mock
variant that has all of the magic methods pre-created for you (well, all the
useful ones anyway).

The following is an example of using magic methods with the ordinary Mock
class:

```python
>>> mock = Mock()
>>> mock.__str__ = Mock(return_value='wheeeeee')
>>> str(mock)
'wheeeeee'
```

For ensuring that the mock objects in your tests have the same api as the
objects they are replacing, you can use auto-speccing.
Auto-speccing can be done through the *autospec* argument to patch, or the
`create_autospec()` function. Auto-speccing creates mock objects that
have the same attributes and methods as the objects they are replacing, and
any functions and methods (including constructors) have the same call
signature as the real object.

This ensures that your mocks will fail in the same way as your production
code if they are used incorrectly:

```python
>>> from unittest.mock import create_autospec
>>> def function(a, b, c):
...     pass
...
>>> mock_function = create_autospec(function, return_value='fishy')
>>> mock_function(1, 2, 3)
'fishy'
>>> mock_function.assert_called_once_with(1, 2, 3)
>>> mock_function('wrong arguments')
Traceback (most recent call last):
```

TypeError: missing a required argument: 'b'

`create_autospec()` can also be used on classes, where it copies the signature of
the `__init__` method, and on callable objects where it copies the signature of
the `__call__` method.
