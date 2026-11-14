---
title: "unittest --- Unit testing framework (part 7 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/unittest.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# unittest --- Unit testing framework (part 7 of 7)

### `addSubTest(test, subtest, outcome)`

Called when a subtest finishes.  *test* is the test case
corresponding to the test method.  *subtest* is a custom
`TestCase` instance describing the subtest.

If *outcome* is `None`, the subtest succeeded.  Otherwise,
it failed with an exception where *outcome* is a tuple of the form
returned by `sys.exc_info()`: `(type, value, traceback)`.

The default implementation does nothing when the outcome is a
success, and records subtest failures as normal failures.

> *Added in version 3.4.*

### `addDuration(test, elapsed)`

Called when the test case finishes.  *elapsed* is the time represented in
seconds, and it includes the execution of cleanup functions.

> *Added in version 3.12.*

### class `TextTestResult(stream, descriptions, verbosity, *, durations=None)`

A concrete implementation of `TestResult` used by the
`TextTestRunner`. Subclasses should accept `**kwargs` to ensure
compatibility as the interface changes.

> *Added in version 3.2.*

> *Changed in version 3.12.*
> Added the *durations* keyword parameter.

### `defaultTestLoader`

Instance of the `TestLoader` class intended to be shared.  If no
customization of the `TestLoader` is needed, this instance can be used
instead of repeatedly creating new instances.

### class `TextTestRunner(stream=None, descriptions=True, verbosity=1, failfast=False, \`

```python
buffer=False, resultclass=None, warnings=None, *, \
tb_locals=False, durations=None)
```

A basic test runner implementation that outputs results to a stream. If *stream*
is `None`, the default, `sys.stderr` is used as the output stream. This class
has a few configurable parameters, but is essentially very simple.  Graphical
applications which run test suites should provide alternate implementations. Such
implementations should accept `**kwargs` as the interface to construct runners
changes when features are added to unittest.

By default this runner shows `DeprecationWarning`,
`PendingDeprecationWarning`, `ResourceWarning` and
`ImportWarning` even if they are :ref:`ignored by default
<warning-ignored>`.  This behavior can
be overridden using Python's `-Wd` or `-Wa` options
(see Warning control) and leaving
*warnings* to `None`.

> *Changed in version 3.2.*
> Added the *warnings* parameter.

> *Changed in version 3.2.*
> The default stream is set to `sys.stderr` at instantiation time rather
> than import time.

> *Changed in version 3.5.*
> Added the *tb_locals* parameter.

> *Changed in version 3.12.*
> Added the *durations* parameter.

### `_makeResult()`

This method returns the instance of `TestResult` used by `run()`.
It is not intended to be called directly, but can be overridden in
subclasses to provide a custom `TestResult`.

`_makeResult()` instantiates the class or callable passed in the
`TextTestRunner` constructor as the `resultclass` argument. It
defaults to `TextTestResult` if no `resultclass` is provided.
The result class is instantiated with the following arguments:

```
stream, descriptions, verbosity
```

### `run(test)`

This method is the main public interface to the `TextTestRunner`. This
method takes a `TestSuite` or `TestCase` instance. A
`TestResult` is created by calling
`_makeResult()` and the test(s) are run and the
results printed to stdout.

### `main(module='__main__', defaultTest=None, argv=None, testRunner=None, \`

```python
testLoader=unittest.defaultTestLoader, exit=True, verbosity=1, \
failfast=None, catchbreak=None, buffer=None, warnings=None)
```

A command-line program that loads a set of tests from *module* and runs them;
this is primarily for making test modules conveniently executable.
The simplest use for this function is to include the following line at the
end of a test script:

```
if __name__ == '__main__':
    unittest.main()
```

You can run tests with more detailed information by passing in the verbosity
argument:

```
if __name__ == '__main__':
    unittest.main(verbosity=2)
```

The *defaultTest* argument is either the name of a single test or an
iterable of test names to run if no test names are specified via *argv*.  If
not specified or `None` and no test names are provided via *argv*, all
tests found in *module* are run.

The *argv* argument can be a list of options passed to the program, with the
first element being the program name.  If not specified or `None`,
the values of `sys.argv` are used.

The *testRunner* argument can either be a test runner class or an already
created instance of it. By default `main` calls `sys.exit()` with
an exit code indicating success (0) or failure (1) of the tests run.
An exit code of 5 indicates that no tests were run or skipped.

The *testLoader* argument has to be a `TestLoader` instance,
and defaults to `defaultTestLoader`.

`main` supports being used from the interactive interpreter by passing in the
argument `exit=False`. This displays the result on standard output without
calling `sys.exit()`:

```
>>> from unittest import main
>>> main(module='test_module', exit=False)
```

The *failfast*, *catchbreak* and *buffer* parameters have the same
effect as the same-name command-line options.

The *warnings* argument specifies the warning filter
that should be used while running the tests.  If it's not specified, it will
remain `None` if a `-W` option is passed to `python`
(see Warning control),
otherwise it will be set to `'default'`.

Calling `main` returns an object with the `result` attribute that contains
the result of the tests run as a `unittest.TestResult`.

> *Changed in version 3.1.*
> The *exit* parameter was added.

> *Changed in version 3.2.*
> The *verbosity*, *failfast*, *catchbreak*, *buffer*
> and *warnings* parameters were added.

> *Changed in version 3.4.*
> The *defaultTest* parameter was changed to also accept an iterable of
> test names.

#### load_tests Protocol

> *Added in version 3.2.*

Modules or packages can customize how tests are loaded from them during normal
test runs or test discovery by implementing a function called `load_tests`.

If a test module defines `load_tests` it will be called by
`TestLoader.loadTestsFromModule()` with the following arguments:

```
load_tests(loader, standard_tests, pattern)
```

where *pattern* is passed straight through from `loadTestsFromModule`.  It
defaults to `None`.

It should return a `TestSuite`.

*loader* is the instance of `TestLoader` doing the loading.
*standard_tests* are the tests that would be loaded by default from the
module. It is common for test modules to only want to add or remove tests
from the standard set of tests.
The third argument is used when loading packages as part of test discovery.

A typical `load_tests` function that loads tests from a specific set of
`TestCase` classes may look like:

```
test_cases = (TestCase1, TestCase2, TestCase3)

def load_tests(loader, tests, pattern):
    suite = TestSuite()
    for test_class in test_cases:
        tests = loader.loadTestsFromTestCase(test_class)
        suite.addTests(tests)
    return suite
```

If discovery is started in a directory containing a package, either from the
command line or by calling `TestLoader.discover()`, then the package
`__init__.py` will be checked for `load_tests`.  If that function does
not exist, discovery will recurse into the package as though it were just
another directory.  Otherwise, discovery of the package's tests will be left up
to `load_tests` which is called with the following arguments:

```
load_tests(loader, standard_tests, pattern)
```

This should return a `TestSuite` representing all the tests
from the package. (`standard_tests` will only contain tests
collected from `__init__.py`.)

Because the pattern is passed into `load_tests` the package is free to
continue (and potentially modify) test discovery. A 'do nothing'
`load_tests` function for a test package would look like:

```
def load_tests(loader, standard_tests, pattern):
    # top level directory cached on loader instance
    this_dir = os.path.dirname(__file__)
    package_tests = loader.discover(start_dir=this_dir, pattern=pattern)
    standard_tests.addTests(package_tests)
    return standard_tests
```

> *Changed in version 3.5.*
> Discovery no longer checks package names for matching *pattern* due to the
> impossibility of package names matching the default pattern.

## Class and Module Fixtures

Class and module level fixtures are implemented in `TestSuite`. When
the test suite encounters a test from a new class then
`tearDownClass()` from the previous class (if there is one)
is called, followed by `setUpClass()` from the new class.

Similarly if a test is from a different module from the previous test then
`tearDownModule` from the previous module is run, followed by
`setUpModule` from the new module.

After all the tests have run the final `tearDownClass` and
`tearDownModule` are run.

Note that shared fixtures do not play well with [potential] features like test
parallelization and they break test isolation. They should be used with care.

The default ordering of tests created by the unittest test loaders is to group
all tests from the same modules and classes together. This will lead to
`setUpClass` / `setUpModule` (etc) being called exactly once per class and
module. If you randomize the order, so that tests from different modules and
classes are adjacent to each other, then these shared fixture functions may be
called multiple times in a single test run.

Shared fixtures are not intended to work with suites with non-standard
ordering. A `BaseTestSuite` still exists for frameworks that don't want to
support shared fixtures.

If there are any exceptions raised during one of the shared fixture functions
the test is reported as an error. Because there is no corresponding test
instance an `_ErrorHolder` object (that has the same interface as a
`TestCase`) is created to represent the error. If you are just using
the standard unittest test runner then this detail doesn't matter, but if you
are a framework author it may be relevant.

### setUpClass and tearDownClass

These must be implemented as class methods:

```
import unittest

class Test(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls._connection = createExpensiveConnectionObject()

    @classmethod
    def tearDownClass(cls):
        cls._connection.destroy()
```

If you want the `setUpClass` and `tearDownClass` on base classes called
then you must call up to them yourself. The implementations in
`TestCase` are empty.

If an exception is raised during a `setUpClass` then the tests in the class
are not run and the `tearDownClass` is not run. Skipped classes will not
have `setUpClass` or `tearDownClass` run. If the exception is a
`SkipTest` exception then the class will be reported as having been skipped
instead of as an error.

### `setUpModule`

```python
tearDownModule
```

These should be implemented as functions:

```
def setUpModule():
    createConnection()

def tearDownModule():
    closeConnection()
```

If an exception is raised in a `setUpModule` then none of the tests in the
module will be run and the `tearDownModule` will not be run. If the exception is a
`SkipTest` exception then the module will be reported as having been skipped
instead of as an error.

To add cleanup code that must be run even in the case of an exception, use
`addModuleCleanup`:

### `addModuleCleanup(function, /, *args, **kwargs)`

Add a function to be called after `tearDownModule()` to cleanup
resources used during the test class. Functions will be called in reverse
order to the order they are added (LIFO (last-in, first-out)).
They are called with any arguments and keyword arguments passed into
`addModuleCleanup()` when they are added.

If `setUpModule()` fails, meaning that `tearDownModule()` is not
called, then any cleanup functions added will still be called.

> *Added in version 3.8.*

### `enterModuleContext(cm)`

Enter the supplied context manager.  If successful, also
add its `__exit__()` method as a cleanup function by
`addModuleCleanup()` and return the result of the
`__enter__()` method.

> *Added in version 3.11.*

### `doModuleCleanups()`

This function is called unconditionally after `tearDownModule()`, or
after `setUpModule()` if `setUpModule()` raises an exception.

It is responsible for calling all the cleanup functions added by
`addModuleCleanup()`. If you need cleanup functions to be called
*prior* to `tearDownModule()` then you can call
`doModuleCleanups()` yourself.

`doModuleCleanups()` pops methods off the stack of cleanup
functions one at a time, so it can be called at any time.

> *Added in version 3.8.*

## Signal Handling

> *Added in version 3.2.*

The `-c/--catch` command-line option to unittest,
along with the `catchbreak` parameter to `unittest.main()`, provide
more friendly handling of control-C during a test run. With catch break
behavior enabled control-C will allow the currently running test to complete,
and the test run will then end and report all the results so far. A second
control-c will raise a `KeyboardInterrupt` in the usual way.

The control-c handling signal handler attempts to remain compatible with code or
tests that install their own `signal.SIGINT` handler. If the `unittest`
handler is called but *isn't* the installed `signal.SIGINT` handler,
i.e. it has been replaced by the system under test and delegated to, then it
calls the default handler. This will normally be the expected behavior by code
that replaces an installed handler and delegates to it. For individual tests
that need `unittest` control-c handling disabled the `removeHandler()`
decorator can be used.

There are a few utility functions for framework authors to enable control-c
handling functionality within test frameworks.

### `installHandler()`

Install the control-c handler. When a `signal.SIGINT` is received
(usually in response to the user pressing control-c) all registered results
have `stop()` called.

### `registerResult(result)`

Register a `TestResult` object for control-c handling. Registering a
result stores a weak reference to it, so it doesn't prevent the result from
being garbage collected.

Registering a `TestResult` object has no side-effects if control-c
handling is not enabled, so test frameworks can unconditionally register
all results they create independently of whether or not handling is enabled.

### `removeResult(result)`

Remove a registered result. Once a result has been removed then
`stop()` will no longer be called on that result object in
response to a control-c.

### `removeHandler(function=None)`

When called without arguments this function removes the control-c handler
if it has been installed. This function can also be used as a test decorator
to temporarily remove the handler while the test is being executed:

```
@unittest.removeHandler
def test_signal_handling(self):
    ...
```
