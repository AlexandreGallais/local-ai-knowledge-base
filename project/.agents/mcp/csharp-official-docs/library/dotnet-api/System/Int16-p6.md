---
title: "Int16 struct (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Int16.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Int16 struct (part 6 of 7)

## Int16.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the numeric value of this instance to its equivalent string representation, using the specified format.

Parameters:

- `format`: A numeric format string.

Returns: The string representation of the value of this instance as specified by `format`.

#### Remarks
The `ToString` method formats an `Int16` value in a specified format by using a `NumberFormatInfo` object that represents the conventions of the current culture. If you want to use the default ("G", or general) format or specify a different culture, use the other overloads of the `Int16.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|Default ("G") format|A specific culture|`ToString`|
|A specific format|A specific culture|`ToString`|

The `format` parameter can be either a standard or a custom numeric format string. All standard numeric format strings other than "R" (or "r") are supported, as are all custom numeric format characters. If `format` is `null` or an empty string, the return value of this instance is formatted with the general numeric format specifier ("G").

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

The return value of this instance is formatted with the `NumberFormatInfo` for the current culture.

#### Examples
The following example initializes two `Int16` values and displays them to the console using each of the supported standard format strings and several custom format strings. The example is run with en-US as the current culture.

_Code sample not included: ~/snippets/csharp/System/Int16/ToString/ToString1.cs._

## Int16.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified format and culture-specific formatting information.

Parameters:

- `format`: A numeric format string.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `format` and `provider`.

#### Remarks
The `ToString` method formats an `Int16` value in a specified format by using the `NumberFormatInfo` object of a specified culture. If you want to use default format or culture settings, use the other overloads of the `Int16.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|Default ("G") format|A specific culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|

The `format` parameter can be either a standard or a custom numeric format string. All standard numeric format strings other than "R" (or "r") are supported, as are all custom numeric format characters. If `format` is `null` or an empty string (""), the string returned by this method is formatted with the general numeric format specifier ("G").

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

The `provider` parameter is an `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of the string that is returned by this method. The object that implements `IFormatProvider` can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting rules are to be used.

- A `NumberFormatInfo` object that contains specific numeric formatting information for this value.

- A custom object that implements `IFormatProvider`.

If `provider` is `null`, or a `NumberFormatInfo` object cannot be obtained from `provider`, the return value is formatted with the `NumberFormatInfo` for the current culture.

#### Examples
The following example displays an `Int16` value using each of the supported standard format strings in four different cultures.

_Code sample not included: ~/snippets/csharp/System/Int16/ToString/ToString1.cs._

## Int16.TrailingZeroCount(Int16) method

```csharp
public static short TrailingZeroCount (short value);
```

Computes the number of trailing zeros in a value.

Parameters:

- `value`: The value whose trailing zeroes are to be counted.

Returns: The number of trailing zeros in `value`.

To be added.

## Int16.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

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

## Int16.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current short number instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Int16.TryParse(Byte>, Int16) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out short result);
```

Tries to convert a UTF-8 character span containing the string representation of a number to its 16-bit signed integer equivalent.

Parameters:

- `utf8Text`: A span containing the UTF-8 characters representing the number to convert.
- `result`: When this method returns, contains the 16-bit signed integer value equivalent to the number contained in `utf8Text` if the conversion succeeded, or zero if the conversion failed. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `utf8Text` was converted successfully; otherwise, `false`.

To be added.

## Int16.TryParse(Char>, Int16) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out short result);
```

Converts the span representation of a number in a culture-specific format to its 16-bit signed integer equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A span containing the characters that represent the number to convert.
- `result`: When this method returns, contains the 16-bit signed integer value equivalent to the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty` or represents a number less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see> or greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## Int16.TryParse(String, Int16) method

```csharp
public static bool TryParse (string? s, out short result);
```

Converts the string representation of a number to its 16-bit signed integer equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A string containing a number to convert.
- `result`: When this method returns, contains the 16-bit signed integer value equivalent to the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not of the correct format, or represents a number less than <see cref="F:System.Int16.MinValue">Int16.MinValue</see> or greater than <see cref="F:System.Int16.MaxValue">Int16.MaxValue</see>. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

#### Remarks
The `TryParse` method differs from the `Parse` method by returning a Boolean value that indicates whether the parse operation succeeded instead of returning the parsed `Int16` value. It eliminates the need to use exception handling to test for a `FormatException` in the event that `s` is invalid and cannot be successfully parsed.

The `s` parameter should be the string representation of a number in the form:

wsdigits[ws]

Items in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional sign.|
|*digits*|A sequence of digits ranging from 0 to 9.|

The `s` parameter is interpreted using the `Integer` style. In addition to the decimal digits, only leading and trailing spaces together with a leading sign are allowed. To explicitly define the style elements together with the culture-specific formatting information that can be present in `s`, use the `TryParse` method.

The `s` parameter is parsed using the formatting information in a `NumberFormatInfo` object that is initialized for the current system culture. For more information, see `NumberFormatInfo.CurrentInfo`.

This overload of the `Int16.TryParse` method interprets all digits in the `s` parameter as decimal digits. To parse the string representation of a hexadecimal number, call the `TryParse` overload.

#### Examples
The following example calls the `TryParse` method with a number of different string values.

_Code sample not included: ~/snippets/csharp/System/Int16/TryParse/TryParse1.cs._

Some of the strings that the `TryParse` method is unable to convert in this example are:

-   "9432.0". The conversion fails because the string cannot contain a decimal separator; it must contain integral digits only.

-   "16,667". The conversion fails because the string cannot contain group separators; it must contain integral digits only.

-   "(100)". The conversion fails because the string cannot contain a negative sign other than the one defined by the current culture's `NumberFormatInfo.NegativeSign` and `NumberFormatInfo.NumberNegativePattern` properties.

-   "01FA". The conversion fails because the string cannot contain hexadecimal digits; it must contain decimal digits only.

## Int16.TryParse(Byte>, IFormatProvider, Int16) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider, out short result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## Int16.TryParse(Char>, IFormatProvider, Int16) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out short result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Int16.TryParse(String, IFormatProvider, Int16) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out short result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Int16.TryParse(Byte>, NumberStyles, IFormatProvider, Int16) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out short result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.
