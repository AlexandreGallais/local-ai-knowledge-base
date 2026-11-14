---
title: "JapaneseLunisolarCalendar class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/JapaneseLunisolarCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JapaneseLunisolarCalendar class

Namespace: `System.Globalization`

```csharp
public class JapaneseLunisolarCalendar : System.Globalization.EastAsianLunisolarCalendar
```

Represents time in divisions, such as months, days, and years. Years are calculated as for the Japanese calendar, while days and months are calculated using the lunisolar calendar.

#### Remarks
The `JapaneseLunisolarCalendar` class is derived from the `EastAsianLunisolarCalendar` class, which represents the lunisolar calendar. The `EastAsianLunisolarCalendar` class supports the sexagenary year cycle (which repeats every 60 years) in addition to solar years and lunar months. Each solar year in the calendar is associated with a Sexagenary Year, a Celestial Stem, and a Terrestrial Branch, and these calendars can have leap months after any month of the year. The `EastAsianLunisolarCalendar.GetMonth` method returns a number between 1 and 13 that indicates the month associated with a specified date. If there is a leap month between the eighth and ninth months of the year, the `EastAsianLunisolarCalendar.GetMonth` method returns 8 for the eighth month, 9 for the leap eighth month, and 10 for the ninth month.

> **Note:**
>  For information about using the `JapaneseLunisolarCalendar` class and the other calendar classes in the .NET Class Library, see Working with Calendars.

The `JapaneseLuniSolarCalendar` class recognizes one era for every emperor's reign. For example, the two most recent eras are the Heisei era, beginning in the Gregorian calendar year 1989, and the Reiwa era, beginning in the Gregorian calendar year 2019. The era name is typically displayed before the year. For example, the Gregorian calendar year 2001 is the Japanese calendar year Heisei 13. Note that the first year of an era is called "Gannen." Therefore, the Gregorian calendar year 1989 was the Japanese calendar year Heisei Gannen.

Unlike the `JapaneseCalendar` class, the `JapaneseLunisolarCalendar` class does not support dates in the range of the Meiji and Taisho eras.

This class assigns numbers to the eras as follows:

|GetEra value|Era Name|Era Abbreviation|Gregorian Dates|
|------------------|--------------|----------------------|---------------------|
|5|令和 (Reiwa)|令和 (R, r)|May 1, 2019 to present|
|4|平成 (Heisei)|平 (H, h)|January 8, 1989 to April 30, 2019|
|3|昭和 (Showa)|昭 (S, s)|December 25, 1926 to January 7, 1989|
|2|大正 (Taisho)|大 (T, t)|July 30, 1912 to December 24, 1926|
|1|明治 (Meiji)|明 (M, m)|September 8, 1868 to July 29, 1912|

Currently, the `JapaneseLunisolarCalendar` is not used by any of the cultures supported by the `CultureInfo` class. Therefore, this class can be used only to calculate dates in the Japanese lunisolar calendar. It cannot be used as the default calendar for any culture supported by the `CultureInfo` class.

Each `CultureInfo` object supports a set of calendars. The `Calendar` property returns the default calendar for the culture, and the `OptionalCalendars` property returns an array containing all the calendars supported by the culture. You can change the default calendar to any one of the optional calendars supported by a `CultureInfo` instance. To do this, set the `Calendar` property of the `DateTimeFormatInfo` object returned by the `DateTimeFormat` property to the new `Calendar`.

## JapaneseLunisolarCalendar.JapaneseLunisolarCalendar() constructor

```csharp
public JapaneseLunisolarCalendar ();
```

Initializes a new instance of the `JapaneseLunisolarCalendar` class.

To be added.

## JapaneseLunisolarCalendar.DaysInYearBeforeMinSupportedYear property

```csharp
protected override int DaysInYearBeforeMinSupportedYear { get; }
```

Gets the number of days in the year that precedes the year that is specified by the `JapaneseLunisolarCalendar.MinSupportedDateTime` property.

Returns: The number of days in the year that precedes the year specified by `JapaneseLunisolarCalendar.MinSupportedDateTime`.

#### Remarks
This property returns a constant value of 354.

## JapaneseLunisolarCalendar.Eras property

```csharp
public override int[] Eras { get; }
```

Gets the eras that are relevant to the `JapaneseLunisolarCalendar` object.

Returns: An array of 32-bit signed integers that specify the relevant eras.

#### Remarks
The values in the array returned by this property are numbers that range from 1 to the largest era number. The largest era number is returned in the first array element, and the smallest era number is returned in the last element.

While the `JapaneseLunisolarCalendar` defines the Meiji and Taisho eras (eras 1 and 2, respectively), the calendar does not support dates in their ranges. For example, a call to `JapaneseLunisolarCalendar.GetEra` or `EastAsianLunisolarCalendar.ToDateTime` with a date in those era ranges throws an `ArgumentOutOfRangeException`.

The `Eras` property returns the same values as the `Eras` property.

## JapaneseLunisolarCalendar.MaxSupportedDateTime property

```csharp
public override DateTime MaxSupportedDateTime { get; }
```

Gets the maximum date and time supported by the `JapaneseLunisolarCalendar` class.

Returns: The latest date and time supported by the `JapaneseLunisolarCalendar` class, which is equivalent to the last moment of January 22, 2050 C.E. in the Gregorian calendar.

To be added.

## JapaneseLunisolarCalendar.MinSupportedDateTime property

```csharp
public override DateTime MinSupportedDateTime { get; }
```

Gets the minimum date and time supported by the `JapaneseLunisolarCalendar` class.

Returns: The earliest date and time supported by the `JapaneseLunisolarCalendar` class, which is equivalent to the first moment of January 28, 1960 C.E. in the Gregorian calendar.

To be added.

## JapaneseLunisolarCalendar.GetEra(DateTime) method

```csharp
public override int GetEra (DateTime time);
```

Retrieves the era that corresponds to the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to read.

Returns: An integer that represents the era specified in the `time` parameter.

## JapaneseLunisolarCalendar.JapaneseEra field

```csharp
public const int JapaneseEra = 1;
```

Specifies the current era.

#### Remarks
The value of this field is 1.
