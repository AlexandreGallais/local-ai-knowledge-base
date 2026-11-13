---
title: "Breaking change: Serialization of custom types in .NET 7"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/7.0/custom-serialization.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# BinaryFormatter serialization of custom BuildEventArgs and ITaskItems removed for .NET 7

MSBuild in .NET 7 doesn't support serialization of custom `BuildEventArgs`-derived and `ITaskItem`-derived types via the `BinaryFormatter` serializer.

## Version introduced

MSBuild 17.4 (.NET SDK 7.0.100)

## Old behavior

MSBuild used BinaryFormatter to preserve custom types that derived from BuildEventArgs and ITaskItem across certain boundaries, most notably when running in a multi-process environment.

## New behavior

MSBuild will no longer support this mechanism, so code that used custom types derived from BuildEventArgs and ITaskItem may fail.

## Reason for change

BinaryFormatter was made obsolete in .NET 5. Per this plan, all first-party code in the dotnet GitHub organization must migrate away from its use by .NET 7. This change impacts user-exposed functionality of MSBuild.

## Recommended action

* Engage with the MSBuild team on this GitHub discussion about your specific use cases and how you can migrate away from the `TranslateDotNet` mechanism.

* Avoid returning custom derived types from tasks or when logging.
