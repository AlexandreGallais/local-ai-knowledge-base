---
title: "Enum HOWTO (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/enum.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Enum HOWTO (part 2 of 3)

## Functional API

The `Enum` class is callable, providing the following functional API:

```
>>> Animal = Enum('Animal', 'ANT BEE CAT DOG')
>>> Animal
<enum 'Animal'>
>>> Animal.ANT
<Animal.ANT: 1>
>>> list(Animal)
[<Animal.ANT: 1>, <Animal.BEE: 2>, <Animal.CAT: 3>, <Animal.DOG: 4>]
```

The semantics of this API resemble `namedtuple`. The first
argument of the call to `Enum` is the name of the enumeration.

The second argument is the *source* of enumeration member names.  It can be a
whitespace-separated string of names, a sequence of names, a sequence of
2-tuples with key/value pairs, or a mapping (e.g. dictionary) of names to
values.  The last two options enable assigning arbitrary values to
enumerations; the others auto-assign increasing integers starting with 1 (use
the `start` parameter to specify a different starting value).  A
new class derived from `Enum` is returned.  In other words, the above
assignment to `Animal` is equivalent to:

```
>>> class Animal(Enum):
...     ANT = 1
...     BEE = 2
...     CAT = 3
...     DOG = 4
...
```

The reason for defaulting to `1` as the starting number and not `0` is
that `0` is `False` in a boolean sense, but by default enum members all
evaluate to `True`.

Pickling enums created with the functional API can be tricky as frame stack
implementation details are used to try and figure out which module the
enumeration is being created in (e.g. it will fail if you use a utility
function in a separate module, and also may not work on IronPython or Jython).
The solution is to specify the module name explicitly as follows:

```
>>> Animal = Enum('Animal', 'ANT BEE CAT DOG', module=__name__)
```

> **Warning:** If `module` is not supplied, and Enum cannot determine what it is,
> the new Enum members will not be unpicklable; to keep errors closer to
> the source, pickling will be disabled.

The new pickle protocol 4 also, in some circumstances, relies on
`__qualname__` being set to the location where pickle will be able
to find the class.  For example, if the class was made available in class
SomeData in the global scope:

```
>>> Animal = Enum('Animal', 'ANT BEE CAT DOG', qualname='SomeData.Animal')
```

The complete signature is:

```
Enum(
    value='NewEnumName',
    names=<...>,
    *,
    module='...',
    qualname='...',
    type=<mixed-in class>,
    start=1,
    )
```

- *value*: What the new enum class will record as its name.

- *names*: The enum members.  This can be a whitespace- or comma-separated string
(values will start at 1 unless otherwise specified):

```
'RED GREEN BLUE' | 'RED,GREEN,BLUE' | 'RED, GREEN, BLUE'
```

or an iterator of names:

```
['RED', 'GREEN', 'BLUE']
```

or an iterator of (name, value) pairs:

```
[('CYAN', 4), ('MAGENTA', 5), ('YELLOW', 6)]
```

or a mapping:

```
{'CHARTREUSE': 7, 'SEA_GREEN': 11, 'ROSEMARY': 42}
```

- *module*: name of module where new enum class can be found.

- *qualname*: where in module new enum class can be found.

- *type*: type to mix in to new enum class.

- *start*: number to start counting at if only names are passed in.

> *Changed in version 3.5.*
> The *start* parameter was added.

## Derived Enumerations

### IntEnum

The first variation of `Enum` that is provided is also a subclass of
`int`.  Members of an `IntEnum` can be compared to integers;
by extension, integer enumerations of different types can also be compared
to each other:

```
>>> from enum import IntEnum
>>> class Shape(IntEnum):
...     CIRCLE = 1
...     SQUARE = 2
...
>>> class Request(IntEnum):
...     POST = 1
...     GET = 2
...
>>> Shape == 1
False
>>> Shape.CIRCLE == 1
True
>>> Shape.CIRCLE == Request.POST
True
```

However, they still can't be compared to standard `Enum` enumerations:

```
>>> class Shape(IntEnum):
...     CIRCLE = 1
...     SQUARE = 2
...
>>> class Color(Enum):
...     RED = 1
...     GREEN = 2
...
>>> Shape.CIRCLE == Color.RED
False
```

`IntEnum` values behave like integers in other ways you'd expect:

```
>>> int(Shape.CIRCLE)
1
>>> ['a', 'b', 'c'][Shape.CIRCLE]
'b'
>>> [i for i in range(Shape.SQUARE)]
[0, 1]
```

### StrEnum

The second variation of `Enum` that is provided is also a subclass of
`str`.  Members of a `StrEnum` can be compared to strings;
by extension, string enumerations of different types can also be compared
to each other.

> *Added in version 3.11.*

### IntFlag

The next variation of `Enum` provided, `IntFlag`, is also based
on `int`.  The difference being `IntFlag` members can be combined
using the bitwise operators (&, |, ^, ~) and the result is still an
`IntFlag` member, if possible.  Like `IntEnum`, `IntFlag`
members are also integers and can be used wherever an `int` is used.

> **Note:** Any operation on an `IntFlag` member besides the bit-wise operations will
> lose the `IntFlag` membership.
>
> Bit-wise operations that result in invalid `IntFlag` values will lose the
> `IntFlag` membership.  See `FlagBoundary` for
> details.

> *Added in version 3.6.*

> *Changed in version 3.11.*

Sample `IntFlag` class:

```
>>> from enum import IntFlag
>>> class Perm(IntFlag):
...     R = 4
...     W = 2
...     X = 1
...
>>> Perm.R | Perm.W
<Perm.R|W: 6>
>>> Perm.R + Perm.W
6
>>> RW = Perm.R | Perm.W
>>> Perm.R in RW
True
```

It is also possible to name the combinations:

```
>>> class Perm(IntFlag):
...     R = 4
...     W = 2
...     X = 1
...     RWX = 7
...
>>> Perm.RWX
<Perm.RWX: 7>
>>> ~Perm.RWX
<Perm: 0>
>>> Perm(7)
<Perm.RWX: 7>
```

> **Note:** Named combinations are considered aliases.  Aliases do not show up during
> iteration, but can be returned from by-value lookups.

> *Changed in version 3.11.*

Another important difference between `IntFlag` and `Enum` is that
if no flags are set (the value is 0), its boolean evaluation is `False`:

```
>>> Perm.R & Perm.X
<Perm: 0>
>>> bool(Perm.R & Perm.X)
False
```

Because `IntFlag` members are also subclasses of `int` they can
be combined with them (but may lose `IntFlag` membership:

```
>>> Perm.X | 4
<Perm.R|X: 5>

>>> Perm.X + 8
9
```

> **Note:** The negation operator, `~`, always returns an `IntFlag` member with a
> positive value:
>
>
> ```
> >>> (~Perm.X).value == (Perm.R|Perm.W).value == 6
> True
> ```
>

`IntFlag` members can also be iterated over:

```
>>> list(RW)
[<Perm.R: 4>, <Perm.W: 2>]
```

> *Added in version 3.11.*

### Flag

The last variation is `Flag`.  Like `IntFlag`, `Flag`
members can be combined using the bitwise operators (&, |, ^, ~).  Unlike
`IntFlag`, they cannot be combined with, nor compared against, any
other `Flag` enumeration, nor `int`.  While it is possible to
specify the values directly it is recommended to use `auto` as the
value and let `Flag` select an appropriate value.

> *Added in version 3.6.*

Like `IntFlag`, if a combination of `Flag` members results in no
flags being set, the boolean evaluation is `False`:

```
>>> from enum import Flag, auto
>>> class Color(Flag):
...     RED = auto()
...     BLUE = auto()
...     GREEN = auto()
...
>>> Color.RED & Color.GREEN
<Color: 0>
>>> bool(Color.RED & Color.GREEN)
False
```

Individual flags should have values that are powers of two (1, 2, 4, 8, ...),
while combinations of flags will not:

```
>>> class Color(Flag):
...     RED = auto()
...     BLUE = auto()
...     GREEN = auto()
...     WHITE = RED | BLUE | GREEN
...
>>> Color.WHITE
<Color.WHITE: 7>
```

Giving a name to the "no flags set" condition does not change its boolean
value:

```
>>> class Color(Flag):
...     BLACK = 0
...     RED = auto()
...     BLUE = auto()
...     GREEN = auto()
...
>>> Color.BLACK
<Color.BLACK: 0>
>>> bool(Color.BLACK)
False
```

`Flag` members can also be iterated over:

```
>>> purple = Color.RED | Color.BLUE
>>> list(purple)
[<Color.RED: 1>, <Color.BLUE: 2>]
```

> *Added in version 3.11.*

> **Note:** For the majority of new code, `Enum` and `Flag` are strongly
> recommended, since `IntEnum` and `IntFlag` break some
> semantic promises of an enumeration (by being comparable to integers, and
> thus by transitivity to other unrelated enumerations).  `IntEnum`
> and `IntFlag` should be used only in cases where `Enum` and
> `Flag` will not do; for example, when integer constants are replaced
> with enumerations, or for interoperability with other systems.

### Others

While `IntEnum` is part of the `enum` module, it would be very
simple to implement independently:

```
class IntEnum(int, ReprEnum):   # or Enum instead of ReprEnum
    pass
```

This demonstrates how similar derived enumerations can be defined; for example
a `FloatEnum` that mixes in `float` instead of `int`.

Some rules:

1. When subclassing `Enum`, mix-in types must appear before the
`Enum` class itself in the sequence of bases, as in the `IntEnum`
example above.
1. Mix-in types must be subclassable. For example, `bool` and
`range` are not subclassable and will throw an error during Enum
creation if used as the mix-in type.
1. While `Enum` can have members of any type, once you mix in an
additional type, all the members must have values of that type, e.g.
`int` above.  This restriction does not apply to mix-ins which only
add methods and don't specify another type.
1. When another data type is mixed in, the `value` attribute is *not the
same* as the enum member itself, although it is equivalent and will compare
equal.
1. A `data type` is a mixin that defines `__new__()`, or a
`dataclass`
1. %-style formatting:  `%s` and `%r` call the `Enum` class's
`__str__() and repr__()` respectively; other codes (such as
`%i` or `%h` for IntEnum) treat the enum member as its mixed-in type.
1. Formatted string literals, `str.format()`,
and `format() will use the enum's str__()` method.

> **Note:** Because `IntEnum`, `IntFlag`, and `StrEnum` are
> designed to be drop-in replacements for existing constants, their
> `__str__()` method has been reset to their data types'
> `__str__()` method.

## When to use `__new__() vs. init__()`

`__new__()` must be used whenever you want to customize the actual value of
the `Enum` member.  Any other modifications may go in either
`__new__() or init__(), with init__()` being preferred.

For example, if you want to pass <example-value> items to the constructor, but only
want one of them to be the value:

```
>>> class Coordinate(bytes, Enum):
...     """
...     Coordinate with binary codes that can be indexed by the int code.
...     """
...     def __new__(cls, value, label, unit):
...         obj = bytes.__new__(cls, [value])
...         obj._value_ = value
...         obj.label = label
...         obj.unit = unit
...         return obj
...     PX = (0, 'P.X', 'km')
...     PY = (1, 'P.Y', 'km')
...     VX = (2, 'V.X', 'km/s')
...     VY = (3, 'V.Y', 'km/s')
...

>>> print(Coordinate['PY'])
Coordinate.PY

>>> print(Coordinate(3))
Coordinate.VY
```

> **Warning:** *Do not* call `super().__new__()`, as the lookup-only `__new__` is the one
> that is found; instead, use the data type directly.
