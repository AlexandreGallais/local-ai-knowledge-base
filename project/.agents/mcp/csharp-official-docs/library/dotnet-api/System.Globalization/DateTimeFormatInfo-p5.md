---
title: "DateTimeFormatInfo class (part 5 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/DateTimeFormatInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeFormatInfo class (part 5 of 7)

## DateTimeFormatInfo.MonthDayPattern property

```csharp
public string MonthDayPattern { get; set; }
```

Gets or sets the custom format string for a month and day value.

Returns: The custom format string for a month and day value.

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks
The `MonthDayPattern` property defines the culture-specific format of date strings that are returned by calls to the `DateTime.ToString` and `DateTimeOffset.ToString` methods and by composite format strings that are supplied the "m" and "M" standard format strings.

This property is affected if the value of the `Calendar` property changes.

We recommend that you set the date separator in the month and day pattern to an exact string instead of using the date separator placeholder. For example, to obtain the pattern MM-DD, set the month and day pattern to "MM-DD".

#### Examples
The following example displays the value of `DateTimeFormatInfo.MonthDayPattern` for a few cultures.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/MonthDayPattern/dtfi_monthdaypattern.cs._

## DateTimeFormatInfo.MonthGenitiveNames property

```csharp
public string[] MonthGenitiveNames { get; set; }
```

Gets or sets a string array of month names associated with the current `DateTimeFormatInfo` object.

Returns: A string array of month names.

Exceptions:

- `ArgumentException`: In a set operation, the array is multidimensional or has a length that is not exactly 13.
- `ArgumentNullException`: In a set operation, the array or one of its elements is `null`.
- `InvalidOperationException`: In a set operation, the current `DateTimeFormatInfo` object is read-only.

#### Remarks
In some languages, a month name that is part of a date appears in the genitive case. For example, a date in the Russian (Russia) or "ru-RU", culture consists of the day number and the genitive month name, such as 1 Января.

When this property is set, the array must be one-dimensional and must have exactly 13 elements. `Calendar` objects accommodate calendars with 13 months. The first element (the element at index zero) represents the first month of the year defined by the `Calendar` property. If you set the `MonthGenitiveNames` property, you must also set the `MonthNames` property.

#### Examples
The following example demonstrates several methods and properties that specify date and time format patterns, native calendar name, and full and abbreviated month and day names.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/GetShortestDayName/dtfi1.cs._

## DateTimeFormatInfo.MonthNames property

```csharp
public string[] MonthNames { get; set; }
```

Gets or sets a one-dimensional array of type `String` containing the culture-specific full names of the months.

Returns: A one-dimensional array of type `String` containing the culture-specific full names of the months. In a 12-month calendar, the 13th element of the array is an empty string. The array for `DateTimeFormatInfo.InvariantInfo` contains "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", and "".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `ArgumentException`: The property is being set to an array that is multidimensional or that has a length that is not exactly 13.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks
When this property is set, the array must be one-dimensional and must have exactly 13 elements. `Calendar` objects accommodate calendars with 13 months. The first element (the element at index zero) represents the first month of the year defined by the `Calendar` property.

If you set the `MonthNames` property, you must also set the `MonthGenitiveNames` property.

If the custom pattern includes the format pattern "MMMM", `DateTime.ToString` displays the value of `DateTimeFormatInfo.MonthNames` in place of the "MMMM" in the format pattern.

This property is affected if the value of the `Calendar` property changes.

## DateTimeFormatInfo.NativeCalendarName property

```csharp
public string NativeCalendarName { get; }
```

Gets the native name of the calendar associated with the current `DateTimeFormatInfo` object.

Returns: The native name of the calendar used in the culture associated with the current `DateTimeFormatInfo` object if that name is available, or the empty string ("") if the native calendar name is not available.

#### Examples
The following example demonstrates several methods and properties that specify date and time format patterns, native calendar name, and full and abbreviated month and day names.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/GetShortestDayName/dtfi1.cs._

## DateTimeFormatInfo.PMDesignator property

```csharp
public string PMDesignator { get; set; }
```

Gets or sets the string designator for hours that are "post meridiem" (after noon).

Returns: The string designator for hours that are "post meridiem" (after noon). The default for `DateTimeFormatInfo.InvariantInfo` is "PM".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks
The `PMDesignator` property is used for all times from 12:00:00 (noon) to 23:59:59.999.

If the custom pattern includes the format pattern "tt" and the time is after noon, `DateTime.ToString` displays the value of `DateTimeFormatInfo.PMDesignator` in place of the "tt" in the format pattern. If the custom pattern includes the format pattern "t", only the first character of `DateTimeFormatInfo.PMDesignator` is displayed. Your application should use "tt" for languages for which it is necessary to maintain the distinction between AM and PM. An example is Japanese, for which the AM and PM designators differ in the second character instead of the first character.

For cultures that do not use a PM designator, this property returns an empty string.

## DateTimeFormatInfo.RFC1123Pattern property

```csharp
public string RFC1123Pattern { get; }
```

Gets the custom format string for a time value that is based on the Internet Engineering Task Force (IETF) Request for Comments (RFC) 1123 specification.

Returns: The custom format string for a time value that is based on the IETF RFC 1123 specification.

#### Remarks
The `RFC1123Pattern` property defines the culture-specific format of date strings that are returned by calls to the `DateTime.ToString` and `DateTimeOffset.ToString` methods and by composite format strings that are supplied the "r" and "R" standard format strings.

The RFC1123 pattern reflects a defined standard, and the property is read-only. Therefore, it is always the same, regardless of the culture. The custom format string is "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'".

#### Examples
The following example displays the value of RFC1123Pattern for a few cultures.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/RFC1123Pattern/dtfi_rfc1123pattern.cs._

## DateTimeFormatInfo.ShortDatePattern property

```csharp
public string ShortDatePattern { get; set; }
```

Gets or sets the custom format string for a short date value.

Returns: The custom format string for a short date value.

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks
The `ShortDatePattern` property defines the culture-specific format of date strings that are returned by calls to the `DateTime.ToString` and `DateTimeOffset.ToString` methods and by composite format strings that are supplied the "d" standard format string.

This property is affected if the value of the `Calendar` property changes.

#### Examples
The following example displays the value of the `ShortDatePattern` property and the value of a date formatted using the `ShortDatePattern` property for a few cultures.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/ShortDatePattern/dtfi_shortdatepattern.cs._

The following example modifies the `ShortDatePattern` property of a `DateTimeFormatInfo` object that represents the formatting conventions of the English (United States) culture. It also displays a date value twice, first to reflect the original `ShortDatePattern` property and then to reflect the new property value.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/ShortDatePattern/shortdatepattern1.cs._

## DateTimeFormatInfo.ShortestDayNames property

```csharp
public string[] ShortestDayNames { get; set; }
```

Gets or sets a string array of the shortest abbreviated day names associated with the current `DateTimeFormatInfo` object.

Returns: A string array of day names.

Exceptions:

- `ArgumentException`: In a set operation, the array does not have exactly seven elements.
- `ArgumentNullException`: In a set operation, the value array or one of the elements of the value array is `null`.
- `InvalidOperationException`: In a set operation, the current `DateTimeFormatInfo` object is read-only.

#### Remarks

The default array starts on Sunday.

#### Examples
The following example demonstrates several methods and properties that specify date and time format patterns, native calendar name, and full and abbreviated month and day names.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/GetShortestDayName/dtfi1.cs._

## DateTimeFormatInfo.ShortTimePattern property

```csharp
public string ShortTimePattern { get; set; }
```

Gets or sets the custom format string for a short time value.

Returns: The custom format string for a short time value.

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks
The `ShortTimePattern` property defines the culture-specific format of date strings that are returned by calls to the `DateTime.ToString` and `DateTimeOffset.ToString` methods and by composite format strings that are supplied the "t" standard format string.

We recommend that you set the time separator in the short time pattern to an exact string instead of using the time separator placeholder. For example, to obtain the pattern h-mm-ss, set the short time pattern to "h-mm-ss".

#### Examples
The following example displays the value of `DateTimeFormatInfo.ShortTimePattern` for a few cultures.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/ShortTimePattern/dtfi_shorttimepattern.cs._

## DateTimeFormatInfo.SortableDateTimePattern property

```csharp
public string SortableDateTimePattern { get; }
```

Gets the custom format string for a sortable date and time value.

Returns: The custom format string for a sortable date and time value.

#### Remarks
The `SortableDateTimePattern` property defines the culture-specific format of date strings that are returned by calls to the `DateTime.ToString` and `DateTimeOffset.ToString` methods and by composite format strings that are supplied the "s" standard format string.

The format string returned by the `SortableDateTimePattern` property reflects a defined standard (ISO 8601), and the property is read-only. Therefore, it is always the same, regardless of the culture. The custom format string is "yyyy'-'MM'-'dd'T'HH':'mm':'ss".

#### Examples
The following example displays the value of `DateTimeFormatInfo.SortableDateTimePattern` for a few cultures.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/SortableDateTimePattern/dtfi_sortabledatetimepattern.cs._

## DateTimeFormatInfo.TimeSeparator property

```csharp
public string TimeSeparator { get; set; }
```

Gets or sets the string that separates the components of time, that is, the hour, minutes, and seconds.

Returns: The string that separates the components of time. The default for `DateTimeFormatInfo.InvariantInfo` is ":".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks

If the custom pattern includes the format pattern ":", `DateTime.ToString` displays the value of `TimeSeparator` in place of the ":" in the format pattern.

> **Note:**
> Standard format patterns, such as `FullDateTimePattern`, don't necessarily use ":". Changing `TimeSeparator` may not have an effect when using these patterns.

The time separator is derived from the `ShortTimePattern` property. We recommend that you set the time separator in short or long time patterns to an exact string instead of using the time separator placeholder. For example, to obtain the pattern h-mm-ss, set the pattern to "h-mm-ss". This practice also enables you to set patterns such as "h'h 'mm'm 'ss's'" (3h 36m 12s) that include multiple types of separators. The `TimeSeparator` property defines the string that replaces the time separator (":" custom date and time format specifier) in a result string in a formatting operation. It also defines the time separator string in a parsing operation.

#### Examples
The following example instantiates a `CultureInfo` object for the en-US culture, changes its date separator to ".", and displays a date by using the "t", "T", "F", "f", "G", and "g" standard format strings.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/TimeSeparator/timeseparatorex.cs._
