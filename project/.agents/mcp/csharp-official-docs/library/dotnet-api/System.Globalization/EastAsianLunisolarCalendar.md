---
title: "EastAsianLunisolarCalendar class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/EastAsianLunisolarCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EastAsianLunisolarCalendar class

Namespace: `System.Globalization`

```csharp
public abstract class EastAsianLunisolarCalendar : System.Globalization.Calendar
```

Represents a calendar that divides time into months, days, years, and eras, and has dates that are based on cycles of the sun and the moon.

#### Remarks
The `EastAsianLunisolarCalendar` class supports the sexagenary cycle of years (which repeats every 60 years) in addition to solar years and lunar months. Each solar year in the calendar is associated with a Sexagenary Year (see `EastAsianLunisolarCalendar.GetSexagenaryYear`), a Celestial Stem (see `EastAsianLunisolarCalendar.GetCelestialStem`), and a Terrestrial Branch (see `EastAsianLunisolarCalendar.GetTerrestrialBranch`).

> **Note:**
> For information about using the `EastAsianLunisolarCalendar` class and the other calendar classes in .NET, see Working with Calendars.

A year can have a leap month after any month of the year, and a month can have a leap day. For example, the `EastAsianLunisolarCalendar.GetMonth` method returns a positive integer that indicates the month associated with a specified date. If there is a leap month between the eighth and ninth months of the year, the `EastAsianLunisolarCalendar.GetMonth` method returns 8 for the eighth month, 9 for the leap eighth month, and 10 for the ninth month.

Each `CultureInfo` supports a set of calendars. Currently, none of the lunisolar calendar classes that derive from `EastAsianLunisolarCalendar` is used by any of the cultures supported by the `CultureInfo` class. Therefore, this class and those that derive from it can be used only to calculate dates in the East Asian lunisolar calendars. This class supports several "get" methods to describe a `DateTime` in the terms used by lunisolar calendars, and the `EastAsianLunisolarCalendar.ToDateTime` method to convert from lunisolar calendar data to a `DateTime`.

## EastAsianLunisolarCalendar.AlgorithmType property

```csharp
public override System.Globalization.CalendarAlgorithmType AlgorithmType { get; }
```

Gets a value indicating whether the current calendar is solar-based, lunar-based, or a combination of both.

Returns: Always returns `CalendarAlgorithmType.LunisolarCalendar`.

To be added.

## EastAsianLunisolarCalendar.TwoDigitYearMax property

```csharp
public override int TwoDigitYearMax { get; set; }
```

Gets or sets the last year of a 100-year range that can be represented by a 2-digit year.

Returns: The last year of a 100-year range that can be represented by a 2-digit year.

Exceptions:

- `InvalidOperationException`: The current `EastAsianLunisolarCalendar` is read-only.
- `ArgumentOutOfRangeException`: The value in a set operation is less than 99 or greater than the maximum supported year in the current calendar.

#### Remarks
This property allows a 2-digit year to be properly translated to a 4-digit year. For example, in the Gregorian calendar, if this property is set to 2029, the 100-year range is from 1930 to 2029. Therefore, a 2-digit value of 30 is interpreted as 1930, while a 2-digit value of 29 is interpreted as 2029.

The initial value of this property is derived from the settings in the regional and language options portion of Control Panel. However, that information can change during the life of the `AppDomain`. The `EastAsianLunisolarCalendar` class does not detect changes in the system settings automatically.

## EastAsianLunisolarCalendar.AddMonths(DateTime, Int32) method

```csharp
public override DateTime AddMonths (DateTime time, int months);
```

Calculates the date that is the specified number of months away from the specified date.

Parameters:

- `time`: The `DateTime` to which to add `months`.
- `months`: The number of months to add.

Returns: A new `DateTime` that results from adding the specified number of months to the `time` parameter.

Exceptions:

- `ArgumentException`: The result is outside the supported range of a `DateTime`.
- `ArgumentOutOfRangeException`: `months` is less than -120000 or greater than 120000.

-or-

`time` is less than `Calendar.MinSupportedDateTime` or greater than `Calendar.MaxSupportedDateTime`.

#### Remarks
The day part of the resulting `DateTime` is affected if the resulting day is not a valid day in the resulting month of the resulting year. In this case, the day part is changed to the last valid day in the resulting month of the resulting year. The year part of the resulting `DateTime` is affected if the resulting month is outside the year of the specified `DateTime`. This implementation supports only the current era. Therefore, `ArgumentException` is thrown if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

For example, if the specified month is October, which has 31 days, the specified day is the thirty-first day of that month, and the value of the `months` parameter is 6, the resulting year is one more than the specified year, the resulting month is April, and the resulting day is the thirtieth day, which is the last day in April.

If the value of the `months` parameter is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

## EastAsianLunisolarCalendar.AddYears(DateTime, Int32) method

```csharp
public override DateTime AddYears (DateTime time, int years);
```

Calculates the date that is the specified number of years away from the specified date.

Parameters:

- `time`: The `DateTime` to which to add `years`.
- `years`: The number of years to add.

Returns: A new `DateTime` that results from adding the specified number of years to the `time` parameter.

Exceptions:

- `ArgumentException`: The result is outside the supported range of a `DateTime`.
- `ArgumentOutOfRangeException`: `time` is less than `Calendar.MinSupportedDateTime` or greater than `Calendar.MaxSupportedDateTime`.

#### Remarks
The day part of the resulting `DateTime` is affected if the resulting day is not a valid day in the resulting month of the resulting year. In this case, the day part is changed to the last valid day in the resulting month of the resulting year. The month part of the resulting `DateTime` remains the same as the specified `DateTime`. This implementation supports only the current era. Therefore, `ArgumentException` is thrown if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

For example, February has 28 days, except during leap years when it has 29 days. If the specified date is the twenty-ninth day of February in a leap year and the value of the `years` parameter is 1, the resulting date will be the twenty-eighth day of February in the following year.

If `years` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

## EastAsianLunisolarCalendar.GetCelestialStem(Int32) method

```csharp
public int GetCelestialStem (int sexagenaryYear);
```

Calculates the celestial stem of the specified year in the sexagenary (60-year) cycle.

Parameters:

- `sexagenaryYear`: An integer from 1 through 60 that represents a year in the sexagenary cycle.

Returns: A number from 1 through 10.

Exceptions:

- `ArgumentOutOfRangeException`: `sexagenaryYear` is less than 1 or greater than 60.

To be added.

## EastAsianLunisolarCalendar.GetDayOfMonth(DateTime) method

```csharp
public override int GetDayOfMonth (DateTime time);
```

Calculates the day of the month in the specified date.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 through 31 that represents the day of the month specified in the `time` parameter.

To be added.

## EastAsianLunisolarCalendar.GetDayOfWeek(DateTime) method

```csharp
public override DayOfWeek GetDayOfWeek (DateTime time);
```

Calculates the day of the week in the specified date.

Parameters:

- `time`: The `DateTime` to read.

Returns: One of the `DayOfWeek` values that represents the day of the week specified in the `time` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `time` is less than `Calendar.MinSupportedDateTime` or greater than `Calendar.MaxSupportedDateTime`.

To be added.

## EastAsianLunisolarCalendar.GetDayOfYear(DateTime) method

```csharp
public override int GetDayOfYear (DateTime time);
```

Calculates the day of the year in the specified date.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 through 354 in a common year, or 1 through 384 in a leap year, that represents the day of the year specified in the `time` parameter.

#### Remarks
The day of the year is defined as the number of days from the first day of the year. For example, `EastAsianLunisolarCalendar.GetDayOfYear` for the first day of the first month returns 1, and `EastAsianLunisolarCalendar.GetDayOfYear` for the last day of the last month returns the total number of days in that year, which is the same value returned by `EastAsianLunisolarCalendar.GetDaysInYear`.

## EastAsianLunisolarCalendar.GetDaysInMonth(Int32, Int32, Int32) method

```csharp
public override int GetDaysInMonth (int year, int month, int era);
```

Calculates the number of days in the specified month of the specified year and era.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 through 12 in a common year, or 1 through 13 in a leap year, that represents the month.
- `era`: An integer that represents the era.

Returns: The number of days in the specified month of the specified year and era.

Exceptions:

- `ArgumentOutOfRangeException`: `year`, `month`, or `era` is outside the range supported by this calendar.

#### Remarks
If the `month` parameter is the second month, the `EastAsianLunisolarCalendar.GetDaysInMonth` method returns 28 or 29, depending on whether the `year` parameter is a leap year.

## EastAsianLunisolarCalendar.GetDaysInYear(Int32, Int32) method

```csharp
public override int GetDaysInYear (int year, int era);
```

Calculates the number of days in the specified year and era.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: The number of days in the specified year and era.

Exceptions:

- `ArgumentOutOfRangeException`: `year` or `era` is outside the range supported by this calendar.

#### Remarks
The `EastAsianLunisolarCalendar.GetDaysInYear` method returns 365 or 366, depending on whether the `year` parameter is a leap year.

## EastAsianLunisolarCalendar.GetLeapMonth(Int32, Int32) method

```csharp
public override int GetLeapMonth (int year, int era);
```

Calculates the leap month for the specified year and era.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: A positive integer from 1 through 13 that indicates the leap month in the specified year and era.

-or-

Zero if this calendar does not support a leap month, or if the `year` and `era` parameters do not specify a leap year.

#### Remarks
In a calendar that supports a leap month, the leap month can occur either after a particular month or after any month in a year. For example, the `EastAsianLunisolarCalendar.GetMonth` method returns a number from 1 through 13 that indicates the month associated with a specified date. If there is a leap month between the eighth and ninth months of the year, the `EastAsianLunisolarCalendar.GetMonth` method returns 8 for the eighth month, 9 for the leap eighth month, and 10 for the ninth month.

## EastAsianLunisolarCalendar.GetMonth(DateTime) method

```csharp
public override int GetMonth (DateTime time);
```

Returns the month in the specified date.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 13 that represents the month specified in the `time` parameter.

To be added.

## EastAsianLunisolarCalendar.GetMonthsInYear(Int32, Int32) method

```csharp
public override int GetMonthsInYear (int year, int era);
```

Calculates the number of months in the specified year and era.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: The number of months in the specified year in the specified era. The return value is 12 months in a common year or 13 months in a leap year.

Exceptions:

- `ArgumentOutOfRangeException`: `year` or `era` is outside the range supported by this calendar.

To be added.

## EastAsianLunisolarCalendar.GetSexagenaryYear(DateTime) method

```csharp
public virtual int GetSexagenaryYear (DateTime time);
```

Calculates the year in the sexagenary (60-year) cycle that corresponds to the specified date.

Parameters:

- `time`: A `DateTime` to read.

Returns: A number from 1 through 60 in the sexagenary cycle that corresponds to the `time` parameter.

To be added.

## EastAsianLunisolarCalendar.GetTerrestrialBranch(Int32) method

```csharp
public int GetTerrestrialBranch (int sexagenaryYear);
```

Calculates the terrestrial branch of the specified year in the sexagenary (60-year) cycle.

Parameters:

- `sexagenaryYear`: An integer from 1 through 60 that represents a year in the sexagenary cycle.

Returns: An integer from 1 through 12.

Exceptions:

- `ArgumentOutOfRangeException`: `sexagenaryYear` is less than 1 or greater than 60.

To be added.

## EastAsianLunisolarCalendar.GetYear(DateTime) method

```csharp
public override int GetYear (DateTime time);
```

Returns the year in the specified date.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the year in the specified `DateTime`.

To be added.

## EastAsianLunisolarCalendar.IsLeapDay(Int32, Int32, Int32, Int32) method

```csharp
public override bool IsLeapDay (int year, int month, int day, int era);
```

Determines whether the specified date in the specified era is a leap day.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 through 13 that represents the month.
- `day`: An integer from 1 through 31 that represents the day.
- `era`: An integer that represents the era.

Returns: `true` if the specified day is a leap day; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year`, `month`, `day`, or `era` is outside the range supported by this calendar.

To be added.
