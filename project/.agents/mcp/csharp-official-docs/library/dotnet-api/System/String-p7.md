---
title: "String class (part 7 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 7 of 26)

## String.Compare(String, Int32, String, Int32, Int32, Boolean, CultureInfo) method

```csharp
public static int Compare (string? strA, int indexA, string? strB, int indexB, int length, bool ignoreCase, System.Globalization.CultureInfo? culture);
```

Compares substrings of two specified `String` objects, ignoring or honoring their case and using culture-specific information to influence the comparison, and returns an integer that indicates their relative position in the sort order.

Parameters:

- `strA`: The first string to use in the comparison.
- `indexA`: The position of the substring within `strA`.
- `strB`: The second string to use in the comparison.
- `indexB`: The position of the substring within `strB`.
- `length`: The maximum number of characters in the substrings to compare.
- `ignoreCase`: `true` to ignore case during the comparison; otherwise, `false`.
- `culture`: An object that supplies culture-specific comparison information. If `culture` is `null`, the current culture is used.

Returns: An integer that indicates the lexical relationship between the two comparands.

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

Either `strA` or `strB` is `null`, and `length` is greater than zero.

#### Remarks
The substrings to compare start in `strA` at `indexA`, and in `strB` at `indexB`. Both `indexA` and `indexB` are zero-based; that is, the first character in `strA` and `strB` is at position zero, not position one. The length of the first substring is equal to the length of `strA` minus `indexA` plus one. The length of the second substring is equal to the length of `strB` minus `indexB` plus one.

The number of characters to compare is the lesser of the lengths of the two substrings, and `length`. The `indexA`, `indexB`, and `length` parameters must be nonnegative.

The comparison uses the `culture` parameter to obtain culture-specific information such as casing rules and the alphabetic order of individual characters. For example, a culture could specify that certain combinations of characters be treated as a single character, or uppercase and lowercase characters be compared in a particular way, or that the sorting order of a character depends on the characters that precede or follow it.

The comparison is performed using word sort rules. For more information about word, string, and ordinal sorts, see `CompareOptions`.

One or both comparands can be `null`. By definition, any string, including the empty string (""), compares greater than a null reference; and two null references compare equal to each other.

The comparison terminates when an inequality is discovered or both substrings have been compared. However, if the two strings compare equal to the end of one string, and the other string has characters remaining, then the string with remaining characters is considered greater. The return value is the result of the last comparison performed.

Unexpected results can occur when comparisons are affected by culture-specific casing rules. For example, in Turkish, the following example yields the wrong results because the file system in Turkish does not use linguistic casing rules for the letter "i" in "file".

_Code sample not included: ~/snippets/csharp/System/String/Compare/remarks.cs._

Compare the path name to "file" using an ordinal comparison. The correct code to do this is as follows:

_Code sample not included: ~/snippets/csharp/System/String/Compare/remarks.cs._

#### Examples
The following example compares two substrings using different cultures and ignoring the case of the substrings. The choice of culture affects how the letter "I" is compared.

_Code sample not included: ~/snippets/csharp/System/String/Compare/comp5.cs._

## String.Compare(String, Int32, String, Int32, Int32, CultureInfo, CompareOptions) method

```csharp
public static int Compare (string? strA, int indexA, string? strB, int indexB, int length, System.Globalization.CultureInfo? culture, System.Globalization.CompareOptions options);
```

Compares substrings of two specified `String` objects using the specified comparison options and culture-specific information to influence the comparison, and returns an integer that indicates the relationship of the two substrings to each other in the sort order.

Parameters:

- `strA`: The first string to use in the comparison.
- `indexA`: The starting position of the substring within `strA`.
- `strB`: The second string to use in the comparison.
- `indexB`: The starting position of the substring within `strB`.
- `length`: The maximum number of characters in the substrings to compare.
- `culture`: An object that supplies culture-specific comparison information. If `culture` is `null`, the current culture is used.
- `options`: Options to use when performing the comparison (such as ignoring case or symbols).

Returns: An integer that indicates the lexical relationship between the two substrings, as shown in the following table.

-  Less than zero

:  The substring in `strA` precedes the substring in `strB` in the sort order.

-  Zero

:  The substrings occur in the same position in the sort order, or `length` is zero.

-  Greater than zero

:  The substring in `strA` follows the substring in `strB` in the sort order.

Exceptions:

- `ArgumentException`: `options` is not a `CompareOptions` value.
- `ArgumentOutOfRangeException`: `indexA` is greater than `strA``.Length`.

-or-

`indexB` is greater than `strB``.Length`.

-or-

`indexA`, `indexB`, or `length` is negative.

-or-

Either `strA` or `strB` is `null`, and `length` is greater than zero.

#### Remarks
The substrings to compare start in `strA` at position `indexA` and in `strB` at position `indexB`. The length of the first substring is the length of `strA` minus `indexA`. The length of the second substring is the length of `strB` minus `indexB`.

The number of characters to compare is the lesser of the lengths of the two substrings, and `length`. The `indexA`, `indexB`, and `length` parameters must be nonnegative.

The comparison uses the `culture` parameter to obtain culture-specific information, such as casing rules and the alphabetical order of individual characters. For example, a particular culture could specify that certain combinations of characters be treated as a single character, that uppercase and lowercase characters be compared in a particular way, or that the sort order of a character depends on the characters that precede or follow it.

> **Caution:**
> The `Compare` method is designed primarily for use in sorting or alphabetizing operations. It should not be used when the primary purpose of the method call is to determine whether two substrings are equivalent (that is, when the purpose of the method call is to test for a return value of zero). To determine whether two strings are equivalent, call the `String.Equals` method.

One or both of `strA` and `strB` can be `null`. By definition, any string, including `Empty`, compares greater than a null reference, and two null references compare equal to each other.

The comparison can be further specified by the `options` parameter, which consists of one or more members of the `CompareOptions` enumeration. However, because the purpose of this method is to conduct a culture-sensitive string comparison, the `Ordinal` and `OrdinalIgnoreCase` values have no effect.

The comparison terminates when an inequality is discovered or both substrings have been compared. However, if the two strings compare equal to the end of one string, and the other string has characters remaining, the string with the remaining characters is considered greater. The return value is the result of the last comparison performed.

#### Examples
The following example uses the `Compare` method to compare the last names of two people. It then lists them in alphabetical order.

_Code sample not included: ~/snippets/csharp/System/String/Compare/Example1.cs._

## String.CompareOrdinal(String, String) method

```csharp
public static int CompareOrdinal (string? strA, string? strB);
```

Compares two specified `String` objects by evaluating the numeric values of the corresponding `Char` objects in each string.

Parameters:

- `strA`: The first string to compare.
- `strB`: The second string to compare.

Returns: An integer that indicates the lexical relationship between the two comparands.

-  Less than zero

: `strA` is less than `strB`.

-  Zero

: `strA` and `strB` are equal.

-  Greater than zero

: `strA` is greater than `strB`.

#### Remarks
This method performs a case-sensitive comparison using ordinal sort rules. For more information about word, string, and ordinal sorts, see `CompareOptions`. To perform a case-insensitive comparison using ordinal sort rules, call the `Compare` method with the `comparisonType` argument set to `OrdinalIgnoreCase`.

Because `CompareOrdinal` is a static method, `strA` and `strB` can be `null`. If both values are `null`, the method returns 0 (zero), which indicates that `strA` and `strB` are equal. If only one of the values is `null`, the method considers the non-null value to be greater.

#### Examples
The following example performs and ordinal comparison of two strings that only differ in case.

_Code sample not included: ~/snippets/csharp/System/String/CompareOrdinal/comp0.cs._

## String.CompareOrdinal(String, Int32, String, Int32, Int32) method

```csharp
public static int CompareOrdinal (string? strA, int indexA, string? strB, int indexB, int length);
```

Compares substrings of two specified `String` objects by evaluating the numeric values of the corresponding `Char` objects in each substring.

Parameters:

- `strA`: The first string to use in the comparison.
- `indexA`: The starting index of the substring in `strA`.
- `strB`: The second string to use in the comparison.
- `indexB`: The starting index of the substring in `strB`.
- `length`: The maximum number of characters in the substrings to compare.

Returns: A 32-bit signed integer that indicates the lexical relationship between the two comparands.

-  Less than zero

:  The substring in `strA` is less than the substring in `strB`.

-  Zero

:  The substrings are equal, or `length` is zero.

-  Greater than zero

:  The substring in `strA` is greater than the substring in `strB`.

Exceptions:

- `ArgumentOutOfRangeException`: `strA` is not `null` and `indexA` is greater than `strA`.`String.Length`.

-or-

`strB` is not `null` and `indexB` is greater than `strB`.`String.Length`.

-or-

`indexA`, `indexB`, or `length` is negative.

#### Remarks
The `indexA`, `indexB`, and `length` parameters must be nonnegative.

The number of characters compared is the lesser of the length of `strA` less `indexA`, the length of `strB` less `indexB`, and `length`.

This method performs a case-sensitive comparison using ordinal sort rules. For more information about word, string, and ordinal sorts, see `CompareOptions`. To perform a case-insensitive comparison using ordinal sort rules, call the `Compare` method with the `comparisonType` argument set to `OrdinalIgnoreCase`.

Because `CompareOrdinal` is a static method, `strA` and `strB` can be `null`. If both values are `null`, the method returns 0 (zero), which indicates that `strA` and `strB` are equal. If only one of the values is `null`, the method considers the non-null value to be greater.

#### Examples
This following example demonstrates that `String.CompareOrdinal` and `String.Compare` use different sort orders.

_Code sample not included: ~/snippets/csharp/System/String/CompareOrdinal/stringcompareordinal.cs._

## String.CompareTo(Object) method

```csharp
public int CompareTo (object? value);
```

Compares this instance with a specified `Object` and indicates whether this instance precedes, follows, or appears in the same position in the sort order as the specified `Object`.

Parameters:

- `value`: An object that evaluates to a `String`.

Returns: A 32-bit signed integer that indicates whether this instance precedes, follows, or appears in the same position in the sort order as the `value` parameter.

-  Less than zero

:  This instance precedes `value`.

-  Zero

:  This instance has the same position in the sort order as `value`.

-  Greater than zero

:  This instance follows `value`.

-or-

`value` is `null`.

Exceptions:

- `ArgumentException`: `value` is not a `String`.

#### Remarks
`value` must be a `String` object.

> **Caution:**
> The `String.CompareTo` method was designed primarily for use in sorting or alphabetizing operations. It should not be used when the primary purpose of the method call is to determine whether two strings are equivalent. To determine whether two strings are equivalent, call the `String.Equals` method.

This method performs a word (case-sensitive and culture-sensitive) comparison using the current culture. For more information about word, string, and ordinal sorts, see `CompareOptions`.

For more information about the behavior of this method, see the Remarks section of the `Compare` method.

#### Examples
The following example uses the `String.CompareTo` method with an `Object`. Because it attempts to compare a `String` instance to a `TestClass` object, the method throws an `ArgumentException`.

_Code sample not included: ~/snippets/csharp/System/String/CompareTo/extostring.cs._
