---
title: "unittest.mock --- getting started (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/unittest.mock-examples.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# unittest.mock --- getting started (part 3 of 4)

## Further examples

Here are some more examples for some slightly more advanced scenarios.

### Mocking chained calls

Mocking chained calls is actually straightforward with mock once you
understand the `return_value` attribute. When a mock is called for
the first time, or you fetch its `return_value` before it has been called, a
new `Mock` is created.

This means that you can see how the object returned from a call to a mocked
object has been used by interrogating the `return_value` mock:

```python
>>> mock = Mock()
>>> mock().foo(a=2, b=3)
<Mock name='mock().foo()' id='...'>
>>> mock.return_value.foo.assert_called_with(a=2, b=3)
```

From here it is a simple step to configure and then make assertions about
chained calls. Of course another alternative is writing your code in a more
testable way in the first place...

So, suppose we have some code that looks a little bit like this:

```python
>>> class Something:
...     def __init__(self):
...         self.backend = BackendProvider()
...     def method(self):
...         response = self.backend.get_endpoint('foobar').create_call('spam', 'eggs').start_call()
...         # more code
```

Assuming that `BackendProvider` is already well tested, how do we test
`method()`? Specifically, we want to test that the code section ``# more
code`` uses the response object in the correct way.

As this chain of calls is made from an instance attribute we can monkey patch
the `backend` attribute on a `Something` instance. In this particular case
we are only interested in the return value from the final call to
`start_call` so we don't have much configuration to do. Let's assume the
object it returns is 'file-like', so we'll ensure that our response object
uses the builtin `open()` as its `spec`.

To do this we create a mock instance as our mock backend and create a mock
response object for it. To set the response as the return value for that final
`start_call` we could do this:

```
mock_backend.get_endpoint.return_value.create_call.return_value.start_call.return_value = mock_response
```

We can do that in a slightly nicer way using the `configure_mock()`
method to directly set the return value for us:

```
>>> something = Something()
>>> mock_response = Mock(spec=open)
>>> mock_backend = Mock()
>>> config = {'get_endpoint.return_value.create_call.return_value.start_call.return_value': mock_response}
>>> mock_backend.configure_mock(**config)
```

With these we monkey patch the "mock backend" in place and can make the real
call:

```
>>> something.backend = mock_backend
>>> something.method()
```

Using `mock_calls` we can check the chained call with a single
assert. A chained call is several calls in one line of code, so there will be
several entries in `mock_calls`. We can use `call.call_list()` to create
this list of calls for us:

```
>>> chained = call.get_endpoint('foobar').create_call('spam', 'eggs').start_call()
>>> call_list = chained.call_list()
>>> assert mock_backend.mock_calls == call_list
```

### Partial mocking

For some tests, you may want to mock out a call to `datetime.date.today()`
to return a known date, but don't want to prevent the code under test from
creating new date objects. Unfortunately `datetime.date` is written in C,
so you cannot just monkey-patch out the static `datetime.date.today()` method.

Instead, you can effectively wrap the date
class with a mock, while passing through calls to the constructor to the real
class (and returning real instances).

The `patch decorator()` is used here to
mock out the `date` class in the module under test. The `side_effect`
attribute on the mock date class is then set to a lambda function that returns
a real date. When the mock date class is called a real date will be
constructed and returned by `side_effect`.:

```
>>> import datetime as dt
>>> with patch('mymodule.date') as mock_date:
...     mock_date.today.return_value = dt.date(2010, 10, 8)
...     mock_date.side_effect = lambda *args, **kw: dt.date(*args, **kw)
...
...     assert mymodule.date.today() == dt.date(2010, 10, 8)
...     assert mymodule.date(2009, 6, 8) == dt.date(2009, 6, 8)
```

Note that we don't patch `datetime.date` globally, we patch `date` in the
module that *uses* it. See where to patch.

When `date.today()` is called a known date is returned, but calls to the
`date(...)` constructor still return normal dates. Without this you can find
yourself having to calculate an expected result using exactly the same
algorithm as the code under test, which is a classic testing anti-pattern.

Calls to the date constructor are recorded in the `mock_date` attributes
(`call_count` and friends) which may also be useful for your tests.

An alternative way of dealing with mocking dates, or other builtin classes,
is discussed in `this blog entry
<https://williambert.online/2011/07/how-to-unit-testing-in-django-with-mocking-and-patching/>`_.

### Mocking a generator method

A Python generator is a function or method that uses the `yield` statement
to return a series of values when iterated over.

A generator method / function is called to return the generator object. It is
the generator object that is then iterated over. The protocol method for
iteration is `__iter__()`, so we can
mock this using a `MagicMock`.

Here's an example class with an "iter" method implemented as a generator:

```python
>>> class Foo:
...     def iter(self):
...         for i in [1, 2, 3]:
...             yield i
...
>>> foo = Foo()
>>> list(foo.iter())
[1, 2, 3]
```

How would we mock this class, and in particular its "iter" method?

To configure the values returned from the iteration (implicit in the call to
`list`), we need to configure the object returned by the call to `foo.iter()`.

```python
>>> mock_foo = MagicMock()
>>> mock_foo.iter.return_value = iter([1, 2, 3])
>>> list(mock_foo.iter())
[1, 2, 3]
```

### Applying the same patch to every test method

If you want several patches in place for multiple test methods the obvious way
is to apply the patch decorators to every method. This can feel like unnecessary
repetition. Instead, you can use `patch()` (in all its
various forms) as a class decorator. This applies the patches to all test
methods on the class. A test method is identified by methods whose names start
with `test`:

```
>>> @patch('mymodule.SomeClass')
... class MyTest(unittest.TestCase):
...
...     def test_one(self, MockSomeClass):
...         self.assertIs(mymodule.SomeClass, MockSomeClass)
...
...     def test_two(self, MockSomeClass):
...         self.assertIs(mymodule.SomeClass, MockSomeClass)
...
...     def not_a_test(self):
...         return 'something'
...
>>> MyTest('test_one').test_one()
>>> MyTest('test_two').test_two()
>>> MyTest('test_two').not_a_test()
'something'
```

An alternative way of managing patches is to use the start-and-stop.
These allow you to move the patching into your `setUp` and `tearDown` methods.

```
>>> class MyTest(unittest.TestCase):
...     def setUp(self):
...         self.patcher = patch('mymodule.foo')
...         self.mock_foo = self.patcher.start()
...
...     def test_foo(self):
...         self.assertIs(mymodule.foo, self.mock_foo)
...
...     def tearDown(self):
...         self.patcher.stop()
...
>>> MyTest('test_foo').run()
```

If you use this technique you must ensure that the patching is "undone" by
calling `stop`. This can be fiddlier than you might think, because if an
exception is raised in the setUp then tearDown is not called.
`unittest.TestCase.addCleanup()` makes this easier:

```
>>> class MyTest(unittest.TestCase):
...     def setUp(self):
...         patcher = patch('mymodule.foo')
...         self.addCleanup(patcher.stop)
...         self.mock_foo = patcher.start()
...
...     def test_foo(self):
...         self.assertIs(mymodule.foo, self.mock_foo)
...
>>> MyTest('test_foo').run()
```

### Mocking unbound methods

Sometimes a test needs to patch an *unbound method*, which means patching the
method on the class rather than on the instance. In order to make assertions
about which objects were calling this particular method, you need to pass
`self` as the first argument. The issue is that you can't patch with a mock for
this, because if you replace an unbound method with a mock it doesn't become
a bound method when fetched from the instance, and so it doesn't get `self`
passed in. The workaround is to patch the unbound method with a real function
instead. The `patch()` decorator makes it so simple to patch out methods
with a mock that having to create a real function becomes a nuisance.

If you pass `autospec=True` to patch then it does the patching with a
*real* function object. This function object has the same signature as the one
it is replacing, but delegates to a mock under the hood. You still get your
mock auto-created in exactly the same way as before. What it means though, is
that if you use it to patch out an unbound method on a class the mocked
function will be turned into a bound method if it is fetched from an instance.
It will have `self` passed in as the first argument, which is exactly what
was needed:

```python
>>> class Foo:
...   def foo(self):
...     pass
...
>>> with patch.object(Foo, 'foo', autospec=True) as mock_foo:
...   mock_foo.return_value = 'foo'
...   foo = Foo()
...   foo.foo()
...
'foo'
>>> mock_foo.assert_called_once_with(foo)
```

If we don't use `autospec=True` then the unbound method is patched out
with a Mock instance instead, and isn't called with `self`.

### Checking multiple calls with mock

mock has a nice API for making assertions about how your mock objects are used.

```python
>>> mock = Mock()
>>> mock.foo_bar.return_value = None
>>> mock.foo_bar('baz', spam='eggs')
>>> mock.foo_bar.assert_called_with('baz', spam='eggs')
```

If your mock is only being called once you can use the
`assert_called_once_with()` method that also asserts that the
`call_count` is one.

```python
>>> mock.foo_bar.assert_called_once_with('baz', spam='eggs')
>>> mock.foo_bar()
>>> mock.foo_bar.assert_called_once_with('baz', spam='eggs')
Traceback (most recent call last):
```

AssertionError: Expected 'foo_bar' to be called once. Called 2 times.
Calls: [call('baz', spam='eggs'), call()].

Both `assert_called_with` and `assert_called_once_with` make assertions about
the *most recent* call. If your mock is going to be called several times, and
you want to make assertions about *all* those calls you can use
`call_args_list`:

```python
>>> mock = Mock(return_value=None)
>>> mock(1, 2, 3)
>>> mock(4, 5, 6)
>>> mock()
>>> mock.call_args_list
[call(1, 2, 3), call(4, 5, 6), call()]
```

The `call` helper makes it easy to make assertions about these calls. You
can build up a list of expected calls and compare it to `call_args_list`. This
looks remarkably similar to the repr of the `call_args_list`:

```python
>>> expected = [call(1, 2, 3), call(4, 5, 6), call()]
>>> mock.call_args_list == expected
True
```

### Coping with mutable arguments

Another situation is rare, but can bite you, is when your mock is called with
mutable arguments. `call_args` and `call_args_list` store *references* to the
arguments. If the arguments are mutated by the code under test then you can no
longer make assertions about what the values were when the mock was called.

Here's some example code that shows the problem. Imagine the following functions
defined in 'mymodule':

```
def frob(val):
    pass

def grob(val):
    "First frob and then clear val"
    frob(val)
    val.clear()
```

When we try to test that `grob` calls `frob` with the correct argument look
what happens:

```
>>> with patch('mymodule.frob') as mock_frob:
...     val = {6}
...     mymodule.grob(val)
...
>>> val
set()
>>> mock_frob.assert_called_with({6})
Traceback (most recent call last):
    ...
AssertionError: Expected: (({6},), {})
Called with: ((set(),), {})
```

One possibility would be for mock to copy the arguments you pass in. This
could then cause problems if you do assertions that rely on object identity
for equality.

Here's one solution that uses the `side_effect`
functionality. If you provide a `side_effect` function for a mock then
`side_effect` will be called with the same args as the mock. This gives us an
opportunity to copy the arguments and store them for later assertions. In this
example we're using *another* mock to store the arguments so that we can use the
mock methods for doing the assertion. Again a helper function sets this up for
us.:

```
>>> from copy import deepcopy
>>> from unittest.mock import Mock, patch, DEFAULT
>>> def copy_call_args(mock):
...     new_mock = Mock()
...     def side_effect(*args, **kwargs):
...         args = deepcopy(args)
...         kwargs = deepcopy(kwargs)
...         new_mock(*args, **kwargs)
...         return DEFAULT
...     mock.side_effect = side_effect
...     return new_mock
...
>>> with patch('mymodule.frob') as mock_frob:
...     new_mock = copy_call_args(mock_frob)
...     val = {6}
...     mymodule.grob(val)
...
>>> new_mock.assert_called_with({6})
>>> new_mock.call_args
call({6})
```

`copy_call_args` is called with the mock that will be called. It returns a new
mock that we do the assertion on. The `side_effect` function makes a copy of
the args and calls our `new_mock` with the copy.

> **Note:** If your mock is only going to be used once there is an easier way of
> checking arguments at the point they are called. You can simply do the
> checking inside a `side_effect` function.
>
>
> ```python
> >>> def side_effect(arg):
> ...     assert arg == {6}
> ...
> >>> mock = Mock(side_effect=side_effect)
> >>> mock({6})
> >>> mock(set())
> Traceback (most recent call last):
> ```
>
> AssertionError

An alternative approach is to create a subclass of `Mock` or
`MagicMock` that copies (using `copy.deepcopy()`) the arguments.
Here's an example implementation:

```python
>>> from copy import deepcopy
>>> class CopyingMock(MagicMock):
...     def __call__(self, /, *args, **kwargs):
...         args = deepcopy(args)
...         kwargs = deepcopy(kwargs)
...         return super().__call__(*args, **kwargs)
...
>>> c = CopyingMock(return_value=None)
>>> arg = set()
>>> c(arg)
>>> arg.add(1)
>>> c.assert_called_with(set())
>>> c.assert_called_with(arg)
Traceback (most recent call last):
```

AssertionError: expected call not found.
Expected: mock({1})
Actual: mock(set())
>>> c.foo
<CopyingMock name='mock.foo' id='...'>

When you subclass `Mock` or `MagicMock` all dynamically created attributes,
and the `return_value` will use your subclass automatically. That means all
children of a `CopyingMock` will also have the type `CopyingMock`.
