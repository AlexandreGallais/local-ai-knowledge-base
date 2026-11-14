---
title: "Data model (part 3 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/datamodel.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Data model (part 3 of 10)

### Callable types

These are the types to which the function call operation (see section
calls) can be applied:

#### User-defined functions

A user-defined function object is created by a function definition (see
section function).  It should be called with an argument list
containing the same number of items as the function's formal parameter
list.

##### Special read-only attributes

- - Attribute
- Meaning

- - .. attribute:: function.__builtins__
- A reference to the `dictionary` that holds the function's
builtins namespace.

> *Added in version 3.10.*

- - .. attribute:: function.__globals__
- A reference to the `dictionary` that holds the function's
global variables -- the global namespace of the module
in which the function was defined.

- - .. attribute:: function.__closure__
- `None` or a `tuple` of cells that contain bindings for the names specified
in the `co_freevars` attribute of the function's
`code object`.

A cell object has the attribute `cell_contents`.
This can be used to get the value of the cell, as well as set the value.

##### Special writable attributes

Most of these attributes check the type of the assigned value:

- - Attribute
- Meaning

- - .. attribute:: function.__doc__
- The function's documentation string, or `None` if unavailable.

- - .. attribute:: function.__name__
- The function's name.
See also: `__name__ attributes`.

- - .. attribute:: function.__qualname__
- The function's qualified name.
See also: `__qualname__ attributes`.

> *Added in version 3.3.*

- - .. attribute:: function.__module__
- The name of the module the function was defined in,
or `None` if unavailable.

- - .. attribute:: function.__defaults__
- A `tuple` containing default parameter values
for those parameters that have defaults,
or `None` if no parameters have a default value.

- - .. attribute:: function.__code__
- The code object representing
the compiled function body.

- - .. attribute:: function.__dict__
- The namespace supporting arbitrary function attributes.
See also: `__dict__ attributes`.

- - .. attribute:: function.__annotations__
- A `dictionary` containing annotations of
parameters.
The keys of the dictionary are the parameter names,
and `'return'` for the return annotation, if provided.
See also: `object.__annotations__`.

> *Changed in version 3.14.*
> Annotations are now lazily evaluated.
> See PEP 649.

- - .. attribute:: function.__annotate__
- The annotate function for this function, or `None`
if the function has no annotations. See `object.__annotate__`.

> *Added in version 3.14.*

- - .. attribute:: function.__kwdefaults__
- A `dictionary` containing defaults for keyword-only
parameters.

- - .. attribute:: function.__type_params__
- A `tuple` containing the type parameters of
a generic function.

> *Added in version 3.12.*

Function objects also support getting and setting arbitrary attributes, which
can be used, for example, to attach metadata to functions.  Regular attribute
dot-notation is used to get and set such attributes.

> **CPython implementation detail:** CPython's current implementation only supports function attributes
> on user-defined functions. Function attributes on
> built-in functions may be supported in the
> future.

Additional information about a function's definition can be retrieved from its
code object
(accessible via the `__code__` attribute).

#### Instance methods

An instance method object combines a class, a class instance and any
callable object (normally a user-defined function).

Special read-only attributes:

- - .. attribute:: method.__self__
- Refers to the class instance object to which the method is
bound

- - .. attribute:: method.__func__
- Refers to the original function object

- - .. attribute:: method.__doc__
- The method's documentation
(same as `method.__func__.__doc__`).
A `string` if the original function had a docstring, else
`None`.

- - .. attribute:: method.__name__
- The name of the method
(same as `method.__func__.__name__`)

- - .. attribute:: method.__module__
- The name of the module the method was defined in, or `None` if
unavailable.

Methods also support accessing (but not setting) the arbitrary function
attributes on the underlying function object.

User-defined method objects may be created when getting an attribute of a
class (perhaps via an instance of that class), if that attribute is a
user-defined function object or a
`classmethod` object.

When an instance method object is created by retrieving a user-defined
function object from a class via one of its
instances, its `__self__` attribute is the instance, and the
method object is said to be *bound*.  The new method's `__func__`
attribute is the original function object.

When an instance method object is created by retrieving a `classmethod`
object from a class or instance, its `__self__` attribute is the
class itself, and its `__func__` attribute is the function object
underlying the class method.

When an instance method object is called, the underlying function
(`__func__`) is called, inserting the class instance
(`__self__`) in front of the argument list.  For instance, when
`C` is a class which contains a definition for a function
`f()`, and `x` is an instance of `C`, calling `x.f(1)` is
equivalent to calling `C.f(x, 1)`.

When an instance method object is derived from a `classmethod` object, the
"class instance" stored in `__self__` will actually be the class
itself, so that calling either `x.f(1)` or `C.f(1)` is equivalent to
calling `f(C,1)` where `f` is the underlying function.

It is important to note that user-defined functions
which are attributes of a class instance are not converted to bound
methods; this *only* happens when the function is an attribute of the
class.

#### Generator functions

A function or method which contains a `yield` expression (see section
yieldexpr) is called a generator function.  Such a function, when
called, always returns an iterator object which can be used to
execute the body of the function:  calling the iterator's
`iterator.__next__()` method will cause the function to execute until
it provides a value using the `yield` expression.  When the
function executes a `return` statement or falls off the end, a
`StopIteration` exception is raised and the iterator will have
reached the end of the set of values to be returned.

#### Coroutine functions

A function or method which is defined using `async def` is called
a coroutine function.  Such a function, when called, returns a
coroutine object.  It may contain `await` expressions,
as well as `async with` and `async for` statements. See
also the coroutine-objects section.

#### Asynchronous generator functions

A function or method which is defined using `async def` and
which contains a `yield` expression is called a
asynchronous generator function.  Such a function, when called,
returns an asynchronous iterator object which can be used in an
`async for` statement to execute the body of the function.

Calling the asynchronous iterator's
`aiterator.__anext__()` method
will return an awaitable which when awaited
will execute until it provides a value using the `yield`
expression.  When the function executes an empty `return`
statement or falls off the end, a `StopAsyncIteration` exception
is raised and the asynchronous iterator will have reached the end of
the set of values to be yielded.

#### Built-in functions

A built-in function object is a wrapper around a C function.  Examples of
built-in functions are `len()` and `math.sin()` (`math` is a
standard built-in module). The number and type of the arguments are
determined by the C function. Special read-only attributes:

- `__doc__` is the function's documentation string, or `None` if
unavailable. See `function.__doc__`.
- `__name__` is the function's name. See `function.__name__`.
- `__self__` is the module object the function was defined in or
`None` if unavailable.
- `__module__` is the name of
the module the function was defined in or `None` if unavailable.
See `function.__module__`.

#### Built-in methods

This is really a different disguise of a built-in function, this time containing
an object passed to the C function as an implicit extra argument.  An example of
a built-in method is `alist.append()`, assuming *alist* is a list object. In
this case, the special read-only attribute `__self__` is set to the object
denoted by *alist*. (The attribute has the same semantics as it does with
`other instance methods`.)

#### Classes

Classes are callable.  These objects normally act as factories for new
instances of themselves, but variations are possible for class types that
override `__new__()`.  The arguments of the call are passed to
`__new__() and, in the typical case, to init__()` to
initialize the new instance.

#### Class Instances

Instances of arbitrary classes can be made callable by defining a
`__call__()` method in their class.

### Modules

Modules are a basic <example-value> unit of Python code, and are created by
the import system as invoked either by the
`import` statement, or by calling
functions such as `importlib.import_module()` and built-in
`__import__()`.  A module object has a namespace implemented by a
`dictionary` object (this is the dictionary referenced by the
`__globals__`
attribute of functions defined in the module).  Attribute references are
translated to lookups in this dictionary, e.g., `m.x` is equivalent to
`m.__dict__["x"]`. A module object does not contain the code object used
to initialize the module (since it isn't needed once the initialization is
done).

Attribute assignment updates the module's namespace dictionary, e.g.,
`m.x = 1` is equivalent to `m.__dict__["x"] = 1`.

#### Import-related attributes on module objects

Module objects have the following attributes that relate to the
import system. When a module is created using the machinery associated
with the import system, these attributes are filled in based on the module's
spec, before the loader executes and loads the
module.

To create a module dynamically rather than using the import system,
it's recommended to use `importlib.util.module_from_spec()`,
which will set the various import-controlled attributes to appropriate values.
It's also possible to use the `types.ModuleType` constructor to create
modules directly, but this technique is more error-prone, as most attributes
must be manually set on the module object after it has been created when using
this approach.

> **Caution:** With the exception of `__name__`, it is **strongly**
> recommended that you rely on `__spec__` and its attributes
> instead of any of the other individual attributes listed in this subsection.
> Note that updating an attribute on `__spec__` will not update the
> corresponding attribute on the module itself:
>
>
> ```python
>
> >>> import typing
> >>> typing.__name__, typing.__spec__.name
> ('typing', 'typing')
> >>> typing.__spec__.name = 'spelling'
> >>> typing.__name__, typing.__spec__.name
> ('typing', 'spelling')
> >>> typing.__name__ = 'keyboard_smashing'
> >>> typing.__name__, typing.__spec__.name
> ('keyboard_smashing', 'spelling')
> ```
>

### `module.__name__`

The name used to uniquely identify the module in the import system.
For a directly executed module, this will be set to `"__main__"`.

This attribute must be set to the fully qualified name of the module.
It is expected to match the value of
`module.__spec__.name`.

### `module.__spec__`

A record of the module's import-system-related state.

Set to the `module spec` that was
used when importing the module. See module-specs for more details.

> *Added in version 3.4.*

### `module.__package__`

The package a module belongs to.

If the module is top-level (that is, not a part of any specific package)
then the attribute should be set to `''` (the empty string). Otherwise,
it should be set to the name of the module's package (which can be equal to
`module.__name__` if the module itself is a package). See PEP 366
for further details.

This attribute is used instead of `__name__` to calculate
explicit relative imports for main modules. It defaults to `None` for
modules created dynamically using the `types.ModuleType` constructor;
use `importlib.util.module_from_spec()` instead to ensure the attribute
is set to a `str`.

It is **strongly** recommended that you use
`module.__spec__.parent`
instead of `module.__package__. package__` is now only used
as a fallback if `__spec__.parent` is not set, and this fallback
path is deprecated.

> *Changed in version 3.4.*
> This attribute now defaults to `None` for modules created dynamically
> using the `types.ModuleType` constructor.
> Previously the attribute was optional.

> *Changed in version 3.6.*
> The value of `__package__` is expected to be the same as
> `__spec__.parent`.
> `__package__` is now only used as a fallback during import
> resolution if `__spec__.parent` is not defined.

> *Changed in version 3.10.*
> `ImportWarning` is raised if an import resolution falls back to
> `__package__` instead of
> `__spec__.parent`.

> *Changed in version 3.12.*
> Raise `DeprecationWarning` instead of `ImportWarning` when
> falling back to `__package__` during import resolution.

> *Deprecated since version 3.13, removed in version 3.15.*
> `__package__` will cease to be set or taken into consideration
> by the import system or standard library.

### `module.__loader__`

The loader object that the import machinery used to load the module.

This attribute is mostly useful for introspection, but can be used for
additional loader-specific functionality, for example getting data
associated with a loader.

`__loader__` defaults to `None` for modules created dynamically
using the `types.ModuleType` constructor;
use `importlib.util.module_from_spec()` instead to ensure the attribute
is set to a loader object.

It is **strongly** recommended that you use
`module.__spec__.loader`
instead of `module.__loader__`.

> *Changed in version 3.4.*
> This attribute now defaults to `None` for modules created dynamically
> using the `types.ModuleType` constructor.
> Previously the attribute was optional.

> *Deprecated since version 3.12, removed in version 3.16.*
> Setting `__loader__` on a module while failing to set
> `__spec__.loader` is deprecated. In Python 3.16,
> `__loader__` will cease to be set or taken into consideration by
> the import system or the standard library.

### `module.__path__`

A (possibly empty) sequence of strings enumerating the locations
where the package's submodules will be found. Non-package modules should
not have a `__path__` attribute. See package-path-rules for
more details.

It is **strongly** recommended that you use
`module.__spec__.submodule_search_locations`
instead of `module.__path__`.
