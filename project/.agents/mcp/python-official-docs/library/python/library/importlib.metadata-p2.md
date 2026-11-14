---
title: "importlib.metadata -- Accessing package metadata (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/importlib.metadata.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# importlib.metadata -- Accessing package metadata (part 2 of 2)

## Distributions

While the module level API described above is the most common and convenient usage,
all that information is accessible from the `Distribution` class.
`Distribution` is an abstract object that represents the metadata for
a Python Distribution Package.
Get the concrete `Distribution` subclass instance for an installed
distribution package by calling the `distribution()` function:

```
>>> from importlib.metadata import distribution  # doctest: +SKIP
>>> dist = distribution('wheel')  # doctest: +SKIP
>>> type(dist)  # doctest: +SKIP
<class 'importlib.metadata.PathDistribution'>
```

### `distribution(distribution_name)`

Return a `Distribution` instance describing the named
distribution package.

Raises `PackageNotFoundError` if the named distribution
package is not installed in the current Python environment.

Thus, an alternative way to get e.g. the version number is through the
`Distribution.version` attribute:

```
>>> dist.version  # doctest: +SKIP
'0.32.3'
```

The same applies for `entry_points()` and `files()`.

### class `Distribution`

Details of an installed distribution package.

Note: different `Distribution` instances do not currently compare
equal, even if they relate to the same installed distribution and
accordingly have the same attributes.

### classmethod `from_name(name)`

Return a `Distribution` instance at the given path or
with the given name.

### classmethod `discover(*, context=None, **kwargs)`

Returns an iterable of `Distribution` instances for all packages
(see distribution-discovery_).

The optional argument *context* is a `DistributionFinder.Context`
instance, used to modify the search for distributions. Alternatively,
*kwargs* may contain keyword arguments for constructing a new
`DistributionFinder.Context`.

### `metadata`

Raises `MetadataNotFound` if the METADATA file is not present in
the distribution.

There are all kinds of additional metadata available on `Distribution`
instances as a `PackageMetadata` instance:

```
>>> dist.metadata['Requires-Python']  # doctest: +SKIP
'>=2.7, !=3.0.*, !=3.1.*, !=3.2.*, !=3.3.*'
>>> dist.metadata['License']  # doctest: +SKIP
'MIT'
```

The full set of available metadata is not described here.
See the PyPA Core metadata specification for additional details.

### `version`

A few metadata fields are also available as shortcut properties.

> *Added in version 3.10.*
> The `name` shortcut was added.

### `origin`

For editable packages, an `origin` property may present PEP 610
metadata (for non-editable packages, `origin` is `None`):

```
>>> dist.origin.url
'file:///path/to/wheel-0.32.3.editable-py3-none-any.whl'
```

The `origin` object follows the `Direct URL Data Structure
<https://packaging.python.org/en/latest/specifications/direct-url-data-structure/>`_.

> *Added in version 3.13.*

### `entry_points`

The entry points provided by this distribution package.

### `files`

All files contained in this distribution package.
Like `files()`, this returns `None` if there are no records.

The following two abstract methods need to be implemented when implementing-custom-providers_:

### `locate_file(path)`

Like `PackagePath.locate()`, return a `SimplePath` for the given path.
Takes a `os.PathLike` or a `str`.

### `read_text(filename)`

A shortcut for `distribution.locate_file(filename).read_text()`.

## Distribution Discovery

By default, this package provides built-in support for discovery of metadata
for file system and zip file Distribution Package\s.
This metadata finder search defaults to `sys.path`, but varies slightly in how it interprets those values from how other import machinery does. In particular:

- `importlib.metadata` does not honor `bytes` objects on `sys.path`.
- `importlib.metadata` will incidentally honor `pathlib.Path` objects on `sys.path` even though such values will be ignored for imports.

### class `DistributionFinder`

A `MetaPathFinder` subclass capable of discovering
installed distributions.

Custom providers should implement this interface in order to
supply metadata.

### class `Context(**kwargs)`

A `Context` gives a custom provider a means to
solicit additional details from the callers of distribution discovery
functions like `distributions()` or `Distribution.discover()`
beyond `.name` and `.path` when searching
for distributions.

For example, a provider could expose suites of packages in either a
"public" or "private" `realm`. A caller of distribution discovery
functions may wish to query only for distributions in a particular realm
and could call `distributions(realm="private")` to signal to the
custom provider to only include distributions from that
realm.

Each `DistributionFinder` must expect any parameters and should
attempt to honor the canonical parameters defined below when
appropriate.

See the section on implementing-custom-providers for more details.

### `name`

Specific name for which a distribution finder should match.

A `.name` of `None` matches all distributions.

### `path`

A property providing the sequence of directory paths that a
distribution finder should search.

Typically refers to Python installed package paths such as
"site-packages" directories and defaults to `sys.path`.

### `distributions(**kwargs)`

Returns an iterable of `Distribution` instances for all packages.

The *kwargs* argument may contain either a keyword argument `context`, a
`DistributionFinder.Context` instance, or pass <example-value> arguments for
constructing a new `DistributionFinder.Context`. The
`DistributionFinder.Context` is used to modify the search for
distributions.

## Implementing Custom Providers

`importlib.metadata` address two API surfaces, one for *consumers*
and another for *providers*. Most users are consumers, consuming
metadata provided by the packages. There are other use-cases, however,
where users wish to expose metadata through some other mechanism,
such as alongside a custom importer. Such a use case calls for a
*custom provider*.

Because Distribution Package metadata
is not available through `sys.path` searches, or
package loaders directly,
the metadata for a distribution is found through import
system finders. To find a distribution package's metadata,
`importlib.metadata` queries the list of meta path finders on
`sys.meta_path`.

The implementation has hooks integrated into the `PathFinder`,
serving metadata for distribution packages found on the file system.

The abstract class `importlib.abc.MetaPathFinder` defines the
interface expected of finders by Python's import system.
`importlib.metadata` extends this protocol by looking for an optional
`find_distributions` callable on the finders from
`sys.meta_path` and presents this extended interface as the
`DistributionFinder` abstract base class, which defines this abstract
method:

```
@abc.abstractmethod
def find_distributions(context=DistributionFinder.Context()) -> Iterable[Distribution]:
    """Return an iterable of all Distribution instances capable of
    loading the metadata for packages for the indicated ``context``.
    """
```

The `DistributionFinder.Context` object provides
`path` and
`name` properties indicating the path to
search and name to match and may supply other relevant context sought by the
consumer.

In practice, to support finding distribution package
metadata in locations other than the file system, subclass
`Distribution` and implement the abstract methods. Then from
a custom finder, return instances of this derived `Distribution` in the
`find_distributions()` method.

### Example

Imagine a custom finder that loads Python modules from a database:

```
class DatabaseImporter(importlib.abc.MetaPathFinder):
    def __init__(self, db):
        self.db = db

    def find_spec(self, fullname, target=None) -> ModuleSpec:
        return self.db.spec_from_name(fullname)

sys.meta_path.append(DatabaseImporter(connect_db(...)))
```

That importer now presumably provides importable modules from a
database, but it provides no metadata or entry points. For this
custom importer to provide metadata, it would also need to implement
`DistributionFinder`:

```
from importlib.metadata import DistributionFinder

class DatabaseImporter(DistributionFinder):
    ...

    def find_distributions(self, context=DistributionFinder.Context()):
        query = dict(name=context.name) if context.name else {}
        for dist_record in self.db.query_distributions(query):
            yield DatabaseDistribution(dist_record)
```

In this way, `query_distributions` would return records for
each distribution served by the database matching the query. For
example, if `requests-1.0` is in the database, `find_distributions`
would yield a `DatabaseDistribution` for `Context(name='requests')`
or `Context(name=None)`.

For the sake of simplicity, this example ignores `context.path`\. The
`path` attribute defaults to `sys.path` and is the set of import paths to
be considered in the search. A `DatabaseImporter` could potentially function
without any concern for a search path. Assuming the importer does no
partitioning, the "path" would be irrelevant. In order to illustrate the
purpose of `path`, the example would need to illustrate a more complex
`DatabaseImporter` whose behavior varied depending on
`sys.path`/`PYTHONPATH`. In that case, the `find_distributions` should
honor the `context.path` and only yield `Distribution`s pertinent to that
path.

`DatabaseDistribution`, then, would look something like:

```
class DatabaseDistribution(importlib.metadata.Distribution):
    def __init__(self, record):
        self.record = record

    def read_text(self, filename):
        """
        Read a file like "METADATA" for the current distribution.
        """
        if filename == "METADATA":
            return f"""Name: {self.record.name}
Version: {self.record.version}
"""
        if filename == "entry_points.txt":
            return "\n".join(
              f"""[{ep.group}]\n{ep.name}={ep.value}"""
              for ep in self.record.entry_points)

    def locate_file(self, path):
        raise RuntimeError("This distribution has no file system")
```

This basic <example-value> should provide metadata and entry points for
packages served by the `DatabaseImporter`, assuming that the
`record` supplies suitable `.name`, `.version`, and
`.entry_points` attributes.

The `DatabaseDistribution` may also provide other metadata files, like
`RECORD` (required for `Distribution.files`) or override the
implementation of `Distribution.files`. See the source for more inspiration.
