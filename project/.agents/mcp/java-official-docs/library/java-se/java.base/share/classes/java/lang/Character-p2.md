---
title: "Character class (java.lang) (part 2 of 12)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Character.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Character class (java.lang) (part 2 of 12)

## Character.DIRECTIONALITY_LEFT_TO_RIGHT_ISOLATE

```java
public static final byte DIRECTIONALITY_LEFT_TO_RIGHT_ISOLATE
```

Weak bidirectional character type "LRI" in the Unicode specification.

**Since:** 9

## Character.DIRECTIONALITY_RIGHT_TO_LEFT_ISOLATE

```java
public static final byte DIRECTIONALITY_RIGHT_TO_LEFT_ISOLATE
```

Weak bidirectional character type "RLI" in the Unicode specification.

**Since:** 9

## Character.DIRECTIONALITY_FIRST_STRONG_ISOLATE

```java
public static final byte DIRECTIONALITY_FIRST_STRONG_ISOLATE
```

Weak bidirectional character type "FSI" in the Unicode specification.

**Since:** 9

## Character.DIRECTIONALITY_POP_DIRECTIONAL_ISOLATE

```java
public static final byte DIRECTIONALITY_POP_DIRECTIONAL_ISOLATE
```

Weak bidirectional character type "PDI" in the Unicode specification.

**Since:** 9

## Character.MIN_HIGH_SURROGATE

```java
public static final char MIN_HIGH_SURROGATE
```

The minimum value of a

Unicode high-surrogate code unit
in the UTF-16 encoding, constant `'\u005CuD800'`.
A high-surrogate is also known as a *leading-surrogate*.

**Since:** 1.5

## Character.MAX_HIGH_SURROGATE

```java
public static final char MAX_HIGH_SURROGATE
```

The maximum value of a

Unicode high-surrogate code unit
in the UTF-16 encoding, constant `'\u005CuDBFF'`.
A high-surrogate is also known as a *leading-surrogate*.

**Since:** 1.5

## Character.MIN_LOW_SURROGATE

```java
public static final char MIN_LOW_SURROGATE
```

The minimum value of a

Unicode low-surrogate code unit
in the UTF-16 encoding, constant `'\u005CuDC00'`.
A low-surrogate is also known as a *trailing-surrogate*.

**Since:** 1.5

## Character.MAX_LOW_SURROGATE

```java
public static final char MAX_LOW_SURROGATE
```

The maximum value of a

Unicode low-surrogate code unit
in the UTF-16 encoding, constant `'\u005CuDFFF'`.
A low-surrogate is also known as a *trailing-surrogate*.

**Since:** 1.5

## Character.MIN_SURROGATE

```java
public static final char MIN_SURROGATE
```

The minimum value of a Unicode surrogate code unit in the
UTF-16 encoding, constant `'\u005CuD800'`.

**Since:** 1.5

## Character.MAX_SURROGATE

```java
public static final char MAX_SURROGATE
```

The maximum value of a Unicode surrogate code unit in the
UTF-16 encoding, constant `'\u005CuDFFF'`.

**Since:** 1.5

## Character.MIN_SUPPLEMENTARY_CODE_POINT

```java
public static final int MIN_SUPPLEMENTARY_CODE_POINT
```

The minimum value of a

Unicode supplementary code point, constant `U+10000`.

**Since:** 1.5

## Character.MIN_CODE_POINT

```java
public static final int MIN_CODE_POINT
```

The minimum value of a

Unicode code point, constant `U+0000`.

**Since:** 1.5

## Character.MAX_CODE_POINT

```java
public static final int MAX_CODE_POINT
```

The maximum value of a

Unicode code point, constant `U+10FFFF`.

**Since:** 1.5

## Character.describeConstable()

```java
public Optional<DynamicConstantDesc<Character>> describeConstable()
```

Returns an `Optional` containing the nominal descriptor for this
instance.

**Returns:** an `Optional` describing the `Character` instance

**Since:** 15

## Character.Subset(String)

```java
protected Subset(String name)
```

Constructs a new `Subset` instance.

Parameters:

- `name`: The name of this subset

Throws:

- `NullPointerException`: if name is `null`

## Character.equals(Object)

```java
public final boolean equals(Object obj)
```

Compares two `Subset` objects for equality.
This method returns `true` if and only if
`this` and the argument refer to the same
object; since this method is `final`, this
guarantee holds for all subclasses.

## Character.hashCode()

```java
public final int hashCode()
```

Returns the standard hash code as defined by the
`Object.hashCode` method.  This method
is `final` in order to ensure that the
`equals` and `hashCode` methods will
be consistent in all subclasses.

## Character.toString()

```java
public final String toString()
```

Returns the name of this subset.

## Character.BASIC_LATIN

```java
public static final UnicodeBlock BASIC_LATIN
```

Constant for the "Basic Latin" Unicode character block.

**Since:** 1.2

## Character.LATIN_1_SUPPLEMENT

```java
public static final UnicodeBlock LATIN_1_SUPPLEMENT
```

Constant for the "Latin-1 Supplement" Unicode character block.

**Since:** 1.2

## Character.LATIN_EXTENDED_A

```java
public static final UnicodeBlock LATIN_EXTENDED_A
```

Constant for the "Latin Extended-A" Unicode character block.

**Since:** 1.2

## Character.LATIN_EXTENDED_B

```java
public static final UnicodeBlock LATIN_EXTENDED_B
```

Constant for the "Latin Extended-B" Unicode character block.

**Since:** 1.2

## Character.IPA_EXTENSIONS

```java
public static final UnicodeBlock IPA_EXTENSIONS
```

Constant for the "IPA Extensions" Unicode character block.

**Since:** 1.2

## Character.SPACING_MODIFIER_LETTERS

```java
public static final UnicodeBlock SPACING_MODIFIER_LETTERS
```

Constant for the "Spacing Modifier Letters" Unicode character block.

**Since:** 1.2

## Character.COMBINING_DIACRITICAL_MARKS

```java
public static final UnicodeBlock COMBINING_DIACRITICAL_MARKS
```

Constant for the "Combining Diacritical Marks" Unicode character block.

**Since:** 1.2

## Character.GREEK

```java
public static final UnicodeBlock GREEK
```

Constant for the "Greek and Coptic" Unicode character block.

This block was previously known as the "Greek" block.

**Since:** 1.2

## Character.CYRILLIC

```java
public static final UnicodeBlock CYRILLIC
```

Constant for the "Cyrillic" Unicode character block.

**Since:** 1.2

## Character.ARMENIAN

```java
public static final UnicodeBlock ARMENIAN
```

Constant for the "Armenian" Unicode character block.

**Since:** 1.2

## Character.HEBREW

```java
public static final UnicodeBlock HEBREW
```

Constant for the "Hebrew" Unicode character block.

**Since:** 1.2

## Character.ARABIC

```java
public static final UnicodeBlock ARABIC
```

Constant for the "Arabic" Unicode character block.

**Since:** 1.2

## Character.DEVANAGARI

```java
public static final UnicodeBlock DEVANAGARI
```

Constant for the "Devanagari" Unicode character block.

**Since:** 1.2

## Character.BENGALI

```java
public static final UnicodeBlock BENGALI
```

Constant for the "Bengali" Unicode character block.

**Since:** 1.2

## Character.GURMUKHI

```java
public static final UnicodeBlock GURMUKHI
```

Constant for the "Gurmukhi" Unicode character block.

**Since:** 1.2

## Character.GUJARATI

```java
public static final UnicodeBlock GUJARATI
```

Constant for the "Gujarati" Unicode character block.

**Since:** 1.2

## Character.ORIYA

```java
public static final UnicodeBlock ORIYA
```

Constant for the "Oriya" Unicode character block.

**Since:** 1.2

## Character.TAMIL

```java
public static final UnicodeBlock TAMIL
```

Constant for the "Tamil" Unicode character block.

**Since:** 1.2

## Character.TELUGU

```java
public static final UnicodeBlock TELUGU
```

Constant for the "Telugu" Unicode character block.

**Since:** 1.2

## Character.KANNADA

```java
public static final UnicodeBlock KANNADA
```

Constant for the "Kannada" Unicode character block.

**Since:** 1.2

## Character.MALAYALAM

```java
public static final UnicodeBlock MALAYALAM
```

Constant for the "Malayalam" Unicode character block.

**Since:** 1.2

## Character.THAI

```java
public static final UnicodeBlock THAI
```

Constant for the "Thai" Unicode character block.

**Since:** 1.2

## Character.LAO

```java
public static final UnicodeBlock LAO
```

Constant for the "Lao" Unicode character block.

**Since:** 1.2

## Character.TIBETAN

```java
public static final UnicodeBlock TIBETAN
```

Constant for the "Tibetan" Unicode character block.

**Since:** 1.2

## Character.GEORGIAN

```java
public static final UnicodeBlock GEORGIAN
```

Constant for the "Georgian" Unicode character block.

**Since:** 1.2

## Character.HANGUL_JAMO

```java
public static final UnicodeBlock HANGUL_JAMO
```

Constant for the "Hangul Jamo" Unicode character block.

**Since:** 1.2

## Character.LATIN_EXTENDED_ADDITIONAL

```java
public static final UnicodeBlock LATIN_EXTENDED_ADDITIONAL
```

Constant for the "Latin Extended Additional" Unicode character block.

**Since:** 1.2

## Character.GREEK_EXTENDED

```java
public static final UnicodeBlock GREEK_EXTENDED
```

Constant for the "Greek Extended" Unicode character block.

**Since:** 1.2

## Character.GENERAL_PUNCTUATION

```java
public static final UnicodeBlock GENERAL_PUNCTUATION
```

Constant for the "General Punctuation" Unicode character block.

**Since:** 1.2

## Character.SUPERSCRIPTS_AND_SUBSCRIPTS

```java
public static final UnicodeBlock SUPERSCRIPTS_AND_SUBSCRIPTS
```

Constant for the "Superscripts and Subscripts" Unicode character
block.

**Since:** 1.2

## Character.CURRENCY_SYMBOLS

```java
public static final UnicodeBlock CURRENCY_SYMBOLS
```

Constant for the "Currency Symbols" Unicode character block.

**Since:** 1.2

## Character.COMBINING_MARKS_FOR_SYMBOLS

```java
public static final UnicodeBlock COMBINING_MARKS_FOR_SYMBOLS
```

Constant for the "Combining Diacritical Marks for Symbols" Unicode
character block.

This block was previously known as "Combining Marks for Symbols".

**Since:** 1.2

## Character.LETTERLIKE_SYMBOLS

```java
public static final UnicodeBlock LETTERLIKE_SYMBOLS
```

Constant for the "Letterlike Symbols" Unicode character block.

**Since:** 1.2

## Character.NUMBER_FORMS

```java
public static final UnicodeBlock NUMBER_FORMS
```

Constant for the "Number Forms" Unicode character block.

**Since:** 1.2

## Character.ARROWS

```java
public static final UnicodeBlock ARROWS
```

Constant for the "Arrows" Unicode character block.

**Since:** 1.2

## Character.MATHEMATICAL_OPERATORS

```java
public static final UnicodeBlock MATHEMATICAL_OPERATORS
```

Constant for the "Mathematical Operators" Unicode character block.

**Since:** 1.2

## Character.MISCELLANEOUS_TECHNICAL

```java
public static final UnicodeBlock MISCELLANEOUS_TECHNICAL
```

Constant for the "Miscellaneous Technical" Unicode character block.

**Since:** 1.2

## Character.CONTROL_PICTURES

```java
public static final UnicodeBlock CONTROL_PICTURES
```

Constant for the "Control Pictures" Unicode character block.

**Since:** 1.2

## Character.OPTICAL_CHARACTER_RECOGNITION

```java
public static final UnicodeBlock OPTICAL_CHARACTER_RECOGNITION
```

Constant for the "Optical Character Recognition" Unicode character block.

**Since:** 1.2

## Character.ENCLOSED_ALPHANUMERICS

```java
public static final UnicodeBlock ENCLOSED_ALPHANUMERICS
```

Constant for the "Enclosed Alphanumerics" Unicode character block.

**Since:** 1.2

## Character.BOX_DRAWING

```java
public static final UnicodeBlock BOX_DRAWING
```

Constant for the "Box Drawing" Unicode character block.

**Since:** 1.2

## Character.BLOCK_ELEMENTS

```java
public static final UnicodeBlock BLOCK_ELEMENTS
```

Constant for the "Block Elements" Unicode character block.

**Since:** 1.2

## Character.GEOMETRIC_SHAPES

```java
public static final UnicodeBlock GEOMETRIC_SHAPES
```

Constant for the "Geometric Shapes" Unicode character block.

**Since:** 1.2

## Character.MISCELLANEOUS_SYMBOLS

```java
public static final UnicodeBlock MISCELLANEOUS_SYMBOLS
```

Constant for the "Miscellaneous Symbols" Unicode character block.

**Since:** 1.2

## Character.DINGBATS

```java
public static final UnicodeBlock DINGBATS
```

Constant for the "Dingbats" Unicode character block.

**Since:** 1.2

## Character.CJK_SYMBOLS_AND_PUNCTUATION

```java
public static final UnicodeBlock CJK_SYMBOLS_AND_PUNCTUATION
```

Constant for the "CJK Symbols and Punctuation" Unicode character block.

**Since:** 1.2

## Character.HIRAGANA

```java
public static final UnicodeBlock HIRAGANA
```

Constant for the "Hiragana" Unicode character block.

**Since:** 1.2

## Character.KATAKANA

```java
public static final UnicodeBlock KATAKANA
```

Constant for the "Katakana" Unicode character block.

**Since:** 1.2

## Character.BOPOMOFO

```java
public static final UnicodeBlock BOPOMOFO
```

Constant for the "Bopomofo" Unicode character block.

**Since:** 1.2

## Character.HANGUL_COMPATIBILITY_JAMO

```java
public static final UnicodeBlock HANGUL_COMPATIBILITY_JAMO
```

Constant for the "Hangul Compatibility Jamo" Unicode character block.

**Since:** 1.2

## Character.KANBUN

```java
public static final UnicodeBlock KANBUN
```

Constant for the "Kanbun" Unicode character block.

**Since:** 1.2

## Character.ENCLOSED_CJK_LETTERS_AND_MONTHS

```java
public static final UnicodeBlock ENCLOSED_CJK_LETTERS_AND_MONTHS
```

Constant for the "Enclosed CJK Letters and Months" Unicode character block.

**Since:** 1.2

## Character.CJK_COMPATIBILITY

```java
public static final UnicodeBlock CJK_COMPATIBILITY
```

Constant for the "CJK Compatibility" Unicode character block.

**Since:** 1.2

## Character.CJK_UNIFIED_IDEOGRAPHS

```java
public static final UnicodeBlock CJK_UNIFIED_IDEOGRAPHS
```

Constant for the "CJK Unified Ideographs" Unicode character block.

**Since:** 1.2

## Character.HANGUL_SYLLABLES

```java
public static final UnicodeBlock HANGUL_SYLLABLES
```

Constant for the "Hangul Syllables" Unicode character block.

**Since:** 1.2

## Character.PRIVATE_USE_AREA

```java
public static final UnicodeBlock PRIVATE_USE_AREA
```

Constant for the "Private Use Area" Unicode character block.

**Since:** 1.2

## Character.CJK_COMPATIBILITY_IDEOGRAPHS

```java
public static final UnicodeBlock CJK_COMPATIBILITY_IDEOGRAPHS
```

Constant for the "CJK Compatibility Ideographs" Unicode character
block.

**Since:** 1.2

## Character.ALPHABETIC_PRESENTATION_FORMS

```java
public static final UnicodeBlock ALPHABETIC_PRESENTATION_FORMS
```

Constant for the "Alphabetic Presentation Forms" Unicode character block.

**Since:** 1.2

## Character.ARABIC_PRESENTATION_FORMS_A

```java
public static final UnicodeBlock ARABIC_PRESENTATION_FORMS_A
```

Constant for the "Arabic Presentation Forms-A" Unicode character
block.

**Since:** 1.2

## Character.COMBINING_HALF_MARKS

```java
public static final UnicodeBlock COMBINING_HALF_MARKS
```

Constant for the "Combining Half Marks" Unicode character block.

**Since:** 1.2

## Character.CJK_COMPATIBILITY_FORMS

```java
public static final UnicodeBlock CJK_COMPATIBILITY_FORMS
```

Constant for the "CJK Compatibility Forms" Unicode character block.

**Since:** 1.2

## Character.SMALL_FORM_VARIANTS

```java
public static final UnicodeBlock SMALL_FORM_VARIANTS
```

Constant for the "Small Form Variants" Unicode character block.

**Since:** 1.2

## Character.ARABIC_PRESENTATION_FORMS_B

```java
public static final UnicodeBlock ARABIC_PRESENTATION_FORMS_B
```

Constant for the "Arabic Presentation Forms-B" Unicode character block.

**Since:** 1.2
