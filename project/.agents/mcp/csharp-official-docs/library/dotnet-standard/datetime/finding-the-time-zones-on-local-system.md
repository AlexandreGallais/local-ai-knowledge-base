---
title: "Finding the time zones defined on a local system"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/finding-the-time-zones-on-local-system.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Finding the time zones defined on a local system

The `System.TimeZoneInfo` class does not expose a public constructor. As a result, the `new` keyword cannot be used to create a new `System.TimeZoneInfo` object. Instead, `System.TimeZoneInfo` objects are instantiated either by retrieving information on predefined time zones from the registry or by creating a custom time zone. This topic discusses instantiating a time zone from data stored in the registry. In addition, `static` (`shared` in Visual Basic) properties of the `System.TimeZoneInfo` class provide access to Coordinated Universal Time (UTC) and the local time zone.

> **Note:**
> For time zones that are not defined in the registry, you can create custom time zones by calling the overloads of the `System.TimeZoneInfo.CreateCustomTimeZone*` method. Creating a custom time zone is discussed in the How to: Create time zones without adjustment rules and How to: Create time zones with adjustment rules topics. In addition, you can instantiate a `System.TimeZoneInfo` object by restoring it from a serialized string with the `System.TimeZoneInfo.FromSerializedString*` method. Serializing and deserializing a `System.TimeZoneInfo` object is discussed in the How to: Save time zones to an embedded resource and How to: Restore Time Zones from an Embedded Resource topics.

## Accessing individual time zones

The `System.TimeZoneInfo` class provides two predefined time zone objects that represent the UTC time and the local time zone. They are available from the `System.TimeZoneInfo.Utc*` and `System.TimeZoneInfo.Local` properties, respectively. For instructions on accessing the UTC or local time zones, see How to: Access the predefined UTC and local time zone objects.

You can also instantiate a `System.TimeZoneInfo` object that represents any time zone defined in the registry. For instructions on instantiating a specific time zone object, see How to: Instantiate a TimeZoneInfo object.

## Time zone identifiers

The time zone identifier is a key field that uniquely identifies the time zone. While most keys are relatively short, the time zone identifier is comparatively long. In most cases, its value corresponds to the `System.TimeZoneInfo.StandardName` property, which is used to provide the name of the time zone's standard time. However, there are exceptions. The best way to make sure that you supply a valid identifier is to enumerate the time zones available on your system and note their associated identifiers.

## See also

- Dates, times, and time zones
- How to: Access the predefined UTC and local time zone objects
- How to: Instantiate a TimeZoneInfo object
- Converting times between time zones
