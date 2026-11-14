---
title: "importlib --- The implementation of import (part 3 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/importlib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# importlib --- The implementation of import (part 3 of 5)

## `importlib.machinery` -- Importers and path hooks

Module `importlib.machinery`.

**Source code:** Lib/importlib/machinery.py

This module contains the various objects that help `import`
find and load modules.

### `SOURCE_SUFFIXES`

A list of strings representing the recognized file suffixes for source
modules.

> *Added in version 3.3.*

### `DEBUG_BYTECODE_SUFFIXES`

A list of strings representing the file suffixes for non-optimized bytecode
modules.

> *Added in version 3.3.*

> *Deprecated since version 3.5.*
> Use `BYTECODE_SUFFIXES` instead.

### `OPTIMIZED_BYTECODE_SUFFIXES`

A list of strings representing the file suffixes for optimized bytecode
modules.

> *Added in version 3.3.*

> *Deprecated since version 3.5.*
> Use `BYTECODE_SUFFIXES` instead.

### `BYTECODE_SUFFIXES`

A list of strings representing the recognized file suffixes for bytecode
modules (including the leading dot).

> *Added in version 3.3.*

> *Changed in version 3.5.*
> The value is no longer dependent on `__debug__`.

### `EXTENSION_SUFFIXES`

A list of strings representing the recognized file suffixes for
extension modules.

> *Added in version 3.3.*

### `all_suffixes()`

Returns a combined list of strings representing all file suffixes for
modules recognized by the standard import machinery. This is a
helper for code which simply needs to know if a filesystem path
potentially refers to a module without needing any details on the kind
of module (for example, `inspect.getmodulename()`).

> *Added in version 3.3.*

### class `BuiltinImporter`

An importer for built-in modules. All known built-in modules are
listed in `sys.builtin_module_names`. This class implements the
`importlib.abc.MetaPathFinder` and
`importlib.abc.InspectLoader` ABCs.

Only class methods are defined by this class to alleviate the need for
instantiation.

> *Changed in version 3.5.*
> As part of PEP 489, the builtin importer now implements
> `Loader.create_module()`
> and `Loader.exec_module()`

### class `FrozenImporter`

An importer for frozen modules. This class implements the
`importlib.abc.MetaPathFinder` and
`importlib.abc.InspectLoader` ABCs.

Only class methods are defined by this class to alleviate the need for
instantiation.

> *Changed in version 3.4.*
> Gained `create_module()` and
> `exec_module()`
> methods.

### class `WindowsRegistryFinder`

Finder for modules declared in the Windows registry.  This class
implements the `importlib.abc.MetaPathFinder` ABC.

Only class methods are defined by this class to alleviate the need for
instantiation.

> *Added in version 3.3.*

> *Deprecated since version 3.6.*
> Use `site` configuration instead. Future versions of Python may
> not enable this finder by default.

### class `PathFinder`

A Finder for `sys.path` and package `__path__` attributes.
This class implements the `importlib.abc.MetaPathFinder` ABC.

Only class methods are defined by this class to alleviate the need for
instantiation.

### classmethod `find_spec(fullname, path=None, target=None)`

Class method that attempts to find a spec
for the module specified by *fullname* on `sys.path` or, if
defined, on *path*. For each path entry that is searched,
`sys.path_importer_cache` is checked. If a non-false object
is found then it is used as the path entry finder to look
for the module being searched for. If no entry is found in
`sys.path_importer_cache`, then `sys.path_hooks` is
searched for a finder for the path entry and, if found, is stored
in `sys.path_importer_cache` along with being queried about
the module. If no finder is ever found then `None` is both
stored in the cache and returned.

> *Added in version 3.4.*

> *Changed in version 3.5.*
> If the current working directory -- represented by an empty string --
> is no longer valid then `None` is returned but no value is cached
> in `sys.path_importer_cache`.

### classmethod `invalidate_caches()`

Calls `importlib.abc.PathEntryFinder.invalidate_caches()` on all
finders stored in `sys.path_importer_cache` that define the method.
Otherwise entries in `sys.path_importer_cache` set to `None` are
deleted.

> *Changed in version 3.7.*
> Entries of `None` in `sys.path_importer_cache` are deleted.

> *Changed in version 3.4.*
> Calls objects in `sys.path_hooks` with the current working
> directory for `''` (i.e. the empty string).

### class `FileFinder(path, *loader_details)`

A concrete implementation of `importlib.abc.PathEntryFinder` which
caches results from the file system.

The *path* argument is the directory for which the finder is in charge of
searching.

The *loader_details* argument is a variable number of 2-item tuples each
containing a loader and a sequence of file suffixes the loader recognizes.
The loaders are expected to be callables which accept two arguments of
the module's name and the path to the file found.

The finder will cache the directory contents as necessary, making stat calls
for each module search to verify the cache is not outdated. Because cache
staleness relies upon the granularity of the operating system's state
information of the file system, there is a potential race condition of
searching for a module, creating a new file, and then searching for the
module the new file represents. If the operations happen fast enough to fit
within the granularity of stat calls, then the module search will fail. To
prevent this from happening, when you create a module dynamically, make sure
to call `importlib.invalidate_caches()`.

> *Added in version 3.3.*

### `path`

The path the finder will search in.

### `find_spec(fullname, target=None)`

Attempt to find the spec to handle *fullname* within `path`.

> *Added in version 3.4.*

### `invalidate_caches()`

Clear out the internal cache.

### classmethod `path_hook(*loader_details)`

A class method which returns a closure for use on `sys.path_hooks`.
An instance of `FileFinder` is returned by the closure using the
path argument given to the closure directly and *loader_details*
indirectly.

If the argument to the closure is not an existing directory,
`ImportError` is raised.

### class `NamespacePath(name, path, path_finder)`

Represents a namespace package's path (`module.__path__`).

When its `__path__` value is accessed it will be recomputed if necessary.
This keeps it in-sync with the global state (`sys.modules`).

The *name* argument is the name of the namespace module.

The *path* argument is the initial path value.

The *path_finder* argument is the callable used to recompute the path value.
The callable has the same signature as `importlib.abc.MetaPathFinder.find_spec()`.

When the parent's `module.__path__` attribute is updated, the path
value is recomputed.

If the parent module is missing from `sys.modules`, then
`ModuleNotFoundError` will be raised.

For top-level modules, the parent module's path is `sys.path`.

> **Note:** `PathFinder.invalidate_caches()` invalidates `NamespacePath`,
> forcing the path value to be recomputed next time it is accessed.

> *Added in version 3.15.*

### class `SourceFileLoader(fullname, path)`

A concrete implementation of `importlib.abc.SourceLoader` by
subclassing `importlib.abc.FileLoader` and providing some concrete
implementations of other methods.

> *Added in version 3.3.*

> *Changed in version 3.15.*
> Removed the `load_module()` method.

### `name`

The name of the module that this loader will handle.

### `path`

The path to the source file.

### `is_package(fullname)`

Return `True` if `path` appears to be for a package.

### `path_stats(path)`

Concrete implementation of `importlib.abc.SourceLoader.path_stats()`.

### `set_data(path, data)`

Concrete implementation of `importlib.abc.SourceLoader.set_data()`.

### class `SourcelessFileLoader(fullname, path)`

A concrete implementation of `importlib.abc.FileLoader` which can
import bytecode files (i.e. no source code files exist).

Please note that direct use of bytecode files (and thus not source code
files) inhibits your modules from being usable by all Python
implementations or new versions of Python which change the bytecode
format.

> *Added in version 3.3.*

> *Changed in version 3.15.*
> Removed the `load_module()` method.

### `name`

The name of the module the loader will handle.

### `path`

The path to the bytecode file.

### `is_package(fullname)`

Determines if the module is a package based on `path`.

### `get_code(fullname)`

Returns the code object for `name` created from `path`.

### `get_source(fullname)`

Returns `None` as bytecode files have no source when this loader is
used.

### class `ExtensionFileLoader(fullname, path)`

A concrete implementation of `importlib.abc.ExecutionLoader` for
extension modules.

The *fullname* argument specifies the name of the module the loader is to
support. The *path* argument is the path to the extension module's file.

Note that, by default, importing an extension module will fail
in subinterpreters if it doesn't implement multi-phase init
(see PEP 489), even if it would otherwise import successfully.

> *Added in version 3.3.*

> *Changed in version 3.12.*
> Multi-phase init is now required for use in subinterpreters.

### `name`

Name of the module the loader supports.

### `path`

Path to the extension module.

### `create_module(spec)`

Creates the module object from the given specification in accordance
with PEP 489.

> *Added in version 3.5.*

### `exec_module(module)`

Initializes the given module object in accordance with PEP 489.

> *Added in version 3.5.*

### `is_package(fullname)`

Returns `True` if the file path points to a package's `__init__`
module based on `EXTENSION_SUFFIXES`.

### `get_code(fullname)`

Returns `None` as extension modules lack a code object.

### `get_source(fullname)`

Returns `None` as extension modules do not have source code.

### `get_filename(fullname)`

Returns `path`.

> *Added in version 3.4.*

### class `NamespaceLoader(name, path, path_finder)`

A concrete implementation of `importlib.abc.InspectLoader` for
namespace packages.  This is an alias for a private class and is only made
public for introspecting the `__loader__` attribute on namespace
packages:

```
>>> from importlib.machinery import NamespaceLoader
>>> import my_namespace
>>> isinstance(my_namespace.__loader__, NamespaceLoader)
True
>>> import importlib.abc
>>> isinstance(my_namespace.__loader__, importlib.abc.Loader)
True
```

> *Added in version 3.11.*

### class `ModuleSpec(name, loader, *, origin=None, loader_state=None, is_package=None)`

A specification for a module's import-system-related state.  This is
typically exposed as the module's `__spec__` attribute.  Many
of these attributes are also available directly on a module: for example,
`module.__spec__.origin == module.__file__`.  Note, however, that
while the *values* are usually equivalent, they can differ since there is
no synchronization between the two objects.  For example, it is possible to
update the module's `__file__` at runtime and this will not be
automatically reflected in the module's
`__spec__.origin`, and vice versa.

> *Added in version 3.4.*

### `name`

The module's fully qualified name (see `module.__name__`).
The finder should always set this attribute to a non-empty string.

### `loader`

The loader used to load the module (see `module.__loader__`).
The finder should always set this attribute.

### `origin`

The location the loader should use to load the module
(see `module.__file__`).
For example, for modules loaded from a `.py` file this is the filename.
The finder should always set this attribute to a meaningful value
for the loader to use.  In the uncommon case that there is not one
(like for namespace packages), it should be set to `None`.

### `submodule_search_locations`

A (possibly empty) sequence of strings enumerating the locations
in which a package's submodules will be found
(see `module.__path__`). Most of the time there will only be a
single directory in this list.

The finder should set this attribute to a sequence, even an empty
one, to indicate
to the import system that the module is a package.  It should be set to `None` for
non-package modules.  It is set automatically later to a special object for
namespace packages.

### `loader_state`

The finder may set this attribute to an object containing additional,
module-specific data to use when loading the module.  Otherwise it should be
set to `None`.

### `cached`

The filename of a compiled version of the module's code.
The finder should always set this attribute but it may be `None`
for modules that do not need compiled code stored.

### `parent`

(Read-only) The fully qualified name of the package the module is in (or the
empty string for a top-level module).
See `module.__package__`.
If the module is a package then this is the same as `name`.

### `has_location`

`True` if the spec's `origin` refers to a loadable location,
`False` otherwise.  This value impacts how `origin` is interpreted
and how the module's `__file__` is populated.
