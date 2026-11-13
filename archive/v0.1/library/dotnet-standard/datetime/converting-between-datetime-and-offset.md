---
title: "Converting between DateTime and DateTimeOffset (part 1 of 13)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/converting-between-datetime-and-offset.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Converting between DateTime and DateTimeOffset

Although the `System.DateTimeOffset` structure provides a greater degree of time zone awareness than the `System.DateTime` structure, `System.DateTime` parameters are used more commonly in method calls. Because of this approach, the ability to convert `System.DateTimeOffset` values to `System.DateTime` values and vice versa is important. This article shows how to perform these conversions in a way that preserves as much time zone information as possible.

> **Note:**
> Both the `System.DateTime` and the `System.DateTimeOffset` types have some limitations when representing times in time zones. With its `System.DateTime.Kind` property, `System.DateTime` is able to reflect only Coordinated Universal Time (UTC) and the system's local time zone. `System.DateTimeOffset` reflects a time's offset from UTC, but it doesn't reflect the actual time zone to which that offset belongs. For more information about time values and support for time zones, see Choosing Between DateTime, DateTimeOffset, TimeSpan, and TimeZoneInfo.
