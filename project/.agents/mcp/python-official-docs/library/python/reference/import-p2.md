---
title: "The import system (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/import.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# The import system (part 2 of 3)

## Loading

If and when a module spec is found, the import machinery will use it (and
the loader it contains) when loading the module.  Here is an approximation
of what happens during the loading portion of import:

```
module = None
if spec.loader is not None and hasattr(spec.loader, 'create_module'):
    # It is assumed 'exec_module' will also be defined on the loader.
    module = spec.loader.create_module(spec)
if module is None:
    module = ModuleType(spec.name)
# The import-related module attributes get set here:
_init_module_attrs(spec, module)

if spec.loader is None:
    # unsupported
    raise ImportError

sys.modules[spec.name] = module
try:
    spec.loader.exec_module(module)
except BaseException:
    try:
        del sys.modules[spec.name]
    except KeyError:
        pass
    raise
return sys.modules[spec.name]
```

Note the following details:

- If there is an existing module object with the given name in
`sys.modules`, import will have already returned it.

- The module will exist in `sys.modules` before the loader
executes the module code.  This is crucial because the module code may
(directly or indirectly) import itself; adding it to `sys.modules`
beforehand prevents unbounded recursion in the worst case and multiple
loading in the best.

- If loading fails, the failing module -- and only the failing module --
gets removed from `sys.modules`.  Any module already in the
`sys.modules` cache, and any module that was successfully loaded
as a side-effect, must remain in the cache.  This contrasts with
reloading where even the failing module is left in `sys.modules`.

- After the module is created but before execution, the import machinery
sets the import-related module attributes ("_init_module_attrs" in
the pseudo-code example above), as summarized in a
later section.

- Module execution is the key <example-value> of loading in which the module's
namespace gets populated.  Execution is entirely delegated to the
loader, which gets to decide what gets populated and how.

- The module created during loading and passed to exec_module() may
not be the one returned at the end of import.

> *Changed in version 3.4.*
> The import system has taken over the boilerplate responsibilities of
> loaders.  These were previously performed by the
> `importlib.abc.Loader.load_module` method.

> *Changed in version 3.15.*
> The `load_module` method is no longer used.

### Loaders

Module loaders provide the critical function of loading: module execution.
The import machinery calls the `importlib.abc.Loader.exec_module()`
method with a single argument, the module object to execute.  Any value
returned from `exec_module()` is ignored.

Loaders must satisfy the following requirements:

- If the module is a Python module (as opposed to a built-in module or a
dynamically loaded extension), the loader should execute the module's code
in the module's global name space (`module.__dict__`).

- If the loader cannot execute the module, it should raise an
`ImportError`, although any other exception raised during
`exec_module()` will be propagated.

In many cases, the finder and loader can be the same object; in such cases the
`find_spec()` method would just return a
spec with the loader set to `self`.

Module loaders may opt in to creating the module object during loading
by implementing a `create_module()` method.
It takes one argument, the module spec, and returns the new module object
to use during loading.  `create_module()` does not need to set any attributes
on the module object.  If the method returns `None`, the
import machinery will create the new module itself.

> *Added in version 3.4.*
> The `create_module()` method of loaders.

> *Changed in version 3.4.*
> The `importlib.abc.Loader.load_module` method was replaced by
> `exec_module()` and the import
> machinery assumed all the boilerplate responsibilities of loading.
> For compatibility with existing loaders, the import machinery will use
> the `load_module()` method of loaders if it exists and the loader does
> not also implement `exec_module()`.  However, `load_module()` has been
> deprecated and loaders should implement `exec_module()` instead.
>
> The `load_module()` method must implement all the boilerplate loading
> functionality described above in addition to executing the module.  All
> the same constraints apply, with some additional clarification:
>
> - If there is an existing module object with the given name in
> `sys.modules`, the loader must use that existing module.
> (Otherwise, `importlib.reload()` will not work correctly.)  If the
> named module does not exist in `sys.modules`, the loader
> must create a new module object and add it to `sys.modules`.
>
> - The module *must* exist in `sys.modules` before the loader
> executes the module code, to prevent unbounded recursion or multiple
> loading.
>
> - If loading fails, the loader must remove any modules it has inserted
> into `sys.modules`, but it must remove **only** the failing
> module(s), and only if the loader itself has loaded the module(s)
> explicitly.

> *Changed in version 3.5.*
> A `DeprecationWarning` is raised when `exec_module()` is defined but
> `create_module()` is not.

> *Changed in version 3.6.*
> An `ImportError` is raised when `exec_module()` is defined but
> `create_module()` is not.

> *Changed in version 3.10.*
> Use of `load_module()` will raise `ImportWarning`.

### Submodules

When a submodule is loaded using any mechanism (e.g. `importlib` APIs, the
`import` or `import-from` statements, or built-in `__import__()`) a
binding is placed in the parent module's namespace to the submodule object.
For example, if package `spam` has a submodule `foo`, after importing
`spam.foo`, `spam` will have an attribute `foo` which is bound to the
submodule.  Let's say you have the following directory structure:

```
spam/
    __init__.py
    foo.py
```

and `spam/__init__.py` has the following line in it:

```
from .foo import Foo
```

then executing the following puts name bindings for `foo` and `Foo` in the
`spam` module:

```
>>> import spam
>>> spam.foo
<module 'spam.foo' from '/tmp/imports/spam/foo.py'>
>>> spam.Foo
<class 'spam.foo.Foo'>
```

Given Python's familiar name binding rules this might seem surprising, but
it's actually a fundamental feature of the import system.  The invariant
holding is that if you have `sys.modules['spam']` and
`sys.modules['spam.foo']` (as you would after the above import), the latter
must appear as the `foo` attribute of the former.

### Module specs

The import machinery uses a variety of information about each module
during import, especially before loading.  Most of the information is
common to all modules.  The purpose of a module's spec is to encapsulate
this import-related information on a per-module basis.

Using a spec during import allows state to be transferred between import
system components, e.g. between the finder that creates the module spec
and the loader that executes it.  Most importantly, it allows the
import machinery to perform the boilerplate operations of loading,
whereas without a module spec the loader had that responsibility.

The module's spec is exposed as `module.__spec__`. Setting
`__spec__` appropriately applies equally to
modules initialized during interpreter startup.
The one exception is `__main__`, where `__spec__` is
set to None in some cases.

See `ModuleSpec` for details on the contents of
the module spec.

> *Added in version 3.4.*

### __path__ attributes on modules

The `__path__` attribute should be a (possibly empty)
sequence of strings enumerating the locations where the package's
submodules will be found. By definition, if a module has a `__path__`
attribute, it is a package.

A package's `__path__` attribute is used during imports of its
subpackages.
Within the import machinery, it functions much the same as `sys.path`,
i.e. providing a list of locations to search for modules during import.
However, `__path__` is typically much more constrained than
`sys.path`.

The same rules used for `sys.path` also apply to a package's
`__path__`. `sys.path_hooks` (described below) are
consulted when traversing a package's `__path__`.

A package's `__init__.py` file may set or alter the package's
`__path__`
attribute, and this was typically the way namespace packages were implemented
prior to PEP 420.  With the adoption of PEP 420, namespace packages no
longer need to supply `__init__.py` files containing only `__path__`
manipulation code; the import machinery automatically sets `__path__`
correctly for the namespace package.

### Module reprs

By default, all modules have a usable repr, however depending on the
attributes set above, and in the module's spec, you can more explicitly
control the repr of module objects.

If the module has a spec (`__spec__`), the import machinery will try
to generate a repr from it.  If that fails or there is no spec, the import
system will craft a default repr using whatever information is available
on the module.  It will try to use the `module.__name__`,
`module.__file__`, and `module.__loader__` as input into the repr,
with defaults for whatever information is missing.

Here are the exact rules used:

- If the module has a `__spec__` attribute, the information in the spec
is used to generate the repr.  The "name", "loader", "origin", and
"has_location" attributes are consulted.

- If the module has a `__file__` attribute, this is used as part of the
module's repr.

- If the module has no `__file__` but does have a `__loader__` that is not
`None`, then the loader's repr is used as part of the module's repr.

- Otherwise, just use the module's `__name__` in the repr.

> *Changed in version 3.12.*
> Use of `module_repr()`, having been deprecated since Python 3.4, was
> removed in Python 3.12 and is no longer called during the resolution of a
> module's repr.

### Cached bytecode invalidation

Before Python loads cached bytecode from a `.pyc` file, it checks whether the
cache is up-to-date with the source `.py` file. By default, Python does this
by storing the source's last-modified timestamp and size in the cache file when
writing it. At runtime, the import system then validates the cache file by
checking the stored metadata in the cache file against the source's
metadata.

Python also supports "hash-based" cache files, which store a hash of the source
file's contents rather than its metadata. There are two variants of hash-based
`.pyc` files: checked and unchecked. For checked hash-based `.pyc` files,
Python validates the cache file by hashing the source file and comparing the
resulting hash with the hash in the cache file. If a checked hash-based cache
file is found to be invalid, Python regenerates it and writes a new checked
hash-based cache file. For unchecked hash-based `.pyc` files, Python simply
assumes the cache file is valid if it exists. Hash-based `.pyc` files
validation behavior may be overridden with the `--check-hash-based-pycs`
flag.

> *Changed in version 3.7.*
> Added hash-based `.pyc` files. Previously, Python only supported
> timestamp-based invalidation of bytecode caches.
