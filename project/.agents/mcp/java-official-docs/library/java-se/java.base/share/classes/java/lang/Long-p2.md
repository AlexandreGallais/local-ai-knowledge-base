---
title: "Long class (java.lang) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Long.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Long class (java.lang) (part 2 of 3)

## Long.parseUnsignedLong(CharSequence, int, int, int)

```java
public static long parseUnsignedLong(CharSequence s, int beginIndex, int endIndex, int radix) throws NumberFormatException
```

Parses the `CharSequence` argument as an unsigned `long` in
the specified `radix`, beginning at the specified
`beginIndex` and extending to `endIndex - 1`.

The method does not take steps to guard against the
`CharSequence` being mutated while parsing.

Parameters:

- `s`: the `CharSequence` containing the unsigned `long` representation to be parsed
- `beginIndex`: the beginning index, inclusive.
- `endIndex`: the ending index, exclusive.
- `radix`: the radix to be used while parsing `s`.

**Returns:** the unsigned `long` represented by the subsequence in
            the specified radix.

**Since:** 9

Throws:

- `NullPointerException`: if `s` is null.
- `IndexOutOfBoundsException`: if `beginIndex` is negative, or if `beginIndex` is greater than `endIndex` or if `endIndex` is greater than `s.length()`.
- `NumberFormatException`: if the `CharSequence` does not contain a parsable unsigned `long` in the specified `radix`, or if `radix` is either smaller than `java.lang.Character.MIN_RADIX` or larger than `java.lang.Character.MAX_RADIX`.

## Long.parseUnsignedLong(String)

```java
public static long parseUnsignedLong(String s) throws NumberFormatException
```

Parses the string argument as an unsigned decimal `long`. The
characters in the string must all be decimal digits, except
that the first character may be an ASCII plus sign `'+'` (`'\u005Cu002B'`). The resulting integer value
is returned, exactly as if the argument and the radix 10 were
given as arguments to the int) method.

Parameters:

- `s`: a `String` containing the unsigned `long` representation to be parsed

**Returns:** the unsigned `long` value represented by the decimal string argument

**Since:** 1.8

Throws:

- `NumberFormatException`: if the string does not contain a parsable unsigned integer.

## Long.valueOf(String, int)

```java
public static Long valueOf(String s, int radix) throws NumberFormatException
```

Returns a `Long` object holding the value
extracted from the specified `String` when parsed
with the radix given by the second argument.  The first
argument is interpreted as representing a signed
`long` in the radix specified by the second
argument, exactly as if the arguments were given to the int) method. The result is a
`Long` object that represents the `long`
value specified by the string.

In other words, this method returns a `Long` object equal
to the value of:

 `Long.valueOf(Long.parseLong(s, radix))`

Parameters:

- `s`: the string to be parsed
- `radix`: the radix to be used in interpreting `s`

**Returns:** a `Long` object holding the value
            represented by the string argument in the specified
            radix.

Throws:

- `NumberFormatException`: If the `String` does not contain a parsable `long`.

## Long.valueOf(String)

```java
public static Long valueOf(String s) throws NumberFormatException
```

Returns a `Long` object holding the value
of the specified `String`. The argument is
interpreted as representing a signed decimal `long`,
exactly as if the argument were given to the `parseLong(java.lang.String)` method. The result is a
`Long` object that represents the integer value
specified by the string.

In other words, this method returns a `Long` object
equal to the value of:

 `Long.valueOf(Long.parseLong(s))`

Parameters:

- `s`: the string to be parsed.

**Returns:** a `Long` object holding the value
            represented by the string argument.

Throws:

- `NumberFormatException`: If the string cannot be parsed as a `long`.

## Long.valueOf(long)

```java
public static Long valueOf(long l)
```

Returns a `Long` instance representing the specified
`long` value.
If a new `Long` instance is not required, this method
should generally be used in preference to the constructor
`Long(long)`, as this method is likely to yield
significantly better space and time performance by caching
frequently requested values.

This method will always cache values in the range -128 to 127,
inclusive, and may cache other values outside of this range.

Parameters:

- `l`: a long value.

**Returns:** a `Long` instance representing `l`.

**Since:** 1.5

## Long.decode(String)

```java
public static Long decode(String nm) throws NumberFormatException
```

Decodes a `String` into a `Long`.
Accepts decimal, hexadecimal, and octal numbers given by the
following grammar:

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
"`#`", or leading zero) is parsed as by the `Long.parseLong` method with the indicated radix (10, 16, or 8).
This sequence of characters must represent a positive value or
a `NumberFormatException` will be thrown.  The result is
negated if first character of the specified `String` is
the minus sign.  No whitespace characters are permitted in the
`String`.

Parameters:

- `nm`: the `String` to decode.

**Returns:** a `Long` object holding the `long`
           value represented by `nm`

**See also:** java.lang.Long#parseLong(String, int)

**Since:** 1.2

Throws:

- `NumberFormatException`: if the `String` does not contain a parsable `long`.

## Long.Long(long)

```java
public Long(long value)
```

Constructs a newly allocated `Long` object that
represents the specified `long` argument.

Parameters:

- `value`: the value to be represented by the `Long` object.

**Deprecated:** It is rarely appropriate to use this constructor. The static factory
`valueOf(long)` is generally a better choice, as it is
likely to yield significantly better space and time performance.

## Long.Long(String)

```java
public Long(String s) throws NumberFormatException
```

Constructs a newly allocated `Long` object that
represents the `long` value indicated by the
`String` parameter. The string is converted to a
`long` value in exactly the manner used by the
`parseLong` method for radix 10.

Parameters:

- `s`: the `String` to be converted to a `Long`.

**Deprecated:** It is rarely appropriate to use this constructor.
Use `parseLong(String)` to convert a string to a
`long` primitive, or use `valueOf(String)`
to convert a string to a `Long` object.

Throws:

- `NumberFormatException`: if the `String` does not contain a parsable `long`.

## Long.byteValue()

```java
public byte byteValue()
```

Returns the value of this `Long` as a `byte` after
a narrowing primitive conversion.

**JLS:** 5.1.3 Narrowing Primitive Conversion

## Long.shortValue()

```java
public short shortValue()
```

Returns the value of this `Long` as a `short` after
a narrowing primitive conversion.

**JLS:** 5.1.3 Narrowing Primitive Conversion

## Long.intValue()

```java
public int intValue()
```

Returns the value of this `Long` as an `int` after
a narrowing primitive conversion.

**JLS:** 5.1.3 Narrowing Primitive Conversion

## Long.longValue()

```java
public long longValue()
```

Returns the value of this `Long` as a
`long` value.

## Long.floatValue()

```java
public float floatValue()
```

Returns the value of this `Long` as a `float` after
a widening primitive conversion.

**JLS:** 5.1.2 Widening Primitive Conversion

## Long.doubleValue()

```java
public double doubleValue()
```

Returns the value of this `Long` as a `double`
after a widening primitive conversion.

**JLS:** 5.1.2 Widening Primitive Conversion

## Long.toString()

```java
public String toString()
```

Returns a `String` object representing this
`Long`'s value.  The value is converted to signed
decimal representation and returned as a string, exactly as if
the `long` value were given as an argument to the
`java.lang.Long.toString(long)` method.

**Returns:** a string representation of the value of this object in
         base 10.

## Long.hashCode()

```java
public int hashCode()
```

Returns a hash code for this `Long`. The result is
the exclusive OR of the two halves of the primitive
`long` value held by this `Long`
object. That is, the hashcode is the value of the expression:

 `(int)(this.longValue()^(this.longValue()>>>32))`

**Returns:** a hash code value for this object.

## Long.hashCode(long)

```java
public static int hashCode(long value)
```

Returns a hash code for a `long` value; compatible with
`Long.hashCode()`.

Parameters:

- `value`: the value to hash

**Returns:** a hash code value for a `long` value.

**Since:** 1.8

## Long.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this object to the specified object.  The result is
`true` if and only if the argument is not
`null` and is a `Long` object that
contains the same `long` value as this object.

Parameters:

- `obj`: the object to compare with.

**Returns:** `true` if the objects are the same;
         `false` otherwise.

## Long.getLong(String)

```java
public static Long getLong(String nm)
```

Determines the `long` value of the system property
with the specified name.

The first argument is treated as the name of a system
property.  System properties are accessible through the `java.lang.System.getProperty(java.lang.String)` method. The
string value of this property is then interpreted as a `long` value using the grammar supported by decode
and a `Long` object representing this value is returned.

If there is no property with the specified name, if the
specified name is empty or `null`, or if the property
does not have the correct numeric format, then `null` is
returned.

In other words, this method returns a `Long` object
equal to the value of:

 `getLong(nm, null)`

Parameters:

- `nm`: property name.

**Returns:** the `Long` value of the property.

**See also:** java.lang.System#getProperty(java.lang.String)

**See also:** java.lang.System#getProperty(java.lang.String, java.lang.String)

## Long.getLong(String, long)

```java
public static Long getLong(String nm, long val)
```

Determines the `long` value of the system property
with the specified name.

The first argument is treated as the name of a system
property.  System properties are accessible through the `java.lang.System.getProperty(java.lang.String)` method. The
string value of this property is then interpreted as a `long` value using the grammar supported by decode
and a `Long` object representing this value is returned.

The second argument is the default value. A `Long` object
that represents the value of the second argument is returned if there
is no property of the specified name, if the property does not have
the correct numeric format, or if the specified name is empty or null.

In other words, this method returns a `Long` object equal
to the value of:

 `getLong(nm, Long.valueOf(val))`

but in practice it may be implemented in a manner such as:

```java
Long result = getLong(nm, null);
return (result == null) ? Long.valueOf(val) : result;
```

to avoid the unnecessary allocation of a `Long` object when
the default value is not needed.

Parameters:

- `nm`: property name.
- `val`: default value.

**Returns:** the `Long` value of the property.

**See also:** java.lang.System#getProperty(java.lang.String)

**See also:** java.lang.System#getProperty(java.lang.String, java.lang.String)

## Long.getLong(String, Long)

```java
public static Long getLong(String nm, Long val)
```

Returns the `long` value of the system property with
the specified name.  The first argument is treated as the name
of a system property.  System properties are accessible through
the `java.lang.System.getProperty(java.lang.String)`
method. The string value of this property is then interpreted
as a `long` value, as per the
decode method, and a `Long` object
representing this value is returned; in summary:

- If the property value begins with the two ASCII characters
`0x` or the ASCII character `#`, not followed by
a minus sign, then the rest of it is parsed as a hexadecimal integer
exactly as for the method int)
with radix 16.

- If the property value begins with the ASCII character
`0` followed by another character, it is parsed as
an octal integer exactly as by the method int) with radix 8.

- Otherwise the property value is parsed as a decimal
integer exactly as by the method
int) with radix 10.

Note that, in every case, neither `L`
(`'\u005Cu004C'`) nor `l`
(`'\u005Cu006C'`) is permitted to appear at the end
of the property value as a type indicator, as would be
permitted in Java programming language source code.

The second argument is the default value. The default value is
returned if there is no property of the specified name, if the
property does not have the correct numeric format, or if the
specified name is empty or `null`.

Parameters:

- `nm`: property name.
- `val`: default value.

**Returns:** the `Long` value of the property.

**See also:** System#getProperty(java.lang.String)

**See also:** System#getProperty(java.lang.String, java.lang.String)

## Long.compareTo(Long)

```java
public int compareTo(Long anotherLong)
```

Compares two `Long` objects numerically.

Parameters:

- `anotherLong`: the `Long` to be compared.

**Returns:** the value `0` if this `Long` is
         equal to the argument `Long`; a value less than
         `0` if this `Long` is numerically less
         than the argument `Long`; and a value greater
         than `0` if this `Long` is numerically
          greater than the argument `Long` (signed
          comparison).

**Since:** 1.2

## Long.compare(long, long)

```java
public static int compare(long x, long y)
```

Compares two `long` values numerically.
The value returned is identical to what would be returned by:

```java
   Long.valueOf(x).compareTo(Long.valueOf(y))
```

Parameters:

- `x`: the first `long` to compare
- `y`: the second `long` to compare

**Returns:** the value `0` if `x == y`;
        a value less than `0` if `x < y`; and
        a value greater than `0` if `x > y`

**Since:** 1.7

## Long.compareUnsigned(long, long)

```java
public static int compareUnsigned(long x, long y)
```

Compares two `long` values numerically treating the values
as unsigned.

Parameters:

- `x`: the first `long` to compare
- `y`: the second `long` to compare

**Returns:** the value `0` if `x == y`; a value less
        than `0` if `x < y` as unsigned values; and
        a value greater than `0` if `x > y` as
        unsigned values

**Since:** 1.8
