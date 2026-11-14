---
title: "importlib --- The implementation of import (part 4 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/importlib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# importlib --- The implementation of import (part 4 of 5)

### class `AppleFrameworkLoader(name, path)`

A specialization of `importlib.machinery.ExtensionFileLoader` that
is able to load extension modules in Framework format.

For compatibility with the iOS App Store, *all* binary modules in an iOS app
must be dynamic libraries, contained in a framework with appropriate
metadata, stored in the `Frameworks` folder of the packaged app. There can
be only a single binary per framework, and there can be no executable binary
material outside the Frameworks folder.

To accommodate this requirement, when running on iOS, extension module
binaries are *not* packaged as `.so` files on `sys.path`, but as
individual standalone frameworks. To discover those frameworks, this loader
is registered against the `.fwork` file extension, with a `.fwork`
file acting as a placeholder in the original location of the binary on
`sys.path`. The `.fwork` file contains the path of the actual binary in
the `Frameworks` folder, relative to the app bundle. To allow for
resolving a framework-packaged binary back to the original location, the
framework is expected to contain a `.origin` file that contains the
location of the `.fwork` file, relative to the app bundle.

For example, consider the case of an import `from foo.bar import _whiz`,
where `_whiz` is implemented with the binary module
`sources/foo/bar/_whiz.abi3.so`, with `sources` being the location
registered on `sys.path`, relative to the application bundle. This module
*must* be distributed as
`Frameworks/foo.bar._whiz.framework/foo.bar._whiz` (creating the framework
name from the full import path of the module), with an `Info.plist` file
in the `.framework` directory identifying the binary as a framework. The
`foo.bar._whiz` module would be represented in the original location with
a `sources/foo/bar/_whiz.abi3.fwork` marker file, containing the path
`Frameworks/foo.bar._whiz/foo.bar._whiz`. The framework would also contain
`Frameworks/foo.bar._whiz.framework/foo.bar._whiz.origin`, containing the
path to the `.fwork` file.

When a module is loaded with this loader, the `__file__` for the module
will report as the location of the `.fwork` file. This allows code to use
the `__file__` of a  module as an anchor for file system traversal.
However, the spec origin will reference the location of the *actual* binary
in the `.framework` folder.

The Xcode project building the app is responsible for converting any `.so`
files from wherever they exist in the `PYTHONPATH` into frameworks in the
`Frameworks` folder (including stripping extensions from the module file,
the addition of framework metadata, and signing the resulting framework),
and creating the `.fwork` and `.origin` files. This will usually be done
with a build step in the Xcode project; see the iOS documentation for
details on how to construct this build step.

> *Added in version 3.13.*

> **Availability:** iOS.

### `name`

Name of the module the loader supports.

### `path`

Path to the `.fwork` file for the extension module.

## `importlib.util` -- Utility code for importers

Module `importlib.util`.

**Source code:** Lib/importlib/util.py

This module contains the various objects that help in the construction of
an importer.

### `MAGIC_NUMBER`

The bytes which represent the bytecode version number. If you need help with
loading/writing bytecode then consider `importlib.abc.SourceLoader`.

> *Added in version 3.4.*

### `cache_from_source(path, *, optimization=None)`

Return the PEP 3147/PEP 488 path to the byte-compiled file associated
with the source *path*.  For example, if *path* is `/foo/bar/baz.py` the return
value would be `/foo/bar/__pycache__/baz.cpython-32.pyc` for Python 3.2.
The `cpython-32` string comes from the current magic tag (see
`sys.implementation.cache_tag`; if it is not
defined then `NotImplementedError` will be raised).

The *optimization* parameter is used to specify the optimization level of the
bytecode file. An empty string represents no optimization, so
`/foo/bar/baz.py` with an *optimization* of `''` will result in a
bytecode path of `/foo/bar/__pycache__/baz.cpython-32.pyc`. `None` causes
the interpreter's optimization level to be used. Any other value's string
representation is used, so `/foo/bar/baz.py` with an *optimization* of
`2` will lead to the bytecode path of
`/foo/bar/__pycache__/baz.cpython-32.opt-2.pyc`. The string representation
of *optimization* can only be alphanumeric, else `ValueError` is raised.

> *Added in version 3.4.*

> *Changed in version 3.5.*
> The *optimization* parameter was added and the *debug_override* parameter
> was deprecated.

> *Changed in version 3.6.*
> Accepts a path-like object.

> *Changed in version 3.15.*
> The *debug_override* parameter was removed.

### `source_from_cache(path)`

Given the *path* to a PEP 3147 file name, return the associated source code
file path.  For example, if *path* is
`/foo/bar/__pycache__/baz.cpython-32.pyc` the returned path would be
`/foo/bar/baz.py`.  *path* need not exist, however if it does not conform
to PEP 3147 or PEP 488 format, a `ValueError` is raised. If
`sys.implementation.cache_tag` is not defined,
`NotImplementedError` is raised.

> *Added in version 3.4.*

> *Changed in version 3.6.*
> Accepts a path-like object.

### `decode_source(source_bytes)`

Decode the given bytes representing source code and return it as a string
with universal newlines (as required by
`importlib.abc.InspectLoader.get_source()`).

> *Added in version 3.4.*

### `resolve_name(name, package)`

Resolve a relative module name to an absolute one.

If  **name** has no leading dots, then **name** is simply returned. This
allows for usage such as
`importlib.util.resolve_name('sys', __spec__.parent)` without doing a
check to see if the **package** argument is needed.

`ImportError` is raised if **name** is a relative module name but
**package** is a false value (e.g. `None` or the empty string).
`ImportError` is also raised if a relative name would escape its
containing package (e.g. requesting `..bacon` from within the `spam`
package).

> *Added in version 3.3.*

> *Changed in version 3.9.*
> To improve consistency with import statements, raise
> `ImportError` instead of `ValueError` for invalid relative
> import attempts.

### `find_spec(name, package=None)`

Find the spec for a module, optionally relative to
the specified **package** name. If the module is in `sys.modules`,
then `sys.modules[name].__spec__` is returned (unless the spec would be
`None` or is not set, in which case `ValueError` is raised).
Otherwise a search using `sys.meta_path` is done. `None` is
returned if no spec is found.

If **name** is for a submodule (contains a dot), the parent module is
automatically imported.

**name** and **package** work the same as for
`importlib.import_module()`.

> *Added in version 3.4.*

> *Changed in version 3.7.*
> Raises `ModuleNotFoundError` instead of `AttributeError` if
> **package** is in fact not a package (i.e. lacks a
> `__path__` attribute).

### `module_from_spec(spec)`

Create a new module based on **spec** and
`spec.loader.create_module()`.

If `spec.loader.create_module()`
does not return `None`, then any pre-existing attributes will not be reset.
Also, no `AttributeError` will be raised if triggered while accessing
**spec** or setting an attribute on the module.

This function is preferred over using `types.ModuleType` to create a
new module as **spec** is used to set as many import-controlled attributes on
the module as possible.

> *Added in version 3.5.*

### `spec_from_loader(name, loader, *, origin=None, is_package=None)`

A factory function for creating a `ModuleSpec`
instance based on a loader.  The parameters have the same meaning as they do
for ModuleSpec.  The function uses available loader APIs, such as
:meth:`InspectLoader.is_package
<importlib.abc.InspectLoader.is_package>`, to fill in any missing
information on the spec.

> *Added in version 3.4.*

### `spec_from_file_location(name, location, *, loader=None, submodule_search_locations=None)`

A factory function for creating a `ModuleSpec`
instance based on the path to a file.  Missing information will be filled in
on the spec by making use of loader APIs and by the implication that the
module will be file-based.

> *Added in version 3.4.*

> *Changed in version 3.6.*
> Accepts a path-like object.

### `source_hash(source_bytes)`

Return the hash of *source_bytes* as bytes. A hash-based `.pyc` file embeds
the `source_hash()` of the corresponding source file's contents in its
header.

> *Added in version 3.7.*

### `_incompatible_extension_module_restrictions(*, disable_check)`

A context manager that can temporarily skip the compatibility check
for extension modules.  By default the check is enabled and will fail
when a single-phase init module is imported in a subinterpreter.
It will also fail for a multi-phase init module that doesn't
explicitly support a per-interpreter GIL, when imported
in an interpreter with its own GIL.

Note that this function is meant to accommodate an unusual case;
one which is likely to eventually go away.  There's is a pretty good
chance this is not what you were looking for.

You can get the same effect as this function by implementing the
basic <example-value> of multi-phase init (PEP 489) and lying about
support for multiple interpreters (or per-interpreter GIL).

> **Warning:** Using this function to disable the check can lead to
> unexpected behavior and even crashes.  It should only be used during
> extension module development.

> *Added in version 3.12.*

### class `LazyLoader(loader)`

A class which postpones the execution of the loader of a module until the
module has an attribute accessed.

This class **only** works with loaders that define
`exec_module()` as control over what module type
is used for the module is required. For those same reasons, the loader's
`create_module()` method must return `None` or a
type for which its `__class__` attribute can be mutated along with not
using slots. Finally, modules which substitute the object
placed into `sys.modules` will not work as there is no way to properly
replace the module references throughout the interpreter safely;
`ValueError` is raised if such a substitution is detected.

> **Note:** For projects where startup time is critical, this class allows for
> potentially minimizing the cost of loading a module if it is never used.
> For projects where startup time is not essential then use of this class is
> **heavily** discouraged due to error messages created during loading being
> postponed and thus occurring out of context.

> *Added in version 3.5.*

> *Changed in version 3.6.*
> Began calling `create_module()`, removing the
> compatibility warning for `importlib.machinery.BuiltinImporter` and
> `importlib.machinery.ExtensionFileLoader`.

### classmethod `factory(loader)`

A class method which returns a callable that creates a lazy loader. This
is meant to be used in situations where the loader is passed by class
instead of by instance.

```
suffixes = importlib.machinery.SOURCE_SUFFIXES
loader = importlib.machinery.SourceFileLoader
lazy_loader = importlib.util.LazyLoader.factory(loader)
finder = importlib.machinery.FileFinder(path, (lazy_loader, suffixes))
```
