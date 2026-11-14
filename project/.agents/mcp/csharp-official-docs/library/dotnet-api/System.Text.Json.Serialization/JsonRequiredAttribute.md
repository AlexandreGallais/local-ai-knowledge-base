---
title: "JsonRequiredAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonRequiredAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonRequiredAttribute class

Namespace: `System.Text.Json.Serialization`

```csharp
public sealed class JsonRequiredAttribute : System.Text.Json.Serialization.JsonAttribute
```

Indicates that the annotated member must bind to a JSON property on deserialization.

A `null` token in JSON will not trigger a validation error.
For contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`, this attribute will be mapped to `JsonPropertyInfo.IsRequired`.

## JsonRequiredAttribute.JsonRequiredAttribute() constructor

```csharp
public JsonRequiredAttribute ();
```

Initializes a new instance of `JsonRequiredAttribute`.

To be added.
