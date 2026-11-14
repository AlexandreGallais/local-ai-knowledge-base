---
title: "Expressions (part 6 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/expressions.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Expressions (part 6 of 8)

## Unary arithmetic and bitwise operations

All unary arithmetic and bitwise operations have the same priority:

```text
python-grammar
u_expr: `power` | "-" `u_expr` | "+" `u_expr` | "~" `u_expr`
```

The unary `-` (minus) operator yields the negation of its numeric argument; the
operation can be overridden with the `__neg__()` special method.

The unary `+` (plus) operator yields its numeric argument unchanged; the
operation can be overridden with the `__pos__()` special method.

The unary `~` (invert) operator yields the bitwise inversion of its integer
argument.  The bitwise inversion of `x` is defined as `-(x+1)`.  It only
applies to integral numbers or to custom objects that override the
`__invert__()` special method.

In all three cases, if the argument does not have the proper type, a
`TypeError` exception is raised.

## Binary arithmetic operations

The binary arithmetic operations have the conventional priority levels.  Note
that some of these operations also apply to certain non-numeric types.  Apart
from the power operator, there are only two levels, one for multiplicative
operators and one for additive operators:

```text
python-grammar
m_expr: `u_expr` | `m_expr` "*" `u_expr` | `m_expr` "@" `m_expr` |
      : `m_expr` "//" `u_expr` | `m_expr` "/" `u_expr` |
      : `m_expr` "%" `u_expr`
a_expr: `m_expr` | `a_expr` "+" `m_expr` | `a_expr` "-" `m_expr`
```

The `*` (multiplication) operator yields the product of its arguments.  The
arguments must either both be numbers, or one argument must be an integer and
the other must be a sequence. In the former case, the numbers are
converted to a common real type and then
multiplied together.  In the latter case, sequence repetition is performed;
a negative repetition factor yields an empty sequence.

This operation can be customized using the special `__mul__()` and
`__rmul__()` methods.

> *Changed in version 3.14.*
> If only one operand is a complex number, the other operand is converted
> to a floating-point number.

The `@` (at) operator is intended to be used for matrix multiplication.  No
builtin Python types implement this operator.

This operation can be customized using the special `__matmul__()` and
`__rmatmul__()` methods.

> *Added in version 3.5.*

The `/` (division) and `//` (floor division) operators yield the quotient of
their arguments.  The numeric arguments are first
converted to a common type.
Division of integers yields a float, while floor division of integers results in an
integer; the result is that of mathematical division with the 'floor' function
applied to the result.  Division by zero raises the `ZeroDivisionError`
exception.

The division operation can be customized using the special `__truediv__()`
and `__rtruediv__()` methods.
The floor division operation can be customized using the special
`__floordiv__() and rfloordiv__()` methods.

The `%` (modulo) operator yields the remainder from the division of the first
argument by the second.  The numeric arguments are first
converted to a common type.
A zero right argument raises the `ZeroDivisionError` exception.  The
arguments may be floating-point numbers, e.g., `3.14%0.7` equals `0.34`
(since `3.14` equals `4*0.7 + 0.34`.)  The modulo operator always yields a
result with the same sign as its second operand (or zero); the absolute value of
the result is strictly smaller than the absolute value of the second operand
.

The floor division and modulo operators are connected by the following
identity: `x == (x//y)*y + (x%y)`.  Floor division and modulo are also
connected with the built-in function `divmod()`: ``divmod(x, y) == (x//y,
x%y)``..

In addition to performing the modulo operation on numbers, the `%` operator is
also overloaded by string objects to perform old-style string formatting (also
known as interpolation).  The syntax for string formatting is described in the
Python Library Reference, section old-string-formatting.

The *modulo* operation can be customized using the special `__mod__()`
and `__rmod__()` methods.

The floor division operator, the modulo operator, and the `divmod()`
function are not defined for complex numbers.  Instead, convert to a
floating-point number using the `abs()` function if appropriate.

The `+` (addition) operator yields the sum of its arguments.  The arguments
must either both be numbers or both be sequences of the same type.  In the
former case, the numbers are
converted to a common real type and then
added together.
In the latter case, the sequences are concatenated.

This operation can be customized using the special `__add__()` and
`__radd__()` methods.

> *Changed in version 3.14.*
> If only one operand is a complex number, the other operand is converted
> to a floating-point number.

The `-` (subtraction) operator yields the difference of its arguments.
The numeric arguments are first
converted to a common real type.

This operation can be customized using the special `__sub__()` and
`__rsub__()` methods.

> *Changed in version 3.14.*
> If only one operand is a complex number, the other operand is converted
> to a floating-point number.

## Shifting operations

The shifting operations have lower priority than the arithmetic operations:

```text
python-grammar
shift_expr: `a_expr` | `shift_expr` ("<<" | ">>") `a_expr`
```

These operators accept integers as arguments.  They shift the first argument to
the left or right by the number of bits given by the second argument.

The left shift operation can be customized using the special `__lshift__()`
and `__rlshift__()` methods.
The right shift operation can be customized using the special `__rshift__()`
and `__rrshift__()` methods.

A right shift by *n* bits is defined as floor division by `pow(2,n)`.  A left
shift by *n* bits is defined as multiplication with `pow(2,n)`.

## Binary bitwise operations

Each of the three bitwise operations has a different priority level:

```text
python-grammar
and_expr: `shift_expr` | `and_expr` "&" `shift_expr`
xor_expr: `and_expr` | `xor_expr` "^" `and_expr`
or_expr: `xor_expr` | `or_expr` "|" `xor_expr`
```

The `&` operator yields the bitwise AND of its arguments, which must be
integers or one of them must be a custom object overriding `__and__()` or
`__rand__()` special methods.

The `^` operator yields the bitwise XOR (exclusive OR) of its arguments, which
must be integers or one of them must be a custom object overriding `__xor__()` or
`__rxor__()` special methods.

The `|` operator yields the bitwise (inclusive) OR of its arguments, which
must be integers or one of them must be a custom object overriding `__or__()` or
`__ror__()` special methods.
