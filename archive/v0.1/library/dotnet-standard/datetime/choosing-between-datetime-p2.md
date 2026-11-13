---
title: "Compare types related to date and time (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/choosing-between-datetime.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Compare types related to date and time (part 2 of 2)

## The TimeSpan structure

The `System.TimeSpan` structure represents a time interval. Its two typical uses are:

- Reflecting the time interval between two date and time values. For example, subtracting one `System.DateTime` value from another returns a `System.TimeSpan` value.
- Measuring elapsed time. For example, the `System.Diagnostics.Stopwatch.Elapsed` property returns a `System.TimeSpan` value that reflects the time interval that has elapsed since the call to one of the `System.Diagnostics.Stopwatch` methods that begins to measure elapsed time.

A `System.TimeSpan` value can also be used as a replacement for a `System.DateTime` value when that value reflects a time without reference to a particular day. This usage is similar to the `System.DateTime.TimeOfDay*` and `System.DateTimeOffset.TimeOfDay` properties, which return a `System.TimeSpan` value that represents the time without reference to a date. For example, the `System.TimeSpan` structure can be used to reflect a store's daily opening or closing time, or it can be used to represent the time at which any regular event occurs.

The following example defines a `StoreInfo` structure that includes `System.TimeSpan` objects for store opening and closing times, as well as a `System.TimeZoneInfo` object that represents the store's time zone. The structure also includes two methods, `IsOpenNow` and `IsOpenAt`, that indicates whether the store is open at a time specified by the user, who is assumed to be in the local time zone.

```csharp
using System;

public struct StoreInfo
{
   public String store;
   public TimeZoneInfo tz;
   public TimeSpan open;
   public TimeSpan close;

   public bool IsOpenNow()
   {
      return IsOpenAt(DateTime.Now.TimeOfDay);
   }

   public bool IsOpenAt(TimeSpan time)
   {
      TimeZoneInfo local = TimeZoneInfo.Local;
      TimeSpan offset = TimeZoneInfo.Local.BaseUtcOffset;

      // Is the store in the same time zone?
      if (tz.Equals(local)) {
         return time >= open && time <= close;
      }
      else {
         TimeSpan delta = TimeSpan.Zero;
         TimeSpan storeDelta = TimeSpan.Zero;

         // Is it daylight saving time in either time zone?
         if (local.IsDaylightSavingTime(DateTime.Now.Date + time))
            delta = local.GetAdjustmentRules()[local.GetAdjustmentRules().Length - 1].DaylightDelta;

         if (tz.IsDaylightSavingTime(TimeZoneInfo.ConvertTime(DateTime.Now.Date + time, local, tz)))
            storeDelta = tz.GetAdjustmentRules()[tz.GetAdjustmentRules().Length - 1].DaylightDelta;

         TimeSpan comparisonTime = time + (offset - tz.BaseUtcOffset).Negate() + (delta - storeDelta).Negate();
         return comparisonTime >= open && comparisonTime <= close;
      }
   }
}

public class Example
{
   public static void Main()
   {
      // Instantiate a StoreInfo object.
      var store103 = new StoreInfo();
      store103.store = "Store #103";
      store103.tz = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
      // Store opens at 8:00.
      store103.open = new TimeSpan(8, 0, 0);
      // Store closes at 9:30.
      store103.close = new TimeSpan(21, 30, 0);

      Console.WriteLine($"Store is open now at {DateTime.Now.TimeOfDay}: {store103.IsOpenNow()}");
      TimeSpan[] times = { new TimeSpan(8, 0, 0), new TimeSpan(21, 0, 0),
                           new TimeSpan(4, 59, 0), new TimeSpan(18, 31, 0) };
      foreach (var time in times)
         Console.WriteLine($"Store is open at {time}: {store103.IsOpenAt(time)}");
   }
}
// The example displays the following output:
//       Store is open now at 15:29:01.6129911: True
//       Store is open at 08:00:00: True
//       Store is open at 21:00:00: True
//       Store is open at 04:59:00: False
//       Store is open at 18:31:00: True
```

The `StoreInfo` structure can then be used by client code like the following.

```csharp
using System;

public struct StoreInfo
{
   public String store;
   public TimeZoneInfo tz;
   public TimeSpan open;
   public TimeSpan close;

   public bool IsOpenNow()
   {
      return IsOpenAt(DateTime.Now.TimeOfDay);
   }

   public bool IsOpenAt(TimeSpan time)
   {
      TimeZoneInfo local = TimeZoneInfo.Local;
      TimeSpan offset = TimeZoneInfo.Local.BaseUtcOffset;

      // Is the store in the same time zone?
      if (tz.Equals(local)) {
         return time >= open && time <= close;
      }
      else {
         TimeSpan delta = TimeSpan.Zero;
         TimeSpan storeDelta = TimeSpan.Zero;

         // Is it daylight saving time in either time zone?
         if (local.IsDaylightSavingTime(DateTime.Now.Date + time))
            delta = local.GetAdjustmentRules()[local.GetAdjustmentRules().Length - 1].DaylightDelta;

         if (tz.IsDaylightSavingTime(TimeZoneInfo.ConvertTime(DateTime.Now.Date + time, local, tz)))
            storeDelta = tz.GetAdjustmentRules()[tz.GetAdjustmentRules().Length - 1].DaylightDelta;

         TimeSpan comparisonTime = time + (offset - tz.BaseUtcOffset).Negate() + (delta - storeDelta).Negate();
         return comparisonTime >= open && comparisonTime <= close;
      }
   }
}

public class Example
{
   public static void Main()
   {
      // Instantiate a StoreInfo object.
      var store103 = new StoreInfo();
      store103.store = "Store #103";
      store103.tz = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
      // Store opens at 8:00.
      store103.open = new TimeSpan(8, 0, 0);
      // Store closes at 9:30.
      store103.close = new TimeSpan(21, 30, 0);

      Console.WriteLine($"Store is open now at {DateTime.Now.TimeOfDay}: {store103.IsOpenNow()}");
      TimeSpan[] times = { new TimeSpan(8, 0, 0), new TimeSpan(21, 0, 0),
                           new TimeSpan(4, 59, 0), new TimeSpan(18, 31, 0) };
      foreach (var time in times)
         Console.WriteLine($"Store is open at {time}: {store103.IsOpenAt(time)}");
   }
}
// The example displays the following output:
//       Store is open now at 15:29:01.6129911: True
//       Store is open at 08:00:00: True
//       Store is open at 21:00:00: True
//       Store is open at 04:59:00: False
//       Store is open at 18:31:00: True
```

## The TimeOnly structure

The `System.TimeOnly` structure represents a time-of-day value, such as a daily alarm clock or what time you eat lunch each day. `TimeOnly` is limited to the range of **00:00:00.0000000** - **23:59:59.9999999**, a specific time of day.

Prior to the `TimeOnly` type being introduced, programmers typically used either the `System.DateTime` type or the `System.TimeSpan` type to represent a specific time. However, using these structures to simulate a time without a date may introduce some problems, which `TimeOnly` solves:

- `TimeSpan` represents elapsed time, such as time measured with a stopwatch. The upper range is more than 29,000 years, and its value can be negative to indicate moving backwards in time. A negative `TimeSpan` doesn't indicate a specific time of the day.
- If `TimeSpan` is used as a time of day, there's a risk that it could be manipulated to a value outside of the 24-hour day. `TimeOnly` doesn't have this risk. For example, if an employee's work shift starts at 18:00 and lasts for 8 hours, adding 8 hours to the `TimeOnly` structure rolls over to 2:00.
- Using `DateTime` for a time of day requires that an arbitrary date be associated with the time, and then later disregarded. It's common practice to choose `DateTime.MinValue` (0001-01-01) as the date, however, if hours are subtracted from the `DateTime` value, an `OutOfRange` exception might occur. `TimeOnly` doesn't have this problem as the time rolls forwards and backwards around the 24-hour timeframe.
- Serializing a `DateTime` structure includes the date component, which may obscure the intent of the data. Also, `TimeOnly` serializes less data.

For more information about `TimeOnly`, see How to use the DateOnly and TimeOnly structures.

> **Important:**
> `TimeOnly` isn't available for .NET Framework.

## The TimeZoneInfo class

The `System.TimeZoneInfo` class represents any of the Earth's time zones, and enables the conversion of any date and time in one time zone to its equivalent in another time zone. The `System.TimeZoneInfo` class makes it possible to work with dates and times so that any date and time value unambiguously identifies a single point in time. The `System.TimeZoneInfo` class is also extensible. Although it depends on time zone information provided for Windows systems and defined in the registry, it supports the creation of custom time zones. It also supports the serialization and deserialization of time zone information.

In some cases, taking full advantage of the `System.TimeZoneInfo` class may require further development work. If date and time values are not tightly coupled with the time zones to which they belong, further work is required. Unless your application provides some mechanism for linking a date and time with its associated time zone, it's easy for a particular date and time value to become disassociated from its time zone. One method of linking this information is to define a class or structure that contains both the date and time value and its associated time zone object.

To take advantage of time zone support in .NET, you must know the time zone to which a date and time value belongs when that date and time object is instantiated. The time zone is often not known, particularly in web or network apps.

## See also

- Dates, times, and time zones
