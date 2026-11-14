---
title: "sys --- System-specific parameters and functions (part 3 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/sys.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# sys --- System-specific parameters and functions (part 3 of 6)

### `get_lazy_imports()`

Returns the current lazy imports mode as a string.

- `"normal"`: Only imports explicitly marked with the `lazy` keyword
are lazy
- `"all"`: All top-level imports are potentially lazy

See also `set_lazy_imports()` and PEP 810.

> *Added in version 3.15.*

### `get_lazy_imports_filter()`

Returns the current lazy imports filter function, or `None` if no
filter is set.

The filter function is called for every potentially lazy import to
determine whether it should actually be lazy. See
`set_lazy_imports_filter()` for details on the filter function
signature.

> *Added in version 3.15.*

### `getrefcount(object)`

Return the reference count of the *object*.  The count returned is generally one
higher than you might expect, because it includes the (temporary) reference as
an argument to `getrefcount()`.

Note that the returned value may not actually reflect how many
references to the object are actually held.  For example, some
objects are immortal and have a very high refcount that does not
reflect the actual number of references.  Consequently, do not rely
on the returned value to be accurate, other than a value of 0 or 1.

> **CPython implementation detail:** Immortal objects with a large reference count can be
> identified via `_is_immortal()`.

> *Changed in version 3.12.*
> Immortal objects have very large refcounts that do not match
> the actual number of references to the object.

### `getrecursionlimit()`

Return the current value of the recursion limit, the maximum depth of the Python
interpreter stack.  This limit prevents infinite recursion from causing an
overflow of the C stack and crashing Python.  It can be set by
`setrecursionlimit()`.

### `getsizeof(object[, default])`

Return the size of an object in bytes. The object can be any type of
object. All built-in objects will return correct results, but this
does not have to hold true for third-party extensions as it is implementation
specific.

Only the memory consumption directly attributed to the object is
accounted for, not the memory consumption of objects it refers to.

If given, *default* will be returned if the object does not provide means to
retrieve the size.  Otherwise a `TypeError` will be raised.

`getsizeof()` calls the object's `__sizeof__` method and adds an
additional garbage collector overhead if the object is managed by the garbage
collector.

See recursive sizeof recipe
for an example of using `getsizeof()` recursively to find the size of
containers and all their contents.

### `getswitchinterval()`

Return the interpreter's "thread switch interval" in seconds; see
`setswitchinterval()`.

> *Added in version 3.2.*

### `_getframe([depth])`

Return a frame object from the call stack.  If optional integer *depth* is
given, return the frame object that many calls below the top of the stack.  If
that is deeper than the call stack, `ValueError` is raised.  The default
for *depth* is zero, returning the frame at the top of the call stack.

> **CPython implementation detail:** This function should be used for internal and specialized purposes only.
> It is not guaranteed to exist in all implementations of Python.

### `_getframemodulename([depth])`

Return the name of a module from the call stack.  If optional integer *depth*
is given, return the module that many calls below the top of the stack.  If
that is deeper than the call stack, or if the module is unidentifiable,
`None` is returned.  The default for *depth* is zero, returning the
module at the top of the call stack.

> **CPython implementation detail:** This function should be used for internal and specialized purposes only.
> It is not guaranteed to exist in all implementations of Python.

> *Added in version 3.12.*

### `getobjects(limit[, type])`

This function only exists if CPython was built using the
specialized configure option `--with-trace-refs`.
It is intended only for debugging garbage-collection issues.

Return a list of up to *limit* dynamically allocated Python objects.
If *type* is given, only objects of that exact type (not subtypes)
are included.

Objects from the list are not safe to use.
Specifically, the result will include objects from all interpreters that
share their object allocator state (that is, ones created with
`PyInterpreterConfig.use_main_obmalloc` set to 1
or using `Py_NewInterpreter`, and the
main interpreter).
Mixing objects from different interpreters may lead to crashes
or other unexpected behavior.

> **CPython implementation detail:** This function should be used for specialized purposes only.
> It is not guaranteed to exist in all implementations of Python.

> *Changed in version 3.14.*
> The result may include objects from other interpreters.

### `getprofile()`

Get the profiler function as set by `setprofile()`.

### `gettrace()`

Get the trace function as set by `settrace()`.

> **CPython implementation detail:** The `gettrace()` function is intended only for implementing debuggers,
> profilers, coverage tools and the like.  Its behavior is part of the
> implementation platform, rather than part of the language definition, and
> thus may not be available in all Python implementations.

### `getwindowsversion()`

Return a named tuple describing the Windows version
currently running.  The named elements are *major*, *minor*,
*build*, *platform*, *service_pack*, *service_pack_minor*,
*service_pack_major*, *suite_mask*, *product_type* and
*platform_version*. *service_pack* contains a string,
*platform_version* a 3-tuple and all other values are
integers. The components can also be accessed by name, so
`sys.getwindowsversion()[0]` is equivalent to
`sys.getwindowsversion().major`. For compatibility with prior
versions, only the first 5 elements are retrievable by indexing.

*platform* will be `2` (VER_PLATFORM_WIN32_NT).

*product_type* may be one of the following values:

```text
+---------------------------------------+---------------------------------+
| Constant                              | Meaning                         |
+=======================================+=================================+
| ``1`` (VER_NT_WORKSTATION)            | The system is a workstation.    |
+---------------------------------------+---------------------------------+
| ``2`` (VER_NT_DOMAIN_CONTROLLER)      | The system is a domain          |
|                                       | controller.                     |
+---------------------------------------+---------------------------------+
| ``3`` (VER_NT_SERVER)                 | The system is a server, but not |
|                                       | a domain controller.            |
+---------------------------------------+---------------------------------+
```

This function wraps the Win32 `GetVersionEx` function; see the
Microsoft documentation on `OSVERSIONINFOEX` for more information
about these fields.

*platform_version* returns the major version, minor version and
build number of the current operating system, rather than the version that
is being emulated for the process. It is intended for use in logging rather
than for feature detection.

> **Note:** *platform_version* derives the version from kernel32.dll which can be of a different
> version than the OS version. Please use `platform` module for achieving accurate
> OS version.

> **Availability:** Windows.

> *Changed in version 3.2.*
> Changed to a named tuple and added *service_pack_minor*,
> *service_pack_major*, *suite_mask*, and *product_type*.

> *Changed in version 3.6.*
> Added *platform_version*

### `get_asyncgen_hooks()`

Returns an *asyncgen_hooks* object, which is similar to a
`namedtuple` of the form `(firstiter, finalizer)`,
where *firstiter* and *finalizer* are expected to be either `None` or
functions which take an asynchronous generator iterator as an
argument, and are used to schedule finalization of an asynchronous
generator by an event loop.

> *Added in version 3.6.*
> See PEP 525 for more details.

> **Note:** This function has been added on a provisional basis (see PEP 411
> for details.)

### `get_coroutine_origin_tracking_depth()`

Get the current coroutine origin tracking depth, as set by
`set_coroutine_origin_tracking_depth()`.

> *Added in version 3.7.*

> **Note:** This function has been added on a provisional basis (see PEP 411
> for details.)  Use it only for debugging purposes.

### `hash_info`

A named tuple giving parameters of the numeric hash
implementation.  For more details about hashing of numeric types, see
numeric-hash.

### `hash_info.width`

The width in bits used for hash values

### `hash_info.modulus`

The prime modulus P used for numeric hash scheme

### `hash_info.inf`

The hash value returned for a positive infinity

### `hash_info.nan`

(This attribute is no longer used)

### `hash_info.imag`

The multiplier used for the imaginary part of a complex number

### `hash_info.algorithm`

The name of the algorithm for hashing of str, bytes, and memoryview

### `hash_info.hash_bits`

The internal output size of the hash algorithm

### `hash_info.seed_bits`

The size of the seed key of the hash algorithm

### `hash_info.cutoff`

Cutoff for small string DJBX33A optimization in range `[1, cutoff)`.

> *Added in version 3.2.*

> *Changed in version 3.4.*
> Added *algorithm*, *hash_bits*, *seed_bits*, and *cutoff*.

### `hexversion`

The version number encoded as a single integer.  This is guaranteed to increase
with each version, including proper support for non-production releases.  For
example, to test that the Python interpreter is at least version 1.5.2, use:

```
if sys.hexversion >= 0x010502F0:
    # use some advanced feature
    ...
else:
    # use an alternative implementation or warn the user
    ...
```

This is called `hexversion` since it only really looks meaningful when viewed
as the result of passing it to the built-in `hex()` function.  The
named tuple  `sys.version_info` may be used for a more
human-friendly encoding of the same information.

More details of `hexversion` can be found at apiabiversion.

### `implementation`

An object containing information about the implementation of the
currently running Python interpreter.  The following attributes are
required to exist in all Python implementations.

*name* is the implementation's identifier, e.g. `'cpython'`.  The actual
string is defined by the Python implementation, but it is guaranteed to be
lower case.

*version* is a named tuple, in the same format as
`sys.version_info`.  It represents the version of the Python
*implementation*.  This has a distinct meaning from the specific
version of the Python *language* to which the currently running
interpreter conforms, which `sys.version_info` represents.  For
example, for PyPy 1.8 `sys.implementation.version` might be
`sys.version_info(1, 8, 0, 'final', 0)`, whereas `sys.version_info`
would be `sys.version_info(2, 7, 2, 'final', 0)`.  For CPython they
are the same value, since it is the reference implementation.

*hexversion* is the implementation version in hexadecimal format, like
`sys.hexversion`.

*cache_tag* is the tag used by the import machinery in the filenames of
cached modules.  By convention, it would be a composite of the
implementation's name and version, like `'cpython-33'`.  However, a
Python implementation may use some other value if appropriate.  If
`cache_tag` is set to `None`, it indicates that module caching should
be disabled.

*supports_isolated_interpreters* is a boolean value, whether
this implementation supports multiple isolated interpreters.
It is `True` for CPython on most platforms.  Platforms with
this support implement the low-level `_interpreters` module.

> **See also:** PEP 684, PEP 734, and `concurrent.interpreters`.

`sys.implementation` may contain additional attributes specific to
the Python implementation.  These non-standard attributes must start with
an underscore, and are not described here.  Regardless of its contents,
`sys.implementation` will not change during a run of the interpreter,
nor between implementation versions.  (It may change between Python
language versions, however.)  See PEP 421 for more information.

> *Added in version 3.3.*

> *Changed in version 3.14.*
> Added `supports_isolated_interpreters` field.

> **Note:** The addition of new required attributes must go through the normal PEP
> process. See PEP 421 for more information.

### `int_info`

A named tuple that holds information about Python's internal
representation of integers.  The attributes are read only.

### `int_info.bits_per_digit`

The number of bits held in each digit.
Python integers are stored internally in base `2**int_info.bits_per_digit`.

### `int_info.sizeof_digit`

The size in bytes of the C type used to represent a digit.

### `int_info.default_max_str_digits`

The default value for `sys.get_int_max_str_digits()`
when it is not otherwise explicitly configured.

### `int_info.str_digits_check_threshold`

The minimum non-zero value for `sys.set_int_max_str_digits()`,
`PYTHONINTMAXSTRDIGITS`, or `-X int_max_str_digits`.

> *Added in version 3.1.*

> *Changed in version 3.11.*
> Added `default_max_str_digits` and
> `str_digits_check_threshold`.

### `__interactivehook__`

When this attribute exists, its value is automatically called (with no
arguments) when the interpreter is launched in :ref:`interactive mode
<tut-interactive>`.  This is done after the `PYTHONSTARTUP` file is
read, so that you can set this hook there.  The `site` module
sets this.

> *Added in version 3.4.*

### `intern(string)`

Enter *string* in the table of "interned" strings and return the interned string
-- which is *string* itself or a copy. Interning strings is useful to gain a
little performance on dictionary lookup -- if the keys in a dictionary are
interned, and the lookup key is interned, the key <example-value> (after hashing)
can be done by a pointer compare instead of a string compare.  Normally, the
names used in Python programs are automatically interned, and the dictionaries
used to hold module, class or instance attributes have interned keys.

Interned strings are not immortal; you must keep a reference to the
return value of `intern()` around to benefit from it.

### `_is_gil_enabled()`

Return `True` if the GIL is enabled and `False` if
it is disabled.

> *Added in version 3.13.*

> **CPython implementation detail:** It is not guaranteed to exist in all implementations of Python.

### `is_finalizing()`

Return `True` if the main Python interpreter is
shutting down. Return `False` otherwise.

See also the `PythonFinalizationError` exception.

> *Added in version 3.5.*

### `_jit`

Utilities for observing just-in-time compilation.

> **CPython implementation detail:** JIT compilation is an *experimental implementation detail* of CPython.
> `sys._jit` is not guaranteed to exist or behave the same way in all
> Python implementations, versions, or build configurations.

> *Added in version 3.14.*
