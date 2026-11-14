---
title: "Byte struct (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Byte.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Byte struct (part 6 of 7)

## Byte.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the numeric value of the current `Byte` object to its equivalent string representation using the specified culture-specific formatting information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this object in the format specified by the `provider` parameter.

#### Remarks
The return value is formatted with the general numeric format specifier ("G").

The `provider` parameter is an object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of the string that is returned by this method. The object that implements `IFormatProvider` can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting rules are to be used.

- A `NumberFormatInfo` object that contains specific numeric formatting information for this value.

- A custom object that implements `IFormatProvider`.

If `provider` is `null` or a `NumberFormatInfo` object cannot be obtained from `provider`, the return value is formatted using the `NumberFormatInfo` object for the thread current culture. For information about the thread current culture, see `Thread.CurrentCulture`.

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

#### Examples
The following example iterates an array of byte values and displays each of them to the console by calling the `ToString` method with different format providers.

_Code sample not included: ~/snippets/csharp/System/Byte/ToString/NewByteMembers.cs._

## Byte.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the value of the current `Byte` object to its equivalent string representation using the specified format.

Parameters:

- `format`: A numeric format string.

Returns: The string representation of the current `Byte` object, formatted as specified by the `format` parameter.

Exceptions:

- `FormatException`: `format` includes an unsupported specifier. Supported format specifiers are listed in the Remarks section.

#### Remarks
The `format` parameter can be either a standard or a custom numeric format string. All standard numeric format strings other than "R" (or "r") are supported, as are all custom numeric format characters. If `format` is `null` or an empty string (""), the return value is formatted with the general numeric format specifier ("G").

The return value of this function is formatted using the `NumberFormatInfo` object for the thread current culture. For information about the thread current culture, see `Thread.CurrentCulture`. To provide formatting information for cultures other than the current culture, call the `ToString` method.

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

#### Examples
The following example initializes a `Byte` value and displays it to the console using each of the supported standard format strings and a custom format string. The example is run with en-US as the current culture.

_Code sample not included: ~/snippets/csharp/System/Byte/ToString/NewByteMembers.cs._

## Byte.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Converts the value of the current `Byte` object to its equivalent string representation using the specified format and culture-specific formatting information.

Parameters:

- `format`: A standard or custom numeric format string.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The string representation of the current `Byte` object, formatted as specified by the `format` and `provider` parameters.

Exceptions:

- `FormatException`: `format` includes an unsupported specifier. Supported format specifiers are listed in the Remarks section.

#### Remarks
The `ToString` method formats a `Byte` value in a specified format of a specified culture. To format a number by using the default ("G") format of the current culture, call the `ToString` method. To format a number by using a specified format of the current culture, call the `ToString` method.

The `format` parameter can be either a standard or a custom numeric format string. All standard numeric format strings other than "R" (or "r") are supported, as are all custom numeric format characters. If `format` is `null` or an empty string (""), the return value of this method is formatted with the general numeric format specifier ("G").

The `provider` parameter is an object that implements the `IFormatProvider` interface. Its `IFormatProvider.GetFormat` method returns a `NumberFormatInfo` object that provides culture-specific information about the format of the string that is returned by this method. The object that implements `IFormatProvider` can be any of the following:

- A `CultureInfo` object that represents the culture whose formatting rules are to be used.

- A `NumberFormatInfo` object that contains specific numeric formatting information for this value.

- A custom object that implements `IFormatProvider`.

If `provider` is `null` or a `NumberFormatInfo` object cannot be obtained from `provider`, the return value is formatted using the `NumberFormatInfo` object for the thread current culture. For information about the thread current culture, see `Thread.CurrentCulture`.

.NET provides extensive formatting support, which is described in greater detail in the following formatting topics:

- For more information about numeric format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- For more information about formatting, see Formatting Types.

#### Examples
The following example uses the standard "N" format string and four different `CultureInfo` objects to display the string representation of a byte value to the console.

_Code sample not included: ~/snippets/csharp/System/Byte/ToString/NewByteMembers.cs._

## Byte.TrailingZeroCount(Byte) method

```csharp
public static byte TrailingZeroCount (byte value);
```

Computes the number of trailing zeros in a value.

Parameters:

- `value`: The value whose trailing zeroes are to be counted.

Returns: The number of trailing zeros in `value`.

To be added.

## Byte.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

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

## Byte.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current 8-bit unsigned integer instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, the number of characters that were written in `destination`.
- `format`: A span containing the charactes that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Byte.TryParse(Byte>, Byte) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out byte result);
```

Tries to convert a UTF-8 character span containing the string representation of a number to its 8-bit unsigned integer equivalent.

Parameters:

- `utf8Text`: A span containing the UTF-8 characters representing the number to convert.
- `result`: When this method returns, contains the 8-bit unsigned integer value equivalent to the number contained in `utf8Text` if the conversion succeeded, or zero if the conversion failed. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `utf8Text` was converted successfully; otherwise, `false`.

To be added.

## Byte.TryParse(Char>, Byte) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out byte result);
```

Tries to convert the span representation of a number to its `Byte` equivalent, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A span containing the characters representing the number to convert.
- `result`: When this method returns, contains the `Byte` value equivalent to the number contained in `s` if the conversion succeeded, or zero if the conversion failed. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## Byte.TryParse(String, Byte) method

```csharp
public static bool TryParse (string? s, out byte result);
```

Tries to convert the string representation of a number to its `Byte` equivalent, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string that contains a number to convert.
- `result`: When this method returns, contains the `Byte` value equivalent to the number contained in `s` if the conversion succeeded, or zero if the conversion failed. This parameter is passed uninitialized; any value originally supplied in `result` will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

#### Remarks
The conversion fails and the method returns `false` if the `s` parameter is not in the correct format, if it is `null` or `Empty`, or if it represents a number less than `MinValue` or greater than `MaxValue`.

The `TryParse` method is similar to the `Parse` method, except that `TryParse` does not throw an exception if the conversion fails.

The `s` parameter should be the string representation of a number in the following form:

```txt
[ws][sign]digits[ws]
```

Elements in square brackets ([ and ]) are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*ws*|Optional white space.|
|*sign*|An optional positive sign, as specified by the `PositiveSign` property of the current culture.|
|*digits*|A sequence of decimal digits that range from 0 to 9.|

The `s` parameter is interpreted using the `Integer` style. In addition to the byte value's decimal digits, only leading and trailing spaces together with a leading sign are allowed. (If the sign is present, it must be a positive sign or the method throws an `OverflowException`.) To explicitly define the style elements together with the culture-specific formatting information that can be present in `s`, use the `Parse` method.

The `s` parameter is parsed using the formatting information in a `NumberFormatInfo` object for the current culture. For more information, see `NumberFormatInfo.CurrentInfo`.

This overload of the `TryParse` method interprets all digits in the `s` parameter as decimal digits. To parse the string representation of a hexadecimal number, call the `TryParse` overload.

#### Examples
The following example calls the `TryParse` method with a number of different string values.

_Code sample not included: ~/snippets/csharp/System/Byte/TryParse/TryParse.cs._

## Byte.TryParse(Byte>, IFormatProvider, Byte) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider, out byte result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## Byte.TryParse(Char>, IFormatProvider, Byte) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out byte result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Byte.TryParse(String, IFormatProvider, Byte) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out byte result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.
