---
title: "Converting times between time zones (part 2 of 11)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/converting-between-time-zones.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Converting times between time zones (part 2 of 11)

## Converting to Coordinated Universal Time

Coordinated Universal Time (UTC) is a high-precision, atomic time standard. The world's time zones are expressed as positive or negative offsets from UTC. Thus, UTC provides a time-zone free or time-zone neutral time. The use of UTC is recommended when a date and time's portability across computers is important. For details and other best practices using dates and times, see Coding best practices using DateTime in the .NET Framework. Converting individual time zones to UTC makes time comparisons easy.

> **Note:**
> You can also serialize a `System.DateTimeOffset` structure to represent a single point in time unambiguously. Because `System.DateTimeOffset` objects store a date and time value along with its offset from UTC, they always represent a particular point in time in relation to UTC.

The easiest way to convert a time to UTC is to call the `static` (`Shared` in Visual Basic) `System.TimeZoneInfo.ConvertTimeToUtc(System.DateTime)` method. The exact conversion performed by the method depends on the value of the `dateTime` parameter's `System.DateTime.Kind` property, as the following table shows:

| `DateTime.Kind`            | Conversion                                                                     |
| -------------------------- | ------------------------------------------------------------------------------ |
| `DateTimeKind.Local`       | Converts local time to UTC.                                                    |
| `DateTimeKind.Unspecified` | Assumes the `dateTime` parameter is local time and converts local time to UTC. |
| `DateTimeKind.Utc`         | Returns the `dateTime` parameter unchanged.                                    |

The following code converts the current local time to UTC and displays the result to the console:
