---
title: "How to: Let users resolve ambiguous times (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/let-users-resolve-ambiguous-times.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Let users resolve ambiguous times

An ambiguous time is a time that maps to more than one Coordinated Universal Time (UTC). It occurs when the clock time is adjusted back in time, such as during the transition from a time zone's daylight saving time to its standard time. When handling an ambiguous time, you can do one of the following:

- If the ambiguous time is an item of data entered by the user, you can leave it to the user to resolve the ambiguity.

- Make an assumption about how the time maps to UTC. For example, you can assume that an ambiguous time is always expressed in the time zone's standard time.

This topic shows how to let a user resolve an ambiguous time.

### To let a user resolve an ambiguous time

1. Get the date and time input by the user.

2. Call the `System.TimeZoneInfo.IsAmbiguousTime*` method to determine whether the time is ambiguous.

3. If the time is ambiguous, call the `System.TimeZoneInfo.GetAmbiguousTimeOffsets*` method to retrieve an array of `System.TimeSpan` objects. Each element in the array contains a UTC offset that the ambiguous time can map to.

4. Let the user select the desired offset.

5. Get the UTC date and time by subtracting the offset selected by the user from the local time.

6. Call the `static` (`Shared` in Visual Basic .NET) `System.DateTime.SpecifyKind*` method to set the UTC date and time value's `System.DateTime.Kind` property to `System.DateTimeKind.Utc`.
