---
title: "BinaryDataJsonConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/BinaryDataJsonConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BinaryDataJsonConverter class

Namespace: `System.Text.Json.Serialization`

```csharp
public sealed class BinaryDataJsonConverter : System.Text.Json.Serialization.JsonConverter<BinaryData>
```

Serializes `BinaryData` instances as Base64 JSON strings.

To be added.

## BinaryDataJsonConverter.BinaryDataJsonConverter() constructor

```csharp
public BinaryDataJsonConverter ();
```

Initializes a new instance of the `BinaryDataJsonConverter`.

To be added.

## BinaryDataJsonConverter.Read(Utf8JsonReader, Type, JsonSerializerOptions) method

```csharp
public override BinaryData? Read (ref System.Text.Json.Utf8JsonReader reader, Type typeToConvert, System.Text.Json.JsonSerializerOptions options);
```

Reads and converts the JSON to type
```csharp
T
```
.

Parameters:

- `reader`: The reader.
- `typeToConvert`: The type to convert.
- `options`: An object that specifies serialization options to use.

Returns: The converted value.

To be added.

## BinaryDataJsonConverter.Write(Utf8JsonWriter, BinaryData, JsonSerializerOptions) method

```csharp
public override void Write (System.Text.Json.Utf8JsonWriter writer, BinaryData value, System.Text.Json.JsonSerializerOptions options);
```

Writes a specified value as JSON.

Parameters:

- `writer`: The writer to write to.
- `value`: The value to convert to JSON.
- `options`: An object that specifies serialization options to use.

To be added.
