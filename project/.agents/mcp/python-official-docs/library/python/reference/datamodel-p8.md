---
title: "Data model (part 8 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/datamodel.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Data model (part 8 of 10)

### classmethod `object.__init_subclass__(cls)`

This method is called whenever the containing class is subclassed.
*cls* is then the new subclass. If defined as a normal instance method,
this method is implicitly converted to a class method.

Keyword arguments which are given to a new class are passed to
the parent class's `__init_subclass__`. For compatibility with
other classes using `__init_subclass__`, one should take out the
needed keyword arguments and pass the others over to the base
class, as in:

```
class Philosopher:
    def __init_subclass__(cls, /, default_name, **kwargs):
        super().__init_subclass__(**kwargs)
        cls.default_name = default_name

class AustralianPhilosopher(Philosopher, default_name="Bruce"):
    pass
```

The default implementation `object.__init_subclass__` does
nothing, but raises an error if it is called with any arguments.

> **Note:** The metaclass hint `metaclass` is consumed by the rest of the type
> machinery, and is never passed to `__init_subclass__` implementations.
> The actual metaclass (rather than the explicit hint) can be accessed as
> `type(cls)`.

> *Added in version 3.6.*

When a class is created, `type.__new__()` scans the class variables
and makes callbacks to those with a `__set_name__()` hook.

### `object.__set_name__(self, owner, name)`

Automatically called at the time the owning class *owner* is
created. The object has been assigned to *name* in that class:

```
class A:
    x = C()  # Automatically calls: x.__set_name__(A, 'x')
```

If the class variable is assigned after the class is created,
`__set_name__()` will not be called automatically.
If needed, `__set_name__()` can be called directly:

```
class A:
   pass

c = C()
A.x = c                  # The hook is not called
c.__set_name__(A, 'x')   # Manually invoke the hook
```

See class-object-creation for more details.

> *Added in version 3.6.*

#### Metaclasses

By default, classes are constructed using `type()`. The class body is
executed in a new namespace and the class name is bound locally to the
result of `type(name, bases, namespace)`.

The class creation process can be customized by passing the `metaclass`
keyword argument in the class definition line, or by inheriting from an
existing class that included such an argument. In the following example,
both `MyClass` and `MySubclass` are instances of `Meta`:

```
class Meta(type):
    pass

class MyClass(metaclass=Meta):
    pass

class MySubclass(MyClass):
    pass
```

Any other keyword arguments that are specified in the class definition are
passed through to all metaclass operations described below.

When a class definition is executed, the following steps occur:

- MRO entries are resolved;
- the appropriate metaclass is determined;
- the class namespace is prepared;
- the class body is executed;
- the class object is created.

#### Resolving MRO entries

### `object.__mro_entries__(self, bases)`

If a base that appears in a class definition is not an instance of
`type, then an mro_entries__()` method is searched on the base.
If an `__mro_entries__()` method is found, the base is substituted with the
result of a call to `__mro_entries__()` when creating the class.
The method is called with the original bases tuple
passed to the *bases* parameter, and must return a tuple
of classes that will be used instead of the base. The returned tuple may be
empty: in these cases, the original base is ignored.

> **See also:** `types.resolve_bases()`
> Dynamically resolve bases that are not instances of `type`.
>
> `types.get_original_bases()`
> Retrieve a class's "original bases" prior to modifications by
> `__mro_entries__()`.
>
> PEP 560
> Core support for typing module and generic types.

#### Determining the appropriate metaclass

The appropriate metaclass for a class definition is determined as follows:

- if no bases and no explicit metaclass are given, then `type()` is used;
- if an explicit metaclass is given and it is *not* an instance of
`type()`, then it is used directly as the metaclass;
- if an instance of `type()` is given as the explicit metaclass, or
bases are defined, then the most derived metaclass is used.

The most derived metaclass is selected from the explicitly specified
metaclass (if any) and the metaclasses (i.e. `type(cls)`) of all specified
base classes. The most derived metaclass is one which is a subtype of *all*
of these candidate metaclasses. If none of the candidate metaclasses meets
that criterion, then the class definition will fail with `TypeError`.

#### Preparing the class namespace

Once the appropriate metaclass has been identified, then the class namespace
is prepared. If the metaclass has a `__prepare__` attribute, it is called
as `namespace = metaclass.__prepare__(name, bases, **kwds)` (where the
additional keyword arguments, if any, come from the class definition). The
`__prepare__` method should be implemented as a
`classmethod()`. The
namespace returned by `__prepare__` is passed in to `__new__`, but when
the final class object is created the namespace is copied into a new `dict`.

If the metaclass has no `__prepare__` attribute, then the class namespace
is initialised as an empty ordered mapping.

> **See also:** PEP 3115 - Metaclasses in Python 3000
> Introduced the `__prepare__` namespace hook

#### Executing the class body

The class body is executed (approximately) as
`exec(body, globals(), namespace)`. The key <example-value> from a normal
call to `exec()` is that lexical scoping allows the class body (including
any methods) to reference names from the current and outer scopes when the
class definition occurs inside a function.

However, even when the class definition occurs inside the function, methods
defined inside the class still cannot see names defined at the class scope.
Class variables must be accessed through the first parameter of instance or
class methods, or through the implicit lexically scoped `__class__` reference
described in the next section.

#### Creating the class object

Once the class namespace has been populated by executing the class body,
the class object is created by calling
`metaclass(name, bases, namespace, **kwds)` (the additional keywords
passed here are the same as those passed to `__prepare__`).

This class object is the one that will be referenced by the zero-argument
form of `super()`. `__class__` is an implicit closure reference
created by the compiler if any methods in a class body refer to either
`__class__` or `super`. This allows the zero argument form of
`super()` to correctly identify the class being defined based on
lexical scoping, while the class or instance that was used to make the
current call is identified based on the first argument passed to the method.

> **CPython implementation detail:** In CPython 3.6 and later, the `__class__` cell is passed to the metaclass
> as a `__classcell__` entry in the class namespace. If present, this must
> be propagated up to the `type.__new__` call in order for the class to be
> initialised correctly.
> Failing to do so will result in a `RuntimeError` in Python 3.8.

When using the default metaclass `type`, or any metaclass that ultimately
calls `type.__new__`, the following additional customization steps are
invoked after creating the class object:

1) The `type.__new__` method collects all of the attributes in the class
namespace that define a `__set_name__()` method;
2) Those `__set_name__` methods are called with the class
being defined and the assigned name of that particular attribute;
3) The `__init_subclass__()` hook is called on the
immediate parent of the new class in its method resolution order.

After the class object is created, it is passed to the class decorators
included in the class definition (if any) and the resulting object is bound
in the local namespace as the defined class.

When a new class is created by `type.__new__`, the object provided as the
namespace parameter is copied to a new ordered mapping and the original
object is discarded. The new copy is wrapped in a read-only proxy, which
becomes the `__dict__` attribute of the class object.

> **See also:** PEP 3135 - New super
> Describes the implicit `__class__` closure reference

#### Uses for metaclasses

The potential uses for metaclasses are boundless. Some ideas that have been
explored include enum, logging, interface checking, automatic delegation,
automatic property creation, proxies, frameworks, and automatic resource
locking/synchronization.

### Customizing instance and subclass checks

The following methods are used to override the default behavior of the
`isinstance()` and `issubclass()` built-in functions.

In particular, the metaclass `abc.ABCMeta` implements these methods in
order to allow the addition of Abstract Base Classes (ABCs) as "virtual base
classes" to any class or type (including built-in types), including other
ABCs.

### `type.__instancecheck__(self, instance)`

Return true if *instance* should be considered a (direct or indirect)
instance of *class*. If defined, called to implement ``isinstance(instance,
class)``.

### `type.__subclasscheck__(self, subclass)`

Return true if *subclass* should be considered a (direct or indirect)
subclass of *class*.  If defined, called to implement ``issubclass(subclass,
class)``.

Note that these methods are looked up on the type (metaclass) of a class.  They
cannot be defined as class methods in the actual class.  This is consistent with
the lookup of special methods that are called on instances, only in this
case the instance is itself a class.

> **See also:** PEP 3119 - Introducing Abstract Base Classes
> Includes the specification for customizing `isinstance()` and
> `issubclass() behavior through instancecheck__()` and
> `__subclasscheck__()`, with motivation for this functionality
> in the context of adding Abstract Base Classes (see the `abc`
> module) to the language.

### Emulating generic types

When using type annotations, it is often useful to
*parameterize* a generic type using Python's square-brackets notation.
For example, the annotation `list[int]` might be used to signify a
`list` in which all the elements are of type `int`.

> **See also:** PEP 484 - Type Hints
> Introducing Python's framework for type annotations
>
> Generic Alias Types
> Documentation for objects representing parameterized generic classes
>
> Generics, user-defined generics and `typing.Generic`
> Documentation on how to implement generic classes that can be
> parameterized at runtime and understood by static type-checkers.

A class can *generally* only be parameterized if it defines the special
class method `__class_getitem__()`.

### classmethod `object.__class_getitem__(cls, key)`

Return an object representing the specialization of a generic class
by type arguments found in *key*.

When defined on a class, `__class_getitem__()` is automatically a class
method. As such, there is no need for it to be decorated with
classmethod when it is defined.

#### The purpose of *__class_getitem__*

The purpose of `__class_getitem__()` is to allow runtime
parameterization of standard-library generic classes in order to more easily
apply type hints to these classes.

To implement custom generic classes that can be parameterized at runtime and
understood by static type-checkers, users should either inherit from a standard
library class that already implements `__class_getitem__()`, or
inherit from `typing.Generic`, which has its own implementation of
`__class_getitem__()`.

Custom implementations of `__class_getitem__()` on classes defined
outside of the standard library may not be understood by third-party
type-checkers such as mypy. Using `__class_getitem__()` on any class for
purposes other than type hinting is discouraged.

#### *__class_getitem__* versus *__getitem__*

Usually, the subscription of an object using square
brackets will call the `__getitem__()` instance method defined on
the object's class. However, if the object being subscribed is itself a class,
the class method `__class_getitem__()` may be called instead.
`__class_getitem__()` should return a GenericAlias
object if it is properly defined.

Presented with the expression `obj[x]`, the Python interpreter
follows something like the following process to decide whether
`__getitem__() or class_getitem__()` should be
called:

```
from inspect import isclass

def subscribe(obj, x):
    """Return the result of the expression 'obj[x]'"""

    class_of_obj = type(obj)

    # If the class of obj defines __getitem__,
    # call class_of_obj.__getitem__(obj, x)
    if hasattr(class_of_obj, '__getitem__'):
        return class_of_obj.__getitem__(obj, x)

    # Else, if obj is a class and defines __class_getitem__,
    # call obj.__class_getitem__(x)
    elif isclass(obj) and hasattr(obj, '__class_getitem__'):
        return obj.__class_getitem__(x)

    # Else, raise an exception
    else:
        raise TypeError(
            f"'{class_of_obj.__name__}' object is not subscriptable"
        )
```

In Python, all classes are themselves instances of other classes. The class of
a class is known as that class's metaclass, and most classes have the
`type` class as their metaclass. `type` does not define
`__getitem__()`, meaning that expressions such as `list[int]`,
`dict[str, float]` and `tuple[str, bytes]` all result in
`__class_getitem__()` being called:

```
>>> # list has class "type" as its metaclass, like most classes:
>>> type(list)
<class 'type'>
>>> type(dict) == type(list) == type(tuple) == type(str) == type(bytes)
True
>>> # "list[int]" calls "list.__class_getitem__(int)"
>>> list[int]
list[int]
>>> # list.__class_getitem__ returns a GenericAlias object:
>>> type(list[int])
<class 'types.GenericAlias'>
```

However, if a class has a custom metaclass that defines
`__getitem__()`, subscribing the class may result in different
behaviour. An example of this can be found in the `enum` module:

```
>>> from enum import Enum
>>> class Menu(Enum):
...     """A breakfast menu"""
...     SPAM = 'spam'
...     BACON = 'bacon'
...
>>> # Enum classes have a custom metaclass:
>>> type(Menu)
<class 'enum.EnumMeta'>
>>> # EnumMeta defines __getitem__,
>>> # so __class_getitem__ is not called,
>>> # and the result is not a GenericAlias object:
>>> Menu['SPAM']
<Menu.SPAM: 'spam'>
>>> type(Menu['SPAM'])
<enum 'Menu'>
```

> **See also:** PEP 560 - Core Support for typing module and generic types
> Introducing `__class_getitem__()`, and outlining when a
> subscription results in `__class_getitem__()`
> being called instead of `__getitem__()`

### `object.__call__(self[, args...])`

Called when the instance is "called" as a function; if this method is defined,
`x(arg1, arg2, ...)` roughly translates to `type(x).__call__(x, arg1, ...)`.
The `object` class itself does not provide this method.
