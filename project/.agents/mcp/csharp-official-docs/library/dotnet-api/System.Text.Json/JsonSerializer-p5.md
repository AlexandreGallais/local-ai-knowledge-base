---
title: "JsonSerializer class (part 5 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonSerializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonSerializer class (part 5 of 8)

## JsonSerializer.DeserializeAsyncEnumerable<TValue>(PipeReader, Boolean, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> DeserializeAsyncEnumerable<TValue> (System.IO.Pipelines.PipeReader utf8Json, bool topLevelValues, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Wraps the UTF-8 encoded text into an `IAsyncEnumerable<T>` that can be used to deserialize sequences of JSON values in a streaming manner.

Parameters:

- `TValue`: The element type to deserialize asynchronously.
- `utf8Json`: JSON data to parse.
- `topLevelValues`: `true` to deserialize from a sequence of top-level JSON values, or `false` to deserialize from a single top-level array.
- `options`: Options to control the behavior during reading.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the read operation.

Returns: An `IAsyncEnumerable<T>` representation of the provided JSON sequence.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.

When `topLevelValues` is set to `true`, treats the PipeReader as a sequence of whitespace separated top-level JSON values and attempts to deserialize each value into `TValue`.

When `topLevelValues` is set to `false`, treats the PipeReader as a JSON array and attempts to serialize each element into `TValue`.

## JsonSerializer.DeserializeAsyncEnumerable<TValue>(PipeReader, JsonTypeInfo<TValue>, Boolean, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> DeserializeAsyncEnumerable<TValue> (System.IO.Pipelines.PipeReader utf8Json, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, bool topLevelValues, System.Threading.CancellationToken <example-value> = default);
```

Wraps the UTF-8 encoded text into an `IAsyncEnumerable<T>` that can be used to deserialize sequences of JSON values in a streaming manner.

Parameters:

- `TValue`: The element type to deserialize asynchronously.
- `utf8Json`: JSON data to parse.
- `jsonTypeInfo`: Metadata about the element type to convert.
- `topLevelValues`: Whether to deserialize from a sequence of top-level JSON values.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the read operation.

Returns: An `IAsyncEnumerable<T>` representation of the provided JSON sequence.

Exceptions:

- `ArgumentNullException`: `utf8Json` or `jsonTypeInfo` is `null`.

When `topLevelValues` is set to `true`, treats the PipeReader as a sequence of whitespace separated top-level JSON values and attempts to deserialize each value into `TValue`.

When `topLevelValues` is set to `false`, treats the PipeReader as a JSON array and attempts to serialize each element into `TValue`.

## JsonSerializer.DeserializeAsyncEnumerable<TValue>(Stream, Boolean, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> DeserializeAsyncEnumerable<TValue> (System.IO.Stream utf8Json, bool topLevelValues, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Wraps the UTF-8 encoded text into an `IAsyncEnumerable<T>` that can be used to deserialize sequences of JSON values in a streaming manner.

Parameters:

- `TValue`: The element type to deserialize asynchronously.
- `utf8Json`: JSON data to parse.
- `topLevelValues`: `true` to deserialize from a sequence of top-level JSON values, or `false` to deserialize from a single top-level array.
- `options`: Options to control the behavior during reading.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the read operation.

Returns: An `IAsyncEnumerable<T>` representation of the provided JSON sequence.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.

When `topLevelValues` is set to `true`, treats the stream as a sequence of whitespace separated top-level JSON values and attempts to deserialize each value into `TValue`.

When `topLevelValues` is set to `false`, treats the stream as a JSON array and attempts to serialize each element into `TValue`.

## JsonSerializer.DeserializeAsyncEnumerable<TValue>(Stream, JsonTypeInfo<TValue>, Boolean, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> DeserializeAsyncEnumerable<TValue> (System.IO.Stream utf8Json, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, bool topLevelValues, System.Threading.CancellationToken <example-value> = default);
```

Wraps the UTF-8 encoded text into an `IAsyncEnumerable<T>` that can be used to deserialize sequences of JSON values in a streaming manner.

Parameters:

- `TValue`: The element type to deserialize asynchronously.
- `utf8Json`: JSON data to parse.
- `jsonTypeInfo`: Metadata about the element type to convert.
- `topLevelValues`: Whether to deserialize from a sequence of top-level JSON values.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the read operation.

Returns: An `IAsyncEnumerable<T>` representation of the provided JSON sequence.

Exceptions:

- `ArgumentNullException`: `utf8Json` or `jsonTypeInfo` is `null`.

When `topLevelValues` is set to `true`, treats the stream as a sequence of whitespace separated top-level JSON values and attempts to deserialize each value into `TValue`.

When `topLevelValues` is set to `false`, treats the stream as a JSON array and attempts to serialize each element into `TValue`.

## JsonSerializer.Serialize(Object, JsonTypeInfo) method

```csharp
public static string Serialize (object? value, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo);
```

Converts the provided value into a `String`.

Parameters:

- `value`: The value to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `String` representation of the value.

Exceptions:

- `ArgumentNullException`: `jsonTypeInfo` is `null`.
- `InvalidCastException`: `value` does not match the type of `jsonTypeInfo`.

Using a `String` is not as efficient as using UTF-8 encoding since the implementation internally uses UTF-8. See also `JsonSerializer.SerializeToUtf8Bytes` and `JsonSerializer.SerializeAsync`.

## JsonSerializer.Serialize(Stream, Object, JsonTypeInfo) method

```csharp
public static void Serialize (System.IO.Stream utf8Json, object? value, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo);
```

Converts the provided value to UTF-8 encoded JSON text and write it to the `Stream`.

Parameters:

- `utf8Json`: The UTF-8 `Stream` to write to.
- `value`: The value to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.
- `InvalidCastException`: `value` does not match the type of `jsonTypeInfo`.

To be added.

## JsonSerializer.Serialize(Object, Type, JsonSerializerOptions) method

```csharp
public static string Serialize (object? value, Type inputType, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the value of a specified type into a JSON string.

Parameters:

- `value`: The value to convert.
- `inputType`: The type of the `value` to convert.
- `options`: Options to control the conversion behavior.

Returns: The JSON string representation of the value.

Exceptions:

- `ArgumentException`: `inputType` is not compatible with `value`.
- `ArgumentNullException`: `inputType` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType` or its serializable members.

#### Remarks

Using a `String` is not as efficient as using UTF-8 encoding since the implementation internally uses UTF-8. See also `SerializeToUtf8Bytes` and `SerializeAsync`.

For more information, see How to serialize and deserialize JSON.

## JsonSerializer.Serialize(Object, Type, JsonSerializerContext) method

```csharp
public static string Serialize (object? value, Type inputType, System.Text.Json.Serialization.JsonSerializerContext context);
```

Converts the provided value into a `String`.

Parameters:

- `value`: The value to convert.
- `inputType`: The type of the `value` to convert.
- `context`: A metadata provider for serializable types.

Returns: A `String` representation of the value.

Exceptions:

- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType` or its serializable members.
- `InvalidOperationException`: The `JsonSerializerContext.GetTypeInfo` method of the provided `context` returns `null` for the type to convert.
- `ArgumentNullException`: `inputType` or `context` is `null`.

#### Remarks

Using a `String` is not as efficient as using UTF-8 encoding, since the implementation internally uses UTF-8. Also see `SerializeToUtf8Bytes` and `SerializeAsync`.

## JsonSerializer.Serialize(Utf8JsonWriter, Object, JsonTypeInfo) method

```csharp
public static void Serialize (System.Text.Json.Utf8JsonWriter writer, object? value, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo);
```

Writes one JSON value (including objects or arrays) to the provided writer.

Parameters:

- `writer`: The writer to write.
- `value`: The value to convert and write.
- `jsonTypeInfo`: Metadata about the type to convert.

Exceptions:

- `ArgumentNullException`: `writer` or `jsonTypeInfo` is `null`.
- `InvalidCastException`: `value` does not match the type of `jsonTypeInfo`.

To be added.

## JsonSerializer.Serialize(Stream, Object, Type, JsonSerializerOptions) method

```csharp
public static void Serialize (System.IO.Stream utf8Json, object? value, Type inputType, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the provided value to UTF-8 encoded JSON text and write it to the `Stream`.

Parameters:

- `utf8Json`: The UTF-8 `Stream` to write to.
- `value`: The value to convert.
- `inputType`: The type of the `value` to convert.
- `options`: Options to control the conversion behavior.

Exceptions:

- `ArgumentException`: `inputType` is not compatible with `value`.
- `ArgumentNullException`: `utf8Json` or `inputType` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType`  or its serializable members.

To be added.

## JsonSerializer.Serialize(Stream, Object, Type, JsonSerializerContext) method

```csharp
public static void Serialize (System.IO.Stream utf8Json, object? value, Type inputType, System.Text.Json.Serialization.JsonSerializerContext context);
```

Converts the provided value to UTF-8 encoded JSON text and write it to the `Stream`.

Parameters:

- `utf8Json`: The UTF-8 `Stream` to write to.
- `value`: The value to convert.
- `inputType`: The type of the `value` to convert.
- `context`: A metadata provider for serializable types.

Exceptions:

- `ArgumentException`: `inputType` is not compatible with `value`.
- `ArgumentNullException`: `utf8Json`, `inputType`, or `context` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType`  or its serializable members.

To be added.

## JsonSerializer.Serialize(Utf8JsonWriter, Object, Type, JsonSerializerOptions) method

```csharp
public static void Serialize (System.Text.Json.Utf8JsonWriter writer, object? value, Type inputType, System.Text.Json.JsonSerializerOptions? options = default);
```

Writes the JSON representation of the specified type to the provided writer.

Parameters:

- `writer`: The JSON writer to write to.
- `value`: The value to convert and write.
- `inputType`: The type of the `value` to convert.
- `options`: Options to control serialization behavior.

Exceptions:

- `ArgumentException`: `inputType` is not compatible with `value`
- `ArgumentNullException`: `writer` or `inputType` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType` or its serializable members.

#### Remarks

The `JsonWriterOptions` used to create the instance of the `Utf8JsonWriter` take precedence over the `JsonSerializerOptions` when they conflict. Hence, `Indented`, `SkipValidation`, and `Encoder` are used while writing.

For more information, see How to serialize and deserialize JSON.

## JsonSerializer.Serialize(Utf8JsonWriter, Object, Type, JsonSerializerContext) method

```csharp
public static void Serialize (System.Text.Json.Utf8JsonWriter writer, object? value, Type inputType, System.Text.Json.Serialization.JsonSerializerContext context);
```

Writes one JSON value (including objects or arrays) to the provided writer.

Parameters:

- `writer`: A JSON writer to write to.
- `value`: The value to convert and write.
- `inputType`: The type of the `value` to convert.
- `context`: A metadata provider for serializable types.

Exceptions:

- `ArgumentException`: `inputType` is not compatible with `value`.
- `ArgumentNullException`: `writer` or `inputType` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType` or its serializable members.
- `InvalidOperationException`: The `JsonSerializerContext.GetTypeInfo` method of the provided `context` returns `null` for the type to convert.

To be added.

## JsonSerializer.Serialize<TValue>(TValue, JsonSerializerOptions) method

```csharp
public static string Serialize<TValue> (TValue value, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the value of a type specified by a generic type parameter into a JSON string.

Parameters:

- `TValue`: The type of the value to serialize.
- `value`: The value to convert.
- `options`: Options to control serialization behavior.

Returns: A JSON string representation of the value.

Exceptions:

- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

#### Remarks

Using a `String` is not as efficient as using UTF-8 encoding since the implementation internally uses UTF-8. See also `SerializeToUtf8Bytes` and `SerializeAsync`.

For more information, see How to serialize and deserialize JSON.

## JsonSerializer.Serialize<TValue>(TValue, JsonTypeInfo<TValue>) method

```csharp
public static string Serialize<TValue> (TValue value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo);
```

Converts the provided value into a `String`.

Parameters:

- `TValue`: The type of the value to serialize.
- `value`: The value to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `String` representation of the value.

Exceptions:

- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.
- `ArgumentNullException`: `jsonTypeInfo` is `null`.

#### Remarks

Using a `String` is not as efficient as using UTF-8
encoding since the implementation internally uses UTF-8. See also `SerializeToUtf8Bytes<T>`
and `SerializeAsync<T>`.
