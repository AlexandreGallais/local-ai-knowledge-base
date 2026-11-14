---
title: "String class (part 6 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 6 of 26)

## String.Compare(String, Int32, String, Int32, Int32) method

```csharp
public static int Compare (string? strA, int indexA, string? strB, int indexB, int length);
```

Compares substrings of two specified `String` objects and returns an integer that indicates their relative position in the sort order.

Parameters:

- `strA`: The first string to use in the comparison.
- `indexA`: The position of the substring within `strA`.
- `strB`: The second string to use in the comparison.
- `indexB`: The position of the substring within `strB`.
- `length`: The maximum number of characters in the substrings to compare.

Returns: A 32-bit signed integer indicating the lexical relationship between the two comparands.

-  Less than zero

:  The substring in `strA` precedes the substring in `strB` in the sort order.

-  Zero

:  The substrings occur in the same position in the sort order, or `length` is zero.

-  Greater than zero

:  The substring in `strA` follows the substring in `strB` in the sort order.

Exceptions:

- `ArgumentOutOfRangeException`: `indexA` is greater than `strA`.`String.Length`.

-or-

`indexB` is greater than `strB`.`String.Length`.

-or-

`indexA`, `indexB`, or `length` is negative.

-or-

Either `indexA` or `indexB` is `null`, and `length` is greater than zero.

#### Remarks
The substrings to compare start in `strA` at `indexA` and in `strB` at `indexB`. Both `indexA` and `indexB` are zero-based; that is, the first character in `strA` and `strB` is at position zero. The length of the first substring is equal to the length of `strA` minus `indexA` plus one. The length of the second substring is equal to the length of `strB` minus `indexB` plus one.

The number of characters to compare is the lesser of the lengths of the two substrings, and `length`. The `indexA`, `indexB`, and `length` parameters must be nonnegative.

The comparison uses the current culture to obtain culture-specific information such as casing rules and the alphabetic order of individual characters. For example, a culture could specify that certain combinations of characters be treated as a single character, or uppercase and lowercase characters be compared in a particular way, or that the sorting order of a character depends on the characters that precede or follow it.

The comparison is performed using word sort rules. For more information about word, string, and ordinal sorts, see `CompareOptions`.

> **Warning:**
> When comparing strings, you should call the `Compare` method, which requires that you explicitly specify the type of string comparison that the method uses. For more information, see Best Practices for Using Strings.

One or both comparands can be `null`. By definition, any string, including the empty string (""), compares greater than a null reference; and two null references compare equal to each other.

The comparison terminates when an inequality is discovered or both substrings have been compared. However, if the two strings compare equal to the end of one string, and the other string has characters remaining, then the string with remaining characters is considered greater. The return value is the result of the last comparison performed.

Unexpected results can occur when comparisons are affected by culture-specific casing rules. For example, in Turkish, the following example yields the wrong results because the file system in Turkish does not use linguistic casing rules for the letter "i" in "file".

_Code sample not included: ~/snippets/csharp/System/String/Compare/remarks.cs._

Compare the path name to "file" using an ordinal comparison. The correct code to do this is as follows:

_Code sample not included: ~/snippets/csharp/System/String/Compare/remarks.cs._

#### Examples
The following example compares two substrings.

_Code sample not included: ~/snippets/csharp/System/String/Compare/comp3.cs._

## String.Compare(String, Int32, String, Int32, Int32, Boolean) method

```csharp
public static int Compare (string? strA, int indexA, string? strB, int indexB, int length, bool ignoreCase);
```

Compares substrings of two specified `String` objects, ignoring or honoring their case, and returns an integer that indicates their relative position in the sort order.

Parameters:

- `strA`: The first string to use in the comparison.
- `indexA`: The position of the substring within `strA`.
- `strB`: The second string to use in the comparison.
- `indexB`: The position of the substring within `strB`.
- `length`: The maximum number of characters in the substrings to compare.
- `ignoreCase`: `true` to ignore case during the comparison; otherwise, `false`.

Returns: A 32-bit signed integer that indicates the lexical relationship between the two comparands.

-  Less than zero

:  The substring in `strA` precedes the substring in `strB` in the sort order.

-  Zero

:  The substrings occur in the same position in the sort order, or `length` is zero.

-  Greater than zero

:  The substring in `strA` follows the substring in `strB` in the sort order.

Exceptions:

- `ArgumentOutOfRangeException`: `indexA` is greater than `strA`.`String.Length`.

-or-

`indexB` is greater than `strB`.`String.Length`.

-or-

`indexA`, `indexB`, or `length` is negative.

-or-

Either `indexA` or `indexB` is `null`, and `length` is greater than zero.

#### Remarks
The substrings to compare start in `strA` at `indexA`, and in `strB` at `indexB`. Both `indexA` and `indexB` are zero-based; that is, the first character in `strA` and `strB` is at position zero. The length of the first substring is equal to the length of `strA` minus `indexA` plus one. The length of the second substring is equal to the length of `strB` minus `indexB` plus one.

The number of characters to compare is the lesser of the lengths of the two substrings, and `length`. The `indexA`, `indexB`, and `length` parameters must be nonnegative.

The comparison uses the current culture to obtain culture-specific information such as casing rules and the alphabetic order of individual characters. For example, a culture could specify that certain combinations of characters be treated as a single character, or uppercase and lowercase characters be compared in a particular way, or that the sorting order of a character depends on the characters that precede or follow it.

The comparison is performed using word sort rules. For more information about word, string, and ordinal sorts, see `CompareOptions`.

> **Warning:**
> When comparing strings, you should call the `Compare` method, which requires that you explicitly specify the type of string comparison that the method uses. For more information, see Best Practices for Using Strings.

One or both comparands can be `null`. By definition, any string, including the empty string (""), compares greater than a null reference; and two null references compare equal to each other.

The comparison terminates when an inequality is discovered or both substrings have been compared. However, if the two strings compare equal to the end of one string, and the other string has characters remaining, then the string with remaining characters is considered greater. The return value is the result of the last comparison performed.

Unexpected results can occur when comparisons are affected by culture-specific casing rules. For example, in Turkish, the following example yields the wrong results because the file system in Turkish does not use linguistic casing rules for the letter "i" in "file".

_Code sample not included: ~/snippets/csharp/System/String/Compare/remarks.cs._

The path name needs to be compared in an invariant manner. The correct code to do this is as follows.

_Code sample not included: ~/snippets/csharp/System/String/Compare/remarks.cs._

#### Examples
The following example performs two comparisons of two substrings that only differ in case. The first comparison ignores case and the second comparison considers case.

_Code sample not included: ~/snippets/csharp/System/String/Compare/comp4.cs._

## String.Compare(String, Int32, String, Int32, Int32, StringComparison) method

```csharp
public static int Compare (string? strA, int indexA, string? strB, int indexB, int length, StringComparison comparisonType);
```

Compares substrings of two specified `String` objects using the specified rules, and returns an integer that indicates their relative position in the sort order.

Parameters:

- `strA`: The first string to use in the comparison.
- `indexA`: The position of the substring within `strA`.
- `strB`: The second string to use in the comparison.
- `indexB`: The position of the substring within `strB`.
- `length`: The maximum number of characters in the substrings to compare.
- `comparisonType`: One of the enumeration values that specifies the rules to use in the comparison.

Returns: A 32-bit signed integer that indicates the lexical relationship between the two comparands.

-  Less than zero

:  The substring in `strA` precedes the substring in `strB` in the sort order.

-  Zero

:  The substrings occur in the same position in the sort order, or the `length` parameter is zero.

-  Greater than zero

:  The substring in `strA` follows the substring in `strB` in the sort order.

Exceptions:

- `ArgumentOutOfRangeException`: `indexA` is greater than `strA`.`String.Length`.

-or-

`indexB` is greater than `strB`.`String.Length`.

-or-

`indexA`, `indexB`, or `length` is negative.

-or-

Either `indexA` or `indexB` is `null`, and `length` is greater than zero.
- `ArgumentException`: `comparisonType` is not a `StringComparison` value.

#### Remarks
The substrings to compare start in `strA` at `indexA` and in `strB` at `indexB`. Both `indexA` and `indexB` are zero-based; that is, the first character in `strA` and `strB` is at position zero, not position one. The length of the first substring is equal to the length of `strA` minus `indexA` plus one. The length of the second substring is equal to the length of `strB` minus `indexB` plus one.

The number of characters to compare is the lesser of the lengths of the two substrings, and `length`. The `indexA`, `indexB`, and `length` parameters must be nonnegative.

The `comparisonType` parameter indicates whether the comparison should use the current or invariant culture, honor or ignore the case of the comparands, or use word (culture-sensitive) or ordinal (culture-insensitive) sort rules.

One or both comparands can be `null`. By definition, any string, including the empty string (""), compares greater than a null reference; and two null references compare equal to each other.

The comparison terminates when an inequality is discovered or both substrings have been compared. However, if the two strings compare equal to the end of one string, and the other string has characters remaining, the string with remaining characters is considered greater. The return value is the result of the last comparison performed.

Unexpected results can occur when comparisons are affected by culture-specific casing rules. For example, in Turkish, the following example yields the wrong results because the file system in Turkish does not use linguistic casing rules for the letter "i" in "file".

_Code sample not included: ~/snippets/csharp/System/String/Compare/remarks.cs._

Compare the path name to "file" using an ordinal comparison. The correct code to do this is as follows:

_Code sample not included: ~/snippets/csharp/System/String/Compare/remarks.cs._

#### Examples
The following example compares two substrings.

_Code sample not included: ~/snippets/csharp/System/String/Compare/comp3.cs._
