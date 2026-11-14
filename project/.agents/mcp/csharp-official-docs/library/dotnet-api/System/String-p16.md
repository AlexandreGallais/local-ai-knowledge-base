---
title: "String class (part 16 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 16 of 26)

## String.LastIndexOf(String) method

```csharp
public int LastIndexOf (string value);
```

Reports the zero-based index position of the last occurrence of a specified string within this instance.

Parameters:

- `value`: The string to seek.

Returns: The zero-based starting index position of `value` if that string is found, or -1 if it is not.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Remarks

Index numbering starts from zero. That is, the first character in the string is at index zero and the last is at `String.Length` - 1.

The search begins at the last character position of this instance and proceeds backward toward the beginning until either `value` is found or the first character position has been examined.

This method performs a word (case-sensitive and culture-sensitive) search using the current culture.

Character sets include ignorable characters, which are characters that are not considered when performing a linguistic or culture-sensitive comparison. In a culture-sensitive search, if `value` contains an ignorable character, the result is equivalent to searching with that character removed.

In the following example, the `LastIndexOf` method is used to find two substrings (a soft hyphen followed by "n" and a soft hyphen followed by "m") in two strings. Only one of the strings contains a soft hyphen. Because the soft hyphen is an ignorable character, the result is the same as if the soft hyphen had not been included in `value`.

_Code sample not included: ~/snippets/csharp/System/String/LastIndexOf/lastindexof21.cs._

#### Examples
The following example removes opening and closing HTML tags from a string if the tags begin and end the string. If a string ends with a closing bracket character (">"), the example uses the `String.LastIndexOf` method to locate the start of the end tag.

_Code sample not included: ~/snippets/csharp/System/String/LastIndexOf/lastindexof_example2.cs._

## String.LastIndexOf(Rune) method

```csharp
public int LastIndexOf (System.Text.Rune value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## String.LastIndexOf(Char, Int32) method

```csharp
public int LastIndexOf (char value, int startIndex);
```

Reports the zero-based index position of the last occurrence of a specified Unicode character within this instance. The search starts at a specified character position and proceeds backward toward the beginning of the string.

Parameters:

- `value`: The Unicode character to seek.
- `startIndex`: The starting position of the search. The search proceeds from `startIndex` toward the beginning of this instance.

Returns: The zero-based index position of `value` if that character is found, or -1 if it is not found or if the current instance equals `String.Empty`.

Exceptions:

- `ArgumentOutOfRangeException`: The current instance does not equal `String.Empty`, and `startIndex` is less than zero or greater than or equal to the length of this instance.

#### Remarks
Index numbering starts from zero. That is, the first character in the string is at index zero and the last is at `String.Length` - 1. This method begins searching at the `startIndex` character position of this instance and proceeds backward toward the beginning of the current instance until either `value` is found or the first character position has been examined. For example, if `startIndex` is `String.Length` - 1, the method searches every character from the last character in the string to the beginning. The search is case-sensitive.

This method performs an ordinal (culture-insensitive) search, where a character is considered equivalent to another character only if their Unicode scalar values are the same. To perform a culture-sensitive search, use the `CompareInfo.LastIndexOf` method, where a Unicode scalar value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture.

#### Examples
The following example finds the index of all occurrences of a character in a string, working from the end of the string to the start of the string.

_Code sample not included: ~/snippets/csharp/System/String/LastIndexOf/lastixof1.cs._

## String.LastIndexOf(Char, StringComparison) method

```csharp
public int LastIndexOf (char value, StringComparison comparisonType);
```

To be added.

Parameters:

- `value`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.

## String.LastIndexOf(String, Int32) method

```csharp
public int LastIndexOf (string value, int startIndex);
```

Reports the zero-based index position of the last occurrence of a specified string within this instance. The search starts at a specified character position and proceeds backward toward the beginning of the string.

Parameters:

- `value`: The string to seek.
- `startIndex`: The search starting position. The search proceeds from `startIndex` toward the beginning of this instance.

Returns: The zero-based starting index position of `value` if that string is found, or -1 if it is not found or if the current instance equals `String.Empty`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: The current instance does not equal `String.Empty`, and `startIndex` is less than zero or greater than the length of the current instance.

-or-

The current instance equals `String.Empty`, and `startIndex` is less than -1 or greater than zero.

#### Remarks
Index numbering starts from zero. That is, the first character in the string is at index zero and the last is at `String.Length` - 1.

The search begins at the `startIndex` character position of this instance and proceeds backward toward the beginning until either `value` is found or the first character position has been examined. For example, if `startIndex` is `String.Length` - 1, the method searches every character from the last character in the string to the beginning.

This method performs a word (case-sensitive and culture-sensitive) search using the current culture.

Character sets include ignorable characters, which are characters that are not considered when performing a linguistic or culture-sensitive comparison. In a culture-sensitive search, if `value` contains an ignorable character, the result is equivalent to searching with that character removed. In the following example, the `LastIndexOf` method is used to find a substring that includes a soft hyphen (U+00AD) and that precedes or includes the final "m" in a string. Because the soft hyphen in the search string is ignored, calling the method to find a substring that consists of the soft hyphen and "m" returns the position of the "m" in the string, whereas calling it to find a substring that consists of the soft hyphen and "n" returns the position of the "n".

_Code sample not included: ~/snippets/csharp/System/String/LastIndexOf/lastindexof22.cs._

#### Examples
The following example finds the index of all occurrences of a string in target string, working from the end of the target string to the start of the target string.

_Code sample not included: ~/snippets/csharp/System/String/LastIndexOf/lastixof7.cs._

## String.LastIndexOf(String, StringComparison) method

```csharp
public int LastIndexOf (string value, StringComparison comparisonType);
```

Reports the zero-based index of the last occurrence of a specified string within the current `String` object. A parameter specifies the type of search to use for the specified string.

Parameters:

- `value`: The string to seek.
- `comparisonType`: One of the enumeration values that specifies the rules for the search.

Returns: The zero-based starting index position of the `value` parameter if that string is found, or -1 if it is not.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentException`: `comparisonType` is not a valid `StringComparison` value.

#### Remarks

Index numbering starts from zero. That is, the first character in the string is at index zero and the last is at `String.Length` - 1.

The `comparisonType` parameter specifies to search for the `value` parameter using:

- The current or invariant culture.
- A case-sensitive or case-insensitive search.
- Word or ordinal comparison rules.

The search begins at the last character position of this instance and proceeds backward toward the beginning until either `value` is found or the first character position has been examined.

#### Examples
The following example demonstrates three overloads of the `String.LastIndexOf` method that find the last occurrence of a string within another string using different values of the `StringComparison` enumeration.

_Code sample not included: ~/snippets/csharp/System/String/LastIndexOf/liocmp.cs._

## String.LastIndexOf(Rune, Int32) method

```csharp
public int LastIndexOf (System.Text.Rune value, int startIndex);
```

To be added.

Parameters:

- `value`: To be added.
- `startIndex`: To be added.

Returns: To be added.

To be added.

## String.LastIndexOf(Rune, StringComparison) method

```csharp
public int LastIndexOf (System.Text.Rune value, StringComparison comparisonType);
```

To be added.

Parameters:

- `value`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.

## String.LastIndexOf(Char, Int32, Int32) method

```csharp
public int LastIndexOf (char value, int startIndex, int count);
```

Reports the zero-based index position of the last occurrence of the specified Unicode character in a substring within this instance. The search starts at a specified character position and proceeds backward toward the beginning of the string for a specified number of character positions.

Parameters:

- `value`: The Unicode character to seek.
- `startIndex`: The starting position of the search. The search proceeds from `startIndex` toward the beginning of this instance.
- `count`: The number of character positions to examine.

Returns: The zero-based index position of `value` if that character is found, or -1 if it is not found or if the current instance equals `String.Empty`.

Exceptions:

- `ArgumentOutOfRangeException`: The current instance does not equal `String.Empty`, and `startIndex` is less than zero or greater than or equal to the length of this instance.

-or-

The current instance does not equal `String.Empty`, and `startIndex` - `count` + 1 is less than zero.

#### Remarks
Index numbering starts from zero. That is, the first character in the string is at index zero and the last is at `String.Length` - 1.

This method begins searching at the `startIndex` character position and proceeds backward toward the beginning of this instance until either `value` is found or `count` character positions have been examined. For example, if `startIndex` is `String.Length` - 1, the method searches backward `count` characters from the last character in the string. The search is case-sensitive.

This method performs an ordinal (culture-insensitive) search, where a character is considered equivalent to another character only if their Unicode scalar value are the same. To perform a culture-sensitive search, use the `CompareInfo.LastIndexOf` method, where a Unicode scalar value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture.

#### Examples
The following example finds the index of all occurrences of a character in a substring, working from the end of the substring to the start of the substring.

_Code sample not included: ~/snippets/csharp/System/String/LastIndexOf/lastixof2.cs._

## String.LastIndexOf(Char, Int32, StringComparison) method

```csharp
public int LastIndexOf (char value, int startIndex, StringComparison comparisonType);
```

To be added.

Parameters:

- `value`: To be added.
- `startIndex`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.
