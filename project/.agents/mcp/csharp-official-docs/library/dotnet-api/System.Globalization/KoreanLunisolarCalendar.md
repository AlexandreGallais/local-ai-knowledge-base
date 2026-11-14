---
title: "KoreanLunisolarCalendar class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/KoreanLunisolarCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# KoreanLunisolarCalendar class

Namespace: `System.Globalization`

```csharp
public class KoreanLunisolarCalendar : System.Globalization.EastAsianLunisolarCalendar
```

Represents time in divisions, such as months, days, and years. Years are calculated using the Gregorian calendar, while days and months are calculated using the lunisolar calendar.

#### Remarks
The `KoreanLunisolarCalendar` class is derived from the `EastAsianLunisolarCalendar` class, which represents the lunisolar calendar. The `EastAsianLunisolarCalendar` class supports the sexagenary year cycle (which repeats every 60 years) in addition to solar years and lunar months. Each solar year in the calendar is associated with a Sexagenary Year, a Celestial Stem, and a Terrestrial Branch, and these calendars can have leap months after any month of the year.

> **Note:**
> For information about using the `KoreanLunisolarCalendar` class and the other calendar classes in .NET, see Working with Calendars.

The `KoreanLunisolarCalendar` class calculates years using the Gregorian calendar, and days and months using the `EastAsianLunisolarCalendar` class.

A leap month can occur after any month in a year. For example, the `GetMonth` method returns a number between 1 and 13 that indicates the month associated with a specified date. If there is a leap month between the eighth and ninth months of the year, the `EastAsianLunisolarCalendar.GetMonth` method returns 8 for the eighth month, 9 for the leap eighth month, and 10 for the ninth month.

Currently, the `KoreanLunisolarCalendar` is not used by any of the cultures supported by the `CultureInfo` class. Therefore, this class can be used only to calculate dates in the Korean lunisolar calendar.

Each `CultureInfo` supports a set of calendars. The `Calendar` property returns the default calendar for the culture, and the `OptionalCalendars` property returns an array containing all the calendars supported by the culture. To change the calendar used by a `CultureInfo`, the application should set the `Calendar` property of `CultureInfo.DateTimeFormat` to a new `Calendar`.

## KoreanLunisolarCalendar.KoreanLunisolarCalendar() constructor

```csharp
public KoreanLunisolarCalendar ();
```

Initializes a new instance of the `KoreanLunisolarCalendar` class.

To be added.

## KoreanLunisolarCalendar.DaysInYearBeforeMinSupportedYear property

```csharp
protected override int DaysInYearBeforeMinSupportedYear { get; }
```

Gets the number of days in the year that precedes the year specified by the `KoreanLunisolarCalendar.MinSupportedDateTime` property.

Returns: The number of days in the year that precedes the year specified by `KoreanLunisolarCalendar.MinSupportedDateTime`.

#### Remarks
This property returns a constant value of 384.

## KoreanLunisolarCalendar.Eras property

```csharp
public override int[] Eras { get; }
```

Gets the eras that correspond to the range of dates and times supported by the current `KoreanLunisolarCalendar` object.

Returns: An array of 32-bit signed integers that specify the relevant eras. The return value for a `KoreanLunisolarCalendar` object is always an array containing one element equal to the `KoreanLunisolarCalendar.GregorianEra` value.

To be added.

## KoreanLunisolarCalendar.MaxSupportedDateTime property

```csharp
public override DateTime MaxSupportedDateTime { get; }
```

Gets the maximum date and time supported by the `KoreanLunisolarCalendar` class.

Returns: The latest date and time supported by the `KoreanLunisolarCalendar` class, which is equivalent to the last  moment of February 10, 2051 C.E. in the Gregorian calendar.

To be added.

## KoreanLunisolarCalendar.MinSupportedDateTime property

```csharp
public override DateTime MinSupportedDateTime { get; }
```

Gets the minimum date and time supported by the `KoreanLunisolarCalendar` class.

Returns: The earliest date and time supported by the `KoreanLunisolarCalendar` class.

In .NET Framework, the earliest supported date and time is equivalent to the first moment of February 14, 918 C.E. in the Gregorian calendar. In .NET, it's equivalent to the first moment of February 19, 918 C.E.

## KoreanLunisolarCalendar.GetEra(DateTime) method

```csharp
public override int GetEra (DateTime time);
```

Retrieves the era that corresponds to the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the era specified by the `time` parameter. The return value for a `KoreanLunisolarCalendar` object is always the `KoreanLunisolarCalendar.GregorianEra` value.

Exceptions:

- `ArgumentOutOfRangeException`: `time` represents a date and time less than `KoreanLunisolarCalendar.MinSupportedDateTime` or greater than `KoreanLunisolarCalendar.MaxSupportedDateTime`.

To be added.

## KoreanLunisolarCalendar.GregorianEra field

```csharp
public const int GregorianEra = 1;
```

Specifies the Gregorian era that corresponds to the current `KoreanLunisolarCalendar` object.

#### Remarks
The value of this field is 1.

The `KoreanLunisolarCalendar` class recognizes only the current era.
