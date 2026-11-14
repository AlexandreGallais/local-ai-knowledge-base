---
title: "How to: Resolve ambiguous times (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/resolve-ambiguous-times.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Resolve ambiguous times

An ambiguous time is a time that maps to more than one Coordinated Universal Time (UTC). It occurs when the clock time is adjusted back in time, such as during the transition from a time zone's daylight saving time to its standard time. When handling an ambiguous time, you can do one of the following:

- Make an assumption about how the time maps to UTC. For example, you can assume that an ambiguous time is always expressed in the time zone's standard time.

- If the ambiguous time is an item of data entered by the user, you can leave it to the user to resolve the ambiguity.

This topic shows how to resolve an ambiguous time by assuming that it represents the time zone's standard time.

### To map an ambiguous time to a time zone's standard time

1. Call the `System.TimeZoneInfo.IsAmbiguousTime*` method to determine whether the time is ambiguous.

2. If the time is ambiguous, subtract the time from the `System.TimeSpan` object returned by the time zone's `System.TimeZoneInfo.BaseUtcOffset` property.

3. Call the `static` (`Shared` in Visual Basic .NET) `System.DateTime.SpecifyKind*` method to set the UTC date and time value's `System.DateTime.Kind` property to `System.DateTimeKind.Utc`.
