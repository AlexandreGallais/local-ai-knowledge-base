---
title: "String class (part 9 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class (part 9 of 26)

## String.Contains(String) method

```csharp
public bool Contains (string value);
```

Returns a value indicating whether a specified substring occurs within this string.

Parameters:

- `value`: The string to seek.

Returns: `true` if the `value` parameter occurs within this string, or if `value` is the empty string (""); otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Remarks
This method performs an ordinal (case-sensitive and culture-insensitive) comparison. The search begins at the first character position of this string and continues through the last character position.

To perform a culture-sensitive or ordinal case-insensitive comparison, call the `Contains` overload instead.

_Code sample not included: ~/snippets/csharp/System/String/Contains/ContainsExt1.cs._

_Code sample not included: ~/snippets/csharp/System/String/Contains/ContainsExt1.cs._

If you are interested in the position of the substring `value` in the current instance, you can call the `String.IndexOf` method to get the starting position of its first occurrence, or you can call the `String.LastIndexOf` method to get the starting position of its last occurrence. The example includes a call to the `IndexOf` method if a substring is found in a string instance.

#### Examples
The following example determines whether the string "fox" is a substring of a familiar quotation. If "fox" is found in the string, it also displays its starting position.

_Code sample not included: ~/snippets/csharp/System/String/Contains/cont.cs._

## String.Contains(Rune) method

```csharp
public bool Contains (System.Text.Rune value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## String.Contains(Char, StringComparison) method

```csharp
public bool Contains (char value, StringComparison comparisonType);
```

Returns a value indicating whether a specified character occurs within this string, using the specified comparison rules.

Parameters:

- `value`: The character to seek.
- `comparisonType`: One of the enumeration values that specifies the rules to use in the comparison.

Returns: `true` if the `value` parameter occurs within this string; otherwise, `false`.

To be added.

## String.Contains(String, StringComparison) method

```csharp
public bool Contains (string value, StringComparison comparisonType);
```

Returns a value indicating whether a specified string occurs within this string, using the specified comparison rules.

Parameters:

- `value`: The string to seek.
- `comparisonType`: One of the enumeration values that specifies the rules to use in the comparison.

Returns: `true` if the `value` parameter occurs within this string, or if `value` is the empty string (""); otherwise, `false`.

To be added.

## String.Contains(Rune, StringComparison) method

```csharp
public bool Contains (System.Text.Rune value, StringComparison comparisonType);
```

To be added.

Parameters:

- `value`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.

## String.Copy(String) method

```csharp
public static string Copy (string str);
```

Creates a new instance of `String` with the same value as a specified `String`.

Parameters:

- `str`: The string to copy.

Returns: A new string with the same value as `str`.

Exceptions:

- `ArgumentNullException`: `str` is `null`.

To be added.

## String.CopyTo(Char>) method

```csharp
public void CopyTo (Span<char> destination);
```

Copies the contents of this string into the destination span.

Parameters:

- `destination`: The span into which to copy this string's contents.

Exceptions:

- `ArgumentException`: The destination span is shorter than the source string.

To be added.

## String.CopyTo(Int32, Char[], Int32, Int32) method

```csharp
public void CopyTo (int sourceIndex, char[] destination, int destinationIndex, int count);
```

Copies a specified number of characters from a specified position in this instance to a specified position in an array of Unicode characters.

Parameters:

- `sourceIndex`: The index of the first character in this instance to copy.
- `destination`: An array of Unicode characters to which characters in this instance are copied.
- `destinationIndex`: The index in `destination` at which the copy operation begins.
- `count`: The number of characters in this instance to copy to `destination`.

Exceptions:

- `ArgumentNullException`: `destination` is `null`.
- `ArgumentOutOfRangeException`: `sourceIndex`, `destinationIndex`, or `count` is negative

-or-

`sourceIndex` does not identify a position in the current instance.

-or-

`destinationIndex` does not identify a valid index in the `destination` array.

-or-

`count` is greater than the length of the substring from `sourceIndex` to the end of this instance

-or-

`count` is greater than the length of the subarray from `destinationIndex` to the end of the `destination` array.

#### Remarks
This method copies `count` characters from the `sourceIndex` position of this instance to the `destinationIndex` position of `destination` character array. This method does not resize the `destination` character array; it must have a sufficient number of elements to accommodate the copied characters or the method throws an `ArgumentOutOfRangeException`.

`sourceIndex` and `destinationIndex` are zero-based.

#### Examples
The following example demonstrates the `String.CopyTo` method.

_Code sample not included: ~/snippets/csharp/System/String/CopyTo/stringcopyto.cs._

## String.Create(IFormatProvider, DefaultInterpolatedStringHandler) method

```csharp
public static string Create (IFormatProvider? provider, ref System.Runtime.CompilerServices.DefaultInterpolatedStringHandler handler);
```

Creates a new string by using the specified provider to control the formatting of the specified interpolated string.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.
- `handler`: The interpolated string, passed by reference.

Returns: The string that results for formatting the interpolated string using the specified format provider.

To be added.

## String.Create(IFormatProvider, Char>, DefaultInterpolatedStringHandler) method

```csharp
public static string Create (IFormatProvider? provider, Span<char> initialBuffer, ref System.Runtime.CompilerServices.DefaultInterpolatedStringHandler handler);
```

Creates a new string by using the specified provider to control the formatting of the specified interpolated string.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.
- `initialBuffer`: The initial buffer that may be used as temporary space as part of the formatting operation. The contents of this buffer may be overwritten.
- `handler`: The interpolated string, passed by reference.

Returns: The string that results for formatting the interpolated string using the specified format provider.

To be added.

## String.Create<TState>(Int32, TState, Char,TState>) method

```csharp
public static string Create<TState> (int length, TState state, System.Buffers.SpanAction<char,TState> action) where TState : allows ref struct;
```

Creates a new string with a specific length and initializes it after creation by using the specified callback.

Parameters:

- `TState`: The type of the element to pass to `action`.
- `length`: The length of the string to create.
- `state`: The element to pass to `action`.
- `action`: A callback to initialize the string.

Returns: The created string.

#### Remarks
The initial content of the destination span passed to `action` is undefined. Therefore, it is the delegate's responsibility to ensure that every element of the span is assigned. Otherwise, the resulting string could contain random characters.

To support interop scenarios, the underlying buffer is guaranteed to be at least 1 greater than represented by the span parameter of the action callback. This additional index represents the null-terminator and, if written, that is the only value supported. Writing any value other than the null-terminator corrupts the string and is considered undefined behavior.

## String.EndsWith(Char) method

```csharp
public bool EndsWith (char value);
```

Determines whether the end of this string instance matches the specified character.

Parameters:

- `value`: The character to compare to the character at the end of this instance.

Returns: `true` if `value` matches the end of this instance; otherwise, `false`.

#### Remarks

This method performs an ordinal (case-sensitive and culture-insensitive) comparison.

## String.EndsWith(String) method

```csharp
public bool EndsWith (string value);
```

Determines whether the end of this string instance matches the specified string.

Parameters:

- `value`: The string to compare to the substring at the end of this instance.

Returns: `true` if `value` matches the end of this instance; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Remarks
This method compares `value` to the substring at the end of this instance that is the same length as `value`, and returns an indication whether they are equal. To be equal, `value` must be a reference to this same instance or match the end of this instance.

This method performs a word (case-sensitive and culture-sensitive) comparison using the current culture.

#### Examples
The following example indicates whether each string in an array ends with a period (".").

_Code sample not included: ~/snippets/csharp/System/String/EndsWith/EndsWith1.cs._

The following example defines a `StripEndTags` method that uses the `EndsWith` method to remove HTML end tags from the end of a line. Note that the  `StripEndTags` method is called recursively to ensure that multiple HTML end tags at the end of the line are removed.

_Code sample not included: ~/snippets/csharp/System/String/EndsWith/stringendswith.cs._

## String.EndsWith(Rune) method

```csharp
public bool EndsWith (System.Text.Rune value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## String.EndsWith(Char, StringComparison) method

```csharp
public bool EndsWith (char value, StringComparison comparisonType);
```

To be added.

Parameters:

- `value`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.

## String.EndsWith(String, StringComparison) method

```csharp
public bool EndsWith (string value, StringComparison comparisonType);
```

Determines whether the end of this string instance matches the specified string when compared using the specified comparison option.

Parameters:

- `value`: The string to compare to the substring at the end of this instance.
- `comparisonType`: One of the enumeration values that determines how this string and `value` are compared.

Returns: `true` if the `value` parameter matches the end of this string; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentException`: `comparisonType` is not a `StringComparison` value.

#### Remarks
The `String.EndsWith` method compares the `value` parameter to the substring at the end of this string and returns a value that indicates whether they are equal. To be equal, `value` must be a reference to this same string, must be the empty string (""), or must match the end of this string. The type of comparison performed by the `String.EndsWith` method depends on the value of the `comparisonType` parameter.

#### Examples
The following example determines whether a string ends with a particular substring. The results are affected by the choice of culture, whether case is ignored, and whether an ordinal comparison is performed.

_Code sample not included: ~/snippets/csharp/System/String/EndsWith/ewcmp.cs._

## String.EndsWith(Rune, StringComparison) method

```csharp
public bool EndsWith (System.Text.Rune value, StringComparison comparisonType);
```

To be added.

Parameters:

- `value`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.

## String.EndsWith(String, Boolean, CultureInfo) method

```csharp
public bool EndsWith (string value, bool ignoreCase, System.Globalization.CultureInfo? culture);
```

Determines whether the end of this string instance matches the specified string when compared using the specified culture.

Parameters:

- `value`: The string to compare to the substring at the end of this instance.
- `ignoreCase`: `true` to ignore case during the comparison; otherwise, `false`.
- `culture`: Cultural information that determines how this instance and `value` are compared. If `culture` is `null`, the current culture is used.

Returns: `true` if the `value` parameter matches the end of this string; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Remarks
This method compares the `value` parameter to the substring at the end of this string that is the same length as `value`, and returns a value that indicates whether they are equal. To be equal, `value` must be a reference to this same instance or match the end of this string.

This method performs a word (culture-sensitive) comparison using the specified casing and culture.

#### Examples
The following example determines whether a string occurs at the end of another string. The `String.EndsWith` method is called several times using case sensitivity, case insensitivity, and different cultures that influence the results of the search.

_Code sample not included: ~/snippets/csharp/System/String/EndsWith/ewci.cs._

## String.EnumerateRunes() method

```csharp
public System.Text.StringRuneEnumerator EnumerateRunes ();
```

Returns an enumeration of `Rune` from this string.

Returns: A string rune enumerator.

#### Remarks

Invalid sequences are represented in the enumeration by `ReplacementChar`.

## String.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether this instance and a specified object, which must also be a `String` object, have the same value.

Parameters:

- `obj`: The string to compare to this instance.

Returns: `true` if `obj` is a `String` and its value is the same as this instance; otherwise, `false`.  If `obj` is `null`, the method returns `false`.

#### Remarks
This method performs an ordinal (case-sensitive and culture-insensitive) comparison.

#### Examples
The following example demonstrates the `String.Equals` method.

_Code sample not included: ~/snippets/csharp/System/String/Equals/equals.cs._
