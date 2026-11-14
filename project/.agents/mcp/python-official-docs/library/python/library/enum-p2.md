---
title: "enum --- Support for enumerations (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/enum.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# enum --- Support for enumerations (part 2 of 3)

## Data types

### class `EnumType`

*EnumType* is the metaclass for *enum* enumerations.  It is possible
to subclass *EnumType* -- see Subclassing EnumType
for details.

`EnumType` is responsible for setting the correct `__repr__()`,
`__str__(), format__(), and reduce__()` methods on the
final *enum*, as well as creating the enum members, properly handling
duplicates, providing iteration over the enum class, etc.

> *Added in version 3.11.*
> Before 3.11 `EnumType` was called `EnumMeta`, which is still available as an alias.

### `EnumType.__call__(cls, value, names=None, *, module=None, qualname=None, type=None, start=1, boundary=None)`

This method is called in two different ways:

- to look up an existing member:

- **cls:** The enum class being called.
- **value:** The value to lookup.

- to use the `cls` enum to create a new enum (only if the existing enum
does not have any members):

- **cls:** The enum class being called.
- **value:** The name of the new Enum to create.
- **names:** The names/values of the members for the new Enum.
- **module:** The name of the module the new Enum is created in.
- **qualname:** The actual location in the module where this Enum can be found.
- **type:** A mix-in type for the new Enum.
- **start:** The first integer value for the Enum (used by `auto`).
- **boundary:** How to handle out-of-range values from bit operations (`Flag` only).

### `EnumType.__contains__(cls, member)`

Returns `True` if member belongs to the `cls`:

```
>>> some_var = Color.RED
>>> some_var in Color
True
>>> Color.RED.value in Color
True
```

> *Changed in version 3.12.*
> Before Python 3.12, a `TypeError` is raised if a
> non-Enum-member is used in a containment check.

### `EnumType.__dir__(cls)`

Returns `['__class__', '__doc__', '__members__', '__module__']` and the
names of the members in *cls*:

```
>>> dir(Color)
['BLUE', 'GREEN', 'RED', '__class__', '__contains__', '__doc__', '__getitem__', '__init_subclass__', '__iter__', '__len__', '__members__', '__module__', '__name__', '__qualname__']
```

### `EnumType.__getitem__(cls, name)`

Returns the Enum member in *cls* matching *name*, or raises a `KeyError`:

```
>>> Color['BLUE']
<Color.BLUE: 3>
```

### `EnumType.__iter__(cls)`

Returns each member in *cls* in definition order:

```
>>> list(Color)
[<Color.RED: 1>, <Color.GREEN: 2>, <Color.BLUE: 3>]
```

### `EnumType.__len__(cls)`

Returns the number of members in *cls*:

```
>>> len(Color)
3
```

### `EnumType.__members__`

Returns a mapping of every enum name to its member, including aliases

### `EnumType.__reversed__(cls)`

Returns each member in *cls* in reverse definition order:

```
>>> list(reversed(Color))
[<Color.BLUE: 3>, <Color.GREEN: 2>, <Color.RED: 1>]
```

### class `Enum`

*Enum* is the base class for all *enum* enumerations.

### `Enum.name`

The name used to define the `Enum` member:

```
>>> Color.BLUE.name
'BLUE'
```

### `Enum.value`

The value given to the `Enum` member:

```
>>> Color.RED.value
1
```

Value of the member, can be set in `__new__()`.

> **Note:** Enum member values
>
> Member values can be anything: `int`, `str`, etc.  If
> the exact value is unimportant you may use `auto` instances and an
> appropriate value will be chosen for you.  See `auto` for the
> details.
>
> While mutable/unhashable values, such as `dict`, `list` or
> a mutable `dataclass`, can be used, they will have a
> quadratic performance impact during creation relative to the
> total number of mutable/unhashable values in the enum.

### `Enum._name_`

Name of the member.

### `Enum._value_`

Value of the member, can be set in `__new__()`.

### `Enum._order_`

No longer used, kept for backward compatibility.
(class attribute, removed during class creation).

The `_order_` attribute can be provided to help keep Python 2 / Python 3 code in sync.
It will be checked against the actual order of the enumeration and raise an error if the two do not match:

```
>>> class Color(Enum):
...     _order_ = 'RED GREEN BLUE'
...     RED = 1
...     BLUE = 3
...     GREEN = 2
...
Traceback (most recent call last):
...
TypeError: member order does not match _order_:
   ['RED', 'BLUE', 'GREEN']
   ['RED', 'GREEN', 'BLUE']
```

> **Note:** In Python 2 code the `_order_` attribute is necessary as definition
> order is lost before it can be recorded.

> *Added in version 3.6.*

### `Enum._ignore_`

`_ignore_` is only used during creation and is removed from the
enumeration once creation is complete.

`_ignore_` is a list of names that will not become members, and whose
names will also be removed from the completed enumeration.  See
TimePeriod for an example.

> *Added in version 3.7.*

### `Enum.__dir__(self)`

Returns `['__class__', '__doc__', '__module__', 'name', 'value']` and
any public methods defined on *self.__class__*:

```
>>> from enum import Enum
>>> import datetime as dt
>>> class Weekday(Enum):
...     MONDAY = 1
...     TUESDAY = 2
...     WEDNESDAY = 3
...     THURSDAY = 4
...     FRIDAY = 5
...     SATURDAY = 6
...     SUNDAY = 7
...     @classmethod
...     def today(cls):
...         print(f'today is {cls(dt.date.today().isoweekday()).name}')
...
>>> dir(Weekday.SATURDAY)
['__class__', '__doc__', '__eq__', '__hash__', '__module__', 'name', 'today', 'value']
```

### `Enum._generate_next_value_(name, start, count, last_values)`

- **name:** The name of the member being defined (e.g. 'RED').
- **start:** The start value for the Enum; the default is 1.
- **count:** The number of members currently defined, not including this one.
- **last_values:** A list of the previous values.

A *staticmethod* that is used to determine the next value returned by
`auto`.

> **Note:** For standard `Enum` classes the next value chosen is the highest
> value seen incremented by one.
>
> For `Flag` classes the next value chosen will be the next highest
> power-of-two.

This method may be overridden, e.g.:

```
>>> from enum import auto, Enum
>>> class PowersOfThree(Enum):
...     @staticmethod
...     def _generate_next_value_(name, start, count, last_values):
...         return 3 ** (count + 1)
...     FIRST = auto()
...     SECOND = auto()
...
>>> PowersOfThree.SECOND.value
9
```

> *Added in version 3.6.*

> *Changed in version 3.13.*
> Prior versions would use the last seen value instead of the highest value.

### `Enum.__init__(self, *args, **kwds)`

By default, does nothing.  If multiple values are given in the member
assignment, those values become separate arguments to `__init__`; e.g.

```python
>>> from enum import Enum
>>> class Weekday(Enum):
...     MONDAY = 1, 'Mon'
```

`Weekday.__init__()` would be called as `Weekday.__init__(self, 1, 'Mon')`

### `Enum.__init_subclass__(cls, **kwds)`

A *classmethod* that is used to further configure subsequent subclasses.
By default, does nothing.

### `Enum._missing_(cls, value)`

A *classmethod* for looking up values not found in *cls*.  By default it
does nothing, but can be overridden to implement custom search behavior:

```
>>> from enum import auto, StrEnum
>>> class Build(StrEnum):
...     DEBUG = auto()
...     OPTIMIZED = auto()
...     @classmethod
...     def _missing_(cls, value):
...         value = value.lower()
...         for member in cls:
...             if member.value == value:
...                 return member
...         return None
...
>>> Build.DEBUG.value
'debug'
>>> Build('deBUG')
<Build.DEBUG: 'debug'>
```

> *Added in version 3.6.*

### `Enum.__new__(cls, *args, **kwds)`

By default, doesn't exist.  If specified, either in the enum class
definition or in a mixin class (such as `int`), all values given
in the member assignment will be passed; e.g.

```python
>>> from enum import Enum
>>> class MyIntEnum(int, Enum):
...     TWENTYSIX = '1a', 16
```

results in the call `int('1a', 16)` and a value of `26` for the member.

> **Note:** When writing a custom `__new__`, do not use `super().__new__` --
> call the appropriate `__new__` instead.

### `Enum.__repr__(self)`

Returns the string used for *repr()* calls.  By default, returns the
*Enum* name, member name, and value, but can be overridden:

```
>>> from enum import auto, Enum
>>> class OtherStyle(Enum):
...     ALTERNATE = auto()
...     OTHER = auto()
...     SOMETHING_ELSE = auto()
...     def __repr__(self):
...         cls_name = self.__class__.__name__
...         return f'{cls_name}.{self.name}'
...
>>> OtherStyle.ALTERNATE, str(OtherStyle.ALTERNATE), f"{OtherStyle.ALTERNATE}"
(OtherStyle.ALTERNATE, 'OtherStyle.ALTERNATE', 'OtherStyle.ALTERNATE')
```

### `Enum.__str__(self)`

Returns the string used for *str()* calls.  By default, returns the
*Enum* name and member name, but can be overridden:

```
>>> from enum import auto, Enum
>>> class OtherStyle(Enum):
...     ALTERNATE = auto()
...     OTHER = auto()
...     SOMETHING_ELSE = auto()
...     def __str__(self):
...         return f'{self.name}'
...
>>> OtherStyle.ALTERNATE, str(OtherStyle.ALTERNATE), f"{OtherStyle.ALTERNATE}"
(<OtherStyle.ALTERNATE: 1>, 'ALTERNATE', 'ALTERNATE')
```

### `Enum.__format__(self)`

Returns the string used for *format()* and *f-string* calls.  By default,
returns `__str__()` return value, but can be overridden:

```
>>> from enum import auto, Enum
>>> class OtherStyle(Enum):
...     ALTERNATE = auto()
...     OTHER = auto()
...     SOMETHING_ELSE = auto()
...     def __format__(self, spec):
...         return f'{self.name}'
...
>>> OtherStyle.ALTERNATE, str(OtherStyle.ALTERNATE), f"{OtherStyle.ALTERNATE}"
(<OtherStyle.ALTERNATE: 1>, 'OtherStyle.ALTERNATE', 'ALTERNATE')
```

> **Note:** Using `auto` with `Enum` results in integers of increasing value,
> starting with `1`.

> *Changed in version 3.12.*

### `Enum._add_alias_`

Adds a new name as an alias to an existing member:

```
>>> Color.RED._add_alias_("ERROR")
>>> Color.ERROR
<Color.RED: 1>
```

Raises a `NameError` if the name is already assigned to a different member.

> *Added in version 3.13.*

### `Enum._add_value_alias_`

Adds a new value as an alias to an existing member:

```
>>> Color.RED._add_value_alias_(42)
>>> Color(42)
<Color.RED: 1>
```

| Raises a `ValueError` if the value is already linked with a different member.
| See multi-value-enum for an example.

> *Added in version 3.13.*

### class `IntEnum`

*IntEnum* is the same as `Enum`, but its members are also integers and can be
used anywhere that an integer can be used.  If any integer operation is performed
with an *IntEnum* member, the resulting value loses its enumeration status.

```python
>>> from enum import IntEnum
>>> class Number(IntEnum):
...     ONE = 1
...     TWO = 2
...     THREE = 3
...
>>> Number.THREE
<Number.THREE: 3>
>>> Number.ONE + Number.TWO
3
>>> Number.THREE + 5
8
>>> Number.THREE == 3
True
```

> **Note:** Using `auto` with `IntEnum` results in integers of increasing
> value, starting with `1`.

> *Changed in version 3.11.*
> better support the *replacement of existing constants* use-case.
> `__format__()` was already `int.__format__()` for that same reason.

### class `StrEnum`

*StrEnum* is the same as `Enum`, but its members are also strings and
can be used in most of the same places that a string can be used. The result
of any string operation performed on or with a *StrEnum* member is not part
of the enumeration.

```python
>>> from enum import StrEnum, auto
>>> class Color(StrEnum):
...     RED = 'r'
...     GREEN = 'g'
...     BLUE = 'b'
...     UNKNOWN = auto()
...
>>> Color.RED
<Color.RED: 'r'>
>>> Color.UNKNOWN
<Color.UNKNOWN: 'unknown'>
>>> str(Color.UNKNOWN)
'unknown'
```

> **Note:** There are places in the stdlib that check for an exact `str`
> instead of a `str` subclass (i.e. `type(unknown) == str`
> instead of `isinstance(unknown, str)`), and in those locations you
> will need to use `str(MyStrEnum.MY_MEMBER)`.

> **Note:** Using `auto` with `StrEnum` results in the lower-cased member
> name as the value.

> **Note:** `__str__()` is `str.__str__()` to better support the
> *replacement of existing constants* use-case.  `__format__()` is likewise
> `str.__format__()` for that same reason.

> *Added in version 3.11.*

### class `Flag`

`Flag` is the same as `Enum`, but its members support the bitwise
operators `&` (*AND*), `|` (*OR*), `^` (*XOR*), and `~` (*INVERT*);
the results of those operations are (aliases of) members of the enumeration.

### `__contains__(self, value)`

Returns *True* if value is in self:

```
>>> from enum import Flag, auto
>>> class Color(Flag):
...     RED = auto()
...     GREEN = auto()
...     BLUE = auto()
...
>>> purple = Color.RED | Color.BLUE
>>> white = Color.RED | Color.GREEN | Color.BLUE
>>> Color.GREEN in purple
False
>>> Color.GREEN in white
True
>>> purple in white
True
>>> white in purple
False
```

### `__iter__(self)`

Returns all contained non-alias members:

```
>>> list(Color.RED)
[<Color.RED: 1>]
>>> list(purple)
[<Color.RED: 1>, <Color.BLUE: 4>]
```

> *Added in version 3.11.*

### `__len__(self)`

Returns number of members in flag:

```
>>> len(Color.GREEN)
1
>>> len(white)
3
```

> *Added in version 3.11.*

### `__bool__(self)`

Returns *True* if any members in flag, *False* otherwise:

```
>>> bool(Color.GREEN)
True
>>> bool(white)
True
>>> black = Color(0)
>>> bool(black)
False
```

### `__or__(self, other)`

Returns current flag binary or'ed with other:

```
>>> Color.RED | Color.GREEN
<Color.RED|GREEN: 3>
```

### `__and__(self, other)`

Returns current flag binary and'ed with other:

```
>>> purple & white
<Color.RED|BLUE: 5>
>>> purple & Color.GREEN
<Color: 0>
```

### `__xor__(self, other)`

Returns current flag binary xor'ed with other:

```
>>> purple ^ white
<Color.GREEN: 2>
>>> purple ^ Color.GREEN
<Color.RED|GREEN|BLUE: 7>
```

### `__invert__(self)`

Returns all the flags in *type(self)* that are not in *self*:

```
>>> ~white
<Color: 0>
>>> ~purple
<Color.GREEN: 2>
>>> ~Color.RED
<Color.GREEN|BLUE: 6>
```

### `_numeric_repr_`

Function used to format any remaining unnamed numeric values.  Default is
the value's repr; common choices are `hex()` and `oct()`.

> **Note:** Using `auto` with `Flag` results in integers that are powers
> of two, starting with `1`.

> *Changed in version 3.11.*
> is now:
>
> ```python
> >>> Color(0) # doctest: +SKIP
> <Color: 0>
> ```
>
