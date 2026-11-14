---
title: "DateTimeFormatInfo class (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/DateTimeFormatInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeFormatInfo class (part 2 of 7)

The following example illustrates the relationship between the `IFormatProvider` interface and the `DateTimeFormatInfo` class in formatting operations. It defines a custom `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method displays the type of the object requested by the formatting operation. If it is requesting a `DateTimeFormatInfo` object, the method provides the `DateTimeFormatInfo` object for the current culture. As the output from the example shows, the `ToString` method requests a `DateTimeFormatInfo` object to provide formatting information, whereas the `Format` method requests `NumberFormatInfo` and `DateTimeFormatInfo` objects as well as an `ICustomFormatter` implementation.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/formatprovider1.cs._
#### Format strings and DateTimeFormatInfo properties

The `DateTimeFormatInfo` object includes three kinds of properties that are used in formatting operations with date and time values:

- Calendar-related properties. Properties such as `AbbreviatedDayNames`, `AbbreviatedMonthNames`, `DayNames`, and `MonthNames`, are associated with the calendar used by the culture, which is defined by the `Calendar` property. These properties are used for long date and time formats.

- Properties that produce a standards-defined result string. The `RFC1123Pattern`, `SortableDateTimePattern`, and `UniversalSortableDateTimePattern` properties contain custom format strings that produce result strings defined by international standards. These properties are  read-only and cannot be modified.

- Properties that define culture-sensitive result strings. Some properties, such as `FullDateTimePattern` and `ShortDatePattern`, contain  custom format strings that specify the format of the result string. Others, such as `AMDesignator`, `DateSeparator`, `PMDesignator`, and `TimeSeparator`, define culture-sensitive symbols or substrings that can be included in a result string.

The standard date and time format strings, such as "d", "D", "f", and "F", are aliases that correspond to particular `DateTimeFormatInfo` format pattern properties. Most of the  custom date and time format strings are related to strings or substrings that a formatting operation inserts into the result stream. The following table lists the standard and custom date and time format specifiers and their associated `DateTimeFormatInfo` properties. For details about how to use these format specifiers, see Standard Date and Time Format Strings and Custom Date and Time Format Strings. Note that each standard format string corresponds to a `DateTimeFormatInfo` property whose value is a custom date and time format string. The individual specifiers in this custom format string in turn correspond to other `DateTimeFormatInfo` properties. The table lists only the `DateTimeFormatInfo` properties for which the standard format strings are aliases, and does not list properties that may be accessed by custom format strings assigned to those aliased properties. In addition, the table lists only custom format specifiers that correspond to `DateTimeFormatInfo` properties.

|Format specifier|Associated properties|
|----------------------|---------------------------|
|"d" (short date; standard format string)|`ShortDatePattern`, to define the overall format of the result string.|
|"D" (long date; standard format string)|`LongDatePattern`, to define the overall format of the result string.|
|"f" (full date / short time; standard format string)|`LongDatePattern`, to define the format of the date component of the result string.`ShortTimePattern`, to define the format of the time component of the result string.|
|"F" (full date / long time; standard format string)|`LongDatePattern`, to define the format of the date component of the result string.`LongTimePattern`, to define the format of the time component of the result string.|
|"g" (general date / short time; standard format string)|`ShortDatePattern`, to define the format of the date component of the result string.`ShortTimePattern`, to define the format of the time component of the result string.|
|"G" (general date / long time; standard format string)|`ShortDatePattern`, to define the format of the date component of the result string.`LongTimePattern`, to define the format of the time component of the result string.|
|"M", "m" (month/day; standard format string)|`MonthDayPattern`, to define the overall format of the result string.|
|"O", "o" (round-trip date/time; standard format string)|None.|
|"R", "r" (RFC1123; standard format string)|`RFC1123Pattern`, to define a result string that conforms to the RFC 1123 standard. The property is read-only.|
|"s" (sortable date/time; standard format string)|`SortableDateTimePattern`, to define a result string that conforms to the ISO 8601 standard. The property is read-only.|
|"t" (short time; standard format string)|`ShortTimePattern`, to define the overall format of the result string.|
|"T" (long time; standard format string)|`LongTimePattern`, to define the overall format of the result string.|
|"u" (universal sortable date/time; standard format string)|`UniversalSortableDateTimePattern`, to define a result string that conforms to the ISO 8601 standard for coordinated universal time. The property is read-only.|
|"U" (universal full date/time; standard format string)|`FullDateTimePattern`, to define the overall format of the result string.|
|"Y", "y" (year month; standard format string)|`YearMonthPattern`, to define the overall format of the result string.|
|"ddd" (custom format specifier)|`AbbreviatedDayNames`, to include the abbreviated name of the day of the week in the result string.|
|"g", "gg" (custom format specifier)|Calls the `DateTimeFormatInfo.GetEraName` method to insert the era name in the result string.|
|"MMM" (custom format specifier)|`AbbreviatedMonthNames` or `AbbreviatedMonthGenitiveNames`, to include the abbreviated month name in the result string.|
|"MMMM" (custom format specifier)|`MonthNames` or `MonthGenitiveNames`, to include the full month name in the result string.|
|"t" (custom format specifier)|`AMDesignator` or `PMDesignator`, to include the first character of the AM/PM designator in the result string.|
|"tt" (custom format specifier)|`AMDesignator` or `PMDesignator`, to include the full AM/PM designator in the result string.|
|":" (custom format specifier)|`TimeSeparator`, to include the time separator in the result string.|
|"/" (custom format specifier)|`DateSeparator`, to include the date separator in the result string.|

#### Modify DateTimeFormatInfo properties

You can change the result string produced by date and time format strings by modifying the associated properties of a writable `DateTimeFormatInfo` object. To determine if a `DateTimeFormatInfo` object is writable, use the `IsReadOnly` property. To customize a `DateTimeFormatInfo` object in this way:

1. Create a read/write copy of a `DateTimeFormatInfo` object whose formatting conventions you want to modify.

2. Modify the property or properties that are used to produce the desired result string. (For information about how formatting methods use `DateTimeFormatInfo` properties to define result strings, see the previous section, Format strings and DateTimeFormatInfo properties.)

3. Use the custom `DateTimeFormatInfo` object you created as the `IFormatProvider` argument in calls to formatting methods.

There are two other ways to change the format of a result string:

- You can use the `CultureAndRegionInfoBuilder` class to define either a custom culture (a culture that has a unique name and that supplements existing cultures) or a replacement culture (one that is used instead of a specific culture). You can save and access this culture programmatically as you would any `CultureInfo` object supported by .NET.

- If the result string is not culture-sensitive and doesn't follow a predefined format, you can use a custom date and time format string. For example, if you are serializing date and time data in the format YYYYMMDDHHmmss, you can generate the result string by passing the custom format string to the `ToString` method, and you can convert the result string back to a `DateTime` value by calling the `DateTime.ParseExact` method.

#### Change the short date pattern

The following example changes the format of a result string produced by the "d" (short date) standard format string. It changes the associated `ShortDatePattern` property for the en-US or English (United States) culture from its default of "M/d/yyyy" to "yyyy'-"MM"-"dd" and uses the "d" standard format string to display the date both before and after the `ShortDatePattern` property is changed.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/example1.cs._
#### Change the date separator character

The following example changes the date separator character in a `DateTimeFormatInfo` object that represents the formatting conventions of the fr-FR culture. The example uses the "g" standard format string to display the date both before and after the `DateSeparator` property is changed.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/example3.cs._
#### Change day name abbreviations and the long date pattern

In some cases, the long date pattern, which typically displays the full day and month name along with the number of the day of the month and the year, may be too long. The following example shortens the long date pattern for the en-US culture to return a one-character or two-character day name abbreviation followed by the day number, the month name abbreviation, and the year. It does this by assigning shorter day name abbreviations to the `AbbreviatedDayNames` array, and by modifying the custom format string assigned to the `LongDatePattern` property. This affects the result strings returned by the "D" and "f" standard format strings.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/example2.cs._
Ordinarily, the change to the `LongDatePattern` property also affects the `FullDateTimePattern` property, which in turn defines the result string returned by the "F" standard format string. To preserve the original full date and time pattern, the example reassigns the original custom format string assigned to the `FullDateTimePattern` property after the `LongDatePattern` property is modified.

#### Change from a 12-hour clock to a 24-hour clock

For many cultures in .NET, the time is expressed by using a 12-hour clock and an AM/PM designator. The following example defines a `ReplaceWith24HourClock` method that replaces any time format that uses a 12-hour clock with a format that uses a 24-hour clock.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/example5.cs._
The example uses a regular expression to modify the format string. The regular expression pattern `@"^(?<openAMPM>\s*t+\s*)? (?(openAMPM) h+(?<nonHours>[^ht]+)$ | \s*h+(?<nonHours>[^ht]+)\s*t+)` is defined as follows:

| Pattern                  | Description                                     |
|--------------------------|-------------------------------------------------|
| `^`                      | Begin the match at the beginning of the string. |
| `(?<openAMPM>\s*t+\s*)?` | Match zero or one occurrence of zero or more white-space characters, followed by the letter "t" one or more times, followed by zero or more white-space characters. This capturing group is named `openAMPM`. |
| `(?(openAMPM) h+(?<nonHours>[^ht]+)$` | If the `openAMPM` group has a match, match the letter "h" one or more times, followed by one or more characters that are neither "h" nor "t". The match ends at the end of the string. All characters captured after "h" are included in a capturing group named `nonHours`. |
| `| \s*h+(?<nonHours>[^ht]+)\s*t+)` | If the `openAMPM` group does not have a match, match the letter "h" one or more times, followed by one or more characters that are neither "h" nor "t", followed by zero or more white-space characters. Finally, match one or more occurrences of the letter "t". All characters captured after "h" and before the white-spaces and "t" are included in a capturing group named `nonHours`. |

The `nonHours` capturing group contains the minute and possibly the second component of a custom date and time format string, along with any time separator symbols. The replacement pattern `HH${nonHours}` prepends the substring "HH" to these elements.

#### Display and change the era in a date

The following example adds the "g" custom format specifier to the  `LongDatePattern` property of an object that represents the formatting conventions of the en-US culture. This addition affects the following three standard format strings:

- The "D" (long date) standard format string, which maps directly to the `LongDatePattern` property.
- The "f" (full date / short time) standard format string, which produces a result string that concatenates the substrings produced by the `LongDatePattern` and `ShortTimePattern` properties.
- The "F" (full date / long time) standard format string, which maps directly to the `FullDateTimePattern` property. Because we have not explicitly set this property value, it is generated dynamically by concatenating the `LongDatePattern` and `LongTimePattern` properties.

The example also shows how to change the era name for a culture whose calendar has a single era. In this case, the en-US culture uses the Gregorian calendar, which is represented by a `GregorianCalendar` object. The `GregorianCalendar` class supports a single era, which it names A.D. (Anno Domini). The example changes the era name to C.E. (Common Era) by replacing the "g" custom format specifier in the format string assigned to the `FullDateTimePattern` property with a literal string. The use of a literal string is necessary, because the era name is typically returned by the `DateTimeFormatInfo.GetEraName` method from private data in the culture tables supplied by either .NET or the operating system.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/example4.cs._
#### Parse date and time strings

Parsing involves converting the string representation of a date and time to a `DateTime` or `DateTimeOffset` value. Both of these types include the `Parse`, `TryParse`, `ParseExact`, and `TryParseExact` methods to support parsing operations. The `Parse` and `TryParse` methods convert a string that can have a variety of formats, whereas `ParseExact` and `TryParseExact` require that the string have a defined format or formats. If the parsing operation fails, `Parse` and `ParseExact` throw an exception, whereas `TryParse` and `TryParseExact` return `false`.
