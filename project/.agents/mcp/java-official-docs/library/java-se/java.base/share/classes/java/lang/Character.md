---
title: "Character class (java.lang) (part 1 of 12)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Character.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Character class (java.lang)

```java
public final class Character implements java.io.Serializable, Comparable<Character>, Constable
```

The `Character` class is the wrapper class for values of the primitive
type `char`. An object of type `Character` contains a
single field whose type is `char`.

In addition, this class provides a large number of static methods for
determining a character's category (lowercase letter, digit, etc.)
and for converting characters from uppercase to lowercase and vice
versa.

#### Unicode Conformance

The fields and methods of class `Character` are defined in terms
of character information from the Unicode Standard, specifically the
*UnicodeData* file that is part of the Unicode Character Database.
This file specifies properties including name and category for every
assigned Unicode code point or character range. The file is available
from the Unicode Consortium at
http://www.unicode.org.

Character information is based on the Unicode Standard, version 16.0.

The Java platform has supported different versions of the Unicode
Standard over time. Upgrades to newer versions of the Unicode Standard
occurred in the following Java releases, each indicating the new version:

Shows Java releases and supported Unicode versions

Java release
    Unicode version

Java SE 24
    Unicode 16.0
Java SE 22
    Unicode 15.1
Java SE 20
    Unicode 15.0
Java SE 19
    Unicode 14.0
Java SE 15
    Unicode 13.0
Java SE 13
    Unicode 12.1
Java SE 12
    Unicode 11.0
Java SE 11
    Unicode 10.0
Java SE 9
    Unicode 8.0
Java SE 8
    Unicode 6.2
Java SE 7
    Unicode 6.0
Java SE 5.0
    Unicode 4.0
Java SE 1.4
    Unicode 3.0
JDK 1.1
    Unicode 2.0
JDK 1.0.2
    Unicode 1.1.5

Variations from these base Unicode versions, such as recognized appendixes,
are documented elsewhere.

#### Unicode Character Representations

The `char` data type (and therefore the value that a
`Character` object encapsulates) are based on the
original Unicode specification, which defined characters as
fixed-width 16-bit entities. The Unicode Standard has since been
changed to allow for characters whose representation requires more
than 16 bits.  The range of legal *code point*s is now
U+0000 to U+10FFFF, known as *Unicode scalar value*.
(Refer to the *
definition* of the U+*n* notation in the Unicode
Standard.)

The set of characters from U+0000 to U+FFFF is
sometimes referred to as the *Basic <example-value> Plane (BMP)*.
Characters whose code points are greater
than U+FFFF are called *supplementary character*s.  The Java
platform uses the UTF-16 representation in `char` arrays and
in the `String` and `StringBuffer` classes. In
this representation, supplementary characters are represented as a pair
of `char` values, the first from the *high-surrogates*
range, (\uD800-\uDBFF), the second from the
*low-surrogates* range (\uDC00-\uDFFF).

A `char` value, therefore, represents Basic
Multilingual Plane (BMP) code points, including the surrogate
code points, or code units of the UTF-16 encoding. An
`int` value represents all Unicode code points,
including supplementary code points. The lower (least significant)
21 bits of `int` are used to represent Unicode code
points and the upper (most significant) 11 bits must be zero.
Unless otherwise specified, the behavior with respect to
supplementary characters and surrogate `char` values is
as follows:

- The methods that only accept a `char` value cannot support
supplementary characters. They treat `char` values from the
surrogate ranges as undefined characters. For example,
`Character.isLetter('\u005CuD840')` returns `false`, even though
this specific value if followed by any low-surrogate value in a string
would represent a letter.

- The methods that accept an `int` value support all
Unicode characters, including supplementary characters. For
example, `Character.isLetter(0x2F81A)` returns
`true` because the code point value represents a letter
(a CJK ideograph).

In the Java SE API documentation, *Unicode code point* is
used for character values in the range between U+0000 and U+10FFFF,
and *Unicode code unit* is used for 16-bit
`char` values that are code units of the *UTF-16*
encoding. For more information on Unicode terminology, refer to the
Unicode Glossary.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.

**Since:** 1.0

## Character.MIN_RADIX

```java
public static final int MIN_RADIX
```

The minimum radix available for conversion to and from strings.
The constant value of this field is the smallest value permitted
for the radix argument in radix-conversion methods such as the
`digit` method, the `forDigit` method, and the
`toString` method of class `Integer`.

**See also:** Character#digit(char, int)

**See also:** Character#forDigit(int, int)

**See also:** Integer#toString(int, int)

**See also:** Integer#valueOf(String)

## Character.MAX_RADIX

```java
public static final int MAX_RADIX
```

The maximum radix available for conversion to and from strings.
The constant value of this field is the largest value permitted
for the radix argument in radix-conversion methods such as the
`digit` method, the `forDigit` method, and the
`toString` method of class `Integer`.

**See also:** Character#digit(char, int)

**See also:** Character#forDigit(int, int)

**See also:** Integer#toString(int, int)

**See also:** Integer#valueOf(String)

## Character.MIN_VALUE

```java
public static final char MIN_VALUE
```

The constant value of this field is the smallest value of type
`char`, `'\u005Cu0000'`.

**Since:** 1.0.2

## Character.MAX_VALUE

```java
public static final char MAX_VALUE
```

The constant value of this field is the largest value of type
`char`, `'\u005CuFFFF'`.

**Since:** 1.0.2

## Character.TYPE

```java
public static final Class<Character> TYPE
```

The `Class` instance representing the primitive type
`char`.

**Since:** 1.1

## Character.UNASSIGNED

```java
public static final byte UNASSIGNED
```

General category "Cn" in the Unicode specification.

**Since:** 1.1

## Character.UPPERCASE_LETTER

```java
public static final byte UPPERCASE_LETTER
```

General category "Lu" in the Unicode specification.

**Since:** 1.1

## Character.LOWERCASE_LETTER

```java
public static final byte LOWERCASE_LETTER
```

General category "Ll" in the Unicode specification.

**Since:** 1.1

## Character.TITLECASE_LETTER

```java
public static final byte TITLECASE_LETTER
```

General category "Lt" in the Unicode specification.

**Since:** 1.1

## Character.MODIFIER_LETTER

```java
public static final byte MODIFIER_LETTER
```

General category "Lm" in the Unicode specification.

**Since:** 1.1

## Character.OTHER_LETTER

```java
public static final byte OTHER_LETTER
```

General category "Lo" in the Unicode specification.

**Since:** 1.1

## Character.NON_SPACING_MARK

```java
public static final byte NON_SPACING_MARK
```

General category "Mn" in the Unicode specification.

**Since:** 1.1

## Character.ENCLOSING_MARK

```java
public static final byte ENCLOSING_MARK
```

General category "Me" in the Unicode specification.

**Since:** 1.1

## Character.COMBINING_SPACING_MARK

```java
public static final byte COMBINING_SPACING_MARK
```

General category "Mc" in the Unicode specification.

**Since:** 1.1

## Character.DECIMAL_DIGIT_NUMBER

```java
public static final byte DECIMAL_DIGIT_NUMBER
```

General category "Nd" in the Unicode specification.

**Since:** 1.1

## Character.LETTER_NUMBER

```java
public static final byte LETTER_NUMBER
```

General category "Nl" in the Unicode specification.

**Since:** 1.1

## Character.OTHER_NUMBER

```java
public static final byte OTHER_NUMBER
```

General category "No" in the Unicode specification.

**Since:** 1.1

## Character.SPACE_SEPARATOR

```java
public static final byte SPACE_SEPARATOR
```

General category "Zs" in the Unicode specification.

**Since:** 1.1

## Character.LINE_SEPARATOR

```java
public static final byte LINE_SEPARATOR
```

General category "Zl" in the Unicode specification.

**Since:** 1.1

## Character.PARAGRAPH_SEPARATOR

```java
public static final byte PARAGRAPH_SEPARATOR
```

General category "Zp" in the Unicode specification.

**Since:** 1.1

## Character.CONTROL

```java
public static final byte CONTROL
```

General category "Cc" in the Unicode specification.

**Since:** 1.1

## Character.FORMAT

```java
public static final byte FORMAT
```

General category "Cf" in the Unicode specification.

**Since:** 1.1

## Character.PRIVATE_USE

```java
public static final byte PRIVATE_USE
```

General category "Co" in the Unicode specification.

**Since:** 1.1

## Character.SURROGATE

```java
public static final byte SURROGATE
```

General category "Cs" in the Unicode specification.

**Since:** 1.1

## Character.DASH_PUNCTUATION

```java
public static final byte DASH_PUNCTUATION
```

General category "Pd" in the Unicode specification.

**Since:** 1.1

## Character.START_PUNCTUATION

```java
public static final byte START_PUNCTUATION
```

General category "Ps" in the Unicode specification.

**Since:** 1.1

## Character.END_PUNCTUATION

```java
public static final byte END_PUNCTUATION
```

General category "Pe" in the Unicode specification.

**Since:** 1.1

## Character.CONNECTOR_PUNCTUATION

```java
public static final byte CONNECTOR_PUNCTUATION
```

General category "Pc" in the Unicode specification.

**Since:** 1.1

## Character.OTHER_PUNCTUATION

```java
public static final byte OTHER_PUNCTUATION
```

General category "Po" in the Unicode specification.

**Since:** 1.1

## Character.MATH_SYMBOL

```java
public static final byte MATH_SYMBOL
```

General category "Sm" in the Unicode specification.

**Since:** 1.1

## Character.CURRENCY_SYMBOL

```java
public static final byte CURRENCY_SYMBOL
```

General category "Sc" in the Unicode specification.

**Since:** 1.1

## Character.MODIFIER_SYMBOL

```java
public static final byte MODIFIER_SYMBOL
```

General category "Sk" in the Unicode specification.

**Since:** 1.1

## Character.OTHER_SYMBOL

```java
public static final byte OTHER_SYMBOL
```

General category "So" in the Unicode specification.

**Since:** 1.1

## Character.INITIAL_QUOTE_PUNCTUATION

```java
public static final byte INITIAL_QUOTE_PUNCTUATION
```

General category "Pi" in the Unicode specification.

**Since:** 1.4

## Character.FINAL_QUOTE_PUNCTUATION

```java
public static final byte FINAL_QUOTE_PUNCTUATION
```

General category "Pf" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_UNDEFINED

```java
public static final byte DIRECTIONALITY_UNDEFINED
```

Undefined bidirectional character type. Undefined `char`
values have undefined directionality in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_LEFT_TO_RIGHT

```java
public static final byte DIRECTIONALITY_LEFT_TO_RIGHT
```

Strong bidirectional character type "L" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_RIGHT_TO_LEFT

```java
public static final byte DIRECTIONALITY_RIGHT_TO_LEFT
```

Strong bidirectional character type "R" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_RIGHT_TO_LEFT_ARABIC

```java
public static final byte DIRECTIONALITY_RIGHT_TO_LEFT_ARABIC
```

Strong bidirectional character type "AL" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_EUROPEAN_NUMBER

```java
public static final byte DIRECTIONALITY_EUROPEAN_NUMBER
```

Weak bidirectional character type "EN" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_EUROPEAN_NUMBER_SEPARATOR

```java
public static final byte DIRECTIONALITY_EUROPEAN_NUMBER_SEPARATOR
```

Weak bidirectional character type "ES" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_EUROPEAN_NUMBER_TERMINATOR

```java
public static final byte DIRECTIONALITY_EUROPEAN_NUMBER_TERMINATOR
```

Weak bidirectional character type "ET" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_ARABIC_NUMBER

```java
public static final byte DIRECTIONALITY_ARABIC_NUMBER
```

Weak bidirectional character type "AN" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_COMMON_NUMBER_SEPARATOR

```java
public static final byte DIRECTIONALITY_COMMON_NUMBER_SEPARATOR
```

Weak bidirectional character type "CS" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_NONSPACING_MARK

```java
public static final byte DIRECTIONALITY_NONSPACING_MARK
```

Weak bidirectional character type "NSM" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_BOUNDARY_NEUTRAL

```java
public static final byte DIRECTIONALITY_BOUNDARY_NEUTRAL
```

Weak bidirectional character type "BN" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_PARAGRAPH_SEPARATOR

```java
public static final byte DIRECTIONALITY_PARAGRAPH_SEPARATOR
```

Neutral bidirectional character type "B" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_SEGMENT_SEPARATOR

```java
public static final byte DIRECTIONALITY_SEGMENT_SEPARATOR
```

Neutral bidirectional character type "S" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_WHITESPACE

```java
public static final byte DIRECTIONALITY_WHITESPACE
```

Neutral bidirectional character type "WS" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_OTHER_NEUTRALS

```java
public static final byte DIRECTIONALITY_OTHER_NEUTRALS
```

Neutral bidirectional character type "ON" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_LEFT_TO_RIGHT_EMBEDDING

```java
public static final byte DIRECTIONALITY_LEFT_TO_RIGHT_EMBEDDING
```

Strong bidirectional character type "LRE" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_LEFT_TO_RIGHT_OVERRIDE

```java
public static final byte DIRECTIONALITY_LEFT_TO_RIGHT_OVERRIDE
```

Strong bidirectional character type "LRO" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_RIGHT_TO_LEFT_EMBEDDING

```java
public static final byte DIRECTIONALITY_RIGHT_TO_LEFT_EMBEDDING
```

Strong bidirectional character type "RLE" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_RIGHT_TO_LEFT_OVERRIDE

```java
public static final byte DIRECTIONALITY_RIGHT_TO_LEFT_OVERRIDE
```

Strong bidirectional character type "RLO" in the Unicode specification.

**Since:** 1.4

## Character.DIRECTIONALITY_POP_DIRECTIONAL_FORMAT

```java
public static final byte DIRECTIONALITY_POP_DIRECTIONAL_FORMAT
```

Weak bidirectional character type "PDF" in the Unicode specification.

**Since:** 1.4
