---
title: "JsonConverter<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonConverter`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonConverter<T> class

Namespace: `System.Text.Json.Serialization`

```csharp
public abstract class JsonConverter<T> : System.Text.Json.Serialization.JsonConverter
```

Converts an object or value to or from JSON.

Parameters:

- `T`: The type of object or value handled by the converter.

#### Remarks

For more information, see How to write custom converters for JSON serialization.

## JsonConverter<T>.JsonConverter() constructor

```csharp
protected internal JsonConverter ();
```

Initializes a new `JsonConverter<T>` instance.

To be added.

## JsonConverter<T>.HandleNull property

```csharp
public virtual bool HandleNull { get; }
```

Gets a value that indicates whether `null` should be passed to the converter on serialization, and whether `JsonTokenType.Null` should be passed on deserialization.

Returns: To be added.

#### Remarks

The default value is `true` for converters for value types, and `false` for converters for reference types.

## JsonConverter<T>.Type property

```csharp
public override sealed Type Type { get; }
```

Gets the type being converted by the current converter instance.

Returns: To be added.

To be added.

## JsonConverter<T>.CanConvert(Type) method

```csharp
public override bool CanConvert (Type typeToConvert);
```

Determines whether the specified type can be converted.

Parameters:

- `typeToConvert`: The type to compare against.

Returns: `true` if the type can be converted; otherwise, `false`.

#### Remarks

The default implementation is to return `true` when `typeToConvert` equals `typeof(T)`.

For more information, see How to write custom converters for JSON serialization.

## JsonConverter<T>.Read(Utf8JsonReader, Type, JsonSerializerOptions) method

```csharp
public abstract T? Read (ref System.Text.Json.Utf8JsonReader reader, Type typeToConvert, System.Text.Json.JsonSerializerOptions options);
```

Reads and converts the JSON to type `T`.

Parameters:

- `reader`: The reader.
- `typeToConvert`: The type to convert.
- `options`: An object that specifies serialization options to use.

Returns: The converted value.

#### Remarks

For more information, see How to write custom converters for JSON serialization.

## JsonConverter<T>.ReadAsPropertyName(Utf8JsonReader, Type, JsonSerializerOptions) method

```csharp
public virtual T ReadAsPropertyName (ref System.Text.Json.Utf8JsonReader reader, Type typeToConvert, System.Text.Json.JsonSerializerOptions options);
```

Reads a dictionary key from a JSON property name.

Parameters:

- `reader`: The `Utf8JsonReader` to read from.
- `typeToConvert`: The type to convert.
- `options`: The options to use when reading the value.

Returns: The value that was converted.

#### Remarks

This method should be overridden in custom converters of types used in deserialized dictionary keys.

## JsonConverter<T>.Write(Utf8JsonWriter, T, JsonSerializerOptions) method

```csharp
public abstract void Write (System.Text.Json.Utf8JsonWriter writer, T value, System.Text.Json.JsonSerializerOptions options);
```

Writes a specified value as JSON.

Parameters:

- `writer`: The writer to write to.
- `value`: The value to convert to JSON.
- `options`: An object that specifies serialization options to use.

#### Remarks

A converter may throw any exception, but it should throw `JsonException` when the JSON cannot be created.

For more information, see How to write custom converters for JSON serialization.

## JsonConverter<T>.WriteAsPropertyName(Utf8JsonWriter, T, JsonSerializerOptions) method

```csharp
public virtual void WriteAsPropertyName (System.Text.Json.Utf8JsonWriter writer, T value, System.Text.Json.JsonSerializerOptions options);
```

Writes a dictionary key as a JSON property name.

Parameters:

- `writer`: The `Utf8JsonWriter` to write to.
- `value`: The value to convert. The value of `JsonConverter<T>.HandleNull` determines if the converter handles `null` values.
- `options`: The options to use when writing the value.

#### Remarks

This method should be overridden in custom converters of types used in serialized dictionary keys.
