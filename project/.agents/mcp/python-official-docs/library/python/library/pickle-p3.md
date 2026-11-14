---
title: "pickle --- Python object serialization (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/pickle.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# pickle --- Python object serialization (part 3 of 4)

## Pickling Class Instances

In this section, we describe the general mechanisms available to you to define,
customize, and control how class instances are pickled and unpickled.

In most cases, no additional code is needed to make instances picklable.  By
default, pickle will retrieve the class and the attributes of an instance via
introspection. When a class instance is unpickled, its `__init__()` method
is usually *not* invoked.  The default behaviour first creates an uninitialized
instance and then restores the saved attributes.  The following code shows an
implementation of this behaviour:

```
def save(obj):
    return (obj.__class__, obj.__dict__)

def restore(cls, attributes):
    obj = cls.__new__(cls)
    obj.__dict__.update(attributes)
    return obj
```

Classes can alter the default behaviour by providing one or several special
methods:

### `object.__getnewargs_ex__()`

In protocols 2 and newer, classes that implement the
`__getnewargs_ex__()` method can dictate the values passed to the
`__new__()` method upon unpickling.  The method must return a pair
`(args, kwargs)` where *args* is a tuple of positional arguments
and *kwargs* a dictionary of named arguments for constructing the
object.  Those will be passed to the `__new__()` method upon
unpickling.

You should implement this method if the `__new__()` method of your
class requires keyword-only arguments.  Otherwise, it is recommended for
compatibility to implement `__getnewargs__()`.

> *Changed in version 3.6.*
> `__getnewargs_ex__()` is now used in protocols 2 and 3.

### `object.__getnewargs__()`

This method serves a similar purpose as `__getnewargs_ex__()`, but
supports only positional arguments.  It must return a tuple of arguments
`args` which will be passed to the `__new__()` method upon unpickling.

`__getnewargs__() will not be called if getnewargs_ex__()` is
defined.

> *Changed in version 3.6.*
> Before Python 3.6, `__getnewargs__()` was called instead of
> `__getnewargs_ex__()` in protocols 2 and 3.

### `object.__getstate__()`

Classes can further influence how their instances are pickled by overriding
the method `__getstate__()`.  It is called and the returned object
is pickled as the contents for the instance, instead of a default state.
There are several cases:

- For a class that has no instance `__dict__` and no
`__slots__`, the default state is `None`.

- For a class that has an instance `__dict__` and no
`__slots__`, the default state is `self.__dict__`.

- For a class that has an instance `__dict__` and
`__slots__`, the default state is a tuple consisting of two
dictionaries:  `self.__dict__`, and a dictionary mapping slot
names to slot values.  Only slots that have a value are
included in the latter.

- For a class that has `__slots__` and no instance
`__dict__`, the default state is a tuple whose first item
is `None` and whose second item is a dictionary mapping slot names
to slot values described in the previous bullet.

> *Changed in version 3.11.*
> Added the default implementation of the `__getstate__()` method in the
> `object` class.

### `object.__setstate__(state)`

Upon unpickling, if the class defines `__setstate__()`, it is called with
the unpickled state.  In that case, there is no requirement for the state
object to be a dictionary.  Otherwise, the pickled state must be a dictionary
and its items are assigned to the new instance's dictionary.

> **Note:** If `__reduce__()` returns a state with value `None` at pickling,
> the `__setstate__()` method will not be called upon unpickling.

Refer to the section pickle-state for more information about how to use
the methods `__getstate__() and setstate__()`.

> **Note:** At unpickling time, some methods like `__getattr__()`,
> `__getattribute__(), or setattr__()` may be called upon the
> instance.  In case those methods rely on some internal invariant being
> true, the type should implement `__new__()` to establish such an
> invariant, as `__init__()` is not called when unpickling an
> instance.

As we shall see, pickle does not use directly the methods described above.  In
fact, these methods are part of the copy protocol which implements the
`__reduce__()` special method.  The copy protocol provides a unified
interface for retrieving the data necessary for pickling and copying
objects.

Although powerful, implementing `__reduce__()` directly in your classes is
error prone.  For this reason, class designers should use the high-level
interface (i.e., `__getnewargs_ex__(), getstate__()` and
`__setstate__()`) whenever possible.  We will show, however, cases where
using `__reduce__()` is the only option or leads to more efficient pickling
or both.

### `object.__reduce__()`

The interface is currently defined as follows.  The `__reduce__()` method
takes no argument and shall return either a string or preferably a tuple (the
returned object is often referred to as the "reduce value").

If a string is returned, the string should be interpreted as the name of a
global variable.  It should be the object's local name relative to its
module; the pickle module searches the module namespace to determine the
object's module: for a given `obj` to be pickled, the `__module__`
attribute is looked up on `obj` directly, which falls back to a lookup
on the type of `obj` if no `__module__` instance attribute is set.
This behaviour is typically useful for singletons.

When a tuple is returned, it must be between two and six items long.
Optional items can either be omitted, or `None` can be provided as their
value.  The semantics of each item are in order:

- A callable object that will be called to create the initial version of the
object.

- A tuple of arguments for the callable object.  An empty tuple must be given
if the callable does not accept any argument.

- Optionally, the object's state, which will be passed to the object's
`__setstate__()` method as previously described.  If the object has no
such method then, the value must be a dictionary and it will be added to
the object's `__dict__` attribute.

- Optionally, an iterator (and not a sequence) yielding successive items.
These items will be appended to the object either using
`obj.append(item)` or, in batch, using `obj.extend(list_of_items)`.
This is primarily used for list subclasses, but may be used by other
classes as long as they have `append()`
and `extend()` methods with
the appropriate signature.  (Whether `append()` or `extend()` is
used depends on which pickle protocol version is used as well as the number
of items to append, so both must be supported.)

- Optionally, an iterator (not a sequence) yielding successive key-value
pairs.  These items will be stored to the object using ``obj[key] =
value``.  This is primarily used for dictionary subclasses, but may be used
by other classes as long as they implement `__setitem__()`.

- Optionally, a callable with a `(obj, state)` signature. This
callable allows the user to programmatically control the state-updating
behavior of a specific object, instead of using `obj`'s static
`__setstate__()` method. If not `None`, this callable will have
priority over `obj`'s `__setstate__()`.

> *Added in version 3.8.*
> The optional sixth tuple item, `(obj, state)`, was added.

### `object.__reduce_ex__(protocol)`

Alternatively, a `__reduce_ex__()` method may be defined.  The only
difference is this method should take a single integer argument, the protocol
version.  When defined, pickle will prefer it over the `__reduce__()`
method.  In addition, `__reduce__()` automatically becomes a synonym for
the extended version.  The main use for this method is to provide
backwards-compatible reduce values for older Python releases.

### Persistence of External Objects

For the benefit of object persistence, the `pickle` module supports the
notion of a reference to an object outside the pickled data stream.  Such
objects are referenced by a persistent ID, which should be either a string of
alphanumeric characters (for protocol 0) or just an arbitrary object (for
any newer protocol).

The resolution of such persistent IDs is not defined by the `pickle`
module; it will delegate this resolution to the user-defined methods on the
pickler and unpickler, `persistent_id()` and
`persistent_load()` respectively.

To pickle objects that have an external persistent ID, the pickler must have a
custom `persistent_id()` method that takes an object as an
argument and returns either `None` or the persistent ID for that object.
When `None` is returned, the pickler simply pickles the object as normal.
When a persistent ID string is returned, the pickler will pickle that object,
along with a marker so that the unpickler will recognize it as a persistent ID.

To unpickle external objects, the unpickler must have a custom
`persistent_load()` method that takes a persistent ID object and
returns the referenced object.

Here is a comprehensive example presenting how persistent ID can be used to
pickle external objects by reference.

### Dispatch Tables

If one wants to customize pickling of some classes without disturbing
any other code which depends on pickling, then one can create a
pickler with a private dispatch table.

The global dispatch table managed by the `copyreg` module is
available as `copyreg.dispatch_table`.  Therefore, one may
choose to use a modified copy of `copyreg.dispatch_table` as a
private dispatch table.

For example:

```
f = io.BytesIO()
p = pickle.Pickler(f)
p.dispatch_table = copyreg.dispatch_table.copy()
p.dispatch_table[SomeClass] = reduce_SomeClass
```

creates an instance of `pickle.Pickler` with a private dispatch
table which handles the `SomeClass` class specially.  Alternatively,
the code:

```
class MyPickler(pickle.Pickler):
    dispatch_table = copyreg.dispatch_table.copy()
    dispatch_table[SomeClass] = reduce_SomeClass
f = io.BytesIO()
p = MyPickler(f)
```

does the same but all instances of `MyPickler` will by default
share the private dispatch table.  On the other hand, the code:

```
copyreg.pickle(SomeClass, reduce_SomeClass)
f = io.BytesIO()
p = pickle.Pickler(f)
```

modifies the global dispatch table shared by all users of the `copyreg` module.

### Handling Stateful Objects

Here's an example that shows how to modify pickling behavior for a class.
The `TextReader` class below opens a text file, and returns the line number and
line contents each time its `readline()` method is called. If a
`TextReader` instance is pickled, all attributes *except* the file object
member are saved. When the instance is unpickled, the file is reopened, and
reading resumes from the last location. The `__setstate__()` and
`__getstate__()` methods are used to implement this behavior.:

```
class TextReader:
    """Print and number lines in a text file."""

    def __init__(self, filename):
        self.filename = filename
        self.file = open(filename)
        self.lineno = 0

    def readline(self):
        self.lineno += 1
        line = self.file.readline()
        if not line:
            return None
        if line.endswith('\n'):
            line = line[:-1]
        return "%i: %s" % (self.lineno, line)

    def __getstate__(self):
        # Copy the object's state from self.__dict__ which contains
        # all our instance attributes. Always use the dict.copy()
        # method to avoid modifying the original state.
        state = self.__dict__.copy()
        # Remove the unpicklable entries.
        del state['file']
        return state

    def __setstate__(self, state):
        # Restore instance attributes (i.e., filename and lineno).
        self.__dict__.update(state)
        # Restore the previously opened file's state. To do so, we need to
        # reopen it and read from it until the line count is restored.
        file = open(self.filename)
        for _ in range(self.lineno):
            file.readline()
        # Finally, save the file.
        self.file = file
```

A sample usage might be something like this:

```
>>> reader = TextReader("hello.txt")
>>> reader.readline()
'1: Hello world!'
>>> reader.readline()
'2: I am line number two.'
>>> new_reader = pickle.loads(pickle.dumps(reader))
>>> new_reader.readline()
'3: Goodbye!'
```

## Custom Reduction for Types, Functions, and Other Objects

> *Added in version 3.8.*

Sometimes, `dispatch_table` may not be flexible enough.
In particular we may want to customize pickling based on another criterion
than the object's type, or we may want to customize the pickling of
functions and classes.

For those cases, it is possible to subclass from the `Pickler` class and
implement a `reducer_override()` method. This method can return an
arbitrary reduction tuple (see `__reduce__()`). It can alternatively return
`NotImplemented` to fallback to the traditional behavior.

If both the `dispatch_table` and
`reducer_override()` are defined, then
`reducer_override()` method takes priority.

For performance reasons, `reducer_override()` may not be
called for the following objects: `None`, `True`, `False`, and
exact instances of `int`, `float`, `bytes`,
`str`, `dict`, `set`, `frozenset`, `list`
and `tuple`.

Here is a simple example where we allow pickling and reconstructing
a given class:

```
import io
import pickle

class MyClass:
    my_attribute = 1

class MyPickler(pickle.Pickler):
    def reducer_override(self, obj):
        """Custom reducer for MyClass."""
        if getattr(obj, "__name__", None) == "MyClass":
            return type, (obj.__name__, obj.__bases__,
                          {'my_attribute': obj.my_attribute})
        else:
            # For any other object, fallback to usual reduction
            return NotImplemented

f = io.BytesIO()
p = MyPickler(f)
p.dump(MyClass)

del MyClass

unpickled_class = pickle.loads(f.getvalue())

assert isinstance(unpickled_class, type)
assert unpickled_class.__name__ == "MyClass"
assert unpickled_class.my_attribute == 1
```
