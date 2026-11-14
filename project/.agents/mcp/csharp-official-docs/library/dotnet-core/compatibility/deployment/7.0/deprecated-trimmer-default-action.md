---
title: "Breaking change: Deprecation of `TrimmerDefaultAction` property"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/deployment/7.0/deprecated-trimmer-default-action.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSBuild property `TrimmerDefaultAction` is deprecated

The value of the `TrimmerDefaultAction` property is now ignored by the publish process.

## Previous behavior

Previously, only assemblies that were opted-in with `<IsTrimmable>true</IsTrimmable>` in the library project file were trimmed with the action specified by the `TrimmerDefaultAction`. In .NET 6, the default value for that property was `copy`. While apps with trim warnings were more likely to work with this default, runtime behavior could still be affected. In addition, the `copy` action caused apps to be larger than if the entire app was trimmed.

## New behavior

Starting in .NET 7, the property `TrimmerDefaultAction` is ignored and publishing behaves as if it was set to `link` all the time. This means all assemblies are fully trimmed, whether they opt in or not. As a result, applications with trim warnings may see changes in behavior or runtime exceptions. For more information and instructions for restoring the previous behavior, see All assemblies trimmed by default.

## Version introduced

.NET 7

## Type of breaking change

This change can affect source compatibility.

## Reason for change

This change streamlines trimming options.

## Recommended action

The best resolution is to resolve all the trim warnings in your application. For information about resolving the warnings in your own libraries, see Introduction to trim warnings. For other libraries, contact the author to request that they resolve the warnings, or choose a different library that already supports trimming. For example, you can switch to `System.Text.Json` with source generation, which supports trimming, instead of `Newtonsoft.Json`. With that library, you should no longer need to use `TrimmerDefaultAction`.

To revert to the previous behavior, use `global.json` to pin your project to .NET 6 SDK.

## See also

- Trimming options
- All assemblies trimmed by default
