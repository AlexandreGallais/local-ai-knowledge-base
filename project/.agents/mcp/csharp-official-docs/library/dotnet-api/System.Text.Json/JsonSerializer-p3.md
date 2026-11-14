---
title: "JsonSerializer class (part 3 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonSerializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonSerializer class (part 3 of 8)

## JsonSerializer.Deserialize<TValue>(Char>, JsonSerializerOptions) method

```csharp
public static TValue? Deserialize<TValue> (ReadOnlySpan<char> json, System.Text.Json.JsonSerializerOptions? options = default);
```

Parses the text representing a single JSON value into an instance of the type specified by a generic type parameter.

Parameters:

- `TValue`: The type to deserialize the JSON value into.
- `json`: The JSON text to parse.
- `options`: Options to control the behavior during parsing.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `JsonException`: The JSON is invalid.

-or-

`TValue` is not compatible with the JSON.

-or-

There is remaining data in the span beyond a single JSON value.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

#### Remarks

Using a UTF-16 span is not as efficient as using the
UTF-8 methods since the implementation natively uses UTF-8.

## JsonSerializer.Deserialize<TValue>(Char>, JsonTypeInfo<TValue>) method

```csharp
public static TValue? Deserialize<TValue> (ReadOnlySpan<char> json, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo);
```

Parses the text representing a single JSON value into a `TValue`.

Parameters:

- `TValue`: The type to deserialize the JSON value into.
- `json`: JSON text to parse.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `json` is `null`.

-or-

`jsonTypeInfo` is `null`.
- `JsonException`: The JSON is invalid.

-or-

`TValue` is not compatible with the JSON.

-or-

There is remaining data in the string beyond a single JSON value.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

#### Remarks

Using a `String` is not as efficient as using the
UTF-8 methods since the implementation natively uses UTF-8.

## JsonSerializer.Deserialize<TValue>(String, JsonSerializerOptions) method

```csharp
public static TValue? Deserialize<TValue> (string json, System.Text.Json.JsonSerializerOptions? options = default);
```

Parses the text representing a single JSON value into an instance of the type specified by a generic type parameter.

Parameters:

- `TValue`: The target type of the JSON value.
- `json`: The JSON text to parse.
- `options`: Options to control the behavior during parsing.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `json` is `null`.
- `JsonException`: The JSON is invalid.

-or-

`TValue` is not compatible with the JSON.

-or-

There is remaining data in the string beyond a single JSON value.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

#### Remarks

Using a `String` is not as efficient as using the UTF-8 methods since the implementation natively uses UTF-8.

For more information, see How to serialize and deserialize JSON.

## JsonSerializer.Deserialize<TValue>(String, JsonTypeInfo<TValue>) method

```csharp
public static TValue? Deserialize<TValue> (string json, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo);
```

Parses the text representing a single JSON value into a `TValue`.

Parameters:

- `TValue`: The type to deserialize the JSON value into.
- `json`: JSON text to parse.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `json` is `null`.

-or-

`jsonTypeInfo` is `null`.
- `JsonException`: The JSON is invalid.

-or-

`TValue` is not compatible with the JSON.

-or-

There is remaining data in the string beyond a single JSON value.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

#### Remarks

Using a `String` is not as efficient as using the
UTF-8 methods since the implementation natively uses UTF-8.

## JsonSerializer.Deserialize<TValue>(JsonDocument, JsonSerializerOptions) method

```csharp
public static TValue? Deserialize<TValue> (this System.Text.Json.JsonDocument document, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the `JsonDocument` representing a single JSON value into a `TValue`.

Parameters:

- `TValue`: The type to deserialize the JSON value into.
- `document`: The `JsonDocument` to convert.
- `options`: Options to control the behavior during parsing.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `document` is `null`.
- `JsonException`: `TValue` is not compatible with the JSON.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.

## JsonSerializer.Deserialize<TValue>(JsonDocument, JsonTypeInfo<TValue>) method

```csharp
public static TValue? Deserialize<TValue> (this System.Text.Json.JsonDocument document, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo);
```

Converts the `JsonDocument` representing a single JSON value into a `TValue`.

Parameters:

- `TValue`: The type to deserialize the JSON value into.
- `document`: The `JsonDocument` to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `document` is `null`.

-or-

`jsonTypeInfo` is `null`.
- `JsonException`: `TValue` is not compatible with the JSON.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.

## JsonSerializer.Deserialize<TValue>(JsonElement, JsonSerializerOptions) method

```csharp
public static TValue? Deserialize<TValue> (this System.Text.Json.JsonElement element, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the `JsonElement` representing a single JSON value into a `TValue`.

Parameters:

- `TValue`: The type to deserialize the JSON value into.
- `element`: The `JsonElement` to convert.
- `options`: Options to control the behavior during parsing.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `JsonException`: `TValue` is not compatible with the JSON.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.

## JsonSerializer.Deserialize<TValue>(JsonElement, JsonTypeInfo<TValue>) method

```csharp
public static TValue? Deserialize<TValue> (this System.Text.Json.JsonElement element, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo);
```

Converts the `JsonElement` representing a single JSON value into a `TValue`.

Parameters:

- `TValue`: The type to deserialize the JSON value into.
- `element`: The `JsonElement` to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `jsonTypeInfo` is `null`.
- `JsonException`: `TValue` is not compatible with the JSON.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.

## JsonSerializer.Deserialize<TValue>(JsonNode, JsonSerializerOptions) method

```csharp
public static TValue? Deserialize<TValue> (this System.Text.Json.Nodes.JsonNode? node, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the `JsonNode` representing a single JSON value into a `TValue`.

Parameters:

- `TValue`: The type to deserialize the JSON value into.
- `node`: The `JsonNode` to convert.
- `options`: Options to control the behavior during parsing.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `JsonException`: `TValue` is not compatible with the JSON.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.

## JsonSerializer.Deserialize<TValue>(JsonNode, JsonTypeInfo<TValue>) method

```csharp
public static TValue? Deserialize<TValue> (this System.Text.Json.Nodes.JsonNode? node, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo);
```

Converts the `JsonNode` representing a single JSON value into a `TValue`.

Parameters:

- `TValue`: The type to deserialize the JSON value into.
- `node`: The `JsonNode` to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `jsonTypeInfo` is `null`.
- `JsonException`: `TValue` is not compatible with the JSON.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.

## JsonSerializer.Deserialize<TValue>(Utf8JsonReader, JsonSerializerOptions) method

```csharp
public static TValue? Deserialize<TValue> (ref System.Text.Json.Utf8JsonReader reader, System.Text.Json.JsonSerializerOptions? options = default);
```

Reads one JSON value (including objects or arrays) from the provided reader into an instance of the type specified by a generic type parameter.

Parameters:

- `TValue`: The target type of the JSON value.
- `reader`: The reader to read the JSON from.
- `options`: Options to control serializer behavior during reading.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `JsonException`: The JSON is invalid.

-or-

`TValue` is not compatible with the JSON.

-or-

A value could not be read from the reader.
- `ArgumentException`: `reader` uses unsupported options.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

#### Remarks

If the `TokenType` property of `reader` is `PropertyName` or `None`, the reader will be advanced by one call to `Read` to determine the start of the value.

Upon completion of this method, `reader` will be positioned at the final token in the JSON value. If an exception is thrown, the reader is reset to the state it was in when the method was called.

This method makes a copy of the data the reader acted on, so there is no caller requirement to maintain data integrity beyond the return of this method.

The `JsonReaderOptions` used to create the instance of the `Utf8JsonReader` take precedence over the `JsonSerializerOptions` when they conflict. Hence, `AllowTrailingCommas`, `MaxDepth`, and `CommentHandling` are used while reading.

For more information, see How to serialize and deserialize JSON.

## JsonSerializer.Deserialize<TValue>(Utf8JsonReader, JsonTypeInfo<TValue>) method

```csharp
public static TValue? Deserialize<TValue> (ref System.Text.Json.Utf8JsonReader reader, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo);
```

Reads one JSON value (including objects or arrays) from the provided reader into a `TValue`.

Parameters:

- `TValue`: The type to deserialize the JSON value into.
- `reader`: The reader to read.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `JsonException`: The JSON is invalid, `TValue` is not compatible with the JSON, or a value could not be read from the reader.
- `ArgumentException`: `reader` is using unsupported options.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

If the `TokenType` property of `reader` is `PropertyName` or `None`, the reader will be advanced by one call to `Read` to determine the start of the value.

Upon completion of this method, `reader` is positioned at the final token in the JSON value.  If an exception is thrown, the reader is reset to the state it was in when the method was called.

This method makes a copy of the data the reader acted on, so there is no caller requirement to maintain data integrity beyond the return of this method.

The `JsonReaderOptions` used to create the instance of the `Utf8JsonReader` take precedence over the `JsonSerializerOptions` when they conflict. Hence, `AllowTrailingCommas`, `MaxDepth`, and `CommentHandling` are used while reading.

## JsonSerializer.DeserializeAsync(PipeReader, JsonTypeInfo, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<object?> DeserializeAsync (System.IO.Pipelines.PipeReader utf8Json, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Reads the UTF-8 encoded text representing a single JSON value into an instance specified by the `jsonTypeInfo`.

The PipeReader will be read to completion.

Parameters:

- `utf8Json`: JSON data to parse.
- `jsonTypeInfo`: Metadata about the type to convert.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the read operation.

Returns: A `jsonTypeInfo` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `utf8Json` or `jsonTypeInfo` is `null`.
- `JsonException`: The JSON is invalid, or there is remaining data in the PipeReader.

To be added.

## JsonSerializer.DeserializeAsync(Stream, JsonTypeInfo, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<object?> DeserializeAsync (System.IO.Stream utf8Json, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Reads the UTF-8 encoded text representing a single JSON value into an instance specified by the `jsonTypeInfo`.
The Stream will be read to completion.

Parameters:

- `utf8Json`: JSON data to parse.
- `jsonTypeInfo`: Metadata about the type to convert.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the read operation.

Returns: A `jsonTypeInfo` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `utf8Json` or `jsonTypeInfo` is `null`.
- `JsonException`: The JSON is invalid,
or there is remaining data in the Stream.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
