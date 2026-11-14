---
title: "Descriptor Guide (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/descriptor.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Descriptor Guide (part 4 of 4)

### Member objects and __slots__

When a class defines `__slots__`, it replaces instance dictionaries with a
fixed-length array of slot values.  From a user point of view that has
several effects:

1. Provides immediate detection of bugs due to misspelled attribute
assignments.  Only attribute names specified in `__slots__` are allowed:

```python

class Vehicle:
    __slots__ = ('id_number', 'make', 'model')
```

```python

>>> auto = Vehicle()
>>> auto.id_nubmer = 'VYE483814LQEX'
Traceback (most recent call last):
    ...
AttributeError: 'Vehicle' object has no attribute 'id_nubmer'
```

1. Helps create immutable objects where descriptors manage access to private
attributes stored in `__slots__`:

```python

class Immutable:

    __slots__ = ('_dept', '_name')          # Replace the instance dictionary

    def __init__(self, dept, name):
        self._dept = dept                   # Store to private attribute
        self._name = name                   # Store to private attribute

    @property                               # Read-only descriptor
    def dept(self):
        return self._dept

    @property
    def name(self):                         # Read-only descriptor
        return self._name
```

```python

>>> mark = Immutable('Botany', 'Mark Watney')
>>> mark.dept
'Botany'
>>> mark.dept = 'Space Pirate'
Traceback (most recent call last):
    ...
AttributeError: property 'dept' of 'Immutable' object has no setter
>>> mark.location = 'Mars'
Traceback (most recent call last):
    ...
AttributeError: 'Immutable' object has no attribute 'location'
```

1. Saves memory.  On a 64-bit Linux build, an instance with two attributes
takes 48 bytes with `__slots__` and 152 bytes without.  This `flyweight
design pattern <https://en.wikipedia.org/wiki/Flyweight_pattern>`_ likely only
matters when a large number of instances are going to be created.

1. Improves speed.  Reading instance variables is 35% faster with
`__slots__` (as measured with Python 3.10 on an Apple M1 processor).

1. Blocks tools like functools.cached_property which require an
instance dictionary to function correctly:

```python

from functools import cached_property

class CP:
    __slots__ = ()                          # Eliminates the instance dict

    @cached_property                        # Requires an instance dict
    def pi(self):
        return 4 * sum((-1.0)**n / (2.0*n + 1.0)
                       for n in reversed(range(100_000)))
```

```python

>>> CP().pi
Traceback (most recent call last):
  ...
TypeError: No '__dict__' attribute on 'CP' instance to cache 'pi' property.
```

It is not possible to create an exact drop-in pure Python version of
`__slots__` because it requires direct access to C structures and control
over object memory allocation.  However, we can build a mostly faithful
simulation where the actual C structure for slots is emulated by a private
`_slotvalues` list.  Reads and writes to that private structure are managed
by member descriptors:

```python

null = sentinel('null')

class Member:

    def __init__(self, name, clsname, offset):
        'Emulate PyMemberDef in Include/descrobject.h'
        # Also see descr_new() in Objects/descrobject.c
        self.name = name
        self.clsname = clsname
        self.offset = offset

    def __get__(self, obj, objtype=None):
        'Emulate member_get() in Objects/descrobject.c'
        # Also see PyMember_GetOne() in Python/structmember.c
        if obj is None:
            return self
        value = obj._slotvalues[self.offset]
        if value is null:
            raise AttributeError(self.name)
        return value

    def __set__(self, obj, value):
        'Emulate member_set() in Objects/descrobject.c'
        obj._slotvalues[self.offset] = value

    def __delete__(self, obj):
        'Emulate member_delete() in Objects/descrobject.c'
        value = obj._slotvalues[self.offset]
        if value is null:
            raise AttributeError(self.name)
        obj._slotvalues[self.offset] = null

    def __repr__(self):
        'Emulate member_repr() in Objects/descrobject.c'
        return f'<Member {self.name!r} of {self.clsname!r}>'
```

The `type.__new__()` method takes care of adding member objects to class
variables:

```python

class Type(type):
    'Simulate how the type metaclass adds member objects for slots'

    def __new__(mcls, clsname, bases, mapping, **kwargs):
        'Emulate type_new() in Objects/typeobject.c'
        # type_new() calls PyTypeReady() which calls add_methods()
        slot_names = mapping.get('slot_names', [])
        for offset, name in enumerate(slot_names):
            mapping[name] = Member(name, clsname, offset)
        return type.__new__(mcls, clsname, bases, mapping, **kwargs)
```

The `object.__new__()` method takes care of creating instances that have
slots instead of an instance dictionary.  Here is a rough simulation in pure
Python:

```python

class Object:
    'Simulate how object.__new__() allocates memory for __slots__'

    def __new__(cls, *args, **kwargs):
        'Emulate object_new() in Objects/typeobject.c'
        inst = super().__new__(cls)
        if hasattr(cls, 'slot_names'):
            empty_slots = [null] * len(cls.slot_names)
            object.__setattr__(inst, '_slotvalues', empty_slots)
        return inst

    def __setattr__(self, name, value):
        'Emulate _PyObject_GenericSetAttrWithDict() Objects/object.c'
        cls = type(self)
        if hasattr(cls, 'slot_names') and name not in cls.slot_names:
            raise AttributeError(
                f'{cls.__name__!r} object has no attribute {name!r}'
            )
        super().__setattr__(name, value)

    def __delattr__(self, name):
        'Emulate _PyObject_GenericSetAttrWithDict() Objects/object.c'
        cls = type(self)
        if hasattr(cls, 'slot_names') and name not in cls.slot_names:
            raise AttributeError(
                f'{cls.__name__!r} object has no attribute {name!r}'
            )
        super().__delattr__(name)
```

To use the simulation in a real class, just inherit from `Object` and
set the metaclass to `Type`:

```python

class H(Object, metaclass=Type):
    'Instance variables stored in slots'

    slot_names = ['x', 'y']

    def __init__(self, x, y):
        self.x = x
        self.y = y
```

At this point, the metaclass has loaded member objects for *x* and *y*:

```
>>> from pprint import pp
>>> pp(dict(vars(H)))
{'__module__': '__main__',
 '__doc__': 'Instance variables stored in slots',
 'slot_names': ['x', 'y'],
 '__init__': <function H.__init__ at 0x7fb5d302f9d0>,
 'x': <Member 'x' of 'H'>,
 'y': <Member 'y' of 'H'>}
```

```python

# We test this separately because the preceding section is not
# doctestable due to the hex memory address for the __init__ function
>>> isinstance(vars(H)['x'], Member)
True
>>> isinstance(vars(H)['y'], Member)
True
```

When instances are created, they have a `slot_values` list where the
attributes are stored:

```python

>>> h = H(10, 20)
>>> vars(h)
{'_slotvalues': [10, 20]}
>>> h.x = 55
>>> vars(h)
{'_slotvalues': [55, 20]}
```

Misspelled or unassigned attributes will raise an exception:

```python

>>> h.xz
Traceback (most recent call last):
    ...
AttributeError: 'H' object has no attribute 'xz'
```

```python

 # Examples for deleted attributes are not shown because this section
 # is already a bit lengthy.  We still test that code here.
 >>> del h.x
 >>> hasattr(h, 'x')
 False

 # Also test the code for uninitialized slots
 >>> class HU(Object, metaclass=Type):
 ...     slot_names = ['x', 'y']
 ...
 >>> hu = HU()
 >>> hasattr(hu, 'x')
 False
 >>> hasattr(hu, 'y')
 False
```
