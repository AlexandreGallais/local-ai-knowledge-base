---
title: "DateOnly struct (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateOnly.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateOnly struct (part 3 of 3)

## DateOnly.TryParse(Char>, IFormatProvider, DateOnly) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, out DateOnly result);
```

Tries to parse a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s`, or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## DateOnly.TryParse(String, IFormatProvider, DateOnly) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out DateOnly result);
```

Tries to parse a string into a value.

Parameters:

- `s`: The string to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.
- `result`: When this method returns, contains the result of successfully parsing `s` or an undefined value on failure.

Returns: `true` if `s` was successfully parsed; otherwise, `false`.

To be added.

## DateOnly.TryParse(Char>, IFormatProvider, DateTimeStyles, DateOnly) method

```csharp
public static bool TryParse (ReadOnlySpan<char> s, IFormatProvider? provider, System.Globalization.DateTimeStyles style, out DateOnly result);
```

Converts the specified span representation of a date to its `DateOnly` equivalent using the specified array of formats, culture-specific format information, and style. And returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string containing the characters that represent a date to convert.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `DateTimeStyles.None`.
- `result`: When this method returns, contains the `DateOnly` value equivalent to the date contained in `s`, if the conversion succeeded, or <see cref="F:System.DateOnly.MinValue">DateOnly.MinValue</see> if the conversion failed. The conversion fails if the `s` parameter is empty string, or does not contain a valid string representation of a date. This parameter is passed uninitialized.

Returns: `true` if the conversion was successful; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, the `style` parameter is invalid.

To be added.

## DateOnly.TryParse(String, IFormatProvider, DateTimeStyles, DateOnly) method

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, System.Globalization.DateTimeStyles style, out DateOnly result);
```

Converts the specified string representation of a date to its `DateOnly` equivalent using the specified array of formats, culture-specific format information, and style. And returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string containing the characters that represent a date to convert.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of enumeration values that indicates the permitted format of `s`. A typical value to specify is `DateTimeStyles.None`.
- `result`: When this method returns, contains the `DateOnly` value equivalent to the date contained in `s`, if the conversion succeeded, or <see cref="F:System.DateOnly.MinValue">DateOnly.MinValue</see> if the conversion failed. The conversion fails if the `s` parameter is empty string, or does not contain a valid string representation of a date. This parameter is passed uninitialized.

Returns: `true` if the conversion was successful; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, the `style` parameter is invalid.

To be added.

## DateOnly.TryParseExact(Char>, Char>, DateOnly) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> s, ReadOnlySpan<char> format, out DateOnly result);
```

Converts the specified span representation of a date to its `DateOnly` equivalent using the specified format and style.
The format of the string representation must match the specified format exactly. The method returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A span containing the characters representing a date to convert.
- `format`: The required format of `s`.
- `result`: When this method returns, contains the `DateOnly` value equivalent to the date contained in `s`, if the conversion succeeded, or <see cref="F:System.DateOnly.MinValue">DateOnly.MinValue</see> if the conversion failed. The conversion fails if the `s` is an empty string, or does not contain a date that correspond to the pattern specified in format. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, the `format` parameter contains an invalid format specifier.

To be added.

## DateOnly.TryParseExact(Char>, String[], DateOnly) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> s, string?[]? formats, out DateOnly result);
```

Converts the specified char span of a date to its `DateOnly` equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: The span containing the string to parse.
- `formats`: An array of allowable formats of `s`.
- `result`: When this method returns, contains the `DateOnly` value equivalent to the date contained in `s`, if the conversion succeeded, or <see cref="F:System.DateOnly.MinValue">DateOnly.MinValue</see> if the conversion failed. The conversion fails if the `s` parameter is an empty string, or does not contain a valid string representation of a date. This parameter is passed uninitialized.

Returns: `true` if`s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, one or more entries in `formats` contain an invalid format specifier.

To be added.

## DateOnly.TryParseExact(String, String, DateOnly) method

```csharp
public static bool TryParseExact (string? s, string? format, out DateOnly result);
```

Converts the specified string representation of a date to its `DateOnly` equivalent using the specified format and style.
The format of the string representation must match the specified format exactly. The method returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A string containing the characters representing a date to convert.
- `format`: The required format of `s`.
- `result`: When this method returns, contains the `DateOnly` value equivalent to the date contained in `s`, if the conversion succeeded, or <see cref="F:System.DateOnly.MinValue">DateOnly.MinValue</see> if the conversion failed. The conversion fails if `s` is an empty string, or does not contain a date that correspond to the pattern specified in format. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, the `format` parameter contains an invalid format specifier.

To be added.

## DateOnly.TryParseExact(String, String[], DateOnly) method

```csharp
public static bool TryParseExact (string? s, string?[]? formats, out DateOnly result);
```

Converts the specified string of a date to its `DateOnly` equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: The string containing date to parse.
- `formats`: An array of allowable formats of `s`.
- `result`: When this method returns, contains the `DateOnly` value equivalent to the date contained in `s`, if the conversion succeeded, or <see cref="F:System.DateOnly.MinValue">DateOnly.MinValue</see> if the conversion failed. The conversion fails if `s` is an empty string, or does not contain a valid string representation of a date. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, one or more entries in `formats` contain an invalid format specifier.

To be added.

## DateOnly.TryParseExact(Char>, Char>, IFormatProvider, DateTimeStyles, DateOnly) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> s, ReadOnlySpan<char> format, IFormatProvider? provider, System.Globalization.DateTimeStyles style, out DateOnly result);
```

Converts the specified span representation of a date to its `DateOnly`equivalent using the specified format, culture-specific format information, and style.
The format of the string representation must match the specified format exactly. The method returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A span containing the characters representing a date to convert.
- `format`: The required format of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of one or more enumeration values that indicate the permitted format of `s`.
- `result`: When this method returns, contains the `DateOnly` value equivalent to the date contained in `s`, if the conversion succeeded, or <see cref="F:System.DateOnly.MinValue">DateOnly.MinValue</see> if the conversion failed. The conversion fails if the `s` is an empty string, or does not contain a date that correspond to the pattern specified in format. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, the `style` parameter is invalid or the `format` parameter contains an invalid format specifier.

To be added.

## DateOnly.TryParseExact(Char>, String[], IFormatProvider, DateTimeStyles, DateOnly) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> s, string?[]? formats, IFormatProvider? provider, System.Globalization.DateTimeStyles style, out DateOnly result);
```

Converts the specified char span of a date to its `DateOnly` equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: The span containing the string to parse.
- `formats`: An array of allowable formats of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of enumeration values that defines how to interpret the parsed date. A typical value to specify is `DateTimeStyles.None`.
- `result`: When this method returns, contains the `DateOnly` value equivalent to the date contained in `s`, if the conversion succeeded, or <see cref="F:System.DateOnly.MinValue">DateOnly.MinValue</see> if the conversion failed. The conversion fails if `s` is an empty string, or does not contain a valid string representation of a date. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, the `style` parameter is invalid or one or more entries in `formats` contain an invalid format specifier.

To be added.

## DateOnly.TryParseExact(String, String, IFormatProvider, DateTimeStyles, DateOnly) method

```csharp
public static bool TryParseExact (string? s, string? format, IFormatProvider? provider, System.Globalization.DateTimeStyles style, out DateOnly result);
```

Converts the specified span representation of a date to its `DateOnly` equivalent using the specified format, culture-specific format information, and style.
The format of the string representation must match the specified format exactly. The method returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: A span containing the characters representing a date to convert.
- `format`: The required format of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of one or more enumeration values that indicate the permitted format of `s`.
- `result`: When this method returns, contains the `DateOnly` value equivalent to the date contained in `s`, if the conversion succeeded, or <see cref="F:System.DateOnly.MinValue">DateOnly.MinValue</see> if the conversion failed. The conversion fails if `s` is an empty string, or does not contain a date that correspond to the pattern specified in format. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, the `style` parameter is invalid or the `format` parameter contains an invalid format specifier.

To be added.

## DateOnly.TryParseExact(String, String[], IFormatProvider, DateTimeStyles, DateOnly) method

```csharp
public static bool TryParseExact (string? s, string?[]? formats, IFormatProvider? provider, System.Globalization.DateTimeStyles style, out DateOnly result);
```

Converts the specified string of a date to its `DateOnly` equivalent and returns a value that indicates whether the conversion succeeded.

Parameters:

- `s`: The string containing the date to parse.
- `formats`: An array of allowable formats of `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of enumeration values that defines how to interpret the parsed date. A typical value to specify is `DateTimeStyles.None`.
- `result`: When this method returns, contains the `DateOnly` value equivalent to the date contained in `s`, if the conversion succeeded, or <see cref="F:System.DateOnly.MinValue">DateOnly.MinValue</see> if the conversion failed. The conversion fails if `s` is an empty string, or does not contain a valid string representation of a date. This parameter is passed uninitialized.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: In .NET 11 and later, the `style` parameter is invalid or one or more entries in `formats` contain an invalid format specifier.

To be added.
