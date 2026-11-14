---
title: "JsonNumberEnumConverter<TEnum> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonNumberEnumConverter`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonNumberEnumConverter<TEnum> class

Namespace: `System.Text.Json.Serialization`

```csharp
public sealed class JsonNumberEnumConverter<TEnum> : System.Text.Json.Serialization.JsonConverterFactory where TEnum : struct
```

Converter to convert enums to and from numeric values.

Parameters:

- `TEnum`: The enum type that this converter targets.

This is the default converter for enums and can be used to override `JsonSourceGenerationOptionsAttribute.UseStringEnumConverter` on individual types or properties.

## JsonNumberEnumConverter<TEnum>.JsonNumberEnumConverter() constructor

```csharp
public JsonNumberEnumConverter ();
```

Initializes a new instance of `JsonNumberEnumConverter<T>`.

To be added.

## JsonNumberEnumConverter<TEnum>.CanConvert(Type) method

```csharp
public override bool CanConvert (Type typeToConvert);
```

When overridden in a derived class, determines whether the converter instance can convert the specified object type.

Parameters:

- `typeToConvert`: The type of the object to check whether it can be converted by this converter instance.

Returns: `true` if the instance can convert the specified object type; otherwise, `false`.

To be added.

## JsonNumberEnumConverter<TEnum>.CreateConverter(Type, JsonSerializerOptions) method

```csharp
public override System.Text.Json.Serialization.JsonConverter? CreateConverter (Type typeToConvert, System.Text.Json.JsonSerializerOptions options);
```

Creates a converter for a specified type.

Parameters:

- `typeToConvert`: The type handled by the converter.
- `options`: The serialization options to use.

Returns: A converter for which `T` is compatible with `typeToConvert`.

To be added.
