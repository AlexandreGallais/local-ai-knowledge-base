---
title: "Character class (java.lang) (part 9 of 12)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Character.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Character class (java.lang) (part 9 of 12)

## Character.isLetterOrDigit(char)

```java
public static boolean isLetterOrDigit(char ch)
```

Determines if the specified character is a letter or digit.

A character is considered to be a letter or digit if either
`Character.isLetter(char ch)` or
`Character.isDigit(char ch)` returns
`true` for the character.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `isLetterOrDigit(int)` method.

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character is a letter or digit;
         `false` otherwise.

**See also:** Character#isDigit(char)

**See also:** Character#isJavaIdentifierPart(char)

**See also:** Character#isJavaLetter(char)

**See also:** Character#isJavaLetterOrDigit(char)

**See also:** Character#isLetter(char)

**See also:** Character#isUnicodeIdentifierPart(char)

**Since:** 1.0.2

## Character.isLetterOrDigit(int)

```java
public static boolean isLetterOrDigit(int codePoint)
```

Determines if the specified character (Unicode code point) is a letter or digit.

A character is considered to be a letter or digit if either
isLetter(codePoint) or
isDigit(codePoint) returns
`true` for the character.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is a letter or digit;
         `false` otherwise.

**See also:** Character#isDigit(int)

**See also:** Character#isJavaIdentifierPart(int)

**See also:** Character#isLetter(int)

**See also:** Character#isUnicodeIdentifierPart(int)

**Since:** 1.5

## Character.isJavaLetter(char)

```java
public static boolean isJavaLetter(char ch)
```

Determines if the specified character is permissible as the first
character in a Java identifier.

A character may start a Java identifier if and only if
one of the following conditions is true:

-  isLetter(ch) returns `true`

-  getType(ch) returns `LETTER_NUMBER`

-  `ch` is a currency symbol (such as `'$'`)

-  `ch` is a connecting punctuation character (such as `'_'`).

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character may start a Java
         identifier; `false` otherwise.

**See also:** Character#isJavaLetterOrDigit(char)

**See also:** Character#isJavaIdentifierStart(char)

**See also:** Character#isJavaIdentifierPart(char)

**See also:** Character#isLetter(char)

**See also:** Character#isLetterOrDigit(char)

**See also:** Character#isUnicodeIdentifierStart(char)

**Since:** 1.0.2

**Deprecated:** Replaced by isJavaIdentifierStart(char).

## Character.isJavaLetterOrDigit(char)

```java
public static boolean isJavaLetterOrDigit(char ch)
```

Determines if the specified character may be part of a Java
identifier as other than the first character.

A character may be part of a Java identifier if and only if one
of the following conditions is true:

-   it is a letter

-   it is a currency symbol (such as `'$'`)

-   it is a connecting punctuation character (such as `'_'`)

-   it is a digit

-   it is a numeric letter (such as a Roman numeral character)

-   it is a combining mark

-   it is a non-spacing mark

-  `isIdentifierIgnorable` returns
`true` for the character.

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character may be part of a
         Java identifier; `false` otherwise.

**See also:** Character#isJavaLetter(char)

**See also:** Character#isJavaIdentifierStart(char)

**See also:** Character#isJavaIdentifierPart(char)

**See also:** Character#isLetter(char)

**See also:** Character#isLetterOrDigit(char)

**See also:** Character#isUnicodeIdentifierPart(char)

**See also:** Character#isIdentifierIgnorable(char)

**Since:** 1.0.2

**Deprecated:** Replaced by isJavaIdentifierPart(char).

## Character.isAlphabetic(int)

```java
public static boolean isAlphabetic(int codePoint)
```

Determines if the specified character (Unicode code point) is alphabetic.

A character is considered to be alphabetic if its general category type,
provided by getType(codePoint), is any of
the following:

-  `UPPERCASE_LETTER`

-  `LOWERCASE_LETTER`

-  `TITLECASE_LETTER`

-  `MODIFIER_LETTER`

-  `OTHER_LETTER`

-  `LETTER_NUMBER`

or it has contributory property Other_Alphabetic as defined by the
Unicode Standard.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is a Unicode alphabet
         character, `false` otherwise.

**Since:** 1.7

## Character.isIdeographic(int)

```java
public static boolean isIdeographic(int codePoint)
```

Determines if the specified character (Unicode code point) is a CJKV
(Chinese, Japanese, Korean and Vietnamese) ideograph, as defined by
the Unicode Standard.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character is a Unicode ideograph
         character, `false` otherwise.

**Since:** 1.7

## Character.isJavaIdentifierStart(char)

```java
public static boolean isJavaIdentifierStart(char ch)
```

Determines if the specified character is
permissible as the first character in a Java identifier.

A character may start a Java identifier if and only if
one of the following conditions is true:

-  isLetter(ch) returns `true`

-  getType(ch) returns `LETTER_NUMBER`

-  `ch` is a currency symbol (such as `'$'`)

-  `ch` is a connecting punctuation character (such as `'_'`).

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `isJavaIdentifierStart(int)` method.

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character may start a Java identifier;
         `false` otherwise.

**See also:** Character#isJavaIdentifierPart(char)

**See also:** Character#isLetter(char)

**See also:** Character#isUnicodeIdentifierStart(char)

**See also:** java.compiler/javax.lang.model.SourceVersion#isIdentifier(CharSequence)

**Since:** 1.1

## Character.isJavaIdentifierStart(int)

```java
public static boolean isJavaIdentifierStart(int codePoint)
```

Determines if the character (Unicode code point) is
permissible as the first character in a Java identifier.

A character may start a Java identifier if and only if
one of the following conditions is true:

-  isLetter(codePoint)
     returns `true`

-  getType(codePoint)
     returns `LETTER_NUMBER`

-  the referenced character is a currency symbol (such as `'$'`)

-  the referenced character is a connecting punctuation character
     (such as `'_'`).

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character may start a Java identifier;
         `false` otherwise.

**See also:** Character#isJavaIdentifierPart(int)

**See also:** Character#isLetter(int)

**See also:** Character#isUnicodeIdentifierStart(int)

**See also:** java.compiler/javax.lang.model.SourceVersion#isIdentifier(CharSequence)

**Since:** 1.5

## Character.isJavaIdentifierPart(char)

```java
public static boolean isJavaIdentifierPart(char ch)
```

Determines if the specified character may be part of a Java
identifier as other than the first character.

A character may be part of a Java identifier if any of the following
conditions are true:

-   it is a letter

-   it is a currency symbol (such as `'$'`)

-   it is a connecting punctuation character (such as `'_'`)

-   it is a digit

-   it is a numeric letter (such as a Roman numeral character)

-   it is a combining mark

-   it is a non-spacing mark

-  `isIdentifierIgnorable` returns
`true` for the character

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `isJavaIdentifierPart(int)` method.

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character may be part of a
         Java identifier; `false` otherwise.

**See also:** Character#isIdentifierIgnorable(char)

**See also:** Character#isJavaIdentifierStart(char)

**See also:** Character#isLetterOrDigit(char)

**See also:** Character#isUnicodeIdentifierPart(char)

**See also:** java.compiler/javax.lang.model.SourceVersion#isIdentifier(CharSequence)

**Since:** 1.1

## Character.isJavaIdentifierPart(int)

```java
public static boolean isJavaIdentifierPart(int codePoint)
```

Determines if the character (Unicode code point) may be part of a Java
identifier as other than the first character.

A character may be part of a Java identifier if any of the following
conditions are true:

-   it is a letter

-   it is a currency symbol (such as `'$'`)

-   it is a connecting punctuation character (such as `'_'`)

-   it is a digit

-   it is a numeric letter (such as a Roman numeral character)

-   it is a combining mark

-   it is a non-spacing mark

-  isIdentifierIgnorable(codePoint) returns `true` for
the code point

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character may be part of a
         Java identifier; `false` otherwise.

**See also:** Character#isIdentifierIgnorable(int)

**See also:** Character#isJavaIdentifierStart(int)

**See also:** Character#isLetterOrDigit(int)

**See also:** Character#isUnicodeIdentifierPart(int)

**See also:** java.compiler/javax.lang.model.SourceVersion#isIdentifier(CharSequence)

**Since:** 1.5

## Character.isUnicodeIdentifierStart(char)

```java
public static boolean isUnicodeIdentifierStart(char ch)
```

Determines if the specified character is permissible as the
first character in a Unicode identifier.

A character may start a Unicode identifier if and only if
one of the following conditions is true:

-  isLetter(ch) returns `true`

-  getType(ch) returns
     `LETTER_NUMBER`.

-  it is an
     `Other_ID_Start` character.

This method conforms to
UAX31-R1: Default Identifiers requirement of the Unicode Standard,
with the following profile of UAX31:

```java
Start := ID_Start + 'VERTICAL TILDE' (U+2E2F)
```

`'VERTICAL TILDE'` is added to `Start` for backward
compatibility.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `isUnicodeIdentifierStart(int)` method.

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character may start a Unicode
         identifier; `false` otherwise.

**See also:** Character#isJavaIdentifierStart(char)

**See also:** Character#isLetter(char)

**See also:** Character#isUnicodeIdentifierPart(char)

**Since:** 1.1

## Character.isUnicodeIdentifierStart(int)

```java
public static boolean isUnicodeIdentifierStart(int codePoint)
```

Determines if the specified character (Unicode code point) is permissible as the
first character in a Unicode identifier.

A character may start a Unicode identifier if and only if
one of the following conditions is true:

-  isLetter(codePoint)
     returns `true`

-  getType(codePoint)
     returns `LETTER_NUMBER`.

-  it is an
     `Other_ID_Start` character.

This method conforms to
UAX31-R1: Default Identifiers requirement of the Unicode Standard,
with the following profile of UAX31:

```java
Start := ID_Start + 'VERTICAL TILDE' (U+2E2F)
```

`'VERTICAL TILDE'` is added to `Start` for backward
compatibility.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character may start a Unicode
         identifier; `false` otherwise.

**See also:** Character#isJavaIdentifierStart(int)

**See also:** Character#isLetter(int)

**See also:** Character#isUnicodeIdentifierPart(int)

**Since:** 1.5

## Character.isUnicodeIdentifierPart(char)

```java
public static boolean isUnicodeIdentifierPart(char ch)
```

Determines if the specified character may be part of a Unicode
identifier as other than the first character.

A character may be part of a Unicode identifier if and only if
one of the following statements is true:

-   it is a letter

-   it is a connecting punctuation character (such as `'_'`)

-   it is a digit

-   it is a numeric letter (such as a Roman numeral character)

-   it is a combining mark

-   it is a non-spacing mark

-  `isIdentifierIgnorable` returns
`true` for this character.

-  it is an
     `Other_ID_Start` character.

-  it is an
     `Other_ID_Continue` character.

This method conforms to
UAX31-R1: Default Identifiers requirement of the Unicode Standard,
with the following profile of UAX31:

```java
Continue := Start + ID_Continue + ignorable
Medial := empty
ignorable := isIdentifierIgnorable(char) returns true for the character
```

`ignorable` is added to `Continue` for backward
compatibility.

**Note:** This method cannot handle  supplementary characters. To support
all Unicode characters, including supplementary characters, use
the `isUnicodeIdentifierPart(int)` method.

Parameters:

- `ch`: the character to be tested.

**Returns:** `true` if the character may be part of a
         Unicode identifier; `false` otherwise.

**See also:** Character#isIdentifierIgnorable(char)

**See also:** Character#isJavaIdentifierPart(char)

**See also:** Character#isLetterOrDigit(char)

**See also:** Character#isUnicodeIdentifierStart(char)

**Since:** 1.1

## Character.isUnicodeIdentifierPart(int)

```java
public static boolean isUnicodeIdentifierPart(int codePoint)
```

Determines if the specified character (Unicode code point) may be part of a Unicode
identifier as other than the first character.

A character may be part of a Unicode identifier if and only if
one of the following statements is true:

-   it is a letter

-   it is a connecting punctuation character (such as `'_'`)

-   it is a digit

-   it is a numeric letter (such as a Roman numeral character)

-   it is a combining mark

-   it is a non-spacing mark

-  `isIdentifierIgnorable` returns
`true` for this character.

-  it is an
     `Other_ID_Start` character.

-  it is an
     `Other_ID_Continue` character.

This method conforms to
UAX31-R1: Default Identifiers requirement of the Unicode Standard,
with the following profile of UAX31:

```java
Continue := Start + ID_Continue + ignorable
Medial := empty
ignorable := isIdentifierIgnorable(int) returns true for the character
```

`ignorable` is added to `Continue` for backward
compatibility.

Parameters:

- `codePoint`: the character (Unicode code point) to be tested.

**Returns:** `true` if the character may be part of a
         Unicode identifier; `false` otherwise.

**See also:** Character#isIdentifierIgnorable(int)

**See also:** Character#isJavaIdentifierPart(int)

**See also:** Character#isLetterOrDigit(int)

**See also:** Character#isUnicodeIdentifierStart(int)

**Since:** 1.5
