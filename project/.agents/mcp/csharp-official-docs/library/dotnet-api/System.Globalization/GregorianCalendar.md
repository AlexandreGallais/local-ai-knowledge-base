---
title: "GregorianCalendar class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/GregorianCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GregorianCalendar class

Namespace: `System.Globalization`

```csharp
public class GregorianCalendar : System.Globalization.Calendar
```

Represents the Gregorian calendar.

#### Remarks
The Gregorian calendar recognizes two eras: B.C. or B.C.E., and A.D. or C.E. This implementation of the `GregorianCalendar` class recognizes only the current era (A.D. or C.E.).

> **Note:**
> For information about using the `GregorianCalendar` class and the other calendar classes in .NET, see Working with Calendars.

A leap year in the Gregorian calendar is defined as a year that is evenly divisible by 4, unless it is divisible by 100. However, years that are divisible by 400 are leap years. For example, the year 1900 was not a leap year, but the year 2000 was. A common year has 365 days and a leap year has 366 days.

The Gregorian calendar has 12 months with 28 to 31 days each: January (31 days), February (28 or 29 days), March (31 days), April (30 days), May (31 days), June (30 days), July (31 days), August (31 days), September (30 days), October (31 days), November (30 days), and December (31 days). February has 29 days during leap years and 28 during common years.

> **Important:**
>  By default, all `DateTime` and `DateTimeOffset` values express dates and times in the Gregorian calendar.

The Gregorian calendar was developed as a replacement for the Julian calendar (which is represented by the `JulianCalendar` class) and was first introduced in a small number of cultures on October 15, 1582. When working with historic dates that precede a culture's adoption of the Gregorian calendar, you should use the original calendar if it is available in .NET. For example, Denmark changed from the Julian calendar to the Gregorian calendar on February 19 (in the Julian calendar) or March 1 (in the Gregorian calendar) of 1700. In this case, for dates before the adoption of the Gregorian calendar, you should use the Julian calendar. However, no culture offers intrinsic support for the `JulianCalendar` class. You must use the `JulianCalendar` class as a standalone calendar. For more information, see Working with calendars.

The following example illustrates that February 18, 1700 in the Julian calendar, which is the last day the Julian calendar was officially used in Denmark, is one day earlier than March 1, 1700 in the Gregorian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/Overview/minimum1.cs._

Each `CultureInfo` supports a set of calendars. The `Calendar` property returns the default calendar for the culture, and the `OptionalCalendars` property returns an array containing all the calendars supported by the culture. To change the calendar used by a `CultureInfo`, the application can set the `Calendar` property to a new `Calendar`.

`DateTimeFormatInfo.GetEra` ignores punctuation in abbreviated era names, only if the `GregorianCalendar` is selected in `DateTimeFormatInfo.Calendar` and the culture uses "A.D." as the era name, that is, "A.D." is equivalent to "AD".

#### Examples
The following code example shows that `DateTimeFormatInfo` ignores the punctuation in the era name, only if the calendar is Gregorian and the culture uses the era name "A.D.".

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/GetEra/gregorian_getera.cs._

## GregorianCalendar.GregorianCalendar() constructor

```csharp
public GregorianCalendar ();
```

Initializes a new instance of the `GregorianCalendar` class using the default `GregorianCalendarTypes` value.

#### Remarks
The default `GregorianCalendarTypes` value is `Localized`. If the `Calendar` property of the `CultureInfo` is set to a `GregorianCalendar` that is created with this constructor, the dates and times are localized in the language associated with the `CultureInfo`.

#### Examples
The following code example prints a `DateTime` using a `GregorianCalendar` that is localized.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/.ctor/gregorianlocalized.cs._

## GregorianCalendar.GregorianCalendar(GregorianCalendarTypes) constructor

```csharp
public GregorianCalendar (System.Globalization.GregorianCalendarTypes type);
```

Initializes a new instance of the `GregorianCalendar` class using the specified `GregorianCalendarTypes` value.

Parameters:

- `type`: The `GregorianCalendarTypes` value that denotes which language version of the calendar to create.

Exceptions:

- `ArgumentOutOfRangeException`: `type` is not a member of the `GregorianCalendarTypes` enumeration.

To be added.

## GregorianCalendar.AlgorithmType property

```csharp
public override System.Globalization.CalendarAlgorithmType AlgorithmType { get; }
```

Gets a value that indicates whether the current calendar is solar-based, lunar-based, or a combination of both.

Returns: Always returns `CalendarAlgorithmType.SolarCalendar`.

#### Examples
The following example uses reflection to instantiate each `Calendar` type in .NET and displays the value of its `AlgorithmType` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AlgorithmType/algorithmtype1.cs._

## GregorianCalendar.CalendarType property

```csharp
public virtual System.Globalization.GregorianCalendarTypes CalendarType { get; set; }
```

Gets or sets the `GregorianCalendarTypes` value that denotes the language version of the current `GregorianCalendar`.

Returns: A `GregorianCalendarTypes` value that denotes the language version of the current `GregorianCalendar`.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified in a set operation is not a member of the `GregorianCalendarTypes` enumeration.
- `InvalidOperationException`: In a set operation, the current instance is read-only.

#### Examples
The following code example demonstrates how to determine the GregorianCalendar language version supported by the culture.

_Code sample not included: ~/snippets/csharp/System.Globalization/CultureInfo/OptionalCalendars/gregoriancalendartypes.cs._

## GregorianCalendar.Eras property

```csharp
public override int[] Eras { get; }
```

Gets the list of eras in the `GregorianCalendar`.

Returns: An array of integers that represents the eras in the `GregorianCalendar`.

#### Remarks
The Gregorian calendar recognizes two eras: B.C. or B.C.E., and A.D. or C.E. This implementation of the `GregorianCalendar` class recognizes only the current era (A.D. or C.E.). This property always returns an array with only one element.

## GregorianCalendar.MaxSupportedDateTime property

```csharp
public override DateTime MaxSupportedDateTime { get; }
```

Gets the latest date and time supported by the `GregorianCalendar` type.

Returns: The latest date and time supported by the `GregorianCalendar` type, which is the last moment of December 31, 9999 C.E. and is equivalent to <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

#### Examples
The following code example gets the minimum value and the maximum value of the calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/MaxSupportedDateTime/gregoriancalendar_minmax.cs._

## GregorianCalendar.MinSupportedDateTime property

```csharp
public override DateTime MinSupportedDateTime { get; }
```

Gets the earliest date and time supported by the `GregorianCalendar` type.

Returns: The earliest date and time supported by the `GregorianCalendar` type, which is the first moment of January 1, 0001 C.E. and is equivalent to <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see>.

#### Remarks
Although the value of the `MinSupportedDateTime` property is the first moment of January 1, 0001 C.E., the Gregorian calendar was not introduced until October 15, 1582, and its adoption throughout the European continent and worldwide was slow. Until they adopted the Gregorian calendar, most cultures in the European, American, and Australian continents used the Julian calendar, which is represented by the `JulianCalendar` class.

#### Examples
The following code example gets the minimum value and the maximum value of the calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/MaxSupportedDateTime/gregoriancalendar_minmax.cs._

## GregorianCalendar.TwoDigitYearMax property

```csharp
public override int TwoDigitYearMax { get; set; }
```

Gets or sets the last year of a 100-year range that can be represented by a 2-digit year.

Returns: The last year of a 100-year range that can be represented by a 2-digit year.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified in a set operation is less than 99.

-or-

The value specified in a set operation is greater than `MaxSupportedDateTime.Year`.
- `InvalidOperationException`: In a set operation, the current instance is read-only.

#### Remarks
This property allows a 2-digit year to be properly translated to a 4-digit year. For example, if this property is set to 2029, the 100-year range is from 1930 to 2029. Therefore, a 2-digit value of 30 is interpreted as 1930, while a 2-digit value of 29 is interpreted as 2029.

The initial value of this property is derived from the settings in the regional and language options portion of Control Panel. However, that information can change during the life of the `AppDomain`. The `GregorianCalendar` class does not detect changes in the system settings automatically.

The application should set this value to 99 to indicate that 2-digit years are to be taken literally. For example, if this property is set to 99, the 100-year range is from 0 (not a valid value for most calendars) to 99. Therefore, a 2-digit value of 30 is interpreted as 30.

## GregorianCalendar.AddMonths(DateTime, Int32) method

```csharp
public override DateTime AddMonths (DateTime time, int months);
```

Returns a `DateTime` that is the specified number of months away from the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to which to add months.
- `months`: The number of months to add.

Returns: The `DateTime` that results from adding the specified number of months to the specified `DateTime`.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range.
- `ArgumentOutOfRangeException`: `months` is less than -120000.

-or-

`months` is greater than 120000.

#### Remarks
The day part of the resulting `DateTime` is affected if the resulting day is not a valid day in the resulting month of the resulting year. It is changed to the last valid day in the resulting month of the resulting year. The year part of the resulting `DateTime` is affected if the resulting month is outside the year of the specified `DateTime`. This implementation supports only the current era. Therefore, `ArgumentException` is thrown if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

For example, if the specified month is October, which has 31 days, the specified day is the 31st day of that month, and the value of the `months` parameter is 6, the resulting year is one more than the specified year, the resulting month is April, and the resulting day is the 30th day, which is the last day in April.

If the value of the `months` parameter is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Gregorian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/AddMonths/gregoriancalendar_addget.cs._

## GregorianCalendar.AddYears(DateTime, Int32) method

```csharp
public override DateTime AddYears (DateTime time, int years);
```

Returns a `DateTime` that is the specified number of years away from the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to which to add years.
- `years`: The number of years to add.

Returns: The `DateTime` that results from adding the specified number of years to the specified `DateTime`.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range.

#### Remarks
The day part of the resulting `DateTime` is affected if the resulting day is not a valid day in the resulting month of the resulting year. It is changed to the last valid day in the resulting month of the resulting year. The month part of the resulting `DateTime` remains the same as the specified `DateTime`. This implementation supports only the current era. Therefore, `ArgumentException` is thrown if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

For example, February has 28 days, except during leap years when it has 29 days. If the specified date is the 29th day of February in a leap year and the value of `years` is 1, the resulting date will be the 28th day of February in the following year.

If `years` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Gregorian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/AddMonths/gregoriancalendar_addget.cs._

## GregorianCalendar.GetDayOfMonth(DateTime) method

```csharp
public override int GetDayOfMonth (DateTime time);
```

Returns the day of the month in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 31 that represents the day of the month in `time`.

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Gregorian calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/GregorianCalendar/AddMonths/gregoriancalendar_addget.cs._
