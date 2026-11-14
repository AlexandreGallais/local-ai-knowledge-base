---
title: "DateTime struct (part 2 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 2 of 18)

The `Ticks` property expresses date and time values in units of one ten-millionth of a second. The `Millisecond` property returns the thousandths of a second in a date and time value. Using repeated calls to the `Now` property to measure elapsed time is dependent on the system clock. The system clock on Windows 7 and Windows 8 systems has a resolution of approximately 15 milliseconds. This resolution affects small time intervals less than 100 milliseconds.

The following example illustrates the dependence of current date and time values on the resolution of the system clock. In the example, an outer loop repeats 20 times, and an inner loop serves to delay the outer loop. If the value of the outer loop counter is 10, a call to the `Thread.Sleep` method introduces a five-millisecond delay. The following example shows the number of milliseconds returned by the `DateTime.Now.Milliseconds` property changes only after the call to `Thread.Sleep`.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Resolution.cs._

#### DateTime operations

A calculation using a `DateTime` structure, such as `DateTime.Add` or `DateTime.Subtract`, does not modify the value of the structure. Instead, the calculation returns a new `DateTime` structure whose value is the result of the calculation.

Conversion operations between time zones (such as between UTC and local time, or between one time zone and another) take daylight saving time into account, but arithmetic and comparison operations do not.

The `DateTime` structure itself offers limited support for converting from one time zone to another. You can use the `DateTime.ToLocalTime` method to convert UTC to local time, or you can use the `DateTime.ToUniversalTime` method to convert from local time to UTC. However, a full set of time zone conversion methods is available in the `TimeZoneInfo` class. You convert the time in any one of the world's time zones to the time in any other time zone using these methods.

Calculations and comparisons of `DateTime` objects are meaningful only if the objects represent times in the same time zone. You can use a `TimeZoneInfo` object to represent a `DateTime` value's time zone, although the two are loosely coupled. A `DateTime` object does not have a property that returns an object that represents that date and time value's time zone. The `Kind` property indicates if a `DateTime` represents UTC, local time, or is unspecified. In a time zone-aware application, you must rely on some external mechanism to determine the time zone in which a `DateTime` object was created. You could use a structure that wraps both the `DateTime` value and the `TimeZoneInfo` object that represents the `DateTime` value's time zone. For details on using UTC in calculations and comparisons with `DateTime` values, see Performing Arithmetic Operations with Dates and Times.

Each `DateTime` member implicitly uses the Gregorian calendar to perform its operation. Exceptions are methods that implicitly specify a calendar. These include constructors that specify a calendar, and methods with a parameter derived from `IFormatProvider`, such as `DateTimeFormatInfo`.

Operations by members of the `DateTime` type take into account details such as leap years and the number of days in a month.

#### DateTime values and calendars

The .NET Class Library includes a number of calendar classes, all of which are derived from the `Calendar` class. They are:

- The `ChineseLunisolarCalendar` class.
- The `EastAsianLunisolarCalendar` class.
- The `GregorianCalendar` class.
- The `HebrewCalendar` class.
- The `HijriCalendar` class.
- The `JapaneseCalendar` class.
- The `JapaneseLunisolarCalendar` class.
- The `JulianCalendar` class.
- The `KoreanCalendar` class.
- The `KoreanLunisolarCalendar` class.
- The `PersianCalendar` class.
- The `TaiwanCalendar` class.
- The `TaiwanLunisolarCalendar` class.
- The `ThaiBuddhistCalendar` class.
- The `UmAlQuraCalendar` class.

Each culture uses a default calendar defined by its read-only `Calendar` property. Each culture may support one or more calendars defined by its read-only `OptionalCalendars` property. The calendar currently used by a specific `CultureInfo` object is defined by its `Calendar` property. It must be one of the calendars found in the `OptionalCalendars` array.

A culture's current calendar is used in all formatting operations for that culture. For example, the default calendar of the Thai Buddhist culture is the Thai Buddhist Era calendar, which is represented by the `ThaiBuddhistCalendar` class. When a `CultureInfo` object that represents the Thai Buddhist culture is used in a date and time formatting operation, the Thai Buddhist Era calendar is used by default. The Gregorian calendar is used only if the culture's `Calendar` property is changed, as the following example shows:

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Calendar.cs._

A culture's current calendar is also used in all parsing operations for that culture, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Calendar.cs._

You instantiate a `DateTime` value using the date and time elements (number of the year, month, and day) of a specific calendar by calling a DateTime constructor that includes a `calendar` parameter and passing it a `Calendar` object that represents that calendar. The following example uses the date and time elements from the `ThaiBuddhistCalendar` calendar.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Calendar.cs._

`DateTime` constructors that do not include a `calendar` parameter assume that the date and time elements are expressed as units in the Gregorian calendar.

All other `DateTime` properties and methods use the Gregorian calendar. For example, the `Year` property returns the year in the Gregorian calendar, and the `IsLeapYear` method assumes that the `year` parameter is a year in the Gregorian calendar. Each `DateTime` member that uses the Gregorian calendar has a corresponding member of the `Calendar` class that uses a specific calendar. For example, the `Calendar.GetYear` method returns the year in a specific calendar, and the `Calendar.IsLeapYear` method interprets the `year` parameter as a year number in a specific calendar. The following example uses both the `DateTime` and the corresponding members of the  `ThaiBuddhistCalendar` class.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Calendar.cs._

The `DateTime` structure includes a `DayOfWeek` property that returns the day of the week in the Gregorian calendar. It does not include a member that allows you to retrieve the week number of the year. To retrieve the week of the year, call the individual calendar's `Calendar.GetWeekOfYear` method. The following example provides an illustration.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Calendar.cs._

For more information on dates and calendars, see Working with Calendars.

#### Persist DateTime values

You can persist `DateTime` values in the following ways:

- Convert them to strings and persist the strings.
- Convert them to 64-bit integer values (the value of the `Ticks` property) and persist the integers.
- Serialize the DateTime values.

You must ensure that the routine that restores the `DateTime` values doesn't lose data or throw an exception regardless of which technique you choose. `DateTime` values should round-trip. That is, the original value and the restored value should be the same. And if the original `DateTime` value represents a single instant of time, it should identify the same moment of time when it's restored.

#### Persist values as strings

To successfully restore `DateTime` values that are persisted as strings, follow these rules:

- Make the same assumptions about culture-specific formatting when you restore the string as when you persisted it. To ensure that a string can be restored on a system whose current culture is different from the culture of the system it was saved on, call the `DateTime.ToString` overload to save the string by using the conventions of the invariant culture. Call the `Parse` or `TryParse` overload to restore the string by using the conventions of the invariant culture. Never use the `ToString`, `Parse`, or `TryParse` overloads, which use the conventions of the current culture.

- If the date represents a single moment of time, ensure that it represents the same moment in time when it's restored, even on a different time zone. Convert the `DateTime` value to Coordinated Universal Time (UTC) before saving it or use `DateTimeOffset`.

The most common error made when persisting `DateTime` values as strings is to rely on the formatting conventions of the default or current culture. Problems arise if the current culture is different when saving and restoring the strings. The following example illustrates these problems. It saves five dates using the formatting conventions of the current culture, which in this case is English (United States). It restores the dates using the formatting conventions of a different culture, which in this case is English (United Kingdom). Because the formatting conventions of the two cultures are different, two of the dates can't be restored, and the remaining three dates are interpreted incorrectly. Also, if the original date and time values represent single moments in time, the restored times are incorrect because time zone information is lost.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Persistence.cs._

To round-trip `DateTime` values successfully, follow these steps:

1. If the values represent single moments of time, convert them from the local time to UTC by calling the `DateTime.ToUniversalTime` method.
1. Convert the dates to their string representations by calling the `ToString` or `Format` overload. Use the formatting conventions of the invariant culture by specifying `InvariantCulture` as the `provider` argument. Specify that the value should round-trip by using the "O" or "R" standard format string.

To restore the persisted `DateTime` values without data loss, follow these steps:

1. Parse the data by calling the `DateTime.ParseExact` or `DateTime.TryParseExact` overload. Specify `InvariantCulture` as the `provider` argument, and use the same standard format string you used for the `format` argument during conversion. Include the `RoundtripKind` value in the `styles` argument.
1. If the `DateTime` values represent single moments in time, call the `DateTime.ToLocalTime` method to convert the parsed date from UTC to local time.

The following example uses the invariant culture and the "O" standard format string to ensure that `DateTime` values saved and restored represent the same moment in time regardless of the system, culture, or time zone of the source and target systems.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Persistence.cs._

#### Persist values as integers

You can persist a date and time as an `Int64` value that represents a number of ticks. In this case, you don't have to consider the culture of the systems the `DateTime` values are persisted and restored on.

To persist a `DateTime` value as an integer:

1. If the `DateTime` values represent single moments in time, convert them to UTC by calling the `DateTime.ToUniversalTime` method.
1. Retrieve the number of ticks represented by the `DateTime` value from its `Ticks` property.

To restore a `DateTime` value that has been persisted as an integer:

1. Instantiate a new `DateTime` object by passing the `Int64` value to the `%23ctor` constructor.
1. If the `DateTime` value represents a single moment in time, convert it from UTC to the local time by calling the `DateTime.ToLocalTime` method.

The following example persists an array of `DateTime` values as integers on a system in the U.S. Pacific Time zone. It restores it on a system in the UTC zone. The file that contains the integers includes an `Int32` value that indicates the total number of `Int64` values that immediately follow it.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Persistence.cs._

#### Serialize DateTime values

You can persist `DateTime` values through serialization to a stream or file, and then restore them through deserialization. `DateTime` data is serialized in some specified object format. The objects are restored when they are deserialized. A formatter or serializer, such as `JsonSerializer` or `XmlSerializer`, handles the process of serialization and deserialization. For more information about serialization and the types of serialization supported by .NET, see Serialization.

The following example uses the `XmlSerializer` class to serialize and deserialize `DateTime` values. The values represent all leap year days in the twenty-first century. The output represents the result if the example is run on a system whose current culture is English (United Kingdom). Because you've deserialized the `DateTime` object itself, the code doesn't have to handle cultural differences in date and time formats.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/Persistence.cs._

The previous example doesn't include time information. If a `DateTime` value represents a moment in time and is expressed as a local time, convert it from local time to UTC before serializing it by calling the `DateTime.ToUniversalTime` method. After you deserialize it, convert it from UTC to local time by calling the `DateTime.ToLocalTime` method.

#### DateTime vs. TimeSpan

The `DateTime` and `TimeSpan` value types differ in that a `DateTime` represents an instant in time whereas a `TimeSpan` represents a time interval. You can subtract one instance of `DateTime` from another to obtain a `TimeSpan` object that represents the time interval between them. Or you could add a positive `TimeSpan` to the current `DateTime` to obtain a `DateTime` value that represents a future date.

You can add or subtract a time interval from a `DateTime` object. Time intervals can be negative or positive, and they can be expressed in units such as ticks, seconds, or as a `TimeSpan` object.

#### Compare for equality within tolerance

Equality comparisons for `DateTime` values are exact. To be considered equal, two values must be expressed as the same number of ticks. That precision is often unnecessary or even incorrect for many applications. Often, you want to test if `DateTime` objects are **roughly equal**.

The following example demonstrates how to compare roughly equivalent `DateTime` values. It accepts a small margin of difference when declaring them equal.

_Code sample not included: ~/snippets/csharp/System/DateTime/Overview/DateTimeComparisons.cs._

#### COM interop considerations
