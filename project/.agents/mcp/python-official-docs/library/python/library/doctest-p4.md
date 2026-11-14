---
title: "doctest --- Test interactive Python examples (part 4 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/doctest.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# doctest --- Test interactive Python examples (part 4 of 6)

## Unittest API

As your collection of doctest'ed modules grows, you'll want a way to run all
their doctests systematically.  `doctest` provides two functions that can
be used to create `unittest` test suites from modules and text files
containing doctests.  To integrate with `unittest` test discovery, include
a load_tests function in your test module:

```
import unittest
import doctest
import my_module_with_doctests

def load_tests(loader, tests, ignore):
    tests.addTests(doctest.DocTestSuite(my_module_with_doctests))
    return tests
```

There are two main functions for creating `unittest.TestSuite` instances
from text files and modules with doctests:

### `DocFileSuite(*paths, module_relative=True, package=None, setUp=None, tearDown=None, globs=None, optionflags=0, parser=DocTestParser(), encoding=None)`

Convert doctest tests from one or more text files to a
`unittest.TestSuite`.

The returned `unittest.TestSuite` is to be run by the unittest
framework and runs the interactive examples in each file.
Each file is run as a separate unit test, and each example in a file
is run as a subtest.
If any example in a file fails, then the synthesized unit test fails.
The traceback for failure or error contains the name of the file
containing the test and a (sometimes approximate) line number.
If all the examples in a file are skipped, then the synthesized unit
test is also marked as skipped.

Pass one or more paths (as strings) to text files to be examined.

Options may be provided as keyword arguments:

Optional argument *module_relative* specifies how the filenames in *paths*
should be interpreted:

- If *module_relative* is `True` (the default), then each filename in
*paths* specifies an OS-independent module-relative path.  By default, this
path is relative to the calling module's directory; but if the *package*
argument is specified, then it is relative to that package.  To ensure
OS-independence, each filename should use `/` characters to separate path
segments, and may not be an absolute path (i.e., it may not begin with
`/`).

- If *module_relative* is `False`, then each filename in *paths* specifies
an OS-specific path.  The path may be absolute or relative; relative paths
are resolved with respect to the current working directory.

Optional argument *package* is a Python package or the name of a Python
package whose directory should be used as the base directory for
module-relative filenames in *paths*.  If no package is specified, then the
calling module's directory is used as the base directory for module-relative
filenames.  It is an error to specify *package* if *module_relative* is
`False`.

Optional argument *setUp* specifies a set-up function for the test suite.
This is called before running the tests in each file.  The *setUp* function
will be passed a `DocTest` object.  The *setUp* function can access the
test globals as the `globs` attribute of the test passed.

Optional argument *tearDown* specifies a tear-down function for the test
suite.  This is called after running the tests in each file.  The *tearDown*
function will be passed a `DocTest` object.  The *tearDown* function can
access the test globals as the `globs` attribute of the test
passed.

Optional argument *globs* is a dictionary containing the initial global
variables for the tests.  A new copy of this dictionary is created for each
test.  By default, *globs* is a new empty dictionary.

Optional argument *optionflags* specifies the default doctest options for the
tests, created by or-ing together individual option flags.  See section
doctest-options. See function `set_unittest_reportflags()` below
for a better way to set reporting options.

Optional argument *parser* specifies a `DocTestParser` (or subclass)
that should be used to extract tests from the files.  It defaults to a normal
parser (i.e., `DocTestParser()`).

Optional argument *encoding* specifies an encoding that should be used to
convert the file to unicode.

The global `__file__` is added to the globals provided to doctests loaded
from a text file using `DocFileSuite()`.

> *Changed in version 3.15.*
> Run each example as a subtest.

### `DocTestSuite(module=None, globs=None, extraglobs=None, test_finder=None, setUp=None, tearDown=None, optionflags=0, checker=None)`

Convert doctest tests for a module to a `unittest.TestSuite`.

The returned `unittest.TestSuite` is to be run by the unittest
framework and runs each doctest in the module.
Each docstring is run as a separate unit test, and each example in
a docstring is run as a subtest.
If any of the doctests fail, then the synthesized unit test fails.
The traceback for failure or error contains the name of the file
containing the test and a (sometimes approximate) line number.
If all the examples in a docstring are skipped, then the
synthesized unit test is also marked as skipped.

Optional argument *module* provides the module to be tested.  It can be a module
object or a (possibly dotted) module name.  If not specified, the module calling
this function is used.

Optional argument *globs* is a dictionary containing the initial global
variables for the tests.  A new copy of this dictionary is created for each
test.  By default, *globs* is the module's `__dict__`.

Optional argument *extraglobs* specifies an extra set of global variables, which
is merged into *globs*.  By default, no extra globals are used.

Optional argument *test_finder* is the `DocTestFinder` object (or a
drop-in replacement) that is used to extract doctests from the module.

Optional arguments *setUp*, *tearDown*, and *optionflags* are the same as for
function `DocFileSuite()` above, but they are called for each docstring.

This function uses the same search technique as `testmod()`.

> *Changed in version 3.5.*
> `DocTestSuite()` returns an empty `unittest.TestSuite` if *module*
> contains no docstrings instead of raising `ValueError`.

> *Changed in version 3.15.*
> Run each example as a subtest.

Under the covers, `DocTestSuite()` creates a `unittest.TestSuite` out
of `doctest.DocTestCase` instances, and `DocTestCase` is a
subclass of `unittest.TestCase`. `DocTestCase` isn't documented
here (it's an internal detail), but studying its code can answer questions about
the exact details of `unittest` integration.

Similarly, `DocFileSuite()` creates a `unittest.TestSuite` out of
`doctest.DocFileCase` instances, and `DocFileCase` is a subclass
of `DocTestCase`.

So both ways of creating a `unittest.TestSuite` run instances of
`DocTestCase`.  This is important for a subtle reason: when you run
`doctest` functions yourself, you can control the `doctest` options in
use directly, by passing option flags to `doctest` functions.  However, if
you're writing a `unittest` framework, `unittest` ultimately controls
when and how tests get run.  The framework author typically wants to control
`doctest` reporting options (perhaps, e.g., specified by command line
options), but there's no way to pass <example-value> through `unittest` to
`doctest` test runners.

For this reason, `doctest` also supports a notion of `doctest`
reporting flags specific to `unittest` support, via this function:

### `set_unittest_reportflags(flags)`

Set the `doctest` reporting flags to use.

Argument *flags* takes the bitwise OR of option flags.  See
section doctest-options.  Only "reporting flags" can be used.

This is a module-global setting, and affects all future doctests run by module
`unittest`:  the `runTest()` method of `DocTestCase` looks at
the option flags specified for the test case when the `DocTestCase`
instance was constructed.  If no reporting flags were specified (which is the
typical and expected case), `doctest`'s `unittest` reporting flags are
bitwise ORed into the option flags, and the option flags
so augmented are passed to the `DocTestRunner` instance created to
run the doctest.  If any reporting flags were specified when the
`DocTestCase` instance was constructed, `doctest`'s
`unittest` reporting flags are ignored.

The value of the `unittest` reporting flags in effect before the function
was called is returned by the function.
