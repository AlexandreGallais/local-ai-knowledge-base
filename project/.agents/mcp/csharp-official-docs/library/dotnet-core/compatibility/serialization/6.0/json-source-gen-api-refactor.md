---
title: "Breaking change: JSON source-generation API refactoring"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/serialization/6.0/json-source-gen-api-refactor.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# JSON source-generation API refactoring

The APIs that the output of the JSON source generator calls have been refactored. The refactoring makes them easier to extend with new features in the future. Projects that explicitly use the JSON source generator and were compiled with .NET 6 RC 1 or earlier will fail with runtime exceptions when run on the .NET 6 RC 2 runtime.

## Previous behavior

Projects that were compiled using the .NET 6 RC 1 or earlier version of the System.Text.Json source generator and library run as expected.

## New behavior

Projects that were compiled using the .NET 6 RC 1 version of the System.Text.Json source generator and library fail when run against the .NET 6 RC 2 runtime. Projects that are recompiled with the RC 2 SDK work as expected.

## Version introduced

6.0 RC 2

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

This change was introduced to make it easier to extend the source-generator implementation with features in the future. For more information, see dotnet/runtime#59243.

## Recommended action

Recompile your app using the RC 2 SDK.

## Affected APIs

- `System.Text.Json.Serialization.JsonSerializerContext`
- `System.Text.Json.Serialization.JsonSerializableAttribute`
- `System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute`
- `System.Text.Json.Serialization.Metadata` (not intended for direct use)

## See also

- How to use source generation in System.Text.Json
