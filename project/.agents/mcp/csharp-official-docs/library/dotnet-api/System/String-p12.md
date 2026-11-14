---
title: "String class (part 12 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 12 of 26)

## String.IndexOf(String) method

```csharp
public int IndexOf (string value);
```

Reports the zero-based index of the first occurrence of the specified string in this instance.

Parameters:

- `value`: The string to seek.

Returns: The zero-based index position of `value` if that string is found, or -1 if it is not. If `value` is `String.Empty`, the return value is 0.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Remarks
Index numbering starts from zero.

This method performs a word (case-sensitive and culture-sensitive) search using the current culture. The search begins at the first character position of this instance and continues until the last character position.

Character sets include ignorable characters, which are characters that aren't considered when performing a linguistic or culture-sensitive comparison. In a culture-sensitive search, if `value` contains an ignorable character, the result is equivalent to searching with that character removed. If `value` consists only of one or more ignorable characters, the `IndexOf` method always returns 0 (zero) to indicate that the match is found at the beginning of the current instance. In the following example, the `IndexOf` method is used to find three substrings (a soft hyphen (U+00AD), a soft hyphen followed by "n", and a soft hyphen followed by "m") in two strings. Only one of the strings contains a soft hyphen. Because the soft hyphen is an ignorable character, the result is the same as if the soft hyphen had not been included in `value`. When searching for a soft hyphen only, the method returns 0 (zero) to indicate that it has found a match at the beginning of the string.

_Code sample not included: ~/snippets/csharp/System/String/IndexOf/ignorable21.cs._

#### Examples

The following example searches for the "n" in "animal". Because string indexes begin at zero rather than one, the `IndexOf` method indicates that the "n" is at position 1.

_Code sample not included: ~/snippets/csharp/System/String/IndexOf/simple1.cs._

The following example uses the `String.IndexOf` method to determine the starting position of an animal name in a sentence. It then uses this position to insert an adjective that describes the animal into the sentence.

_Code sample not included: ~/snippets/csharp/System/String/IndexOf/stringinsert.cs._

## String.IndexOf(Rune) method

```csharp
public int IndexOf (System.Text.Rune value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## String.IndexOf(Char, Int32) method

```csharp
public int IndexOf (char value, int startIndex);
```

Reports the zero-based index of the first occurrence of the specified Unicode character in this string. The search starts at a specified character position.

Parameters:

- `value`: A Unicode character to seek.
- `startIndex`: The search starting position.

Returns: The zero-based index position of `value` from the start of the string if that character is found, or -1 if it is not.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` is less than 0 (zero) or greater than the length of the string.

#### Remarks
Index numbering starts from 0. The `startIndex` parameter can range from 0 to the length of the string instance. If `startIndex` equals the length of the string instance, the method returns -1.

The search ranges from `startIndex` to the end of the string.

This method performs an ordinal (culture-insensitive) search, where a character is considered equivalent to another character only if their Unicode scalar values are the same. To perform a culture-sensitive search, use the `CompareInfo.IndexOf` method, where a Unicode scalar value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture.

#### Examples
The following example demonstrates the `String.IndexOf` method.

_Code sample not included: ~/snippets/csharp/System/String/IndexOf/ixof1.cs._

## String.IndexOf(Char, StringComparison) method

```csharp
public int IndexOf (char value, StringComparison comparisonType);
```

Reports the zero-based index of the first occurrence of the specified Unicode character in this string. A parameter specifies the type of search to use for the specified character.

Parameters:

- `value`: The character to seek.
- `comparisonType`: An enumeration value that specifies the rules for the search.

Returns: The zero-based index of `value` if that character is found, or -1 if it is not.

Exceptions:

- `ArgumentException`: `comparisonType` is not a valid `StringComparison` value.

#### Remarks

Index numbering starts from zero.

The `comparisonType` parameter is a `StringComparison` enumeration member that specifies whether the search for the `value` argument uses the current or invariant culture, is case-sensitive or case-insensitive, or uses word or ordinal comparison rules.

## String.IndexOf(String, Int32) method

```csharp
public int IndexOf (string value, int startIndex);
```

Reports the zero-based index of the first occurrence of the specified string in this instance. The search starts at a specified character position.

Parameters:

- `value`: The string to seek.
- `startIndex`: The search starting position.

Returns: The zero-based index position of `value` from the start of the current instance if that string is found, or -1 if it is not. If `value` is `String.Empty`, the return value is `startIndex`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than 0 (zero) or greater than the length of this string.

#### Remarks
Index numbering starts from 0. The `startIndex` parameter can range from 0 to the length of the string instance. If `startIndex` equals the length of the string instance, the method returns -1.

This method performs a word (case-sensitive and culture-sensitive) search using the current culture. The search begins at the `startIndex` character position of this instance and continues until the last character position.

Character sets include ignorable characters, which are characters that are not considered when performing a linguistic or culture-sensitive comparison. In a culture-sensitive search, if `value` contains an ignorable character, the result is equivalent to searching with that character removed. If `value` consists only of one or more ignorable characters, the `IndexOf` method always returns `startIndex`, which is the character position at which the search begins. In the following example, the `IndexOf` method is used to find the position of a soft hyphen (U+00AD) followed by an "m" in two strings. Only one of the strings contains the required substring. Because the soft hyphen is an ignorable character, the method returns the index of "m" in the string. Note that in the case of the first string, which includes the soft hyphen followed by an "m", the method fails to return the index of the soft hyphen but instead returns the index of the "m".

_Code sample not included: ~/snippets/csharp/System/String/IndexOf/ignorable22.cs._

#### Examples
The following example searches for all occurrences of a specified string within a target string.

_Code sample not included: ~/snippets/csharp/System/String/IndexOf/stringindexof4.cs._

## String.IndexOf(String, StringComparison) method

```csharp
public int IndexOf (string value, StringComparison comparisonType);
```

Reports the zero-based index of the first occurrence of the specified string in the current `String` object. A parameter specifies the type of search to use for the specified string.

Parameters:

- `value`: The string to seek.
- `comparisonType`: One of the enumeration values that specifies the rules for the search.

Returns: The index position of the `value` parameter if that string is found, or -1 if it is not. If `value` is `String.Empty`, the return value is 0.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentException`: `comparisonType` is not a valid `StringComparison` value.

#### Remarks
Index numbering starts from zero.

The `comparisonType` parameter specifies to search for the `value` parameter using the current or invariant culture, using a case-sensitive or case-insensitive search, and using word or ordinal comparison rules.

#### Examples
The following example demonstrates three overloads of the `String.IndexOf` method that find the first occurrence of a string within another string using different values of the `StringComparison` enumeration.

_Code sample not included: ~/snippets/csharp/System/String/IndexOf/iocmp.cs._

## String.IndexOf(Rune, Int32) method

```csharp
public int IndexOf (System.Text.Rune value, int startIndex);
```

To be added.

Parameters:

- `value`: To be added.
- `startIndex`: To be added.

Returns: To be added.

To be added.

## String.IndexOf(Rune, StringComparison) method

```csharp
public int IndexOf (System.Text.Rune value, StringComparison comparisonType);
```

To be added.

Parameters:

- `value`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.

## String.IndexOf(Char, Int32, Int32) method

```csharp
public int IndexOf (char value, int startIndex, int count);
```

Reports the zero-based index of the first occurrence of the specified character in this instance. The search starts at a specified character position and examines a specified number of character positions.

Parameters:

- `value`: A Unicode character to seek.
- `startIndex`: The search starting position.
- `count`: The number of character positions to examine.

Returns: The zero-based index position of `value` from the start of the string if that character is found, or -1 if it is not.

Exceptions:

- `ArgumentOutOfRangeException`: `count` or `startIndex` is negative.

-or-

`startIndex` is greater than the length of this string.

-or-

`count` is greater than the length of this string minus `startIndex`.

#### Remarks
The search begins at `startIndex` and continues to `startIndex` + `count` -1. The character at `startIndex` + `count` is not included in the search.

Index numbering starts from 0 (zero). The `startIndex` parameter can range from 0 to the length of the string instance.

This method performs an ordinal (culture-insensitive) search, where a character is considered equivalent to another character only if their Unicode scalar values are the same. To perform a culture-sensitive search, use the `CompareInfo.IndexOf` method, where a Unicode scalar value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture.

#### Examples
The following example demonstrates the `String.IndexOf` method.

_Code sample not included: ~/snippets/csharp/System/String/IndexOf/indexofcii.cs._

## String.IndexOf(Char, Int32, StringComparison) method

```csharp
public int IndexOf (char value, int startIndex, StringComparison comparisonType);
```

To be added.

Parameters:

- `value`: To be added.
- `startIndex`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.

## String.IndexOf(String, Int32, Int32) method

```csharp
public int IndexOf (string value, int startIndex, int count);
```

Reports the zero-based index of the first occurrence of the specified string in this instance. The search starts at a specified character position and examines a specified number of character positions.

Parameters:

- `value`: The string to seek.
- `startIndex`: The search starting position.
- `count`: The number of character positions to examine.

Returns: The zero-based index position of `value` from the start of the current instance if that string is found, or -1 if it is not. If `value` is `String.Empty`, the return value is `startIndex`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `count` or `startIndex` is negative.

-or-

`startIndex` is greater than the length of this string.

-or-

`count` is greater than the length of this string minus `startIndex`.

#### Remarks
Index numbering starts from 0 (zero). The `startIndex` parameter can range from 0 to the length of the string instance.

This method performs a word (case-sensitive and culture-sensitive) search using the current culture. The search begins at `startIndex` and continues to `startIndex` + `count` -1. The character at `startIndex` + `count` is not included in the search.

Character sets include ignorable characters, which are characters that are not considered when performing a linguistic or culture-sensitive comparison. In a culture-sensitive search, if `value` contains an ignorable character, the result is equivalent to searching with that character removed. If `value` consists only of one or more ignorable characters, the `IndexOf` method always returns `startIndex`, which is the character position at which the search begins. In the following example, the `IndexOf` method is used to find the position of a soft hyphen (U+00AD) followed by an "m" starting in the third through sixth character positions in two strings. Only one of the strings contains the required substring. Because the soft hyphen is an ignorable character, the method returns the index of "m" in the string when it performs a culture-sensitive comparison. Note that in the case of the first string, which includes the soft hyphen followed by an "m", the method fails to return the index of the soft hyphen but instead returns the index of the "m".

_Code sample not included: ~/snippets/csharp/System/String/IndexOf/ignorable23.cs._

#### Examples
The following example finds the index of all occurrences of the string "he" within a substring of another string. Note that the number of characters to be searched must be recalculated for each search iteration.

_Code sample not included: ~/snippets/csharp/System/String/IndexOf/ixof8.cs._
