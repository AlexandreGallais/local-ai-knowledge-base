---
title: "decimal --- Decimal fixed-point and floating-point arithmetic (part 1 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/decimal.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `decimal` --- Decimal fixed-point and floating-point arithmetic

Module `decimal`.

**Source code:** Lib/decimal.py

The `decimal` module provides support for fast correctly rounded
decimal floating-point arithmetic. It offers several advantages over the
`float` datatype:

- Decimal "is based on a `floating-point model
<https://speleotrove.com/decimal/damodel.html#refnumber>`__ which was designed
with people in mind, and necessarily has a paramount guiding principle --
computers must provide an arithmetic that works in the same way as the
arithmetic that people learn at school." -- excerpt from the decimal
arithmetic specification.

- Decimal numbers can be represented exactly.  In contrast, numbers like
`1.1` and `2.2` do not have exact representations in binary
floating point. End users typically would not expect `1.1 + 2.2` to display
as `3.<example-card-number>` as it does with binary floating point.

- The exactness carries over into arithmetic.  In decimal floating point, ``0.1
- 0.1 + 0.1 - 0.3`` is exactly equal to zero.  In binary floating point, the result
is `5.5511151231257827e-017`.  While near to zero, the differences
prevent reliable equality testing and differences can accumulate. For this
reason, decimal is preferred in accounting applications which have strict
equality invariants.

- The decimal module incorporates a notion of significant places so that ``1.30
- 1.20` is `2.50``.  The trailing zero is kept to indicate significance.
This is the customary presentation for monetary applications. For
multiplication, the "schoolbook" approach uses all the figures in the
multiplicands.  For instance, `1.3 * 1.2` gives `1.56` while ``1.30 *
1.20` gives `1.5600``.

- Unlike hardware based binary floating point, the decimal module has a user
alterable precision (defaulting to 28 places) which can be as large as needed for
a given problem:

```python
>>> from decimal import *
>>> getcontext().prec = 6
>>> Decimal(1) / Decimal(7)
Decimal('0.142857')
>>> getcontext().prec = 28
>>> Decimal(1) / Decimal(7)
Decimal('0.1428571428571428571428571429')
```

- Both binary and decimal floating point are implemented in terms of published
standards.  While the built-in float type exposes only a modest portion of its
capabilities, the decimal module exposes all required parts of the standard.
When needed, the programmer has full control over rounding and signal handling.
This includes an option to enforce exact arithmetic by using exceptions
to block any inexact operations.

- The decimal module was designed to support "without prejudice, both exact
unrounded decimal arithmetic (sometimes called fixed-point arithmetic)
and rounded floating-point arithmetic."  -- excerpt from the decimal
arithmetic specification.

The module design is centered around three concepts:  the decimal number, the
context for arithmetic, and signals.

A decimal number is immutable.  It has a sign, coefficient digits, and an
exponent.  To preserve significance, the coefficient digits do not truncate
trailing zeros.  Decimals also include special values such as
`Infinity`, `-Infinity`, and `NaN`.  The standard also
differentiates `-0` from `+0`.

The context for arithmetic is an environment specifying precision, rounding
rules, limits on exponents, flags indicating the results of operations, and trap
enablers which determine whether signals are treated as exceptions.  Rounding
options include `ROUND_CEILING`, `ROUND_DOWN`,
`ROUND_FLOOR`, `ROUND_HALF_DOWN`, `ROUND_HALF_EVEN`,
`ROUND_HALF_UP`, `ROUND_UP`, and `ROUND_05UP`.

Signals are groups of exceptional conditions arising during the course of
computation.  Depending on the needs of the application, signals may be ignored,
considered as informational, or treated as exceptions. The signals in the
decimal module are: `Clamped`, `InvalidOperation`,
`DivisionByZero`, `Inexact`, `Rounded`, `Subnormal`,
`Overflow`, `Underflow` and `FloatOperation`.

For each signal there is a flag and a trap enabler.  When a signal is
encountered, its flag is set to one, then, if the trap enabler is
set to one, an exception is raised.  Flags are sticky, so the user needs to
reset them before monitoring a calculation.

> **See also:** - IBM's General Decimal Arithmetic Specification, `The General Decimal Arithmetic
> Specification <https://speleotrove.com/decimal/decarith.html>`_.

## Quick-start tutorial

The usual start to using decimals is importing the module, viewing the current
context with `getcontext()` and, if necessary, setting new values for
precision, rounding, or enabled traps:

```
>>> from decimal import *
>>> getcontext()
Context(prec=28, rounding=ROUND_HALF_EVEN, Emin=-999999, Emax=999999,
        capitals=1, clamp=0, flags=[], traps=[Overflow, DivisionByZero,
        InvalidOperation])

>>> getcontext().prec = 7       # Set a new precision
```

Decimal instances can be constructed from integers, strings, floats, or tuples.
Construction from an integer or a float performs an exact conversion of the
value of that integer or float.  Decimal numbers include special values such as
`NaN` which stands for "Not a number", positive and negative
`Infinity`, and `-0`:

```
>>> getcontext().prec = 28
>>> Decimal(10)
Decimal('10')
>>> Decimal('3.14')
Decimal('3.14')
>>> Decimal(3.14)
Decimal('3.140000000000000124344978758017532527446746826171875')
>>> Decimal((0, (3, 1, 4), -2))
Decimal('3.14')
>>> Decimal(str(2.0 ** 0.5))
Decimal('1.<example-card-number>')
>>> Decimal(2) ** Decimal('0.5')
Decimal('1.414213562373095048801688724')
>>> Decimal('NaN')
Decimal('NaN')
>>> Decimal('-Infinity')
Decimal('-Infinity')
```

If the `FloatOperation` signal is trapped, accidental mixing of
decimals and floats in constructors or ordering comparisons raises
an exception:

```
>>> c = getcontext()
>>> c.traps[FloatOperation] = True
>>> Decimal(3.14)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
decimal.FloatOperation: [<class 'decimal.FloatOperation'>]
>>> Decimal('3.5') < 3.7
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
decimal.FloatOperation: [<class 'decimal.FloatOperation'>]
>>> Decimal('3.5') == 3.5
True
```

> *Added in version 3.3.*

The significance of a new Decimal is determined solely by the number of digits
input.  Context precision and rounding only come into play during arithmetic
operations.

```python
newcontext

>>> getcontext().prec = 6
>>> Decimal('3.0')
Decimal('3.0')
>>> Decimal('3.1415926535')
Decimal('3.1415926535')
>>> Decimal('3.1415926535') + Decimal('2.7182818285')
Decimal('5.85987')
>>> getcontext().rounding = ROUND_UP
>>> Decimal('3.1415926535') + Decimal('2.7182818285')
Decimal('5.85988')
```

If the internal limits of the C version are exceeded, constructing
a decimal raises `InvalidOperation`:

```
>>> Decimal("1e9999999999999999999")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
decimal.InvalidOperation: [<class 'decimal.InvalidOperation'>]
```

> *Changed in version 3.3.*

Decimals interact well with much of the rest of Python.  Here is a small decimal
floating-point flying circus:

```python

>>> data = list(map(Decimal, '1.34 1.87 3.45 2.35 1.00 0.03 9.25'.split()))
>>> max(data)
Decimal('9.25')
>>> min(data)
Decimal('0.03')
>>> sorted(data)
[Decimal('0.03'), Decimal('1.00'), Decimal('1.34'), Decimal('1.87'),
 Decimal('2.35'), Decimal('3.45'), Decimal('9.25')]
>>> sum(data)
Decimal('19.29')
>>> a,b,c = data[:3]
>>> str(a)
'1.34'
>>> float(a)
1.34
>>> round(a, 1)
Decimal('1.3')
>>> int(a)
1
>>> a * 5
Decimal('6.70')
>>> a * b
Decimal('2.5058')
>>> c % a
Decimal('0.77')
```

Decimals can be formatted (with `format()` built-in or f-strings) in
fixed-point or scientific notation, using the same formatting syntax (see
formatspec) as builtin `float` type:

```python

>>> format(Decimal('2.675'), "f")
'2.675'
>>> format(Decimal('2.675'), ".2f")
'2.68'
>>> f"{Decimal('2.675'):.2f}"
'2.68'
>>> format(Decimal('2.675'), ".2e")
'2.68e+0'
>>> with localcontext() as ctx:
...     ctx.rounding = ROUND_DOWN
...     print(format(Decimal('2.675'), ".2f"))
...
2.67
```

And some mathematical functions are also available to Decimal:

```python
>>> getcontext().prec = 28
>>> Decimal(2).sqrt()
Decimal('1.414213562373095048801688724')
>>> Decimal(1).exp()
Decimal('2.718281828459045235360287471')
>>> Decimal('10').ln()
Decimal('2.302585092994045684017991455')
>>> Decimal('10').log10()
Decimal('1')
```

The `quantize()` method rounds a number to a fixed exponent.  This method is
useful for monetary applications that often round results to a fixed number of
places:

```python
>>> Decimal('7.325').quantize(Decimal('.01'), rounding=ROUND_DOWN)
Decimal('7.32')
>>> Decimal('7.325').quantize(Decimal('1.'), rounding=ROUND_UP)
Decimal('8')
```

As shown above, the `getcontext()` function accesses the current context and
allows the settings to be changed.  This approach meets the needs of most
applications.

For more advanced work, it may be useful to create alternate contexts using the
`Context()` constructor.  To make an alternate active, use the `setcontext()`
function.

In accordance with the standard, the `decimal` module provides two ready to
use standard contexts, `BasicContext` and `ExtendedContext`. The
former is especially useful for debugging because many of the traps are
enabled:

```python
newcontext

>>> myothercontext = Context(prec=60, rounding=ROUND_HALF_DOWN)
>>> setcontext(myothercontext)
>>> Decimal(1) / Decimal(7)
Decimal('0.142857142857142857142857142857142857142857142857142857142857')

>>> ExtendedContext
Context(prec=9, rounding=ROUND_HALF_EVEN, Emin=-999999, Emax=999999,
        capitals=1, clamp=0, flags=[], traps=[])
>>> setcontext(ExtendedContext)
>>> Decimal(1) / Decimal(7)
Decimal('0.142857143')
>>> Decimal(42) / Decimal(0)
Decimal('Infinity')

>>> setcontext(BasicContext)
>>> Decimal(42) / Decimal(0)
Traceback (most recent call last):
  File "<pyshell#143>", line 1, in -toplevel-
    Decimal(42) / Decimal(0)
DivisionByZero: x / 0
```

Contexts also have signal flags for monitoring exceptional conditions
encountered during computations.  The flags remain set until explicitly cleared,
so it is best to clear the flags before each set of monitored computations by
using the `clear_flags()` method.:

```
>>> setcontext(ExtendedContext)
>>> getcontext().clear_flags()
>>> Decimal(355) / Decimal(113)
Decimal('3.14159292')
>>> getcontext()
Context(prec=9, rounding=ROUND_HALF_EVEN, Emin=-999999, Emax=999999,
        capitals=1, clamp=0, flags=[Inexact, Rounded], traps=[])
```

The *flags* entry shows that the rational approximation to pi was
rounded (digits beyond the context precision were thrown away) and that the
result is inexact (some of the discarded digits were non-zero).

Individual traps are set using the dictionary in the `traps`
attribute of a context:

```python
newcontext

>>> setcontext(ExtendedContext)
>>> Decimal(1) / Decimal(0)
Decimal('Infinity')
>>> getcontext().traps[DivisionByZero] = 1
>>> Decimal(1) / Decimal(0)
Traceback (most recent call last):
  File "<pyshell#112>", line 1, in -toplevel-
    Decimal(1) / Decimal(0)
DivisionByZero: x / 0
```

Most programs adjust the current context only once, at the beginning of the
program.  And, in many applications, data is converted to `Decimal` with
a single cast inside a loop.  With context set and decimals created, the bulk of
the program manipulates the data no differently than with other Python numeric
types.
