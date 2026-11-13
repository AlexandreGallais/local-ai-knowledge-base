---
title: "Breaking change: ManagementDateTimeConverter.ToDateTime returns a local time"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/extensions/8.0/dmtf-todatetime.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ManagementDateTimeConverter.ToDateTime returns a local time

The `System.DateTime` value returned by `System.Management.ManagementDateTimeConverter.ToDateTime(System.String)` is now based on the local time zone.

## Version introduced

.NET 8 RC 1

## Previous behavior

Previously, `System.Management.ManagementDateTimeConverter.ToDateTime(System.String)` returned a value whose `System.DateTime.Kind` value was `System.DateTimeKind.Unspecified`.

## New behavior

Starting in .NET 8, `System.Management.ManagementDateTimeConverter.ToDateTime(System.String)` returns a value whose `System.DateTime.Kind` value was `System.DateTimeKind.Local`.

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was made so that the code matched what the documentation said it did.

## Recommended action

If your code expected the returned value to be based on an unspecified time zone, update it to expect a value that's based on the local time zone.

## Affected APIs

- `System.Management.ManagementDateTimeConverter.ToDateTime(System.String)`
