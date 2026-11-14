---
title: "MathContext class (java.math)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/math/MathContext.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MathContext class (java.math)

```java
public final class MathContext implements Serializable
```

Immutable objects which encapsulate the context settings which
describe certain rules for numerical operators, such as those
implemented by the `BigDecimal` class.

The base-independent settings are:

- `precision`:
the number of digits to be used for an operation; results are
rounded to this precision

- `roundingMode`:
a `RoundingMode` object which specifies the algorithm to be
used for rounding.

**See also:** BigDecimal

**See also:** RoundingMode

**Since:** 1.5

## MathContext.UNLIMITED

```java
public static final MathContext UNLIMITED
```

A `MathContext` object whose settings have the values
required for unlimited precision arithmetic.
The values of the settings are: `precision=0 roundingMode=HALF_UP`

## MathContext.DECIMAL32

```java
public static final MathContext DECIMAL32
```

A `MathContext` object with a precision setting
matching the precision of the IEEE 754-2019 decimal32 format, 7 digits, and a
rounding mode of HALF_EVEN.
Note the exponent range of decimal32 (min exponent of -95, max
exponent of 96) is *not* used for rounding.

## MathContext.DECIMAL64

```java
public static final MathContext DECIMAL64
```

A `MathContext` object with a precision setting
matching the precision of the IEEE 754-2019 decimal64 format, 16 digits, and a
rounding mode of HALF_EVEN.
Note the exponent range of decimal64 (min exponent of -383, max
exponent of 384) is *not* used for rounding.

## MathContext.DECIMAL128

```java
public static final MathContext DECIMAL128
```

A `MathContext` object with a precision setting
matching the precision of the IEEE 754-2019 decimal128 format, 34 digits, and a
rounding mode of HALF_EVEN.
Note the exponent range of decimal128 (min exponent of -6143,
max exponent of 6144) is *not* used for rounding.

## MathContext.MathContext(int)

```java
public MathContext(int setPrecision)
```

Constructs a new `MathContext` with the specified
precision and the HALF_UP rounding
mode.

Parameters:

- `setPrecision`: The non-negative `int` precision setting.

Throws:

- `IllegalArgumentException`: if the `setPrecision` parameter is less than zero.

## MathContext.MathContext(int, RoundingMode)

```java
public MathContext(int setPrecision, RoundingMode setRoundingMode)
```

Constructs a new `MathContext` with a specified
precision and rounding mode.

Parameters:

- `setPrecision`: The non-negative `int` precision setting.
- `setRoundingMode`: The rounding mode to use.

Throws:

- `IllegalArgumentException`: if the `setPrecision` parameter is less than zero.
- `NullPointerException`: if the rounding mode argument is `null`

## MathContext.MathContext(String)

```java
public MathContext(String val)
```

Constructs a new `MathContext` from a string.

The string must be in the same format as that produced by the
`toString` method.

An `IllegalArgumentException` is thrown if the precision
section of the string is out of range (`< 0`) or the string is
not in the format created by the `toString` method.

Parameters:

- `val`: The string to be parsed

Throws:

- `IllegalArgumentException`: if the precision section is out of range or of incorrect format
- `NullPointerException`: if the argument is `null`

## MathContext.getPrecision()

```java
public int getPrecision()
```

Returns the `precision` setting.
This value is always non-negative.

**Returns:** an `int` which is the value of the `precision`
        setting

## MathContext.getRoundingMode()

```java
public RoundingMode getRoundingMode()
```

Returns the roundingMode setting.
This will be one of
`RoundingMode.CEILING`,
`RoundingMode.DOWN`,
`RoundingMode.FLOOR`,
`RoundingMode.HALF_DOWN`,
`RoundingMode.HALF_EVEN`,
`RoundingMode.HALF_UP`,
`RoundingMode.UNNECESSARY`, or
`RoundingMode.UP`.

**Returns:** a `RoundingMode` object which is the value of the
        `roundingMode` setting

## MathContext.equals(Object)

```java
public boolean equals(Object x)
```

Compares this `MathContext` with the specified
`Object` for equality.

Parameters:

- `x`: `Object` to which this `MathContext` is to be compared.

**Returns:** `true` if and only if the specified `Object` is
        a `MathContext` object which has exactly the same
        settings as this object

## MathContext.hashCode()

```java
public int hashCode()
```

Returns the hash code for this `MathContext`.

**Returns:** hash code for this `MathContext`

## MathContext.toString()

```java
public java.lang.String toString()
```

Returns the string representation of this `MathContext`.
The `String` returned represents the settings of the
`MathContext` object as two space-delimited words
(separated by a single space character, `'\u0020'`,
and with no leading or trailing white space), as follows:

-
The string `"precision="`, immediately followed
by the value of the precision setting as a numeric string as if
generated by the Integer.toString
method.

-
The string `"roundingMode="`, immediately
followed by the value of the `roundingMode` setting as a
word.  This word will be the same as the name of the
corresponding public constant in the `RoundingMode`
enum.

For example:

```java
precision=9 roundingMode=HALF_UP
```

Additional words may be appended to the result of
`toString` in the future if more properties are added to
this class.

**Returns:** a `String` representing the context settings
