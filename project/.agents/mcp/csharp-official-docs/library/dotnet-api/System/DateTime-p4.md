---
title: "DateTime struct (part 4 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 4 of 18)

## DateTime.DateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32) constructor

```csharp
public DateTime (int year, int month, int day, int hour, int minute, int second, int millisecond);
```

Initializes a new instance of the `DateTime` structure to the specified year, month, day, hour, minute, second, and millisecond.

Parameters:

- `year`: The year (1 through 9999).
- `month`: The month (1 through 12).
- `day`: The day (1 through the number of days in `month`).
- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `millisecond`: The milliseconds (0 through 999).

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

-or-

`millisecond` is less than 0 or greater than 999.

#### Remarks
This constructor interprets`year`, `month`, and `day` as a year, month, and day in the Gregorian calendar. To instantiate a `DateTime` value by using the year, month, and day in another calendar, call the `%23ctor` constructor.

The `Kind` property is initialized to `Unspecified`.

For applications in which portability of date and time data or a limited degree of time zone awareness is important, you can use the corresponding `DateTimeOffset` constructor.

#### Examples
The following example uses the `%23ctor` constructor to instantiate a `DateTime` value.

_Code sample not included: ~/snippets/csharp/System/DateTime/.ctor/ctorexample1.cs._

## DateTime.DateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32, DateTimeKind) constructor

```csharp
public DateTime (int year, int month, int day, int hour, int minute, int second, int millisecond, DateTimeKind kind);
```

Initializes a new instance of the `DateTime` structure to the specified year, month, day, hour, minute, second, millisecond, and Coordinated Universal Time (UTC) or local time.

Parameters:

- `year`: The year (1 through 9999).
- `month`: The month (1 through 12).
- `day`: The day (1 through the number of days in `month`).
- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `millisecond`: The milliseconds (0 through 999).
- `kind`: One of the enumeration values that indicates whether `year`, `month`, `day`, `hour`, `minute`, `second`, and `millisecond` specify a local time, Coordinated Universal Time (UTC), or neither.

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

-or-

`millisecond` is less than 0 or greater than 999.
- `ArgumentException`: `kind` is not one of the `DateTimeKind` values.

#### Remarks
This constructor interprets`year`, `month`, and `day` as a year, month, and day in the Gregorian calendar. To instantiate a `DateTime` value by using the year, month, and day in another calendar, call the `%23ctor` constructor.

For applications in which portability of date and time data or a limited degree of time zone awareness is important, you can use the corresponding `DateTimeOffset` constructor.

#### Examples
The following example uses the `%23ctor` constructor to instantiate a `DateTime` value.

_Code sample not included: ~/snippets/csharp/System/DateTime/.ctor/ctorexample1.cs._

## DateTime.DateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Calendar) constructor

```csharp
public DateTime (int year, int month, int day, int hour, int minute, int second, int millisecond, System.Globalization.Calendar calendar);
```

Initializes a new instance of the `DateTime` structure to the specified year, month, day, hour, minute, second, and millisecond for the specified calendar.

Parameters:

- `year`: The year (1 through the number of years in `calendar`).
- `month`: The month (1 through the number of months in `calendar`).
- `day`: The day (1 through the number of days in `month`).
- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `millisecond`: The milliseconds (0 through 999).
- `calendar`: The calendar that is used to interpret `year`, `month`, and `day`.

Exceptions:

- `ArgumentNullException`: `calendar` is `null`.
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

#### Remarks
The `Kind` property is initialized to `Unspecified`.

The allowable values for `year`, `month`, and `day` depend on `calendar`. An exception is thrown if the specified date and time cannot be expressed using `calendar`.

For applications in which portability of date and time data or a limited degree of time zone awareness is important, you can use the corresponding `DateTimeOffset` constructor.

The `Globalization` namespace provides several calendars including `GregorianCalendar` and `JulianCalendar`.

#### Examples
The following example calls the `%23ctor` constructor twice to instantiate two `DateTime` values. The first call instantiates a `DateTime` value by using a `PersianCalendar` object. Because the Persian calendar cannot be designated as the default calendar for a culture, displaying a date in the Persian calendar requires individual calls to its `PersianCalendar.GetMonth`, `PersianCalendar.GetDayOfMonth`, and `PersianCalendar.GetYear` methods. The second call to the constructor instantiates a `DateTime` value by using a `HijriCalendar` object. The example changes the current culture to Arabic (Syria) and changes the current culture's default calendar to the Hijri calendar. Because Hijri is the current culture's default calendar, the `Console.WriteLine` method uses it to format the date. When the previous current culture (which is English (United States) in this case) is restored, the `Console.WriteLine` method uses the current culture's default Gregorian calendar to format the date.

_Code sample not included: ~/snippets/csharp/System/DateTime/.ctor/ctorexample6.cs._

## DateTime.DateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Int32) constructor

```csharp
public DateTime (int year, int month, int day, int hour, int minute, int second, int millisecond, int microsecond);
```

Initializes a new instance of the `DateTime` structure to the specified year, month, day, hour, minute, second, millisecond, and Coordinated Universal Time (UTC) or local time for the specified calendar.

Parameters:

- `year`: The year (1 through 9999).
- `month`: The month (1 through 12).
- `day`: The day (1 through the number of days in `month`).
- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `millisecond`: The milliseconds (0 through 999).
- `microsecond`: The microseconds (0 through 999).

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

-or-

`millisecond` is less than 0 or greater than 999.

-or-

`microsecond` is less than 0 or greater than 999.

#### Remarks

This constructor interprets `year`, `month` and `day` as a year, month and day
in the Gregorian calendar. To instantiate a `DateTime` value by using the year, month and day in another calendar, call
the `%23ctor` constructor.

The `Kind` property is initialized to `Unspecified`.

For applications in which portability of date and time data or a limited degree of time zone awareness is important,
you can use the corresponding `DateTimeOffset` constructor.

## DateTime.DateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Calendar, DateTimeKind) constructor

```csharp
public DateTime (int year, int month, int day, int hour, int minute, int second, int millisecond, System.Globalization.Calendar calendar, DateTimeKind kind);
```

Initializes a new instance of the `DateTime` structure to the specified year, month, day, hour, minute, second, millisecond, and Coordinated Universal Time (UTC) or local time for the specified calendar.

Parameters:

- `year`: The year (1 through the number of years in `calendar`).
- `month`: The month (1 through the number of months in `calendar`).
- `day`: The day (1 through the number of days in `month`).
- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `millisecond`: The milliseconds (0 through 999).
- `calendar`: The calendar that is used to interpret `year`, `month`, and `day`.
- `kind`: One of the enumeration values that indicates whether `year`, `month`, `day`, `hour`, `minute`, `second`, and `millisecond` specify a local time, Coordinated Universal Time (UTC), or neither.

Exceptions:

- `ArgumentNullException`: `calendar` is `null`.
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
- `ArgumentException`: `kind` is not one of the `DateTimeKind` values.

#### Remarks
The allowable values for `year`, `month`, and `day` parameters depend on the `calendar` parameter. An exception is thrown if the specified date and time cannot be expressed using `calendar`.

For applications in which portability of date and time data or a limited degree of time zone awareness is important, you can use the corresponding `DateTimeOffset` constructor.

The `Globalization` namespace provides several calendars including `GregorianCalendar` and `JulianCalendar`.

#### Examples
The following example calls the `%23ctor` constructor twice to instantiate two `DateTime` values. The first call instantiates a `DateTime` value by using a `PersianCalendar` object. Because the Persian calendar cannot be designated as the default calendar for a culture, displaying a date in the Persian calendar requires individual calls to its `PersianCalendar.GetMonth`, `PersianCalendar.GetDayOfMonth`, and `PersianCalendar.GetYear` methods. The second call to the constructor instantiates a `DateTime` value by using a `HijriCalendar` object. The example changes the current culture to Arabic (Syria) and changes the current culture's default calendar to the Hijri calendar. Because Hijri is the current culture's default calendar, the `Console.WriteLine` method uses it to format the date. When the previous current culture (which is English (United States) in this case) is restored, the `Console.WriteLine` method uses the current culture's default Gregorian calendar to format the date.

_Code sample not included: ~/snippets/csharp/System/DateTime/.ctor/ctorexample9.cs._

## DateTime.DateTime(Int32, Int32, Int32, Int32, Int32, Int32, Int32, Int32, DateTimeKind) constructor

```csharp
public DateTime (int year, int month, int day, int hour, int minute, int second, int millisecond, int microsecond, DateTimeKind kind);
```

Initializes a new instance of the `DateTime` structure to the specified year, month, day, hour, minute, second, millisecond, and Coordinated Universal Time (UTC) or local time for the specified calendar.

Parameters:

- `year`: The year (1 through 9999).
- `month`: The month (1 through 12).
- `day`: The day (1 through the number of days in `month`).
- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `millisecond`: The milliseconds (0 through 999).
- `microsecond`: The microseconds (0 through 999).
- `kind`: One of the enumeration values that indicates whether `year`, `month`, `day`, `hour`, `minute`, `second`, and `millisecond` specify a local time, Coordinated Universal Time (UTC), or neither.

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

-or-

`millisecond` is less than 0 or greater than 999.

-or-

`microsecond` is less than 0 or greater than 999.
- `ArgumentException`: `kind` is not one of the `DateTimeKind` values.

#### Remarks

This constructor interprets `year`, `month` and `day` as a year, month and day
in the Gregorian calendar. To instantiate a `DateTime` value by using the year, month and day in another calendar, call
the `%23ctor` constructor.

For applications in which portability of date and time data or a limited degree of time zone awareness is important,
you can use the corresponding `DateTimeOffset` constructor.
