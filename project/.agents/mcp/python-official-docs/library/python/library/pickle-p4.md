---
title: "pickle --- Python object serialization (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/pickle.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# pickle --- Python object serialization (part 4 of 4)

## Out-of-band Buffers

> *Added in version 3.8.*

In some contexts, the `pickle` module is used to transfer massive amounts
of data.  Therefore, it can be important to minimize the number of memory
copies, to preserve performance and resource consumption.  However, normal
operation of the `pickle` module, as it transforms a graph-like structure
of objects into a sequential stream of bytes, intrinsically involves copying
data to and from the pickle stream.

This constraint can be eschewed if both the *provider* (the implementation
of the object types to be transferred) and the *consumer* (the implementation
of the communications system) support the out-of-band transfer facilities
provided by pickle protocol 5 and higher.

### Provider API

The large data objects to be pickled must implement a `__reduce_ex__()`
method specialized for protocol 5 and higher, which returns a
`PickleBuffer` instance (instead of e.g. a `bytes` object)
for any large data.

A `PickleBuffer` object *signals* that the underlying buffer is
eligible for out-of-band data transfer.  Those objects remain compatible
with normal usage of the `pickle` module.  However, consumers can also
opt-in to tell `pickle` that they will handle those buffers by
themselves.

### Consumer API

A communications system can enable custom handling of the `PickleBuffer`
objects generated when serializing an object graph.

On the sending side, it needs to pass a *buffer_callback* argument to
`Pickler` (or to the `dump()` or `dumps()` function), which
will be called with each `PickleBuffer` generated while pickling
the object graph.  Buffers accumulated by the *buffer_callback* will not
see their data copied into the pickle stream, only a cheap marker will be
inserted.

On the receiving side, it needs to pass a *buffers* argument to
`Unpickler` (or to the `load()` or `loads()` function),
which is an iterable of the buffers which were passed to *buffer_callback*.
That iterable should produce buffers in the same order as they were passed
to *buffer_callback*.  Those buffers will provide the data expected by the
reconstructors of the objects whose pickling produced the original
`PickleBuffer` objects.

Between the sending side and the receiving side, the communications system
is free to implement its own transfer mechanism for out-of-band buffers.
Potential optimizations include the use of shared memory or datatype-dependent
compression.

### Example

Here is a trivial example where we implement a `bytearray` subclass
able to participate in out-of-band buffer pickling:

```
class ZeroCopyByteArray(bytearray):

    def __reduce_ex__(self, protocol):
        if protocol >= 5:
            return type(self)._reconstruct, (PickleBuffer(self),), None
        else:
            # PickleBuffer is forbidden with pickle protocols <= 4.
            return type(self)._reconstruct, (bytearray(self),)

    @classmethod
    def _reconstruct(cls, obj):
        with memoryview(obj) as m:
            # Get a handle over the original buffer object
            obj = m.obj
            if type(obj) is cls:
                # Original buffer object is a ZeroCopyByteArray, return it
                # as-is.
                return obj
            else:
                return cls(obj)
```

The reconstructor (the `_reconstruct` class method) returns the buffer's
providing object if it has the right type.  This is an easy way to simulate
zero-copy behaviour on this toy example.

On the consumer side, we can pickle those objects the usual way, which
when unserialized will give us a copy of the original object:

```
b = ZeroCopyByteArray(b"abc")
data = pickle.dumps(b, protocol=5)
new_b = pickle.loads(data)
print(b == new_b)  # True
print(b is new_b)  # False: a copy was made
```

But if we pass a *buffer_callback* and then give back the accumulated
buffers when unserializing, we are able to get back the original object:

```
b = ZeroCopyByteArray(b"abc")
buffers = []
data = pickle.dumps(b, protocol=5, buffer_callback=buffers.append)
new_b = pickle.loads(data, buffers=buffers)
print(b == new_b)  # True
print(b is new_b)  # True: no copy was made
```

This example is limited by the fact that `bytearray` allocates its
own memory: you cannot create a `bytearray` instance that is backed
by another object's memory.  However, third-party datatypes such as NumPy
arrays do not have this limitation, and allow use of zero-copy pickling
(or making as few copies as possible) when transferring between distinct
processes or systems.

> **See also:** PEP 574 -- Pickle protocol 5 with out-of-band data

## Restricting Globals

By default, unpickling will import any class or function that it finds in the
pickle data.  For many applications, this behaviour is unacceptable as it
permits the unpickler to import and invoke arbitrary code.  Just consider what
this hand-crafted pickle data stream does when loaded:

```
>>> import pickle
>>> pickle.loads(b"cos\nsystem\n(S'echo hello world'\ntR.")
hello world
0
```

In this example, the unpickler imports the `os.system()` function and then
apply the string argument "echo hello world".  Although this example is
inoffensive, it is not difficult to imagine one that could damage your system.

For this reason, you may want to control what gets unpickled by customizing
`Unpickler.find_class()`.  Unlike its name suggests,
`Unpickler.find_class()` is called whenever a global (i.e., a class or
a function) is requested.  Thus it is possible to either completely forbid
globals or restrict them to a safe subset.

Here is an example of an unpickler allowing only few safe classes from the
`builtins` module to be loaded:

```
import builtins
import io
import pickle

safe_builtins = {
    'range',
    'complex',
    'set',
    'frozenset',
    'slice',
}

class RestrictedUnpickler(pickle.Unpickler):

    def find_class(self, module, name):
        # Only allow safe classes from builtins.
        if module == "builtins" and name in safe_builtins:
            return getattr(builtins, name)
        # Forbid everything else.
        raise pickle.UnpicklingError("global '%s.%s' is forbidden" %
                                     (module, name))

def restricted_loads(s):
    """Helper function analogous to pickle.loads()."""
    return RestrictedUnpickler(io.BytesIO(s)).load()
```

A sample usage of our unpickler working as intended:

```
>>> restricted_loads(pickle.dumps([1, 2, range(15)]))
[1, 2, range(0, 15)]
>>> restricted_loads(b"cos\nsystem\n(S'echo hello world'\ntR.")
Traceback (most recent call last):
  ...
pickle.UnpicklingError: global 'os.system' is forbidden
>>> restricted_loads(b'cbuiltins\neval\n'
...                  b'(S\'getattr(__import__("os"), "system")'
...                  b'("echo hello world")\'\ntR.')
Traceback (most recent call last):
  ...
pickle.UnpicklingError: global 'builtins.eval' is forbidden
```

As our examples shows, you have to be careful with what you allow to be
unpickled.  Therefore if security is a concern, you may want to consider
alternatives such as the marshalling API in `xmlrpc.client` or
third-party solutions.

## Performance

Recent versions of the pickle protocol (from protocol 2 and upwards) feature
efficient binary encodings for several common features and built-in types.
Also, the `pickle` module has a transparent optimizer written in C.

## Examples

For the simplest code, use the `dump()` and `load()` functions.:

```
import pickle

# An arbitrary collection of objects supported by pickle.
data = {
    'a': [1, 2.0, 3+4j],
    'b': ("character string", b"byte string"),
    'c': {None, True, False}
}

with open('data.pickle', 'wb') as f:
    # Pickle the 'data' dictionary using the highest protocol available.
    pickle.dump(data, f, pickle.HIGHEST_PROTOCOL)
```

The following example reads the resulting pickled data.:

```
import pickle

with open('data.pickle', 'rb') as f:
    # The protocol version used is detected automatically, so we do not
    # have to specify it.
    data = pickle.load(f)
```

## Command-line interface

The `pickle` module can be invoked as a script from the command line,
it will display contents of the pickle files. However, when the pickle file
that you want to examine comes from an untrusted source, `-m pickletools`
is a safer option because it does not execute pickle bytecode, see
pickletools CLI usage.

```bash
python -m pickle pickle_file [pickle_file ...]
```

The following option is accepted:

pickle

### option `pickle_file`

A pickle file to read, or `-` to indicate reading from standard input.

> **See also:** Module `copyreg`
> Pickle interface constructor registration for extension types.
>
> Module `pickletools`
> Tools for working with and analyzing pickled data.
>
> Module `shelve`
> Indexed databases of objects; uses `pickle`.
>
> Module `copy`
> Shallow and deep object copying.
>
> Module `marshal`
> High-performance serialization of built-in types.

**Footnotes**
