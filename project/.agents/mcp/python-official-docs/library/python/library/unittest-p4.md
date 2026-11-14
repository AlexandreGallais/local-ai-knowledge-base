---
title: "unittest --- Unit testing framework (part 4 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/unittest.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# unittest --- Unit testing framework (part 4 of 7)

### `assertRaisesRegex(exception, regex, callable, *args, **kwds)`

```python
assertRaisesRegex(exception, regex, *, msg=None)
```

Like `assertRaises()` but also tests that *regex* matches
on the string representation of the raised exception.  *regex* may be
a regular expression object or a string containing a regular expression
suitable for use by `re.search()`.  Examples:

```
self.assertRaisesRegex(ValueError, "invalid literal for.*XYZ'$",
                       int, 'XYZ')
```

or:

```
with self.assertRaisesRegex(ValueError, 'literal'):
   int('XYZ')
```

> *Added in version 3.1.*
> Added under the name `assertRaisesRegexp`.

> *Changed in version 3.2.*
> Renamed to `assertRaisesRegex()`.

> *Changed in version 3.3.*
> Added the *msg* keyword argument when used as a context manager.

### `assertWarns(warning, callable, *args, **kwds)`

```python
assertWarns(warning, *, msg=None)
```

Test that a warning is triggered when *callable* is called with any
positional or keyword arguments that are also passed to
`assertWarns()`.  The test passes if *warning* is triggered and
fails if it isn't.  Any exception is an error.
To catch any of a group of warnings, a tuple containing the warning
classes may be passed as *warnings*.

If only the *warning* and possibly the *msg* arguments are given,
return a context manager so that the code under test can be written
inline rather than as a function:

```
with self.assertWarns(SomeWarning):
    do_something()
```

When used as a context manager, `assertWarns()` accepts the
additional keyword argument *msg*.

The context manager will store the caught warning object in its
`warning` attribute, and the source line which triggered the
warnings in the `filename` and `lineno` attributes.
This can be useful if the intention is to perform additional checks
on the warning caught:

```
with self.assertWarns(SomeWarning) as cm:
    do_something()

self.assertIn('myfile.py', cm.filename)
self.assertEqual(320, cm.lineno)
```

The context managers can be nested to test that multiple different
warnings are emitted:

```
with (self.assertWarns(SomeWarning),
      self.assertWarns(OtherWarning)):
    do_something()
```

This method works regardless of the warning filters in place when it
is called.

> *Added in version 3.2.*

> *Changed in version 3.3.*
> Added the *msg* keyword argument when used as a context manager.

> *Changed in version 3.15.*
> Warnings that do not match the specified category are no longer
> swallowed.
> Nested context managers are now supported.

### `assertWarnsRegex(warning, regex, callable, *args, **kwds)`

```python
assertWarnsRegex(warning, regex, *, msg=None)
```

Like `assertWarns()` but also tests that *regex* matches on the
message of the triggered warning.  *regex* may be a regular expression
object or a string containing a regular expression suitable for use
by `re.search()`.  Example:

```
self.assertWarnsRegex(DeprecationWarning,
                      r'legacy_function\(\) is deprecated',
                      legacy_function, 'XYZ')
```

or:

```
with self.assertWarnsRegex(RuntimeWarning, 'unsafe frobnicating'):
    frobnicate('<example-value>')
```

The context managers can be nested to test that multiple different
warnings are emitted:

```
with (self.assertWarns(SomeWarning, regex1),
      self.assertWarns(OtherWarning, regex2)):
    do_something()
```

> *Added in version 3.2.*

> *Changed in version 3.3.*
> Added the *msg* keyword argument when used as a context manager.

> *Changed in version 3.15.*
> Warnings that do not match the specified category or regex are
> no longer swallowed.
> Nested context managers are now supported.

### `assertLogs(logger=None, level=None, formatter=None)`

A context manager to test that at least one message is logged on
the *logger* or one of its children, with at least the given
*level*.

If given, *logger* should be a `logging.Logger` object or a
`str` giving the name of a logger.  The default is the root
logger, which will catch all messages that were not blocked by a
non-propagating descendent logger.

If given, *level* should be either a numeric logging level or
its string equivalent (for example either `"ERROR"` or
`logging.ERROR`).  The default is `logging.INFO`.

If given, *formatter* should be a `logging.Formatter` object.
The default is a formatter with format string
`"%(levelname)s:%(name)s:%(message)s"`

The test passes if at least one message emitted inside the `with`
block matches the *logger* and *level* conditions, otherwise it fails.

The object returned by the context manager is a recording helper
which keeps tracks of the matching log messages.  It has two
attributes:

### `records`

A list of `logging.LogRecord` objects of the matching
log messages.

### `output`

A list of `str` objects with the formatted output of
matching messages.

Example:

```
with self.assertLogs('foo', level='INFO') as cm:
    logging.getLogger('foo').info('first message')
    logging.getLogger('foo.bar').error('second message')
self.assertEqual(cm.output, ['INFO:foo:first message',
                             'ERROR:foo.bar:second message'])
```

> *Added in version 3.4.*

> *Changed in version 3.15.*
> Now accepts a *formatter* to control how messages are formatted.

### `assertNoLogs(logger=None, level=None)`

A context manager to test that no messages are logged on
the *logger* or one of its children, with at least the given
*level*.

If given, *logger* should be a `logging.Logger` object or a
`str` giving the name of a logger.  The default is the root
logger, which will catch all messages.

If given, *level* should be either a numeric logging level or
its string equivalent (for example either `"ERROR"` or
`logging.ERROR`).  The default is `logging.INFO`.

Unlike `assertLogs()`, nothing will be returned by the context
manager.

> *Added in version 3.10.*

There are also other methods used to perform more specific checks, such as:

```text
+---------------------------------------+--------------------------------+--------------+
| Method                                | Checks that                    | New in       |
+=======================================+================================+==============+
| :meth:`assertAlmostEqual(a, b)        | ``round(a-b, 7) == 0``         |              |
| <TestCase.assertAlmostEqual>`         |                                |              |
+---------------------------------------+--------------------------------+--------------+
| :meth:`assertNotAlmostEqual(a, b)     | ``round(a-b, 7) != 0``         |              |
| <TestCase.assertNotAlmostEqual>`      |                                |              |
+---------------------------------------+--------------------------------+--------------+
| :meth:`assertGreater(a, b)            | ``a > b``                      | 3.1          |
| <TestCase.assertGreater>`             |                                |              |
+---------------------------------------+--------------------------------+--------------+
| :meth:`assertGreaterEqual(a, b)       | ``a >= b``                     | 3.1          |
| <TestCase.assertGreaterEqual>`        |                                |              |
+---------------------------------------+--------------------------------+--------------+
| :meth:`assertLess(a, b)               | ``a < b``                      | 3.1          |
| <TestCase.assertLess>`                |                                |              |
+---------------------------------------+--------------------------------+--------------+
| :meth:`assertLessEqual(a, b)          | ``a <= b``                     | 3.1          |
| <TestCase.assertLessEqual>`           |                                |              |
+---------------------------------------+--------------------------------+--------------+
| :meth:`assertRegex(s, r)              | ``r.search(s)``                | 3.1          |
| <TestCase.assertRegex>`               |                                |              |
+---------------------------------------+--------------------------------+--------------+
| :meth:`assertNotRegex(s, r)           | ``not r.search(s)``            | 3.2          |
| <TestCase.assertNotRegex>`            |                                |              |
+---------------------------------------+--------------------------------+--------------+
| :meth:`assertCountEqual(a, b)         | *a* contains the same elements | 3.2          |
| <TestCase.assertCountEqual>`          | as *b*, regardless of their    |              |
|                                       | order.                         |              |
+---------------------------------------+--------------------------------+--------------+
| :meth:`assertStartsWith(a, b)         | ``a.startswith(b)``            | 3.14         |
| <TestCase.assertStartsWith>`          |                                |              |
+---------------------------------------+--------------------------------+--------------+
| :meth:`assertNotStartsWith(a, b)      | ``not a.startswith(b)``        | 3.14         |
| <TestCase.assertNotStartsWith>`       |                                |              |
+---------------------------------------+--------------------------------+--------------+
| :meth:`assertEndsWith(a, b)           | ``a.endswith(b)``              | 3.14         |
| <TestCase.assertEndsWith>`            |                                |              |
+---------------------------------------+--------------------------------+--------------+
| :meth:`assertNotEndsWith(a, b)        | ``not a.endswith(b)``          | 3.14         |
| <TestCase.assertNotEndsWith>`         |                                |              |
+---------------------------------------+--------------------------------+--------------+
| :meth:`assertHasAttr(a, b)            | ``hasattr(a, b)``              | 3.14         |
| <TestCase.assertHasAttr>`             |                                |              |
+---------------------------------------+--------------------------------+--------------+
| :meth:`assertNotHasAttr(a, b)         | ``not hasattr(a, b)``          | 3.14         |
| <TestCase.assertNotHasAttr>`          |                                |              |
+---------------------------------------+--------------------------------+--------------+
```

### `assertAlmostEqual(first, second, places=7, msg=None, delta=None)`

```python
assertNotAlmostEqual(first, second, places=7, msg=None, delta=None)
```

Test that *first* and *second* are approximately (or not approximately)
equal by computing the difference, rounding to the given number of
decimal *places* (default 7), and comparing to zero.  Note that these
methods round the values to the given number of *decimal places* (i.e.
like the `round()` function) and not *significant digits*.

If *delta* is supplied instead of *places* then the difference
between *first* and *second* must be less or equal to (or greater than) *delta*.

Supplying both *delta* and *places* raises a `TypeError`.

> *Changed in version 3.2.*
> `assertAlmostEqual()` automatically considers almost equal objects
> that compare equal.  `assertNotAlmostEqual()` automatically fails
> if the objects compare equal.  Added the *delta* keyword argument.

### `assertGreater(first, second, msg=None)`

```python
assertGreaterEqual(first, second, msg=None)
assertLess(first, second, msg=None)
assertLessEqual(first, second, msg=None)
```

Test that *first* is respectively >, >=, < or <= than *second* depending
on the method name.  If not, the test will fail:

```
>>> self.assertGreaterEqual(3, 4)
AssertionError: "3" unexpectedly not greater than or equal to "4"
```

> *Added in version 3.1.*

### `assertRegex(text, regex, msg=None)`

```python
assertNotRegex(text, regex, msg=None)
```

Test that a *regex* search matches (or does not match) *text*.  In case
of failure, the error message will include the pattern and the *text* (or
the pattern and the part of *text* that unexpectedly matched).  *regex*
may be a regular expression object or a string containing a regular
expression suitable for use by `re.search()`.

> *Added in version 3.1.*
> Added under the name `assertRegexpMatches`.

> *Changed in version 3.2.*
> The method `assertRegexpMatches()` has been renamed to
> `.assertRegex()`.

> *Added in version 3.2.*
> `.assertNotRegex()`.

### `assertCountEqual(first, second, msg=None)`

Test that sequence *first* contains the same elements as *second*,
regardless of their order. When they don't, an error message listing the
differences between the sequences will be generated.

Duplicate elements are *not* ignored when comparing *first* and
*second*. It verifies whether each element has the same count in both
sequences. Equivalent to:
`assertEqual(Counter(list(first)), Counter(list(second)))`
but works with sequences of unhashable objects as well.

> *Added in version 3.2.*

### `assertNotStartsWith(s, prefix, msg=None)`

Test that the Unicode or byte string *s* starts (or does not start)
with a *prefix*.
*prefix* can also be a tuple of strings to try.

> *Added in version 3.14.*

### `assertNotEndsWith(s, suffix, msg=None)`

Test that the Unicode or byte string *s* ends (or does not end)
with a *suffix*.
*suffix* can also be a tuple of strings to try.

> *Added in version 3.14.*

### `assertNotHasAttr(obj, name, msg=None)`

Test that the object *obj* has (or has not) an attribute *name*.

> *Added in version 3.14.*

The `assertEqual()` method dispatches the equality check for objects of
the same type to different type-specific methods.  These methods are already
implemented for most of the built-in types, but it's also possible to
register new methods using `addTypeEqualityFunc()`:
