---
title: "JsonSerializableAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonSerializableAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonSerializableAttribute class

Namespace: `System.Text.Json.Serialization`

```csharp
public sealed class JsonSerializableAttribute : System.Text.Json.Serialization.JsonAttribute
```

Instructs the System.Text.Json source generator to generate source code to help optimize performance when serializing and deserializing instances of the specified type and types in its object graph.

To be added.

## JsonSerializableAttribute.JsonSerializableAttribute(Type) constructor

```csharp
public JsonSerializableAttribute (Type type);
```

Initializes a new instance of `JsonSerializableAttribute` with the specified type.

Parameters:

- `type`: The type to generate source code for.

To be added.

## JsonSerializableAttribute.GenerationMode property

```csharp
public System.Text.Json.Serialization.JsonSourceGenerationMode GenerationMode { get; set; }
```

Gets or sets the mode that indicates what the source generator should generate for the type. If the value is `JsonSourceGenerationMode.Default`, then the setting specified on `JsonSourceGenerationOptionsAttribute.GenerationMode` will be used.

Returns: To be added.

To be added.

## JsonSerializableAttribute.TypeInfoPropertyName property

```csharp
public string? TypeInfoPropertyName { get; set; }
```

Gets or sets the name of the property for the generated `JsonTypeInfo<T>` for the type on the generated, derived `JsonSerializerContext` type.

Returns: To be added.

#### Remarks

This property is useful for resolving a name collision with another type in the compilation closure.
