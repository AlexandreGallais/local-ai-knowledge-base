---
title: "inspect --- Inspect live objects (part 5 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/inspect.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# inspect --- Inspect live objects (part 5 of 8)

### `ismemberdescriptor(object)`

Return `True` if the object is a member descriptor.

> **CPython implementation detail:** Member descriptors are attributes defined in extension modules via
> `PyMemberDef` structures.  For Python implementations without such
> types, this method will always return `False`.

## Retrieving source code

### `getdoc(object, *, inherit_class_doc=True, fallback_to_class_doc=True)`

Get the documentation string for an object, cleaned up with `cleandoc()`.
If the documentation string for an object is not provided:

- if the object is a class and *inherit_class_doc* is true (by default),
retrieve the documentation string from the inheritance hierarchy;
- if the object is a method, a property or a descriptor, retrieve
the documentation string from the inheritance hierarchy;
- otherwise, if *fallback_to_class_doc* is true (by default), retrieve
the documentation string from the class of the object.

Return `None` if the documentation string is invalid or missing.

> *Changed in version 3.5.*
> Documentation strings are now inherited if not overridden.

> *Changed in version 3.15.*
> Added parameters *inherit_class_doc* and *fallback_to_class_doc*.
> Documentation strings on `cached_property`
> objects are now inherited if not overridden.

### `getcomments(object)`

Return in a single string any lines of comments immediately preceding the
object's source code (for a class, function, or method), or at the top of the
Python source file (if the object is a module).  If the object's source code
is unavailable, return `None`.  This could happen if the object has been
defined in C or the interactive shell.

### `getfile(object)`

Return the name of the (text or binary) file in which an object was defined.
An `OSError` is raised if the source code cannot be retrieved.
This will fail with a `TypeError` if the object is a built-in module,
class, or function.

### `getmodule(object)`

Try to guess which module an object was defined in. Return `None`
if the module cannot be determined.

### `getsourcefile(object)`

Return the name of the Python source file in which an object was defined
or `None` if no way can be identified to get the source.  An `OSError` is
raised if the source code cannot be retrieved.
This will fail with a `TypeError` if the object is a built-in module,
class, or function.

### `getsourcelines(object)`

Return a list of source lines and starting line number for an object. The
argument may be a module, class, method, function, traceback, frame, or code
object.  The source code is returned as a list of the lines corresponding to the
object and the line number indicates where in the original source file the first
line of code was found.  An `OSError` is raised if the source code cannot
be retrieved.
A `TypeError` is raised if the object is a built-in module, class, or
function.

> *Changed in version 3.3.*
> `OSError` is raised instead of `IOError`, now an alias of the
> former.

### `getsource(object)`

Return the text of the source code for an object. The argument may be a module,
class, method, function, traceback, frame, or code object.  The source code is
returned as a single string.  An `OSError` is raised if the source code
cannot be retrieved.
A `TypeError` is raised if the object is a built-in module, class, or
function.

> *Changed in version 3.3.*
> `OSError` is raised instead of `IOError`, now an alias of the
> former.

### `cleandoc(doc)`

Clean up indentation from docstrings that are indented to line up with blocks
of code.

All leading whitespace is removed from the first line.  Any leading whitespace
that can be uniformly removed from the second line onwards is removed.  Empty
lines at the beginning and end are subsequently removed.  Also, all tabs are
expanded to spaces.
