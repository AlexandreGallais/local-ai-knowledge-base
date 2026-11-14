---
title: "unittest.mock --- mock object library (part 3 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/unittest.mock.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# unittest.mock --- mock object library (part 3 of 10)

### `method_calls`

As well as tracking calls to themselves, mocks also track calls to
methods and attributes, and *their* methods and attributes:

```python
>>> mock = Mock()
>>> mock.method()
<Mock name='mock.method()' id='...'>
>>> mock.property.method.attribute()
<Mock name='mock.property.method.attribute()' id='...'>
>>> mock.method_calls
[call.method(), call.property.method.attribute()]
```

Members of `method_calls` are `call` objects. These can be
unpacked as tuples to get at the individual arguments. See
calls as tuples.

### `mock_calls`

`mock_calls` records *all* calls to the mock object, its methods,
magic methods *and* return value mocks.

```python
>>> mock = MagicMock()
>>> result = mock(1, 2, 3)
>>> mock.first(a=3)
<MagicMock name='mock.first()' id='...'>
>>> mock.second()
<MagicMock name='mock.second()' id='...'>
>>> int(mock)
1
>>> result(1)
<MagicMock name='mock()()' id='...'>
>>> expected = [call(1, 2, 3), call.first(a=3), call.second(),
... call.__int__(), call()(1)]
>>> mock.mock_calls == expected
True
```

Members of `mock_calls` are `call` objects. These can be
unpacked as tuples to get at the individual arguments. See
calls as tuples.

> **Note:** The way `mock_calls` are recorded means that where nested
> calls are made, the parameters of ancestor calls are not recorded
> and so will always compare equal:
>
>
> ```python
> >>> mock = MagicMock()
> >>> mock.top(a=3).bottom()
> <MagicMock name='mock.top().bottom()' id='...'>
> >>> mock.mock_calls
> [call.top(a=3), call.top().bottom()]
> >>> mock.mock_calls[-1] == call.top(a=-1).bottom()
> True
> ```
>

### `__class__`

Normally the `__class__` attribute of an object will return its type.
For a mock object with a `spec, class__` returns the spec class
instead. This allows mock objects to pass `isinstance()` tests for the
object they are replacing / masquerading as:

```python
>>> mock = Mock(spec=3)
>>> isinstance(mock, int)
True
```

`__class__` is assignable to, this allows a mock to pass an
`isinstance()` check without forcing you to use a spec:

```python
>>> mock = Mock()
>>> mock.__class__ = dict
>>> isinstance(mock, dict)
True
```

### class `NonCallableMock(spec=None, wraps=None, name=None, spec_set=None, **kwargs)`

A non-callable version of `Mock`. The constructor parameters have the same
meaning of `Mock`, with the exception of *return_value* and *side_effect*
which have no meaning on a non-callable mock.

Mock objects that use a class or an instance as a `spec` or
`spec_set` are able to pass `isinstance()` tests:

```python
>>> mock = Mock(spec=SomeClass)
>>> isinstance(mock, SomeClass)
True
>>> mock = Mock(spec_set=SomeClass())
>>> isinstance(mock, SomeClass)
True
```

The `Mock` classes have support for mocking magic methods. See :ref:`magic
methods <magic-methods>` for the full details.

The mock classes and the `patch()` decorators all take arbitrary keyword
arguments for configuration. For the `patch()` decorators the keywords are
passed to the constructor of the mock being created. The keyword arguments
are for configuring attributes of the mock:

```python
>>> m = MagicMock(attribute=3, other='fish')
>>> m.attribute
3
>>> m.other
'fish'
```

The return value and side effect of child mocks can be set in the same way,
using dotted notation. As you can't use dotted names directly in a call you
have to create a dictionary and unpack it using `**`:

```python
>>> attrs = {'method.return_value': 3, 'other.side_effect': KeyError}
>>> mock = Mock(some_attribute='eggs', **attrs)
>>> mock.some_attribute
'eggs'
>>> mock.method()
3
>>> mock.other()
Traceback (most recent call last):
```

KeyError

A callable mock which was created with a *spec* (or a *spec_set*) will
introspect the specification object's signature when matching calls to
the mock.  Therefore, it can match the actual call's arguments regardless
of whether they were passed positionally or by name:

```
>>> def f(a, b, c): pass
...
>>> mock = Mock(spec=f)
>>> mock(1, 2, c=3)
<Mock name='mock()' id='140161580456576'>
>>> mock.assert_called_with(1, 2, 3)
>>> mock.assert_called_with(a=1, b=2, c=3)
```

This applies to `assert_called_with()`,
`assert_called_once_with()`, `assert_has_calls()` and
`assert_any_call()`.  When auto-speccing, it will also
apply to method calls on the mock object.

> *Changed in version 3.4.*
> Added signature introspection on specced and autospecced mock objects.

### class `PropertyMock(*args, **kwargs)`

A mock intended to be used as a `property`, or other
descriptor, on a class. `PropertyMock` provides
`__get__() and set__()` methods
so you can specify a return value when it is fetched.

Fetching a `PropertyMock` instance from an object calls the mock, with
no args. Setting it calls the mock with the value being set.:

```
>>> class Foo:
...     @property
...     def foo(self):
...         return 'something'
...     @foo.setter
...     def foo(self, value):
...         pass
...
>>> with patch('__main__.Foo.foo', new_callable=PropertyMock) as mock_foo:
...     mock_foo.return_value = 'mockity-mock'
...     this_foo = Foo()
...     print(this_foo.foo)
...     this_foo.foo = 6
...
mockity-mock
>>> mock_foo.mock_calls
[call(), call(6)]
```

Because of the way mock attributes are stored you can't directly attach a
`PropertyMock` to a mock object. Instead you can attach it to the mock type
object:

```
>>> m = MagicMock()
>>> p = PropertyMock(return_value=3)
>>> type(m).foo = p
>>> m.foo
3
>>> p.assert_called_once_with()
```

> **Caution:** If an `AttributeError` is raised by `PropertyMock`,
> it will be interpreted as a missing descriptor and
> `__getattr__()` will be called on the parent mock:
>
>
> ```
> >>> m = MagicMock()
> >>> no_attribute = PropertyMock(side_effect=AttributeError)
> >>> type(m).my_property = no_attribute
> >>> m.my_property
> <MagicMock name='mock.my_property' id='140165240345424'>
> ```
>
>
> See `__getattr__()` for details.

### class `AsyncMock(spec=None, side_effect=None, return_value=DEFAULT, wraps=None, name=None, spec_set=None, unsafe=False, **kwargs)`

An asynchronous version of `MagicMock`. The `AsyncMock` object will
behave so the object is recognized as an async function, and the result of a
call is an awaitable.

```python
>>> mock = AsyncMock()
>>> inspect.iscoroutinefunction(mock)
True
>>> inspect.isawaitable(mock())  # doctest: +SKIP
True
```

The result of `mock()` is an async function which will have the outcome
of `side_effect` or `return_value` after it has been awaited:

- if `side_effect` is a function, the async function will return the
result of that function,
- if `side_effect` is an exception, the async function will raise the
exception,
- if `side_effect` is an iterable, the async function will return the
next value of the iterable, however, if the sequence of result is
exhausted, `StopAsyncIteration` is raised immediately,
- if `side_effect` is not defined, the async function will return the
value defined by `return_value`, hence, by default, the async function
returns a new `AsyncMock` object.

Setting the *spec* of a `Mock` or `MagicMock` to an async function
will result in a coroutine object being returned after calling.

### >>> async def async_func(): pass

```python
>>> mock = MagicMock(async_func)
>>> mock
<MagicMock spec='function' id='...'>
>>> mock()  # doctest: +SKIP
<coroutine object AsyncMockMixin._mock_call at ...>
```

Setting the *spec* of a `Mock`, `MagicMock`, or `AsyncMock`
to a class with asynchronous and synchronous functions will automatically
detect the synchronous functions and set them as `MagicMock` (if the
parent mock is `AsyncMock` or `MagicMock`) or `Mock` (if
the parent mock is `Mock`). All asynchronous functions will be
`AsyncMock`.

```python
>>> class ExampleClass:
...     def sync_foo():
...         pass
...     async def async_foo():
...         pass
...
>>> a_mock = AsyncMock(ExampleClass)
>>> a_mock.sync_foo
<MagicMock name='mock.sync_foo' id='...'>
>>> a_mock.async_foo
<AsyncMock name='mock.async_foo' id='...'>
>>> mock = Mock(ExampleClass)
>>> mock.sync_foo
<Mock name='mock.sync_foo' id='...'>
>>> mock.async_foo
<AsyncMock name='mock.async_foo' id='...'>
```

> *Added in version 3.8.*

### `assert_awaited()`

Assert that the mock was awaited at least once. Note that this is separate
from the object having been called, the `await` keyword must be used:

```python
>>> mock = AsyncMock()
>>> async def main(coroutine_mock):
...     await coroutine_mock
...
>>> coroutine_mock = mock()
>>> mock.called
True
>>> mock.assert_awaited()
Traceback (most recent call last):
...
AssertionError: Expected mock to have been awaited.
>>> asyncio.run(main(coroutine_mock))
>>> mock.assert_awaited()
```

### `assert_awaited_once()`

Assert that the mock was awaited exactly once.

```python
>>> mock = AsyncMock()
>>> async def main():
...     await mock()
...
>>> asyncio.run(main())
>>> mock.assert_awaited_once()
>>> asyncio.run(main())
>>> mock.assert_awaited_once()
Traceback (most recent call last):
...
AssertionError: Expected mock to have been awaited once. Awaited 2 times.
```

### `assert_awaited_with(*args, **kwargs)`

Assert that the last await was with the specified arguments.

```python
>>> mock = AsyncMock()
>>> async def main(*args, **kwargs):
...     await mock(*args, **kwargs)
...
>>> asyncio.run(main('foo', bar='bar'))
>>> mock.assert_awaited_with('foo', bar='bar')
>>> mock.assert_awaited_with('other')
Traceback (most recent call last):
...
AssertionError: expected await not found.
Expected: mock('other')
Actual: mock('foo', bar='bar')
```

### `assert_awaited_once_with(*args, **kwargs)`

Assert that the mock was awaited exactly once and with the specified
arguments.

```python
>>> mock = AsyncMock()
>>> async def main(*args, **kwargs):
...     await mock(*args, **kwargs)
...
>>> asyncio.run(main('foo', bar='bar'))
>>> mock.assert_awaited_once_with('foo', bar='bar')
>>> asyncio.run(main('foo', bar='bar'))
>>> mock.assert_awaited_once_with('foo', bar='bar')
Traceback (most recent call last):
...
AssertionError: Expected mock to have been awaited once. Awaited 2 times.
```

### `assert_any_await(*args, **kwargs)`

Assert the mock has ever been awaited with the specified arguments.

```python
>>> mock = AsyncMock()
>>> async def main(*args, **kwargs):
...     await mock(*args, **kwargs)
...
>>> asyncio.run(main('foo', bar='bar'))
>>> asyncio.run(main('hello'))
>>> mock.assert_any_await('foo', bar='bar')
>>> mock.assert_any_await('other')
Traceback (most recent call last):
...
AssertionError: mock('other') await not found
```

### `assert_has_awaits(calls, any_order=False)`

Assert the mock has been awaited with the specified calls.
The `await_args_list` list is checked for the awaits.

If *any_order* is false then the awaits must be
sequential. There can be extra calls before or after the
specified awaits.

If *any_order* is true then the awaits can be in any order, but
they must all appear in `await_args_list`.

```python
>>> mock = AsyncMock()
>>> async def main(*args, **kwargs):
...     await mock(*args, **kwargs)
...
>>> calls = [call("foo"), call("bar")]
>>> mock.assert_has_awaits(calls)
Traceback (most recent call last):
...
AssertionError: Awaits not found.
Expected: [call('foo'), call('bar')]
Actual: []
>>> asyncio.run(main('foo'))
>>> asyncio.run(main('bar'))
>>> mock.assert_has_awaits(calls)
```

### `assert_not_awaited()`

Assert that the mock was never awaited.

```python
>>> mock = AsyncMock()
>>> mock.assert_not_awaited()
```

### `reset_mock(*args, **kwargs)`

See `Mock.reset_mock()`. Also sets `await_count` to 0,
`await_args` to None, and clears the `await_args_list`.

### `await_count`

An integer keeping track of how many times the mock object has been awaited.

```python
>>> mock = AsyncMock()
>>> async def main():
...     await mock()
...
>>> asyncio.run(main())
>>> mock.await_count
1
>>> asyncio.run(main())
>>> mock.await_count
2
```

### `await_args`

This is either `None` (if the mock hasn’t been awaited), or the arguments that
the mock was last awaited with. Functions the same as `Mock.call_args`.

```python
>>> mock = AsyncMock()
>>> async def main(*args):
...     await mock(*args)
...
>>> mock.await_args
>>> asyncio.run(main('foo'))
>>> mock.await_args
call('foo')
>>> asyncio.run(main('bar'))
>>> mock.await_args
call('bar')
```

### `await_args_list`

This is a list of all the awaits made to the mock object in sequence (so the
length of the list is the number of times it has been awaited). Before any
awaits have been made it is an empty list.

```python
>>> mock = AsyncMock()
>>> async def main(*args):
...     await mock(*args)
...
>>> mock.await_args_list
[]
>>> asyncio.run(main('foo'))
>>> mock.await_args_list
[call('foo')]
>>> asyncio.run(main('bar'))
>>> mock.await_args_list
[call('foo'), call('bar')]
```

### class `ThreadingMock(spec=None, side_effect=None, return_value=DEFAULT, wraps=None, name=None, spec_set=None, unsafe=False, *, timeout=UNSET, **kwargs)`

A version of `MagicMock` for multithreading tests. The
`ThreadingMock` object provides extra methods to wait for a call to
be invoked, rather than assert on it immediately.

The default timeout is specified by the `timeout` argument, or if unset by the
`ThreadingMock.DEFAULT_TIMEOUT` attribute, which defaults to blocking (`None`).

You can configure the global default timeout by setting `ThreadingMock.DEFAULT_TIMEOUT`.

### `wait_until_called(*, timeout=UNSET)`

Waits until the mock is called.

If a timeout was passed at the creation of the mock or if a timeout
argument is passed to this function, the function raises an
`AssertionError` if the call is not performed in time.

```python
>>> mock = ThreadingMock()
>>> thread = threading.Thread(target=mock)
>>> thread.start()
>>> mock.wait_until_called(timeout=1)
>>> thread.join()
```

### `wait_until_any_call_with(*args, **kwargs)`

Waits until the mock is called with the specified arguments.

If a timeout was passed at the creation of the mock
the function raises an `AssertionError` if the call is not performed in time.

```python
>>> mock = ThreadingMock()
>>> thread = threading.Thread(target=mock, args=("arg1", "arg2",), kwargs={"arg": "thing"})
>>> thread.start()
>>> mock.wait_until_any_call_with("arg1", "arg2", arg="thing")
>>> thread.join()
```
