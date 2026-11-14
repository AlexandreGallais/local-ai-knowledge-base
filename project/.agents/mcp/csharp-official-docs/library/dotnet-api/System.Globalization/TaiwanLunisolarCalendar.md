---
title: "TaiwanLunisolarCalendar class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/TaiwanLunisolarCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaiwanLunisolarCalendar class

Namespace: `System.Globalization`

```csharp
public class TaiwanLunisolarCalendar : System.Globalization.EastAsianLunisolarCalendar
```

Represents the Taiwan lunisolar calendar. As for the Taiwan calendar, years are calculated using the Gregorian calendar, while days and months are calculated using the lunisolar calendar.

#### Remarks
The Taiwan lunisolar calendar works exactly like the Gregorian calendar, except that the year and era are different. The `TaiwanLunisolarCalendar` class calculates years using the Gregorian calendar, days and months using the `EastAsianLunisolarCalendar` class, and recognizes only the current era.

> **Note:**
> For information about using the `TaiwanLunisolarCalendar` class and the other calendar classes in .NET, see Working with Calendars.

The `TaiwanLunisolarCalendar` class is derived from the `EastAsianLunisolarCalendar` class, which represents the lunisolar calendar. The `EastAsianLunisolarCalendar` class supports the sexagenary year cycle (which repeats every 60 years) in addition to solar years and lunar months. Each solar year in the calendar is associated with a Sexagenary Year, a Celestial Stem, and a Terrestrial Branch, and these calendars can have leap months after any month of the year.

A leap month can occur after any month in a year. For example, the `GetMonth` method returns a number between 1 and 13 that indicates the month associated with a specified date. If there is a leap month between the eighth and ninth months of the year, the `EastAsianLunisolarCalendar.GetMonth` method returns 8 for the eighth month, 9 for the leap eighth month, and 10 for the ninth month.

Currently, the `TaiwanLunisolarCalendar` is not used by any of the cultures supported by the `CultureInfo` class. Therefore, this class can be used only to calculate dates in the Taiwan lunisolar calendar.

Each `CultureInfo` object supports a set of calendars. The `Calendar` property returns the default calendar for the culture, and the `OptionalCalendars` property returns an array containing all the calendars supported by the culture. To change the calendar used by a `CultureInfo`, the application should set the `Calendar` property of `CultureInfo.DateTimeFormat` to a new `Calendar`.

## TaiwanLunisolarCalendar.TaiwanLunisolarCalendar() constructor

```csharp
public TaiwanLunisolarCalendar ();
```

Initializes a new instance of the `TaiwanLunisolarCalendar` class.

To be added.

## TaiwanLunisolarCalendar.DaysInYearBeforeMinSupportedYear property

```csharp
protected override int DaysInYearBeforeMinSupportedYear { get; }
```

Gets the number of days in the year that precedes the year specified by the `TaiwanLunisolarCalendar.MinSupportedDateTime` property.

Returns: The number of days in the year that precedes the year specified by `TaiwanLunisolarCalendar.MinSupportedDateTime`.

#### Remarks
This property returns a constant value of 384.

## TaiwanLunisolarCalendar.Eras property

```csharp
public override int[] Eras { get; }
```

Gets the eras that are relevant to the current `TaiwanLunisolarCalendar` object.

Returns: An array that consists of a single element having a value that is always the current era.

#### Remarks
The values in the array returned by this property are numbers that range from 1 to the largest era number. The largest era number is returned in the first array element and the smallest era number is returned in the last element.

## TaiwanLunisolarCalendar.MaxSupportedDateTime property

```csharp
public override DateTime MaxSupportedDateTime { get; }
```

Gets the maximum date and time supported by the `TaiwanLunisolarCalendar` class.

Returns: The latest date and time supported by the `TaiwanLunisolarCalendar` class, which is equivalent to the last moment of February 10, 2051 C.E. in the Gregorian calendar.

To be added.

## TaiwanLunisolarCalendar.MinSupportedDateTime property

```csharp
public override DateTime MinSupportedDateTime { get; }
```

Gets the minimum date and time supported by the `TaiwanLunisolarCalendar` class.

Returns: The earliest date and time supported by the `TaiwanLunisolarCalendar` class, which is equivalent to the first moment of February 18, 1912 C.E. in the Gregorian calendar.

To be added.

## TaiwanLunisolarCalendar.GetEra(DateTime) method

```csharp
public override int GetEra (DateTime time);
```

Retrieves the era that corresponds to the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the era specified in the `time` parameter.

To be added.
