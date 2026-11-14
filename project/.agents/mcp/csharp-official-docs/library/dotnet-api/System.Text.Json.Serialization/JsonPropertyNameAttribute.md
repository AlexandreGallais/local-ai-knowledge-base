---
title: "JsonPropertyNameAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonPropertyNameAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonPropertyNameAttribute class

Namespace: `System.Text.Json.Serialization`

```csharp
public sealed class JsonPropertyNameAttribute : System.Text.Json.Serialization.JsonAttribute
```

Specifies the property name that is present in the JSON when serializing and deserializing.

#### Remarks

The specified property name overrides any naming policy specified by `JsonNamingPolicy`.

For more information, see Customize individual property names.

## JsonPropertyNameAttribute.JsonPropertyNameAttribute(String) constructor

```csharp
public JsonPropertyNameAttribute (string name);
```

Initializes a new instance of `JsonPropertyNameAttribute` with the specified property name.

Parameters:

- `name`: The name of the property.

To be added.

## JsonPropertyNameAttribute.Name property

```csharp
public string Name { get; }
```

Gets the name of the property.

Returns: The name of the property.

To be added.
