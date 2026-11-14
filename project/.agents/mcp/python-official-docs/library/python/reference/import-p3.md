---
title: "The import system (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/import.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# The import system (part 3 of 3)

## The Path Based Finder

As mentioned previously, Python comes with several default meta path finders.
One of these, called the path based finder
(`PathFinder`), searches an import path,
which contains a list of path entries.  Each path
entry names a location to search for modules.

The path based finder itself doesn't know how to import anything. Instead, it
traverses the individual path entries, associating each of them with a
path entry finder that knows how to handle that particular kind of path.

The default set of path entry finders implement all the semantics for finding
modules on the file system, handling special file types such as Python source
code (`.py` files), Python byte code (`.pyc` files) and
shared libraries (e.g. `.so` files). When supported by the `zipimport`
module in the standard library, the default path entry finders also handle
loading all of these file types (other than shared libraries) from zipfiles.

Path entries need not be limited to file system locations.  They can refer to
URLs, database queries, or any other location that can be specified as a
string.

The path based finder provides additional hooks and protocols so that you
can extend and customize the types of searchable path entries.  For example,
if you wanted to support path entries as network URLs, you could write a hook
that implements HTTP semantics to find modules on the web.  This hook (a
callable) would return a path entry finder supporting the protocol
described below, which was then used to get a loader for the module from the
web.

A word of warning: this section and the previous both use the term *finder*,
distinguishing between them by using the terms meta path finder and
path entry finder.  These two types of finders are very similar,
support similar protocols, and function in similar ways during the import
process, but it's important to keep in mind that they are subtly different.
In particular, meta path finders operate at the beginning of the import
process, as keyed off the `sys.meta_path` traversal.

By contrast, path entry finders are in a sense an implementation detail
of the path based finder, and in fact, if the path based finder were to be
removed from `sys.meta_path`, none of the path entry finder semantics
would be invoked.

### Path entry finders

The path based finder is responsible for finding and loading
Python modules and packages whose location is specified with a string
path entry.  Most path entries name locations in the file system,
but they need not be limited to this.

As a meta path finder, the path based finder implements the
`find_spec()` protocol previously
described, however it exposes additional hooks that can be used to
customize how modules are found and loaded from the import path.

Three variables are used by the path based finder, `sys.path`,
`sys.path_hooks` and `sys.path_importer_cache`.  The `__path__`
attributes on package objects are also used.  These provide additional ways
that the import machinery can be customized.

`sys.path` contains a list of strings providing search locations for
modules and packages.  It is initialized from the `PYTHONPATH`
environment variable and various other installation- and
implementation-specific defaults.  Entries in `sys.path` can name
directories on the file system, zip files, and potentially other "locations"
(see the `site` module) that should be searched for modules, such as
URLs, or database queries.  Only strings should be present on
`sys.path`; all other data types are ignored.

The path based finder is a meta path finder, so the import
machinery begins the import path search by calling the path
based finder's `find_spec()` method as
described previously.  When the `path` argument to
`find_spec()` is given, it will be a
list of string paths to traverse - typically a package's `__path__`
attribute for an import within that package.  If the `path` argument is
`None`, this indicates a top level import and `sys.path` is used.

The path based finder iterates over every entry in the search path, and
for each of these, looks for an appropriate path entry finder
(`PathEntryFinder`) for the
path entry.  Because this can be an expensive operation (e.g. there may be
`stat()` call overheads for this search), the path based finder maintains
a cache mapping path entries to path entry finders.  This cache is maintained
in `sys.path_importer_cache` (despite the name, this cache actually
stores finder objects rather than being limited to importer objects).
In this way, the expensive search for a particular path entry
location's path entry finder need only be done once.  User code is
free to remove cache entries from `sys.path_importer_cache` forcing
the path based finder to perform the path entry search again.

If the path entry is not present in the cache, the path based finder iterates
over every callable in `sys.path_hooks`.  Each of the :term:`path entry
hooks ` in this list is called with a single argument, the
path entry to be searched.  This callable may either return a :term:`path
entry finder` that can handle the path entry, or it may raise
`ImportError`.  An `ImportError` is used by the path based finder to
signal that the hook cannot find a path entry finder
for that path entry.  The
exception is ignored and import path iteration continues.  The hook
should expect either a string or bytes object; the encoding of bytes objects
is up to the hook (e.g. it may be a file system encoding, UTF-8, or something
else), and if the hook cannot decode the argument, it should raise
`ImportError`.

If `sys.path_hooks` iteration ends with no path entry finder
being returned, then the path based finder's
`find_spec()` method will store `None`
in `sys.path_importer_cache` (to indicate that there is no finder for
this path entry) and return `None`, indicating that this
meta path finder could not find the module.

If a path entry finder *is* returned by one of the :term:`path entry
hook` callables on `sys.path_hooks`, then the following protocol is used
to ask the finder for a module spec, which is then used when loading the
module.

The current working directory -- denoted by an empty string -- is handled
slightly differently from other entries on `sys.path`. First, if the
current working directory cannot be determined or is found not to exist, no
value is stored in `sys.path_importer_cache`. Second, the value for the
current working directory is looked up fresh for each module lookup. Third,
the path used for `sys.path_importer_cache` and returned by
`importlib.machinery.PathFinder.find_spec()` will be the actual current
working directory and not the empty string.

### Path entry finder protocol

In order to support imports of modules and initialized packages and also to
contribute portions to namespace packages, path entry finders must implement
the `find_spec()` method.

`find_spec()` takes two arguments: the
fully qualified name of the module being imported, and the (optional) target
module.  `find_spec()` returns a fully populated spec for the module.
This spec will always have "loader" set (with one exception).

To indicate to the import machinery that the spec represents a namespace
portion, the path entry finder sets `submodule_search_locations` to
a list containing the portion.

> *Changed in version 3.4.*
> `find_spec()` replaced
> `find_loader()` and
> `find_module()`, both of which
> are now deprecated, but will be used if `find_spec()` is not defined.
> Older path entry finders may implement one of these two deprecated methods
> instead of `find_spec()`.  The methods are still respected for the
> sake of backward compatibility.  However, if `find_spec()` is
> implemented on the path entry finder, the legacy methods are ignored.
>
> `find_loader()` takes one argument, the
> fully qualified name of the module being imported.  `find_loader()`
> returns a 2-tuple where the first item is the loader and the second item
> is a namespace portion.
>
> For backwards compatibility with other implementations of the import
> protocol, many path entry finders also support the same,
> traditional `find_module()` method that meta path finders support.
> However path entry finder `find_module()` methods are never called
> with a `path` argument (they are expected to record the appropriate
> path information from the initial call to the path hook).
>
> The `find_module()` method on path entry finders is deprecated,
> as it does not allow the path entry finder to contribute portions to
> namespace packages.  If both `find_loader()` and `find_module()`
> exist on a path entry finder, the import system will always call
> `find_loader()` in preference to `find_module()`.

> *Changed in version 3.10.*
> Calls to `find_module()` and
> `find_loader()` by the import
> system will raise `ImportWarning`.

> *Changed in version 3.12.*
> `find_module()` and `find_loader()` have been removed.

## Replacing the standard import system

The most reliable mechanism for replacing the entire import system is to
delete the default contents of `sys.meta_path`, replacing them
entirely with a custom meta path hook.

If it is acceptable to only alter the behaviour of import statements
without affecting other APIs that access the import system, then replacing
the builtin `__import__()` function may be sufficient.

To selectively prevent the import of some modules from a hook early on the
meta path (rather than disabling the standard import system entirely),
it is sufficient to raise `ModuleNotFoundError` directly from
`find_spec()` instead of returning
`None`. The latter indicates that the meta path search should continue,
while raising an exception terminates it immediately.

## Package Relative Imports

Relative imports use leading dots. A single leading dot indicates a relative
import, starting with the current package. Two or more leading dots indicate a
relative import to the parent(s) of the current package, one level per dot
after the first. For example, given the following package layout:

```
package/
    __init__.py
    subpackage1/
        __init__.py
        moduleX.py
        moduleY.py
    subpackage2/
        __init__.py
        moduleZ.py
    moduleA.py
```

In either `subpackage1/moduleX.py` or `subpackage1/__init__.py`,
the following are valid relative imports:

```
from .moduleY import spam
from .moduleY import spam as ham
from . import moduleY
from ..subpackage1 import moduleY
from ..subpackage2.moduleZ import eggs
from ..moduleA import foo
```

Absolute imports may use either the `import <>` or `from <> import <>`
syntax, but relative imports may only use the second form; the reason
for this is that:

```
import XXX.YYY.ZZZ
```

should expose `XXX.YYY.ZZZ` as a usable expression, but .moduleY is
not a valid expression.

## Special considerations for __main__

The `__main__` module is a special case relative to Python's import
system.  As noted elsewhere, the `__main__` module
is directly initialized at interpreter startup, much like `sys` and
`builtins`.  However, unlike those two, it doesn't strictly
qualify as a built-in module.  This is because the manner in which
`__main__` is initialized depends on the flags and other options with
which the interpreter is invoked.

### __main__.__spec__

Depending on how `__main__` is initialized, `__main__.__spec__`
gets set appropriately or to `None`.

When Python is started with the `-m` option, `__spec__` is set
to the module spec of the corresponding module or package. `__spec__` is
also populated when the `__main__` module is loaded as part of executing a
directory, zipfile or other `sys.path` entry.

In the remaining cases
`__main__.__spec__` is set to `None`, as the code used to populate the
`__main__` does not correspond directly with an importable module:

- interactive prompt
- `-c` option
- running from stdin
- running directly from a source or bytecode file

Note that `__main__.__spec__` is always `None` in the last case,
*even if* the file could technically be imported directly as a module
instead. Use the `-m` switch if valid module metadata is desired
in `__main__`.

Note also that even when `__main__` corresponds with an importable module
and `__main__.__spec__` is set accordingly, they're still considered
*distinct* modules. This is due to the fact that blocks guarded by
`if __name__ == "__main__":` checks only execute when the module is used
to populate the `__main__` namespace, and not during normal import.

## References

The import machinery has evolved considerably since Python's early days.  The
original `specification for packages
<https://www.python.org/doc/essays/packages/>`_ is still available to read,
although some details have changed since the writing of that document.

The original specification for `sys.meta_path` was PEP 302, with
subsequent extension in PEP 420.

PEP 420 introduced namespace packages for
Python 3.3.  PEP 420 also introduced the `find_loader()` protocol as an
alternative to `find_module()`.

PEP 366 describes the addition of the `__package__` attribute for
explicit relative imports in main modules.

PEP 328 introduced absolute and explicit relative imports and initially
proposed `__name__` for semantics PEP 366 would eventually specify for
`__package__`.

PEP 338 defines executing modules as scripts.

PEP 451 adds the encapsulation of per-module import state in spec
objects.  It also off-loads most of the boilerplate responsibilities of
loaders back onto the import machinery.  These changes allow the
deprecation of several APIs in the import system and also addition of new
methods to finders and loaders.

**Footnotes**
