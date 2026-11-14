---
title: "String class (part 25 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 25 of 26)

## String.ToCharArray(Int32, Int32) method

```csharp
public char[] ToCharArray (int startIndex, int length);
```

Copies the characters in a specified substring in this instance to a Unicode character array.

Parameters:

- `startIndex`: The starting position of a substring in this instance.
- `length`: The length of the substring in this instance.

Returns: A Unicode character array whose elements are the `length` number of characters in this instance starting from character position `startIndex`.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` or `length` is less than zero.

-or-

`startIndex` plus `length` is greater than the length of this instance.

#### Remarks
This method copies the characters in a portion of a string to a character array. To create a string from a range of characters in a character array, call the  `%23ctor` constructor.

The `startIndex` parameter is zero-based. That is, the index of the first character in the string instance is zero.

If `length` is zero, the returned array is empty and has a zero length. If this instance is `null` or an empty string (""), the returned array is empty and has a zero length.

To create a byte array that contains the encoded characters in a portion of a string, instantiate the appropriate `Encoding` object and call its `GetBytes` method. Some of the standard encodings available in .NET include:

|Encoding|Object|
|--------------|------------|
|ASCII|`ASCIIEncoding`|
|UTF-7|`UTF7Encoding`|
|UTF-8|`UTF8Encoding`|
|UTF-16|`UnicodeEncoding`|
|UTF-32|`UTF32Encoding`|

For more information, see Character Encoding in .NET.

#### Examples
The following example converts a substring within a string to an array of characters, then enumerates and displays the elements of the array.

_Code sample not included: ~/snippets/csharp/System/String/ToCharArray/tocharry1.cs._

## String.ToLower() method

```csharp
public string ToLower ();
```

Returns a copy of this string converted to lowercase.

Returns: A string in lowercase.

#### Remarks

This method takes into account the casing rules of the current culture.

> **Note:**
> This method does not modify the value of the current instance. Instead, it returns a new string in which all characters in the current instance are converted to lowercase.

The casing operation that results from calling the `ToLower` method takes the casing conventions of the current culture into account. If you need the lowercase or uppercase version of an operating system identifier, such as a file name, named pipe, or registry key, use the `String.ToLowerInvariant` or `String.ToUpperInvariant` methods. This produces the same result in every culture (unlike the `ToLower` method) and performs more efficiently.

The following example converts several mixed case strings to lowercase.

_Code sample not included: ~/snippets/csharp/System/String/ToLower/stringtolower.cs._

## String.ToLower(CultureInfo) method

```csharp
public string ToLower (System.Globalization.CultureInfo? culture);
```

Returns a copy of this string converted to lowercase, using the casing rules of the specified culture.

Parameters:

- `culture`: An object that supplies culture-specific casing rules. If `culture` is `null`, the current culture is used.

Returns: The lowercase equivalent of the current string.

#### Remarks

The casing rules of the culture specified by the `culture` parameter determine the way the case of the string is changed.

> **Note:**
> This method does not modify the value of the current instance. Instead, it returns a new string in which all characters in the current instance are converted to lowercase.

If you pass the `ToLower` method a `CultureInfo` object other than `CultureInfo.InvariantCulture`, the casing operation will take culture-specific rules into account. If you need the lowercase or uppercase version of an operating system identifier, such as a file name, named pipe, or registry key, use the `String.ToLowerInvariant` or `String.ToUpperInvariant` method. This produces the same result in every culture and performs more efficiently.

The following example converts two strings of uppercase characters to lowercase characters using the English-United States and Turkish-Turkey <example-value>, then compares the lowercase strings. The uppercase strings are identical except that for each occurrence of the Unicode LATIN CAPITAL LETTER I in one string, the other string contains LATIN CAPITAL LETTER I WITH DOT ABOVE.

_Code sample not included: ~/snippets/csharp/System/String/ToLower/tolower.cs._

## String.ToLowerInvariant() method

```csharp
public string ToLowerInvariant ();
```

Returns a copy of this `String` object converted to lowercase using the casing rules of the invariant culture.

Returns: The lowercase equivalent of the current string.

#### Remarks
The invariant culture represents a culture that is culture-insensitive. It is associated with the English language but not with a specific country or region. For more information, see the `InvariantCulture` property.

If your application depends on the case of a string changing in a predictable way that is unaffected by the current culture, use the `String.ToLowerInvariant` method. The `String.ToLowerInvariant` method is equivalent to `ToLower(CultureInfo.InvariantCulture)`. The method is recommended when a collection of strings must appear in a predictable order in a user interface control.

> **Note:**
> This method does not modify the value of the current instance. Instead, it returns a new string in which all characters in the current instance are converted to lowercase.

If you need the lowercase or uppercase version of an operating system identifier, such as a file name, named pipe, or registry key, use the `String.ToLowerInvariant` or `String.ToUpperInvariant` methods.

#### Examples
The following example defines a string array that contains a single word in a number of languages. The `String.ToLowerInvariant` method is used to populate the elements of a parallel array with the case-insensitive version of each word. The `Sort<T1,T2>` method is used to sort the case-sensitive array based on the order of elements in the lowercase array to ensure that elements appear in the same order regardless of language.

_Code sample not included: ~/snippets/csharp/System/String/ToLowerInvariant/tolowerinvariant.cs._

## String.ToLowerOrdinal() method

```csharp
public string ToLowerOrdinal ();
```

To be added.

Returns: To be added.

To be added.

## String.ToString() method

```csharp
public override string ToString ();
```

Returns this instance of `String`; no actual conversion is performed.

Returns: The current string.

#### Remarks
Because this method simply returns the current string unchanged, there is no need to call it directly. It is usually called implicitly in a composite formatting operation, as the example shows.

#### Examples
The following example demonstrates the `String.ToString` method.Note that the example does not explicitly call the `String.ToString` method. Instead, the method is called implicitly by the composite formatting feature.

_Code sample not included: ~/snippets/csharp/System/String/ToString/string.tostring.cs._

## String.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Returns this instance of `String`; no actual conversion is performed.

Parameters:

- `provider`: (Reserved) An object that supplies culture-specific formatting information.

Returns: The current string.

#### Remarks
`provider` is reserved, and does not currently participate in this operation.

Because this method simply returns the current string unchanged, there is no need to call it directly.

## String.ToUpper() method

```csharp
public string ToUpper ();
```

Returns a copy of this string converted to uppercase.

Returns: The uppercase equivalent of the current string.

#### Remarks
This method uses the casing rules of the current culture to convert each character in the current instance to its uppercase equivalent. If a character does not have an uppercase equivalent, it is included unchanged in the returned string.

> **Note:**
> This method does not modify the value of the current instance. Instead, it returns a new string in which all characters in the current instance are converted to uppercase.

The `String.ToUpper` method is often used to convert a string to uppercase so that it can be used in a case-insensitive comparison. A better method to perform case-insensitive comparison is to call a string comparison method that has a `StringComparison` parameter whose value you set to `CurrentCultureIgnoreCase` for a culture-sensitive, case-insensitive comparison.

The casing operation that results from calling the `ToUpper` method takes the casing conventions of the current culture into account. If you need the lowercase or uppercase version of an operating system identifier, such as a file name, named pipe, or registry key, use the `String.ToLowerInvariant` or `String.ToUpperInvariant` method. This produces the same result in every culture (unlike the `ToUpper` method) and performs more efficiently.

The following example calls the `String.ToUpper` method to convert a series of one-character strings that contain each character in the Basic Latin, Latin-1 Supplement, and Latin Extended-A character sets. It then displays each string whose uppercase character is different from its lowercase character.

_Code sample not included: ~/snippets/csharp/System/String/ToUpper/ToUpperEx.cs._

## String.ToUpper(CultureInfo) method

```csharp
public string ToUpper (System.Globalization.CultureInfo? culture);
```

Returns a copy of this string converted to uppercase, using the casing rules of the specified culture.

Parameters:

- `culture`: An object that supplies culture-specific casing rules. If `culture` is `null`, the current culture is used.

Returns: The uppercase equivalent of the current string.

#### Remarks
The casing rules of the culture specified by the `culture` parameter determine the way the case of a string is changed.

> **Note:**
> This method does not modify the value of the current instance. Instead, it returns a new string in which all characters in the current instance are converted to uppercase.

If you pass the `ToUpper` method a `CultureInfo` object other than `CultureInfo.InvariantCulture`, the casing operation will take culture-specific rules into account. If you need the lowercase or uppercase version of an operating system identifier, such as a file name, named pipe, or registry key, use the `String.ToLowerInvariant` or `String.ToUpperInvariant` method. This produces the same result in every culture and performs more efficiently.

The following example converts a string of lowercase characters to two strings of uppercase characters using the English-United States and Turkish-Turkey <example-value>, then compares the uppercase strings. The uppercase strings are identical except that for each occurrence of the Unicode LATIN CAPITAL LETTER I in one string, the other string contains LATIN CAPITAL LETTER I WITH DOT ABOVE.

_Code sample not included: ~/snippets/csharp/System/String/ToUpper/toupper.cs._

## String.ToUpperInvariant() method

```csharp
public string ToUpperInvariant ();
```

Returns a copy of this `String` object converted to uppercase using the casing rules of the invariant culture.

Returns: The uppercase equivalent of the current string.

#### Remarks
The invariant culture represents a culture that is culture-insensitive. It is associated with the English language but not with a specific country or region. For more information, see the `InvariantCulture` property.

If your application depends on the case of a string changing in a predictable way that is unaffected by the current culture, use the `String.ToUpperInvariant` method. The `String.ToUpperInvariant` method is equivalent to `ToUpper(CultureInfo.InvariantCulture)`. The method is recommended when a collection of strings must appear in a predictable order in a user interface control.

> **Note:**
> This method does not modify the value of the current instance. Instead, it returns a new string in which all characters in the current instance are converted to uppercase.

If you need the lowercase or uppercase version of an operating system identifier, such as a file name, named pipe, or registry key, use the `String.ToLowerInvariant` or `String.ToUpperInvariant` methods.

The following example defines a string array that contains a single word in a number of languages. The `String.ToUpperInvariant` method is used to populate the elements of a parallel array with the case-insensitive version of each word. The `Sort<T1,T2>` method is used to sort the case-sensitive array based on the order of elements in the uppercase array to ensure that elements appear in the same order regardless of language.

_Code sample not included: ~/snippets/csharp/System/String/ToUpperInvariant/toupperinvariant.cs._

## String.ToUpperOrdinal() method

```csharp
public string ToUpperOrdinal ();
```

To be added.

Returns: To be added.

To be added.

## String.Trim() method

```csharp
public string Trim ();
```

Removes all leading and trailing white-space characters from the current string.

Returns: The string that remains after all white-space characters are removed from the start and end of the current string. If no characters can be trimmed from the current instance, the method returns the current instance unchanged.

#### Remarks

The `Trim` method removes from the current string all leading and trailing white-space characters. Each leading and trailing trim operation stops when a non-white-space character is encountered. For example, if the current string is "   abc   xyz    ", the `Trim` method returns "abc   xyz". To remove white-space characters between words in a string, use .NET Regular Expressions.

> **Note:**
> If the `Trim` method removes any characters from the current instance, this method does not modify the value of the current instance. Instead, it returns a new string in which all leading and trailing white space characters found in the current instance are removed.

If the current string equals `Empty` or all the characters in the current instance consist of white-space characters, the method returns `Empty`.

White-space characters are defined by the Unicode standard. The `Trim` method removes any leading and trailing characters that produce a return value of `true` when they are passed to the `Char.IsWhiteSpace` method.

#### Examples

The following example uses the `Trim` method to remove any extra white space from strings entered by the user before concatenating them.

_Code sample not included: ~/snippets/csharp/System/String/Trim/Trim2.cs._
