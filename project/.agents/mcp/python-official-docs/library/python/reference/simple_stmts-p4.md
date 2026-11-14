---
title: "Simple statements (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/simple_stmts.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Simple statements (part 4 of 4)

## The `type` statement

```text
python-grammar
type_stmt: 'type' `identifier` [`type_params`] "=" `expression`
```

The `type` statement declares a type alias, which is an instance
of `typing.TypeAliasType`.

For example, the following statement creates a type alias:

```
type Point = tuple[float, float]
```

This code is roughly equivalent to:

```
annotation-def VALUE_OF_Point():
    return tuple[float, float]
Point = typing.TypeAliasType("Point", VALUE_OF_Point())
```

`annotation-def` indicates an annotation scope, which behaves
mostly like a function, but with several small differences.

The value of the
type alias is evaluated in the annotation scope. It is not evaluated when the
type alias is created, but only when the value is accessed through the type alias's
`__value__` attribute (see lazy-evaluation).
This allows the type alias to refer to names that are not yet defined.

Type aliases may be made generic by adding a type parameter list
after the name. See generic-type-aliases for more.

`type` is a soft keyword.

> *Added in version 3.12.*

> **See also:** PEP 695 - Type Parameter Syntax
> Introduced the `type` statement and syntax for
> generic classes and functions.
