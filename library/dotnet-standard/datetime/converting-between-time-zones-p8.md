---
title: "Converting times between time zones (part 8 of 11)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/converting-between-time-zones.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Converting times between time zones (part 8 of 11)

## Converting UTC to local time

To convert UTC to local time, call the `System.DateTime.ToLocalTime*` method of the `System.DateTime` object whose time you want to convert. The exact behavior of the method depends on the value of the object's `System.DateTime.Kind` property, as the following table shows:

| `DateTime.Kind`            | Conversion                                                                               |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| `DateTimeKind.Local`       | Returns the `System.DateTime` value unchanged.                                      |
| `DateTimeKind.Unspecified` | Assumes that the `System.DateTime` value is UTC and converts the UTC to local time. |
| `DateTimeKind.Utc`         | Converts the `System.DateTime` value to local time.                                 |

> **Note:**
> The `System.TimeZone.ToLocalTime*` method behaves identically to the `DateTime.ToLocalTime` method. It takes a single parameter, which is the date and time value, to convert.

You can also convert the time in any designated time zone to local time by using the `static` (`Shared` in Visual Basic) `System.TimeZoneInfo.ConvertTime*` method. This technique is discussed in the next section.
