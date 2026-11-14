---
title: "String class (part 23 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 23 of 26)

## String.StartsWith(String, StringComparison) method

```csharp
public bool StartsWith (string value, StringComparison comparisonType);
```

Determines whether the beginning of this string instance matches the specified string when compared using the specified comparison option.

Parameters:

- `value`: The string to compare.
- `comparisonType`: One of the enumeration values that determines how this string and `value` are compared.

Returns: `true` if this instance begins with `value`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentException`: `comparisonType` is not a `StringComparison` value.

#### Remarks
The `String.StartsWith` method compares the `value` parameter to the substring at the beginning of this string and returns a value that indicates whether they are equal. To be equal, `value` must be a reference to this same string, must be the empty string (""), or must match the beginning of this string. The type of comparison performed by the `String.StartsWith` method depends on the value of the `comparisonType` parameter. The comparison can use the conventions of the current culture (`CurrentCulture` and `CurrentCultureIgnoreCase`) or the invariant culture (`InvariantCulture` and `InvariantCultureIgnoreCase`), or it can consist of a character-by-character comparison of code points (`Ordinal` or `OrdinalIgnoreCase`). The comparison can also be case-sensitive (`CurrentCulture`, `InvariantCulture`, or `Ordinal`), or it can ignore case (`CurrentCultureIgnoreCase`, `InvariantCultureIgnoreCase`, `OrdinalIgnoreCase`).

#### Examples
The following example searches for the string "the" at the beginning of a longer string that begins with the word "The". As the output from the example shows, a call to the `StartsWith` method that performs a culture-insensitive but case-sensitive comparison fails to match the string, while a call that performs a culture- and case-insensitive comparison matches the string.

_Code sample not included: ~/snippets/csharp/System/String/StartsWith/StartsWith2.cs._

The following example determines whether a string starts with a particular substring. It initializes a two-dimensional string array. The first element in the second dimension contains a string, and the second element contains the string to search for at the start of the first string. The results are affected by the choice of culture, whether case is ignored, and whether an ordinal comparison is performed. Note that when the string instance contains a ligature, culture-sensitive comparisons with its consecutive characters successfully match.

_Code sample not included: ~/snippets/csharp/System/String/StartsWith/startswith1.cs._

## String.StartsWith(Rune, StringComparison) method

```csharp
public bool StartsWith (System.Text.Rune value, StringComparison comparisonType);
```

To be added.

Parameters:

- `value`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.

## String.StartsWith(String, Boolean, CultureInfo) method

```csharp
public bool StartsWith (string value, bool ignoreCase, System.Globalization.CultureInfo? culture);
```

Determines whether the beginning of this string instance matches the specified string when compared using the specified culture.

Parameters:

- `value`: The string to compare.
- `ignoreCase`: `true` to ignore case during the comparison; otherwise, `false`.
- `culture`: Cultural information that determines how this string and `value` are compared. If `culture` is `null`, the current culture is used.

Returns: `true` if the `value` parameter matches the beginning of this string; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Remarks
This method compares the `value` parameter to the substring at the beginning of this string that is the same length as `value`, and returns a value that indicates whether they are equal. To be equal, `value` must be an empty string (`Empty`), must be a reference to this same instance, or must match the beginning of this instance.

This method performs a comparison using the specified casing and culture.

#### Examples
The following example determines whether a string occurs at the beginning of another string. The `String.StartsWith` method is called several times using case sensitivity, case insensitivity, and different cultures that influence the results of the search.

_Code sample not included: ~/snippets/csharp/System/String/StartsWith/swci.cs._

## String.Substring(Int32) method

```csharp
public string Substring (int startIndex);
```

Retrieves a substring from this instance. The substring starts at a specified character position and continues to the end of the string.

Parameters:

- `startIndex`: The zero-based starting character position of a substring in this instance.

Returns: A string that is equivalent to the substring that begins at `startIndex` in this instance, or `String.Empty` if `startIndex` is equal to the length of this instance.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` is less than zero or greater than the length of this instance.

#### Remarks
You call the `Substring` method to extract a substring from a string that begins at a specified character position and ends at the end of the string. The starting character position is zero-based; in other words, the first character in the string is at index 0, not index 1. To extract a substring that begins at a specified character position and ends before the end of the string, call the `Substring` method.

> **Note:**
> This method does not modify the value of the current instance. Instead, it returns a new string that begins at the `startIndex` position in the current string.

To extract a substring that begins with a particular character or character sequence, call a method such as `String.IndexOf` or `String.IndexOf` to get the value of `startIndex`. The second example illustrates this; it extracts a key value that begins one character position after the `=` character.

If `startIndex` is equal to zero, the method returns the original string unchanged.

#### Examples
The following example demonstrates obtaining a substring from a string.

_Code sample not included: ~/snippets/csharp/System/String/Substring/Substring10.cs._

The following example uses the `String.Substring` method to separate key/value pairs that are delimited by an equals (`=`) character.

_Code sample not included: ~/snippets/csharp/System/String/Substring/Substring1.cs._

The `String.IndexOf` method is used to get the position of the equals character in the string. The call to the `Substring` method extracts the key name, which starts from the first character in the string and extends for the number of characters returned by the call to the `String.IndexOf` method. The call to the `Substring` method then extracts the value assigned to the key. It starts at one character position beyond the equals character and extends to the end of the string.

## String.Substring(Int32, Int32) method

```csharp
public string Substring (int startIndex, int length);
```

Retrieves a substring from this instance. The substring starts at a specified character position and has a specified length.

Parameters:

- `startIndex`: The zero-based starting character position of a substring in this instance.
- `length`: The number of characters in the substring.

Returns: A string that is equivalent to the substring of length `length` that begins at `startIndex` in this instance, or `String.Empty` if `startIndex` is equal to the length of this instance and `length` is zero.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` plus `length` indicates a position not within this instance.

-or-

`startIndex` or `length` is less than zero.

#### Remarks
You call the `Substring` method to extract a substring from a string that begins at a specified character position and ends before the end of the string. The starting character position is zero-based; in other words, the first character in the string is at index 0, not index 1. To extract a substring that begins at a specified character position and continues to the end of the string, call the `Substring` method.

> **Note:**
> This method does not modify the value of the current instance. Instead, it returns a new string with `length` characters starting from the `startIndex` position in the current string.

The `length` parameter represents the total number of characters to extract from the current string instance. This includes the starting character found at index  `startIndex`. In other words, the `String.Substring` method attempts to extract characters from index `startIndex` to index `startIndex` + `length` - 1.

To extract a substring that begins with a particular character or character sequence, call a method such as `String.IndexOf` or `String.LastIndexOf` to get the value of `startIndex`.

If the substring should extend from `startIndex` to a specified character sequence, you can call a method such as `String.IndexOf` or `String.LastIndexOf` to get the index of the ending character or character sequence. You can then convert that value to an index position in the string as follows:

- If you've searched for a single character that is to mark the end of the substring, the `length` parameter equals  `endIndex` - `startIndex` + 1, where `endIndex` is the return value of the `String.IndexOf` or `String.LastIndexOf` method. The following example extracts a continuous block of "b" characters from a string.

_Code sample not included: ~/snippets/csharp/System/String/Substring/Substring2.cs._

- If you've searched for multiple characters that are to mark the end of the substring, the `length` parameter equals  `endIndex` + `endMatchLength` - `startIndex`, where `endIndex` is the return value of the `String.IndexOf` or `String.LastIndexOf` method, and `endMatchLength` is the length of the character sequence that marks the end of the substring. The following example extracts a block of text that contains an XML `<definition>` element.

_Code sample not included: ~/snippets/csharp/System/String/Substring/Substring3.cs._

- If the character or character sequence is not included in the end of the substring, the `length` parameter equals `endIndex` - `startIndex`, where `endIndex` is the return value of the `String.IndexOf` or `String.LastIndexOf` method.

If `startIndex` is equal to zero and `length` equals the length of the current string, the method returns the original string unchanged.

#### Examples
The following example illustrates a simple call to the `Substring` method that extracts two characters from a string starting at the sixth character position (that is, at index five).

_Code sample not included: ~/snippets/csharp/System/String/Substring/Substring4.cs._

The following example uses the `Substring` method in the following three cases to isolate substrings within a string. In two cases the substrings are used in comparisons, and in the third case an exception is thrown because invalid parameters are specified.

- It extracts the single character at the third position in the string (at index 2) and compares it with a "c". This comparison returns `true`.

- It extracts zero characters starting at the fourth position in the string (at index 3) and passes it to the `String.IsNullOrEmpty` method. This returns true because the call to the `String.Substring` method returns `Empty`.

- It attempts to extract one character starting at the fourth position in the string. Because there is no character at that position, the method call throws an `ArgumentOutOfRangeException` exception.

_Code sample not included: ~/snippets/csharp/System/String/Substring/source.cs._

The following example uses the `String.Substring` method to separate key/value pairs that are delimited by an equals (`=`) character.

_Code sample not included: ~/snippets/csharp/System/String/Substring/Substring1.cs._

The `String.IndexOf` method is used to get the position of the equals character in the string. The call to the `Substring` method extracts the key name, which starts from the first character in the string and extends for the number of characters returned by the call to the `String.IndexOf` method. The call to the `Substring` method then extracts the value assigned to the key. It starts at one character position beyond the equals character and extends to the end of the string.

## String.System.Collections.Generic.IEnumerable<System.Char>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<char> IEnumerable<char>.GetEnumerator ();
```

Returns an enumerator that iterates through the current `String` object.

Returns: A strongly-typed enumerator that can be used to iterate through the current `String` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IEnumerable<T>` interface object. For more information, see the `IEnumerable<T>.GetEnumerator` method.

## String.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the current `String` object.

Returns: An enumerator that can be used to iterate through the current string.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IEnumerable` interface. For more information, see the `IEnumerable.GetEnumerator` method.

## String.System.IConvertible.ToBoolean(IFormatProvider) method

```csharp
bool IConvertible.ToBoolean (IFormatProvider provider);
```

For a description of this member, see `IConvertible.ToBoolean`.

Parameters:

- `provider`: This parameter is ignored.

Returns: `true` if the value of the current string is `Boolean.TrueString`; `false` if the value of the current string is `Boolean.FalseString`.

Exceptions:

- `FormatException`: The value of the current string is not `Boolean.TrueString` or `Boolean.FalseString`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `String` instance is cast to an `IConvertible` interface. The recommended alternative is to call the `ToBoolean` method.
