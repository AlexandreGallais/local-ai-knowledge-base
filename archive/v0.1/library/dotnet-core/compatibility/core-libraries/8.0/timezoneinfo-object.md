---
title: ".NET 8 breaking change: FindSystemTimeZoneById doesn't return new object"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/8.0/timezoneinfo-object.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# FindSystemTimeZoneById doesn't return new object

The `System.TimeZoneInfo` object returned by `System.TimeZoneInfo.FindSystemTimeZoneById(System.String)` is now a cached `TimeZoneInfo` instance instead of a new object.

## Previous behavior

`System.TimeZoneInfo.FindSystemTimeZoneById(System.String)` returned a new `TimeZoneInfo` object.

## New behavior

Starting in .NET 8, `System.TimeZoneInfo.FindSystemTimeZoneById(System.String)` returns a cached `TimeZoneInfo` instance.

## Version introduced

.NET 8

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was made to improve performance when calling `System.TimeZoneInfo.FindSystemTimeZoneById(System.String)`. For more information, see dotnet/runtime pull request #85615.

## Recommended action

If your code relied on `System.TimeZoneInfo.FindSystemTimeZoneById(System.String)` to create a new instance of `TimeZoneInfo`, refactor the code to call one of these methods instead.

## Affected APIs

- `System.TimeZoneInfo.FindSystemTimeZoneById(System.String)`
