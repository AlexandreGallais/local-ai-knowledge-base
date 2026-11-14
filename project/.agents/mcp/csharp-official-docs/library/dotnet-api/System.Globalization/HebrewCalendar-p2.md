---
title: "HebrewCalendar class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/HebrewCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HebrewCalendar class (part 2 of 3)

## HebrewCalendar.GetDayOfYear(DateTime) method

```csharp
public override int GetDayOfYear (DateTime time);
```

Returns the day of the year in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 385 that represents the day of the year in the specified `DateTime`.

Exceptions:

- `ArgumentOutOfRangeException`: `time` is earlier than September 17, 1583 in the Gregorian calendar, or greater than `HebrewCalendar.MaxSupportedDateTime`.

#### Remarks
The day of the year is defined as the number of days from the first day of the year. For example, `HebrewCalendar.GetDayOfYear` for the first day of the first month returns 1, and `HebrewCalendar.GetDayOfYear` for the last day of the last month returns the total number of days in that year, which is the same value returned by `HebrewCalendar.GetDaysInYear`.

This implementation of the `HebrewCalendar` class recognizes only the Hebrew years 5343 to 5999 (1583 to 2239 in the Gregorian calendar).

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Hebrew calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/AddMonths/hebrewcalendar_addget.cs._

## HebrewCalendar.GetDaysInMonth(Int32, Int32, Int32) method

```csharp
public override int GetDaysInMonth (int year, int month, int era);
```

Returns the number of days in the specified month in the specified year in the specified era.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 to 13 that represents the month.
- `era`: An integer that represents the era. Specify either `HebrewCalendar.HebrewEra` or `Calendar.Eras[Calendar.CurrentEra]`.

Returns: The number of days in the specified month in the specified year in the specified era.

Exceptions:

- `ArgumentOutOfRangeException`: `year`, `month`, or `era` is outside the range supported by the current `HebrewCalendar` object.

#### Remarks
For example, this method returns 29 or 30 for Cheshvan, depending on the placement of Jewish holidays.

This implementation of the `HebrewCalendar` class recognizes only the Hebrew years 5343 to 5999 (1583 to 2239 in the Gregorian calendar).

#### Examples
The following code example calls `GetDaysInMonth` for the second month in each of five years in each era.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/GetDaysInMonth/hebrewcalendar_getdaysinmonth.cs._

## HebrewCalendar.GetDaysInYear(Int32, Int32) method

```csharp
public override int GetDaysInYear (int year, int era);
```

Returns the number of days in the specified year in the specified era.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era. Specify either `HebrewCalendar.HebrewEra` or `HebrewCalendar.Eras[Calendar.CurrentEra]`.

Returns: The number of days in the specified year in the specified era.

Exceptions:

- `ArgumentOutOfRangeException`: `year` or `era` is outside the range supported by the current `HebrewCalendar` object.

#### Remarks
For example, this method returns an integer from 353 to 355 or from 383 to 385, depending on the placement of Jewish holidays and depending on whether `year` is a leap year.

This implementation of the `HebrewCalendar` class recognizes only the Hebrew years 5343 to 5999 (1583 to 2239 in the Gregorian calendar).

#### Examples
The following code example calls `GetDaysInYear` for five years in each era.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/GetDaysInYear/hebrewcalendar_getdaysinyear.cs._

## HebrewCalendar.GetEra(DateTime) method

```csharp
public override int GetEra (DateTime time);
```

Returns the era in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the era in the specified `DateTime`. The return value is always `HebrewCalendar.HebrewEra`.

#### Remarks
The Hebrew calendar recognizes two eras: B.C.E. (before the common era) and A.M. (Latin "Anno Mundi", which means "the year of the world"). This implementation of the `HebrewCalendar` class recognizes only the current era (A.M.) and only the Hebrew years 5343 to 5999 (1583 to 2239 in the Gregorian calendar).

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Hebrew calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/AddMonths/hebrewcalendar_addget.cs._

## HebrewCalendar.GetLeapMonth(Int32, Int32) method

```csharp
public override int GetLeapMonth (int year, int era);
```

Calculates the leap month for a specified year and era.

Parameters:

- `year`: A year.
- `era`: An era. Specify either `HebrewCalendar.HebrewEra` or `HebrewCalendar.Eras[Calendar.CurrentEra]`.

Returns: A positive integer that indicates the leap month in the specified year and era. The return value is 7 if the `year` and `era` parameters specify a leap year, or 0 if the year is not a leap year.

Exceptions:

- `ArgumentOutOfRangeException`: `era` is not `HebrewCalendar.HebrewEra` or `HebrewCalendar.Eras[Calendar.CurrentEra]`.

-or-

`year` is less than the Hebrew calendar year 5343 or greater than the Hebrew calendar year 5999.

#### Remarks
In a calendar that supports the notion of a leap month, the leap month can occur either after a particular month or after any month in a year. For example, the `EastAsianLunisolarCalendar.GetMonth` method returns a number between 1 and 13 that indicates the month associated with a specified date. If there is a leap month between the eighth and ninth months of the year, the `EastAsianLunisolarCalendar.GetMonth` method returns 8 for the eighth month, 9 for the leap eighth month, and 10 for the ninth month.

## HebrewCalendar.GetMonth(DateTime) method

```csharp
public override int GetMonth (DateTime time);
```

Returns the month in the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 to 13 that represents the month in the specified `DateTime`.

Exceptions:

- `ArgumentOutOfRangeException`: `time` is less than `HebrewCalendar.MinSupportedDateTime` or greater than `HebrewCalendar.MaxSupportedDateTime`.

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Hebrew calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/AddMonths/hebrewcalendar_addget.cs._

## HebrewCalendar.GetMonthsInYear(Int32, Int32) method

```csharp
public override int GetMonthsInYear (int year, int era);
```

Returns the number of months in the specified year in the specified era.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era. Specify either `HebrewCalendar.HebrewEra` or `HebrewCalendar.Eras[Calendar.CurrentEra]`.

Returns: The number of months in the specified year in the specified era. The return value is either 12 in a common year, or 13 in a leap year.

Exceptions:

- `ArgumentOutOfRangeException`: `year` or `era` is outside the range supported by the current `HebrewCalendar` object.

#### Remarks
This implementation of the `HebrewCalendar` class recognizes only the Hebrew years 5343 to 5999 (1583 to 2239 in the Gregorian calendar).

#### Examples
The following code example calls `GetMonthsInYear` for five years in each era.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/GetMonthsInYear/hebrewcalendar_getmonthsinyear.cs._

## HebrewCalendar.GetYear(DateTime) method

```csharp
public override int GetYear (DateTime time);
```

Returns the year in the specified `DateTime` value.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the year in the specified `DateTime` value.

Exceptions:

- `ArgumentOutOfRangeException`: `time` is outside the range supported by the current `HebrewCalendar` object.

#### Remarks
This implementation of the `HebrewCalendar` class recognizes only the Hebrew years 5343 to 5999 (1583 to 2239 in the Gregorian calendar).

#### Examples
The following code example displays the values of several components of a `DateTime` in terms of the Hebrew calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/AddMonths/hebrewcalendar_addget.cs._

## HebrewCalendar.IsLeapDay(Int32, Int32, Int32, Int32) method

```csharp
public override bool IsLeapDay (int year, int month, int day, int era);
```

Determines whether the specified date in the specified era is a leap day.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 to 13 that represents the month.
- `day`: An integer from 1 to 30 that represents the day.
- `era`: An integer that represents the era. Specify either `HebrewCalendar.HebrewEra` or `HebrewCalendar.Eras[Calendar.CurrentEra]`.

Returns: `true` if the specified day is a leap day; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year`, `month`, `day`, or `era` is outside the range supported by this calendar.

#### Remarks
This implementation of the `HebrewCalendar` class recognizes only the Hebrew years 5343 to 5999 (1583 to 2239 in the Gregorian calendar).

In every 19-year cycle that ends with a year that is evenly divisible by 19, the 3rd, 6th, 8th, 11th, 14th, 17th, and 19th years are leap years. A common year can have from 353 to 355 days, depending on the placement of Jewish holidays. A leap year can have from 383 to 385 days.

A leap day is a day that occurs only in a leap year. In the Hebrew calendar, the last day of Adar Alef and all the days in Adar Beit are considered leap days.

#### Examples
The following code example calls `IsLeapDay` for the last day of the second month (February) for five years in each of the eras.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/IsLeapDay/hebrewcalendar_isleapday.cs._

## HebrewCalendar.IsLeapMonth(Int32, Int32, Int32) method

```csharp
public override bool IsLeapMonth (int year, int month, int era);
```

Determines whether the specified month in the specified year in the specified era is a leap month.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 to 13 that represents the month.
- `era`: An integer that represents the era. Specify either `HebrewCalendar.HebrewEra` or `HebrewCalendar.Eras[Calendar.CurrentEra]`.

Returns: `true` if the specified month is a leap month; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year`, `month`, or `era` is outside the range supported by this calendar.

#### Remarks
This implementation of the `HebrewCalendar` class recognizes only the Hebrew years 5343 to 5999 (1583 to 2239 in the Gregorian calendar).

In every 19-year cycle that ends with a year that is evenly divisible by 19, the 3rd, 6th, 8th, 11th, 14th, 17th, and 19th years are leap years. A common year can have from 353 to 355 days, depending on the placement of Jewish holidays. A leap year can have from 383 to 385 days.

A leap month is an entire month that occurs only in a leap year. In the Hebrew calendar, Adar Beit is the only leap month.

#### Examples
The following code example calls `IsLeapMonth` for all the months in five years in the current era.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/IsLeapMonth/hebrewcalendar_isleapmonth.cs._

## HebrewCalendar.IsLeapYear(Int32, Int32) method

```csharp
public override bool IsLeapYear (int year, int era);
```

Determines whether the specified year in the specified era is a leap year.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era. Specify either `HebrewCalendar.HebrewEra` or `HebrewCalendar.Eras[Calendar.CurrentEra]`.

Returns: `true` if the specified year is a leap year; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` or `era` is outside the range supported by this calendar.

#### Remarks
This implementation of the `HebrewCalendar` class recognizes only the Hebrew years 5343 to 5999 (1583 to 2239 in the Gregorian calendar).

In every 19-year cycle that ends with a year that is evenly divisible by 19, the 3rd, 6th, 8th, 11th, 14th, 17th, and 19th years are leap years. A common year can have from 353 to 355 days, depending on the placement of Jewish holidays. A leap year can have from 383 to 385 days.

#### Examples
The following code example calls `IsLeapYear` for five years in each of the eras.

_Code sample not included: ~/snippets/csharp/System.Globalization/HebrewCalendar/IsLeapYear/hebrewcalendar_isleapyear.cs._

## HebrewCalendar.ToDateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Int32) method

```csharp
public override DateTime ToDateTime (int year, int month, int day, int hour, int minute, int second, int millisecond, int era);
```

Returns a `DateTime` that is set to the specified date and time in the specified era.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 to 13 that represents the month.
- `day`: An integer from 1 to 30 that represents the day.
- `hour`: An integer from 0 to 23 that represents the hour.
- `minute`: An integer from 0 to 59 that represents the minute.
- `second`: An integer from 0 to 59 that represents the second.
- `millisecond`: An integer from 0 to 999 that represents the millisecond.
- `era`: An integer that represents the era. Specify either `HebrewCalendar.HebrewEra` or `HebrewCalendar.Eras[Calendar.CurrentEra]`.

Returns: The `DateTime` that is set to the specified date and time in the current era.

Exceptions:

- `ArgumentOutOfRangeException`: `year`, `month`, `day` or `era` is outside the range supported by the current `HebrewCalendar` object.

-or-

`hour` is less than 0 or greater than 23.

-or-

`minute` is less than 0 or greater than 59.

-or-

`second` is less than 0 or greater than 59.

-or-

`millisecond` is less than 0 or greater than 999.

#### Remarks
The `HebrewCalendar.ToDateTime` method is useful because it can convert any date in the current calendar to a Gregorian calendar date. The Gregorian date can subsequently be used, for example, to compare dates in different calendars or create an equivalent date in a particular calendar.

This implementation of the `HebrewCalendar` class recognizes only the Hebrew years 5343 to 5999 (1583 to 2239 in the Gregorian calendar).
