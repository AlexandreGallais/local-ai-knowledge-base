---
title: "JsonSerializer class (part 7 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonSerializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonSerializer class (part 7 of 8)

## JsonSerializer.SerializeAsyncEnumerable<TValue>(PipeWriter, IAsyncEnumerable<TValue>, Boolean, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SerializeAsyncEnumerable<TValue> (System.IO.Pipelines.PipeWriter utf8Json, System.Collections.Generic.IAsyncEnumerable<TValue> value, bool topLevelValues = false, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `TValue`: To be added.
- `utf8Json`: To be added.
- `value`: To be added.
- `topLevelValues`: To be added.
- `options`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## JsonSerializer.SerializeAsyncEnumerable<TValue>(PipeWriter, IAsyncEnumerable<TValue>, JsonTypeInfo<TValue>, Boolean, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SerializeAsyncEnumerable<TValue> (System.IO.Pipelines.PipeWriter utf8Json, System.Collections.Generic.IAsyncEnumerable<TValue> value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, bool topLevelValues = false, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `TValue`: To be added.
- `utf8Json`: To be added.
- `value`: To be added.
- `jsonTypeInfo`: To be added.
- `topLevelValues`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## JsonSerializer.SerializeAsyncEnumerable<TValue>(Stream, IAsyncEnumerable<TValue>, Boolean, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SerializeAsyncEnumerable<TValue> (System.IO.Stream utf8Json, System.Collections.Generic.IAsyncEnumerable<TValue> value, bool topLevelValues = false, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `TValue`: To be added.
- `utf8Json`: To be added.
- `value`: To be added.
- `topLevelValues`: To be added.
- `options`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## JsonSerializer.SerializeAsyncEnumerable<TValue>(Stream, IAsyncEnumerable<TValue>, JsonTypeInfo<TValue>, Boolean, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SerializeAsyncEnumerable<TValue> (System.IO.Stream utf8Json, System.Collections.Generic.IAsyncEnumerable<TValue> value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, bool topLevelValues = false, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `TValue`: To be added.
- `utf8Json`: To be added.
- `value`: To be added.
- `jsonTypeInfo`: To be added.
- `topLevelValues`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## JsonSerializer.SerializeToDocument(Object, JsonTypeInfo) method

```csharp
public static System.Text.Json.JsonDocument SerializeToDocument (object? value, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo);
```

Converts the provided value into a `JsonDocument`.

Parameters:

- `value`: The value to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `JsonDocument` representation of the value.

Exceptions:

- `ArgumentNullException`: `jsonTypeInfo` is `null`.
- `InvalidCastException`: `value` does not match the type of `jsonTypeInfo`.

To be added.

## JsonSerializer.SerializeToDocument(Object, Type, JsonSerializerOptions) method

```csharp
public static System.Text.Json.JsonDocument SerializeToDocument (object? value, Type inputType, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the provided value into a `JsonDocument`.

Parameters:

- `value`: The value to convert.
- `inputType`: The type of the `value` to convert.
- `options`: Options to control the conversion behavior.

Returns: A `JsonDocument` representation of the value.

Exceptions:

- `ArgumentException`: `inputType` is not compatible with `value`.
- `ArgumentNullException`: `inputType` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType`  or its serializable members.

To be added.

## JsonSerializer.SerializeToDocument(Object, Type, JsonSerializerContext) method

```csharp
public static System.Text.Json.JsonDocument SerializeToDocument (object? value, Type inputType, System.Text.Json.Serialization.JsonSerializerContext context);
```

Converts the provided value into a `JsonDocument`.

Parameters:

- `value`: The value to convert.
- `inputType`: The type of the `value` to convert.
- `context`: A metadata provider for serializable types.

Returns: A `JsonDocument` representation of the value.

Exceptions:

- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType` or its serializable members.
- `InvalidOperationException`: The `JsonSerializerContext.GetTypeInfo` method of the provided `context` returns `null` for the type to convert.
- `ArgumentNullException`: `inputType` or `context` is `null`.

To be added.

## JsonSerializer.SerializeToDocument<TValue>(TValue, JsonSerializerOptions) method

```csharp
public static System.Text.Json.JsonDocument SerializeToDocument<TValue> (TValue value, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the provided value into a `JsonDocument`.

Parameters:

- `TValue`: The type of the value to serialize.
- `value`: The value to convert.
- `options`: Options to control the conversion behavior.

Returns: A `JsonDocument` representation of the JSON value.

Exceptions:

- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.

## JsonSerializer.SerializeToDocument<TValue>(TValue, JsonTypeInfo<TValue>) method

```csharp
public static System.Text.Json.JsonDocument SerializeToDocument<TValue> (TValue value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo);
```

Converts the provided value into a `JsonDocument`.

Parameters:

- `TValue`: The type of the value to serialize.
- `value`: The value to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `JsonDocument` representation of the value.

Exceptions:

- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.
- `ArgumentNullException`: `jsonTypeInfo` is `null`.

To be added.

## JsonSerializer.SerializeToElement(Object, JsonTypeInfo) method

```csharp
public static System.Text.Json.JsonElement SerializeToElement (object? value, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo);
```

Converts the provided value into a `JsonElement`.

Parameters:

- `value`: The value to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `JsonElement` representation of the value.

Exceptions:

- `ArgumentNullException`: `jsonTypeInfo` is `null`.
- `InvalidCastException`: `value` does not match the type of `jsonTypeInfo`.

To be added.

## JsonSerializer.SerializeToElement(Object, Type, JsonSerializerOptions) method

```csharp
public static System.Text.Json.JsonElement SerializeToElement (object? value, Type inputType, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the provided value into a `JsonElement`.

Parameters:

- `value`: The value to convert.
- `inputType`: The type of the `value` to convert.
- `options`: Options to control the conversion behavior.

Returns: A `JsonElement` representation of the value.

Exceptions:

- `ArgumentException`: `inputType` is not compatible with `value`.
- `ArgumentNullException`: `inputType` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType`  or its serializable members.

To be added.

## JsonSerializer.SerializeToElement(Object, Type, JsonSerializerContext) method

```csharp
public static System.Text.Json.JsonElement SerializeToElement (object? value, Type inputType, System.Text.Json.Serialization.JsonSerializerContext context);
```

Converts the provided value into a `JsonElement`.

Parameters:

- `value`: The value to convert.
- `inputType`: The type of the `value` to convert.
- `context`: A metadata provider for serializable types.

Returns: A `JsonElement` representation of the value.

Exceptions:

- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType` or its serializable members.
- `InvalidOperationException`: The `JsonSerializerContext.GetTypeInfo` method of the provided `context` returns `null` for the type to convert.
- `ArgumentNullException`: `inputType` or `context` is `null`.

To be added.

## JsonSerializer.SerializeToElement<TValue>(TValue, JsonSerializerOptions) method

```csharp
public static System.Text.Json.JsonElement SerializeToElement<TValue> (TValue value, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the provided value into a `JsonElement`.

Parameters:

- `TValue`: The type of the value to serialize.
- `value`: The value to convert.
- `options`: Options to control the conversion behavior.

Returns: A `JsonElement` representation of the JSON value.

Exceptions:

- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.

## JsonSerializer.SerializeToElement<TValue>(TValue, JsonTypeInfo<TValue>) method

```csharp
public static System.Text.Json.JsonElement SerializeToElement<TValue> (TValue value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo);
```

Converts the provided value into a `JsonElement`.

Parameters:

- `TValue`: The type of the value to serialize.
- `value`: The value to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `JsonElement` representation of the value.

Exceptions:

- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.
- `ArgumentNullException`: `jsonTypeInfo` is `null`.

To be added.

## JsonSerializer.SerializeToNode(Object, JsonTypeInfo) method

```csharp
public static System.Text.Json.Nodes.JsonNode? SerializeToNode (object? value, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo);
```

Converts the provided value into a `JsonNode`.

Parameters:

- `value`: The value to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `JsonNode` representation of the value.

Exceptions:

- `ArgumentNullException`: `jsonTypeInfo` is `null`.
- `InvalidCastException`: `value` does not match the type of `jsonTypeInfo`.

To be added.

## JsonSerializer.SerializeToNode(Object, Type, JsonSerializerOptions) method

```csharp
public static System.Text.Json.Nodes.JsonNode? SerializeToNode (object? value, Type inputType, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the provided value into a `JsonNode`.

Parameters:

- `value`: The value to convert.
- `inputType`: The type of the `value` to convert.
- `options`: Options to control the conversion behavior.

Returns: A `JsonNode` representation of the value.

Exceptions:

- `ArgumentException`: `inputType` is not compatible with `value`.
- `ArgumentNullException`: `inputType` is `null`.
- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType`  or its serializable members.

To be added.

## JsonSerializer.SerializeToNode(Object, Type, JsonSerializerContext) method

```csharp
public static System.Text.Json.Nodes.JsonNode? SerializeToNode (object? value, Type inputType, System.Text.Json.Serialization.JsonSerializerContext context);
```

Converts the provided value into a `JsonNode`.

Parameters:

- `value`: The value to convert.
- `inputType`: The type of the `value` to convert.
- `context`: A metadata provider for serializable types.

Returns: A `JsonNode` representation of the value.

Exceptions:

- `NotSupportedException`: There is no compatible `JsonConverter` for `inputType` or its serializable members.
- `InvalidOperationException`: The `JsonSerializerContext.GetTypeInfo` method of the provided `context` returns `null` for the type to convert.
- `ArgumentNullException`: `inputType` or `context` is `null`.

To be added.

## JsonSerializer.SerializeToNode<TValue>(TValue, JsonSerializerOptions) method

```csharp
public static System.Text.Json.Nodes.JsonNode? SerializeToNode<TValue> (TValue value, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the provided value into a `JsonNode`.

Parameters:

- `TValue`: The type of the value to serialize.
- `value`: The value to convert.
- `options`: Options to control the conversion behavior.

Returns: A `JsonNode` representation of the JSON value.

Exceptions:

- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.

## JsonSerializer.SerializeToNode<TValue>(TValue, JsonTypeInfo<TValue>) method

```csharp
public static System.Text.Json.Nodes.JsonNode? SerializeToNode<TValue> (TValue value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo);
```

Converts the provided value into a `JsonNode`.

Parameters:

- `TValue`: The type of the value to serialize.
- `value`: The value to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `JsonNode` representation of the value.

Exceptions:

- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.
- `ArgumentNullException`: `jsonTypeInfo` is `null`.

To be added.

## JsonSerializer.SerializeToUtf8Bytes(Object, JsonTypeInfo) method

```csharp
public static byte[] SerializeToUtf8Bytes (object? value, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo);
```

Converts the provided value into a `Byte` array.

Parameters:

- `value`: The value to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A UTF-8 representation of the value.

Exceptions:

- `ArgumentNullException`: `jsonTypeInfo` is `null`.
- `InvalidCastException`: `value` does not match the type of `jsonTypeInfo`.

To be added.
