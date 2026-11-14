---
title: "CharUnicodeInfo class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/CharUnicodeInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CharUnicodeInfo class (part 2 of 2)

## CharUnicodeInfo.GetUnicodeCategory(Int32) method

```csharp
public static System.Globalization.UnicodeCategory GetUnicodeCategory (int codePoint);
```

Gets the Unicode category of the specified character.

Parameters:

- `codePoint`: A number representing the 32-bit code point value of the Unicode character.

Returns: A `UnicodeCategory` value indicating the category of the specified character.

To be added.

## CharUnicodeInfo.GetUnicodeCategory(String, Int32) method

```csharp
public static System.Globalization.UnicodeCategory GetUnicodeCategory (string s, int index);
```

Gets the Unicode category of the character at the specified index of the specified string.

Parameters:

- `s`: The `String` containing the Unicode character for which to get the Unicode category.
- `index`: The index of the Unicode character for which to get the Unicode category.

Returns: A `UnicodeCategory` value indicating the category of the character at the specified index of the specified string.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes in `s`.

#### Remarks
The Unicode characters are divided into categories. A character's category is one of its properties. For example, a character might be an uppercase letter, a lowercase letter, a decimal digit number, a letter number, a connector punctuation, a math symbol, or a currency symbol. The `UnicodeCategory` enumeration defines the category of a Unicode character. For more information on Unicode characters, see the Unicode Standard.

If the `Char` object at position `index` is the first character of a valid surrogate pair, the `GetUnicodeCategory` method returns the Unicode category of the surrogate pair instead of returning `Surrogate`. For example, the Ugaritic alphabet occupies code points U+10380 to U+1039F. The following example uses the `Char.ConvertFromUtf32` method to instantiate a string that represents UGARITIC LETTER ALPA (U+10380), which is the first letter of the Ugaritic alphabet. As the output from the example shows, the `GetUnicodeCategory` method returns `OtherLetter` if it is passed the high surrogate of this character, which indicates that it considers the surrogate pair. However, if it is passed the low surrogate, it considers only the low surrogate in isolation and returns `Surrogate`.

_Code sample not included: ~/snippets/csharp/System.Globalization/CharUnicodeInfo/GetUnicodeCategory/getunicodecategory1.cs._

Note that `CharUnicodeInfo.GetUnicodeCategory` method does not always return the same `UnicodeCategory` value as the `Char.GetUnicodeCategory` method when passed a particular character as a parameter. The `CharUnicodeInfo.GetUnicodeCategory` method is designed to reflect the current version of the Unicode standard. In contrast, although the `Char.GetUnicodeCategory` method usually reflects the current version of the Unicode standard, it might return a character's category based on a previous version of the standard, or it might return a category that differs from the current standard to preserve backward compatibility.

#### Examples
The following code example shows the values returned by each method for different types of characters.

_Code sample not included: ~/snippets/csharp/System.Globalization/CharUnicodeInfo/GetDecimalDigitValue/charunicodeinfo_string.cs._
