---
title: "unittest --- Unit testing framework (part 2 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/unittest.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# unittest --- Unit testing framework (part 2 of 7)

## Organizing test code

The basic <example-value> blocks of unit testing are test cases --- single
scenarios that must be set up and checked for correctness.  In `unittest`,
test cases are represented by `unittest.TestCase` instances.
To make your own test cases you must write subclasses of
`TestCase` or use `FunctionTestCase`.

The testing code of a `TestCase` instance should be entirely self
contained, such that it can be run either in isolation or in arbitrary
combination with any number of other test cases.

The simplest `TestCase` subclass will simply implement a test method
(i.e. a method whose name starts with `test`) in order to perform specific
testing code:

```
import unittest

class DefaultWidgetSizeTestCase(unittest.TestCase):
    def test_default_widget_size(self):
        widget = Widget('The widget')
        self.assertEqual(widget.size(), (50, 50))
```

Note that in order to test something, we use one of the assert* methods
provided by the `TestCase` base class.  If the test fails, an
exception will be raised with an explanatory message, and `unittest`
will identify the test case as a failure.  Any other exceptions will be
treated as errors.

Tests can be numerous, and their set-up can be repetitive.  Luckily, we
can factor out set-up code by implementing a method called
`setUp()`, which the testing framework will automatically
call for every single test we run:

```
import unittest

class WidgetTestCase(unittest.TestCase):
    def setUp(self):
        self.widget = Widget('The widget')

    def test_default_widget_size(self):
        self.assertEqual(self.widget.size(), (50,50),
                         'incorrect default size')

    def test_widget_resize(self):
        self.widget.resize(100,150)
        self.assertEqual(self.widget.size(), (100,150),
                         'wrong size after resize')
```

> **Note:** The order in which the various tests will be run is determined
> by sorting the test method names with respect to the built-in
> ordering for strings.

If the `setUp()` method raises an exception while the test is
running, the framework will consider the test to have suffered an error, and
the test method will not be executed.

Similarly, we can provide a `tearDown()` method that tidies up
after the test method has been run:

```
import unittest

class WidgetTestCase(unittest.TestCase):
    def setUp(self):
        self.widget = Widget('The widget')

    def tearDown(self):
        self.widget.dispose()
```

If `setUp()` succeeded, `tearDown()` will be
run whether the test method succeeded or not.

Such a working environment for the testing code is called a
test fixture.  A new TestCase instance is created as a unique
test fixture used to execute each individual test method.  Thus
`setUp()`, `tearDown()`, and `TestCase.__init__()`
will be called once per test.

It is recommended that you use TestCase implementations to group tests together
according to the features they test.  `unittest` provides a mechanism for
this: the test suite, represented by `unittest`'s
`TestSuite` class.  In most cases, calling `unittest.main()` will do
the right thing and collect all the module's test cases for you and execute
them.

However, should you want to customize the building of your test suite,
you can do it yourself:

```
def suite():
    suite = unittest.TestSuite()
    suite.addTest(WidgetTestCase('test_default_widget_size'))
    suite.addTest(WidgetTestCase('test_widget_resize'))
    return suite

if __name__ == '__main__':
    runner = unittest.TextTestRunner()
    runner.run(suite())
```

You can place the definitions of test cases and test suites in the same modules
as the code they are to test (such as `widget.py`), but there are several
advantages to placing the test code in a separate module, such as
`test_widget.py`:

- The test module can be run standalone from the command line.

- The test code can more easily be separated from shipped code.

- There is less temptation to change test code to fit the code it tests without
a good reason.

- Test code should be modified much less frequently than the code it tests.

- Tested code can be refactored more easily.

- Tests for modules written in C must be in separate modules anyway, so why not
be consistent?

- If the testing strategy changes, there is no need to change the source code.

## Re-using old test code

Some users will find that they have existing test code that they would like to
run from `unittest`, without converting every old test function to a
`TestCase` subclass.

For this reason, `unittest` provides a `FunctionTestCase` class.
This subclass of `TestCase` can be used to wrap an existing test
function.  Set-up and tear-down functions can also be provided.

Given the following test function:

```
def testSomething():
    something = makeSomething()
    assert something.name is not None
    # ...
```

one can create an equivalent test case instance as follows, with optional
set-up and tear-down methods:

```
testcase = unittest.FunctionTestCase(testSomething,
                                     setUp=makeSomethingDB,
                                     tearDown=deleteSomethingDB)
```

> **Note:** Even though `FunctionTestCase` can be used to quickly convert an
> existing test base over to a `unittest`-based system, this approach is
> not recommended.  Taking the time to set up proper `TestCase`
> subclasses will make future test refactorings infinitely easier.

In some cases, the existing tests may have been written using the `doctest`
module.  If so, `doctest` provides a `DocTestSuite` class that can
automatically build `unittest.TestSuite` instances from the existing
`doctest`-based tests.

## Skipping tests and expected failures

> *Added in version 3.1.*

Unittest supports skipping individual test methods and even whole classes of
tests.  In addition, it supports marking a test as an "expected failure," a test
that is broken and will fail, but shouldn't be counted as a failure on a
`TestResult`.

Skipping a test is simply a matter of using the skip decorator
or one of its conditional variants, calling `TestCase.skipTest()` within a
`setUp()` or test method, or raising `SkipTest` directly.

Basic <example-value> looks like this:

```
class MyTestCase(unittest.TestCase):

    @unittest.skip("demonstrating skipping")
    def test_nothing(self):
        self.fail("shouldn't happen")

    @unittest.skipIf(mylib.__version__ < (1, 3),
                     "not supported in this library version")
    def test_format(self):
        # Tests that work for only a certain version of the library.
        pass

    @unittest.skipUnless(sys.platform.startswith("win"), "requires Windows")
    def test_windows_support(self):
        # windows specific testing code
        pass

    def test_maybe_skipped(self):
        if not external_resource_available():
            self.skipTest("external resource not available")
        # test code that depends on the external resource
        pass
```

This is the output of running the example above in verbose mode:

```
test_format (__main__.MyTestCase.test_format) ... skipped 'not supported in this library version'
test_nothing (__main__.MyTestCase.test_nothing) ... skipped 'demonstrating skipping'
test_maybe_skipped (__main__.MyTestCase.test_maybe_skipped) ... skipped 'external resource not available'
test_windows_support (__main__.MyTestCase.test_windows_support) ... skipped 'requires Windows'

----------------------------------------------------------------------
Ran 4 tests in 0.005s

OK (skipped=4)
```

Classes can be skipped just like methods:

```
@unittest.skip("showing class skipping")
class MySkippedTestCase(unittest.TestCase):
    def test_not_run(self):
        pass
```

`TestCase.setUp()` can also skip the test.  This is useful when a resource
that needs to be set up is not available.

Expected failures use the expectedFailure decorator.:

```
class ExpectedFailureTestCase(unittest.TestCase):
    @unittest.expectedFailure
    def test_fail(self):
        self.assertEqual(1, 0, "broken")
```

It's easy to roll your own skipping decorators by making a decorator that calls
`skip()` on the test when it wants it to be skipped.  This decorator skips
the test unless the passed object has a certain attribute:

```
def skipUnlessHasattr(obj, attr):
    if hasattr(obj, attr):
        return lambda func: func
    return unittest.skip("{!r} doesn't have {!r}".format(obj, attr))
```

The following decorators and exception implement test skipping and expected failures:

### decorator `skip(reason)`

Unconditionally skip the decorated test.  *reason* should describe why the
test is being skipped.

### decorator `skipIf(condition, reason)`

Skip the decorated test if *condition* is true.

### decorator `skipUnless(condition, reason)`

Skip the decorated test unless *condition* is true.

### decorator `expectedFailure`

Mark the test as an expected failure or error.  If the test fails or errors
in the test function itself (rather than in one of the test fixture
methods) then it will be considered a success.  If the test passes, it will
be considered a failure.

### exception `SkipTest(reason)`

This exception is raised to skip a test.

Usually you can use `TestCase.skipTest()` or one of the skipping
decorators instead of raising this directly.

Skipped tests will not have `setUp()` or `tearDown()` run around them.
Skipped classes will not have `setUpClass()` or `tearDownClass()` run.
Skipped modules will not have `setUpModule()` or `tearDownModule()` run.

## Distinguishing test iterations using subtests

> *Added in version 3.4.*

When there are very small differences among your tests, for
instance some parameters, unittest allows you to distinguish them inside
the body of a test method using the `subTest()` context manager.

For example, the following test:

```
class NumbersTest(unittest.TestCase):

    def test_even(self):
        """
        Test that numbers between 0 and 5 are all even.
        """
        for i in range(0, 6):
            with self.subTest(i=i):
                self.assertEqual(i % 2, 0)
```

will produce the following output:

```
======================================================================
FAIL: test_even (__main__.NumbersTest.test_even) (i=1)
Test that numbers between 0 and 5 are all even.
----------------------------------------------------------------------
Traceback (most recent call last):
  File "subtests.py", line 11, in test_even
    self.assertEqual(i % 2, 0)
    ^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: 1 != 0

======================================================================
FAIL: test_even (__main__.NumbersTest.test_even) (i=3)
Test that numbers between 0 and 5 are all even.
----------------------------------------------------------------------
Traceback (most recent call last):
  File "subtests.py", line 11, in test_even
    self.assertEqual(i % 2, 0)
    ^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: 1 != 0

======================================================================
FAIL: test_even (__main__.NumbersTest.test_even) (i=5)
Test that numbers between 0 and 5 are all even.
----------------------------------------------------------------------
Traceback (most recent call last):
  File "subtests.py", line 11, in test_even
    self.assertEqual(i % 2, 0)
    ^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: 1 != 0
```

Without using a subtest, execution would stop after the first failure,
and the error would be less easy to diagnose because the value of `i`
wouldn't be displayed:

```
======================================================================
FAIL: test_even (__main__.NumbersTest.test_even)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "subtests.py", line 32, in test_even
    self.assertEqual(i % 2, 0)
AssertionError: 1 != 0
```
