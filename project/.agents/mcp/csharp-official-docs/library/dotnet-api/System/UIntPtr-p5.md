---
title: "UIntPtr struct (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UIntPtr.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UIntPtr struct (part 5 of 5)

## UIntPtr.ToString(String) method

```csharp
public string ToString (string? format);
```

Converts the numeric value of this instance to its equivalent string representation, using the specified format.

Parameters:

- `format`: A standard or custom numeric format string.

Returns: The string representation of the value of this instance as specified by `format`.

Exceptions:

- `FormatException`: `format` is invalid or not supported.

To be added.

## UIntPtr.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? provider);
```

Formats the value of the current instance using the specified format.

Parameters:

- `format`: The format to use.
-or-
A `null` reference (`Nothing` in Visual Basic) to use the default format defined for the type of the `IFormattable` implementation.
- `provider`: An object that supplies culture-specific formatting information.

Returns: The value of the current instance in the specified format.

Exceptions:

- `FormatException`: `format` is invalid or not supported.

To be added.

## UIntPtr.ToUInt32() method

```csharp
public uint ToUInt32 ();
```

Converts the value of this instance to a 32-bit unsigned integer.

Returns: A 32-bit unsigned integer equal to the value of this instance.

Exceptions:

- `OverflowException`: In a 64-bit process, the value of this instance is too large to represent as a 32-bit unsigned integer.

#### Remarks
An exception is only thrown if the value of `value` requires more bits than the executing process supports.

## UIntPtr.ToUInt64() method

```csharp
public ulong ToUInt64 ();
```

Converts the value of this instance to a 64-bit unsigned integer.

Returns: A 64-bit unsigned integer equal to the value of this instance.

To be added.

## UIntPtr.TrailingZeroCount(UIntPtr) method

```csharp
public static UIntPtr TrailingZeroCount (UIntPtr value);
```

Computes the number of trailing zeros in a value.

Parameters:

- `value`: The value whose trailing zeroes are to be counted.

Returns: The number of trailing zeros in `value`.

To be added.

## UIntPtr.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

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

## UIntPtr.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## UIntPtr.TryParse(Byte>, UIntPtr) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out UIntPtr result);
```

Tries to convert a UTF-8 character span containing the string representation of a number to its unsigned integer equivalent.

Parameters:

- `utf8Text`: A span containing the UTF-8 characters representing the number to convert.
- `result`: When this method returns, contains the unsigned integer value equivalent to the number contained in `utf8Text` if the conversion succeeded, or zero if the conversion failed. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `utf8Text` was converted successfully; otherwise, `false`.

To be added.

## UIntPtr.TryParse(Char>, UIntPtr) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out UIntPtr result);
```

Converts the read-only span of characters representation of a number to its unsigned native integer equivalent. A return value indicates whether the conversion succeeded.

Parameters:

- `s`: A read-only span of characters containing a number to convert.
- `result`: When this method returns, contains the unsigned native integer value equivalent of the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is empty, is not of the correct format, or represents a number less than `UIntPtr.MinValue` or greater than `UIntPtr.MaxValue`. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## UIntPtr.TryParse(String, UIntPtr) method

```csharp
public static bool TryParse (string? s, out UIntPtr result);
```

Converts the string representation of a number to its unsigned native integer equivalent. A return value indicates whether the conversion succeeded.

Parameters:

- `s`: A string containing a number to convert.
- `result`: When this method returns, contains the unsigned native integer value equivalent of the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or empty, is not of the correct format, or represents a number less than `UIntPtr.MinValue` or greater than `UIntPtr.MaxValue`. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## UIntPtr.TryParse(Byte>, IFormatProvider, UIntPtr) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider, out UIntPtr result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## UIntPtr.TryParse(Char>, IFormatProvider, UIntPtr) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out UIntPtr result);
```

Tries to parse a string into a value.

Parameters:

- `s`: A read-only span of characters containing a number to convert.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## UIntPtr.TryParse(String, IFormatProvider, UIntPtr) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out UIntPtr result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## UIntPtr.TryParse(Byte>, NumberStyles, IFormatProvider, UIntPtr) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out UIntPtr result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## UIntPtr.TryParse(Char>, NumberStyles, IFormatProvider, UIntPtr) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out UIntPtr result);
```

Converts the read-only span of characters representation of a number in a specified style and culture-specific format to its unsigned native integer equivalent. A return value indicates whether the conversion succeeded.

Parameters:

- `s`: A read-only span of characters containing a number to convert. The span is interpreted using the style specified by `style`.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains the unsigned native integer value equivalent of the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is empty, is not of the correct format, or represents a number less than `UIntPtr.MinValue` or greater than `UIntPtr.MaxValue`. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## UIntPtr.TryParse(String, NumberStyles, IFormatProvider, UIntPtr) method

```csharp
public static bool TryParse (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out UIntPtr result);
```

Converts the string representation of a number in a specified style and culture-specific format to its unsigned native integer equivalent. A return value indicates whether the conversion succeeded.

Parameters:

- `s`: A string containing a number to convert. The string is interpreted using the style specified by `style`.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains the unsigned native integer value equivalent of the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or empty, is not of the correct format, or represents a number less than `UIntPtr.MinValue` or greater than `UIntPtr.MaxValue`. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## UIntPtr.TryParsePartial(Byte>, NumberStyles, IFormatProvider, UIntPtr, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out UIntPtr result, out int bytesConsumed);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.
- `bytesConsumed`: To be added.

Returns: To be added.

To be added.

## UIntPtr.TryParsePartial(Char>, NumberStyles, IFormatProvider, UIntPtr, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out UIntPtr result, out int charsConsumed);
```

To be added.

Parameters:

- `s`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.
- `charsConsumed`: To be added.

Returns: To be added.

To be added.

## UIntPtr.TryParsePartial(String, NumberStyles, IFormatProvider, UIntPtr, Int32) method

```csharp
public static bool TryParsePartial (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out UIntPtr result, out int charsConsumed);
```

To be added.

Parameters:

- `s`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.
- `charsConsumed`: To be added.

Returns: To be added.

To be added.

## UIntPtr.Zero field

```csharp
public static readonly UIntPtr Zero;
```

A read-only field that represents an unsigned integer that has been initialized to zero.

#### Remarks
The value of this field is not equivalent to `null`. Use this field to efficiently determine whether an instance of `UIntPtr` has been set to a value other than zero.

For example, assume the variable, uip, is an instance of `UIntPtr`. You can determine if it has been set by comparing it to the value returned by a constructor, for example, `if uip != new UIntPtr(0)...`. However, invoking a constructor to get an uninitialized pointer is inefficient. It is better to code either `if uip != UIntPtr.Zero...` or `if !UIntPtr.Zero.Equals(uip)...`.
