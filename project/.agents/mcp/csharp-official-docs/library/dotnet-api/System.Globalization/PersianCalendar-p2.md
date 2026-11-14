---
title: "PersianCalendar class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/PersianCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PersianCalendar class (part 2 of 2)

## PersianCalendar.GetLeapMonth(Int32, Int32) method

```csharp
public override int GetLeapMonth (int year, int era);
```

Returns the leap month for a specified year and era.

Parameters:

- `year`: An integer from 1 through 9378 that represents the year to convert.
- `era`: An integer from 0 through 1 that represents the era.

Returns: The return value is always 0.

Exceptions:

- `ArgumentOutOfRangeException`: `year` or `era` is outside the range supported by this calendar.

#### Examples
The following code example demonstrates the use of the `PersianCalendar.GetLeapMonth` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.GetMonth(DateTime) method

```csharp
public override int GetMonth (DateTime time);
```

Returns the month in the specified `DateTime` object.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 through 12 that represents the month in the specified `DateTime` object.

Exceptions:

- `ArgumentOutOfRangeException`: The `time` parameter represents a date less than `PersianCalendar.MinSupportedDateTime` or greater than `PersianCalendar.MaxSupportedDateTime`.

#### Examples
The following code example demonstrates the use of the `PersianCalendar.GetMonth` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.GetMonthsInYear(Int32, Int32) method

```csharp
public override int GetMonthsInYear (int year, int era);
```

Returns the number of months in the specified year of the specified era.

Parameters:

- `year`: An integer from 1 through 9378 that represents the year.
- `era`: An integer from 0 through 1 that represents the era.

Returns: Returns 10 if the `year` parameter is 9378; otherwise, always returns 12.

Exceptions:

- `ArgumentOutOfRangeException`: `year` or `era` is outside the range supported by this calendar.

#### Examples
The following code example demonstrates the use of the `PersianCalendar.GetMonthsInYear` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.GetYear(DateTime) method

```csharp
public override int GetYear (DateTime time);
```

Returns the year in the specified `DateTime` object.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer from 1 through 9378 that represents the year in the specified `DateTime`.

Exceptions:

- `ArgumentOutOfRangeException`: The `time` parameter represents a date less than `PersianCalendar.MinSupportedDateTime` or greater than `PersianCalendar.MaxSupportedDateTime`.

#### Examples
The following code example demonstrates the use of the `PersianCalendar.GetYear` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.IsLeapDay(Int32, Int32, Int32, Int32) method

```csharp
public override bool IsLeapDay (int year, int month, int day, int era);
```

Determines whether the specified date is a leap day.

Parameters:

- `year`: An integer from 1 through 9378 that represents the year.
- `month`: An integer that represents the month and ranges from 1 through 12 if `year` is not 9378, or 1 through 10 if `year` is 9378.
- `day`: An integer from 1 through 31 that represents the day.
- `era`: An integer from 0 through 1 that represents the era.

Returns: `true` if the specified day is a leap day; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year`, `month`, `day`, or `era` is outside the range supported by this calendar.

#### Remarks
A leap day is a day that occurs only in a leap year.

#### Examples
The following code example demonstrates the use of the `PersianCalendar.IsLeapDay` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.IsLeapMonth(Int32, Int32, Int32) method

```csharp
public override bool IsLeapMonth (int year, int month, int era);
```

Determines whether the specified month in the specified year and era is a leap month.

Parameters:

- `year`: An integer from 1 through 9378 that represents the year.
- `month`: An integer that represents the month and ranges from 1 through 12 if `year` is not 9378, or 1 through 10 if `year` is 9378.
- `era`: An integer from 0 through 1 that represents the era.

Returns: Always returns `false` because the `PersianCalendar` class does not support the notion of a leap month.

Exceptions:

- `ArgumentOutOfRangeException`: `year`, `month`, or `era` is outside the range supported by this calendar.

#### Examples
The following code example demonstrates the use of the `PersianCalendar.IsLeapMonth` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.IsLeapYear(Int32, Int32) method

```csharp
public override bool IsLeapYear (int year, int era);
```

Determines whether the specified year in the specified era is a leap year.

Parameters:

- `year`: An integer from 1 through 9378 that represents the year.
- `era`: An integer from 0 through 1 that represents the era.

Returns: `true` if the specified year is a leap year; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` or `era` is outside the range supported by this calendar.

#### Examples

The following code example demonstrates the use of the `PersianCalendar.IsLeapYear` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.ToDateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Int32) method

```csharp
public override DateTime ToDateTime (int year, int month, int day, int hour, int minute, int second, int millisecond, int era);
```

Returns a `DateTime` object that is set to the specified date, time, and era.

Parameters:

- `year`: An integer from 1 through 9378 that represents the year.
- `month`: An integer from 1 through 12 that represents the month.
- `day`: An integer from 1 through 31 that represents the day.
- `hour`: An integer from 0 through 23 that represents the hour.
- `minute`: An integer from 0 through 59 that represents the minute.
- `second`: An integer from 0 through 59 that represents the second.
- `millisecond`: An integer from 0 through 999 that represents the millisecond.
- `era`: An integer from 0 through 1 that represents the era.

Returns: A `DateTime` object that is set to the specified date and time in the current era.

Exceptions:

- `ArgumentOutOfRangeException`: `year`, `month`, `day`, `hour`, `minute`, `second`, `millisecond`, or `era` is outside the range supported by this calendar.

#### Remarks
The `PersianCalendar.ToDateTime` method is useful because it can convert any date in the current calendar to a Gregorian calendar date. The Gregorian date can subsequently be used, for example, to compare dates in different calendars or create an equivalent date in a particular calendar.

#### Examples
The following code example demonstrates the use of the `PersianCalendar.ToDateTime` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.ToFourDigitYear(Int32) method

```csharp
public override int ToFourDigitYear (int year);
```

Converts the specified year to a four-digit year representation.

Parameters:

- `year`: An integer from 1 through 9378 that represents the year to convert.

Returns: An integer that contains the four-digit representation of `year`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is less than 0 or greater than 9378.

#### Remarks
This method converts the `year` parameter to a four-digit year representation using the `TwoDigitYearMax` property. The return value is the upper boundary of a 100-year range that allows a two-digit year to be properly translated to a four-digit year. For example, if the 100-year range is from 1930 through 2029, then a two-digit value of 30 is interpreted as 1930 while a two-digit value of 29 is interpreted as 2029.

`PersianCalendar.ToFourDigitYear` supports either a two-digit year or a four-digit year. Passing a two-digit year value (less than 100) causes the method to convert the value to a four-digit value according to the `PersianCalendar.TwoDigitYearMax` value representing the appropriate century. If the application supplies a four-digit year value that is within the supported calendar range to `PersianCalendar.ToFourDigitYear`, the method returns the actual input value. If the application supplies a four-digit value that is outside the supported calendar range, or if it supplies a negative value, the method throws an exception.

#### Examples
The following code example demonstrates the use of the `PersianCalendar.ToFourDigitYear` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._

## PersianCalendar.PersianEra field

```csharp
public static readonly int PersianEra;
```

Represents the current era. This field is constant.

#### Remarks
The value of `PersianEra` is 1.

#### Examples
The following code example demonstrates the use of the `PersianEra` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/PersianCalendar/Overview/pcal.cs._
