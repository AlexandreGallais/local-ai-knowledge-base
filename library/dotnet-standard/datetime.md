---
title: "Dates, times, and time zones"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Dates, times, and time zones

.NET provides types that represent dates, times, and time zones. This article describes those types.

In addition to the basic `System.DateTime` structure, .NET provides the following classes that support working with time zones:

* `System.TimeZoneInfo`

  Use this class to work with any time zone that is predefined on a system, to create new time zones, and to easily convert dates and times from one time zone to another. For new development, use the `System.TimeZoneInfo` class instead of the `System.TimeZone` class.

* `System.DateTimeOffset`

  Use this structure to work with dates and times whose offset (or difference) from UTC is known. The `System.DateTimeOffset` structure combines a date and time value with that time's offset from UTC. Because of its relationship to UTC, an individual date and time value unambiguously identifies a single point in time. This makes a `System.DateTimeOffset` value more portable from one computer to another than a `System.DateTime` value.

The following classes to support working with time:

* `System.TimeSpan`

  Use this structure to represents a time interval, such as an elapsed amount of time or the difference between two dates.

* `System.TimeOnly`

  Use this structure to represent a time without a date. The time represents the hours, minutes, and seconds of a non-specific day. `TimeOnly` has a range of `00:00:00.0000000` to `23:59:59.9999999`. This type can be used to replace `DateTime` and `TimeSpan` types in your code when you used those types to represent a time. For more information, see How to use the DateOnly and TimeOnly structures.

  > **Important:**
  > `System.TimeOnly` isn't available for .NET Framework.

* `System.TimeProvider`

  This is a base class that provides an abstraction of time. A common way to check the current time is by using `DateTime.UtcNow` or `DateTimeOffset.UtcNow`. However, these types don't provide any control over what's considered "now." Why would you want to control that? Testability. For example, consider you're writing an event tracking application that provides reminders 1 day before the event. The app's logic is to check the event time every hour, and alert the user once it's 24 hours before the event. As you write your tests for the app, you would provide your own type that wraps `DateTimeOffset.UtcNow` to test this logic, but now .NET provides this abstraction class for you.

  For more information, see What is TimeProvider.

  The `TimeProvider` type is included in .NET.

  For .NET Framework and .NET Standard, `TimeProvider` is provided by the **Microsoft.Bcl.TimeProvider** NuGet package.

The following classes to support working with dates:

* `System.DateOnly`

  Use this structure when working with a value that only represents a date. The date represents the entire day, from the start of the day to the end. `DateOnly` has a range of `0001-01-01` through `9999-12-31`. And, this type represents the month, day, and year combination without a specific time. If you previously used a `DateTime` type in your code to represent a date that disregarded the time, use this type in its place. For more information, see How to use the DateOnly and TimeOnly structures.

  > **Important:**
  > `System.DateOnly` isn't available for .NET Framework.

The next section provides the information that you need to work with time zones and to create time zone-aware applications that can convert dates and times from one time zone to another.

## In this section

Time zone overview\
Discusses the terminology, concepts, and issues involved in creating time zone-aware applications.

Choosing between DateTime, DateTimeOffset, TimeSpan, and TimeZoneInfo\
Discusses when to use the `System.DateTime`, `System.DateTimeOffset`, and `System.TimeZoneInfo` types when working with date and time data.

Finding the time zones defined on a local system\
Describes how to enumerate the time zones found on a local system.

How to: Enumerate time zones present on a computer\
Provides examples that enumerate the time zones defined in a computer's registry and that let users select a predefined time zone from a list.

How to: Access the predefined UTC and local time zone objects\
Describes how to access Coordinated Universal Time and the local time zone.

How to: Instantiate a TimeZoneInfo object\
Describes how to instantiate a `System.TimeZoneInfo` object from the local system registry.

Instantiating a DateTimeOffset object\
Discusses the ways in which a `System.DateTimeOffset` object can be instantiated, and the ways in which a `System.DateTime` value can be converted to a `System.DateTimeOffset` value.

How to: Create time zones without adjustment rules\
Describes how to create a custom time zone that does not support the transition to and from daylight saving time.

How to: Create time zones with adjustment rules\
Describes how to create a custom time zone that supports one or more transitions to and from daylight saving time.

Saving and restoring time zones\
Describes `System.TimeZoneInfo` support for serialization and deserialization of time zone data and illustrates some of the scenarios in which these features can be used.

How to: Save time zones to an embedded resource\
Describes how to create a custom time zone and save its information in a resource file.

How to: Restore time zones from an embedded resource\
Describes how to instantiate custom time zones that have been saved to an embedded resource file.

Performing arithmetic operations with dates and times\
Discusses the issues involved in adding, subtracting, and comparing `System.DateTime` and `System.DateTimeOffset` values.

How to: Use time zones in date and time arithmetic\
Discusses how to perform date and time arithmetic that reflects a time zone's adjustment rules.

Converting between DateTime and DateTimeOffset\
Describes how to convert between `System.DateTime` and `System.DateTimeOffset` values.

Converting times between time zones\
Describes how to convert times from one time zone to another.

How to: Resolve ambiguous times\
Describes how to resolve an ambiguous time by mapping it to the time zone's standard time.

How to: Let users resolve ambiguous times\
Describes how to let a user determine the mapping between an ambiguous local time and Coordinated Universal Time.

## Reference

`System.TimeZoneInfo`
