---
title: "importlib --- The implementation of import (part 1 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/importlib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `importlib` --- The implementation of `import`

Module `importlib`.

> *Added in version 3.1.*

**Source code:** Lib/importlib/__init__.py

## Introduction

The purpose of the `importlib` package is three-fold.

One is to provide the
implementation of the `import` statement (and thus, by extension, the
`__import__()` function) in Python source code. This provides an
implementation of `import` which is portable to any Python
interpreter. This also provides an implementation which is easier to
comprehend than one implemented in a programming language other than Python.

Two, the components to implement `import` are exposed in this
package, making it easier for users to create their own custom objects (known
generically as an importer) to participate in the import process.

Three, the package contains modules exposing additional functionality for
managing aspects of Python packages:

- `importlib.metadata` presents access to metadata from third-party
distributions.
- `importlib.resources` provides routines for accessing non-code
"resources" from Python packages.

> **See also:** import
> The language reference for the `import` statement.
>
> Packages specification
> Original specification of packages. Some semantics have changed since
> the writing of this document (e.g. redirecting based on `None`
> in `sys.modules`).
>
> The `.__import__()` function
> The `import` statement is syntactic sugar for this function.
>
> sys-path-init
> The initialization of `sys.path`.
>
> PEP 235
> Import on Case-Insensitive Platforms
>
> PEP 263
> Defining Python Source Code Encodings
>
> PEP 302
> New Import Hooks
>
> PEP 328
> Imports: Multi-Line and Absolute/Relative
>
> PEP 366
> Main module explicit relative imports
>
> PEP 420
> Implicit namespace packages
>
> PEP 451
> A ModuleSpec Type for the Import System
>
> PEP 488
> Elimination of PYO files
>
> PEP 489
> Multi-phase extension module initialization
>
> PEP 552
> Deterministic pycs
>
> PEP 3120
> Using UTF-8 as the Default Source Encoding
>
> PEP 3147
> PYC Repository Directories

## Functions

### `__import__(name, globals=None, locals=None, fromlist=(), level=0)`

An implementation of the built-in `__import__()` function.

> **Note:** Programmatic importing of modules should use `import_module()`
> instead of this function.

### `import_module(name, package=None)`

Import a module. The *name* argument specifies what module to
import in absolute or relative terms
(e.g. either `pkg.mod` or `..mod`). If the name is
specified in relative terms, then the *package* argument must be set to
the name of the package which is to act as the anchor for resolving the
package name (e.g. `import_module('..mod', 'pkg.subpkg')` will import
`pkg.mod`).

The `import_module()` function acts as a simplifying wrapper around
`importlib.__import__()`. This means all semantics of the function are
derived from `importlib.__import__()`. The most important difference
between these two functions is that `import_module()` returns the
specified package or module (e.g. `pkg.mod`), while `__import__()`
returns the top-level package or module (e.g. `pkg`).

If you are dynamically importing a module that was created since the
interpreter began execution (e.g., created a Python source file), you may
need to call `invalidate_caches()` in order for the new module to be
noticed by the import system.

If the module cannot be imported, `import_module()` will raise
`ImportError` or an appropriate subclass like
`ModuleNotFoundError`.

> *Changed in version 3.3.*
> Parent packages are automatically imported.

### `invalidate_caches()`

Invalidate the internal caches of finders stored at
`sys.meta_path`. If a finder implements `invalidate_caches()` then it
will be called to perform the invalidation.  This function should be called
if any modules are created/installed while your program is running to
guarantee all finders will notice the new module's existence.

> *Added in version 3.3.*

> *Changed in version 3.10.*
> Namespace packages created/installed in a different `sys.path`
> location after the same namespace was already imported are noticed.

### `reload(module)`

Reload a previously imported *module*.  The argument must be a module object,
so it must have been successfully imported before.  This is useful if you
have edited the module source file using an external editor and want to try
out the new version without leaving the Python interpreter.  The return value
is the module object (which can be different if re-importing causes a
different object to be placed in `sys.modules`).

When `reload()` is executed:

- Python module's code is recompiled and the module-level code re-executed,
defining a new set of objects which are bound to names in the module's
dictionary by reusing the loader which originally loaded the
module.  The `init` function of extension modules is not called a second
time.

- As with all other objects in Python the old objects are only reclaimed
after their reference counts drop to zero.

- The names in the module namespace are updated to point to any new or
changed objects.

- Other references to the old objects (such as names external to the module) are
not rebound to refer to the new objects and must be updated in each namespace
where they occur if that is desired.

There are a number of other caveats:

When a module is reloaded, its dictionary (containing the module's global
variables) is retained.  Redefinitions of names will override the old
definitions, so this is generally not a problem.  If the new version of a
module does not define a name that was defined by the old version, the old
definition remains.  This feature can be used to the module's advantage if it
maintains a global table or cache of objects --- with a `try`
statement it can test for the table's presence and skip its initialization if
desired:

```
try:
    cache
except NameError:
    cache = {}
```

It is generally not very useful to reload built-in or dynamically loaded
modules.  Reloading `sys, main__`, `builtins` and other
key <example-value> is not recommended.  In many cases extension modules are not
designed to be initialized more than once, and may fail in arbitrary ways
when reloaded.

If a module imports objects from another module using `from` ...
`import` ..., calling `reload()` for the other module does not
redefine the objects imported from it --- one way around this is to
re-execute the `from` statement, another is to use `import`
and qualified names (*module.name*) instead.

If a module instantiates instances of a class, reloading the module that
defines the class does not affect the method definitions of the instances ---
they continue to use the old class definition.  The same is true for derived
classes.

> *Added in version 3.4.*

> *Changed in version 3.7.*
> `ModuleNotFoundError` is raised when the module being reloaded lacks
> a `ModuleSpec`.

> **Warning:** This function is not thread-safe. Calling it from multiple threads can result
> in unexpected behavior. It's recommended to use the `threading.Lock`
> or other synchronization primitives for thread-safe module reloading.
