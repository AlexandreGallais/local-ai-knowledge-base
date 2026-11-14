---
title: "String class (part 13 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 13 of 26)

## String.IndexOf(String, Int32, StringComparison) method

```csharp
public int IndexOf (string value, int startIndex, StringComparison comparisonType);
```

Reports the zero-based index of the first occurrence of the specified string in the current `String` object. Parameters specify the starting search position in the current string and the type of search to use for the specified string.

Parameters:

- `value`: The string to seek.
- `startIndex`: The search starting position.
- `comparisonType`: One of the enumeration values that specifies the rules for the search.

Returns: The zero-based index position of the `value` parameter from the start of the current instance if that string is found, or -1 if it is not. If `value` is `String.Empty`, the return value is `startIndex`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is less than 0 (zero) or greater than the length of this string.
- `ArgumentException`: `comparisonType` is not a valid `StringComparison` value.

#### Remarks
Index numbering starts from 0. The `startIndex` parameter can range from 0 to the length of the string instance. If `startIndex` equals the length of the string instance, the method returns -1.

The `comparisonType` parameter specifies to search for the `value` parameter using the current or invariant culture, using a case-sensitive or case-insensitive search, and using word or ordinal comparison rules.

#### Examples
The following example demonstrates three overloads of the `String.IndexOf` method that find the first occurrence of a string within another string using different values of the `StringComparison` enumeration.

_Code sample not included: ~/snippets/csharp/System/String/IndexOf/iocmp.cs._

## String.IndexOf(Rune, Int32, Int32) method

```csharp
public int IndexOf (System.Text.Rune value, int startIndex, int count);
```

To be added.

Parameters:

- `value`: To be added.
- `startIndex`: To be added.
- `count`: To be added.

Returns: To be added.

To be added.

## String.IndexOf(Rune, Int32, StringComparison) method

```csharp
public int IndexOf (System.Text.Rune value, int startIndex, StringComparison comparisonType);
```

To be added.

Parameters:

- `value`: To be added.
- `startIndex`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.

## String.IndexOf(Char, Int32, Int32, StringComparison) method

```csharp
public int IndexOf (char value, int startIndex, int count, StringComparison comparisonType);
```

To be added.

Parameters:

- `value`: To be added.
- `startIndex`: To be added.
- `count`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.

## String.IndexOf(String, Int32, Int32, StringComparison) method

```csharp
public int IndexOf (string value, int startIndex, int count, StringComparison comparisonType);
```

Reports the zero-based index of the first occurrence of the specified string in the current `String` object. Parameters specify the starting search position in the current string, the number of characters in the current string to search, and the type of search to use for the specified string.

Parameters:

- `value`: The string to seek.
- `startIndex`: The search starting position.
- `count`: The number of character positions to examine.
- `comparisonType`: One of the enumeration values that specifies the rules for the search.

Returns: The zero-based index position of the `value` parameter from the start of the current instance if that string is found, or -1 if it is not. If `value` is `String.Empty`, the return value is `startIndex`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `count` or `startIndex` is negative.

-or-

`startIndex` is greater than the length of this instance.

-or-

`count` is greater than the length of this string minus `startIndex`.
- `ArgumentException`: `comparisonType` is not a valid `StringComparison` value.

#### Remarks
Index numbering starts from 0 (zero). The `startIndex` parameter can range from 0 to the length of the string instance.

The search begins at `startIndex` and continues to `startIndex` + `count` -1. The character at `startIndex` + `count` is not included in the search.

The `comparisonType` parameter specifies to search for the `value` parameter using the current or invariant culture, using a case-sensitive or case-insensitive search, and using word or ordinal comparison rules.

#### Examples
The following example demonstrates three overloads of the `String.IndexOf` method that find the first occurrence of a string within another string using different values of the `StringComparison` enumeration.

_Code sample not included: ~/snippets/csharp/System/String/IndexOf/iocmp.cs._

## String.IndexOf(Rune, Int32, Int32, StringComparison) method

```csharp
public int IndexOf (System.Text.Rune value, int startIndex, int count, StringComparison comparisonType);
```

To be added.

Parameters:

- `value`: To be added.
- `startIndex`: To be added.
- `count`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.

## String.IndexOfAny(Char[]) method

```csharp
public int IndexOfAny (char[] anyOf);
```

Reports the zero-based index of the first occurrence in this instance of any character in a specified array of Unicode characters.

Parameters:

- `anyOf`: A Unicode character array containing one or more characters to seek.

Returns: The zero-based index position of the first occurrence in this instance where any character in `anyOf` was found; -1 if no character in `anyOf` was found.

Exceptions:

- `ArgumentNullException`: `anyOf` is `null`.

#### Remarks

Index numbering starts from zero.

The search for `anyOf` is case-sensitive. If `anyOf` is an empty array, the method returns -1.

This method performs an ordinal (culture-insensitive) search, where a character is considered equivalent to another character only if their Unicode scalar values are the same. To perform a culture-sensitive search, use the `CompareInfo.IndexOf` method, where a Unicode scalar value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture.

#### Examples

The following example finds the first vowel in a string.

_Code sample not included: ~/snippets/csharp/System/String/IndexOfAny/IndexOfAny1.cs._

## String.IndexOfAny(Char[], Int32) method

```csharp
public int IndexOfAny (char[] anyOf, int startIndex);
```

Reports the zero-based index of the first occurrence in this instance of any character in a specified array of Unicode characters. The search starts at a specified character position.

Parameters:

- `anyOf`: A Unicode character array containing one or more characters to seek.
- `startIndex`: The search starting position.

Returns: The zero-based index position of the first occurrence in this instance where any character in `anyOf` was found; -1 if no character in `anyOf` was found.

Exceptions:

- `ArgumentNullException`: `anyOf` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is negative.

-or-

`startIndex` is greater than the number of characters in this instance.

#### Remarks
Index numbering starts from zero. The `startIndex` parameter can range from 0 to one less than the length of the string instance.

The search ranges from `startIndex` to the end of the string.

The search for `anyOf` is case-sensitive.

This method performs an ordinal (culture-insensitive) search, where a character is considered equivalent to another character only if their Unicode scalar value are the same. To perform a culture-sensitive search, use the `CompareInfo.IndexOf` method, where a Unicode scalar value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture.

#### Examples
The following example finds the index of the occurrence of any character of the string "is" within a substring of another string.

_Code sample not included: ~/snippets/csharp/System/String/IndexOfAny/ixany2.cs._

## String.IndexOfAny(Char[], Int32, Int32) method

```csharp
public int IndexOfAny (char[] anyOf, int startIndex, int count);
```

Reports the zero-based index of the first occurrence in this instance of any character in a specified array of Unicode characters. The search starts at a specified character position and examines a specified number of character positions.

Parameters:

- `anyOf`: A Unicode character array containing one or more characters to seek.
- `startIndex`: The search starting position.
- `count`: The number of character positions to examine.

Returns: The zero-based index position of the first occurrence in this instance where any character in `anyOf` was found; -1 if no character in `anyOf` was found.

Exceptions:

- `ArgumentNullException`: `anyOf` is `null`.
- `ArgumentOutOfRangeException`: `count` or `startIndex` is negative.

-or-

`count` + `startIndex` is greater than the number of characters in this instance.

#### Remarks
The search begins at `startIndex` and continues to `startIndex` + `count` -1. The character at `startIndex` + `count` is not included in the search.

Index numbering starts from zero. The `startIndex` parameter can range from 0 to one less than the length of the string instance.

The search for `anyOf` is case-sensitive.

This method performs an ordinal (culture-insensitive) search, where a character is considered equivalent to another character only if their Unicode scalar value are the same. To perform a culture-sensitive search, use the `CompareInfo.IndexOf` method, where a Unicode scalar value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture.

#### Examples
The following example finds the index of the occurrence of any character of the string "aid" within a substring of another string.

_Code sample not included: ~/snippets/csharp/System/String/IndexOfAny/ixany3.cs._

## String.Insert(Int32, String) method

```csharp
public string Insert (int startIndex, string value);
```

Returns a new string in which a specified string is inserted at a specified index position in this instance.

Parameters:

- `startIndex`: The zero-based index position of the insertion.
- `value`: The string to insert.

Returns: A new string that is equivalent to this instance, but with `value` inserted at position `startIndex`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentOutOfRangeException`: `startIndex` is negative or greater than the length of this instance.

#### Remarks
If `startIndex` is equal to the length of this instance, `value` is appended to the end of this instance.

> **Note:**
> This method does not modify the value of the current instance. Instead, it returns a new string in which `value` is inserted into the current instance.

For example, the return value of `"abc".Insert(2, "XYZ")` is "abXYZc".

#### Examples
The following example inserts a space character in the fourth character position (the character at index 3) of a string.

_Code sample not included: ~/snippets/csharp/System/String/Insert/Insert1.cs._

The following console application prompts the users to enter one or more adjectives to describe two animals. It then calls the `String.Insert` method to insert the text entered by the user into a string.

_Code sample not included: ~/snippets/csharp/System/String/IndexOf/stringinsert.cs._
