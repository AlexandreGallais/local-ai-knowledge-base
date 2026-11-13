---
title: "How to: Create time zones without adjustment rules (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/create-time-zones-without-adjustment-rules.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Create time zones without adjustment rules

The precise time zone information that is required by an application may not be present on a particular system for several reasons:

- The time zone has never been defined in the local system's registry.

- Data about the time zone has been modified or removed from the registry.

- The time zone exists but does not have accurate information about time zone adjustments for a particular historic period.

In these cases, you can call the `System.TimeZoneInfo.CreateCustomTimeZone*` method to define the time zone required by your application. You can use the overloads of this method to create a time zone with or without adjustment rules. If the time zone supports daylight saving time, you can define adjustments with either fixed or floating adjustment rules. (For definitions of these terms, see the "Time Zone Terminology" section in Time zone overview.)

> **Important:**
> Custom time zones created by calling the `System.TimeZoneInfo.CreateCustomTimeZone*` method are not added to the registry. Instead, they can be accessed only through the object reference returned by the `System.TimeZoneInfo.CreateCustomTimeZone*` method call.

This topic shows how to create a time zone without adjustment rules. To create a time zone that supports daylight saving time adjustment rules, see How to: Create time zones with adjustment rules.

### To create a time zone without adjustment rules

1. Define the time zone's display name.

   The display name follows a fairly standard format in which the time zone's offset from Coordinated Universal Time (UTC) is enclosed in parentheses and is followed by a string that identifies the time zone, one or more of the cities in the time zone, or one or more of the countries or regions in the time zone.

2. Define the name of the time zone's standard time. Typically, this string is also used as the time zone's identifier.

3. If you want to use a different identifier than the time zone's standard name, define the time zone identifier.

4. Instantiate a `System.TimeSpan` object that defines the time zone's offset from UTC. Time zones with times that are later than UTC have a positive offset. Time zones with times that are earlier than UTC have a negative offset.

5. Call the `System.TimeZoneInfo.CreateCustomTimeZone(System.String,System.TimeSpan,System.String,System.String)` method to instantiate the new time zone.
