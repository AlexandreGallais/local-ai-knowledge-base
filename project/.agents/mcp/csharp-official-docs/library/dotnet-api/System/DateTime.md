---
title: "DateTime struct (part 1 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct

Namespace: `System`

```csharp
public readonly struct DateTime : IComparable, IComparable<DateTime>, IConvertible, IEquatable<DateTime>, IParsable<DateTime>, ISpanFormattable, ISpanParsable<DateTime>, IUtf8SpanFormattable, System.Runtime.Serialization.ISerializable
```

Represents an instant in time, typically expressed as a date and time of day.

#### Overview

The `DateTime` value type represents dates and times with values ranging from 00:00:00 (midnight), January 1, 0001 Anno Domini (Common Era) through 11:59:59 P.M., December 31, 9999 A.D. (C.E.) in the Gregorian calendar.

Time values are measured in 100-nanosecond units called ticks. A particular date is the number of ticks since 12:00 midnight, January 1, 0001 A.D. (C.E.) in the `GregorianCalendar` calendar. The number excludes ticks that would be added by leap seconds. For example, a ticks value of 31241376000000000L represents the date Friday, January 01, 0100 12:00:00 midnight. A `DateTime` value is always expressed in the context of an explicit or default calendar.

> **Note:**
> If you're working with a ticks value that you want to convert to some other time interval, such as minutes or seconds, you should use the `TicksPerDay`, `TicksPerHour`, `TicksPerMinute`, `TicksPerSecond`, or `TicksPerMillisecond` constant to perform the conversion. For example, to add the number of seconds represented by a specified number of ticks to the `Second` component of a `DateTime` value, you can use the expression `dateValue.Second + nTicks/Timespan.TicksPerSecond`.

> **Note:**
> An alternative to the `DateTime` structure for working with date and time values in particular time zones is the `DateTimeOffset` structure. The `DateTimeOffset` structure stores date and time information in a private `DateTime` field and the number of minutes by which that date and time differs from UTC in a private `Int16` field. This makes it possible for a `DateTimeOffset` value to reflect the time in a particular time zone, whereas a `DateTime` value can unambiguously reflect only UTC and the local time zone's time. For a discussion about when to use the `DateTime` structure or the `DateTimeOffset` structure when working with date and time values, see Choosing Between DateTime, DateTimeOffset, TimeSpan, and TimeZoneInfo.

#### Quick links to example code

This article includes several examples that use the `DateTime` type:

#### Initialization examples

- Invoke a constructor
- Invoke the implicit parameterless constructor
- Assignment from return value
- Parsing a string that represents a date and time
- Visual Basic <example-value> to initialize a date and time

#### Format `DateTime` objects as strings examples

- Use the default date time format
- Format a date and time using a specific culture
- Format a date time using a standard or custom format string
- Specify both a format string and a specific culture
- Format a date time using the ISO 8601 standard for web services

#### Parse strings as `DateTime` objects examples

- Use `Parse` or `TryParse` to convert a string to a date and time
- Use `ParseExact` or `TryParseExact` to convert a string in a known format
- Convert from the ISO 8601 string representation to a date and time

#### `DateTime` resolution examples

- Explore the resolution of date and time values
- Comparing for equality within a tolerance

#### Culture and calendars examples

- Display date and time values using culture specific calendars
- Parse strings according to a culture specific calendar
- Initialize a date and time from a specific culture's calendar
- Accessing date and time properties using a specific culture's calendar
- Retrieving the week of the year using culture specific calendars

#### Persistence examples

- Persisting date and time values as strings in the local time zone
- Persisting date and time values as strings in a culture and time invariant format
- Persisting date and time values as integers
- Persisting date and time values using the `XmlSerializer`

#### Initialize a DateTime object

You can assign an initial value to a new `DateTime` value in many different ways:

- Calling a constructor, either one where you specify arguments for values, or use the implicit parameterless constructor.
- Assigning a `DateTime` to the return value of a property or method.
- Parsing a `DateTime` value from its string representation.
- Using Visual Basic-specific language features to instantiate a `DateTime`.

The following code snippets show examples of each.

#### Invoke constructors

You call any of the overloads of the `DateTime` constructor that specify elements of the date and time value (such as the year, month, and day, or the number of ticks). The following code creates a specific date using the `DateTime` constructor specifying the year, month, day, hour, minute, and second.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Instantiation.cs._

You invoke the `DateTime` structure's implicit parameterless constructor when you want a `DateTime` initialized to its default value. (For details on the implicit parameterless constructor of a value type, see Value Types.) Some compilers also support declaring a `DateTime` value without explicitly assigning a value to it. Creating a value without an explicit initialization also results in the default value. The following example illustrates the `DateTime` implicit parameterless constructor in C# and Visual Basic, as well as a `DateTime` declaration without assignment in Visual Basic.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Instantiation.cs._

#### Assign a computed value

You can assign the `DateTime` object a date and time value returned by a property or method. The following example assigns the current date and time, the current Coordinated Universal Time (UTC) date and time, and the current date to three new `DateTime` variables.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Instantiation.cs._

#### Parse a string that represents a DateTime

The `DateTime.Parse`, `DateTime.ParseExact`, `DateTime.TryParse`, and `DateTime.TryParseExact` methods all convert a string to its equivalent date and time value. The following examples use the `DateTime.Parse` and `DateTime.ParseExact` methods to parse a string and convert it to a `DateTime` value. The second format uses a form supported by the ISO 8601 standard for a representing date and time in string format. This standard representation is often used to transfer date information in web services.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Instantiation.cs._

The `DateTime.TryParse` and `DateTime.TryParseExact` methods indicate whether a string is a valid representation of a `DateTime` value and, if it is, performs the conversion.

#### Language-specific syntax for Visual Basic

The following Visual Basic <example-value> initializes a new `DateTime` value.

#### DateTime values and their string representations

Internally, all `DateTime` values are represented as the number of ticks (the number of 100-nanosecond intervals) that have elapsed since 12:00:00 midnight, January 1, 0001. The actual `DateTime` value is independent of the way in which that value appears when displayed. The appearance of a `DateTime` value is the result of a formatting operation that converts a value to its string representation.

The appearance of date and time values is dependent on culture, international standards, application requirements, and personal preference. The `DateTime` structure offers flexibility in formatting date and time values through overloads of  `DateTime.ToString`. The default `ToString` method returns the string representation of a date and time value using the current culture's short date and long time pattern. The following example uses the default `ToString` method. It displays the date and time using the short date and long time pattern for the current culture. The en-US culture is the current culture on the computer on which the example was run.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/StringFormat.cs._

You may need to format dates in a specific culture to support web scenarios where the server may be in a different culture from the client. You specify the culture using the `ToString` method to create the short date and long time representation in a specific culture. The following example uses the `ToString` method to display the date and time using the short date and long time pattern for the fr-FR culture.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/StringFormat.cs._

Other applications may require different string representations of a date. The `ToString` method returns the string representation defined by a standard or custom format specifier using the formatting conventions of the current culture. The following example uses the `ToString` method to display the full date and time pattern for the en-US culture, the current culture on the computer on which the example was run.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/StringFormat.cs._

Finally, you can specify both the culture and the format using the `ToString` method. The following example uses the `ToString` method to display the full date and time pattern for the fr-FR culture.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/StringFormat.cs._

The `ToString` overload can also be used with a custom format string to specify other formats. The following example shows how to format a string using the ISO 8601 standard format often used for web services. The Iso 8601 format does not have a corresponding standard format string.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/StringFormat.cs._

For more information about formatting `DateTime` values, see  Standard Date and Time Format Strings and Custom Date and Time Format Strings.

#### Parse DateTime values from strings

Parsing converts the string representation of a date and time to a `DateTime` value. Typically, date and time strings have two different usages in applications:

- A date and time takes a variety of forms and reflects the conventions of either the current culture or a specific culture. For example, an application allows a user whose current culture is en-US to input a date value as "12/15/2013" or "December 15, 2013". It allows a user whose current culture is en-gb to input a date value as "15/12/2013" or "15 December 2013."

- A date and time is represented in a predefined format. For example, an application serializes a date as "20130103" independently of the culture on which the app is running. An application may require dates be input in the current culture's short date format.

You use the `DateTime.Parse` or `DateTime.TryParse` method to convert a string from one of the common date and time formats used by a culture to a `DateTime` value. The following example shows how you can use `DateTime.TryParse` to convert date strings in different culture-specific formats to a `DateTime` value. It changes the current culture to English (United Kingdom) and calls the `GetDateTimeFormats` method to generate an array of date and time strings. It then passes each element in the array to the `DateTime.TryParse` method. The output from the example shows the parsing method was able to successfully convert each of the culture-specific date and time strings.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Parsing.cs._

You use the `DateTime.ParseExact` and `DateTime.TryParseExact` methods to convert a string that must match a particular format or formats to a `DateTime` value. You specify one or more date and time format strings as a parameter to the parsing method. The following example uses the `TryParseExact` method to convert strings that must be either in a "yyyyMMdd" format or a "HHmmss" format to `DateTime` values.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Parsing.cs._

One common use for `DateTime.ParseExact` is to convert a string representation from a web service, usually in ISO 8601 standard format. The following code shows the correct format string to use:

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Parsing.cs._

If a string cannot be parsed, the `DateTime.Parse` and `DateTime.ParseExact` methods throw an exception. The `DateTime.TryParse` and `DateTime.TryParseExact` methods return a `Boolean` value that indicates whether the conversion succeeded or failed. You should use the `DateTime.TryParse` or `DateTime.TryParseExact` methods in scenarios where performance is important. The parsing operation for date and time strings tends to have a high failure rate, and exception handling is expensive. Use these methods if strings are input by users or coming from an unknown source.

For more information about parsing date and time values, see Parsing Date and Time Strings.

#### DateTime values

Descriptions of time values in the `DateTime` type are often expressed using the Coordinated Universal Time (UTC) standard. Coordinated Universal Time is the internationally recognized name for Greenwich Mean Time (GMT). Coordinated Universal Time is the time as measured at zero degrees longitude, the UTC origin point. Daylight saving time is not applicable to UTC.

Local time is relative to a particular time zone. A time zone is associated with a time zone offset. A time zone offset is the displacement of the time zone measured in hours from the UTC origin point. In addition, local time is optionally affected by daylight saving time, which adds or subtracts a time interval adjustment. Local time is calculated by adding the time zone offset to UTC and adjusting for daylight saving time if necessary. The time zone offset at the UTC origin point is zero.

UTC time is suitable for calculations, comparisons, and storing dates and time in files. Local time is appropriate for display in user interfaces of desktop applications. Time zone-aware applications (such as many Web applications) also need to work with a number of other time zones.

If the `Kind` property of a `DateTime` object is `Unspecified`, it is unspecified whether the time represented is local time, UTC time, or a time in some other time zone.

#### DateTime resolution

> **Note:**
> As an alternative to performing date and time arithmetic on `DateTime` values to measure elapsed time, you can use the `Stopwatch` class.
