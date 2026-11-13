---
title: "Breaking change - PackageReference without a version raises an error"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/10.0/nu1015-packagereference-version.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# PackageReference without a version will raise an error

Starting in .NET 10, NuGet raises a `NU1015` error when a `PackageReference` item doesn't have a version specified, instead of the previous `NU1604` warning.

There's no change when using Central Package Management, since by design the PackageReference XML should not have a version in that scenario.

## Version introduced

.NET 10

## Previous behavior

Previously, NuGet raised a NU1604 warning with the following text:

> Project dependency 'PackageA' does not contain an inclusive lower bound. Include a lower bound in the dependency version to ensure consistent restore results.

## New behavior

Starting in .NET 10, NuGet raises a NU1015 error with the following text:

> The following PackageReference item(s) do not have a version specified: PackageA

## Type of breaking change

This is a behavioral change.

## Reason for change

The "no lower bound" message was confusing, and it was unclear how to fix the issue. Additionally, NuGet restored the lowest version for that package, which is rarely what developers want. This change provides clearer and more actionable error messages when the version metadata is missing.

## Recommended action

Add a version to the package reference, for example:

```diff
- <PackageReference Include="Some.Package" />
+ <PackageReference Include="Some.Package" Version="1.2.3" />
```

If the lowest package version is desired, then use `Version="0.0.0"`. In this case, NuGet will raise warning NU1603, rather than the previous NU1604.

To revert to the previous warning, you can set `SdkAnalysisLevel` to `9.0.300` or lower. However, this will affect all features that gate on `SdkAnalysisLevel`.

## Affected APIs

None.
