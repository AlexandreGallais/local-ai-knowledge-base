---
title: "HexFormat class (java.util) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/HexFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HexFormat class (java.util)

```java
public final class HexFormat
```

`HexFormat` converts between bytes and chars and hex-encoded strings which may include
additional formatting markup such as prefixes, suffixes, and delimiters.

There are two factories of `HexFormat` with preset parameters `of()` and
ofDelimiter(delimiter). For other parameter combinations
the `withXXX` methods return copies of `HexFormat` modified
`withPrefix(String)`, `withSuffix(String)`, `withDelimiter(String)`
or choice of `withUpperCase()` or `withLowerCase()` parameters.

For primitive to hexadecimal string conversions the `toHexDigits`
methods include `toHexDigits(byte)`, `toHexDigits(int)`, and
`toHexDigits(long)`, etc. The default is to use lowercase characters `"0-9","a-f"`.
For conversions producing uppercase hexadecimal the characters are `"0-9","A-F"`.
Only the HexFormat.isUpperCase() parameter is
considered; the delimiter, prefix and suffix are not used.

For hexadecimal string to primitive conversions the `fromHexDigits`
methods include fromHexDigits(string),
fromHexDigitsToLong(string), and
fromHexDigit(int) converts a single character or codepoint.
For conversions from hexadecimal characters the digits and uppercase and lowercase
characters in `"0-9", "a-f", and "A-F"` are converted to corresponding values
`0-15`. The delimiter, prefix, suffix, and uppercase parameters are not used.

For byte array to formatted hexadecimal string conversions
the `formatHex` methods include formatHex(byte[])
and byte[]) formatHex(Appendable, byte[]).
The formatted output is a string or is appended to an `Appendable` such as
`StringBuilder` or `java.io.PrintStream`.
Each byte value is formatted as the prefix, two hexadecimal characters from the
uppercase or lowercase digits, and the suffix.
A delimiter follows each formatted value, except the last.
For conversions producing uppercase hexadecimal strings use `withUpperCase()`.

For formatted hexadecimal string to byte array conversions the
`parseHex` methods include parseHex(CharSequence) and
int, int) parseHex(char[], offset, length).
Each byte value is parsed from the prefix, two case insensitive hexadecimal characters,
and the suffix. A delimiter follows each formatted value, except the last.

**API note:** For example, an individual byte is converted to a string of hexadecimal digits using
toHexDigits(int) and converted from a string to a
primitive value using fromHexDigits(string).

```java
    HexFormat hex = HexFormat.of();
    byte b = 127;
    String byteStr = hex.toHexDigits(b);

    byte byteVal = (byte)hex.fromHexDigits(byteStr);
    assert(byteStr.equals("7f"));
    assert(b == byteVal);

    // The hexadecimal digits are: "7f"
```

For a comma (`", "`) separated format with a prefix (`"#"`)
using lowercase hex digits the `HexFormat` is:

```java
    HexFormat commaFormat = HexFormat.ofDelimiter(", ").withPrefix("#");
    byte[] bytes = {0, 1, 2, 3, 124, 125, 126, 127};
    String str = commaFormat.formatHex(bytes);

    byte[] parsed = commaFormat.parseHex(str);
    assert(Arrays.equals(bytes, parsed));

    // The formatted string is: "#00, #01, #02, #03, #7c, #7d, #7e, #7f"
```

For a fingerprint of byte values that uses the delimiter colon (`":"`)
and uppercase characters the `HexFormat` is:

```java
    HexFormat formatFingerprint = HexFormat.ofDelimiter(":").withUpperCase();
    byte[] bytes = {0, 1, 2, 3, 124, 125, 126, 127};
    String str = formatFingerprint.formatHex(bytes);
    byte[] parsed = formatFingerprint.parseHex(str);
    assert(Arrays.equals(bytes, parsed));

    // The formatted string is: "00:01:02:03:7C:7D:7E:7F"
```

This is a value-based
class; use of identity-sensitive operations (including reference equality
(`==`), identity hash code, or synchronization) on instances of
`HexFormat` may have unpredictable results and should be avoided.
The `equals` method should be used for comparisons.

This class is immutable and thread-safe.

Unless otherwise noted, passing a null argument to any method will cause a
NullPointerException to be thrown.

**Since:** 17

## HexFormat.of()

```java
public static HexFormat of()
```

Returns a hexadecimal formatter with no delimiter and lowercase characters.
The delimiter, prefix, and suffix are empty.
The methods withDelimiter,
withUpperCase, withLowerCase,
withPrefix, and withSuffix
return copies of formatters with new parameters.

**Returns:** a hexadecimal formatter with no delimiter and lowercase characters

## HexFormat.ofDelimiter(String)

```java
public static HexFormat ofDelimiter(String delimiter)
```

Returns a hexadecimal formatter with the delimiter and lowercase characters.
The prefix and suffix are empty.
The methods withDelimiter,
withUpperCase, withLowerCase,
withPrefix, and withSuffix
return copies of formatters with new parameters.

Parameters:

- `delimiter`: a delimiter, non-null, may be empty

**Returns:** a `HexFormat` with the delimiter and lowercase characters

## HexFormat.withDelimiter(String)

```java
public HexFormat withDelimiter(String delimiter)
```

Returns a copy of this `HexFormat` with the delimiter.

Parameters:

- `delimiter`: the delimiter, non-null, may be empty

**Returns:** a copy of this `HexFormat` with the delimiter

## HexFormat.withPrefix(String)

```java
public HexFormat withPrefix(String prefix)
```

Returns a copy of this `HexFormat` with the prefix.

Parameters:

- `prefix`: a prefix, non-null, may be empty

**Returns:** a copy of this `HexFormat` with the prefix

## HexFormat.withSuffix(String)

```java
public HexFormat withSuffix(String suffix)
```

Returns a copy of this `HexFormat` with the suffix.

Parameters:

- `suffix`: a suffix, non-null, may be empty

**Returns:** a copy of this `HexFormat` with the suffix

## HexFormat.withUpperCase()

```java
public HexFormat withUpperCase()
```

Returns a copy of this `HexFormat` to use uppercase hexadecimal characters.
The uppercase hexadecimal characters are `"0-9", "A-F"`.

**Returns:** a copy of this `HexFormat` with uppercase hexadecimal characters

## HexFormat.withLowerCase()

```java
public HexFormat withLowerCase()
```

Returns a copy of this `HexFormat` to use lowercase hexadecimal characters.
The lowercase hexadecimal characters are `"0-9", "a-f"`.

**Returns:** a copy of this `HexFormat` with lowercase hexadecimal characters

## HexFormat.delimiter()

```java
public String delimiter()
```

Returns the delimiter between hexadecimal values in formatted hexadecimal strings.

**Returns:** the delimiter, non-null, may be empty `""`

## HexFormat.prefix()

```java
public String prefix()
```

Returns the prefix used for each hexadecimal value in formatted hexadecimal strings.

**Returns:** the prefix, non-null, may be empty `""`

## HexFormat.suffix()

```java
public String suffix()
```

Returns the suffix used for each hexadecimal value in formatted hexadecimal strings.

**Returns:** the suffix, non-null, may be empty `""`

## HexFormat.isUpperCase()

```java
public boolean isUpperCase()
```

Returns `true` if the hexadecimal digits are uppercase,
otherwise `false`.

**Returns:** `true` if the hexadecimal digits are uppercase,
         otherwise `false`

## HexFormat.formatHex(byte[])

```java
public String formatHex(byte[] bytes)
```

Returns a hexadecimal string formatted from a byte array.
Each byte value is formatted as the prefix, two hexadecimal characters
selected from uppercase or lowercase digits, and the suffix.
A delimiter follows each formatted value, except the last.

The behavior is equivalent to
int, int) formatHex(bytes, 0, bytes.length)).

Parameters:

- `bytes`: a non-null array of bytes

**Returns:** a string hexadecimal formatting of the byte array

## HexFormat.formatHex(byte[], int, int)

```java
public String formatHex(byte[] bytes, int fromIndex, int toIndex)
```

Returns a hexadecimal string formatted from a byte array range.
Each byte value is formatted as the prefix, two hexadecimal characters
selected from uppercase or lowercase digits, and the suffix.
A delimiter follows each formatted value, except the last.

Parameters:

- `bytes`: a non-null array of bytes
- `fromIndex`: the initial index of the range, inclusive
- `toIndex`: the final index of the range, exclusive

**Returns:** a string hexadecimal formatting each byte of the array range

Throws:

- `IndexOutOfBoundsException`: if the array range is out of bounds

## HexFormat.formatHex(A, byte[])

```java
public <A extends Appendable> A formatHex(A out, byte[] bytes)
```

Appends formatted hexadecimal strings from a byte array to the `Appendable`.
Each byte value is formatted as the prefix, two hexadecimal characters
selected from uppercase or lowercase digits, and the suffix.
A delimiter follows each formatted value, except the last.
The formatted hexadecimal strings are appended in zero or more calls to the `Appendable` methods.

Parameters:

- ``: The type of `Appendable`
- `out`: an `Appendable`, non-null
- `bytes`: a byte array

**Returns:** the `Appendable`

Throws:

- `UncheckedIOException`: if an I/O exception occurs appending to the output

## HexFormat.formatHex(A, byte[], int, int)

```java
public <A extends Appendable> A formatHex(A out, byte[] bytes, int fromIndex, int toIndex)
```

Appends formatted hexadecimal strings from a byte array range to the `Appendable`.
Each byte value is formatted as the prefix, two hexadecimal characters
selected from uppercase or lowercase digits, and the suffix.
A delimiter follows each formatted value, except the last.
The formatted hexadecimal strings are appended in zero or more calls to the `Appendable` methods.

Parameters:

- ``: The type of `Appendable`
- `out`: an `Appendable`, non-null
- `bytes`: a byte array, non-null
- `fromIndex`: the initial index of the range, inclusive
- `toIndex`: the final index of the range, exclusive.

**Returns:** the `Appendable`

Throws:

- `IndexOutOfBoundsException`: if the array range is out of bounds
- `UncheckedIOException`: if an I/O exception occurs appending to the output

## HexFormat.parseHex(CharSequence)

```java
public byte[] parseHex(CharSequence string)
```

Returns a byte array containing hexadecimal values parsed from the string.

Each byte value is parsed from the prefix, two case insensitive hexadecimal characters,
and the suffix. A delimiter follows each formatted value, except the last.
The delimiters, prefixes, and suffixes strings must be present; they may be empty strings.
A valid string consists only of the above format.

Parameters:

- `string`: a string containing the byte values with prefix, hexadecimal digits, suffix, and delimiters

**Returns:** a byte array with the values parsed from the string

Throws:

- `IllegalArgumentException`: if the prefix or suffix is not present for each byte value, the byte values are not hexadecimal characters, or if the delimiter is not present after all but the last byte value

## HexFormat.parseHex(CharSequence, int, int)

```java
public byte[] parseHex(CharSequence string, int fromIndex, int toIndex)
```

Returns a byte array containing hexadecimal values parsed from a range of the string.

Each byte value is parsed from the prefix, two case insensitive hexadecimal characters,
and the suffix. A delimiter follows each formatted value, except the last.
The delimiters, prefixes, and suffixes strings must be present; they may be empty strings.
A valid string consists only of the above format.

Parameters:

- `string`: a string range containing hexadecimal digits, delimiters, prefix, and suffix.
- `fromIndex`: the initial index of the range, inclusive
- `toIndex`: the final index of the range, exclusive.

**Returns:** a byte array with the values parsed from the string range

Throws:

- `IllegalArgumentException`: if the prefix or suffix is not present for each byte value, the byte values are not hexadecimal characters, or if the delimiter is not present after all but the last byte value
- `IndexOutOfBoundsException`: if the string range is out of bounds

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

Parameters:

- `chars`: a character array range containing an even number of hexadecimal digits, delimiters, prefix, and suffix.
- `fromIndex`: the initial index of the range, inclusive
- `toIndex`: the final index of the range, exclusive.

**Returns:** a byte array with the values parsed from the character array range

Throws:

- `IllegalArgumentException`: if the prefix or suffix is not present for each byte value, the byte values are not hexadecimal characters, or if the delimiter is not present after all but the last byte value
- `IndexOutOfBoundsException`: if the character array range is out of bounds

## HexFormat.toLowHexDigit(int)

```java
public char toLowHexDigit(int value)
```

Returns the hexadecimal character for the low 4 bits of the value considering it to be a byte.
If the parameter `isUpperCase()` is `true` the
character returned for values `10-15` is uppercase `"A-F"`,
otherwise the character returned is lowercase `"a-f"`.
The values in the range `0-9` are returned as `"0-9"`.

Parameters:

- `value`: a value, only the low 4 bits `0-3` of the value are used

**Returns:** the hexadecimal character for the low 4 bits `0-3` of the value

## HexFormat.toHighHexDigit(int)

```java
public char toHighHexDigit(int value)
```

Returns the hexadecimal character for the high 4 bits of the value considering it to be a byte.
If the parameter `isUpperCase()` is `true` the
character returned for values `10-15` is uppercase `"A-F"`,
otherwise the character returned is lowercase `"a-f"`.
The values in the range `0-9` are returned as `"0-9"`.

Parameters:

- `value`: a value, only bits `4-7` of the value are used

**Returns:** the hexadecimal character for the bits `4-7` of the value

## HexFormat.toHexDigits(A, byte)

```java
public <A extends Appendable> A toHexDigits(A out, byte value)
```

Appends two hexadecimal characters for the byte value to the `Appendable`.
Each nibble (4 bits) from most significant to least significant of the value
is formatted as if by toLowHexDigit(nibble).
The hexadecimal characters are appended in one or more calls to the
`Appendable` methods. The delimiter, prefix and suffix are not used.

Parameters:

- ``: The type of `Appendable`
- `out`: an `Appendable`, non-null
- `value`: a byte value

**Returns:** the `Appendable`

Throws:

- `UncheckedIOException`: if an I/O exception occurs appending to the output
