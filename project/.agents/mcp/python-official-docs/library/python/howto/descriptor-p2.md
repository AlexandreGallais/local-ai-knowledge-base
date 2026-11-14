---
title: "Descriptor Guide (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/descriptor.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Descriptor Guide (part 2 of 4)

## Technical Tutorial

What follows is a more technical tutorial for the mechanics and details of how
descriptors work.

### Abstract

Defines descriptors, summarizes the protocol, and shows how descriptors are
called.  Provides an example showing how object relational mappings work.

Learning about descriptors not only provides access to a larger toolset, it
creates a deeper understanding of how Python works.

### Definition and introduction

In general, a descriptor is an attribute value that has one of the methods in
the descriptor protocol.  Those methods are `__get__(), set__()`,
and `__delete__()`.  If any of those methods are defined for an
attribute, it is said to be a descriptor.

The default behavior for attribute access is to get, set, or delete the
attribute from an object's dictionary.  For instance, `a.x` has a lookup chain
starting with `a.__dict__['x']`, then `type(a).__dict__['x']`, and
continuing through the method resolution order of `type(a)`. If the
looked-up value is an object defining one of the descriptor methods, then Python
may override the default behavior and invoke the descriptor method instead.
Where this occurs in the precedence chain depends on which descriptor methods
were defined.

Descriptors are a powerful, general purpose protocol.  They are the mechanism
behind properties, methods, static methods, class methods, and
`super()`.  They are used throughout Python itself.  Descriptors
simplify the underlying C code and offer a flexible set of new tools for
everyday Python programs.

### Descriptor protocol

`descr.__get__(self, obj, type=None)`

`descr.__set__(self, obj, value)`

`descr.__delete__(self, obj)`

That is all there is to it.  Define any of these methods and an object is
considered a descriptor and can override default behavior upon being looked up
as an attribute.

If an object defines `__set__() or delete__()`, it is considered
a data descriptor.  Descriptors that only define `__get__()` are called
non-data descriptors (they are often used for methods but other uses are
possible).

Data and non-data descriptors differ in how overrides are calculated with
respect to entries in an instance's dictionary.  If an instance's dictionary
has an entry with the same name as a data descriptor, the data descriptor
takes precedence.  If an instance's dictionary has an entry with the same
name as a non-data descriptor, the dictionary entry takes precedence.

To make a read-only data descriptor, define both `__get__()` and
`__set__() with the set__()` raising an `AttributeError` when
called.  Defining the `__set__()` method with an exception raising
placeholder is enough to make it a data descriptor.

### Overview of descriptor invocation

A descriptor can be called directly with `desc.__get__(obj)` or
`desc.__get__(None, cls)`.

But it is more common for a descriptor to be invoked automatically from
attribute access.

The expression `obj.x` looks up the attribute `x` in the chain of
namespaces for `obj`.  If the search finds a descriptor outside of the
instance `__dict__, its get__()` method is
invoked according to the precedence rules listed below.

The details of invocation depend on whether `obj` is an object, class, or
instance of super.

### Invocation from an instance

Instance lookup scans through a chain of namespaces giving data descriptors
the highest priority, followed by instance variables, then non-data
descriptors, then class variables, and lastly `__getattr__()` if it is
provided.

If a descriptor is found for `a.x`, then it is invoked with:
`desc.__get__(a, type(a))`.

The logic for a dotted lookup is in `object.__getattribute__()`.  Here is
a pure Python equivalent:

```python

def find_name_in_mro(cls, name, default):
    "Emulate _PyType_Lookup() in Objects/typeobject.c"
    for base in cls.__mro__:
        if name in vars(base):
            return vars(base)[name]
    return default

def object_getattribute(obj, name):
    "Emulate PyObject_GenericGetAttr() in Objects/object.c"
    null = sentinel('null')
    objtype = type(obj)
    cls_var = find_name_in_mro(objtype, name, null)
    descr_get = getattr(type(cls_var), '__get__', null)
    if descr_get is not null:
        if (hasattr(type(cls_var), '__set__')
            or hasattr(type(cls_var), '__delete__')):
            return descr_get(cls_var, obj, objtype)     # data descriptor
    if hasattr(obj, '__dict__') and name in vars(obj):
        return vars(obj)[name]                          # instance variable
    if descr_get is not null:
        return descr_get(cls_var, obj, objtype)         # non-data descriptor
    if cls_var is not null:
        return cls_var                                  # class variable
    raise AttributeError(name)
```

```python

# Test the fidelity of object_getattribute() by comparing it with the
# normal object.__getattribute__().  The former will be accessed by
# square brackets and the latter by the dot operator.

class Object:

    def __getitem__(obj, name):
        try:
            return object_getattribute(obj, name)
        except AttributeError:
            if not hasattr(type(obj), '__getattr__'):
                raise
        return type(obj).__getattr__(obj, name)             # __getattr__

class DualOperator(Object):

    x = 10

    def __init__(self, z):
        self.z = z

    @property
    def p2(self):
        return 2 * self.x

    @property
    def p3(self):
        return 3 * self.x

    def m5(self, y):
        return 5 * y

    def m7(self, y):
        return 7 * y

    def __getattr__(self, name):
        return ('getattr_hook', self, name)

class DualOperatorWithSlots:

    __getitem__ = Object.__getitem__

    __slots__ = ['z']

    x = 15

    def __init__(self, z):
        self.z = z

    @property
    def p2(self):
        return 2 * self.x

    def m5(self, y):
        return 5 * y

    def __getattr__(self, name):
        return ('getattr_hook', self, name)

class D1:
    def __get__(self, obj, objtype=None):
        return type(self), obj, objtype

class U1:
    x = D1()

class U2(U1):
    pass
```

```python

>>> a = DualOperator(11)
>>> vars(a).update(p3 = '_p3', m7 = '_m7')
>>> a.x == a['x'] == 10
True
>>> a.z == a['z'] == 11
True
>>> a.p2 == a['p2'] == 20
True
>>> a.p3 == a['p3'] == 30
True
>>> a.m5(100) == a.m5(100) == 500
True
>>> a.m7 == a['m7'] == '_m7'
True
>>> a.g == a['g'] == ('getattr_hook', a, 'g')
True

>>> b = DualOperatorWithSlots(22)
>>> b.x == b['x'] == 15
True
>>> b.z == b['z'] == 22
True
>>> b.p2 == b['p2'] == 30
True
>>> b.m5(200) == b['m5'](200) == 1000
True
>>> b.g == b['g'] == ('getattr_hook', b, 'g')
True

>>> u2 = U2()
>>> object_getattribute(u2, 'x') == u2.x == (D1, u2, U2)
True
```

Note, there is no `__getattr__() hook in the getattribute__()`
code.  That is why calling `__getattribute__()` directly or with
`super().__getattribute__` will bypass `__getattr__()` entirely.

Instead, it is the dot operator and the `getattr()` function that are
responsible for invoking `__getattr__() whenever getattribute__()`
raises an `AttributeError`.  Their logic is encapsulated in a helper
function:

```python

def getattr_hook(obj, name):
    "Emulate slot_tp_getattr_hook() in Objects/typeobject.c"
    try:
        return obj.__getattribute__(name)
    except AttributeError:
        if not hasattr(type(obj), '__getattr__'):
            raise
    return type(obj).__getattr__(obj, name)             # __getattr__
```

```python

>>> class ClassWithGetAttr:
...     x = 123
...     def __getattr__(self, attr):
...         return attr.upper()
...
>>> cw = ClassWithGetAttr()
>>> cw.y = 456
>>> getattr_hook(cw, 'x')
123
>>> getattr_hook(cw, 'y')
456
>>> getattr_hook(cw, 'z')
'Z'

>>> class ClassWithoutGetAttr:
...     x = 123
...
>>> cwo = ClassWithoutGetAttr()
>>> cwo.y = 456
>>> getattr_hook(cwo, 'x')
123
>>> getattr_hook(cwo, 'y')
456
>>> getattr_hook(cwo, 'z')
Traceback (most recent call last):
    ...
AttributeError: 'ClassWithoutGetAttr' object has no attribute 'z'
```

### Invocation from a class

The logic for a dotted lookup such as `A.x` is in
`type.__getattribute__()`.  The steps are similar to those for
`object.__getattribute__()` but the instance dictionary lookup is replaced
by a search through the class's method resolution order.

If a descriptor is found, it is invoked with `desc.__get__(None, A)`.

The full C implementation can be found in `type_getattro` and
`_PyType_Lookup` in Objects/typeobject.c.

### Invocation from super

The logic for super's dotted lookup is in the `__getattribute__()` method for
object returned by `super()`.

A dotted lookup such as `super(A, obj).m` searches `obj.__class__.__mro__`
for the base class `B` immediately following `A` and then returns
`B.__dict__['m'].__get__(obj, A)`.  If not a descriptor, `m` is returned
unchanged.

The full C implementation can be found in `super_getattro` in
Objects/typeobject.c.  A pure Python equivalent can be found in
`Guido's Tutorial
<https://www.python.org/download/releases/2.2.3/descrintro/#cooperation>`_.

### Summary of invocation logic

The mechanism for descriptors is embedded in the `__getattribute__()`
methods for `object`, `type`, and `super()`.

The important points to remember are:

- Descriptors are invoked by the `__getattribute__()` method.

- Classes inherit this machinery from `object`, `type`, or
`super()`.

- Overriding `__getattribute__()` prevents automatic descriptor calls
because all the descriptor logic is in that method.

- `object.__getattribute__()` and `type.__getattribute__()` make
different calls to `__get__()`.  The first includes the instance and may
include the class.  The second puts in `None` for the instance and always
includes the class.

- Data descriptors always override instance dictionaries.

- Non-data descriptors may be overridden by instance dictionaries.

### Automatic name notification

Sometimes it is desirable for a descriptor to know what class variable name it
was assigned to.  When a new class is created, the `type` metaclass
scans the dictionary of the new class.  If any of the entries are descriptors
and if they define `__set_name__()`, that method is called with two
arguments.  The *owner* is the class where the descriptor is used, and the
*name* is the class variable the descriptor was assigned to.

The implementation details are in `type_new` and
`set_names` in Objects/typeobject.c.

Since the update logic is in `type.__new__()`, notifications only take
place at the time of class creation.  If descriptors are added to the class
afterwards, `__set_name__()` will need to be called manually.

### ORM example

The following code is a simplified skeleton showing how data descriptors could
be used to implement an `object relational mapping
<https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping>`_.

The essential idea is that the data is stored in an external database.  The
Python instances only hold keys to the database's tables.  Descriptors take
care of lookups or updates:

```python

class Field:

    def __set_name__(self, owner, name):
        self.fetch = f'SELECT {name} FROM {owner.table} WHERE {owner.key}=?;'
        self.store = f'UPDATE {owner.table} SET {name}=? WHERE {owner.key}=?;'

    def __get__(self, obj, objtype=None):
        return conn.execute(self.fetch, [obj.key]).fetchone()[0]

    def __set__(self, obj, value):
        conn.execute(self.store, [value, obj.key])
        conn.commit()
```

We can use the `Field` class to define `models
<https://en.wikipedia.org/wiki/Database_model>`_ that describe the schema for
each table in a database:

```python

class Movie:
    table = 'Movies'                    # Table name
    key = 'title'                       # Primary key
    director = Field()
    year = Field()

    def __init__(self, key):
        self.key = key

class Song:
    table = 'Music'
    key = 'title'
    artist = Field()
    year = Field()
    genre = Field()

    def __init__(self, key):
        self.key = key
```

To use the models, first connect to the database:

```
>>> import sqlite3
>>> conn = sqlite3.connect('entertainment.db')
```

An interactive session shows how data is retrieved from the database and how
it can be updated:

```python

>>> Movie('Star Wars').director
'George Lucas'
>>> jaws = Movie('Jaws')
>>> f'Released in {jaws.year} by {jaws.director}'
'Released in 1975 by Steven Spielberg'

>>> Song('Country Roads').artist
'John Denver'

>>> Movie('Star Wars').director = 'J.J. Abrams'
>>> Movie('Star Wars').director
'J.J. Abrams'
```
