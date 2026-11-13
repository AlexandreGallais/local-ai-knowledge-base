---
title: "How to: Access the predefined UTC and local time zone objects (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/access-utc-and-local.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Access the predefined UTC and local time zone objects

The `System.TimeZoneInfo` class provides two properties, `System.TimeZoneInfo.Utc*` and `System.TimeZoneInfo.Local*`, that give your code access to predefined time zone objects. This topic discusses how to access the `System.TimeZoneInfo` objects returned by those properties.

### To access the Coordinated Universal Time (UTC) TimeZoneInfo object

1. Use the `static` (`Shared` in Visual Basic) `System.TimeZoneInfo.Utc` property to access Coordinated Universal Time.

2. Rather than assigning the `System.TimeZoneInfo` object returned by the property to an object variable, continue to access Coordinated Universal Time through the `System.TimeZoneInfo.Utc` property.

### To access the local time zone

1. Use the `static` (`Shared` in Visual Basic) `System.TimeZoneInfo.Local` property to access the local system time zone.

2. Rather than assigning the `System.TimeZoneInfo` object returned by the property to an object variable, continue to access the local time zone through the `System.TimeZoneInfo.Local` property.
