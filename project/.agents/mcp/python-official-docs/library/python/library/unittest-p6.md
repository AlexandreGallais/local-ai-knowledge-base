---
title: "unittest --- Unit testing framework (part 6 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/unittest.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# unittest --- Unit testing framework (part 6 of 7)

### `countTestCases()`

Return the number of tests represented by this test object, including all
individual tests and sub-suites.

### `__iter__()`

Tests grouped by a `TestSuite` are always accessed by iteration.
Subclasses can lazily provide tests by overriding `__iter__()`. Note
that this method may be called several times on a single suite (for
example when counting tests or comparing for equality) so the tests
returned by repeated iterations before `TestSuite.run()` must be the
same for each call iteration. After `TestSuite.run()`, callers should
not rely on the tests returned by this method unless the caller uses a
subclass that overrides `TestSuite._removeTestAtIndex()` to preserve
test references.

> *Changed in version 3.2.*
> In earlier versions the `TestSuite` accessed tests directly rather
> than through iteration, so overriding `__iter__()` wasn't sufficient
> for providing tests.

> *Changed in version 3.4.*
> In earlier versions the `TestSuite` held references to each
> `TestCase` after `TestSuite.run()`. Subclasses can restore
> that behavior by overriding `TestSuite._removeTestAtIndex()`.

In the typical usage of a `TestSuite` object, the `run()` method
is invoked by a `TestRunner` rather than by the end-user test harness.

### class `TestLoader()`

The `TestLoader` class is used to create test suites from classes and
modules.  Normally, there is no need to create an instance of this class; the
`unittest` module provides an instance that can be shared as
`unittest.defaultTestLoader`.  Using a subclass or instance, however,
allows customization of some configurable properties.

`TestLoader` objects have the following attributes:

### `errors`

A list of the non-fatal errors encountered while loading tests. Not reset
by the loader at any point. Fatal errors are signalled by the relevant
method raising an exception to the caller. Non-fatal errors are also
indicated by a synthetic test that will raise the original error when
run.

> *Added in version 3.5.*

`TestLoader` objects have the following methods:

### `loadTestsFromTestCase(testCaseClass)`

Return a suite of all test cases contained in the `TestCase`-derived
`testCaseClass`.

A test case instance is created for each method named by
`getTestCaseNames()`. By default these are the method names
beginning with `test`. If `getTestCaseNames()` returns no
methods, but the `runTest()` method is implemented, a single test
case is created for that method instead.

### `loadTestsFromModule(module, *, pattern=None)`

Return a suite of all test cases contained in the given module. This
method searches *module* for classes derived from `TestCase` and
creates an instance of the class for each test method defined for the
class.

> **Note:** While using a hierarchy of `TestCase`-derived classes can be
> convenient in sharing fixtures and helper functions, defining test
> methods on base classes that are not intended to be instantiated
> directly does not play well with this method.  Doing so, however, can
> be useful when the fixtures are different and defined in subclasses.

If a module provides a `load_tests` function it will be called to
load the tests. This allows modules to customize test loading.
This is the load_tests protocol.  The *pattern* argument is passed as
the third argument to `load_tests`.

> *Changed in version 3.2.*
> Support for `load_tests` added.

> *Changed in version 3.5.*
> Support for a keyword-only argument *pattern* has been added.

> *Changed in version 3.12.*
> The undocumented and unofficial *use_load_tests* parameter has been
> removed.

### `loadTestsFromName(name, module=None)`

Return a suite of all test cases given a string specifier.

The specifier *name* is a "dotted name" that may resolve either to a
module, a test case class, a test method within a test case class, a
`TestSuite` instance, or a callable object which returns a
`TestCase` or `TestSuite` instance.  These checks are
applied in the order listed here; that is, a method on a possible test
case class will be picked up as "a test method within a test case class",
rather than "a callable object".

For example, if you have a module `SampleTests` containing a
`TestCase`-derived class `SampleTestCase` with three test
methods (`test_one()`, `test_two()`, and `test_three()`), the
specifier `'SampleTests.SampleTestCase'` would cause this method to
return a suite which will run all three test methods. Using the specifier
`'SampleTests.SampleTestCase.test_two'` would cause it to return a test
suite which will run only the `test_two()` test method. The specifier
can refer to modules and packages which have not been imported; they will
be imported as a side-effect.

The method optionally resolves *name* relative to the given *module*.

> *Changed in version 3.5.*
> If an `ImportError` or `AttributeError` occurs while traversing
> *name* then a synthetic test that raises that error when run will be
> returned. These errors are included in the errors accumulated by
> self.errors.

### `loadTestsFromNames(names, module=None)`

Similar to `loadTestsFromName()`, but takes a sequence of names rather
than a single name.  The return value is a test suite which supports all
the tests defined for each name.

### `getTestCaseNames(testCaseClass)`

Return a sorted sequence of method names found within *testCaseClass*;
this should be a subclass of `TestCase`.

### `discover(start_dir, pattern='test*.py', top_level_dir=None)`

Find all the test modules by recursing into subdirectories from the
specified start directory, and return a TestSuite object containing them.
Only test files that match *pattern* will be loaded. (Using shell style
pattern matching.) Only module names that are importable (i.e. are valid
Python identifiers) will be loaded.

All test modules must be importable from the top level of the project. If
the start directory is not the top level directory then *top_level_dir*
must be specified separately.

If importing a module fails, for example due to a syntax error, then
this will be recorded as a single error and discovery will continue.  If
the import failure is due to `SkipTest` being raised, it will be
recorded as a skip instead of an error.

If a package (a directory containing a file named `__init__.py`) is
found, the package will be checked for a `load_tests` function. If this
exists then it will be called
`package.load_tests(loader, tests, pattern)`. Test discovery takes care
to ensure that a package is only checked for tests once during an
invocation, even if the load_tests function itself calls
`loader.discover`.

If `load_tests` exists then discovery does *not* recurse into the
package, `load_tests` is responsible for loading all tests in the
package.

The pattern is deliberately not stored as a loader attribute so that
packages can continue discovery themselves.

*top_level_dir* is stored internally, and used as a default to any
nested calls to `discover()`. That is, if a package's `load_tests`
calls `loader.discover()`, it does not need to pass this argument.

*start_dir* can be a dotted module name as well as a directory.

> *Added in version 3.2.*

> *Changed in version 3.4.*
> Modules that raise `SkipTest` on import are recorded as skips,
> not errors.
> *start_dir* can be a namespace packages.
>
> Paths are sorted before being imported so that execution order is the
> same even if the underlying file system's ordering is not dependent
> on file name.

> *Changed in version 3.5.*
> Found packages are now checked for `load_tests` regardless of
> whether their path matches *pattern*, because it is impossible for
> a package name to match the default pattern.

> *Changed in version 3.11.*
> *start_dir* can not be a namespace packages.
> It has been broken since Python 3.7, and Python 3.11 officially removes it.

> *Changed in version 3.13.*
> *top_level_dir* is only stored for the duration of *discover* call.

> *Changed in version 3.14.*
> *start_dir* can once again be a namespace package.

The following attributes of a `TestLoader` can be configured either by
subclassing or assignment on an instance:

### `testMethodPrefix`

String giving the prefix of method names which will be interpreted as test
methods.  The default value is `'test'`.

This affects `getTestCaseNames()` and all the `loadTestsFrom*`
methods.

### `sortTestMethodsUsing`

Function to be used to compare method names when sorting them in
`getTestCaseNames()` and all the `loadTestsFrom*` methods.

### `suiteClass`

Callable object that constructs a test suite from a list of tests. No
methods on the resulting object are needed.  The default value is the
`TestSuite` class.

This affects all the `loadTestsFrom*` methods.

### `testNamePatterns`

List of Unix shell-style wildcard test name patterns that test methods
have to match to be included in test suites (see `-k` option).

If this attribute is not `None` (the default), all test methods to be
included in test suites must match one of the patterns in this list.
Note that matches are always performed using `fnmatch.fnmatchcase()`,
so unlike patterns passed to the `-k` option, simple substring patterns
will have to be converted using `*` wildcards.

This affects all the `loadTestsFrom*` methods.

> *Added in version 3.7.*

### class `TestResult`

This class is used to compile information about which tests have succeeded
and which have failed.

A `TestResult` object stores the results of a set of tests.  The
`TestCase` and `TestSuite` classes ensure that results are
properly recorded; test authors do not need to worry about recording the
outcome of tests.

Testing frameworks built on top of `unittest` may want access to the
`TestResult` object generated by running a set of tests for reporting
purposes; a `TestResult` instance is returned by the
`TestRunner.run()` method for this purpose.

`TestResult` instances have the following attributes that will be of
interest when inspecting the results of running a set of tests:

### `errors`

A list containing 2-tuples of `TestCase` instances and strings
holding formatted tracebacks. Each tuple represents a test which raised an
unexpected exception.

### `failures`

A list containing 2-tuples of `TestCase` instances and strings
holding formatted tracebacks. Each tuple represents a test where a failure
was explicitly signalled using the assert* methods.

### `skipped`

A list containing 2-tuples of `TestCase` instances and strings
holding the reason for skipping the test.

> *Added in version 3.1.*

### `expectedFailures`

A list containing 2-tuples of `TestCase` instances and strings
holding formatted tracebacks.  Each tuple represents an expected failure
or error of the test case.

### `unexpectedSuccesses`

A list containing `TestCase` instances that were marked as expected
failures, but succeeded.

### `collectedDurations`

A list containing 2-tuples of test case names and floats
representing the elapsed time of each test which was run.

> *Added in version 3.12.*

### `shouldStop`

Set to `True` when the execution of tests should stop by `stop()`.

### `testsRun`

The total number of tests run so far.

### `buffer`

If set to true, `sys.stdout` and `sys.stderr` will be buffered in between
`startTest()` and `stopTest()` being called. Collected output will
only be echoed onto the real `sys.stdout` and `sys.stderr` if the test
fails or errors. Any output is also attached to the failure / error message.

> *Added in version 3.2.*

### `failfast`

If set to true `stop()` will be called on the first failure or error,
halting the test run.

> *Added in version 3.2.*

### `tb_locals`

If set to true then local variables will be shown in tracebacks.

> *Added in version 3.5.*

### `wasSuccessful()`

Return `True` if all tests run so far have passed, otherwise returns
`False`.

> *Changed in version 3.4.*
> Returns `False` if there were any `unexpectedSuccesses`
> from tests marked with the expectedFailure decorator.

### `stop()`

This method can be called to signal that the set of tests being run should
be aborted by setting the `shouldStop` attribute to `True`.
`TestRunner` objects should respect this flag and return without
running any additional tests.

For example, this feature is used by the `TextTestRunner` class to
stop the test framework when the user signals an interrupt from the
keyboard.  Interactive tools which provide `TestRunner`
implementations can use this in a similar manner.

The following methods of the `TestResult` class are used to maintain
the internal data structures, and may be extended in subclasses to support
additional reporting requirements.  This is particularly useful in building
tools which support interactive reporting while tests are being run.

### `startTest(test)`

Called when the test case *test* is about to be run.

### `stopTest(test)`

Called after the test case *test* has been executed, regardless of the
outcome.

### `startTestRun()`

Called once before any tests are executed.

> *Added in version 3.1.*

### `stopTestRun()`

Called once after all tests are executed.

> *Added in version 3.1.*

### `addError(test, err)`

Called when the test case *test* raises an unexpected exception. *err* is a
tuple of the form returned by `sys.exc_info()`: ``(type, value,
traceback)``.

The default implementation appends a tuple `(test, formatted_err)` to
the instance's `errors` attribute, where *formatted_err* is a
formatted traceback derived from *err*.

### `addFailure(test, err)`

Called when the test case *test* signals a failure. *err* is a tuple of
the form returned by `sys.exc_info()`: `(type, value, traceback)`.

The default implementation appends a tuple `(test, formatted_err)` to
the instance's `failures` attribute, where *formatted_err* is a
formatted traceback derived from *err*.

### `addSuccess(test)`

Called when the test case *test* succeeds.

The default implementation does nothing.

### `addSkip(test, reason)`

Called when the test case *test* is skipped.  *reason* is the reason the
test gave for skipping.

The default implementation appends a tuple `(test, reason)` to the
instance's `skipped` attribute.

### `addExpectedFailure(test, err)`

Called when the test case *test* fails or errors, but was marked with
the expectedFailure decorator.

The default implementation appends a tuple `(test, formatted_err)` to
the instance's `expectedFailures` attribute, where *formatted_err*
is a formatted traceback derived from *err*.

### `addUnexpectedSuccess(test)`

Called when the test case *test* was marked with the
expectedFailure decorator, but succeeded.

The default implementation appends the test to the instance's
`unexpectedSuccesses` attribute.
