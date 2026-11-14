---
title: "Character class (java.lang) (part 8 of 12)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Character.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Character class (java.lang) (part 8 of 12)

## Character.offsetByCodePoints(char[], int, int, int, int)

```java
public static int offsetByCodePoints(char[] a, int start, int count, int index, int codePointOffset)
```

Returns the index within the given `char` subarray
that is offset from the given `index` by
`codePointOffset` code points. The
`start` and `count` arguments specify a
subarray of the `char` array. Unpaired surrogates
within the text range given by `index` and
`codePointOffset` count as one code point each.

Parameters:

- `a`: the `char` array
- `start`: the index of the first `char` of the subarray
- `count`: the length of the subarray in `char`s
- `index`: the index to be offset
- `codePointOffset`: the offset in code points

**Returns:** the index within the subarray

**Since:** 1.5

Throws:

- `NullPointerException`: if `a` is null.
- `IndexOutOfBoundsException`: if `start` or `count` is negative, or if `start + count` is larger than the length of the given array, or if `index` is less than `start` or larger then `start + count`, or if `codePointOffset` is positive and the text range starting with `index` and ending with `start + count - 1` has fewer than `codePointOffset` code points, or if `codePointOffset` is negative and the text range starting with `start` and ending with `index - 1` has fewer than the absolute value of `codePointOffset` code points.

## Character.isLowerCase(char)

```java
public static boolean isLowerCase(char ch)
```

Determines if the specified character is a lowercase character.

A character is lowercase if its general category type, provided
by `Character.getType(ch)`, is
`LOWERCASE_LETTER`, or it has contributory property
Other_Lowercase as defined by the Unicode Standard.

The following are examples of lowercase characters:

```java
a b c d e f g h i j k l m n o p q r s t u v w x y z
'\u00DF' '\u00E0' '\u00E1' '\u00E2' '\u00E3' '\u00E4' '\u00E5' '\u00E6'
'\u00E7' '\u00E8' '\u00E9' '\u00EA' '\u00EB' '\u00EC' '\u00ED' '\u00EE'
'\u00EF' '\u00F0' '\u00F1' '\u00F2' '\u00F3' '\u00F4' '\u00F5' '\u00F6'
'\u00F8' '\u00F9' '\u00FA' '\u00FB' '\u00FC' '\u00FD' '\u00FE' '\u00FF'
```

 Many other Unicode characters are lowercase too.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `isLowerCase(int)` method.

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character is lowercase;
         `false` otherwise.

**See also:** Character#isLowerCase(char)

**See also:** Character#isTitleCase(char)

**See also:** Character#toLowerCase(char)

**See also:** Character#getType(char)

## Character.isLowerCase(int)

```java
public static boolean isLowerCase(int codePoint)
```

Determines if the specified character (Unicode code point) is a
lowercase character.

A character is lowercase if its general category type, provided
by getType(codePoint), is
`LOWERCASE_LETTER`, or it has contributory property
Other_Lowercase as defined by the Unicode Standard.

The following are examples of lowercase characters:

```java
a b c d e f g h i j k l m n o p q r s t u v w x y z
'\u00DF' '\u00E0' '\u00E1' '\u00E2' '\u00E3' '\u00E4' '\u00E5' '\u00E6'
'\u00E7' '\u00E8' '\u00E9' '\u00EA' '\u00EB' '\u00EC' '\u00ED' '\u00EE'
'\u00EF' '\u00F0' '\u00F1' '\u00F2' '\u00F3' '\u00F4' '\u00F5' '\u00F6'
'\u00F8' '\u00F9' '\u00FA' '\u00FB' '\u00FC' '\u00FD' '\u00FE' '\u00FF'
```

 Many other Unicode characters are lowercase too.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is lowercase;
         `false` otherwise.

**See also:** Character#isLowerCase(int)

**See also:** Character#isTitleCase(int)

**See also:** Character#toLowerCase(int)

**See also:** Character#getType(int)

**Since:** 1.5

## Character.isUpperCase(char)

```java
public static boolean isUpperCase(char ch)
```

Determines if the specified character is an uppercase character.

A character is uppercase if its general category type, provided by
`Character.getType(ch)`, is `UPPERCASE_LETTER`.
or it has contributory property Other_Uppercase as defined by the Unicode Standard.

The following are examples of uppercase characters:

```java
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
'\u00C0' '\u00C1' '\u00C2' '\u00C3' '\u00C4' '\u00C5' '\u00C6' '\u00C7'
'\u00C8' '\u00C9' '\u00CA' '\u00CB' '\u00CC' '\u00CD' '\u00CE' '\u00CF'
'\u00D0' '\u00D1' '\u00D2' '\u00D3' '\u00D4' '\u00D5' '\u00D6' '\u00D8'
'\u00D9' '\u00DA' '\u00DB' '\u00DC' '\u00DD' '\u00DE'
```

 Many other Unicode characters are uppercase too.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `isUpperCase(int)` method.

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character is uppercase;
         `false` otherwise.

**See also:** Character#isLowerCase(char)

**See also:** Character#isTitleCase(char)

**See also:** Character#toUpperCase(char)

**See also:** Character#getType(char)

**Since:** 1.0

## Character.isUpperCase(int)

```java
public static boolean isUpperCase(int codePoint)
```

Determines if the specified character (Unicode code point) is an uppercase character.

A character is uppercase if its general category type, provided by
getType(codePoint), is `UPPERCASE_LETTER`,
or it has contributory property Other_Uppercase as defined by the Unicode Standard.

The following are examples of uppercase characters:

```java
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
'\u00C0' '\u00C1' '\u00C2' '\u00C3' '\u00C4' '\u00C5' '\u00C6' '\u00C7'
'\u00C8' '\u00C9' '\u00CA' '\u00CB' '\u00CC' '\u00CD' '\u00CE' '\u00CF'
'\u00D0' '\u00D1' '\u00D2' '\u00D3' '\u00D4' '\u00D5' '\u00D6' '\u00D8'
'\u00D9' '\u00DA' '\u00DB' '\u00DC' '\u00DD' '\u00DE'
```

 Many other Unicode characters are uppercase too.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is uppercase;
         `false` otherwise.

**See also:** Character#isLowerCase(int)

**See also:** Character#isTitleCase(int)

**See also:** Character#toUpperCase(int)

**See also:** Character#getType(int)

**Since:** 1.5

## Character.isTitleCase(char)

```java
public static boolean isTitleCase(char ch)
```

Determines if the specified character is a titlecase character.

A character is a titlecase character if its general
category type, provided by `Character.getType(ch)`,
is `TITLECASE_LETTER`.

Some characters look like pairs of Latin letters. For example, there
is an uppercase letter that looks like "LJ" and has a corresponding
lowercase letter that looks like "lj". A third form, which looks like "Lj",
is the appropriate form to use when rendering a word in lowercase
with initial capitals, as for a book title.

These are some of the Unicode characters for which this method returns
`true`:

- `LATIN CAPITAL LETTER D WITH SMALL LETTER Z WITH CARON`

- `LATIN CAPITAL LETTER L WITH SMALL LETTER J`

- `LATIN CAPITAL LETTER N WITH SMALL LETTER J`

- `LATIN CAPITAL LETTER D WITH SMALL LETTER Z`

 Many other Unicode characters are titlecase too.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `isTitleCase(int)` method.

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character is titlecase;
         `false` otherwise.

**See also:** Character#isLowerCase(char)

**See also:** Character#isUpperCase(char)

**See also:** Character#toTitleCase(char)

**See also:** Character#getType(char)

**Since:** 1.0.2

## Character.isTitleCase(int)

```java
public static boolean isTitleCase(int codePoint)
```

Determines if the specified character (Unicode code point) is a titlecase character.

A character is a titlecase character if its general
category type, provided by getType(codePoint),
is `TITLECASE_LETTER`.

Some characters look like pairs of Latin letters. For example, there
is an uppercase letter that looks like "LJ" and has a corresponding
lowercase letter that looks like "lj". A third form, which looks like "Lj",
is the appropriate form to use when rendering a word in lowercase
with initial capitals, as for a book title.

These are some of the Unicode characters for which this method returns
`true`:

- `LATIN CAPITAL LETTER D WITH SMALL LETTER Z WITH CARON`

- `LATIN CAPITAL LETTER L WITH SMALL LETTER J`

- `LATIN CAPITAL LETTER N WITH SMALL LETTER J`

- `LATIN CAPITAL LETTER D WITH SMALL LETTER Z`

 Many other Unicode characters are titlecase too.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is titlecase;
         `false` otherwise.

**See also:** Character#isLowerCase(int)

**See also:** Character#isUpperCase(int)

**See also:** Character#toTitleCase(int)

**See also:** Character#getType(int)

**Since:** 1.5

## Character.isDigit(char)

```java
public static boolean isDigit(char ch)
```

Determines if the specified character is a digit.

A character is a digit if its general category type, provided
by `Character.getType(ch)`, is
`DECIMAL_DIGIT_NUMBER`.

Some Unicode character ranges that contain digits:

- `'\u005Cu0030'` through `'\u005Cu0039'`,
    ISO-LATIN-1 digits (`'0'` through `'9'`)

- `'\u005Cu0660'` through `'\u005Cu0669'`,
    Arabic-Indic digits

- `'\u005Cu06F0'` through `'\u005Cu06F9'`,
    Extended Arabic-Indic digits

- `'\u005Cu0966'` through `'\u005Cu096F'`,
    Devanagari digits

- `'\u005CuFF10'` through `'\u005CuFF19'`,
    Fullwidth digits

Many other character ranges contain digits as well.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `isDigit(int)` method.

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character is a digit;
         `false` otherwise.

**See also:** Character#digit(char, int)

**See also:** Character#forDigit(int, int)

**See also:** Character#getType(char)

## Character.isDigit(int)

```java
public static boolean isDigit(int codePoint)
```

Determines if the specified character (Unicode code point) is a digit.

A character is a digit if its general category type, provided
by getType(codePoint), is
`DECIMAL_DIGIT_NUMBER`.

Some Unicode character ranges that contain digits:

- `'\u005Cu0030'` through `'\u005Cu0039'`,
    ISO-LATIN-1 digits (`'0'` through `'9'`)

- `'\u005Cu0660'` through `'\u005Cu0669'`,
    Arabic-Indic digits

- `'\u005Cu06F0'` through `'\u005Cu06F9'`,
    Extended Arabic-Indic digits

- `'\u005Cu0966'` through `'\u005Cu096F'`,
    Devanagari digits

- `'\u005CuFF10'` through `'\u005CuFF19'`,
    Fullwidth digits

Many other character ranges contain digits as well.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is a digit;
         `false` otherwise.

**See also:** Character#forDigit(int, int)

**See also:** Character#getType(int)

**Since:** 1.5

## Character.isDefined(char)

```java
public static boolean isDefined(char ch)
```

Determines if a character is defined in Unicode.

A character is defined if at least one of the following is true:

- It has an entry in the UnicodeData file.

- It has a value in a range defined by the UnicodeData file.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `isDefined(int)` method.

Parameters:

- `ch`: the character to be tested

**Returns:** `true` if the character has a defined meaning
         in Unicode; `false` otherwise.

**See also:** Character#isDigit(char)

**See also:** Character#isLetter(char)

**See also:** Character#isLetterOrDigit(char)

**See also:** Character#isLowerCase(char)

**See also:** Character#isTitleCase(char)

**See also:** Character#isUpperCase(char)

**Since:** 1.0.2

## Character.isDefined(int)

```java
public static boolean isDefined(int codePoint)
```

Determines if a character (Unicode code point) is defined in Unicode.

A character is defined if at least one of the following is true:

- It has an entry in the UnicodeData file.

- It has a value in a range defined by the UnicodeData file.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character has a defined meaning
         in Unicode; `false` otherwise.

**See also:** Character#isDigit(int)

**See also:** Character#isLetter(int)

**See also:** Character#isLetterOrDigit(int)

**See also:** Character#isLowerCase(int)

**See also:** Character#isTitleCase(int)

**See also:** Character#isUpperCase(int)

**Since:** 1.5

## Character.isLetter(char)

```java
public static boolean isLetter(char ch)
```

Determines if the specified character is a letter.

A character is considered to be a letter if its general
category type, provided by `Character.getType(ch)`,
is any of the following:

-  `UPPERCASE_LETTER`

-  `LOWERCASE_LETTER`

-  `TITLECASE_LETTER`

-  `MODIFIER_LETTER`

-  `OTHER_LETTER`

Not all letters have case. Many characters are
letters but are neither uppercase nor lowercase nor titlecase.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `isLetter(int)` method.

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character is a letter;
         `false` otherwise.

**See also:** Character#isDigit(char)

**See also:** Character#isJavaIdentifierStart(char)

**See also:** Character#isJavaLetter(char)

**See also:** Character#isJavaLetterOrDigit(char)

**See also:** Character#isLetterOrDigit(char)

**See also:** Character#isLowerCase(char)

**See also:** Character#isTitleCase(char)

**See also:** Character#isUnicodeIdentifierStart(char)

**See also:** Character#isUpperCase(char)

## Character.isLetter(int)

```java
public static boolean isLetter(int codePoint)
```

Determines if the specified character (Unicode code point) is a letter.

A character is considered to be a letter if its general
category type, provided by getType(codePoint),
is any of the following:

-  `UPPERCASE_LETTER`

-  `LOWERCASE_LETTER`

-  `TITLECASE_LETTER`

-  `MODIFIER_LETTER`

-  `OTHER_LETTER`

Not all letters have case. Many characters are
letters but are neither uppercase nor lowercase nor titlecase.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is a letter;
         `false` otherwise.

**See also:** Character#isDigit(int)

**See also:** Character#isJavaIdentifierStart(int)

**See also:** Character#isLetterOrDigit(int)

**See also:** Character#isLowerCase(int)

**See also:** Character#isTitleCase(int)

**See also:** Character#isUnicodeIdentifierStart(int)

**See also:** Character#isUpperCase(int)

**Since:** 1.5
