---
title: "TimeOnly struct (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeOnly.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeOnly struct (part 4 of 4)

## TimeOnly.TryParseExact(String, String, IFormatProvider, DateTimeStyles, TimeOnly) method

```csharp
public static bool TryParseExact (string? s, string? format, IFormatProvider? provider, System.Globalization.DateTimeStyles style, out TimeOnly result);
```

Converts the specified span representation of a time to its `TimeOnly` equivalent using the specified format, culture-specific format information, and style.
The format of the string representation must match the specified format exactly. The method returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A span containing the characters representing a time to convert.
- `format`: The required format of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of one or more enumeration values that indicate the permitted format of `s`.
- `result`: When this method returns, contains the `TimeOnly` value equivalent to the time contained in `s`, if the conversion succeeded, or <see cref="F:System.TimeOnly.MinValue">TimeOnly.MinValue</see> if the conversion failed. The conversion fails if `s` is an empty string or does not contain a time that corresponds to the pattern specified in format. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, the `style` parameter is invalid or the `format` parameter contains an invalid format specifier.

To be added.

## TimeOnly.TryParseExact(String, String[], IFormatProvider, DateTimeStyles, TimeOnly) method

```csharp
public static bool TryParseExact (string? s, string?[]? formats, IFormatProvider? provider, System.Globalization.DateTimeStyles style, out TimeOnly result);
```

Converts the specified string representation of a time to its `TimeOnly` equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: The string containing the time to parse.
- `formats`: An array of allowable formats of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of enumeration values that defines how to interpret the parsed date. A typical value to specify is `DateTimeStyles.None`.
- `result`: When this method returns, contains the `TimeOnly` value equivalent to the time contained in `s`, if the conversion succeeded, or <see cref="F:System.TimeOnly.MinValue">TimeOnly.MinValue</see> if the conversion failed. The conversion fails if `s` is an empty string or does not contain a valid string representation of a time. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, the `style` parameter is invalid or one or more entries in `formats` contain an invalid format specifier.

To be added.
