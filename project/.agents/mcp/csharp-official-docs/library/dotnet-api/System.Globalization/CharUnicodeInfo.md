---
title: "CharUnicodeInfo class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CharUnicodeInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CharUnicodeInfo class

Namespace: `System.Globalization`

```csharp
public static class CharUnicodeInfo
```

Retrieves information about a Unicode character. This class cannot be inherited.

#### Remarks

The Unicode Standard defines a number of Unicode character categories. For example, a character might be categorized as an uppercase letter, a lowercase letter, a decimal digit number, a letter number, a paragraph separator, a math symbol, or a currency symbol. Your application can use the character category to govern string-based operations, such as parsing or extracting substring with regular expressions. The `UnicodeCategory` enumeration defines the possible character categories.

Use the `CharUnicodeInfo` class to obtain the `UnicodeCategory` value for a specific character. The `CharUnicodeInfo` class defines methods that return the following Unicode character values:

- The specific category to which a character or surrogate pair belongs. The value returned is a member of the `UnicodeCategory` enumeration.
- Numeric value. Applies only to numeric characters, including fractions, subscripts, superscripts, Roman numerals, currency numerators, encircled numbers, and script-specific digits.
- Digit value. Applies to numeric characters that can be combined with other numeric characters to represent a whole number in a numbering system.
- Decimal digit value. Applies only to characters that represent decimal digits in the decimal (base 10) system. A decimal digit can be one of ten digits, from zero through nine. These characters are members of the `DecimalDigitNumber` category.

In addition, the `CharUnicodeInfo` class is used internally by a number of other .NET types and methods that rely on character classification. These include:

- The `StringInfo` class, which works with textual elements instead of single characters in a string.
- The overloads of the `Char.GetUnicodeCategory` method, which determine the category to which a character or surrogate pair belongs.
- The character classes recognized by `Regex`, .NET's regular expression engine.

When using this class in your applications, keep in mind the following programming considerations for using the `Char` type. The type can be difficult to use, and strings are generally preferable for representing linguistic content.

- A `Char` object does not always correspond to a single character. Although the `Char` type represents a single 16-bit value, some characters (such as grapheme clusters and surrogate pairs) consist of two or more UTF-16 code units. For more information, see "Char Objects and Unicode Characters" in the `String` class.
- The notion of a "character" is also flexible. A character is often thought of as a glyph, but many glyphs require multiple code points. For example, ä can be represented either by two code points ("a" plus U+0308, which is the combining diaeresis), or by a single code point ("ä" or U+00A4). Some languages have many letters, characters, and glyphs that require multiple code points, which can cause confusion in linguistic content representation. For example, there is a ΰ (U+03B0, Greek small letter upsilon with dialytika and tonos), but there is no equivalent capital letter. Uppercasing such a value simply retrieves the original value.

#### Examples
The following code example shows the values returned by each method for different types of characters.

_Code sample not included: ~/snippets/csharp/System.Globalization/CharUnicodeInfo/Overview/charunicodeinfo_char.cs._

## CharUnicodeInfo.GetDecimalDigitValue(Char) method

```csharp
public static int GetDecimalDigitValue (char ch);
```

Gets the decimal digit value of the specified numeric character.

Parameters:

- `ch`: The Unicode character for which to get the decimal digit value.

Returns: The decimal digit value of the specified numeric character.

-or-

-1, if the specified character is not a decimal digit.

#### Remarks
This method converts characters that represent decimal digits to their equivalent integral values. Decimal digits are characters in the `DecimalDigitNumber` category that can represent one of ten digits in the decimal (base 10) numbering system, from zero through nine. It includes characters such as U+0030 (DIGIT ZERO) through U+0039 (DIGIT NINE), U+0660 (ARABIC-INDIC DIGIT ZERO) through U+0669 (ARABIC-INDIC DIGIT NINE), U+07C0 (NKO DIGIT ZERO) through U+07C9 (NKO DIGIT NINE), and U+1040 (MYANMAR DIGIT ZERO) through U+1049 (MYANMAR DIGIT NINE).

For more information about Unicode characters, see the Unicode Standard.

#### Examples
The following code example shows the values returned by each method for different types of characters.

_Code sample not included: ~/snippets/csharp/System.Globalization/CharUnicodeInfo/Overview/charunicodeinfo_char.cs._

## CharUnicodeInfo.GetDecimalDigitValue(String, Int32) method

```csharp
public static int GetDecimalDigitValue (string s, int index);
```

Gets the decimal digit value of the numeric character at the specified index of the specified string.

Parameters:

- `s`: The `String` containing the Unicode character for which to get the decimal digit value.
- `index`: The index of the Unicode character for which to get the decimal digit value.

Returns: The decimal digit value of the numeric character at the specified index of the specified string.

-or-

-1, if the character at the specified index of the specified string is not a decimal digit.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes in `s`.

#### Remarks
This method converts characters that represent decimal digits to their equivalent integral values. Decimal digits are characters in the `DecimalDigitNumber` category that can represent one of ten digits in the decimal (base 10) numbering system, from zero through nine. It includes characters such as U+0030 (DIGIT ZERO) through U+0039 (DIGIT NINE), U+0660 (ARABIC-INDIC DIGIT ZERO) through U+0669 (ARABIC-INDIC DIGIT NINE), U+07C0 (NKO DIGIT ZERO) through U+07C9 (NKO DIGIT NINE), and U+1040 (MYANMAR DIGIT ZERO) through U+1049 (MYANMAR DIGIT NINE).

For more information about Unicode characters, see the Unicode Standard.

#### Examples
The following code example shows the values returned by each method for different types of characters.

_Code sample not included: ~/snippets/csharp/System.Globalization/CharUnicodeInfo/GetDecimalDigitValue/charunicodeinfo_string.cs._

## CharUnicodeInfo.GetDigitValue(Char) method

```csharp
public static int GetDigitValue (char ch);
```

Gets the digit value of the specified numeric character.

Parameters:

- `ch`: The Unicode character for which to get the digit value.

Returns: The digit value of the specified numeric character.

-or-

-1, if the specified character is not a digit.

#### Remarks
Digit value is a property that applies only to numeric characters that can be used as digits. A digit is a numeric character that can be combined with other digits to represent a whole number in a numbering system.

For more information on Unicode characters, see the Unicode Standard.

#### Examples
The following code example shows the values returned by each method for different types of characters.

_Code sample not included: ~/snippets/csharp/System.Globalization/CharUnicodeInfo/Overview/charunicodeinfo_char.cs._

## CharUnicodeInfo.GetDigitValue(String, Int32) method

```csharp
public static int GetDigitValue (string s, int index);
```

Gets the digit value of the numeric character at the specified index of the specified string.

Parameters:

- `s`: The `String` containing the Unicode character for which to get the digit value.
- `index`: The index of the Unicode character for which to get the digit value.

Returns: The digit value of the numeric character at the specified index of the specified string.

-or-

-1, if the character at the specified index of the specified string is not a digit.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes in `s`.

#### Remarks
Digit value is a property that applies only to numeric characters that can be used as digits. A digit is a numeric character that can be combined with other digits to represent a whole number in a numbering system.

For more information on Unicode characters, see the Unicode Standard.

#### Examples
The following code example shows the values returned by each method for different types of characters.

_Code sample not included: ~/snippets/csharp/System.Globalization/CharUnicodeInfo/GetDecimalDigitValue/charunicodeinfo_string.cs._

## CharUnicodeInfo.GetNumericValue(Char) method

```csharp
public static double GetNumericValue (char ch);
```

Gets the numeric value associated with the specified character.

Parameters:

- `ch`: The Unicode character for which to get the numeric value.

Returns: The numeric value associated with the specified character.

-or-

-1, if the specified character is not a numeric character.

#### Remarks
Numeric value is a Unicode character property that applies only to numeric characters, which include fractions, subscripts, superscripts, Roman numerals, currency numerators, encircled numbers, and script-specific digits. For more information on Unicode characters, see the Unicode Standard.

The `GetNumericValue` method assumes that `ch` corresponds to a single linguistic character and checks whether that character can be converted to a decimal digit. However, some numbers in the Unicode standard are represented by two `Char` objects that form a surrogate pair. For example, the Aegean numbering system consists of code points U+10107 through U+10133. The following example uses the `Char.ConvertFromUtf32` method to instantiate a string that represents AEGEAN NUMBER ONE. As the output from the example shows, the `GetNumericValue` method returns -1 if it is passed either a high surrogate or a low surrogate of this character.

_Code sample not included: ~/snippets/csharp/System.Globalization/CharUnicodeInfo/GetNumericValue/getnumericvalue1.cs._

#### Examples
The following code example shows the values returned by each method for different types of characters.

_Code sample not included: ~/snippets/csharp/System.Globalization/CharUnicodeInfo/Overview/charunicodeinfo_char.cs._

## CharUnicodeInfo.GetNumericValue(String, Int32) method

```csharp
public static double GetNumericValue (string s, int index);
```

Gets the numeric value associated with the character at the specified index of the specified string.

Parameters:

- `s`: The `String` containing the Unicode character for which to get the numeric value.
- `index`: The index of the Unicode character for which to get the numeric value.

Returns: The numeric value associated with the character at the specified index of the specified string.

-or-

-1, if the character at the specified index of the specified string is not a numeric character.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes in `s`.

#### Remarks
Numeric value is a Unicode character property that applies only to numeric characters, which include fractions, subscripts, superscripts, Roman numerals, currency numerators, encircled numbers, and script-specific digits. For more information on Unicode characters, see the Unicode Standard.

If the `Char` object at position `index` is the first character of a valid surrogate pair, the `GetNumericValue` method determines whether the surrogate pair forms a numeric digit, and, if it does, returns its numeric value. For example, the Aegean numbering system consists of code points U+10107 through U+10133. The following example uses the `Char.ConvertFromUtf32` method to instantiate a string that represents each Aegean number. As the output from the example shows, the `GetNumericValue` method returns the correct numeric value if it is passed the high surrogate of an Aegean number. However, if it is passed the low surrogate, it considers only the low surrogate in isolation and returns -1.

_Code sample not included: ~/snippets/csharp/System.Globalization/CharUnicodeInfo/GetNumericValue/getnumericvalue1.cs._

#### Examples
The following code example shows the values returned by each method for different types of characters.

_Code sample not included: ~/snippets/csharp/System.Globalization/CharUnicodeInfo/GetDecimalDigitValue/charunicodeinfo_string.cs._

## CharUnicodeInfo.GetUnicodeCategory(Char) method

```csharp
public static System.Globalization.UnicodeCategory GetUnicodeCategory (char ch);
```

Gets the Unicode category of the specified character.

Parameters:

- `ch`: The Unicode character for which to get the Unicode category.

Returns: A `UnicodeCategory` value indicating the category of the specified character.

#### Remarks
The Unicode characters are divided into categories. A character's category is one of its properties. For example, a character might be an uppercase letter, a lowercase letter, a decimal digit number, a letter number, a connector punctuation, a math symbol, or a currency symbol. The `UnicodeCategory` enumeration defines the category of a Unicode character. For more information on Unicode characters, see the Unicode Standard.

The `CharUnicodeInfo.GetUnicodeCategory` method assumes that `ch` corresponds to a single linguistic character and returns its category. This means that, for surrogate pairs, it returns `Surrogate` instead of the category to which the surrogate belongs. For example, the Ugaritic alphabet occupies code points U+10380 to U+1039F. The following example uses the `Char.ConvertFromUtf32` method to instantiate a string that represents UGARITIC LETTER ALPA (U+10380), which is the first letter of the Ugaritic alphabet. As the output from the example shows, the `IsNumber` method returns `false` if it is passed either the high surrogate or the low surrogate of this character.

_Code sample not included: ~/snippets/csharp/System.Globalization/CharUnicodeInfo/GetUnicodeCategory/getunicodecategory1.cs._

Note that `CharUnicodeInfo.GetUnicodeCategory` does not always return the same `UnicodeCategory` value as the `Char.GetUnicodeCategory` method when passed a particular character as a parameter. The `CharUnicodeInfo.GetUnicodeCategory` method is designed to reflect the current version of the Unicode standard. In contrast, although the `Char.GetUnicodeCategory` method usually reflects the current version of the Unicode standard, it might return a character's category based on a previous version of the standard, or it might return a category that differs from the current standard to preserve backward compatibility.

#### Examples
The following code example shows the values returned by each method for different types of characters.

_Code sample not included: ~/snippets/csharp/System.Globalization/CharUnicodeInfo/Overview/charunicodeinfo_char.cs._
