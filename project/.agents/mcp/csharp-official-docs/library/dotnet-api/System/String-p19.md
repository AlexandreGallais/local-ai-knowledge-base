---
title: "String class (part 19 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 19 of 26)

## String.PadRight(Int32, Char) method

```csharp
public string PadRight (int totalWidth, char paddingChar);
```

Returns a new string that left-aligns the characters in this string by padding them on the right with a specified Unicode character, for a specified total length.

Parameters:

- `totalWidth`: The number of characters in the resulting string, equal to the number of original characters plus any additional padding characters.
- `paddingChar`: A Unicode padding character.

Returns: A new string that is equivalent to this instance, but left-aligned and padded on the right with as many `paddingChar` characters as needed to create a length of `totalWidth`. However, if `totalWidth` is less than the length of this instance, the method returns a reference to the existing instance. If `totalWidth` is equal to the length of this instance, the method returns a new string that is identical to this instance.

Exceptions:

- `ArgumentOutOfRangeException`: `totalWidth` is less than zero.

#### Remarks
The `PadRight` method pads the end of the returned string. This means that, when used with right-to-left languages, it pads the left portion of the string.

> **Note:**
> If the `String.PadRight` method pads the current instance with white-space characters, this method does not modify the value of the current instance. Instead, it returns a new string that is padded with trailing `paddingChar` characters so that its total length is `totalWidth` characters.

#### Examples
The following example demonstrates the `String.PadRight` method.

_Code sample not included: ~/snippets/csharp/System/String/PadRight/source1.cs._

## String.Remove(Int32) method

```csharp
public string Remove (int startIndex);
```

Returns a new string in which all the characters in the current instance, beginning at a specified position and continuing through the last position, have been deleted.

Parameters:

- `startIndex`: The zero-based position to begin deleting characters.

Returns: A new string that is equivalent to this string except for the removed characters.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` is less than zero.

-or-

`startIndex` is greater than the length of this instance.

#### Remarks

Strings are zero-based. The value of the `startIndex` parameter can range from zero to the length of the string instance.

> **Note:**
> This method does not modify the value of the current instance. Instead, it returns a new string in which all characters from position `startIndex` to the end of the original string have been removed.

#### Examples
The following example demonstrates the `String.Remove` method. The next-to-last case removes all text starting from the specified index through the end of the string. The last case removes three characters starting from the specified index.

_Code sample not included: ~/snippets/csharp/System/String/Remove/r.cs._

## String.Remove(Int32, Int32) method

```csharp
public string Remove (int startIndex, int count);
```

Returns a new string in which a specified number of characters in the current instance beginning at a specified position have been deleted.

Parameters:

- `startIndex`: The zero-based position to begin deleting characters.
- `count`: The number of characters to delete.

Returns: A new string that is equivalent to this instance except for the removed characters.

Exceptions:

- `ArgumentOutOfRangeException`: Either `startIndex` or `count` is less than zero.

-or-

`startIndex` plus `count` specify a position outside this instance.

#### Remarks

Strings are zero-based. The value of the `startIndex` parameter can range from zero to one less than the length of the string instance.

> **Note:**
> This method does not modify the value of the current instance. Instead, it returns a new string in which the number of characters specified by the `count` parameter have been removed. The characters are removed at the position specified by `startIndex`.

#### Examples
The following example demonstrates how you can remove the middle name from a complete name.

_Code sample not included: ~/snippets/csharp/System/String/Remove/stringremove.cs._

## String.Replace(Char, Char) method

```csharp
public string Replace (char oldChar, char newChar);
```

Returns a new string in which all occurrences of a specified Unicode character in this instance are replaced with another specified Unicode character.

Parameters:

- `oldChar`: The Unicode character to be replaced.
- `newChar`: The Unicode character to replace all occurrences of `oldChar`.

Returns: A string that is equivalent to this instance except that all instances of `oldChar` are replaced with `newChar`. If `oldChar` is not found in the current instance, the method returns the current instance unchanged.

#### Remarks
This method performs an ordinal (case-sensitive and culture-insensitive) search to find `oldChar`.

> **Note:**
> This method does not modify the value of the current instance. Instead, it returns a new string in which all occurrences of `oldChar` are replaced by `newChar`.

Because this method returns the modified string, you can chain together successive calls to the `String.Replace` method to perform multiple replacements on the original string. Method calls are executed from left to right. The following example provides an illustration.

_Code sample not included: ~/snippets/csharp/System/String/Replace/replace2.cs._

#### Examples
The following example creates a comma separated value list by substituting commas for the blanks between a series of numbers.

_Code sample not included: ~/snippets/csharp/System/String/Replace/string.replace1.cs._

## String.Replace(String, String) method

```csharp
public string Replace (string oldValue, string? newValue);
```

Returns a new string in which all occurrences of a specified string in the current instance are replaced with another specified string.

Parameters:

- `oldValue`: The string to be replaced.
- `newValue`: The string to replace all occurrences of `oldValue`.

Returns: A string that is equivalent to the current string except that all instances of `oldValue` are replaced with `newValue`. If `oldValue` is not found in the current instance, the method returns the current instance unchanged.

Exceptions:

- `ArgumentNullException`: `oldValue` is `null`.
- `ArgumentException`: `oldValue` is the empty string ("").

#### Remarks
If `newValue` is `null`, all occurrences of `oldValue` are removed.

> **Note:**
> This method does not modify the value of the current instance. Instead, it returns a new string in which all occurrences of `oldValue` are replaced by `newValue`.

This method performs an ordinal (case-sensitive and culture-insensitive) search to find `oldValue`.

Because this method returns the modified string, you can chain together successive calls to the `String.Replace` method to perform multiple replacements on the original string. Method calls are executed from left to right. The following example provides an illustration.

_Code sample not included: ~/snippets/csharp/System/String/Replace/replace1.cs._

#### Examples
The following example demonstrates how you can use the `String.Replace` method to correct a spelling error.

_Code sample not included: ~/snippets/csharp/System/String/Replace/stringreplace.cs._

## String.Replace(Rune, Rune) method

```csharp
public string Replace (System.Text.Rune oldRune, System.Text.Rune newRune);
```

To be added.

Parameters:

- `oldRune`: To be added.
- `newRune`: To be added.

Returns: To be added.

To be added.

## String.Replace(String, String, StringComparison) method

```csharp
public string Replace (string oldValue, string? newValue, StringComparison comparisonType);
```

Returns a new string in which all occurrences of a specified string in the current instance are replaced with another specified string, using the provided comparison type.

Parameters:

- `oldValue`: The string to be replaced.
- `newValue`: The string to replace all occurrences of `oldValue`.
- `comparisonType`: One of the enumeration values that determines how `oldValue` is searched within this instance.

Returns: A string that is equivalent to the current string except that all instances of `oldValue` are replaced with `newValue`. If `oldValue` is not found in the current instance, the method returns the current instance unchanged.

Exceptions:

- `ArgumentNullException`: `oldValue` is `null`.
- `ArgumentException`: `oldValue` is the empty string ("").

#### Remarks
If `newValue` is `null`, all occurrences of `oldValue` are removed.

> **Note:**
> This method does not modify the value of the current instance. Instead, it returns a new string in which all occurrences of `oldValue` are replaced by `newValue`.

This method performs a search to find `oldValue` using the culture and case sensitivity described by `comparisonType`.

Because this method returns the modified string, you can chain together successive calls to the `String.Replace` method to perform multiple replacements on the original string. Method calls are executed from left to right. The following example provides an illustration.

_Code sample not included: ~/snippets/csharp/System/String/Replace/replace1.cs._

## String.Replace(String, String, Boolean, CultureInfo) method

```csharp
public string Replace (string oldValue, string? newValue, bool ignoreCase, System.Globalization.CultureInfo? culture);
```

Returns a new string in which all occurrences of a specified string in the current instance are replaced with another specified string, using the provided culture and case sensitivity.

Parameters:

- `oldValue`: The string to be replaced.
- `newValue`: The string to replace all occurrences of `oldValue`.
- `ignoreCase`: `true` to ignore casing when comparing; `false` otherwise.
- `culture`: The culture to use when comparing. If `culture` is `null`, the current culture is used.

Returns: A string that is equivalent to the current string except that all instances of `oldValue` are replaced with `newValue`. If `oldValue` is not found in the current instance, the method returns the current instance unchanged.

Exceptions:

- `ArgumentNullException`: `oldValue` is `null`.
- `ArgumentException`: `oldValue` is the empty string ("").

#### Remarks
If `newValue` is `null`, all occurrences of `oldValue` are removed.

> **Note:**
> This method does not modify the value of the current instance. Instead, it returns a new string in which all occurrences of `oldValue` are replaced by `newValue`.

This method performs a search to find `oldValue` using the provided `culture` and `ignoreCase` case sensitivity.

Because this method returns the modified string, you can chain together successive calls to the `String.Replace` method to perform multiple replacements on the original string. Method calls are executed from left to right. The following example provides an illustration.

_Code sample not included: ~/snippets/csharp/System/String/Replace/replace1.cs._

## String.ReplaceLineEndings() method

```csharp
public string ReplaceLineEndings ();
```

Replaces all newline sequences in the current string with `Environment.NewLine`.

Returns: A string whose contents match the current string, but with all newline sequences replaced with `Environment.NewLine`.

#### Remarks

This method searches for all newline sequences within the string and canonicalizes them to match the newline sequence for the current environment. For example, when running on Windows, all occurrences of non-Windows newline sequences will be replaced with the sequence CRLF. When running on Unix, all occurrences of non-Unix newline sequences will be replaced with a single LF character.

It is not recommended that protocol parsers utilize this API. Protocol specifications often mandate specific newline sequences. For example, HTTP/1.1 (RFC 8615) mandates that the request line, status line, and headers lines end with CRLF. Since this API operates over a wide range of newline sequences, a protocol parser utilizing this API could exhibit behaviors unintended by the protocol's authors.

This overload is equivalent to calling `ReplaceLineEndings`, passing `NewLine` as the replacementText parameter.

This method is guaranteed O(n) complexity, where n is the length of the input string.

## String.ReplaceLineEndings(String) method

```csharp
public string ReplaceLineEndings (string replacementText);
```

Replaces all newline sequences in the current string with `replacementText`.

Parameters:

- `replacementText`: The text to use as replacement.

Returns: A string whose contents match the current string, but with all newline sequences replaced with `replacementText`.

#### Remarks

This method searches for all newline sequences within the string and canonicalizes them to the newline sequence provided by `replacementText`. If `replacementText` is `Empty`, all newline sequences within the string will be removed.

It is not recommended that protocol parsers utilize this API. Protocol specifications often mandate specific newline sequences. For example, HTTP/1.1 (RFC 8615) mandates that the request line, status line, and headers lines end with CRLF. Since this API operates over a wide range of newline sequences, a protocol parser utilizing this API could exhibit behaviors unintended by the protocol's authors.

The list of recognized newline sequences is CR (U+000D), LF (U+000A), CRLF (U+000D U+000A), NEL (U+0085), LS (U+2028), FF (U+000C), and PS (U+2029). This list is given by the Unicode Standard, Sec. 5.8, Recommendation R4 and Table 5-2.

This method is guaranteed O(n * r) complexity, where n is the length of the input string, and where r is the length of `replacementText`.
