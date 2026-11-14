---
title: "doctest --- Test interactive Python examples (part 1 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/doctest.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `doctest` --- Test interactive Python examples

Module `doctest`.

**Source code:** Lib/doctest.py

The `doctest` module searches for pieces of text that look like interactive
Python sessions, and then executes those sessions to verify that they work
exactly as shown.  There are several common ways to use doctest:

- To check that a module's docstrings are up-to-date by verifying that all
interactive examples still work as documented.

- To perform regression testing by verifying that interactive examples from a
test file or a test object work as expected.

- To write tutorial documentation for a package, liberally illustrated with
input-output examples.  Depending on whether the examples or the expository text
are emphasized, this has the flavor of "literate testing" or "executable
documentation".

Here's a complete but small example module:

```
"""
This is the "example" module.

The example module supplies one function, factorial().  For example,

>>> factorial(5)
120
"""

def factorial(n):
    """Return the factorial of n, an exact integer >= 0.

    >>> [factorial(n) for n in range(6)]
    [1, 1, 2, 6, 24, 120]
    >>> factorial(30)
    265252859812191058636308480000000
    >>> factorial(-1)
    Traceback (most recent call last):
        ...
    ValueError: n must be >= 0

    Factorials of floats are OK, but the float must be an exact integer:
    >>> factorial(30.1)
    Traceback (most recent call last):
        ...
    ValueError: n must be exact integer
    >>> factorial(30.0)
    265252859812191058636308480000000

    It must also not be ridiculously large:
    >>> factorial(1e100)
    Traceback (most recent call last):
        ...
    OverflowError: n too large
    """

    import math
    if not n >= 0:
        raise ValueError("n must be >= 0")
    if math.floor(n) != n:
        raise ValueError("n must be exact integer")
    if n+1 == n:  # catch a value like 1e300
        raise OverflowError("n too large")
    result = 1
    factor = 2
    while factor <= n:
        result *= factor
        factor += 1
    return result

if __name__ == "__main__":
    import doctest
    doctest.testmod()
```

If you run `example.py` directly from the command line, `doctest`
works its magic:

```shell-session
$ python example.py
$
```

There's no output!  That's normal, and it means all the examples worked.  Pass
`-v` to the script, and `doctest` prints a detailed log of what
it's trying, and prints a summary at the end:

```shell-session
$ python example.py -v
Trying:
    factorial(5)
Expecting:
    120
ok
Trying:
    [factorial(n) for n in range(6)]
Expecting:
    [1, 1, 2, 6, 24, 120]
ok
```

And so on, eventually ending with:

```none
Trying:
    factorial(1e100)
Expecting:
    Traceback (most recent call last):
        ...
    OverflowError: n too large
ok
2 items passed all tests:
   1 test in __main__
   6 tests in __main__.factorial
7 tests in 2 items.
7 passed.
Test passed.
$
```

That's all you need to know to start making productive use of `doctest`!
Jump in.  The following sections provide full details.  Note that there are many
examples of doctests in the standard Python test suite and libraries.
Especially useful examples can be found in the standard test file
`Lib/test/test_doctest/test_doctest.py`.

> *Added in version 3.13.*
> Output is colorized by default and can be
> controlled using environment variables.

## Simple Usage: Checking Examples in Docstrings

The simplest way to start using doctest (but not necessarily the way you'll
continue to do it) is to end each module `M` with:

```
if __name__ == "__main__":
    import doctest
    doctest.testmod()
```

`doctest` then examines docstrings in module `M`.

Running the module as a script causes the examples in the docstrings to get
executed and verified:

```
python M.py
```

This won't display anything unless an example fails, in which case the failing
example(s) and the cause(s) of the failure(s) are printed to stdout, and the
final line of output is `***Test Failed*** N failures.`, where *N* is the
number of examples that failed.

Run it with the `-v` switch instead:

```
python M.py -v
```

and a detailed report of all examples tried is printed to standard output, along
with assorted summaries at the end.

You can force verbose mode by passing `verbose=True` to `testmod()`, or
prohibit it by passing `verbose=False`.  In either of those cases,
`sys.argv` is not examined by `testmod()` (so passing `-v` or not
has no effect).

There is also a command line shortcut for running `testmod()`, see section
doctest-cli.

For more information on `testmod()`, see section doctest-basic-api.

## Simple Usage: Checking Examples in a Text File

Another simple application of doctest is testing interactive examples in a text
file.  This can be done with the `testfile()` function:

```
import doctest
doctest.testfile("example.txt")
```

That short script executes and verifies any interactive Python examples
contained in the file `example.txt`.  The file content is treated as if it
were a single giant docstring; the file doesn't need to contain a Python
program!   For example, perhaps `example.txt` contains this:

```none
The ``example`` module
======================

Using ``factorial``
-------------------

This is an example text file in reStructuredText format.  First import
``factorial`` from the ``example`` module:

    >>> from example import factorial

Now use it:

    >>> factorial(6)
    120
```

Running `doctest.testfile("example.txt")` then finds the error in this
documentation:

```
File "./example.txt", line 14, in example.txt
Failed example:
    factorial(6)
Expected:
    120
Got:
    720
```

As with `testmod()`, `testfile()` won't display anything unless an
example fails.  If an example does fail, then the failing example(s) and the
cause(s) of the failure(s) are printed to stdout, using the same format as
`testmod()`.

By default, `testfile()` looks for files in the calling module's directory.
See section doctest-basic-api for a description of the optional arguments
that can be used to tell it to look for files in other locations.

Like `testmod()`, `testfile()`'s verbosity can be set with the
`-v` command-line switch or with the optional keyword argument
*verbose*.

There is also a command line shortcut for running `testfile()`, see section
doctest-cli.

For more information on `testfile()`, see section doctest-basic-api.

## Command-line Usage

The `doctest` module can be invoked as a script from the command line:

```bash
python -m doctest [-v] [-o OPTION] [-f] file [file ...]
```

doctest

### option `-v, --verbose`

Detailed report of all examples tried is printed to standard output,
along with assorted summaries at the end:

```
python -m doctest -v example.py
```

This will import `example.py` as a standalone module and run
`testmod()` on it. Note that this may not work correctly if the
file is part of a package and imports other submodules from that package.

If the file name does not end with `.py`, `doctest` infers
that it must be run with `testfile()` instead:

```
python -m doctest -v example.txt
```

### option `-o, --option <option>`

Option flags control various aspects of doctest's behavior, see section
doctest-options.

> *Added in version 3.4.*

### option `-f, --fail-fast`

This is shorthand for `-o FAIL_FAST`.

> *Added in version 3.4.*
