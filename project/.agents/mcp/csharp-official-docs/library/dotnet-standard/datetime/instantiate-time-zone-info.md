---
title: "How to: Obtain a TimeZoneInfo object (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/instantiate-time-zone-info.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Obtain a TimeZoneInfo object

The most common way to obtain a `System.TimeZoneInfo` object is to retrieve information about it from the registry. To obtain the object, call the `static` (`Shared` in Visual Basic) `System.TimeZoneInfo.FindSystemTimeZoneById*` method, which looks in the registry. Handle any exceptions thrown by the method, particularly the `System.TimeZoneNotFoundException` that's thrown if the time zone isn't defined in the registry.

> **Note:**
> Starting in .NET 8, `System.TimeZoneInfo.FindSystemTimeZoneById*` returns a cached `System.TimeZoneInfo` object instead of instantiating a new object. For more information, see FindSystemTimeZoneById doesn't return new object.
