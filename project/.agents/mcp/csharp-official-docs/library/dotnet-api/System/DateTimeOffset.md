---
title: "DateTimeOffset struct (part 1 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTimeOffset.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeOffset struct

Namespace: `System`

```csharp
public readonly struct DateTimeOffset : IComparable, IComparable<DateTimeOffset>, IEquatable<DateTimeOffset>, IParsable<DateTimeOffset>, ISpanFormattable, ISpanParsable<DateTimeOffset>, IUtf8SpanFormattable, System.Runtime.Serialization.IDeserializationCallback, System.Runtime.Serialization.ISerializable
```

Represents a point in time, typically expressed as a date and time of day, relative to Coordinated Universal Time (UTC).

#### Remarks
The `DateTimeOffset` structure includes a `DateTime` value, together with an `Offset` property that defines the difference between the current `DateTimeOffset` instance's date and time and Coordinated Universal Time (UTC). Because it exactly defines a date and time relative to UTC, the `DateTimeOffset` structure does not include a `Kind` member, as the `DateTime` structure does. It represents dates and times with values whose UTC ranges from 12:00:00 midnight, January 1, 0001 Anno Domini (Common Era), to 11:59:59 P.M., December 31, 9999 A.D. (C.E.).

The time component of a `DateTimeOffset` value is measured in 100-nanosecond units called ticks, and a particular date is the number of ticks since 12:00 midnight, January 1, 0001 A.D. (C.E.) in the `GregorianCalendar` calendar. A `DateTimeOffset` value is always expressed in the context of an explicit or default calendar. Ticks that are attributable to leap seconds are not included in the total number of ticks.

Although a `DateTimeOffset` value includes an offset, it is not a fully time zone-aware data structure. While an offset from UTC is one characteristic of a time zone, it does not unambiguously identify a time zone. Not only do multiple time zones share the same offset from UTC, but the offset of a single time zone changes if it observes daylight saving time. This means that, as soon as a `DateTimeOffset` value is disassociated from its time zone, it can no longer be unambiguously linked back to its original time zone.

Because `DateTimeOffset` is a structure, a `DateTimeOffset` object that has been declared but not otherwise initialized contains the default values for each of its member fields. This means that its `DateTime` property is set to `MinValue` and its `Offset` property is set to `Zero`.

You can create a new `DateTimeOffset` value by calling any of the overloads of its constructor, which are similar to the overloaded constructors for the `DateTime` structure. You can also create a new `DateTimeOffset` value by assigning it a `DateTime` value. This is an implicit conversion; it does not require a casting operator (in C#) or call to a conversion method (in Visual Basic). You can also initialize a `DateTimeOffset` value from the string representation of a date and time by calling a number of static string parsing methods, which include `DateTimeOffset.Parse`, `DateTimeOffset.ParseExact`, `DateTimeOffset.TryParse`, and `DateTimeOffset.TryParseExact`.

The members of the `DateTimeOffset` structure provide functionality in the following areas:

- Date and time arithmetic.

You can add or subtract either dates or time intervals from a particular `DateTimeOffset` value. Arithmetic operations with `DateTimeOffset` values, unlike those with `DateTime` values, adjust for differences in time offsets when returning a result. For example, the following code uses `DateTime` variables to subtract the current local time from the current UTC time. The code then uses `DateTimeOffset` variables to perform the same operation. The subtraction with `DateTime` values returns the local time zone's difference from UTC, while the subtraction with `DateTimeOffset` values returns `Zero`.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Overview/Type.cs._

- Type conversion operations.

You can convert `DateTimeOffset` values to `DateTime` values and vice versa.

- Time manipulation and extraction operations.

You can extract either the date or the time of a `DateTimeOffset` value. You can also retrieve the value of a particular `DateTimeOffset` component, such as its year or its month.

> **Note:**
>  If you are working with a ticks value that you want to convert to some other time interval, such as minutes or seconds, you should use the `TicksPerDay`, `TicksPerHour`, `TicksPerMinute`, `TicksPerSecond`, or `TicksPerMillisecond` constant to perform the conversion. For example, to add the number of seconds represented by a specified number of ticks to the `DateTimeOffset.Second` component of a `DateTimeOffset` value, you can use the expression `dateValue.Second + nTicks/Timespan.TicksPerSecond`.

- Date and time conversion.

You can convert any `DateTimeOffset` value to another `DateTimeOffset` value that represents the same point in time in another time zone. However, a time zone's adjustment rules are applied only in the case of the `DateTimeOffset.ToLocalTime` method, which converts a `DateTimeOffset` value to the date and time in the local system zone.

- Date and time comparison.

You can determine whether any particular `DateTimeOffset` value is earlier than, the same as, or later than another `DateTimeOffset` value. Before the comparison is performed, all values are converted to UTC.

## DateTimeOffset.DateTimeOffset(DateTime) constructor

```csharp
public DateTimeOffset (DateTime dateTime);
```

Initializes a new instance of the `DateTimeOffset` structure using the specified `DateTime` value.

Parameters:

- `dateTime`: A date and time.

Exceptions:

- `ArgumentOutOfRangeException`: The Coordinated Universal Time (UTC) date and time that results from applying the offset is earlier than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>.

-or-

The UTC date and time that results from applying the offset is later than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks
This constructor's behavior depends on the value of the `Kind` property of the `dateTime` parameter:

- If the value of `DateTime.Kind` is `Utc`, the `DateTime` property of the new instance is set equal to `dateTime`, and the `Offset` property is set equal to `Zero`.

- If the value of `DateTime.Kind` is `Local` or `Unspecified`, the `DateTime` property of the new instance is set equal to `dateTime`, and the `Offset` property is set equal to the offset of the local system's current time zone.

#### Examples
The following example illustrates how the value of the `Kind` property of the `dateTime` parameter affects the date and time value that is returned by this constructor.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/.ctor/Constructors.cs._

## DateTimeOffset.DateTimeOffset(DateTime, TimeSpan) constructor

```csharp
public DateTimeOffset (DateTime dateTime, TimeSpan offset);
```

Initializes a new instance of the `DateTimeOffset` structure using the specified `DateTime` value and `offset`.

Parameters:

- `dateTime`: A date and time.
- `offset`: The time's offset from Coordinated Universal Time (UTC).

Exceptions:

- `ArgumentException`: `dateTime.Kind` equals `DateTimeKind.Utc` and `offset` does not equal zero.

-or-

`dateTime.Kind` equals `DateTimeKind.Local` and `offset` does not equal the offset of the system's local time zone.

-or-

`offset` is not specified in whole minutes.
- `ArgumentOutOfRangeException`: `offset` is less than -14 hours or greater than 14 hours.

-or-

`DateTimeOffset.UtcDateTime` is less than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see> or greater than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks
This constructor's behavior depends in part on the value of the `Kind` property of the `dateTime` parameter:

- If the value of `DateTime.Kind` is `Utc`, the value of the `offset` parameter must be 0 or an `ArgumentException` is thrown.

- If the value of `DateTime.Kind` is `Local`, the value of the `offset` parameter must be equal to the local time zone's offset from Coordinated Universal Time (UTC) for that particular date or an `ArgumentException` is thrown.

- If the value of `DateTime.Kind` is `Unspecified`, the `offset` parameter can have any valid value.

#### Examples
The following example shows how to initialize a `DateTimeOffset` object with a date and time and the offset of the local time zone when that time zone is not known in advance.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/.ctor/Constructors.cs._

## DateTimeOffset.DateTimeOffset(Int64, TimeSpan) constructor

```csharp
public DateTimeOffset (long ticks, TimeSpan offset);
```

Initializes a new instance of the `DateTimeOffset` structure using the specified number of `ticks` and `offset`.

Parameters:

- `ticks`: A date and time expressed as the number of 100-nanosecond intervals that have elapsed since 12:00:00 midnight on January 1, 0001.
- `offset`: The time's offset from Coordinated Universal Time (UTC).

Exceptions:

- `ArgumentException`: `offset` is not specified in whole minutes.
- `ArgumentOutOfRangeException`: The `DateTimeOffset.UtcDateTime` property is earlier than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see> or later than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

-or-

`ticks` is less than `DateTimeOffset.MinValue.Ticks` or greater than `DateTimeOffset.MaxValue.Ticks`.

-or-

`offset` is less than -14 hours or greater than 14 hours.

#### Remarks
Ordinarily, trying to call the `DateTimeOffset.%23ctor` constructor to instantiate a `DateTimeOffset` value with a local time and an offset other than that of the local time zone throws an `ArgumentException`. You can use this overload of the `DateTimeOffset` constructor to work around this limitation. The following example uses the local time's number of ticks to instantiate a `DateTimeOffset` value whose offset does not necessarily represent that of the local time:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/.ctor/Constructors.cs._

#### Examples
The following example initializes a `DateTimeOffset` object by using the number of ticks in an arbitrary date (in this case, July 16, 2007, at 1:32 PM) with an offset of -5.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/.ctor/Constructors.cs._

## DateTimeOffset.DateTimeOffset(DateOnly, TimeOnly, TimeSpan) constructor

```csharp
public DateTimeOffset (DateOnly date, TimeOnly time, TimeSpan offset);
```

Initializes a new instance of the `DateTimeOffset` structure using the specified `date`, `time`, and `offset`.

Parameters:

- `date`: The date part.
- `time`: The time part.
- `offset`: The time's offset from Coordinated Universal Time (UTC).

To be added.

## DateTimeOffset.DateTimeOffset(Int32, Int32, Int32, Int32, Int32, Int32, TimeSpan) constructor

```csharp
public DateTimeOffset (int year, int month, int day, int hour, int minute, int second, TimeSpan offset);
```

Initializes a new instance of the `DateTimeOffset` structure using the specified `year`, `month`, `day`, `hour`, `minute`, `second`, and `offset`.

Parameters:

- `year`: The year (1 through 9999).
- `month`: The month (1 through 12).
- `day`: The day (1 through the number of days in `month`).
- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `offset`: The time's offset from Coordinated Universal Time (UTC).

Exceptions:

- `ArgumentException`: `offset` does not represent whole minutes.
- `ArgumentOutOfRangeException`: `year` is less than one or greater than 9999.

-or-

`month` is less than one or greater than 12.

-or-

`day` is less than one or greater than the number of days in `month`.

-or-

`hour` is less than zero or greater than 23.

-or-

`minute` is less than 0 or greater than 59.

-or-

`second` is less than 0 or greater than 59.

-or-

`offset` is less than -14 hours or greater than 14 hours.

-or-

The `DateTimeOffset.UtcDateTime` property is earlier than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see> or later than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks
This constructor interprets `year`, `month`, and `day` as a year, month, and day in the Gregorian calendar. To instantiate a `DateTimeOffset` value by using the year, month, and day in another calendar, call the `%23ctor` constructor.

#### Examples
The following example instantiates a `DateTimeOffset` object by using the `%23ctor` constructor overload.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/.ctor/Constructors.cs._

## DateTimeOffset.DateTimeOffset(Int32, Int32, Int32, Int32, Int32, Int32, Int32, TimeSpan) constructor

```csharp
public DateTimeOffset (int year, int month, int day, int hour, int minute, int second, int millisecond, TimeSpan offset);
```

Initializes a new instance of the `DateTimeOffset` structure using the specified `year`, `month`, `day`, `hour`, `minute`, `second`, `millisecond`, and `offset`.

Parameters:

- `year`: The year (1 through 9999).
- `month`: The month (1 through 12).
- `day`: The day (1 through the number of days in `month`).
- `hour`: The hours (0 through 23).
- `minute`: The minutes (0 through 59).
- `second`: The seconds (0 through 59).
- `millisecond`: The milliseconds (0 through 999).
- `offset`: The time's offset from Coordinated Universal Time (UTC).

Exceptions:

- `ArgumentException`: `offset` does not represent whole minutes.
- `ArgumentOutOfRangeException`: `year` is less than one or greater than 9999.

-or-

`month` is less than one or greater than 12.

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

`offset` is less than -14 or greater than 14.

-or-

The `DateTimeOffset.UtcDateTime` property is earlier than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see> or later than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks
This constructor interprets `year`, `month`, and `day` as a year, month, and day in the Gregorian calendar. To instantiate a `DateTimeOffset` value by using the year, month, and day in another calendar, call the `%23ctor` constructor.

#### Examples
The following example instantiates a `DateTimeOffset` object by using the `%23ctor` constructor overload.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/.ctor/Constructors.cs._
