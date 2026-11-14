---
title: "enum --- Support for enumerations (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/enum.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `enum` --- Support for enumerations

Module `enum`.

> *Added in version 3.4.*

**Source code:** Lib/enum.py

Important

This page contains the API reference information. For tutorial
information and discussion of more advanced topics, see

- Basic <example-value>
- Advanced Tutorial
- Enum Cookbook

An enumeration:

- is a set of symbolic names (members) bound to unique values
- can be iterated over to return its canonical (i.e. non-alias) members in
definition order
- uses *call* syntax to return members by value
- uses *index* syntax to return members by name

Enumerations are created either by using `class` syntax, or by
using function-call syntax:

```
>>> from enum import Enum

>>> # class syntax
>>> class Color(Enum):
...     RED = 1
...     GREEN = 2
...     BLUE = 3

>>> # functional syntax
>>> Color = Enum('Color', [('RED', 1), ('GREEN', 2), ('BLUE', 3)])
```

Even though we can use `class` syntax to create Enums, Enums
are not normal Python classes.  See
How are Enums different? for more details.

> **Note:** Nomenclature
>
> - The class `Color` is an *enumeration* (or *enum*)
> - The attributes `Color.RED`, `Color.GREEN`, etc., are
> *enumeration members* (or *members*) and are functionally constants.
> - The enum members have *names* and *values* (the name of
> `Color.RED` is `RED`, the value of `Color.BLUE` is
> `3`, etc.)

## Module contents

`EnumType`

The `type` for Enum and its subclasses.

`Enum`

Base class for creating enumerated constants.

`IntEnum`

Base class for creating enumerated constants that are also
subclasses of `int`. (Notes)

`StrEnum`

Base class for creating enumerated constants that are also
subclasses of `str`. (Notes)

`Flag`

Base class for creating enumerated constants that can be combined using
the bitwise operations without losing their `Flag` membership.

`IntFlag`

Base class for creating enumerated constants that can be combined using
the bitwise operators without losing their `IntFlag` membership.
`IntFlag` members are also subclasses of `int`. (Notes)

`ReprEnum`

Used by `IntEnum`, `StrEnum`, and `IntFlag`
to keep the `str()` of the mixed-in type.

`EnumCheck`

An enumeration with the values `CONTINUOUS`, `NAMED_FLAGS`, and
`UNIQUE`, for use with `verify()` to ensure various constraints
are met by a given enumeration.

`FlagBoundary`

An enumeration with the values `STRICT`, `CONFORM`, `EJECT`, and
`KEEP` which allows for more fine-grained control over how invalid values
are dealt with in an enumeration.

`EnumDict`

A subclass of `dict` for use when subclassing `EnumType`.

`auto`

Instances are replaced with an appropriate value for Enum members.
`StrEnum` defaults to the lower-cased version of the member name,
while other Enums default to 1 and increase from there.

property

Allows `Enum` members to have attributes without conflicting with
member names.  The `value` and `name` attributes are implemented this
way.

unique

Enum class decorator that ensures only one name is bound to any one value.

verify

Enum class decorator that checks user-selectable constraints on an
enumeration.

member

Make `obj` a member.  Can be used as a decorator.

nonmember

Do not make `obj` a member.  Can be used as a decorator.

global_enum

Modify the `str()` and `repr()` of an enum
to show its members as belonging to the module instead of its class,
and export the enum members to the global namespace.

`show_flag_values()`

Return a list of all power-of-two integers contained in a flag.

`enum.bin()`

Like built-in `bin()`, except negative values are represented in
two's complement, and the leading bit always indicates sign
(`0` implies positive, `1` implies negative).

> *Added in version 3.6.*

> *Added in version 3.11.*

> *Added in version 3.13.*
