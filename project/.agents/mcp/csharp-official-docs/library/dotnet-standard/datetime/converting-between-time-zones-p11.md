---
title: "Converting times between time zones (part 11 of 11)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/converting-between-time-zones.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Converting times between time zones (part 11 of 11)

## Converting DateTimeOffset values

Date and time values represented by `System.DateTimeOffset` objects aren't fully time-zone aware because the object is disassociated from its time zone at the time it's instantiated. However, in many cases, an application simply needs to convert a date and time based on two different offsets from UTC rather than on time in particular time zones. To perform this conversion, you can call the current instance's `System.DateTimeOffset.ToOffset*` method. The method's single parameter is the offset of the new date and time value the method will return.

For example, if the date and time of a user request for a web page is known and is serialized as a string in the format MM/dd/yyyy hh:mm:ss zzzz, the following `ReturnTimeOnServer` method converts this date and time value to the date and time on the web server:

```csharp
﻿using System;
using System.Globalization;

public class TimeConversions
{
   public static void Main()
   {
      TimeConversions tc = new TimeConversions();
      Console.WriteLine(tc.ReturnTimeOnServer("9/1/2007 5:32:07 -05:00"));
   }

   public DateTimeOffset ReturnTimeOnServer(string clientString)
   {
      string format = @"M/d/yyyy H:m:s zzz";
      TimeSpan serverOffset = TimeZoneInfo.Local.GetUtcOffset(DateTimeOffset.Now);

      try
      {
         DateTimeOffset clientTime = DateTimeOffset.ParseExact(clientString, format, CultureInfo.InvariantCulture);
         DateTimeOffset serverTime = clientTime.ToOffset(serverOffset);
         return serverTime;
      }
      catch (FormatException)
      {
         return DateTimeOffset.MinValue;
      }
   }
}
```

If the method passes the string "9/1/2007 5:32:07 -05:00," which represents the date and time in a time zone five hours earlier than UTC, it returns "9/1/2007 3:32:07 AM -07:00" for a server located in the U.S. Pacific Standard Time zone.

The `System.TimeZoneInfo` class also includes an overload of the `System.TimeZoneInfo.ConvertTime(System.DateTimeOffset,System.TimeZoneInfo)` method that performs time zone conversions with `System.DateTimeOffset.ToOffset(System.TimeSpan)` values. The method's parameters are a `System.DateTimeOffset` value and a reference to the time zone to which the time is to be converted. The method call returns a `System.DateTimeOffset` value. For example, the `ReturnTimeOnServer` method in the previous example could be rewritten as follows to call the `System.TimeZoneInfo.ConvertTime(System.DateTimeOffset,System.TimeZoneInfo)` method.

```csharp
﻿using System;
using System.Globalization;

public class TimeConversions
{
   public static void Main()
   {
      TimeConversions tc = new TimeConversions();
      Console.WriteLine(tc.ReturnTimeOnServer("9/1/2007 5:32:07 -05:00"));
   }

   public DateTimeOffset ReturnTimeOnServer(string clientString)
   {
      string format = @"M/d/yyyy H:m:s zzz";

      try
      {
         DateTimeOffset clientTime = DateTimeOffset.ParseExact(clientString, format,
                                     CultureInfo.InvariantCulture);
         DateTimeOffset serverTime = TimeZoneInfo.ConvertTime(clientTime,
                                     TimeZoneInfo.Local);
         return serverTime;
      }
      catch (FormatException)
      {
         return DateTimeOffset.MinValue;
      }
   }
}
```

## See also

- `System.TimeZoneInfo`
- Dates, times, and time zones
- Finding the time zones defined on a local system
