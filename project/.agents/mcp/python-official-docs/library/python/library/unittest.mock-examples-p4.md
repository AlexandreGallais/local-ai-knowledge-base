---
title: "unittest.mock --- getting started (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/unittest.mock-examples.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# unittest.mock --- getting started (part 4 of 4)

### Nesting patches

Using patch as a context manager is nice, but if you do multiple patches you
can end up with nested with statements indenting further and further to the
right:

```
>>> class MyTest(unittest.TestCase):
...
...     def test_foo(self):
...         with patch('mymodule.Foo') as mock_foo:
...             with patch('mymodule.Bar') as mock_bar:
...                 with patch('mymodule.Spam') as mock_spam:
...                     assert mymodule.Foo is mock_foo
...                     assert mymodule.Bar is mock_bar
...                     assert mymodule.Spam is mock_spam
...
>>> original = mymodule.Foo
>>> MyTest('test_foo').test_foo()
>>> assert mymodule.Foo is original
```

With unittest `cleanup` functions and the start-and-stop we can
achieve the same effect without the nested indentation. A simple helper
method, `create_patch`, puts the patch in place and returns the created mock
for us:

```
>>> class MyTest(unittest.TestCase):
...
...     def create_patch(self, name):
...         patcher = patch(name)
...         thing = patcher.start()
...         self.addCleanup(patcher.stop)
...         return thing
...
...     def test_foo(self):
...         mock_foo = self.create_patch('mymodule.Foo')
...         mock_bar = self.create_patch('mymodule.Bar')
...         mock_spam = self.create_patch('mymodule.Spam')
...
...         assert mymodule.Foo is mock_foo
...         assert mymodule.Bar is mock_bar
...         assert mymodule.Spam is mock_spam
...
>>> original = mymodule.Foo
>>> MyTest('test_foo').run()
>>> assert mymodule.Foo is original
```

### Mocking a dictionary with MagicMock

You may want to mock a dictionary, or other container object, recording all
access to it whilst having it still behave like a dictionary.

We can do this with `MagicMock`, which will behave like a dictionary,
and using `side_effect` to delegate dictionary access to a real
underlying dictionary that is under our control.

When the `__getitem__() and setitem__()` methods
of our `MagicMock` are called
(normal dictionary access) then `side_effect` is called with the key (and in
the case of `__setitem__` the value too). We can also control what is returned.

After the `MagicMock` has been used we can use attributes like
`call_args_list` to assert about how the dictionary was used:

```python
>>> my_dict = {'a': 1, 'b': 2, 'c': 3}
>>> def getitem(name):
...      return my_dict[name]
...
>>> def setitem(name, val):
...     my_dict[name] = val
...
>>> mock = MagicMock()
>>> mock.__getitem__.side_effect = getitem
>>> mock.__setitem__.side_effect = setitem
```

> **Note:** An alternative to using `MagicMock` is to use `Mock` and *only* provide
> the magic methods you specifically want:
>
>
> ```python
> >>> mock = Mock()
> >>> mock.__getitem__ = Mock(side_effect=getitem)
> >>> mock.__setitem__ = Mock(side_effect=setitem)
> ```
>
>
> A *third* option is to use `MagicMock` but passing in `dict` as the *spec*
> (or *spec_set*) argument so that the `MagicMock` created only has
> dictionary magic methods available:
>
>
> ```python
> >>> mock = MagicMock(spec_set=dict)
> >>> mock.__getitem__.side_effect = getitem
> >>> mock.__setitem__.side_effect = setitem
> ```
>

With these side effect functions in place, the `mock` will behave like a normal
dictionary but recording the access. It even raises a `KeyError` if you try
to access a key that doesn't exist.

```python
>>> mock['a']
1
>>> mock['c']
3
>>> mock['d']
Traceback (most recent call last):
```

KeyError: 'd'
>>> mock['b'] = 'fish'
>>> mock['d'] = 'eggs'
>>> mock['b']
'fish'
>>> mock['d']
'eggs'

After it has been used you can make assertions about the access using the normal
mock methods and attributes:

```python
>>> mock.__getitem__.call_args_list
[call('a'), call('c'), call('d'), call('b'), call('d')]
>>> mock.__setitem__.call_args_list
[call('b', 'fish'), call('d', 'eggs')]
>>> my_dict
{'a': 1, 'b': 'fish', 'c': 3, 'd': 'eggs'}
```

### Mock subclasses and their attributes

There are various reasons why you might want to subclass `Mock`. One
reason might be to add helper methods. Here's a silly example:

```python
>>> class MyMock(MagicMock):
...     def has_been_called(self):
...         return self.called
...
>>> mymock = MyMock(return_value=None)
>>> mymock
<MyMock id='...'>
>>> mymock.has_been_called()
False
>>> mymock()
>>> mymock.has_been_called()
True
```

The standard behaviour for `Mock` instances is that attributes and the return
value mocks are of the same type as the mock they are accessed on. This ensures
that `Mock` attributes are `Mocks` and `MagicMock` attributes are `MagicMocks`
. So if you're subclassing to add helper methods then they'll also be
available on the attributes and return value mock of instances of your
subclass.

```python
>>> mymock.foo
<MyMock name='mock.foo' id='...'>
>>> mymock.foo.has_been_called()
False
>>> mymock.foo()
<MyMock name='mock.foo()' id='...'>
>>> mymock.foo.has_been_called()
True
```

Sometimes this is inconvenient. For example, `one user
<https://code.google.com/archive/p/mock/issues/105>`_ is subclassing mock to
created a `Twisted adaptor
<https://twisted.org/documents/11.0.0/api/twisted.python.components.html>`_.
Having this applied to attributes too actually causes errors.

`Mock` (in all its flavours) uses a method called `_get_child_mock` to create
these "sub-mocks" for attributes and return values. You can prevent your
subclass being used for attributes by overriding this method. The signature is
that it takes arbitrary keyword arguments (`**kwargs`) which are then passed
onto the mock constructor:

```python
>>> class Subclass(MagicMock):
...     def _get_child_mock(self, /, **kwargs):
...         return MagicMock(**kwargs)
...
>>> mymock = Subclass()
>>> mymock.foo
<MagicMock name='mock.foo' id='...'>
>>> assert isinstance(mymock, Subclass)
>>> assert not isinstance(mymock.foo, Subclass)
>>> assert not isinstance(mymock(), Subclass)
```

### Mocking imports with patch.dict

One situation where mocking can be hard is where you have a local import inside
a function. These are harder to mock because they aren't using an object from
the module namespace that we can patch out.

Generally local imports are to be avoided. They are sometimes done to prevent
circular dependencies, for which there is *usually* a much better way to solve
the problem (refactor the code) or to prevent "up front costs" by delaying the
import. This can also be solved in better ways than an unconditional local
import (store the module as a class or module attribute and only do the import
on first use).

That aside there is a way to use `mock` to affect the results of an import.
Importing fetches an *object* from the `sys.modules` dictionary. Note that it
fetches an *object*, which need not be a module. Importing a module for the
first time results in a module object being put in `sys.modules`, so usually
when you import something you get a module back. This need not be the case
however.

This means you can use `patch.dict()` to *temporarily* put a mock in place
in `sys.modules`. Any imports whilst this patch is active will fetch the mock.
When the patch is complete (the decorated function exits, the with statement
body is complete or `patcher.stop()` is called) then whatever was there
previously will be restored safely.

Here's an example that mocks out the 'fooble' module.

```python
>>> import sys
>>> mock = Mock()
>>> with patch.dict('sys.modules', {'fooble': mock}):
...    import fooble
...    fooble.blob()
...
<Mock name='mock.blob()' id='...'>
>>> assert 'fooble' not in sys.modules
>>> mock.blob.assert_called_once_with()
```

As you can see the `import fooble` succeeds, but on exit there is no 'fooble'
left in `sys.modules`.

This also works for the `from module import name` form:

```python
>>> mock = Mock()
>>> with patch.dict('sys.modules', {'fooble': mock}):
...    from fooble import blob
...    blob.blip()
...
<Mock name='mock.blob.blip()' id='...'>
>>> mock.blob.blip.assert_called_once_with()
```

With slightly more work you can also mock package imports:

```python
>>> mock = Mock()
>>> modules = {'package': mock, 'package.module': mock.module}
>>> with patch.dict('sys.modules', modules):
...    from package.module import fooble
...    fooble()
...
<Mock name='mock.module.fooble()' id='...'>
>>> mock.module.fooble.assert_called_once_with()
```

### Tracking order of calls and less verbose call assertions

The `Mock` class allows you to track the *order* of method calls on
your mock objects through the `method_calls` attribute. This
doesn't allow you to track the order of calls between separate mock objects,
however we can use `mock_calls` to achieve the same effect.

Because mocks track calls to child mocks in `mock_calls`, and accessing an
arbitrary attribute of a mock creates a child mock, we can create our separate
mocks from a parent one. Calls to those child mock will then all be recorded,
in order, in the `mock_calls` of the parent:

```python
>>> manager = Mock()
>>> mock_foo = manager.foo
>>> mock_bar = manager.bar
```

```python
>>> mock_foo.something()
<Mock name='mock.foo.something()' id='...'>
>>> mock_bar.other.thing()
<Mock name='mock.bar.other.thing()' id='...'>
```

```python
>>> manager.mock_calls
[call.foo.something(), call.bar.other.thing()]
```

We can then assert about the calls, including the order, by comparing with
the `mock_calls` attribute on the manager mock:

```python
>>> expected_calls = [call.foo.something(), call.bar.other.thing()]
>>> manager.mock_calls == expected_calls
True
```

If `patch` is creating, and putting in place, your mocks then you can attach
them to a manager mock using the `attach_mock()` method. After
attaching calls will be recorded in `mock_calls` of the manager.:

```
>>> manager = MagicMock()
>>> with patch('mymodule.Class1') as MockClass1:
...     with patch('mymodule.Class2') as MockClass2:
...         manager.attach_mock(MockClass1, 'MockClass1')
...         manager.attach_mock(MockClass2, 'MockClass2')
...         MockClass1().foo()
...         MockClass2().bar()
<MagicMock name='mock.MockClass1().foo()' id='...'>
<MagicMock name='mock.MockClass2().bar()' id='...'>
>>> manager.mock_calls
[call.MockClass1(),
call.MockClass1().foo(),
call.MockClass2(),
call.MockClass2().bar()]
```

If many calls have been made, but you're only interested in a particular
sequence of them then an alternative is to use the
`assert_has_calls()` method. This takes a list of calls (constructed
with the `call` object). If that sequence of calls are in
`mock_calls` then the assert succeeds.

```python
>>> m = MagicMock()
>>> m().foo().bar().baz()
<MagicMock name='mock().foo().bar().baz()' id='...'>
>>> m.one().two().three()
<MagicMock name='mock.one().two().three()' id='...'>
>>> calls = call.one().two().three().call_list()
>>> m.assert_has_calls(calls)
```

Even though the chained call `m.one().two().three()` aren't the only calls that
have been made to the mock, the assert still succeeds.

Sometimes a mock may have several calls made to it, and you are only interested
in asserting about *some* of those calls. You may not even care about the
order. In this case you can pass `any_order=True` to `assert_has_calls`:

```python
>>> m = MagicMock()
>>> m(1), m.two(2, 3), m.seven(7), m.fifty('50')
(...)
>>> calls = [call.fifty('50'), call(1), call.seven(7)]
>>> m.assert_has_calls(calls, any_order=True)
```

### More complex argument matching

Using the same basic <example-value> as `ANY` we can implement matchers to do more
complex assertions on objects used as arguments to mocks.

Suppose we expect some object to be passed to a mock that by default
compares equal based on object identity (which is the Python default for user
defined classes). To use `assert_called_with()` we would need to pass
in the exact same object. If we are only interested in some of the attributes
of this object then we can create a matcher that will check these attributes
for us.

You can see in this example how a 'standard' call to `assert_called_with` isn't
sufficient:

```python
>>> class Foo:
...     def __init__(self, a, b):
...         self.a, self.b = a, b
...
>>> mock = Mock(return_value=None)
>>> mock(Foo(1, 2))
>>> mock.assert_called_with(Foo(1, 2))
Traceback (most recent call last):
```

AssertionError: expected call not found.
Expected: mock(<__main__.Foo object at 0x...>)
Actual: mock(<__main__.Foo object at 0x...>)

A comparison function for our `Foo` class might look something like this:

```python
>>> def compare(self, other):
...     if not type(self) == type(other):
...         return False
...     if self.a != other.a:
...         return False
...     if self.b != other.b:
...         return False
...     return True
...
```

And a matcher object that can use comparison functions like this for its
equality operation would look something like this:

```python
>>> class Matcher:
...     def __init__(self, compare, some_obj):
...         self.compare = compare
...         self.some_obj = some_obj
...     def __eq__(self, other):
...         return self.compare(self.some_obj, other)
...
```

Putting all this together:

```python
>>> match_foo = Matcher(compare, Foo(1, 2))
>>> mock.assert_called_with(match_foo)
```

The `Matcher` is instantiated with our compare function and the `Foo` object
we want to compare against. In `assert_called_with` the `Matcher` equality
method will be called, which compares the object the mock was called with
against the one we created our matcher with. If they match then
`assert_called_with` passes, and if they don't an `AssertionError` is raised:

```python
>>> match_wrong = Matcher(compare, Foo(3, 4))
>>> mock.assert_called_with(match_wrong)
Traceback (most recent call last):
```

AssertionError: Expected: ((<Matcher object at 0x...>,), {})
Called with: ((<Foo object at 0x...>,), {})

With a bit of tweaking you could have the comparison function raise the
`AssertionError` directly and provide a more useful failure message.

As of version 1.5, the Python testing library `PyHamcrest
<https://pyhamcrest.readthedocs.io/>`_ provides similar functionality,
that may be useful here, in the form of its equality matcher
(`hamcrest.library.integration.match_equality
<https://pyhamcrest.readthedocs.io/en/release-1.8/integration/#module-hamcrest.library.integration.match_equality>`_).
