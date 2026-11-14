---
title: "unittest.mock --- mock object library (part 8 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/unittest.mock.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# unittest.mock --- mock object library (part 8 of 10)

## Helpers

#### sentinel

### `sentinel`

The `sentinel` object provides a convenient way of providing unique
objects for your tests.

Attributes are created on demand when you access them by name. Accessing
the same attribute will always return the same object. The objects
returned have a sensible repr so that test failure messages are readable.

> *Changed in version 3.7.*
> The `sentinel` attributes now preserve their identity when they are
> `copied` or `pickled`.

Sometimes when testing you need to test that a specific object is passed as an
argument to another method, or returned. It can be common to create named
sentinel objects to test this. `sentinel` provides a convenient way of
creating and testing the identity of objects like this.

In this example we monkey patch `method` to return `sentinel.some_object`:

```python
>>> real = ProductionClass()
>>> real.method = Mock(name="method")
>>> real.method.return_value = sentinel.some_object
>>> result = real.method()
>>> assert result is sentinel.some_object
>>> result
sentinel.some_object
```

#### DEFAULT

### `DEFAULT`

The `DEFAULT` object is a pre-created sentinel (actually
`sentinel.DEFAULT`). It can be used by `side_effect`
functions to indicate that the normal return value should be used.

#### call

### `call(*args, **kwargs)`

`call()` is a helper object for making simpler assertions, for comparing with
`call_args`, `call_args_list`,
`mock_calls` and `method_calls`. `call()` can also be
used with `assert_has_calls()`.

```python
>>> m = MagicMock(return_value=None)
>>> m(1, 2, a='foo', b='bar')
>>> m()
>>> m.call_args_list == [call(1, 2, a='foo', b='bar'), call()]
True
```

### `call.call_list()`

For a call object that represents multiple calls, `call_list()`
returns a list of all the intermediate calls as well as the
final call.

`call_list` is particularly useful for making assertions on "chained calls". A
chained call is multiple calls on a single line of code. This results in
multiple entries in `mock_calls` on a mock. Manually constructing
the sequence of calls can be tedious.

`call_list()` can construct the sequence of calls from the same
chained call:

```python
>>> m = MagicMock()
>>> m(1).method(arg='foo').other('bar')(2.0)
<MagicMock name='mock().method().other()()' id='...'>
>>> kall = call(1).method(arg='foo').other('bar')(2.0)
>>> kall.call_list()
[call(1),
```

call().method(arg='foo'),
call().method().other('bar'),
call().method().other()(2.0)]

```python
>>> m.mock_calls == kall.call_list()
True
```

A `call` object is either a tuple of (positional args, keyword args) or
(name, positional args, keyword args) depending on how it was constructed. When
you construct them yourself this isn't particularly interesting, but the `call`
objects that are in the `Mock.call_args`, `Mock.call_args_list` and
`Mock.mock_calls` attributes can be introspected to get at the individual
arguments they contain.

The `call` objects in `Mock.call_args` and `Mock.call_args_list`
are two-tuples of (positional args, keyword args) whereas the `call` objects
in `Mock.mock_calls`, along with ones you construct yourself, are
three-tuples of (name, positional args, keyword args).

You can use their "tupleness" to pull out the individual arguments for more
complex introspection and assertions. The positional arguments are a tuple
(an empty tuple if there are no positional arguments) and the keyword
arguments are a dictionary:

```python
>>> m = MagicMock(return_value=None)
>>> m(1, 2, 3, arg='one', arg2='two')
>>> kall = m.call_args
>>> kall.args
(1, 2, 3)
>>> kall.kwargs
{'arg': 'one', 'arg2': 'two'}
>>> kall.args is kall[0]
True
>>> kall.kwargs is kall[1]
True
```

```python
>>> m = MagicMock()
>>> m.foo(4, 5, 6, arg='two', arg2='three')
<MagicMock name='mock.foo()' id='...'>
>>> kall = m.mock_calls[0]
>>> name, args, kwargs = kall
>>> name
'foo'
>>> args
(4, 5, 6)
>>> kwargs
{'arg': 'two', 'arg2': 'three'}
>>> name is m.mock_calls[0][0]
True
```

#### create_autospec

### `create_autospec(spec, spec_set=False, instance=False, **kwargs)`

Create a mock object using another object as a spec. Attributes on the
mock will use the corresponding attribute on the *spec* object as their
spec.

Functions or methods being mocked will have their arguments checked to
ensure that they are called with the correct signature.

If *spec_set* is `True` then attempting to set attributes that don't exist
on the spec object will raise an `AttributeError`.

If a class is used as a spec then the return value of the mock (the
instance of the class) will have the same spec. You can use a class as the
spec for an instance object by passing `instance=True`. The returned mock
will only be callable if instances of the mock are callable.

`create_autospec()` also takes arbitrary keyword arguments that are passed to
the constructor of the created mock.

See auto-speccing for examples of how to use auto-speccing with
`create_autospec()` and the *autospec* argument to `patch()`.

> *Changed in version 3.8.*
> `create_autospec()` now returns an `AsyncMock` if the target is
> an async function.

#### ANY

### `ANY`

Sometimes you may need to make assertions about *some* of the arguments in a
call to mock, but either not care about some of the arguments or want to pull
them individually out of `call_args` and make more complex
assertions on them.

To ignore certain arguments you can pass in objects that compare equal to
*everything*. Calls to `assert_called_with()` and
`assert_called_once_with()` will then succeed no matter what was
passed in.

```python
>>> mock = Mock(return_value=None)
>>> mock('foo', bar=object())
>>> mock.assert_called_once_with('foo', bar=ANY)
```

`ANY` can also be used in comparisons with call lists like
`mock_calls`:

```python
>>> m = MagicMock(return_value=None)
>>> m(1)
>>> m(1, 2)
>>> m(object())
>>> m.mock_calls == [call(1), call(1, 2), ANY]
True
```

`ANY` is not limited to comparisons with call objects and so
can also be used in test assertions:

```
class TestStringMethods(unittest.TestCase):

    def test_split(self):
        s = 'hello world'
        self.assertEqual(s.split(), ['hello', ANY])
```

#### FILTER_DIR

### `FILTER_DIR`

`FILTER_DIR` is a module level variable that controls the way mock objects
respond to `dir()`. The default is `True`,
which uses the filtering described below, to only show useful members. If you
dislike this filtering, or need to switch it off for diagnostic purposes, then
set `mock.FILTER_DIR = False`.

With filtering on, `dir(some_mock)` shows only useful attributes and will
include any dynamically created attributes that wouldn't normally be shown.
If the mock was created with a *spec* (or *autospec* of course) then all the
attributes from the original are shown, even if they haven't been accessed
yet:

```python

>>> dir(Mock())
['assert_any_call',
 'assert_called',
 'assert_called_once',
 'assert_called_once_with',
 'assert_called_with',
 'assert_has_calls',
 'assert_not_called',
 'attach_mock',
 ...
>>> from urllib import request
>>> dir(Mock(spec=request))
['AbstractBasicAuthHandler',
 'AbstractDigestAuthHandler',
 'AbstractHTTPHandler',
 'BaseHandler',
 ...
```

Many of the not-very-useful (private to `Mock` rather than the thing being
mocked) underscore and double underscore prefixed attributes have been
filtered from the result of calling `dir()` on a `Mock`. If you dislike this
behaviour you can switch it off by setting the module level switch
`FILTER_DIR`:

```python

>>> from unittest import mock
>>> mock.FILTER_DIR = False
>>> dir(mock.Mock())
['_NonCallableMock__get_return_value',
 '_NonCallableMock__get_side_effect',
 '_NonCallableMock__return_value_doc',
 '_NonCallableMock__set_return_value',
 '_NonCallableMock__set_side_effect',
 '__call__',
 '__class__',
 ...
```

Alternatively you can just use `vars(my_mock)` (instance members) and
`dir(type(my_mock))` (type members) to bypass the filtering irrespective of
`FILTER_DIR`.

#### mock_open
