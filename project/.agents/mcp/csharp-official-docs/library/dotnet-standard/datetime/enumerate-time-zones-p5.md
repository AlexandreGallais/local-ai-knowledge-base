---
title: "How to: Enumerate time zones present on a computer (part 5 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/enumerate-time-zones.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Enumerate time zones present on a computer (part 5 of 5)

> **Note:**
> Because list controls call an object's `ToString` method, you can assign a collection of `System.TimeZoneInfo` objects to the control, have the control display a meaningful name for each object, and retrieve the `System.TimeZoneInfo` object that the user has selected. This eliminates the need to extract a string for each object in the collection, assign the string to a collection that is in turn assigned to the control's `DataSource` property, retrieve the string the user has selected, and then use this string to extract the object that it describes.

## Compiling the code

This example requires:

- That the following namespaces be imported:

  `System` (in C# code)

  `System.Collections.ObjectModel`

## See also

- Dates, times, and time zones
- How to: Save time zones to an embedded resource
- How to: Restore time zones from an embedded resource
