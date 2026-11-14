---
title: "unittest.mock --- mock object library (part 2 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/unittest.mock.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# unittest.mock --- mock object library (part 2 of 10)

## The Mock Class

`Mock` is a flexible mock object intended to replace the use of stubs and
test doubles throughout your code. Mocks are callable and create attributes as
new mocks when you access them. Accessing the same attribute will always
return the same mock. Mocks record how you use them, allowing you to make
assertions about what your code has done to them.

`MagicMock` is a subclass of `Mock` with all the magic methods
pre-created and ready to use. There are also non-callable variants, useful
when you are mocking out objects that aren't callable:
`NonCallableMock` and `NonCallableMagicMock`

The `patch()` decorators makes it easy to temporarily replace classes
in a particular module with a `Mock` object. By default `patch()` will create
a `MagicMock` for you. You can specify an alternative class of `Mock` using
the *new_callable* argument to `patch()`.

### class `Mock(spec=None, side_effect=None, return_value=DEFAULT, wraps=None, name=None, spec_set=None, unsafe=False, **kwargs)`

Create a new `Mock` object. `Mock` takes several optional arguments
that specify the behaviour of the Mock object:

- *spec*: This can be either a list of strings or an existing object (a
class or instance) that acts as the specification for the mock object. If
you pass in an object then a list of strings is formed by calling dir on
the object (excluding unsupported magic attributes and methods).
Accessing any attribute not in this list will raise an `AttributeError`.

If *spec* is an object (rather than a list of strings) then
`__class__` returns the class of the spec object. This
allows mocks to pass `isinstance()` tests.

- *spec_set*: A stricter variant of *spec*. If used, attempting to *set*
or get an attribute on the mock that isn't on the object passed as
*spec_set* will raise an `AttributeError`.

- *side_effect*: A function to be called whenever the Mock is called. See
the `side_effect` attribute. Useful for raising exceptions or
dynamically changing return values. The function is called with the same
arguments as the mock, and unless it returns `DEFAULT`, the return
value of this function is used as the return value.

Alternatively *side_effect* can be an exception class or instance. In
this case the exception will be raised when the mock is called.

If *side_effect* is an iterable then each call to the mock will return
the next value from the iterable.

A *side_effect* can be cleared by setting it to `None`.

- *return_value*: The value returned when the mock is called. By default
this is a new Mock (created on first access). See the
`return_value` attribute.

- *unsafe*: By default, accessing any attribute whose name starts with
*assert*, *assret*, *asert*, *aseert* or *assrt* will raise an
`AttributeError`. Passing `unsafe=True` will allow access to
these attributes.

> *Added in version 3.5.*

- *wraps*: Item for the mock object to wrap. If *wraps* is not `None` then
calling the Mock will pass the call through to the wrapped object
(returning the real result). Attribute access on the mock will return a
Mock object that wraps the corresponding attribute of the wrapped
object (so attempting to access an attribute that doesn't exist will
raise an `AttributeError`).

If the mock has an explicit *return_value* set then calls are not passed
to the wrapped object and the *return_value* is returned instead.

- *name*: If the mock has a name then it will be used in the repr of the
mock. This can be useful for debugging. The name is propagated to child
mocks.

Mocks can also be called with arbitrary keyword arguments. These will be
used to set attributes on the mock after it is created. See the
`configure_mock()` method for details.

### `assert_called()`

Assert that the mock was called at least once.

```python
>>> mock = Mock()
>>> mock.method()
<Mock name='mock.method()' id='...'>
>>> mock.method.assert_called()
```

> *Added in version 3.6.*

### `assert_called_once()`

Assert that the mock was called exactly once.

```python
>>> mock = Mock()
>>> mock.method()
<Mock name='mock.method()' id='...'>
>>> mock.method.assert_called_once()
>>> mock.method()
<Mock name='mock.method()' id='...'>
>>> mock.method.assert_called_once()
Traceback (most recent call last):
...
AssertionError: Expected 'method' to have been called once. Called 2 times.
Calls: [call(), call()].
```

> *Added in version 3.6.*

### `assert_called_with(*args, **kwargs)`

This method is a convenient way of asserting that the last call has been
made in a particular way:

```python
>>> mock = Mock()
>>> mock.method(1, 2, 3, test='wow')
<Mock name='mock.method()' id='...'>
>>> mock.method.assert_called_with(1, 2, 3, test='wow')
```

### `assert_called_once_with(*args, **kwargs)`

Assert that the mock was called exactly once and that call was with the
specified arguments.

```python
>>> mock = Mock(return_value=None)
>>> mock('foo', bar='baz')
>>> mock.assert_called_once_with('foo', bar='baz')
>>> mock('other', bar='values')
>>> mock.assert_called_once_with('other', bar='values')
Traceback (most recent call last):
```

AssertionError: Expected 'mock' to be called once. Called 2 times.
Calls: [call('foo', bar='baz'), call('other', bar='values')].

### `assert_any_call(*args, **kwargs)`

Assert the mock has been called with the specified arguments.

The assert passes if the mock has *ever* been called, unlike
`assert_called_with()` and `assert_called_once_with()` that
only pass if the call is the most recent one, and in the case of
`assert_called_once_with()` it must also be the only call.

```python
>>> mock = Mock(return_value=None)
>>> mock(1, 2, arg='thing')
>>> mock('some', 'thing', 'else')
>>> mock.assert_any_call(1, 2, arg='thing')
```

### `assert_has_calls(calls, any_order=False)`

Assert the mock has been called with the specified calls.
The `mock_calls` list is checked for the calls.

If *any_order* is false then the calls must be
sequential. There can be extra calls before or after the
specified calls.

If *any_order* is true then the calls can be in any order, but
they must all appear in `mock_calls`.

```python
>>> mock = Mock(return_value=None)
>>> mock(1)
>>> mock(2)
>>> mock(3)
>>> mock(4)
>>> calls = [call(2), call(3)]
>>> mock.assert_has_calls(calls)
>>> calls = [call(4), call(2), call(3)]
>>> mock.assert_has_calls(calls, any_order=True)
```

### `assert_not_called()`

Assert the mock was never called.

```python
>>> m = Mock()
>>> m.hello.assert_not_called()
>>> obj = m.hello()
>>> m.hello.assert_not_called()
Traceback (most recent call last):
```

AssertionError: Expected 'hello' to not have been called. Called 1 times.
Calls: [call()].

> *Added in version 3.5.*

### `reset_mock(*, return_value=False, side_effect=False)`

The reset_mock method resets all the call attributes on a mock object:

```python

>>> mock = Mock(return_value=None)
>>> mock('hello')
>>> mock.called
True
>>> mock.reset_mock()
>>> mock.called
False
```

This can be useful where you want to make a series of assertions that
reuse the same object.

*return_value* parameter when set to `True` resets `return_value`:

```python

>>> mock = Mock(return_value=5)
>>> mock('hello')
5
>>> mock.reset_mock(return_value=True)
>>> mock('hello')  # doctest: +ELLIPSIS
<Mock name='mock()' id='...'>
```

*side_effect* parameter when set to `True` resets `side_effect`:

```python

>>> mock = Mock(side_effect=ValueError)
>>> mock('hello')
Traceback (most recent call last):
  ...
ValueError
>>> mock.reset_mock(side_effect=True)
>>> mock('hello')  # doctest: +ELLIPSIS
<Mock name='mock()' id='...'>
```

Note that `reset_mock()` *doesn't* clear the
`return_value`, `side_effect` or any child attributes you have
set using normal assignment by default.

Child mocks are reset as well.

> *Changed in version 3.6.*
> Added two keyword-only arguments to the reset_mock function.

### `mock_add_spec(spec, spec_set=False)`

Add a spec to a mock. *spec* can either be an object or a
list of strings. Only attributes on the *spec* can be fetched as
attributes from the mock.

If *spec_set* is true then only attributes on the spec can be set.

### `attach_mock(mock, attribute)`

Attach a mock as an attribute of this one, replacing its name and
parent. Calls to the attached mock will be recorded in the
`method_calls` and `mock_calls` attributes of this one.

### `configure_mock(**kwargs)`

Set attributes on the mock through keyword arguments.

Attributes plus return values and side effects can be set on child
mocks using standard dot notation and unpacking a dictionary in the
method call:

```python
>>> mock = Mock()
>>> attrs = {'method.return_value': 3, 'other.side_effect': KeyError}
>>> mock.configure_mock(**attrs)
>>> mock.method()
3
>>> mock.other()
Traceback (most recent call last):
```

KeyError

The same thing can be achieved in the constructor call to mocks:

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

`configure_mock()` exists to make it easier to do configuration
after the mock has been created.

### `__dir__()`

`Mock` objects limit the results of `dir(some_mock)` to useful results.
For mocks with a *spec* this includes all the permitted attributes
for the mock.

See `FILTER_DIR` for what this filtering does, and how to
switch it off.

### `_get_child_mock(**kw)`

Create the child mocks for attributes and return value.
By default child mocks will be the same type as the parent.
Subclasses of Mock may want to override this to customize the way
child mocks are made.

For non-callable mocks the callable variant will be used (rather than
any custom subclass).

### `called`

A boolean representing whether or not the mock object has been called:

```python
>>> mock = Mock(return_value=None)
>>> mock.called
False
>>> mock()
>>> mock.called
True
```

### `call_count`

An integer telling you how many times the mock object has been called:

```python
>>> mock = Mock(return_value=None)
>>> mock.call_count
0
>>> mock()
>>> mock()
>>> mock.call_count
2
```

### `return_value`

Set this to configure the value returned by calling the mock:

```python
>>> mock = Mock()
>>> mock.return_value = 'fish'
>>> mock()
'fish'
```

The default return value is a mock object and you can configure it in
the normal way:

```python
>>> mock = Mock()
>>> mock.return_value.attribute = sentinel.Attribute
>>> mock.return_value()
<Mock name='mock()()' id='...'>
>>> mock.return_value.assert_called_with()
```

`return_value` can also be set in the constructor:

```python
>>> mock = Mock(return_value=3)
>>> mock.return_value
3
>>> mock()
3
```

### `side_effect`

This can either be a function to be called when the mock is called,
an iterable or an exception (class or instance) to be raised.

If you pass in a function it will be called with same arguments as the
mock and unless the function returns the `DEFAULT` singleton the
call to the mock will then return whatever the function returns. If the
function returns `DEFAULT` then the mock will return its normal
value (from the `return_value`).

If you pass in an iterable, it is used to retrieve an iterator which
must yield a value on every call.  This value can either be an exception
instance to be raised, or a value to be returned from the call to the
mock (`DEFAULT` handling is identical to the function case).

An example of a mock that raises an exception (to test exception
handling of an API):

```python
>>> mock = Mock()
>>> mock.side_effect = Exception('Boom!')
>>> mock()
Traceback (most recent call last):
```

Exception: Boom!

Using `side_effect` to return a sequence of values:

```python
>>> mock = Mock()
>>> mock.side_effect = [3, 2, 1]
>>> mock(), mock(), mock()
(3, 2, 1)
```

Using a callable:

```python
>>> mock = Mock(return_value=3)
>>> def side_effect(*args, **kwargs):
...     return DEFAULT
...
>>> mock.side_effect = side_effect
>>> mock()
3
```

`side_effect` can be set in the constructor. Here's an example that
adds one to the value the mock is called with and returns it:

```python
>>> side_effect = lambda value: value + 1
>>> mock = Mock(side_effect=side_effect)
>>> mock(3)
4
>>> mock(-8)
-7
```

Setting `side_effect` to `None` clears it:

```python
>>> m = Mock(side_effect=KeyError, return_value=3)
>>> m()
Traceback (most recent call last):
```

KeyError
>>> m.side_effect = None
>>> m()
3

### `call_args`

This is either `None` (if the mock hasn't been called), or the
arguments that the mock was last called with. This will be in the
form of a tuple: the first member, which can also be accessed through
the `args` property, is any positional arguments the mock was
called with (or an empty tuple) and the second member, which can
also be accessed through the `kwargs` property, is any keyword
arguments (or an empty dictionary).

```python
>>> mock = Mock(return_value=None)
>>> print(mock.call_args)
None
>>> mock()
>>> mock.call_args
call()
>>> mock.call_args == ()
True
>>> mock(3, 4)
>>> mock.call_args
call(3, 4)
>>> mock.call_args == ((3, 4),)
True
>>> mock.call_args.args
(3, 4)
>>> mock.call_args.kwargs
{}
>>> mock(3, 4, 5, key='fish', next='w00t!')
>>> mock.call_args
call(3, 4, 5, key='fish', next='w00t!')
>>> mock.call_args.args
(3, 4, 5)
>>> mock.call_args.kwargs
{'key': 'fish', 'next': 'w00t!'}
```

`call_args`, along with members of the lists `call_args_list`,
`method_calls` and `mock_calls` are `call` objects.
These are tuples, so they can be unpacked to get at the individual
arguments and make more complex assertions. See
calls as tuples.

> *Changed in version 3.8.*
> Added `args` and `kwargs` properties.

### `call_args_list`

This is a list of all the calls made to the mock object in sequence
(so the length of the list is the number of times it has been
called). Before any calls have been made it is an empty list. The
`call` object can be used for conveniently constructing lists of
calls to compare with `call_args_list`.

```python
>>> mock = Mock(return_value=None)
>>> mock()
>>> mock(3, 4)
>>> mock(key='fish', next='w00t!')
>>> mock.call_args_list
[call(), call(3, 4), call(key='fish', next='w00t!')]
>>> expected = [(), ((3, 4),), ({'key': 'fish', 'next': 'w00t!'},)]
>>> mock.call_args_list == expected
True
```

Members of `call_args_list` are `call` objects. These can be
unpacked as tuples to get at the individual arguments. See
calls as tuples.
