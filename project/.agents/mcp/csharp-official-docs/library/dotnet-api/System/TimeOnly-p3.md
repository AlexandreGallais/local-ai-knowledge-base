---
title: "TimeOnly struct (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeOnly.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeOnly struct (part 3 of 4)

## TimeOnly.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

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

## TimeOnly.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format = default, IFormatProvider? provider = default);
```

Tries to format the value of the current TimeOnly instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

#### Remarks

The accepted standard formats are 'r', 'R', 'o', 'O', 't', and 'T'.

## TimeOnly.TryParse(Char>, TimeOnly) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, out TimeOnly result);
```

Converts the specified span representation of a time to its TimeOnly equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A span containing the characters representing the time to convert.
- `result`: When this method returns, contains the TimeOnly value equivalent to the time contained in `s`, if the conversion succeeded, or MinValue if the conversion failed. The conversion fails if `s` is the empty string or does not contain a valid string representation of a time. This parameter is passed uninitialized.

Returns: `true` if the conversion was successful; otherwise, `false`.

To be added.

## TimeOnly.TryParse(String, TimeOnly) method

```csharp
public static bool TryParse (string? s, out TimeOnly result);
```

Converts the specified string representation of a time to its `TimeOnly` equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string containing the time to convert.
- `result`: When this method returns, contains the `TimeOnly` value equivalent to the time contained in `s`, if the conversion succeeded, or <see cref="F:System.TimeOnly.MinValue">TimeOnly.MinValue</see> if the conversion failed. The conversion fails if `s` is an empty string or does not contain a valid string representation of a time. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## TimeOnly.TryParse(Char>, IFormatProvider, TimeOnly) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out TimeOnly result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: A span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the `TimeOnly` value equivalent to the time contained in `s`, if the conversion succeeded, or `TimeOnly.MinValue` if the conversion failed. The conversion fails if `s` is the empty string or does not contain a valid string representation of a time. This parameter is passed uninitialized.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## TimeOnly.TryParse(String, IFormatProvider, TimeOnly) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out TimeOnly result);
```

Tries to parse a string into a value.

Parameters:

- `s`: A string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the `TimeOnly` value equivalent to the time contained in `s`, if the conversion succeeded, or `TimeOnly.MinValue` if the conversion failed. The conversion fails if `s` is the empty string or does not contain a valid string representation of a time. This parameter is passed uninitialized.

Returns: `true` if `s` was parsed successfully; otherwise, `false`.

To be added.

## TimeOnly.TryParse(Char>, IFormatProvider, DateTimeStyles, TimeOnly) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, System.Globalization.DateTimeStyles style, out TimeOnly result);
```

Converts the specified span representation of a time to its `TimeOnly` equivalent using the specified array of formats, culture-specific format information and style, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string containing the characters that represent a time to convert.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `DateTimeStyles.None`.
- `result`: When this method returns, contains the `TimeOnly` value equivalent to the time contained in `s`, if the conversion succeeded, or <see cref="F:System.TimeOnly.MinValue">TimeOnly.MinValue</see> if the conversion failed. The conversion fails if `s` is an empty string or does not contain a valid string representation of a date. This parameter is passed uninitialized.

Returns: `true` if`s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, the `style` parameter is invalid.

To be added.

## TimeOnly.TryParse(String, IFormatProvider, DateTimeStyles, TimeOnly) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, System.Globalization.DateTimeStyles style, out TimeOnly result);
```

Converts the specified string representation of a time to its `TimeOnly` equivalent using the specified array of formats, culture-specific format information and style, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string containing the time to convert.
- `provider`: The culture-specific formatting information about `s`.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `DateTimeStyles.None`.
- `result`: When this method returns, contains the `TimeOnly` value equivalent to the time contained in `s`, if the conversion succeeded, or <see cref="F:System.TimeOnly.MinValue">TimeOnly.MinValue</see> if the conversion failed. The conversion fails if `s` is an empty string or does not contain a valid string representation of a time. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, the `style` parameter is invalid.

To be added.

## TimeOnly.TryParseExact(Char>, Char>, TimeOnly) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> s, ReadOnlySpan<char> format, out TimeOnly result);
```

Converts the specified span representation of a time to its `TimeOnly` equivalent using the specified format and style.
The format of the string representation must match the specified format exactly. The method returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A span containing the time to convert.
- `format`: The required format of `s`.
- `result`: When this method returns, contains the `TimeOnly` value equivalent to the time contained in `s`, if the conversion succeeded, or <see cref="F:System.TimeOnly.MinValue">TimeOnly.MinValue</see> if the conversion failed. The conversion fails if `s` is an empty string or does not contain a time that corresponds to the pattern specified in `format`. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, the `format` parameter contains an invalid format specifier.

To be added.

## TimeOnly.TryParseExact(Char>, String[], TimeOnly) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> s, string?[]? formats, out TimeOnly result);
```

Converts the specified character span of a time to its `TimeOnly` equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: The span containing the time to convert.
- `formats`: An array of allowable formats of `s`.
- `result`: When this method returns, contains the `TimeOnly` value equivalent to the time contained in `s`, if the conversion succeeded, or <see cref="F:System.TimeOnly.MinValue">TimeOnly.MinValue</see> if the conversion failed. The conversion fails if the `s` parameter is an empty string or does not contain a valid string representation of a time. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, one or more entries in `formats` contain an invalid format specifier.

To be added.

## TimeOnly.TryParseExact(String, String, TimeOnly) method

```csharp
public static bool TryParseExact (string? s, string? format, out TimeOnly result);
```

Converts the specified string representation of a time to its `TimeOnly` equivalent using the specified format and style.
The format of the string representation must match the specified format exactly. The method returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string containing the time to convert.
- `format`: The required format of `s`.
- `result`: When this method returns, contains the `TimeOnly` value equivalent to the time contained in `s`, if the conversion succeeded, or <see cref="F:System.TimeOnly.MinValue">TimeOnly.MinValue</see> if the conversion failed. The conversion fails if `s` is an empty string or does not contain a time that corresponds to the pattern specified in format. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, the `format` parameter contains an invalid format specifier.

To be added.

## TimeOnly.TryParseExact(String, String[], TimeOnly) method

```csharp
public static bool TryParseExact (string? s, string?[]? formats, out TimeOnly result);
```

Converts the specified string representation of a time to its `TimeOnly` equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: The string containing the time to parse.
- `formats`: An array of allowable formats of `s`.
- `result`: When this method returns, contains the `TimeOnly` value equivalent to the time contained in `s`, if the conversion succeeded, or <see cref="F:System.TimeOnly.MinValue">TimeOnly.MinValue</see> if the conversion failed. The conversion fails if `s` is an empty string or does not contain a valid string representation of a time. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, one or more entries in `formats` contain an invalid format specifier.

To be added.

## TimeOnly.TryParseExact(Char>, Char>, IFormatProvider, DateTimeStyles, TimeOnly) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> s, ReadOnlySpan<char> format, IFormatProvider? provider, System.Globalization.DateTimeStyles style, out TimeOnly result);
```

Converts the specified span representation of a time to its `TimeOnly` equivalent using the specified format, culture-specific format information, and style.
The format of the string representation must match the specified format exactly. The method returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A span containing the time to convert.
- `format`: The required format of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of one or more enumeration values that indicate the permitted format of `s`.
- `result`: When this method returns, contains the `TimeOnly` value equivalent to the time contained in `s`, if the conversion succeeded, or <see cref="F:System.TimeOnly.MinValue">TimeOnly.MinValue</see> if the conversion failed. The conversion fails if `s` is an empty string or does not contain a time that corresponds to the pattern specified in format. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, the `style` parameter is invalid or the `format` parameter contains an invalid format specifier.

To be added.

## TimeOnly.TryParseExact(Char>, String[], IFormatProvider, DateTimeStyles, TimeOnly) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> s, string?[]? formats, IFormatProvider? provider, System.Globalization.DateTimeStyles style, out TimeOnly result);
```

Converts the specified character span of a time to its `TimeOnly` equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: The span containing the time to parse.
- `formats`: An array of allowable formats of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of enumeration values that defines how to interpret the parsed time. A typical value to specify is `DateTimeStyles.None`.
- `result`: When this method returns, contains the `TimeOnly` value equivalent to the time contained in `s`, if the conversion succeeded, or <see cref="F:System.TimeOnly.MinValue">TimeOnly.MinValue</see> if the conversion failed. The conversion fails if `s` is an empty string or does not contain a valid string representation of a time. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, the `style` parameter is invalid or one or more entries in `formats` contain an invalid format specifier.

To be added.
