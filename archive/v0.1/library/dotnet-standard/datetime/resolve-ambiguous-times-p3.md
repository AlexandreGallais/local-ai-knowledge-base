---
title: "How to: Resolve ambiguous times (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/resolve-ambiguous-times.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Resolve ambiguous times (part 3 of 3)

In this example, all references to the local time zone are made through the `System.TimeZoneInfo.Local` property; the local time zone is never assigned to an object variable. This is a recommended practice because a call to the `System.TimeZoneInfo.ClearCachedData*` method invalidates any objects that the local time zone is assigned to.

## See also

- Dates, times, and time zones
- How to: Let users resolve ambiguous times
