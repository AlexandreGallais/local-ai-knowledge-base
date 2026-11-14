---
title: "Character class (java.lang) (part 6 of 12)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Character.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Character class (java.lang) (part 6 of 12)

## Character.KAWI

```java
public static final UnicodeBlock KAWI
```

Constant for the "Kawi" Unicode
character block.

**Since:** 20

## Character.KAKTOVIK_NUMERALS

```java
public static final UnicodeBlock KAKTOVIK_NUMERALS
```

Constant for the "Kaktovik Numerals" Unicode
character block.

**Since:** 20

## Character.CYRILLIC_EXTENDED_D

```java
public static final UnicodeBlock CYRILLIC_EXTENDED_D
```

Constant for the "Cyrillic Extended-D" Unicode
character block.

**Since:** 20

## Character.NAG_MUNDARI

```java
public static final UnicodeBlock NAG_MUNDARI
```

Constant for the "Nag Mundari" Unicode
character block.

**Since:** 20

## Character.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_H

```java
public static final UnicodeBlock CJK_UNIFIED_IDEOGRAPHS_EXTENSION_H
```

Constant for the "CJK Unified Ideographs Extension H" Unicode
character block.

**Since:** 20

## Character.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_I

```java
public static final UnicodeBlock CJK_UNIFIED_IDEOGRAPHS_EXTENSION_I
```

Constant for the "CJK Unified Ideographs Extension I" Unicode
character block.

**Since:** 22

## Character.TODHRI

```java
public static final UnicodeBlock TODHRI
```

Constant for the "Todhri" Unicode
character block.

**Since:** 24

## Character.GARAY

```java
public static final UnicodeBlock GARAY
```

Constant for the "Garay" Unicode
character block.

**Since:** 24

## Character.TULU_TIGALARI

```java
public static final UnicodeBlock TULU_TIGALARI
```

Constant for the "Tulu-Tigalari" Unicode
character block.

**Since:** 24

## Character.MYANMAR_EXTENDED_C

```java
public static final UnicodeBlock MYANMAR_EXTENDED_C
```

Constant for the "Myanmar Extended-C" Unicode
character block.

**Since:** 24

## Character.SUNUWAR

```java
public static final UnicodeBlock SUNUWAR
```

Constant for the "Sunuwar" Unicode
character block.

**Since:** 24

## Character.EGYPTIAN_HIEROGLYPHS_EXTENDED_A

```java
public static final UnicodeBlock EGYPTIAN_HIEROGLYPHS_EXTENDED_A
```

Constant for the "Egyptian Hieroglyphs Extended-A" Unicode
character block.

**Since:** 24

## Character.GURUNG_KHEMA

```java
public static final UnicodeBlock GURUNG_KHEMA
```

Constant for the "Gurung Khema" Unicode
character block.

**Since:** 24

## Character.KIRAT_RAI

```java
public static final UnicodeBlock KIRAT_RAI
```

Constant for the "Kirat Rai" Unicode
character block.

**Since:** 24

## Character.SYMBOLS_FOR_LEGACY_COMPUTING_SUPPLEMENT

```java
public static final UnicodeBlock SYMBOLS_FOR_LEGACY_COMPUTING_SUPPLEMENT
```

Constant for the "Symbols for Legacy Computing Supplement" Unicode
character block.

**Since:** 24

## Character.OL_ONAL

```java
public static final UnicodeBlock OL_ONAL
```

Constant for the "Ol Onal" Unicode
character block.

**Since:** 24

## Character.of(char)

```java
public static UnicodeBlock of(char c)
```

Returns the object representing the Unicode block containing the
given character, or `null` if the character is not a
member of a defined block.

**Note:** This method cannot handle
 supplementary
characters.  To support all Unicode characters, including
supplementary characters, use the `of(int)` method.

Parameters:

- `c`: The character in question

**Returns:** The `UnicodeBlock` instance representing the
         Unicode block of which this character is a member, or
         `null` if the character is not a member of any
         Unicode block

## Character.of(int)

```java
public static UnicodeBlock of(int codePoint)
```

Returns the object representing the Unicode block
containing the given character (Unicode code point), or
`null` if the character is not a member of a
defined block.

Parameters:

- `codePoint`: the character (Unicode code point) in question.

**Returns:** The `UnicodeBlock` instance representing the
         Unicode block of which this character is a member, or
         `null` if the character is not a member of any
         Unicode block

**See also:** Character#isValidCodePoint(int)

**Since:** 1.5

Throws:

- `IllegalArgumentException`: if the specified `codePoint` is an invalid Unicode code point.

## Character.forName(String)

```java
public static final UnicodeBlock forName(String blockName)
```

Returns the UnicodeBlock with the given name. Block
names are determined by The Unicode Standard. The file
`Blocks.txt` defines blocks for a particular
version of the standard. The `Character` class specifies
the version of the standard that it supports.

This method accepts block names in the following forms:

-  Canonical block names as defined by the Unicode Standard.
For example, the standard defines a "Basic Latin" block. Therefore, this
method accepts "Basic Latin" as a valid block name. The documentation of
each UnicodeBlock provides the canonical name.

- Canonical block names with all spaces removed. For example, "BasicLatin"
is a valid block name for the "Basic Latin" block.

- The text representation of each constant UnicodeBlock identifier.
For example, this method will return the `BASIC_LATIN` block if
provided with the "BASIC_LATIN" name. This form replaces all spaces and
hyphens in the canonical name with underscores.

Finally, character case is ignored for all of the valid block name forms.
For example, "BASIC_LATIN" and "basic_latin" are both valid block names.
The en_US locale's case mapping rules are used to provide case-insensitive
string comparisons for block name validation.

If the Unicode Standard changes block names, both the previous and
current names will be accepted.

Parameters:

- `blockName`: A `UnicodeBlock` name.

**Returns:** The `UnicodeBlock` instance identified
        by `blockName`

**Since:** 1.5

Throws:

- `IllegalArgumentException`: if `blockName` is an invalid name
- `NullPointerException`: if `blockName` is null

## Character.of(int)

```java
public static UnicodeScript of(int codePoint)
```

Returns the enum constant representing the Unicode script of which
the given character (Unicode code point) is assigned to.

Parameters:

- `codePoint`: the character (Unicode code point) in question.

**Returns:** The `UnicodeScript` constant representing the
         Unicode script of which this character is assigned to.

**See also:** Character#isValidCodePoint(int)

Throws:

- `IllegalArgumentException`: if the specified `codePoint` is an invalid Unicode code point.

## Character.forName(String)

```java
public static final UnicodeScript forName(String scriptName)
```

Returns the UnicodeScript constant with the given Unicode script
name or the script name alias. Script names and their aliases are
determined by The Unicode Standard. The files `Scripts.txt`
and `PropertyValueAliases.txt` define script names
and the script name aliases for a particular version of the
standard. The `Character` class specifies the version of
the standard that it supports.

Character case is ignored for all of the valid script names.
The en_US locale's case mapping rules are used to provide
case-insensitive string comparisons for script name validation.

Parameters:

- `scriptName`: A `UnicodeScript` name.

**Returns:** The `UnicodeScript` constant identified
        by `scriptName`

Throws:

- `IllegalArgumentException`: if `scriptName` is an invalid name
- `NullPointerException`: if `scriptName` is null

## Character.Character(char)

```java
public Character(char value)
```

Constructs a newly allocated `Character` object that
represents the specified `char` value.

Parameters:

- `value`: the value to be represented by the `Character` object.

**Deprecated:** It is rarely appropriate to use this constructor. The static factory
`valueOf(char)` is generally a better choice, as it is
likely to yield significantly better space and time performance.

## Character.valueOf(char)

```java
public static Character valueOf(char c)
```

Returns a `Character` instance representing the specified
`char` value.
If a new `Character` instance is not required, this method
should generally be used in preference to the constructor
`Character(char)`, as this method is likely to yield
significantly better space and time performance by caching
frequently requested values.

This method will always cache values in the range `'\u005Cu0000'` to `'\u005Cu007F'`, inclusive, and may
cache other values outside of this range.

Parameters:

- `c`: a char value.

**Returns:** a `Character` instance representing `c`.

**Since:** 1.5

## Character.charValue()

```java
public char charValue()
```

Returns the value of this `Character` object.

**Returns:** the primitive `char` value represented by
         this object.

## Character.hashCode()

```java
public int hashCode()
```

Returns a hash code for this `Character`; equal to the result
of invoking `charValue()`.

**Returns:** a hash code value for this `Character`

## Character.hashCode(char)

```java
public static int hashCode(char value)
```

Returns a hash code for a `char` value; compatible with
`Character.hashCode()`.

Parameters:

- `value`: The `char` for which to return a hash code.

**Since:** 1.8

**Returns:** a hash code value for a `char` value.

## Character.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this object against the specified object.
The result is `true` if and only if the argument is not
`null` and is a `Character` object that
represents the same `char` value as this object.

Parameters:

- `obj`: the object to compare with.

**Returns:** `true` if the objects are the same;
         `false` otherwise.

## Character.toString()

```java
public String toString()
```

Returns a `String` object representing this
`Character`'s value.  The result is a string of
length 1 whose sole component is the primitive
`char` value represented by this
`Character` object.

**Returns:** a string representation of this object.

## Character.toString(char)

```java
public static String toString(char c)
```

Returns a `String` object representing the
specified `char`.  The result is a string of length
1 consisting solely of the specified `char`.

Parameters:

- `c`: the `char` to be converted

**API note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `toString(int)` method.

**Returns:** the string representation of the specified `char`

**Since:** 1.4

## Character.toString(int)

```java
public static String toString(int codePoint)
```

Returns a `String` object representing the
specified character (Unicode code point).  The result is a string of
length 1 or 2, consisting solely of the specified `codePoint`.

Parameters:

- `codePoint`: the `codePoint` to be converted

**Returns:** the string representation of the specified `codePoint`

**Since:** 11

Throws:

- `IllegalArgumentException`: if the specified `codePoint` is not a valid Unicode code point.

## Character.isValidCodePoint(int)

```java
public static boolean isValidCodePoint(int codePoint)
```

Determines whether the specified code point is a valid

Unicode code point value.

Parameters:

- `codePoint`: the Unicode code point to be tested

**Returns:** `true` if the specified code point value is between
        `MIN_CODE_POINT` and
        `MAX_CODE_POINT` inclusive;
        `false` otherwise.

**Since:** 1.5

## Character.isBmpCodePoint(int)

```java
public static boolean isBmpCodePoint(int codePoint)
```

Determines whether the specified character (Unicode code point)
is in the Basic <example-value> Plane (BMP).
Such code points can be represented using a single `char`.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested

**Returns:** `true` if the specified code point is between
        `MIN_VALUE` and `MAX_VALUE` inclusive;
        `false` otherwise.

**Since:** 1.7

## Character.isSupplementaryCodePoint(int)

```java
public static boolean isSupplementaryCodePoint(int codePoint)
```

Determines whether the specified character (Unicode code point)
is in the supplementary character range.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested

**Returns:** `true` if the specified code point is between
        `MIN_SUPPLEMENTARY_CODE_POINT` and
        `MAX_CODE_POINT` inclusive;
        `false` otherwise.

**Since:** 1.5

## Character.isHighSurrogate(char)

```java
public static boolean isHighSurrogate(char ch)
```

Determines if the given `char` value is a

Unicode high-surrogate code unit
(also known as *leading-surrogate code unit*).

Such values do not represent characters by themselves,
but are used in the representation of
supplementary characters
in the UTF-16 encoding.

Parameters:

- `ch`: the `char` value to be tested.

**Returns:** `true` if the `char` value is between
        `MIN_HIGH_SURROGATE` and
        `MAX_HIGH_SURROGATE` inclusive;
        `false` otherwise.

**See also:** Character#isLowSurrogate(char)

**See also:** Character.UnicodeBlock#of(int)

**Since:** 1.5

## Character.isLowSurrogate(char)

```java
public static boolean isLowSurrogate(char ch)
```

Determines if the given `char` value is a

Unicode low-surrogate code unit
(also known as *trailing-surrogate code unit*).

Such values do not represent characters by themselves,
but are used in the representation of
supplementary characters
in the UTF-16 encoding.

Parameters:

- `ch`: the `char` value to be tested.

**Returns:** `true` if the `char` value is between
        `MIN_LOW_SURROGATE` and
        `MAX_LOW_SURROGATE` inclusive;
        `false` otherwise.

**See also:** Character#isHighSurrogate(char)

**Since:** 1.5

## Character.isSurrogate(char)

```java
public static boolean isSurrogate(char ch)
```

Determines if the given `char` value is a Unicode
*surrogate code unit*.

Such values do not represent characters by themselves,
but are used in the representation of
supplementary characters
in the UTF-16 encoding.

A char value is a surrogate code unit if and only if it is either
a low-surrogate code unit or
a high-surrogate code unit.

Parameters:

- `ch`: the `char` value to be tested.

**Returns:** `true` if the `char` value is between
        `MIN_SURROGATE` and
        `MAX_SURROGATE` inclusive;
        `false` otherwise.

**Since:** 1.7

## Character.isSurrogatePair(char, char)

```java
public static boolean isSurrogatePair(char high, char low)
```

Determines whether the specified pair of `char`
values is a valid

Unicode surrogate pair.

This method is equivalent to the expression:

```java
isHighSurrogate(high) && isLowSurrogate(low)
```

Parameters:

- `high`: the high-surrogate code value to be tested
- `low`: the low-surrogate code value to be tested

**Returns:** `true` if the specified high and
low-surrogate code values represent a valid surrogate pair;
`false` otherwise.

**Since:** 1.5
