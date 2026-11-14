---
title: "Int64 struct (part 7 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Int64.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int64 struct (part 7 of 8)

## Int64.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the numeric value of this instance to its equivalent string representation, using the specified format.

Parameters:

- `format`: A numeric format string.

Returns: The string representation of the value of this instance as specified by `format`.

Exceptions:

- `FormatException`: `format` is invalid or not supported.

#### Remarks
The `ToString` method formats an `Int64` value in a specified format by using a `NumberFormatInfo` object that represents the conventions of the current culture. If you want to use the default ("G", or general) format or specify a different culture, use the other overloads of the `Int64.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|Default ("G") format|A specific culture|`ToString`|
|A specific format|A specific culture|`ToString`|

The `format` parameter can be any valid standard numeric format specifier except for "R", as well as any combination of custom numeric format specifiers. If `format` is `null` or an empty string (""), the return value of this instance is formatted with the general numeric format specifier ("G").

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

The return value of this instance is formatted with the `NumberFormatInfo` for the current culture.

#### Examples
The following example displays an `Int64` value using each of the supported standard numeric format specifiers together with two custom numeric format strings. In converting the numeric values to strings, the example uses the formatting conventions of the en-US culture.

_Code sample not included: ~/snippets/csharp/System/Int64/ToString/ToString.cs._

## Int64.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified format and culture-specific format information.

Parameters:

- `format`: A numeric format string.
- `provider`: An object that supplies culture-specific formatting information about this instance.

Returns: The string representation of the value of this instance as specified by `format` and `provider`.

Exceptions:

- `FormatException`: `format` is invalid or not supported.

#### Remarks
The `ToString` method formats an `Int64` value in a specified format by using the `NumberFormatInfo` object of a specified culture. If you want to use default format or culture settings, use the other overloads of the `Int64.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|Default ("G") format|A specific culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|

The `format` parameter can be either a standard or a custom numeric format string. All standard numeric format strings other than "R" (or "r") are supported, as are all custom numeric format characters. If `format` is `null` or an empty string (""), the return value for this instance is formatted with the general numeric format specifier ("G").

The `provider` parameter is an object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of the string that is returned by this method. The object that implements `IFormatProvider` can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting rules are to be used.

- A `NumberFormatInfo` object that contains specific numeric formatting information for this value.

- A custom object that implements `IFormatProvider` and whose `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides formatting information.

If `provider` is `null` or a `NumberFormatInfo` object cannot be obtained from `provider`, the return value for this instance is formatted with the `NumberFormatInfo` for the current culture.

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

#### Examples
The following example displays a positive and a negative value using each of the supported standard numeric format specifiers for three different cultures.

_Code sample not included: ~/snippets/csharp/System/Int64/ToString/ToString.cs._

## Int64.TrailingZeroCount(Int64) method

```csharp
public static long TrailingZeroCount (long value);
```

Computes the number of trailing zeros in a value.

Parameters:

- `value`: The value whose trailing zeroes are to be counted.

Returns: The number of trailing zeros in `value`.

To be added.

## Int64.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<byte> utf8Destination, out int bytesWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current instance as UTF-8 into the provided span of bytes.

Parameters:

- `utf8Destination`: The span in which to write this instance's value formatted as a span of bytes.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `utf8Destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `utf8Destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `utf8Destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Int64.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current long number instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Int64.TryParse(Byte>, Int64) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out long result);
```

Tries to convert a UTF-8 character span containing the string representation of a number to its 64-bit signed integer equivalent.

Parameters:

- `utf8Text`: A span containing the UTF-8 characters representing the number to convert.
- `result`: When this method returns, contains the 64-bit signed integer value equivalent to the number contained in `utf8Text` if the conversion succeeded, or zero if the conversion failed. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `utf8Text` was converted successfully; otherwise, `false`.

To be added.

## Int64.TryParse(Char>, Int64) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out long result);
```

Converts the span representation of a number to its 64-bit signed integer equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A span containing the characters representing the number to convert.
- `result`: When this method returns, contains the 64-bit signed integer value equivalent of the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not of the correct format, or represents a number less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see> or greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## Int64.TryParse(String, Int64) method

```csharp
public static bool TryParse (string? s, out long result);
```

Converts the string representation of a number to its 64-bit signed integer equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A string containing a number to convert.
- `result`: When this method returns, contains the 64-bit signed integer value equivalent of the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not of the correct format, or represents a number less than <see cref="F:System.Int64.MinValue">Int64.MinValue</see> or greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

#### Remarks
The `Int64.TryParse` method is like the `Int64.Parse` method, except the `Int64.TryParse` method does not throw an exception if the conversion fails. It eliminates the need to use exception handling to test for a `FormatException` in the event that `s` is invalid and cannot be successfully parsed.

The `s` parameter contains a number of the form:

wsdigits[ws]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|An optional white space.|
|*sign*|An optional sign.|
|*digits*|A sequence of digits ranging from 0 to 9.|

The `s` parameter is interpreted using the `Integer` style. In addition to the decimal digits, only leading and trailing spaces together with a leading sign are allowed. To explicitly define the style elements together with the culture-specific formatting information that can be present in `s`, use the `TryParse` method.

The `s` parameter is parsed using the formatting information in a `NumberFormatInfo` object initialized for the current system culture. For more information, see `NumberFormatInfo.CurrentInfo`.

This overload of the `Int64.TryParse` method interprets all digits in the `s` parameter as decimal digits. To parse the string representation of a hexadecimal number, call the `TryParse` overload.

#### Examples
The following example calls the `TryParse` method with a number of different string values.

_Code sample not included: ~/snippets/csharp/System/Int64/TryParse/TryParse1.cs._

Some of the strings that the `TryParse` method is unable to convert in this example are:

-   "9432.0". The conversion fails because the string cannot contain a decimal separator; it must contain integral digits only.

-   "16,667". The conversion fails because the string cannot contain group separators; it must contain integral digits only.

-   "(100)". The conversion fails because the string cannot contain a negative sign other than the one defined by the current culture's `NumberFormatInfo.NegativeSign` and `NumberFormatInfo.NumberNegativePattern` properties.

-   "01FA". The conversion fails because the string cannot contain hexadecimal digits; it must contain decimal digits only.

## Int64.TryParse(Byte>, IFormatProvider, Int64) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider, out long result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## Int64.TryParse(Char>, IFormatProvider, Int64) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out long result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Int64.TryParse(String, IFormatProvider, Int64) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out long result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Int64.TryParse(Byte>, NumberStyles, IFormatProvider, Int64) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out long result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.
