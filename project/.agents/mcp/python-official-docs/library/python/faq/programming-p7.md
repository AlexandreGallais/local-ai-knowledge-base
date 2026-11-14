---
title: "Programming FAQ (part 7 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/faq/programming.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Programming FAQ (part 7 of 7)

### When can I rely on identity tests with the *is* operator?

The `is` operator tests for object identity.  The test `a is b` is
equivalent to `id(a) == id(b)`.

The most important property of an identity test is that an object is always
identical to itself, `a is a` always returns `True`.  Identity tests are
usually faster than equality tests.  And unlike equality tests, identity tests
are guaranteed to return a boolean `True` or `False`.

However, identity tests can *only* be substituted for equality tests when
object identity is assured.  Generally, there are three circumstances where
identity is guaranteed:

1) Assignments create new names but do not change object identity.  After the
assignment `new = old`, it is guaranteed that `new is old`.

2) Putting an object in a container that stores object references does not
change object identity.  After the list assignment `s[0] = x`, it is
guaranteed that `s[0] is x`.

3) If an object is a singleton, it means that only one instance of that object
can exist.  After the assignments `a = None` and `b = None`, it is
guaranteed that `a is b` because `None` is a singleton.

In most other circumstances, identity tests are inadvisable and equality tests
are preferred.  In particular, identity tests should not be used to check
constants such as `int` and `str` which aren't guaranteed to be
singletons:

```
>>> a = 10_000_000
>>> b = 5_000_000
>>> c = b + 5_000_000
>>> a is c
False

>>> a = 'Python'
>>> b = 'Py'
>>> c = b + 'thon'
>>> a is c
False
```

Likewise, new instances of mutable containers are never identical:

```
>>> a = []
>>> b = []
>>> a is b
False
```

In the standard library code, you will see several common patterns for
correctly using identity tests:

1) As recommended by PEP 8, an identity test is the preferred way to check
for `None`.  This reads like plain English in code and avoids confusion
with other objects that may have boolean values that evaluate to false.

2) Detecting optional arguments can be tricky when `None` is a valid input
value.  In those situations, you can create a singleton sentinel object
guaranteed to be distinct from other objects.  For example, here is how
to implement a method that behaves like `dict.pop()`:

```python
_sentinel = sentinel('_sentinel')

def pop(self, key, default=_sentinel):
    if key in self:
        value = self[key]
        del self[key]
        return value
    if default is _sentinel:
        raise KeyError(key)
    return default
```

3) Container implementations sometimes need to augment equality tests with
identity tests.  This prevents the code from being confused by objects
such as `float('NaN')` that are not equal to themselves.

For example, here is the implementation of
`collections.abc.Sequence.__contains__()`:

```
def __contains__(self, value):
    for v in self:
        if v is value or v == value:
            return True
    return False
```

### How can a subclass control what data is stored in an immutable instance?

When subclassing an immutable type, override the `__new__()` method
instead of the `__init__()` method.  The latter only runs *after* an
instance is created, which is too late to alter data in an immutable
instance.

All of these immutable classes have a different signature than their
parent class:

```python

import datetime as dt

class FirstOfMonthDate(dt.date):
    "Always choose the first day of the month"
    def __new__(cls, year, month, day):
        return super().__new__(cls, year, month, 1)

class NamedInt(int):
    "Allow text names for some numbers"
    xlat = {'zero': 0, 'one': 1, 'ten': 10}
    def __new__(cls, value):
        value = cls.xlat.get(value, value)
        return super().__new__(cls, value)

class TitleStr(str):
    "Convert str to name suitable for a URL path"
    def __new__(cls, s):
        s = s.lower().replace(' ', '-')
        s = ''.join([c for c in s if c.isalnum() or c == '-'])
        return super().__new__(cls, s)
```

The classes can be used like this:

```python

>>> FirstOfMonthDate(2012, 2, 14)
FirstOfMonthDate(2012, 2, 1)
>>> NamedInt('ten')
10
>>> NamedInt(20)
20
>>> TitleStr('Blog: Why Python Rocks')
'blog-why-python-rocks'
```

### How do I cache method calls?

The two principal tools for caching methods are
functools.cached_property and functools.lru_cache.  The
former stores results at the instance level and the latter at the class
level.

The `cached_property` approach only works with methods that do not take
any arguments.  It does not create a reference to the instance.  The
cached method result will be kept only as long as the instance is alive.

The advantage is that when an instance is no longer used, the cached
method result will be released right away.  The disadvantage is that if
instances accumulate, so too will the accumulated method results.  They
can grow without bound.

The `lru_cache` approach works with methods that have hashable
arguments.  It creates a reference to the instance unless special
efforts are made to pass in weak references.

The advantage of the least recently used algorithm is that the cache is
bounded by the specified *maxsize*.  The disadvantage is that instances
are kept alive until they age out of the cache or until the cache is
cleared.

This example shows the various techniques:

```
class Weather:
    "Lookup weather information on a government website"

    def __init__(self, station_id):
        self._station_id = station_id
        # The _station_id is private and immutable

    def current_temperature(self):
        "Latest hourly observation"
        # Do not cache this because old results
        # can be out of date.

    @cached_property
    def location(self):
        "Return the longitude/latitude coordinates of the station"
        # Result only depends on the station_id

    @lru_cache(maxsize=20)
    def historic_rainfall(self, date, units='mm'):
        "Rainfall on a given date"
        # Depends on the station_id, date, and units.
```

The above example assumes that the *station_id* never changes.  If the
relevant instance attributes are mutable, the `cached_property` approach
can't be made to work because it cannot detect changes to the
attributes.

To make the `lru_cache` approach work when the *station_id* is mutable,
the class needs to define the `__eq__() and hash__()`
methods so that the cache can detect relevant attribute updates:

```
class Weather:
    "Example with a mutable station identifier"

    def __init__(self, station_id):
        self.station_id = station_id

    def change_station(self, station_id):
        self.station_id = station_id

    def __eq__(self, other):
        return self.station_id == other.station_id

    def __hash__(self):
        return hash(self.station_id)

    @lru_cache(maxsize=20)
    def historic_rainfall(self, date, units='cm'):
        'Rainfall on a given date'
        # Depends on the station_id, date, and units.
```

## Modules

### How do I create a .pyc file?

When a module is imported for the first time (or when the source file has
changed since the current compiled file was created) a `.pyc` file containing
the compiled code should be created in a `__pycache__` subdirectory of the
directory containing the `.py` file.  The `.pyc` file will have a
filename that starts with the same name as the `.py` file, and ends with
`.pyc`, with a middle component that depends on the particular `python`
binary that created it.  (See PEP 3147 for details.)

One reason that a `.pyc` file may not be created is a permissions problem
with the directory containing the source file, meaning that the `__pycache__`
subdirectory cannot be created. This can happen, for example, if you develop as
one user but run as another, such as if you are testing with a web server.

Unless the `PYTHONDONTWRITEBYTECODE` environment variable is set,
creation of a .pyc file is automatic if you're importing a module and Python
has the ability (permissions, free space, and so on) to create a `__pycache__`
subdirectory and write the compiled module to that subdirectory.

Running Python on a top-level script is not considered an import and no
`.pyc` will be created.  For example, if you have a top-level module
`foo.py` that imports another module `xyz.py`, when you run `foo` (by
typing `python foo.py` as a shell command), a `.pyc` will be created for
`xyz` because `xyz` is imported, but no `.pyc` file will be created for
`foo` since `foo.py` isn't being imported.

If you need to create a `.pyc` file for `foo` -- that is, to create a
`.pyc` file for a module that is not imported -- you can, using the
`py_compile` and `compileall` modules.

The `py_compile` module can manually compile any module.  One way is to use
the `compile()` function in that module interactively:

```
>>> import py_compile
>>> py_compile.compile('foo.py')                 # doctest: +SKIP
```

This will write the `.pyc` to a `__pycache__` subdirectory in the same
location as `foo.py` (or you can override that with the optional parameter
*cfile*).

You can also automatically compile all files in a directory or directories using
the `compileall` module.  You can do it from the shell prompt by running
`compileall.py` and providing the path of a directory containing Python files
to compile:

```
python -m compileall .
```

### How do I find the current module name?

A module can find out its own module name by looking at the predefined global
variable `__name__`.  If this has the value `'__main__'`, the program is
running as a script.  Many modules that are usually used by importing them also
provide a command-line interface or a self-test, and only execute this code
after checking `__name__`:

```
def main():
    print('Running test...')
    ...

if __name__ == '__main__':
    main()
```

### How can I have modules that mutually import each other?

Suppose you have the following modules:

`foo.py`:

```
from bar import bar_var
foo_var = 1
```

`bar.py`:

```
from foo import foo_var
bar_var = 2
```

The problem is that the interpreter will perform the following steps:

- main imports `foo`
- Empty globals for `foo` are created
- `foo` is compiled and starts executing
- `foo` imports `bar`
- Empty globals for `bar` are created
- `bar` is compiled and starts executing
- `bar` imports `foo` (which is a no-op since there already is a module named `foo`)
- The import mechanism tries to read `foo_var` from `foo` globals, to set `bar.foo_var = foo.foo_var`

The last step fails, because Python isn't done with interpreting `foo` yet and
the global symbol dictionary for `foo` is still empty.

The same thing happens when you use `import foo`, and then try to access
`foo.foo_var` in global code.

There are (at least) three possible workarounds for this problem.

Guido van Rossum recommends avoiding all uses of `from <module> import ...`,
and placing all code inside functions.  Initializations of global variables and
class variables should use constants or built-in functions only.  This means
everything from an imported module is referenced as `<module>.<name>`.

Jim Roskind suggests performing steps in the following order in each module:

- exports (globals, functions, and classes that don't need imported base
classes)
- `import` statements
- active code (including globals that are initialized from imported values).

Van Rossum doesn't like this approach much because the imports appear in a
strange place, but it does work.

Matthias Urlichs recommends restructuring your code so that the recursive import
is not necessary in the first place.

These solutions are not mutually exclusive.

### __import__('x.y.z') returns <module 'x'>; how do I get z?

Consider using the convenience function `import_module()` from
`importlib` instead:

```
z = importlib.import_module('x.y.z')
```

### When I edit an imported module and reimport it, the changes don't show up.  Why does this happen?

For reasons of efficiency as well as consistency, Python only reads the module
file on the first time a module is imported.  If it didn't, in a program
consisting of many modules where each one imports the same basic <example-value>, the
basic <example-value> would be parsed and re-parsed many times.  To force re-reading of a
changed module, do this:

```
import importlib
import modname
importlib.reload(modname)
```

Warning: this technique is not 100% fool-proof.  In particular, modules
containing statements like:

```
from modname import some_objects
```

will continue to work with the old version of the imported objects.  If the
module contains class definitions, existing class instances will *not* be
updated to use the new class definition.  This can result in the following
paradoxical behaviour:

```
>>> import importlib
>>> import cls
>>> c = cls.C()                # Create an instance of C
>>> importlib.reload(cls)
<module 'cls' from 'cls.py'>
>>> isinstance(c, cls.C)       # isinstance is false?!?
False
```

The nature of the problem is made clear if you print out the "identity" of the
class objects:

```
>>> hex(id(c.__class__))
'0x7352a0'
>>> hex(id(cls.C))
'0x4198d0'
```
