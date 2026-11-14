# Long class (java.lang)

```java
public final class Long extends Number implements Comparable<Long>, Constable, ConstantDesc
```

The {@code Long} class is the {@linkplain
java.lang##wrapperClass wrapper class} for values of the primitive
type {@code long}. An object of type {@code Long} contains a
single field whose type is {@code long}.

<p> In addition, this class provides several methods for converting
a {@code long} to a {@code String} and a {@code String} to a {@code
long}, as well as other constants and methods useful when dealing
with a {@code long}.

<p>This is a <a href="{@docRoot}/java.base/java/lang/doc-files/ValueBased.html">value-based</a>
class; programmers should treat instances that are
{@linkplain #equals(Object) equal} as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.

<p>Implementation note: The implementations of the "bit twiddling"
methods (such as {@link #highestOneBit(long) highestOneBit} and
{@link #numberOfTrailingZeros(long) numberOfTrailingZeros}) are
based on material from Henry S. Warren, Jr.'s <cite>Hacker's
Delight</cite>, (Addison Wesley, 2002) and <cite>Hacker's
Delight, Second Edition</cite>, (Pearson Education, 2013).

@author  Lee Boynton
@author  Arthur van Hoff
@author  Josh Bloch
@author  Joseph D. Darcy
@since   1.0

## Long.MIN_VALUE

```java
public static final long MIN_VALUE
```

A constant holding the minimum value a {@code long} can
have, -2<sup>63</sup>.

## Long.MAX_VALUE

```java
public static final long MAX_VALUE
```

A constant holding the maximum value a {@code long} can
have, 2<sup>63</sup>-1.

## Long.TYPE

```java
public static final Class<Long> TYPE
```

The {@code Class} instance representing the primitive type
{@code long}.

@since   1.1

## Long.toString(long, int)

```java
public static String toString(long i, int radix)
```

Returns a string representation of the first argument in the
radix specified by the second argument.

<p>If the radix is smaller than {@code Character.MIN_RADIX}
or larger than {@code Character.MAX_RADIX}, then the radix
{@code 10} is used instead.

<p>If the first argument is negative, the first element of the
result is the ASCII minus sign {@code '-'}
({@code '\u005Cu002d'}). If the first argument is not
negative, no sign character appears in the result.

<p>The remaining characters of the result represent the magnitude
of the first argument. If the magnitude is zero, it is
represented by a single zero character {@code '0'}
({@code '\u005Cu0030'}); otherwise, the first character of
the representation of the magnitude will not be the zero
character.  The following ASCII characters are used as digits:

<blockquote>
  {@code 0123456789abcdefghijklmnopqrstuvwxyz}
</blockquote>

These are {@code '\u005Cu0030'} through
{@code '\u005Cu0039'} and {@code '\u005Cu0061'} through
{@code '\u005Cu007a'}. If {@code radix} is
<var>N</var>, then the first <var>N</var> of these characters
are used as radix-<var>N</var> digits in the order shown. Thus,
the digits for hexadecimal (radix 16) are
{@code 0123456789abcdef}. If uppercase letters are
desired, the {@link java.lang.String#toUpperCase()} method may
be called on the result:

<blockquote>
 {@code Long.toString(n, 16).toUpperCase()}
</blockquote>

@param   i       a {@code long} to be converted to a string.
@param   radix   the radix to use in the string representation.
@return  a string representation of the argument in the specified radix.
@see     java.lang.Character#MAX_RADIX
@see     java.lang.Character#MIN_RADIX

## Long.toUnsignedString(long, int)

```java
public static String toUnsignedString(long i, int radix)
```

Returns a string representation of the first argument as an
unsigned integer value in the radix specified by the second
argument.

<p>If the radix is smaller than {@code Character.MIN_RADIX}
or larger than {@code Character.MAX_RADIX}, then the radix
{@code 10} is used instead.

<p>Note that since the first argument is treated as an unsigned
value, no leading sign character is printed.

<p>If the magnitude is zero, it is represented by a single zero
character {@code '0'} ({@code '\u005Cu0030'}); otherwise,
the first character of the representation of the magnitude will
not be the zero character.

<p>The behavior of radixes and the characters used as digits
are the same as {@link #toString(long, int) toString}.

@param   i       an integer to be converted to an unsigned string.
@param   radix   the radix to use in the string representation.
@return  an unsigned string representation of the argument in the specified radix.
@see     #toString(long, int)
@since 1.8

## Long.toHexString(long)

```java
public static String toHexString(long i)
```

Returns a string representation of the {@code long}
argument as an unsigned integer in base&nbsp;16.

<p>The unsigned {@code long} value is the argument plus
2<sup>64</sup> if the argument is negative; otherwise, it is
equal to the argument.  This value is converted to a string of
ASCII digits in hexadecimal (base&nbsp;16) with no extra
leading {@code 0}s.

<p>The value of the argument can be recovered from the returned
string {@code s} by calling {@link
Long#parseUnsignedLong(String, int) Long.parseUnsignedLong(s,
16)}.

<p>If the unsigned magnitude is zero, it is represented by a
single zero character {@code '0'} ({@code '\u005Cu0030'});
otherwise, the first character of the representation of the
unsigned magnitude will not be the zero character. The
following characters are used as hexadecimal digits:

<blockquote>
 {@code 0123456789abcdef}
</blockquote>

These are the characters {@code '\u005Cu0030'} through
{@code '\u005Cu0039'} and  {@code '\u005Cu0061'} through
{@code '\u005Cu0066'}.  If uppercase letters are desired,
the {@link java.lang.String#toUpperCase()} method may be called
on the result:

<blockquote>
 {@code Long.toHexString(n).toUpperCase()}
</blockquote>

@apiNote
The {@link java.util.HexFormat} class provides formatting and parsing
of byte arrays and primitives to return a string or adding to an {@link Appendable}.
{@code HexFormat} formats and parses uppercase or lowercase hexadecimal characters,
with leading zeros and for byte arrays includes for each byte
a delimiter, prefix, and suffix.

@param   i   a {@code long} to be converted to a string.
@return  the string representation of the unsigned {@code long}
         value represented by the argument in hexadecimal
         (base&nbsp;16).
@see java.util.HexFormat
@see #parseUnsignedLong(String, int)
@see #toUnsignedString(long, int)
@since   1.0.2

## Long.toOctalString(long)

```java
public static String toOctalString(long i)
```

Returns a string representation of the {@code long}
argument as an unsigned integer in base&nbsp;8.

<p>The unsigned {@code long} value is the argument plus
2<sup>64</sup> if the argument is negative; otherwise, it is
equal to the argument.  This value is converted to a string of
ASCII digits in octal (base&nbsp;8) with no extra leading
{@code 0}s.

<p>The value of the argument can be recovered from the returned
string {@code s} by calling {@link
Long#parseUnsignedLong(String, int) Long.parseUnsignedLong(s,
8)}.

<p>If the unsigned magnitude is zero, it is represented by a
single zero character {@code '0'} ({@code '\u005Cu0030'});
otherwise, the first character of the representation of the
unsigned magnitude will not be the zero character. The
following characters are used as octal digits:

<blockquote>
 {@code 01234567}
</blockquote>

These are the characters {@code '\u005Cu0030'} through
{@code '\u005Cu0037'}.

@param   i   a {@code long} to be converted to a string.
@return  the string representation of the unsigned {@code long}
         value represented by the argument in octal (base&nbsp;8).
@see #parseUnsignedLong(String, int)
@see #toUnsignedString(long, int)
@since   1.0.2

## Long.toBinaryString(long)

```java
public static String toBinaryString(long i)
```

Returns a string representation of the {@code long}
argument as an unsigned integer in base&nbsp;2.

<p>The unsigned {@code long} value is the argument plus
2<sup>64</sup> if the argument is negative; otherwise, it is
equal to the argument.  This value is converted to a string of
ASCII digits in binary (base&nbsp;2) with no extra leading
{@code 0}s.

<p>The value of the argument can be recovered from the returned
string {@code s} by calling {@link
Long#parseUnsignedLong(String, int) Long.parseUnsignedLong(s,
2)}.

<p>If the unsigned magnitude is zero, it is represented by a
single zero character {@code '0'} ({@code '\u005Cu0030'});
otherwise, the first character of the representation of the
unsigned magnitude will not be the zero character. The
characters {@code '0'} ({@code '\u005Cu0030'}) and {@code
'1'} ({@code '\u005Cu0031'}) are used as binary digits.

@param   i   a {@code long} to be converted to a string.
@return  the string representation of the unsigned {@code long}
         value represented by the argument in binary (base&nbsp;2).
@see #parseUnsignedLong(String, int)
@see #toUnsignedString(long, int)
@since   1.0.2

## Long.toString(long)

```java
public static String toString(long i)
```

Returns a {@code String} object representing the specified
{@code long}.  The argument is converted to signed decimal
representation and returned as a string, exactly as if the
argument and the radix 10 were given as arguments to the {@link
#toString(long, int)} method.

@param   i   a {@code long} to be converted.
@return  a string representation of the argument in base&nbsp;10.

## Long.toUnsignedString(long)

```java
public static String toUnsignedString(long i)
```

Returns a string representation of the argument as an unsigned
decimal value.

The argument is converted to unsigned decimal representation
and returned as a string exactly as if the argument and radix
10 were given as arguments to the {@link #toUnsignedString(long,
int)} method.

@param   i  an integer to be converted to an unsigned string.
@return  an unsigned string representation of the argument.
@see     #toUnsignedString(long, int)
@since 1.8

## Long.parseLong(String, int)

```java
public static long parseLong(String s, int radix) throws NumberFormatException
```

Parses the string argument as a signed {@code long} in the
radix specified by the second argument. The characters in the
string must all be digits of the specified radix (as determined
by whether {@link java.lang.Character#digit(char, int)} returns
a nonnegative value), except that the first character may be an
ASCII minus sign {@code '-'} ({@code '\u005Cu002D'}) to
indicate a negative value or an ASCII plus sign {@code '+'}
({@code '\u005Cu002B'}) to indicate a positive value. The
resulting {@code long} value is returned.

<p>Note that neither the character {@code L}
({@code '\u005Cu004C'}) nor {@code l}
({@code '\u005Cu006C'}) is permitted to appear at the end
of the string as a type indicator, as would be permitted in
Java programming language source code - except that either
{@code L} or {@code l} may appear as a digit for a
radix greater than or equal to 22.

<p>An exception of type {@code NumberFormatException} is
thrown if any of the following situations occurs:
<ul>

<li>The first argument is {@code null} or is a string of
length zero.

<li>The {@code radix} is either smaller than {@link
java.lang.Character#MIN_RADIX} or larger than {@link
java.lang.Character#MAX_RADIX}.

<li>Any character of the string is not a digit of the specified
radix, except that the first character may be a minus sign
{@code '-'} ({@code '\u005Cu002d'}) or plus sign {@code
'+'} ({@code '\u005Cu002B'}) provided that the string is
longer than length 1.

<li>The value represented by the string is not a value of type
     {@code long}.
</ul>

<p>Examples:
<blockquote><pre>
parseLong("0", 10) returns 0L
parseLong("473", 10) returns 473L
parseLong("+42", 10) returns 42L
parseLong("-0", 10) returns 0L
parseLong("-FF", 16) returns -255L
parseLong("1100110", 2) returns 102L
parseLong("99", 8) throws a NumberFormatException
parseLong("Hazelnut", 10) throws a NumberFormatException
parseLong("Hazelnut", 36) returns 1356099454469L
</pre></blockquote>

@param      s       the {@code String} containing the
                    {@code long} representation to be parsed.
@param      radix   the radix to be used while parsing {@code s}.
@return     the {@code long} represented by the string argument in
            the specified radix.
@throws     NumberFormatException  if the string does not contain a
            parsable {@code long}.

## Long.parseLong(CharSequence, int, int, int)

```java
public static long parseLong(CharSequence s, int beginIndex, int endIndex, int radix) throws NumberFormatException
```

Parses the {@link CharSequence} argument as a signed {@code long} in
the specified {@code radix}, beginning at the specified
{@code beginIndex} and extending to {@code endIndex - 1}.

<p>The method does not take steps to guard against the
{@code CharSequence} being mutated while parsing.

@param      s   the {@code CharSequence} containing the {@code long}
                 representation to be parsed
@param      beginIndex   the beginning index, inclusive.
@param      endIndex     the ending index, exclusive.
@param      radix   the radix to be used while parsing {@code s}.
@return     the signed {@code long} represented by the subsequence in
            the specified radix.
@throws     NullPointerException  if {@code s} is null.
@throws     IndexOutOfBoundsException  if {@code beginIndex} is
            negative, or if {@code beginIndex} is greater than
            {@code endIndex} or if {@code endIndex} is greater than
            {@code s.length()}.
@throws     NumberFormatException  if the {@code CharSequence} does not
            contain a parsable {@code long} in the specified
            {@code radix}, or if {@code radix} is either smaller than
            {@link java.lang.Character#MIN_RADIX} or larger than
            {@link java.lang.Character#MAX_RADIX}.
@since  9

## Long.parseLong(String)

```java
public static long parseLong(String s) throws NumberFormatException
```

Parses the string argument as a signed decimal {@code long}.
The characters in the string must all be decimal digits, except
that the first character may be an ASCII minus sign {@code '-'}
({@code \u005Cu002D'}) to indicate a negative value or an
ASCII plus sign {@code '+'} ({@code '\u005Cu002B'}) to
indicate a positive value. The resulting {@code long} value is
returned, exactly as if the argument and the radix {@code 10}
were given as arguments to the {@link
#parseLong(java.lang.String, int)} method.

<p>Note that neither the character {@code L}
({@code '\u005Cu004C'}) nor {@code l}
({@code '\u005Cu006C'}) is permitted to appear at the end
of the string as a type indicator, as would be permitted in
Java programming language source code.

@param      s   a {@code String} containing the {@code long}
            representation to be parsed
@return     the {@code long} represented by the argument in
            decimal.
@throws     NumberFormatException  if the string does not contain a
            parsable {@code long}.

## Long.parseUnsignedLong(String, int)

```java
public static long parseUnsignedLong(String s, int radix) throws NumberFormatException
```

Parses the string argument as an unsigned {@code long} in the
radix specified by the second argument.  An unsigned integer
maps the values usually associated with negative numbers to
positive numbers larger than {@code MAX_VALUE}.

The characters in the string must all be digits of the
specified radix (as determined by whether {@link
java.lang.Character#digit(char, int)} returns a nonnegative
value), except that the first character may be an ASCII plus
sign {@code '+'} ({@code '\u005Cu002B'}). The resulting
integer value is returned.

<p>An exception of type {@code NumberFormatException} is
thrown if any of the following situations occurs:
<ul>
<li>The first argument is {@code null} or is a string of
length zero.

<li>The radix is either smaller than
{@link java.lang.Character#MIN_RADIX} or
larger than {@link java.lang.Character#MAX_RADIX}.

<li>Any character of the string is not a digit of the specified
radix, except that the first character may be a plus sign
{@code '+'} ({@code '\u005Cu002B'}) provided that the
string is longer than length 1.

<li>The value represented by the string is larger than the
largest unsigned {@code long}, 2<sup>64</sup>-1.

</ul>


@param      s   the {@code String} containing the unsigned integer
                 representation to be parsed
@param      radix   the radix to be used while parsing {@code s}.
@return     the unsigned {@code long} represented by the string
            argument in the specified radix.
@throws     NumberFormatException if the {@code String}
            does not contain a parsable {@code long}.
@since 1.8

## Long.parseUnsignedLong(CharSequence, int, int, int)

```java
public static long parseUnsignedLong(CharSequence s, int beginIndex, int endIndex, int radix) throws NumberFormatException
```

Parses the {@link CharSequence} argument as an unsigned {@code long} in
the specified {@code radix}, beginning at the specified
{@code beginIndex} and extending to {@code endIndex - 1}.

<p>The method does not take steps to guard against the
{@code CharSequence} being mutated while parsing.

@param      s   the {@code CharSequence} containing the unsigned
                {@code long} representation to be parsed
@param      beginIndex   the beginning index, inclusive.
@param      endIndex     the ending index, exclusive.
@param      radix   the radix to be used while parsing {@code s}.
@return     the unsigned {@code long} represented by the subsequence in
            the specified radix.
@throws     NullPointerException  if {@code s} is null.
@throws     IndexOutOfBoundsException  if {@code beginIndex} is
            negative, or if {@code beginIndex} is greater than
            {@code endIndex} or if {@code endIndex} is greater than
            {@code s.length()}.
@throws     NumberFormatException  if the {@code CharSequence} does not
            contain a parsable unsigned {@code long} in the specified
            {@code radix}, or if {@code radix} is either smaller than
            {@link java.lang.Character#MIN_RADIX} or larger than
            {@link java.lang.Character#MAX_RADIX}.
@since  9

## Long.parseUnsignedLong(String)

```java
public static long parseUnsignedLong(String s) throws NumberFormatException
```

Parses the string argument as an unsigned decimal {@code long}. The
characters in the string must all be decimal digits, except
that the first character may be an ASCII plus sign {@code
'+'} ({@code '\u005Cu002B'}). The resulting integer value
is returned, exactly as if the argument and the radix 10 were
given as arguments to the {@link
#parseUnsignedLong(java.lang.String, int)} method.

@param s   a {@code String} containing the unsigned {@code long}
           representation to be parsed
@return    the unsigned {@code long} value represented by the decimal string argument
@throws    NumberFormatException  if the string does not contain a
           parsable unsigned integer.
@since 1.8

## Long.valueOf(String, int)

```java
public static Long valueOf(String s, int radix) throws NumberFormatException
```

Returns a {@code Long} object holding the value
extracted from the specified {@code String} when parsed
with the radix given by the second argument.  The first
argument is interpreted as representing a signed
{@code long} in the radix specified by the second
argument, exactly as if the arguments were given to the {@link
#parseLong(java.lang.String, int)} method. The result is a
{@code Long} object that represents the {@code long}
value specified by the string.

<p>In other words, this method returns a {@code Long} object equal
to the value of:

<blockquote>
 {@code Long.valueOf(Long.parseLong(s, radix))}
</blockquote>

@param      s       the string to be parsed
@param      radix   the radix to be used in interpreting {@code s}
@return     a {@code Long} object holding the value
            represented by the string argument in the specified
            radix.
@throws     NumberFormatException  If the {@code String} does not
            contain a parsable {@code long}.

## Long.valueOf(String)

```java
public static Long valueOf(String s) throws NumberFormatException
```

Returns a {@code Long} object holding the value
of the specified {@code String}. The argument is
interpreted as representing a signed decimal {@code long},
exactly as if the argument were given to the {@link
#parseLong(java.lang.String)} method. The result is a
{@code Long} object that represents the integer value
specified by the string.

<p>In other words, this method returns a {@code Long} object
equal to the value of:

<blockquote>
 {@code Long.valueOf(Long.parseLong(s))}
</blockquote>

@param      s   the string to be parsed.
@return     a {@code Long} object holding the value
            represented by the string argument.
@throws     NumberFormatException  If the string cannot be parsed
            as a {@code long}.

## Long.valueOf(long)

```java
public static Long valueOf(long l)
```

Returns a {@code Long} instance representing the specified
{@code long} value.
If a new {@code Long} instance is not required, this method
should generally be used in preference to the constructor
{@link #Long(long)}, as this method is likely to yield
significantly better space and time performance by caching
frequently requested values.

This method will always cache values in the range -128 to 127,
inclusive, and may cache other values outside of this range.

@param  l a long value.
@return a {@code Long} instance representing {@code l}.
@since  1.5

## Long.decode(String)

```java
public static Long decode(String nm) throws NumberFormatException
```

Decodes a {@code String} into a {@code Long}.
Accepts decimal, hexadecimal, and octal numbers given by the
following grammar:

<blockquote>
<dl>
<dt><i>DecodableString:</i>
<dd><i>Sign<sub>opt</sub> DecimalNumeral</i>
<dd><i>Sign<sub>opt</sub></i> {@code 0x} <i>HexDigits</i>
<dd><i>Sign<sub>opt</sub></i> {@code 0X} <i>HexDigits</i>
<dd><i>Sign<sub>opt</sub></i> {@code #} <i>HexDigits</i>
<dd><i>Sign<sub>opt</sub></i> {@code 0} <i>OctalDigits</i>

<dt><i>Sign:</i>
<dd>{@code -}
<dd>{@code +}
</dl>
</blockquote>

<i>DecimalNumeral</i>, <i>HexDigits</i>, and <i>OctalDigits</i>
are as defined in section {@jls 3.10.1} of
<cite>The Java Language Specification</cite>,
except that underscores are not accepted between digits.

<p>The sequence of characters following an optional
sign and/or radix specifier ("{@code 0x}", "{@code 0X}",
"{@code #}", or leading zero) is parsed as by the {@code
Long.parseLong} method with the indicated radix (10, 16, or 8).
This sequence of characters must represent a positive value or
a {@link NumberFormatException} will be thrown.  The result is
negated if first character of the specified {@code String} is
the minus sign.  No whitespace characters are permitted in the
{@code String}.

@param     nm the {@code String} to decode.
@return    a {@code Long} object holding the {@code long}
           value represented by {@code nm}
@throws    NumberFormatException  if the {@code String} does not
           contain a parsable {@code long}.
@see java.lang.Long#parseLong(String, int)
@since 1.2

## Long.Long(long)

```java
public Long(long value)
```

Constructs a newly allocated {@code Long} object that
represents the specified {@code long} argument.

@param   value   the value to be represented by the
         {@code Long} object.

@deprecated
It is rarely appropriate to use this constructor. The static factory
{@link #valueOf(long)} is generally a better choice, as it is
likely to yield significantly better space and time performance.

## Long.Long(String)

```java
public Long(String s) throws NumberFormatException
```

Constructs a newly allocated {@code Long} object that
represents the {@code long} value indicated by the
{@code String} parameter. The string is converted to a
{@code long} value in exactly the manner used by the
{@code parseLong} method for radix 10.

@param      s   the {@code String} to be converted to a
            {@code Long}.
@throws     NumberFormatException  if the {@code String} does not
            contain a parsable {@code long}.

@deprecated
It is rarely appropriate to use this constructor.
Use {@link #parseLong(String)} to convert a string to a
{@code long} primitive, or use {@link #valueOf(String)}
to convert a string to a {@code Long} object.

## Long.byteValue()

```java
public byte byteValue()
```

Returns the value of this {@code Long} as a {@code byte} after
a narrowing primitive conversion.
@jls 5.1.3 Narrowing Primitive Conversion

## Long.shortValue()

```java
public short shortValue()
```

Returns the value of this {@code Long} as a {@code short} after
a narrowing primitive conversion.
@jls 5.1.3 Narrowing Primitive Conversion

## Long.intValue()

```java
public int intValue()
```

Returns the value of this {@code Long} as an {@code int} after
a narrowing primitive conversion.
@jls 5.1.3 Narrowing Primitive Conversion

## Long.longValue()

```java
public long longValue()
```

Returns the value of this {@code Long} as a
{@code long} value.

## Long.floatValue()

```java
public float floatValue()
```

Returns the value of this {@code Long} as a {@code float} after
a widening primitive conversion.
@jls 5.1.2 Widening Primitive Conversion

## Long.doubleValue()

```java
public double doubleValue()
```

Returns the value of this {@code Long} as a {@code double}
after a widening primitive conversion.
@jls 5.1.2 Widening Primitive Conversion

## Long.toString()

```java
public String toString()
```

Returns a {@code String} object representing this
{@code Long}'s value.  The value is converted to signed
decimal representation and returned as a string, exactly as if
the {@code long} value were given as an argument to the
{@link java.lang.Long#toString(long)} method.

@return  a string representation of the value of this object in
         base&nbsp;10.

## Long.hashCode()

```java
public int hashCode()
```

Returns a hash code for this {@code Long}. The result is
the exclusive OR of the two halves of the primitive
{@code long} value held by this {@code Long}
object. That is, the hashcode is the value of the expression:

<blockquote>
 {@code (int)(this.longValue()^(this.longValue()>>>32))}
</blockquote>

@return  a hash code value for this object.

## Long.hashCode(long)

```java
public static int hashCode(long value)
```

Returns a hash code for a {@code long} value; compatible with
{@code Long.hashCode()}.

@param value the value to hash
@return a hash code value for a {@code long} value.
@since 1.8

## Long.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this object to the specified object.  The result is
{@code true} if and only if the argument is not
{@code null} and is a {@code Long} object that
contains the same {@code long} value as this object.

@param   obj   the object to compare with.
@return  {@code true} if the objects are the same;
         {@code false} otherwise.

## Long.getLong(String)

```java
public static Long getLong(String nm)
```

Determines the {@code long} value of the system property
with the specified name.

<p>The first argument is treated as the name of a system
property.  System properties are accessible through the {@link
java.lang.System#getProperty(java.lang.String)} method. The
string value of this property is then interpreted as a {@code
long} value using the grammar supported by {@link Long#decode decode}
and a {@code Long} object representing this value is returned.

<p>If there is no property with the specified name, if the
specified name is empty or {@code null}, or if the property
does not have the correct numeric format, then {@code null} is
returned.

<p>In other words, this method returns a {@code Long} object
equal to the value of:

<blockquote>
 {@code getLong(nm, null)}
</blockquote>

@param   nm   property name.
@return  the {@code Long} value of the property.
@see     java.lang.System#getProperty(java.lang.String)
@see     java.lang.System#getProperty(java.lang.String, java.lang.String)

## Long.getLong(String, long)

```java
public static Long getLong(String nm, long val)
```

Determines the {@code long} value of the system property
with the specified name.

<p>The first argument is treated as the name of a system
property.  System properties are accessible through the {@link
java.lang.System#getProperty(java.lang.String)} method. The
string value of this property is then interpreted as a {@code
long} value using the grammar supported by {@link Long#decode decode}
and a {@code Long} object representing this value is returned.

<p>The second argument is the default value. A {@code Long} object
that represents the value of the second argument is returned if there
is no property of the specified name, if the property does not have
the correct numeric format, or if the specified name is empty or null.

<p>In other words, this method returns a {@code Long} object equal
to the value of:

<blockquote>
 {@code getLong(nm, Long.valueOf(val))}
</blockquote>

but in practice it may be implemented in a manner such as:

<blockquote><pre>
Long result = getLong(nm, null);
return (result == null) ? Long.valueOf(val) : result;
</pre></blockquote>

to avoid the unnecessary allocation of a {@code Long} object when
the default value is not needed.

@param   nm    property name.
@param   val   default value.
@return  the {@code Long} value of the property.
@see     java.lang.System#getProperty(java.lang.String)
@see     java.lang.System#getProperty(java.lang.String, java.lang.String)

## Long.getLong(String, Long)

```java
public static Long getLong(String nm, Long val)
```

Returns the {@code long} value of the system property with
the specified name.  The first argument is treated as the name
of a system property.  System properties are accessible through
the {@link java.lang.System#getProperty(java.lang.String)}
method. The string value of this property is then interpreted
as a {@code long} value, as per the
{@link Long#decode decode} method, and a {@code Long} object
representing this value is returned; in summary:

<ul>
<li>If the property value begins with the two ASCII characters
{@code 0x} or the ASCII character {@code #}, not followed by
a minus sign, then the rest of it is parsed as a hexadecimal integer
exactly as for the method {@link #valueOf(java.lang.String, int)}
with radix 16.
<li>If the property value begins with the ASCII character
{@code 0} followed by another character, it is parsed as
an octal integer exactly as by the method {@link
#valueOf(java.lang.String, int)} with radix 8.
<li>Otherwise the property value is parsed as a decimal
integer exactly as by the method
{@link #valueOf(java.lang.String, int)} with radix 10.
</ul>

<p>Note that, in every case, neither {@code L}
({@code '\u005Cu004C'}) nor {@code l}
({@code '\u005Cu006C'}) is permitted to appear at the end
of the property value as a type indicator, as would be
permitted in Java programming language source code.

<p>The second argument is the default value. The default value is
returned if there is no property of the specified name, if the
property does not have the correct numeric format, or if the
specified name is empty or {@code null}.

@param   nm   property name.
@param   val   default value.
@return  the {@code Long} value of the property.
@see     System#getProperty(java.lang.String)
@see     System#getProperty(java.lang.String, java.lang.String)

## Long.compareTo(Long)

```java
public int compareTo(Long anotherLong)
```

Compares two {@code Long} objects numerically.

@param   anotherLong   the {@code Long} to be compared.
@return  the value {@code 0} if this {@code Long} is
         equal to the argument {@code Long}; a value less than
         {@code 0} if this {@code Long} is numerically less
         than the argument {@code Long}; and a value greater
         than {@code 0} if this {@code Long} is numerically
          greater than the argument {@code Long} (signed
          comparison).
@since   1.2

## Long.compare(long, long)

```java
public static int compare(long x, long y)
```

Compares two {@code long} values numerically.
The value returned is identical to what would be returned by:
<pre>
   Long.valueOf(x).compareTo(Long.valueOf(y))
</pre>

@param  x the first {@code long} to compare
@param  y the second {@code long} to compare
@return the value {@code 0} if {@code x == y};
        a value less than {@code 0} if {@code x < y}; and
        a value greater than {@code 0} if {@code x > y}
@since 1.7

## Long.compareUnsigned(long, long)

```java
public static int compareUnsigned(long x, long y)
```

Compares two {@code long} values numerically treating the values
as unsigned.

@param  x the first {@code long} to compare
@param  y the second {@code long} to compare
@return the value {@code 0} if {@code x == y}; a value less
        than {@code 0} if {@code x < y} as unsigned values; and
        a value greater than {@code 0} if {@code x > y} as
        unsigned values
@since 1.8

## Long.divideUnsigned(long, long)

```java
public static long divideUnsigned(long dividend, long divisor)
```

Returns the unsigned quotient of dividing the first argument by
the second where each argument and the result is interpreted as
an unsigned value.

<p>Note that in two's complement arithmetic, the three other
basic arithmetic operations of add, subtract, and multiply are
bit-wise identical if the two operands are regarded as both
being signed or both being unsigned.  Therefore separate {@code
addUnsigned}, etc. methods are not provided.

@param dividend the value to be divided
@param divisor the value doing the dividing
@return the unsigned quotient of the first argument divided by
the second argument
@see #remainderUnsigned
@since 1.8

## Long.remainderUnsigned(long, long)

```java
public static long remainderUnsigned(long dividend, long divisor)
```

Returns the unsigned remainder from dividing the first argument
by the second where each argument and the result is interpreted
as an unsigned value.

@param dividend the value to be divided
@param divisor the value doing the dividing
@return the unsigned remainder of the first argument divided by
the second argument
@see #divideUnsigned
@since 1.8

## Long.SIZE

```java
public static final int SIZE
```

The number of bits used to represent a {@code long} value in two's
complement binary form.

@since 1.5

## Long.BYTES

```java
public static final int BYTES
```

The number of bytes used to represent a {@code long} value in two's
complement binary form.

@since 1.8

## Long.highestOneBit(long)

```java
public static long highestOneBit(long i)
```

Returns a {@code long} value with at most a single one-bit, in the
position of the highest-order ("leftmost") one-bit in the specified
{@code long} value.  Returns zero if the specified value has no
one-bits in its two's complement binary representation, that is, if it
is equal to zero.

@param i the value whose highest one bit is to be computed
@return a {@code long} value with a single one-bit, in the position
    of the highest-order one-bit in the specified value, or zero if
    the specified value is itself equal to zero.
@since 1.5

## Long.lowestOneBit(long)

```java
public static long lowestOneBit(long i)
```

Returns a {@code long} value with at most a single one-bit, in the
position of the lowest-order ("rightmost") one-bit in the specified
{@code long} value.  Returns zero if the specified value has no
one-bits in its two's complement binary representation, that is, if it
is equal to zero.

@param i the value whose lowest one bit is to be computed
@return a {@code long} value with a single one-bit, in the position
    of the lowest-order one-bit in the specified value, or zero if
    the specified value is itself equal to zero.
@since 1.5

## Long.numberOfLeadingZeros(long)

```java
public static int numberOfLeadingZeros(long i)
```

Returns the number of zero bits preceding the highest-order
("leftmost") one-bit in the two's complement binary representation
of the specified {@code long} value.  Returns 64 if the
specified value has no one-bits in its two's complement representation,
in other words if it is equal to zero.

<p>Note that this method is closely related to the logarithm base 2.
For all positive {@code long} values x:
<ul>
<li>floor(log<sub>2</sub>(x)) = {@code 63 - numberOfLeadingZeros(x)}
<li>ceil(log<sub>2</sub>(x)) = {@code 64 - numberOfLeadingZeros(x - 1)}
</ul>

@param i the value whose number of leading zeros is to be computed
@return the number of zero bits preceding the highest-order
    ("leftmost") one-bit in the two's complement binary representation
    of the specified {@code long} value, or 64 if the value
    is equal to zero.
@since 1.5

## Long.numberOfTrailingZeros(long)

```java
public static int numberOfTrailingZeros(long i)
```

Returns the number of zero bits following the lowest-order ("rightmost")
one-bit in the two's complement binary representation of the specified
{@code long} value.  Returns 64 if the specified value has no
one-bits in its two's complement representation, in other words if it is
equal to zero.

@param i the value whose number of trailing zeros is to be computed
@return the number of zero bits following the lowest-order ("rightmost")
    one-bit in the two's complement binary representation of the
    specified {@code long} value, or 64 if the value is equal
    to zero.
@since 1.5

## Long.bitCount(long)

```java
public static int bitCount(long i)
```

Returns the number of one-bits in the two's complement binary
representation of the specified {@code long} value.  This function is
sometimes referred to as the <i>population count</i>.

@param i the value whose bits are to be counted
@return the number of one-bits in the two's complement binary
    representation of the specified {@code long} value.
@since 1.5

## Long.rotateLeft(long, int)

```java
public static long rotateLeft(long i, int distance)
```

Returns the value obtained by rotating the two's complement binary
representation of the specified {@code long} value left by the
specified number of bits.  (Bits shifted out of the left hand, or
high-order, side reenter on the right, or low-order.)

<p>Note that left rotation with a negative distance is equivalent to
right rotation: {@code rotateLeft(val, -distance) == rotateRight(val,
distance)}.  Note also that rotation by any multiple of 64 is a
no-op, so all but the last six bits of the rotation distance can be
ignored, even if the distance is negative: {@code rotateLeft(val,
distance) == rotateLeft(val, distance & 0x3F)}.

@param i the value whose bits are to be rotated left
@param distance the number of bit positions to rotate left
@return the value obtained by rotating the two's complement binary
    representation of the specified {@code long} value left by the
    specified number of bits.
@since 1.5

## Long.rotateRight(long, int)

```java
public static long rotateRight(long i, int distance)
```

Returns the value obtained by rotating the two's complement binary
representation of the specified {@code long} value right by the
specified number of bits.  (Bits shifted out of the right hand, or
low-order, side reenter on the left, or high-order.)

<p>Note that right rotation with a negative distance is equivalent to
left rotation: {@code rotateRight(val, -distance) == rotateLeft(val,
distance)}.  Note also that rotation by any multiple of 64 is a
no-op, so all but the last six bits of the rotation distance can be
ignored, even if the distance is negative: {@code rotateRight(val,
distance) == rotateRight(val, distance & 0x3F)}.

@param i the value whose bits are to be rotated right
@param distance the number of bit positions to rotate right
@return the value obtained by rotating the two's complement binary
    representation of the specified {@code long} value right by the
    specified number of bits.
@since 1.5

## Long.reverse(long)

```java
public static long reverse(long i)
```

Returns the value obtained by reversing the order of the bits in the
two's complement binary representation of the specified {@code long}
value.

@param i the value to be reversed
@return the value obtained by reversing order of the bits in the
    specified {@code long} value.
@since 1.5

## Long.compress(long, long)

```java
public static long compress(long i, long mask)
```

Returns the value obtained by compressing the bits of the
specified {@code long} value, {@code i}, in accordance with
the specified bit mask.
<p>
For each one-bit value {@code mb} of the mask, from least
significant to most significant, the bit value of {@code i} at
the same bit location as {@code mb} is assigned to the compressed
value contiguously starting from the least significant bit location.
All the upper remaining bits of the compressed value are set
to zero.

@apiNote
Consider the simple case of compressing the digits of a hexadecimal
value:
{@snippet lang="java" :
// Compressing drink to food
compress(0xCAFEBABEL, 0xFF00FFF0L) == 0xCABABL
}
Starting from the least significant hexadecimal digit at position 0
from the right, the mask {@code 0xFF00FFF0} selects hexadecimal digits
at positions 1, 2, 3, 6 and 7 of {@code 0xCAFEBABE}. The selected digits
occur in the resulting compressed value contiguously from digit position
0 in the same order.
<p>
The following identities all return {@code true} and are helpful to
understand the behaviour of {@code compress}:
{@snippet lang="java" :
// Returns 1 if the bit at position n is one
compress(x, 1L << n) == (x >> n & 1)

// Logical shift right
compress(x, -1L << n) == x >>> n

// Any bits not covered by the mask are ignored
compress(x, m) == compress(x & m, m)

// Compressing a value by itself
compress(m, m) == (m == -1 || m == 0) ? m : (1L << bitCount(m)) - 1

// Expanding then compressing with the same mask
compress(expand(x, m), m) == x & compress(m, m)
}
<p>
The Sheep And Goats (SAG) operation (see Hacker's Delight, Second Edition, section 7.7)
can be implemented as follows:
{@snippet lang="java" :
long compressLeft(long i, long mask) {
    // This implementation follows the description in Hacker's Delight which
    // is informative. A more optimal implementation is:
    //   Long.compress(i, mask) << -Long.bitCount(mask)
    return Long.reverse(
        Long.compress(Long.reverse(i), Long.reverse(mask)));
}

long sag(long i, long mask) {
    return compressLeft(i, mask) | Long.compress(i, ~mask);
}

// Separate the sheep from the goats
sag(0x00000000_CAFEBABEL, 0xFFFFFFFF_FF00FFF0L) == 0x00000000_CABABFEEL
}

@param i the value whose bits are to be compressed
@param mask the bit mask
@return the compressed value
@see #expand
@since 19

## Long.expand(long, long)

```java
public static long expand(long i, long mask)
```

Returns the value obtained by expanding the bits of the
specified {@code long} value, {@code i}, in accordance with
the specified bit mask.
<p>
For each one-bit value {@code mb} of the mask, from least
significant to most significant, the next contiguous bit value
of {@code i} starting at the least significant bit is assigned
to the expanded value at the same bit location as {@code mb}.
All other remaining bits of the expanded value are set to zero.

@apiNote
Consider the simple case of expanding the digits of a hexadecimal
value:
{@snippet lang="java" :
expand(0x0000CABABL, 0xFF00FFF0L) == 0xCA00BAB0L
}
Starting from the least significant hexadecimal digit at position 0
from the right, the mask {@code 0xFF00FFF0} selects the first five
hexadecimal digits of {@code 0x0000CABAB}. The selected digits occur
in the resulting expanded value in order at positions 1, 2, 3, 6, and 7.
<p>
The following identities all return {@code true} and are helpful to
understand the behaviour of {@code expand}:
{@snippet lang="java" :
// Logically shift right the bit at position 0
expand(x, 1L << n) == (x & 1) << n

// Logically shift right
expand(x, -1L << n) == x << n

// Expanding all bits returns the mask
expand(-1L, m) == m

// Any bits not covered by the mask are ignored
expand(x, m) == expand(x, m) & m

// Compressing then expanding with the same mask
expand(compress(x, m), m) == x & m
}
<p>
The select operation for determining the position of the one-bit with
index {@code n} in a {@code long} value can be implemented as follows:
{@snippet lang="java" :
long select(long i, long n) {
    // the one-bit in i (the mask) with index n
    long nthBit = Long.expand(1L << n, i);
    // the bit position of the one-bit with index n
    return Long.numberOfTrailingZeros(nthBit);
}

// The one-bit with index 0 is at bit position 1
select(0b10101010_10101010, 0) == 1
// The one-bit with index 3 is at bit position 7
select(0b10101010_10101010, 3) == 7
}

@param i the value whose bits are to be expanded
@param mask the bit mask
@return the expanded value
@see #compress
@since 19

## Long.signum(long)

```java
public static int signum(long i)
```

Returns the signum function of the specified {@code long} value.  (The
return value is -1 if the specified value is negative; 0 if the
specified value is zero; and 1 if the specified value is positive.)

@param i the value whose signum is to be computed
@return the signum function of the specified {@code long} value.
@since 1.5

## Long.reverseBytes(long)

```java
public static long reverseBytes(long i)
```

Returns the value obtained by reversing the order of the bytes in the
two's complement representation of the specified {@code long} value.

@param i the value whose bytes are to be reversed
@return the value obtained by reversing the bytes in the specified
    {@code long} value.
@since 1.5

## Long.sum(long, long)

```java
public static long sum(long a, long b)
```

Adds two {@code long} values together as per the + operator.

@param a the first operand
@param b the second operand
@return the sum of {@code a} and {@code b}
@see java.util.function.BinaryOperator
@since 1.8

## Long.max(long, long)

```java
public static long max(long a, long b)
```

Returns the greater of two {@code long} values
as if by calling {@link Math#max(long, long) Math.max}.

@param a the first operand
@param b the second operand
@return the greater of {@code a} and {@code b}
@see java.util.function.BinaryOperator
@since 1.8

## Long.min(long, long)

```java
public static long min(long a, long b)
```

Returns the smaller of two {@code long} values
as if by calling {@link Math#min(long, long) Math.min}.

@param a the first operand
@param b the second operand
@return the smaller of {@code a} and {@code b}
@see java.util.function.BinaryOperator
@since 1.8

## Long.describeConstable()

```java
public Optional<Long> describeConstable()
```

Returns an {@link Optional} containing the nominal descriptor for this
instance, which is the instance itself.

@return an {@link Optional} describing the {@linkplain Long} instance
@since 12

## Long.resolveConstantDesc(MethodHandles.Lookup)

```java
public Long resolveConstantDesc(MethodHandles.Lookup lookup)
```

Resolves this instance as a {@link ConstantDesc}, the result of which is
the instance itself.

@param lookup ignored
@return the {@linkplain Long} instance
@since 12