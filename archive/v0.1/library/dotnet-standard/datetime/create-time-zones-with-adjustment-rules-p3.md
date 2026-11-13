---
title: "How to: Create time zones with adjustment rules (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/create-time-zones-with-adjustment-rules.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Create time zones with adjustment rules (part 3 of 4)

For floating adjustment rules, the value 5 is passed to the `week` parameter of the `System.TimeZoneInfo.TransitionTime.CreateFloatingDateRule*` method to indicate that the transition occurs on the last week of a particular month.

In creating the array of `System.TimeZoneInfo.AdjustmentRule` objects to use in the `System.TimeZoneInfo.CreateCustomTimeZone(System.String,System.TimeSpan,System.String,System.String,System.String,System.TimeZoneInfo.AdjustmentRule[])` method call, the code could initialize the array to the size required by the number of adjustments to be created for the time zone. Instead, this code example calls the `System.Collections.Generic.List`1.Add*` method to add each adjustment rule to a generic `System.Collections.Generic.List`1` collection of `System.TimeZoneInfo.AdjustmentRule` objects. The code then calls the `System.Collections.Generic.List`1.CopyTo*` method to copy the members of this collection to the array.

The example also uses the `System.TimeZoneInfo.TransitionTime.CreateFixedDateRule*` method to define fixed-date adjustments. This is similar to calling the `System.TimeZoneInfo.TransitionTime.CreateFloatingDateRule*` method, except that it requires only the time, month, and day of the transition parameters.

The example can be tested using code such as the following:
