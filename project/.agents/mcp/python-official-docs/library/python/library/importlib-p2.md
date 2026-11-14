---
title: "importlib --- The implementation of import (part 2 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/importlib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# importlib --- The implementation of import (part 2 of 5)

## `importlib.abc` -- Abstract base classes related to import

Module `importlib.abc`.

**Source code:** Lib/importlib/abc.py

The `importlib.abc` module contains all of the core abstract base classes
used by `import`. Some subclasses of the core abstract base classes
are also provided to help in implementing the core ABCs.

ABC hierarchy:

```
object
 +-- MetaPathFinder
 +-- PathEntryFinder
 +-- Loader
      +-- ResourceLoader --------+
      +-- InspectLoader          |
           +-- ExecutionLoader --+
                                 +-- FileLoader
                                 +-- SourceLoader
```

### class `MetaPathFinder`

An abstract base class representing a meta path finder.

> *Added in version 3.3.*

> *Changed in version 3.10.*
> No longer a subclass of `Finder`.

### `find_spec(fullname, path, target=None)`

An abstract method for finding a spec for
the specified module.  If this is a top-level import, *path* will
be `None`.  Otherwise, this is a search for a subpackage or
module and *path* will be the value of `__path__` from the
parent package. If a spec cannot be found, `None` is returned.
When passed in, `target` is a module object that the finder may
use to make a more educated guess about what spec to return.
`importlib.util.spec_from_loader()` may be useful for implementing
concrete `MetaPathFinders`.

> *Added in version 3.4.*

### `invalidate_caches()`

An optional method which, when called, should invalidate any internal
cache used by the finder. Used by `importlib.invalidate_caches()`
when invalidating the caches of all finders on `sys.meta_path`.

> *Changed in version 3.4.*
> Returns `None` when called instead of `NotImplemented`.

### `discover(parent=None)`

An optional method which searches for possible specs with given *parent*
module spec. If *parent* is *None*, `MetaPathFinder.discover()` will
search for top-level modules.

Returns an iterable of possible specs.

Raises `ValueError` if *parent* is not a package module.

> **Warning:** This method can potentially yield a very large number of objects, and
> it may carry out IO operations when computing these values.
>
> Because of this, it will generally be desirable to compute the result
> values on-the-fly, as they are needed. As such, the returned object is
> only guaranteed to be an `iterable`,
> instead of a `list` or other
> `collection` type.

> *Added in version 3.15.*

### class `PathEntryFinder`

An abstract base class representing a path entry finder.  Though
it bears some similarities to `MetaPathFinder`, `PathEntryFinder`
is meant for use only within the path-based import subsystem provided
by `importlib.machinery.PathFinder`.

> *Added in version 3.3.*

> *Changed in version 3.10.*
> No longer a subclass of `Finder`.

### `find_spec(fullname, target=None)`

An abstract method for finding a spec for
the specified module.  The finder will search for the module only
within the path entry to which it is assigned.  If a spec
cannot be found, `None` is returned.  When passed in, `target`
is a module object that the finder may use to make a more educated
guess about what spec to return. `importlib.util.spec_from_loader()`
may be useful for implementing concrete `PathEntryFinders`.

> *Added in version 3.4.*

### `invalidate_caches()`

An optional method which, when called, should invalidate any internal
cache used by the finder. Used by
`importlib.machinery.PathFinder.invalidate_caches()`
when invalidating the caches of all cached finders.

### `discover(parent=None)`

An optional method which searches for possible specs with given *parent*
module spec. If *parent* is *None*, `PathEntryFinder.discover()` will
search for top-level modules.

Returns an iterable of possible specs.

Raises `ValueError` if *parent* is not a package module.

> **Warning:** This method can potentially yield a very large number of objects, and
> it may carry out IO operations when computing these values.
>
> Because of this, it will generally be desirable to compute the result
> values on-the-fly, as they are needed. As such, the returned object is
> only guaranteed to be an `iterable`,
> instead of a `list` or other
> `collection` type.

> *Added in version 3.15.*

### class `Loader`

An abstract base class for a loader.
See PEP 302 for the exact definition for a loader.

Loaders that wish to support resource reading should implement a
`get_resource_reader()` method as specified by
`importlib.resources.abc.ResourceReader`.

> *Changed in version 3.7.*
> Introduced the optional `get_resource_reader()` method.

> *Changed in version 3.15.*
> Removed the `load_module()` method.
>
> ### `create_module(spec)`
>
> A method that returns the module object to use when
> importing a module.  This method may return `None`,
> indicating that default module creation semantics should take place.
>
>
> > *Added in version 3.4.*
>
>
>
> > *Changed in version 3.6.*
> > This method is no longer optional when
> > `exec_module()` is defined.
>
>
>
> ### `exec_module(module)`
>
> An abstract method that executes the module in its own namespace
> when a module is imported or reloaded.  The module should already
> be initialized when `exec_module()` is called.  When this method exists,
> `create_module()` must be defined.
>
>
> > *Added in version 3.4.*
>
>
>
> > *Changed in version 3.6.*
> > `create_module()` must also be defined.
>

### class `ResourceLoader`

*Superseded by TraversableResources*

An abstract base class for a loader which implements the optional
PEP 302 protocol for loading arbitrary resources from the storage
back-end.

> *Deprecated since version 3.7.*
> This ABC is deprecated in favour of supporting resource loading
> through `importlib.resources.abc.TraversableResources`.
> This class exists for backwards compatibility only with other ABCs in
> this module.

### `get_data(path)`

An abstract method to return the bytes for the data located at *path*.
Loaders that have a file-like storage back-end
that allows storing arbitrary data
can implement this abstract method to give direct access
to the data stored. `OSError` is to be raised if the *path* cannot
be found. The *path* is expected to be constructed using a module's
`__file__` attribute or an item from a package's
`__path__`.

> *Changed in version 3.4.*
> Raises `OSError` instead of `NotImplementedError`.

### class `InspectLoader`

An abstract base class for a loader which implements the optional
PEP 302 protocol for loaders that inspect modules.

### `get_code(fullname)`

Return the code object for a module, or `None` if the module does not
have a code object (as would be the case, for example, for a built-in
module).  Raise an `ImportError` if loader cannot find the
requested module.

> **Note:** While the method has a default implementation, it is suggested that
> it be overridden if possible for performance.

> *Changed in version 3.4.*
> No longer abstract and a concrete implementation is provided.

### `get_source(fullname)`

An abstract method to return the source of a module. It is returned as
a text string using universal newlines, translating all
recognized line separators into `'\n'` characters.  Returns `None`
if no source is available (e.g. a built-in module). Raises
`ImportError` if the loader cannot find the module specified.

> *Changed in version 3.4.*
> Raises `ImportError` instead of `NotImplementedError`.

### `is_package(fullname)`

An optional method to return a true value if the module is a package, a
false value otherwise. `ImportError` is raised if the
loader cannot find the module.

> *Changed in version 3.4.*
> Raises `ImportError` instead of `NotImplementedError`.

### staticmethod `source_to_code(data, path='<string>', fullname=None)`

Create a code object from Python source.

The *data* argument can be whatever the `compile()` function
supports (i.e. string or bytes). The *path* argument should be
the "path" to where the source code originated from, which can be an
abstract concept (e.g. location in a zip file).

With the subsequent code object one can execute it in a module by
running `exec(code, module.__dict__)`.

The optional argument *fullname* specifies the module name.
It is needed to unambiguous filter syntax
warnings by module name.

> *Added in version 3.4.*

> *Changed in version 3.5.*
> Made the method static.

> *Added in version 3.15.*
> Added the *fullname* parameter.

### `exec_module(module)`

Implementation of `Loader.exec_module()`.

> *Added in version 3.4.*

### class `ExecutionLoader`

An abstract base class which inherits from `InspectLoader` that,
when implemented, helps a module to be executed as a script. The ABC
represents an optional PEP 302 protocol.

### `get_filename(fullname)`

An abstract method that is to return the value of
`__file__` for the specified module. If no path is
available, `ImportError` is raised.

If source code is available, then the method should return the path to
the source file, regardless of whether a bytecode was used to load the
module.

> *Changed in version 3.4.*
> Raises `ImportError` instead of `NotImplementedError`.

### class `FileLoader(fullname, path)`

An abstract base class which inherits from `ResourceLoader` and
`ExecutionLoader`, providing concrete implementations of
`ResourceLoader.get_data()` and `ExecutionLoader.get_filename()`.

The *fullname* argument is a fully resolved name of the module the loader is
to handle. The *path* argument is the path to the file for the module.

> *Added in version 3.3.*

> *Changed in version 3.15.*
> Removed the `load_module()` method.

### `name`

The name of the module the loader can handle.

### `path`

Path to the file of the module.

### `get_filename(fullname)`

Returns `path`.

### `get_data(path)`

Reads *path* as a binary file and returns the bytes from it.

### class `SourceLoader`

An abstract base class for implementing source (and optionally bytecode)
file loading. The class inherits from both `ResourceLoader` and
`ExecutionLoader`, requiring the implementation of:

- `ResourceLoader.get_data()`
- `ExecutionLoader.get_filename()`
Should only return the path to the source file; sourceless
loading is not supported.

The abstract methods defined by this class are to add optional bytecode
file support. Not implementing these optional methods (or causing them to
raise `NotImplementedError`) causes the loader to
only work with source code. Implementing the methods allows the loader to
work with source *and* bytecode files; it does not allow for *sourceless*
loading where only bytecode is provided.  Bytecode files are an
optimization to speed up loading by removing the parsing step of Python's
compiler, and so no bytecode-specific API is exposed.

> *Changed in version 3.15.*
> Removed the `load_module()` method.

### `path_stats(path)`

Optional abstract method which returns a `dict` containing
metadata about the specified path.  Supported dictionary keys are:

- `'mtime'` (mandatory): an integer or floating-point number
representing the modification time of the source code;
- `'size'` (optional): the size in bytes of the source code.

Any other keys in the dictionary are ignored, to allow for future
extensions. If the path cannot be handled, `OSError` is raised.

> *Added in version 3.3.*

> *Changed in version 3.4.*
> Raise `OSError` instead of `NotImplementedError`.

### `path_mtime(path)`

Optional abstract method which returns the modification time for the
specified path.

> *Deprecated since version 3.3.*
> This method is deprecated in favour of `path_stats()`.  You don't
> have to implement it, but it is still available for compatibility
> purposes. Raise `OSError` if the path cannot be handled.

> *Changed in version 3.4.*
> Raise `OSError` instead of `NotImplementedError`.

### `set_data(path, data)`

Optional abstract method which writes the specified bytes to a file
path. Any intermediate directories which do not exist are to be created
automatically.

When writing to the path fails because the path is read-only
(`errno.EACCES`/`PermissionError`), do not propagate the
exception.

> *Changed in version 3.4.*
> No longer raises `NotImplementedError` when called.

### `get_code(fullname)`

Concrete implementation of `InspectLoader.get_code()`.

### `exec_module(module)`

Concrete implementation of `Loader.exec_module()`.

> *Added in version 3.4.*

### `get_source(fullname)`

Concrete implementation of `InspectLoader.get_source()`.

### `is_package(fullname)`

Concrete implementation of `InspectLoader.is_package()`. A module
is determined to be a package if its file path (as provided by
`ExecutionLoader.get_filename()`) is a file named
`__init__` when the file extension is removed **and** the module name
itself does not end in `__init__`.
