---
title: "JsonSerializer class (part 2 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonSerializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonSerializer class (part 2 of 8)

## JsonSerializer.Deserialize(String, Type, JsonSerializerContext) method

```csharp
public static object? Deserialize (string json, Type returnType, System.Text.Json.Serialization.JsonSerializerContext context);
```

Parses the text representing a single JSON value into a `returnType`.

Parameters:

- `json`: JSON text to parse.
- `returnType`: The type of the object to convert to and return.
- `context`: A metadata provider for serializable types.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `json` or `returnType` is `null`.

-or-

`context` is `null`.
- `JsonException`: The JSON is invalid.

-or-

`returnType` is not compatible with the JSON.

-or-

There is remaining data in the string beyond a single JSON value.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.
- `InvalidOperationException`: The `JsonSerializerContext.GetTypeInfo` method of the provided `context` returns `null` for the type to convert.

#### Remarks

Using a `String` is not as efficient as using the
UTF-8 methods since the implementation natively uses UTF-8.

## JsonSerializer.Deserialize(JsonDocument, Type, JsonSerializerOptions) method

```csharp
public static object? Deserialize (this System.Text.Json.JsonDocument document, Type returnType, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the `JsonDocument` representing a single JSON value into a `returnType`.

Parameters:

- `document`: The `JsonDocument` to convert.
- `returnType`: The type of the object to convert to and return.
- `options`: Options to control the behavior during parsing.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `document` or `returnType` is `null`.
- `JsonException`: `returnType` is not compatible with the JSON.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.

To be added.

## JsonSerializer.Deserialize(JsonDocument, Type, JsonSerializerContext) method

```csharp
public static object? Deserialize (this System.Text.Json.JsonDocument document, Type returnType, System.Text.Json.Serialization.JsonSerializerContext context);
```

Converts the `JsonDocument` representing a single JSON value into a `returnType`.

Parameters:

- `document`: The `JsonDocument` to convert.
- `returnType`: The type of the object to convert to and return.
- `context`: A metadata provider for serializable types.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `document` is `null`.

-or-

`returnType` is `null`.

-or-

`context` is `null`.
- `JsonException`: The JSON is invalid.

-or-

`returnType` is not compatible with the JSON.

-or-

There is remaining data in the string beyond a single JSON value.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.
- `InvalidOperationException`: The `JsonSerializerContext.GetTypeInfo` method of the provided `context` returns `null` for the type to convert.

To be added.

## JsonSerializer.Deserialize(JsonElement, Type, JsonSerializerOptions) method

```csharp
public static object? Deserialize (this System.Text.Json.JsonElement element, Type returnType, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the `JsonElement` representing a single JSON value into a `returnType`.

Parameters:

- `element`: The `JsonElement` to convert.
- `returnType`: The type of the object to convert to and return.
- `options`: Options to control the behavior during parsing.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `returnType` is `null`.
- `JsonException`: `returnType` is not compatible with the JSON.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.

To be added.

## JsonSerializer.Deserialize(JsonElement, Type, JsonSerializerContext) method

```csharp
public static object? Deserialize (this System.Text.Json.JsonElement element, Type returnType, System.Text.Json.Serialization.JsonSerializerContext context);
```

Converts the `JsonElement` representing a single JSON value into a `returnType`.

Parameters:

- `element`: The `JsonElement` to convert.
- `returnType`: The type of the object to convert to and return.
- `context`: A metadata provider for serializable types.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `returnType` is `null`.

-or-

`context` is `null`.
- `JsonException`: The JSON is invalid.

-or-

`returnType` is not compatible with the JSON.

-or-

There is remaining data in the string beyond a single JSON value.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.
- `InvalidOperationException`: The `JsonSerializerContext.GetTypeInfo` method of the provided `context` returns `null` for the type to convert.

To be added.

## JsonSerializer.Deserialize(JsonNode, Type, JsonSerializerOptions) method

```csharp
public static object? Deserialize (this System.Text.Json.Nodes.JsonNode? node, Type returnType, System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the `JsonNode` representing a single JSON value into a `returnType`.

Parameters:

- `node`: The `JsonNode` to convert.
- `returnType`: The type of the object to convert to and return.
- `options`: Options to control the behavior during parsing.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `JsonException`: `returnType` is not compatible with the JSON.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.

To be added.

## JsonSerializer.Deserialize(JsonNode, Type, JsonSerializerContext) method

```csharp
public static object? Deserialize (this System.Text.Json.Nodes.JsonNode? node, Type returnType, System.Text.Json.Serialization.JsonSerializerContext context);
```

Converts the `JsonNode` representing a single JSON value into a `returnType`.

Parameters:

- `node`: The `JsonNode` to convert.
- `returnType`: The type of the object to convert to and return.
- `context`: A metadata provider for serializable types.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `returnType` is `null`.

-or-

`context` is `null`.
- `JsonException`: The JSON is invalid.

-or-

`returnType` is not compatible with the JSON.

-or-

There is remaining data in the string beyond a single JSON value.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.
- `InvalidOperationException`: The `JsonSerializerContext.GetTypeInfo` method of the provided `context` returns `null` for the type to convert.

To be added.

## JsonSerializer.Deserialize(Utf8JsonReader, Type, JsonSerializerOptions) method

```csharp
public static object? Deserialize (ref System.Text.Json.Utf8JsonReader reader, Type returnType, System.Text.Json.JsonSerializerOptions? options = default);
```

Reads one JSON value (including objects or arrays) from the provided reader and converts it into an instance of  a specified type.

Parameters:

- `reader`: The reader to read the JSON from.
- `returnType`: The type of the object to convert to and return.
- `options`: Options to control the serializer behavior during reading.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `returnType` is `null`.
- `JsonException`: The JSON is invalid.

-or-

`returnType` is not compatible with the JSON.

-or-

A value could not be read from the reader.
- `ArgumentException`: `reader` is using unsupported options.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.

#### Remarks

If the `TokenType` property of `reader` is `PropertyName` or `None`, the reader will be advanced by one call to `Read` to determine the start of the value.

Upon completion of this method, `reader` will be positioned at the final token in the JSON value.  If an exception is thrown, the reader is reset to the state it was in when the method was called.

This method makes a copy of the data the reader acted on, so there is no caller requirement to maintain data integrity beyond the return of this method.

The `JsonReaderOptions` used to create the instance of the `Utf8JsonReader` take precedence over the `JsonSerializerOptions` when they conflict. Hence, `AllowTrailingCommas`, `MaxDepth`, and `CommentHandling` are used while reading.

For more information, see How to serialize and deserialize JSON.

## JsonSerializer.Deserialize(Utf8JsonReader, Type, JsonSerializerContext) method

```csharp
public static object? Deserialize (ref System.Text.Json.Utf8JsonReader reader, Type returnType, System.Text.Json.Serialization.JsonSerializerContext context);
```

Reads one JSON value (including objects or arrays) from the provided reader into a `returnType`.

Parameters:

- `reader`: The reader to read.
- `returnType`: The type of the object to convert to and return.
- `context`: A metadata provider for serializable types.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `returnType` or `context` is `null`.
- `JsonException`: The JSON is invalid, `returnType` is not compatible with the JSON, or a value could not be read from the reader.
- `ArgumentException`: `reader` is using unsupported options.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.
- `InvalidOperationException`: The `JsonSerializerContext.GetTypeInfo` method on the provided `context` did not return a compatible `JsonTypeInfo` for `returnType`.

If the `TokenType` property of `reader` is `PropertyName` or `None`, the reader will be advanced by one call to `Read` to determine the start of the value.

Upon completion of this method, `reader` is positioned at the final token in the JSON value. If an exception is thrown, the reader is reset to the state it was in when the method was called.

This method makes a copy of the data the reader acted on, so there is no caller requirement to maintain data integrity beyond the return of this method.

The `JsonReaderOptions` used to create the instance of the `Utf8JsonReader` take precedence over the `JsonSerializerOptions` when they conflict. Hence, `AllowTrailingCommas`, `MaxDepth`, and `CommentHandling` are used while reading.

## JsonSerializer.Deserialize<TValue>(Stream, JsonSerializerOptions) method

```csharp
public static TValue? Deserialize<TValue> (System.IO.Stream utf8Json, System.Text.Json.JsonSerializerOptions? options = default);
```

Reads the UTF-8 encoded text representing a single JSON value into a `TValue`.
The Stream will be read to completion.

Parameters:

- `TValue`: The type to deserialize the JSON value into.
- `utf8Json`: JSON data to parse.
- `options`: Options to control the behavior during reading.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `utf8Json` is `null`.
- `JsonException`: The JSON is invalid, `TValue` is not compatible with the JSON, or there is remaining data in the Stream.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.

## JsonSerializer.Deserialize<TValue>(Stream, JsonTypeInfo<TValue>) method

```csharp
public static TValue? Deserialize<TValue> (System.IO.Stream utf8Json, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo);
```

Reads the UTF-8 encoded text representing a single JSON value into a `TValue`.
The Stream will be read to completion.

Parameters:

- `TValue`: The type to deserialize the JSON value into.
- `utf8Json`: JSON data to parse.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `utf8Json` or `jsonTypeInfo` is `null`.
- `JsonException`: The JSON is invalid, `TValue` is not compatible with the JSON, or there is remaining data in the Stream.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.

## JsonSerializer.Deserialize<TValue>(Byte>, JsonSerializerOptions) method

```csharp
public static TValue? Deserialize<TValue> (ReadOnlySpan<byte> utf8Json, System.Text.Json.JsonSerializerOptions? options = default);
```

Parses the UTF-8 encoded text representing a single JSON value into an instance of the type specified by a generic type parameter.

Parameters:

- `TValue`: The target type of the UTF-8 encoded text.
- `utf8Json`: The JSON text to parse.
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

For more information, see How to serialize and deserialize JSON.

## JsonSerializer.Deserialize<TValue>(Byte>, JsonTypeInfo<TValue>) method

```csharp
public static TValue? Deserialize<TValue> (ReadOnlySpan<byte> utf8Json, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo);
```

Parses the UTF-8 encoded text representing a single JSON value into a `TValue`.

Parameters:

- `TValue`: The type to deserialize the JSON value into.
- `utf8Json`: JSON text to parse.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `TValue` representation of the JSON value.

Exceptions:

- `JsonException`: The JSON is invalid, `TValue` is not compatible with the JSON, or there is remaining data in the Stream.
- `NotSupportedException`: There is no compatible `JsonConverter` for `TValue` or its serializable members.

To be added.
