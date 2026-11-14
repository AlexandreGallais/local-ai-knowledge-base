---
title: "JsonStringEnumConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonStringEnumConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonStringEnumConverter class

Namespace: `System.Text.Json.Serialization`

```csharp
public class JsonStringEnumConverter : System.Text.Json.Serialization.JsonConverterFactory
```

Converts enumeration values to and from strings.

#### Remarks

Reading is case insensitive. Writing can be customized by using a `JsonNamingPolicy`.

For more information, see How to customize property names and values with System.Text.Json.

## JsonStringEnumConverter.JsonStringEnumConverter() constructor

```csharp
public JsonStringEnumConverter ();
```

Initializes an instance of the `JsonStringEnumConverter` class with the default naming policy that allows integer values.

To be added.

## JsonStringEnumConverter.JsonStringEnumConverter(JsonNamingPolicy, Boolean) constructor

```csharp
public JsonStringEnumConverter (System.Text.Json.JsonNamingPolicy? namingPolicy = default, bool allowIntegerValues = true);
```

Initializes an instance of the `JsonStringEnumConverter` class with a specified naming policy and a value that indicates whether undefined enumeration values are allowed.

Parameters:

- `namingPolicy`: The optional naming policy for writing enum values.
- `allowIntegerValues`: `true` to allow undefined enum values; otherwise, `false`. When `true`, if an enum value isn't defined, it will output as a number rather than a string.

To be added.

## JsonStringEnumConverter.CanConvert(Type) method

```csharp
public override sealed bool CanConvert (Type typeToConvert);
```

Determines whether the specified type can be converted to an enum.

Parameters:

- `typeToConvert`: The type to be checked.

Returns: `true` if the type can be converted; otherwise, `false`.

To be added.

## JsonStringEnumConverter.CreateConverter(Type, JsonSerializerOptions) method

```csharp
public override sealed System.Text.Json.Serialization.JsonConverter CreateConverter (Type typeToConvert, System.Text.Json.JsonSerializerOptions options);
```

Creates a converter for the specified type.

Parameters:

- `typeToConvert`: The type handled by the converter.
- `options`: The serialization options to use.

Returns: A converter for which `T` is compatible with `typeToConvert`.

To be added.
