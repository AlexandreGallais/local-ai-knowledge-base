---
title: "JsonSerializer class (part 1 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonSerializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonSerializer class

Namespace: `System.Text.Json`

```csharp
public static class JsonSerializer
```

Provides functionality to serialize objects or value types to JSON and to deserialize JSON into objects or value types.

#### Remarks

For more information, see How to serialize and deserialize JSON.

## JsonSerializer.IsReflectionEnabledByDefault property

```csharp
public static bool IsReflectionEnabledByDefault { get; }
```

Gets a value that indicates whether unconfigured `JsonSerializerOptions` instances should default to the reflection-based `DefaultJsonTypeInfoResolver`.

Returns: To be added.

The value of the property is backed by the "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault" `AppContext` setting and defaults to `true` if unset.

## JsonSerializer.Deserialize(Stream, JsonTypeInfo) method

```csharp
public static object? Deserialize (System.IO.Stream utf8Json, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo);
```

Reads the UTF-8 encoded text representing a single JSON value into an instance specified by the `jsonTypeInfo`.
The Stream will be read to completion.

Parameters:

- `utf8Json`: JSON data to parse.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `jsonTypeInfo` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `utf8Json` or `jsonTypeInfo` is `null`.
- `JsonException`: The JSON is invalid,
or there is remaining data in the Stream.

To be added.

## JsonSerializer.Deserialize(Byte>, JsonTypeInfo) method

```csharp
public static object? Deserialize (ReadOnlySpan<byte> utf8Json, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo);
```

Parses the UTF-8 encoded text representing a single JSON value into an instance specified by the `jsonTypeInfo`.

Parameters:

- `utf8Json`: JSON text to parse.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `jsonTypeInfo` representation of the JSON value.

Exceptions:

- `JsonException`: The JSON is invalid,
or there is remaining data in the buffer.

To be added.

## JsonSerializer.Deserialize(Char>, JsonTypeInfo) method

```csharp
public static object? Deserialize (ReadOnlySpan<char> json, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo);
```

Parses the text representing a single JSON value into an instance specified by the `jsonTypeInfo`.

Parameters:

- `json`: JSON text to parse.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `jsonTypeInfo` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `jsonTypeInfo` is `null`.
- `JsonException`: The JSON is invalid.

-or-

There is remaining data in the string beyond a single JSON value.

Using a `String` is not as efficient as using the UTF-8 methods since the implementation natively uses UTF-8.

## JsonSerializer.Deserialize(String, JsonTypeInfo) method

```csharp
public static object? Deserialize (string json, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo);
```

Parses the text representing a single JSON value into an instance specified by the `jsonTypeInfo`.

Parameters:

- `json`: JSON text to parse.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `jsonTypeInfo` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `json` is `null`.

-or-

`jsonTypeInfo` is `null`.
- `JsonException`: The JSON is invalid.

-or-

There is remaining data in the string beyond a single JSON value.

Using a `String` is not as efficient as using the UTF-8 methods since the implementation natively uses UTF-8.

## JsonSerializer.Deserialize(JsonDocument, JsonTypeInfo) method

```csharp
public static object? Deserialize (this System.Text.Json.JsonDocument document, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo);
```

Converts the `JsonDocument` representing a single JSON value into an instance specified by the `jsonTypeInfo`.

Parameters:

- `document`: The `JsonDocument` to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `jsonTypeInfo` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `document` is `null`.

-or-

`jsonTypeInfo` is `null`.

To be added.

## JsonSerializer.Deserialize(JsonElement, JsonTypeInfo) method

```csharp
public static object? Deserialize (this System.Text.Json.JsonElement element, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo);
```

Converts the `JsonElement` representing a single JSON value into an instance specified by the `jsonTypeInfo`.

Parameters:

- `element`: The `JsonElement` to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `jsonTypeInfo` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `jsonTypeInfo` is `null`.

To be added.

## JsonSerializer.Deserialize(JsonNode, JsonTypeInfo) method

```csharp
public static object? Deserialize (this System.Text.Json.Nodes.JsonNode? node, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo);
```

Converts the `JsonNode` representing a single JSON value into an instance specified by the `jsonTypeInfo`.

Parameters:

- `node`: The `JsonNode` to convert.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `jsonTypeInfo` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `jsonTypeInfo` is `null`.

To be added.

## JsonSerializer.Deserialize(Utf8JsonReader, JsonTypeInfo) method

```csharp
public static object? Deserialize (ref System.Text.Json.Utf8JsonReader reader, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo);
```

Reads one JSON value (including objects or arrays) from the provided reader into an instance specified by the `jsonTypeInfo`.

Parameters:

- `reader`: The reader to read.
- `jsonTypeInfo`: Metadata about the type to convert.

Returns: A `jsonTypeInfo` representation of the JSON value.

Exceptions:

- `JsonException`: The JSON is invalid,
`jsonTypeInfo` is not compatible with the JSON,
or a value could not be read from the reader.
- `ArgumentException`: `reader` is using unsupported options.

If the `Utf8JsonReader.TokenType` property of
`reader` is `JsonTokenType.PropertyName`
or `JsonTokenType.None`, the reader will be advanced by one
call to `Utf8JsonReader.Read` to determine the start of the value.

Upon completion of this method, `reader` will be positioned at the final token
in the JSON value. If an exception is thrown, the reader is reset to the state it was in when the
method was called.

This method makes a copy of the data the reader acted on, so there is no caller requirement to
maintain data integrity beyond the return of this method.

The `JsonReaderOptions` used to create the instance of the
`Utf8JsonReader` take precedence over the
`JsonSerializerOptions` when they conflict.
Hence, `JsonReaderOptions.AllowTrailingCommas`,
`JsonReaderOptions.MaxDepth`, and
`JsonReaderOptions.CommentHandling` are used
while reading.

## JsonSerializer.Deserialize(Stream, Type, JsonSerializerOptions) method

```csharp
public static object? Deserialize (System.IO.Stream utf8Json, Type returnType, System.Text.Json.JsonSerializerOptions? options = default);
```

Reads the UTF-8 encoded text representing a single JSON value into a `returnType`.
The Stream will be read to completion.

Parameters:

- `utf8Json`: JSON data to parse.
- `returnType`: The type of the object to convert to and return.
- `options`: Options to control the behavior during reading.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `utf8Json` or `returnType` is `null`.
- `JsonException`: The JSON is invalid, the `returnType` is not compatible with the JSON, or there is remaining data in the Stream.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.

To be added.

## JsonSerializer.Deserialize(Stream, Type, JsonSerializerContext) method

```csharp
public static object? Deserialize (System.IO.Stream utf8Json, Type returnType, System.Text.Json.Serialization.JsonSerializerContext context);
```

Reads the UTF-8 encoded text representing a single JSON value into a `returnType`.
The Stream will be read to completion.

Parameters:

- `utf8Json`: JSON data to parse.
- `returnType`: The type of the object to convert to and return.
- `context`: A metadata provider for serializable types.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `utf8Json`, `returnType`, or `context` is `null`.
- `JsonException`: The JSON is invalid, the `returnType` is not compatible with the JSON, or there is remaining data in the Stream.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.
- `InvalidOperationException`: The `JsonSerializerContext.GetTypeInfo` method on the provided `context` did not return a compatible `JsonTypeInfo` for `returnType`.

To be added.

## JsonSerializer.Deserialize(Byte>, Type, JsonSerializerOptions) method

```csharp
public static object? Deserialize (ReadOnlySpan<byte> utf8Json, Type returnType, System.Text.Json.JsonSerializerOptions? options = default);
```

Parses the UTF-8 encoded text representing a single JSON value into an instance of a specified type.

Parameters:

- `utf8Json`: The JSON text to parse.
- `returnType`: The type of the object to convert to and return.
- `options`: Options to control the behavior during parsing.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `returnType` is `null`.
- `JsonException`: The JSON is invalid.

-or-

`returnType` is not compatible with the JSON.

-or-

There is remaining data in the span beyond a single JSON value.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.

#### Remarks

For more information, see How to serialize and deserialize JSON.

## JsonSerializer.Deserialize(Byte>, Type, JsonSerializerContext) method

```csharp
public static object? Deserialize (ReadOnlySpan<byte> utf8Json, Type returnType, System.Text.Json.Serialization.JsonSerializerContext context);
```

Parses the UTF-8 encoded text representing a single JSON value into a `returnType`.

Parameters:

- `utf8Json`: JSON text to parse.
- `returnType`: The type of the object to convert to and return.
- `context`: A metadata provider for serializable types.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `returnType` is `null`.
- `JsonException`: The JSON is invalid, `returnType` is not compatible with the JSON, or there is remaining data in the Stream.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.
- `InvalidOperationException`: The `JsonSerializerContext.GetTypeInfo` method on the provided `context` did not return a compatible `JsonTypeInfo` for `returnType`.

To be added.

## JsonSerializer.Deserialize(Char>, Type, JsonSerializerOptions) method

```csharp
public static object? Deserialize (ReadOnlySpan<char> json, Type returnType, System.Text.Json.JsonSerializerOptions? options = default);
```

Parses the text representing a single JSON value into an instance of a specified type.

Parameters:

- `json`: The JSON text to parse.
- `returnType`: The type of the object to convert to and return.
- `options`: Options to control the behavior during parsing.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `returnType` is `null`.
- `JsonException`: The JSON is invalid.

-or-

`returnType` is not compatible with the JSON.

-or-

There is remaining data in the span beyond a single JSON value.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.

#### Remarks

Using a UTF-16 span is not as efficient as using the
UTF-8 methods since the implementation natively uses UTF-8.

## JsonSerializer.Deserialize(Char>, Type, JsonSerializerContext) method

```csharp
public static object? Deserialize (ReadOnlySpan<char> json, Type returnType, System.Text.Json.Serialization.JsonSerializerContext context);
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

## JsonSerializer.Deserialize(String, Type, JsonSerializerOptions) method

```csharp
public static object? Deserialize (string json, Type returnType, System.Text.Json.JsonSerializerOptions? options = default);
```

Parses the text representing a single JSON value into an instance of a specified type.

Parameters:

- `json`: The JSON text to parse.
- `returnType`: The type of the object to convert to and return.
- `options`: Options to control the behavior during parsing.

Returns: A `returnType` representation of the JSON value.

Exceptions:

- `ArgumentNullException`: `json` or `returnType` is `null`.
- `JsonException`: The JSON is invalid.

-or-

`TValue` is not compatible with the JSON.

-or-

There is remaining data in the string beyond a single JSON value.
- `NotSupportedException`: There is no compatible `JsonConverter` for `returnType` or its serializable members.

#### Remarks

Using a `String` is not as efficient as using the
UTF-8 methods since the implementation natively uses UTF-8.

For more information, see How to serialize and deserialize JSON.
