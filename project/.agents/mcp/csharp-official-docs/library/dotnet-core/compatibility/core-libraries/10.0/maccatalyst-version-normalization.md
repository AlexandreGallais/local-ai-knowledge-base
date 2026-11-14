---
title: "Breaking change: MacCatalyst version normalization"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/10.0/maccatalyst-version-normalization.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MacCatalyst version normalization

This update ensures that MacCatalyst version components retrieved from the OS are always normalized to three components: major, minor, and build. The build component is set to `0` if undefined (`-1`), ensuring consistent behavior between iOS and MacCatalyst versions for version checks.

## Previous behavior

Previously, the build component in `Version` was not normalized, which led to incorrect version checks on MacCatalyst when only two components (major and minor) were provided. This resulted in invalid version checks.

## New behavior

Starting in .NET 10, the MacCatalyst build component is normalized to `0`, ensuring consistent version checks. The revision component is always set to `-1`, as it is not specified on MacCatalyst or iOS.

## Version introduced

.NET 10

## Type of breaking change

This change is a behavioral change.

## Reason for change

This changed was made to prevent incorrect version checks and align MacCatalyst versioning with iOS, ensuring consistent version components.

## Recommended action

Use versions of up to three components (major, minor, and build) on MacCatalyst.

## Affected APIs

- `System.OperatingSystem.IsMacCatalystVersionAtLeast(System.Int32,System.Int32,System.Int32)`
- `System.OperatingSystem.IsOSPlatformVersionAtLeast(System.String,System.Int32,System.Int32,System.Int32,System.Int32)`
- `System.Environment.OSVersion`
