---
title: "String class (part 18 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 18 of 26)

## String.LastIndexOfAny(Char[], Int32, Int32) method

```csharp
public int LastIndexOfAny (char[] anyOf, int startIndex, int count);
```

Reports the zero-based index position of the last occurrence in this instance of one or more characters specified in a Unicode array. The search starts at a specified character position and proceeds backward toward the beginning of the string for a specified number of character positions.

Parameters:

- `anyOf`: A Unicode character array containing one or more characters to seek.
- `startIndex`: The search starting position. The search proceeds from `startIndex` toward the beginning of this instance.
- `count`: The number of character positions to examine.

Returns: The index position of the last occurrence in this instance where any character in `anyOf` was found; -1 if no character in `anyOf` was found or if the current instance equals `String.Empty`.

Exceptions:

- `ArgumentNullException`: `anyOf` is `null`.
- `ArgumentOutOfRangeException`: The current instance does not equal `String.Empty`, and `count` or `startIndex` is negative.

-or-

The current instance does not equal `String.Empty`, and `startIndex` minus `count` + 1 is less than zero.

#### Remarks
Index numbering starts from zero.

This method begins searching at the `startIndex` character position of this instance and proceeds backward toward the beginning until either a character in `anyOf` is found or `count` character positions have been examined. The search is case-sensitive.

This method performs an ordinal (culture-insensitive) search, where a character is considered equivalent to another character only if their Unicode scalar values are the same. To perform a culture-sensitive search, use the `CompareInfo.LastIndexOf` method, where a Unicode scalar value representing a precomposed character, such as the ligature "Æ" (U+00C6), might be considered equivalent to any occurrence of the character's components in the correct sequence, such as "AE" (U+0041, U+0045), depending on the culture.

#### Examples
The following example finds the index of the last occurrence of any character in the string "aid" within a substring of another string.

_Code sample not included: ~/snippets/csharp/System/String/LastIndexOfAny/lastixany3.cs._

## String.Normalize() method

```csharp
public string Normalize ();
```

Returns a new string whose textual value is the same as this string, but whose binary representation is in Unicode normalization form C.

Returns: A new, normalized string whose textual value is the same as this string, but whose binary representation is in normalization form C.

Exceptions:

- `ArgumentException`: The current instance contains invalid Unicode characters.

#### Remarks
Some Unicode characters have multiple equivalent binary representations consisting of sets of combining and/or composite Unicode characters. For example, any of the following code points can represent the letter "ắ":

- U+1EAF

- U+0103 U+0301

- U+0061 U+0306 U+0301

The existence of multiple representations for a single character complicates searching, sorting, matching, and other operations.

The Unicode standard defines a process called normalization that returns one binary representation when given any of the equivalent binary representations of a character. Normalization can be performed with several algorithms, called normalization forms, that obey different rules. .NET supports the four normalization forms (C, D, KC, and KD) that are defined by the Unicode standard. When two strings are represented in the same normalization form, they can be compared by using ordinal comparison.

To normalize and compare two strings, do the following:

1.  Obtain the strings to be compared from an input source, such as a file or a user input device.

2.  Call the `Normalize` method to normalize the strings to normalization form C.

3.  To compare two strings, call a method that supports ordinal string comparison, such as the `Compare` method, and supply a value of `Ordinal` or `OrdinalIgnoreCase` as the `StringComparison` argument. To sort an array of normalized strings, pass a `comparer` value of `StringComparer.Ordinal` or `StringComparer.OrdinalIgnoreCase` to an appropriate overload of `Array.Sort`.

4.  Emit the strings in the sorted output based on the order indicated by the previous step.

For a description of supported Unicode normalization forms, see `NormalizationForm`.

## String.Normalize(NormalizationForm) method

```csharp
public string Normalize (System.Text.NormalizationForm normalizationForm);
```

Returns a new string whose textual value is the same as this string, but whose binary representation is in the specified Unicode normalization form.

Parameters:

- `normalizationForm`: A Unicode normalization form.

Returns: A new string whose textual value is the same as this string, but whose binary representation is in the normalization form specified by the `normalizationForm` parameter.

Exceptions:

- `ArgumentException`: The current instance contains invalid Unicode characters.

#### Remarks
Some Unicode characters have multiple equivalent binary representations consisting of sets of combining and/or composite Unicode characters. The existence of multiple representations for a single character complicates searching, sorting, matching, and other operations.

The Unicode standard defines a process called normalization that returns one binary representation when given any of the equivalent binary representations of a character. Normalization can be performed with several algorithms, called normalization forms, that obey different rules. .NET supports the four normalization forms (C, D, KC, and KD) that are defined by the Unicode standard. When two strings are represented in the same normalization form, they can be compared by using ordinal comparison.

To normalize and compare two strings, do the following:

1.  Obtain the strings to be compared from an input source, such as a file or a user input device.

2.  Call the `Normalize` method to normalize the strings to a specified normalization form.

3.  To compare two strings, call a method that supports ordinal string comparison, such as the `Compare` method, and supply a value of `Ordinal` or `OrdinalIgnoreCase` as the `StringComparison` argument. To sort an array of normalized strings, pass a `comparer` value of `StringComparer.Ordinal` or `StringComparer.OrdinalIgnoreCase` to an appropriate overload of `Array.Sort`.

4.  Emit the strings in the sorted output based on the order indicated by the previous step.

For a description of supported Unicode normalization forms, see `NormalizationForm`.

## String.op_Equality(String, String) method

```csharp
public static bool operator == (string? a, string? b);
```

Determines whether two specified strings have the same value.

Parameters:

- `a`: The first string to compare, or `null`.
- `b`: The second string to compare, or `null`.

Returns: `true` if the value of `a` is the same as the value of `b`; otherwise, `false`.

#### Remarks
The `String.op_Equality` method defines the operation of the equality operator for the `String` class. It enables code such as that shown in the Example section. The operator, in turn, calls the static `Equals` method, which performs an ordinal (case-sensitive and culture-insensitive) comparison.

> **Note:**
> The Visual Basic <example-value> does not resolve the equality operator as a call to the `String.op_Equality` method. Instead, the equality operator wraps a call to the `Operators.CompareString` method.

#### Examples
The following example demonstrates the equality operator.

_Code sample not included: ~/snippets/csharp/System/String/op_Equality/equalityop.cs._

## String.op_Implicit(String) method

```csharp
public static implicit operator ReadOnlySpan<char> (string? value);
```

Defines an implicit conversion of a given string to a read-only span of characters.

Parameters:

- `value`: A string to implicitly convert.

Returns: A new read-only span of characters representing the string.

To be added.

## String.op_Inequality(String, String) method

```csharp
public static bool operator != (string? a, string? b);
```

Determines whether two specified strings have different values.

Parameters:

- `a`: The first string to compare, or `null`.
- `b`: The second string to compare, or `null`.

Returns: `true` if the value of `a` is different from the value of `b`; otherwise, `false`.

#### Remarks
The `String.op_Inequality` method defines the operation of the inequality operator for the `String` class.   It enables code such as that shown in the Examples section.

The `String.op_Inequality` operator in turn calls the static `Equals` method, which  performs an ordinal (case-sensitive and culture-insensitive) comparison.

> **Note:**
> The Visual Basic <example-value> does not resolve the inequality operator as a call to the `String.op_Inequality` method. Instead, the inequality operator wraps a call to the `Operators.CompareString` method.

#### Examples
The following example demonstrates the inequality operator.

_Code sample not included: ~/snippets/csharp/System/String/op_Inequality/inequalityop.cs._

## String.PadLeft(Int32) method

```csharp
public string PadLeft (int totalWidth);
```

Returns a new string that right-aligns the characters in this instance by padding them with spaces on the left, for a specified total length.

Parameters:

- `totalWidth`: The number of characters in the resulting string, equal to the number of original characters plus any additional padding characters.

Returns: A new string that is equivalent to this instance, but right-aligned and padded on the left with as many spaces as needed to create a length of `totalWidth`. However, if `totalWidth` is less than the length of this instance, the method returns a reference to the existing instance. If `totalWidth` is equal to the length of this instance, the method returns a new string that is identical to this instance.

Exceptions:

- `ArgumentOutOfRangeException`: `totalWidth` is less than zero.

#### Remarks
A Unicode space is defined as hexadecimal 0x0020.

The `PadLeft` method pads the beginning of the returned string. This means that, when used with right-to-left languages, it pads the right portion of the string.

> **Note:**
> If the `String.PadLeft` method pads the current instance with white-space characters, this method does not modify the value of the current instance. Instead, it returns a new string that is padded with leading white space so that its total length is `totalWidth` characters.

#### Examples
The following example demonstrates the `String.PadLeft` method.

_Code sample not included: ~/snippets/csharp/System/String/PadLeft/source.cs._

## String.PadLeft(Int32, Char) method

```csharp
public string PadLeft (int totalWidth, char paddingChar);
```

Returns a new string that right-aligns the characters in this instance by padding them on the left with a specified Unicode character, for a specified total length.

Parameters:

- `totalWidth`: The number of characters in the resulting string, equal to the number of original characters plus any additional padding characters.
- `paddingChar`: A Unicode padding character.

Returns: A new string that is equivalent to this instance, but right-aligned and padded on the left with as many `paddingChar` characters as needed to create a length of `totalWidth`. However, if `totalWidth` is less than the length of this instance, the method returns a reference to the existing instance. If `totalWidth` is equal to the length of this instance, the method returns a new string that is identical to this instance.

Exceptions:

- `ArgumentOutOfRangeException`: `totalWidth` is less than zero.

#### Remarks
The `PadLeft` method pads the beginning of the returned string. This means that, when used with right-to-left languages, it pads the right portion of the string.

> **Note:**
> If the `String.PadLeft` method pads the current instance with white-space characters, this method does not modify the value of the current instance. Instead, it returns a new string that is padded with leading `paddingChar` characters so that its total length is `totalWidth` characters.

#### Examples
The following example demonstrates the `String.PadLeft` method.

_Code sample not included: ~/snippets/csharp/System/String/PadLeft/source1.cs._

## String.PadRight(Int32) method

```csharp
public string PadRight (int totalWidth);
```

Returns a new string that left-aligns the characters in this string by padding them with spaces on the right, for a specified total length.

Parameters:

- `totalWidth`: The number of characters in the resulting string, equal to the number of original characters plus any additional padding characters.

Returns: A new string that is equivalent to this instance, but left-aligned and padded on the right with as many spaces as needed to create a length of `totalWidth`. However, if `totalWidth` is less than the length of this instance, the method returns a reference to the existing instance. If `totalWidth` is equal to the length of this instance, the method returns a new string that is identical to this instance.

Exceptions:

- `ArgumentOutOfRangeException`: `totalWidth` is less than zero.

#### Remarks
A Unicode space is defined as hexadecimal 0x0020.

The `PadRight` method pads the end of the returned string. This means that, when used with right-to-left languages, it pads the left portion of the string.

> **Note:**
> If the `String.PadRight` method pads the current instance with white-space characters, this method does not modify the value of the current instance. Instead, it returns a new string that is padded with trailing white space so that its total length is `totalWidth` characters.

#### Examples
The following example demonstrates the `String.PadRight` method.

_Code sample not included: ~/snippets/csharp/System/String/PadRight/source.cs._
