---
title: "Calendar class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/Calendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Calendar class (part 4 of 4)

## Calendar.IsLeapMonth(Int32, Int32, Int32) method

```csharp
public abstract bool IsLeapMonth (int year, int month, int era);
```

When overridden in a derived class, determines whether the specified month in the specified year in the specified era is a leap month.

Parameters:

- `year`: An integer that represents the year.
- `month`: A positive integer that represents the month.
- `era`: An integer that represents the era.

Returns: `true` if the specified month is a leap month; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`month` is outside the range supported by the calendar.

-or-

`era` is outside the range supported by the calendar.

#### Remarks
To make up for the difference between the calendar year and the actual time that the earth rotates around the sun or the actual time that the moon rotates around the earth, a leap year has a different number of days from a standard calendar year. Each `Calendar` implementation defines leap years differently.

A leap month is an entire month that occurs only in a leap year. For example, in the Hebrew calendar, Adar Beit is the only leap month.

## Calendar.IsLeapYear(Int32) method

```csharp
public virtual bool IsLeapYear (int year);
```

Determines whether the specified year in the current era is a leap year.

Parameters:

- `year`: An integer that represents the year.

Returns: `true` if the specified year is a leap year; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

#### Remarks
To make up for the difference between the calendar year and the actual time that the earth rotates around the sun or the actual time that the moon rotates around the earth, a leap year has a different number of days from a standard calendar year. Each `Calendar` implementation defines leap years differently.

#### Examples
The following code example compares different implementations of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/GetDaysInMonth/calendar_compare.cs._

## Calendar.IsLeapYear(Int32, Int32) method

```csharp
public abstract bool IsLeapYear (int year, int era);
```

When overridden in a derived class, determines whether the specified year in the specified era is a leap year.

Parameters:

- `year`: An integer that represents the year.
- `era`: An integer that represents the era.

Returns: `true` if the specified year is a leap year; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

-or-

`era` is outside the range supported by the calendar.

#### Remarks
To make up for the difference between the calendar year and the actual time that the earth rotates around the sun or the actual time that the moon rotates around the earth, a leap year has a different number of days from a standard calendar year. Each `Calendar` implementation defines leap years differently.

## Calendar.ReadOnly(Calendar) method

```csharp
public static System.Globalization.Calendar ReadOnly (System.Globalization.Calendar calendar);
```

Returns a read-only version of the specified `Calendar` object.

Parameters:

- `calendar`: A `Calendar` object.

Returns: The `Calendar` object specified by the `calendar` parameter, if `calendar` is read-only.

-or-

A read-only memberwise clone of the `Calendar` object specified by `calendar`, if `calendar` is not read-only.

Exceptions:

- `ArgumentNullException`: `calendar` is `null`.

To be added.

## Calendar.ToDateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32) method

```csharp
public virtual DateTime ToDateTime (int year, int month, int day, int hour, int minute, int second, int millisecond);
```

Returns a `DateTime` that is set to the specified date and time in the current era.

Parameters:

- `year`: An integer that represents the year.
- `month`: A positive integer that represents the month.
- `day`: A positive integer that represents the day.
- `hour`: An integer from 0 to 23 that represents the hour.
- `minute`: An integer from 0 to 59 that represents the minute.
- `second`: An integer from 0 to 59 that represents the second.
- `millisecond`: An integer from 0 to 999 that represents the millisecond.

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

This method returns a date and time based on the current era of a particular calendar. For the `JapaneseCalendar` and `JapaneseLunisolarCalendar`, which support multiple eras based on the reign of the emperor, calling this method can produce an unintended date when an era changes. When instantiating a date using either of these calendars, we recommend that you call the `ToDateTime` or JapaneseLunisolarCalendar.ToDateTime(Int32,Int32,Int32,Int32,Int32,Int32,Int32,Int32)) method and explicitly specify an era.

## Calendar.ToDateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Int32) method

```csharp
public abstract DateTime ToDateTime (int year, int month, int day, int hour, int minute, int second, int millisecond, int era);
```

When overridden in a derived class, returns a `DateTime` that is set to the specified date and time in the specified era.

Parameters:

- `year`: An integer that represents the year.
- `month`: A positive integer that represents the month.
- `day`: A positive integer that represents the day.
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

#### Remarks
The `Calendar.ToDateTime` method is useful because it can convert any date in the current calendar to a Gregorian calendar date. The Gregorian date can subsequently be used, for example, to compare dates in different calendars or create an equivalent date in a particular calendar.

## Calendar.ToFourDigitYear(Int32) method

```csharp
public virtual int ToFourDigitYear (int year);
```

Converts the specified year to a four-digit year by using the `Calendar.TwoDigitYearMax` property to determine the appropriate century.

Parameters:

- `year`: A two-digit or four-digit integer that represents the year to convert.

Returns: An integer that contains the four-digit representation of `year`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is outside the range supported by the calendar.

#### Remarks
`Calendar.TwoDigitYearMax` is the last year in the 100-year range that can be represented by a two-digit year. The century is determined by finding the sole occurrence of the two-digit `year` within that 100-year range. For example, if `Calendar.TwoDigitYearMax` is set to 2029, the 100-year range is from 1930 to 2029. Therefore, a 2-digit value of 30 is interpreted as 1930, while a 2-digit value of 29 is interpreted as 2029.

If `year` is greater than or equal to 100, the value of `year` is returned unchanged.

`Calendar.ToFourDigitYear` supports either a two-digit year or a four-digit year. Passing a two-digit year value (less than 100) causes the method to convert the value to a four-digit value according to the `Calendar.TwoDigitYearMax` value representing the appropriate century. If the application supplies a four-digit year value that is within the supported calendar range to `Calendar.ToFourDigitYear`, the method returns the actual input value. If the application supplies a four-digit value that is outside the supported calendar range, or if it supplies a negative value, the method throws an exception.

## Calendar.CurrentEra field

```csharp
public const int CurrentEra = 0;
```

Represents the current era of the current calendar. The value of this field is 0.

#### Remarks
The `CurrentEra` field represents the index of the current era in the `Calendar.Eras` array. Because eras are arranged in reverse chronological order (from the current era to earlier eras), this field is a constant that has a value of 0.
