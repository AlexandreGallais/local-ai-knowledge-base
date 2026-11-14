---
title: "Decimal struct (part 11 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Decimal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Decimal struct (part 11 of 12)

## Decimal.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified format and culture-specific format information.

Parameters:

- `format`: A numeric format string.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `format` and `provider`.

Exceptions:

- `FormatException`: `format` is invalid.

#### Remarks
The `ToString` method formats a `Decimal` value in a specified format of a specified culture. If you want to use default format or culture settings, use the other overloads of the `Decimal.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|Default ("G") format|A specific culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|

The `format` parameter can be any valid standard numeric format specifier except for D, R, and X, as well as any combination of custom numeric format specifiers. If `format` is `null` or an empty string, the return value for this instance is formatted with the general numeric format specifier ("G").

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

The `provider` parameter is an `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object. Typically, `provider` is a `NumberFormatInfo` or `CultureInfo` object. The `provider` parameter supplies culture-specific information used in formatting. If `provider` is `null`, the thread current culture is used.

#### Examples
The following example displays a `Decimal` value using each of the supported standard numeric format specifiers for several different cultures.

_Code sample not included: ~/snippets/csharp/System/Decimal/ToString/ToString2.cs._

## Decimal.ToUInt16(Decimal) method

```csharp
public static ushort ToUInt16 (decimal value);
```

Converts the value of the specified `Decimal` to the equivalent 16-bit unsigned integer.

Parameters:

- `value`: The decimal number to convert.

Returns: A 16-bit unsigned integer equivalent to the value of `value`.

Exceptions:

- `OverflowException`: `value` is greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see> or less than <see cref="F:System.UInt16.MinValue">UInt16.MinValue</see>.

#### Remarks
The return value is the integral part of the decimal value; fractional digits are truncated.

You can also convert a `Decimal` value to a 16-bit unsigned integer by using the `Decimal.op_Explicit` assignment operator. Because the operator performs a narrowing conversion, you must use a casting operator in C# or a conversion function in Visual Basic.

#### Examples
The following example uses the `Decimal.ToUInt16` method to convert decimal numbers to `UInt16` values.

_Code sample not included: ~/snippets/csharp/System/Decimal/ToUInt16/touint16_1.cs._

## Decimal.ToUInt32(Decimal) method

```csharp
public static uint ToUInt32 (decimal d);
```

Converts the value of the specified `Decimal` to the equivalent 32-bit unsigned integer.

Parameters:

- `d`: The decimal number to convert.

Returns: A 32-bit unsigned integer equivalent to the value of `d`.

Exceptions:

- `OverflowException`: `d` is negative or greater than <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see>.

#### Remarks
The return value is the integral part of the decimal value; fractional digits are truncated.

You can also convert a `Decimal` value to an 32-bit unsigned integer by using the `Decimal.op_Explicit` assignment operator. Because the operator performs a narrowing conversion, you must use a casting operator in C# or a conversion function in Visual Basic.

#### Examples
The following example uses the `Decimal.ToUInt32` method to convert decimal numbers to `UInt32` values.

_Code sample not included: ~/snippets/csharp/System/Decimal/ToUInt32/touint32_1.cs._

## Decimal.ToUInt64(Decimal) method

```csharp
public static ulong ToUInt64 (decimal d);
```

Converts the value of the specified `Decimal` to the equivalent 64-bit unsigned integer.

Parameters:

- `d`: The decimal number to convert.

Returns: A 64-bit unsigned integer equivalent to the value of `d`.

Exceptions:

- `OverflowException`: `d` is negative or greater than <see cref="F:System.UInt64.MaxValue">UInt64.MaxValue</see>.

#### Remarks
The return value is the integral part of the decimal value; fractional digits are truncated.

You can also convert a `Decimal` value to an 64-bit unsigned integer by using the `Decimal.op_Explicit` assignment operator. Because the operator performs a narrowing conversion, you must use a casting operator in C# or a conversion function in Visual Basic.

#### Examples
The following example uses the `Decimal.ToUInt64` method to convert decimal numbers to `UInt64` values.

_Code sample not included: ~/snippets/csharp/System/Decimal/ToUInt64/touint64_1.cs._

## Decimal.Truncate(Decimal) method

```csharp
public static decimal Truncate (decimal d);
```

Returns the integral digits of the specified `Decimal`; any fractional digits are discarded.

Parameters:

- `d`: The decimal number to truncate.

Returns: The result of `d` rounded toward zero, to the nearest whole number.

#### Remarks
This method rounds `d` toward zero, to the nearest whole number, which corresponds to discarding any digits after the decimal point.

#### Examples
The following code example uses the `Truncate` method to discard the fractional digits of several `Decimal` values.

_Code sample not included: ~/snippets/csharp/System/Decimal/Negate/floor_neg_trunc.cs._

## Decimal.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

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

## Decimal.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current decimal instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Decimal.TryGetBits(Decimal, Int32>, Int32) method

```csharp
public static bool TryGetBits (decimal d, Span<int> destination, out int valuesWritten);
```

Tries to convert the value of a specified instance of `Decimal` to its equivalent binary representation.

Parameters:

- `d`: The value to convert.
- `destination`: The span into which to store the binary representation.
- `valuesWritten`: When this method returns, contains the number of integers written to the destination.

Returns: `true` if the decimal's binary representation was written to the destination; `false` if the destination wasn't long enough.

To be added.

## Decimal.TryParse(Byte>, Decimal) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out decimal result);
```

Tries to convert a UTF-8 character span containing the string representation of a number to its signed decimal equivalent.

Parameters:

- `utf8Text`: A span containing the UTF-8 characters representing the number to convert.
- `result`: When this method returns, contains the signed decimal value equivalent to the number contained in `utf8Text` if the conversion succeeded, or zero if the conversion failed. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `utf8Text` was converted successfully; otherwise, `false`.

To be added.

## Decimal.TryParse(Char>, Decimal) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out decimal result);
```

Converts the span representation of a number to its `Decimal` equivalent using the culture-specific format. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A span containing the characters representing the number to convert.
- `result`: When this method returns, contains the `Decimal` number that is equivalent to the numeric value contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty` or represents a number less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>. This parameter is passed uininitialized; any value originally supplied in `result` is overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## Decimal.TryParse(String, Decimal) method

```csharp
public static bool TryParse (string? s, out decimal result);
```

Converts the string representation of a number to its `Decimal` equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: The string representation of the number to convert.
- `result`: When this method returns, contains the `Decimal` number that is equivalent to the numeric value contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not a number in a valid format, or represents a number less than <see cref="F:System.Decimal.MinValue">Decimal.MinValue</see> or greater than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>. This parameter is passed uininitialized; any value originally supplied in `result` is overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

#### Remarks
This overload differs from the `Parse` method by returning a Boolean value that indicates whether the parse operation succeeded instead of returning the parsed numeric value. It eliminates the need to use exception handling to test for a `FormatException` in the event that `s` is invalid and cannot be successfully parsed.

Parameter `s` contains a number of the form:

ws[digits,]digits.fractional-digits

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional sign.|
|*digits*|A sequence of digits ranging from 0 to 9.|
|*,*|A culture-specific thousands separator symbol.|
|*.*|A culture-specific decimal point symbol.|
|*fractional-digits*|A sequence of digits ranging from 0 to 9.|

Parameter `s` is interpreted using the `Number` style. This means that white space and thousands separators are allowed but currency symbols are not. To explicitly define the elements (such as currency symbols, thousands separators, and white space) that can be present in `s`, use the `TryParse` method overload.

Parameter `s` is parsed using the formatting information in a `NumberFormatInfo` object initialized for the current system culture. For more information, see `NumberFormatInfo.CurrentInfo`. To parse a string using the formatting information of some other specified culture, use the `TryParse` method overload.

If necessary, the value of `s` is rounded using rounding to nearest.

A `Decimal` object has 29 digits of precision. If `s` represents a number that has more than 29 digits, but has a fractional part and is within the range of `MaxValue` and `MinValue`, the number is rounded, not truncated, to 29 digits using rounding to nearest.

If during a parse operation a separator is encountered in the `s` parameter, and the applicable currency or number decimal and group separators are the same, the parse operation assumes that the separator is a decimal separator rather than a group separator. For more information about separators, see `NumberFormatInfo.CurrencyDecimalSeparator`, `NumberFormatInfo.NumberDecimalSeparator`, `NumberFormatInfo.CurrencyGroupSeparator`, and `NumberFormatInfo.NumberGroupSeparator`.

#### Examples
The following example uses the `TryParse` method to convert the string representations of numeric values to `Decimal` values. It assumes that en-US is the current culture.

_Code sample not included: ~/snippets/csharp/System/Decimal/TryParse/TryParse.cs._

## Decimal.TryParse(Byte>, IFormatProvider, Decimal) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider, out decimal result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## Decimal.TryParse(Char>, IFormatProvider, Decimal) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out decimal result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.
