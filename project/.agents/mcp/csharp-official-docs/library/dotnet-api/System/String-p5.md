---
title: "String class (part 5 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 5 of 26)

## String.Compare(String, String, Boolean) method

```csharp
public static int Compare (string? strA, string? strB, bool ignoreCase);
```

Compares two specified `String` objects, ignoring or honoring their case, and returns an integer that indicates their relative position in the sort order.

Parameters:

- `strA`: The first string to compare.
- `strB`: The second string to compare.
- `ignoreCase`: `true` to ignore case during the comparison; otherwise, `false`.

Returns: A 32-bit signed integer that indicates the lexical relationship between the two comparands.

-  Less than zero

: `strA` precedes `strB` in the sort order.

-  Zero

: `strA` occurs in the same position as `strB` in the sort order.

-  Greater than zero

: `strA` follows `strB` in the sort order.

#### Remarks
The comparison uses the current culture to obtain culture-specific information such as casing rules and the alphabetic order of individual characters. For example, a culture could specify that certain combinations of characters be treated as a single character, or uppercase and lowercase characters be compared in a particular way, or that the sorting order of a character depends on the characters that precede or follow it.

The comparison is performed using word sort rules. For more information about word, string, and ordinal sorts, see `CompareOptions`.

> **Warning:**
> When comparing strings, you should call the `Compare` method, which requires that you explicitly specify the type of string comparison that the method uses. For more information, see Best Practices for Using Strings.

One or both comparands can be `null`. By definition, any string, including the empty string (""), compares greater than a null reference; and two null references compare equal to each other.

The comparison terminates when an inequality is discovered or both strings have been compared. However, if the two strings compare equal to the end of one string, and the other string has characters remaining, then the string with remaining characters is considered greater. The return value is the result of the last comparison performed.

Unexpected results can occur when comparisons are affected by culture-specific casing rules. For example, in Turkish, the following example yields the wrong results because the file system in Turkish does not use linguistic casing rules for the letter "i" in "file".

_Code sample not included: ~/snippets/csharp/System/String/Compare/remarks.cs._

Compare the path name to "file" using an ordinal comparison. The correct code to do this is as follows:

_Code sample not included: ~/snippets/csharp/System/String/Compare/remarks.cs._

#### Examples
The following example demonstrates that the `Compare` method is equivalent to using `String.ToUpper` or `String.ToLower` when comparing strings.

_Code sample not included: ~/snippets/csharp/System/String/Compare/compare02.cs._

## String.Compare(String, String, StringComparison) method

```csharp
public static int Compare (string? strA, string? strB, StringComparison comparisonType);
```

Compares two specified `String` objects using the specified rules, and returns an integer that indicates their relative position in the sort order.

Parameters:

- `strA`: The first string to compare.
- `strB`: The second string to compare.
- `comparisonType`: One of the enumeration values that specifies the rules to use in the comparison.

Returns: A 32-bit signed integer that indicates the lexical relationship between the two comparands.

-  Less than zero

: `strA` precedes `strB` in the sort order.

-  Zero

: `strA` is in the same position as `strB` in the sort order.

-  Greater than zero

: `strA` follows `strB` in the sort order.

Exceptions:

- `ArgumentException`: `comparisonType` is not a `StringComparison` value.
- `NotSupportedException`: `StringComparison` is not supported.

#### Remarks
The `comparisonType` parameter indicates whether the comparison should use the current or invariant culture, honor or ignore the case of the comparands, or use word (culture-sensitive) or ordinal (culture-insensitive) sort rules.

One or both comparands can be `null`. By definition, any string, including the empty string (""), compares greater than a null reference; and two null references compare equal to each other.

The comparison terminates when an inequality is discovered or both strings have been compared. However, if the two strings compare equal to the end of one string, and the other string has characters remaining, the string with remaining characters is considered greater. The return value is the result of the last comparison performed.

Unexpected results can occur when comparisons are affected by culture-specific casing rules. For example, in Turkish, the following example yields the wrong results because the file system in Turkish does not use linguistic casing rules for the letter "i" in "file".

_Code sample not included: ~/snippets/csharp/System/String/Compare/remarks.cs._

Compare the path name to "file" using an ordinal comparison. The correct code to do this is as follows:

_Code sample not included: ~/snippets/csharp/System/String/Compare/remarks.cs._

#### Examples
The following example compares three versions of the letter "I". The results are affected by the choice of culture, whether case is ignored, and whether an ordinal comparison is performed.

_Code sample not included: ~/snippets/csharp/System/String/Compare/cmpcmp.cs._

## String.Compare(String, String, Boolean, CultureInfo) method

```csharp
public static int Compare (string? strA, string? strB, bool ignoreCase, System.Globalization.CultureInfo? culture);
```

Compares two specified `String` objects, ignoring or honoring their case, and using culture-specific information to influence the comparison, and returns an integer that indicates their relative position in the sort order.

Parameters:

- `strA`: The first string to compare.
- `strB`: The second string to compare.
- `ignoreCase`: `true` to ignore case during the comparison; otherwise, `false`.
- `culture`: An object that supplies culture-specific comparison information. If `culture` is `null`, the current culture is used.

Returns: A 32-bit signed integer that indicates the lexical relationship between the two comparands.

-  Less than zero

: `strA` precedes `strB` in the sort order.

-  Zero

: `strA` occurs in the same position as `strB` in the sort order.

-  Greater than zero

: `strA` follows `strB` in the sort order.

#### Remarks
The comparison uses the `culture` parameter to obtain culture-specific information such as casing rules and the alphabetic order of individual characters. For example, a culture could specify that certain combinations of characters be treated as a single character, or uppercase and lowercase characters be compared in a particular way, or that the sorting order of a character depends on the characters that precede or follow it.

The comparison is performed using word sort rules. For more information about word, string, and ordinal sorts, see `CompareOptions`.

One or both comparands can be `null`. By definition, any string, including the empty string (""), compares greater than a null reference; and two null references compare equal to each other.

The comparison terminates when an inequality is discovered or both strings have been compared. However, if the two strings compare equal to the end of one string, and the other string has characters remaining, then the string with remaining characters is considered greater. The return value is the result of the last comparison performed.

Unexpected results can occur when comparisons are affected by culture-specific casing rules. For example, in Turkish, the following example yields the wrong results because the file system in Turkish does not use linguistic casing rules for the letter "i" in "file".

_Code sample not included: ~/snippets/csharp/System/String/Compare/remarks.cs._

Compare the path name to "file" using an ordinal comparison. The correct code to do this is as follows:

_Code sample not included: ~/snippets/csharp/System/String/Compare/remarks.cs._

#### Examples
The following example demonstrates how culture can affect a comparison. In Czech - Czech Republic culture, "ch" is a single character that is greater than "d". However, in English - United States culture, "ch" consists of two characters, and "c" is less than "d".

_Code sample not included: ~/snippets/csharp/System/String/Compare/string.comp4.cs._

## String.Compare(String, String, CultureInfo, CompareOptions) method

```csharp
public static int Compare (string? strA, string? strB, System.Globalization.CultureInfo? culture, System.Globalization.CompareOptions options);
```

Compares two specified `String` objects using the specified comparison options and culture-specific information to influence the comparison, and returns an integer that indicates the relationship of the two strings to each other in the sort order.

Parameters:

- `strA`: The first string to compare.
- `strB`: The second string to compare.
- `culture`: The culture that supplies culture-specific comparison information. If `culture` is `null`, the current culture is used.
- `options`: Options to use when performing the comparison (such as ignoring case or symbols).

Returns: A 32-bit signed integer that indicates the lexical relationship between `strA` and `strB`, as shown in the following table

-  Less than zero

: `strA` precedes `strB` in the sort order.

-  Zero

: `strA` occurs in the same position as `strB` in the sort order.

-  Greater than zero

: `strA` follows `strB` in the sort order.

Exceptions:

- `ArgumentException`: `options` is not a `CompareOptions` value.

#### Remarks
The comparison uses the `culture` parameter to obtain culture-specific information, such as casing rules and the alphabetical order of individual characters. For example, a particular culture could specify that certain combinations of characters be treated as a single character, that uppercase and lowercase characters be compared in a particular way, or that the sort order of a character depends on the characters that precede or follow it.

> **Caution:**
> The `Compare` method is designed primarily for use in sorting or alphabetizing operations. It should not be used when the primary purpose of the method call is to determine whether two strings are equivalent (that is, when the purpose of the method call is to test for a return value of zero). To determine whether two strings are equivalent, call the `String.Equals` method.

The comparison can be further specified by the `options` parameter, which consists of one or more members of the `CompareOptions` enumeration. However, because the purpose of this method is to conduct a culture-sensitive string comparison, the `Ordinal` and `OrdinalIgnoreCase` values have no effect.

Either or both comparands can be `null`. By definition, any string, including `Empty`, compares greater than a null reference, and two null references compare equal to each other.

The comparison terminates when an inequality is discovered or both strings have been compared. However, if the two strings compare equal to the end of one string, and the other string has characters remaining, the string with the remaining characters is considered greater.

#### Examples
The following example compares two strings in three different ways: Use linguistic comparison for the en-US culture; using linguistic case-sensitive comparison for the en-US culture; and using an ordinal comparison. It illustrates how the three methods of comparison produce three different results.

_Code sample not included: ~/snippets/csharp/System/String/Compare/Example.cs._
