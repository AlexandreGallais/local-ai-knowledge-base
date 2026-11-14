---
title: "ChineseLunisolarCalendar class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/ChineseLunisolarCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ChineseLunisolarCalendar class

Namespace: `System.Globalization`

```csharp
public class ChineseLunisolarCalendar : System.Globalization.EastAsianLunisolarCalendar
```

Represents time in divisions, such as months, days, and years. Years are calculated using the Chinese calendar, while days and months are calculated using the lunisolar calendar.

#### Remarks
The `ChineseLunisolarCalendar` class is derived from the `EastAsianLunisolarCalendar` class, which represents the lunisolar calendar. The `EastAsianLunisolarCalendar` class supports the sexagenary year cycle (which repeats every 60 years) in addition to solar years and lunar months. Each solar year in the calendar is associated with a Sexagenary Year, a Celestial Stem, and a Terrestrial Branch, and these calendars can have leap months after any month of the year. The `ChineseLunisolarCalendar` class calculates years based on solar calculations, and months and days based on lunar calculations.

> **Note:**
> For information about using the `ChineseLunisolarCalendar` class and the other calendar classes in .NET, see Working with Calendars.

A leap month can occur after any month in a year. For example, the `EastAsianLunisolarCalendar.GetMonth` method returns a number between 1 and 13 that indicates the month associated with a specified date. If there is a leap month between the eighth and ninth months of the year, the `EastAsianLunisolarCalendar.GetMonth` method returns 8 for the eighth month, 9 for the leap eighth month, and 10 for the ninth month.

Currently, the `ChineseLunisolarCalendar` is not used by any of the cultures supported by the `CultureInfo` class. Therefore, this class can be used only to calculate dates in the Chinese lunisolar calendar.

Each `CultureInfo` object supports a set of calendars. The `Calendar` property returns the default calendar for the culture, and the `OptionalCalendars` property returns an array containing all the calendars supported by the culture. To change the calendar used by a `CultureInfo`, the application should set the `Calendar` property of `CultureInfo.DateTimeFormat` to a new `Calendar`.

## ChineseLunisolarCalendar.ChineseLunisolarCalendar() constructor

```csharp
public ChineseLunisolarCalendar ();
```

Initializes a new instance of the `ChineseLunisolarCalendar` class.

To be added.

## ChineseLunisolarCalendar.DaysInYearBeforeMinSupportedYear property

```csharp
protected override int DaysInYearBeforeMinSupportedYear { get; }
```

Gets the number of days in the year that precedes the year that is specified by the `ChineseLunisolarCalendar.MinSupportedDateTime` property.

Returns: The number of days in the year that precedes the year specified by `ChineseLunisolarCalendar.MinSupportedDateTime`.

#### Remarks
This property returns a constant value of 384.

## ChineseLunisolarCalendar.Eras property

```csharp
public override int[] Eras { get; }
```

Gets the eras that correspond to the range of dates and times supported by the current `ChineseLunisolarCalendar` object.

Returns: An array of 32-bit signed integers that specify the relevant eras. The return value for a `ChineseLunisolarCalendar` object is always an array containing one element equal to the `ChineseLunisolarCalendar.ChineseEra` value.

To be added.

## ChineseLunisolarCalendar.MaxSupportedDateTime property

```csharp
public override DateTime MaxSupportedDateTime { get; }
```

Gets the maximum date and time supported by the `ChineseLunisolarCalendar` class.

Returns: A `DateTime` type that represents the last moment on January 28, 2101 in the Gregorian calendar, which is approximately equal to the constructor `DateTime(2101, 1, 28, 23, 59, 59, 999)`.

To be added.

## ChineseLunisolarCalendar.MinSupportedDateTime property

```csharp
public override DateTime MinSupportedDateTime { get; }
```

Gets the minimum date and time supported by the `ChineseLunisolarCalendar` class.

Returns: A `DateTime` type that represents February 19, 1901 in the Gregorian calendar, which is equivalent to the constructor, `DateTime(1901, 2, 19)`.

To be added.

## ChineseLunisolarCalendar.GetEra(DateTime) method

```csharp
public override int GetEra (DateTime time);
```

Retrieves the era that corresponds to the specified `DateTime` type.

Parameters:

- `time`: The `DateTime` type to read.

Returns: An integer that represents the era in the `time` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `time` is less than `ChineseLunisolarCalendar.MinSupportedDateTime` or greater than `ChineseLunisolarCalendar.MaxSupportedDateTime`.

To be added.

## ChineseLunisolarCalendar.ChineseEra field

```csharp
public const int ChineseEra = 1;
```

Specifies the era that corresponds to the current `ChineseLunisolarCalendar` object.

#### Remarks
The value of this field is 1.

The `ChineseLunisolarCalendar` class recognizes only the current era.
