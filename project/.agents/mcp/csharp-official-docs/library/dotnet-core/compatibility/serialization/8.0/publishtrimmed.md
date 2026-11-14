---
title: "Breaking change: PublishedTrimmed projects fail reflection-based serialization"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/serialization/8.0/publishtrimmed.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# PublishedTrimmed projects fail reflection-based serialization

Projects that enable the PublishTrimmed MSBuild property now automatically turn off the reflection-based defaults of System.Text.Json. In other words, setting `PublishTrimmed` to `true` automatically sets the `JsonSerializerIsReflectionEnabledByDefault` MSBuild property to `false` unless otherwise specified in project configuration.

## Previous behavior

Prior to this change, projects that have the `PublishTrimmed` property enabled, that is, `<PublishTrimmed>true</PublishTrimmed>`, published a trimmed application. However, the reflection-based default serialization behavior wasn't necessarily disabled. Depending on what code got trimmed, the follow code might or might not succeed serialization, or might or might not output the correct serialization data.

```csharp
JsonSerializer.Serialize(new { Value = 42 });
```

## New behavior

Starting in .NET 8, projects that have the `PublishTrimmed` property enabled fail serialization outright. The code `JsonSerializer.Serialize(new { Value = 42 });` throws the following exception:

> **System.InvalidOperationException: Reflection-based serialization has been disabled for this application.**

## Version introduced

.NET 8 Preview 7

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change ensures that trimmed applications use appropriate defaults. It also guides users towards adopting best practices suitable for trimmed applications—that is, use the source generator, and avoid accidental dependency on the unsafe reflection-based components.

## Recommended action

To ensure that serialization succeeds, we recommend that you migrate your trimmed applications to use the source generator.

However, if you must use reflection, you can revert to the original behavior by explicitly enabling the `JsonSerializerIsReflectionEnabledByDefault` property in your project file:

```xml
<PropertyGroup>
  <PublishTrimmed>true</PublishTrimmed>
  <JsonSerializerIsReflectionEnabledByDefault>true</JsonSerializerIsReflectionEnabledByDefault>
</PropertyGroup>
```

## Affected APIs

N/A

## See also

- Trimming options: Enable trimming
