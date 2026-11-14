---
title: "Half struct (part 6 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Half.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Half struct (part 6 of 6)

## Half.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current `Half` instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful, otherwise, `false`.

To be added.

## Half.TryParse(Byte>, Half) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out Half result);
```

Tries to convert a UTF-8 character span containing the string representation of a number to its half-precision floating-point number equivalent.

Parameters:

- `utf8Text`: A read-only UTF-8 character span that contains the number to convert.
- `result`: When this method returns, contains a half-precision floating-point number equivalent of the numeric value or symbol contained in `utf8Text` if the conversion succeeded or zero if the conversion failed. The conversion fails if the `utf8Text` is `ReadOnlySpan<T>.Empty` or is not in a valid format. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `utf8Text` was converted successfully; otherwise, `false`.

To be added.

## Half.TryParse(Char>, Half) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out Half result);
```

Converts the span representation of a number to its half-precision floating-point number equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A read-only span that contains a number to convert.
- `result`: When this method returns, contains the half-precision floating-point number equivalent to the numeric value or symbol contained in `s`, if the conversion succeeded, or a default `Half` value if the conversion failed. The conversion fails if the `s` parameter is `null` or `String.Empty` or is not a number in a valid format. If `s` is a valid number less than `Half.MinValue`, `result` contains `Half.NegativeInfinity`. If `s` is a valid number greater than `Half.MaxValue`, `result` contains `Half.PositiveInfinity`. This parameter is treated as uninitialized.

Returns: `true` if `s` was converted successfully, `false` otherwise.

To be added.

## Half.TryParse(String, Half) method

```csharp
public static bool TryParse (string? s, out Half result);
```

Converts the string representation of a number to its half-precision floating-point number equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A string that contains a number to convert.
- `result`: When this method returns, contains the half-precision floating-point number equivalent to the numeric value or symbol contained in `s`, if the conversion succeeded, or a default `Half` value if the conversion failed. The conversion fails if `s` is `null` or `String.Empty` or is not a number in a valid format. If `s` is a valid number less than `Half.MinValue`, `result` contains `Half.NegativeInfinity`. If `s` is a valid number greater than `Half.MaxValue`, `result` contains `Half.PositiveInfinity`. This parameter is treated as uninitialized.

Returns: `true` if the conversion was successful; otherwise, `false`.

To be added.

## Half.TryParse(Byte>, IFormatProvider, Half) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider? provider, out Half result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## Half.TryParse(Char>, IFormatProvider, Half) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out Half result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Half.TryParse(String, IFormatProvider, Half) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out Half result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## Half.TryParse(Byte>, NumberStyles, IFormatProvider, Half) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out Half result);
```

Tries to parse a span of UTF-8 characters into a value.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `style`: A bitwise combination of number styles that can be present in `utf8Text`.
- `provider`: An object that provides culture-specific formatting information about `utf8Text`.
- `result`: On return, contains the result of successfully parsing `utf8Text` or an undefined value on failure.

Returns: `true` if `utf8Text` was successfully parsed; otherwise, `false`.

To be added.

## Half.TryParse(Char>, NumberStyles, IFormatProvider, Half) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out Half result);
```

Converts the span representation of a number to its half-precision floating-point number equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A read-only span that contains a number to convert.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains the half-precision floating-point number equivalent to the numeric value or symbol contained in `s`, if the conversion succeeded, or a default `Half` value if the conversion failed. The conversion fails if `s` is not a number in a valid format. If `s` is a valid number less than `Half.MinValue`, `result` contains `Half.NegativeInfinity`. If `s` is a valid number greater than `Half.MaxValue`, `result` contains `Half.PositiveInfinity`. This parameter is treated as uninitialized.

Returns: `true` if the conversion was successful; otherwise, `false`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`NumberStyles` is the `NumberStyles.AllowHexSpecifier` value.

To be added.

## Half.TryParse(String, NumberStyles, IFormatProvider, Half) method

```csharp
public static bool TryParse (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out Half result);
```

Converts the string representation of a number to its half-precision floating-point number equivalent. A return value indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A string that contains a number to convert.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains the half-precision floating-point number equivalent to the numeric value or symbol contained in `s`, if the conversion succeeded, or a default `Half` value if the conversion failed. The conversion fails if `s` is `null` or `String.Empty` or is not a number in a valid format. If `s` is a valid number less than `Half.MinValue`, `result` contains `Half.NegativeInfinity`. If `s` is a valid number greater than `Half.MaxValue`, `result` contains `Half.PositiveInfinity`. This parameter is treated as uninitialized.

Returns: `true` if the conversion was successful; otherwise, `false`.

Exceptions:

- `ArgumentException`: `style` is not a `NumberStyles` value.

-or-

`NumberStyles` is the `NumberStyles.AllowHexSpecifier` value.

To be added.

## Half.TryParsePartial(Byte>, NumberStyles, IFormatProvider, Half, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out Half result, out int bytesConsumed);
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

## Half.TryParsePartial(Char>, NumberStyles, IFormatProvider, Half, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out Half result, out int charsConsumed);
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

## Half.TryParsePartial(String, NumberStyles, IFormatProvider, Half, Int32) method

```csharp
public static bool TryParsePartial (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out Half result, out int charsConsumed);
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
