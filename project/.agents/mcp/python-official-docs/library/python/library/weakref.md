---
title: "weakref --- Weak references (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/weakref.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `weakref` --- Weak references

Module `weakref`.

**Source code:** Lib/weakref.py

The `weakref` module allows the Python programmer to create :dfn:`weak
references` to objects.

In the following, the term referent means the object which is referred to
by a weak reference.

A weak reference to an object is not enough to keep the object alive: when the
only remaining references to a referent are weak references,
garbage collection is free to destroy the referent and reuse its memory
for something else.  However, until the object is actually destroyed the weak
reference may return the object even if there are no strong references to it.

A primary use for weak references is to implement caches or
mappings holding large objects, where it's desired that a large object not be
kept alive solely because it appears in a cache or mapping.

For example, if you have a number of large binary image objects, you may wish to
associate a name with each.  If you used a Python dictionary to map names to
images, or images to names, the image objects would remain alive just because
they appeared as values or keys in the dictionaries.  The
`WeakKeyDictionary` and `WeakValueDictionary` classes supplied by
the `weakref` module are an alternative, using weak references to construct
mappings that don't keep objects alive solely because they appear in the mapping
objects.  If, for example, an image object is a value in a
`WeakValueDictionary`, then when the last remaining references to that
image object are the weak references held by weak mappings, garbage collection
can reclaim the object, and its corresponding entries in weak mappings are
simply deleted.

`WeakKeyDictionary` and `WeakValueDictionary` use weak references
in their implementation, setting up callback functions on the weak references
that notify the weak dictionaries when a key or value has been reclaimed by
garbage collection.  `WeakSet` implements the `set` interface,
but keeps weak references to its elements, just like a
`WeakKeyDictionary` does.

`finalize` provides a straight forward way to register a
cleanup function to be called when an object is garbage collected.
This is simpler to use than setting up a callback function on a raw
weak reference, since the module automatically ensures that the finalizer
remains alive until the object is collected.

Most programs should find that using one of these weak container types
or `finalize` is all they need -- it's not usually necessary to
create your own weak references directly.  The low-level machinery is
exposed by the `weakref` module for the benefit of advanced uses.

Not all objects can be weakly referenced. Objects which support weak references
include class instances, functions written in Python (but not in C), instance methods,
sets, frozensets, some file objects, generators,
type objects, sockets, arrays, deques, regular expression pattern objects, and code
objects.

> *Changed in version 3.2.*
> Added support for thread.lock, threading.Lock, and code objects.

Several built-in types such as `list` and `dict` do not directly
support weak references but can add support through subclassing:

```
class Dict(dict):
    pass

obj = Dict(red=1, green=2, blue=3)   # this object is weak referenceable
```

> **CPython implementation detail:** Other built-in types such as `tuple` and `int` do not support weak
> references even when subclassed.

Extension types can easily be made to support weak references; see
weakref-support.

When `__slots__` are defined for a given type, weak reference support is
disabled unless a `'__weakref__'` string is also present in the sequence of
strings in the `__slots__` declaration.
See __slots__ documentation for details.

### class `ref(object[, callback])`

Return a weak reference to *object*.  The original object can be retrieved by
calling the reference object if the referent is still alive; if the referent is
no longer alive, calling the reference object will cause `None` to be
returned.  If *callback* is provided and not `None`, and the returned
weakref object is still alive, the callback will be called when the object is
about to be finalized; the weak reference object will be passed as the only
parameter to the callback; the referent will no longer be available.

It is allowable for many weak references to be constructed for the same object.
Callbacks registered for each weak reference will be called from the most
recently registered callback to the oldest registered callback.

Exceptions raised by the callback will be noted on the standard error output,
but cannot be propagated; they are handled in exactly the same way as exceptions
raised from an object's `__del__()` method.

Weak references are hashable if the *object* is hashable.  They will
maintain their hash value even after the *object* was deleted.  If
`hash()` is called the first time only after the *object* was deleted,
the call will raise `TypeError`.

Weak references support tests for equality, but not ordering.  If the referents
are still alive, two references have the same equality relationship as their
referents (regardless of the *callback*).  If either referent has been deleted,
the references are equal only if the reference objects are the same object.

This is a subclassable type rather than a factory function.

Weak references are generic over the type of the object they
reference.

### `__callback__`

This read-only attribute returns the callback currently associated to the
weakref.  If there is no callback or if the referent of the weakref is
no longer alive then this attribute will have value `None`.

> *Changed in version 3.4.*
> Added the `__callback__` attribute.

### `proxy(object[, callback])`

Return a proxy to *object* which uses a weak reference.  This supports use of
the proxy in most contexts instead of requiring the explicit dereferencing used
with weak reference objects.  The returned object will have a type of either
`ProxyType` or `CallableProxyType`, depending on whether *object* is
callable.  Proxy objects are not hashable regardless of the referent; this
avoids a number of problems related to their fundamentally mutable nature, and
prevents their use as dictionary keys.  *callback* is the same as the parameter
of the same name to the `ref()` function.

Accessing an attribute of the proxy object after the referent is
garbage collected raises `ReferenceError`.

> *Changed in version 3.8.*
> Extended the operator support on proxy objects to include the matrix
> multiplication operators `@` and `@=`.

### `getweakrefcount(object)`

Return the number of weak references and proxies which refer to *object*.

### `getweakrefs(object)`

Return a list of all weak reference and proxy objects which refer to *object*.

### class `WeakKeyDictionary([dict])`

Mapping class that references keys weakly.  Entries in the dictionary will be
discarded when there is no longer a strong reference to the key.  This can be
used to associate additional data with an object owned by other parts of an
application without adding attributes to those objects.  This can be especially
useful with objects that override attribute accesses.

Note that when a key with equal value to an existing key (but not equal identity)
is inserted into the dictionary, it replaces the value but does not replace the
existing key. Due to this, when the reference to the original key is deleted, it
also deletes the entry in the dictionary:

```
>>> class T(str): pass
...
>>> k1, k2 = T(), T()
>>> d = weakref.WeakKeyDictionary()
>>> d[k1] = 1   # d = {k1: 1}
>>> d[k2] = 2   # d = {k1: 2}
>>> del k1      # d = {}
```

A workaround would be to remove the key prior to reassignment:

```
>>> class T(str): pass
...
>>> k1, k2 = T(), T()
>>> d = weakref.WeakKeyDictionary()
>>> d[k1] = 1   # d = {k1: 1}
>>> del d[k1]
>>> d[k2] = 2   # d = {k2: 2}
>>> del k1      # d = {k2: 2}
```

> *Changed in version 3.9.*
> Added support for `|` and `|=` operators, as specified in PEP 584.

`WeakKeyDictionary` objects have an additional method that
exposes the internal references directly.  The references are not guaranteed to
be "live" at the time they are used, so the result of calling the references
needs to be checked before being used.  This can be used to avoid creating
references that will cause the garbage collector to keep the keys around longer
than needed.

### `WeakKeyDictionary.keyrefs()`

Return an iterable of the weak references to the keys.

### class `WeakValueDictionary([dict])`

Mapping class that references values weakly.  Entries in the dictionary will be
discarded when no strong reference to the value exists any more.

> *Changed in version 3.9.*
> Added support for `|` and `|=` operators, as specified in PEP 584.

`WeakValueDictionary` objects have an additional method that has the
same issues as the `WeakKeyDictionary.keyrefs()` method.

### `WeakValueDictionary.valuerefs()`

Return an iterable of the weak references to the values.

### class `WeakSet([elements])`

Set class that keeps weak references to its elements.  An element will be
discarded when no strong reference to it exists any more.

### class `WeakMethod(method[, callback])`

A custom `ref` subclass which simulates a weak reference to a bound
method (i.e., a method defined on a class and looked up on an instance).
Since a bound method is ephemeral, a standard weak reference cannot keep
hold of it.  `WeakMethod` has special code to recreate the bound
method until either the object or the original function dies:

```
>>> class C:
...     def method(self):
...         print("method called!")
...
>>> c = C()
>>> r = weakref.ref(c.method)
>>> r()
>>> r = weakref.WeakMethod(c.method)
>>> r()
<bound method C.method of <__main__.C object at 0x7fc859830220>>
>>> r()()
method called!
>>> del c
>>> gc.collect()
0
>>> r()
>>>
```

*callback* is the same as the parameter of the same name to the `ref()` function.

> *Added in version 3.4.*

### class `finalize(obj, func, /, *args, **kwargs)`

Return a callable finalizer object which will be called when *obj*
is garbage collected. Unlike an ordinary weak reference, a finalizer
will always survive until the reference object is collected, greatly
simplifying lifecycle management.

A finalizer is considered *alive* until it is called (either explicitly
or at garbage collection), and after that it is *dead*.  Calling a live
finalizer returns the result of evaluating `func(*arg, **kwargs)`,
whereas calling a dead finalizer returns `None`.

Exceptions raised by finalizer callbacks during garbage collection
will be shown on the standard error output, but cannot be
propagated.  They are handled in the same way as exceptions raised
from an object's `__del__()` method or a weak reference's
callback.

When the program exits (or more generally, at interpreter shutdown),
each remaining live finalizer is called unless its `atexit` attribute
has been set to false.
They are called in reverse order of creation.

A finalizer will never invoke its callback during the later part of
the interpreter shutdown when module globals are liable to have
been replaced by `None`.

### `__call__()`

If *self* is alive then mark it as dead and return the result of
calling `func(*args, **kwargs)`.  If *self* is dead then return
`None`.

### `detach()`

If *self* is alive then mark it as dead and return the tuple
`(obj, func, args, kwargs)`.  If *self* is dead then return
`None`.

### `peek()`

If *self* is alive then return the tuple ``(obj, func, args,
kwargs)``.  If *self* is dead then return `None`.

### `alive`

Property which is true if the finalizer is alive, false otherwise.

### `atexit`

A writable boolean property which by default is true.  At
interpreter shutdown, all remaining live finalizers for which
`.atexit` is true are called in reverse order of
creation.

> **Note:** It is important to ensure that *func*, *args* and *kwargs* do
> not own any references to *obj*, either directly or indirectly,
> since otherwise *obj* will never be garbage collected.  In
> particular, *func* should not be a bound method of *obj*.

> *Added in version 3.4.*

### class `ReferenceType`

The type object for weak references objects.

### class `ProxyType`

The type object for proxies of objects which are not callable.

### class `CallableProxyType`

The type object for proxies of callable objects.

### `ProxyTypes`

Sequence containing all the type objects for proxies.  This can make it simpler
to test if an object is a proxy without being dependent on naming both proxy
types.

> **See also:** PEP 205 - Weak References
> The proposal and rationale for this feature, including links to earlier
> implementations and information about similar features in other languages.
