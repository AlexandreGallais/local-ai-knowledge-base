---
title: "How to: Enumerate time zones present on a computer (part 1 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/enumerate-time-zones.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Enumerate time zones present on a computer

Successfully working with a designated time zone requires that information about that time zone be available to the system. The Windows XP and Windows Vista operating systems store this information in the registry. However, although the total number of time zones that exist throughout the world is large, the registry contains information about only a subset of them. In addition, the registry itself is a dynamic structure whose contents are subject to both deliberate and accidental change. As a result, an application cannot always assume that a particular time zone is defined and available on a system. The first step for many applications that use time zone information applications is to determine whether required time zones are available on the local system, or to give the user a list of time zones from which to select. This requires that an application enumerate the time zones defined on a local system.

> **Note:**
> If an application relies on the presence of a particular time zone that may not be defined on a local system, the application can ensure its presence by serializing and deserializing information about the time zone. The time zone can then be added to a list control so that the application user can select it. For details, see How to: Save Time Zones to an Embedded Resource and How to: Restore time zones from an embedded resource.
