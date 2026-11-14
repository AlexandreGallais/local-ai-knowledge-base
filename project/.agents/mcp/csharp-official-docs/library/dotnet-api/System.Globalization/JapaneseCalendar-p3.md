---
title: "JapaneseCalendar class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/JapaneseCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JapaneseCalendar class (part 3 of 3)

## JapaneseCalendar.IsLeapDay(Int32, Int32, Int32, Int32) method

```csharp
public override bool IsLeapDay (int year, int month, int day, int era);
```

Determines whether the specified date in the specified era is a leap day.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 to 12 that represents the month.
- `day`: An integer from 1 to 31 that represents the day.
- `era`: An integer that represents the era.

Returns: `true`, if the specified day is a leap day; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`month` is outside the range supported by the calendar.

-or-

`day` is outside the range supported by the calendar.

-or-

`era` is outside the range supported by the calendar.

Leap years in the Japanese calendar correspond to the same leap years in the Gregorian calendar. A leap year in the Gregorian calendar is defined as a Gregorian year that is evenly divisible by four, except if it is divisible by 100. However, Gregorian years that are divisible by 400 are leap years. A common year has 365 days and a leap year has 366 days.

A leap day is a day that occurs only in a leap year. For example, the 29th day of Nigatsu (February) is the only leap day.

#### Examples

The following example calls `JapaneseCalendar.IsLeapDay` for the last day of the second month (February) for five years in each of the eras. The current era in the example output is the Reiwa era.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar/IsLeapDay/japanesecalendar_isleapday.cs._

## JapaneseCalendar.IsLeapMonth(Int32, Int32, Int32) method

```csharp
public override bool IsLeapMonth (int year, int month, int era);
```

Determines whether the specified month in the specified year in the specified era is a leap month.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 to 12 that represents the month.
- `era`: An integer that represents the era.

Returns: This method always returns `false`, unless overridden by a derived class.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`month` is outside the range supported by the calendar.

-or-

`era` is outside the range supported by the calendar.

Leap years in the Japanese calendar correspond to the same leap years in the Gregorian calendar. A leap year in the Gregorian calendar is defined as a Gregorian year that is evenly divisible by four, except if it is divisible by 100. However, Gregorian years that are divisible by 400 are leap years. A common year has 365 days and a leap year has 366 days.

A leap month is an entire month that occurs only in a leap year. The Japanese calendar does not have any leap months.

#### Examples

The following example calls `JapaneseCalendar.IsLeapMonth` for all the months in the first five years in the current era.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar/IsLeapMonth/japanesecalendar_isleapmonth.cs._

## JapaneseCalendar.IsLeapYear(Int32, Int32) method

```csharp
public override bool IsLeapYear (int year, int era);
```

Determines whether the specified year in the specified era is a leap year.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: `true`, if the specified year is a leap year; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`era` is outside the range supported by the calendar.

Leap years in the Japanese calendar correspond to the same leap years in the Gregorian calendar. A leap year in the Gregorian calendar is defined as a Gregorian year that is evenly divisible by four, except if it is divisible by 100. However, Gregorian years that are divisible by 400 are leap years. A common year has 365 days and a leap year has 366 days.

#### Examples

The following example calls `JapaneseCalendar.IsLeapYear` for five years in each of the eras. The current era in the example output is the Reiwa era.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar/IsLeapYear/japanesecalendar_isleapyear.cs._

## JapaneseCalendar.ToDateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Int32) method

```csharp
public override DateTime ToDateTime (int year, int month, int day, int hour, int minute, int second, int millisecond, int era);
```

Returns a `DateTime` that is set to the specified date and time in the specified era.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 to 12 that represents the month.
- `day`: An integer from 1 to 31 that represents the day.
- `hour`: An integer from 0 to 23 that represents the hour.
- `minute`: An integer from 0 to 59 that represents the minute.
- `second`: An integer from 0 to 59 that represents the second.
- `millisecond`: An integer from 0 to 999 that represents the millisecond.
- `era`: An integer that represents the era.

Returns: The `DateTime` that is set to the specified date and time in the current era.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`month` is outside the range supported by the calendar.

-or-

`day` is outside the range supported by the calendar.

-or-

`hour` is less than zero or greater than 23.

-or-

`minute` is less than zero or greater than 59.

-or-

`second` is less than zero or greater than 59.

-or-

`millisecond` is less than zero or greater than 999.

-or-

`era` is outside the range supported by the calendar.

The `JapaneseCalendar.ToDateTime` method is useful because it can convert any date in the current calendar to a Gregorian calendar date. The Gregorian date can subsequently be used, for example, to compare dates in different calendars or create an equivalent date in a particular calendar.

Because the `JapaneseCalendar` supports multiple eras based on the reign of the emperor, you should always call this method and explicitly specify an era to avoid an unintended date and to make the intent of your code clear. The example shows how to instantiate a date that is always in the current era and one that belongs to a specified era.

#### Examples

The following example instantiates two dates. The first is always the first day of the second year in the current era, while the second identifies a specific day in the Taisho era. The output from the example was produced with the Heisei era as the current era.

_Code sample not included: ~/snippets/csharp/System.Globalization/JapaneseCalendar.ToDateTime/Program.cs._

## JapaneseCalendar.ToFourDigitYear(Int32) method

```csharp
public override int ToFourDigitYear (int year);
```

Converts the specified year to a four-digit year by using the `JapaneseCalendar.TwoDigitYearMax` property to determine the appropriate century.

Parameters:

- `year`: An integer (usually two digits) that represents the year to convert.

Returns: An integer that contains the four-digit representation of `year`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

This method implements `Calendar.ToFourDigitYear`.

Because the year in the Japanese calendar is typically less than four digits long, this implementation always returns the value of the `year` parameter.

`JapaneseCalendar.ToFourDigitYear` supports either a two-digit year or a four-digit year. However, a valid year is generally represented as two digits (less than 100). Passing a two-digit year value causes the method to convert the value to a four-digit value according to the `JapaneseCalendar.TwoDigitYearMax` value representing the appropriate century. If the application supplies a four-digit value, or if it supplies zero or a negative value, `JapaneseCalendar.ToFourDigitYear` throws an exception.
