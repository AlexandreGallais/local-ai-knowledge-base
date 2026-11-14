---
title: "Double struct (part 11 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Double.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Double struct (part 11 of 14)

## Double.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the numeric value of this instance to its equivalent string representation, using the specified format.

Parameters:

- `format`: A numeric format string.

Returns: The string representation of the value of this instance as specified by `format`.

Exceptions:

- `FormatException`: `format` is invalid.

#### Remarks
The `ToString` method formats a `Double` value in a specified format by using the conventions of the current culture. If you want to specify a different format or culture, use the other overloads of the `Double.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|Default ("G") format|A specific culture|`ToString`|
|A specific format or precision|A specific culture|`ToString`|

The return value can be `NumberFormatInfo.PositiveInfinitySymbol`, `NumberFormatInfo.NegativeInfinitySymbol`, `NumberFormatInfo.NaNSymbol`, or the string representation of a number, as specified by `format`.

The `format` parameter can be any valid standard numeric format specifier except for D and X, as well as any combination of custom numeric format specifiers. If `format` is `null` or an empty string, the return value is formatted with the general numeric format specifier ("G").

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

By default, the return value only contains 15 digits of precision although a maximum of 17 digits is maintained internally. If the value of this instance has greater than 15 digits, `Double.ToString` returns `NumberFormatInfo.PositiveInfinitySymbol` or `NumberFormatInfo.NegativeInfinitySymbol` instead of the expected number. If you require more precision, specify `format` with the "G17" format specification, which always returns 17 digits of precision, or "R", which returns 15 digits if the number can be represented with that precision or 17 digits if the number can only be represented with maximum precision.

#### Examples
The following example defines a numeric value and formats it as a currency value by using the "C" standard numeric format string and as a numeric value to three decimal places by using the "N" standard numeric format string. The result strings are formatted by using the conventions of the en-US culture. For more information on numeric format strings, see Standard Numeric Format Strings and Custom Numeric Format Strings.

_Code sample not included: ~/snippets/csharp/System/Double/ToString/ToString7.cs._

The following example displays several `Double` values using the supported standard numeric format specifiers together with three custom numeric format strings. One of those custom format strings illustrates how to pad a `Single` value with leading zeros. In addition, the example uses precision specifiers with each standard format specifier except for "R". The values of the precision specifiers range from 0 to 3. To convert the numeric values to strings, the example uses the formatting conventions of the en-US culture.

_Code sample not included: ~/snippets/csharp/System/Double/ToString/ToString1.cs._

## Double.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified format and culture-specific format information.

Parameters:

- `format`: A numeric format string.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `format` and `provider`.

#### Remarks
The `ToString` method formats a `Double` value in a specified format of a specified culture. If you want to specify a different format or culture, use the other overloads of the `Double.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|Default ("G") format|A specific culture|`ToString`|
|A specific format or precision|Default (current) culture|`ToString`|

The return value can be `NumberFormatInfo.PositiveInfinitySymbol`, `NumberFormatInfo.NegativeInfinitySymbol`, `NumberFormatInfo.NaNSymbol`, or the string representation of a number, as specified by `format`.

The `format` parameter can be any valid standard numeric format specifier except for D and X, as well as any combination of custom numeric format specifiers. If `format` is `null` or an empty string, the return value for this instance is formatted with the general numeric format specifier ("G").

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

The `provider` parameter is an `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object. Typically, `provider` is a `CultureInfo` object or a `NumberFormatInfo` object. The `provider` parameter supplies culture-specific information used in formatting. If `provider` is `null`, the return value is formatted using the `NumberFormatInfo` object for the current culture.

By default, the return value only contains 15 digits of precision although a maximum of 17 digits is maintained internally. If the value of this instance has greater than 15 digits, `Double.ToString` returns `NumberFormatInfo.PositiveInfinitySymbol` or `NumberFormatInfo.NegativeInfinitySymbol` instead of the expected number. If you require more precision, specify `format` with the "G17" format specification, which always returns 17 digits of precision, or "R", which returns 15 digits if the number can be represented with that precision or 17 digits if the number can only be represented with maximum precision.

#### Examples
The following example displays a `Double` value using each of the supported standard numeric format specifiers for several different cultures.

_Code sample not included: ~/snippets/csharp/System/Double/ToString/ToString1.cs._

The following example illustrates the use of `Double.ToString`, taking a `String` and an `IFormatProvider` as parameters.

_Code sample not included: ~/snippets/csharp/System/Double/Overview/source.cs._

## Double.Truncate(Double) method

```csharp
public static double Truncate (double x);
```

Truncates a value.

Parameters:

- `x`: The value to truncate.

Returns: The truncation of `x`.

To be added.

## Double.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

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

## Double.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current double instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Double.TryParse(Byte>, Double) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out double result);
```

Tries to convert a UTF-8 character span containing the string representation of a number to its double-precision floating-point number equivalent.

Parameters:

- `utf8Text`: A read-only UTF-8 character span that contains the number to convert.
- `result`: When this method returns, contains a double-precision floating-point number equivalent of the numeric value or symbol contained in `utf8Text` if the conversion succeeded or zero if the conversion failed. The conversion fails if the `utf8Text` is `ReadOnlySpan<T>.Empty` or is not in a valid format. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `utf8Text` was converted successfully; otherwise, `false`.

To be added.

## Double.TryParse(Char>, Double) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out double result);
```

Converts the span representation of a number in a specified style and culture-specific format to its double-precision floating-point number equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A character span that contains the string representation of the number to convert.
- `result`: When this method returns, contains the double-precision floating-point number equivalent of the numeric value or symbol contained in `s` parameter, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or empty. If `s` is a valid number less than <see cref="F:System.Double.MinValue">Double.MinValue</see>, `result` is `Double.NegativeInfinity`. If `s` is a valid number greater than <see cref="F:System.Double.MaxValue">Double.MaxValue</see>, `result` is `Double.PositiveInfinity`. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Values that are too large to represent are rounded to `Double.PositiveInfinity` or `Double.NegativeInfinity` as required by the IEEE 754 specification.
