---
title: "Converting times between time zones (part 6 of 11)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/converting-between-time-zones.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Converting times between time zones (part 6 of 11)

```csharp
        Console.WriteLine($"Universal time: {universalTime}");
        Console.WriteLine($"{otherTime} = {universalTime}: {universalTime.Equals(otherTime)}");
        Console.WriteLine($"{otherTime} exactly equals {universalTime}: {universalTime.EqualsExact(otherTime)}");
        Console.WriteLine();

        // The example produces the following output to the console:
        //    Local time: 6/15/2007 12:00:00 PM -07:00
        //
        //    Other time: 6/15/2007 7:00:00 PM +00:00
        //    6/15/2007 12:00:00 PM -07:00 = 6/15/2007 7:00:00 PM +00:00: True
        //    6/15/2007 12:00:00 PM -07:00 exactly equals 6/15/2007 7:00:00 PM +00:00: False
        //
        //    Universal time: 6/15/2007 7:00:00 PM +00:00
        //    6/15/2007 7:00:00 PM +00:00 = 6/15/2007 7:00:00 PM +00:00: True
        //    6/15/2007 7:00:00 PM +00:00 exactly equals 6/15/2007 7:00:00 PM +00:00: True
    }
}
```
