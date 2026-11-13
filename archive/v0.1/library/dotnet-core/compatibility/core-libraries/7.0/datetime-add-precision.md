---
title: ".NET 7 breaking change: DateTime addition methods precision change"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/7.0/datetime-add-precision.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# DateTime addition methods precision change

In .NET 6 and earlier versions, the value parameter of the `DateTime` addition methods was rounded to the nearest millisecond. In .NET 7 and later versions, the full `System.Double` precision of the value parameter is used. However, due to the inherent imprecision of floating-point math, the resulting precision will vary.

## Previous behavior

Previously, the `double` value parameter of the `System.DateTime` `Add*` methods, for example, `System.DateTime.AddDays(System.Double)`, was rounded to the nearest millisecond.

## New behavior

Starting in .NET 7, the full precision of the `double` value parameter is used, improving the precision of the affected methods.

## Version introduced

.NET 7

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was made in response to a community request to improve the precision in `System.DateTime`.

## Recommended action

No specific action unless you have code that depends on the precision of the `Add*` methods. In that case, review your code and retest it to avoid any surprises with the precision change.

## Affected APIs

- `System.DateTime.AddDays(System.Double)`
- `System.DateTime.AddHours(System.Double)`
- `System.DateTime.AddMicroseconds(System.Double)`
- `System.DateTime.AddMilliseconds(System.Double)`
- `System.DateTime.AddMinutes(System.Double)`
- `System.DateTime.AddSeconds(System.Double)`
