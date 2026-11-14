---
title: "Data model (part 4 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/datamodel.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Data model (part 4 of 10)

### `module.__file__`

`__file__` is an optional attribute that
may or may not be set. Both attributes should be a `str` when they
are available.

An optional attribute, `__file__` indicates the pathname of the file
from which the module was loaded (if loaded from a file), or the pathname of
the shared library file for extension modules loaded dynamically from a
shared library. It might be missing for certain types of modules, such as C
modules that are statically linked into the interpreter, and the
import system may opt to leave it unset if it
has no semantic meaning (for example, a module loaded from a database).

> *Changed in version 3.15.*
> The `__cached__` attribute is no longer set on modules or taken into
> consideration by the import system or standard library.

#### Other writable attributes on module objects

As well as the import-related attributes listed above, module objects also have
the following writable attributes:

### `module.__doc__`

The module's documentation string, or `None` if unavailable.
See also: `__doc__ attributes`.

### `module.__annotations__`

A dictionary containing variable annotations
collected during module body execution.  For best practices on working with
`__annotations__`, see `annotationlib`.

> *Changed in version 3.14.*
> Annotations are now lazily evaluated.
> See PEP 649.

### `module.__annotate__`

The annotate function for this module, or `None` if the module has
no annotations. See also: `__annotate__` attributes.

> *Added in version 3.14.*

### `module.__lazy_modules__`

A container (an object implementing `__contains__()`) of fully
qualified module name strings.  When defined
at module scope, any regular `import` statement in that module whose
target module name appears in this container is treated as a
lazy import, as if the `lazy` keyword had
been used.  Imports inside functions, class bodies, or
`try`/`except`/`finally` blocks are unaffected.

See lazy-modules-compat for details and examples.

> *Added in version 3.15.*

#### Module dictionaries

Module objects also have the following special read-only attribute:

### `module.__dict__`

The module's namespace as a dictionary object. Uniquely among the attributes
listed here, `__dict__` cannot be accessed as a global variable from
within a module; it can only be accessed as an attribute on module objects.

> **CPython implementation detail:** Because of the way CPython clears module dictionaries, the module
> dictionary will be cleared when the module falls out of scope even if the
> dictionary still has live references.  To avoid this, copy the dictionary
> or keep the module around while using its dictionary directly.

### Custom classes

Custom class types are typically created by class definitions (see section
class).  A class has a namespace implemented by a dictionary object.
Class attribute references are translated to lookups in this dictionary, e.g.,
`C.x` is translated to `C.__dict__["x"]` (although there are a number of
hooks which allow for other means of locating attributes). When the attribute
name is not found there, the attribute search continues in the base classes.
This search of the base classes uses the C3 method resolution order which
behaves correctly even in the presence of 'diamond' inheritance structures
where there are multiple inheritance paths leading back to a common ancestor.
Additional details on the C3 MRO used by Python can be found at
python_2.3_mro.

When a class attribute reference (for class `C`, say) would yield a
class method object, it is transformed into an instance method object whose
`__self__` attribute is `C`.
When it would yield a `staticmethod` object,
it is transformed into the object wrapped by the static method
object. See section descriptors for another way in which attributes
retrieved from a class may differ from those actually contained in its
`__dict__`.

Class attribute assignments update the class's dictionary, never the dictionary
of a base class.

A class object can be called (see above) to yield a class instance (see below).

#### Special attributes

- - Attribute
- Meaning

- - .. attribute:: type.__name__
- The class's name.
See also: `__name__ attributes`.

- - .. attribute:: type.__qualname__
- The class's qualified name.
See also: `__qualname__ attributes`.

- - .. attribute:: type.__module__
- The name of the module in which the class was defined.

- - .. attribute:: type.__dict__
- A `mapping proxy`
providing a read-only view of the class's namespace.
See also: `__dict__ attributes`.

- - .. attribute:: type.__bases__
- A `tuple` containing the class's bases.
In most cases, for a class defined as `class X(A, B, C)`,
`X.__bases__` will be exactly equal to `(A, B, C)`.

- - .. attribute:: type.__base__
- .. impl-detail::

The single base class in the inheritance chain that is responsible
for the memory layout of instances. This attribute corresponds to
`tp_base` at the C level.

- - .. attribute:: type.__doc__
- The class's documentation string, or `None` if undefined.
Not inherited by subclasses.

- - .. attribute:: type.__annotations__
- A dictionary containing
variable annotations
collected during class body execution. See also:
`__annotations__ attributes`.

For best practices on working with `__annotations__`,
please see `annotationlib`. Use
`annotationlib.get_annotations()` instead of accessing this
attribute directly.

> **Warning:** Accessing the `__annotations__` attribute directly
> on a class object may return annotations for the wrong class, specifically
> in certain cases where the class, its base class, or a metaclass
> is defined under `from __future__ import annotations`.
> See PEP 749 for details.
>
> This attribute does not exist on certain builtin classes. On
> user-defined classes without `__annotations__`, it is an
> empty dictionary.

> *Changed in version 3.14.*
> Annotations are now lazily evaluated.
> See PEP 649.

- - .. method:: type.__annotate__
- The annotate function for this class, or `None`
if the class has no annotations.
See also: `__annotate__ attributes`.

> *Added in version 3.14.*

- - .. attribute:: type.__type_params__
- A `tuple` containing the type parameters of
a generic class.

> *Added in version 3.12.*

- - .. attribute:: type.__static_attributes__
- A `tuple` containing names of attributes of this class which are
assigned through `self.X` from any function in its body.

> *Added in version 3.13.*

- - .. attribute:: type.__firstlineno__
- The line number of the first line of the class definition,
including decorators.
Setting the `__module__` attribute removes the
`__firstlineno__` item from the type's dictionary.

> *Added in version 3.13.*

- - .. attribute:: type.__mro__
- The `tuple` of classes that are considered when looking for
base classes during method resolution.

#### Special methods

In addition to the special attributes described above, all Python classes also
have the following two methods available:

### `type.mro`

This method can be overridden by a metaclass to customize the method
resolution order for its instances.  It is called at class instantiation,
and its result is stored in `__mro__`.

### `type.__subclasses__`

Each class keeps a list of weak references to its immediate subclasses. This
method returns a list of all those references still alive. The list is in
definition order. Example:

```python

>>> class A: pass
>>> class B(A): pass
>>> A.__subclasses__()
[<class 'B'>]
```

### Class instances

A class instance is created by calling a class object (see above).  A class
instance has a namespace implemented as a dictionary which is the first place
in which attribute references are searched.  When an attribute is not found
there, and the instance's class has an attribute by that name, the search
continues with the class attributes.  If a class attribute is found that is a
user-defined function object, it is transformed into an instance method
object whose `__self__` attribute is the instance.  Static method and
class method objects are also transformed; see above under "Classes".  See
section descriptors for another way in which attributes of a class
retrieved via its instances may differ from the objects actually stored in
the class's `__dict__`.  If no class attribute is found, and the
object's class has a `__getattr__()` method, that is called to satisfy
the lookup.

Attribute assignments and deletions update the instance's dictionary, never a
class's dictionary.  If the class has a `__setattr__()` or
`__delattr__()` method, this is called instead of updating the instance
dictionary directly.

Class instances can pretend to be numbers, sequences, or mappings if they have
methods with certain special names.  See section specialnames.

#### Special attributes

### `object.__class__`

The class to which a class instance belongs.

### `object.__dict__`

A dictionary or other mapping object used to store an object's (writable)
attributes. Not all instances have a `__dict__` attribute; see the
section on slots for more details.

### I/O objects (also known as file objects)

A file object represents an open file.  Various shortcuts are
available to create file objects: the `open()` built-in function, and
also `os.popen()`, `os.fdopen()`, and the
`makefile()` method of socket objects (and perhaps by
other functions or methods provided by extension modules).

File objects implement common methods, listed below, to simplify usage in
generic code. They are expected to be context-managers.

The objects `sys.stdin`, `sys.stdout` and `sys.stderr` are
initialized to file objects corresponding to the interpreter's standard
input, output and error streams; they are all open in text mode and
therefore follow the interface defined by the `io.TextIOBase`
abstract class.

### `file.read(size=-1, /)`

Retrieve up to *size* data from the file. As a convenience if *size* is
unspecified or -1 retrieve all data available.

### `file.write(data, /)`

Store *data* to the file.

### `file.close()`

Flush any buffers and close the underlying file.

### Internal types

A few types used internally by the interpreter are exposed to the user. Their
definitions may change with future versions of the interpreter, but they are
mentioned here for completeness.

#### Code objects

Code objects represent *byte-compiled* executable Python code, or bytecode.
The difference between a code object and a function object is that the function
object contains an explicit reference to the function's globals (the module in
which it was defined), while a code object contains no context; also the default
argument values are stored in the function object, not in the code object
(because they represent values calculated at run-time).  Unlike function
objects, code objects are immutable and contain no references (directly or
indirectly) to mutable objects.

##### Special read-only attributes

- - .. attribute:: codeobject.co_name
- The function name

- - .. attribute:: codeobject.co_qualname
- The fully qualified function name

> *Added in version 3.11.*

- - .. attribute:: codeobject.co_argcount
- The total number of positional parameters
(including positional-only parameters and parameters with default values)
that the function has

- - .. attribute:: codeobject.co_posonlyargcount
- The number of positional-only parameters
(including arguments with default values) that the function has

- - .. attribute:: codeobject.co_kwonlyargcount
- The number of keyword-only parameters
(including arguments with default values) that the function has

- - .. attribute:: codeobject.co_nlocals
- The number of local variables used by the function
(including parameters)

- - .. attribute:: codeobject.co_varnames
- A `tuple` containing the names of the local variables in the
function (starting with the parameter names)

- - .. attribute:: codeobject.co_cellvars
- A `tuple` containing the names of local variables
that are referenced from at least one nested scope inside the function

- - .. attribute:: codeobject.co_freevars
- A `tuple` containing the names of
free (closure) variables that a nested scope
references in an outer scope. See also `function.__closure__`.

Note: references to global and builtin names are *not* included.

- - .. attribute:: codeobject.co_code
- A string representing the sequence of bytecode instructions in
the function

- - .. attribute:: codeobject.co_consts
- A `tuple` containing the literals used by the bytecode in
the function

- - .. attribute:: codeobject.co_names
- A `tuple` containing the names used by the bytecode in
the function

- - .. attribute:: codeobject.co_filename
- The name of the file from which the code was compiled

- - .. attribute:: codeobject.co_firstlineno
- The line number of the first line of the function

- - .. attribute:: codeobject.co_linetable
- A `bytes` object containing encoded source location information.
The exact format is an implementation detail and may change between
Python versions. Use `co_lines()` and
`co_positions()` for supported access to line and
position information. To create a modified copy of a code object,
use `replace()`.

> *Added in version 3.10.*

- - .. attribute:: codeobject.co_stacksize
- The required stack size of the code object

- - .. attribute:: codeobject.co_flags
- An `integer` encoding a number of flags for the
interpreter.

The following flag bits are defined for `co_flags`:
bit `0x04` is set if
the function uses the `*arguments` syntax to accept an arbitrary number of
positional arguments; bit `0x08` is set if the function uses the
`**keywords` syntax to accept arbitrary keyword arguments; bit `0x20` is set
if the function is a generator. See inspect-module-co-flags for details
on the semantics of each flags that might be present.

Future feature declarations (for example, `from __future__ import division`) also use bits
in `co_flags` to indicate whether a code object was compiled with a
particular feature enabled. See `compiler_flag`.

Other bits in `co_flags` are reserved for internal use.

If a code object represents a function and has a docstring,
the `CO_HAS_DOCSTRING` bit is set in `co_flags`
and the first item in `co_consts` is
the docstring of the function.

##### Methods on code objects
