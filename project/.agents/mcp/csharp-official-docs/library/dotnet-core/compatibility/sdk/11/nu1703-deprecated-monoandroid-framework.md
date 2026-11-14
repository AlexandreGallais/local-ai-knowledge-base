---
title: "Breaking change: NU1703 warning for packages that use deprecated MonoAndroid framework assets"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/11/nu1703-deprecated-monoandroid-framework.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# NU1703 warning for packages that use deprecated MonoAndroid framework assets

NuGet restore now emits NU1703 when an Android project targets .NET 11
or later and resolves package assets from the deprecated MonoAndroid
framework folder.

## Version introduced

.NET 11

## Previous behavior

Previously, NuGet restore silently resolved MonoAndroid assets when a package did not provide `net6.0-android` or later assets.

## New behavior

Starting in .NET 11, NuGet restore emits NU1703 when a package resolves to deprecated MonoAndroid assets for Android projects that target .NET 11 or later and use `SdkAnalysisLevel` `11.0.100` or later.

> Package 'PackageName' 1.0.0 uses the deprecated MonoAndroid framework instead of 'net6.0-android' or later. Consider upgrading to a newer version of this package or contacting the package author.

## Type of breaking change

This change can affect source compatibility.

## Reason for change

To help identify packages that might not work correctly with modern Android TFMs, NuGet now warns when restore selects deprecated MonoAndroid assets.

For more information, see NuGet.Client PR #7229.

## Recommended action

To resolve this warning, update to a package version that provides `net6.0-android` or later assets.

If no update exists:

- You can suppress NU1703 for a specific package or for the project.
- To opt out of this warning wave, you can set `SdkAnalysisLevel` to a value below `11.0.100`.

## Affected APIs

None.
