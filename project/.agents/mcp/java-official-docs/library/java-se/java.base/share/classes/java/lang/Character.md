# Character class (java.lang)

```java
public final class Character implements java.io.Serializable, Comparable<Character>, Constable
```

The {@code Character} class is the {@linkplain
java.lang##wrapperClass wrapper class} for values of the primitive
type {@code char}. An object of type {@code Character} contains a
single field whose type is {@code char}.

<p>In addition, this class provides a large number of static methods for
determining a character's category (lowercase letter, digit, etc.)
and for converting characters from uppercase to lowercase and vice
versa.

<h2><a id="conformance">Unicode Conformance</a></h2>
<p>
The fields and methods of class {@code Character} are defined in terms
of character information from the Unicode Standard, specifically the
<i>UnicodeData</i> file that is part of the Unicode Character Database.
This file specifies properties including name and category for every
assigned Unicode code point or character range. The file is available
from the Unicode Consortium at
<a href="http://www.unicode.org">http://www.unicode.org</a>.
<p>
Character information is based on the Unicode Standard, version 16.0.
<p>
The Java platform has supported different versions of the Unicode
Standard over time. Upgrades to newer versions of the Unicode Standard
occurred in the following Java releases, each indicating the new version:
<table class="striped">
<caption style="display:none">Shows Java releases and supported Unicode versions</caption>
<thead>
<tr><th scope="col">Java release</th>
    <th scope="col">Unicode version</th></tr>
</thead>
<tbody>
<tr><th scope="row" style="text-align:left">Java SE 24</th>
    <td>Unicode 16.0</td></tr>
<tr><th scope="row" style="text-align:left">Java SE 22</th>
    <td>Unicode 15.1</td></tr>
<tr><th scope="row" style="text-align:left">Java SE 20</th>
    <td>Unicode 15.0</td></tr>
<tr><th scope="row" style="text-align:left">Java SE 19</th>
    <td>Unicode 14.0</td></tr>
<tr><th scope="row" style="text-align:left">Java SE 15</th>
    <td>Unicode 13.0</td></tr>
<tr><th scope="row" style="text-align:left">Java SE 13</th>
    <td>Unicode 12.1</td></tr>
<tr><th scope="row" style="text-align:left">Java SE 12</th>
    <td>Unicode 11.0</td></tr>
<tr><th scope="row" style="text-align:left">Java SE 11</th>
    <td>Unicode 10.0</td></tr>
<tr><th scope="row" style="text-align:left">Java SE 9</th>
    <td>Unicode 8.0</td></tr>
<tr><th scope="row" style="text-align:left">Java SE 8</th>
    <td>Unicode 6.2</td></tr>
<tr><th scope="row" style="text-align:left">Java SE 7</th>
    <td>Unicode 6.0</td></tr>
<tr><th scope="row" style="text-align:left">Java SE 5.0</th>
    <td>Unicode 4.0</td></tr>
<tr><th scope="row" style="text-align:left">Java SE 1.4</th>
    <td>Unicode 3.0</td></tr>
<tr><th scope="row" style="text-align:left">JDK 1.1</th>
    <td>Unicode 2.0</td></tr>
<tr><th scope="row" style="text-align:left">JDK 1.0.2</th>
    <td>Unicode 1.1.5</td></tr>
</tbody>
</table>
Variations from these base Unicode versions, such as recognized appendixes,
are documented elsewhere.
<h2><a id="unicode">Unicode Character Representations</a></h2>

<p>The {@code char} data type (and therefore the value that a
{@code Character} object encapsulates) are based on the
original Unicode specification, which defined characters as
fixed-width 16-bit entities. The Unicode Standard has since been
changed to allow for characters whose representation requires more
than 16 bits.  The range of legal <em>code point</em>s is now
U+0000 to U+10FFFF, known as <em>Unicode scalar value</em>.
(Refer to the <a
href="http://www.unicode.org/reports/tr27/#notation"><i>
definition</i></a> of the U+<i>n</i> notation in the Unicode
Standard.)

<p><a id="BMP">The set of characters from U+0000 to U+FFFF</a> is
sometimes referred to as the <em>Basic Multilingual Plane (BMP)</em>.
<a id="supplementary">Characters</a> whose code points are greater
than U+FFFF are called <em>supplementary character</em>s.  The Java
platform uses the UTF-16 representation in {@code char} arrays and
in the {@code String} and {@code StringBuffer} classes. In
this representation, supplementary characters are represented as a pair
of {@code char} values, the first from the <em>high-surrogates</em>
range, (&#92;uD800-&#92;uDBFF), the second from the
<em>low-surrogates</em> range (&#92;uDC00-&#92;uDFFF).

<p>A {@code char} value, therefore, represents Basic
Multilingual Plane (BMP) code points, including the surrogate
code points, or code units of the UTF-16 encoding. An
{@code int} value represents all Unicode code points,
including supplementary code points. The lower (least significant)
21 bits of {@code int} are used to represent Unicode code
points and the upper (most significant) 11 bits must be zero.
Unless otherwise specified, the behavior with respect to
supplementary characters and surrogate {@code char} values is
as follows:

<ul>
<li>The methods that only accept a {@code char} value cannot support
supplementary characters. They treat {@code char} values from the
surrogate ranges as undefined characters. For example,
{@code Character.isLetter('\u005CuD840')} returns {@code false}, even though
this specific value if followed by any low-surrogate value in a string
would represent a letter.

<li>The methods that accept an {@code int} value support all
Unicode characters, including supplementary characters. For
example, {@code Character.isLetter(0x2F81A)} returns
{@code true} because the code point value represents a letter
(a CJK ideograph).
</ul>

<p>In the Java SE API documentation, <em>Unicode code point</em> is
used for character values in the range between U+0000 and U+10FFFF,
and <em>Unicode code unit</em> is used for 16-bit
{@code char} values that are code units of the <em>UTF-16</em>
encoding. For more information on Unicode terminology, refer to the
<a href="http://www.unicode.org/glossary/">Unicode Glossary</a>.

<p>This is a <a href="{@docRoot}/java.base/java/lang/doc-files/ValueBased.html">value-based</a>
class; programmers should treat instances that are
{@linkplain #equals(Object) equal} as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.

@spec https://www.unicode.org/reports/tr27 Unicode 3.1.0
@author  Lee Boynton
@author  Guy Steele
@author  Akira Tanaka
@author  Martin Buchholz
@author  Ulf Zibis
@since   1.0

## Character.MIN_RADIX

```java
public static final int MIN_RADIX
```

The minimum radix available for conversion to and from strings.
The constant value of this field is the smallest value permitted
for the radix argument in radix-conversion methods such as the
{@code digit} method, the {@code forDigit} method, and the
{@code toString} method of class {@code Integer}.

@see     Character#digit(char, int)
@see     Character#forDigit(int, int)
@see     Integer#toString(int, int)
@see     Integer#valueOf(String)

## Character.MAX_RADIX

```java
public static final int MAX_RADIX
```

The maximum radix available for conversion to and from strings.
The constant value of this field is the largest value permitted
for the radix argument in radix-conversion methods such as the
{@code digit} method, the {@code forDigit} method, and the
{@code toString} method of class {@code Integer}.

@see     Character#digit(char, int)
@see     Character#forDigit(int, int)
@see     Integer#toString(int, int)
@see     Integer#valueOf(String)

## Character.MIN_VALUE

```java
public static final char MIN_VALUE
```

The constant value of this field is the smallest value of type
{@code char}, {@code '\u005Cu0000'}.

@since   1.0.2

## Character.MAX_VALUE

```java
public static final char MAX_VALUE
```

The constant value of this field is the largest value of type
{@code char}, {@code '\u005CuFFFF'}.

@since   1.0.2

## Character.TYPE

```java
public static final Class<Character> TYPE
```

The {@code Class} instance representing the primitive type
{@code char}.

@since   1.1

## Character.UNASSIGNED

```java
public static final byte UNASSIGNED
```

General category "Cn" in the Unicode specification.
@since   1.1

## Character.UPPERCASE_LETTER

```java
public static final byte UPPERCASE_LETTER
```

General category "Lu" in the Unicode specification.
@since   1.1

## Character.LOWERCASE_LETTER

```java
public static final byte LOWERCASE_LETTER
```

General category "Ll" in the Unicode specification.
@since   1.1

## Character.TITLECASE_LETTER

```java
public static final byte TITLECASE_LETTER
```

General category "Lt" in the Unicode specification.
@since   1.1

## Character.MODIFIER_LETTER

```java
public static final byte MODIFIER_LETTER
```

General category "Lm" in the Unicode specification.
@since   1.1

## Character.OTHER_LETTER

```java
public static final byte OTHER_LETTER
```

General category "Lo" in the Unicode specification.
@since   1.1

## Character.NON_SPACING_MARK

```java
public static final byte NON_SPACING_MARK
```

General category "Mn" in the Unicode specification.
@since   1.1

## Character.ENCLOSING_MARK

```java
public static final byte ENCLOSING_MARK
```

General category "Me" in the Unicode specification.
@since   1.1

## Character.COMBINING_SPACING_MARK

```java
public static final byte COMBINING_SPACING_MARK
```

General category "Mc" in the Unicode specification.
@since   1.1

## Character.DECIMAL_DIGIT_NUMBER

```java
public static final byte DECIMAL_DIGIT_NUMBER
```

General category "Nd" in the Unicode specification.
@since   1.1

## Character.LETTER_NUMBER

```java
public static final byte LETTER_NUMBER
```

General category "Nl" in the Unicode specification.
@since   1.1

## Character.OTHER_NUMBER

```java
public static final byte OTHER_NUMBER
```

General category "No" in the Unicode specification.
@since   1.1

## Character.SPACE_SEPARATOR

```java
public static final byte SPACE_SEPARATOR
```

General category "Zs" in the Unicode specification.
@since   1.1

## Character.LINE_SEPARATOR

```java
public static final byte LINE_SEPARATOR
```

General category "Zl" in the Unicode specification.
@since   1.1

## Character.PARAGRAPH_SEPARATOR

```java
public static final byte PARAGRAPH_SEPARATOR
```

General category "Zp" in the Unicode specification.
@since   1.1

## Character.CONTROL

```java
public static final byte CONTROL
```

General category "Cc" in the Unicode specification.
@since   1.1

## Character.FORMAT

```java
public static final byte FORMAT
```

General category "Cf" in the Unicode specification.
@since   1.1

## Character.PRIVATE_USE

```java
public static final byte PRIVATE_USE
```

General category "Co" in the Unicode specification.
@since   1.1

## Character.SURROGATE

```java
public static final byte SURROGATE
```

General category "Cs" in the Unicode specification.
@since   1.1

## Character.DASH_PUNCTUATION

```java
public static final byte DASH_PUNCTUATION
```

General category "Pd" in the Unicode specification.
@since   1.1

## Character.START_PUNCTUATION

```java
public static final byte START_PUNCTUATION
```

General category "Ps" in the Unicode specification.
@since   1.1

## Character.END_PUNCTUATION

```java
public static final byte END_PUNCTUATION
```

General category "Pe" in the Unicode specification.
@since   1.1

## Character.CONNECTOR_PUNCTUATION

```java
public static final byte CONNECTOR_PUNCTUATION
```

General category "Pc" in the Unicode specification.
@since   1.1

## Character.OTHER_PUNCTUATION

```java
public static final byte OTHER_PUNCTUATION
```

General category "Po" in the Unicode specification.
@since   1.1

## Character.MATH_SYMBOL

```java
public static final byte MATH_SYMBOL
```

General category "Sm" in the Unicode specification.
@since   1.1

## Character.CURRENCY_SYMBOL

```java
public static final byte CURRENCY_SYMBOL
```

General category "Sc" in the Unicode specification.
@since   1.1

## Character.MODIFIER_SYMBOL

```java
public static final byte MODIFIER_SYMBOL
```

General category "Sk" in the Unicode specification.
@since   1.1

## Character.OTHER_SYMBOL

```java
public static final byte OTHER_SYMBOL
```

General category "So" in the Unicode specification.
@since   1.1

## Character.INITIAL_QUOTE_PUNCTUATION

```java
public static final byte INITIAL_QUOTE_PUNCTUATION
```

General category "Pi" in the Unicode specification.
@since   1.4

## Character.FINAL_QUOTE_PUNCTUATION

```java
public static final byte FINAL_QUOTE_PUNCTUATION
```

General category "Pf" in the Unicode specification.
@since   1.4

## Character.DIRECTIONALITY_UNDEFINED

```java
public static final byte DIRECTIONALITY_UNDEFINED
```

Undefined bidirectional character type. Undefined {@code char}
values have undefined directionality in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_LEFT_TO_RIGHT

```java
public static final byte DIRECTIONALITY_LEFT_TO_RIGHT
```

Strong bidirectional character type "L" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_RIGHT_TO_LEFT

```java
public static final byte DIRECTIONALITY_RIGHT_TO_LEFT
```

Strong bidirectional character type "R" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_RIGHT_TO_LEFT_ARABIC

```java
public static final byte DIRECTIONALITY_RIGHT_TO_LEFT_ARABIC
```

Strong bidirectional character type "AL" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_EUROPEAN_NUMBER

```java
public static final byte DIRECTIONALITY_EUROPEAN_NUMBER
```

Weak bidirectional character type "EN" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_EUROPEAN_NUMBER_SEPARATOR

```java
public static final byte DIRECTIONALITY_EUROPEAN_NUMBER_SEPARATOR
```

Weak bidirectional character type "ES" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_EUROPEAN_NUMBER_TERMINATOR

```java
public static final byte DIRECTIONALITY_EUROPEAN_NUMBER_TERMINATOR
```

Weak bidirectional character type "ET" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_ARABIC_NUMBER

```java
public static final byte DIRECTIONALITY_ARABIC_NUMBER
```

Weak bidirectional character type "AN" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_COMMON_NUMBER_SEPARATOR

```java
public static final byte DIRECTIONALITY_COMMON_NUMBER_SEPARATOR
```

Weak bidirectional character type "CS" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_NONSPACING_MARK

```java
public static final byte DIRECTIONALITY_NONSPACING_MARK
```

Weak bidirectional character type "NSM" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_BOUNDARY_NEUTRAL

```java
public static final byte DIRECTIONALITY_BOUNDARY_NEUTRAL
```

Weak bidirectional character type "BN" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_PARAGRAPH_SEPARATOR

```java
public static final byte DIRECTIONALITY_PARAGRAPH_SEPARATOR
```

Neutral bidirectional character type "B" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_SEGMENT_SEPARATOR

```java
public static final byte DIRECTIONALITY_SEGMENT_SEPARATOR
```

Neutral bidirectional character type "S" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_WHITESPACE

```java
public static final byte DIRECTIONALITY_WHITESPACE
```

Neutral bidirectional character type "WS" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_OTHER_NEUTRALS

```java
public static final byte DIRECTIONALITY_OTHER_NEUTRALS
```

Neutral bidirectional character type "ON" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_LEFT_TO_RIGHT_EMBEDDING

```java
public static final byte DIRECTIONALITY_LEFT_TO_RIGHT_EMBEDDING
```

Strong bidirectional character type "LRE" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_LEFT_TO_RIGHT_OVERRIDE

```java
public static final byte DIRECTIONALITY_LEFT_TO_RIGHT_OVERRIDE
```

Strong bidirectional character type "LRO" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_RIGHT_TO_LEFT_EMBEDDING

```java
public static final byte DIRECTIONALITY_RIGHT_TO_LEFT_EMBEDDING
```

Strong bidirectional character type "RLE" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_RIGHT_TO_LEFT_OVERRIDE

```java
public static final byte DIRECTIONALITY_RIGHT_TO_LEFT_OVERRIDE
```

Strong bidirectional character type "RLO" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_POP_DIRECTIONAL_FORMAT

```java
public static final byte DIRECTIONALITY_POP_DIRECTIONAL_FORMAT
```

Weak bidirectional character type "PDF" in the Unicode specification.
@since 1.4

## Character.DIRECTIONALITY_LEFT_TO_RIGHT_ISOLATE

```java
public static final byte DIRECTIONALITY_LEFT_TO_RIGHT_ISOLATE
```

Weak bidirectional character type "LRI" in the Unicode specification.
@since 9

## Character.DIRECTIONALITY_RIGHT_TO_LEFT_ISOLATE

```java
public static final byte DIRECTIONALITY_RIGHT_TO_LEFT_ISOLATE
```

Weak bidirectional character type "RLI" in the Unicode specification.
@since 9

## Character.DIRECTIONALITY_FIRST_STRONG_ISOLATE

```java
public static final byte DIRECTIONALITY_FIRST_STRONG_ISOLATE
```

Weak bidirectional character type "FSI" in the Unicode specification.
@since 9

## Character.DIRECTIONALITY_POP_DIRECTIONAL_ISOLATE

```java
public static final byte DIRECTIONALITY_POP_DIRECTIONAL_ISOLATE
```

Weak bidirectional character type "PDI" in the Unicode specification.
@since 9

## Character.MIN_HIGH_SURROGATE

```java
public static final char MIN_HIGH_SURROGATE
```

The minimum value of a
<a href="http://www.unicode.org/glossary/#high_surrogate_code_unit">
Unicode high-surrogate code unit</a>
in the UTF-16 encoding, constant {@code '\u005CuD800'}.
A high-surrogate is also known as a <i>leading-surrogate</i>.

@since 1.5

## Character.MAX_HIGH_SURROGATE

```java
public static final char MAX_HIGH_SURROGATE
```

The maximum value of a
<a href="http://www.unicode.org/glossary/#high_surrogate_code_unit">
Unicode high-surrogate code unit</a>
in the UTF-16 encoding, constant {@code '\u005CuDBFF'}.
A high-surrogate is also known as a <i>leading-surrogate</i>.

@since 1.5

## Character.MIN_LOW_SURROGATE

```java
public static final char MIN_LOW_SURROGATE
```

The minimum value of a
<a href="http://www.unicode.org/glossary/#low_surrogate_code_unit">
Unicode low-surrogate code unit</a>
in the UTF-16 encoding, constant {@code '\u005CuDC00'}.
A low-surrogate is also known as a <i>trailing-surrogate</i>.

@since 1.5

## Character.MAX_LOW_SURROGATE

```java
public static final char MAX_LOW_SURROGATE
```

The maximum value of a
<a href="http://www.unicode.org/glossary/#low_surrogate_code_unit">
Unicode low-surrogate code unit</a>
in the UTF-16 encoding, constant {@code '\u005CuDFFF'}.
A low-surrogate is also known as a <i>trailing-surrogate</i>.

@since 1.5

## Character.MIN_SURROGATE

```java
public static final char MIN_SURROGATE
```

The minimum value of a Unicode surrogate code unit in the
UTF-16 encoding, constant {@code '\u005CuD800'}.

@since 1.5

## Character.MAX_SURROGATE

```java
public static final char MAX_SURROGATE
```

The maximum value of a Unicode surrogate code unit in the
UTF-16 encoding, constant {@code '\u005CuDFFF'}.

@since 1.5

## Character.MIN_SUPPLEMENTARY_CODE_POINT

```java
public static final int MIN_SUPPLEMENTARY_CODE_POINT
```

The minimum value of a
<a href="http://www.unicode.org/glossary/#supplementary_code_point">
Unicode supplementary code point</a>, constant {@code U+10000}.

@since 1.5

## Character.MIN_CODE_POINT

```java
public static final int MIN_CODE_POINT
```

The minimum value of a
<a href="http://www.unicode.org/glossary/#code_point">
Unicode code point</a>, constant {@code U+0000}.

@since 1.5

## Character.MAX_CODE_POINT

```java
public static final int MAX_CODE_POINT
```

The maximum value of a
<a href="http://www.unicode.org/glossary/#code_point">
Unicode code point</a>, constant {@code U+10FFFF}.

@since 1.5

## Character.describeConstable()

```java
public Optional<DynamicConstantDesc<Character>> describeConstable()
```

Returns an {@link Optional} containing the nominal descriptor for this
instance.

@return an {@link Optional} describing the {@linkplain Character} instance
@since 15

## Character.Subset(String)

```java
protected Subset(String name)
```

Constructs a new {@code Subset} instance.

@param  name  The name of this subset
@throws NullPointerException if name is {@code null}

## Character.equals(Object)

```java
public final boolean equals(Object obj)
```

Compares two {@code Subset} objects for equality.
This method returns {@code true} if and only if
{@code this} and the argument refer to the same
object; since this method is {@code final}, this
guarantee holds for all subclasses.

## Character.hashCode()

```java
public final int hashCode()
```

Returns the standard hash code as defined by the
{@link Object#hashCode} method.  This method
is {@code final} in order to ensure that the
{@code equals} and {@code hashCode} methods will
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
@since 1.2

## Character.LATIN_1_SUPPLEMENT

```java
public static final UnicodeBlock LATIN_1_SUPPLEMENT
```

Constant for the "Latin-1 Supplement" Unicode character block.
@since 1.2

## Character.LATIN_EXTENDED_A

```java
public static final UnicodeBlock LATIN_EXTENDED_A
```

Constant for the "Latin Extended-A" Unicode character block.
@since 1.2

## Character.LATIN_EXTENDED_B

```java
public static final UnicodeBlock LATIN_EXTENDED_B
```

Constant for the "Latin Extended-B" Unicode character block.
@since 1.2

## Character.IPA_EXTENSIONS

```java
public static final UnicodeBlock IPA_EXTENSIONS
```

Constant for the "IPA Extensions" Unicode character block.
@since 1.2

## Character.SPACING_MODIFIER_LETTERS

```java
public static final UnicodeBlock SPACING_MODIFIER_LETTERS
```

Constant for the "Spacing Modifier Letters" Unicode character block.
@since 1.2

## Character.COMBINING_DIACRITICAL_MARKS

```java
public static final UnicodeBlock COMBINING_DIACRITICAL_MARKS
```

Constant for the "Combining Diacritical Marks" Unicode character block.
@since 1.2

## Character.GREEK

```java
public static final UnicodeBlock GREEK
```

Constant for the "Greek and Coptic" Unicode character block.
<p>
This block was previously known as the "Greek" block.

@since 1.2

## Character.CYRILLIC

```java
public static final UnicodeBlock CYRILLIC
```

Constant for the "Cyrillic" Unicode character block.
@since 1.2

## Character.ARMENIAN

```java
public static final UnicodeBlock ARMENIAN
```

Constant for the "Armenian" Unicode character block.
@since 1.2

## Character.HEBREW

```java
public static final UnicodeBlock HEBREW
```

Constant for the "Hebrew" Unicode character block.
@since 1.2

## Character.ARABIC

```java
public static final UnicodeBlock ARABIC
```

Constant for the "Arabic" Unicode character block.
@since 1.2

## Character.DEVANAGARI

```java
public static final UnicodeBlock DEVANAGARI
```

Constant for the "Devanagari" Unicode character block.
@since 1.2

## Character.BENGALI

```java
public static final UnicodeBlock BENGALI
```

Constant for the "Bengali" Unicode character block.
@since 1.2

## Character.GURMUKHI

```java
public static final UnicodeBlock GURMUKHI
```

Constant for the "Gurmukhi" Unicode character block.
@since 1.2

## Character.GUJARATI

```java
public static final UnicodeBlock GUJARATI
```

Constant for the "Gujarati" Unicode character block.
@since 1.2

## Character.ORIYA

```java
public static final UnicodeBlock ORIYA
```

Constant for the "Oriya" Unicode character block.
@since 1.2

## Character.TAMIL

```java
public static final UnicodeBlock TAMIL
```

Constant for the "Tamil" Unicode character block.
@since 1.2

## Character.TELUGU

```java
public static final UnicodeBlock TELUGU
```

Constant for the "Telugu" Unicode character block.
@since 1.2

## Character.KANNADA

```java
public static final UnicodeBlock KANNADA
```

Constant for the "Kannada" Unicode character block.
@since 1.2

## Character.MALAYALAM

```java
public static final UnicodeBlock MALAYALAM
```

Constant for the "Malayalam" Unicode character block.
@since 1.2

## Character.THAI

```java
public static final UnicodeBlock THAI
```

Constant for the "Thai" Unicode character block.
@since 1.2

## Character.LAO

```java
public static final UnicodeBlock LAO
```

Constant for the "Lao" Unicode character block.
@since 1.2

## Character.TIBETAN

```java
public static final UnicodeBlock TIBETAN
```

Constant for the "Tibetan" Unicode character block.
@since 1.2

## Character.GEORGIAN

```java
public static final UnicodeBlock GEORGIAN
```

Constant for the "Georgian" Unicode character block.
@since 1.2

## Character.HANGUL_JAMO

```java
public static final UnicodeBlock HANGUL_JAMO
```

Constant for the "Hangul Jamo" Unicode character block.
@since 1.2

## Character.LATIN_EXTENDED_ADDITIONAL

```java
public static final UnicodeBlock LATIN_EXTENDED_ADDITIONAL
```

Constant for the "Latin Extended Additional" Unicode character block.
@since 1.2

## Character.GREEK_EXTENDED

```java
public static final UnicodeBlock GREEK_EXTENDED
```

Constant for the "Greek Extended" Unicode character block.
@since 1.2

## Character.GENERAL_PUNCTUATION

```java
public static final UnicodeBlock GENERAL_PUNCTUATION
```

Constant for the "General Punctuation" Unicode character block.
@since 1.2

## Character.SUPERSCRIPTS_AND_SUBSCRIPTS

```java
public static final UnicodeBlock SUPERSCRIPTS_AND_SUBSCRIPTS
```

Constant for the "Superscripts and Subscripts" Unicode character
block.
@since 1.2

## Character.CURRENCY_SYMBOLS

```java
public static final UnicodeBlock CURRENCY_SYMBOLS
```

Constant for the "Currency Symbols" Unicode character block.
@since 1.2

## Character.COMBINING_MARKS_FOR_SYMBOLS

```java
public static final UnicodeBlock COMBINING_MARKS_FOR_SYMBOLS
```

Constant for the "Combining Diacritical Marks for Symbols" Unicode
character block.
<p>
This block was previously known as "Combining Marks for Symbols".
@since 1.2

## Character.LETTERLIKE_SYMBOLS

```java
public static final UnicodeBlock LETTERLIKE_SYMBOLS
```

Constant for the "Letterlike Symbols" Unicode character block.
@since 1.2

## Character.NUMBER_FORMS

```java
public static final UnicodeBlock NUMBER_FORMS
```

Constant for the "Number Forms" Unicode character block.
@since 1.2

## Character.ARROWS

```java
public static final UnicodeBlock ARROWS
```

Constant for the "Arrows" Unicode character block.
@since 1.2

## Character.MATHEMATICAL_OPERATORS

```java
public static final UnicodeBlock MATHEMATICAL_OPERATORS
```

Constant for the "Mathematical Operators" Unicode character block.
@since 1.2

## Character.MISCELLANEOUS_TECHNICAL

```java
public static final UnicodeBlock MISCELLANEOUS_TECHNICAL
```

Constant for the "Miscellaneous Technical" Unicode character block.
@since 1.2

## Character.CONTROL_PICTURES

```java
public static final UnicodeBlock CONTROL_PICTURES
```

Constant for the "Control Pictures" Unicode character block.
@since 1.2

## Character.OPTICAL_CHARACTER_RECOGNITION

```java
public static final UnicodeBlock OPTICAL_CHARACTER_RECOGNITION
```

Constant for the "Optical Character Recognition" Unicode character block.
@since 1.2

## Character.ENCLOSED_ALPHANUMERICS

```java
public static final UnicodeBlock ENCLOSED_ALPHANUMERICS
```

Constant for the "Enclosed Alphanumerics" Unicode character block.
@since 1.2

## Character.BOX_DRAWING

```java
public static final UnicodeBlock BOX_DRAWING
```

Constant for the "Box Drawing" Unicode character block.
@since 1.2

## Character.BLOCK_ELEMENTS

```java
public static final UnicodeBlock BLOCK_ELEMENTS
```

Constant for the "Block Elements" Unicode character block.
@since 1.2

## Character.GEOMETRIC_SHAPES

```java
public static final UnicodeBlock GEOMETRIC_SHAPES
```

Constant for the "Geometric Shapes" Unicode character block.
@since 1.2

## Character.MISCELLANEOUS_SYMBOLS

```java
public static final UnicodeBlock MISCELLANEOUS_SYMBOLS
```

Constant for the "Miscellaneous Symbols" Unicode character block.
@since 1.2

## Character.DINGBATS

```java
public static final UnicodeBlock DINGBATS
```

Constant for the "Dingbats" Unicode character block.
@since 1.2

## Character.CJK_SYMBOLS_AND_PUNCTUATION

```java
public static final UnicodeBlock CJK_SYMBOLS_AND_PUNCTUATION
```

Constant for the "CJK Symbols and Punctuation" Unicode character block.
@since 1.2

## Character.HIRAGANA

```java
public static final UnicodeBlock HIRAGANA
```

Constant for the "Hiragana" Unicode character block.
@since 1.2

## Character.KATAKANA

```java
public static final UnicodeBlock KATAKANA
```

Constant for the "Katakana" Unicode character block.
@since 1.2

## Character.BOPOMOFO

```java
public static final UnicodeBlock BOPOMOFO
```

Constant for the "Bopomofo" Unicode character block.
@since 1.2

## Character.HANGUL_COMPATIBILITY_JAMO

```java
public static final UnicodeBlock HANGUL_COMPATIBILITY_JAMO
```

Constant for the "Hangul Compatibility Jamo" Unicode character block.
@since 1.2

## Character.KANBUN

```java
public static final UnicodeBlock KANBUN
```

Constant for the "Kanbun" Unicode character block.
@since 1.2

## Character.ENCLOSED_CJK_LETTERS_AND_MONTHS

```java
public static final UnicodeBlock ENCLOSED_CJK_LETTERS_AND_MONTHS
```

Constant for the "Enclosed CJK Letters and Months" Unicode character block.
@since 1.2

## Character.CJK_COMPATIBILITY

```java
public static final UnicodeBlock CJK_COMPATIBILITY
```

Constant for the "CJK Compatibility" Unicode character block.
@since 1.2

## Character.CJK_UNIFIED_IDEOGRAPHS

```java
public static final UnicodeBlock CJK_UNIFIED_IDEOGRAPHS
```

Constant for the "CJK Unified Ideographs" Unicode character block.
@since 1.2

## Character.HANGUL_SYLLABLES

```java
public static final UnicodeBlock HANGUL_SYLLABLES
```

Constant for the "Hangul Syllables" Unicode character block.
@since 1.2

## Character.PRIVATE_USE_AREA

```java
public static final UnicodeBlock PRIVATE_USE_AREA
```

Constant for the "Private Use Area" Unicode character block.
@since 1.2

## Character.CJK_COMPATIBILITY_IDEOGRAPHS

```java
public static final UnicodeBlock CJK_COMPATIBILITY_IDEOGRAPHS
```

Constant for the "CJK Compatibility Ideographs" Unicode character
block.
@since 1.2

## Character.ALPHABETIC_PRESENTATION_FORMS

```java
public static final UnicodeBlock ALPHABETIC_PRESENTATION_FORMS
```

Constant for the "Alphabetic Presentation Forms" Unicode character block.
@since 1.2

## Character.ARABIC_PRESENTATION_FORMS_A

```java
public static final UnicodeBlock ARABIC_PRESENTATION_FORMS_A
```

Constant for the "Arabic Presentation Forms-A" Unicode character
block.
@since 1.2

## Character.COMBINING_HALF_MARKS

```java
public static final UnicodeBlock COMBINING_HALF_MARKS
```

Constant for the "Combining Half Marks" Unicode character block.
@since 1.2

## Character.CJK_COMPATIBILITY_FORMS

```java
public static final UnicodeBlock CJK_COMPATIBILITY_FORMS
```

Constant for the "CJK Compatibility Forms" Unicode character block.
@since 1.2

## Character.SMALL_FORM_VARIANTS

```java
public static final UnicodeBlock SMALL_FORM_VARIANTS
```

Constant for the "Small Form Variants" Unicode character block.
@since 1.2

## Character.ARABIC_PRESENTATION_FORMS_B

```java
public static final UnicodeBlock ARABIC_PRESENTATION_FORMS_B
```

Constant for the "Arabic Presentation Forms-B" Unicode character block.
@since 1.2

## Character.HALFWIDTH_AND_FULLWIDTH_FORMS

```java
public static final UnicodeBlock HALFWIDTH_AND_FULLWIDTH_FORMS
```

Constant for the "Halfwidth and Fullwidth Forms" Unicode character
block.
@since 1.2

## Character.SPECIALS

```java
public static final UnicodeBlock SPECIALS
```

Constant for the "Specials" Unicode character block.
@since 1.2

## Character.SURROGATES_AREA

```java
public static final UnicodeBlock SURROGATES_AREA
```

@deprecated
Instead of {@code SURROGATES_AREA}, use {@link #HIGH_SURROGATES},
{@link #HIGH_PRIVATE_USE_SURROGATES}, and {@link #LOW_SURROGATES}.
These constants match the block definitions of the Unicode Standard.
The {@link #of(char)} and {@link #of(int)} methods return the
standard constants.

## Character.SYRIAC

```java
public static final UnicodeBlock SYRIAC
```

Constant for the "Syriac" Unicode character block.
@since 1.4

## Character.THAANA

```java
public static final UnicodeBlock THAANA
```

Constant for the "Thaana" Unicode character block.
@since 1.4

## Character.SINHALA

```java
public static final UnicodeBlock SINHALA
```

Constant for the "Sinhala" Unicode character block.
@since 1.4

## Character.MYANMAR

```java
public static final UnicodeBlock MYANMAR
```

Constant for the "Myanmar" Unicode character block.
@since 1.4

## Character.ETHIOPIC

```java
public static final UnicodeBlock ETHIOPIC
```

Constant for the "Ethiopic" Unicode character block.
@since 1.4

## Character.CHEROKEE

```java
public static final UnicodeBlock CHEROKEE
```

Constant for the "Cherokee" Unicode character block.
@since 1.4

## Character.UNIFIED_CANADIAN_ABORIGINAL_SYLLABICS

```java
public static final UnicodeBlock UNIFIED_CANADIAN_ABORIGINAL_SYLLABICS
```

Constant for the "Unified Canadian Aboriginal Syllabics" Unicode character block.
@since 1.4

## Character.OGHAM

```java
public static final UnicodeBlock OGHAM
```

Constant for the "Ogham" Unicode character block.
@since 1.4

## Character.RUNIC

```java
public static final UnicodeBlock RUNIC
```

Constant for the "Runic" Unicode character block.
@since 1.4

## Character.KHMER

```java
public static final UnicodeBlock KHMER
```

Constant for the "Khmer" Unicode character block.
@since 1.4

## Character.MONGOLIAN

```java
public static final UnicodeBlock MONGOLIAN
```

Constant for the "Mongolian" Unicode character block.
@since 1.4

## Character.BRAILLE_PATTERNS

```java
public static final UnicodeBlock BRAILLE_PATTERNS
```

Constant for the "Braille Patterns" Unicode character block.
@since 1.4

## Character.CJK_RADICALS_SUPPLEMENT

```java
public static final UnicodeBlock CJK_RADICALS_SUPPLEMENT
```

Constant for the "CJK Radicals Supplement" Unicode character block.
@since 1.4

## Character.KANGXI_RADICALS

```java
public static final UnicodeBlock KANGXI_RADICALS
```

Constant for the "Kangxi Radicals" Unicode character block.
@since 1.4

## Character.IDEOGRAPHIC_DESCRIPTION_CHARACTERS

```java
public static final UnicodeBlock IDEOGRAPHIC_DESCRIPTION_CHARACTERS
```

Constant for the "Ideographic Description Characters" Unicode character block.
@since 1.4

## Character.BOPOMOFO_EXTENDED

```java
public static final UnicodeBlock BOPOMOFO_EXTENDED
```

Constant for the "Bopomofo Extended" Unicode character block.
@since 1.4

## Character.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A

```java
public static final UnicodeBlock CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A
```

Constant for the "CJK Unified Ideographs Extension A" Unicode character block.
@since 1.4

## Character.YI_SYLLABLES

```java
public static final UnicodeBlock YI_SYLLABLES
```

Constant for the "Yi Syllables" Unicode character block.
@since 1.4

## Character.YI_RADICALS

```java
public static final UnicodeBlock YI_RADICALS
```

Constant for the "Yi Radicals" Unicode character block.
@since 1.4

## Character.CYRILLIC_SUPPLEMENTARY

```java
public static final UnicodeBlock CYRILLIC_SUPPLEMENTARY
```

Constant for the "Cyrillic Supplement" Unicode character block.
This block was previously known as the "Cyrillic Supplementary" block.
@since 1.5

## Character.TAGALOG

```java
public static final UnicodeBlock TAGALOG
```

Constant for the "Tagalog" Unicode character block.
@since 1.5

## Character.HANUNOO

```java
public static final UnicodeBlock HANUNOO
```

Constant for the "Hanunoo" Unicode character block.
@since 1.5

## Character.BUHID

```java
public static final UnicodeBlock BUHID
```

Constant for the "Buhid" Unicode character block.
@since 1.5

## Character.TAGBANWA

```java
public static final UnicodeBlock TAGBANWA
```

Constant for the "Tagbanwa" Unicode character block.
@since 1.5

## Character.LIMBU

```java
public static final UnicodeBlock LIMBU
```

Constant for the "Limbu" Unicode character block.
@since 1.5

## Character.TAI_LE

```java
public static final UnicodeBlock TAI_LE
```

Constant for the "Tai Le" Unicode character block.
@since 1.5

## Character.KHMER_SYMBOLS

```java
public static final UnicodeBlock KHMER_SYMBOLS
```

Constant for the "Khmer Symbols" Unicode character block.
@since 1.5

## Character.PHONETIC_EXTENSIONS

```java
public static final UnicodeBlock PHONETIC_EXTENSIONS
```

Constant for the "Phonetic Extensions" Unicode character block.
@since 1.5

## Character.MISCELLANEOUS_MATHEMATICAL_SYMBOLS_A

```java
public static final UnicodeBlock MISCELLANEOUS_MATHEMATICAL_SYMBOLS_A
```

Constant for the "Miscellaneous Mathematical Symbols-A" Unicode character block.
@since 1.5

## Character.SUPPLEMENTAL_ARROWS_A

```java
public static final UnicodeBlock SUPPLEMENTAL_ARROWS_A
```

Constant for the "Supplemental Arrows-A" Unicode character block.
@since 1.5

## Character.SUPPLEMENTAL_ARROWS_B

```java
public static final UnicodeBlock SUPPLEMENTAL_ARROWS_B
```

Constant for the "Supplemental Arrows-B" Unicode character block.
@since 1.5

## Character.MISCELLANEOUS_MATHEMATICAL_SYMBOLS_B

```java
public static final UnicodeBlock MISCELLANEOUS_MATHEMATICAL_SYMBOLS_B
```

Constant for the "Miscellaneous Mathematical Symbols-B" Unicode
character block.
@since 1.5

## Character.SUPPLEMENTAL_MATHEMATICAL_OPERATORS

```java
public static final UnicodeBlock SUPPLEMENTAL_MATHEMATICAL_OPERATORS
```

Constant for the "Supplemental Mathematical Operators" Unicode
character block.
@since 1.5

## Character.MISCELLANEOUS_SYMBOLS_AND_ARROWS

```java
public static final UnicodeBlock MISCELLANEOUS_SYMBOLS_AND_ARROWS
```

Constant for the "Miscellaneous Symbols and Arrows" Unicode character
block.
@since 1.5

## Character.KATAKANA_PHONETIC_EXTENSIONS

```java
public static final UnicodeBlock KATAKANA_PHONETIC_EXTENSIONS
```

Constant for the "Katakana Phonetic Extensions" Unicode character
block.
@since 1.5

## Character.YIJING_HEXAGRAM_SYMBOLS

```java
public static final UnicodeBlock YIJING_HEXAGRAM_SYMBOLS
```

Constant for the "Yijing Hexagram Symbols" Unicode character block.
@since 1.5

## Character.VARIATION_SELECTORS

```java
public static final UnicodeBlock VARIATION_SELECTORS
```

Constant for the "Variation Selectors" Unicode character block.
@since 1.5

## Character.LINEAR_B_SYLLABARY

```java
public static final UnicodeBlock LINEAR_B_SYLLABARY
```

Constant for the "Linear B Syllabary" Unicode character block.
@since 1.5

## Character.LINEAR_B_IDEOGRAMS

```java
public static final UnicodeBlock LINEAR_B_IDEOGRAMS
```

Constant for the "Linear B Ideograms" Unicode character block.
@since 1.5

## Character.AEGEAN_NUMBERS

```java
public static final UnicodeBlock AEGEAN_NUMBERS
```

Constant for the "Aegean Numbers" Unicode character block.
@since 1.5

## Character.OLD_ITALIC

```java
public static final UnicodeBlock OLD_ITALIC
```

Constant for the "Old Italic" Unicode character block.
@since 1.5

## Character.GOTHIC

```java
public static final UnicodeBlock GOTHIC
```

Constant for the "Gothic" Unicode character block.
@since 1.5

## Character.UGARITIC

```java
public static final UnicodeBlock UGARITIC
```

Constant for the "Ugaritic" Unicode character block.
@since 1.5

## Character.DESERET

```java
public static final UnicodeBlock DESERET
```

Constant for the "Deseret" Unicode character block.
@since 1.5

## Character.SHAVIAN

```java
public static final UnicodeBlock SHAVIAN
```

Constant for the "Shavian" Unicode character block.
@since 1.5

## Character.OSMANYA

```java
public static final UnicodeBlock OSMANYA
```

Constant for the "Osmanya" Unicode character block.
@since 1.5

## Character.CYPRIOT_SYLLABARY

```java
public static final UnicodeBlock CYPRIOT_SYLLABARY
```

Constant for the "Cypriot Syllabary" Unicode character block.
@since 1.5

## Character.BYZANTINE_MUSICAL_SYMBOLS

```java
public static final UnicodeBlock BYZANTINE_MUSICAL_SYMBOLS
```

Constant for the "Byzantine Musical Symbols" Unicode character block.
@since 1.5

## Character.MUSICAL_SYMBOLS

```java
public static final UnicodeBlock MUSICAL_SYMBOLS
```

Constant for the "Musical Symbols" Unicode character block.
@since 1.5

## Character.TAI_XUAN_JING_SYMBOLS

```java
public static final UnicodeBlock TAI_XUAN_JING_SYMBOLS
```

Constant for the "Tai Xuan Jing Symbols" Unicode character block.
@since 1.5

## Character.MATHEMATICAL_ALPHANUMERIC_SYMBOLS

```java
public static final UnicodeBlock MATHEMATICAL_ALPHANUMERIC_SYMBOLS
```

Constant for the "Mathematical Alphanumeric Symbols" Unicode
character block.
@since 1.5

## Character.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B

```java
public static final UnicodeBlock CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B
```

Constant for the "CJK Unified Ideographs Extension B" Unicode
character block.
@since 1.5

## Character.CJK_COMPATIBILITY_IDEOGRAPHS_SUPPLEMENT

```java
public static final UnicodeBlock CJK_COMPATIBILITY_IDEOGRAPHS_SUPPLEMENT
```

Constant for the "CJK Compatibility Ideographs Supplement" Unicode character block.
@since 1.5

## Character.TAGS

```java
public static final UnicodeBlock TAGS
```

Constant for the "Tags" Unicode character block.
@since 1.5

## Character.VARIATION_SELECTORS_SUPPLEMENT

```java
public static final UnicodeBlock VARIATION_SELECTORS_SUPPLEMENT
```

Constant for the "Variation Selectors Supplement" Unicode character
block.
@since 1.5

## Character.SUPPLEMENTARY_PRIVATE_USE_AREA_A

```java
public static final UnicodeBlock SUPPLEMENTARY_PRIVATE_USE_AREA_A
```

Constant for the "Supplementary Private Use Area-A" Unicode character
block.
@since 1.5

## Character.SUPPLEMENTARY_PRIVATE_USE_AREA_B

```java
public static final UnicodeBlock SUPPLEMENTARY_PRIVATE_USE_AREA_B
```

Constant for the "Supplementary Private Use Area-B" Unicode character
block.
@since 1.5

## Character.HIGH_SURROGATES

```java
public static final UnicodeBlock HIGH_SURROGATES
```

Constant for the "High Surrogates" Unicode character block.
This block represents codepoint values in the high surrogate
range: U+D800 through U+DB7F

@since 1.5

## Character.HIGH_PRIVATE_USE_SURROGATES

```java
public static final UnicodeBlock HIGH_PRIVATE_USE_SURROGATES
```

Constant for the "High Private Use Surrogates" Unicode character
block.
This block represents codepoint values in the private use high
surrogate range: U+DB80 through U+DBFF

@since 1.5

## Character.LOW_SURROGATES

```java
public static final UnicodeBlock LOW_SURROGATES
```

Constant for the "Low Surrogates" Unicode character block.
This block represents codepoint values in the low surrogate
range: U+DC00 through U+DFFF

@since 1.5

## Character.ARABIC_SUPPLEMENT

```java
public static final UnicodeBlock ARABIC_SUPPLEMENT
```

Constant for the "Arabic Supplement" Unicode character block.
@since 1.7

## Character.NKO

```java
public static final UnicodeBlock NKO
```

Constant for the "NKo" Unicode character block.
@since 1.7

## Character.SAMARITAN

```java
public static final UnicodeBlock SAMARITAN
```

Constant for the "Samaritan" Unicode character block.
@since 1.7

## Character.MANDAIC

```java
public static final UnicodeBlock MANDAIC
```

Constant for the "Mandaic" Unicode character block.
@since 1.7

## Character.ETHIOPIC_SUPPLEMENT

```java
public static final UnicodeBlock ETHIOPIC_SUPPLEMENT
```

Constant for the "Ethiopic Supplement" Unicode character block.
@since 1.7

## Character.UNIFIED_CANADIAN_ABORIGINAL_SYLLABICS_EXTENDED

```java
public static final UnicodeBlock UNIFIED_CANADIAN_ABORIGINAL_SYLLABICS_EXTENDED
```

Constant for the "Unified Canadian Aboriginal Syllabics Extended"
Unicode character block.
@since 1.7

## Character.NEW_TAI_LUE

```java
public static final UnicodeBlock NEW_TAI_LUE
```

Constant for the "New Tai Lue" Unicode character block.
@since 1.7

## Character.BUGINESE

```java
public static final UnicodeBlock BUGINESE
```

Constant for the "Buginese" Unicode character block.
@since 1.7

## Character.TAI_THAM

```java
public static final UnicodeBlock TAI_THAM
```

Constant for the "Tai Tham" Unicode character block.
@since 1.7

## Character.BALINESE

```java
public static final UnicodeBlock BALINESE
```

Constant for the "Balinese" Unicode character block.
@since 1.7

## Character.SUNDANESE

```java
public static final UnicodeBlock SUNDANESE
```

Constant for the "Sundanese" Unicode character block.
@since 1.7

## Character.BATAK

```java
public static final UnicodeBlock BATAK
```

Constant for the "Batak" Unicode character block.
@since 1.7

## Character.LEPCHA

```java
public static final UnicodeBlock LEPCHA
```

Constant for the "Lepcha" Unicode character block.
@since 1.7

## Character.OL_CHIKI

```java
public static final UnicodeBlock OL_CHIKI
```

Constant for the "Ol Chiki" Unicode character block.
@since 1.7

## Character.VEDIC_EXTENSIONS

```java
public static final UnicodeBlock VEDIC_EXTENSIONS
```

Constant for the "Vedic Extensions" Unicode character block.
@since 1.7

## Character.PHONETIC_EXTENSIONS_SUPPLEMENT

```java
public static final UnicodeBlock PHONETIC_EXTENSIONS_SUPPLEMENT
```

Constant for the "Phonetic Extensions Supplement" Unicode character
block.
@since 1.7

## Character.COMBINING_DIACRITICAL_MARKS_SUPPLEMENT

```java
public static final UnicodeBlock COMBINING_DIACRITICAL_MARKS_SUPPLEMENT
```

Constant for the "Combining Diacritical Marks Supplement" Unicode
character block.
@since 1.7

## Character.GLAGOLITIC

```java
public static final UnicodeBlock GLAGOLITIC
```

Constant for the "Glagolitic" Unicode character block.
@since 1.7

## Character.LATIN_EXTENDED_C

```java
public static final UnicodeBlock LATIN_EXTENDED_C
```

Constant for the "Latin Extended-C" Unicode character block.
@since 1.7

## Character.COPTIC

```java
public static final UnicodeBlock COPTIC
```

Constant for the "Coptic" Unicode character block.
@since 1.7

## Character.GEORGIAN_SUPPLEMENT

```java
public static final UnicodeBlock GEORGIAN_SUPPLEMENT
```

Constant for the "Georgian Supplement" Unicode character block.
@since 1.7

## Character.TIFINAGH

```java
public static final UnicodeBlock TIFINAGH
```

Constant for the "Tifinagh" Unicode character block.
@since 1.7

## Character.ETHIOPIC_EXTENDED

```java
public static final UnicodeBlock ETHIOPIC_EXTENDED
```

Constant for the "Ethiopic Extended" Unicode character block.
@since 1.7

## Character.CYRILLIC_EXTENDED_A

```java
public static final UnicodeBlock CYRILLIC_EXTENDED_A
```

Constant for the "Cyrillic Extended-A" Unicode character block.
@since 1.7

## Character.SUPPLEMENTAL_PUNCTUATION

```java
public static final UnicodeBlock SUPPLEMENTAL_PUNCTUATION
```

Constant for the "Supplemental Punctuation" Unicode character block.
@since 1.7

## Character.CJK_STROKES

```java
public static final UnicodeBlock CJK_STROKES
```

Constant for the "CJK Strokes" Unicode character block.
@since 1.7

## Character.LISU

```java
public static final UnicodeBlock LISU
```

Constant for the "Lisu" Unicode character block.
@since 1.7

## Character.VAI

```java
public static final UnicodeBlock VAI
```

Constant for the "Vai" Unicode character block.
@since 1.7

## Character.CYRILLIC_EXTENDED_B

```java
public static final UnicodeBlock CYRILLIC_EXTENDED_B
```

Constant for the "Cyrillic Extended-B" Unicode character block.
@since 1.7

## Character.BAMUM

```java
public static final UnicodeBlock BAMUM
```

Constant for the "Bamum" Unicode character block.
@since 1.7

## Character.MODIFIER_TONE_LETTERS

```java
public static final UnicodeBlock MODIFIER_TONE_LETTERS
```

Constant for the "Modifier Tone Letters" Unicode character block.
@since 1.7

## Character.LATIN_EXTENDED_D

```java
public static final UnicodeBlock LATIN_EXTENDED_D
```

Constant for the "Latin Extended-D" Unicode character block.
@since 1.7

## Character.SYLOTI_NAGRI

```java
public static final UnicodeBlock SYLOTI_NAGRI
```

Constant for the "Syloti Nagri" Unicode character block.
@since 1.7

## Character.COMMON_INDIC_NUMBER_FORMS

```java
public static final UnicodeBlock COMMON_INDIC_NUMBER_FORMS
```

Constant for the "Common Indic Number Forms" Unicode character block.
@since 1.7

## Character.PHAGS_PA

```java
public static final UnicodeBlock PHAGS_PA
```

Constant for the "Phags-pa" Unicode character block.
@since 1.7

## Character.SAURASHTRA

```java
public static final UnicodeBlock SAURASHTRA
```

Constant for the "Saurashtra" Unicode character block.
@since 1.7

## Character.DEVANAGARI_EXTENDED

```java
public static final UnicodeBlock DEVANAGARI_EXTENDED
```

Constant for the "Devanagari Extended" Unicode character block.
@since 1.7

## Character.KAYAH_LI

```java
public static final UnicodeBlock KAYAH_LI
```

Constant for the "Kayah Li" Unicode character block.
@since 1.7

## Character.REJANG

```java
public static final UnicodeBlock REJANG
```

Constant for the "Rejang" Unicode character block.
@since 1.7

## Character.HANGUL_JAMO_EXTENDED_A

```java
public static final UnicodeBlock HANGUL_JAMO_EXTENDED_A
```

Constant for the "Hangul Jamo Extended-A" Unicode character block.
@since 1.7

## Character.JAVANESE

```java
public static final UnicodeBlock JAVANESE
```

Constant for the "Javanese" Unicode character block.
@since 1.7

## Character.CHAM

```java
public static final UnicodeBlock CHAM
```

Constant for the "Cham" Unicode character block.
@since 1.7

## Character.MYANMAR_EXTENDED_A

```java
public static final UnicodeBlock MYANMAR_EXTENDED_A
```

Constant for the "Myanmar Extended-A" Unicode character block.
@since 1.7

## Character.TAI_VIET

```java
public static final UnicodeBlock TAI_VIET
```

Constant for the "Tai Viet" Unicode character block.
@since 1.7

## Character.ETHIOPIC_EXTENDED_A

```java
public static final UnicodeBlock ETHIOPIC_EXTENDED_A
```

Constant for the "Ethiopic Extended-A" Unicode character block.
@since 1.7

## Character.MEETEI_MAYEK

```java
public static final UnicodeBlock MEETEI_MAYEK
```

Constant for the "Meetei Mayek" Unicode character block.
@since 1.7

## Character.HANGUL_JAMO_EXTENDED_B

```java
public static final UnicodeBlock HANGUL_JAMO_EXTENDED_B
```

Constant for the "Hangul Jamo Extended-B" Unicode character block.
@since 1.7

## Character.VERTICAL_FORMS

```java
public static final UnicodeBlock VERTICAL_FORMS
```

Constant for the "Vertical Forms" Unicode character block.
@since 1.7

## Character.ANCIENT_GREEK_NUMBERS

```java
public static final UnicodeBlock ANCIENT_GREEK_NUMBERS
```

Constant for the "Ancient Greek Numbers" Unicode character block.
@since 1.7

## Character.ANCIENT_SYMBOLS

```java
public static final UnicodeBlock ANCIENT_SYMBOLS
```

Constant for the "Ancient Symbols" Unicode character block.
@since 1.7

## Character.PHAISTOS_DISC

```java
public static final UnicodeBlock PHAISTOS_DISC
```

Constant for the "Phaistos Disc" Unicode character block.
@since 1.7

## Character.LYCIAN

```java
public static final UnicodeBlock LYCIAN
```

Constant for the "Lycian" Unicode character block.
@since 1.7

## Character.CARIAN

```java
public static final UnicodeBlock CARIAN
```

Constant for the "Carian" Unicode character block.
@since 1.7

## Character.OLD_PERSIAN

```java
public static final UnicodeBlock OLD_PERSIAN
```

Constant for the "Old Persian" Unicode character block.
@since 1.7

## Character.IMPERIAL_ARAMAIC

```java
public static final UnicodeBlock IMPERIAL_ARAMAIC
```

Constant for the "Imperial Aramaic" Unicode character block.
@since 1.7

## Character.PHOENICIAN

```java
public static final UnicodeBlock PHOENICIAN
```

Constant for the "Phoenician" Unicode character block.
@since 1.7

## Character.LYDIAN

```java
public static final UnicodeBlock LYDIAN
```

Constant for the "Lydian" Unicode character block.
@since 1.7

## Character.KHAROSHTHI

```java
public static final UnicodeBlock KHAROSHTHI
```

Constant for the "Kharoshthi" Unicode character block.
@since 1.7

## Character.OLD_SOUTH_ARABIAN

```java
public static final UnicodeBlock OLD_SOUTH_ARABIAN
```

Constant for the "Old South Arabian" Unicode character block.
@since 1.7

## Character.AVESTAN

```java
public static final UnicodeBlock AVESTAN
```

Constant for the "Avestan" Unicode character block.
@since 1.7

## Character.INSCRIPTIONAL_PARTHIAN

```java
public static final UnicodeBlock INSCRIPTIONAL_PARTHIAN
```

Constant for the "Inscriptional Parthian" Unicode character block.
@since 1.7

## Character.INSCRIPTIONAL_PAHLAVI

```java
public static final UnicodeBlock INSCRIPTIONAL_PAHLAVI
```

Constant for the "Inscriptional Pahlavi" Unicode character block.
@since 1.7

## Character.OLD_TURKIC

```java
public static final UnicodeBlock OLD_TURKIC
```

Constant for the "Old Turkic" Unicode character block.
@since 1.7

## Character.RUMI_NUMERAL_SYMBOLS

```java
public static final UnicodeBlock RUMI_NUMERAL_SYMBOLS
```

Constant for the "Rumi Numeral Symbols" Unicode character block.
@since 1.7

## Character.BRAHMI

```java
public static final UnicodeBlock BRAHMI
```

Constant for the "Brahmi" Unicode character block.
@since 1.7

## Character.KAITHI

```java
public static final UnicodeBlock KAITHI
```

Constant for the "Kaithi" Unicode character block.
@since 1.7

## Character.CUNEIFORM

```java
public static final UnicodeBlock CUNEIFORM
```

Constant for the "Cuneiform" Unicode character block.
@since 1.7

## Character.CUNEIFORM_NUMBERS_AND_PUNCTUATION

```java
public static final UnicodeBlock CUNEIFORM_NUMBERS_AND_PUNCTUATION
```

Constant for the "Cuneiform Numbers and Punctuation" Unicode
character block.
@since 1.7

## Character.EGYPTIAN_HIEROGLYPHS

```java
public static final UnicodeBlock EGYPTIAN_HIEROGLYPHS
```

Constant for the "Egyptian Hieroglyphs" Unicode character block.
@since 1.7

## Character.BAMUM_SUPPLEMENT

```java
public static final UnicodeBlock BAMUM_SUPPLEMENT
```

Constant for the "Bamum Supplement" Unicode character block.
@since 1.7

## Character.KANA_SUPPLEMENT

```java
public static final UnicodeBlock KANA_SUPPLEMENT
```

Constant for the "Kana Supplement" Unicode character block.
@since 1.7

## Character.ANCIENT_GREEK_MUSICAL_NOTATION

```java
public static final UnicodeBlock ANCIENT_GREEK_MUSICAL_NOTATION
```

Constant for the "Ancient Greek Musical Notation" Unicode character
block.
@since 1.7

## Character.COUNTING_ROD_NUMERALS

```java
public static final UnicodeBlock COUNTING_ROD_NUMERALS
```

Constant for the "Counting Rod Numerals" Unicode character block.
@since 1.7

## Character.MAHJONG_TILES

```java
public static final UnicodeBlock MAHJONG_TILES
```

Constant for the "Mahjong Tiles" Unicode character block.
@since 1.7

## Character.DOMINO_TILES

```java
public static final UnicodeBlock DOMINO_TILES
```

Constant for the "Domino Tiles" Unicode character block.
@since 1.7

## Character.PLAYING_CARDS

```java
public static final UnicodeBlock PLAYING_CARDS
```

Constant for the "Playing Cards" Unicode character block.
@since 1.7

## Character.ENCLOSED_ALPHANUMERIC_SUPPLEMENT

```java
public static final UnicodeBlock ENCLOSED_ALPHANUMERIC_SUPPLEMENT
```

Constant for the "Enclosed Alphanumeric Supplement" Unicode character
block.
@since 1.7

## Character.ENCLOSED_IDEOGRAPHIC_SUPPLEMENT

```java
public static final UnicodeBlock ENCLOSED_IDEOGRAPHIC_SUPPLEMENT
```

Constant for the "Enclosed Ideographic Supplement" Unicode character
block.
@since 1.7

## Character.MISCELLANEOUS_SYMBOLS_AND_PICTOGRAPHS

```java
public static final UnicodeBlock MISCELLANEOUS_SYMBOLS_AND_PICTOGRAPHS
```

Constant for the "Miscellaneous Symbols And Pictographs" Unicode
character block.
@since 1.7

## Character.EMOTICONS

```java
public static final UnicodeBlock EMOTICONS
```

Constant for the "Emoticons" Unicode character block.
@since 1.7

## Character.TRANSPORT_AND_MAP_SYMBOLS

```java
public static final UnicodeBlock TRANSPORT_AND_MAP_SYMBOLS
```

Constant for the "Transport And Map Symbols" Unicode character block.
@since 1.7

## Character.ALCHEMICAL_SYMBOLS

```java
public static final UnicodeBlock ALCHEMICAL_SYMBOLS
```

Constant for the "Alchemical Symbols" Unicode character block.
@since 1.7

## Character.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_C

```java
public static final UnicodeBlock CJK_UNIFIED_IDEOGRAPHS_EXTENSION_C
```

Constant for the "CJK Unified Ideographs Extension C" Unicode
character block.
@since 1.7

## Character.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_D

```java
public static final UnicodeBlock CJK_UNIFIED_IDEOGRAPHS_EXTENSION_D
```

Constant for the "CJK Unified Ideographs Extension D" Unicode
character block.
@since 1.7

## Character.ARABIC_EXTENDED_A

```java
public static final UnicodeBlock ARABIC_EXTENDED_A
```

Constant for the "Arabic Extended-A" Unicode character block.
@since 1.8

## Character.SUNDANESE_SUPPLEMENT

```java
public static final UnicodeBlock SUNDANESE_SUPPLEMENT
```

Constant for the "Sundanese Supplement" Unicode character block.
@since 1.8

## Character.MEETEI_MAYEK_EXTENSIONS

```java
public static final UnicodeBlock MEETEI_MAYEK_EXTENSIONS
```

Constant for the "Meetei Mayek Extensions" Unicode character block.
@since 1.8

## Character.MEROITIC_HIEROGLYPHS

```java
public static final UnicodeBlock MEROITIC_HIEROGLYPHS
```

Constant for the "Meroitic Hieroglyphs" Unicode character block.
@since 1.8

## Character.MEROITIC_CURSIVE

```java
public static final UnicodeBlock MEROITIC_CURSIVE
```

Constant for the "Meroitic Cursive" Unicode character block.
@since 1.8

## Character.SORA_SOMPENG

```java
public static final UnicodeBlock SORA_SOMPENG
```

Constant for the "Sora Sompeng" Unicode character block.
@since 1.8

## Character.CHAKMA

```java
public static final UnicodeBlock CHAKMA
```

Constant for the "Chakma" Unicode character block.
@since 1.8

## Character.SHARADA

```java
public static final UnicodeBlock SHARADA
```

Constant for the "Sharada" Unicode character block.
@since 1.8

## Character.TAKRI

```java
public static final UnicodeBlock TAKRI
```

Constant for the "Takri" Unicode character block.
@since 1.8

## Character.MIAO

```java
public static final UnicodeBlock MIAO
```

Constant for the "Miao" Unicode character block.
@since 1.8

## Character.ARABIC_MATHEMATICAL_ALPHABETIC_SYMBOLS

```java
public static final UnicodeBlock ARABIC_MATHEMATICAL_ALPHABETIC_SYMBOLS
```

Constant for the "Arabic Mathematical Alphabetic Symbols" Unicode
character block.
@since 1.8

## Character.COMBINING_DIACRITICAL_MARKS_EXTENDED

```java
public static final UnicodeBlock COMBINING_DIACRITICAL_MARKS_EXTENDED
```

Constant for the "Combining Diacritical Marks Extended" Unicode
character block.
@since 9

## Character.MYANMAR_EXTENDED_B

```java
public static final UnicodeBlock MYANMAR_EXTENDED_B
```

Constant for the "Myanmar Extended-B" Unicode character block.
@since 9

## Character.LATIN_EXTENDED_E

```java
public static final UnicodeBlock LATIN_EXTENDED_E
```

Constant for the "Latin Extended-E" Unicode character block.
@since 9

## Character.COPTIC_EPACT_NUMBERS

```java
public static final UnicodeBlock COPTIC_EPACT_NUMBERS
```

Constant for the "Coptic Epact Numbers" Unicode character block.
@since 9

## Character.OLD_PERMIC

```java
public static final UnicodeBlock OLD_PERMIC
```

Constant for the "Old Permic" Unicode character block.
@since 9

## Character.ELBASAN

```java
public static final UnicodeBlock ELBASAN
```

Constant for the "Elbasan" Unicode character block.
@since 9

## Character.CAUCASIAN_ALBANIAN

```java
public static final UnicodeBlock CAUCASIAN_ALBANIAN
```

Constant for the "Caucasian Albanian" Unicode character block.
@since 9

## Character.LINEAR_A

```java
public static final UnicodeBlock LINEAR_A
```

Constant for the "Linear A" Unicode character block.
@since 9

## Character.PALMYRENE

```java
public static final UnicodeBlock PALMYRENE
```

Constant for the "Palmyrene" Unicode character block.
@since 9

## Character.NABATAEAN

```java
public static final UnicodeBlock NABATAEAN
```

Constant for the "Nabataean" Unicode character block.
@since 9

## Character.OLD_NORTH_ARABIAN

```java
public static final UnicodeBlock OLD_NORTH_ARABIAN
```

Constant for the "Old North Arabian" Unicode character block.
@since 9

## Character.MANICHAEAN

```java
public static final UnicodeBlock MANICHAEAN
```

Constant for the "Manichaean" Unicode character block.
@since 9

## Character.PSALTER_PAHLAVI

```java
public static final UnicodeBlock PSALTER_PAHLAVI
```

Constant for the "Psalter Pahlavi" Unicode character block.
@since 9

## Character.MAHAJANI

```java
public static final UnicodeBlock MAHAJANI
```

Constant for the "Mahajani" Unicode character block.
@since 9

## Character.SINHALA_ARCHAIC_NUMBERS

```java
public static final UnicodeBlock SINHALA_ARCHAIC_NUMBERS
```

Constant for the "Sinhala Archaic Numbers" Unicode character block.
@since 9

## Character.KHOJKI

```java
public static final UnicodeBlock KHOJKI
```

Constant for the "Khojki" Unicode character block.
@since 9

## Character.KHUDAWADI

```java
public static final UnicodeBlock KHUDAWADI
```

Constant for the "Khudawadi" Unicode character block.
@since 9

## Character.GRANTHA

```java
public static final UnicodeBlock GRANTHA
```

Constant for the "Grantha" Unicode character block.
@since 9

## Character.TIRHUTA

```java
public static final UnicodeBlock TIRHUTA
```

Constant for the "Tirhuta" Unicode character block.
@since 9

## Character.SIDDHAM

```java
public static final UnicodeBlock SIDDHAM
```

Constant for the "Siddham" Unicode character block.
@since 9

## Character.MODI

```java
public static final UnicodeBlock MODI
```

Constant for the "Modi" Unicode character block.
@since 9

## Character.WARANG_CITI

```java
public static final UnicodeBlock WARANG_CITI
```

Constant for the "Warang Citi" Unicode character block.
@since 9

## Character.PAU_CIN_HAU

```java
public static final UnicodeBlock PAU_CIN_HAU
```

Constant for the "Pau Cin Hau" Unicode character block.
@since 9

## Character.MRO

```java
public static final UnicodeBlock MRO
```

Constant for the "Mro" Unicode character block.
@since 9

## Character.BASSA_VAH

```java
public static final UnicodeBlock BASSA_VAH
```

Constant for the "Bassa Vah" Unicode character block.
@since 9

## Character.PAHAWH_HMONG

```java
public static final UnicodeBlock PAHAWH_HMONG
```

Constant for the "Pahawh Hmong" Unicode character block.
@since 9

## Character.DUPLOYAN

```java
public static final UnicodeBlock DUPLOYAN
```

Constant for the "Duployan" Unicode character block.
@since 9

## Character.SHORTHAND_FORMAT_CONTROLS

```java
public static final UnicodeBlock SHORTHAND_FORMAT_CONTROLS
```

Constant for the "Shorthand Format Controls" Unicode character block.
@since 9

## Character.MENDE_KIKAKUI

```java
public static final UnicodeBlock MENDE_KIKAKUI
```

Constant for the "Mende Kikakui" Unicode character block.
@since 9

## Character.ORNAMENTAL_DINGBATS

```java
public static final UnicodeBlock ORNAMENTAL_DINGBATS
```

Constant for the "Ornamental Dingbats" Unicode character block.
@since 9

## Character.GEOMETRIC_SHAPES_EXTENDED

```java
public static final UnicodeBlock GEOMETRIC_SHAPES_EXTENDED
```

Constant for the "Geometric Shapes Extended" Unicode character block.
@since 9

## Character.SUPPLEMENTAL_ARROWS_C

```java
public static final UnicodeBlock SUPPLEMENTAL_ARROWS_C
```

Constant for the "Supplemental Arrows-C" Unicode character block.
@since 9

## Character.CHEROKEE_SUPPLEMENT

```java
public static final UnicodeBlock CHEROKEE_SUPPLEMENT
```

Constant for the "Cherokee Supplement" Unicode character block.
@since 9

## Character.HATRAN

```java
public static final UnicodeBlock HATRAN
```

Constant for the "Hatran" Unicode character block.
@since 9

## Character.OLD_HUNGARIAN

```java
public static final UnicodeBlock OLD_HUNGARIAN
```

Constant for the "Old Hungarian" Unicode character block.
@since 9

## Character.MULTANI

```java
public static final UnicodeBlock MULTANI
```

Constant for the "Multani" Unicode character block.
@since 9

## Character.AHOM

```java
public static final UnicodeBlock AHOM
```

Constant for the "Ahom" Unicode character block.
@since 9

## Character.EARLY_DYNASTIC_CUNEIFORM

```java
public static final UnicodeBlock EARLY_DYNASTIC_CUNEIFORM
```

Constant for the "Early Dynastic Cuneiform" Unicode character block.
@since 9

## Character.ANATOLIAN_HIEROGLYPHS

```java
public static final UnicodeBlock ANATOLIAN_HIEROGLYPHS
```

Constant for the "Anatolian Hieroglyphs" Unicode character block.
@since 9

## Character.SUTTON_SIGNWRITING

```java
public static final UnicodeBlock SUTTON_SIGNWRITING
```

Constant for the "Sutton SignWriting" Unicode character block.
@since 9

## Character.SUPPLEMENTAL_SYMBOLS_AND_PICTOGRAPHS

```java
public static final UnicodeBlock SUPPLEMENTAL_SYMBOLS_AND_PICTOGRAPHS
```

Constant for the "Supplemental Symbols and Pictographs" Unicode
character block.
@since 9

## Character.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_E

```java
public static final UnicodeBlock CJK_UNIFIED_IDEOGRAPHS_EXTENSION_E
```

Constant for the "CJK Unified Ideographs Extension E" Unicode
character block.
@since 9

## Character.SYRIAC_SUPPLEMENT

```java
public static final UnicodeBlock SYRIAC_SUPPLEMENT
```

Constant for the "Syriac Supplement" Unicode
character block.
@since 11

## Character.CYRILLIC_EXTENDED_C

```java
public static final UnicodeBlock CYRILLIC_EXTENDED_C
```

Constant for the "Cyrillic Extended-C" Unicode
character block.
@since 11

## Character.OSAGE

```java
public static final UnicodeBlock OSAGE
```

Constant for the "Osage" Unicode
character block.
@since 11

## Character.NEWA

```java
public static final UnicodeBlock NEWA
```

Constant for the "Newa" Unicode
character block.
@since 11

## Character.MONGOLIAN_SUPPLEMENT

```java
public static final UnicodeBlock MONGOLIAN_SUPPLEMENT
```

Constant for the "Mongolian Supplement" Unicode
character block.
@since 11

## Character.MARCHEN

```java
public static final UnicodeBlock MARCHEN
```

Constant for the "Marchen" Unicode
character block.
@since 11

## Character.IDEOGRAPHIC_SYMBOLS_AND_PUNCTUATION

```java
public static final UnicodeBlock IDEOGRAPHIC_SYMBOLS_AND_PUNCTUATION
```

Constant for the "Ideographic Symbols and Punctuation" Unicode
character block.
@since 11

## Character.TANGUT

```java
public static final UnicodeBlock TANGUT
```

Constant for the "Tangut" Unicode
character block.
@since 11

## Character.TANGUT_COMPONENTS

```java
public static final UnicodeBlock TANGUT_COMPONENTS
```

Constant for the "Tangut Components" Unicode
character block.
@since 11

## Character.KANA_EXTENDED_A

```java
public static final UnicodeBlock KANA_EXTENDED_A
```

Constant for the "Kana Extended-A" Unicode
character block.
@since 11

## Character.GLAGOLITIC_SUPPLEMENT

```java
public static final UnicodeBlock GLAGOLITIC_SUPPLEMENT
```

Constant for the "Glagolitic Supplement" Unicode
character block.
@since 11

## Character.ADLAM

```java
public static final UnicodeBlock ADLAM
```

Constant for the "Adlam" Unicode
character block.
@since 11

## Character.MASARAM_GONDI

```java
public static final UnicodeBlock MASARAM_GONDI
```

Constant for the "Masaram Gondi" Unicode
character block.
@since 11

## Character.ZANABAZAR_SQUARE

```java
public static final UnicodeBlock ZANABAZAR_SQUARE
```

Constant for the "Zanabazar Square" Unicode
character block.
@since 11

## Character.NUSHU

```java
public static final UnicodeBlock NUSHU
```

Constant for the "Nushu" Unicode
character block.
@since 11

## Character.SOYOMBO

```java
public static final UnicodeBlock SOYOMBO
```

Constant for the "Soyombo" Unicode
character block.
@since 11

## Character.BHAIKSUKI

```java
public static final UnicodeBlock BHAIKSUKI
```

Constant for the "Bhaiksuki" Unicode
character block.
@since 11

## Character.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_F

```java
public static final UnicodeBlock CJK_UNIFIED_IDEOGRAPHS_EXTENSION_F
```

Constant for the "CJK Unified Ideographs Extension F" Unicode
character block.
@since 11

## Character.GEORGIAN_EXTENDED

```java
public static final UnicodeBlock GEORGIAN_EXTENDED
```

Constant for the "Georgian Extended" Unicode
character block.
@since 12

## Character.HANIFI_ROHINGYA

```java
public static final UnicodeBlock HANIFI_ROHINGYA
```

Constant for the "Hanifi Rohingya" Unicode
character block.
@since 12

## Character.OLD_SOGDIAN

```java
public static final UnicodeBlock OLD_SOGDIAN
```

Constant for the "Old Sogdian" Unicode
character block.
@since 12

## Character.SOGDIAN

```java
public static final UnicodeBlock SOGDIAN
```

Constant for the "Sogdian" Unicode
character block.
@since 12

## Character.DOGRA

```java
public static final UnicodeBlock DOGRA
```

Constant for the "Dogra" Unicode
character block.
@since 12

## Character.GUNJALA_GONDI

```java
public static final UnicodeBlock GUNJALA_GONDI
```

Constant for the "Gunjala Gondi" Unicode
character block.
@since 12

## Character.MAKASAR

```java
public static final UnicodeBlock MAKASAR
```

Constant for the "Makasar" Unicode
character block.
@since 12

## Character.MEDEFAIDRIN

```java
public static final UnicodeBlock MEDEFAIDRIN
```

Constant for the "Medefaidrin" Unicode
character block.
@since 12

## Character.MAYAN_NUMERALS

```java
public static final UnicodeBlock MAYAN_NUMERALS
```

Constant for the "Mayan Numerals" Unicode
character block.
@since 12

## Character.INDIC_SIYAQ_NUMBERS

```java
public static final UnicodeBlock INDIC_SIYAQ_NUMBERS
```

Constant for the "Indic Siyaq Numbers" Unicode
character block.
@since 12

## Character.CHESS_SYMBOLS

```java
public static final UnicodeBlock CHESS_SYMBOLS
```

Constant for the "Chess Symbols" Unicode
character block.
@since 12

## Character.ELYMAIC

```java
public static final UnicodeBlock ELYMAIC
```

Constant for the "Elymaic" Unicode
character block.
@since 13

## Character.NANDINAGARI

```java
public static final UnicodeBlock NANDINAGARI
```

Constant for the "Nandinagari" Unicode
character block.
@since 13

## Character.TAMIL_SUPPLEMENT

```java
public static final UnicodeBlock TAMIL_SUPPLEMENT
```

Constant for the "Tamil Supplement" Unicode
character block.
@since 13

## Character.EGYPTIAN_HIEROGLYPH_FORMAT_CONTROLS

```java
public static final UnicodeBlock EGYPTIAN_HIEROGLYPH_FORMAT_CONTROLS
```

Constant for the "Egyptian Hieroglyph Format Controls" Unicode
character block.
@since 13

## Character.SMALL_KANA_EXTENSION

```java
public static final UnicodeBlock SMALL_KANA_EXTENSION
```

Constant for the "Small Kana Extension" Unicode
character block.
@since 13

## Character.NYIAKENG_PUACHUE_HMONG

```java
public static final UnicodeBlock NYIAKENG_PUACHUE_HMONG
```

Constant for the "Nyiakeng Puachue Hmong" Unicode
character block.
@since 13

## Character.WANCHO

```java
public static final UnicodeBlock WANCHO
```

Constant for the "Wancho" Unicode
character block.
@since 13

## Character.OTTOMAN_SIYAQ_NUMBERS

```java
public static final UnicodeBlock OTTOMAN_SIYAQ_NUMBERS
```

Constant for the "Ottoman Siyaq Numbers" Unicode
character block.
@since 13

## Character.SYMBOLS_AND_PICTOGRAPHS_EXTENDED_A

```java
public static final UnicodeBlock SYMBOLS_AND_PICTOGRAPHS_EXTENDED_A
```

Constant for the "Symbols and Pictographs Extended-A" Unicode
character block.
@since 13

## Character.YEZIDI

```java
public static final UnicodeBlock YEZIDI
```

Constant for the "Yezidi" Unicode
character block.
@since 15

## Character.CHORASMIAN

```java
public static final UnicodeBlock CHORASMIAN
```

Constant for the "Chorasmian" Unicode
character block.
@since 15

## Character.DIVES_AKURU

```java
public static final UnicodeBlock DIVES_AKURU
```

Constant for the "Dives Akuru" Unicode
character block.
@since 15

## Character.LISU_SUPPLEMENT

```java
public static final UnicodeBlock LISU_SUPPLEMENT
```

Constant for the "Lisu Supplement" Unicode
character block.
@since 15

## Character.KHITAN_SMALL_SCRIPT

```java
public static final UnicodeBlock KHITAN_SMALL_SCRIPT
```

Constant for the "Khitan Small Script" Unicode
character block.
@since 15

## Character.TANGUT_SUPPLEMENT

```java
public static final UnicodeBlock TANGUT_SUPPLEMENT
```

Constant for the "Tangut Supplement" Unicode
character block.
@since 15

## Character.SYMBOLS_FOR_LEGACY_COMPUTING

```java
public static final UnicodeBlock SYMBOLS_FOR_LEGACY_COMPUTING
```

Constant for the "Symbols for Legacy Computing" Unicode
character block.
@since 15

## Character.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_G

```java
public static final UnicodeBlock CJK_UNIFIED_IDEOGRAPHS_EXTENSION_G
```

Constant for the "CJK Unified Ideographs Extension G" Unicode
character block.
@since 15

## Character.ARABIC_EXTENDED_B

```java
public static final UnicodeBlock ARABIC_EXTENDED_B
```

Constant for the "Arabic Extended-B" Unicode
character block.
@since 19

## Character.VITHKUQI

```java
public static final UnicodeBlock VITHKUQI
```

Constant for the "Vithkuqi" Unicode
character block.
@since 19

## Character.LATIN_EXTENDED_F

```java
public static final UnicodeBlock LATIN_EXTENDED_F
```

Constant for the "Latin Extended-F" Unicode
character block.
@since 19

## Character.OLD_UYGHUR

```java
public static final UnicodeBlock OLD_UYGHUR
```

Constant for the "Old Uyghur" Unicode
character block.
@since 19

## Character.UNIFIED_CANADIAN_ABORIGINAL_SYLLABICS_EXTENDED_A

```java
public static final UnicodeBlock UNIFIED_CANADIAN_ABORIGINAL_SYLLABICS_EXTENDED_A
```

Constant for the "Unified Canadian Aboriginal Syllabics Extended-A" Unicode
character block.
@since 19

## Character.CYPRO_MINOAN

```java
public static final UnicodeBlock CYPRO_MINOAN
```

Constant for the "Cypro-Minoan" Unicode
character block.
@since 19

## Character.TANGSA

```java
public static final UnicodeBlock TANGSA
```

Constant for the "Tangsa" Unicode
character block.
@since 19

## Character.KANA_EXTENDED_B

```java
public static final UnicodeBlock KANA_EXTENDED_B
```

Constant for the "Kana Extended-B" Unicode
character block.
@since 19

## Character.ZNAMENNY_MUSICAL_NOTATION

```java
public static final UnicodeBlock ZNAMENNY_MUSICAL_NOTATION
```

Constant for the "Znamenny Musical Notation" Unicode
character block.
@since 19

## Character.LATIN_EXTENDED_G

```java
public static final UnicodeBlock LATIN_EXTENDED_G
```

Constant for the "Latin Extended-G" Unicode
character block.
@since 19

## Character.TOTO

```java
public static final UnicodeBlock TOTO
```

Constant for the "Toto" Unicode
character block.
@since 19

## Character.ETHIOPIC_EXTENDED_B

```java
public static final UnicodeBlock ETHIOPIC_EXTENDED_B
```

Constant for the "Ethiopic Extended-B" Unicode
character block.
@since 19

## Character.ARABIC_EXTENDED_C

```java
public static final UnicodeBlock ARABIC_EXTENDED_C
```

Constant for the "Arabic Extended-C" Unicode
character block.
@since 20

## Character.DEVANAGARI_EXTENDED_A

```java
public static final UnicodeBlock DEVANAGARI_EXTENDED_A
```

Constant for the "Devanagari Extended-A" Unicode
character block.
@since 20

## Character.KAWI

```java
public static final UnicodeBlock KAWI
```

Constant for the "Kawi" Unicode
character block.
@since 20

## Character.KAKTOVIK_NUMERALS

```java
public static final UnicodeBlock KAKTOVIK_NUMERALS
```

Constant for the "Kaktovik Numerals" Unicode
character block.
@since 20

## Character.CYRILLIC_EXTENDED_D

```java
public static final UnicodeBlock CYRILLIC_EXTENDED_D
```

Constant for the "Cyrillic Extended-D" Unicode
character block.
@since 20

## Character.NAG_MUNDARI

```java
public static final UnicodeBlock NAG_MUNDARI
```

Constant for the "Nag Mundari" Unicode
character block.
@since 20

## Character.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_H

```java
public static final UnicodeBlock CJK_UNIFIED_IDEOGRAPHS_EXTENSION_H
```

Constant for the "CJK Unified Ideographs Extension H" Unicode
character block.
@since 20

## Character.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_I

```java
public static final UnicodeBlock CJK_UNIFIED_IDEOGRAPHS_EXTENSION_I
```

Constant for the "CJK Unified Ideographs Extension I" Unicode
character block.
@since 22

## Character.TODHRI

```java
public static final UnicodeBlock TODHRI
```

Constant for the "Todhri" Unicode
character block.
@since 24

## Character.GARAY

```java
public static final UnicodeBlock GARAY
```

Constant for the "Garay" Unicode
character block.
@since 24

## Character.TULU_TIGALARI

```java
public static final UnicodeBlock TULU_TIGALARI
```

Constant for the "Tulu-Tigalari" Unicode
character block.
@since 24

## Character.MYANMAR_EXTENDED_C

```java
public static final UnicodeBlock MYANMAR_EXTENDED_C
```

Constant for the "Myanmar Extended-C" Unicode
character block.
@since 24

## Character.SUNUWAR

```java
public static final UnicodeBlock SUNUWAR
```

Constant for the "Sunuwar" Unicode
character block.
@since 24

## Character.EGYPTIAN_HIEROGLYPHS_EXTENDED_A

```java
public static final UnicodeBlock EGYPTIAN_HIEROGLYPHS_EXTENDED_A
```

Constant for the "Egyptian Hieroglyphs Extended-A" Unicode
character block.
@since 24

## Character.GURUNG_KHEMA

```java
public static final UnicodeBlock GURUNG_KHEMA
```

Constant for the "Gurung Khema" Unicode
character block.
@since 24

## Character.KIRAT_RAI

```java
public static final UnicodeBlock KIRAT_RAI
```

Constant for the "Kirat Rai" Unicode
character block.
@since 24

## Character.SYMBOLS_FOR_LEGACY_COMPUTING_SUPPLEMENT

```java
public static final UnicodeBlock SYMBOLS_FOR_LEGACY_COMPUTING_SUPPLEMENT
```

Constant for the "Symbols for Legacy Computing Supplement" Unicode
character block.
@since 24

## Character.OL_ONAL

```java
public static final UnicodeBlock OL_ONAL
```

Constant for the "Ol Onal" Unicode
character block.
@since 24

## Character.of(char)

```java
public static UnicodeBlock of(char c)
```

Returns the object representing the Unicode block containing the
given character, or {@code null} if the character is not a
member of a defined block.

<p><b>Note:</b> This method cannot handle
<a href="Character.html#supplementary"> supplementary
characters</a>.  To support all Unicode characters, including
supplementary characters, use the {@link #of(int)} method.

@param   c  The character in question
@return  The {@code UnicodeBlock} instance representing the
         Unicode block of which this character is a member, or
         {@code null} if the character is not a member of any
         Unicode block

## Character.of(int)

```java
public static UnicodeBlock of(int codePoint)
```

Returns the object representing the Unicode block
containing the given character (Unicode code point), or
{@code null} if the character is not a member of a
defined block.

@param   codePoint the character (Unicode code point) in question.
@return  The {@code UnicodeBlock} instance representing the
         Unicode block of which this character is a member, or
         {@code null} if the character is not a member of any
         Unicode block
@throws  IllegalArgumentException if the specified
{@code codePoint} is an invalid Unicode code point.
@see Character#isValidCodePoint(int)
@since   1.5

## Character.forName(String)

```java
public static final UnicodeBlock forName(String blockName)
```

Returns the UnicodeBlock with the given name. Block
names are determined by The Unicode Standard. The file
{@code Blocks.txt} defines blocks for a particular
version of the standard. The {@link Character} class specifies
the version of the standard that it supports.
<p>
This method accepts block names in the following forms:
<ol>
<li> Canonical block names as defined by the Unicode Standard.
For example, the standard defines a "Basic Latin" block. Therefore, this
method accepts "Basic Latin" as a valid block name. The documentation of
each UnicodeBlock provides the canonical name.
<li>Canonical block names with all spaces removed. For example, "BasicLatin"
is a valid block name for the "Basic Latin" block.
<li>The text representation of each constant UnicodeBlock identifier.
For example, this method will return the {@link #BASIC_LATIN} block if
provided with the "BASIC_LATIN" name. This form replaces all spaces and
hyphens in the canonical name with underscores.
</ol>
Finally, character case is ignored for all of the valid block name forms.
For example, "BASIC_LATIN" and "basic_latin" are both valid block names.
The en_US locale's case mapping rules are used to provide case-insensitive
string comparisons for block name validation.
<p>
If the Unicode Standard changes block names, both the previous and
current names will be accepted.

@param blockName A {@code UnicodeBlock} name.
@return The {@code UnicodeBlock} instance identified
        by {@code blockName}
@throws IllegalArgumentException if {@code blockName} is an
        invalid name
@throws NullPointerException if {@code blockName} is null
@since 1.5

## Character.of(int)

```java
public static UnicodeScript of(int codePoint)
```

Returns the enum constant representing the Unicode script of which
the given character (Unicode code point) is assigned to.

@param   codePoint the character (Unicode code point) in question.
@return  The {@code UnicodeScript} constant representing the
         Unicode script of which this character is assigned to.

@throws  IllegalArgumentException if the specified
{@code codePoint} is an invalid Unicode code point.
@see Character#isValidCodePoint(int)

## Character.forName(String)

```java
public static final UnicodeScript forName(String scriptName)
```

Returns the UnicodeScript constant with the given Unicode script
name or the script name alias. Script names and their aliases are
determined by The Unicode Standard. The files {@code Scripts.txt}
and {@code PropertyValueAliases.txt} define script names
and the script name aliases for a particular version of the
standard. The {@link Character} class specifies the version of
the standard that it supports.
<p>
Character case is ignored for all of the valid script names.
The en_US locale's case mapping rules are used to provide
case-insensitive string comparisons for script name validation.

@param scriptName A {@code UnicodeScript} name.
@return The {@code UnicodeScript} constant identified
        by {@code scriptName}
@throws IllegalArgumentException if {@code scriptName} is an
        invalid name
@throws NullPointerException if {@code scriptName} is null

## Character.Character(char)

```java
public Character(char value)
```

Constructs a newly allocated {@code Character} object that
represents the specified {@code char} value.

@param  value   the value to be represented by the
                 {@code Character} object.

@deprecated
It is rarely appropriate to use this constructor. The static factory
{@link #valueOf(char)} is generally a better choice, as it is
likely to yield significantly better space and time performance.

## Character.valueOf(char)

```java
public static Character valueOf(char c)
```

Returns a {@code Character} instance representing the specified
{@code char} value.
If a new {@code Character} instance is not required, this method
should generally be used in preference to the constructor
{@link #Character(char)}, as this method is likely to yield
significantly better space and time performance by caching
frequently requested values.

This method will always cache values in the range {@code
'\u005Cu0000'} to {@code '\u005Cu007F'}, inclusive, and may
cache other values outside of this range.

@param  c a char value.
@return a {@code Character} instance representing {@code c}.
@since  1.5

## Character.charValue()

```java
public char charValue()
```

Returns the value of this {@code Character} object.
@return  the primitive {@code char} value represented by
         this object.

## Character.hashCode()

```java
public int hashCode()
```

Returns a hash code for this {@code Character}; equal to the result
of invoking {@code charValue()}.

@return a hash code value for this {@code Character}

## Character.hashCode(char)

```java
public static int hashCode(char value)
```

Returns a hash code for a {@code char} value; compatible with
{@code Character.hashCode()}.

@since 1.8

@param value The {@code char} for which to return a hash code.
@return a hash code value for a {@code char} value.

## Character.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this object against the specified object.
The result is {@code true} if and only if the argument is not
{@code null} and is a {@code Character} object that
represents the same {@code char} value as this object.

@param   obj   the object to compare with.
@return  {@code true} if the objects are the same;
         {@code false} otherwise.

## Character.toString()

```java
public String toString()
```

Returns a {@code String} object representing this
{@code Character}'s value.  The result is a string of
length 1 whose sole component is the primitive
{@code char} value represented by this
{@code Character} object.

@return  a string representation of this object.

## Character.toString(char)

```java
public static String toString(char c)
```

Returns a {@code String} object representing the
specified {@code char}.  The result is a string of length
1 consisting solely of the specified {@code char}.

@apiNote This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #toString(int)} method.

@param c the {@code char} to be converted
@return the string representation of the specified {@code char}
@since 1.4

## Character.toString(int)

```java
public static String toString(int codePoint)
```

Returns a {@code String} object representing the
specified character (Unicode code point).  The result is a string of
length 1 or 2, consisting solely of the specified {@code codePoint}.

@param codePoint the {@code codePoint} to be converted
@return the string representation of the specified {@code codePoint}
@throws IllegalArgumentException if the specified
     {@code codePoint} is not a {@linkplain #isValidCodePoint
     valid Unicode code point}.
@since 11

## Character.isValidCodePoint(int)

```java
public static boolean isValidCodePoint(int codePoint)
```

Determines whether the specified code point is a valid
<a href="http://www.unicode.org/glossary/#code_point">
Unicode code point value</a>.

@param  codePoint the Unicode code point to be tested
@return {@code true} if the specified code point value is between
        {@link #MIN_CODE_POINT} and
        {@link #MAX_CODE_POINT} inclusive;
        {@code false} otherwise.
@since  1.5

## Character.isBmpCodePoint(int)

```java
public static boolean isBmpCodePoint(int codePoint)
```

Determines whether the specified character (Unicode code point)
is in the <a href="#BMP">Basic Multilingual Plane (BMP)</a>.
Such code points can be represented using a single {@code char}.

@param  codePoint the character (Unicode code point) to be tested
@return {@code true} if the specified code point is between
        {@link #MIN_VALUE} and {@link #MAX_VALUE} inclusive;
        {@code false} otherwise.
@since  1.7

## Character.isSupplementaryCodePoint(int)

```java
public static boolean isSupplementaryCodePoint(int codePoint)
```

Determines whether the specified character (Unicode code point)
is in the <a href="#supplementary">supplementary character</a> range.

@param  codePoint the character (Unicode code point) to be tested
@return {@code true} if the specified code point is between
        {@link #MIN_SUPPLEMENTARY_CODE_POINT} and
        {@link #MAX_CODE_POINT} inclusive;
        {@code false} otherwise.
@since  1.5

## Character.isHighSurrogate(char)

```java
public static boolean isHighSurrogate(char ch)
```

Determines if the given {@code char} value is a
<a href="http://www.unicode.org/glossary/#high_surrogate_code_unit">
Unicode high-surrogate code unit</a>
(also known as <i>leading-surrogate code unit</i>).

<p>Such values do not represent characters by themselves,
but are used in the representation of
<a href="#supplementary">supplementary characters</a>
in the UTF-16 encoding.

@param  ch the {@code char} value to be tested.
@return {@code true} if the {@code char} value is between
        {@link #MIN_HIGH_SURROGATE} and
        {@link #MAX_HIGH_SURROGATE} inclusive;
        {@code false} otherwise.
@see    Character#isLowSurrogate(char)
@see    Character.UnicodeBlock#of(int)
@since  1.5

## Character.isLowSurrogate(char)

```java
public static boolean isLowSurrogate(char ch)
```

Determines if the given {@code char} value is a
<a href="http://www.unicode.org/glossary/#low_surrogate_code_unit">
Unicode low-surrogate code unit</a>
(also known as <i>trailing-surrogate code unit</i>).

<p>Such values do not represent characters by themselves,
but are used in the representation of
<a href="#supplementary">supplementary characters</a>
in the UTF-16 encoding.

@param  ch the {@code char} value to be tested.
@return {@code true} if the {@code char} value is between
        {@link #MIN_LOW_SURROGATE} and
        {@link #MAX_LOW_SURROGATE} inclusive;
        {@code false} otherwise.
@see    Character#isHighSurrogate(char)
@since  1.5

## Character.isSurrogate(char)

```java
public static boolean isSurrogate(char ch)
```

Determines if the given {@code char} value is a Unicode
<i>surrogate code unit</i>.

<p>Such values do not represent characters by themselves,
but are used in the representation of
<a href="#supplementary">supplementary characters</a>
in the UTF-16 encoding.

<p>A char value is a surrogate code unit if and only if it is either
a {@linkplain #isLowSurrogate(char) low-surrogate code unit} or
a {@linkplain #isHighSurrogate(char) high-surrogate code unit}.

@param  ch the {@code char} value to be tested.
@return {@code true} if the {@code char} value is between
        {@link #MIN_SURROGATE} and
        {@link #MAX_SURROGATE} inclusive;
        {@code false} otherwise.
@since  1.7

## Character.isSurrogatePair(char, char)

```java
public static boolean isSurrogatePair(char high, char low)
```

Determines whether the specified pair of {@code char}
values is a valid
<a href="http://www.unicode.org/glossary/#surrogate_pair">
Unicode surrogate pair</a>.

<p>This method is equivalent to the expression:
<blockquote><pre>{@code
isHighSurrogate(high) && isLowSurrogate(low)
}</pre></blockquote>

@param  high the high-surrogate code value to be tested
@param  low the low-surrogate code value to be tested
@return {@code true} if the specified high and
low-surrogate code values represent a valid surrogate pair;
{@code false} otherwise.
@since  1.5

## Character.charCount(int)

```java
public static int charCount(int codePoint)
```

Determines the number of {@code char} values needed to
represent the specified character (Unicode code point). If the
specified character is equal to or greater than 0x10000, then
the method returns 2. Otherwise, the method returns 1.

<p>This method doesn't validate the specified character to be a
valid Unicode code point. The caller must validate the
character value using {@link #isValidCodePoint(int) isValidCodePoint}
if necessary.

@param   codePoint the character (Unicode code point) to be tested.
@return  2 if the character is a valid supplementary character; 1 otherwise.
@see     Character#isSupplementaryCodePoint(int)
@since   1.5

## Character.toCodePoint(char, char)

```java
public static int toCodePoint(char high, char low)
```

Converts the specified surrogate pair to its supplementary code
point value. This method does not validate the specified
surrogate pair. The caller must validate it using {@link
#isSurrogatePair(char, char) isSurrogatePair} if necessary.

@param  high the high-surrogate code unit
@param  low the low-surrogate code unit
@return the supplementary code point composed from the
        specified surrogate pair.
@since  1.5

## Character.codePointAt(CharSequence, int)

```java
public static int codePointAt(CharSequence seq, int index)
```

Returns the code point at the given index of the
{@code CharSequence}. If the {@code char} value at
the given index in the {@code CharSequence} is in the
high-surrogate range, the following index is less than the
length of the {@code CharSequence}, and the
{@code char} value at the following index is in the
low-surrogate range, then the supplementary code point
corresponding to this surrogate pair is returned. Otherwise,
the {@code char} value at the given index is returned.

@param seq a sequence of {@code char} values (Unicode code
units)
@param index the index to the {@code char} values (Unicode
code units) in {@code seq} to be converted
@return the Unicode code point at the given index
@throws NullPointerException if {@code seq} is null.
@throws IndexOutOfBoundsException if the value
{@code index} is negative or not less than
{@link CharSequence#length() seq.length()}.
@since  1.5

## Character.codePointAt(char[], int)

```java
public static int codePointAt(char[] a, int index)
```

Returns the code point at the given index of the
{@code char} array. If the {@code char} value at
the given index in the {@code char} array is in the
high-surrogate range, the following index is less than the
length of the {@code char} array, and the
{@code char} value at the following index is in the
low-surrogate range, then the supplementary code point
corresponding to this surrogate pair is returned. Otherwise,
the {@code char} value at the given index is returned.

@param a the {@code char} array
@param index the index to the {@code char} values (Unicode
code units) in the {@code char} array to be converted
@return the Unicode code point at the given index
@throws NullPointerException if {@code a} is null.
@throws IndexOutOfBoundsException if the value
{@code index} is negative or not less than
the length of the {@code char} array.
@since  1.5

## Character.codePointAt(char[], int, int)

```java
public static int codePointAt(char[] a, int index, int limit)
```

Returns the code point at the given index of the
{@code char} array, where only array elements with
{@code index} less than {@code limit} can be used. If
the {@code char} value at the given index in the
{@code char} array is in the high-surrogate range, the
following index is less than the {@code limit}, and the
{@code char} value at the following index is in the
low-surrogate range, then the supplementary code point
corresponding to this surrogate pair is returned. Otherwise,
the {@code char} value at the given index is returned.

@param a the {@code char} array
@param index the index to the {@code char} values (Unicode
code units) in the {@code char} array to be converted
@param limit the index after the last array element that
can be used in the {@code char} array
@return the Unicode code point at the given index
@throws NullPointerException if {@code a} is null.
@throws IndexOutOfBoundsException if the {@code index}
argument is negative or not less than the {@code limit}
argument, or if the {@code limit} argument is negative or
greater than the length of the {@code char} array.
@since  1.5

## Character.codePointBefore(CharSequence, int)

```java
public static int codePointBefore(CharSequence seq, int index)
```

Returns the code point preceding the given index of the
{@code CharSequence}. If the {@code char} value at
{@code (index - 1)} in the {@code CharSequence} is in
the low-surrogate range, {@code (index - 2)} is not
negative, and the {@code char} value at {@code (index - 2)}
in the {@code CharSequence} is in the
high-surrogate range, then the supplementary code point
corresponding to this surrogate pair is returned. Otherwise,
the {@code char} value at {@code (index - 1)} is
returned.

@param seq the {@code CharSequence} instance
@param index the index following the code point that should be returned
@return the Unicode code point value before the given index.
@throws NullPointerException if {@code seq} is null.
@throws IndexOutOfBoundsException if the {@code index}
argument is less than 1 or greater than {@link
CharSequence#length() seq.length()}.
@since  1.5

## Character.codePointBefore(char[], int)

```java
public static int codePointBefore(char[] a, int index)
```

Returns the code point preceding the given index of the
{@code char} array. If the {@code char} value at
{@code (index - 1)} in the {@code char} array is in
the low-surrogate range, {@code (index - 2)} is not
negative, and the {@code char} value at {@code (index - 2)}
in the {@code char} array is in the
high-surrogate range, then the supplementary code point
corresponding to this surrogate pair is returned. Otherwise,
the {@code char} value at {@code (index - 1)} is
returned.

@param a the {@code char} array
@param index the index following the code point that should be returned
@return the Unicode code point value before the given index.
@throws NullPointerException if {@code a} is null.
@throws IndexOutOfBoundsException if the {@code index}
argument is less than 1 or greater than the length of the
{@code char} array
@since  1.5

## Character.codePointBefore(char[], int, int)

```java
public static int codePointBefore(char[] a, int index, int start)
```

Returns the code point preceding the given index of the
{@code char} array, where only array elements with
{@code index} greater than or equal to {@code start}
can be used. If the {@code char} value at {@code (index - 1)}
in the {@code char} array is in the
low-surrogate range, {@code (index - 2)} is not less than
{@code start}, and the {@code char} value at
{@code (index - 2)} in the {@code char} array is in
the high-surrogate range, then the supplementary code point
corresponding to this surrogate pair is returned. Otherwise,
the {@code char} value at {@code (index - 1)} is
returned.

@param a the {@code char} array
@param index the index following the code point that should be returned
@param start the index of the first array element in the
{@code char} array
@return the Unicode code point value before the given index.
@throws NullPointerException if {@code a} is null.
@throws IndexOutOfBoundsException if the {@code index}
argument is not greater than the {@code start} argument or
is greater than the length of the {@code char} array, or
if the {@code start} argument is negative or not less than
the length of the {@code char} array.
@since  1.5

## Character.highSurrogate(int)

```java
public static char highSurrogate(int codePoint)
```

Returns the leading surrogate (a
<a href="http://www.unicode.org/glossary/#high_surrogate_code_unit">
high surrogate code unit</a>) of the
<a href="http://www.unicode.org/glossary/#surrogate_pair">
surrogate pair</a>
representing the specified supplementary character (Unicode
code point) in the UTF-16 encoding.  If the specified character
is not a
<a href="Character.html#supplementary">supplementary character</a>,
an unspecified {@code char} is returned.

<p>If
{@link #isSupplementaryCodePoint isSupplementaryCodePoint(x)}
is {@code true}, then
{@link #isHighSurrogate isHighSurrogate}{@code (highSurrogate(x))} and
{@link #toCodePoint toCodePoint}{@code (highSurrogate(x), }{@link #lowSurrogate lowSurrogate}{@code (x)) == x}
are also always {@code true}.

@param   codePoint a supplementary character (Unicode code point)
@return  the leading surrogate code unit used to represent the
         character in the UTF-16 encoding
@since   1.7

## Character.lowSurrogate(int)

```java
public static char lowSurrogate(int codePoint)
```

Returns the trailing surrogate (a
<a href="http://www.unicode.org/glossary/#low_surrogate_code_unit">
low surrogate code unit</a>) of the
<a href="http://www.unicode.org/glossary/#surrogate_pair">
surrogate pair</a>
representing the specified supplementary character (Unicode
code point) in the UTF-16 encoding.  If the specified character
is not a
<a href="Character.html#supplementary">supplementary character</a>,
an unspecified {@code char} is returned.

<p>If
{@link #isSupplementaryCodePoint isSupplementaryCodePoint(x)}
is {@code true}, then
{@link #isLowSurrogate isLowSurrogate}{@code (lowSurrogate(x))} and
{@link #toCodePoint toCodePoint}{@code (}{@link #highSurrogate highSurrogate}{@code (x), lowSurrogate(x)) == x}
are also always {@code true}.

@param   codePoint a supplementary character (Unicode code point)
@return  the trailing surrogate code unit used to represent the
         character in the UTF-16 encoding
@since   1.7

## Character.toChars(int, char[], int)

```java
public static int toChars(int codePoint, char[] dst, int dstIndex)
```

Converts the specified character (Unicode code point) to its
UTF-16 representation. If the specified code point is a BMP
(Basic Multilingual Plane or Plane 0) value, the same value is
stored in {@code dst[dstIndex]}, and 1 is returned. If the
specified code point is a supplementary character, its
surrogate values are stored in {@code dst[dstIndex]}
(high-surrogate) and {@code dst[dstIndex+1]}
(low-surrogate), and 2 is returned.

@param  codePoint the character (Unicode code point) to be converted.
@param  dst an array of {@code char} in which the
{@code codePoint}'s UTF-16 value is stored.
@param dstIndex the start index into the {@code dst}
array where the converted value is stored.
@return 1 if the code point is a BMP code point, 2 if the
code point is a supplementary code point.
@throws IllegalArgumentException if the specified
{@code codePoint} is not a valid Unicode code point.
@throws NullPointerException if the specified {@code dst} is null.
@throws IndexOutOfBoundsException if {@code dstIndex}
is negative or not less than {@code dst.length}, or if
{@code dst} at {@code dstIndex} doesn't have enough
array element(s) to store the resulting {@code char}
value(s). (If {@code dstIndex} is equal to
{@code dst.length-1} and the specified
{@code codePoint} is a supplementary character, the
high-surrogate value is not stored in
{@code dst[dstIndex]}.)
@since  1.5

## Character.toChars(int)

```java
public static char[] toChars(int codePoint)
```

Converts the specified character (Unicode code point) to its
UTF-16 representation stored in a {@code char} array. If
the specified code point is a BMP (Basic Multilingual Plane or
Plane 0) value, the resulting {@code char} array has
the same value as {@code codePoint}. If the specified code
point is a supplementary code point, the resulting
{@code char} array has the corresponding surrogate pair.

@param  codePoint a Unicode code point
@return a {@code char} array having
        {@code codePoint}'s UTF-16 representation.
@throws IllegalArgumentException if the specified
{@code codePoint} is not a valid Unicode code point.
@since  1.5

## Character.codePointCount(CharSequence, int, int)

```java
public static int codePointCount(CharSequence seq, int beginIndex, int endIndex)
```

Returns the number of Unicode code points in the text range of
the specified char sequence. The text range begins at the
specified {@code beginIndex} and extends to the
{@code char} at index {@code endIndex - 1}. Thus the
length (in {@code char}s) of the text range is
{@code endIndex-beginIndex}. Unpaired surrogates within
the text range count as one code point each.

@param seq the char sequence
@param beginIndex the index to the first {@code char} of
the text range.
@param endIndex the index after the last {@code char} of
the text range.
@return the number of Unicode code points in the specified text
range
@throws NullPointerException if {@code seq} is null.
@throws IndexOutOfBoundsException if the
{@code beginIndex} is negative, or {@code endIndex}
is larger than the length of the given sequence, or
{@code beginIndex} is larger than {@code endIndex}.
@since  1.5

## Character.codePointCount(char[], int, int)

```java
public static int codePointCount(char[] a, int offset, int count)
```

Returns the number of Unicode code points in a subarray of the
{@code char} array argument. The {@code offset}
argument is the index of the first {@code char} of the
subarray and the {@code count} argument specifies the
length of the subarray in {@code char}s. Unpaired
surrogates within the subarray count as one code point each.

@param a the {@code char} array
@param offset the index of the first {@code char} in the
given {@code char} array
@param count the length of the subarray in {@code char}s
@return the number of Unicode code points in the specified subarray
@throws NullPointerException if {@code a} is null.
@throws IndexOutOfBoundsException if {@code offset} or
{@code count} is negative, or if {@code offset +
count} is larger than the length of the given array.
@since  1.5

## Character.offsetByCodePoints(CharSequence, int, int)

```java
public static int offsetByCodePoints(CharSequence seq, int index, int codePointOffset)
```

Returns the index within the given char sequence that is offset
from the given {@code index} by {@code codePointOffset}
code points. Unpaired surrogates within the text range given by
{@code index} and {@code codePointOffset} count as
one code point each.

@param seq the char sequence
@param index the index to be offset
@param codePointOffset the offset in code points
@return the index within the char sequence
@throws NullPointerException if {@code seq} is null.
@throws IndexOutOfBoundsException if {@code index}
  is negative or larger than the length of the char sequence,
  or if {@code codePointOffset} is positive and the
  subsequence starting with {@code index} has fewer than
  {@code codePointOffset} code points, or if
  {@code codePointOffset} is negative and the subsequence
  before {@code index} has fewer than the absolute value
  of {@code codePointOffset} code points.
@since 1.5

## Character.offsetByCodePoints(char[], int, int, int, int)

```java
public static int offsetByCodePoints(char[] a, int start, int count, int index, int codePointOffset)
```

Returns the index within the given {@code char} subarray
that is offset from the given {@code index} by
{@code codePointOffset} code points. The
{@code start} and {@code count} arguments specify a
subarray of the {@code char} array. Unpaired surrogates
within the text range given by {@code index} and
{@code codePointOffset} count as one code point each.

@param a the {@code char} array
@param start the index of the first {@code char} of the
subarray
@param count the length of the subarray in {@code char}s
@param index the index to be offset
@param codePointOffset the offset in code points
@return the index within the subarray
@throws NullPointerException if {@code a} is null.
@throws IndexOutOfBoundsException
  if {@code start} or {@code count} is negative,
  or if {@code start + count} is larger than the length of
  the given array,
  or if {@code index} is less than {@code start} or
  larger then {@code start + count},
  or if {@code codePointOffset} is positive and the text range
  starting with {@code index} and ending with {@code start + count - 1}
  has fewer than {@code codePointOffset} code
  points,
  or if {@code codePointOffset} is negative and the text range
  starting with {@code start} and ending with {@code index - 1}
  has fewer than the absolute value of
  {@code codePointOffset} code points.
@since 1.5

## Character.isLowerCase(char)

```java
public static boolean isLowerCase(char ch)
```

Determines if the specified character is a lowercase character.
<p>
A character is lowercase if its general category type, provided
by {@code Character.getType(ch)}, is
{@code LOWERCASE_LETTER}, or it has contributory property
Other_Lowercase as defined by the Unicode Standard.
<p>
The following are examples of lowercase characters:
<blockquote><pre>
a b c d e f g h i j k l m n o p q r s t u v w x y z
'&#92;u00DF' '&#92;u00E0' '&#92;u00E1' '&#92;u00E2' '&#92;u00E3' '&#92;u00E4' '&#92;u00E5' '&#92;u00E6'
'&#92;u00E7' '&#92;u00E8' '&#92;u00E9' '&#92;u00EA' '&#92;u00EB' '&#92;u00EC' '&#92;u00ED' '&#92;u00EE'
'&#92;u00EF' '&#92;u00F0' '&#92;u00F1' '&#92;u00F2' '&#92;u00F3' '&#92;u00F4' '&#92;u00F5' '&#92;u00F6'
'&#92;u00F8' '&#92;u00F9' '&#92;u00FA' '&#92;u00FB' '&#92;u00FC' '&#92;u00FD' '&#92;u00FE' '&#92;u00FF'
</pre></blockquote>
<p> Many other Unicode characters are lowercase too.

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #isLowerCase(int)} method.

@param   ch   the character to be tested.
@return  {@code true} if the character is lowercase;
         {@code false} otherwise.
@see     Character#isLowerCase(char)
@see     Character#isTitleCase(char)
@see     Character#toLowerCase(char)
@see     Character#getType(char)

## Character.isLowerCase(int)

```java
public static boolean isLowerCase(int codePoint)
```

Determines if the specified character (Unicode code point) is a
lowercase character.
<p>
A character is lowercase if its general category type, provided
by {@link Character#getType getType(codePoint)}, is
{@code LOWERCASE_LETTER}, or it has contributory property
Other_Lowercase as defined by the Unicode Standard.
<p>
The following are examples of lowercase characters:
<blockquote><pre>
a b c d e f g h i j k l m n o p q r s t u v w x y z
'&#92;u00DF' '&#92;u00E0' '&#92;u00E1' '&#92;u00E2' '&#92;u00E3' '&#92;u00E4' '&#92;u00E5' '&#92;u00E6'
'&#92;u00E7' '&#92;u00E8' '&#92;u00E9' '&#92;u00EA' '&#92;u00EB' '&#92;u00EC' '&#92;u00ED' '&#92;u00EE'
'&#92;u00EF' '&#92;u00F0' '&#92;u00F1' '&#92;u00F2' '&#92;u00F3' '&#92;u00F4' '&#92;u00F5' '&#92;u00F6'
'&#92;u00F8' '&#92;u00F9' '&#92;u00FA' '&#92;u00FB' '&#92;u00FC' '&#92;u00FD' '&#92;u00FE' '&#92;u00FF'
</pre></blockquote>
<p> Many other Unicode characters are lowercase too.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is lowercase;
         {@code false} otherwise.
@see     Character#isLowerCase(int)
@see     Character#isTitleCase(int)
@see     Character#toLowerCase(int)
@see     Character#getType(int)
@since   1.5

## Character.isUpperCase(char)

```java
public static boolean isUpperCase(char ch)
```

Determines if the specified character is an uppercase character.
<p>
A character is uppercase if its general category type, provided by
{@code Character.getType(ch)}, is {@code UPPERCASE_LETTER}.
or it has contributory property Other_Uppercase as defined by the Unicode Standard.
<p>
The following are examples of uppercase characters:
<blockquote><pre>
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
'&#92;u00C0' '&#92;u00C1' '&#92;u00C2' '&#92;u00C3' '&#92;u00C4' '&#92;u00C5' '&#92;u00C6' '&#92;u00C7'
'&#92;u00C8' '&#92;u00C9' '&#92;u00CA' '&#92;u00CB' '&#92;u00CC' '&#92;u00CD' '&#92;u00CE' '&#92;u00CF'
'&#92;u00D0' '&#92;u00D1' '&#92;u00D2' '&#92;u00D3' '&#92;u00D4' '&#92;u00D5' '&#92;u00D6' '&#92;u00D8'
'&#92;u00D9' '&#92;u00DA' '&#92;u00DB' '&#92;u00DC' '&#92;u00DD' '&#92;u00DE'
</pre></blockquote>
<p> Many other Unicode characters are uppercase too.

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #isUpperCase(int)} method.

@param   ch   the character to be tested.
@return  {@code true} if the character is uppercase;
         {@code false} otherwise.
@see     Character#isLowerCase(char)
@see     Character#isTitleCase(char)
@see     Character#toUpperCase(char)
@see     Character#getType(char)
@since   1.0

## Character.isUpperCase(int)

```java
public static boolean isUpperCase(int codePoint)
```

Determines if the specified character (Unicode code point) is an uppercase character.
<p>
A character is uppercase if its general category type, provided by
{@link Character#getType(int) getType(codePoint)}, is {@code UPPERCASE_LETTER},
or it has contributory property Other_Uppercase as defined by the Unicode Standard.
<p>
The following are examples of uppercase characters:
<blockquote><pre>
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
'&#92;u00C0' '&#92;u00C1' '&#92;u00C2' '&#92;u00C3' '&#92;u00C4' '&#92;u00C5' '&#92;u00C6' '&#92;u00C7'
'&#92;u00C8' '&#92;u00C9' '&#92;u00CA' '&#92;u00CB' '&#92;u00CC' '&#92;u00CD' '&#92;u00CE' '&#92;u00CF'
'&#92;u00D0' '&#92;u00D1' '&#92;u00D2' '&#92;u00D3' '&#92;u00D4' '&#92;u00D5' '&#92;u00D6' '&#92;u00D8'
'&#92;u00D9' '&#92;u00DA' '&#92;u00DB' '&#92;u00DC' '&#92;u00DD' '&#92;u00DE'
</pre></blockquote>
<p> Many other Unicode characters are uppercase too.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is uppercase;
         {@code false} otherwise.
@see     Character#isLowerCase(int)
@see     Character#isTitleCase(int)
@see     Character#toUpperCase(int)
@see     Character#getType(int)
@since   1.5

## Character.isTitleCase(char)

```java
public static boolean isTitleCase(char ch)
```

Determines if the specified character is a titlecase character.
<p>
A character is a titlecase character if its general
category type, provided by {@code Character.getType(ch)},
is {@code TITLECASE_LETTER}.
<p>
Some characters look like pairs of Latin letters. For example, there
is an uppercase letter that looks like "LJ" and has a corresponding
lowercase letter that looks like "lj". A third form, which looks like "Lj",
is the appropriate form to use when rendering a word in lowercase
with initial capitals, as for a book title.
<p>
These are some of the Unicode characters for which this method returns
{@code true}:
<ul>
<li>{@code LATIN CAPITAL LETTER D WITH SMALL LETTER Z WITH CARON}
<li>{@code LATIN CAPITAL LETTER L WITH SMALL LETTER J}
<li>{@code LATIN CAPITAL LETTER N WITH SMALL LETTER J}
<li>{@code LATIN CAPITAL LETTER D WITH SMALL LETTER Z}
</ul>
<p> Many other Unicode characters are titlecase too.

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #isTitleCase(int)} method.

@param   ch   the character to be tested.
@return  {@code true} if the character is titlecase;
         {@code false} otherwise.
@see     Character#isLowerCase(char)
@see     Character#isUpperCase(char)
@see     Character#toTitleCase(char)
@see     Character#getType(char)
@since   1.0.2

## Character.isTitleCase(int)

```java
public static boolean isTitleCase(int codePoint)
```

Determines if the specified character (Unicode code point) is a titlecase character.
<p>
A character is a titlecase character if its general
category type, provided by {@link Character#getType(int) getType(codePoint)},
is {@code TITLECASE_LETTER}.
<p>
Some characters look like pairs of Latin letters. For example, there
is an uppercase letter that looks like "LJ" and has a corresponding
lowercase letter that looks like "lj". A third form, which looks like "Lj",
is the appropriate form to use when rendering a word in lowercase
with initial capitals, as for a book title.
<p>
These are some of the Unicode characters for which this method returns
{@code true}:
<ul>
<li>{@code LATIN CAPITAL LETTER D WITH SMALL LETTER Z WITH CARON}
<li>{@code LATIN CAPITAL LETTER L WITH SMALL LETTER J}
<li>{@code LATIN CAPITAL LETTER N WITH SMALL LETTER J}
<li>{@code LATIN CAPITAL LETTER D WITH SMALL LETTER Z}
</ul>
<p> Many other Unicode characters are titlecase too.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is titlecase;
         {@code false} otherwise.
@see     Character#isLowerCase(int)
@see     Character#isUpperCase(int)
@see     Character#toTitleCase(int)
@see     Character#getType(int)
@since   1.5

## Character.isDigit(char)

```java
public static boolean isDigit(char ch)
```

Determines if the specified character is a digit.
<p>
A character is a digit if its general category type, provided
by {@code Character.getType(ch)}, is
{@code DECIMAL_DIGIT_NUMBER}.
<p>
Some Unicode character ranges that contain digits:
<ul>
<li>{@code '\u005Cu0030'} through {@code '\u005Cu0039'},
    ISO-LATIN-1 digits ({@code '0'} through {@code '9'})
<li>{@code '\u005Cu0660'} through {@code '\u005Cu0669'},
    Arabic-Indic digits
<li>{@code '\u005Cu06F0'} through {@code '\u005Cu06F9'},
    Extended Arabic-Indic digits
<li>{@code '\u005Cu0966'} through {@code '\u005Cu096F'},
    Devanagari digits
<li>{@code '\u005CuFF10'} through {@code '\u005CuFF19'},
    Fullwidth digits
</ul>

Many other character ranges contain digits as well.

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #isDigit(int)} method.

@param   ch   the character to be tested.
@return  {@code true} if the character is a digit;
         {@code false} otherwise.
@see     Character#digit(char, int)
@see     Character#forDigit(int, int)
@see     Character#getType(char)

## Character.isDigit(int)

```java
public static boolean isDigit(int codePoint)
```

Determines if the specified character (Unicode code point) is a digit.
<p>
A character is a digit if its general category type, provided
by {@link Character#getType(int) getType(codePoint)}, is
{@code DECIMAL_DIGIT_NUMBER}.
<p>
Some Unicode character ranges that contain digits:
<ul>
<li>{@code '\u005Cu0030'} through {@code '\u005Cu0039'},
    ISO-LATIN-1 digits ({@code '0'} through {@code '9'})
<li>{@code '\u005Cu0660'} through {@code '\u005Cu0669'},
    Arabic-Indic digits
<li>{@code '\u005Cu06F0'} through {@code '\u005Cu06F9'},
    Extended Arabic-Indic digits
<li>{@code '\u005Cu0966'} through {@code '\u005Cu096F'},
    Devanagari digits
<li>{@code '\u005CuFF10'} through {@code '\u005CuFF19'},
    Fullwidth digits
</ul>

Many other character ranges contain digits as well.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is a digit;
         {@code false} otherwise.
@see     Character#forDigit(int, int)
@see     Character#getType(int)
@since   1.5

## Character.isDefined(char)

```java
public static boolean isDefined(char ch)
```

Determines if a character is defined in Unicode.
<p>
A character is defined if at least one of the following is true:
<ul>
<li>It has an entry in the UnicodeData file.
<li>It has a value in a range defined by the UnicodeData file.
</ul>

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #isDefined(int)} method.

@param   ch   the character to be tested
@return  {@code true} if the character has a defined meaning
         in Unicode; {@code false} otherwise.
@see     Character#isDigit(char)
@see     Character#isLetter(char)
@see     Character#isLetterOrDigit(char)
@see     Character#isLowerCase(char)
@see     Character#isTitleCase(char)
@see     Character#isUpperCase(char)
@since   1.0.2

## Character.isDefined(int)

```java
public static boolean isDefined(int codePoint)
```

Determines if a character (Unicode code point) is defined in Unicode.
<p>
A character is defined if at least one of the following is true:
<ul>
<li>It has an entry in the UnicodeData file.
<li>It has a value in a range defined by the UnicodeData file.
</ul>

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character has a defined meaning
         in Unicode; {@code false} otherwise.
@see     Character#isDigit(int)
@see     Character#isLetter(int)
@see     Character#isLetterOrDigit(int)
@see     Character#isLowerCase(int)
@see     Character#isTitleCase(int)
@see     Character#isUpperCase(int)
@since   1.5

## Character.isLetter(char)

```java
public static boolean isLetter(char ch)
```

Determines if the specified character is a letter.
<p>
A character is considered to be a letter if its general
category type, provided by {@code Character.getType(ch)},
is any of the following:
<ul>
<li> {@code UPPERCASE_LETTER}
<li> {@code LOWERCASE_LETTER}
<li> {@code TITLECASE_LETTER}
<li> {@code MODIFIER_LETTER}
<li> {@code OTHER_LETTER}
</ul>

Not all letters have case. Many characters are
letters but are neither uppercase nor lowercase nor titlecase.

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #isLetter(int)} method.

@param   ch   the character to be tested.
@return  {@code true} if the character is a letter;
         {@code false} otherwise.
@see     Character#isDigit(char)
@see     Character#isJavaIdentifierStart(char)
@see     Character#isJavaLetter(char)
@see     Character#isJavaLetterOrDigit(char)
@see     Character#isLetterOrDigit(char)
@see     Character#isLowerCase(char)
@see     Character#isTitleCase(char)
@see     Character#isUnicodeIdentifierStart(char)
@see     Character#isUpperCase(char)

## Character.isLetter(int)

```java
public static boolean isLetter(int codePoint)
```

Determines if the specified character (Unicode code point) is a letter.
<p>
A character is considered to be a letter if its general
category type, provided by {@link Character#getType(int) getType(codePoint)},
is any of the following:
<ul>
<li> {@code UPPERCASE_LETTER}
<li> {@code LOWERCASE_LETTER}
<li> {@code TITLECASE_LETTER}
<li> {@code MODIFIER_LETTER}
<li> {@code OTHER_LETTER}
</ul>

Not all letters have case. Many characters are
letters but are neither uppercase nor lowercase nor titlecase.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is a letter;
         {@code false} otherwise.
@see     Character#isDigit(int)
@see     Character#isJavaIdentifierStart(int)
@see     Character#isLetterOrDigit(int)
@see     Character#isLowerCase(int)
@see     Character#isTitleCase(int)
@see     Character#isUnicodeIdentifierStart(int)
@see     Character#isUpperCase(int)
@since   1.5

## Character.isLetterOrDigit(char)

```java
public static boolean isLetterOrDigit(char ch)
```

Determines if the specified character is a letter or digit.
<p>
A character is considered to be a letter or digit if either
{@code Character.isLetter(char ch)} or
{@code Character.isDigit(char ch)} returns
{@code true} for the character.

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #isLetterOrDigit(int)} method.

@param   ch   the character to be tested.
@return  {@code true} if the character is a letter or digit;
         {@code false} otherwise.
@see     Character#isDigit(char)
@see     Character#isJavaIdentifierPart(char)
@see     Character#isJavaLetter(char)
@see     Character#isJavaLetterOrDigit(char)
@see     Character#isLetter(char)
@see     Character#isUnicodeIdentifierPart(char)
@since   1.0.2

## Character.isLetterOrDigit(int)

```java
public static boolean isLetterOrDigit(int codePoint)
```

Determines if the specified character (Unicode code point) is a letter or digit.
<p>
A character is considered to be a letter or digit if either
{@link #isLetter(int) isLetter(codePoint)} or
{@link #isDigit(int) isDigit(codePoint)} returns
{@code true} for the character.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is a letter or digit;
         {@code false} otherwise.
@see     Character#isDigit(int)
@see     Character#isJavaIdentifierPart(int)
@see     Character#isLetter(int)
@see     Character#isUnicodeIdentifierPart(int)
@since   1.5

## Character.isJavaLetter(char)

```java
public static boolean isJavaLetter(char ch)
```

Determines if the specified character is permissible as the first
character in a Java identifier.
<p>
A character may start a Java identifier if and only if
one of the following conditions is true:
<ul>
<li> {@link #isLetter(char) isLetter(ch)} returns {@code true}
<li> {@link #getType(char) getType(ch)} returns {@code LETTER_NUMBER}
<li> {@code ch} is a currency symbol (such as {@code '$'})
<li> {@code ch} is a connecting punctuation character (such as {@code '_'}).
</ul>

@param   ch the character to be tested.
@return  {@code true} if the character may start a Java
         identifier; {@code false} otherwise.
@see     Character#isJavaLetterOrDigit(char)
@see     Character#isJavaIdentifierStart(char)
@see     Character#isJavaIdentifierPart(char)
@see     Character#isLetter(char)
@see     Character#isLetterOrDigit(char)
@see     Character#isUnicodeIdentifierStart(char)
@since   1.0.2
@deprecated Replaced by isJavaIdentifierStart(char).

## Character.isJavaLetterOrDigit(char)

```java
public static boolean isJavaLetterOrDigit(char ch)
```

Determines if the specified character may be part of a Java
identifier as other than the first character.
<p>
A character may be part of a Java identifier if and only if one
of the following conditions is true:
<ul>
<li>  it is a letter
<li>  it is a currency symbol (such as {@code '$'})
<li>  it is a connecting punctuation character (such as {@code '_'})
<li>  it is a digit
<li>  it is a numeric letter (such as a Roman numeral character)
<li>  it is a combining mark
<li>  it is a non-spacing mark
<li> {@code isIdentifierIgnorable} returns
{@code true} for the character.
</ul>

@param   ch the character to be tested.
@return  {@code true} if the character may be part of a
         Java identifier; {@code false} otherwise.
@see     Character#isJavaLetter(char)
@see     Character#isJavaIdentifierStart(char)
@see     Character#isJavaIdentifierPart(char)
@see     Character#isLetter(char)
@see     Character#isLetterOrDigit(char)
@see     Character#isUnicodeIdentifierPart(char)
@see     Character#isIdentifierIgnorable(char)
@since   1.0.2
@deprecated Replaced by isJavaIdentifierPart(char).

## Character.isAlphabetic(int)

```java
public static boolean isAlphabetic(int codePoint)
```

Determines if the specified character (Unicode code point) is alphabetic.
<p>
A character is considered to be alphabetic if its general category type,
provided by {@link Character#getType(int) getType(codePoint)}, is any of
the following:
<ul>
<li> {@code UPPERCASE_LETTER}
<li> {@code LOWERCASE_LETTER}
<li> {@code TITLECASE_LETTER}
<li> {@code MODIFIER_LETTER}
<li> {@code OTHER_LETTER}
<li> {@code LETTER_NUMBER}
</ul>
or it has contributory property Other_Alphabetic as defined by the
Unicode Standard.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is a Unicode alphabet
         character, {@code false} otherwise.
@since   1.7

## Character.isIdeographic(int)

```java
public static boolean isIdeographic(int codePoint)
```

Determines if the specified character (Unicode code point) is a CJKV
(Chinese, Japanese, Korean and Vietnamese) ideograph, as defined by
the Unicode Standard.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is a Unicode ideograph
         character, {@code false} otherwise.
@since   1.7

## Character.isJavaIdentifierStart(char)

```java
public static boolean isJavaIdentifierStart(char ch)
```

Determines if the specified character is
permissible as the first character in a Java identifier.
<p>
A character may start a Java identifier if and only if
one of the following conditions is true:
<ul>
<li> {@link #isLetter(char) isLetter(ch)} returns {@code true}
<li> {@link #getType(char) getType(ch)} returns {@code LETTER_NUMBER}
<li> {@code ch} is a currency symbol (such as {@code '$'})
<li> {@code ch} is a connecting punctuation character (such as {@code '_'}).
</ul>

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #isJavaIdentifierStart(int)} method.

@param   ch the character to be tested.
@return  {@code true} if the character may start a Java identifier;
         {@code false} otherwise.
@see     Character#isJavaIdentifierPart(char)
@see     Character#isLetter(char)
@see     Character#isUnicodeIdentifierStart(char)
@see     java.compiler/javax.lang.model.SourceVersion#isIdentifier(CharSequence)
@since   1.1

## Character.isJavaIdentifierStart(int)

```java
public static boolean isJavaIdentifierStart(int codePoint)
```

Determines if the character (Unicode code point) is
permissible as the first character in a Java identifier.
<p>
A character may start a Java identifier if and only if
one of the following conditions is true:
<ul>
<li> {@link #isLetter(int) isLetter(codePoint)}
     returns {@code true}
<li> {@link #getType(int) getType(codePoint)}
     returns {@code LETTER_NUMBER}
<li> the referenced character is a currency symbol (such as {@code '$'})
<li> the referenced character is a connecting punctuation character
     (such as {@code '_'}).
</ul>

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character may start a Java identifier;
         {@code false} otherwise.
@see     Character#isJavaIdentifierPart(int)
@see     Character#isLetter(int)
@see     Character#isUnicodeIdentifierStart(int)
@see     java.compiler/javax.lang.model.SourceVersion#isIdentifier(CharSequence)
@since   1.5

## Character.isJavaIdentifierPart(char)

```java
public static boolean isJavaIdentifierPart(char ch)
```

Determines if the specified character may be part of a Java
identifier as other than the first character.
<p>
A character may be part of a Java identifier if any of the following
conditions are true:
<ul>
<li>  it is a letter
<li>  it is a currency symbol (such as {@code '$'})
<li>  it is a connecting punctuation character (such as {@code '_'})
<li>  it is a digit
<li>  it is a numeric letter (such as a Roman numeral character)
<li>  it is a combining mark
<li>  it is a non-spacing mark
<li> {@code isIdentifierIgnorable} returns
{@code true} for the character
</ul>

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #isJavaIdentifierPart(int)} method.

@param   ch      the character to be tested.
@return {@code true} if the character may be part of a
         Java identifier; {@code false} otherwise.
@see     Character#isIdentifierIgnorable(char)
@see     Character#isJavaIdentifierStart(char)
@see     Character#isLetterOrDigit(char)
@see     Character#isUnicodeIdentifierPart(char)
@see     java.compiler/javax.lang.model.SourceVersion#isIdentifier(CharSequence)
@since   1.1

## Character.isJavaIdentifierPart(int)

```java
public static boolean isJavaIdentifierPart(int codePoint)
```

Determines if the character (Unicode code point) may be part of a Java
identifier as other than the first character.
<p>
A character may be part of a Java identifier if any of the following
conditions are true:
<ul>
<li>  it is a letter
<li>  it is a currency symbol (such as {@code '$'})
<li>  it is a connecting punctuation character (such as {@code '_'})
<li>  it is a digit
<li>  it is a numeric letter (such as a Roman numeral character)
<li>  it is a combining mark
<li>  it is a non-spacing mark
<li> {@link #isIdentifierIgnorable(int)
isIdentifierIgnorable(codePoint)} returns {@code true} for
the code point
</ul>

@param   codePoint the character (Unicode code point) to be tested.
@return {@code true} if the character may be part of a
         Java identifier; {@code false} otherwise.
@see     Character#isIdentifierIgnorable(int)
@see     Character#isJavaIdentifierStart(int)
@see     Character#isLetterOrDigit(int)
@see     Character#isUnicodeIdentifierPart(int)
@see     java.compiler/javax.lang.model.SourceVersion#isIdentifier(CharSequence)
@since   1.5

## Character.isUnicodeIdentifierStart(char)

```java
public static boolean isUnicodeIdentifierStart(char ch)
```

Determines if the specified character is permissible as the
first character in a Unicode identifier.
<p>
A character may start a Unicode identifier if and only if
one of the following conditions is true:
<ul>
<li> {@link #isLetter(char) isLetter(ch)} returns {@code true}
<li> {@link #getType(char) getType(ch)} returns
     {@code LETTER_NUMBER}.
<li> it is an <a href="http://www.unicode.org/reports/tr44/#Other_ID_Start">
     {@code Other_ID_Start}</a> character.
</ul>
<p>
This method conforms to <a href="https://unicode.org/reports/tr31/#R1">
UAX31-R1: Default Identifiers</a> requirement of the Unicode Standard,
with the following profile of UAX31:
<pre>
Start := ID_Start + 'VERTICAL TILDE' (U+2E2F)
</pre>
{@code 'VERTICAL TILDE'} is added to {@code Start} for backward
compatibility.

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #isUnicodeIdentifierStart(int)} method.

@param   ch      the character to be tested.
@return  {@code true} if the character may start a Unicode
         identifier; {@code false} otherwise.

@spec https://www.unicode.org/reports/tr44 Unicode Character Database
@spec https://www.unicode.org/reports/tr31 Unicode Identifier and Pattern Syntax
@see     Character#isJavaIdentifierStart(char)
@see     Character#isLetter(char)
@see     Character#isUnicodeIdentifierPart(char)
@since   1.1

## Character.isUnicodeIdentifierStart(int)

```java
public static boolean isUnicodeIdentifierStart(int codePoint)
```

Determines if the specified character (Unicode code point) is permissible as the
first character in a Unicode identifier.
<p>
A character may start a Unicode identifier if and only if
one of the following conditions is true:
<ul>
<li> {@link #isLetter(int) isLetter(codePoint)}
     returns {@code true}
<li> {@link #getType(int) getType(codePoint)}
     returns {@code LETTER_NUMBER}.
<li> it is an <a href="http://www.unicode.org/reports/tr44/#Other_ID_Start">
     {@code Other_ID_Start}</a> character.
</ul>
<p>
This method conforms to <a href="https://unicode.org/reports/tr31/#R1">
UAX31-R1: Default Identifiers</a> requirement of the Unicode Standard,
with the following profile of UAX31:
<pre>
Start := ID_Start + 'VERTICAL TILDE' (U+2E2F)
</pre>
{@code 'VERTICAL TILDE'} is added to {@code Start} for backward
compatibility.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character may start a Unicode
         identifier; {@code false} otherwise.

@spec https://www.unicode.org/reports/tr44 Unicode Character Database
@spec https://www.unicode.org/reports/tr31 Unicode Identifier and Pattern Syntax
@see     Character#isJavaIdentifierStart(int)
@see     Character#isLetter(int)
@see     Character#isUnicodeIdentifierPart(int)
@since   1.5

## Character.isUnicodeIdentifierPart(char)

```java
public static boolean isUnicodeIdentifierPart(char ch)
```

Determines if the specified character may be part of a Unicode
identifier as other than the first character.
<p>
A character may be part of a Unicode identifier if and only if
one of the following statements is true:
<ul>
<li>  it is a letter
<li>  it is a connecting punctuation character (such as {@code '_'})
<li>  it is a digit
<li>  it is a numeric letter (such as a Roman numeral character)
<li>  it is a combining mark
<li>  it is a non-spacing mark
<li> {@code isIdentifierIgnorable} returns
{@code true} for this character.
<li> it is an <a href="http://www.unicode.org/reports/tr44/#Other_ID_Start">
     {@code Other_ID_Start}</a> character.
<li> it is an <a href="http://www.unicode.org/reports/tr44/#Other_ID_Continue">
     {@code Other_ID_Continue}</a> character.
</ul>
<p>
This method conforms to <a href="https://unicode.org/reports/tr31/#R1">
UAX31-R1: Default Identifiers</a> requirement of the Unicode Standard,
with the following profile of UAX31:
<pre>
Continue := Start + ID_Continue + ignorable
Medial := empty
ignorable := isIdentifierIgnorable(char) returns true for the character
</pre>
{@code ignorable} is added to {@code Continue} for backward
compatibility.

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #isUnicodeIdentifierPart(int)} method.

@param   ch      the character to be tested.
@return  {@code true} if the character may be part of a
         Unicode identifier; {@code false} otherwise.

@spec https://www.unicode.org/reports/tr44 Unicode Character Database
@spec https://www.unicode.org/reports/tr31 Unicode Identifier and Pattern Syntax
@see     Character#isIdentifierIgnorable(char)
@see     Character#isJavaIdentifierPart(char)
@see     Character#isLetterOrDigit(char)
@see     Character#isUnicodeIdentifierStart(char)
@since   1.1

## Character.isUnicodeIdentifierPart(int)

```java
public static boolean isUnicodeIdentifierPart(int codePoint)
```

Determines if the specified character (Unicode code point) may be part of a Unicode
identifier as other than the first character.
<p>
A character may be part of a Unicode identifier if and only if
one of the following statements is true:
<ul>
<li>  it is a letter
<li>  it is a connecting punctuation character (such as {@code '_'})
<li>  it is a digit
<li>  it is a numeric letter (such as a Roman numeral character)
<li>  it is a combining mark
<li>  it is a non-spacing mark
<li> {@code isIdentifierIgnorable} returns
{@code true} for this character.
<li> it is an <a href="http://www.unicode.org/reports/tr44/#Other_ID_Start">
     {@code Other_ID_Start}</a> character.
<li> it is an <a href="http://www.unicode.org/reports/tr44/#Other_ID_Continue">
     {@code Other_ID_Continue}</a> character.
</ul>
<p>
This method conforms to <a href="https://unicode.org/reports/tr31/#R1">
UAX31-R1: Default Identifiers</a> requirement of the Unicode Standard,
with the following profile of UAX31:
<pre>
Continue := Start + ID_Continue + ignorable
Medial := empty
ignorable := isIdentifierIgnorable(int) returns true for the character
</pre>
{@code ignorable} is added to {@code Continue} for backward
compatibility.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character may be part of a
         Unicode identifier; {@code false} otherwise.

@spec https://www.unicode.org/reports/tr44 Unicode Character Database
@spec https://www.unicode.org/reports/tr31 Unicode Identifier and Pattern Syntax
@see     Character#isIdentifierIgnorable(int)
@see     Character#isJavaIdentifierPart(int)
@see     Character#isLetterOrDigit(int)
@see     Character#isUnicodeIdentifierStart(int)
@since   1.5

## Character.isIdentifierIgnorable(char)

```java
public static boolean isIdentifierIgnorable(char ch)
```

Determines if the specified character should be regarded as
an ignorable character in a Java identifier or a Unicode identifier.
<p>
The following Unicode characters are ignorable in a Java identifier
or a Unicode identifier:
<ul>
<li>ISO control characters that are not whitespace
<ul>
<li>{@code '\u005Cu0000'} through {@code '\u005Cu0008'}
<li>{@code '\u005Cu000E'} through {@code '\u005Cu001B'}
<li>{@code '\u005Cu007F'} through {@code '\u005Cu009F'}
</ul>

<li>all characters that have the {@code FORMAT} general
category value
</ul>

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #isIdentifierIgnorable(int)} method.

@param   ch      the character to be tested.
@return  {@code true} if the character is an ignorable control
         character that may be part of a Java or Unicode identifier;
          {@code false} otherwise.
@see     Character#isJavaIdentifierPart(char)
@see     Character#isUnicodeIdentifierPart(char)
@since   1.1

## Character.isIdentifierIgnorable(int)

```java
public static boolean isIdentifierIgnorable(int codePoint)
```

Determines if the specified character (Unicode code point) should be regarded as
an ignorable character in a Java identifier or a Unicode identifier.
<p>
The following Unicode characters are ignorable in a Java identifier
or a Unicode identifier:
<ul>
<li>ISO control characters that are not whitespace
<ul>
<li>{@code '\u005Cu0000'} through {@code '\u005Cu0008'}
<li>{@code '\u005Cu000E'} through {@code '\u005Cu001B'}
<li>{@code '\u005Cu007F'} through {@code '\u005Cu009F'}
</ul>

<li>all characters that have the {@code FORMAT} general
category value
</ul>

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is an ignorable control
         character that may be part of a Java or Unicode identifier;
         {@code false} otherwise.
@see     Character#isJavaIdentifierPart(int)
@see     Character#isUnicodeIdentifierPart(int)
@since   1.5

## Character.isEmoji(int)

```java
public static boolean isEmoji(int codePoint)
```

Determines if the specified character (Unicode code point) is an Emoji.
<p>
A character is considered to be an Emoji if and only if it has the {@code Emoji}
property, defined in
<a href="https://unicode.org/reports/tr51/#Emoji_Properties_and_Data_Files">
Unicode Emoji (Technical Standard #51)</a>.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is an Emoji;
         {@code false} otherwise.
@spec https://unicode.org/reports/tr51/ Unicode Emoji
@since   21

## Character.isEmojiPresentation(int)

```java
public static boolean isEmojiPresentation(int codePoint)
```

Determines if the specified character (Unicode code point) has the
Emoji Presentation property by default.
<p>
A character is considered to have the Emoji Presentation property if and
only if it has the {@code Emoji_Presentation} property, defined in
<a href="https://unicode.org/reports/tr51/#Emoji_Properties_and_Data_Files">
Unicode Emoji (Technical Standard #51)</a>.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character has the Emoji Presentation
         property; {@code false} otherwise.
@spec https://unicode.org/reports/tr51/ Unicode Emoji
@since   21

## Character.isEmojiModifier(int)

```java
public static boolean isEmojiModifier(int codePoint)
```

Determines if the specified character (Unicode code point) is an
Emoji Modifier.
<p>
A character is considered to be an Emoji Modifier if and only if it has
the {@code Emoji_Modifier} property, defined in
<a href="https://unicode.org/reports/tr51/#Emoji_Properties_and_Data_Files">
Unicode Emoji (Technical Standard #51)</a>.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is an Emoji Modifier;
         {@code false} otherwise.
@spec https://unicode.org/reports/tr51/ Unicode Emoji
@since   21

## Character.isEmojiModifierBase(int)

```java
public static boolean isEmojiModifierBase(int codePoint)
```

Determines if the specified character (Unicode code point) is an
Emoji Modifier Base.
<p>
A character is considered to be an Emoji Modifier Base if and only if it has
the {@code Emoji_Modifier_Base} property, defined in
<a href="https://unicode.org/reports/tr51/#Emoji_Properties_and_Data_Files">
Unicode Emoji (Technical Standard #51)</a>.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is an Emoji Modifier Base;
         {@code false} otherwise.
@spec https://unicode.org/reports/tr51/ Unicode Emoji
@since   21

## Character.isEmojiComponent(int)

```java
public static boolean isEmojiComponent(int codePoint)
```

Determines if the specified character (Unicode code point) is an
Emoji Component.
<p>
A character is considered to be an Emoji Component if and only if it has
the {@code Emoji_Component} property, defined in
<a href="https://unicode.org/reports/tr51/#Emoji_Properties_and_Data_Files">
Unicode Emoji (Technical Standard #51)</a>.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is an Emoji Component;
         {@code false} otherwise.
@spec https://unicode.org/reports/tr51/ Unicode Emoji
@since   21

## Character.isExtendedPictographic(int)

```java
public static boolean isExtendedPictographic(int codePoint)
```

Determines if the specified character (Unicode code point) is
an Extended Pictographic.
<p>
A character is considered to be an Extended Pictographic if and only if it has
the {@code Extended_Pictographic} property, defined in
<a href="https://unicode.org/reports/tr51/#Emoji_Properties_and_Data_Files">
Unicode Emoji (Technical Standard #51)</a>.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is an Extended Pictographic;
         {@code false} otherwise.
@spec https://unicode.org/reports/tr51/ Unicode Emoji
@since   21

## Character.toLowerCase(char)

```java
public static char toLowerCase(char ch)
```

Converts the character argument to lowercase using case
mapping information from the UnicodeData file.
<p>
Note that
{@code Character.isLowerCase(Character.toLowerCase(ch))}
does not always return {@code true} for some ranges of
characters, particularly those that are symbols or ideographs.

<p>In general, {@link String#toLowerCase()} should be used to map
characters to lowercase. {@code String} case mapping methods
have several benefits over {@code Character} case mapping methods.
{@code String} case mapping methods can perform locale-sensitive
mappings, context-sensitive mappings, and 1:M character mappings, whereas
the {@code Character} case mapping methods cannot.

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #toLowerCase(int)} method.

@param   ch   the character to be converted.
@return  the lowercase equivalent of the character, if any;
         otherwise, the character itself.
@see     Character#isLowerCase(char)
@see     String#toLowerCase()

## Character.toLowerCase(int)

```java
public static int toLowerCase(int codePoint)
```

Converts the character (Unicode code point) argument to
lowercase using case mapping information from the UnicodeData
file.

<p> Note that
{@code Character.isLowerCase(Character.toLowerCase(codePoint))}
does not always return {@code true} for some ranges of
characters, particularly those that are symbols or ideographs.

<p>In general, {@link String#toLowerCase()} should be used to map
characters to lowercase. {@code String} case mapping methods
have several benefits over {@code Character} case mapping methods.
{@code String} case mapping methods can perform locale-sensitive
mappings, context-sensitive mappings, and 1:M character mappings, whereas
the {@code Character} case mapping methods cannot.

@param   codePoint   the character (Unicode code point) to be converted.
@return  the lowercase equivalent of the character (Unicode code
         point), if any; otherwise, the character itself.
@see     Character#isLowerCase(int)
@see     String#toLowerCase()

@since   1.5

## Character.toUpperCase(char)

```java
public static char toUpperCase(char ch)
```

Converts the character argument to uppercase using case mapping
information from the UnicodeData file.
<p>
Note that
{@code Character.isUpperCase(Character.toUpperCase(ch))}
does not always return {@code true} for some ranges of
characters, particularly those that are symbols or ideographs.

<p>In general, {@link String#toUpperCase()} should be used to map
characters to uppercase. {@code String} case mapping methods
have several benefits over {@code Character} case mapping methods.
{@code String} case mapping methods can perform locale-sensitive
mappings, context-sensitive mappings, and 1:M character mappings, whereas
the {@code Character} case mapping methods cannot.

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #toUpperCase(int)} method.

@param   ch   the character to be converted.
@return  the uppercase equivalent of the character, if any;
         otherwise, the character itself.
@see     Character#isUpperCase(char)
@see     String#toUpperCase()

## Character.toUpperCase(int)

```java
public static int toUpperCase(int codePoint)
```

Converts the character (Unicode code point) argument to
uppercase using case mapping information from the UnicodeData
file.

<p>Note that
{@code Character.isUpperCase(Character.toUpperCase(codePoint))}
does not always return {@code true} for some ranges of
characters, particularly those that are symbols or ideographs.

<p>In general, {@link String#toUpperCase()} should be used to map
characters to uppercase. {@code String} case mapping methods
have several benefits over {@code Character} case mapping methods.
{@code String} case mapping methods can perform locale-sensitive
mappings, context-sensitive mappings, and 1:M character mappings, whereas
the {@code Character} case mapping methods cannot.

@param   codePoint   the character (Unicode code point) to be converted.
@return  the uppercase equivalent of the character, if any;
         otherwise, the character itself.
@see     Character#isUpperCase(int)
@see     String#toUpperCase()

@since   1.5

## Character.toTitleCase(char)

```java
public static char toTitleCase(char ch)
```

Converts the character argument to titlecase using case mapping
information from the UnicodeData file. If a character has no
explicit titlecase mapping and is not itself a titlecase char
according to UnicodeData, then the uppercase mapping is
returned as an equivalent titlecase mapping. If the
{@code char} argument is already a titlecase
{@code char}, the same {@code char} value will be
returned.
<p>
Note that
{@code Character.isTitleCase(Character.toTitleCase(ch))}
does not always return {@code true} for some ranges of
characters.

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #toTitleCase(int)} method.

@param   ch   the character to be converted.
@return  the titlecase equivalent of the character, if any;
         otherwise, the character itself.
@see     Character#isTitleCase(char)
@see     Character#toLowerCase(char)
@see     Character#toUpperCase(char)
@since   1.0.2

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

<p>Note that
{@code Character.isTitleCase(Character.toTitleCase(codePoint))}
does not always return {@code true} for some ranges of
characters.

@param   codePoint   the character (Unicode code point) to be converted.
@return  the titlecase equivalent of the character, if any;
         otherwise, the character itself.
@see     Character#isTitleCase(int)
@see     Character#toLowerCase(int)
@see     Character#toUpperCase(int)
@since   1.5

## Character.digit(char, int)

```java
public static int digit(char ch, int radix)
```

Returns the numeric value of the character {@code ch} in the
specified radix.
<p>
If the radix is not in the range {@code MIN_RADIX} &le;
{@code radix} &le; {@code MAX_RADIX} or if the
value of {@code ch} is not a valid digit in the specified
radix, {@code -1} is returned. A character is a valid digit
if at least one of the following is true:
<ul>
<li>The method {@code isDigit} is {@code true} of the character
    and the Unicode decimal digit value of the character (or its
    single-character decomposition) is less than the specified radix.
    In this case the decimal digit value is returned.
<li>The character is one of the uppercase Latin letters
    {@code 'A'} through {@code 'Z'} and its code is less than
    {@code radix + 'A' - 10}.
    In this case, {@code ch - 'A' + 10}
    is returned.
<li>The character is one of the lowercase Latin letters
    {@code 'a'} through {@code 'z'} and its code is less than
    {@code radix + 'a' - 10}.
    In this case, {@code ch - 'a' + 10}
    is returned.
<li>The character is one of the fullwidth uppercase Latin letters A
    ({@code '\u005CuFF21'}) through Z ({@code '\u005CuFF3A'})
    and its code is less than
    {@code radix + '\u005CuFF21' - 10}.
    In this case, {@code ch - '\u005CuFF21' + 10}
    is returned.
<li>The character is one of the fullwidth lowercase Latin letters a
    ({@code '\u005CuFF41'}) through z ({@code '\u005CuFF5A'})
    and its code is less than
    {@code radix + '\u005CuFF41' - 10}.
    In this case, {@code ch - '\u005CuFF41' + 10}
    is returned.
</ul>

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #digit(int, int)} method.

@param   ch      the character to be converted.
@param   radix   the radix.
@return  the numeric value represented by the character in the
         specified radix.
@see     Character#forDigit(int, int)
@see     Character#isDigit(char)

## Character.digit(int, int)

```java
public static int digit(int codePoint, int radix)
```

Returns the numeric value of the specified character (Unicode
code point) in the specified radix.

<p>If the radix is not in the range {@code MIN_RADIX} &le;
{@code radix} &le; {@code MAX_RADIX} or if the
character is not a valid digit in the specified
radix, {@code -1} is returned. A character is a valid digit
if at least one of the following is true:
<ul>
<li>The method {@link #isDigit(int) isDigit(codePoint)} is {@code true} of the character
    and the Unicode decimal digit value of the character (or its
    single-character decomposition) is less than the specified radix.
    In this case the decimal digit value is returned.
<li>The character is one of the uppercase Latin letters
    {@code 'A'} through {@code 'Z'} and its code is less than
    {@code radix + 'A' - 10}.
    In this case, {@code codePoint - 'A' + 10}
    is returned.
<li>The character is one of the lowercase Latin letters
    {@code 'a'} through {@code 'z'} and its code is less than
    {@code radix + 'a' - 10}.
    In this case, {@code codePoint - 'a' + 10}
    is returned.
<li>The character is one of the fullwidth uppercase Latin letters A
    ({@code '\u005CuFF21'}) through Z ({@code '\u005CuFF3A'})
    and its code is less than
    {@code radix + '\u005CuFF21' - 10}.
    In this case,
    {@code codePoint - '\u005CuFF21' + 10}
    is returned.
<li>The character is one of the fullwidth lowercase Latin letters a
    ({@code '\u005CuFF41'}) through z ({@code '\u005CuFF5A'})
    and its code is less than
    {@code radix + '\u005CuFF41'- 10}.
    In this case,
    {@code codePoint - '\u005CuFF41' + 10}
    is returned.
</ul>

@param   codePoint the character (Unicode code point) to be converted.
@param   radix   the radix.
@return  the numeric value represented by the character in the
         specified radix.
@see     Character#forDigit(int, int)
@see     Character#isDigit(int)
@since   1.5

## Character.getNumericValue(char)

```java
public static int getNumericValue(char ch)
```

Returns the {@code int} value that the specified Unicode
character represents. For example, the character
{@code '\u005Cu216C'} (the roman numeral fifty) will return
an int with a value of 50.
<p>
The letters A-Z in their uppercase ({@code '\u005Cu0041'} through
{@code '\u005Cu005A'}), lowercase
({@code '\u005Cu0061'} through {@code '\u005Cu007A'}), and
full width variant ({@code '\u005CuFF21'} through
{@code '\u005CuFF3A'} and {@code '\u005CuFF41'} through
{@code '\u005CuFF5A'}) forms have numeric values from 10
through 35. This is independent of the Unicode specification,
which does not assign numeric values to these {@code char}
values.
<p>
If the character does not have a numeric value, then -1 is returned.
If the character has a numeric value that cannot be represented as a
nonnegative integer (for example, a fractional value), then -2
is returned.

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #getNumericValue(int)} method.

@param   ch      the character to be converted.
@return  the numeric value of the character, as a nonnegative {@code int}
         value; -2 if the character has a numeric value but the value
         can not be represented as a nonnegative {@code int} value;
         -1 if the character has no numeric value.
@see     Character#forDigit(int, int)
@see     Character#isDigit(char)
@since   1.1

## Character.getNumericValue(int)

```java
public static int getNumericValue(int codePoint)
```

Returns the {@code int} value that the specified
character (Unicode code point) represents. For example, the character
{@code '\u005Cu216C'} (the Roman numeral fifty) will return
an {@code int} with a value of 50.
<p>
The letters A-Z in their uppercase ({@code '\u005Cu0041'} through
{@code '\u005Cu005A'}), lowercase
({@code '\u005Cu0061'} through {@code '\u005Cu007A'}), and
full width variant ({@code '\u005CuFF21'} through
{@code '\u005CuFF3A'} and {@code '\u005CuFF41'} through
{@code '\u005CuFF5A'}) forms have numeric values from 10
through 35. This is independent of the Unicode specification,
which does not assign numeric values to these {@code char}
values.
<p>
If the character does not have a numeric value, then -1 is returned.
If the character has a numeric value that cannot be represented as a
nonnegative integer (for example, a fractional value), then -2
is returned.

@param   codePoint the character (Unicode code point) to be converted.
@return  the numeric value of the character, as a nonnegative {@code int}
         value; -2 if the character has a numeric value but the value
         can not be represented as a nonnegative {@code int} value;
         -1 if the character has no numeric value.
@see     Character#forDigit(int, int)
@see     Character#isDigit(int)
@since   1.5

## Character.isSpace(char)

```java
public static boolean isSpace(char ch)
```

Determines if the specified character is ISO-LATIN-1 white space.
This method returns {@code true} for the following five
characters only:
<table class="striped">
<caption style="display:none">truechars</caption>
<thead>
<tr><th scope="col">Character
    <th scope="col">Code
    <th scope="col">Name
</thead>
<tbody>
<tr><th scope="row">{@code '\t'}</th>            <td>{@code U+0009}</td>
    <td>{@code HORIZONTAL TABULATION}</td></tr>
<tr><th scope="row">{@code '\n'}</th>            <td>{@code U+000A}</td>
    <td>{@code NEW LINE}</td></tr>
<tr><th scope="row">{@code '\f'}</th>            <td>{@code U+000C}</td>
    <td>{@code FORM FEED}</td></tr>
<tr><th scope="row">{@code '\r'}</th>            <td>{@code U+000D}</td>
    <td>{@code CARRIAGE RETURN}</td></tr>
<tr><th scope="row">{@code ' '}</th>  <td>{@code U+0020}</td>
    <td>{@code SPACE}</td></tr>
</tbody>
</table>

@param      ch   the character to be tested.
@return     {@code true} if the character is ISO-LATIN-1 white
            space; {@code false} otherwise.
@see        Character#isSpaceChar(char)
@see        Character#isWhitespace(char)
@deprecated Replaced by isWhitespace(char).

## Character.isSpaceChar(char)

```java
public static boolean isSpaceChar(char ch)
```

Determines if the specified character is a Unicode space character.
A character is considered to be a space character if and only if
it is specified to be a space character by the Unicode Standard. This
method returns true if the character's general category type is any of
the following:
<ul>
<li> {@code SPACE_SEPARATOR}
<li> {@code LINE_SEPARATOR}
<li> {@code PARAGRAPH_SEPARATOR}
</ul>

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #isSpaceChar(int)} method.

@param   ch      the character to be tested.
@return  {@code true} if the character is a space character;
         {@code false} otherwise.
@see     Character#isWhitespace(char)
@since   1.1

## Character.isSpaceChar(int)

```java
public static boolean isSpaceChar(int codePoint)
```

Determines if the specified character (Unicode code point) is a
Unicode space character.  A character is considered to be a
space character if and only if it is specified to be a space
character by the Unicode Standard. This method returns true if
the character's general category type is any of the following:

<ul>
<li> {@link #SPACE_SEPARATOR}
<li> {@link #LINE_SEPARATOR}
<li> {@link #PARAGRAPH_SEPARATOR}
</ul>

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is a space character;
         {@code false} otherwise.
@see     Character#isWhitespace(int)
@since   1.5

## Character.isWhitespace(char)

```java
public static boolean isWhitespace(char ch)
```

Determines if the specified character is white space according to Java.
A character is a Java whitespace character if and only if it satisfies
one of the following criteria:
<ul>
<li> It is a Unicode space character ({@code SPACE_SEPARATOR},
     {@code LINE_SEPARATOR}, or {@code PARAGRAPH_SEPARATOR})
     but is not also a non-breaking space ({@code '\u005Cu00A0'},
     {@code '\u005Cu2007'}, {@code '\u005Cu202F'}).
<li> It is {@code '\u005Ct'}, U+0009 HORIZONTAL TABULATION.
<li> It is {@code '\u005Cn'}, U+000A LINE FEED.
<li> It is {@code '\u005Cu000B'}, U+000B VERTICAL TABULATION.
<li> It is {@code '\u005Cf'}, U+000C FORM FEED.
<li> It is {@code '\u005Cr'}, U+000D CARRIAGE RETURN.
<li> It is {@code '\u005Cu001C'}, U+001C FILE SEPARATOR.
<li> It is {@code '\u005Cu001D'}, U+001D GROUP SEPARATOR.
<li> It is {@code '\u005Cu001E'}, U+001E RECORD SEPARATOR.
<li> It is {@code '\u005Cu001F'}, U+001F UNIT SEPARATOR.
</ul>

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #isWhitespace(int)} method.

@param   ch the character to be tested.
@return  {@code true} if the character is a Java whitespace
         character; {@code false} otherwise.
@see     Character#isSpaceChar(char)
@since   1.1

## Character.isWhitespace(int)

```java
public static boolean isWhitespace(int codePoint)
```

Determines if the specified character (Unicode code point) is
white space according to Java.  A character is a Java
whitespace character if and only if it satisfies one of the
following criteria:
<ul>
<li> It is a Unicode space character ({@link #SPACE_SEPARATOR},
     {@link #LINE_SEPARATOR}, or {@link #PARAGRAPH_SEPARATOR})
     but is not also a non-breaking space ({@code '\u005Cu00A0'},
     {@code '\u005Cu2007'}, {@code '\u005Cu202F'}).
<li> It is {@code '\u005Ct'}, U+0009 HORIZONTAL TABULATION.
<li> It is {@code '\u005Cn'}, U+000A LINE FEED.
<li> It is {@code '\u005Cu000B'}, U+000B VERTICAL TABULATION.
<li> It is {@code '\u005Cf'}, U+000C FORM FEED.
<li> It is {@code '\u005Cr'}, U+000D CARRIAGE RETURN.
<li> It is {@code '\u005Cu001C'}, U+001C FILE SEPARATOR.
<li> It is {@code '\u005Cu001D'}, U+001D GROUP SEPARATOR.
<li> It is {@code '\u005Cu001E'}, U+001E RECORD SEPARATOR.
<li> It is {@code '\u005Cu001F'}, U+001F UNIT SEPARATOR.
</ul>

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is a Java whitespace
         character; {@code false} otherwise.
@see     Character#isSpaceChar(int)
@since   1.5

## Character.isISOControl(char)

```java
public static boolean isISOControl(char ch)
```

Determines if the specified character is an ISO control
character.  A character is considered to be an ISO control
character if its code is in the range {@code '\u005Cu0000'}
through {@code '\u005Cu001F'} or in the range
{@code '\u005Cu007F'} through {@code '\u005Cu009F'}.

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #isISOControl(int)} method.

@param   ch      the character to be tested.
@return  {@code true} if the character is an ISO control character;
         {@code false} otherwise.

@see     Character#isSpaceChar(char)
@see     Character#isWhitespace(char)
@since   1.1

## Character.isISOControl(int)

```java
public static boolean isISOControl(int codePoint)
```

Determines if the referenced character (Unicode code point) is an ISO control
character.  A character is considered to be an ISO control
character if its code is in the range {@code '\u005Cu0000'}
through {@code '\u005Cu001F'} or in the range
{@code '\u005Cu007F'} through {@code '\u005Cu009F'}.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is an ISO control character;
         {@code false} otherwise.
@see     Character#isSpaceChar(int)
@see     Character#isWhitespace(int)
@since   1.5

## Character.getType(char)

```java
public static int getType(char ch)
```

Returns a value indicating a character's general category.

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #getType(int)} method.

@param   ch      the character to be tested.
@return  a value of type {@code int} representing the
         character's general category.
@see     Character#COMBINING_SPACING_MARK
@see     Character#CONNECTOR_PUNCTUATION
@see     Character#CONTROL
@see     Character#CURRENCY_SYMBOL
@see     Character#DASH_PUNCTUATION
@see     Character#DECIMAL_DIGIT_NUMBER
@see     Character#ENCLOSING_MARK
@see     Character#END_PUNCTUATION
@see     Character#FINAL_QUOTE_PUNCTUATION
@see     Character#FORMAT
@see     Character#INITIAL_QUOTE_PUNCTUATION
@see     Character#LETTER_NUMBER
@see     Character#LINE_SEPARATOR
@see     Character#LOWERCASE_LETTER
@see     Character#MATH_SYMBOL
@see     Character#MODIFIER_LETTER
@see     Character#MODIFIER_SYMBOL
@see     Character#NON_SPACING_MARK
@see     Character#OTHER_LETTER
@see     Character#OTHER_NUMBER
@see     Character#OTHER_PUNCTUATION
@see     Character#OTHER_SYMBOL
@see     Character#PARAGRAPH_SEPARATOR
@see     Character#PRIVATE_USE
@see     Character#SPACE_SEPARATOR
@see     Character#START_PUNCTUATION
@see     Character#SURROGATE
@see     Character#TITLECASE_LETTER
@see     Character#UNASSIGNED
@see     Character#UPPERCASE_LETTER
@since   1.1

## Character.getType(int)

```java
public static int getType(int codePoint)
```

Returns a value indicating a character's general category.

@param   codePoint the character (Unicode code point) to be tested.
@return  a value of type {@code int} representing the
         character's general category.
@see     Character#COMBINING_SPACING_MARK COMBINING_SPACING_MARK
@see     Character#CONNECTOR_PUNCTUATION CONNECTOR_PUNCTUATION
@see     Character#CONTROL CONTROL
@see     Character#CURRENCY_SYMBOL CURRENCY_SYMBOL
@see     Character#DASH_PUNCTUATION DASH_PUNCTUATION
@see     Character#DECIMAL_DIGIT_NUMBER DECIMAL_DIGIT_NUMBER
@see     Character#ENCLOSING_MARK ENCLOSING_MARK
@see     Character#END_PUNCTUATION END_PUNCTUATION
@see     Character#FINAL_QUOTE_PUNCTUATION FINAL_QUOTE_PUNCTUATION
@see     Character#FORMAT FORMAT
@see     Character#INITIAL_QUOTE_PUNCTUATION INITIAL_QUOTE_PUNCTUATION
@see     Character#LETTER_NUMBER LETTER_NUMBER
@see     Character#LINE_SEPARATOR LINE_SEPARATOR
@see     Character#LOWERCASE_LETTER LOWERCASE_LETTER
@see     Character#MATH_SYMBOL MATH_SYMBOL
@see     Character#MODIFIER_LETTER MODIFIER_LETTER
@see     Character#MODIFIER_SYMBOL MODIFIER_SYMBOL
@see     Character#NON_SPACING_MARK NON_SPACING_MARK
@see     Character#OTHER_LETTER OTHER_LETTER
@see     Character#OTHER_NUMBER OTHER_NUMBER
@see     Character#OTHER_PUNCTUATION OTHER_PUNCTUATION
@see     Character#OTHER_SYMBOL OTHER_SYMBOL
@see     Character#PARAGRAPH_SEPARATOR PARAGRAPH_SEPARATOR
@see     Character#PRIVATE_USE PRIVATE_USE
@see     Character#SPACE_SEPARATOR SPACE_SEPARATOR
@see     Character#START_PUNCTUATION START_PUNCTUATION
@see     Character#SURROGATE SURROGATE
@see     Character#TITLECASE_LETTER TITLECASE_LETTER
@see     Character#UNASSIGNED UNASSIGNED
@see     Character#UPPERCASE_LETTER UPPERCASE_LETTER
@since   1.5

## Character.forDigit(int, int)

```java
public static char forDigit(int digit, int radix)
```

Determines the character representation for a specific digit in
the specified radix. If the value of {@code radix} is not a
valid radix, or the value of {@code digit} is not a valid
digit in the specified radix, the null character
({@code '\u005Cu0000'}) is returned.
<p>
The {@code radix} argument is valid if it is greater than or
equal to {@code MIN_RADIX} and less than or equal to
{@code MAX_RADIX}. The {@code digit} argument is valid if
{@code 0 <= digit < radix}.
<p>
If the digit is less than 10, then
{@code '0' + digit} is returned. Otherwise, the value
{@code 'a' + digit - 10} is returned.

@param   digit   the number to convert to a character.
@param   radix   the radix.
@return  the {@code char} representation of the specified digit
         in the specified radix.
@see     Character#MIN_RADIX
@see     Character#MAX_RADIX
@see     Character#digit(char, int)

## Character.getDirectionality(char)

```java
public static byte getDirectionality(char ch)
```

Returns the Unicode directionality property for the given
character.  Character directionality is used to calculate the
visual ordering of text. The directionality value of undefined
{@code char} values is {@code DIRECTIONALITY_UNDEFINED}.

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #getDirectionality(int)} method.

@param  ch {@code char} for which the directionality property
           is requested.
@return the directionality property of the {@code char} value.

@see Character#DIRECTIONALITY_UNDEFINED
@see Character#DIRECTIONALITY_LEFT_TO_RIGHT
@see Character#DIRECTIONALITY_RIGHT_TO_LEFT
@see Character#DIRECTIONALITY_RIGHT_TO_LEFT_ARABIC
@see Character#DIRECTIONALITY_EUROPEAN_NUMBER
@see Character#DIRECTIONALITY_EUROPEAN_NUMBER_SEPARATOR
@see Character#DIRECTIONALITY_EUROPEAN_NUMBER_TERMINATOR
@see Character#DIRECTIONALITY_ARABIC_NUMBER
@see Character#DIRECTIONALITY_COMMON_NUMBER_SEPARATOR
@see Character#DIRECTIONALITY_NONSPACING_MARK
@see Character#DIRECTIONALITY_BOUNDARY_NEUTRAL
@see Character#DIRECTIONALITY_PARAGRAPH_SEPARATOR
@see Character#DIRECTIONALITY_SEGMENT_SEPARATOR
@see Character#DIRECTIONALITY_WHITESPACE
@see Character#DIRECTIONALITY_OTHER_NEUTRALS
@see Character#DIRECTIONALITY_LEFT_TO_RIGHT_EMBEDDING
@see Character#DIRECTIONALITY_LEFT_TO_RIGHT_OVERRIDE
@see Character#DIRECTIONALITY_RIGHT_TO_LEFT_EMBEDDING
@see Character#DIRECTIONALITY_RIGHT_TO_LEFT_OVERRIDE
@see Character#DIRECTIONALITY_POP_DIRECTIONAL_FORMAT
@see Character#DIRECTIONALITY_LEFT_TO_RIGHT_ISOLATE
@see Character#DIRECTIONALITY_RIGHT_TO_LEFT_ISOLATE
@see Character#DIRECTIONALITY_FIRST_STRONG_ISOLATE
@see Character#DIRECTIONALITY_POP_DIRECTIONAL_ISOLATE
@since 1.4

## Character.getDirectionality(int)

```java
public static byte getDirectionality(int codePoint)
```

Returns the Unicode directionality property for the given
character (Unicode code point).  Character directionality is
used to calculate the visual ordering of text. The
directionality value of undefined character is {@link
#DIRECTIONALITY_UNDEFINED}.

@param   codePoint the character (Unicode code point) for which
         the directionality property is requested.
@return the directionality property of the character.

@see Character#DIRECTIONALITY_UNDEFINED DIRECTIONALITY_UNDEFINED
@see Character#DIRECTIONALITY_LEFT_TO_RIGHT DIRECTIONALITY_LEFT_TO_RIGHT
@see Character#DIRECTIONALITY_RIGHT_TO_LEFT DIRECTIONALITY_RIGHT_TO_LEFT
@see Character#DIRECTIONALITY_RIGHT_TO_LEFT_ARABIC DIRECTIONALITY_RIGHT_TO_LEFT_ARABIC
@see Character#DIRECTIONALITY_EUROPEAN_NUMBER DIRECTIONALITY_EUROPEAN_NUMBER
@see Character#DIRECTIONALITY_EUROPEAN_NUMBER_SEPARATOR DIRECTIONALITY_EUROPEAN_NUMBER_SEPARATOR
@see Character#DIRECTIONALITY_EUROPEAN_NUMBER_TERMINATOR DIRECTIONALITY_EUROPEAN_NUMBER_TERMINATOR
@see Character#DIRECTIONALITY_ARABIC_NUMBER DIRECTIONALITY_ARABIC_NUMBER
@see Character#DIRECTIONALITY_COMMON_NUMBER_SEPARATOR DIRECTIONALITY_COMMON_NUMBER_SEPARATOR
@see Character#DIRECTIONALITY_NONSPACING_MARK DIRECTIONALITY_NONSPACING_MARK
@see Character#DIRECTIONALITY_BOUNDARY_NEUTRAL DIRECTIONALITY_BOUNDARY_NEUTRAL
@see Character#DIRECTIONALITY_PARAGRAPH_SEPARATOR DIRECTIONALITY_PARAGRAPH_SEPARATOR
@see Character#DIRECTIONALITY_SEGMENT_SEPARATOR DIRECTIONALITY_SEGMENT_SEPARATOR
@see Character#DIRECTIONALITY_WHITESPACE DIRECTIONALITY_WHITESPACE
@see Character#DIRECTIONALITY_OTHER_NEUTRALS DIRECTIONALITY_OTHER_NEUTRALS
@see Character#DIRECTIONALITY_LEFT_TO_RIGHT_EMBEDDING DIRECTIONALITY_LEFT_TO_RIGHT_EMBEDDING
@see Character#DIRECTIONALITY_LEFT_TO_RIGHT_OVERRIDE DIRECTIONALITY_LEFT_TO_RIGHT_OVERRIDE
@see Character#DIRECTIONALITY_RIGHT_TO_LEFT_EMBEDDING DIRECTIONALITY_RIGHT_TO_LEFT_EMBEDDING
@see Character#DIRECTIONALITY_RIGHT_TO_LEFT_OVERRIDE DIRECTIONALITY_RIGHT_TO_LEFT_OVERRIDE
@see Character#DIRECTIONALITY_POP_DIRECTIONAL_FORMAT DIRECTIONALITY_POP_DIRECTIONAL_FORMAT
@see Character#DIRECTIONALITY_LEFT_TO_RIGHT_ISOLATE DIRECTIONALITY_LEFT_TO_RIGHT_ISOLATE
@see Character#DIRECTIONALITY_RIGHT_TO_LEFT_ISOLATE DIRECTIONALITY_RIGHT_TO_LEFT_ISOLATE
@see Character#DIRECTIONALITY_FIRST_STRONG_ISOLATE DIRECTIONALITY_FIRST_STRONG_ISOLATE
@see Character#DIRECTIONALITY_POP_DIRECTIONAL_ISOLATE DIRECTIONALITY_POP_DIRECTIONAL_ISOLATE
@since    1.5

## Character.isMirrored(char)

```java
public static boolean isMirrored(char ch)
```

Determines whether the character is mirrored according to the
Unicode specification.  Mirrored characters should have their
glyphs horizontally mirrored when displayed in text that is
right-to-left.  For example, {@code '\u005Cu0028'} LEFT
PARENTHESIS is semantically defined to be an <i>opening
parenthesis</i>.  This will appear as a "(" in text that is
left-to-right but as a ")" in text that is right-to-left.

<p><b>Note:</b> This method cannot handle <a
href="#supplementary"> supplementary characters</a>. To support
all Unicode characters, including supplementary characters, use
the {@link #isMirrored(int)} method.

@param  ch {@code char} for which the mirrored property is requested
@return {@code true} if the char is mirrored, {@code false}
        if the {@code char} is not mirrored or is not defined.
@since 1.4

## Character.isMirrored(int)

```java
public static boolean isMirrored(int codePoint)
```

Determines whether the specified character (Unicode code point)
is mirrored according to the Unicode specification.  Mirrored
characters should have their glyphs horizontally mirrored when
displayed in text that is right-to-left.  For example,
{@code '\u005Cu0028'} LEFT PARENTHESIS is semantically
defined to be an <i>opening parenthesis</i>.  This will appear
as a "(" in text that is left-to-right but as a ")" in text
that is right-to-left.

@param   codePoint the character (Unicode code point) to be tested.
@return  {@code true} if the character is mirrored, {@code false}
         if the character is not mirrored or is not defined.
@since   1.5

## Character.compareTo(Character)

```java
public int compareTo(Character anotherCharacter)
```

Compares two {@code Character} objects numerically.

@param   anotherCharacter   the {@code Character} to be compared.
@return  the value {@code 0} if the argument {@code Character}
         is equal to this {@code Character}; a value less than
         {@code 0} if this {@code Character} is numerically less
         than the {@code Character} argument; and a value greater than
         {@code 0} if this {@code Character} is numerically greater
         than the {@code Character} argument (unsigned comparison).
         Note that this is strictly a numerical comparison; it is not
         locale-dependent.
@since   1.2

## Character.compare(char, char)

```java
public static int compare(char x, char y)
```

Compares two {@code char} values numerically.
The value returned is identical to what would be returned by:
<pre>
   Character.valueOf(x).compareTo(Character.valueOf(y))
</pre>

@param  x the first {@code char} to compare
@param  y the second {@code char} to compare
@return the value {@code 0} if {@code x == y};
        a value less than {@code 0} if {@code x < y}; and
        a value greater than {@code 0} if {@code x > y}
@since 1.7

## Character.SIZE

```java
public static final int SIZE
```

The number of bits used to represent a {@code char} value in unsigned
binary form, constant {@code 16}.

@since 1.5

## Character.BYTES

```java
public static final int BYTES
```

The number of bytes used to represent a {@code char} value in unsigned
binary form.

@since 1.8

## Character.reverseBytes(char)

```java
public static char reverseBytes(char ch)
```

Returns the value obtained by reversing the order of the bytes in the
specified {@code char} value.

@param ch The {@code char} of which to reverse the byte order.
@return the value obtained by reversing (or, equivalently, swapping)
    the bytes in the specified {@code char} value.
@since 1.5

## Character.getName(int)

```java
public static String getName(int codePoint)
```

Returns the name of the specified character
{@code codePoint}, or null if the code point is
{@link #UNASSIGNED unassigned}.
<p>
If the specified character is not assigned a name by
the <i>UnicodeData</i> file (part of the Unicode Character
Database maintained by the Unicode Consortium), the returned
name is the same as the result of the expression:

<blockquote>{@code
    Character.UnicodeBlock.of(codePoint).toString().replace('_', ' ')
    + " "
    + Integer.toHexString(codePoint).toUpperCase(Locale.ROOT);

}</blockquote>

For the {@code codePoint}s in the <i>UnicodeData</i> file, the name
returned by this method follows the naming scheme in the
"Unicode Name Property" section of the Unicode Standard. For other
code points, such as Hangul/Ideographs, The name generation rule above
differs from the one defined in the Unicode Standard.

@param  codePoint the character (Unicode code point)

@return the name of the specified character, or null if
        the code point is unassigned.

@throws IllegalArgumentException if the specified
           {@code codePoint} is not a valid Unicode
           code point.

@since 1.7

## Character.codePointOf(String)

```java
public static int codePointOf(String name)
```

Returns the code point value of the Unicode character specified by
the given character name.
<p>
If a character is not assigned a name by the <i>UnicodeData</i>
file (part of the Unicode Character Database maintained by the Unicode
Consortium), its name is defined as the result of the expression:

<blockquote>{@code
    Character.UnicodeBlock.of(codePoint).toString().replace('_', ' ')
    + " "
    + Integer.toHexString(codePoint).toUpperCase(Locale.ROOT);

}</blockquote>
<p>
The {@code name} matching is case insensitive, with any leading and
trailing whitespace character removed.

For the code points in the <i>UnicodeData</i> file, this method
recognizes the name which conforms to the name defined in the
"Unicode Name Property" section in the Unicode Standard. For other
code points, this method recognizes the name generated with
{@link #getName(int)} method.

@param  name the character name

@return the code point value of the character specified by its name.

@throws IllegalArgumentException if the specified {@code name}
        is not a valid character name.
@throws NullPointerException if {@code name} is {@code null}

@since 9