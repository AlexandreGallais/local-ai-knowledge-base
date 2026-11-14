---
title: "importlib.metadata -- Accessing package metadata (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/importlib.metadata.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `importlib.metadata` -- Accessing package metadata

Module `importlib.metadata`.

> *Added in version 3.8.*

> *Changed in version 3.10.*
> `importlib.metadata` is no longer provisional.

**Source code:** Lib/importlib/metadata/__init__.py

`importlib.metadata` is a library that provides access to
the metadata of an installed Distribution Package,
such as its entry points
or its top-level names (Import Package\s, modules, if any).
Built in part on Python's import system, this library
provides the entry point and metadata APIs that were previously
exposed by the now-removed `pkg_resources` package. Along with
`importlib.resources`, it supersedes `pkg_resources`.

`importlib.metadata` operates on third-party *distribution packages*
installed into Python's `site-packages` directory via tools such as
pip.
Specifically, it works with distributions with discoverable
`dist-info` or `egg-info` directories,
and metadata defined by the Core metadata specifications.

> **Important:** These are *not* necessarily equivalent to or correspond 1:1 with
> the top-level *import package* names
> that can be imported inside Python code.
> One *distribution package* can contain multiple *import packages*
> (and single modules),
> and one top-level *import package*
> may map to multiple *distribution packages*
> if it is a namespace package.
> You can use packages_distributions()
> to get a mapping between them.

By default, distribution metadata can live on the file system
or in zip archives on
`sys.path`. Through an extension mechanism, the metadata can live almost
anywhere.

> **See also:** https://importlib-metadata.readthedocs.io/
> The documentation for `importlib_metadata`, which supplies a
> backport of `importlib.metadata`.
> This includes an `API reference
> <https://importlib-metadata.readthedocs.io/en/latest/api.html>`__
> for this module's classes and functions,
> as well as a `migration guide
> <https://importlib-metadata.readthedocs.io/en/latest/migration.html>`__
> for existing users of `pkg_resources`.

## Overview

Let's say you wanted to get the version string for a
Distribution Package you've installed
using `pip`. We start by creating a virtual environment and installing
something into it:

```shell-session
$ python -m venv example
$ source example/bin/activate
(example) $ python -m pip install wheel
```

You can get the version string for `wheel` by running the following:

```pycon
(example) $ python
>>> from importlib.metadata import version  # doctest: +SKIP
>>> version('wheel')  # doctest: +SKIP
'0.32.3'
```

You can also get a collection of entry points selectable by properties of the EntryPoint (typically 'group' or 'name'), such as
`console_scripts`, `distutils.commands` and others. Each group contains a
collection of EntryPoint objects.

You can get the metadata for a distribution:

```
>>> from importlib.metadata import metadata  # doctest: +SKIP
>>> list(metadata('wheel'))  # doctest: +SKIP
['Metadata-Version', 'Name', 'Version', 'Summary', 'Home-page', 'Author', 'Author-email', 'Maintainer', 'Maintainer-email', 'License', 'Project-URL', 'Project-URL', 'Project-URL', 'Keywords', 'Platform', 'Classifier', 'Classifier', 'Classifier', 'Classifier', 'Classifier', 'Classifier', 'Classifier', 'Classifier', 'Classifier', 'Classifier', 'Classifier', 'Classifier', 'Requires-Python', 'Provides-Extra', 'Requires-Dist', 'Requires-Dist']
```

You can also get a distribution's version number, list its
constituent files, and get a list of the distribution's
requirements.

### exception `PackageNotFoundError`

Subclass of `ModuleNotFoundError` raised by several functions in this
module when queried for a distribution package which is not installed in the
current Python environment.

### exception `MetadataNotFound`

Subclass of `FileNotFoundError` raised when attempting to load metadata
from a distribution folder that is empty or otherwise does not contain a
metadata file.

## Functional API

This package provides the following functionality via its public API.

### `entry_points(**select_params)`

Returns a `EntryPoints` instance describing entry points for the
current environment. Any given keyword parameters are passed to the
`select()` method for comparison to the attributes of
the individual entry point definitions.

Note: to query for entry points based on `EntryPoint.dist` attribute,
use `Distribution.entry_points()` instead (as different `Distribution`
instances do not currently compare equal, even if they have the same attributes)

### class `EntryPoints`

Details of a collection of installed entry points.

Also provides a `.groups` attribute that reports all identified entry
point groups, and a `.names` attribute that reports all identified entry
point names.

### class `EntryPoint`

Details of an installed entry point.

Each `EntryPoint` instance has `.name`, `.group`, and `.value`
attributes and a `.load()` method to resolve the value. There are also
`.module`, `.attr`, and `.extras` attributes for getting the
components of the `.value` attribute, and `.dist` for obtaining
information regarding the distribution package that provides the entry point.

Query all entry points:

```
>>> eps = entry_points()  # doctest: +SKIP
```

The `entry_points()` function returns a `EntryPoints` object,
a collection of all `EntryPoint` objects with `names` and `groups`
attributes for convenience:

```
>>> sorted(eps.groups)  # doctest: +SKIP
['console_scripts', 'distutils.commands', 'distutils.setup_keywords', 'egg_info.writers', 'setuptools.installation']
```

`EntryPoints` has a `select()` method to select entry points
matching specific properties. Select entry points in the
`console_scripts` group:

```
>>> scripts = eps.select(group='console_scripts')  # doctest: +SKIP
```

Equivalently, since `entry_points()` passes keyword arguments
through to select:

```
>>> scripts = entry_points(group='console_scripts')  # doctest: +SKIP
```

Pick out a specific script named "wheel" (found in the wheel project):

```
>>> 'wheel' in scripts.names  # doctest: +SKIP
True
>>> wheel = scripts['wheel']  # doctest: +SKIP
```

Equivalently, query for that entry point during selection:

```
>>> (wheel,) = entry_points(group='console_scripts', name='wheel')  # doctest: +SKIP
>>> (wheel,) = entry_points().select(group='console_scripts', name='wheel')  # doctest: +SKIP
```

Inspect the resolved entry point:

```
>>> wheel  # doctest: +SKIP
EntryPoint(name='wheel', value='wheel.cli:main', group='console_scripts')
>>> wheel.module  # doctest: +SKIP
'wheel.cli'
>>> wheel.attr  # doctest: +SKIP
'main'
>>> wheel.extras  # doctest: +SKIP
[]
>>> main = wheel.load()  # doctest: +SKIP
>>> main  # doctest: +SKIP
<function main at 0x103528488>
```

The `group` and `name` are arbitrary values defined by the package author
and usually a client will wish to resolve all entry points for a particular
group. Read `the setuptools docs
<https://setuptools.pypa.io/en/latest/userguide/entry_point.html>`_
for more information on entry points, their definition, and usage.

> *Changed in version 3.12.*
> The "selectable" entry points were introduced in `importlib_metadata`
> 3.6 and Python 3.10. Prior to those changes, `entry_points` accepted
> no parameters and always returned a dictionary of entry points, keyed
> by group. With `importlib_metadata` 5.0 and Python 3.12,
> `entry_points` always returns an `EntryPoints` object. See
> backports.entry_points_selectable
> for compatibility options.

> *Changed in version 3.13.*
> `EntryPoint` objects no longer present a tuple-like interface
> (`__getitem__()`).

### `metadata(distribution_name)`

Return the distribution metadata corresponding to the named
distribution package as a `PackageMetadata` instance.

Raises `PackageNotFoundError` if the named distribution
package is not installed in the current Python environment.

Raises `MetadataNotFound` if a distribution package is
present but no METADATA file is present.

### class `PackageMetadata`

A concrete implementation of the
PackageMetadata protocol.

In addition to providing the defined protocol methods and attributes, subscripting
the instance is equivalent to calling the `get()` method.

Every Distribution Package
includes some metadata, which you can extract using the `metadata()` function:

```
>>> wheel_metadata = metadata('wheel')  # doctest: +SKIP
```

The keys of the returned data structure name the metadata keywords, and
the values are returned unparsed from the distribution metadata:

```
>>> wheel_metadata['Requires-Python']  # doctest: +SKIP
'>=2.7, !=3.0.*, !=3.1.*, !=3.2.*, !=3.3.*'
```

`PackageMetadata` also presents a `json` attribute that returns
all the metadata in a JSON-compatible form per 566:

```
>>> wheel_metadata.json['requires_python']
'>=2.7, !=3.0.*, !=3.1.*, !=3.2.*, !=3.3.*'
```

The full set of available metadata is not described here.
See the PyPA Core metadata specification for additional details.

> *Changed in version 3.15.*
> Previously and incidentally, if a METADATA file was missing from a distribution, an
> empty `PackageMetadata` would be returned, indistinguishable from
> an empty METADATA file. Now, a missing METADATA file triggers a
> `MetadataNotFound` exception.

> *Changed in version 3.10.*
> The `Description` is now included in the metadata when presented
> through the payload. Line continuation characters have been removed.
> The `json` attribute was added.

### `version(distribution_name)`

Return the installed distribution package
version
for the named distribution package.

Raises `PackageNotFoundError` if the named distribution
package is not installed in the current Python environment.

The `version()` function is the quickest way to get a
Distribution Package's version
number, as a string:

```
>>> version('wheel')  # doctest: +SKIP
'0.32.3'
```

### `files(distribution_name)`

Return the full set of files contained within the named
distribution package as `PackagePath` instances.

Raises `PackageNotFoundError` if the named distribution
package is not installed in the current Python environment.

Returns `None` if the distribution is found but the installation
database records reporting the files associated with the distribution package
are missing.

### class `PackagePath`

A `pathlib.PurePath` derived object with additional `dist`,
`size`, and `hash` properties corresponding to the distribution
package's installation metadata for that file, also:

### `locate()`

If possible, return the concrete `SimplePath` allowing to access data,
or raise a `NotImplementedError` otherwise.

### class `SimplePath`

A protocol representing a minimal subset of `pathlib.Path` that allows to
check if it `exists()`, to traverse using `joinpath()` and `parent`,
and to retrieve data using `read_text()` and `read_bytes()`.

The `files()` function takes a
Distribution Package
name and returns all of the files installed by this distribution. For example:

```
>>> util = [p for p in files('wheel') if 'util.py' in str(p)][0]  # doctest: +SKIP
>>> util  # doctest: +SKIP
PackagePath('wheel/util.py')
>>> util.size  # doctest: +SKIP
859
>>> util.dist  # doctest: +SKIP
<importlib.metadata._hooks.PathDistribution object at 0x101e0cef0>
>>> util.hash  # doctest: +SKIP
<FileHash mode: sha256 value: bYkw5oMccfazVCoYQwKkkemoVyMAFoR34mmKBx8R1NI>
```

Once you have the file, you can also read its contents:

```
>>> print(util.read_text())  # doctest: +SKIP
import base64
import sys
...
def as_bytes(s):
    if isinstance(s, text_type):
        return s.encode('utf-8')
    return s
```

You can also use the `locate()` method to get the absolute
path to the file:

```
>>> util.locate()  # doctest: +SKIP
PosixPath('/home/gustav/example/lib/site-packages/wheel/util.py')
```

In the case where the metadata file listing files
(`RECORD` or `SOURCES.txt`) is missing, `files()` will
return `None`. The caller may wish to wrap calls to
`files()` in `always_iterable
<https://more-itertools.readthedocs.io/en/stable/api.html#more_itertools.always_iterable>`_
or otherwise guard against this condition if the target
distribution is not known to have the metadata present.

### `requires(distribution_name)`

Return the declared dependency specifiers for the named
distribution package.

Raises `PackageNotFoundError` if the named distribution
package is not installed in the current Python environment.

To get the full set of requirements for a Distribution Package,
use the `requires()`
function:

```
>>> requires('wheel')  # doctest: +SKIP
["pytest (>=3.0.0) ; extra == 'test'", "pytest-cov ; extra == 'test'"]
```

### `packages_distributions()`

Return a mapping from the top level module and import package
names found via `sys.meta_path` to the names of the distribution
packages (if any) that provide the corresponding files.

To allow for namespace packages (which may have members provided by
multiple distribution packages), each top level import name maps to a
list of distribution names rather than mapping directly to a single name.

A convenience method to resolve the Distribution Package
name (or names, in the case of a namespace package)
that provide each importable top-level
Python module or Import Package:

```
>>> packages_distributions()
{'importlib_metadata': ['importlib-metadata'], 'yaml': ['PyYAML'], 'jaraco': ['jaraco.classes', 'jaraco.functools'], ...}
```

Some editable installs, `do not supply top-level names
<https://github.com/pypa/packaging-problems/issues/609>`_, and thus this
function is not reliable with such installs.

> *Added in version 3.10.*
