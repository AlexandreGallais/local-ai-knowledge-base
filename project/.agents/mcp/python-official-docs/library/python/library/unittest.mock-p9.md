---
title: "unittest.mock --- mock object library (part 9 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/unittest.mock.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# unittest.mock --- mock object library (part 9 of 10)

### `mock_open(mock=None, read_data='')`

A helper function to create a mock to replace the use of `open()`. It works
for `open()` called directly or used as a context manager.

The *mock* argument is the mock object to configure. If `None` (the
default) then a `MagicMock` will be created for you, with the API limited
to methods or attributes available on standard file handles.

*read_data* is a string for the `read()`,
`readline()`, and `readlines()` methods
of the file handle to return.  Calls to those methods will take data from
*read_data* until it is depleted.  The mock of these methods is pretty
simplistic: every time the *mock* is called, the *read_data* is rewound to
the start.  If you need more control over the data that you are feeding to
the tested code you will need to customize this mock for yourself.  When that
is insufficient, one of the in-memory filesystem packages on `PyPI
<https://pypi.org>`_ can offer a realistic filesystem for testing.

> *Changed in version 3.4.*
> Added `readline()` and `readlines()` support.
> The mock of `read()` changed to consume *read_data* rather
> than returning it on each call.

> *Changed in version 3.5.*
> *read_data* is now reset on each call to the *mock*.

> *Changed in version 3.8.*
> Added `__iter__()` to implementation so that iteration
> (such as in for loops) correctly consumes *read_data*.

Using `open()` as a context manager is a great way to ensure your file handles
are closed properly and is becoming common:

```
with open('/some/path', 'w') as f:
    f.write('something')
```

The issue is that even if you mock out the call to `open()` it is the
*returned object* that is used as a context manager (and has `__enter__()` and
`__exit__()` called).

Mocking context managers with a `MagicMock` is common enough and fiddly
enough that a helper function is useful.:

```
>>> m = mock_open()
>>> with patch('__main__.open', m):
...     with open('foo', 'w') as h:
...         h.write('some stuff')
...
>>> m.mock_calls
[call('foo', 'w'),
 call().__enter__(),
 call().write('some stuff'),
 call().__exit__(None, None, None)]
>>> m.assert_called_once_with('foo', 'w')
>>> handle = m()
>>> handle.write.assert_called_once_with('some stuff')
```

And for reading files:

```
>>> with patch('__main__.open', mock_open(read_data='bibble')) as m:
...     with open('foo') as h:
...         result = h.read()
...
>>> m.assert_called_once_with('foo')
>>> assert result == 'bibble'
```

#### Autospeccing

Autospeccing is based on the existing `spec` feature of mock. It limits the
api of mocks to the api of an original object (the spec), but it is recursive
(implemented lazily) so that attributes of mocks only have the same api as
the attributes of the spec. In addition mocked functions / methods have the
same call signature as the original so they raise a `TypeError` if they are
called incorrectly.

Before I explain how auto-speccing works, here's why it is needed.

`Mock` is a very powerful and flexible object, but it suffers from a flaw which
is general to mocking. If you refactor some of your code, rename members and so on, any
tests for code that is still using the *old api* but uses mocks instead of the real
objects will still pass. This means your tests can all pass even though your code is
broken.

> *Changed in version 3.5.*
> Before 3.5, tests with a typo in the word assert would silently pass when they should
> raise an error. You can still achieve this behavior by passing `unsafe=True` to Mock.

Note that this is another reason why you need integration tests as well as
unit tests. Testing everything in isolation is all fine and dandy, but if you
don't test how your units are "wired together" there is still lots of room
for bugs that tests might have caught.

`unittest.mock` already provides a feature to help with this, called speccing. If you
use a class or instance as the `spec` for a mock then you can only access
attributes on the mock that exist on the real class:

```python
>>> from urllib import request
>>> mock = Mock(spec=request.Request)
>>> mock.assret_called_with  # Intentional typo!
Traceback (most recent call last):
```

AttributeError: Mock object has no attribute 'assret_called_with'

The spec only applies to the mock itself, so we still have the same issue
with any methods on the mock:

```pycon
>>> mock.header_items()
<mock.Mock object at 0x...>
>>> mock.header_items.assret_called_with()  # Intentional typo!
```

Auto-speccing solves this problem. You can either pass `autospec=True` to
`patch()` / `patch.object()` or use the `create_autospec()` function to create a
mock with a spec. If you use the `autospec=True` argument to `patch()` then the
object that is being replaced will be used as the spec object. Because the
speccing is done "lazily" (the spec is created as attributes on the mock are
accessed) you can use it with very complex or deeply nested objects (like
modules that import modules that import modules) without a big performance
hit.

Here's an example of it in use:

```
>>> from urllib import request
>>> patcher = patch('__main__.request', autospec=True)
>>> mock_request = patcher.start()
>>> request is mock_request
True
>>> mock_request.Request
<MagicMock name='request.Request' spec='Request' id='...'>
```

You can see that `request.Request` has a spec. `request.Request` takes two
arguments in the constructor (one of which is *self*). Here's what happens if
we try to call it incorrectly:

```
>>> req = request.Request()
Traceback (most recent call last):
 ...
TypeError: <lambda>() takes at least 2 arguments (1 given)
```

The spec also applies to instantiated classes (i.e. the return value of
specced mocks):

```
>>> req = request.Request('foo')
>>> req
<NonCallableMagicMock name='request.Request()' spec='Request' id='...'>
```

`Request` objects are not callable, so the return value of instantiating our
mocked out `request.Request` is a non-callable mock. With the spec in place
any typos in our asserts will raise the correct error:

```
>>> req.add_header('spam', 'eggs')
<MagicMock name='request.Request().add_header()' id='...'>
>>> req.add_header.assret_called_with  # Intentional typo!
Traceback (most recent call last):
 ...
AttributeError: Mock object has no attribute 'assret_called_with'
>>> req.add_header.assert_called_with('spam', 'eggs')
```

In many cases you will just be able to add `autospec=True` to your existing
`patch()` calls and then be protected against bugs due to typos and api
changes.

As well as using *autospec* through `patch()` there is a
`create_autospec()` for creating autospecced mocks directly:

```python
>>> from urllib import request
>>> mock_request = create_autospec(request)
>>> mock_request.Request('foo', 'bar')
<NonCallableMagicMock name='mock.Request()' spec='Request' id='...'>
```

This isn't without caveats and limitations however, which is why it is not
the default behaviour. In order to know what attributes are available on the
spec object, autospec has to introspect (access attributes) the spec. As you
traverse attributes on the mock a corresponding traversal of the original
object is happening under the hood. If any of your specced objects have
properties or descriptors that can trigger code execution then you may not be
able to use autospec. On the other hand it is much better to design your
objects so that introspection is safe.

A more serious problem is that it is common for instance attributes to be
created in the `__init__()` method and not to exist on the class at all.
*autospec* can't know about any dynamically created attributes and restricts
the api to visible attributes.:

```
>>> class Something:
...   def __init__(self):
...     self.a = 33
...
>>> with patch('__main__.Something', autospec=True):
...   thing = Something()
...   thing.a
...
Traceback (most recent call last):
  ...
AttributeError: Mock object has no attribute 'a'
```

There are a few different ways of resolving this problem. The easiest, but
not necessarily the least annoying, way is to simply set the required
attributes on the mock after creation. Just because *autospec* doesn't allow
you to fetch attributes that don't exist on the spec it doesn't prevent you
setting them:

```
>>> with patch('__main__.Something', autospec=True):
...   thing = Something()
...   thing.a = 33
...
```

There is a more aggressive version of both *spec* and *autospec* that *does*
prevent you setting non-existent attributes. This is useful if you want to
ensure your code only *sets* valid attributes too, but obviously it prevents
this particular scenario:

```python
>>> with patch('__main__.Something', autospec=True, spec_set=True):
...   thing = Something()
...   thing.a = 33
...
Traceback (most recent call last):
```

AttributeError: Mock object has no attribute 'a'

Probably the best way of solving the problem is to add class attributes as
default values for instance members initialised in `__init__()`.
Note that if
you are only setting default attributes in `__init__()` then providing them via
class attributes (shared between instances of course) is faster too. e.g.

```python
class Something:
    a = 33
```

This brings up another issue. It is relatively common to provide a default
value of `None` for members that will later be an object of a different type.
`None` would be useless as a spec because it wouldn't let you access *any*
attributes or methods on it. As `None` is *never* going to be useful as a
spec, and probably indicates a member that will normally of some other type,
autospec doesn't use a spec for members that are set to `None`. These will
just be ordinary mocks (well - MagicMocks):

```python
>>> class Something:
...     member = None
...
>>> mock = create_autospec(Something)
>>> mock.member.foo.bar.baz()
<MagicMock name='mock.member.foo.bar.baz()' id='...'>
```

If modifying your production classes to add defaults isn't to your liking
then there are more options. One of these is simply to use an instance as the
spec rather than the class. The other is to create a subclass of the
production class and add the defaults to the subclass without affecting the
production class. Both of these require you to use an alternative object as
the spec. Thankfully `patch()` supports this - you can simply pass the
alternative object as the *autospec* argument:

```
>>> class Something:
...   def __init__(self):
...     self.a = 33
...
>>> class SomethingForTest(Something):
...   a = 33
...
>>> p = patch('__main__.Something', autospec=SomethingForTest)
>>> mock = p.start()
>>> mock.a
<NonCallableMagicMock name='Something.a' spec='int' id='...'>
```

#### Sealing mocks

### `seal(mock)`

Seal will disable the automatic creation of mocks when accessing an attribute of
the mock being sealed or any of its attributes that are already mocks recursively.

If a mock instance with a name or a spec is assigned to an attribute
it won't be considered in the sealing chain. This allows one to prevent seal from
fixing part of the mock object.:

```
>>> mock = Mock()
>>> mock.submock.attribute1 = 2
>>> mock.not_submock = mock.Mock(name="sample_name")
>>> seal(mock)
>>> mock.new_attribute  # This will raise AttributeError.
>>> mock.submock.attribute2  # This will raise AttributeError.
>>> mock.not_submock.attribute2  # This won't raise.
```

> *Added in version 3.7.*
