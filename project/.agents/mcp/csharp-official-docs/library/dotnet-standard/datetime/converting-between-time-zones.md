---
title: "Converting times between time zones (part 1 of 11)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/converting-between-time-zones.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Converting times between time zones

It's becoming increasingly important for any application that works with dates and times to handle differences between time zones. An application can no longer assume that all times can be expressed in the local time, which is the time available from the `System.DateTime` structure. For example, a web page that displays the current time in the eastern part of the United States will lack credibility to a customer in eastern Asia. This article explains how to convert times from one time zone to another and convert `System.DateTimeOffset` values that have limited time zone awareness.
