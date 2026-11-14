---
title: "doctest --- Test interactive Python examples (part 3 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/doctest.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# doctest --- Test interactive Python examples (part 3 of 6)

### `FAIL_FAST`

When specified, exit after the first failing example and don't attempt to run
the remaining examples. Thus, the number of failures reported will be at most
1.  This flag may be useful during debugging, since examples after the first
failure won't even produce debugging output.

### `REPORTING_FLAGS`

A bitmask or'ing together all the reporting flags above.

There is also a way to register new option flag names, though this isn't
useful unless you intend to extend `doctest` internals via subclassing:

### `register_optionflag(name)`

Create a new option flag with a given name, and return the new flag's integer
value.  `register_optionflag()` can be used when subclassing
`OutputChecker` or `DocTestRunner` to create new options that are
supported by your subclasses.  `register_optionflag()` should always be
called using the following idiom:

```
MY_FLAG = register_optionflag('MY_FLAG')
```

### Directives

Doctest directives may be used to modify the :ref:`option flags
<doctest-options>` for an individual example.  Doctest directives are
special Python comments following an example's source code:

```text
doctest
directive: "#" "doctest:" `directive_options`
directive_options: `directive_option` ("," `directive_option`)*
directive_option: `on_or_off` `directive_option_name`
on_or_off: "+" | "-"
directive_option_name: "DONT_ACCEPT_BLANKLINE" | "NORMALIZE_WHITESPACE" | ...
```

Whitespace is not allowed between the `+` or `-` and the directive option
name.  The directive option name can be any of the option flag names explained
above.

An example's doctest directives modify doctest's behavior for that single
example.  Use `+` to enable the named behavior, or `-` to disable it.

For example, this test passes:

```python

>>> print(list(range(20)))  # doctest: +NORMALIZE_WHITESPACE
[0,   1,  2,  3,  4,  5,  6,  7,  8,  9,
10,  11, 12, 13, 14, 15, 16, 17, 18, 19]
```

Without the directive it would fail, both because the actual output doesn't have
two blanks before the single-digit list elements, and because the actual output
is on a single line.  This test also passes, and also requires a directive to do
so:

```python

>>> print(list(range(20)))  # doctest: +ELLIPSIS
[0, 1, ..., 18, 19]
```

Multiple directives can be used on a single physical line, separated by
commas:

```python

>>> print(list(range(20)))  # doctest: +ELLIPSIS, +NORMALIZE_WHITESPACE
[0,    1, ...,   18,    19]
```

If multiple directive comments are used for a single example, then they are
combined:

```python

>>> print(list(range(20)))  # doctest: +ELLIPSIS
...                         # doctest: +NORMALIZE_WHITESPACE
[0,    1, ...,   18,    19]
```

As the previous example shows, you can add `...` lines to your example
containing only directives.  This can be useful when an example is too long for
a directive to comfortably fit on the same line:

```python

>>> print(list(range(5)) + list(range(10, 20)) + list(range(30, 40)))
... # doctest: +ELLIPSIS
[0, ..., 4, 10, ..., 19, 30, ..., 39]
```

Note that since all options are disabled by default, and directives apply only
to the example they appear in, enabling options (via `+` in a directive) is
usually the only meaningful choice.  However, option flags can also be passed to
functions that run doctests, establishing different defaults.  In such cases,
disabling an option via `-` in a directive can be useful.

### Warnings

`doctest` is serious about requiring exact matches in expected output.  If
even a single character doesn't match, the test fails.  This will probably
surprise you a few times, as you learn exactly what Python does and doesn't
guarantee about output.  For example, when printing a set, Python doesn't
guarantee that the element is printed in any particular order, so a test like:

```
>>> foo()
{"spam", "eggs"}
```

is vulnerable!  One workaround is to do:

```
>>> foo() == {"spam", "eggs"}
True
```

instead.  Another is to do:

```
>>> d = sorted(foo())
>>> d
['eggs', 'spam']
```

There are others, but you get the idea.

Another bad idea is to print things that embed an object address, like

```python

>>> id(1.0)  # certain to fail some of the time  # doctest: +SKIP
7948648
>>> class C: pass
>>> C()  # the default repr() for instances embeds an address   # doctest: +SKIP
<C object at 0x00AC18F0>
```

The `ELLIPSIS` directive gives a nice approach for the last example:

```python

>>> C()  # doctest: +ELLIPSIS
<C object at 0x...>
```

Floating-point numbers are also subject to small output variations across
platforms, because Python defers to the platform C library for some
floating-point calculations, and C libraries vary widely in quality here.:

```
>>> 1000**0.1  # risky
1.<example-card-number>
>>> round(1000**0.1, 9) # safer
1.995262315
>>> print(f'{1000**0.1:.4f}') # much safer
1.9953
```

Numbers of the form `I/2.**J` are safe across all platforms, and I often
contrive doctest examples to produce numbers of that form:

```
>>> 3./4  # utterly safe
0.75
```

Simple fractions are also easier for people to understand, and that makes for
better documentation.

## Basic API

The functions `testmod()` and `testfile()` provide a simple interface to
doctest that should be sufficient for most basic uses.  For a less formal
introduction to these two functions, see sections doctest-simple-testmod
and doctest-simple-testfile.

### `testfile(filename, module_relative=True, name=None, package=None, globs=None, verbose=None, report=True, optionflags=0, extraglobs=None, raise_on_error=False, parser=DocTestParser(), encoding=None)`

All arguments except *filename* are optional, and should be specified in keyword
form.

Test examples in the file named *filename*.  Return ``(failure_count,
test_count)``.

Optional argument *module_relative* specifies how the filename should be
interpreted:

- If *module_relative* is `True` (the default), then *filename* specifies an
OS-independent module-relative path.  By default, this path is relative to the
calling module's directory; but if the *package* argument is specified, then it
is relative to that package.  To ensure OS-independence, *filename* should use
`/` characters to separate path segments, and may not be an absolute path
(i.e., it may not begin with `/`).

- If *module_relative* is `False`, then *filename* specifies an OS-specific
path.  The path may be absolute or relative; relative paths are resolved with
respect to the current working directory.

Optional argument *name* gives the name of the test; by default, or if `None`,
`os.path.basename(filename)` is used.

Optional argument *package* is a Python package or the name of a Python package
whose directory should be used as the base directory for a module-relative
filename.  If no package is specified, then the calling module's directory is
used as the base directory for module-relative filenames.  It is an error to
specify *package* if *module_relative* is `False`.

Optional argument *globs* gives a dict to be used as the globals when executing
examples.  A new shallow copy of this dict is created for the doctest, so its
examples start with a clean slate. By default, or if `None`, a new empty dict
is used.

Optional argument *extraglobs* gives a dict merged into the globals used to
execute examples.  This works like `dict.update()`:  if *globs* and
*extraglobs* have a common key, the associated value in *extraglobs* appears in
the combined dict.  By default, or if `None`, no extra globals are used.  This
is an advanced feature that allows parameterization of doctests.  For example, a
doctest can be written for a base class, using a generic name for the class,
then reused to test any number of subclasses by passing an *extraglobs* dict
mapping the generic name to the subclass to be tested.

Optional argument *verbose* prints lots of stuff if true, and prints only
failures if false; by default, or if `None`, it's true if and only if `'-v'`
is in `sys.argv`.

Optional argument *report* prints a summary at the end when true, else prints
nothing at the end.  In verbose mode, the summary is detailed, else the summary
is very brief (in fact, empty if all tests passed).

Optional argument *optionflags* (default value `0`) takes the
bitwise OR of option flags.
See section doctest-options.

Optional argument *raise_on_error* defaults to false.  If true, an exception is
raised upon the first failure or unexpected exception in an example.  This
allows failures to be post-mortem debugged. Default behavior is to continue
running examples.

Optional argument *parser* specifies a `DocTestParser` (or subclass) that
should be used to extract tests from the files.  It defaults to a normal parser
(i.e., `DocTestParser()`).

Optional argument *encoding* specifies an encoding that should be used to
convert the file to unicode.

### `testmod(m=None, name=None, globs=None, verbose=None, report=True, optionflags=0, extraglobs=None, raise_on_error=False, exclude_empty=False)`

All arguments are optional, and all except for *m* should be specified in
keyword form.

Test examples in docstrings in functions and classes reachable from module *m*
(or module `__main__` if *m* is not supplied or is `None`), starting with
`m.__doc__`.

Also test examples reachable from dict `m.__test__`, if it exists.
`m.__test__` maps names (strings) to functions, classes and
strings; function and class docstrings are searched for examples; strings are
searched directly, as if they were docstrings.

Only docstrings attached to objects belonging to module *m* are searched.

Return `(failure_count, test_count)`.

Optional argument *name* gives the name of the module; by default, or if
`None`, `m.__name__` is used.

Optional argument *exclude_empty* defaults to false.  If true, objects for which
no doctests are found are excluded from consideration. The default is a backward
compatibility hack, so that code still using
`doctest.master.summarize()` in
conjunction with `testmod()` continues to get output for objects with no
tests. The *exclude_empty* argument to the newer `DocTestFinder`
constructor defaults to true.

Optional arguments *extraglobs*, *verbose*, *report*, *optionflags*,
*raise_on_error*, and *globs* are the same as for function `testfile()`
above, except that *globs* defaults to `m.__dict__`.

### `run_docstring_examples(f, globs, verbose=False, name="NoName", compileflags=None, optionflags=0)`

Test examples associated with object *f*; for example, *f* may be a string,
a module, a function, or a class object.

A shallow copy of dictionary argument *globs* is used for the execution context.

Optional argument *name* is used in failure messages, and defaults to
`"NoName"`.

If optional argument *verbose* is true, output is generated even if there are no
failures.  By default, output is generated only in case of an example failure.

Optional argument *compileflags* gives the set of flags that should be used by
the Python compiler when running the examples.  By default, or if `None`,
flags are deduced corresponding to the set of future features found in *globs*.

Optional argument *optionflags* works as for function `testfile()` above.
