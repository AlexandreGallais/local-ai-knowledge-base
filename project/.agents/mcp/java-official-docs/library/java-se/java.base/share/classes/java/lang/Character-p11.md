---
title: "Character class (java.lang) (part 11 of 12)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Character.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Character class (java.lang) (part 11 of 12)

## Character.digit(int, int)

```java
public static int digit(int codePoint, int radix)
```

Returns the numeric value of the specified character (Unicode
code point) in the specified radix.

If the radix is not in the range `MIN_RADIX` &le;
`radix` &le; `MAX_RADIX` or if the
character is not a valid digit in the specified
radix, `-1` is returned. A character is a valid digit
if at least one of the following is true:

- The method isDigit(codePoint) is `true` of the character
    and the Unicode decimal digit value of the character (or its
    single-character decomposition) is less than the specified radix.
    In this case the decimal digit value is returned.

- The character is one of the uppercase Latin letters
    `'A'` through `'Z'` and its code is less than
    `radix + 'A' - 10`.
    In this case, `codePoint - 'A' + 10`
    is returned.

- The character is one of the lowercase Latin letters
    `'a'` through `'z'` and its code is less than
    `radix + 'a' - 10`.
    In this case, `codePoint - 'a' + 10`
    is returned.

- The character is one of the fullwidth uppercase Latin letters A
    (`'\u005CuFF21'`) through Z (`'\u005CuFF3A'`)
    and its code is less than
    `radix + '\u005CuFF21' - 10`.
    In this case,
    `codePoint - '\u005CuFF21' + 10`
    is returned.

- The character is one of the fullwidth lowercase Latin letters a
    (`'\u005CuFF41'`) through z (`'\u005CuFF5A'`)
    and its code is less than
    `radix + '\u005CuFF41'- 10`.
    In this case,
    `codePoint - '\u005CuFF41' + 10`
    is returned.

Parameters:

- `codePoint`: the character (Unicode code point) to be converted.
- `radix`: the radix.

**Returns:** the numeric value represented by the character in the
         specified radix.

**See also:** Character#forDigit(int, int)

**See also:** Character#isDigit(int)

**Since:** 1.5

## Character.getNumericValue(char)

```java
public static int getNumericValue(char ch)
```

Returns the `int` value that the specified Unicode
character represents. For example, the character
`'\u005Cu216C'` (the roman numeral fifty) will return
an int with a value of 50.

The letters A-Z in their uppercase (`'\u005Cu0041'` through
`'\u005Cu005A'`), lowercase
(`'\u005Cu0061'` through `'\u005Cu007A'`), and
full width variant (`'\u005CuFF21'` through
`'\u005CuFF3A'` and `'\u005CuFF41'` through
`'\u005CuFF5A'`) forms have numeric values from 10
through 35. This is independent of the Unicode specification,
which does not assign numeric values to these `char`
values.

If the character does not have a numeric value, then -1 is returned.
If the character has a numeric value that cannot be represented as a
nonnegative integer (for example, a fractional value), then -2
is returned.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `getNumericValue(int)` method.

Parameters:

- `ch`: the character to be converted.

**Returns:** the numeric value of the character, as a nonnegative `int`
         value; -2 if the character has a numeric value but the value
         can not be represented as a nonnegative `int` value;
         -1 if the character has no numeric value.

**See also:** Character#forDigit(int, int)

**See also:** Character#isDigit(char)

**Since:** 1.1

## Character.getNumericValue(int)

```java
public static int getNumericValue(int codePoint)
```

Returns the `int` value that the specified
character (Unicode code point) represents. For example, the character
`'\u005Cu216C'` (the Roman numeral fifty) will return
an `int` with a value of 50.

The letters A-Z in their uppercase (`'\u005Cu0041'` through
`'\u005Cu005A'`), lowercase
(`'\u005Cu0061'` through `'\u005Cu007A'`), and
full width variant (`'\u005CuFF21'` through
`'\u005CuFF3A'` and `'\u005CuFF41'` through
`'\u005CuFF5A'`) forms have numeric values from 10
through 35. This is independent of the Unicode specification,
which does not assign numeric values to these `char`
values.

If the character does not have a numeric value, then -1 is returned.
If the character has a numeric value that cannot be represented as a
nonnegative integer (for example, a fractional value), then -2
is returned.

Parameters:

- `codePoint`: the character (Unicode code point) to be converted.

**Returns:** the numeric value of the character, as a nonnegative `int`
         value; -2 if the character has a numeric value but the value
         can not be represented as a nonnegative `int` value;
         -1 if the character has no numeric value.

**See also:** Character#forDigit(int, int)

**See also:** Character#isDigit(int)

**Since:** 1.5

## Character.isSpace(char)

```java
public static boolean isSpace(char ch)
```

Determines if the specified character is ISO-LATIN-1 white space.
This method returns `true` for the following five
characters only:

truechars

Character
    Code
    Name

`'\t'`            `U+0009`
    `HORIZONTAL TABULATION`
`'\n'`            `U+000A`
    `NEW LINE`
`'\f'`            `U+000C`
    `FORM FEED`
`'\r'`            `U+000D`
    `CARRIAGE RETURN`
`' '`  `U+0020`
    `SPACE`

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character is ISO-LATIN-1 white
            space; `false` otherwise.

**See also:** Character#isSpaceChar(char)

**See also:** Character#isWhitespace(char)

**Deprecated:** Replaced by isWhitespace(char).

## Character.isSpaceChar(char)

```java
public static boolean isSpaceChar(char ch)
```

Determines if the specified character is a Unicode space character.
A character is considered to be a space character if and only if
it is specified to be a space character by the Unicode Standard. This
method returns true if the character's general category type is any of
the following:

-  `SPACE_SEPARATOR`

-  `LINE_SEPARATOR`

-  `PARAGRAPH_SEPARATOR`

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `isSpaceChar(int)` method.

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character is a space character;
         `false` otherwise.

**See also:** Character#isWhitespace(char)

**Since:** 1.1

## Character.isSpaceChar(int)

```java
public static boolean isSpaceChar(int codePoint)
```

Determines if the specified character (Unicode code point) is a
Unicode space character.  A character is considered to be a
space character if and only if it is specified to be a space
character by the Unicode Standard. This method returns true if
the character's general category type is any of the following:

-  `SPACE_SEPARATOR`

-  `LINE_SEPARATOR`

-  `PARAGRAPH_SEPARATOR`

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is a space character;
         `false` otherwise.

**See also:** Character#isWhitespace(int)

**Since:** 1.5

## Character.isWhitespace(char)

```java
public static boolean isWhitespace(char ch)
```

Determines if the specified character is white space according to Java.
A character is a Java whitespace character if and only if it satisfies
one of the following criteria:

-  It is a Unicode space character (`SPACE_SEPARATOR`,
     `LINE_SEPARATOR`, or `PARAGRAPH_SEPARATOR`)
     but is not also a non-breaking space (`'\u005Cu00A0'`,
     `'\u005Cu2007'`, `'\u005Cu202F'`).

-  It is `'\u005Ct'`, U+0009 HORIZONTAL TABULATION.

-  It is `'\u005Cn'`, U+000A LINE FEED.

-  It is `'\u005Cu000B'`, U+000B VERTICAL TABULATION.

-  It is `'\u005Cf'`, U+000C FORM FEED.

-  It is `'\u005Cr'`, U+000D CARRIAGE RETURN.

-  It is `'\u005Cu001C'`, U+001C FILE SEPARATOR.

-  It is `'\u005Cu001D'`, U+001D GROUP SEPARATOR.

-  It is `'\u005Cu001E'`, U+001E RECORD SEPARATOR.

-  It is `'\u005Cu001F'`, U+001F UNIT SEPARATOR.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `isWhitespace(int)` method.

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character is a Java whitespace
         character; `false` otherwise.

**See also:** Character#isSpaceChar(char)

**Since:** 1.1

## Character.isWhitespace(int)

```java
public static boolean isWhitespace(int codePoint)
```

Determines if the specified character (Unicode code point) is
white space according to Java.  A character is a Java
whitespace character if and only if it satisfies one of the
following criteria:

-  It is a Unicode space character (`SPACE_SEPARATOR`,
     `LINE_SEPARATOR`, or `PARAGRAPH_SEPARATOR`)
     but is not also a non-breaking space (`'\u005Cu00A0'`,
     `'\u005Cu2007'`, `'\u005Cu202F'`).

-  It is `'\u005Ct'`, U+0009 HORIZONTAL TABULATION.

-  It is `'\u005Cn'`, U+000A LINE FEED.

-  It is `'\u005Cu000B'`, U+000B VERTICAL TABULATION.

-  It is `'\u005Cf'`, U+000C FORM FEED.

-  It is `'\u005Cr'`, U+000D CARRIAGE RETURN.

-  It is `'\u005Cu001C'`, U+001C FILE SEPARATOR.

-  It is `'\u005Cu001D'`, U+001D GROUP SEPARATOR.

-  It is `'\u005Cu001E'`, U+001E RECORD SEPARATOR.

-  It is `'\u005Cu001F'`, U+001F UNIT SEPARATOR.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is a Java whitespace
         character; `false` otherwise.

**See also:** Character#isSpaceChar(int)

**Since:** 1.5

## Character.isISOControl(char)

```java
public static boolean isISOControl(char ch)
```

Determines if the specified character is an ISO control
character.  A character is considered to be an ISO control
character if its code is in the range `'\u005Cu0000'`
through `'\u005Cu001F'` or in the range
`'\u005Cu007F'` through `'\u005Cu009F'`.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `isISOControl(int)` method.

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character is an ISO control character;
         `false` otherwise.

**See also:** Character#isSpaceChar(char)

**See also:** Character#isWhitespace(char)

**Since:** 1.1

## Character.isISOControl(int)

```java
public static boolean isISOControl(int codePoint)
```

Determines if the referenced character (Unicode code point) is an ISO control
character.  A character is considered to be an ISO control
character if its code is in the range `'\u005Cu0000'`
through `'\u005Cu001F'` or in the range
`'\u005Cu007F'` through `'\u005Cu009F'`.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is an ISO control character;
         `false` otherwise.

**See also:** Character#isSpaceChar(int)

**See also:** Character#isWhitespace(int)

**Since:** 1.5

## Character.getType(char)

```java
public static int getType(char ch)
```

Returns a value indicating a character's general category.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `getType(int)` method.

Parameters:

- `ch`: the character to be tested.

**Returns:** a value of type `int` representing the
         character's general category.

**See also:** Character#COMBINING_SPACING_MARK

**See also:** Character#CONNECTOR_PUNCTUATION

**See also:** Character#CONTROL

**See also:** Character#CURRENCY_SYMBOL

**See also:** Character#DASH_PUNCTUATION

**See also:** Character#DECIMAL_DIGIT_NUMBER

**See also:** Character#ENCLOSING_MARK

**See also:** Character#END_PUNCTUATION

**See also:** Character#FINAL_QUOTE_PUNCTUATION

**See also:** Character#FORMAT

**See also:** Character#INITIAL_QUOTE_PUNCTUATION

**See also:** Character#LETTER_NUMBER

**See also:** Character#LINE_SEPARATOR

**See also:** Character#LOWERCASE_LETTER

**See also:** Character#MATH_SYMBOL

**See also:** Character#MODIFIER_LETTER

**See also:** Character#MODIFIER_SYMBOL

**See also:** Character#NON_SPACING_MARK

**See also:** Character#OTHER_LETTER

**See also:** Character#OTHER_NUMBER

**See also:** Character#OTHER_PUNCTUATION

**See also:** Character#OTHER_SYMBOL

**See also:** Character#PARAGRAPH_SEPARATOR

**See also:** Character#PRIVATE_USE

**See also:** Character#SPACE_SEPARATOR

**See also:** Character#START_PUNCTUATION

**See also:** Character#SURROGATE

**See also:** Character#TITLECASE_LETTER

**See also:** Character#UNASSIGNED

**See also:** Character#UPPERCASE_LETTER

**Since:** 1.1

## Character.getType(int)

```java
public static int getType(int codePoint)
```

Returns a value indicating a character's general category.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** a value of type `int` representing the
         character's general category.

**See also:** Character#COMBINING_SPACING_MARK COMBINING_SPACING_MARK

**See also:** Character#CONNECTOR_PUNCTUATION CONNECTOR_PUNCTUATION

**See also:** Character#CONTROL CONTROL

**See also:** Character#CURRENCY_SYMBOL CURRENCY_SYMBOL

**See also:** Character#DASH_PUNCTUATION DASH_PUNCTUATION

**See also:** Character#DECIMAL_DIGIT_NUMBER DECIMAL_DIGIT_NUMBER

**See also:** Character#ENCLOSING_MARK ENCLOSING_MARK

**See also:** Character#END_PUNCTUATION END_PUNCTUATION

**See also:** Character#FINAL_QUOTE_PUNCTUATION FINAL_QUOTE_PUNCTUATION

**See also:** Character#FORMAT FORMAT

**See also:** Character#INITIAL_QUOTE_PUNCTUATION INITIAL_QUOTE_PUNCTUATION

**See also:** Character#LETTER_NUMBER LETTER_NUMBER

**See also:** Character#LINE_SEPARATOR LINE_SEPARATOR

**See also:** Character#LOWERCASE_LETTER LOWERCASE_LETTER

**See also:** Character#MATH_SYMBOL MATH_SYMBOL

**See also:** Character#MODIFIER_LETTER MODIFIER_LETTER

**See also:** Character#MODIFIER_SYMBOL MODIFIER_SYMBOL

**See also:** Character#NON_SPACING_MARK NON_SPACING_MARK

**See also:** Character#OTHER_LETTER OTHER_LETTER

**See also:** Character#OTHER_NUMBER OTHER_NUMBER

**See also:** Character#OTHER_PUNCTUATION OTHER_PUNCTUATION

**See also:** Character#OTHER_SYMBOL OTHER_SYMBOL

**See also:** Character#PARAGRAPH_SEPARATOR PARAGRAPH_SEPARATOR

**See also:** Character#PRIVATE_USE PRIVATE_USE

**See also:** Character#SPACE_SEPARATOR SPACE_SEPARATOR

**See also:** Character#START_PUNCTUATION START_PUNCTUATION

**See also:** Character#SURROGATE SURROGATE

**See also:** Character#TITLECASE_LETTER TITLECASE_LETTER

**See also:** Character#UNASSIGNED UNASSIGNED

**See also:** Character#UPPERCASE_LETTER UPPERCASE_LETTER

**Since:** 1.5
