---
title: "Converting times between time zones (part 9 of 11)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/converting-between-time-zones.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Converting times between time zones (part 9 of 11)

## Converting between any two time zones

You can convert between any two time zones by using either of the following two `static` (`Shared` in Visual Basic) methods of the `System.TimeZoneInfo` class:

- `System.TimeZoneInfo.ConvertTime*`

  This method's parameters are the date and time value to convert, a `TimeZoneInfo` object that represents the time zone of the date and time value, and a `TimeZoneInfo` object that represents the time zone to convert the date and time value to.

- `System.TimeZoneInfo.ConvertTimeBySystemTimeZoneId*`

  This method's parameters are the date and time value to convert, the identifier of the date and time value's time zone, and the identifier of the time zone to convert the date and time value to.

Both methods require that the `System.DateTime.Kind` property of the date and time value to convert and the `System.TimeZoneInfo` object or time zone identifier that represents its time zone correspond to one another. Otherwise, an `System.ArgumentException` is thrown. For example, if the `Kind` property of the date and time value is `DateTimeKind.Local`, an exception is thrown if the `TimeZoneInfo` object passed as a parameter to the method isn't equal to `TimeZoneInfo.Local`. An exception is also thrown if the identifier passed as a parameter to the method isn't equal to `TimeZoneInfo.Local.Id`.

The following example uses the `System.TimeZoneInfo.ConvertTime*` method to convert from Hawaiian Standard Time to local time:
