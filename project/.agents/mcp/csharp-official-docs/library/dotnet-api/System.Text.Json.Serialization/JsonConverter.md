---
title: "JsonConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonConverter class

Namespace: `System.Text.Json.Serialization`

```csharp
public abstract class JsonConverter
```

Converts an object or value to or from JSON.

#### Remarks

For more information, see How to write custom converters for JSON serialization.

## JsonConverter.Type property

```csharp
public abstract Type? Type { get; }
```

Gets the type being converted by the current converter instance.

Returns: To be added.

For instances of type `JsonConverter<T>`, this property returns `typeof(T)`. For instances of type `JsonConverterFactory`, it returns `null`.

## JsonConverter.CanConvert(Type) method

```csharp
public abstract bool CanConvert (Type typeToConvert);
```

When overridden in a derived class, determines whether the converter instance can convert the specified object type.

Parameters:

- `typeToConvert`: The type of the object to check whether it can be converted by this converter instance.

Returns: `true` if the instance can convert the specified object type; otherwise, `false`.

To be added.
