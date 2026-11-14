---
title: "Enum HOWTO (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/enum.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Enum HOWTO (part 3 of 3)

## Finer Points

### Supported `__dunder__` and `_sunder_` names

The supported `__dunder__` and `_sunder_` names can be found in the Enum API documentation.

### _Private__names

Private names are not converted to enum members,
but remain normal attributes.

> *Changed in version 3.11.*

### `Enum` member type

Enum members are instances of their enum class, and are normally accessed as
`EnumClass.member`.  In certain situations, such as writing custom enum
behavior, being able to access one member directly from another is useful,
and is supported; however, in order to avoid name clashes between member names
and attributes/methods from mixed-in classes, upper-case names are strongly
recommended.

> *Changed in version 3.5.*

### Creating members that are mixed with other data types

When subclassing other data types, such as `int` or `str`, with
an `Enum`, all values after the `=` are passed to that data type's
constructor.  For example:

```
>>> class MyEnum(IntEnum):      # help(int) -> int(x, base=10) -> integer
...     example = '11', 16      # so x='11' and base=16
...
>>> MyEnum.example.value        # and hex(11) is...
17
```

### Boolean value of `Enum` classes and members

Enum classes that are mixed with non-`Enum` types (such as
`int`, `str`, etc.) are evaluated according to the mixed-in
type's rules; otherwise, all members evaluate as `True`.  To make your
own enum's boolean evaluation depend on the member's value add the following to
your class:

```
def __bool__(self):
    return bool(self.value)
```

Plain `Enum` classes always evaluate as `True`.

### `Enum` classes with methods

If you give your enum subclass extra methods, like the Planet
class below, those methods will show up in a `dir()` of the member,
but not of the class:

```
>>> dir(Planet)                         # doctest: +SKIP
['EARTH', 'JUPITER', 'MARS', 'MERCURY', 'NEPTUNE', 'SATURN', 'URANUS', 'VENUS', '__class__', '__doc__', '__members__', '__module__']
>>> dir(Planet.EARTH)                   # doctest: +SKIP
['__class__', '__doc__', '__module__', 'mass', 'name', 'radius', 'surface_gravity', 'value']
```

### Combining members of `Flag`

Iterating over a combination of `Flag` members will only return the members that
are comprised of a single bit:

```
>>> class Color(Flag):
...     RED = auto()
...     GREEN = auto()
...     BLUE = auto()
...     MAGENTA = RED | BLUE
...     YELLOW = RED | GREEN
...     CYAN = GREEN | BLUE
...
>>> Color(3)  # named combination
<Color.YELLOW: 3>
>>> Color(7)      # not named combination
<Color.RED|GREEN|BLUE: 7>
```

### `Flag` and `IntFlag` minutia

Using the following snippet for our examples:

```
>>> class Color(IntFlag):
...     BLACK = 0
...     RED = 1
...     GREEN = 2
...     BLUE = 4
...     PURPLE = RED | BLUE
...     WHITE = RED | GREEN | BLUE
...
```

the following are true:

- single-bit flags are canonical
- multi-bit and zero-bit flags are aliases
- only canonical flags are returned during iteration::

```python
>>> list(Color.WHITE)
[<Color.RED: 1>, <Color.GREEN: 2>, <Color.BLUE: 4>]
```

- negating a flag or flag set returns a new flag/flag set with the
corresponding positive integer value:

```
>>> Color.BLUE
<Color.BLUE: 4>

>>> ~Color.BLUE
<Color.RED|GREEN: 3>
```

- names of pseudo-flags are constructed from their members' names::

```python
>>> (Color.RED | Color.GREEN).name
'RED|GREEN'
```

```python
>>> class Perm(IntFlag):
...     R = 4
...     W = 2
...     X = 1
...
>>> (Perm.R & Perm.W).name is None  # effectively Perm(0)
True
```

- multi-bit flags, aka aliases, can be returned from operations::

```python
>>> Color.RED | Color.BLUE
<Color.PURPLE: 5>
```

```python
>>> Color(7)  # or Color(-1)
<Color.WHITE: 7>
```

```python
>>> Color(0)
<Color.BLACK: 0>
```

- membership / containment checking: zero-valued flags are always considered
to be contained:

```
>>> Color.BLACK in Color.WHITE
True
```

otherwise, only if all bits of one flag are in the other flag will True
be returned:

```
>>> Color.PURPLE in Color.WHITE
True

>>> Color.GREEN in Color.PURPLE
False
```

There is a new boundary mechanism that controls how out-of-range / invalid
bits are handled: `STRICT`, `CONFORM`, `EJECT`, and `KEEP`:

- STRICT --> raises an exception when presented with invalid values
- CONFORM --> discards any invalid bits
- EJECT --> lose Flag status and become a normal int with the given value
- KEEP --> keep the extra bits

- keeps Flag status and extra bits
- extra bits do not show up in iteration
- extra bits do show up in repr() and str()

The default for Flag is `STRICT`, the default for `IntFlag` is `EJECT`,
and the default for `_convert_` is `KEEP` (see `ssl.Options` for an
example of when `KEEP` is needed).

## How are Enums and Flags different?

Enums have a custom metaclass that affects many aspects of both derived `Enum`
classes and their instances (members).

### Enum Classes

The `EnumType` metaclass is responsible for providing the
`__contains__(), dir__(), iter__()` and other methods that
allow one to do things with an `Enum` class that fail on a typical
class, such as `list(Color)` or `some_enum_var in Color`.  `EnumType` is
responsible for ensuring that various other methods on the final `Enum`
class are correct (such as `__new__(), getnewargs__()`,
`__str__() and repr__()`).

### Flag Classes

Flags have an expanded view of aliasing: to be canonical, the value of a flag
needs to be a power-of-two value, and not a duplicate name.  So, in addition to the
`Enum` definition of alias, a flag with no value (a.k.a. `0`) or with more than one
power-of-two value (e.g. `3`) is considered an alias.

### Enum Members (aka instances)

The most interesting thing about enum members is that they are singletons.
`EnumType` creates them all while it is creating the enum class itself,
and then puts a custom `__new__()` in place to ensure that no new ones are
ever instantiated by returning only the existing member instances.

### Flag Members

Flag members can be iterated over just like the `Flag` class, and only the
canonical members will be returned.  For example:

```
>>> list(Color)
[<Color.RED: 1>, <Color.GREEN: 2>, <Color.BLUE: 4>]
```

(Note that `BLACK`, `PURPLE`, and `WHITE` do not show up.)

Inverting a flag member returns the corresponding positive value,
rather than a negative value --- for example:

```
>>> ~Color.RED
<Color.GREEN|BLUE: 6>
```

Flag members have a length corresponding to the number of power-of-two values
they contain.  For example:

```
>>> len(Color.PURPLE)
2
```

## Enum Cookbook

While `Enum`, `IntEnum`, `StrEnum`, `Flag`, and
`IntFlag` are expected to cover the majority of use-cases, they cannot
cover them all.  Here are recipes for some different types of enumerations
that can be used directly, or as examples for creating one's own.

### Omitting values

In many use-cases, one doesn't care what the actual value of an enumeration
is. There are several ways to define this type of simple enumeration:

- use instances of `auto` for the value
- use instances of `object` as the value
- use a descriptive string as the value
- use a tuple as the value and a custom `__new__()` to replace the
tuple with an `int` value

Using any of these methods signifies to the user that these values are not
important, and also enables one to add, remove, or reorder members without
having to renumber the remaining members.

#### Using `auto`

Using `auto` would look like:

```
>>> class Color(Enum):
...     RED = auto()
...     BLUE = auto()
...     GREEN = auto()
...
>>> Color.GREEN
<Color.GREEN: 3>
```

#### Using `object`

Using `object` would look like:

```
>>> class Color(Enum):
...     RED = object()
...     GREEN = object()
...     BLUE = object()
...
>>> Color.GREEN                         # doctest: +SKIP
<Color.GREEN: <object object at 0x...>>
```

This is also a good example of why you might want to write your own
`__repr__()`:

```
>>> class Color(Enum):
...     RED = object()
...     GREEN = object()
...     BLUE = object()
...     def __repr__(self):
...         return "<%s.%s>" % (self.__class__.__name__, self._name_)
...
>>> Color.GREEN
<Color.GREEN>
```

#### Using a descriptive string

Using a string as the value would look like:

```
>>> class Color(Enum):
...     RED = 'stop'
...     GREEN = 'go'
...     BLUE = 'too fast!'
...
>>> Color.GREEN
<Color.GREEN: 'go'>
```

#### Using a custom `__new__()`

Using an auto-numbering `__new__()` would look like:

```
>>> class AutoNumber(Enum):
...     def __new__(cls):
...         value = len(cls.__members__) + 1
...         obj = object.__new__(cls)
...         obj._value_ = value
...         return obj
...
>>> class Color(AutoNumber):
...     RED = ()
...     GREEN = ()
...     BLUE = ()
...
>>> Color.GREEN
<Color.GREEN: 2>
```

To make a more general purpose `AutoNumber`, add `*args` to the signature:

```
>>> class AutoNumber(Enum):
...     def __new__(cls, *args):      # this is the only change from above
...         value = len(cls.__members__) + 1
...         obj = object.__new__(cls)
...         obj._value_ = value
...         return obj
...
```

Then when you inherit from `AutoNumber` you can write your own `__init__`
to handle any extra arguments:

```
>>> class Swatch(AutoNumber):
...     def __init__(self, pantone='unknown'):
...         self.pantone = pantone
...     AUBURN = '3497'
...     SEA_GREEN = '1246'
...     BLEACHED_CORAL = () # New color, no Pantone code yet!
...
>>> Swatch.SEA_GREEN
<Swatch.SEA_GREEN: 2>
>>> Swatch.SEA_GREEN.pantone
'1246'
>>> Swatch.BLEACHED_CORAL.pantone
'unknown'
```

> **Note:** The `__new__()` method, if defined, is used during creation of the Enum
> members; it is then replaced by Enum's `__new__()` which is used after
> class creation for lookup of existing members.

> **Warning:** *Do not* call `super().__new__()`, as the lookup-only `__new__` is the one
> that is found; instead, use the data type directly -- e.g.:
>
>
> ```
> obj = int.__new__(cls, value)
> ```
>

### OrderedEnum

An ordered enumeration that is not based on `IntEnum` and so maintains
the normal `Enum` invariants (such as not being comparable to other
enumerations):

```
>>> class OrderedEnum(Enum):
...     def __ge__(self, other):
...         if self.__class__ is other.__class__:
...             return self.value >= other.value
...         return NotImplemented
...     def __gt__(self, other):
...         if self.__class__ is other.__class__:
...             return self.value > other.value
...         return NotImplemented
...     def __le__(self, other):
...         if self.__class__ is other.__class__:
...             return self.value <= other.value
...         return NotImplemented
...     def __lt__(self, other):
...         if self.__class__ is other.__class__:
...             return self.value < other.value
...         return NotImplemented
...
>>> class Grade(OrderedEnum):
...     A = 5
...     B = 4
...     C = 3
...     D = 2
...     F = 1
...
>>> Grade.C < Grade.A
True
```

### DuplicateFreeEnum

Raises an error if a duplicate member value is found instead of creating an
alias:

```
>>> class DuplicateFreeEnum(Enum):
...     def __init__(self, *args):
...         cls = self.__class__
...         if any(self.value == e.value for e in cls):
...             a = self.name
...             e = cls(self.value).name
...             raise ValueError(
...                 "aliases not allowed in DuplicateFreeEnum:  %r --> %r"
...                 % (a, e))
...
>>> class Color(DuplicateFreeEnum):
...     RED = 1
...     GREEN = 2
...     BLUE = 3
...     GRENE = 2
...
Traceback (most recent call last):
  ...
ValueError: aliases not allowed in DuplicateFreeEnum:  'GRENE' --> 'GREEN'
```

> **Note:** This is a useful example for subclassing Enum to add or change other
> behaviors as well as disallowing aliases.  If the only desired change is
> disallowing aliases, the `unique()` decorator can be used instead.

### MultiValueEnum

Supports having more than one value per member:

```
>>> class MultiValueEnum(Enum):
...     def __new__(cls, value, *values):
...         self = object.__new__(cls)
...         self._value_ = value
...         for v in values:
...             self._add_value_alias_(v)
...         return self
...
>>> class DType(MultiValueEnum):
...     float32 = 'f', 8
...     double64 = 'd', 9
...
>>> DType('f')
<DType.float32: 'f'>
>>> DType(9)
<DType.double64: 'd'>
```

### Planet

If `__new__() or init__()` is defined, the value of the enum member
will be passed to those methods:

```
>>> class Planet(Enum):
...     MERCURY = (3.303e+23, 2.4397e6)
...     VENUS   = (4.869e+24, 6.0518e6)
...     EARTH   = (5.976e+24, 6.37814e6)
...     MARS    = (6.421e+23, 3.3972e6)
...     JUPITER = (1.9e+27,   7.1492e7)
...     SATURN  = (5.688e+26, 6.0268e7)
...     URANUS  = (8.686e+25, 2.5559e7)
...     NEPTUNE = (1.024e+26, 2.4746e7)
...     def __init__(self, mass, radius):
...         self.mass = mass       # in kilograms
...         self.radius = radius   # in meters
...     @property
...     def surface_gravity(self):
...         # universal gravitational constant  (m3 kg-1 s-2)
...         G = 6.67300E-11
...         return G * self.mass / (self.radius * self.radius)
...
>>> Planet.EARTH.value
(5.976e+24, 6378140.0)
>>> Planet.EARTH.surface_gravity
9.802652743337129
```

### TimePeriod

An example to show the `_ignore_` attribute in use:

```
>>> import datetime as dt
>>> class Period(dt.timedelta, Enum):
...     "different lengths of time"
...     _ignore_ = 'Period i'
...     Period = vars()
...     for i in range(367):
...         Period['day_%d' % i] = i
...
>>> list(Period)[:2]
[<Period.day_0: datetime.timedelta(0)>, <Period.day_1: datetime.timedelta(days=1)>]
>>> list(Period)[-2:]
[<Period.day_365: datetime.timedelta(days=365)>, <Period.day_366: datetime.timedelta(days=366)>]
```

## Subclassing EnumType

While most enum needs can be met by customizing `Enum` subclasses,
either with class decorators or custom functions, `EnumType` can be
subclassed to provide a different Enum experience.
