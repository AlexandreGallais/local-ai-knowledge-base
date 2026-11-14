---
title: "unittest --- Unit testing framework (part 3 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/unittest.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# unittest --- Unit testing framework (part 3 of 7)

## Classes and functions

This section describes in depth the API of `unittest`.

### class `TestCase(methodName='runTest')`

Instances of the `TestCase` class represent the logical test units
in the `unittest` universe.  This class is intended to be used as a base
class, with specific tests being implemented by concrete subclasses.  This class
implements the interface needed by the test runner to allow it to drive the
tests, and methods that the test code can use to check for and report various
kinds of failure.

Each instance of `TestCase` will run a single base method: the method
named *methodName*.
In most uses of `TestCase`, you will neither change
the *methodName* nor reimplement the default `runTest()` method.

> *Changed in version 3.2.*
> `TestCase` can be instantiated successfully without providing a
> *methodName*. This makes it easier to experiment with `TestCase`
> from the interactive interpreter.

`TestCase` instances provide three groups of methods: one group used
to run the test, another used by the test implementation to check conditions
and report failures, and some inquiry methods allowing information about the
test itself to be gathered.

Methods in the first group (running the test) are:

### `setUp()`

Method called to prepare the test fixture.  This is called immediately
before calling the test method; other than `AssertionError` or `SkipTest`,
any exception raised by this method will be considered an error rather than
a test failure. The default implementation does nothing.

### `tearDown()`

Method called immediately after the test method has been called and the
result recorded.  This is called even if the test method raised an
exception, so the implementation in subclasses may need to be particularly
careful about checking internal state.  Any exception, other than
`AssertionError` or `SkipTest`, raised by this method will be
considered an additional error rather than a test failure (thus increasing
the total number of reported errors). This method will only be called if
the `setUp()` succeeds, regardless of the outcome of the test method.
The default implementation does nothing.

### `setUpClass()`

A class method called before tests in an individual class are run.
`setUpClass` is called with the class as the only argument
and must be decorated as a classmethod:

```
@classmethod
def setUpClass(cls):
    ...
```

See Class and Module Fixtures for more details.

> *Added in version 3.2.*

### `tearDownClass()`

A class method called after tests in an individual class have run.
`tearDownClass` is called with the class as the only argument
and must be decorated as a classmethod:

```
@classmethod
def tearDownClass(cls):
    ...
```

See Class and Module Fixtures for more details.

> *Added in version 3.2.*

### `run(result=None)`

Run the test, collecting the result into the `TestResult` object
passed as *result*.  If *result* is omitted or `None`, a temporary
result object is created (by calling the `defaultTestResult()`
method) and used. The result object is returned to `run()`'s
caller.

The same effect may be had by simply calling the `TestCase`
instance.

> *Changed in version 3.3.*
> Previous versions of `run` did not return the result. Neither did
> calling an instance.

### `skipTest(reason)`

Calling this during a test method or `setUp()` skips the current
test.  See unittest-skipping for more information.

> *Added in version 3.1.*

### `subTest(msg=None, **params)`

Return a context manager which executes the enclosed code block as a
subtest.  *msg* and *params* are optional, arbitrary values which are
displayed whenever a subtest fails, allowing you to identify them
clearly.

A test case can contain any number of subtest declarations, and
they can be arbitrarily nested.

See subtests for more information.

> *Added in version 3.4.*

### `debug()`

Run the test without collecting the result.  This allows exceptions raised
by the test to be propagated to the caller, and can be used to support
running tests under a debugger.

The `TestCase` class provides several assert methods to check for and
report failures.  The following table lists the most commonly used methods
(see the tables below for more assert methods):

```text
+-----------------------------------------+-----------------------------+---------------+
| Method                                  | Checks that                 | New in        |
+=========================================+=============================+===============+
| :meth:`assertEqual(a, b)                | ``a == b``                  |               |
| <TestCase.assertEqual>`                 |                             |               |
+-----------------------------------------+-----------------------------+---------------+
| :meth:`assertNotEqual(a, b)             | ``a != b``                  |               |
| <TestCase.assertNotEqual>`              |                             |               |
+-----------------------------------------+-----------------------------+---------------+
| :meth:`assertTrue(x)                    | ``bool(x) is True``         |               |
| <TestCase.assertTrue>`                  |                             |               |
+-----------------------------------------+-----------------------------+---------------+
| :meth:`assertFalse(x)                   | ``bool(x) is False``        |               |
| <TestCase.assertFalse>`                 |                             |               |
+-----------------------------------------+-----------------------------+---------------+
| :meth:`assertIs(a, b)                   | ``a is b``                  | 3.1           |
| <TestCase.assertIs>`                    |                             |               |
+-----------------------------------------+-----------------------------+---------------+
| :meth:`assertIsNot(a, b)                | ``a is not b``              | 3.1           |
| <TestCase.assertIsNot>`                 |                             |               |
+-----------------------------------------+-----------------------------+---------------+
| :meth:`assertIsNone(x)                  | ``x is None``               | 3.1           |
| <TestCase.assertIsNone>`                |                             |               |
+-----------------------------------------+-----------------------------+---------------+
| :meth:`assertIsNotNone(x)               | ``x is not None``           | 3.1           |
| <TestCase.assertIsNotNone>`             |                             |               |
+-----------------------------------------+-----------------------------+---------------+
| :meth:`assertIn(a, b)                   | ``a in b``                  | 3.1           |
| <TestCase.assertIn>`                    |                             |               |
+-----------------------------------------+-----------------------------+---------------+
| :meth:`assertNotIn(a, b)                | ``a not in b``              | 3.1           |
| <TestCase.assertNotIn>`                 |                             |               |
+-----------------------------------------+-----------------------------+---------------+
| :meth:`assertIsInstance(a, b)           | ``isinstance(a, b)``        | 3.2           |
| <TestCase.assertIsInstance>`            |                             |               |
+-----------------------------------------+-----------------------------+---------------+
| :meth:`assertNotIsInstance(a, b)        | ``not isinstance(a, b)``    | 3.2           |
| <TestCase.assertNotIsInstance>`         |                             |               |
+-----------------------------------------+-----------------------------+---------------+
| :meth:`assertIsSubclass(a, b)           | ``issubclass(a, b)``        | 3.14          |
| <TestCase.assertIsSubclass>`            |                             |               |
+-----------------------------------------+-----------------------------+---------------+
| :meth:`assertNotIsSubclass(a, b)        | ``not issubclass(a, b)``    | 3.14          |
| <TestCase.assertNotIsSubclass>`         |                             |               |
+-----------------------------------------+-----------------------------+---------------+
```

All the assert methods accept a *msg* argument that, if specified, is used
as the error message on failure (see also `longMessage`).
Note that the *msg* keyword argument can be passed to `assertRaises()`,
`assertRaisesRegex()`, `assertWarns()`, `assertWarnsRegex()`
only when they are used as a context manager.

### `assertEqual(first, second, msg=None)`

Test that *first* and *second* are equal.  If the values do not
compare equal, the test will fail.

In addition, if *first* and *second* are the exact same type and one of
list, tuple, dict, set, frozenset or str or any type that a subclass
registers with `addTypeEqualityFunc()` the type-specific equality
function will be called in order to generate a more useful default
error message (see also the :ref:`list of type-specific methods
<type-specific-methods>`).

> *Changed in version 3.1.*
> Added the automatic calling of type-specific equality function.

> *Changed in version 3.2.*
> `assertMultiLineEqual()` added as the default type equality
> function for comparing strings.

### `assertNotEqual(first, second, msg=None)`

Test that *first* and *second* are not equal.  If the values do
compare equal, the test will fail.

### `assertTrue(expr, msg=None)`

```python
assertFalse(expr, msg=None)
```

Test that *expr* is true (or false).

Note that this is equivalent to `bool(expr) is True` and not to ``expr
is True` (use `assertIs(expr, True)`` for the latter).  This method
should also be avoided when more specific methods are available (e.g.
`assertEqual(a, b)` instead of `assertTrue(a == b)`), because they
provide a better error message in case of failure.

### `assertIs(first, second, msg=None)`

```python
assertIsNot(first, second, msg=None)
```

Test that *first* and *second* are (or are not) the same object.

> *Added in version 3.1.*

### `assertIsNone(expr, msg=None)`

```python
assertIsNotNone(expr, msg=None)
```

Test that *expr* is (or is not) `None`.

> *Added in version 3.1.*

### `assertIn(member, container, msg=None)`

```python
assertNotIn(member, container, msg=None)
```

Test that *member* is (or is not) in *container*.

> *Added in version 3.1.*

### `assertIsInstance(obj, cls, msg=None)`

```python
assertNotIsInstance(obj, cls, msg=None)
```

Test that *obj* is (or is not) an instance of *cls* (which can be a
class or a tuple of classes, as supported by `isinstance()`).
To check for the exact type, use `assertIs(type(obj), cls)`.

> *Added in version 3.2.*

### `assertIsSubclass(cls, superclass, msg=None)`

```python
assertNotIsSubclass(cls, superclass, msg=None)
```

Test that *cls* is (or is not) a subclass of *superclass* (which can be a
class or a tuple of classes, as supported by `issubclass()`).
To check for the exact type, use `assertIs(cls, superclass)`.

> *Added in version 3.14.*

It is also possible to check the production of exceptions, warnings, and
log messages using the following methods:

```text
+---------------------------------------------------------+--------------------------------------+------------+
| Method                                                  | Checks that                          | New in     |
+=========================================================+======================================+============+
| :meth:`assertRaises(exc, fun, *args, **kwds)            | ``fun(*args, **kwds)`` raises *exc*  |            |
| <TestCase.assertRaises>`                                |                                      |            |
+---------------------------------------------------------+--------------------------------------+------------+
| :meth:`assertRaisesRegex(exc, r, fun, *args, **kwds)    | ``fun(*args, **kwds)`` raises *exc*  | 3.1        |
| <TestCase.assertRaisesRegex>`                           | and the message matches regex *r*    |            |
+---------------------------------------------------------+--------------------------------------+------------+
| :meth:`assertWarns(warn, fun, *args, **kwds)            | ``fun(*args, **kwds)`` raises *warn* | 3.2        |
| <TestCase.assertWarns>`                                 |                                      |            |
+---------------------------------------------------------+--------------------------------------+------------+
| :meth:`assertWarnsRegex(warn, r, fun, *args, **kwds)    | ``fun(*args, **kwds)`` raises *warn* | 3.2        |
| <TestCase.assertWarnsRegex>`                            | and the message matches regex *r*    |            |
+---------------------------------------------------------+--------------------------------------+------------+
| :meth:`assertLogs(logger, level)                        | The ``with`` block logs on *logger*  | 3.4        |
| <TestCase.assertLogs>`                                  | with minimum *level*                 |            |
+---------------------------------------------------------+--------------------------------------+------------+
| :meth:`assertNoLogs(logger, level)                      | The ``with`` block does not log on   | 3.10       |
| <TestCase.assertNoLogs>`                                |  *logger* with minimum *level*       |            |
+---------------------------------------------------------+--------------------------------------+------------+
```

### `assertRaises(exception, callable, *args, **kwds)`

```python
assertRaises(exception, *, msg=None)
```

Test that an exception is raised when *callable* is called with any
positional or keyword arguments that are also passed to
`assertRaises()`.  The test passes if *exception* is raised, is an
error if another exception is raised, or fails if no exception is raised.
To catch any of a group of exceptions, a tuple containing the exception
classes may be passed as *exception*.

If only the *exception* and possibly the *msg* arguments are given,
return a context manager so that the code under test can be written
inline rather than as a function:

```
with self.assertRaises(SomeException):
    do_something()
```

When used as a context manager, `assertRaises()` accepts the
additional keyword argument *msg*.

The context manager will store the caught exception object in its
`exception` attribute.  This can be useful if the intention
is to perform additional checks on the exception raised:

```
with self.assertRaises(SomeException) as cm:
    do_something()

the_exception = cm.exception
self.assertEqual(the_exception.error_code, 3)
```

> *Changed in version 3.1.*
> Added the ability to use `assertRaises()` as a context manager.

> *Changed in version 3.2.*
> Added the `exception` attribute.

> *Changed in version 3.3.*
> Added the *msg* keyword argument when used as a context manager.
