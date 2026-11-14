---
title: "DateTime struct (part 3 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 3 of 18)

A `DateTime` value that is transferred to a COM application, then is transferred back to a managed application, is said to round-trip. However, a `DateTime` value that specifies only a time does not round-trip as you might expect.

If you round-trip only a time, such as 3 P.M., the final date and time is December 30, 1899 C.E. at 3:00 P.M., instead of January, 1, 0001 C.E. at 3:00 P.M. .NET and COM assume a default date when only a time is specified. However, the COM system assumes a base date of December 30, 1899 C.E., while .NET assumes a base date of January, 1, 0001 C.E.

When only a time is passed from .NET to COM, special processing is performed that converts the time to the format used by COM. When only a time is passed from COM to .NET, no special processing is performed because that would corrupt legitimate dates and times on or before December 30, 1899. If a date starts its round-trip from COM, .NET and COM preserve the date.

The behavior of .NET and COM means that if your application round-trips a `DateTime` that only specifies a time, your application must remember to modify or ignore the erroneous date from the final `DateTime` object.

## DateTime.DateTime(Int64) constructor

```csharp
public DateTime (long ticks);
```

Initializes a new instance of the `DateTime` structure to a specified number of ticks.

Parameters:

- `ticks`: A date and time expressed in the number of 100-nanosecond intervals that have elapsed since January 1, 0001 at 00:00:00.000 in the Gregorian calendar.

Exceptions:

- `ArgumentOutOfRangeException`: `ticks` is less than <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> or greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

#### Remarks
The `Kind` property is initialized to `Unspecified`.

For applications in which portability of date and time data or a limited degree of time zone awareness is important, you can use the corresponding `DateTimeOffset` constructor.

#### Examples
The following example demonstrates one of the `DateTime` constructors.

_Code sample not included: ~/snippets/csharp/System/DateTime/.ctor/ticks.cs._

## DateTime.DateTime(DateOnly, TimeOnly) constructor

```csharp
public DateTime (DateOnly date, TimeOnly time);
```

Initializes a new instance of the `DateTime` structure to the specified `DateOnly` and `TimeOnly`.
The new instance will have the `DateTimeKind.Unspecified` kind.

Parameters:

- `date`: The date part.
- `time`: The time part.

To be added.

## DateTime.DateTime(Int64, DateTimeKind) constructor

```csharp
public DateTime (long ticks, DateTimeKind kind);
```

Initializes a new instance of the `DateTime` structure to a specified number of ticks and to Coordinated Universal Time (UTC) or local time.

Parameters:

- `ticks`: A date and time expressed in the number of 100-nanosecond intervals that have elapsed since January 1, 0001 at 00:00:00.000 in the Gregorian calendar.
- `kind`: One of the enumeration values that indicates whether `ticks` specifies a local time, Coordinated Universal Time (UTC), or neither.

Exceptions:

- `ArgumentOutOfRangeException`: `ticks` is less than <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> or greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.
- `ArgumentException`: `kind` is not one of the `DateTimeKind` values.

#### Remarks
For applications in which portability of date and time data or a limited degree of time zone awareness is important, you can use the corresponding `DateTimeOffset` constructor.

## DateTime.DateTime(DateOnly, TimeOnly, DateTimeKind) constructor

```csharp
public DateTime (DateOnly date, TimeOnly time, DateTimeKind kind);
```

Initializes a new instance of the `DateTime` structure to the specified `DateOnly` and `TimeOnly` and respecting the specified `DateTimeKind`.

Parameters:

- `date`: The date part.
- `time`: The time part.
- `kind`: One of the enumeration values that indicates whether `date` and `time` specify a local time, Coordinated Universal Time (UTC), or neither.

To be added.

## DateTime.DateTime(Int32, Int32, Int32) constructor

```csharp
public DateTime (int year, int month, int day);
```

Initializes a new instance of the `DateTime` structure to the specified year, month, and day.

Parameters:

- `year`: The year (1 through 9999).
- `month`: The month (1 through 12).
- `day`: The day (1 through the number of days in `month`).

Exceptions:

- `ArgumentOutOfRangeException`: `year` is less than 1 or greater than 9999.

-or-

`month` is less than 1 or greater than 12.

-or-

`day` is less than 1 or greater than the number of days in `month`.

#### Remarks
This constructor interprets `year`, `month`, and `day` as a year, month, and day in the Gregorian calendar. To instantiate a `DateTime` value by using the year, month, and day in another calendar, call the `%23ctor` constructor.

The time of day for the resulting `DateTime` is midnight (00:00:00). The `Kind` property is initialized to `Unspecified`.

#### Examples
The following example uses the `%23ctor` constructor to instantiate a `DateTime` value. The example also illustrates that this overload creates a `DateTime` value whose time component equals midnight (or 0:00).

_Code sample not included: ~/snippets/csharp/System/DateTime/.ctor/ctorexample1.cs._

## DateTime.DateTime(Int32, Int32, Int32, Calendar) constructor

```csharp
public DateTime (int year, int month, int day, System.Globalization.Calendar calendar);
```

Initializes a new instance of the `DateTime` structure to the specified year, month, and day for the specified calendar.

Parameters:

- `year`: The year (1 through the number of years in `calendar`).
- `month`: The month (1 through the number of months in `calendar`).
- `day`: The day (1 through the number of days in `month`).
- `calendar`: The calendar that is used to interpret `year`, `month`, and `day`.

Exceptions:

- `ArgumentNullException`: `calendar` is `null`.
- `ArgumentOutOfRangeException`: `year` is not in the range supported by `calendar`.

-or-

`month` is less than 1 or greater than the number of months in `calendar`.

-or-

`day` is less than 1 or greater than the number of days in `month`.

#### Remarks
The time of day for the resulting `DateTime` is midnight (00:00:00). The `Kind` property is initialized to `Unspecified`.

The allowable values for `year`, `month`, and `day` depend on `calendar`. An exception is thrown if the specified date and time cannot be expressed using `calendar`.

The `Globalization` namespace provides several calendars including `GregorianCalendar` and `JulianCalendar`.

#### Examples
The following example calls the `%23ctor` constructor twice to instantiate two `DateTime` values. The first call instantiates a `DateTime` value by using a `PersianCalendar` object. Because the Persian calendar cannot be designated as the default calendar for a culture, displaying a date in the Persian calendar requires individual calls to its `PersianCalendar.GetMonth`, `PersianCalendar.GetDayOfMonth`, and `PersianCalendar.GetYear` methods. The second call to the constructor instantiates a `DateTime` value by using a `HijriCalendar` object. The example changes the current culture to Arabic (Syria) and changes the current culture's default calendar to the Hijri calendar. Because Hijri is the current culture's default calendar, the `Console.WriteLine` method uses it to format the date. When the previous current culture (which is English (United States) in this case) is restored, the `Console.WriteLine` method uses the current culture's default Gregorian calendar to format the date.

_Code sample not included: ~/snippets/csharp/System/DateTime/.ctor/ctorexample2.cs._

## DateTime.DateTime(Int32, Int32, Int32, Int32, Int32, Int32) constructor

```csharp
public DateTime (int year, int month, int day, int hour, int minute, int second);
```

Initializes a new instance of the `DateTime` structure to the specified year, month, day, hour, minute, and second.

Parameters:

- `year`: The year (1 through 9999).
- `month`: The month (1 through 12).
- `day`: The day (1 through the number of days in `month`).
- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).

Exceptions:

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

#### Remarks
The `Kind` property is initialized to `Unspecified`.

This constructor interprets`year`, `month`, and `day` as a year, month, and day in the Gregorian calendar. To instantiate a `DateTime` value by using the year, month, and day in another calendar, call the `%23ctor` constructor.

For applications in which portability of date and time data or a limited degree of time zone awareness is important, you can use the corresponding `DateTimeOffset` constructor.

#### Examples
The following example uses the `DateTime.%23ctor` constructor to instantiate a `DateTime` value.

_Code sample not included: ~/snippets/csharp/System/DateTime/.ctor/ctorexample1.cs._

## DateTime.DateTime(Int32, Int32, Int32, Int32, Int32, Int32, DateTimeKind) constructor

```csharp
public DateTime (int year, int month, int day, int hour, int minute, int second, DateTimeKind kind);
```

Initializes a new instance of the `DateTime` structure to the specified year, month, day, hour, minute, second, and Coordinated Universal Time (UTC) or local time.

Parameters:

- `year`: The year (1 through 9999).
- `month`: The month (1 through 12).
- `day`: The day (1 through the number of days in `month`).
- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `kind`: One of the enumeration values that indicates whether `year`, `month`, `day`, `hour`, `minute` and `second` specify a local time, Coordinated Universal Time (UTC), or neither.

Exceptions:

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
- `ArgumentException`: `kind` is not one of the `DateTimeKind` values.

#### Remarks
This constructor interprets`year`, `month`, and `day` as a year, month, and day in the Gregorian calendar. To instantiate a `DateTime` value by using the year, month, and day in another calendar, call the `%23ctor` constructor.

For applications in which portability of date and time data or a limited degree of time zone awareness is important, you can use the corresponding `DateTimeOffset` constructor.

#### Examples
The following example uses the `%23ctor` constructor to instantiate a `DateTime` value.

_Code sample not included: ~/snippets/csharp/System/DateTime/.ctor/ctorexample1.cs._

## DateTime.DateTime(Int32, Int32, Int32, Int32, Int32, Int32, Calendar) constructor

```csharp
public DateTime (int year, int month, int day, int hour, int minute, int second, System.Globalization.Calendar calendar);
```

Initializes a new instance of the `DateTime` structure to the specified year, month, day, hour, minute, and second for the specified calendar.

Parameters:

- `year`: The year (1 through the number of years in `calendar`).
- `month`: The month (1 through the number of months in `calendar`).
- `day`: The day (1 through the number of days in `month`).
- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `calendar`: The calendar that is used to interpret `year`, `month`, and `day`.

Exceptions:

- `ArgumentNullException`: `calendar` is `null`.
- `ArgumentOutOfRangeException`: `year` is not in the range supported by `calendar`.

-or-

`month` is less than 1 or greater than the number of months in `calendar`.

-or-

`day` is less than 1 or greater than the number of days in `month`.

-or-

`hour` is less than 0 or greater than 23

-or-

`minute` is less than 0 or greater than 59.

-or-

`second` is less than 0 or greater than 59.

#### Remarks
The `Kind` property is initialized to `Unspecified`.

The allowable values for `year`, `month`, and `day` depend on `calendar`. An exception is thrown if the specified date and time cannot be expressed using `calendar`.

The `Globalization` namespace provides several calendars including `GregorianCalendar` and `JulianCalendar`.

#### Examples
The following example calls the `%23ctor` constructor twice to instantiate two `DateTime` values. The first call instantiates a `DateTime` value by using a `PersianCalendar` object. Because the Persian calendar cannot be designated as the default calendar for a culture, displaying a date in the Persian calendar requires individual calls to its `PersianCalendar.GetMonth`, `PersianCalendar.GetDayOfMonth`, and `PersianCalendar.GetYear` methods. The second call to the constructor instantiates a `DateTime` value by using a `HijriCalendar` object. The example changes the current culture to Arabic (Syria) and changes the current culture's default calendar to the Hijri calendar. Because Hijri is the current culture's default calendar, the `Console.WriteLine` method uses it to format the date. When the previous current culture (which is English (United States) in this case) is restored, the `Console.WriteLine` method uses the current culture's default Gregorian calendar to format the date.

_Code sample not included: ~/snippets/csharp/System/DateTime/.ctor/ctorexample4.cs._
