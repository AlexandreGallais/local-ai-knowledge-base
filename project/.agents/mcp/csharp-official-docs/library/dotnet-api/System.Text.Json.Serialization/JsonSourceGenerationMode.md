---
title: "JsonSourceGenerationMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonSourceGenerationMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonSourceGenerationMode enum

Namespace: `System.Text.Json.Serialization`

```csharp
public enum JsonSourceGenerationMode
```

The generation mode for the System.Text.Json source generator.

To be added.

## JsonSourceGenerationMode.Default field

```csharp
Default
```

When specified on <see cref="P:System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute.GenerationMode">JsonSourceGenerationOptionsAttribute.GenerationMode</see>, indicates that both type-metadata initialization logic and optimized serialization logic should be generated for all types. When specified on <see cref="P:System.Text.Json.Serialization.JsonSerializableAttribute.GenerationMode">JsonSerializableAttribute.GenerationMode</see>, indicates that the setting on <see cref="P:System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute.GenerationMode">JsonSourceGenerationOptionsAttribute.GenerationMode</see> should be used.

## JsonSourceGenerationMode.Metadata field

```csharp
Metadata
```

Instructs the JSON source generator to generate type-metadata initialization logic.

#### Remarks

This mode supports all `JsonSerializer` features.

## JsonSourceGenerationMode.Serialization field

```csharp
Serialization
```

Instructs the JSON source generator to generate optimized serialization logic.

#### Remarks

This mode supports only a subset of `JsonSerializer` features.
