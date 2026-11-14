---
title: "EastAsianLunisolarCalendar class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/EastAsianLunisolarCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EastAsianLunisolarCalendar class (part 2 of 2)

## EastAsianLunisolarCalendar.IsLeapMonth(Int32, Int32, Int32) method

```csharp
public override bool IsLeapMonth (int year, int month, int era);
```

Determines whether the specified month in the specified year and era is a leap month.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 through 13 that represents the month.
- `era`: An integer that represents the era.

Returns: `true` if the `month` parameter is a leap month; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year`, `month`, or `era` is outside the range supported by this calendar.

To be added.

## EastAsianLunisolarCalendar.IsLeapYear(Int32, Int32) method

```csharp
public override bool IsLeapYear (int year, int era);
```

Determines whether the specified year in the specified era is a leap year.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: `true` if the specified year is a leap year; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` or `era` is outside the range supported by this calendar.

To be added.

## EastAsianLunisolarCalendar.ToDateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Int32) method

```csharp
public override DateTime ToDateTime (int year, int month, int day, int hour, int minute, int second, int millisecond, int era);
```

Returns a `DateTime` that is set to the specified date, time, and era.

Parameters:

- `year`: An integer that represents the year.
- `month`: An integer from 1 through 13 that represents the month.
- `day`: An integer from 1 through 31 that represents the day.
- `hour`: An integer from 0 through 23 that represents the hour.
- `minute`: An integer from 0 through 59 that represents the minute.
- `second`: An integer from 0 through 59 that represents the second.
- `millisecond`: An integer from 0 through 999 that represents the millisecond.
- `era`: An integer that represents the era.

Returns: A `DateTime` that is set to the specified date, time, and era.

Exceptions:

- `ArgumentOutOfRangeException`: `year`, `month`, `day`, `hour`, `minute`, `second`, `millisecond`, or `era` is outside the range supported by this calendar.

#### Remarks
The `EastAsianLunisolarCalendar.ToDateTime` method can convert any date in the current calendar to a Gregorian calendar date. The Gregorian date can subsequently be used, for example, to compare dates in different calendars or create an equivalent date in a particular calendar.

## EastAsianLunisolarCalendar.ToFourDigitYear(Int32) method

```csharp
public override int ToFourDigitYear (int year);
```

Converts the specified year to a four-digit year.

Parameters:

- `year`: A two-digit or four-digit integer that represents the year to convert.

Returns: An integer that contains the four-digit representation of the `year` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by this calendar.

#### Remarks
The `EastAsianLunisolarCalendar.ToFourDigitYear` method uses the `TwoDigitYearMax` property to determine the appropriate century.

`EastAsianLunisolarCalendar.ToFourDigitYear` supports either a two-digit year or a four-digit year. Passing a two-digit year value (less than 100) causes the method to convert the value to a four-digit value according to the `EastAsianLunisolarCalendar.TwoDigitYearMax` value representing the appropriate century. If the application supplies a four-digit year value that is within the supported calendar range to `EastAsianLunisolarCalendar.ToFourDigitYear`, the method returns the actual input value. If the application supplies a four-digit value that is outside the supported calendar range, or if it supplies a negative value, the method throws an exception.
