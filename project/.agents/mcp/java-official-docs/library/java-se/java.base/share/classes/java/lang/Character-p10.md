---
title: "Character class (java.lang) (part 10 of 12)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Character.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Character class (java.lang) (part 10 of 12)

## Character.isIdentifierIgnorable(char)

```java
public static boolean isIdentifierIgnorable(char ch)
```

Determines if the specified character should be regarded as
an ignorable character in a Java identifier or a Unicode identifier.

The following Unicode characters are ignorable in a Java identifier
or a Unicode identifier:

- ISO control characters that are not whitespace

- `'\u005Cu0000'` through `'\u005Cu0008'`

- `'\u005Cu000E'` through `'\u005Cu001B'`

- `'\u005Cu007F'` through `'\u005Cu009F'`

- all characters that have the `FORMAT` general
category value

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `isIdentifierIgnorable(int)` method.

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character is an ignorable control
         character that may be part of a Java or Unicode identifier;
          `false` otherwise.

**See also:** Character#isJavaIdentifierPart(char)

**See also:** Character#isUnicodeIdentifierPart(char)

**Since:** 1.1

## Character.isIdentifierIgnorable(int)

```java
public static boolean isIdentifierIgnorable(int codePoint)
```

Determines if the specified character (Unicode code point) should be regarded as
an ignorable character in a Java identifier or a Unicode identifier.

The following Unicode characters are ignorable in a Java identifier
or a Unicode identifier:

- ISO control characters that are not whitespace

- `'\u005Cu0000'` through `'\u005Cu0008'`

- `'\u005Cu000E'` through `'\u005Cu001B'`

- `'\u005Cu007F'` through `'\u005Cu009F'`

- all characters that have the `FORMAT` general
category value

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is an ignorable control
         character that may be part of a Java or Unicode identifier;
         `false` otherwise.

**See also:** Character#isJavaIdentifierPart(int)

**See also:** Character#isUnicodeIdentifierPart(int)

**Since:** 1.5

## Character.isEmoji(int)

```java
public static boolean isEmoji(int codePoint)
```

Determines if the specified character (Unicode code point) is an Emoji.

A character is considered to be an Emoji if and only if it has the `Emoji`
property, defined in

Unicode Emoji (Technical Standard #51).

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is an Emoji;
         `false` otherwise.

**Since:** 21

## Character.isEmojiPresentation(int)

```java
public static boolean isEmojiPresentation(int codePoint)
```

Determines if the specified character (Unicode code point) has the
Emoji Presentation property by default.

A character is considered to have the Emoji Presentation property if and
only if it has the `Emoji_Presentation` property, defined in

Unicode Emoji (Technical Standard #51).

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character has the Emoji Presentation
         property; `false` otherwise.

**Since:** 21

## Character.isEmojiModifier(int)

```java
public static boolean isEmojiModifier(int codePoint)
```

Determines if the specified character (Unicode code point) is an
Emoji Modifier.

A character is considered to be an Emoji Modifier if and only if it has
the `Emoji_Modifier` property, defined in

Unicode Emoji (Technical Standard #51).

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is an Emoji Modifier;
         `false` otherwise.

**Since:** 21

## Character.isEmojiModifierBase(int)

```java
public static boolean isEmojiModifierBase(int codePoint)
```

Determines if the specified character (Unicode code point) is an
Emoji Modifier Base.

A character is considered to be an Emoji Modifier Base if and only if it has
the `Emoji_Modifier_Base` property, defined in

Unicode Emoji (Technical Standard #51).

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is an Emoji Modifier Base;
         `false` otherwise.

**Since:** 21

## Character.isEmojiComponent(int)

```java
public static boolean isEmojiComponent(int codePoint)
```

Determines if the specified character (Unicode code point) is an
Emoji Component.

A character is considered to be an Emoji Component if and only if it has
the `Emoji_Component` property, defined in

Unicode Emoji (Technical Standard #51).

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is an Emoji Component;
         `false` otherwise.

**Since:** 21

## Character.isExtendedPictographic(int)

```java
public static boolean isExtendedPictographic(int codePoint)
```

Determines if the specified character (Unicode code point) is
an Extended Pictographic.

A character is considered to be an Extended Pictographic if and only if it has
the `Extended_Pictographic` property, defined in

Unicode Emoji (Technical Standard #51).

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is an Extended Pictographic;
         `false` otherwise.

**Since:** 21

## Character.toLowerCase(char)

```java
public static char toLowerCase(char ch)
```

Converts the character argument to lowercase using case
mapping information from the UnicodeData file.

Note that
`Character.isLowerCase(Character.toLowerCase(ch))`
does not always return `true` for some ranges of
characters, particularly those that are symbols or ideographs.

In general, `String.toLowerCase()` should be used to map
characters to lowercase. `String` case mapping methods
have several benefits over `Character` case mapping methods.
`String` case mapping methods can perform locale-sensitive
mappings, context-sensitive mappings, and 1:M character mappings, whereas
the `Character` case mapping methods cannot.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `toLowerCase(int)` method.

Parameters:

- `ch`: the character to be converted.

**Returns:** the lowercase equivalent of the character, if any;
         otherwise, the character itself.

**See also:** Character#isLowerCase(char)

**See also:** String#toLowerCase()

## Character.toLowerCase(int)

```java
public static int toLowerCase(int codePoint)
```

Converts the character (Unicode code point) argument to
lowercase using case mapping information from the UnicodeData
file.

 Note that
`Character.isLowerCase(Character.toLowerCase(codePoint))`
does not always return `true` for some ranges of
characters, particularly those that are symbols or ideographs.

In general, `String.toLowerCase()` should be used to map
characters to lowercase. `String` case mapping methods
have several benefits over `Character` case mapping methods.
`String` case mapping methods can perform locale-sensitive
mappings, context-sensitive mappings, and 1:M character mappings, whereas
the `Character` case mapping methods cannot.

Parameters:

- `codePoint`: the character (Unicode code point) to be converted.

**Returns:** the lowercase equivalent of the character (Unicode code
         point), if any; otherwise, the character itself.

**See also:** Character#isLowerCase(int)

**See also:** String#toLowerCase()

**Since:** 1.5

## Character.toUpperCase(char)

```java
public static char toUpperCase(char ch)
```

Converts the character argument to uppercase using case mapping
information from the UnicodeData file.

Note that
`Character.isUpperCase(Character.toUpperCase(ch))`
does not always return `true` for some ranges of
characters, particularly those that are symbols or ideographs.

In general, `String.toUpperCase()` should be used to map
characters to uppercase. `String` case mapping methods
have several benefits over `Character` case mapping methods.
`String` case mapping methods can perform locale-sensitive
mappings, context-sensitive mappings, and 1:M character mappings, whereas
the `Character` case mapping methods cannot.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `toUpperCase(int)` method.

Parameters:

- `ch`: the character to be converted.

**Returns:** the uppercase equivalent of the character, if any;
         otherwise, the character itself.

**See also:** Character#isUpperCase(char)

**See also:** String#toUpperCase()

## Character.toUpperCase(int)

```java
public static int toUpperCase(int codePoint)
```

Converts the character (Unicode code point) argument to
uppercase using case mapping information from the UnicodeData
file.

Note that
`Character.isUpperCase(Character.toUpperCase(codePoint))`
does not always return `true` for some ranges of
characters, particularly those that are symbols or ideographs.

In general, `String.toUpperCase()` should be used to map
characters to uppercase. `String` case mapping methods
have several benefits over `Character` case mapping methods.
`String` case mapping methods can perform locale-sensitive
mappings, context-sensitive mappings, and 1:M character mappings, whereas
the `Character` case mapping methods cannot.

Parameters:

- `codePoint`: the character (Unicode code point) to be converted.

**Returns:** the uppercase equivalent of the character, if any;
         otherwise, the character itself.

**See also:** Character#isUpperCase(int)

**See also:** String#toUpperCase()

**Since:** 1.5

## Character.toTitleCase(char)

```java
public static char toTitleCase(char ch)
```

Converts the character argument to titlecase using case mapping
information from the UnicodeData file. If a character has no
explicit titlecase mapping and is not itself a titlecase char
according to UnicodeData, then the uppercase mapping is
returned as an equivalent titlecase mapping. If the
`char` argument is already a titlecase
`char`, the same `char` value will be
returned.

Note that
`Character.isTitleCase(Character.toTitleCase(ch))`
does not always return `true` for some ranges of
characters.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `toTitleCase(int)` method.

Parameters:

- `ch`: the character to be converted.

**Returns:** the titlecase equivalent of the character, if any;
         otherwise, the character itself.

**See also:** Character#isTitleCase(char)

**See also:** Character#toLowerCase(char)

**See also:** Character#toUpperCase(char)

**Since:** 1.0.2

## Character.toTitleCase(int)

```java
public static int toTitleCase(int codePoint)
```

Converts the character (Unicode code point) argument to titlecase using case mapping
information from the UnicodeData file. If a character has no
explicit titlecase mapping and is not itself a titlecase char
according to UnicodeData, then the uppercase mapping is
returned as an equivalent titlecase mapping. If the
character argument is already a titlecase
character, the same character value will be
returned.

Note that
`Character.isTitleCase(Character.toTitleCase(codePoint))`
does not always return `true` for some ranges of
characters.

Parameters:

- `codePoint`: the character (Unicode code point) to be converted.

**Returns:** the titlecase equivalent of the character, if any;
         otherwise, the character itself.

**See also:** Character#isTitleCase(int)

**See also:** Character#toLowerCase(int)

**See also:** Character#toUpperCase(int)

**Since:** 1.5

## Character.digit(char, int)

```java
public static int digit(char ch, int radix)
```

Returns the numeric value of the character `ch` in the
specified radix.

If the radix is not in the range `MIN_RADIX` &le;
`radix` &le; `MAX_RADIX` or if the
value of `ch` is not a valid digit in the specified
radix, `-1` is returned. A character is a valid digit
if at least one of the following is true:

- The method `isDigit` is `true` of the character
    and the Unicode decimal digit value of the character (or its
    single-character decomposition) is less than the specified radix.
    In this case the decimal digit value is returned.

- The character is one of the uppercase Latin letters
    `'A'` through `'Z'` and its code is less than
    `radix + 'A' - 10`.
    In this case, `ch - 'A' + 10`
    is returned.

- The character is one of the lowercase Latin letters
    `'a'` through `'z'` and its code is less than
    `radix + 'a' - 10`.
    In this case, `ch - 'a' + 10`
    is returned.

- The character is one of the fullwidth uppercase Latin letters A
    (`'\u005CuFF21'`) through Z (`'\u005CuFF3A'`)
    and its code is less than
    `radix + '\u005CuFF21' - 10`.
    In this case, `ch - '\u005CuFF21' + 10`
    is returned.

- The character is one of the fullwidth lowercase Latin letters a
    (`'\u005CuFF41'`) through z (`'\u005CuFF5A'`)
    and its code is less than
    `radix + '\u005CuFF41' - 10`.
    In this case, `ch - '\u005CuFF41' + 10`
    is returned.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the int) method.

Parameters:

- `ch`: the character to be converted.
- `radix`: the radix.

**Returns:** the numeric value represented by the character in the
         specified radix.

**See also:** Character#forDigit(int, int)

**See also:** Character#isDigit(char)
