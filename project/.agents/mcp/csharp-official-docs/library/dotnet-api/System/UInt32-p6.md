---
title: "UInt32 struct (part 6 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UInt32.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UInt32 struct (part 6 of 8)

## UInt32.ToString() method

```csharp
public override string ToString ();
```

Converts the numeric value of this instance to its equivalent string representation.

Returns: The string representation of the value of this instance, consisting of a sequence of digits ranging from 0 to 9, without a sign or leading zeroes.

#### Remarks
The `ToString` method formats a `UInt32` value in the default ("G", or general) format by using the `NumberFormatInfo` object of the current culture. If you want to specify a different format or culture, use the other overloads of the `UInt32.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|A specific culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|
|A specific format|A specific culture|`ToString`|

#### Examples
The following example displays a `UInt32` value by using the default `ToString` method. It also displays the string representations of the `UInt32` value that results from using some standard format specifiers. The examples are displayed using the formatting conventions of the en-US culture.

_Code sample not included: ~/snippets/csharp/System/UInt32/ToString/tostring1.cs._

## UInt32.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified culture-specific format information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance, which consists of a sequence of digits ranging from 0 to 9, without a sign or leading zeros.

#### Remarks
The `ToString` method formats a `UInt32` value in the default ("G", or general) format by using the `NumberFormatInfo` object of a specified culture. If you want to specify a different format or the current culture, use the other overloads of the `UInt32.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|
|A specific format|A specific culture|`ToString`|

The `provider` parameter is an `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific formatting information. However, none of the properties of the `NumberFormatInfo` are used when formatting with the general numeric format specifier ("G").

#### Examples
The following example formats a 16-bit signed integer value by using several format providers, including one for the invariant culture. The output from the example illustrates that the formatted string returned by the `ToString` method is the same regardless of the format provider.

_Code sample not included: ~/snippets/csharp/System/UInt32/ToString/tostring2.cs._

## UInt32.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the numeric value of this instance to its equivalent string representation using the specified format.

Parameters:

- `format`: A numeric format string.

Returns: The string representation of the value of this instance as specified by `format`.

Exceptions:

- `FormatException`: The `format` parameter is invalid.

#### Remarks
The `ToString` method formats a `UInt32` value in a specified format by using a `NumberFormatInfo` object that represents the conventions of the current culture. If you want to use the default ("G", or general) format or specify a different culture, use the other overloads of the `UInt32.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|Default ("G") format|A specific culture|`ToString`|
|A specific format|A specific culture|`ToString`|

The `format` parameter can be any valid Standard Numeric Format Strings, or any combination of Custom Numeric Format Strings. If `format` is equal to `Empty` or is `null`, the return value of the current `UInt32` object is formatted with the general format specifier ("G"). If `format` is any other value, the method throws a `FormatException`.

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about support for formatting in .NET, see Formatting Types.

The format of the returned string is determined by the `NumberFormatInfo` object for the current culture. Depending on the `format` parameter, this object controls symbols such as the group separator and the decimal point symbol in the output string. To provide formatting information for cultures other than the current culture, call the `ToString` overload.

#### Examples
The following example displays a 32-bit unsigned integer value by using each standard format string and some custom format strings.

_Code sample not included: ~/snippets/csharp/System/UInt32/ToString/tostring3.cs._

## UInt32.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Converts the numeric value of this instance to its equivalent string representation using the specified format and culture-specific format information.

Parameters:

- `format`: A numeric format string.
- `provider`: An object that supplies culture-specific formatting information about this instance.

Returns: The string representation of the value of this instance as specified by `format` and `provider`.

Exceptions:

- `FormatException`: The `format` parameter is invalid.

#### Remarks
The `ToString` method formats a `UInt32` value in a specified format by using the `NumberFormatInfo` object of a specified culture. If you want to use default format or culture settings, use the other overloads of the `UInt32.ToString` method, as follows:

|To use format|For culture|Use the overload|
|-------------------|-----------------|----------------------|
|Default ("G") format|Default (current) culture|`ToString`|
|Default ("G") format|A specific culture|`ToString`|
|A specific format|Default (current) culture|`ToString`|

The `format` parameter can be any valid Standard Numeric Format Strings, or any combination of Custom Numeric Format Strings. If `format` is equal to `Empty` or is `null`, the return value of the current `UInt32` object is formatted with the general format specifier ("G"). If `format` is any other value, the method throws a `FormatException`.

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

The `provider` parameter is an `IFormatProvider` implementation. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of the string returned by this method. When the `ToString` method is invoked, it calls the `provider` parameter's `IFormatProvider.GetFormat` method and passes it a `Type` object that represents the `NumberFormatInfo` type. The `IFormatProvider.GetFormat` method then returns the `NumberFormatInfo` object that provides information for formatting the current `UInt32` value, such as the group separator symbol or the decimal point symbol. There are three ways to use the `provider` parameter to supply formatting information to the `ToString` method:

- You can pass a `CultureInfo` object that represents the culture that supplies formatting information. Its `CultureInfo.GetFormat` method returns the `NumberFormatInfo` object that provides numeric formatting information for that culture.

- You can pass the actual `NumberFormatInfo` object that provides numeric formatting information. (Its implementation of `NumberFormatInfo.GetFormat` just returns itself.)

- You can pass a custom object that implements `IFormatProvider`. Its `IFormatProvider.GetFormat` method instantiates and returns the `NumberFormatInfo` object that provides formatting information.

If `provider` is `null`, the formatting of the returned string is based on the `NumberFormatInfo` object of the current culture.

#### Examples
The following example displays a 32-bit unsigned integer value by using the standard numeric format specifiers and a number of specific `CultureInfo` objects.

_Code sample not included: ~/snippets/csharp/System/UInt32/ToString/tostring4.cs._

## UInt32.TrailingZeroCount(UInt32) method

```csharp
public static uint TrailingZeroCount (uint value);
```

Computes the number of trailing zeros in a value.

Parameters:

- `value`: The value whose trailing zeroes are to be counted.

Returns: The number of trailing zeros in `value`.

To be added.

## UInt32.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

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

## UInt32.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current unsigned integer number instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## UInt32.TryParse(Byte>, UInt32) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out uint result);
```

Tries to convert a UTF-8 character span containing the string representation of a number to its 32-bit unsigned integer equivalent.

Parameters:

- `utf8Text`: A span containing the UTF-8 characters representing the number to convert.
- `result`: When this method returns, contains the 32-bit unsigned integer value equivalent to the number contained in `utf8Text` if the conversion succeeded, or zero if the conversion failed. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `utf8Text` was converted successfully; otherwise, `false`.

To be added.

## UInt32.TryParse(Char>, UInt32) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out uint result);
```

Tries to convert the span representation of a number to its 32-bit unsigned integer equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A span containing the characters that represent the number to convert.
- `result`: When this method returns, contains the 32-bit unsigned integer value that is equivalent to the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty`, is not of the correct format, or represents a number that is less than <see cref="F:System.UInt32.MinValue">UInt32.MinValue</see> or greater than <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see>. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.
