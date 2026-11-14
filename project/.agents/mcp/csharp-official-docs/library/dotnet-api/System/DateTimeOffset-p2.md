---
title: "DateTimeOffset struct (part 2 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTimeOffset.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeOffset struct (part 2 of 15)

## DateTimeOffset.DateTimeOffset(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Calendar, TimeSpan) constructor

```csharp
public DateTimeOffset (int year, int month, int day, int hour, int minute, int second, int millisecond, System.Globalization.Calendar calendar, TimeSpan offset);
```

Initializes a new instance of the `DateTimeOffset` structure using the specified `year`, `month`, `day`, `hour`, `minute`, `second`, `millisecond`, `calendar`, and `offset`.

Parameters:

- `year`: The year.
- `month`: The month (1 through 12).
- `day`: The day (1 through the number of days in `month`).
- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `millisecond`: The milliseconds (0 through 999).
- `calendar`: The calendar that is used to interpret `year`, `month`, and `day`.
- `offset`: The time's offset from Coordinated Universal Time (UTC).

Exceptions:

- `ArgumentException`: `offset` does not represent whole minutes.
- `ArgumentNullException`: `calendar` cannot be `null`.
- `ArgumentOutOfRangeException`: `year` is less than the `calendar` parameter's `MinSupportedDateTime.Year` or greater than `MaxSupportedDateTime.Year`.

-or-

`month` is either less than or greater than the number of months in `year` in the `calendar`.

-or-

`day` is less than one or greater than the number of days in `month`.

-or-

`hour` is less than zero or greater than 23.

-or-

`minute` is less than 0 or greater than 59.

-or-

`second` is less than 0 or greater than 59.

-or-

`millisecond` is less than 0 or greater than 999.

-or-

`offset` is less than -14 hours or greater than 14 hours.

-or-

The `year`, `month`, and `day` parameters cannot be represented as a date and time value.

-or-

The `DateTimeOffset.UtcDateTime` property is earlier than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see> or later than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks
The `year`, `month`, `day`, `hour`, `minute`, `second`, and `millisecond` parameters all reflect values expressed in the calendar specified by the `calendar` parameter. An exception is thrown if these values form a date and time that cannot be expressed by using this calendar.

#### Examples
The following example uses instances of both the `HebrewCalendar` class and the `HijriCalendar` class to instantiate a `DateTimeOffset` value. That date is then displayed to the console using the respective calendars and the Gregorian calendar.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/.ctor/Constructors.cs._

## DateTimeOffset.DateTimeOffset(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Int32, TimeSpan) constructor

```csharp
public DateTimeOffset (int year, int month, int day, int hour, int minute, int second, int millisecond, int microsecond, TimeSpan offset);
```

Initializes a new instance of the `DateTimeOffset` structure using the specified `year`, `month`, `day`, `hour`, `minute`, `second`, `millisecond`, `microsecond`, and `offset`.

Parameters:

- `year`: The year (1 through 9999).
- `month`: The month (1 through 12).
- `day`: The day (1 through the number of days in `month`).
- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `millisecond`: The milliseconds (0 through 999).
- `microsecond`: The microseconds (0 through 999).
- `offset`: The time's offset from Coordinated Universal Time (UTC).

Exceptions:

- `ArgumentException`: `offset` does not represent whole minutes.
- `ArgumentOutOfRangeException`: `year` is less than 1 or greater than 9999.

-or-

`month` is less than 1 or greater than 12.

-or-

`day` is less than 1 or greater than the number of days in `month`.

-or-

`hour` is less than 0 or greater than 23.

-or-

`minute` is less than 0 or greater than 59.

-or-

`second` is less than 0 or greater than 59.

-or-

`millisecond` is less than 0 or greater than 999.

-or-

`microsecond` is less than 0 or greater than 999.

#### Remarks

This constructor interprets `year`, `month` and `day` as a year, month and day
in the Gregorian calendar. To instantiate a `DateTimeOffset` value by using the year, month and day in another calendar, call
the `%23ctor` constructor.

## DateTimeOffset.DateTimeOffset(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Int32, Calendar, TimeSpan) constructor

```csharp
public DateTimeOffset (int year, int month, int day, int hour, int minute, int second, int millisecond, int microsecond, System.Globalization.Calendar calendar, TimeSpan offset);
```

Initializes a new instance of the `DateTimeOffset` structure using the specified `year`, `month`, `day`, `hour`, `minute`, `second`, `millisecond`, `microsecond`, `calendar`, and `offset`.

Parameters:

- `year`: The year (1 through 9999).
- `month`: The month (1 through 12).
- `day`: The day (1 through the number of days in `month`).
- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `millisecond`: The milliseconds (0 through 999).
- `microsecond`: The microseconds (0 through 999).
- `calendar`: The calendar that is used to interpret `year`, `month`, and `day`.
- `offset`: The time's offset from Coordinated Universal Time (UTC).

Exceptions:

- `ArgumentException`: `offset` does not represent whole minutes.
- `ArgumentOutOfRangeException`: `year` is not in the range supported by `calendar`.

-or-

`month` is less than 1 or greater than the number of months in `calendar`.

-or-

`day` is less than 1 or greater than the number of days in `month`.

-or-

`hour` is less than 0 or greater than 23.

-or-

`minute` is less than 0 or greater than 59.

-or-

`second` is less than 0 or greater than 59.

-or-

`millisecond` is less than 0 or greater than 999.

-or-

`microsecond` is less than 0 or greater than 999.

-or-

`offset` is less than -14 hours or greater than 14 hours.

-or-

The `year`, `month`, and `day` parameters
cannot be represented as a date and time value.

-or-

The `DateTimeOffset.UtcDateTime` property is earlier than `DateTimeOffset.MinValue` or later than `DateTimeOffset.MaxValue`.

#### Remarks

This constructor interprets `year`, `month` and `day` as a year, month and day
in the Gregorian calendar. To instantiate a `DateTimeOffset` value by using the year, month and day in another calendar, call
the `%23ctor` constructor.

## DateTimeOffset.Date property

```csharp
public DateTime Date { get; }
```

Gets a `DateTime` value that represents the date component of the current `DateTimeOffset` object.

Returns: A `DateTime` value that represents the date component of the current `DateTimeOffset` object.

#### Remarks
This property removes any significant part of the time component from a `DateTimeOffset` object and returns only its significant date component. For example, if the `DateTimeOffset` object has a date and time value of "1/12/07 4:01pm +7:30", the property returns a `DateTime` value of "1/12/07 12:00:00 AM". The `DateTime` value can then be displayed by using any of the standard or custom format specifiers that display dates only. (See the Example section for an illustration.)

The value of the `Kind` property of the returned `DateTime` object is always `Unspecified`. It is not affected by the value of the `Offset` property.

To display a date without its time component, you can also use the "D" or "d" format specifiers; for an illustration, see the Example section.

#### Examples
The following example retrieves the value of the `Date` property for a specific date. It then displays that value to the console using some standard and custom date-only format specifiers.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

## DateTimeOffset.DateTime property

```csharp
public DateTime DateTime { get; }
```

Gets a `DateTime` value that represents the date and time of the current `DateTimeOffset` object.

Returns: The date and time of the current `DateTimeOffset` object.

#### Remarks
The `DateTime` property is not affected by the value of the `Offset` property.

This property returns both the date and the time component of a `DateTimeOffset` object, which makes it useful for performing `DateTimeOffset` to `DateTime` conversion. For example, if the `DateTimeOffset` object has a date and time value of "1/12/07 4:01pm + 7:30", the property returns a date of "1/12/07 4:01pm".

The value of the `Kind` property of the returned `DateTime` object is `Unspecified`.

#### Examples
The following example illustrates the use of the `DateTime` property to convert the time returned by the `DateTimeOffset.Now` and `DateTimeOffset.UtcNow` properties to `DateTime` values.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

## DateTimeOffset.Day property

```csharp
public int Day { get; }
```

Gets the day of the month represented by the current `DateTimeOffset` object.

Returns: The day component of the current `DateTimeOffset` object, expressed as a value between 1 and 31.

#### Remarks
The `Day` property is not affected by the value of the `Offset` property.

You can also create a string representation of a `DateTimeOffset` object's day component by calling the `DateTimeOffset.ToString` method with the "d" or "dd" custom format specifiers.

#### Examples
The following example displays the day component of a `DateTimeOffset` object in three different ways:

- By retrieving the value of the `Day` property.

- By calling the `ToString` method with the "d" format specifier.

- By calling the `ToString` method with the "dd" format specifier.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

## DateTimeOffset.DayOfWeek property

```csharp
public DayOfWeek DayOfWeek { get; }
```

Gets the day of the week represented by the current `DateTimeOffset` object.

Returns: One of the enumeration values that indicates the day of the week of the current `DateTimeOffset` object.

#### Remarks
The value of the constants in the `DayOfWeek` enumeration ranges from `Sunday` to `Saturday`. If cast to an integer, its value ranges from zero (which indicates `Sunday`) to six (which indicates `Saturday`).

You can also display the weekday name of a particular date by using the "D" format specifier or the "dddd" custom format specifier. For example:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

Note that the string returned by calling the `ToString` method of the `DayOfWeek` enumeration member that is returned by this property is not localized. To extract a string that contains the weekday name of the current culture or of a specific culture, call the `DateTimeOffset.ToString` method with the "dddd" custom format specifier. For example, the following code displays the weekday name for a date using the `fr-fr` culture.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

#### Examples
The following example displays the weekday name of the first day of each month of the year 2008.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

## DateTimeOffset.DayOfYear property

```csharp
public int DayOfYear { get; }
```

Gets the day of the year represented by the current `DateTimeOffset` object.

Returns: The day of the year of the current `DateTimeOffset` object, expressed as a value between 1 and 366.

To be added.

## DateTimeOffset.Hour property

```csharp
public int Hour { get; }
```

Gets the hour component of the time represented by the current `DateTimeOffset` object.

Returns: The hour component of the current `DateTimeOffset` object. This property uses a 24-hour clock; the value ranges from 0 to 23.

#### Remarks
The `Hour` property is not affected by the value of the `Offset` property.

You can also create a string representation of a `DateTimeOffset` object's hour component by calling the `DateTimeOffset.ToString` method with the "H", or "HH" custom format specifiers.

#### Examples
The following example displays the hour component of a `DateTimeOffset` object in three different ways:

- By retrieving the value of the `Hour` property.

- By calling the `ToString` method with the "H" format specifier.

- By calling the `ToString` method with the "HH" format specifier.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

## DateTimeOffset.LocalDateTime property

```csharp
public DateTime LocalDateTime { get; }
```

Gets a `DateTime` value that represents the local date and time of the current `DateTimeOffset` object.

Returns: The local date and time of the current `DateTimeOffset` object.

#### Remarks
If necessary, the `LocalDateTime` property converts the current `DateTimeOffset` object's date and time to the local system's date and time. The conversion is a two-step operation:

1.  The property converts the current `DateTimeOffset` object's time to Coordinated Universal Time (UTC).

2.  The property then converts UTC to local time.

There are no invalid times and ambiguous times are mapped to the local zone's standard time. (However, the conversion can create an anomaly: if a `DateTimeOffset` value that is derived from the local computer reflects an ambiguous date and time, that value can be converted to UTC and then back to a local time that differs from the original time.)  The property applies any adjustment rules in the local time zone when it performs this conversion.

This property returns both the date and the time component of a `DateTimeOffset` object, which makes it useful for `DateTimeOffset` to `DateTime` conversion. In addition to performing any necessary time conversion, this property differs from the `DateTime` property by setting the value of the `Kind` property of the returned `DateTime` object to `Local`.

#### Examples
The following example illustrates several conversions of `DateTimeOffset` values to local times in the U.S. Pacific Standard Time zone. Note that the last three times are all ambiguous; the property maps all of them to a single date and time in the Pacific Standard Time zone.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Date/Properties.cs._

## DateTimeOffset.Microsecond property

```csharp
public int Microsecond { get; }
```

Gets the microsecond component of the time represented by the current `DateTimeOffset` object.

Returns: To be added.

#### Remarks

If you rely on properties such as `Now` or `UtcNow` to accurately track the number of elapsed microseconds,
the precision of the time's microseconds component depends on the resolution of the system clock.
On Windows NT 3.5 and later, and Windows Vista operating systems, the clock's resolution is approximately 10000-15000 microseconds.
