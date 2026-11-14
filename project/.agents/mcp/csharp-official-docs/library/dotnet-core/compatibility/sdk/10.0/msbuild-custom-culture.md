---
title: "Breaking change - MSBuild custom culture resource handling"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/10.0/msbuild-custom-culture.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSBuild custom culture resource handling

Starting in MSBuild 17.14, custom culture resource handling is no longer enabled by default. Users must explicitly opt in to enable this feature. This change prevents unintended behavior caused by automatic detection of directories resembling culture codes.

## Version introduced

MSBuild 17.14

> **Note:**
> As this change affects the behavior of MSBuild, it affects two supported versions of .NET: .NET 10 Preview 1 and .NET 9.0.2. The transparent support for custom culture change was introduced in .NET SDK 9.0.200 and the change making it opt-in is in .NET SDK 9.0.300.

## Previous behavior

Previously, MSBuild treated directories with names resembling culture codes (for example, `en-US`, `fr-FR`) as culture-specific resource directories by default. This behavior sometimes included unrelated directories, such as those with hash-based or technical names, leading to unintended resource assemblies in the build process.

## New behavior

Custom culture resource handling is disabled by default. To enable this feature, set the project property `EnableCustomCulture` to `true`.

To exclude directories from custom culture processing, use the `CustomCultureExcludeDirectories` property to specify a semicolon-delimited list of directory names.

## Type of breaking change

This change is a behavioral change.

## Reason for change

The automatic detection of culture-specific resource directories caused unpredictable build behavior when directory names coincidentally matched culture codes. Requiring explicit opt-in ensures more predictable builds and gives users greater control over resource handling.

## Recommended action

If your build process relies on custom culture resource handling:

1. Set the project property `EnableCustomCulture` to `true`.
2. Optionally use the `CustomCultureExcludeDirectories` property to exclude specific directories from being treated as culture resources.

## Affected APIs

None.
