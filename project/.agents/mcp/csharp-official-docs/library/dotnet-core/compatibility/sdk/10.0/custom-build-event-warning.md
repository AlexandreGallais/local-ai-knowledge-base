---
title: "Breaking change - MSBUILDCUSTOMBUILDEVENTWARNING escape hatch removed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/10.0/custom-build-event-warning.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSBUILDCUSTOMBUILDEVENTWARNING escape hatch removed

The `MSBUILDCUSTOMBUILDEVENTWARNING` environment variable, which previously allowed custom build events derived from `Microsoft.Build.Framework.BuildEventArgs`, is no longer supported.

## Version introduced

.NET 10

## Previous behavior

Previously, users could set the `MSBUILDCUSTOMBUILDEVENTWARNING` environment variable to enable processing of custom build events.

## New behavior

Starting in .NET 10, the value of the `MSBUILDCUSTOMBUILDEVENTWARNING` environment variable is not respected anymore.

## Type of breaking change

This change is a behavioral change.

## Reason for change

The escape hatch mechanism provided by the `MSBUILDCUSTOMBUILDEVENTWARNING` environment variable was a temporary workaround. For more information, see the original breaking change.

## Recommended action

Use one of the following newly introduced, built-in events for extensibility instead of your custom derived build event:

- `Microsoft.Build.Framework.ExtendedCustomBuildEventArgs`
- `Microsoft.Build.Framework.ExtendedBuildErrorEventArgs`
- `Microsoft.Build.Framework.ExtendedBuildMessageEventArgs`
- `Microsoft.Build.Framework.ExtendedBuildWarningEventArgs`

## Affected APIs

- `Microsoft.Build.Framework.CustomBuildEventArgs`
