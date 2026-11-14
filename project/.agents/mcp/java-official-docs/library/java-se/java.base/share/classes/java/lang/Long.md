---
title: "Long class (java.lang) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Long.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Long class (java.lang)

```java
public final class Long extends Number implements Comparable<Long>, Constable, ConstantDesc
```

The `Long` class is the wrapper class for values of the primitive
type `long`. An object of type `Long` contains a
single field whose type is `long`.

 In addition, this class provides several methods for converting
a `long` to a `String` and a `String` to a `long`, as well as other constants and methods useful when dealing
with a `long`.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.

Implementation note: The implementations of the "bit twiddling"
methods (such as highestOneBit and
numberOfTrailingZeros) are
based on material from Henry S. Warren, Jr.'s *Hacker's
Delight*, (Addison Wesley, 2002) and *Hacker's
Delight, Second Edition*, (Pearson Education, 2013).

**Since:** 1.0

## Long.MIN_VALUE

```java
public static final long MIN_VALUE
```

A constant holding the minimum value a `long` can
have, -263.

## Long.MAX_VALUE

```java
public static final long MAX_VALUE
```

A constant holding the maximum value a `long` can
have, 263-1.

## Long.TYPE

```java
public static final Class<Long> TYPE
```

The `Class` instance representing the primitive type
`long`.

**Since:** 1.1

## Long.toString(long, int)

```java
public static String toString(long i, int radix)
```

Returns a string representation of the first argument in the
radix specified by the second argument.

If the radix is smaller than `Character.MIN_RADIX`
or larger than `Character.MAX_RADIX`, then the radix
`10` is used instead.

If the first argument is negative, the first element of the
result is the ASCII minus sign `'-'`
(`'\u005Cu002d'`). If the first argument is not
negative, no sign character appears in the result.

The remaining characters of the result represent the magnitude
of the first argument. If the magnitude is zero, it is
represented by a single zero character `'0'`
(`'\u005Cu0030'`); otherwise, the first character of
the representation of the magnitude will not be the zero
character.  The following ASCII characters are used as digits:

  `0123456789abcdefghijklmnopqrstuvwxyz`

These are `'\u005Cu0030'` through
`'\u005Cu0039'` and `'\u005Cu0061'` through
`'\u005Cu007a'`. If `radix` is
*N*, then the first *N* of these characters
are used as radix-*N* digits in the order shown. Thus,
the digits for hexadecimal (radix 16) are
`0123456789abcdef`. If uppercase letters are
desired, the `java.lang.String.toUpperCase()` method may
be called on the result:

 `Long.toString(n, 16).toUpperCase()`

Parameters:

- `i`: a `long` to be converted to a string.
- `radix`: the radix to use in the string representation.

**Returns:** a string representation of the argument in the specified radix.

**See also:** java.lang.Character#MAX_RADIX

**See also:** java.lang.Character#MIN_RADIX

## Long.toUnsignedString(long, int)

```java
public static String toUnsignedString(long i, int radix)
```

Returns a string representation of the first argument as an
unsigned integer value in the radix specified by the second
argument.

If the radix is smaller than `Character.MIN_RADIX`
or larger than `Character.MAX_RADIX`, then the radix
`10` is used instead.

Note that since the first argument is treated as an unsigned
value, no leading sign character is printed.

If the magnitude is zero, it is represented by a single zero
character `'0'` (`'\u005Cu0030'`); otherwise,
the first character of the representation of the magnitude will
not be the zero character.

The behavior of radixes and the characters used as digits
are the same as int) toString.

Parameters:

- `i`: an integer to be converted to an unsigned string.
- `radix`: the radix to use in the string representation.

**Returns:** an unsigned string representation of the argument in the specified radix.

**See also:** #toString(long, int)

**Since:** 1.8

## Long.toHexString(long)

```java
public static String toHexString(long i)
```

Returns a string representation of the `long`
argument as an unsigned integer in base 16.

The unsigned `long` value is the argument plus
264 if the argument is negative; otherwise, it is
equal to the argument.  This value is converted to a string of
ASCII digits in hexadecimal (base 16) with no extra
leading `0`s.

The value of the argument can be recovered from the returned
string `s` by calling int) Long.parseUnsignedLong(s, 16).

If the unsigned magnitude is zero, it is represented by a
single zero character `'0'` (`'\u005Cu0030'`);
otherwise, the first character of the representation of the
unsigned magnitude will not be the zero character. The
following characters are used as hexadecimal digits:

 `0123456789abcdef`

These are the characters `'\u005Cu0030'` through
`'\u005Cu0039'` and  `'\u005Cu0061'` through
`'\u005Cu0066'`.  If uppercase letters are desired,
the `java.lang.String.toUpperCase()` method may be called
on the result:

 `Long.toHexString(n).toUpperCase()`

Parameters:

- `i`: a `long` to be converted to a string.

**API note:** The `java.util.HexFormat` class provides formatting and parsing
of byte arrays and primitives to return a string or adding to an `Appendable`.
`HexFormat` formats and parses uppercase or lowercase hexadecimal characters,
with leading zeros and for byte arrays includes for each byte
a delimiter, prefix, and suffix.

**Returns:** the string representation of the unsigned `long`
         value represented by the argument in hexadecimal
         (base 16).

**See also:** java.util.HexFormat

**See also:** #parseUnsignedLong(String, int)

**See also:** #toUnsignedString(long, int)

**Since:** 1.0.2

## Long.toOctalString(long)

```java
public static String toOctalString(long i)
```

Returns a string representation of the `long`
argument as an unsigned integer in base 8.

The unsigned `long` value is the argument plus
264 if the argument is negative; otherwise, it is
equal to the argument.  This value is converted to a string of
ASCII digits in octal (base 8) with no extra leading
`0`s.

The value of the argument can be recovered from the returned
string `s` by calling int) Long.parseUnsignedLong(s, 8).

If the unsigned magnitude is zero, it is represented by a
single zero character `'0'` (`'\u005Cu0030'`);
otherwise, the first character of the representation of the
unsigned magnitude will not be the zero character. The
following characters are used as octal digits:

 `01234567`

These are the characters `'\u005Cu0030'` through
`'\u005Cu0037'`.

Parameters:

- `i`: a `long` to be converted to a string.

**Returns:** the string representation of the unsigned `long`
         value represented by the argument in octal (base 8).

**See also:** #parseUnsignedLong(String, int)

**See also:** #toUnsignedString(long, int)

**Since:** 1.0.2

## Long.toBinaryString(long)

```java
public static String toBinaryString(long i)
```

Returns a string representation of the `long`
argument as an unsigned integer in base 2.

The unsigned `long` value is the argument plus
264 if the argument is negative; otherwise, it is
equal to the argument.  This value is converted to a string of
ASCII digits in binary (base 2) with no extra leading
`0`s.

The value of the argument can be recovered from the returned
string `s` by calling int) Long.parseUnsignedLong(s, 2).

If the unsigned magnitude is zero, it is represented by a
single zero character `'0'` (`'\u005Cu0030'`);
otherwise, the first character of the representation of the
unsigned magnitude will not be the zero character. The
characters `'0'` (`'\u005Cu0030'`) and `'1'` (`'\u005Cu0031'`) are used as binary digits.

Parameters:

- `i`: a `long` to be converted to a string.

**Returns:** the string representation of the unsigned `long`
         value represented by the argument in binary (base 2).

**See also:** #parseUnsignedLong(String, int)

**See also:** #toUnsignedString(long, int)

**Since:** 1.0.2

## Long.toString(long)

```java
public static String toString(long i)
```

Returns a `String` object representing the specified
`long`.  The argument is converted to signed decimal
representation and returned as a string, exactly as if the
argument and the radix 10 were given as arguments to the int) method.

Parameters:

- `i`: a `long` to be converted.

**Returns:** a string representation of the argument in base 10.

## Long.toUnsignedString(long)

```java
public static String toUnsignedString(long i)
```

Returns a string representation of the argument as an unsigned
decimal value.

The argument is converted to unsigned decimal representation
and returned as a string exactly as if the argument and radix
10 were given as arguments to the int) method.

Parameters:

- `i`: an integer to be converted to an unsigned string.

**Returns:** an unsigned string representation of the argument.

**See also:** #toUnsignedString(long, int)

**Since:** 1.8

## Long.parseLong(String, int)

```java
public static long parseLong(String s, int radix) throws NumberFormatException
```

Parses the string argument as a signed `long` in the
radix specified by the second argument. The characters in the
string must all be digits of the specified radix (as determined
by whether int) returns
a nonnegative value), except that the first character may be an
ASCII minus sign `'-'` (`'\u005Cu002D'`) to
indicate a negative value or an ASCII plus sign `'+'`
(`'\u005Cu002B'`) to indicate a positive value. The
resulting `long` value is returned.

Note that neither the character `L`
(`'\u005Cu004C'`) nor `l`
(`'\u005Cu006C'`) is permitted to appear at the end
of the string as a type indicator, as would be permitted in
Java programming language source code - except that either
`L` or `l` may appear as a digit for a
radix greater than or equal to 22.

An exception of type `NumberFormatException` is
thrown if any of the following situations occurs:

- The first argument is `null` or is a string of
length zero.

- The `radix` is either smaller than `java.lang.Character.MIN_RADIX` or larger than `java.lang.Character.MAX_RADIX`.

- Any character of the string is not a digit of the specified
radix, except that the first character may be a minus sign
`'-'` (`'\u005Cu002d'`) or plus sign `'+'` (`'\u005Cu002B'`) provided that the string is
longer than length 1.

- The value represented by the string is not a value of type
     `long`.

Examples:

```java
parseLong("0", 10) returns 0L
parseLong("473", 10) returns 473L
parseLong("+42", 10) returns 42L
parseLong("-0", 10) returns 0L
parseLong("-FF", 16) returns -255L
parseLong("1100110", 2) returns 102L
parseLong("99", 8) throws a NumberFormatException
parseLong("Hazelnut", 10) throws a NumberFormatException
parseLong("Hazelnut", 36) returns 1356099454469L
```

Parameters:

- `s`: the `String` containing the `long` representation to be parsed.
- `radix`: the radix to be used while parsing `s`.

**Returns:** the `long` represented by the string argument in
            the specified radix.

Throws:

- `NumberFormatException`: if the string does not contain a parsable `long`.

## Long.parseLong(CharSequence, int, int, int)

```java
public static long parseLong(CharSequence s, int beginIndex, int endIndex, int radix) throws NumberFormatException
```

Parses the `CharSequence` argument as a signed `long` in
the specified `radix`, beginning at the specified
`beginIndex` and extending to `endIndex - 1`.

The method does not take steps to guard against the
`CharSequence` being mutated while parsing.

Parameters:

- `s`: the `CharSequence` containing the `long` representation to be parsed
- `beginIndex`: the beginning index, inclusive.
- `endIndex`: the ending index, exclusive.
- `radix`: the radix to be used while parsing `s`.

**Returns:** the signed `long` represented by the subsequence in
            the specified radix.

**Since:** 9

Throws:

- `NullPointerException`: if `s` is null.
- `IndexOutOfBoundsException`: if `beginIndex` is negative, or if `beginIndex` is greater than `endIndex` or if `endIndex` is greater than `s.length()`.
- `NumberFormatException`: if the `CharSequence` does not contain a parsable `long` in the specified `radix`, or if `radix` is either smaller than `java.lang.Character.MIN_RADIX` or larger than `java.lang.Character.MAX_RADIX`.

## Long.parseLong(String)

```java
public static long parseLong(String s) throws NumberFormatException
```

Parses the string argument as a signed decimal `long`.
The characters in the string must all be decimal digits, except
that the first character may be an ASCII minus sign `'-'`
(`\u005Cu002D'`) to indicate a negative value or an
ASCII plus sign `'+'` (`'\u005Cu002B'`) to
indicate a positive value. The resulting `long` value is
returned, exactly as if the argument and the radix `10`
were given as arguments to the int) method.

Note that neither the character `L`
(`'\u005Cu004C'`) nor `l`
(`'\u005Cu006C'`) is permitted to appear at the end
of the string as a type indicator, as would be permitted in
Java programming language source code.

Parameters:

- `s`: a `String` containing the `long` representation to be parsed

**Returns:** the `long` represented by the argument in
            decimal.

Throws:

- `NumberFormatException`: if the string does not contain a parsable `long`.

## Long.parseUnsignedLong(String, int)

```java
public static long parseUnsignedLong(String s, int radix) throws NumberFormatException
```

Parses the string argument as an unsigned `long` in the
radix specified by the second argument.  An unsigned integer
maps the values usually associated with negative numbers to
positive numbers larger than `MAX_VALUE`.

The characters in the string must all be digits of the
specified radix (as determined by whether int) returns a nonnegative
value), except that the first character may be an ASCII plus
sign `'+'` (`'\u005Cu002B'`). The resulting
integer value is returned.

An exception of type `NumberFormatException` is
thrown if any of the following situations occurs:

- The first argument is `null` or is a string of
length zero.

- The radix is either smaller than
`java.lang.Character.MIN_RADIX` or
larger than `java.lang.Character.MAX_RADIX`.

- Any character of the string is not a digit of the specified
radix, except that the first character may be a plus sign
`'+'` (`'\u005Cu002B'`) provided that the
string is longer than length 1.

- The value represented by the string is larger than the
largest unsigned `long`, 264-1.

Parameters:

- `s`: the `String` containing the unsigned integer representation to be parsed
- `radix`: the radix to be used while parsing `s`.

**Returns:** the unsigned `long` represented by the string
            argument in the specified radix.

**Since:** 1.8

Throws:

- `NumberFormatException`: if the `String` does not contain a parsable `long`.
