---
title: "JsonSerializer class (part 4 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonSerializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonSerializer class (part 4 of 8)

## JsonSerializer.DeserializeAsync(PipeReader, Type, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<object?> DeserializeAsync (System.IO.Pipelines.PipeReader utf8Json, Type returnType, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Reads the UTF-8 encoded text representing a single JSON value into a `returnType`.

The PipeReader will be read to completion.

Parameters:

- `utf8Json`: JSON data to parse.
- `returnType`: The type of the object to convert to and return.
- `options`: Options to control the behavior during reading.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the read operation.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `utf8Json` or `returnType` is `null`.
- `JsonException`: The JSON is invalid, the `returnType` is not compatible with the JSON, or there is remaining data in the PipeReader.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.

To be added.

## JsonSerializer.DeserializeAsync(PipeReader, Type, JsonSerializerContext, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<object?> DeserializeAsync (System.IO.Pipelines.PipeReader utf8Json, Type returnType, System.Text.Json.Serialization.JsonSerializerContext context, System.Threading.CancellationToken <example-value> = default);
```

Reads the UTF-8 encoded text representing a single JSON value into a `returnType`.

The PipeReader will be read to completion.

Parameters:

- `utf8Json`: JSON data to parse.
- `returnType`: The type of the object to convert to and return.
- `context`: A metadata provider for serializable types.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the read operation.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `utf8Json`, `returnType`, or `context` is `null`.
- `JsonException`: The JSON is invalid, the `returnType` is not compatible with the JSON, or there is remaining data in the PipeReader.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.
- `InvalidOperationException`: The `JsonSerializerContext.GetTypeInfo` method on the provided `context` did not return a compatible `JsonTypeInfo` for `returnType`.

To be added.

## JsonSerializer.DeserializeAsync(Stream, Type, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<object?> DeserializeAsync (System.IO.Stream utf8Json, Type returnType, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads the UTF-8 encoded text representing a single JSON value into an instance of a specified type. The stream will be read to completion.

Parameters:

- `utf8Json`: The JSON data to parse.
- `returnType`: The type of the object to convert to and return.
- `options`: Options to control the behavior during reading.
- `cancellationToken`: A cancellation token that may be used to cancel the read operation.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `utf8Json` or `returnType` is `null`.
- `JsonException`: The JSON is invalid.

-or-

`TValue` is not compatible with the JSON.

-or-

There is remaining data in the stream.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

For more information, see How to serialize and deserialize JSON.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Deserialize`.

## JsonSerializer.DeserializeAsync(Stream, Type, JsonSerializerContext, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<object?> DeserializeAsync (System.IO.Stream utf8Json, Type returnType, System.Text.Json.Serialization.JsonSerializerContext context, System.Threading.CancellationToken <example-value> = default);
```

Reads the UTF-8 encoded text representing a single JSON value into a `returnType`.
The Stream will be read to completion.

Parameters:

- `utf8Json`: JSON data to parse.
- `returnType`: The type of the object to convert to and return.
- `context`: A metadata provider for serializable types.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the read operation.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `utf8Json`, `returnType`, or `context` is `null`.
- `JsonException`: The JSON is invalid, the `returnType` is not compatible with the JSON, or there is remaining data in the Stream.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.
- `InvalidOperationException`: The `JsonSerializerContext.GetTypeInfo` method on the provided `context` did not return a compatible `JsonTypeInfo` for `returnType`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `JsonSerializer.Deserialize`.

## JsonSerializer.DeserializeAsync<TValue>(PipeReader, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TValue?> DeserializeAsync<TValue> (System.IO.Pipelines.PipeReader utf8Json, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Reads the UTF-8 encoded text representing a single JSON value into a `TValue`.

The PipeReader will be read to completion.

Parameters:

- `TValue`: The type to deserialize the JSON value into.
- `utf8Json`: JSON data to parse.
- `options`: Options to control the behavior during reading.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the read operation.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.
- `JsonException`: The JSON is invalid, `TValue` is not compatible with the JSON, or there is remaining data in the PipeReader.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.

## JsonSerializer.DeserializeAsync<TValue>(PipeReader, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TValue?> DeserializeAsync<TValue> (System.IO.Pipelines.PipeReader utf8Json, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Reads the UTF-8 encoded text representing a single JSON value into a `TValue`.

The PipeReader will be read to completion.

Parameters:

- `TValue`: The type to deserialize the JSON value into.
- `utf8Json`: JSON data to parse.
- `jsonTypeInfo`: Metadata about the type to convert.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the read operation.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `utf8Json` or `jsonTypeInfo` is `null`.
- `JsonException`: The JSON is invalid, `TValue` is not compatible with the JSON, or there is remaining data in the PipeReader.

To be added.

## JsonSerializer.DeserializeAsync<TValue>(Stream, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TValue?> DeserializeAsync<TValue> (System.IO.Stream utf8Json, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads the UTF-8 encoded text representing a single JSON value into an instance of a type specified by a generic type parameter. The stream will be read to completion.

Parameters:

- `TValue`: The target type of the JSON value.
- `utf8Json`: The JSON data to parse.
- `options`: Options to control the behavior during reading.
- `cancellationToken`: A token that may be used to cancel the read operation.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `JsonException`: The JSON is invalid.

-or-

`TValue` is not compatible with the JSON.

-or-

There is remaining data in the stream.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.
- `ArgumentNullException`: `utf8Json`is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

For more information, see How to serialize and deserialize JSON.

## JsonSerializer.DeserializeAsync<TValue>(Stream, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TValue?> DeserializeAsync<TValue> (System.IO.Stream utf8Json, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Reads the UTF-8 encoded text representing a single JSON value into a `TValue`.
The Stream will be read to completion.

Parameters:

- `TValue`: The type to deserialize the JSON value into.
- `utf8Json`: JSON data to parse.
- `jsonTypeInfo`: Metadata about the type to convert.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the read operation.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `utf8Json` or `jsonTypeInfo` is `null`.
- `JsonException`: The JSON is invalid, `TValue` is not compatible with the JSON, or there is remaining data in the Stream.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## JsonSerializer.DeserializeAsyncEnumerable<TValue>(PipeReader, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> DeserializeAsyncEnumerable<TValue> (System.IO.Pipelines.PipeReader utf8Json, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Wraps the UTF-8 encoded text into an `IAsyncEnumerable<T>` that can be used to deserialize root-level JSON arrays in a streaming manner.

Parameters:

- `TValue`: The element type to deserialize asynchronously.
- `utf8Json`: JSON data to parse.
- `options`: Options to control the behavior during reading.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the read operation.

Returns: An `IAsyncEnumerable<T>` representation of the provided JSON array.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.

To be added.

## JsonSerializer.DeserializeAsyncEnumerable<TValue>(PipeReader, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> DeserializeAsyncEnumerable<TValue> (System.IO.Pipelines.PipeReader utf8Json, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Wraps the UTF-8 encoded text into an `IAsyncEnumerable<T>` that can be used to deserialize root-level JSON arrays in a streaming manner.

Parameters:

- `TValue`: The element type to deserialize asynchronously.
- `utf8Json`: JSON data to parse.
- `jsonTypeInfo`: Metadata about the element type to convert.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the read operation.

Returns: An `IAsyncEnumerable<T>` representation of the provided JSON array.

Exceptions:

- `ArgumentNullException`: `utf8Json` or `jsonTypeInfo` is `null`.

To be added.

## JsonSerializer.DeserializeAsyncEnumerable<TValue>(Stream, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> DeserializeAsyncEnumerable<TValue> (System.IO.Stream utf8Json, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Wraps the UTF-8 encoded text into an `IAsyncEnumerable<T>` that can be used to deserialize root-level JSON arrays in a streaming manner.

Parameters:

- `TValue`: The element type to deserialize asynchronously.
- `utf8Json`: JSON data to parse.
- `options`: Options to control the behavior during reading.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the read operation.

Returns: An `IAsyncEnumerable<T>` representation of the provided JSON array.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## JsonSerializer.DeserializeAsyncEnumerable<TValue>(Stream, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> DeserializeAsyncEnumerable<TValue> (System.IO.Stream utf8Json, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Wraps the UTF-8 encoded text into an `IAsyncEnumerable<T>` that can be used to deserialize root-level JSON arrays in a streaming manner.

Parameters:

- `TValue`: The element type to deserialize asynchronously.
- `utf8Json`: JSON data to parse.
- `jsonTypeInfo`: Metadata about the element type to convert.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the read operation.

Returns: An `IAsyncEnumerable<T>` representation of the provided JSON array.

Exceptions:

- `ArgumentNullException`: `utf8Json` or `jsonTypeInfo` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
