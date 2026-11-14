---
title: "unittest --- Unit testing framework (part 5 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/unittest.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# unittest --- Unit testing framework (part 5 of 7)

### `addTypeEqualityFunc(typeobj, function)`

Registers a type-specific method called by `assertEqual()` to check
if two objects of exactly the same *typeobj* (not subclasses) compare
equal.  *function* must take two positional arguments and a third msg=None
keyword argument just as `assertEqual()` does.  It must raise
`self.failureException(msg)` when inequality
between the first two parameters is detected -- possibly providing useful
information and explaining the inequalities in details in the error
message.

> *Added in version 3.1.*

The list of type-specific methods automatically used by
`assertEqual()` are summarized in the following table.  Note
that it's usually not necessary to invoke these methods directly.

```text
+-----------------------------------------+-----------------------------+--------------+
| Method                                  | Used to compare             | New in       |
+=========================================+=============================+==============+
| :meth:`assertMultiLineEqual(a, b)       | strings                     | 3.1          |
| <TestCase.assertMultiLineEqual>`        |                             |              |
+-----------------------------------------+-----------------------------+--------------+
| :meth:`assertSequenceEqual(a, b)        | sequences                   | 3.1          |
| <TestCase.assertSequenceEqual>`         |                             |              |
+-----------------------------------------+-----------------------------+--------------+
| :meth:`assertListEqual(a, b)            | lists                       | 3.1          |
| <TestCase.assertListEqual>`             |                             |              |
+-----------------------------------------+-----------------------------+--------------+
| :meth:`assertTupleEqual(a, b)           | tuples                      | 3.1          |
| <TestCase.assertTupleEqual>`            |                             |              |
+-----------------------------------------+-----------------------------+--------------+
| :meth:`assertSetEqual(a, b)             | sets or frozensets          | 3.1          |
| <TestCase.assertSetEqual>`              |                             |              |
+-----------------------------------------+-----------------------------+--------------+
| :meth:`assertDictEqual(a, b)            | dicts                       | 3.1          |
| <TestCase.assertDictEqual>`             |                             |              |
+-----------------------------------------+-----------------------------+--------------+
```

### `assertMultiLineEqual(first, second, msg=None)`

Test that the multiline string *first* is equal to the string *second*.
When not equal a diff of the two strings highlighting the differences
will be included in the error message. This method is used by default
when comparing strings with `assertEqual()`.

> *Added in version 3.1.*

### `assertSequenceEqual(first, second, msg=None, seq_type=None)`

Tests that two sequences are equal.  If a *seq_type* is supplied, both
*first* and *second* must be instances of *seq_type* or a failure will
be raised.  If the sequences are different an error message is
constructed that shows the difference between the two.

This method is not called directly by `assertEqual()`, but
it's used to implement `assertListEqual()` and
`assertTupleEqual()`.

> *Added in version 3.1.*

### `assertListEqual(first, second, msg=None)`

```python
assertTupleEqual(first, second, msg=None)
```

Tests that two lists or tuples are equal.  If not, an error message is
constructed that shows only the differences between the two.  An error
is also raised if either of the parameters are of the wrong type.
These methods are used by default when comparing lists or tuples with
`assertEqual()`.

> *Added in version 3.1.*

### `assertSetEqual(first, second, msg=None)`

Tests that two sets are equal.  If not, an error message is constructed
that lists the differences between the sets.  This method is used by
default when comparing sets or frozensets with `assertEqual()`.

Fails if either of *first* or *second* does not have a `difference()`
method.

> *Added in version 3.1.*

### `assertDictEqual(first, second, msg=None)`

Test that two dictionaries are equal.  If not, an error message is
constructed that shows the differences in the dictionaries. This
method will be used by default to compare dictionaries in
calls to `assertEqual()`.

> *Added in version 3.1.*

Finally the `TestCase` provides the following methods and attributes:

### `fail(msg=None)`

Signals a test failure unconditionally, with *msg* or `None` for
the error message.

### `failureException`

This class attribute gives the exception raised by the test method.  If a
test framework needs to use a specialized exception, possibly to carry
additional information, it must subclass this exception in order to "play
fair" with the framework.  The initial value of this attribute is
`AssertionError`.

### `longMessage`

This class attribute determines what happens when a custom failure message
is passed as the msg argument to an assertXYY call that fails.
`True` is the default value. In this case, the custom message is appended
to the end of the standard failure message.
When set to `False`, the custom message replaces the standard message.

The class setting can be overridden in individual test methods by assigning
an instance attribute, self.longMessage, to `True` or `False` before
calling the assert methods.

The class setting gets reset before each test call.

> *Added in version 3.1.*

### `maxDiff`

This attribute controls the maximum length of diffs output by assert
methods that report diffs on failure. It defaults to 80*8 characters.
Assert methods affected by this attribute are
`assertSequenceEqual()` (including all the sequence comparison
methods that delegate to it), `assertDictEqual()` and
`assertMultiLineEqual()`.

Setting `maxDiff` to `None` means that there is no maximum length of
diffs.

> *Added in version 3.2.*

Testing frameworks can use the following methods to collect information on
the test:

### `countTestCases()`

Return the number of tests represented by this test object.  For
`TestCase` instances, this will always be `1`.

### `defaultTestResult()`

Return an instance of the test result class that should be used for this
test case class (if no other result instance is provided to the
`run()` method).

For `TestCase` instances, this will always be an instance of
`TestResult`; subclasses of `TestCase` should override this
as necessary.

### `id()`

Return a string identifying the specific test case.  This is usually the
full name of the test method, including the module and class name.

### `shortDescription()`

Returns a description of the test, or `None` if no description
has been provided.  The default implementation of this method
returns the first line of the test method's docstring, if available,
or `None`.

> *Changed in version 3.1.*
> In 3.1 this was changed to add the test name to the short description
> even in the presence of a docstring.  This caused compatibility issues
> with unittest extensions and adding the test name was moved to the
> `TextTestResult` in Python 3.2.

### `addCleanup(function, /, *args, **kwargs)`

Add a function to be called after `tearDown()` to cleanup resources
used during the test. Functions will be called in reverse order to the
order they are added (LIFO (last-in, first-out)).  They
are called with any arguments and keyword arguments passed into
`addCleanup()` when they are added.

If `setUp()` fails, meaning that `tearDown()` is not called,
then any cleanup functions added will still be called.

> *Added in version 3.1.*

### `enterContext(cm)`

Enter the supplied context manager.  If successful, also
add its `__exit__()` method as a cleanup function by
`addCleanup()` and return the result of the
`__enter__()` method.

> *Added in version 3.11.*

### `doCleanups()`

This method is called unconditionally after `tearDown()`, or
after `setUp()` if `setUp()` raises an exception.

It is responsible for calling all the cleanup functions added by
`addCleanup()`. If you need cleanup functions to be called
*prior* to `tearDown()` then you can call `doCleanups()`
yourself.

`doCleanups()` pops methods off the stack of cleanup
functions one at a time, so it can be called at any time.

> *Added in version 3.1.*

### classmethod `addClassCleanup(function, /, *args, **kwargs)`

Add a function to be called after `tearDownClass()` to cleanup
resources used during the test class. Functions will be called in reverse
order to the order they are added (LIFO (last-in, first-out)).
They are called with any arguments and keyword arguments passed into
`addClassCleanup()` when they are added.

If `setUpClass()` fails, meaning that `tearDownClass()` is not
called, then any cleanup functions added will still be called.

> *Added in version 3.8.*

### classmethod `enterClassContext(cm)`

Enter the supplied context manager.  If successful, also
add its `__exit__()` method as a cleanup function by
`addClassCleanup()` and return the result of the
`__enter__()` method.

> *Added in version 3.11.*

### classmethod `doClassCleanups()`

This method is called unconditionally after `tearDownClass()`, or
after `setUpClass()` if `setUpClass()` raises an exception.

It is responsible for calling all the cleanup functions added by
`addClassCleanup()`. If you need cleanup functions to be called
*prior* to `tearDownClass()` then you can call
`doClassCleanups()` yourself.

`doClassCleanups()` pops methods off the stack of cleanup
functions one at a time, so it can be called at any time.

> *Added in version 3.8.*

### class `IsolatedAsyncioTestCase(methodName='runTest')`

This class provides an API similar to `TestCase` and also accepts
coroutines as test functions.

> *Added in version 3.8.*

### `loop_factory`

The *loop_factory* passed to `asyncio.Runner`. Override
in subclasses with `asyncio.EventLoop` to avoid using the
asyncio policy system.

> *Added in version 3.13.*

### `asyncSetUp()`

Method called to prepare the test fixture. This is called after `TestCase.setUp()`.
This is called immediately before calling the test method; other than
`AssertionError` or `SkipTest`, any exception raised by this method
will be considered an error rather than a test failure. The default implementation
does nothing.

### `asyncTearDown()`

Method called immediately after the test method has been called and the
result recorded.  This is called before `tearDown()`. This is called even if
the test method raised an exception, so the implementation in subclasses may need
to be particularly careful about checking internal state.  Any exception, other than
`AssertionError` or `SkipTest`, raised by this method will be
considered an additional error rather than a test failure (thus increasing
the total number of reported errors). This method will only be called if
the `asyncSetUp()` succeeds, regardless of the outcome of the test method.
The default implementation does nothing.

### `addAsyncCleanup(function, /, *args, **kwargs)`

This method accepts a coroutine that can be used as a cleanup function.

### `enterAsyncContext(cm)`

Enter the supplied asynchronous context manager.  If successful,
also add its `__aexit__()` method as a cleanup function by
`addAsyncCleanup()` and return the result of the
`__aenter__()` method.

> *Added in version 3.11.*

### `run(result=None)`

Sets up a new event loop to run the test, collecting the result into
the `TestResult` object passed as *result*.  If *result* is
omitted or `None`, a temporary result object is created (by calling
the `defaultTestResult()` method) and used. The result object is
returned to `run()`'s caller. At the end of the test all the tasks
in the event loop are cancelled.

An example illustrating the order:

```
from unittest import IsolatedAsyncioTestCase

events = []

class Test(IsolatedAsyncioTestCase):

    def setUp(self):
        events.append("setUp")

    async def asyncSetUp(self):
        self._async_connection = await AsyncConnection()
        events.append("asyncSetUp")

    async def test_response(self):
        events.append("test_response")
        response = await self._async_connection.get("https://example.com")
        self.assertEqual(response.status_code, 200)
        self.addAsyncCleanup(self.on_cleanup)

    def tearDown(self):
        events.append("tearDown")

    async def asyncTearDown(self):
        await self._async_connection.close()
        events.append("asyncTearDown")

    async def on_cleanup(self):
        events.append("cleanup")

if __name__ == "__main__":
    unittest.main()
```

After running the test, `events` would contain `["setUp", "asyncSetUp", "test_response", "asyncTearDown", "tearDown", "cleanup"]`.

### class `FunctionTestCase(testFunc, setUp=None, tearDown=None, description=None)`

This class implements the portion of the `TestCase` interface which
allows the test runner to drive the test, but does not provide the methods
which test code can use to check and report errors.  This is used to create
test cases using legacy test code, allowing it to be integrated into a
`unittest`-based test framework.

### class `TestSuite(tests=())`

This class represents an aggregation of individual test cases and test suites.
The class presents the interface needed by the test runner to allow it to be run
as any other test case.  Running a `TestSuite` instance is the same as
iterating over the suite, running each test individually.

If *tests* is given, it must be an iterable of individual test cases or other
test suites that will be used to build the suite initially. Additional methods
are provided to add test cases and suites to the collection later on.

`TestSuite` objects behave much like `TestCase` objects, except
they do not actually implement a test.  Instead, they are used to aggregate
tests into groups of tests that should be run together. Some additional
methods are available to add tests to `TestSuite` instances:

### `TestSuite.addTest(test)`

Add a `TestCase` or `TestSuite` to the suite.

### `TestSuite.addTests(tests)`

Add all the tests from an iterable of `TestCase` and `TestSuite`
instances to this test suite.

This is equivalent to iterating over *tests*, calling `addTest()` for
each element.

`TestSuite` shares the following methods with `TestCase`:

### `run(result)`

Run the tests associated with this suite, collecting the result into the
test result object passed as *result*.  Note that unlike
`TestCase.run()`, `TestSuite.run()` requires the result object to
be passed in.

### `debug()`

Run the tests associated with this suite without collecting the
result. This allows exceptions raised by the test to be propagated to the
caller and can be used to support running tests under a debugger.
