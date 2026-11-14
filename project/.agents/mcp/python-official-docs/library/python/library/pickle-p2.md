---
title: "pickle --- Python object serialization (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/pickle.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# pickle --- Python object serialization (part 2 of 4)

## Module Interface

To serialize an object hierarchy, you simply call the `dumps()` function.
Similarly, to de-serialize a data stream, you call the `loads()` function.
However, if you want more control over serialization and de-serialization,
you can create a `Pickler` or an `Unpickler` object, respectively.

The `pickle` module provides the following constants:

### `HIGHEST_PROTOCOL`

An integer, the highest protocol version
available.  This value can be passed as a *protocol* value to functions
`dump()` and `dumps()` as well as the `Pickler`
constructor.

### `DEFAULT_PROTOCOL`

An integer, the default protocol version used
for pickling.  May be less than `HIGHEST_PROTOCOL`.  Currently the
default protocol is 5, introduced in Python 3.8 and incompatible
with previous versions. This version introduces support for out-of-band
buffers, where PEP 3118-compatible data can be transmitted separately
from the main pickle stream.

> *Changed in version 3.0.*
> The default protocol is 3.

> *Changed in version 3.8.*
> The default protocol is 4.

> *Changed in version 3.14.*
> The default protocol is 5.

The `pickle` module provides the following functions to make the pickling
process more convenient:

### `dump(obj, file, protocol=None, *, fix_imports=True, buffer_callback=None)`

Write the pickled representation of the object *obj* to the open
file object *file*.  This is equivalent to
`Pickler(file, protocol).dump(obj)`.

Arguments *file*, *protocol*, *fix_imports* and *buffer_callback* have
the same meaning as in the `Pickler` constructor.

> *Changed in version 3.8.*
> The *buffer_callback* argument was added.

### `dumps(obj, protocol=None, *, fix_imports=True, buffer_callback=None)`

Return the pickled representation of the object *obj* as a `bytes` object,
instead of writing it to a file.

Arguments *protocol*, *fix_imports* and *buffer_callback* have the same
meaning as in the `Pickler` constructor.

> *Changed in version 3.8.*
> The *buffer_callback* argument was added.

### `load(file, *, fix_imports=True, encoding="ASCII", errors="strict", buffers=None)`

Read the pickled representation of an object from the open file object
*file* and return the reconstituted object hierarchy specified therein.
This is equivalent to `Unpickler(file).load()`.

The protocol version of the pickle is detected automatically, so no
protocol argument is needed.  Bytes past the pickled representation
of the object are ignored.

Arguments *file*, *fix_imports*, *encoding*, *errors*, *strict* and *buffers*
have the same meaning as in the `Unpickler` constructor.

> *Changed in version 3.8.*
> The *buffers* argument was added.

### `loads(data, /, *, fix_imports=True, encoding="ASCII", errors="strict", buffers=None)`

Return the reconstituted object hierarchy of the pickled representation
*data* of an object. *data* must be a bytes-like object.

The protocol version of the pickle is detected automatically, so no
protocol argument is needed.  Bytes past the pickled representation
of the object are ignored.

Arguments *fix_imports*, *encoding*, *errors*, *strict* and *buffers*
have the same meaning as in the `Unpickler` constructor.

> *Changed in version 3.8.*
> The *buffers* argument was added.

The `pickle` module defines three exceptions:

### exception `PickleError`

Common base class for the other pickling exceptions.  It inherits from
`Exception`.

### exception `PicklingError`

Error raised when an unpicklable object is encountered by `Pickler`.
It inherits from `PickleError`.

Refer to pickle-picklable to learn what kinds of objects can be
pickled.

### exception `UnpicklingError`

Error raised when there is a problem unpickling an object, such as a data
corruption or a security violation.  It inherits from `PickleError`.

Note that other exceptions may also be raised during unpickling, including
(but not necessarily limited to) AttributeError, EOFError, ImportError, and
IndexError.

The `pickle` module exports three classes, `Pickler`,
`Unpickler` and `PickleBuffer`:

### class `Pickler(file, protocol=None, *, fix_imports=True, buffer_callback=None)`

This takes a binary file for writing a pickle data stream.

The optional *protocol* argument, an integer, tells the pickler to use
the given protocol; supported protocols are 0 to `HIGHEST_PROTOCOL`.
If not specified, the default is `DEFAULT_PROTOCOL`.  If a negative
number is specified, `HIGHEST_PROTOCOL` is selected.

The *file* argument must have a write() method that accepts a single bytes
argument.  It can thus be an on-disk file opened for binary writing, an
`io.BytesIO` instance, or any other custom object that meets this
interface.

If *fix_imports* is true and *protocol* is less than 3, pickle will try to
map the new Python 3 names to the old module names used in Python 2, so
that the pickle data stream is readable with Python 2.

If *buffer_callback* is `None` (the default), buffer views are
serialized into *file* as part of the pickle stream.

If *buffer_callback* is not `None`, then it can be called any number
of times with a buffer view.  If the callback returns a false value
(such as `None`), the given buffer is out-of-band;
otherwise the buffer is serialized in-band, i.e. inside the pickle stream.

It is an error if *buffer_callback* is not `None` and *protocol* is
`None` or smaller than 5.

> *Changed in version 3.8.*
> The *buffer_callback* argument was added.

### `dump(obj)`

Write the pickled representation of *obj* to the open file object given in
the constructor.

### `persistent_id(obj)`

Do nothing by default.  This exists so a subclass can override it.

If `persistent_id()` returns `None`, *obj* is pickled as usual.  Any
other value causes `Pickler` to emit the returned value as a
persistent ID for *obj*.  The meaning of this persistent ID should be
defined by `Unpickler.persistent_load()`.  Note that the value
returned by `persistent_id()` cannot itself have a persistent ID.

See pickle-persistent for details and examples of uses.

> *Changed in version 3.13.*
> Add the default implementation of this method in the C implementation
> of `Pickler`.

### `dispatch_table`

A pickler object's dispatch table is a registry of *reduction
functions* of the kind which can be declared using
`copyreg.pickle()`.  It is a mapping whose keys are classes
and whose values are reduction functions.  A reduction function
takes a single argument of the associated class and should
conform to the same interface as a `__reduce__()`
method.

By default, a pickler object will not have a
`dispatch_table` attribute, and it will instead use the
global dispatch table managed by the `copyreg` module.
However, to customize the pickling for a specific pickler object
one can set the `dispatch_table` attribute to a dict-like
object.  Alternatively, if a subclass of `Pickler` has a
`dispatch_table` attribute then this will be used as the
default dispatch table for instances of that class.

See pickle-dispatch for usage examples.

> *Added in version 3.3.*

### `reducer_override(obj)`

Special reducer that can be defined in `Pickler` subclasses. This
method has priority over any reducer in the `dispatch_table`.  It
should conform to the same interface as a `__reduce__()` method, and
can optionally return `NotImplemented` to fallback on
`dispatch_table`-registered reducers to pickle `obj`.

For a detailed example, see reducer_override.

> *Added in version 3.8.*

### `fast`

Deprecated. Enable fast mode if set to a true value.  The fast mode
disables the usage of memo, therefore speeding the pickling process by not
generating superfluous PUT opcodes.  It should not be used with
self-referential objects, doing otherwise will cause `Pickler` to
recurse infinitely.

Use `pickletools.optimize()` if you need more compact pickles.

### `clear_memo()`

Clears the pickler's "memo".

The memo is the data structure that remembers which objects the
pickler has already seen, so that shared or recursive objects
are pickled by reference and not by value.  This method is
useful when re-using picklers.

### class `Unpickler(file, *, fix_imports=True, encoding="ASCII", errors="strict", buffers=None)`

This takes a binary file for reading a pickle data stream.

The protocol version of the pickle is detected automatically, so no
protocol argument is needed.

The argument *file* must have three methods, a read() method that takes an
integer argument, a readinto() method that takes a buffer argument
and a readline() method that requires no arguments, as in the
`io.BufferedIOBase` interface.  Thus *file* can be an on-disk file
opened for binary reading, an `io.BytesIO` object, or any other
custom object that meets this interface.

The optional arguments *fix_imports*, *encoding* and *errors* are used
to control compatibility support for pickle stream generated by Python 2.
If *fix_imports* is true, pickle will try to map the old Python 2 names
to the new names used in Python 3.  The *encoding* and *errors* tell
pickle how to decode 8-bit string instances pickled by Python 2;
these default to 'ASCII' and 'strict', respectively.  The *encoding* can
be 'bytes' to read these 8-bit string instances as bytes objects.
Using `encoding='latin1'` is required for unpickling NumPy arrays and
instances of `datetime`, `date` and
`time` pickled by Python 2.

If *buffers* is `None` (the default), then all data necessary for
deserialization must be contained in the pickle stream.  This means
that the *buffer_callback* argument was `None` when a `Pickler`
was instantiated (or when `dump()` or `dumps()` was called).

If *buffers* is not `None`, it should be an iterable of buffer-enabled
objects that is consumed each time the pickle stream references
an out-of-band buffer view.  Such buffers have been
given in order to the *buffer_callback* of a Pickler object.

> *Changed in version 3.8.*
> The *buffers* argument was added.

### `load()`

Read the pickled representation of an object from the open file object
given in the constructor, and return the reconstituted object hierarchy
specified therein.  Bytes past the pickled representation of the object
are ignored.

### `persistent_load(pid)`

Raise an `UnpicklingError` by default.

If defined, `persistent_load()` should return the object specified by
the persistent ID *pid*.  If an invalid persistent ID is encountered, an
`UnpicklingError` should be raised.

See pickle-persistent for details and examples of uses.

> *Changed in version 3.13.*
> Add the default implementation of this method in the C implementation
> of `Unpickler`.

### `find_class(module, name)`

Import *module* if necessary and return the object called *name* from it,
where the *module* and *name* arguments are `str` objects.  Note,
unlike its name suggests, `find_class()` is also used for finding
functions.

Subclasses may override this to gain control over what type of objects and
how they can be loaded, potentially reducing security risks. Refer to
pickle-restrict for details.

### class `PickleBuffer(buffer)`

A wrapper for a buffer representing picklable data.  *buffer* must be a
buffer-providing object, such as a
bytes-like object or a N-dimensional array.

`PickleBuffer` is itself a buffer provider, therefore it is
possible to pass it to other APIs expecting a buffer-providing object,
such as `memoryview`.

`PickleBuffer` objects can only be serialized using pickle
protocol 5 or higher.  They are eligible for
out-of-band serialization.

> *Added in version 3.8.*

### `raw()`

Return a `memoryview` of the memory area underlying this buffer.
The returned object is a one-dimensional, C-contiguous memoryview
with format `B` (unsigned bytes).  `BufferError` is raised if
the buffer is neither C- nor Fortran-contiguous.

### `release()`

Release the underlying buffer exposed by the PickleBuffer object.

## What can be pickled and unpickled?

The following types can be pickled:

- built-in constants (`None`, `True`, `False`, `Ellipsis`, and
`NotImplemented`);

- integers, floating-point numbers, complex numbers;

- strings, bytes, bytearrays;

- tuples, lists, sets, and dictionaries containing only picklable objects;

- functions (built-in and user-defined) accessible from the top level of a
module (using `def`, not `lambda`);

- classes accessible from the top level of a module;

- instances of such classes for which the result of calling `__getstate__()`
is picklable  (see section pickle-inst for details).

Attempts to pickle unpicklable objects will raise the `PicklingError`
exception; when this happens, an unspecified number of bytes may have already
been written to the underlying file.  Trying to pickle a highly recursive data
structure may exceed the maximum recursion depth, a `RecursionError` will be
raised in this case.  You can carefully raise this limit with
`sys.setrecursionlimit()`.

Note that functions (built-in and user-defined) are pickled by fully
qualified name, not by value.  This means that only the function name is
pickled, along with the name of the containing module and classes.  Neither
the function's code, nor any of its function attributes are pickled.  Thus the
defining module must be importable in the unpickling environment, and the module
must contain the named object, otherwise an exception will be raised.

Similarly, classes are pickled by fully qualified name, so the same restrictions in
the unpickling environment apply.  Note that none of the class's code or data is
pickled, so in the following example the class attribute `attr` is not
restored in the unpickling environment:

```
class Foo:
    attr = 'A class attribute'

picklestring = pickle.dumps(Foo)
```

These restrictions are why picklable functions and classes must be defined at
the top level of a module.

Similarly, when class instances are pickled, their class's code and data are not
pickled along with them.  Only the instance data are pickled.  This is done on
purpose, so you can fix bugs in a class or add methods to the class and still
load objects that were created with an earlier version of the class.  If you
plan to have long-lived objects that will see many versions of a class, it may
be worthwhile to put a version number in the objects so that suitable
conversions can be made by the class's `__setstate__()` method.
