---
title: "Calendar class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/Calendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Calendar class

Namespace: `System.Globalization`

```csharp
public abstract class Calendar : ICloneable
```

Represents time in divisions, such as weeks, months, and years.

#### Remarks
A calendar divides time into units, such as weeks, months, and years. The number, length, and start of the divisions vary in each calendar.

> **Note:**
>  For information about using the calendar classes in .NET, see Working with Calendars.

Any moment in time can be represented as a set of numeric values using a particular calendar. For example, a vernal equinox occurred at (1999, 3, 20, 8, 46, 0, 0.0) in the Gregorian calendar, that is, March 20, 1999 C.E. at 8:46:00:0.0. An implementation of `Calendar` can map any date in the range of a specific calendar to a similar set of numeric values, and `DateTime` can map such sets of numeric values to a textual representation using information from `Calendar` and `DateTimeFormatInfo`. The textual representation can be culture-sensitive, for example, "8:46 AM March 20th 1999 AD" for the en-US culture, or culture-insensitive, for example, "1999-03-20T08:46:00" in ISO 8601 format.

A `Calendar` implementation can define one or more eras. The `Calendar` class identifies the eras as enumerated integers, where the current era (`CurrentEra`) has the value 0.

To make up for the difference between the calendar year and the actual time that the earth rotates around the sun or the actual time that the moon rotates around the earth, a leap year has a different number of days from a standard calendar year. Each `Calendar` implementation defines leap years differently.

For consistency, the first unit in each interval (the first month, for example) is assigned the value 1.

The `Globalization` namespace includes the following `Calendar` implementations:

-   `ChineseLunisolarCalendar`

-   `EastAsianLunisolarCalendar`

-   `GregorianCalendar`

-   `HebrewCalendar`

-   `HijriCalendar`

-   `JapaneseCalendar`

-   `JapaneseLunisolarCalendar`

-   `JulianCalendar`

-   `KoreanCalendar`

-   `KoreanLunisolarCalendar`

-   `PersianCalendar`

-   `TaiwanCalendar`

-   `TaiwanLunisolarCalendar`

-   `ThaiBuddhistCalendar`

-   `UmAlQuraCalendar`

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.Calendar() constructor

```csharp
protected Calendar ();
```

Initializes a new instance of the `Calendar` class.

#### Examples
The following example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.AlgorithmType property

```csharp
public virtual System.Globalization.CalendarAlgorithmType AlgorithmType { get; }
```

Gets a value indicating whether the current calendar is solar-based, lunar-based, or a combination of both.

Returns: One of the `CalendarAlgorithmType` values.

#### Examples
The following example uses reflection to instantiate each `Calendar` type found in .NET and displays the value of its `AlgorithmType` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AlgorithmType/algorithmtype1.cs._

## Calendar.DaysInYearBeforeMinSupportedYear property

```csharp
protected virtual int DaysInYearBeforeMinSupportedYear { get; }
```

Gets the number of days in the year that precedes the year that is specified by the `Calendar.MinSupportedDateTime` property.

Returns: The number of days in the year that precedes the year specified by `Calendar.MinSupportedDateTime`.

#### Remarks
This property returns a constant value of 365. Note that the property value can be overridden by classes derived from the `Calendar` class.

## Calendar.Eras property

```csharp
public abstract int[] Eras { get; }
```

When overridden in a derived class, gets the list of eras in the current calendar.

Returns: An array of integers that represents the eras in the current calendar.

#### Remarks
The eras are in reverse chronological order, with the current era as the first element of the array, and the oldest era as the last element of the array. For example, the value of the current era in `JapaneseCalendar` is 4, which is the first element of the array. Only the `JapaneseCalendar` and the `JapaneseLunisolarCalendar` classes support multiple eras.

The `JapaneseCalendar` and `JapaneseLunisolarCalendar` classes support multiple eras. Most calendar implementations, on the other hand, support a single era.

#### Examples
The following example displays the values contained in `JapaneseCalendar.Eras` when the Heisei era (1989-2019) was the current era.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Eras/yslin_japanesecalendar_eras.cs._

## Calendar.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether this `Calendar` object is read-only.

Returns: `true` if this `Calendar` object is read-only; otherwise, `false`.

To be added.

## Calendar.MaxSupportedDateTime property

```csharp
public virtual DateTime MaxSupportedDateTime { get; }
```

Gets the latest date and time supported by this `Calendar` object.

Returns: The latest date and time supported by this calendar. The default is <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

To be added.

## Calendar.MinSupportedDateTime property

```csharp
public virtual DateTime MinSupportedDateTime { get; }
```

Gets the earliest date and time supported by this `Calendar` object.

Returns: The earliest date and time supported by this calendar. The default is <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see>.

To be added.

## Calendar.TwoDigitYearMax property

```csharp
public virtual int TwoDigitYearMax { get; set; }
```

Gets or sets the last year of a 100-year range that can be represented by a 2-digit year.

Returns: The last year of a 100-year range that can be represented by a 2-digit year.

Exceptions:

- `InvalidOperationException`: The current `Calendar` object is read-only.

#### Remarks
This property allows a 2-digit year to be properly translated to a 4-digit year. For example, if this property is set to 2029, the 100-year range is from 1930 to 2029. Therefore, a 2-digit value of 30 is interpreted as 1930, while a 2-digit value of 29 is interpreted as 2029.

The initial value of this property is derived from the settings in the regional and language options portion of Control Panel. However, that information can change during the life of the `AppDomain`. The `Calendar` class does not detect changes in the system settings automatically. If the calendar is not supported in the regional and language options, the initial value of this property is the default value defined by the `Calendar` class.

Your application should set this value to 99 to indicate that 2-digit years are to be taken literally. For example, if this property is set to 99, the 100-year range is from 0 (not a valid value for most calendars) to 99. Therefore, a 2-digit value of 30 is interpreted as 30.

## Calendar.AddDays(DateTime, Int32) method

```csharp
public virtual DateTime AddDays (DateTime time, int days);
```

Returns a `DateTime` that is the specified number of days away from the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to which to add days.
- `days`: The number of days to add.

Returns: The `DateTime` that results from adding the specified number of days to the specified `DateTime`.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range of this calendar.
- `ArgumentOutOfRangeException`: `days` is outside the supported range of the `DateTime` return value.

#### Remarks
The `days` value is added to the specified `DateTime`. If `days` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The month part of the resulting `DateTime` is affected if the resulting day is outside the month of the specified `DateTime`. The year part of the resulting `DateTime` is affected if the resulting month is outside the year of the specified `DateTime`. The era part of the resulting `DateTime` is affected if the resulting year is outside the era of the specified `DateTime`. The time-of-day part of the resulting `DateTime` remains the same as the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.AddHours(DateTime, Int32) method

```csharp
public virtual DateTime AddHours (DateTime time, int hours);
```

Returns a `DateTime` that is the specified number of hours away from the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to which to add hours.
- `hours`: The number of hours to add.

Returns: The `DateTime` that results from adding the specified number of hours to the specified `DateTime`.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range of this calendar.
- `ArgumentOutOfRangeException`: `hours` is outside the supported range of the `DateTime` return value.

#### Remarks
The `hours` value is added to the specified `DateTime`. If `hours` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The day part of the resulting `DateTime` is affected if the resulting time is outside the day of the specified `DateTime`. The month part of the resulting `DateTime` is affected if the resulting day is outside the month of the specified `DateTime`. The year part of the resulting `DateTime` is affected if the resulting month is outside the year of the specified `DateTime`. The era part of the resulting `DateTime` is affected if the resulting year is outside the era of the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.AddMilliseconds(DateTime, Double) method

```csharp
public virtual DateTime AddMilliseconds (DateTime time, double milliseconds);
```

Returns a `DateTime` that is the specified number of milliseconds away from the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to add milliseconds to.
- `milliseconds`: The number of milliseconds to add.

Returns: The `DateTime` that results from adding the specified number of milliseconds to the specified `DateTime`.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range of this calendar.
- `ArgumentOutOfRangeException`: `milliseconds` is outside the supported range of the `DateTime` return value.

#### Remarks
The `milliseconds` value is rounded to the nearest integer before it is added to the specified `DateTime`. If `milliseconds` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The day part of the resulting `DateTime` is affected if the resulting time is outside the day of the specified `DateTime`. The month part of the resulting `DateTime` is affected if the resulting day is outside the month of the specified `DateTime`. The year part of the resulting `DateTime` is affected if the resulting month is outside the year of the specified `DateTime`. The era part of the resulting `DateTime` is affected if the resulting year is outside the era of the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._

## Calendar.AddMinutes(DateTime, Int32) method

```csharp
public virtual DateTime AddMinutes (DateTime time, int minutes);
```

Returns a `DateTime` that is the specified number of minutes away from the specified `DateTime`.

Parameters:

- `time`: The `DateTime` to which to add minutes.
- `minutes`: The number of minutes to add.

Returns: The `DateTime` that results from adding the specified number of minutes to the specified `DateTime`.

Exceptions:

- `ArgumentException`: The resulting `DateTime` is outside the supported range of this calendar.
- `ArgumentOutOfRangeException`: `minutes` is outside the supported range of the `DateTime` return value.

#### Remarks
The `minutes` value is added to the specified `DateTime`. If `minutes` is negative, the resulting `DateTime` is earlier than the specified `DateTime`.

The day part of the resulting `DateTime` is affected if the resulting time is outside the day of the specified `DateTime`. The month part of the resulting `DateTime` is affected if the resulting day is outside the month of the specified `DateTime`. The year part of the resulting `DateTime` is affected if the resulting month is outside the year of the specified `DateTime`. The era part of the resulting `DateTime` is affected if the resulting year is outside the era of the specified `DateTime`.

The `Kind` property of the returned `DateTime` value always equals `Unspecified`. You can preserve the `Kind` property of the `time` parameter by calling the `DateTime.SpecifyKind` method, as the following example shows.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/AddDays/add1.cs._

#### Examples
The following code example demonstrates the members of the `Calendar` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/Calendar/Overview/calendar.cs._
