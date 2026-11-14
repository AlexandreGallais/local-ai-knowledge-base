---
title: "decimal --- Decimal fixed-point and floating-point arithmetic (part 5 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/decimal.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# decimal --- Decimal fixed-point and floating-point arithmetic (part 5 of 6)

### `to_sci_string(x, /)`

Converts a number to a string using scientific notation.

## Constants

### `SPEC_VERSION`

The highest version of the General Decimal Arithmetic
Specification that this implementation complies with.
See https://speleotrove.com/decimal/decarith.html for the specification.

> *Added in version 3.15.*

The following constants are only relevant for the C module. They
are also included in the pure Python version for compatibility.

```text
+---------------------------------+---------------------+-------------------------------+
|                                 |       32-bit        |            64-bit             |
+=================================+=====================+===============================+
| .. data:: MAX_PREC              |    ``425000000``    |    ``999999999999999999``     |
+---------------------------------+---------------------+-------------------------------+
| .. data:: MAX_EMAX              |    ``425000000``    |    ``999999999999999999``     |
+---------------------------------+---------------------+-------------------------------+
| .. data:: MIN_EMIN              |    ``-425000000``   |    ``-999999999999999999``    |
+---------------------------------+---------------------+-------------------------------+
| .. data:: MIN_ETINY             |    ``-849999999``   |    ``-1999999999999999997``   |
+---------------------------------+---------------------+-------------------------------+
| .. data:: IEEE_CONTEXT_MAX_BITS |    ``256``          |    ``512``                    |
+---------------------------------+---------------------+-------------------------------+
```

### `HAVE_THREADS`

The value is `True`.  Deprecated, because Python now always has threads.

> *Deprecated since version 3.9.*

### `HAVE_CONTEXTVAR`

The default value is `True`. If Python is :option:`configured using
the --without-decimal-contextvar option <--without-decimal-contextvar>`,
the C version uses a thread-local rather than a coroutine-local context and the value
is `False`.  This is slightly faster in some nested context scenarios.

> *Added in version 3.8.3.*

## Rounding modes

### `ROUND_CEILING`

Round towards `Infinity`.

### `ROUND_DOWN`

Round towards zero.

### `ROUND_FLOOR`

Round towards `-Infinity`.

### `ROUND_HALF_DOWN`

Round to nearest with ties going towards zero.

### `ROUND_HALF_EVEN`

Round to nearest with ties going to nearest even integer.

### `ROUND_HALF_UP`

Round to nearest with ties going away from zero.

### `ROUND_UP`

Round away from zero.

### `ROUND_05UP`

Round away from zero if last digit after rounding towards zero would have
been 0 or 5; otherwise round towards zero.

## Signals

Signals represent conditions that arise during computation. Each corresponds to
one context flag and one context trap enabler.

The context flag is set whenever the condition is encountered. After the
computation, flags may be checked for informational purposes (for instance, to
determine whether a computation was exact). After checking the flags, be sure to
clear all flags before starting the next computation.

If the context's trap enabler is set for the signal, then the condition causes a
Python exception to be raised.  For example, if the `DivisionByZero` trap
is set, then a `DivisionByZero` exception is raised upon encountering the
condition.

### class `Clamped`

Altered an exponent to fit representation constraints.

Typically, clamping occurs when an exponent falls outside the context's
`Emin` and `Emax` limits.  If possible, the exponent is reduced to
fit by adding zeros to the coefficient.

### class `DecimalException`

Base class for other signals and a subclass of `ArithmeticError`.

### class `DivisionByZero`

Signals the division of a non-infinite number by zero.

Can occur with division, modulo division, or when raising a number to a negative
power.  If this signal is not trapped, returns `Infinity` or
`-Infinity` with the sign determined by the inputs to the calculation.

### class `Inexact`

Indicates that rounding occurred and the result is not exact.

Signals when non-zero digits were discarded during rounding. The rounded result
is returned.  The signal flag or trap is used to detect when results are
inexact.

### class `InvalidOperation`

An invalid operation was performed.

Indicates that an operation was requested that does not make sense. If not
trapped, returns `NaN`.  Possible causes include:

```
Infinity - Infinity
0 * Infinity
Infinity / Infinity
x % 0
Infinity % x
sqrt(-x) and x > 0
0 ** 0
x ** (non-integer)
x ** Infinity
```

### class `Overflow`

Numerical overflow.

Indicates the exponent is larger than `Context.Emax` after rounding has
occurred.  If not trapped, the result depends on the rounding mode, either
pulling inward to the largest representable finite number or rounding outward
to `Infinity`.  In either case, `Inexact` and `Rounded`
are also signaled.

### class `Rounded`

Rounding occurred though possibly no information was lost.

Signaled whenever rounding discards digits; even if those digits are zero
(such as rounding `5.00` to `5.0`).  If not trapped, returns
the result unchanged.  This signal is used to detect loss of significant
digits.

### class `Subnormal`

Exponent was lower than `Emin` prior to rounding.

Occurs when an operation result is subnormal (the exponent is too small). If
not trapped, returns the result unchanged.

### class `Underflow`

Numerical underflow with result rounded to zero.

Occurs when a subnormal result is pushed to zero by rounding. `Inexact`
and `Subnormal` are also signaled.

### class `FloatOperation`

Enable stricter semantics for mixing floats and Decimals.

If the signal is not trapped (default), mixing floats and Decimals is
permitted in the `Decimal` constructor,
`create_decimal()` and all comparison operators.
Both conversion and comparisons are exact. Any occurrence of a mixed
operation is silently recorded by setting `FloatOperation` in the
context flags. Explicit conversions with `from_float()`
or `create_decimal_from_float()` do not set the flag.

Otherwise (the signal is trapped), only equality comparisons and explicit
conversions are silent. All other mixed operations raise `FloatOperation`.

The following table summarizes the hierarchy of signals:

```
exceptions.ArithmeticError(exceptions.Exception)
    DecimalException
        Clamped
        DivisionByZero(DecimalException, exceptions.ZeroDivisionError)
        Inexact
            Overflow(Inexact, Rounded)
            Underflow(Inexact, Rounded, Subnormal)
        InvalidOperation
        Rounded
        Subnormal
        FloatOperation(DecimalException, exceptions.TypeError)
```

## Floating-point notes

### Mitigating round-off error with increased precision

The use of decimal floating point eliminates decimal representation error
(making it possible to represent `0.1` exactly); however, some operations
can still incur round-off error when non-zero digits exceed the fixed precision.

The effects of round-off error can be amplified by the addition or subtraction
of nearly offsetting quantities resulting in loss of significance.  Knuth
provides two instructive examples where rounded floating-point arithmetic with
insufficient precision causes the breakdown of the associative and distributive
properties of addition:

```python
newcontext

# Examples from Seminumerical Algorithms, Section 4.2.2.
>>> from decimal import Decimal, getcontext
>>> getcontext().prec = 8

>>> u, v, w = Decimal(11111113), Decimal(-11111111), Decimal('7.51111111')
>>> (u + v) + w
Decimal('9.5111111')
>>> u + (v + w)
Decimal('10')

>>> u, v, w = Decimal(20000), Decimal(-6), Decimal('6.0000003')
>>> (u*v) + (u*w)
Decimal('0.01')
>>> u * (v+w)
Decimal('0.0060000')
```

The `decimal` module makes it possible to restore the identities by
expanding the precision sufficiently to avoid loss of significance:

```python
newcontext

>>> getcontext().prec = 20
>>> u, v, w = Decimal(11111113), Decimal(-11111111), Decimal('7.51111111')
>>> (u + v) + w
Decimal('9.51111111')
>>> u + (v + w)
Decimal('9.51111111')
>>>
>>> u, v, w = Decimal(20000), Decimal(-6), Decimal('6.0000003')
>>> (u*v) + (u*w)
Decimal('0.0060000')
>>> u * (v+w)
Decimal('0.0060000')
```

### Special values

The number system for the `decimal` module provides special values
including `NaN`, `sNaN`, `-Infinity`, `Infinity`,
and two zeros, `+0` and `-0`.

Infinities can be constructed directly with:  `Decimal('Infinity')`. Also,
they can arise from dividing by zero when the `DivisionByZero` signal is
not trapped.  Likewise, when the `Overflow` signal is not trapped, infinity
can result from rounding beyond the limits of the largest representable number.

The infinities are signed (affine) and can be used in arithmetic operations
where they get treated as very large, indeterminate numbers.  For instance,
adding a constant to infinity gives another infinite result.

Some operations are indeterminate and return `NaN`, or if the
`InvalidOperation` signal is trapped, raise an exception.  For example,
`0/0` returns `NaN` which means "not a number".  This variety of
`NaN` is quiet and, once created, will flow through other computations
always resulting in another `NaN`.  This behavior can be useful for a
series of computations that occasionally have missing inputs --- it allows the
calculation to proceed while flagging specific results as invalid.

A variant is `sNaN` which signals rather than remaining quiet after every
operation.  This is a useful return value when an invalid result needs to
interrupt a calculation for special handling.

The behavior of Python's comparison operators can be a little surprising where a
`NaN` is involved.  A test for equality where one of the operands is a
quiet or signaling `NaN` always returns `False` (even when doing
`Decimal('NaN')==Decimal('NaN')`), while a test for inequality always returns
`True`.  An attempt to compare two Decimals using any of the `<`,
`<=`, `>` or `>=` operators will raise the `InvalidOperation` signal
if either operand is a `NaN`, and return `False` if this signal is
not trapped.  Note that the General Decimal Arithmetic specification does not
specify the behavior of direct comparisons; these rules for comparisons
involving a `NaN` were taken from the IEEE 854 standard (see Table 3 in
section 5.7).  To ensure strict standards-compliance, use the `compare()`
and `compare_signal()` methods instead.

The signed zeros can result from calculations that underflow. They keep the sign
that would have resulted if the calculation had been carried out to greater
precision.  Since their magnitude is zero, both positive and negative zeros are
treated as equal and their sign is informational.

In addition to the two signed zeros which are distinct yet equal, there are
various representations of zero with differing precisions yet equivalent in
value.  This takes a bit of getting used to.  For an eye accustomed to
normalized floating-point representations, it is not immediately obvious that
the following calculation returns a value equal to zero:

```python
>>> 1 / Decimal('Infinity')
Decimal('0E-1000026')
```

## Working with threads

The `getcontext()` function accesses a different `Context` object for
each thread.  Having separate thread contexts means that threads may make
changes (such as `getcontext().prec=10`) without interfering with other threads.

Likewise, the `setcontext()` function automatically assigns its target to
the current thread.

If `setcontext()` has not been called before `getcontext()`, then
`getcontext()` will automatically create a new context for use in the
current thread.  New context objects have default values set from the
`decimal.DefaultContext` object.

The `sys.flags.thread_inherit_context` flag affects the context for
new threads.  If the flag is false, new threads will start with an empty
context.  In this case, `getcontext()` will create a new context object
when called and use the default values from *DefaultContext*.  If the flag
is true, new threads will start with a copy of context from the caller of
`threading.Thread.start()`.

To control the defaults so that each thread will use the same values throughout
the application, directly modify the *DefaultContext* object. This should be
done *before* any threads are started so that there won't be a race condition
between threads calling `getcontext()`. For example:

```
# Set applicationwide defaults for all threads about to be launched
DefaultContext.prec = 12
DefaultContext.rounding = ROUND_DOWN
DefaultContext.traps = ExtendedContext.traps.copy()
DefaultContext.traps[InvalidOperation] = 1
setcontext(DefaultContext)

# Afterwards, the threads can be started
t1.start()
t2.start()
t3.start()
 . . .
```
