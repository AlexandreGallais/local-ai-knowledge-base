# HexFormat class (java.util)

```java
public final class HexFormat
```

{@code HexFormat} converts between bytes and chars and hex-encoded strings which may include
additional formatting markup such as prefixes, suffixes, and delimiters.
<p>
There are two factories of {@code HexFormat} with preset parameters {@link #of()} and
{@link #ofDelimiter(String) ofDelimiter(delimiter)}. For other parameter combinations
the {@code withXXX} methods return copies of {@code HexFormat} modified
{@link #withPrefix(String)}, {@link #withSuffix(String)}, {@link #withDelimiter(String)}
or choice of {@link #withUpperCase()} or {@link #withLowerCase()} parameters.
<p>
For primitive to hexadecimal string conversions the {@code toHexDigits}
methods include {@link #toHexDigits(byte)}, {@link #toHexDigits(int)}, and
{@link #toHexDigits(long)}, etc. The default is to use lowercase characters {@code "0-9","a-f"}.
For conversions producing uppercase hexadecimal the characters are {@code "0-9","A-F"}.
Only the {@link HexFormat#isUpperCase() HexFormat.isUpperCase()} parameter is
considered; the delimiter, prefix and suffix are not used.

<p>
For hexadecimal string to primitive conversions the {@code fromHexDigits}
methods include {@link #fromHexDigits(CharSequence) fromHexDigits(string)},
{@link #fromHexDigitsToLong(CharSequence) fromHexDigitsToLong(string)}, and
{@link #fromHexDigit(int) fromHexDigit(int)} converts a single character or codepoint.
For conversions from hexadecimal characters the digits and uppercase and lowercase
characters in {@code "0-9", "a-f", and "A-F"} are converted to corresponding values
{@code 0-15}. The delimiter, prefix, suffix, and uppercase parameters are not used.

<p>
For byte array to formatted hexadecimal string conversions
the {@code formatHex} methods include {@link #formatHex(byte[]) formatHex(byte[])}
and {@link #formatHex(Appendable, byte[]) formatHex(Appendable, byte[])}.
The formatted output is a string or is appended to an {@link Appendable} such as
{@link StringBuilder} or {@link java.io.PrintStream}.
Each byte value is formatted as the prefix, two hexadecimal characters from the
uppercase or lowercase digits, and the suffix.
A delimiter follows each formatted value, except the last.
For conversions producing uppercase hexadecimal strings use {@link #withUpperCase()}.

<p>
For formatted hexadecimal string to byte array conversions the
{@code parseHex} methods include {@link #parseHex(CharSequence) parseHex(CharSequence)} and
{@link #parseHex(char[], int, int) parseHex(char[], offset, length)}.
Each byte value is parsed from the prefix, two case insensitive hexadecimal characters,
and the suffix. A delimiter follows each formatted value, except the last.

@apiNote
For example, an individual byte is converted to a string of hexadecimal digits using
{@link HexFormat#toHexDigits(int) toHexDigits(int)} and converted from a string to a
primitive value using {@link HexFormat#fromHexDigits(CharSequence) fromHexDigits(string)}.
<pre>{@code
    HexFormat hex = HexFormat.of();
    byte b = 127;
    String byteStr = hex.toHexDigits(b);

    byte byteVal = (byte)hex.fromHexDigits(byteStr);
    assert(byteStr.equals("7f"));
    assert(b == byteVal);

    // The hexadecimal digits are: "7f"
}</pre>
<p>
For a comma ({@code ", "}) separated format with a prefix ({@code "#"})
using lowercase hex digits the {@code HexFormat} is:
<pre>{@code
    HexFormat commaFormat = HexFormat.ofDelimiter(", ").withPrefix("#");
    byte[] bytes = {0, 1, 2, 3, 124, 125, 126, 127};
    String str = commaFormat.formatHex(bytes);

    byte[] parsed = commaFormat.parseHex(str);
    assert(Arrays.equals(bytes, parsed));

    // The formatted string is: "#00, #01, #02, #03, #7c, #7d, #7e, #7f"
}</pre>
<p>
For a fingerprint of byte values that uses the delimiter colon ({@code ":"})
and uppercase characters the {@code HexFormat} is:
<pre>{@code
    HexFormat formatFingerprint = HexFormat.ofDelimiter(":").withUpperCase();
    byte[] bytes = {0, 1, 2, 3, 124, 125, 126, 127};
    String str = formatFingerprint.formatHex(bytes);
    byte[] parsed = formatFingerprint.parseHex(str);
    assert(Arrays.equals(bytes, parsed));

    // The formatted string is: "00:01:02:03:7C:7D:7E:7F"
}</pre>

<p>
This is a <a href="{@docRoot}/java.base/java/lang/doc-files/ValueBased.html">value-based</a>
class; use of identity-sensitive operations (including reference equality
({@code ==}), identity hash code, or synchronization) on instances of
{@code HexFormat} may have unpredictable results and should be avoided.
The {@code equals} method should be used for comparisons.
<p>
This class is immutable and thread-safe.
<p>
Unless otherwise noted, passing a null argument to any method will cause a
{@link java.lang.NullPointerException NullPointerException} to be thrown.

@since 17

## HexFormat.of()

```java
public static HexFormat of()
```

Returns a hexadecimal formatter with no delimiter and lowercase characters.
The delimiter, prefix, and suffix are empty.
The methods {@link #withDelimiter(String) withDelimiter},
{@link #withUpperCase() withUpperCase}, {@link #withLowerCase() withLowerCase},
{@link #withPrefix(String) withPrefix}, and {@link #withSuffix(String) withSuffix}
return copies of formatters with new parameters.

@return a hexadecimal formatter with no delimiter and lowercase characters

## HexFormat.ofDelimiter(String)

```java
public static HexFormat ofDelimiter(String delimiter)
```

Returns a hexadecimal formatter with the delimiter and lowercase characters.
The prefix and suffix are empty.
The methods {@link #withDelimiter(String) withDelimiter},
{@link #withUpperCase() withUpperCase}, {@link #withLowerCase() withLowerCase},
{@link #withPrefix(String) withPrefix}, and {@link #withSuffix(String) withSuffix}
return copies of formatters with new parameters.

@param delimiter a delimiter, non-null, may be empty
@return a {@link HexFormat} with the delimiter and lowercase characters

## HexFormat.withDelimiter(String)

```java
public HexFormat withDelimiter(String delimiter)
```

Returns a copy of this {@code HexFormat} with the delimiter.
@param delimiter the delimiter, non-null, may be empty
@return a copy of this {@code HexFormat} with the delimiter

## HexFormat.withPrefix(String)

```java
public HexFormat withPrefix(String prefix)
```

Returns a copy of this {@code HexFormat} with the prefix.

@param prefix a prefix, non-null, may be empty
@return a copy of this {@code HexFormat} with the prefix

## HexFormat.withSuffix(String)

```java
public HexFormat withSuffix(String suffix)
```

Returns a copy of this {@code HexFormat} with the suffix.

@param suffix a suffix, non-null, may be empty
@return a copy of this {@code HexFormat} with the suffix

## HexFormat.withUpperCase()

```java
public HexFormat withUpperCase()
```

Returns a copy of this {@code HexFormat} to use uppercase hexadecimal characters.
The uppercase hexadecimal characters are {@code "0-9", "A-F"}.

@return a copy of this {@code HexFormat} with uppercase hexadecimal characters

## HexFormat.withLowerCase()

```java
public HexFormat withLowerCase()
```

Returns a copy of this {@code HexFormat} to use lowercase hexadecimal characters.
The lowercase hexadecimal characters are {@code "0-9", "a-f"}.

@return a copy of this {@code HexFormat} with lowercase hexadecimal characters

## HexFormat.delimiter()

```java
public String delimiter()
```

Returns the delimiter between hexadecimal values in formatted hexadecimal strings.

@return the delimiter, non-null, may be empty {@code ""}

## HexFormat.prefix()

```java
public String prefix()
```

Returns the prefix used for each hexadecimal value in formatted hexadecimal strings.

@return the prefix, non-null, may be empty {@code ""}

## HexFormat.suffix()

```java
public String suffix()
```

Returns the suffix used for each hexadecimal value in formatted hexadecimal strings.

@return the suffix, non-null, may be empty {@code ""}

## HexFormat.isUpperCase()

```java
public boolean isUpperCase()
```

Returns {@code true} if the hexadecimal digits are uppercase,
otherwise {@code false}.

@return {@code true} if the hexadecimal digits are uppercase,
         otherwise {@code false}

## HexFormat.formatHex(byte[])

```java
public String formatHex(byte[] bytes)
```

Returns a hexadecimal string formatted from a byte array.
Each byte value is formatted as the prefix, two hexadecimal characters
{@linkplain #isUpperCase selected from} uppercase or lowercase digits, and the suffix.
A delimiter follows each formatted value, except the last.

The behavior is equivalent to
{@link #formatHex(byte[], int, int) formatHex(bytes, 0, bytes.length))}.

@param bytes a non-null array of bytes
@return a string hexadecimal formatting of the byte array

## HexFormat.formatHex(byte[], int, int)

```java
public String formatHex(byte[] bytes, int fromIndex, int toIndex)
```

Returns a hexadecimal string formatted from a byte array range.
Each byte value is formatted as the prefix, two hexadecimal characters
{@linkplain #isUpperCase selected from} uppercase or lowercase digits, and the suffix.
A delimiter follows each formatted value, except the last.

@param bytes a non-null array of bytes
@param fromIndex the initial index of the range, inclusive
@param toIndex the final index of the range, exclusive
@return a string hexadecimal formatting each byte of the array range
@throws IndexOutOfBoundsException if the array range is out of bounds

## HexFormat.formatHex(A, byte[])

```java
public <A extends Appendable> A formatHex(A out, byte[] bytes)
```

Appends formatted hexadecimal strings from a byte array to the {@link Appendable}.
Each byte value is formatted as the prefix, two hexadecimal characters
{@linkplain #isUpperCase selected from} uppercase or lowercase digits, and the suffix.
A delimiter follows each formatted value, except the last.
The formatted hexadecimal strings are appended in zero or more calls to the {@link Appendable} methods.

@param <A> The type of {@code Appendable}
@param out an {@code Appendable}, non-null
@param bytes a byte array
@return the {@code Appendable}
@throws UncheckedIOException if an I/O exception occurs appending to the output

## HexFormat.formatHex(A, byte[], int, int)

```java
public <A extends Appendable> A formatHex(A out, byte[] bytes, int fromIndex, int toIndex)
```

Appends formatted hexadecimal strings from a byte array range to the {@link Appendable}.
Each byte value is formatted as the prefix, two hexadecimal characters
{@linkplain #isUpperCase selected from} uppercase or lowercase digits, and the suffix.
A delimiter follows each formatted value, except the last.
The formatted hexadecimal strings are appended in zero or more calls to the {@link Appendable} methods.

@param <A> The type of {@code Appendable}
@param out an {@code Appendable}, non-null
@param bytes a byte array, non-null
@param fromIndex the initial index of the range, inclusive
@param toIndex the final index of the range, exclusive.
@return the {@code Appendable}
@throws IndexOutOfBoundsException if the array range is out of bounds
@throws UncheckedIOException if an I/O exception occurs appending to the output

## HexFormat.parseHex(CharSequence)

```java
public byte[] parseHex(CharSequence string)
```

Returns a byte array containing hexadecimal values parsed from the string.

Each byte value is parsed from the prefix, two case insensitive hexadecimal characters,
and the suffix. A delimiter follows each formatted value, except the last.
The delimiters, prefixes, and suffixes strings must be present; they may be empty strings.
A valid string consists only of the above format.

@param string a string containing the byte values with prefix, hexadecimal digits, suffix,
           and delimiters
@return a byte array with the values parsed from the string
@throws IllegalArgumentException if the prefix or suffix is not present for each byte value,
         the byte values are not hexadecimal characters, or if the delimiter is not present
         after all but the last byte value

## HexFormat.parseHex(CharSequence, int, int)

```java
public byte[] parseHex(CharSequence string, int fromIndex, int toIndex)
```

Returns a byte array containing hexadecimal values parsed from a range of the string.

Each byte value is parsed from the prefix, two case insensitive hexadecimal characters,
and the suffix. A delimiter follows each formatted value, except the last.
The delimiters, prefixes, and suffixes strings must be present; they may be empty strings.
A valid string consists only of the above format.

@param string a string range containing hexadecimal digits,
          delimiters, prefix, and suffix.
@param fromIndex the initial index of the range, inclusive
@param toIndex the final index of the range, exclusive.
@return a byte array with the values parsed from the string range
@throws IllegalArgumentException if the prefix or suffix is not present for each byte value,
         the byte values are not hexadecimal characters, or if the delimiter is not present
         after all but the last byte value
@throws IndexOutOfBoundsException if the string range is out of bounds

## HexFormat.parseHex(char[], int, int)

```java
public byte[] parseHex(char[] chars, int fromIndex, int toIndex)
```

Returns a byte array containing hexadecimal values parsed from
a range of the character array.

Each byte value is parsed from the prefix, two case insensitive hexadecimal characters,
and the suffix. A delimiter follows each formatted value, except the last.
The delimiters, prefixes, and suffixes strings must be present; they may be empty strings.
A valid character array range consists only of the above format.

@param chars a character array range containing an even number of hexadecimal digits,
         delimiters, prefix, and suffix.
@param fromIndex the initial index of the range, inclusive
@param toIndex the final index of the range, exclusive.
@return a byte array with the values parsed from the character array range
@throws IllegalArgumentException if the prefix or suffix is not present for each byte value,
         the byte values are not hexadecimal characters, or if the delimiter is not present
         after all but the last byte value
@throws IndexOutOfBoundsException if the character array range is out of bounds

## HexFormat.toLowHexDigit(int)

```java
public char toLowHexDigit(int value)
```

Returns the hexadecimal character for the low 4 bits of the value considering it to be a byte.
If the parameter {@link #isUpperCase()} is {@code true} the
character returned for values {@code 10-15} is uppercase {@code "A-F"},
otherwise the character returned is lowercase {@code "a-f"}.
The values in the range {@code 0-9} are returned as {@code "0-9"}.

@param value a value, only the low 4 bits {@code 0-3} of the value are used
@return the hexadecimal character for the low 4 bits {@code 0-3} of the value

## HexFormat.toHighHexDigit(int)

```java
public char toHighHexDigit(int value)
```

Returns the hexadecimal character for the high 4 bits of the value considering it to be a byte.
If the parameter {@link #isUpperCase()} is {@code true} the
character returned for values {@code 10-15} is uppercase {@code "A-F"},
otherwise the character returned is lowercase {@code "a-f"}.
The values in the range {@code 0-9} are returned as {@code "0-9"}.

@param value a value, only bits {@code 4-7} of the value are used
@return the hexadecimal character for the bits {@code 4-7} of the value

## HexFormat.toHexDigits(A, byte)

```java
public <A extends Appendable> A toHexDigits(A out, byte value)
```

Appends two hexadecimal characters for the byte value to the {@link Appendable}.
Each nibble (4 bits) from most significant to least significant of the value
is formatted as if by {@link #toLowHexDigit(int) toLowHexDigit(nibble)}.
The hexadecimal characters are appended in one or more calls to the
{@link Appendable} methods. The delimiter, prefix and suffix are not used.

@param <A> The type of {@code Appendable}
@param out an {@code Appendable}, non-null
@param value a byte value
@return the {@code Appendable}
@throws UncheckedIOException if an I/O exception occurs appending to the output

## HexFormat.toHexDigits(byte)

```java
public String toHexDigits(byte value)
```

Returns the two hexadecimal characters for the {@code byte} value.
Each nibble (4 bits) from most significant to least significant of the value
is formatted as if by {@link #toLowHexDigit(int) toLowHexDigit(nibble)}.
The delimiter, prefix and suffix are not used.

@param value a byte value
@return the two hexadecimal characters for the byte value

## HexFormat.toHexDigits(char)

```java
public String toHexDigits(char value)
```

Returns the four hexadecimal characters for the {@code char} value.
Each nibble (4 bits) from most significant to least significant of the value
is formatted as if by {@link #toLowHexDigit(int) toLowHexDigit(nibble)}.
The delimiter, prefix and suffix are not used.

@param value a {@code char} value
@return the four hexadecimal characters for the {@code char} value

## HexFormat.toHexDigits(short)

```java
public String toHexDigits(short value)
```

Returns the four hexadecimal characters for the {@code short} value.
Each nibble (4 bits) from most significant to least significant of the value
is formatted as if by {@link #toLowHexDigit(int) toLowHexDigit(nibble)}.
The delimiter, prefix and suffix are not used.

@param value a {@code short} value
@return the four hexadecimal characters for the {@code short} value

## HexFormat.toHexDigits(int)

```java
public String toHexDigits(int value)
```

Returns the eight hexadecimal characters for the {@code int} value.
Each nibble (4 bits) from most significant to least significant of the value
is formatted as if by {@link #toLowHexDigit(int) toLowHexDigit(nibble)}.
The delimiter, prefix and suffix are not used.

@param value an {@code int} value
@return the eight hexadecimal characters for the {@code int} value
@see Integer#toHexString

## HexFormat.toHexDigits(long)

```java
public String toHexDigits(long value)
```

Returns the sixteen hexadecimal characters for the {@code long} value.
Each nibble (4 bits) from most significant to least significant of the value
is formatted as if by {@link #toLowHexDigit(int) toLowHexDigit(nibble)}.
The delimiter, prefix and suffix are not used.

@param value a {@code long} value
@return the sixteen hexadecimal characters for the {@code long} value
@see Long#toHexString

## HexFormat.toHexDigits(long, int)

```java
public String toHexDigits(long value, int digits)
```

Returns up to sixteen hexadecimal characters for the {@code long} value.
Each nibble (4 bits) from most significant to least significant of the value
is formatted as if by {@link #toLowHexDigit(int) toLowHexDigit(nibble)}.
The delimiter, prefix and suffix are not used.

@param value a {@code long} value
@param digits the number of hexadecimal digits to return, 0 to 16
@return the hexadecimal characters for the {@code long} value
@throws  IllegalArgumentException if {@code digits} is negative or greater than 16

## HexFormat.isHexDigit(int)

```java
public static boolean isHexDigit(int ch)
```

Returns {@code true} if the character is a valid hexadecimal character or codepoint.
The valid hexadecimal characters are:
<ul>
<li>{@code '0' ('\u005Cu0030')} through {@code '9' ('\u005Cu0039')} inclusive,
<li>{@code 'A' ('\u005Cu0041')} through {@code 'F' ('\u005Cu0046')} inclusive, and
<li>{@code 'a' ('\u005Cu0061')} through {@code 'f' ('\u005Cu0066')} inclusive.
</ul>
@param ch a codepoint
@return {@code true} if the character is valid a hexadecimal character,
         otherwise {@code false}

## HexFormat.fromHexDigit(int)

```java
public static int fromHexDigit(int ch)
```

Returns the value for the hexadecimal character or codepoint.
The value is:
<ul>
<li>{@code (ch - '0')} for {@code '0'} through {@code '9'} inclusive,
<li>{@code (ch - 'A' + 10)} for {@code 'A'} through {@code 'F'} inclusive, and
<li>{@code (ch - 'a' + 10)} for {@code 'a'} through {@code 'f'} inclusive.
</ul>

@param ch a character or codepoint
@return the value {@code 0-15}
@throws  NumberFormatException if the codepoint is not a hexadecimal character

## HexFormat.fromHexDigits(CharSequence)

```java
public static int fromHexDigits(CharSequence string)
```

Returns the {@code int} value parsed from a string of up to eight hexadecimal characters.
The hexadecimal characters are parsed from most significant to least significant
using {@link #fromHexDigit(int)} to form an unsigned value.
The value is zero extended to 32 bits and is returned as an {@code int}.

@apiNote
{@link Integer#parseInt(String, int) Integer.parseInt(s, 16)} and
{@link Integer#parseUnsignedInt(String, int) Integer.parseUnsignedInt(s, 16)}
are similar but allow all Unicode hexadecimal digits defined by
{@link Character#digit(char, int) Character.digit(ch, 16)}.
{@code HexFormat} uses only hexadecimal characters
{@code "0-9"}, {@code "A-F"} and {@code "a-f"}.
Signed hexadecimal strings can be parsed with {@link Integer#parseInt(String, int)}.

@param string a CharSequence containing up to eight hexadecimal characters
@return the value parsed from the string
@throws  IllegalArgumentException if the string length is greater than eight (8) or
     if any of the characters is not a hexadecimal character

## HexFormat.fromHexDigits(CharSequence, int, int)

```java
public static int fromHexDigits(CharSequence string, int fromIndex, int toIndex)
```

Returns the {@code int} value parsed from a string range of up to eight hexadecimal
characters.
The characters in the range {@code fromIndex} to {@code toIndex}, exclusive,
are parsed from most significant to least significant
using {@link #fromHexDigit(int)} to form an unsigned value.
The value is zero extended to 32 bits and is returned as an {@code int}.

@apiNote
{@link Integer#parseInt(String, int) Integer.parseInt(s, 16)} and
{@link Integer#parseUnsignedInt(String, int) Integer.parseUnsignedInt(s, 16)}
are similar but allow all Unicode hexadecimal digits defined by
{@link Character#digit(char, int) Character.digit(ch, 16)}.
{@code HexFormat} uses only hexadecimal characters
{@code "0-9"}, {@code "A-F"} and {@code "a-f"}.
Signed hexadecimal strings can be parsed with {@link Integer#parseInt(String, int)}.

@param string a CharSequence containing the characters
@param fromIndex the initial index of the range, inclusive
@param toIndex the final index of the range, exclusive.
@return the value parsed from the string range
@throws  IndexOutOfBoundsException if the range is out of bounds
         for the {@code CharSequence}
@throws  IllegalArgumentException if length of the range is greater than eight (8) or
         if any of the characters is not a hexadecimal character

## HexFormat.fromHexDigitsToLong(CharSequence)

```java
public static long fromHexDigitsToLong(CharSequence string)
```

Returns the long value parsed from a string of up to sixteen hexadecimal characters.
The hexadecimal characters are parsed from most significant to least significant
using {@link #fromHexDigit(int)} to form an unsigned value.
The value is zero extended to 64 bits and is returned as a {@code long}.

@apiNote
{@link Long#parseLong(String, int) Long.parseLong(s, 16)} and
{@link Long#parseUnsignedLong(String, int) Long.parseUnsignedLong(s, 16)}
are similar but allow all Unicode hexadecimal digits defined by
{@link Character#digit(char, int) Character.digit(ch, 16)}.
{@code HexFormat} uses only hexadecimal characters
{@code "0-9"}, {@code "A-F"} and {@code "a-f"}.
Signed hexadecimal strings can be parsed with {@link Long#parseLong(String, int)}.

@param string a CharSequence containing up to sixteen hexadecimal characters
@return the value parsed from the string
@throws  IllegalArgumentException if the string length is greater than sixteen (16) or
        if any of the characters is not a hexadecimal character

## HexFormat.fromHexDigitsToLong(CharSequence, int, int)

```java
public static long fromHexDigitsToLong(CharSequence string, int fromIndex, int toIndex)
```

Returns the long value parsed from a string range of up to sixteen hexadecimal
characters.
The characters in the range {@code fromIndex} to {@code toIndex}, exclusive,
are parsed from most significant to least significant
using {@link #fromHexDigit(int)} to form an unsigned value.
The value is zero extended to 64 bits and is returned as a {@code long}.

@apiNote
{@link Long#parseLong(String, int) Long.parseLong(s, 16)} and
{@link Long#parseUnsignedLong(String, int) Long.parseUnsignedLong(s, 16)}
are similar but allow all Unicode hexadecimal digits defined by
{@link Character#digit(char, int) Character.digit(ch, 16)}.
{@code HexFormat} uses only hexadecimal characters
{@code "0-9"}, {@code "A-F"} and {@code "a-f"}.
Signed hexadecimal strings can be parsed with {@link Long#parseLong(String, int)}.

@param string a CharSequence containing the characters
@param fromIndex the initial index of the range, inclusive
@param toIndex the final index of the range, exclusive.
@return the value parsed from the string range
@throws  IndexOutOfBoundsException if the range is out of bounds
         for the {@code CharSequence}
@throws  IllegalArgumentException if the length of the range is greater than sixteen (16) or
         if any of the characters is not a hexadecimal character

## HexFormat.equals(Object)

```java
public boolean equals(Object o)
```

Returns {@code true} if the other object is a {@code HexFormat}
with the same parameters.

@param o an object, may be null
@return {@code true} if the other object is a {@code HexFormat} and the parameters
        uppercase, delimiter, prefix, and suffix are equal;
        otherwise {@code false}

## HexFormat.hashCode()

```java
public int hashCode()
```

Returns a hashcode for this {@code HexFormat}.

@return a hashcode for this {@code HexFormat}

## HexFormat.toString()

```java
public String toString()
```

Returns a description of the formatter parameters for uppercase,
delimiter, prefix, and suffix.

@return a description of this {@code HexFormat}