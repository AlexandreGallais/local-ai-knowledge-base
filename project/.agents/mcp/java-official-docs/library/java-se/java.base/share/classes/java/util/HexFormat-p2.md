---
title: "HexFormat class (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/HexFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HexFormat class (java.util) (part 2 of 2)

## HexFormat.toHexDigits(byte)

```java
public String toHexDigits(byte value)
```

Returns the two hexadecimal characters for the `byte` value.
Each nibble (4 bits) from most significant to least significant of the value
is formatted as if by toLowHexDigit(nibble).
The delimiter, prefix and suffix are not used.

Parameters:

- `value`: a byte value

**Returns:** the two hexadecimal characters for the byte value

## HexFormat.toHexDigits(char)

```java
public String toHexDigits(char value)
```

Returns the four hexadecimal characters for the `char` value.
Each nibble (4 bits) from most significant to least significant of the value
is formatted as if by toLowHexDigit(nibble).
The delimiter, prefix and suffix are not used.

Parameters:

- `value`: a `char` value

**Returns:** the four hexadecimal characters for the `char` value

## HexFormat.toHexDigits(short)

```java
public String toHexDigits(short value)
```

Returns the four hexadecimal characters for the `short` value.
Each nibble (4 bits) from most significant to least significant of the value
is formatted as if by toLowHexDigit(nibble).
The delimiter, prefix and suffix are not used.

Parameters:

- `value`: a `short` value

**Returns:** the four hexadecimal characters for the `short` value

## HexFormat.toHexDigits(int)

```java
public String toHexDigits(int value)
```

Returns the eight hexadecimal characters for the `int` value.
Each nibble (4 bits) from most significant to least significant of the value
is formatted as if by toLowHexDigit(nibble).
The delimiter, prefix and suffix are not used.

Parameters:

- `value`: an `int` value

**Returns:** the eight hexadecimal characters for the `int` value

**See also:** Integer#toHexString

## HexFormat.toHexDigits(long)

```java
public String toHexDigits(long value)
```

Returns the sixteen hexadecimal characters for the `long` value.
Each nibble (4 bits) from most significant to least significant of the value
is formatted as if by toLowHexDigit(nibble).
The delimiter, prefix and suffix are not used.

Parameters:

- `value`: a `long` value

**Returns:** the sixteen hexadecimal characters for the `long` value

**See also:** Long#toHexString

## HexFormat.toHexDigits(long, int)

```java
public String toHexDigits(long value, int digits)
```

Returns up to sixteen hexadecimal characters for the `long` value.
Each nibble (4 bits) from most significant to least significant of the value
is formatted as if by toLowHexDigit(nibble).
The delimiter, prefix and suffix are not used.

Parameters:

- `value`: a `long` value
- `digits`: the number of hexadecimal digits to return, 0 to 16

**Returns:** the hexadecimal characters for the `long` value

Throws:

- `IllegalArgumentException`: if `digits` is negative or greater than 16

## HexFormat.isHexDigit(int)

```java
public static boolean isHexDigit(int ch)
```

Returns `true` if the character is a valid hexadecimal character or codepoint.
The valid hexadecimal characters are:

- `'0' ('\u005Cu0030')` through `'9' ('\u005Cu0039')` inclusive,

- `'A' ('\u005Cu0041')` through `'F' ('\u005Cu0046')` inclusive, and

- `'a' ('\u005Cu0061')` through `'f' ('\u005Cu0066')` inclusive.

Parameters:

- `ch`: a codepoint

**Returns:** `true` if the character is valid a hexadecimal character,
         otherwise `false`

## HexFormat.fromHexDigit(int)

```java
public static int fromHexDigit(int ch)
```

Returns the value for the hexadecimal character or codepoint.
The value is:

- `(ch - '0')` for `'0'` through `'9'` inclusive,

- `(ch - 'A' + 10)` for `'A'` through `'F'` inclusive, and

- `(ch - 'a' + 10)` for `'a'` through `'f'` inclusive.

Parameters:

- `ch`: a character or codepoint

**Returns:** the value `0-15`

Throws:

- `NumberFormatException`: if the codepoint is not a hexadecimal character

## HexFormat.fromHexDigits(CharSequence)

```java
public static int fromHexDigits(CharSequence string)
```

Returns the `int` value parsed from a string of up to eight hexadecimal characters.
The hexadecimal characters are parsed from most significant to least significant
using `fromHexDigit(int)` to form an unsigned value.
The value is zero extended to 32 bits and is returned as an `int`.

Parameters:

- `string`: a CharSequence containing up to eight hexadecimal characters

**API note:** int) Integer.parseInt(s, 16) and
int) Integer.parseUnsignedInt(s, 16)
are similar but allow all Unicode hexadecimal digits defined by
int) Character.digit(ch, 16).
`HexFormat` uses only hexadecimal characters
`"0-9"`, `"A-F"` and `"a-f"`.
Signed hexadecimal strings can be parsed with int).

**Returns:** the value parsed from the string

Throws:

- `IllegalArgumentException`: if the string length is greater than eight (8) or if any of the characters is not a hexadecimal character

## HexFormat.fromHexDigits(CharSequence, int, int)

```java
public static int fromHexDigits(CharSequence string, int fromIndex, int toIndex)
```

Returns the `int` value parsed from a string range of up to eight hexadecimal
characters.
The characters in the range `fromIndex` to `toIndex`, exclusive,
are parsed from most significant to least significant
using `fromHexDigit(int)` to form an unsigned value.
The value is zero extended to 32 bits and is returned as an `int`.

Parameters:

- `string`: a CharSequence containing the characters
- `fromIndex`: the initial index of the range, inclusive
- `toIndex`: the final index of the range, exclusive.

**API note:** int) Integer.parseInt(s, 16) and
int) Integer.parseUnsignedInt(s, 16)
are similar but allow all Unicode hexadecimal digits defined by
int) Character.digit(ch, 16).
`HexFormat` uses only hexadecimal characters
`"0-9"`, `"A-F"` and `"a-f"`.
Signed hexadecimal strings can be parsed with int).

**Returns:** the value parsed from the string range

Throws:

- `IndexOutOfBoundsException`: if the range is out of bounds for the `CharSequence`
- `IllegalArgumentException`: if length of the range is greater than eight (8) or if any of the characters is not a hexadecimal character

## HexFormat.fromHexDigitsToLong(CharSequence)

```java
public static long fromHexDigitsToLong(CharSequence string)
```

Returns the long value parsed from a string of up to sixteen hexadecimal characters.
The hexadecimal characters are parsed from most significant to least significant
using `fromHexDigit(int)` to form an unsigned value.
The value is zero extended to 64 bits and is returned as a `long`.

Parameters:

- `string`: a CharSequence containing up to sixteen hexadecimal characters

**API note:** int) Long.parseLong(s, 16) and
int) Long.parseUnsignedLong(s, 16)
are similar but allow all Unicode hexadecimal digits defined by
int) Character.digit(ch, 16).
`HexFormat` uses only hexadecimal characters
`"0-9"`, `"A-F"` and `"a-f"`.
Signed hexadecimal strings can be parsed with int).

**Returns:** the value parsed from the string

Throws:

- `IllegalArgumentException`: if the string length is greater than sixteen (16) or if any of the characters is not a hexadecimal character

## HexFormat.fromHexDigitsToLong(CharSequence, int, int)

```java
public static long fromHexDigitsToLong(CharSequence string, int fromIndex, int toIndex)
```

Returns the long value parsed from a string range of up to sixteen hexadecimal
characters.
The characters in the range `fromIndex` to `toIndex`, exclusive,
are parsed from most significant to least significant
using `fromHexDigit(int)` to form an unsigned value.
The value is zero extended to 64 bits and is returned as a `long`.

Parameters:

- `string`: a CharSequence containing the characters
- `fromIndex`: the initial index of the range, inclusive
- `toIndex`: the final index of the range, exclusive.

**API note:** int) Long.parseLong(s, 16) and
int) Long.parseUnsignedLong(s, 16)
are similar but allow all Unicode hexadecimal digits defined by
int) Character.digit(ch, 16).
`HexFormat` uses only hexadecimal characters
`"0-9"`, `"A-F"` and `"a-f"`.
Signed hexadecimal strings can be parsed with int).

**Returns:** the value parsed from the string range

Throws:

- `IndexOutOfBoundsException`: if the range is out of bounds for the `CharSequence`
- `IllegalArgumentException`: if the length of the range is greater than sixteen (16) or if any of the characters is not a hexadecimal character

## HexFormat.equals(Object)

```java
public boolean equals(Object o)
```

Returns `true` if the other object is a `HexFormat`
with the same parameters.

Parameters:

- `o`: an object, may be null

**Returns:** `true` if the other object is a `HexFormat` and the parameters
        uppercase, delimiter, prefix, and suffix are equal;
        otherwise `false`

## HexFormat.hashCode()

```java
public int hashCode()
```

Returns a hashcode for this `HexFormat`.

**Returns:** a hashcode for this `HexFormat`

## HexFormat.toString()

```java
public String toString()
```

Returns a description of the formatter parameters for uppercase,
delimiter, prefix, and suffix.

**Returns:** a description of this `HexFormat`
