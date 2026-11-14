---
title: "Byte class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Byte.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Byte class (java.lang)

```java
public final class Byte extends Number implements Comparable<Byte>, Constable
```

The `Byte` class is the wrapper class for values of the primitive
type `byte`. An object of type `Byte` contains a
single field whose type is `byte`.

In addition, this class provides several methods for converting
a `byte` to a `String` and a `String` to a `byte`, as well as other constants and methods useful when dealing
with a `byte`.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.

**See also:** java.lang.Number

**Since:** 1.1

## Byte.MIN_VALUE

```java
public static final byte MIN_VALUE
```

A constant holding the minimum value a `byte` can
have, -27.

## Byte.MAX_VALUE

```java
public static final byte MAX_VALUE
```

A constant holding the maximum value a `byte` can
have, 27-1.

## Byte.TYPE

```java
public static final Class<Byte> TYPE
```

The `Class` instance representing the primitive type
`byte`.

## Byte.toString(byte)

```java
public static String toString(byte b)
```

Returns a new `String` object representing the
specified `byte`. The radix is assumed to be 10.

Parameters:

- `b`: the `byte` to be converted

**Returns:** the string representation of the specified `byte`

**See also:** java.lang.Integer#toString(int)

## Byte.describeConstable()

```java
public Optional<DynamicConstantDesc<Byte>> describeConstable()
```

Returns an `Optional` containing the nominal descriptor for this
instance.

**Returns:** an `Optional` describing the `Byte` instance

**Since:** 15

## Byte.valueOf(byte)

```java
public static Byte valueOf(byte b)
```

Returns a `Byte` instance representing the specified
`byte` value.
If a new `Byte` instance is not required, this method
should generally be used in preference to the constructor
`Byte(byte)`, as this method is likely to yield
significantly better space and time performance since
all byte values are cached.

Parameters:

- `b`: a byte value.

**Returns:** a `Byte` instance representing `b`.

**Since:** 1.5

## Byte.parseByte(String, int)

```java
public static byte parseByte(String s, int radix) throws NumberFormatException
```

Parses the string argument as a signed `byte` in the
radix specified by the second argument. The characters in the
string must all be digits, of the specified radix (as
determined by whether int) returns a nonnegative value) except that the first
character may be an ASCII minus sign `'-'`
(`'\u005Cu002D'`) to indicate a negative value or an
ASCII plus sign `'+'` (`'\u005Cu002B'`) to
indicate a positive value.  The resulting `byte` value is
returned.

An exception of type `NumberFormatException` is
thrown if any of the following situations occurs:

-  The first argument is `null` or is a string of
length zero.

-  The radix is either smaller than `java.lang.Character.MIN_RADIX` or larger than `java.lang.Character.MAX_RADIX`.

-  Any character of the string is not a digit of the
specified radix, except that the first character may be a minus
sign `'-'` (`'\u005Cu002D'`) or plus sign
`'+'` (`'\u005Cu002B'`) provided that the
string is longer than length 1.

-  The value represented by the string is not a value of type
`byte`.

Parameters:

- `s`: the `String` containing the `byte` representation to be parsed
- `radix`: the radix to be used while parsing `s`

**Returns:** the `byte` value represented by the string
                  argument in the specified radix

Throws:

- `NumberFormatException`: If the string does not contain a parsable `byte`.

## Byte.parseByte(String)

```java
public static byte parseByte(String s) throws NumberFormatException
```

Parses the string argument as a signed decimal `byte`. The characters in the string must all be decimal digits,
except that the first character may be an ASCII minus sign
`'-'` (`'\u005Cu002D'`) to indicate a negative
value or an ASCII plus sign `'+'`
(`'\u005Cu002B'`) to indicate a positive value. The
resulting `byte` value is returned, exactly as if the
argument and the radix 10 were given as arguments to the int) method.

Parameters:

- `s`: a `String` containing the `byte` representation to be parsed

**Returns:** the `byte` value represented by the
                 argument in decimal

Throws:

- `NumberFormatException`: if the string does not contain a parsable `byte`.

## Byte.valueOf(String, int)

```java
public static Byte valueOf(String s, int radix) throws NumberFormatException
```

Returns a `Byte` object holding the value
extracted from the specified `String` when parsed
with the radix given by the second argument. The first argument
is interpreted as representing a signed `byte` in
the radix specified by the second argument, exactly as if the
argument were given to the int) method. The result is a `Byte` object that
represents the `byte` value specified by the string.

 In other words, this method returns a `Byte` object
equal to the value of:

`Byte.valueOf(Byte.parseByte(s, radix))`

Parameters:

- `s`: the string to be parsed
- `radix`: the radix to be used in interpreting `s`

**Returns:** a `Byte` object holding the value
                 represented by the string argument in the
                 specified radix.

Throws:

- `NumberFormatException`: If the `String` does not contain a parsable `byte`.

## Byte.valueOf(String)

```java
public static Byte valueOf(String s) throws NumberFormatException
```

Returns a `Byte` object holding the value
given by the specified `String`. The argument is
interpreted as representing a signed decimal `byte`,
exactly as if the argument were given to the `parseByte(java.lang.String)` method. The result is a
`Byte` object that represents the `byte`
value specified by the string.

 In other words, this method returns a `Byte` object
equal to the value of:

`Byte.valueOf(Byte.parseByte(s))`

Parameters:

- `s`: the string to be parsed

**Returns:** a `Byte` object holding the value
                 represented by the string argument

Throws:

- `NumberFormatException`: If the `String` does not contain a parsable `byte`.

## Byte.decode(String)

```java
public static Byte decode(String nm) throws NumberFormatException
```

Decodes a `String` into a `Byte`.
Accepts decimal, hexadecimal, and octal numbers given by
the following grammar:

*DecodableString:*
*Signopt DecimalNumeral*
*Signopt* `0x` *HexDigits*
*Signopt* `0X` *HexDigits*
*Signopt* `#` *HexDigits*
*Signopt* `0` *OctalDigits*

*Sign:*
`-`
`+`

*DecimalNumeral*, *HexDigits*, and *OctalDigits*
are as defined in section  of
*The Java Language Specification*,
except that underscores are not accepted between digits.

The sequence of characters following an optional
sign and/or radix specifier ("`0x`", "`0X`",
"`#`", or leading zero) is parsed as by the `Byte.parseByte` method with the indicated radix (10, 16, or 8).
This sequence of characters must represent a positive value or
a `NumberFormatException` will be thrown.  The result is
negated if first character of the specified `String` is
the minus sign.  No whitespace characters are permitted in the
`String`.

Parameters:

- `nm`: the `String` to decode.

**Returns:** a `Byte` object holding the `byte`
         value represented by `nm`

**See also:** java.lang.Byte#parseByte(java.lang.String, int)

Throws:

- `NumberFormatException`: if the `String` does not contain a parsable `byte`.

## Byte.Byte(byte)

```java
public Byte(byte value)
```

Constructs a newly allocated `Byte` object that
represents the specified `byte` value.

Parameters:

- `value`: the value to be represented by the `Byte`.

**Deprecated:** It is rarely appropriate to use this constructor. The static factory
`valueOf(byte)` is generally a better choice, as it is
likely to yield significantly better space and time performance.

## Byte.Byte(String)

```java
public Byte(String s) throws NumberFormatException
```

Constructs a newly allocated `Byte` object that
represents the `byte` value indicated by the
`String` parameter. The string is converted to a
`byte` value in exactly the manner used by the
`parseByte` method for radix 10.

Parameters:

- `s`: the `String` to be converted to a `Byte`

**Deprecated:** It is rarely appropriate to use this constructor.
Use `parseByte(String)` to convert a string to a
`byte` primitive, or use `valueOf(String)`
to convert a string to a `Byte` object.

Throws:

- `NumberFormatException`: if the `String` does not contain a parsable `byte`.

## Byte.byteValue()

```java
public byte byteValue()
```

Returns the value of this `Byte` as a
`byte`.

## Byte.shortValue()

```java
public short shortValue()
```

Returns the value of this `Byte` as a `short` after
a widening primitive conversion.

**JLS:** 5.1.2 Widening Primitive Conversion

## Byte.intValue()

```java
public int intValue()
```

Returns the value of this `Byte` as an `int` after
a widening primitive conversion.

**JLS:** 5.1.2 Widening Primitive Conversion

## Byte.longValue()

```java
public long longValue()
```

Returns the value of this `Byte` as a `long` after
a widening primitive conversion.

**JLS:** 5.1.2 Widening Primitive Conversion

## Byte.floatValue()

```java
public float floatValue()
```

Returns the value of this `Byte` as a `float` after
a widening primitive conversion.

**JLS:** 5.1.2 Widening Primitive Conversion

## Byte.doubleValue()

```java
public double doubleValue()
```

Returns the value of this `Byte` as a `double`
after a widening primitive conversion.

**JLS:** 5.1.2 Widening Primitive Conversion

## Byte.toString()

```java
public String toString()
```

Returns a `String` object representing this
`Byte`'s value.  The value is converted to signed
decimal representation and returned as a string, exactly as if
the `byte` value were given as an argument to the
`java.lang.Byte.toString(byte)` method.

**Returns:** a string representation of the value of this object in
         base 10.

## Byte.hashCode()

```java
public int hashCode()
```

Returns a hash code for this `Byte`; equal to the result
of invoking `intValue()`.

**Returns:** a hash code value for this `Byte`

## Byte.hashCode(byte)

```java
public static int hashCode(byte value)
```

Returns a hash code for a `byte` value; compatible with
`Byte.hashCode()`.

Parameters:

- `value`: the value to hash

**Returns:** a hash code value for a `byte` value.

**Since:** 1.8

## Byte.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this object to the specified object.  The result is
`true` if and only if the argument is not
`null` and is a `Byte` object that
contains the same `byte` value as this object.

Parameters:

- `obj`: the object to compare with

**Returns:** `true` if the objects are the same;
                 `false` otherwise.

## Byte.compareTo(Byte)

```java
public int compareTo(Byte anotherByte)
```

Compares two `Byte` objects numerically.

Parameters:

- `anotherByte`: the `Byte` to be compared.

**Returns:** the value `0` if this `Byte` is
         equal to the argument `Byte`; a value less than
         `0` if this `Byte` is numerically less
         than the argument `Byte`; and a value greater than
          `0` if this `Byte` is numerically
          greater than the argument `Byte` (signed
          comparison).

**Since:** 1.2

## Byte.compare(byte, byte)

```java
public static int compare(byte x, byte y)
```

Compares two `byte` values numerically.
The value returned is identical to what would be returned by:

```java
   Byte.valueOf(x).compareTo(Byte.valueOf(y))
```

Parameters:

- `x`: the first `byte` to compare
- `y`: the second `byte` to compare

**Returns:** the value `0` if `x == y`;
        a value less than `0` if `x < y`; and
        a value greater than `0` if `x > y`

**Since:** 1.7

## Byte.compareUnsigned(byte, byte)

```java
public static int compareUnsigned(byte x, byte y)
```

Compares two `byte` values numerically treating the values
as unsigned.

Parameters:

- `x`: the first `byte` to compare
- `y`: the second `byte` to compare

**Returns:** the value `0` if `x == y`; a value less
        than `0` if `x < y` as unsigned values; and
        a value greater than `0` if `x > y` as
        unsigned values

**Since:** 9

## Byte.toUnsignedInt(byte)

```java
public static int toUnsignedInt(byte x)
```

Converts the argument to an `int` by an unsigned
conversion.  In an unsigned conversion to an `int`, the
high-order 24 bits of the `int` are zero and the
low-order 8 bits are equal to the bits of the `byte` argument.

Consequently, zero and positive `byte` values are mapped
to a numerically equal `int` value and negative `byte` values are mapped to an `int` value equal to the
input plus 28.

Parameters:

- `x`: the value to convert to an unsigned `int`

**Returns:** the argument converted to `int` by an unsigned
        conversion

**Since:** 1.8

## Byte.toUnsignedLong(byte)

```java
public static long toUnsignedLong(byte x)
```

Converts the argument to a `long` by an unsigned
conversion.  In an unsigned conversion to a `long`, the
high-order 56 bits of the `long` are zero and the
low-order 8 bits are equal to the bits of the `byte` argument.

Consequently, zero and positive `byte` values are mapped
to a numerically equal `long` value and negative `byte` values are mapped to a `long` value equal to the
input plus 28.

Parameters:

- `x`: the value to convert to an unsigned `long`

**Returns:** the argument converted to `long` by an unsigned
        conversion

**Since:** 1.8

## Byte.SIZE

```java
public static final int SIZE
```

The number of bits used to represent a `byte` value in two's
complement binary form.

**Since:** 1.5

## Byte.BYTES

```java
public static final int BYTES
```

The number of bytes used to represent a `byte` value in two's
complement binary form.

**Since:** 1.8
