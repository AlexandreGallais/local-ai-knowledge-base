---
title: "The import system (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/import.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# The import system

Python code in one module gains access to the code in another module
by the process of importing it.  The `import` statement is
the most common way of invoking the import machinery, but it is not the only
way.  Functions such as `importlib.import_module()` and built-in
`__import__()` can also be used to invoke the import machinery.

The `import` statement combines two operations; it searches for the
named module, then it binds the results of that search to a name in the local
scope.  The search operation of the `import` statement is defined as
a call to the `__import__()` function, with the appropriate arguments.
The return value of `__import__()` is used to perform the name
binding operation of the `import` statement.  See the
`import` statement for the exact details of that name binding
operation.

A direct call to `__import__()` performs only the module search and, if
found, the module creation operation.  While certain side-effects may occur,
such as the importing of parent packages, and the updating of various caches
(including `sys.modules`), only the `import` statement performs
a name binding operation.

When an `import` statement is executed, the standard builtin
`__import__()` function is called. Other mechanisms for invoking the
import system (such as `importlib.import_module()`) may choose to bypass
`__import__()` and use their own solutions to implement import semantics.

When a module is first imported, Python searches for the module and if found,
it creates a module object, initializing it.  If the named module
cannot be found, a `ModuleNotFoundError` is raised.  Python implements various
strategies to search for the named module when the import machinery is
invoked.  These strategies can be modified and extended by using various hooks
described in the sections below.

> *Changed in version 3.3.*
> The import system has been updated to fully implement the second phase
> of PEP 302. There is no longer any implicit import machinery - the full
> import system is exposed through `sys.meta_path`. In addition,
> native namespace package support has been implemented (see PEP 420).

## `importlib`

The `importlib` module provides a rich API for interacting with the
import system.  For example `importlib.import_module()` provides a
recommended, simpler API than built-in `__import__()` for invoking the
import machinery.  Refer to the `importlib` library documentation for
additional detail.

## Packages

Python has only one type of module object, and all modules are of this type,
regardless of whether the module is implemented in Python, C, or something
else.  To help organize modules and provide a naming hierarchy, Python has a
concept of packages.

You can think of packages as the directories on a file system and modules as
files within directories, but don't take this analogy too literally since
packages and modules need not originate from the file system.  For the
purposes of this documentation, we'll use this convenient analogy of
directories and files.  Like file system directories, packages are organized
hierarchically, and packages may themselves contain subpackages, as well as
regular modules.

It's important to keep in mind that all packages are modules, but not all
modules are packages.  Or put another way, packages are just a special kind of
module.  Specifically, any module that contains a `__path__` attribute is
considered a package.

All modules have a name.  Subpackage names are separated from their parent
package name by a dot, akin to Python's standard attribute access syntax.  Thus
you might have a package called `email`, which in turn has a subpackage
called `email.mime` and a module within that subpackage called
`email.mime.text`.

### Regular packages

Python defines two types of packages, :term:`regular packages <regular
package>` and namespace packages.  Regular
packages are traditional packages as they existed in Python 3.2 and earlier.
A regular package is typically implemented as a directory containing an
`__init__.py` file.  When a regular package is imported, this
`__init__.py` file is implicitly executed, and the objects it defines are
bound to names in the package's namespace.  The `__init__.py` file can
contain the same Python code that any other module can contain, and Python
will add some additional attributes to the module when it is imported.

For example, the following file system layout defines a top level `parent`
package with three subpackages:

```
parent/
    __init__.py
    one/
        __init__.py
    two/
        __init__.py
    three/
        __init__.py
```

Importing `parent.one` will implicitly execute `parent/__init__.py` and
`parent/one/__init__.py`.  Subsequent imports of `parent.two` or
`parent.three` will execute `parent/two/__init__.py` and
`parent/three/__init__.py` respectively.

A subdirectory inside a regular package that does not contain an
`__init__.py` file is treated as an implicit
namespace package (a "namespace
subpackage") rooted in that parent.  See PEP 420 for the underlying
specification.

### Namespace packages

A namespace package is a composite of various portions,
where each portion contributes a subpackage to the parent package.  Portions
may reside in different locations on the file system.  Portions may also be
found in zip files, on the network, or anywhere else that Python searches
during import.  Namespace packages may or may not correspond directly to
objects on the file system; they may be virtual modules that have no concrete
representation.

Namespace packages do not use an ordinary list for their `__path__`
attribute. They instead use a custom iterable type which will automatically
perform a new search for package portions on the next import attempt within
that package if the path of their parent package (or `sys.path` for a
top level package) changes.

With namespace packages, there is no `parent/__init__.py` file.  In fact,
there may be multiple `parent` directories found during import search, where
each one is provided by a different portion.  Thus `parent/one` may not be
physically located next to `parent/two`.  In this case, Python will create a
namespace package for the top-level `parent` package whenever it or one of
its subpackages is imported.

Namespace packages may also be nested inside a regular package.  When the
import system searches a regular package's `__path__` and encounters a
subdirectory that does not contain an `__init__.py` file, that
subdirectory becomes a portion contributing to a namespace
subpackage of the enclosing regular package.

See also PEP 420 for the namespace package specification.

## Searching

To begin the search, Python needs the fully qualified
name of the module (or package, but for the purposes of this discussion, the
difference is immaterial) being imported.  This name may come from various
arguments to the `import` statement, or from the parameters to the
`importlib.import_module() or import__()` functions.

This name will be used in various phases of the import search, and it may be
the dotted path to a submodule, e.g. `foo.bar.baz`.  In this case, Python
first tries to import `foo`, then `foo.bar`, and finally `foo.bar.baz`.
If any of the intermediate imports fail, a `ModuleNotFoundError` is raised.

### The module cache

The first place checked during import search is `sys.modules`.  This
mapping serves as a cache of all modules that have been previously imported,
including the intermediate paths.  So if `foo.bar.baz` was previously
imported, `sys.modules` will contain entries for `foo`, `foo.bar`,
and `foo.bar.baz`.  Each key will have as its value the corresponding module
object.

During import, the module name is looked up in `sys.modules` and if
present, the associated value is the module satisfying the import, and the
process completes.  However, if the value is `None`, then a
`ModuleNotFoundError` is raised.  If the module name is missing, Python will
continue searching for the module.

`sys.modules` is writable.  Deleting a key may not destroy the
associated module (as other modules may hold references to it),
but it will invalidate the cache entry for the named module, causing
Python to search anew for the named module upon its next
import. The key can also be assigned to `None`, forcing the next import
of the module to result in a `ModuleNotFoundError`.

Beware though, as if you keep a reference to the module object,
invalidate its cache entry in `sys.modules`, and then re-import the
named module, the two module objects will *not* be the same. By contrast,
`importlib.reload()` will reuse the *same* module object, and simply
reinitialise the module contents by rerunning the module's code.

### Finders and loaders

If the named module is not found in `sys.modules`, then Python's import
protocol is invoked to find and load the module.  This protocol consists of
two conceptual objects, finders and loaders.
A finder's job is to determine whether it can find the named module using
whatever strategy it knows about. Objects that implement both of these
interfaces are referred to as importers - they return
themselves when they find that they can load the requested module.

Python includes a number of default finders and importers.  The first one
knows how to locate built-in modules, and the second knows how to locate
frozen modules.  A third default finder searches an import path
for modules.  The import path is a list of locations that may
name file system paths or zip files.  It can also be extended to search
for any locatable resource, such as those identified by URLs.

The import machinery is extensible, so new finders can be added to extend the
range and scope of module searching.

Finders do not actually load modules.  If they can find the named module, they
return a module spec, an encapsulation of the module's import-related
information, which the import machinery then uses when loading the module.

The following sections describe the protocol for finders and loaders in more
detail, including how you can create and register new ones to extend the
import machinery.

> *Changed in version 3.4.*
> In previous versions of Python, finders returned loaders
> directly, whereas now they return module specs which *contain* loaders.
> Loaders are still used during import but have fewer responsibilities.

### Import hooks

The import machinery is designed to be extensible; the primary mechanism for
this are the *import hooks*.  There are two types of import hooks: *meta
hooks* and *import path hooks*.

Meta hooks are called at the start of import processing, before any other
import processing has occurred, other than `sys.modules` cache look up.
This allows meta hooks to override `sys.path` processing, frozen
modules, or even built-in modules.  Meta hooks are registered by adding new
finder objects to `sys.meta_path`, as described below.

Import path hooks are called as part of `sys.path` (or
`package.__path__`) processing, at the point where their associated path
item is encountered.  Import path hooks are registered by adding new callables
to `sys.path_hooks` as described below.

### The meta path

When the named module is not found in `sys.modules`, Python next
searches `sys.meta_path`, which contains a list of meta path finder
objects.  These finders are queried in order to see if they know how to handle
the named module.  Meta path finders must implement a method called
`find_spec()` which takes three arguments:
a name, an import path, and (optionally) a target module.  The meta path
finder can use any strategy it wants to determine whether it can handle
the named module or not.

If the meta path finder knows how to handle the named module, it returns a
spec object.  If it cannot handle the named module, it returns `None`.  If
`sys.meta_path` processing reaches the end of its list without returning
a spec, then a `ModuleNotFoundError` is raised.  Any other exceptions
raised are simply propagated up, aborting the import process.

The `find_spec()` method of meta path
finders is called with two or three arguments.  The first is the fully
qualified name of the module being imported, for example `foo.bar.baz`.
The second argument is the path entries to use for the module search.  For
top-level modules, the second argument is `None`, but for submodules or
subpackages, the second argument is the value of the parent package's
`__path__` attribute. If the appropriate `__path__` attribute cannot
be accessed, a `ModuleNotFoundError` is raised.  The third argument
is an existing module object that will be the target of loading later.
The import system passes in a target module only during reload.

The meta path may be traversed multiple times for a single import request.
For example, assuming none of the modules involved has already been cached,
importing `foo.bar.baz` will first perform a top level import, calling
`mpf.find_spec("foo", None, None)` on each meta path finder (`mpf`). After
`foo` has been imported, `foo.bar` will be imported by traversing the
meta path a second time, calling
`mpf.find_spec("foo.bar", foo.__path__, None)`. Once `foo.bar` has been
imported, the final traversal will call
`mpf.find_spec("foo.bar.baz", foo.bar.__path__, None)`.

Some meta path finders only support top level imports. These importers will
always return `None` when anything other than `None` is passed as the
second argument.

Python's default `sys.meta_path` has three meta path finders, one that
knows how to import built-in modules, one that knows how to import frozen
modules, and one that knows how to import modules from an import path
(i.e. the path based finder).

> *Changed in version 3.4.*
> The `find_spec()` method of meta path
> finders replaced `find_module()`, which
> is now deprecated.  While it will continue to work without change, the
> import machinery will try it only if the finder does not implement
> `find_spec()`.

> *Changed in version 3.10.*
> Use of `find_module()` by the import system
> now raises `ImportWarning`.

> *Changed in version 3.12.*
> `find_module()` has been removed.
> Use `find_spec()` instead.
