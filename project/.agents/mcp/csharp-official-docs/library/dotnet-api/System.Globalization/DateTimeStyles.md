---
title: "DateTimeStyles enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/DateTimeStyles.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeStyles enum

Namespace: `System.Globalization`

```csharp
public enum DateTimeStyles
```

Defines the formatting options that customize string parsing for some date and time parsing methods.

#### Remarks
`DateTimeStyles` values can be used with any of the following date and time parsing methods that include a `styles` parameter to define the interpretation of the style elements that may be present in the string to be parsed:

-   `DateTime.Parse`

-   `DateTimeOffset.Parse`

-   `DateTime.TryParse`

-   `DateTimeOffset.TryParse`

-   `DateTime.ParseExact`

-   `DateTimeOffset.ParseExact`

-   `DateTime.TryParseExact`

-   `DateTimeOffset.TryParseExact`

The `ParseExact` and `TryParseExact` methods can use any of the `DateTimeStyles` values. However, if none of the `Allow*` values is selected, the input string must have exactly the same white-space characters as the format string.

If the input string does not contain any indication of the time zone, the date and time parsing methods interpret the value of the date and time string based on the time zone setting for the operating system. To convert the date and time to the Universal Time or Greenwich Mean Time (GMT), the application should use the `AdjustToUniversal` value. The same effect can be achieved by calling the `DateTime.ToUniversalTime` or `DateTimeOffset.ToUniversalTime` method. However, using the `AdjustToUniversal` value with the date and time parsing method is more efficient.

## DateTimeStyles.AdjustToUniversal field

```csharp
AdjustToUniversal
```

Date and time are returned as a Coordinated Universal Time (UTC). If the input string denotes a local time, through a time zone specifier or `DateTimeStyles.AssumeLocal`, the date and time are converted from the local time to UTC. If the input string denotes a UTC time, through a time zone specifier or `DateTimeStyles.AssumeUniversal`, no conversion occurs. If the input string does not denote a local or UTC time, no conversion occurs and the resulting `DateTime.Kind` property is `DateTimeKind.Unspecified`. This value cannot be used with `DateTimeStyles.RoundtripKind`.

## DateTimeStyles.AllowInnerWhite field

```csharp
AllowInnerWhite
```

Extra white-space characters in the middle of the string must be ignored during parsing, except if they occur in the `DateTimeFormatInfo` format patterns.

## DateTimeStyles.AllowLeadingWhite field

```csharp
AllowLeadingWhite
```

Leading white-space characters must be ignored during parsing, except if they occur in the `DateTimeFormatInfo` format patterns.

## DateTimeStyles.AllowTrailingWhite field

```csharp
AllowTrailingWhite
```

Trailing white-space characters must be ignored during parsing, except if they occur in the `DateTimeFormatInfo` format patterns.

## DateTimeStyles.AllowWhiteSpaces field

```csharp
AllowWhiteSpaces
```

Extra white-space characters anywhere in the string must be ignored during parsing, except if they occur in the `DateTimeFormatInfo` format patterns. This value is a combination of the `DateTimeStyles.AllowLeadingWhite`, `DateTimeStyles.AllowTrailingWhite`, and `DateTimeStyles.AllowInnerWhite` values.

## DateTimeStyles.AssumeLocal field

```csharp
AssumeLocal
```

If no time zone is specified in the parsed string, the string is assumed to denote a local time. This value cannot be used with `DateTimeStyles.AssumeUniversal` or `DateTimeStyles.RoundtripKind`.

## DateTimeStyles.AssumeUniversal field

```csharp
AssumeUniversal
```

If no time zone is specified in the parsed string, the string is assumed to denote a UTC. This value cannot be used with `DateTimeStyles.AssumeLocal` or `DateTimeStyles.RoundtripKind`.

## DateTimeStyles.NoCurrentDateDefault field

```csharp
NoCurrentDateDefault
```

If the parsed string contains only the time and not the date, the parsing methods assume the Gregorian date with year = 1, month = 1, and day = 1. If this value is not used, the current date is assumed.

## DateTimeStyles.None field

```csharp
None
```

Default formatting options must be used. This value represents the default style for the `DateTime.Parse`, `DateTime.ParseExact`, and `DateTime.TryParse` methods.

## DateTimeStyles.RoundtripKind field

```csharp
RoundtripKind
```

The `DateTimeKind` field of a date is preserved when a `DateTime` object is converted to a string using the "o" or "r" standard format specifier, and the string is then converted back to a `DateTime` object.
