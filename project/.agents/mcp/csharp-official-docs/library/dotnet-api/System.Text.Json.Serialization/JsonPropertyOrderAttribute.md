---
title: "JsonPropertyOrderAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonPropertyOrderAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonPropertyOrderAttribute class

Namespace: `System.Text.Json.Serialization`

```csharp
public sealed class JsonPropertyOrderAttribute : System.Text.Json.Serialization.JsonAttribute
```

Specifies the property order that is present in the JSON when serializing. Lower values are serialized first.
If the attribute is not specified, the default value is 0.

#### Remarks

If multiple properties have the same value, the ordering is undefined between them.

## JsonPropertyOrderAttribute.JsonPropertyOrderAttribute(Int32) constructor

```csharp
public JsonPropertyOrderAttribute (int order);
```

Initializes a new instance of `JsonPropertyNameAttribute` with the specified order.

Parameters:

- `order`: The order of the property.

To be added.

## JsonPropertyOrderAttribute.Order property

```csharp
public int Order { get; }
```

Gets the serialization order of the property.

Returns: The serialization order of the property.

To be added.
