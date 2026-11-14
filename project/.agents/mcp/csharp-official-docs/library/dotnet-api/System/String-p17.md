---
title: "String class (part 17 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 17 of 26)

## String.LastIndexOf(String, Int32, Int32) method

```csharp
public int LastIndexOf (string value, int startIndex, int count);
```

Reports the zero-based index position of the last occurrence of a specified string within this instance. The search starts at a specified character position and proceeds backward toward the beginning of the string for a specified number of character positions.

Parameters:

- `value`: The string to seek.
- `startIndex`: The search starting position. The search proceeds from `startIndex` toward the beginning of this instance.
- `count`: The number of character positions to examine.

Returns: The zero-based starting index position of `value` if that string is found, or -1 if it is not found or if the current instance equals `String.Empty`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `count` is negative.

-or-

The current instance does not equal `String.Empty`, and `startIndex` is negative.

-or-

The current instance does not equal `String.Empty`, and `startIndex` is greater than the length of this instance.

-or-

The current instance does not equal `String.Empty`, and `startIndex` - `count`+ 1 specifies a position that is not within this instance.

-or-

The current instance equals `String.Empty` and `startIndex` is less than -1 or greater than zero.

-or-

The current instance equals `String.Empty` and `count` is greater than 1.

#### Remarks
Index numbering starts from zero. That is, the first character in the string is at index zero and the last is at `String.Length` - 1.

The search begins at the `startIndex` character position of this instance and proceeds backward toward the beginning until either `value` is found or `count` character positions have been examined. For example, if `startIndex` is `String.Length` - 1, the method searches backward `count` characters from the last character in the string.

This method performs a word (case-sensitive and culture-sensitive) search using the current culture.

Character sets include ignorable characters, which are characters that are not considered when performing a linguistic or culture-sensitive comparison. In a culture-sensitive search, if `value` contains an ignorable character, the result is equivalent to searching with that character removed.

In the following example, the `String.LastIndexOf` method is used to find the position of a soft hyphen (U+00AD) followed by an "m" or "n" in two strings. Only one of the strings contains a soft hyphen. In the case of the string that includes the soft hyphen followed by an "m", `LastIndexOf` returns the index of the "m" when searching for the soft hyphen followed by "m".

_Code sample not included: ~/snippets/csharp/System/String/LastIndexOf/lastindexof23.cs._

#### Examples
The following example finds the index of all occurrences of a string in substring, working from the end of the substring to the start of the substring.

_Code sample not included: ~/snippets/csharp/System/String/LastIndexOf/lastixof8.cs._

## String.LastIndexOf(String, Int32, StringComparison) method

```csharp
public int LastIndexOf (string value, int startIndex, StringComparison comparisonType);
```

Reports the zero-based index of the last occurrence of a specified string within the current `String` object. The search starts at a specified character position and proceeds backward toward the beginning of the string. A parameter specifies the type of comparison to perform when searching for the specified string.

Parameters:

- `value`: The string to seek.
- `startIndex`: The search starting position. The search proceeds from `startIndex` toward the beginning of this instance.
- `comparisonType`: One of the enumeration values that specifies the rules for the search.

Returns: The zero-based starting index position of the `value` parameter if that string is found, or -1 if it is not found or if the current instance equals `String.Empty`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: The current instance does not equal `String.Empty`, and `startIndex` is less than zero or greater than the length of the current instance.

-or-

The current instance equals `String.Empty`, and `startIndex` is less than -1 or greater than zero.
- `ArgumentException`: `comparisonType` is not a valid `StringComparison` value.

#### Remarks
Index numbering starts from zero. That is, the first character in the string is at index zero and the last is at `String.Length` - 1.

The search begins at the `startIndex` character position and proceeds backward until either `value` is found or the first character position has been examined. For example, if `startIndex` is `String.Length` - 1, the method searches every character from the last character in the string to the beginning.

The `comparisonType` parameter specifies to search for the `value` parameter using the current or invariant culture, using a case-sensitive or case-insensitive search, and using word or ordinal comparison rules.

#### Examples
The following example demonstrates three overloads of the `String.LastIndexOf` method that find the last occurrence of a string within another string using different values of the `StringComparison` enumeration.

_Code sample not included: ~/snippets/csharp/System/String/LastIndexOf/liocmp.cs._

## String.LastIndexOf(Rune, Int32, Int32) method

```csharp
public int LastIndexOf (System.Text.Rune value, int startIndex, int count);
```

To be added.

Parameters:

- `value`: To be added.
- `startIndex`: To be added.
- `count`: To be added.

Returns: To be added.

To be added.

## String.LastIndexOf(Rune, Int32, StringComparison) method

```csharp
public int LastIndexOf (System.Text.Rune value, int startIndex, StringComparison comparisonType);
```

To be added.

Parameters:

- `value`: To be added.
- `startIndex`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.

## String.LastIndexOf(Char, Int32, Int32, StringComparison) method

```csharp
public int LastIndexOf (char value, int startIndex, int count, StringComparison comparisonType);
```

To be added.

Parameters:

- `value`: To be added.
- `startIndex`: To be added.
- `count`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.

## String.LastIndexOf(String, Int32, Int32, StringComparison) method

```csharp
public int LastIndexOf (string value, int startIndex, int count, StringComparison comparisonType);
```

Reports the zero-based index position of the last occurrence of a specified string within this instance. The search starts at a specified character position and proceeds backward toward the beginning of the string for the specified number of character positions. A parameter specifies the type of comparison to perform when searching for the specified string.

Parameters:

- `value`: The string to seek.
- `startIndex`: The search starting position. The search proceeds from `startIndex` toward the beginning of this instance.
- `count`: The number of character positions to examine.
- `comparisonType`: One of the enumeration values that specifies the rules for the search.

Returns: The zero-based starting index position of the `value` parameter if that string is found, or -1 if it is not found or if the current instance equals `String.Empty`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `count` is negative.

-or-

The current instance does not equal `String.Empty`, and `startIndex` is negative.

-or-

The current instance does not equal `String.Empty`, and `startIndex` is greater than the length of this instance.

-or-

The current instance does not equal `String.Empty`, and `startIndex` + 1 - `count` specifies a position that is not within this instance.

-or-

The current instance equals `String.Empty` and `startIndex` is less than -1 or greater than zero.

-or-

The current instance equals `String.Empty` and `count` is greater than 1.
- `ArgumentException`: `comparisonType` is not a valid `StringComparison` value.

#### Remarks
Index numbering starts from zero. That is, the first character in the string is at index zero and the last is at `String.Length` - 1.

The search begins at the `startIndex` character position and proceeds backward until either `value` is found or `count` character positions have been examined. For example, if `startIndex` is `String.Length` - 1, the method searches backward `count` characters from the last character in the string.

The `comparisonType` parameter specifies to search for the `value` parameter using:

- The current or invariant culture.
- A case-sensitive or case-insensitive search.
- Word or ordinal comparison rules.

#### Examples
The following example demonstrates three overloads of the `String.LastIndexOf` method that find the last occurrence of a string within another string using different values of the `StringComparison` enumeration.

_Code sample not included: ~/snippets/csharp/System/String/LastIndexOf/liocmp.cs._

## String.LastIndexOf(Rune, Int32, Int32, StringComparison) method

```csharp
public int LastIndexOf (System.Text.Rune value, int startIndex, int count, StringComparison comparisonType);
```

To be added.

Parameters:

- `value`: To be added.
- `startIndex`: To be added.
- `count`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.

## String.LastIndexOfAny(Char[]) method

```csharp
public int LastIndexOfAny (char[] anyOf);
```

Reports the zero-based index position of the last occurrence in this instance of one or more characters specified in a Unicode array.

Parameters:

- `anyOf`: A Unicode character array containing one or more characters to seek.

Returns: The index position of the last occurrence in this instance where any character in `anyOf` was found; -1 if no character in `anyOf` was found.

Exceptions:

- `ArgumentNullException`: `anyOf` is `null`.

#### Remarks
Index numbering starts from zero.

This method begins searching at the last character position of this instance and proceeds backward toward the beginning until either a character in `anyOf` is found or the first character position has been examined. The search is case-sensitive.

This method performs an ordinal (culture-insensitive) search, where a character is considered equivalent to another character only if their Unicode scalar values are the same. To perform a culture-sensitive search, use the `CompareInfo.LastIndexOf` method, where a Unicode scalar value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture.

#### Examples
The following example finds the index of the last occurrence of any character in the string "is" within another string.

_Code sample not included: ~/snippets/csharp/System/String/LastIndexOfAny/lastixany1.cs._

## String.LastIndexOfAny(Char[], Int32) method

```csharp
public int LastIndexOfAny (char[] anyOf, int startIndex);
```

Reports the zero-based index position of the last occurrence in this instance of one or more characters specified in a Unicode array. The search starts at a specified character position and proceeds backward toward the beginning of the string.

Parameters:

- `anyOf`: A Unicode character array containing one or more characters to seek.
- `startIndex`: The search starting position. The search proceeds from `startIndex` toward the beginning of this instance.

Returns: The index position of the last occurrence in this instance where any character in `anyOf` was found; -1 if no character in `anyOf` was found or if the current instance equals `String.Empty`.

Exceptions:

- `ArgumentNullException`: `anyOf` is `null`.
- `ArgumentOutOfRangeException`: The current instance does not equal `String.Empty`, and `startIndex` specifies a position that is not within this instance.

#### Remarks
Index numbering starts from zero.

This method begins searching at the `startIndex` character position of this instance and proceeds backward toward the beginning until either a character in `anyOf` is found or the first character position has been examined. The search is case-sensitive.

This method performs an ordinal (culture-insensitive) search, where a character is considered equivalent to another character only if their Unicode scalar values are the same. To perform a culture-sensitive search, use the `CompareInfo.LastIndexOf` method, where a Unicode scalar value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture.

#### Examples
The following example finds the index of the last occurrence of any character in the string "is" within a substring of another string.

_Code sample not included: ~/snippets/csharp/System/String/LastIndexOfAny/lastixany2.cs._
