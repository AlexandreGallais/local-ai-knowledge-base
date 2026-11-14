---
title: "JsonSerializer class (part 6 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonSerializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonSerializer class (part 6 of 8)

## JsonSerializer.Serialize<TValue>(Stream, TValue, JsonSerializerOptions) method

```csharp
public static void Serialize<TValue> (System.IO.Stream utf8Json, TValue value, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the provided value to UTF-8 encoded JSON text and write it to the `Stream`.

Parameters:

- `TValue`: The type of the value to serialize.
- `utf8Json`: The UTF-8 `Stream` to write to.
- `value`: The value to convert.
- `options`: Options to control the conversion behavior.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.

## JsonSerializer.Serialize<TValue>(Stream, TValue, JsonTypeInfo<TValue>) method

```csharp
public static void Serialize<TValue> (System.IO.Stream utf8Json, TValue value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo);
```

Converts the provided value to UTF-8 encoded JSON text and write it to the `Stream`.

Parameters:

- `TValue`: The type of the value to serialize.
- `utf8Json`: The UTF-8 `Stream` to write to.
- `value`: The value to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.

## JsonSerializer.Serialize<TValue>(Utf8JsonWriter, TValue, JsonSerializerOptions) method

```csharp
public static void Serialize<TValue> (System.Text.Json.Utf8JsonWriter writer, TValue value, System.Text.Json.JsonSerializerOptions? options = default);
```

Writes the JSON representation of a type specified by a generic type parameter to the provided writer.

Parameters:

- `TValue`: The type of the value to serialize.
- `writer`: A JSON writer to write to.
- `value`: The value to convert and write.
- `options`: Options to control serialization behavior.

Exceptions:

- `ArgumentNullException`: `writer` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

#### Remarks

The `JsonWriterOptions` used to create the instance of the `Utf8JsonWriter` take precedence over the `JsonSerializerOptions` when they conflict. Hence, `Indented`, `SkipValidation`, and `Encoder` are used while writing.

For more information, see How to serialize and deserialize JSON.

## JsonSerializer.Serialize<TValue>(Utf8JsonWriter, TValue, JsonTypeInfo<TValue>) method

```csharp
public static void Serialize<TValue> (System.Text.Json.Utf8JsonWriter writer, TValue value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo);
```

Writes one JSON value (including objects or arrays) to the provided writer.

Parameters:

- `TValue`: The type of the value to serialize.
- `writer`: The writer to write.
- `value`: The value to convert and write.
- `jsonTypeInfo`: Metadata about the type to convert.

Exceptions:

- `ArgumentNullException`: `writer` or `jsonTypeInfo` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.

## JsonSerializer.SerializeAsync(PipeWriter, Object, JsonTypeInfo, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SerializeAsync (System.IO.Pipelines.PipeWriter utf8Json, object? value, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Converts the provided value to UTF-8 encoded JSON text and write it to the `PipeWriter`.

Parameters:

- `utf8Json`: The UTF-8 `PipeWriter` to write to.
- `value`: The value to convert.
- `jsonTypeInfo`: Metadata about the type to convert.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the write operation.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.
- `InvalidCastException`: `value` does not match the type of `jsonTypeInfo`.

To be added.

## JsonSerializer.SerializeAsync(Stream, Object, JsonTypeInfo, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SerializeAsync (System.IO.Stream utf8Json, object? value, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Converts the provided value to UTF-8 encoded JSON text and writes it to the `Stream`.

Parameters:

- `utf8Json`: The UTF-8 `Stream` to write to.
- `value`: The value to convert.
- `jsonTypeInfo`: Metadata about the type to convert.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the write operation.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.
- `InvalidCastException`: `value` does not match the type of `jsonTypeInfo`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## JsonSerializer.SerializeAsync(PipeWriter, Object, Type, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SerializeAsync (System.IO.Pipelines.PipeWriter utf8Json, object? value, Type inputType, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Converts the provided value to UTF-8 encoded JSON text and write it to the `PipeWriter`.

Parameters:

- `utf8Json`: The UTF-8 `PipeWriter` to write to.
- `value`: The value to convert.
- `inputType`: The type of the `value` to convert.
- `options`: Options to control the conversion behavior.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the write operation.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentException`: `inputType` is not compatible with `value`.
- `ArgumentNullException`: `utf8Json` or `inputType` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType`  or its serializable members.

To be added.

## JsonSerializer.SerializeAsync(PipeWriter, Object, Type, JsonSerializerContext, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SerializeAsync (System.IO.Pipelines.PipeWriter utf8Json, object? value, Type inputType, System.Text.Json.Serialization.JsonSerializerContext context, System.Threading.CancellationToken <example-value> = default);
```

Converts the provided value to UTF-8 encoded JSON text and write it to the `PipeWriter`.

Parameters:

- `utf8Json`: The UTF-8 `PipeWriter` to write to.
- `value`: The value to convert.
- `inputType`: The type of the `value` to convert.
- `context`: A metadata provider for serializable types.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the write operation.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentException`: `inputType` is not compatible with `value`.
- `ArgumentNullException`: `utf8Json`, `inputType`, or `context` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType`  or its serializable members.

To be added.

## JsonSerializer.SerializeAsync(Stream, Object, Type, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SerializeAsync (System.IO.Stream utf8Json, object? value, Type inputType, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously converts the value of a specified type to UTF-8 encoded JSON text and writes it to the specified stream.

Parameters:

- `utf8Json`: The UTF-8 stream to write to.
- `value`: The value to convert.
- `inputType`: The type of the `value` to convert.
- `options`: Options to control serialization behavior.
- `cancellationToken`: A token that may be used to cancel the write operation.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentException`: `inputType` is not compatible with `value`.
- `ArgumentNullException`: `utf8Json` or `inputType` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType` or its serializable members.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

For more information, see How to serialize and deserialize JSON.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Serialize`.

## JsonSerializer.SerializeAsync(Stream, Object, Type, JsonSerializerContext, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SerializeAsync (System.IO.Stream utf8Json, object? value, Type inputType, System.Text.Json.Serialization.JsonSerializerContext context, System.Threading.CancellationToken <example-value> = default);
```

Converts the provided value to UTF-8 encoded JSON text and write it to the `Stream`.

Parameters:

- `utf8Json`: The UTF-8 `Stream` to write to.
- `value`: The value to convert.
- `inputType`: The type of the `value` to convert.
- `context`: A metadata provider for serializable types.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the write operation.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentException`: `inputType` is not compatible with `value`.
- `ArgumentNullException`: `utf8Json`, `inputType`, or `context` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType`  or its serializable members.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `JsonSerializer.Serialize`.

## JsonSerializer.SerializeAsync<TValue>(PipeWriter, TValue, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SerializeAsync<TValue> (System.IO.Pipelines.PipeWriter utf8Json, TValue value, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Converts the provided value to UTF-8 encoded JSON text and write it to the `PipeWriter`.

Parameters:

- `TValue`: The type of the value to serialize.
- `utf8Json`: The UTF-8 `PipeWriter` to write to.
- `value`: The value to convert.
- `options`: Options to control the conversion behavior.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the write operation.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.

## JsonSerializer.SerializeAsync<TValue>(PipeWriter, TValue, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SerializeAsync<TValue> (System.IO.Pipelines.PipeWriter utf8Json, TValue value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Converts the provided value to UTF-8 encoded JSON text and write it to the `PipeWriter`.

Parameters:

- `TValue`: The type of the value to serialize.
- `utf8Json`: The UTF-8 `PipeWriter` to write to.
- `value`: The value to convert.
- `jsonTypeInfo`: Metadata about the type to convert.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the write operation.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.

To be added.

## JsonSerializer.SerializeAsync<TValue>(Stream, TValue, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SerializeAsync<TValue> (System.IO.Stream utf8Json, TValue value, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously converts a value of a type specified by a generic type parameter to UTF-8 encoded JSON text and writes it to a stream.

Parameters:

- `TValue`: The type of the value to serialize.
- `utf8Json`: The UTF-8 stream to write to.
- `value`: The value to convert.
- `options`: Options to control serialization behavior.
- `cancellationToken`: A token that may be used to cancel the write operation.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

For more information, see How to serialize and deserialize JSON.

## JsonSerializer.SerializeAsync<TValue>(Stream, TValue, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SerializeAsync<TValue> (System.IO.Stream utf8Json, TValue value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Converts the provided value to UTF-8 encoded JSON text and write it to the `Stream`.

Parameters:

- `TValue`: The type of the value to serialize.
- `utf8Json`: The UTF-8 `Stream` to write to.
- `value`: The value to convert.
- `jsonTypeInfo`: Metadata about the type to convert.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the write operation.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
