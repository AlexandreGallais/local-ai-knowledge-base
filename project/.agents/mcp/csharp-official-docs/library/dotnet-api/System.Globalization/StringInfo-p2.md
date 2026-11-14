---
title: "StringInfo class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/StringInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringInfo class (part 2 of 2)

## StringInfo.GetTextElementEnumerator(String, Int32) method

```csharp
public static System.Globalization.TextElementEnumerator GetTextElementEnumerator (string str, int index);
```

Returns an enumerator that iterates through the text elements of the string, starting at the specified index.

Parameters:

- `str`: The string to iterate through.
- `index`: The zero-based index at which to start iterating.

Returns: A `TextElementEnumerator` for the string starting at `index`.

Exceptions:

- `ArgumentNullException`: `str` is `null`.
- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes for `str`.

#### Remarks
.NET defines a text element as a unit of text that is displayed as a single character, that is, a grapheme. A text element can be a base character, a surrogate pair, or a combining character sequence. The Unicode Standard defines a surrogate pair as a coded character representation for a single abstract character that consists of a sequence of two code units, where the first unit of the pair is a high surrogate and the second is a low surrogate. The Unicode Standard defines a combining character sequence as a combination of a base character and one or more combining characters. A surrogate pair can represent a base character or a combining character.

The text element enumerator is used only to read data in the string; it cannot modify the underlying string. The enumerator does not have exclusive access to the string.

The enumerator is in an invalid state if it is positioned before the first text element in the string or after the last text element in the string. When the enumerator is in an invalid state, calling `TextElementEnumerator.Current` throws an exception.

Initially, the enumerator is positioned before the first text element in the string. `TextElementEnumerator.Reset` also brings the enumerator back to this position. Therefore, after an enumerator is created or after `TextElementEnumerator.Reset` is called, `TextElementEnumerator.MoveNext` must be called to advance the enumerator to the first text element of the string before reading the value of `TextElementEnumerator.Current`.

`TextElementEnumerator.Current` returns the same object until either `TextElementEnumerator.MoveNext` or `TextElementEnumerator.Reset` is called.

After the end of the string is passed, the enumerator is again in an invalid state and calling `TextElementEnumerator.MoveNext` returns `false`. Calling `TextElementEnumerator.Current` throws an exception if the last call to `TextElementEnumerator.MoveNext` returned `false`.

## StringInfo.ParseCombiningCharacters(String) method

```csharp
public static int[] ParseCombiningCharacters (string str);
```

Returns the indexes of each base character, high surrogate, or control character within the specified string.

Parameters:

- `str`: The string to search.

Returns: An array of integers that contains the zero-based indexes of each base character, high surrogate, or control character within the specified string.

Exceptions:

- `ArgumentNullException`: `str` is `null`.

#### Remarks
The Unicode Standard defines a surrogate pair as a coded character representation for a single abstract character that consists of a sequence of two code units, where the first unit of the pair is a high surrogate and the second is a low surrogate. A high surrogate is a Unicode code point in the range U+D800 through U+DBFF and a low surrogate is a Unicode code point in the range U+DC00 through U+DFFF.

A control character is a character for which the Unicode value is U+007F or in the range U+0000 through U+001F or U+0080 through U+009F.

.NET defines a text element as a unit of text that is displayed as a single character, that is, a grapheme. A text element can be a base character, a surrogate pair, or a combining character sequence. The Unicode Standard defines a combining character sequence as a combination of a base character and one or more combining characters. A surrogate pair can represent a base character or a combining character.

If a combining character sequence is invalid, every combining character in that sequence is also returned.

Each index in the resulting array is the beginning of a text element, that is, the index of the base character or the high surrogate.

The length of each element is easily computed as the difference between successive indexes. The length of the array will always be less than or equal to the length of the string. For example, given the string "\u4f00\u302a\ud800\udc00\u4f01", this method returns the indexes 0, 2, and 4.

#### Equivalent members

The `StringInfo.SubstringByTextElements` method and `LengthInTextElements` property provide an easy to use implementation of the functionality offered by the `StringInfo.ParseCombiningCharacters` method.

#### Examples
The following example demonstrates calling the `StringInfo.ParseCombiningCharacters` method. This code example is part of a larger example provided for the `StringInfo` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/StringInfo/Overview/StringInfo.cs._

## StringInfo.SubstringByTextElements(Int32) method

```csharp
public string SubstringByTextElements (int startingTextElement);
```

Retrieves a substring of text elements from the current `StringInfo` object starting from a specified text element and continuing through the last text element.

Parameters:

- `startingTextElement`: The zero-based index of a text element in this `StringInfo` object.

Returns: A substring of text elements in this `StringInfo` object, starting from the text element index specified by the `startingTextElement` parameter and continuing through the last text element in this object.

Exceptions:

- `ArgumentOutOfRangeException`: `startingTextElement` is less than zero.

-or-

The string that is the value of the current `StringInfo` object is the empty string ("").

#### Remarks
Consider a string that consists of five text elements, indexed from 0 through 4. If the `startingTextElement` parameter is 1, the  `StringInfo.SubstringByTextElements` method returns a substring that consists of the text elements for which the indexes are 1, 2, 3, and 4.

## StringInfo.SubstringByTextElements(Int32, Int32) method

```csharp
public string SubstringByTextElements (int startingTextElement, int lengthInTextElements);
```

Retrieves a substring of text elements from the current `StringInfo` object starting from a specified text element and continuing through the specified number of text elements.

Parameters:

- `startingTextElement`: The zero-based index of a text element in this `StringInfo` object.
- `lengthInTextElements`: The number of text elements to retrieve.

Returns: A substring of text elements in this `StringInfo` object. The substring consists of the number of text elements specified by the `lengthInTextElements` parameter and starts from the text element index specified by the `startingTextElement` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `startingTextElement` is less than zero.

-or-

`startingTextElement` is greater than or equal to the length of the string that is the value of the current `StringInfo` object.

-or-

`lengthInTextElements` is less than zero.

-or-

The string that is the value of the current `StringInfo` object is the empty string ("").

-or-

`startingTextElement` + `lengthInTextElements` specify an index that is greater than the number of text elements in this `StringInfo` object.

#### Remarks
Consider a string that consists of five text elements, indexed from 0 through 4. If the `startingTextElement` parameter is 1 and the `lengthInTextElements` parameter is 3, the `StringInfo.SubstringByTextElements` method returns a substring that consists of the text elements for which the indexes are 1, 2, and 3.
