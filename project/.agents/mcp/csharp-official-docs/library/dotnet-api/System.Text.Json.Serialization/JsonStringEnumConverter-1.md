---
title: "JsonStringEnumConverter<TEnum> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonStringEnumConverter`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonStringEnumConverter<TEnum> class

Namespace: `System.Text.Json.Serialization`

```csharp
public class JsonStringEnumConverter<TEnum> : System.Text.Json.Serialization.JsonConverterFactory where TEnum : struct
```

Converter to convert enums to and from strings.

Parameters:

- `TEnum`: The enum type that this converter targets.

Reading is case insensitive, and writing can be customized via a `JsonNamingPolicy`.

## JsonStringEnumConverter<TEnum>.JsonStringEnumConverter() constructor

```csharp
public JsonStringEnumConverter ();
```

Initializes a new instance of `JsonStringEnumConverter<T>` with the default naming policy and that allows integer values.

To be added.

## JsonStringEnumConverter<TEnum>.JsonStringEnumConverter(JsonNamingPolicy, Boolean) constructor

```csharp
public JsonStringEnumConverter (System.Text.Json.JsonNamingPolicy? namingPolicy = default, bool allowIntegerValues = true);
```

Initializes a new instance of `JsonStringEnumConverter<T>`.

Parameters:

- `namingPolicy`: Optional naming policy for writing enum values.
- `allowIntegerValues`: `true` to allow undefined enum values. When `true`, if an enum value isn't defined, it outputs as a number rather than a string.

To be added.

## JsonStringEnumConverter<TEnum>.CanConvert(Type) method

```csharp
public override sealed bool CanConvert (Type typeToConvert);
```

When overridden in a derived class, determines whether the converter instance can convert the specified object type.

Parameters:

- `typeToConvert`: The type of the object to check whether it can be converted by this converter instance.

Returns: `true` if the instance can convert the specified object type; otherwise, `false`.

To be added.

## JsonStringEnumConverter<TEnum>.CreateConverter(Type, JsonSerializerOptions) method

```csharp
public override sealed System.Text.Json.Serialization.JsonConverter CreateConverter (Type typeToConvert, System.Text.Json.JsonSerializerOptions options);
```

Creates a converter for a specified type.

Parameters:

- `typeToConvert`: The type handled by the converter.
- `options`: The serialization options to use.

Returns: A converter for which `T` is compatible with `typeToConvert`.

To be added.
