---
title: "Breaking change: DateOnly and TimeOnly TryParse methods throw for invalid input"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/11/dateonly-timeonly-tryparse-argumentexception.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# DateOnly and TimeOnly TryParse methods throw for invalid input

The `System.DateOnly` and `System.TimeOnly` `TryParse` and `TryParseExact` methods now throw an `System.ArgumentException` when invalid `System.Globalization.DateTimeStyles` values or format specifiers are provided. This aligns their behavior with other `TryParse` APIs in .NET.

## Version introduced

.NET 11

## Previous behavior

Previously, passing invalid `System.Globalization.DateTimeStyles` values or format specifiers to `DateOnly.TryParse`, `DateOnly.TryParseExact`, `TimeOnly.TryParse`, or `TimeOnly.TryParseExact` caused the methods to return `false` without throwing an exception.

```csharp
using System;
using System.Globalization;

bool result = DateOnly.TryParseExact(
    "2023-10-15",
    "yyyy-MM-dd",
    CultureInfo.InvariantCulture,
    (DateTimeStyles)999, // Invalid DateTimeStyles value
    out DateOnly date);

Console.WriteLine(result); // Output: False
```

## New behavior

Starting in .NET 11, passing invalid `System.Globalization.DateTimeStyles` values or format specifiers to these methods throws an `System.ArgumentException`. The exception includes details about the invalid argument, such as the parameter name.

```csharp
using System;
using System.Globalization;

try
{
    bool result = DateOnly.TryParseExact(
        "2023-10-15",
        "yyyy-MM-dd",
        CultureInfo.InvariantCulture,
        (DateTimeStyles)999, // Invalid DateTimeStyles value
        out DateOnly date);
}
catch (ArgumentException ex)
{
    Console.WriteLine(ex.Message);
    // Output: "The value '999' is not valid for DateTimeStyles. (Parameter 'style')"
}
```

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change aligns the behavior of `DateOnly` and `TimeOnly` parsing methods with other `TryParse` APIs in .NET, which throw exceptions for invalid arguments. The previous behavior of silently returning `false` for invalid arguments could mask programming errors and make debugging more difficult.

## Recommended action

Review your usage of `DateOnly.TryParse`, `DateOnly.TryParseExact`, `TimeOnly.TryParse`, and `TimeOnly.TryParseExact` to ensure that valid `System.Globalization.DateTimeStyles` values and format specifiers are being passed. If invalid arguments are possible in your code paths, wrap the calls in a `try`-`catch` block to handle `System.ArgumentException`.

```csharp
using System;
using System.Globalization;

try
{
    bool result = DateOnly.TryParseExact(
        "2023-10-15",
        "yyyy-MM-dd",
        CultureInfo.InvariantCulture,
        (DateTimeStyles)999, // Invalid DateTimeStyles value
        out DateOnly date);
}
catch (ArgumentException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
    // Handle the exception as needed
}
```

## Affected APIs

- `System.DateOnly.TryParse(System.String,System.DateOnly@)`
- `System.DateOnly.TryParse(System.String,System.IFormatProvider,System.Globalization.DateTimeStyles,System.DateOnly@)`
- `System.DateOnly.TryParseExact(System.String,System.String,System.IFormatProvider,System.Globalization.DateTimeStyles,System.DateOnly@)`
- `System.DateOnly.TryParseExact(System.String,System.String[],System.IFormatProvider,System.Globalization.DateTimeStyles,System.DateOnly@)`
- `System.TimeOnly.TryParse(System.String,System.TimeOnly@)`
- `System.TimeOnly.TryParse(System.String,System.IFormatProvider,System.Globalization.DateTimeStyles,System.TimeOnly@)`
- `System.TimeOnly.TryParseExact(System.String,System.String,System.IFormatProvider,System.Globalization.DateTimeStyles,System.TimeOnly@)`
- `System.TimeOnly.TryParseExact(System.String,System.String[],System.IFormatProvider,System.Globalization.DateTimeStyles,System.TimeOnly@)`
