---
title: "How to: Use time zones in date and time arithmetic"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/use-time-zones-in-arithmetic.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Use time zones in date and time arithmetic

Ordinarily, when you perform date and time arithmetic using `System.DateTime` or `System.DateTimeOffset` values, the result does not reflect any time zone adjustment rules. This is true even when the time zone of the date and time value is clearly identifiable (for example, when the `System.DateTime.Kind` property is set to `System.DateTimeKind.Local`). This topic shows how to perform arithmetic operations on date and time values that belong to a particular time zone. The results of the arithmetic operations will reflect the time zone's adjustment rules.

### To apply adjustment rules to date and time arithmetic

1. Implement some method of closely coupling a date and time value with the time zone to which it belongs. For example, declare a structure that includes both the date and time value and its time zone. The following example uses this approach to link a `System.DateTime` value with its time zone.

   ```csharp
using System;

public struct TimeZoneTime2
{
    public TimeZoneInfo TimeZone;
    public DateTimeOffset Time;

    public TimeZoneTime2(TimeZoneInfo tz, DateTimeOffset time)
    {
        ArgumentNullException.ThrowIfNull(tz);

        TimeZone = tz;
        Time = time;
    }

    public TimeZoneTime2 AddTime(TimeSpan interval)
    {
        // Convert time to UTC
        DateTimeOffset utcTime = TimeZoneInfo.ConvertTime(Time, TimeZoneInfo.Utc);
        // Add time interval to time
        utcTime = utcTime.Add(interval);
        // Convert time back to time in time zone
        return new TimeZoneTime2(TimeZone, TimeZoneInfo.ConvertTime(utcTime, TimeZone));
    }
}

public class TimeArithmetic2
{
    public const string tzName = "Central Standard Time";

    public static void Main()
    {
        try
        {
            TimeZoneTime2 cstTime1, cstTime2;

            TimeZoneInfo cst = TimeZoneInfo.FindSystemTimeZoneById(tzName);
            DateTime time1 = new(2008, 3, 9, 1, 30, 0);
            TimeSpan twoAndAHalfHours = new(2, 30, 0);

            cstTime1 = new TimeZoneTime2(cst,
                           new DateTimeOffset(time1, cst.GetUtcOffset(time1)));
            cstTime2 = cstTime1.AddTime(twoAndAHalfHours);
            Console.WriteLine($"{cstTime1.Time} + {twoAndAHalfHours.ToString()} hours = {cstTime2.Time}");
        }
        catch
        {
            Console.WriteLine($"Unable to find {tzName}.");
        }
    }
}

// Define a structure for DateTime values for internal use only
internal struct TimeWithTimeZone
{
    TimeZoneInfo TimeZone;
    DateTime Time;
}
```

2. Convert a time to Coordinated Universal Time (UTC) by calling either the `System.TimeZoneInfo.ConvertTimeToUtc*` method or the `System.TimeZoneInfo.ConvertTime*` method.

3. Perform the arithmetic operation on the UTC time.

4. Convert the time from UTC to the original time's associated time zone by calling the `System.TimeZoneInfo.ConvertTime(System.DateTime,System.TimeZoneInfo)` method.

## Example

The following example adds two hours and thirty minutes to March 9, 2008, at 1:30 A.M. Central Standard Time. The time zone's transition to daylight saving time occurs thirty minutes later, at 2:00 A.M. on March 9, 2008. Because the example follows the four steps listed in the previous section, it correctly reports the resulting time as 5:00 A.M. on March 9, 2008.

```csharp
using System;

public struct TimeZoneTime
{
    public TimeZoneInfo TimeZone;
    public DateTime Time;

    public TimeZoneTime(TimeZoneInfo tz, DateTime time)
    {
        ArgumentNullException.ThrowIfNull(tz);

        TimeZone = tz;
        Time = time;
    }

    public TimeZoneTime AddTime(TimeSpan interval)
    {
        // Convert time to UTC
        DateTime utcTime = TimeZoneInfo.ConvertTimeToUtc(Time, TimeZone);
        // Add time interval to time
        utcTime = utcTime.Add(interval);
        // Convert time back to time in time zone
        return new TimeZoneTime(TimeZone, TimeZoneInfo.ConvertTime(utcTime,
                                TimeZoneInfo.Utc, TimeZone));
    }
}

public class TimeArithmetic
{
    public const string TzName = "Central Standard Time";

    public static void Main()
    {
        try
        {
            TimeZoneTime cstTime1, cstTime2;

            TimeZoneInfo cst = TimeZoneInfo.FindSystemTimeZoneById(TzName);
            DateTime time1 = new(2008, 3, 9, 1, 30, 0);
            TimeSpan twoAndAHalfHours = new(2, 30, 0);

            cstTime1 = new TimeZoneTime(cst, time1);
            cstTime2 = cstTime1.AddTime(twoAndAHalfHours);
            Console.WriteLine($"{cstTime1.Time} + {twoAndAHalfHours.ToString()} hours = {cstTime2.Time}");
        }
        catch
        {
            Console.WriteLine($"Unable to find {TzName}.");
        }
    }
}
```

Both `System.DateTime` and `System.DateTimeOffset` values are disassociated from any time zone to which they might belong. To perform date and time arithmetic in a way that automatically applies a time zone's adjustment rules, the time zone to which any date and time value belongs must be immediately identifiable. This means that a date and time and its associated time zone must be tightly coupled. There are several ways to do this, which include the following:

- Assume that all times used in an application belong to a particular time zone. Although appropriate in some cases, this approach offers limited flexibility and possibly limited portability.

- Define a type that tightly couples a date and time with its associated time zone by including both as fields of the type. This approach is used in the code example, which defines a structure to store the date and time and the time zone in two member fields.

The example illustrates how to perform arithmetic operations on `System.DateTime` values so that time zone adjustment rules are applied to the result. However, `System.DateTimeOffset` values can be used just as easily. The following example illustrates how the code in the original example might be adapted to use `System.DateTimeOffset` instead of `System.DateTime` values.

```csharp
using System;

public struct TimeZoneTime2
{
    public TimeZoneInfo TimeZone;
    public DateTimeOffset Time;

    public TimeZoneTime2(TimeZoneInfo tz, DateTimeOffset time)
    {
        ArgumentNullException.ThrowIfNull(tz);

        TimeZone = tz;
        Time = time;
    }

    public TimeZoneTime2 AddTime(TimeSpan interval)
    {
        // Convert time to UTC
        DateTimeOffset utcTime = TimeZoneInfo.ConvertTime(Time, TimeZoneInfo.Utc);
        // Add time interval to time
        utcTime = utcTime.Add(interval);
        // Convert time back to time in time zone
        return new TimeZoneTime2(TimeZone, TimeZoneInfo.ConvertTime(utcTime, TimeZone));
    }
}

public class TimeArithmetic2
{
    public const string tzName = "Central Standard Time";

    public static void Main()
    {
        try
        {
            TimeZoneTime2 cstTime1, cstTime2;

            TimeZoneInfo cst = TimeZoneInfo.FindSystemTimeZoneById(tzName);
            DateTime time1 = new(2008, 3, 9, 1, 30, 0);
            TimeSpan twoAndAHalfHours = new(2, 30, 0);

            cstTime1 = new TimeZoneTime2(cst,
                           new DateTimeOffset(time1, cst.GetUtcOffset(time1)));
            cstTime2 = cstTime1.AddTime(twoAndAHalfHours);
            Console.WriteLine($"{cstTime1.Time} + {twoAndAHalfHours.ToString()} hours = {cstTime2.Time}");
        }
        catch
        {
            Console.WriteLine($"Unable to find {tzName}.");
        }
    }
}

// Define a structure for DateTime values for internal use only
internal struct TimeWithTimeZone
{
    TimeZoneInfo TimeZone;
    DateTime Time;
}
```

Note that if this addition is simply performed on the `System.DateTimeOffset` value without first converting it to UTC, the result reflects the correct point in time but its offset does not reflect that of the designated time zone for that time.

## See also

- Dates, times, and time zones
- Performing arithmetic operations with dates and times
