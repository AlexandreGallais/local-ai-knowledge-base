---
title: "JsonSerializer class (part 8 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonSerializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonSerializer class (part 8 of 8)

## JsonSerializer.SerializeToUtf8Bytes(Object, Type, JsonSerializerOptions) method

```csharp
public static byte[] SerializeToUtf8Bytes (object? value, Type inputType, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts a value of the specified type into a JSON string, encoded as UTF-8 bytes.

Parameters:

- `value`: The value to convert.
- `inputType`: The type of the `value` to convert.
- `options`: Options to control the conversion behavior.

Returns: A JSON string representation of the value, encoded as UTF-8 bytes.

Exceptions:

- `ArgumentException`: `inputType` is not compatible with `value`.
- `ArgumentNullException`: `inputType` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType` or its serializable members.

#### Remarks

For more information, see How to serialize and deserialize JSON.

## JsonSerializer.SerializeToUtf8Bytes(Object, Type, JsonSerializerContext) method

```csharp
public static byte[] SerializeToUtf8Bytes (object? value, Type inputType, System.Text.Json.Serialization.JsonSerializerContext context);
```

Converts the provided value into a `Byte` array.

Parameters:

- `value`: The value to convert.
- `inputType`: The type of the `value` to convert.
- `context`: A metadata provider for serializable types.

Returns: A UTF-8 representation of the value.

Exceptions:

- `ArgumentException`: `inputType` is not compatible with `value`.
- `ArgumentNullException`: `inputType` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType`  or its serializable members.
- `InvalidOperationException`: The `JsonSerializerContext.GetTypeInfo` method of the provided `context` returns `null` for the type to convert.

To be added.

## JsonSerializer.SerializeToUtf8Bytes<TValue>(TValue, JsonSerializerOptions) method

```csharp
public static byte[] SerializeToUtf8Bytes<TValue> (TValue value, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the value of a type specified by a generic type parameter into a JSON string, encoded as UTF-8 bytes.

Parameters:

- `TValue`: The type of the value.
- `value`: The value to convert.
- `options`: Options to control the conversion behavior.

Returns: A JSON string representation of the value, encoded as UTF-8 bytes.

Exceptions:

- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

#### Remarks

For more information, see How to serialize and deserialize JSON.

## JsonSerializer.SerializeToUtf8Bytes<TValue>(TValue, JsonTypeInfo<TValue>) method

```csharp
public static byte[] SerializeToUtf8Bytes<TValue> (TValue value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo);
```

Converts the provided value into a `Byte` array.

Parameters:

- `TValue`: The type of the value to serialize.
- `value`: The value to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A UTF-8 representation of the value.

Exceptions:

- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.
- `ArgumentNullException`: `jsonTypeInfo` is `null`.

To be added.
