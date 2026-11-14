# inkex.utils

Basic common utility functions for calculated things

## get_user_directory

```python
def get_user_directory()
```

Return the user directory where extensions are stored.

.. versionadded:: 1.1

## get_inkscape_directory

```python
def get_inkscape_directory()
```

Return the system directory where inkscape's core is.

.. versionadded:: 1.1

## class KeyDict

```python
class KeyDict(dict)
```

A normal dictionary, except asking for anything not in the dictionary
always returns the key itself. This is used for translation dictionaries.

## parse_percent

```python
def parse_percent(val: str)
```

Parse strings that are either values (i.e., '3.14159') or percentages
(i.e. '75%') to a float.

.. versionadded:: 1.2

## Boolean

```python
def Boolean(value)
```

ArgParser function to turn a boolean string into a python boolean

## to_bytes

```python
def to_bytes(content)
```

Ensures the content is bytes

.. versionadded:: 1.1

## debug

```python
def debug(what)
```

Print debug message if debugging is switched on

## do_nothing

```python
def do_nothing(*args, **kwargs): # pylint: disable=unused-argument """A blank function to do nothing .. versionadded:: 1.1""" def errormsg(msg)
```

Intended for end-user-visible error messages.

(Currently just writes to stderr with an appended newline, but could do
something better in future: e.g. could add markup to distinguish error
messages from status messages or debugging output.)

Note that this should always be combined with translation::

  import inkex
  ...
  inkex.errormsg(_("This extension requires two selected paths."))

## errormsg

```python
def errormsg(msg)
```

Intended for end-user-visible error messages.

(Currently just writes to stderr with an appended newline, but could do
something better in future: e.g. could add markup to distinguish error
messages from status messages or debugging output.)

Note that this should always be combined with translation::

  import inkex
  ...
  inkex.errormsg(_("This extension requires two selected paths."))

## class AbortExtension

```python
class AbortExtension(Exception)
```

Raised to print a message to the user without backtrace

## class DependencyError

```python
class DependencyError(NotImplementedError)
```

Raised when we need an external python module that isn't available

## class FragmentError

```python
class FragmentError(Exception)
```

Raised when trying to do rooty things on an xml fragment

## strargs

```python
def strargs(string, kind=float)
```

Returns a list of floats from a string

.. versionchanged:: 1.1
    also splits at -(minus) signs by adding a space in front of the - sign

.. versionchanged:: 1.2
    Full support for the `SVG Path data BNF
    <https://www.w3.org/Graphics/SVG/1.1/paths.html#PathDataBNF>`_

## filename_arg

```python
def filename_arg(name)
```

Existing file to read or option used in script arguments

## circular_pairwise

```python
def circular_pairwise(l)
```

Iterate over a list with overlapping pairs in a periodic way, i.e.
[1, 2, 3] -> [(1, 2), (2, 3), (3, 1)]

..versionadded:: 1.3.1

## math_eval

```python
def math_eval(function, variable="x")
```

Interpret a function string. All functions from math and random may be used.

.. versionadded:: 1.1

Returns:
    a lambda expression if sucessful; otherwise None.

## is_number

```python
def is_number(string)
```

Checks if a value is a number

.. versionadded:: 1.2

## rational_limit

```python
def rational_limit(f: np.poly1d, g: np.poly1d, t0)
```

Computes the limit of the rational function (f/g)(t)
as t approaches t0.

.. versionadded:: 1.4

## class NotifyList

```python
class NotifyList(list)
```

A list that calls a callback after it is modified
(to notify a parent about the modification).
Modified from https://stackoverflow.com/a/13259435/3298143

.. versionadded:: 1.4

## NotifyList.toggle

```python
def toggle(self, value)
```

If exists, remove it, if not, add it

## class NotifyOrderedDict

```python
class NotifyOrderedDict(OrderedDict)
```

An OrderedDict that notifies a callback after a value is changed

.. versionadded:: 1.4

## class NotifyDefaultDict

```python
class NotifyDefaultDict(defaultdict)
```

A defaultdict that notifies a callback after a value is changed

.. versionadded:: 1.4