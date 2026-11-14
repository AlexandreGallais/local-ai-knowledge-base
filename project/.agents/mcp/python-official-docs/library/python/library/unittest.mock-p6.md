---
title: "unittest.mock --- mock object library (part 6 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/unittest.mock.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# unittest.mock --- mock object library (part 6 of 10)

### `patch.multiple(target, spec=None, create=False, spec_set=None, autospec=None, new_callable=None, **kwargs)`

Perform multiple patches in a single call. It takes the object to be
patched (either as an object or a string to fetch the object by importing)
and keyword arguments for the patches:

```
with patch.multiple(settings, FIRST_PATCH='one', SECOND_PATCH='two'):
    ...
```

Use `DEFAULT` as the value if you want `patch.multiple()` to create
mocks for you. In this case the created mocks are passed into a decorated
function by keyword, and a dictionary is returned when `patch.multiple()` is
used as a context manager.

`patch.multiple()` can be used as a decorator, class decorator or a context
manager. The arguments *spec*, *spec_set*, *create*, *autospec* and
*new_callable* have the same meaning as for `patch()`. These arguments will
be applied to *all* patches done by `patch.multiple()`.

When used as a class decorator `patch.multiple()` honours `patch.TEST_PREFIX`
for choosing which methods to wrap.

If you want `patch.multiple()` to create mocks for you, then you can use
`DEFAULT` as the value. If you use `patch.multiple()` as a decorator
then the created mocks are passed into the decorated function by keyword.:

```
>>> thing = object()
>>> other = object()

>>> @patch.multiple('__main__', thing=DEFAULT, other=DEFAULT)
... def test_function(thing, other):
...     assert isinstance(thing, MagicMock)
...     assert isinstance(other, MagicMock)
...
>>> test_function()
```

`patch.multiple()` can be nested with other `patch` decorators, but put arguments
passed by keyword *after* any of the standard arguments created by `patch()`:

```
>>> @patch('sys.exit')
... @patch.multiple('__main__', thing=DEFAULT, other=DEFAULT)
... def test_function(mock_exit, other, thing):
...     assert 'other' in repr(other)
...     assert 'thing' in repr(thing)
...     assert 'exit' in repr(mock_exit)
...
>>> test_function()
```

If `patch.multiple()` is used as a context manager, the value returned by the
context manager is a dictionary where created mocks are keyed by name:

```
>>> with patch.multiple('__main__', thing=DEFAULT, other=DEFAULT) as values:
...     assert 'other' in repr(values['other'])
...     assert 'thing' in repr(values['thing'])
...     assert values['thing'] is thing
...     assert values['other'] is other
...
```

#### patch methods: start and stop

All the patchers have `start()` and `stop()` methods. These make it simpler to do
patching in `setUp` methods or where you want to do multiple patches without
nesting decorators or with statements.

To use them call `patch()`, `patch.object()` or `patch.dict()` as
normal and keep a reference to the returned `patcher` object. You can then
call `start()` to put the patch in place and `stop()` to undo it.

If you are using `patch()` to create a mock for you then it will be returned by
the call to `patcher.start`.:

```
>>> patcher = patch('package.module.ClassName')
>>> from package import module
>>> original = module.ClassName
>>> new_mock = patcher.start()
>>> assert module.ClassName is not original
>>> assert module.ClassName is new_mock
>>> patcher.stop()
>>> assert module.ClassName is original
>>> assert module.ClassName is not new_mock
```

A typical use case for this might be for doing multiple patches in the `setUp`
method of a `TestCase`:

```
>>> class MyTest(unittest.TestCase):
...     def setUp(self):
...         self.patcher1 = patch('package.module.Class1')
...         self.patcher2 = patch('package.module.Class2')
...         self.MockClass1 = self.patcher1.start()
...         self.MockClass2 = self.patcher2.start()
...
...     def tearDown(self):
...         self.patcher1.stop()
...         self.patcher2.stop()
...
...     def test_something(self):
...         assert package.module.Class1 is self.MockClass1
...         assert package.module.Class2 is self.MockClass2
...
>>> MyTest('test_something').run()
```

> **Caution:** If you use this technique you must ensure that the patching is "undone" by
> calling `stop`. This can be fiddlier than you might think, because if an
> exception is raised in the `setUp` then `tearDown` is not called.
> `unittest.TestCase.addCleanup()` makes this easier:
>
>
> ```
> >>> class MyTest(unittest.TestCase):
> ...     def setUp(self):
> ...         patcher = patch('package.module.Class')
> ...         self.MockClass = patcher.start()
> ...         self.addCleanup(patcher.stop)
> ...
> ...     def test_something(self):
> ...         assert package.module.Class is self.MockClass
> ...
> ```
>
>
> As an added bonus you no longer need to keep a reference to the `patcher`
> object.

It is also possible to stop all patches which have been started by using
`patch.stopall()`.

### `patch.stopall`

Stop all active patches. Only stops patches started with `start`.

#### patch builtins

You can patch any builtins within a module. The following example patches
builtin `ord()`:

```
>>> @patch('__main__.ord')
... def test(mock_ord):
...     mock_ord.return_value = 101
...     print(ord('c'))
...
>>> test()
101
```

#### TEST_PREFIX

All of the patchers can be used as class decorators. When used in this way
they wrap every test method on the class. The patchers recognise methods that
start with `'test'` as being test methods. This is the same way that the
`unittest.TestLoader` finds test methods by default.

It is possible that you want to use a different prefix for your tests. You can
inform the patchers of the different prefix by setting `patch.TEST_PREFIX`:

```
>>> patch.TEST_PREFIX = 'foo'
>>> value = 3
>>>
>>> @patch('__main__.value', 'not three')
... class Thing:
...     def foo_one(self):
...         print(value)
...     def foo_two(self):
...         print(value)
...
>>>
>>> Thing().foo_one()
not three
>>> Thing().foo_two()
not three
>>> value
3
```

#### Nesting Patch Decorators

If you want to perform multiple patches then you can simply stack up the
decorators.

You can stack up multiple patch decorators using this pattern:

```python
>>> @patch.object(SomeClass, 'class_method')
... @patch.object(SomeClass, 'static_method')
... def test(mock1, mock2):
...     assert SomeClass.static_method is mock1
...     assert SomeClass.class_method is mock2
...     SomeClass.static_method('foo')
...     SomeClass.class_method('bar')
...     return mock1, mock2
...
>>> mock1, mock2 = test()
>>> mock1.assert_called_once_with('foo')
>>> mock2.assert_called_once_with('bar')
```

Note that the decorators are applied from the bottom upwards. This is the
standard way that Python applies decorators. The order of the created mocks
passed into your test function matches this order.

#### Where to patch

`patch()` works by (temporarily) changing the object that a *name* points to with
another one. There can be many names pointing to any individual object, so
for patching to work you must ensure that you patch the name used by the system
under test.

The basic <example-value> is that you patch where an object is *looked up*, which
is not necessarily the same place as where it is defined. A couple of
examples will help to clarify this.

Imagine we have a project that we want to test with the following structure:

```
a.py
    -> Defines SomeClass

b.py
    -> from a import SomeClass
    -> some_function instantiates SomeClass
```

Now we want to test `some_function` but we want to mock out `SomeClass` using
`patch()`. The problem is that when we import module b, which we will have to
do when it imports `SomeClass` from module a. If we use `patch()` to mock out
`a.SomeClass` then it will have no effect on our test; module b already has a
reference to the *real* `SomeClass` and it looks like our patching had no
effect.

The key is to patch out `SomeClass` where it is used (or where it is looked up).
In this case `some_function` will actually look up `SomeClass` in module b,
where we have imported it. The patching should look like:

```
@patch('b.SomeClass')
```

However, consider the alternative scenario where instead of ``from a import
SomeClass` module b does `import a` and `some_function` uses `a.SomeClass``. Both
of these import forms are common. In this case the class we want to patch is
being looked up in the module and so we have to patch `a.SomeClass` instead:

```
@patch('a.SomeClass')
```

#### Patching Descriptors and Proxy Objects

Both patch_ and patch.object_ correctly patch and restore descriptors: class
methods, static methods and properties. You should patch these on the *class*
rather than an instance. They also work with *some* objects
that proxy attribute access, like the `django settings object
<https://web.archive.org/web/20200603181648/http://www.voidspace.org.uk/python/weblog/arch_d7_2010_12_04.shtml#e1198>`_.
