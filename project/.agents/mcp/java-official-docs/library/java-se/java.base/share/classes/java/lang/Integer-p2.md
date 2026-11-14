---
title: "Integer class (java.lang) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Integer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Integer class (java.lang) (part 2 of 3)

## Integer.parseUnsignedInt(CharSequence, int, int, int)

```java
public static int parseUnsignedInt(CharSequence s, int beginIndex, int endIndex, int radix) throws NumberFormatException
```

Parses the `CharSequence` argument as an unsigned `int` in
the specified `radix`, beginning at the specified
`beginIndex` and extending to `endIndex - 1`.

The method does not take steps to guard against the
`CharSequence` being mutated while parsing.

Parameters:

- `s`: the `CharSequence` containing the unsigned `int` representation to be parsed
- `beginIndex`: the beginning index, inclusive.
- `endIndex`: the ending index, exclusive.
- `radix`: the radix to be used while parsing `s`.

**Returns:** the unsigned `int` represented by the subsequence in
            the specified radix.

**Since:** 9

Throws:

- `NullPointerException`: if `s` is null.
- `IndexOutOfBoundsException`: if `beginIndex` is negative, or if `beginIndex` is greater than `endIndex` or if `endIndex` is greater than `s.length()`.
- `NumberFormatException`: if the `CharSequence` does not contain a parsable unsigned `int` in the specified `radix`, or if `radix` is either smaller than `java.lang.Character.MIN_RADIX` or larger than `java.lang.Character.MAX_RADIX`.

## Integer.parseUnsignedInt(String)

```java
public static int parseUnsignedInt(String s) throws NumberFormatException
```

Parses the string argument as an unsigned decimal integer. The
characters in the string must all be decimal digits, except
that the first character may be an ASCII plus sign `'+'` (`'\u005Cu002B'`). The resulting integer value
is returned, exactly as if the argument and the radix 10 were
given as arguments to the int) method.

Parameters:

- `s`: a `String` containing the unsigned `int` representation to be parsed

**Returns:** the unsigned integer value represented by the argument in decimal.

**Since:** 1.8

Throws:

- `NumberFormatException`: if the string does not contain a parsable unsigned integer.

## Integer.valueOf(String, int)

```java
public static Integer valueOf(String s, int radix) throws NumberFormatException
```

Returns an `Integer` object holding the value
extracted from the specified `String` when parsed
with the radix given by the second argument. The first argument
is interpreted as representing a signed integer in the radix
specified by the second argument, exactly as if the arguments
were given to the int)
method. The result is an `Integer` object that
represents the integer value specified by the string.

In other words, this method returns an `Integer`
object equal to the value of:

 `Integer.valueOf(Integer.parseInt(s, radix))`

Parameters:

- `s`: the string to be parsed.
- `radix`: the radix to be used in interpreting `s`

**Returns:** an `Integer` object holding the value
            represented by the string argument in the specified
            radix.

Throws:

- `NumberFormatException`: if the `String` does not contain a parsable `int`.

## Integer.valueOf(String)

```java
public static Integer valueOf(String s) throws NumberFormatException
```

Returns an `Integer` object holding the
value of the specified `String`. The argument is
interpreted as representing a signed decimal integer, exactly
as if the argument were given to the `parseInt(java.lang.String)` method. The result is an
`Integer` object that represents the integer value
specified by the string.

In other words, this method returns an `Integer`
object equal to the value of:

 `Integer.valueOf(Integer.parseInt(s))`

Parameters:

- `s`: the string to be parsed.

**Returns:** an `Integer` object holding the value
            represented by the string argument.

Throws:

- `NumberFormatException`: if the string cannot be parsed as an integer.

## Integer.valueOf(int)

```java
public static Integer valueOf(int i)
```

Returns an `Integer` instance representing the specified
`int` value.  If a new `Integer` instance is not
required, this method should generally be used in preference to
the constructor `Integer(int)`, as this method is likely
to yield significantly better space and time performance by
caching frequently requested values.

This method will always cache values in the range -128 to 127,
inclusive, and may cache other values outside of this range.

Parameters:

- `i`: an `int` value.

**Returns:** an `Integer` instance representing `i`.

**Since:** 1.5

## Integer.Integer(int)

```java
public Integer(int value)
```

Constructs a newly allocated `Integer` object that
represents the specified `int` value.

Parameters:

- `value`: the value to be represented by the `Integer` object.

**Deprecated:** It is rarely appropriate to use this constructor. The static factory
`valueOf(int)` is generally a better choice, as it is
likely to yield significantly better space and time performance.

## Integer.Integer(String)

```java
public Integer(String s) throws NumberFormatException
```

Constructs a newly allocated `Integer` object that
represents the `int` value indicated by the
`String` parameter. The string is converted to an
`int` value in exactly the manner used by the
`parseInt` method for radix 10.

Parameters:

- `s`: the `String` to be converted to an `Integer`.

**Deprecated:** It is rarely appropriate to use this constructor.
Use `parseInt(String)` to convert a string to a
`int` primitive, or use `valueOf(String)`
to convert a string to an `Integer` object.

Throws:

- `NumberFormatException`: if the `String` does not contain a parsable integer.

## Integer.byteValue()

```java
public byte byteValue()
```

Returns the value of this `Integer` as a `byte`
after a narrowing primitive conversion.

**JLS:** 5.1.3 Narrowing Primitive Conversion

## Integer.shortValue()

```java
public short shortValue()
```

Returns the value of this `Integer` as a `short`
after a narrowing primitive conversion.

**JLS:** 5.1.3 Narrowing Primitive Conversion

## Integer.intValue()

```java
public int intValue()
```

Returns the value of this `Integer` as an
`int`.

## Integer.longValue()

```java
public long longValue()
```

Returns the value of this `Integer` as a `long`
after a widening primitive conversion.

**JLS:** 5.1.2 Widening Primitive Conversion

**See also:** Integer#toUnsignedLong(int)

## Integer.floatValue()

```java
public float floatValue()
```

Returns the value of this `Integer` as a `float`
after a widening primitive conversion.

**JLS:** 5.1.2 Widening Primitive Conversion

## Integer.doubleValue()

```java
public double doubleValue()
```

Returns the value of this `Integer` as a `double`
after a widening primitive conversion.

**JLS:** 5.1.2 Widening Primitive Conversion

## Integer.toString()

```java
public String toString()
```

Returns a `String` object representing this
`Integer`'s value. The value is converted to signed
decimal representation and returned as a string, exactly as if
the integer value were given as an argument to the `java.lang.Integer.toString(int)` method.

**Returns:** a string representation of the value of this object in
         base 10.

## Integer.hashCode()

```java
public int hashCode()
```

Returns a hash code for this `Integer`.

**Returns:** a hash code value for this object, equal to the
         primitive `int` value represented by this
         `Integer` object.

## Integer.hashCode(int)

```java
public static int hashCode(int value)
```

Returns a hash code for an `int` value; compatible with
`Integer.hashCode()`.

Parameters:

- `value`: the value to hash

**Since:** 1.8

**Returns:** a hash code value for an `int` value.

## Integer.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this object to the specified object.  The result is
`true` if and only if the argument is not
`null` and is an `Integer` object that
contains the same `int` value as this object.

Parameters:

- `obj`: the object to compare with.

**Returns:** `true` if the objects are the same;
         `false` otherwise.

## Integer.getInteger(String)

```java
public static Integer getInteger(String nm)
```

Determines the integer value of the system property with the
specified name.

The first argument is treated as the name of a system
property.  System properties are accessible through the `java.lang.System.getProperty(java.lang.String)` method. The
string value of this property is then interpreted as an integer
value using the grammar supported by decode and
an `Integer` object representing this value is returned.

If there is no property with the specified name, if the
specified name is empty or `null`, or if the property
does not have the correct numeric format, then `null` is
returned.

In other words, this method returns an `Integer`
object equal to the value of:

 `getInteger(nm, null)`

Parameters:

- `nm`: property name.

**Returns:** the `Integer` value of the property.

**See also:** java.lang.System#getProperty(java.lang.String)

**See also:** java.lang.System#getProperty(java.lang.String, java.lang.String)

## Integer.getInteger(String, int)

```java
public static Integer getInteger(String nm, int val)
```

Determines the integer value of the system property with the
specified name.

The first argument is treated as the name of a system
property.  System properties are accessible through the `java.lang.System.getProperty(java.lang.String)` method. The
string value of this property is then interpreted as an integer
value using the grammar supported by decode and
an `Integer` object representing this value is returned.

The second argument is the default value. An `Integer` object
that represents the value of the second argument is returned if there
is no property of the specified name, if the property does not have
the correct numeric format, or if the specified name is empty or
`null`.

In other words, this method returns an `Integer` object
equal to the value of:

 `getInteger(nm, Integer.valueOf(val))`

but in practice it may be implemented in a manner such as:

```java
Integer result = getInteger(nm, null);
return (result == null) ? Integer.valueOf(val) : result;
```

to avoid the unnecessary allocation of an `Integer`
object when the default value is not needed.

Parameters:

- `nm`: property name.
- `val`: default value.

**Returns:** the `Integer` value of the property.

**See also:** java.lang.System#getProperty(java.lang.String)

**See also:** java.lang.System#getProperty(java.lang.String, java.lang.String)

## Integer.getInteger(String, Integer)

```java
public static Integer getInteger(String nm, Integer val)
```

Returns the integer value of the system property with the
specified name.  The first argument is treated as the name of a
system property.  System properties are accessible through the
`java.lang.System.getProperty(java.lang.String)` method.
The string value of this property is then interpreted as an
integer value, as per the decode method,
and an `Integer` object representing this value is
returned; in summary:

- If the property value begins with the two ASCII characters
        `0x` or the ASCII character `#`, not
     followed by a minus sign, then the rest of it is parsed as a
     hexadecimal integer exactly as by the method
     int) with radix 16.

- If the property value begins with the ASCII character
    `0` followed by another character, it is parsed as an
    octal integer exactly as by the method
    int) with radix 8.

- Otherwise, the property value is parsed as a decimal integer
exactly as by the method int)
with radix 10.

The second argument is the default value. The default value is
returned if there is no property of the specified name, if the
property does not have the correct numeric format, or if the
specified name is empty or `null`.

Parameters:

- `nm`: property name.
- `val`: default value.

**Returns:** the `Integer` value of the property.

**See also:** System#getProperty(java.lang.String)

**See also:** System#getProperty(java.lang.String, java.lang.String)

## Integer.decode(String)

```java
public static Integer decode(String nm) throws NumberFormatException
```

Decodes a `String` into an `Integer`.
Accepts decimal, hexadecimal, and octal numbers given
by the following grammar:

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
"`#`", or leading zero) is parsed as by the `Integer.parseInt` method with the indicated radix (10, 16, or
8).  This sequence of characters must represent a positive
value or a `NumberFormatException` will be thrown.  The
result is negated if first character of the specified `String` is the minus sign.  No whitespace characters are
permitted in the `String`.

Parameters:

- `nm`: the `String` to decode.

**Returns:** an `Integer` object holding the `int`
            value represented by `nm`

**See also:** java.lang.Integer#parseInt(java.lang.String, int)

Throws:

- `NumberFormatException`: if the `String` does not contain a parsable integer.

## Integer.compareTo(Integer)

```java
public int compareTo(Integer anotherInteger)
```

Compares two `Integer` objects numerically.

Parameters:

- `anotherInteger`: the `Integer` to be compared.

**Returns:** the value `0` if this `Integer` is
         equal to the argument `Integer`; a value less than
         `0` if this `Integer` is numerically less
         than the argument `Integer`; and a value greater
         than `0` if this `Integer` is numerically
          greater than the argument `Integer` (signed
          comparison).

**Since:** 1.2

## Integer.compare(int, int)

```java
public static int compare(int x, int y)
```

Compares two `int` values numerically.
The value returned is identical to what would be returned by:

```java
   Integer.valueOf(x).compareTo(Integer.valueOf(y))
```

Parameters:

- `x`: the first `int` to compare
- `y`: the second `int` to compare

**Returns:** the value `0` if `x == y`;
        a value less than `0` if `x < y`; and
        a value greater than `0` if `x > y`

**Since:** 1.7

## Integer.compareUnsigned(int, int)

```java
public static int compareUnsigned(int x, int y)
```

Compares two `int` values numerically treating the values
as unsigned.

Parameters:

- `x`: the first `int` to compare
- `y`: the second `int` to compare

**Returns:** the value `0` if `x == y`; a value less
        than `0` if `x < y` as unsigned values; and
        a value greater than `0` if `x > y` as
        unsigned values

**Since:** 1.8
