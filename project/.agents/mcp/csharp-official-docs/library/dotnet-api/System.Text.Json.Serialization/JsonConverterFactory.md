---
title: "JsonConverterFactory class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonConverterFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonConverterFactory class

Namespace: `System.Text.Json.Serialization`

```csharp
public abstract class JsonConverterFactory : System.Text.Json.Serialization.JsonConverter
```

Supports converting several types by using a factory pattern.

#### Remarks

This is useful for converters supporting generics, such as a converter for `List<T>`.

For more information, see How to write custom converters for JSON serialization.

## JsonConverterFactory.JsonConverterFactory() constructor

```csharp
protected JsonConverterFactory ();
```

When overridden in a derived class, initializes a new instance of the `JsonConverterFactory` class.

To be added.

## JsonConverterFactory.Type property

```csharp
public override sealed Type? Type { get; }
```

Gets the type being converted by the current converter instance.

Returns: To be added.

To be added.

## JsonConverterFactory.CreateConverter(Type, JsonSerializerOptions) method

```csharp
public abstract System.Text.Json.Serialization.JsonConverter? CreateConverter (Type typeToConvert, System.Text.Json.JsonSerializerOptions options);
```

Creates a converter for a specified type.

Parameters:

- `typeToConvert`: The type handled by the converter.
- `options`: The serialization options to use.

Returns: A converter for which `T` is compatible with `typeToConvert`.

#### Remarks

For more information, see How to write custom converters for JSON serialization.
