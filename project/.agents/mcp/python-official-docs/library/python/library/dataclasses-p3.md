---
title: "dataclasses --- Data Classes (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/dataclasses.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# dataclasses --- Data Classes (part 3 of 3)

### `make_dataclass(cls_name, fields, *, bases=(), namespace=None, init=True, repr=True, eq=True, order=False, unsafe_hash=False, frozen=False, match_args=True, kw_only=False, slots=False, weakref_slot=False, module=None, decorator=dataclass)`

Creates a new dataclass with name *cls_name*, fields as defined
in *fields*, base classes as given in *bases*, and initialized
with a namespace as given in *namespace*.  *fields* is an
iterable whose elements are each either `name`, `(name, type)`,
or `(name, type, Field)`.  If just `name` is supplied,
`typing.Any` is used for `type`.  The values of *init*,
*repr*, *eq*, *order*, *unsafe_hash*, *frozen*,
*match_args*, *kw_only*, *slots*, and *weakref_slot* have
the same meaning as they do in dataclass.

If *module* is defined, the `__module__` attribute
of the dataclass is set to that value.
By default, it is set to the module name of the caller.

The *decorator* parameter is a callable that will be used to create the dataclass.
It should take the class object as a first argument and the same keyword arguments
as dataclass. By default, the dataclass
function is used.

This function is not strictly required, because any Python
mechanism for creating a new class with `__annotations__` can
then apply the dataclass function to convert that class to
a dataclass.  This function is provided as a convenience.  For
example:

```
C = make_dataclass('C',
                   [('x', int),
                     'y',
                    ('z', int, field(default=5))],
                   namespace={'add_one': lambda self: self.x + 1})
```

Is equivalent to:

```
@dataclass
class C:
    x: int
    y: 'typing.Any'
    z: int = 5

    def add_one(self):
        return self.x + 1
```

> *Added in version 3.14.*
> Added the *decorator* parameter.

### `replace(obj, /, **changes)`

Creates a new object of the same type as *obj*, replacing
fields with values from *changes*.  If *obj* is not a Data
Class, raises `TypeError`.  If keys in *changes* are not
field names of the given dataclass, raises `TypeError`.

The newly returned object is created by calling the `__init__()`
method of the dataclass.  This ensures that
`__post_init__()`, if present, is also called.

Init-only variables without default values, if any exist, must be
specified on the call to `replace()` so that they can be passed to
`__init__() and post_init__()`.

It is an error for *changes* to contain any fields that are
defined as having `init=False`.  A `ValueError` will be raised
in this case.

Be forewarned about how `init=False` fields work during a call to
`replace()`.  They are not copied from the source object, but
rather are initialized in `__post_init__()`, if they're
initialized at all.  It is expected that `init=False` fields will
be rarely and judiciously used.  If they are used, it might be wise
to have alternate class constructors, or perhaps a custom
`replace()` (or similarly named) method which handles instance
copying.

Dataclass instances are also supported by generic function `copy.replace()`.

### `is_dataclass(obj)`

Return `True` if its parameter is a dataclass (including subclasses of a
dataclass, but not including generic aliases)
or an instance of one, otherwise return `False`.

If you need to know if a class is an instance of a dataclass (and
not a dataclass itself), then add a further check for ``not
isinstance(obj, type)``:

```
def is_dataclass_instance(obj):
    return is_dataclass(obj) and not isinstance(obj, type)
```

### `MISSING`

A `sentinel` object signifying a missing default or *default_factory*.

> *Changed in version 3.15.*
> `MISSING` is now a `sentinel` object.

### `KW_ONLY`

A `sentinel` object used as a type annotation.  Any fields after a
pseudo-field with the type of `KW_ONLY` are marked as
keyword-only fields.  Note that a pseudo-field of type
`KW_ONLY` is otherwise completely ignored.  This includes the
name of such a field.  By convention, a name of `_` is used for a
`KW_ONLY` field.  Keyword-only fields signify
`__init__()` parameters that must be specified as keywords when
the class is instantiated.

In this example, the fields `y` and `z` will be marked as keyword-only fields:

```
@dataclass
class Point:
    x: float
    _: KW_ONLY
    y: float
    z: float

p = Point(0, y=1.5, z=2.0)
```

In a single dataclass, it is an error to specify more than one
field whose type is `KW_ONLY`.

> *Added in version 3.10.*

> *Changed in version 3.15.*
> `KW_ONLY` is now a `sentinel` object.

### exception `FrozenInstanceError`

Raised when an implicitly defined `__setattr__()` or
`__delattr__()` is called on a dataclass which was defined with
`frozen=True`. It is a subclass of `AttributeError`.

## Post-init processing

### `__post_init__()`

When defined on the class, it will be called by the generated
`__init__()`, normally as `self.__post_init__()`.
However, if any `InitVar` fields are defined, they will also be
passed to `__post_init__()` in the order they were defined in the
class.  If no `__init__()` method is generated, then
`__post_init__()` will not automatically be called.

Among other uses, this allows for initializing field values that
depend on one or more other fields.  For example:

```
@dataclass
class C:
    a: float
    b: float
    c: float = field(init=False)

    def __post_init__(self):
        self.c = self.a + self.b
```

The `__init__()` method generated by dataclass does not call base
class `__init__() methods. If the base class has an init__()` method
that has to be called, it is common to call this method in a
`__post_init__()` method:

```
class Rectangle:
    def __init__(self, height, width):
        self.height = height
        self.width = width

@dataclass
class Square(Rectangle):
    side: float

    def __post_init__(self):
        super().__init__(self.side, self.side)
```

Note, however, that in general the dataclass-generated `__init__()` methods
don't need to be called, since the derived dataclass will take care of
initializing all fields of any base class that is a dataclass itself.

See the section below on init-only variables for ways to pass
parameters to `__post_init__()`.  Also see the warning about how
`replace()` handles `init=False` fields.

## Class variables

One of the few places where dataclass actually inspects the type
of a field is to determine if a field is a class variable as defined
in PEP 526.  It does this by checking if the type of the field is
`typing.ClassVar`.  If a field is a `ClassVar`, it is excluded
from consideration as a field and is ignored by the dataclass
mechanisms.  Such `ClassVar` pseudo-fields are not returned by the
module-level `fields()` function.

## Init-only variables

Another place where dataclass inspects a type annotation is to
determine if a field is an init-only variable.  It does this by seeing
if the type of a field is of type `InitVar`.  If a field
is an `InitVar`, it is considered a pseudo-field called an init-only
field.  As it is not a true field, it is not returned by the
module-level `fields()` function.  Init-only fields are added as
parameters to the generated `__init__()` method, and are passed to
the optional `__post_init__()` method.  They are not otherwise used
by dataclasses.

For example, suppose a field will be initialized from a database, if a
value is not provided when creating the class:

```
@dataclass
class C:
    i: int
    j: int | None = None
    database: InitVar[DatabaseType | None] = None

    def __post_init__(self, database):
        if self.j is None and database is not None:
            self.j = database.lookup('j')

c = C(10, database=my_database)
```

In this case, `fields()` will return `Field` objects for `i` and
`j`, but not for `database`.

## Frozen instances

It is not possible to create truly immutable Python objects.  However,
by passing `frozen=True` to the dataclass decorator you can
emulate immutability.  In that case, dataclasses will add
`__setattr__() and delattr__()` methods to the class.  These
methods will raise a `FrozenInstanceError` when invoked.

There is a tiny performance penalty when using `frozen=True`:
`__init__()` cannot use simple assignment to initialize fields, and
must use `object.__setattr__()`.

## Inheritance

When the dataclass is being created by the dataclass decorator,
it looks through all of the class's base classes in reverse MRO (that
is, starting at `object`) and, for each dataclass that it finds,
adds the fields from that base class to an ordered mapping of fields.
After all of the base class fields are added, it adds its own fields
to the ordered mapping.  All of the generated methods will use this
combined, calculated ordered mapping of fields.  Because the fields
are in insertion order, derived classes override base classes.  An
example:

```
@dataclass
class Base:
    x: Any = 15.0
    y: int = 0

@dataclass
class C(Base):
    z: int = 10
    x: int = 15
```

The final list of fields is, in order, `x`, `y`, `z`.  The final
type of `x` is `int`, as specified in class `C`.

The generated `__init__()` method for `C` will look like:

```
def __init__(self, x: int = 15, y: int = 0, z: int = 10):
```

## Re-ordering of keyword-only parameters in `__init__()`

After the parameters needed for `__init__()` are computed, any
keyword-only parameters are moved to come after all regular
(non-keyword-only) parameters.  This is a requirement of how
keyword-only parameters are implemented in Python: they must come
after non-keyword-only parameters.

In this example, `Base.y`, `Base.w`, and `D.t` are keyword-only
fields, and `Base.x` and `D.z` are regular fields:

```
@dataclass
class Base:
    x: Any = 15.0
    _: KW_ONLY
    y: int = 0
    w: int = 1

@dataclass
class D(Base):
    z: int = 10
    t: int = field(kw_only=True, default=0)
```

The generated `__init__()` method for `D` will look like:

```
def __init__(self, x: Any = 15.0, z: int = 10, *, y: int = 0, w: int = 1, t: int = 0):
```

Note that the parameters have been re-ordered from how they appear in
the list of fields: parameters derived from regular fields are
followed by parameters derived from keyword-only fields.

The relative ordering of keyword-only parameters is maintained in the
re-ordered `__init__()` parameter list.

## Default factory functions

If a `field()` specifies a *default_factory*, it is called with
zero arguments when a default value for the field is needed.  For
example, to create a new instance of a list, use:

```
mylist: list = field(default_factory=list)
```

If a field is excluded from `__init__()` (using `init=False`)
and the field also specifies *default_factory*, then the default
factory function will always be called from the generated
`__init__()` function.  This happens because there is no other
way to give the field an initial value.

## Mutable default values

Python stores default member variable values in class attributes.
Consider this example, not using dataclasses:

```
class C:
    x = []
    def add(self, element):
        self.x.append(element)

o1 = C()
o2 = C()
o1.add(1)
o2.add(2)
assert o1.x == [1, 2]
assert o1.x is o2.x
```

Note that the two instances of class `C` share the same class
variable `x`, as expected.

Using dataclasses, *if* this code was valid:

```
@dataclass
class D:
    x: list = []      # This code raises ValueError
    def add(self, element):
        self.x.append(element)
```

it would generate code similar to:

```
class D:
    x = []
    def __init__(self, x=x):
        self.x = x
    def add(self, element):
        self.x.append(element)

assert D().x is D().x
```

This has the same issue as the original example using class `C`.
That is, two instances of class `D` that do not specify a value
for `x` when creating a class instance will share the same copy
of `x`.  Because dataclasses just use normal Python class
creation they also share this behavior.  There is no general way
for Data Classes to detect this condition.  Instead, the
dataclass decorator will raise a `ValueError` if it
detects an unhashable default parameter.  The assumption is that if
a value is unhashable, it is mutable.  This is a partial solution,
but it does protect against many common errors.

Using default factory functions is a way to create new instances of
mutable types as default values for fields:

```
@dataclass
class D:
    x: list = field(default_factory=list)

assert D().x is not D().x
```

> *Changed in version 3.11.*
> Instead of looking for and disallowing objects of type `list`,
> `dict`, or `set`, unhashable objects are now not allowed as
> default values.  Unhashability is used to approximate
> mutability.

## Descriptor-typed fields

Fields that are assigned descriptor objects as their
default value have the following special behaviors:

- The value for the field passed to the dataclass's `__init__()` method is
passed to the descriptor's `__set__()` method rather than overwriting the
descriptor object.

- Similarly, when getting or setting the field, the descriptor's
`__get__() or set__()` method is called rather than returning or
overwriting the descriptor object.

- To determine whether a field contains a default value, dataclass
will call the descriptor's `__get__()` method using its class access
form: `descriptor.__get__(obj=None, type=cls)`.  If the
descriptor returns a value in this case, it will be used as the
field's default. On the other hand, if the descriptor raises
`AttributeError` in this situation, no default value will be
provided for the field.

```
class IntConversionDescriptor:
    def __init__(self, *, default):
        self._default = default

    def __set_name__(self, owner, name):
        self._name = "_" + name

    def __get__(self, obj, type):
        if obj is None:
            return self._default

        return getattr(obj, self._name, self._default)

    def __set__(self, obj, value):
        setattr(obj, self._name, int(value))

@dataclass
class InventoryItem:
    quantity_on_hand: IntConversionDescriptor = IntConversionDescriptor(default=100)

i = InventoryItem()
print(i.quantity_on_hand)   # 100
i.quantity_on_hand = 2.5    # calls __set__ with 2.5
print(i.quantity_on_hand)   # 2
```

Note that if a field is annotated with a descriptor type, but is not assigned
a descriptor object as its default value, the field will act like a normal
field.
