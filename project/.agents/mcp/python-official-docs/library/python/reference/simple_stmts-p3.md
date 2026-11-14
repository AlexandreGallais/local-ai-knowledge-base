---
title: "Simple statements (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/simple_stmts.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Simple statements (part 3 of 4)

## The `import` statement

```text
python-grammar
import_stmt: ["lazy"] "import" `module` ["as" `identifier`] ("," `module` ["as" `identifier`])*
           : | ["lazy"] "from" `relative_module` "import" `identifier` ["as" `identifier`]
           : ("," `identifier` ["as" `identifier`])*
           : | ["lazy"] "from" `relative_module` "import" "(" `identifier` ["as" `identifier`]
           : ("," `identifier` ["as" `identifier`])* [","] ")"
           : | "from" `relative_module` "import" "*"
module: (`identifier` ".")* `identifier`
relative_module: "."* `module` | "."+
```

The basic <example-value> statement (no `from` clause) is executed in two
steps:

1. find a module, loading and initializing it if necessary
1. define a name or names in the current namespace for the scope where
the `import` statement occurs, just as an assignment statement
would (including `global` and `nonlocal` semantics).

When the statement contains multiple clauses (separated by
commas) the two steps are carried out separately for each clause, just
as though the clauses had been separated out into individual import
statements.

The details of the first step, finding and loading modules, are described in
greater detail in the section on the import system,
which also describes the various types of packages and modules that can
be imported, as well as all the hooks that can be used to customize
the import system. Note that failures in this step may indicate either
that the module could not be located, *or* that an error occurred while
initializing the module, which includes execution of the module's code.

If the requested module is retrieved successfully, it will be made
available in the local namespace in one of three ways:

- If the module name is followed by `as`, then the name
following `as` is bound directly to the imported module.
- If no other name is specified, and the module being imported is a top
level module, the module's name is bound in the local namespace as a
reference to the imported module
- If the module being imported is *not* a top level module, then the name
of the top level package that contains the module is bound in the local
namespace as a reference to the top level package. The imported module
must be accessed using its full qualified name rather than directly

The `from` form uses a slightly more complex process:

1. find the module specified in the `from` clause, loading and
initializing it if necessary;
1. for each of the identifiers specified in the `import` clauses:

1. check if the imported module has an attribute by that name
1. if not, attempt to import a submodule with that name and then
check the imported module again for that attribute
1. if the attribute is not found, `ImportError` is raised.
1. otherwise, a reference to that value is stored in the current namespace,
using the name in the `as` clause if it is present,
otherwise using the attribute name

Examples:

```
import foo                 # foo imported and bound locally
import foo.bar.baz         # foo, foo.bar, and foo.bar.baz imported, foo bound locally
import foo.bar.baz as fbb  # foo, foo.bar, and foo.bar.baz imported, foo.bar.baz bound as fbb
from foo.bar import baz    # foo, foo.bar, and foo.bar.baz imported, foo.bar.baz bound as baz
from foo import attr       # foo imported and foo.attr bound as attr
```

If the list of identifiers is replaced by a star (`'*'`), all public
names defined in the module are bound in the local namespace for the scope
where the `import` statement occurs.

### `module.__all__`

The *public names* defined by a module are determined by checking the module's
namespace for a variable named `__all__`; if defined, it must be a sequence
of strings which are names defined or imported by that module.
Names containing non-ASCII characters must be in the normalization form
NFKC; see lexical-names-nonascii for details.  The names
given in `__all__` are all considered public and are required to exist.  If
`__all__` is not defined, the set of public names includes all names found
in the module's namespace which do not begin with an underscore character
(`'_'`).  `__all__` should contain the entire public API. It is intended
to avoid accidentally exporting items that are not part of the API (such as
library modules which were imported and used within the module).

The wild card form of import --- `from module import *` --- is only allowed at
the module level.  Attempting to use it in class or function definitions will
raise a `SyntaxError`.

When specifying what module to import you do not have to specify the absolute
name of the module. When a module or package is contained within another
package it is possible to make a relative import within the same top package
without having to mention the package name. By using leading dots in the
specified module or package after `from` you can specify how high to
traverse up the current package hierarchy without specifying exact names. One
leading dot means the current package where the module making the import
exists. Two dots means up one package level. Three dots is up two levels, etc.
So if you execute `from . import mod` from a module in the `pkg` package
then you will end up importing `pkg.mod`. If you execute ``from ..subpkg2
import mod` from within `pkg.subpkg1` you will import `pkg.subpkg2.mod``.
The specification for relative imports is contained in
the relativeimports section.

`importlib.import_module()` is provided to support applications that
determine dynamically the modules to be loaded.

### Lazy imports

The `lazy` keyword is a soft keyword that
only has special meaning when it appears immediately before an
`import` or `from` statement. When an import statement is
preceded by the `lazy` keyword, the import becomes *lazy*: the
module is not loaded immediately at the import statement. Instead, a lazy
proxy object is created and bound to the name. The actual module is loaded
on first use of that name.

Lazy imports are only permitted at module scope. Using `lazy`
inside a function, class body, or
`try`/`except`/`finally` block raises a
`SyntaxError`. Star imports cannot be lazy (``lazy from module import
*`` is a syntax error), and future statements cannot be
lazy.

When using `lazy from ... import`, each imported name is bound to a lazy
proxy object. The first access to any of these names triggers loading of the
entire module and resolves only that specific name to its actual value.
Other names remain as lazy proxies until they are accessed.

Example:

```
lazy import json
import sys

print('json' in sys.modules)  # False - json module not yet loaded

# First use triggers loading
result = json.dumps({"hello": "world"})

print('json' in sys.modules)  # True - now loaded
```

If an error occurs during module loading (such as `ImportError` or
`SyntaxError`), it is raised at the point where the lazy import is first
used, not at the import statement itself.

See PEP 810 for the full specification of lazy imports.

> *Added in version 3.15.*

#### Compatibility via `__lazy_modules__`

As an alternative to using the `lazy` keyword, a module can opt
into lazy loading for specific imports by defining a module-level
`__lazy_modules__` variable.  When present, it must be a
container of fully qualified module name strings.  Any regular (non-`lazy`)
`import` statement at module scope whose target appears in
`__lazy_modules__` is treated as a lazy import, exactly as if the
`lazy` keyword had been used.

This provides a way to enable lazy loading for specific dependencies without
changing individual `import` statements. This is useful when supporting
Python versions older than 3.15 while using lazy imports in 3.15+:

```
__lazy_modules__ = ["json", "pathlib"]

import json     # loaded lazily (name is in __lazy_modules__)
import os       # loaded eagerly (name not in __lazy_modules__)

import pathlib  # loaded lazily
```

Relative imports are resolved to their absolute name before the lookup, so
`__lazy_modules__` must always contain fully qualified module names.

For `from`-style imports, the relevant name is the module following
`from`, not the names of its members:

```
# In mypackage/mymodule.py
__lazy_modules__ = ["mypackage", "mypackage.sub.utils"]

from . import helper         # loaded lazily: . resolves to mypackage
from .sub.utils import func  # loaded lazily: .sub.utils resolves to mypackage.sub.utils
import json                  # loaded eagerly (not in __lazy_modules__)
```

Imports inside functions, class bodies, or
`try`/`except`/`finally` blocks are always eager,
regardless of `__lazy_modules__`.

> *Added in version 3.15.*

### Future statements

A future statement is a directive to the compiler that a particular
module should be compiled using syntax or semantics that will be available in a
specified future release of Python where the feature becomes standard.

The future statement is intended to ease migration to future versions of Python
that introduce incompatible changes to the language.  It allows use of the new
features on a per-module basis before the release in which the feature becomes
standard.

```text
python-grammar
future_stmt: "from" "__future__" "import" `feature` ["as" `identifier`]
           : ("," `feature` ["as" `identifier`])*
           : | "from" "__future__" "import" "(" `feature` ["as" `identifier`]
           : ("," `feature` ["as" `identifier`])* [","] ")"
feature: `identifier`
```

A future statement must appear near the top of the module.  The only lines that
can appear before a future statement are:

- the module docstring (if any),
- comments,
- blank lines, and
- other future statements.

The only feature that requires using the future statement is
`annotations` (see PEP 563).

All historical features enabled by the future statement are still recognized
by Python 3.  The list includes `absolute_import`, `division`,
`generators`, `generator_stop`, `unicode_literals`,
`print_function`, `nested_scopes` and `with_statement`.  They are
all redundant because they are always enabled, and only kept for
backwards compatibility.

A future statement is recognized and treated specially at compile time: Changes
to the semantics of core constructs are often implemented by generating
different code.  It may even be the case that a new feature introduces new
incompatible syntax (such as a new reserved word), in which case the compiler
may need to parse the module differently.  Such decisions cannot be pushed off
until runtime.

For any given release, the compiler knows which feature names have been defined,
and raises a compile-time error if a future statement contains a feature not
known to it.

The direct runtime semantics are the same as for any import statement: there is
a standard module `__future__`, described later, and it will be imported in
the usual way at the time the future statement is executed.

The interesting runtime semantics depend on the specific feature enabled by the
future statement.

Note that there is nothing special about the statement:

```
import __future__ [as name]
```

That is not a future statement; it's an ordinary import statement with no
special semantics or syntax restrictions.

Code compiled by calls to the built-in functions `exec()` and `compile()`
that occur in a module `M` containing a future statement will, by default,
use the new syntax or semantics associated with the future statement.  This can
be controlled by optional arguments to `compile()` --- see the documentation
of that function for details.

A future statement typed at an interactive interpreter prompt will take effect
for the rest of the interpreter session.  If an interpreter is started with the
`-i` option, is passed a script name to execute, and the script includes
a future statement, it will be in effect in the interactive session started
after the script is executed.

> **See also:** PEP 236 - Back to the __future__
> The original proposal for the __future__ mechanism.

## The `global` statement

```text
python-grammar
global_stmt: "global" `identifier` ("," `identifier`)*
```

The `global` statement causes the listed identifiers to be interpreted
as globals. It would be impossible to assign to a global variable without
`global`, although free variables may refer to globals without being
declared global.

The `global` statement applies to the entire current scope
(module, function body or class definition).
A `SyntaxError` is raised if a variable is used or
assigned to prior to its global declaration in the scope.

At the module level, all variables are global, so a `global`
statement has no effect.
However, variables must still not be used or
assigned to prior to their `global` declaration.
This requirement is relaxed in the interactive prompt (REPL).

**Programmer's note:** `global` is a directive to the parser.  It
applies only to code parsed at the same time as the `global` statement.
In particular, a `global` statement contained in a string or code
object supplied to the built-in `exec()` function does not affect the code
block *containing* the function call, and code contained in such a string is
unaffected by `global` statements in the code containing the function
call.  The same applies to the `eval()` and `compile()` functions.

## The `nonlocal` statement

```text
python-grammar
nonlocal_stmt: "nonlocal" `identifier` ("," `identifier`)*
```

When the definition of a function or class is nested (enclosed) within
the definitions of other functions, its nonlocal scopes are the local
scopes of the enclosing functions. The `nonlocal` statement
causes the listed identifiers to refer to names previously bound in
nonlocal scopes. It allows encapsulated code to rebind such nonlocal
identifiers.  If a name is bound in more than one nonlocal scope, the
nearest binding is used. If a name is not bound in any nonlocal scope,
or if there is no nonlocal scope, a `SyntaxError` is raised.

The `nonlocal` statement applies to the entire scope of a function or
class body. A `SyntaxError` is raised if a variable is used or
assigned to prior to its nonlocal declaration in the scope.

> **See also:** PEP 3104 - Access to Names in Outer Scopes
> The specification for the `nonlocal` statement.

**Programmer's note:** `nonlocal` is a directive to the parser
and applies only to code parsed along with it.  See the note for the
`global` statement.
