---
title: "unittest.mock --- mock object library (part 5 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/unittest.mock.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# unittest.mock --- mock object library (part 5 of 10)

## The patchers

The patch decorators are used for patching objects only within the scope of
the function they decorate. They automatically handle the unpatching for you,
even if exceptions are raised. All of these functions can also be used in with
statements or as class decorators.

#### patch

> **Note:** The key is to do the patching in the right namespace. See the section where to patch.

### `patch(target, new=DEFAULT, spec=None, create=False, spec_set=None, autospec=None, new_callable=None, **kwargs)`

`patch()` acts as a function decorator, class decorator or a context
manager. Inside the body of the function or with statement, the *target*
is patched with a *new* object. When the function/with statement exits
the patch is undone.

If *new* is omitted, then the target is replaced with an
`AsyncMock` if the patched object is an async function or
a `MagicMock` otherwise.
If `patch()` is used as a decorator and *new* is
omitted, the created mock is passed in as an extra argument to the
decorated function. If `patch()` is used as a context manager the created
mock is returned by the context manager.

*target* should be a string in the form `'package.module.ClassName'`. The
*target* is imported and the specified object replaced with the *new*
object, so the *target* must be importable from the environment you are
calling `patch()` from. The target is imported when the decorated function
is executed, not at decoration time.

The *spec* and *spec_set* keyword arguments are passed to the `MagicMock`
if patch is creating one for you.

In addition you can pass `spec=True` or `spec_set=True`, which causes
patch to pass in the object being mocked as the spec/spec_set object.

*new_callable* allows you to specify a different class, or callable object,
that will be called to create the *new* object. By default `AsyncMock`
is used for async functions and `MagicMock` for the rest.

A more powerful form of *spec* is *autospec*. If you set `autospec=True`
then the mock will be created with a spec from the object being replaced.
All attributes of the mock will also have the spec of the corresponding
attribute of the object being replaced. Methods and functions being mocked
will have their arguments checked and will raise a `TypeError` if they are
called with the wrong signature. For mocks
replacing a class, their return value (the 'instance') will have the same
spec as the class. See the `create_autospec()` function and
auto-speccing.

Instead of `autospec=True` you can pass `autospec=some_object` to use an
arbitrary object as the spec instead of the one being replaced.

By default `patch()` will fail to replace attributes that don't exist.
If you pass in `create=True`, and the attribute doesn't exist, patch will
create the attribute for you when the patched function is called, and delete
it again after the patched function has exited. This is useful for writing
tests against attributes that your production code creates at runtime. It is
off by default because it can be dangerous. With it switched on you can
write passing tests against APIs that don't actually exist!

> **Note:**
> > *Changed in version 3.5.*
> > If you are patching builtins in a module then you don't
> > need to pass `create=True`, it will be added by default.
>

Patch can be used as a `TestCase` class decorator. It works by
decorating each test method in the class. This reduces the boilerplate
code when your test methods share a common patchings set. `patch()` finds
tests by looking for method names that start with `patch.TEST_PREFIX`.
By default this is `'test'`, which matches the way `unittest` finds tests.
You can specify an alternative prefix by setting `patch.TEST_PREFIX`.

Patch can be used as a context manager, with the with statement. Here the
patching applies to the indented block after the with statement. If you
use "as" then the patched object will be bound to the name after the
"as"; very useful if `patch()` is creating a mock object for you.

`patch()` takes arbitrary keyword arguments. These will be passed to
`AsyncMock` if the patched object is asynchronous, to
`MagicMock` otherwise or to *new_callable* if specified.

`patch.dict(...)`, `patch.multiple(...)` and `patch.object(...)` are
available for alternate use-cases.

`patch()` as function decorator, creating the mock for you and passing it into
the decorated function:

```
>>> @patch('__main__.SomeClass')
... def function(normal_argument, mock_class):
...     print(mock_class is SomeClass)
...
>>> function(None)
True
```

Patching a class replaces the class with a `MagicMock` *instance*. If the
class is instantiated in the code under test then it will be the
`return_value` of the mock that will be used.

If the class is instantiated multiple times you could use
`side_effect` to return a new mock each time. Alternatively you
can set the *return_value* to be anything you want.

To configure return values on methods of *instances* on the patched class
you must do this on the `return_value`. For example:

```
>>> class Class:
...     def method(self):
...         pass
...
>>> with patch('__main__.Class') as MockClass:
...     instance = MockClass.return_value
...     instance.method.return_value = 'foo'
...     assert Class() is instance
...     assert Class().method() == 'foo'
...
```

If you use *spec* or *spec_set* and `patch()` is replacing a *class*, then the
return value of the created mock will have the same spec.:

```
>>> Original = Class
>>> patcher = patch('__main__.Class', spec=True)
>>> MockClass = patcher.start()
>>> instance = MockClass()
>>> assert isinstance(instance, Original)
>>> patcher.stop()
```

The *new_callable* argument is useful where you want to use an alternative
class to the default `MagicMock` for the created mock. For example, if
you wanted a `NonCallableMock` to be used:

```
>>> thing = object()
>>> with patch('__main__.thing', new_callable=NonCallableMock) as mock_thing:
...     assert thing is mock_thing
...     thing()
...
Traceback (most recent call last):
  ...
TypeError: 'NonCallableMock' object is not callable
```

Another use case might be to replace an object with an `io.StringIO` instance:

```
>>> from io import StringIO
>>> def foo():
...     print('Something')
...
>>> @patch('sys.stdout', new_callable=StringIO)
... def test(mock_stdout):
...     foo()
...     assert mock_stdout.getvalue() == 'Something\n'
...
>>> test()
```

When `patch()` is creating a mock for you, it is common that the first thing
you need to do is to configure the mock. Some of that configuration can be done
in the call to patch. Any arbitrary keywords you pass into the call will be
used to set attributes on the created mock:

```
>>> patcher = patch('__main__.thing', first='one', second='two')
>>> mock_thing = patcher.start()
>>> mock_thing.first
'one'
>>> mock_thing.second
'two'
```

As well as attributes on the created mock attributes, like the
`return_value` and `side_effect`, of child mocks can
also be configured. These aren't syntactically valid to pass in directly as
keyword arguments, but a dictionary with these as keys can still be expanded
into a `patch()` call using `**`:

```
>>> config = {'method.return_value': 3, 'other.side_effect': KeyError}
>>> patcher = patch('__main__.thing', **config)
>>> mock_thing = patcher.start()
>>> mock_thing.method()
3
>>> mock_thing.other()
Traceback (most recent call last):
  ...
KeyError
```

By default, attempting to patch a function in a module (or a method or an
attribute in a class) that does not exist will fail with `AttributeError`:

```
>>> @patch('sys.non_existing_attribute', 42)
... def test():
...     assert sys.non_existing_attribute == 42
...
>>> test()
Traceback (most recent call last):
  ...
AttributeError: <module 'sys' (built-in)> does not have the attribute 'non_existing_attribute'
```

but adding `create=True` in the call to `patch()` will make the previous example
work as expected:

```
>>> @patch('sys.non_existing_attribute', 42, create=True)
... def test(mock_stdout):
...     assert sys.non_existing_attribute == 42
...
>>> test()
```

> *Changed in version 3.8.*
> `patch()` now returns an `AsyncMock` if the target is an async function.

#### patch.object

### `patch.object(target, attribute, new=DEFAULT, spec=None, create=False, spec_set=None, autospec=None, new_callable=None, **kwargs)`

patch the named member (*attribute*) on an object (*target*) with a mock
object.

`patch.object()` can be used as a decorator, class decorator or a context
manager. Arguments *new*, *spec*, *create*, *spec_set*, *autospec* and
*new_callable* have the same meaning as for `patch()`. Like `patch()`,
`patch.object()` takes arbitrary keyword arguments for configuring the mock
object it creates.

When used as a class decorator `patch.object()` honours `patch.TEST_PREFIX`
for choosing which methods to wrap.

You can either call `patch.object()` with three arguments or two arguments. The
three argument form takes the object to be patched, the attribute name and the
object to replace the attribute with.

When calling with the two argument form you omit the replacement object, and a
mock is created for you and passed in as an extra argument to the decorated
function:

```python
>>> @patch.object(SomeClass, 'class_method')
... def test(mock_method):
...     SomeClass.class_method(3)
...     mock_method.assert_called_with(3)
...
>>> test()
```

*spec*, *create* and the other arguments to `patch.object()` have the same
meaning as they do for `patch()`.

#### patch.dict

### `patch.dict(in_dict, values=(), clear=False, **kwargs)`

Patch a dictionary, or dictionary like object, and restore the dictionary
to its original state after the test, where the restored dictionary is a
copy of the dictionary as it was before the test.

*in_dict* can be a dictionary or a mapping like container. If it is a
mapping then it must at least support getting, setting and deleting items
plus iterating over keys.

*in_dict* can also be a string specifying the name of the dictionary, which
will then be fetched by importing it.

*values* can be a dictionary of values to set in the dictionary. *values*
can also be an iterable of `(key, value)` pairs.

If *clear* is true then the dictionary will be cleared before the new
values are set.

`patch.dict()` can also be called with arbitrary keyword arguments to set
values in the dictionary.

> *Changed in version 3.8.*
> `patch.dict()` now returns the patched dictionary when used as a context
> manager.

`patch.dict()` can be used as a context manager, decorator or class
decorator:

```python
>>> foo = {}
>>> @patch.dict(foo, {'newkey': 'newvalue'})
... def test():
...     assert foo == {'newkey': 'newvalue'}
...
>>> test()
>>> assert foo == {}
```

When used as a class decorator `patch.dict()` honours
`patch.TEST_PREFIX` (default to `'test'`) for choosing which methods to wrap:

```python
>>> import os
>>> import unittest
>>> from unittest.mock import patch
>>> @patch.dict('os.environ', {'newkey': 'newvalue'})
... class TestSample(unittest.TestCase):
...     def test_sample(self):
...         self.assertEqual(os.environ['newkey'], 'newvalue')
```

If you want to use a different prefix for your test, you can inform the
patchers of the different prefix by setting `patch.TEST_PREFIX`. For
more details about how to change the value of see test-prefix.

`patch.dict()` can be used to add members to a dictionary, or simply let a test
change a dictionary, and ensure the dictionary is restored when the test
ends.

```python
>>> foo = {}
>>> with patch.dict(foo, {'newkey': 'newvalue'}) as patched_foo:
...     assert foo == {'newkey': 'newvalue'}
...     assert patched_foo == {'newkey': 'newvalue'}
...     # You can add, update or delete keys of foo (or patched_foo, it's the same dict)
...     patched_foo['spam'] = 'eggs'
...
>>> assert foo == {}
>>> assert patched_foo == {}
```

```python
>>> import os
>>> with patch.dict('os.environ', {'newkey': 'newvalue'}):
...     print(os.environ['newkey'])
...
newvalue
>>> assert 'newkey' not in os.environ
```

Keywords can be used in the `patch.dict()` call to set values in the dictionary:

```python
>>> mymodule = MagicMock()
>>> mymodule.function.return_value = 'fish'
>>> with patch.dict('sys.modules', mymodule=mymodule):
...     import mymodule
...     mymodule.function('some', 'args')
...
'fish'
```

`patch.dict()` can be used with dictionary like objects that aren't actually
dictionaries. At the very minimum they must support item getting, setting,
deleting and either iteration or membership test. This corresponds to the
magic methods `__getitem__(), setitem__()`,
`__delitem__() and either iter__()` or
`__contains__()`.

```python
>>> class Container:
...     def __init__(self):
...         self.values = {}
...     def __getitem__(self, name):
...         return self.values[name]
...     def __setitem__(self, name, value):
...         self.values[name] = value
...     def __delitem__(self, name):
...         del self.values[name]
...     def __iter__(self):
...         return iter(self.values)
...
>>> thing = Container()
>>> thing['one'] = 1
>>> with patch.dict(thing, one=2, two=3):
...     assert thing['one'] == 2
...     assert thing['two'] == 3
...
>>> assert thing['one'] == 1
>>> assert list(thing) == ['one']
```

#### patch.multiple
