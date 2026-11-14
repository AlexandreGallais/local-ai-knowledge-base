---
title: "Character class (java.lang) (part 12 of 12)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Character.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Character class (java.lang) (part 12 of 12)

## Character.forDigit(int, int)

```java
public static char forDigit(int digit, int radix)
```

Determines the character representation for a specific digit in
the specified radix. If the value of `radix` is not a
valid radix, or the value of `digit` is not a valid
digit in the specified radix, the null character
(`'\u005Cu0000'`) is returned.

The `radix` argument is valid if it is greater than or
equal to `MIN_RADIX` and less than or equal to
`MAX_RADIX`. The `digit` argument is valid if
`0 <= digit < radix`.

If the digit is less than 10, then
`'0' + digit` is returned. Otherwise, the value
`'a' + digit - 10` is returned.

Parameters:

- `digit`: the number to convert to a character.
- `radix`: the radix.

**Returns:** the `char` representation of the specified digit
         in the specified radix.

**See also:** Character#MIN_RADIX

**See also:** Character#MAX_RADIX

**See also:** Character#digit(char, int)

## Character.getDirectionality(char)

```java
public static byte getDirectionality(char ch)
```

Returns the Unicode directionality property for the given
character.  Character directionality is used to calculate the
visual ordering of text. The directionality value of undefined
`char` values is `DIRECTIONALITY_UNDEFINED`.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `getDirectionality(int)` method.

Parameters:

- `ch`: `char` for which the directionality property is requested.

**Returns:** the directionality property of the `char` value.

**See also:** Character#DIRECTIONALITY_UNDEFINED

**See also:** Character#DIRECTIONALITY_LEFT_TO_RIGHT

**See also:** Character#DIRECTIONALITY_RIGHT_TO_LEFT

**See also:** Character#DIRECTIONALITY_RIGHT_TO_LEFT_ARABIC

**See also:** Character#DIRECTIONALITY_EUROPEAN_NUMBER

**See also:** Character#DIRECTIONALITY_EUROPEAN_NUMBER_SEPARATOR

**See also:** Character#DIRECTIONALITY_EUROPEAN_NUMBER_TERMINATOR

**See also:** Character#DIRECTIONALITY_ARABIC_NUMBER

**See also:** Character#DIRECTIONALITY_COMMON_NUMBER_SEPARATOR

**See also:** Character#DIRECTIONALITY_NONSPACING_MARK

**See also:** Character#DIRECTIONALITY_BOUNDARY_NEUTRAL

**See also:** Character#DIRECTIONALITY_PARAGRAPH_SEPARATOR

**See also:** Character#DIRECTIONALITY_SEGMENT_SEPARATOR

**See also:** Character#DIRECTIONALITY_WHITESPACE

**See also:** Character#DIRECTIONALITY_OTHER_NEUTRALS

**See also:** Character#DIRECTIONALITY_LEFT_TO_RIGHT_EMBEDDING

**See also:** Character#DIRECTIONALITY_LEFT_TO_RIGHT_OVERRIDE

**See also:** Character#DIRECTIONALITY_RIGHT_TO_LEFT_EMBEDDING

**See also:** Character#DIRECTIONALITY_RIGHT_TO_LEFT_OVERRIDE

**See also:** Character#DIRECTIONALITY_POP_DIRECTIONAL_FORMAT

**See also:** Character#DIRECTIONALITY_LEFT_TO_RIGHT_ISOLATE

**See also:** Character#DIRECTIONALITY_RIGHT_TO_LEFT_ISOLATE

**See also:** Character#DIRECTIONALITY_FIRST_STRONG_ISOLATE

**See also:** Character#DIRECTIONALITY_POP_DIRECTIONAL_ISOLATE

**Since:** 1.4

## Character.getDirectionality(int)

```java
public static byte getDirectionality(int codePoint)
```

Returns the Unicode directionality property for the given
character (Unicode code point).  Character directionality is
used to calculate the visual ordering of text. The
directionality value of undefined character is `DIRECTIONALITY_UNDEFINED`.

Parameters:

- `codePoint`: the character (Unicode code point) for which the directionality property is requested.

**Returns:** the directionality property of the character.

**See also:** Character#DIRECTIONALITY_UNDEFINED DIRECTIONALITY_UNDEFINED

**See also:** Character#DIRECTIONALITY_LEFT_TO_RIGHT DIRECTIONALITY_LEFT_TO_RIGHT

**See also:** Character#DIRECTIONALITY_RIGHT_TO_LEFT DIRECTIONALITY_RIGHT_TO_LEFT

**See also:** Character#DIRECTIONALITY_RIGHT_TO_LEFT_ARABIC DIRECTIONALITY_RIGHT_TO_LEFT_ARABIC

**See also:** Character#DIRECTIONALITY_EUROPEAN_NUMBER DIRECTIONALITY_EUROPEAN_NUMBER

**See also:** Character#DIRECTIONALITY_EUROPEAN_NUMBER_SEPARATOR DIRECTIONALITY_EUROPEAN_NUMBER_SEPARATOR

**See also:** Character#DIRECTIONALITY_EUROPEAN_NUMBER_TERMINATOR DIRECTIONALITY_EUROPEAN_NUMBER_TERMINATOR

**See also:** Character#DIRECTIONALITY_ARABIC_NUMBER DIRECTIONALITY_ARABIC_NUMBER

**See also:** Character#DIRECTIONALITY_COMMON_NUMBER_SEPARATOR DIRECTIONALITY_COMMON_NUMBER_SEPARATOR

**See also:** Character#DIRECTIONALITY_NONSPACING_MARK DIRECTIONALITY_NONSPACING_MARK

**See also:** Character#DIRECTIONALITY_BOUNDARY_NEUTRAL DIRECTIONALITY_BOUNDARY_NEUTRAL

**See also:** Character#DIRECTIONALITY_PARAGRAPH_SEPARATOR DIRECTIONALITY_PARAGRAPH_SEPARATOR

**See also:** Character#DIRECTIONALITY_SEGMENT_SEPARATOR DIRECTIONALITY_SEGMENT_SEPARATOR

**See also:** Character#DIRECTIONALITY_WHITESPACE DIRECTIONALITY_WHITESPACE

**See also:** Character#DIRECTIONALITY_OTHER_NEUTRALS DIRECTIONALITY_OTHER_NEUTRALS

**See also:** Character#DIRECTIONALITY_LEFT_TO_RIGHT_EMBEDDING DIRECTIONALITY_LEFT_TO_RIGHT_EMBEDDING

**See also:** Character#DIRECTIONALITY_LEFT_TO_RIGHT_OVERRIDE DIRECTIONALITY_LEFT_TO_RIGHT_OVERRIDE

**See also:** Character#DIRECTIONALITY_RIGHT_TO_LEFT_EMBEDDING DIRECTIONALITY_RIGHT_TO_LEFT_EMBEDDING

**See also:** Character#DIRECTIONALITY_RIGHT_TO_LEFT_OVERRIDE DIRECTIONALITY_RIGHT_TO_LEFT_OVERRIDE

**See also:** Character#DIRECTIONALITY_POP_DIRECTIONAL_FORMAT DIRECTIONALITY_POP_DIRECTIONAL_FORMAT

**See also:** Character#DIRECTIONALITY_LEFT_TO_RIGHT_ISOLATE DIRECTIONALITY_LEFT_TO_RIGHT_ISOLATE

**See also:** Character#DIRECTIONALITY_RIGHT_TO_LEFT_ISOLATE DIRECTIONALITY_RIGHT_TO_LEFT_ISOLATE

**See also:** Character#DIRECTIONALITY_FIRST_STRONG_ISOLATE DIRECTIONALITY_FIRST_STRONG_ISOLATE

**See also:** Character#DIRECTIONALITY_POP_DIRECTIONAL_ISOLATE DIRECTIONALITY_POP_DIRECTIONAL_ISOLATE

**Since:** 1.5

## Character.isMirrored(char)

```java
public static boolean isMirrored(char ch)
```

Determines whether the character is mirrored according to the
Unicode specification.  Mirrored characters should have their
glyphs horizontally mirrored when displayed in text that is
right-to-left.  For example, `'\u005Cu0028'` LEFT
PARENTHESIS is semantically defined to be an *opening
parenthesis*.  This will appear as a "(" in text that is
left-to-right but as a ")" in text that is right-to-left.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `isMirrored(int)` method.

Parameters:

- `ch`: `char` for which the mirrored property is requested

**Returns:** `true` if the char is mirrored, `false`
        if the `char` is not mirrored or is not defined.

**Since:** 1.4

## Character.isMirrored(int)

```java
public static boolean isMirrored(int codePoint)
```

Determines whether the specified character (Unicode code point)
is mirrored according to the Unicode specification.  Mirrored
characters should have their glyphs horizontally mirrored when
displayed in text that is right-to-left.  For example,
`'\u005Cu0028'` LEFT PARENTHESIS is semantically
defined to be an *opening parenthesis*.  This will appear
as a "(" in text that is left-to-right but as a ")" in text
that is right-to-left.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is mirrored, `false`
         if the character is not mirrored or is not defined.

**Since:** 1.5

## Character.compareTo(Character)

```java
public int compareTo(Character anotherCharacter)
```

Compares two `Character` objects numerically.

Parameters:

- `anotherCharacter`: the `Character` to be compared.

**Returns:** the value `0` if the argument `Character`
         is equal to this `Character`; a value less than
         `0` if this `Character` is numerically less
         than the `Character` argument; and a value greater than
         `0` if this `Character` is numerically greater
         than the `Character` argument (unsigned comparison).
         Note that this is strictly a numerical comparison; it is not
         locale-dependent.

**Since:** 1.2

## Character.compare(char, char)

```java
public static int compare(char x, char y)
```

Compares two `char` values numerically.
The value returned is identical to what would be returned by:

```java
   Character.valueOf(x).compareTo(Character.valueOf(y))
```

Parameters:

- `x`: the first `char` to compare
- `y`: the second `char` to compare

**Returns:** the value `0` if `x == y`;
        a value less than `0` if `x < y`; and
        a value greater than `0` if `x > y`

**Since:** 1.7

## Character.SIZE

```java
public static final int SIZE
```

The number of bits used to represent a `char` value in unsigned
binary form, constant `16`.

**Since:** 1.5

## Character.BYTES

```java
public static final int BYTES
```

The number of bytes used to represent a `char` value in unsigned
binary form.

**Since:** 1.8

## Character.reverseBytes(char)

```java
public static char reverseBytes(char ch)
```

Returns the value obtained by reversing the order of the bytes in the
specified `char` value.

Parameters:

- `ch`: The `char` of which to reverse the byte order.

**Returns:** the value obtained by reversing (or, equivalently, swapping)
    the bytes in the specified `char` value.

**Since:** 1.5

## Character.getName(int)

```java
public static String getName(int codePoint)
```

Returns the name of the specified character
`codePoint`, or null if the code point is
unassigned.

If the specified character is not assigned a name by
the *UnicodeData* file (part of the Unicode Character
Database maintained by the Unicode Consortium), the returned
name is the same as the result of the expression:

`Character.UnicodeBlock.of(codePoint).toString().replace('_', ' ') + " " + Integer.toHexString(codePoint).toUpperCase(Locale.ROOT);`

For the `codePoint`s in the *UnicodeData* file, the name
returned by this method follows the naming scheme in the
"Unicode Name Property" section of the Unicode Standard. For other
code points, such as Hangul/Ideographs, The name generation rule above
differs from the one defined in the Unicode Standard.

Parameters:

- `codePoint`: the character (Unicode code point)

**Returns:** the name of the specified character, or null if
        the code point is unassigned.

**Since:** 1.7

Throws:

- `IllegalArgumentException`: if the specified `codePoint` is not a valid Unicode code point.

## Character.codePointOf(String)

```java
public static int codePointOf(String name)
```

Returns the code point value of the Unicode character specified by
the given character name.

If a character is not assigned a name by the *UnicodeData*
file (part of the Unicode Character Database maintained by the Unicode
Consortium), its name is defined as the result of the expression:

`Character.UnicodeBlock.of(codePoint).toString().replace('_', ' ') + " " + Integer.toHexString(codePoint).toUpperCase(Locale.ROOT);`

The `name` matching is case insensitive, with any leading and
trailing whitespace character removed.

For the code points in the *UnicodeData* file, this method
recognizes the name which conforms to the name defined in the
"Unicode Name Property" section in the Unicode Standard. For other
code points, this method recognizes the name generated with
`getName(int)` method.

Parameters:

- `name`: the character name

**Returns:** the code point value of the character specified by its name.

**Since:** 9

Throws:

- `IllegalArgumentException`: if the specified `name` is not a valid character name.
- `NullPointerException`: if `name` is `null`
