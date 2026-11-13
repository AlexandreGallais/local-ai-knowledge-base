---
title: "Compare types related to date and time (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/choosing-between-datetime.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Choose between DateTime, DateOnly, DateTimeOffset, TimeSpan, TimeOnly, and TimeZoneInfo

.NET applications can use date and time information in several ways. The more common uses of date and time information include:

- To reflect a date only, so that time information is not important.
- To reflect a time only, so that date information is not important.
- To reflect an abstract date and time that's not tied to a specific time and place (for example, most stores in an international chain open on weekdays at 9:00 A.M.).
- To retrieve date and time information from sources outside of .NET, typically where date and time information is stored in a simple data type.
- To uniquely and unambiguously identify a single point in time. Some applications require that a date and time be unambiguous only on the host system. Other apps require that it be unambiguous across systems (that is, a date serialized on one system can be meaningfully deserialized and used on another system anywhere in the world).
- To preserve multiple related times (such as the requester's local time and the server's time of receipt for a web request).
- To perform date and time arithmetic, possibly with a result that uniquely and unambiguously identifies a single point in time.

.NET includes the `System.DateTime`, `System.DateOnly`, `System.DateTimeOffset`, `System.TimeSpan`, `System.TimeOnly`, and `System.TimeZoneInfo` types, all of which can be used to build applications that work with dates and times.

> **Note:**
> This article doesn't discuss `System.TimeZone` because its functionality is almost entirely incorporated in the `System.TimeZoneInfo` class. Whenever possible, use the `System.TimeZoneInfo` class instead of the `System.TimeZone` class.

## The DateTimeOffset structure

The `System.DateTimeOffset` structure represents a date and time value, together with an offset that indicates how much that value differs from UTC. Thus, the value always unambiguously identifies a single point in time.

The `System.DateTimeOffset` type includes all of the functionality of the `System.DateTime` type along with time zone awareness. This makes it suitable for applications that:

- Uniquely and unambiguously identify a single point in time. The `System.DateTimeOffset` type can be used to unambiguously define the meaning of "now", to log transaction times, to log the times of system or application events, and to record file creation and modification times.
- Perform general date and time arithmetic.
- Preserve multiple related times, as long as those times are stored as two separate values or as two members of a structure.

> **Note:**
> These uses for `System.DateTimeOffset` values are much more common than those for `System.DateTime` values. As a result, consider `System.DateTimeOffset` as the default date and time type for application development.

A `System.DateTimeOffset` value isn't tied to a particular time zone, but can originate from a variety of time zones. The following example lists the time zones to which a number of `System.DateTimeOffset` values (including a local Pacific Standard Time) can belong.

```csharp
using System;
using System.Collections.ObjectModel;

public class TimeOffsets
{
    public static void Main()
    {
        DateTime thisDate = new DateTime(2007, 3, 10, 0, 0, 0);
        DateTime dstDate = new DateTime(2007, 6, 10, 0, 0, 0);
        DateTimeOffset thisTime;

        thisTime = new DateTimeOffset(dstDate, new TimeSpan(-7, 0, 0));
        ShowPossibleTimeZones(thisTime);

        thisTime = new DateTimeOffset(thisDate, new TimeSpan(-6, 0, 0));
        ShowPossibleTimeZones(thisTime);

        thisTime = new DateTimeOffset(thisDate, new TimeSpan(+1, 0, 0));
        ShowPossibleTimeZones(thisTime);
    }

    private static void ShowPossibleTimeZones(DateTimeOffset offsetTime)
    {
        TimeSpan offset = offsetTime.Offset;
        ReadOnlyCollection<TimeZoneInfo> timeZones;

        Console.WriteLine($"{offsetTime.ToString()} could belong to the following time zones:");
        // Get all time zones defined on local system
        timeZones = TimeZoneInfo.GetSystemTimeZones();
        // Iterate time zones
        foreach (TimeZoneInfo timeZone in timeZones)
        {
            // Compare offset with offset for that date in that time zone
            if (timeZone.GetUtcOffset(offsetTime.DateTime).Equals(offset))
                Console.WriteLine($"   {timeZone.DisplayName}");
        }
        Console.WriteLine();
    }
}
// This example displays the following output to the console:
//       6/10/2007 12:00:00 AM -07:00 could belong to the following time zones:
//          (GMT-07:00) Arizona
//          (GMT-08:00) Pacific Time (US & Canada)
//          (GMT-08:00) Tijuana, Baja California
//
//       3/10/2007 12:00:00 AM -06:00 could belong to the following time zones:
//          (GMT-06:00) Central America
//          (GMT-06:00) Central Time (US & Canada)
//          (GMT-06:00) Guadalajara, Mexico City, Monterrey - New
//          (GMT-06:00) Guadalajara, Mexico City, Monterrey - Old
//          (GMT-06:00) Saskatchewan
//
//       3/10/2007 12:00:00 AM +01:00 could belong to the following time zones:
//          (GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna
//          (GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague
//          (GMT+01:00) Brussels, Copenhagen, Madrid, Paris
//          (GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb
//          (GMT+01:00) West Central Africa
```

The output shows that each date and time value in this example can belong to at least three different time zones. The `System.DateTimeOffset` value of 6/10/2007 shows that if a date and time value represents a daylight saving time, its offset from UTC doesn't even necessarily correspond to the originating time zone's base UTC offset or to the offset from UTC found in its display name. Because a single `System.DateTimeOffset` value isn't tightly coupled with its time zone, it can't reflect a time zone's transition to and from daylight saving time. This can be problematic when date and time arithmetic is used to manipulate a `System.DateTimeOffset` value. For a discussion of how to perform date and time arithmetic in a way that takes account of a time zone's adjustment rules, see Performing arithmetic operations with dates and times.

## The DateTime structure

A `System.DateTime` value defines a particular date and time. It includes a `System.DateTime.Kind` property that provides limited information about the time zone to which that date and time belongs. The `System.DateTimeKind` value returned by the `System.DateTime.Kind` property indicates whether the `System.DateTime` value represents the local time (`System.DateTimeKind.Local`), Coordinated Universal Time (UTC) (`System.DateTimeKind.Utc`), or an unspecified time (`System.DateTimeKind.Unspecified`).

The `System.DateTime` structure is suitable for applications with one or more of the following characteristics:

- Work with abstract dates and times.
- Work with dates and times for which time zone information is missing.
- Work with UTC dates and times only.
- Perform date and time arithmetic, but are concerned with general results. For example, in an addition operation that adds six months to a particular date and time, it is often not important whether the result is adjusted for daylight saving time.

Unless a particular `System.DateTime` value represents UTC, that date and time value is often ambiguous or limited in its portability. For example, if a `System.DateTime` value represents the local time, it's portable within that local time zone (that is, if the value is deserialized on another system in the same time zone, that value still unambiguously identifies a single point in time). Outside the local time zone, that `System.DateTime` value can have multiple interpretations. If the value's `System.DateTime.Kind` property is `System.DateTimeKind.Unspecified`, it's even less portable: it is now ambiguous within the same time zone and possibly even on the same system where it was first serialized. Only if a `System.DateTime` value represents UTC does that value unambiguously identify a single point in time regardless of the system or time zone in which the value is used.

> **Important:**
> When saving or sharing `System.DateTime` data, use UTC and set the `System.DateTime` value's `System.DateTime.Kind` property to `System.DateTimeKind.Utc`.

## The DateOnly structure

The `System.DateOnly` structure represents a specific date, without time. Since it has no time component, it represents a date from the start of the day to the end of the day. This structure is ideal for storing specific dates, such as a birth date, an anniversary date, a holiday, or a business-related date.

Although you could use `DateTime` while ignoring the time component, there are a few benefits to using `DateOnly` over `DateTime`:

- The `DateTime` structure may roll into the previous or next day if it's offset by a time zone. `DateOnly` can't be offset by a time zone, and it always represents the date that was set.
- Serializing a `DateTime` structure includes the time component, which may obscure the intent of the data. Also, `DateOnly` serializes less data.
- When code interacts with a database, such as SQL Server, whole dates are generally stored as the `date` data type, which doesn't include a time. `DateOnly` matches the database type better.

For more information about `DateOnly`, see How to use the DateOnly and TimeOnly structures.

> **Important:**
> `DateOnly` isn't available for .NET Framework.
