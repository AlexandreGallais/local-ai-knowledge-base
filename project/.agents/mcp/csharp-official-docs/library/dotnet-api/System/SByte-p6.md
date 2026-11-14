---
title: "SByte struct (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/SByte.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SByte struct (part 6 of 7)

## SByte.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified culture-specific format information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance, as specified by `provider`.

#### Remarks
The `ToString` method formats an `SByte` value in the default ("G", or general) format of a specified culture. If you want to specify a different format or the current culture, use the other overloads of the `SByte.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|
|A specific format|A specific culture|`ToString`|

The `provider` parameter is an `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of the string returned by this method. If `provider` is `null`, the `SByte` value is formatted using the `NumberFormatInfo` object of the current culture. The only property of the `NumberFormatInfo` object that controls the string representation of the `SByte` value using the general format specifier is `NumberFormatInfo.NegativeSign`, which defines the character that represents the negative sign.

The `provider` parameter can be one of the following:

- A `CultureInfo` object that represents the culture that supplies formatting information.

- The `NumberFormatInfo` object that supplies formatting information.

- A custom object that implements `IFormatProvider`. Its `IFormatProvider.GetFormat` method returns the `NumberFormatInfo` object that supplies formatting information.

#### Examples
The following example defines a custom `NumberFormatInfo` object and assigns the "~" character to its `NegativeSign` property. The example then uses this custom object as well as the `NumberFormatInfo` object of the invariant culture to format a series of `SByte` values.

_Code sample not included: ~/snippets/csharp/System/SByte/ToString/tostring3.cs._

## SByte.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the numeric value of this instance to its equivalent string representation, using the specified format.

Parameters:

- `format`: A standard or custom numeric format string.

Returns: The string representation of the value of this instance as specified by `format`.

Exceptions:

- `FormatException`: `format` is invalid.

#### Remarks
The `ToString` method formats an `SByte` value in a specified format by using the conventions of the current culture. If you want to use the default ("G", or general) format or specify a different culture, use the other overloads of the `SByte.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|Default ("G") format|A specific culture|`ToString`|
|A specific format|A specific culture|`ToString`|

The `format` parameter can be any valid standard numeric format specifier, or any combination of custom numeric format specifiers. If `format` is equal to `Empty` or is `null`, the return value of the current `SByte` object is formatted with the general format specifier ("G"). If `format` is any other value, the method throws a `FormatException`.

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about support for formatting in .NET, see Formatting Types.

The format of the returned string is determined by the `NumberFormatInfo` object for the current culture. Depending on the `format` parameter, this object controls symbols such as the negative sign, the group separator, and the decimal point symbol in the output string. To provide formatting information for cultures other than the current culture, call the `ToString` overload.

#### Examples
The following example initializes an array of `SByte` values and displays them by using each standard format string and some custom format strings.

_Code sample not included: ~/snippets/csharp/System/SByte/ToString/tostring4.cs._

## SByte.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified format and culture-specific format information.

Parameters:

- `format`: A standard or custom numeric format string.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `format` and `provider`.

Exceptions:

- `FormatException`: `format` is invalid.

#### Remarks
The `ToString` method formats an `SByte` value in a specified format of a specified culture. If you want to use default format or culture settings, use the other overloads of the `SByte.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|Default ("G") format|A specific culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|

The `format` parameter can be any valid standard numeric format specifier, or any combination of custom numeric format specifiers. If `format` is equal to `Empty` or is `null`, the return value of the current `SByte` object is formatted with the general format specifier ("G"). If `format` is any other value, the method throws a `FormatException`.

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about support for formatting in .NET, see Formatting Types.

The `provider` parameter is an `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of the string returned by this method. When the `ToString` method is invoked, it calls the `provider` parameter's `IFormatProvider.GetFormat` method and passes it a `Type` object that represents the `NumberFormatInfo` type. The `IFormatProvider.GetFormat` method then returns the `NumberFormatInfo` object that provides information for formatting the `value` parameter, such as the negative sign symbol, the group separator symbol, or the decimal point symbol. There are three ways to use the `provider` parameter to supply formatting information to the `ToString` method:

- You can pass a `CultureInfo` object that represents the culture that supplies formatting information. Its `CultureInfo.GetFormat` method returns the `NumberFormatInfo` object that provides numeric formatting information for that culture.

- You can pass the actual `NumberFormatInfo` object that provides numeric formatting information. (Its implementation of `NumberFormatInfo.GetFormat` just returns itself.)

- You can pass a custom object that implements `IFormatProvider`. Its `IFormatProvider.GetFormat` method instantiates and returns the `NumberFormatInfo` object that provides formatting information.

If `provider` is `null`, the formatting of the returned string is based on the `NumberFormatInfo` object of the current culture.

#### Examples
The following example displays both a positive and a negative `SByte` value using the standard numeric format specifiers and a number of specific `CultureInfo` objects.

_Code sample not included: ~/snippets/csharp/System/SByte/ToString/tostring5.cs._

## SByte.TrailingZeroCount(SByte) method

```csharp
public static sbyte TrailingZeroCount (sbyte value);
```

Computes the number of trailing zeros in a value.

Parameters:

- `value`: The value whose trailing zeroes are to be counted.

Returns: The number of trailing zeros in `value`.

To be added.

## SByte.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

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

## SByte.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current 8-bit signed integer instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## SByte.TryParse(Byte>, SByte) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out sbyte result);
```

Tries to convert a UTF-8 character span containing the string representation of a number to its 8-bit signed integer equivalent.

Parameters:

- `utf8Text`: A span containing the UTF-8 characters representing the number to convert.
- `result`: When this method returns, contains the 8-bit signed integer value equivalent to the number contained in `utf8Text` if the conversion succeeded, or zero if the conversion failed. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `utf8Text` was converted successfully; otherwise, `false`.

To be added.

## SByte.TryParse(Char>, SByte) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out sbyte result);
```

Tries to convert the span representation of a number to its `SByte` equivalent, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A span containing the characters representing the number to convert.
- `result`: When this method returns, contains the 8-bit signed integer value that is equivalent to the number contained in `s` if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not in the correct format, or represents a number that is less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## SByte.TryParse(String, SByte) method

```csharp
public static bool TryParse (string? s, out sbyte result);
```

Tries to convert the string representation of a number to its `SByte` equivalent, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string that contains a number to convert.
- `result`: When this method returns, contains the 8-bit signed integer value that is equivalent to the number contained in `s` if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not in the correct format, or represents a number that is less than <see cref="F:System.SByte.MinValue">SByte.MinValue</see> or greater than <see cref="F:System.SByte.MaxValue">SByte.MaxValue</see>. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

#### Remarks
The `TryParse` method is like the `Parse` method, except that it does not throw an exception if the conversion fails. This method eliminates the need to use exception handling to test for a `FormatException` if `value` is invalid and cannot be successfully parsed.

The `s` parameter should be the string representation of a decimal number in the following form:

*ws**digits*[*ws*]

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional sign. Valid sign characters are determined by the `NumberFormatInfo.NegativeSign` and `NumberFormatInfo.PositiveSign` properties of the current culture.|
|*digits*|A sequence of decimal digits ranging from 0 to 9.|

> **Note:**
>  The string specified by the `value` parameter cannot contain any group separators or decimal separator, and it cannot have a decimal portion.

The `s` parameter is interpreted by using the `Integer` style. In addition to the decimal digits, only leading and trailing spaces with a leading sign are allowed. To explicitly define the style elements with the culture-specific formatting information that can be present in `value`, call the `TryParse` method.

The `s` parameter is parsed by using the formatting information in a `NumberFormatInfo` object for the current culture. For more information, see `NumberFormatInfo.CurrentInfo`.

This overload interprets all digits in the `value` parameter as decimal digits. To parse the string representation of a hexadecimal number, call the `TryParse` overload instead.

#### Examples
The following example tries to convert the strings in an array to `SByte` values by calling the `TryParse` method.

_Code sample not included: ~/snippets/csharp/System/SByte/TryParse/TryParse1.cs._
