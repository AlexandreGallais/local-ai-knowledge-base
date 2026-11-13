---
title: "How to: Obtain a TimeZoneInfo object (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/instantiate-time-zone-info.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Obtain a TimeZoneInfo object (part 3 of 3)

The `System.TimeZoneInfo.FindSystemTimeZoneById*` method's single parameter is the identifier of the time zone that you want to retrieve, which corresponds to the object's `System.TimeZoneInfo.Id` property. The time zone identifier is a key field that uniquely identifies the time zone. While most keys are relatively short, the time zone identifier is comparatively long. In most cases, its value corresponds to the `System.TimeZoneInfo.StandardName` property of a `System.TimeZoneInfo` object, which is used to provide the name of the time zone's standard time. However, there are exceptions. The best way to make sure that you supply a valid identifier is to enumerate the time zones available on your system and note the identifiers of the time zones present on them. For an illustration, see How to: Enumerate time zones present on a computer. The Finding the time zones defined on a local system article also contains a list of selected time-zone identifiers.

If the time zone is found, the method returns its `System.TimeZoneInfo` object. If the time zone is not found, the method throws a `System.TimeZoneNotFoundException`. If the time zone is found but its data is corrupted or incomplete, the method throws an `System.InvalidTimeZoneException`.

If your application relies on a time zone that must be present, you should first call the `System.TimeZoneInfo.FindSystemTimeZoneById*` method to retrieve the time zone information from the registry. If the method call fails, your exception handler should then either create a new instance of the time zone or re-create it by deserializing a serialized `System.TimeZoneInfo` object. See How to: Restore time zones from an embedded resource for an example.

## See also

- Dates, times, and time zones
- Finding the time zones defined on a local system
- How to: Access the predefined UTC and local time zone objects
