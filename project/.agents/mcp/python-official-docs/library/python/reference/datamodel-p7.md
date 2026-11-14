---
title: "Data model (part 7 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/datamodel.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Data model (part 7 of 10)

### `object.__bool__(self)`

Called to implement truth value testing and the built-in operation
`bool()`; should return `False` or `True`.  When this method is not
defined, `__len__()` is called, if it is defined, and the object is
considered true if its result is nonzero.  If a class defines neither
`__len__() nor bool__()` (which is true of the `object`
class itself), all its instances are considered true.

### Customizing attribute access

The following methods can be defined to customize the meaning of attribute
access (use of, assignment to, or deletion of `x.name`) for class instances.

### `object.__getattr__(self, name)`

Called when the default attribute access fails with an `AttributeError`
(either `__getattribute__()` raises an `AttributeError` because
*name* is not an instance attribute or an attribute in the class tree
for `self`; or `__get__()` of a *name* property raises
`AttributeError`).  This method should either return the (computed)
attribute value or raise an `AttributeError` exception.
The `object` class itself does not provide this method.

Note that if the attribute is found through the normal mechanism,
`__getattr__()` is not called.  (This is an intentional asymmetry between
`__getattr__() and setattr__()`.) This is done both for efficiency
reasons and because otherwise `__getattr__()` would have no way to access
other attributes of the instance.  Note that at least for instance variables,
you can take total control by not inserting any values in the instance attribute
dictionary (but instead inserting them in another object).  See the
`__getattribute__()` method below for a way to actually get total control
over attribute access.

### `object.__getattribute__(self, name)`

Called unconditionally to implement attribute accesses for instances of the
class. If the class also defines `__getattr__()`, the latter will not be
called unless `__getattribute__()` either calls it explicitly or raises an
`AttributeError`. This method should return the (computed) attribute value
or raise an `AttributeError` exception. In order to avoid infinite
recursion in this method, its implementation should always call the base class
method with the same name to access any attributes it needs, for example,
`object.__getattribute__(self, name)`.

> **Note:** This method may still be bypassed when looking up special methods as the
> result of implicit invocation via language syntax or
> built-in functions.
> See special-lookup.

### `object.__setattr__(self, name, value)`

Called when an attribute assignment is attempted.  This is called instead of
the normal mechanism (i.e. store the value in the instance dictionary).
*name* is the attribute name, *value* is the value to be assigned to it.

If `__setattr__()` wants to assign to an instance attribute, it should
call the base class method with the same name, for example,
`object.__setattr__(self, name, value)`.

### `object.__delattr__(self, name)`

Like `__setattr__()` but for attribute deletion instead of assignment.  This
should only be implemented if `del obj.name` is meaningful for the object.

### `object.__dir__(self)`

Called when `dir()` is called on the object. An iterable must be
returned. `dir()` converts the returned iterable to a list and sorts it.

#### Customizing module attribute access

### `module.__getattr__`

```python
module.__dir__
```

Special names `__getattr__` and `__dir__` can be also used to customize
access to module attributes. The `__getattr__` function at the module level
should accept one argument which is the name of an attribute and return the
computed value or raise an `AttributeError`. If an attribute is
not found on a module object through the normal lookup, i.e.
`object.__getattribute__()`, then `__getattr__` is searched in
the module `__dict__` before raising an `AttributeError`. If found,
it is called with the attribute name and the result is returned.

The `__dir__` function should accept no arguments, and return an iterable of
strings that represents the names accessible on module. If present, this
function overrides the standard `dir()` search on a module.

### `module.__class__`

For a more fine grained customization of the module behavior (setting
attributes, properties, etc.), one can set the `__class__` attribute of
a module object to a subclass of `types.ModuleType`. For example:

```
import sys
from types import ModuleType

class VerboseModule(ModuleType):
    def __repr__(self):
        return f'Verbose {self.__name__}'

    def __setattr__(self, attr, value):
        print(f'Setting {attr}...')
        super().__setattr__(attr, value)

sys.modules[__name__].__class__ = VerboseModule
```

> **Note:** Defining module `__getattr__` and setting module `__class__` only
> affect lookups made using the attribute access syntax -- directly accessing
> the module globals (whether by code within the module, or via a reference
> to the module's globals dictionary) is unaffected.

> *Changed in version 3.5.*
> `__class__` module attribute is now writable.

> *Added in version 3.7.*
> `__getattr__` and `__dir__` module attributes.

> **See also:** PEP 562 - Module __getattr__ and __dir__
> Describes the `__getattr__` and `__dir__` functions on modules.

#### Implementing Descriptors

The following methods only apply when an instance of the class containing the
method (a so-called *descriptor* class) appears in an *owner* class (the
descriptor must be in either the owner's class dictionary or in the class
dictionary for one of its parents).  In the examples below, "the attribute"
refers to the attribute whose name is the key of the property in the owner
class' `__dict__`.  The `object` class itself does not
implement any of these protocols.

### `object.__get__(self, instance, owner=None)`

Called to get the attribute of the owner class (class attribute access) or
of an instance of that class (instance attribute access). The optional
*owner* argument is the owner class, while *instance* is the instance that
the attribute was accessed through, or `None` when the attribute is
accessed through the *owner*.

This method should return the computed attribute value or raise an
`AttributeError` exception.

252 specifies that `__get__()` is callable with one or two
arguments.  Python's own built-in descriptors support this specification;
however, it is likely that some third-party tools have descriptors
that require both arguments.  Python's own `__getattribute__()`
implementation always passes in both arguments whether they are required
or not.

### `object.__set__(self, instance, value)`

Called to set the attribute on an instance *instance* of the owner class to a
new value, *value*.

Note, adding `__set__() or delete__()` changes the kind of
descriptor to a "data descriptor".  See descriptor-invocation for
more details.

### `object.__delete__(self, instance)`

Called to delete the attribute on an instance *instance* of the owner class.

Instances of descriptors may also have the `__objclass__` attribute
present:

### `object.__objclass__`

The attribute `__objclass__` is interpreted by the `inspect` module
as specifying the class where this object was defined (setting this
appropriately can assist in runtime introspection of dynamic class attributes).
For callables, it may indicate that an instance of the given type (or a
subclass) is expected or required as the first positional argument (for example,
CPython sets this attribute for unbound methods that are implemented in C).

#### Invoking Descriptors

In general, a descriptor is an object attribute with "binding behavior", one
whose attribute access has been overridden by methods in the descriptor
protocol:  `__get__(), set__()`, and
`__delete__()`. If any of
those methods are defined for an object, it is said to be a descriptor.

The default behavior for attribute access is to get, set, or delete the
attribute from an object's dictionary. For instance, `a.x` has a lookup chain
starting with `a.__dict__['x']`, then `type(a).__dict__['x']`, and
continuing through the base classes of `type(a)` excluding metaclasses.

However, if the looked-up value is an object defining one of the descriptor
methods, then Python may override the default behavior and invoke the descriptor
method instead.  Where this occurs in the precedence chain depends on which
descriptor methods were defined and how they were called.

The starting point for descriptor invocation is a binding, `a.x`. How the
arguments are assembled depends on `a`:

Direct Call
The simplest and least common call is when user code directly invokes a
descriptor method:    `x.__get__(a)`.

Instance Binding
If binding to an object instance, `a.x` is transformed into the call:
`type(a).__dict__['x'].__get__(a, type(a))`.

Class Binding
If binding to a class, `A.x` is transformed into the call:
`A.__dict__['x'].__get__(None, A)`.

Super Binding
A dotted lookup such as `super(A, a).x` searches
`a.__class__.__mro__` for a base class `B` following `A` and then
returns `B.__dict__['x'].__get__(a, A)`.  If not a descriptor, `x` is
returned unchanged.

```python

class Desc:
    def __get__(*args):
        return args

class B:

    x = Desc()

class A(B):

    x = 999

    def m(self):
        'Demonstrate these two descriptor invocations are equivalent'
        result1 = super(A, self).x
        result2 = B.__dict__['x'].__get__(self, A)
        return result1 == result2
```

```python

>>> a = A()
>>> a.__class__.__mro__.index(B) > a.__class__.__mro__.index(A)
True
>>> super(A, a).x == B.__dict__['x'].__get__(a, A)
True
>>> a.m()
True
```

For instance bindings, the precedence of descriptor invocation depends on
which descriptor methods are defined.  A descriptor can define any combination
of `__get__(), set__()` and
`__delete__()`.  If it does not
define `__get__()`, then accessing the attribute will return the descriptor
object itself unless there is a value in the object's instance dictionary.  If
the descriptor defines `__set__() and/or delete__()`, it is a data
descriptor; if it defines neither, it is a non-data descriptor.  Normally, data
descriptors define both `__get__() and set__()`, while non-data
descriptors have just the `__get__()` method.  Data descriptors with
`__get__() and set__() (and/or delete__()`) defined
always override a redefinition in an
instance dictionary.  In contrast, non-data descriptors can be overridden by
instances.

Python methods (including those decorated with
staticmethod and classmethod) are
implemented as non-data descriptors.  Accordingly, instances can redefine and
override methods.  This allows individual instances to acquire behaviors that
differ from other instances of the same class.

The property decorator is implemented as a data descriptor. Accordingly,
instances cannot override the behavior of a property.

#### __slots__

*__slots__* allow us to explicitly declare data members (like
properties) and deny the creation of `__dict__` and *__weakref__*
(unless explicitly declared in *__slots__* or available in a parent.)

The space saved over using `__dict__` can be significant.
Attribute lookup speed can be significantly improved as well.

### `object.__slots__`

This class variable can be assigned a string, iterable, or sequence of
strings with variable names used by instances.  *__slots__* reserves space
for the declared variables and prevents the automatic creation of
`__dict__`
and *__weakref__* for each instance.

Notes on using *__slots__*:

- When inheriting from a class without *__slots__*, the
`__dict__` and
*__weakref__* attribute of the instances will always be accessible.

- Without a `__dict__` variable, instances cannot be assigned new
variables not
listed in the *__slots__* definition.  Attempts to assign to an unlisted
variable name raises `AttributeError`. If dynamic assignment of new
variables is desired, then add `'__dict__'` to the sequence of strings in
the *__slots__* declaration.

- Without a *__weakref__* variable for each instance, classes defining
*__slots__* do not support `weak references` to its instances.
If weak reference
support is needed, then add `'__weakref__'` to the sequence of strings in the
*__slots__* declaration.

- *__slots__* are implemented at the class level by creating descriptors
for each variable name.  As a result, class attributes
cannot be used to set default values for instance variables defined by
*__slots__*; otherwise, the class attribute would overwrite the descriptor
assignment.

- The action of a *__slots__* declaration is not limited to the class
where it is defined.  *__slots__* declared in parents are available in
child classes. However, instances of a child subclass will get a
`__dict__` and *__weakref__* unless the subclass also defines
*__slots__* (which should only contain names of any *additional* slots).

- If a class defines a slot also defined in a base class, the instance variable
defined by the base class slot is inaccessible (except by retrieving its
descriptor directly from the base class). This renders the meaning of the
program undefined.  In the future, a check may be added to prevent this.

- `TypeError` will be raised if *__slots__* other than *__dict__* and
*__weakref__* are defined for a class derived from a
`"variable-length" built-in type` such as
`int`, `bytes`, and `type`, except `tuple`.

- Any non-string iterable may be assigned to *__slots__*.

- If a `dictionary` is used to assign *__slots__*, the dictionary
keys will be used as the slot names. The values of the dictionary can be used
to provide per-attribute docstrings that will be recognised by
`inspect.getdoc()` and displayed in the output of `help()`.

- `__class__` assignment works only if both classes have the
same *__slots__*.

- Multiple inheritance with multiple slotted parent
classes can be used,
but only one parent is allowed to have attributes created by slots
(the other bases must have empty slot layouts) - violations raise
`TypeError`.

- If an iterator is used for *__slots__* then a descriptor is
created for each
of the iterator's values. However, the *__slots__* attribute will be an empty
iterator.

> *Changed in version 3.15.*
> Allowed defining the *__dict__* and *__weakref__* *__slots__* for any class.
> Allowed defining any *__slots__* for a class derived from `tuple`.

### Customizing class creation

Whenever a class inherits from another class, `__init_subclass__()` is
called on the parent class. This way, it is possible to write classes which
change the behavior of subclasses. This is closely related to class
decorators, but where class decorators only affect the specific class they're
applied to, `__init_subclass__` solely applies to future subclasses of the
class defining the method.
