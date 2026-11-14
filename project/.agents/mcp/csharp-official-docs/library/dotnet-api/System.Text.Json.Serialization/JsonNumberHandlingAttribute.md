---
title: "JsonNumberHandlingAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonNumberHandlingAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonNumberHandlingAttribute class

Namespace: `System.Text.Json.Serialization`

```csharp
public sealed class JsonNumberHandlingAttribute : System.Text.Json.Serialization.JsonAttribute
```

When placed on a type, property, or field, indicates what `JsonNumberHandling` settings should be used when serializing or deserializing numbers.

To be added.

## JsonNumberHandlingAttribute.JsonNumberHandlingAttribute(JsonNumberHandling) constructor

```csharp
public JsonNumberHandlingAttribute (System.Text.Json.Serialization.JsonNumberHandling handling);
```

Initializes a new instance of `JsonNumberHandlingAttribute`.

Parameters:

- `handling`: A bitwise combination of the enumeration values that specify how number types should be handled when serializing or deserializing.

To be added.

## JsonNumberHandlingAttribute.Handling property

```csharp
public System.Text.Json.Serialization.JsonNumberHandling Handling { get; }
```

Indicates what settings should be used when serializing or deserializing numbers.

Returns: An object that determines the number serialization and deserialization settings.

To be added.
