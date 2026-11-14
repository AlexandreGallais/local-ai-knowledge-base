---
title: "JsonDocument class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonDocument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonDocument class

Namespace: `System.Text.Json`

```csharp
public sealed class JsonDocument : IDisposable
```

Provides a mechanism for examining the structural content of a JSON value without automatically instantiating data values.

<format>

This class utilizes resources from pooled memory to minimize the impact of the garbage collector (GC) in high-usage scenarios. Failure to properly dispose this object will result in the memory not being returned to the pool, which will increase GC impact across various parts of the framework.

For more information, see How to use the JSON DOM, Utf8JsonReader, and Utf8JsonWriter in System.Text.Json.

</format>

## JsonDocument.RootElement property

```csharp
public System.Text.Json.JsonElement RootElement { get; }
```

Gets the root element of this JSON document.

Returns: A `JsonElement` representing the value of the document.

To be added.

## JsonDocument.Dispose() method

```csharp
public void Dispose ();
```

Releases the resources used by this `JsonDocument` instance.

To be added.

## JsonDocument.Parse(Byte>, JsonDocumentOptions) method

```csharp
public static System.Text.Json.JsonDocument Parse (System.Buffers.ReadOnlySequence<byte> utf8Json, System.Text.Json.JsonDocumentOptions options = default);
```

Parses a sequence as UTF-8-encoded text representing a single JSON value into a JsonDocument.

Parameters:

- `utf8Json`: The JSON text to parse.
- `options`: Options to control the reader behavior during parsing.

Returns: A JsonDocument representation of the JSON value.

Exceptions:

- `JsonException`: `utf8Json` does not represent a valid single JSON value.
- `ArgumentException`: `options` contains unsupported options.

<format>

## Remarks

The `ReadOnlySequence<T>` may be used for the entire lifetime of the JsonDocument object, and the caller must ensure that the data therein does not change during the object lifetime.
Because the input is considered to be text, a UTF-8 Byte-Order-Mark (BOM) must not be present.

</format>

## JsonDocument.Parse(Stream, JsonDocumentOptions) method

```csharp
public static System.Text.Json.JsonDocument Parse (System.IO.Stream utf8Json, System.Text.Json.JsonDocumentOptions options = default);
```

Parses a `Stream` as UTF-8-encoded data representing a single JSON value into a JsonDocument. The stream is read to completion.

Parameters:

- `utf8Json`: The JSON data to parse.
- `options`: Options to control the reader behavior during parsing.

Returns: A JsonDocument representation of the JSON value.

Exceptions:

- `JsonException`: `utf8Json` does not represent a valid single JSON value.
- `ArgumentException`: `options` contains unsupported options.

To be added.

## JsonDocument.Parse(Byte>, JsonDocumentOptions) method

```csharp
public static System.Text.Json.JsonDocument Parse (ReadOnlyMemory<byte> utf8Json, System.Text.Json.JsonDocumentOptions options = default);
```

Parses memory as UTF-8-encoded text representing a single JSON value into a JsonDocument.

Parameters:

- `utf8Json`: The JSON text to parse.
- `options`: Options to control the reader behavior during parsing.

Returns: A JsonDocument representation of the JSON value.

Exceptions:

- `JsonException`: `utf8Json` does not represent a valid single JSON value.
- `ArgumentException`: `options` contains unsupported options.

<format>

The `ReadOnlyMemory<T>` value will be used for the entire lifetime of the JsonDocument object, and the caller must ensure that the data therein does not change during the object lifetime.

Because the input is considered to be text, a UTF-8 Byte-Order-Mark (BOM) must not be present.
</format>

## JsonDocument.Parse(Char>, JsonDocumentOptions) method

```csharp
public static System.Text.Json.JsonDocument Parse (ReadOnlyMemory<char> json, System.Text.Json.JsonDocumentOptions options = default);
```

Parses text representing a single JSON value into a JsonDocument.

Parameters:

- `json`: The JSON text to parse.
- `options`: Options to control the reader behavior during parsing.

Returns: A JsonDocument representation of the JSON value.

Exceptions:

- `JsonException`: `json` does not represent a valid single JSON value.
- `ArgumentException`: `options` contains unsupported options.

<format>

## Remarks

The `ReadOnlyMemory<T>` value may be used for the entire lifetime of the JsonDocument object, and the caller must ensure that the data therein does not change during the object lifetime.

</format>

## JsonDocument.Parse(String, JsonDocumentOptions) method

```csharp
public static System.Text.Json.JsonDocument Parse (string json, System.Text.Json.JsonDocumentOptions options = default);
```

Parses text representing a single JSON string value into a JsonDocument.

Parameters:

- `json`: The JSON text to parse.
- `options`: Options to control the reader behavior during parsing.

Returns: A JsonDocument representation of the JSON value.

Exceptions:

- `JsonException`: `json` does not represent a valid single JSON value.
- `ArgumentException`: `options` contains unsupported options.

To be added.

## JsonDocument.ParseAsync(Stream, JsonDocumentOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Text.Json.JsonDocument> ParseAsync (System.IO.Stream utf8Json, System.Text.Json.JsonDocumentOptions options = default, System.Threading.CancellationToken <example-value> = default);
```

Parses a `Stream` as UTF-8-encoded data representing a single JSON value into a JsonDocument. The stream is read to completion.

Parameters:

- `utf8Json`: The JSON data to parse.
- `options`: Options to control the reader behavior during parsing.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task to produce a JsonDocument representation of the JSON value.

Exceptions:

- `JsonException`: `utf8Json` does not represent a valid single JSON value.
- `ArgumentException`: `options` contains unsupported options.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `JsonDocument.Parse`.

## JsonDocument.ParseValue(Utf8JsonReader) method

```csharp
public static System.Text.Json.JsonDocument ParseValue (ref System.Text.Json.Utf8JsonReader reader);
```

Parses one JSON value (including objects or arrays) from the provided reader.

Parameters:

- `reader`: The reader to read.

Returns: A JsonDocument representing the value (and nested values) read from the reader.

Exceptions:

- `ArgumentException`: `reader` contains unsupported options.

-or-

The current `reader` token does not start or represent a value.
- `JsonException`: A value could not be read from the reader.

<format>

## Remarks

If the `TokenType` property of `reader` is `PropertyName` or `None`, the reader will advance by one call to `Read` to determine the start of the value.

Upon completion of this method, `reader` is positioned at the final token in the JSON value. If an exception is thrown, the reader is reset to
the state it was in when the method was called.

This method makes a copy of the data the reader acted on, so there is no caller requirement to maintain data integrity beyond the return of this method.

</format>

## JsonDocument.TryParseValue(Utf8JsonReader, JsonDocument) method

```csharp
public static bool TryParseValue (ref System.Text.Json.Utf8JsonReader reader, out System.Text.Json.JsonDocument? document);
```

Attempts to parse one JSON value (including objects or arrays) from the provided reader.

Parameters:

- `reader`: The reader to read.
- `document`: When the method returns, contains the parsed document.

Returns: `true` if a value was read and parsed into a JsonDocument; `false` if the reader ran out of data while parsing. All other situations result in an exception being thrown.

Exceptions:

- `ArgumentException`: `reader` contains unsupported options.

-or-

The current `reader` token does not start or represent a value.
- `JsonException`: A value could not be read from the reader.

<format>

## Remarks

If the `TokenType` property of `reader` is `PropertyName` or `None`, the reader will advance by one call to `Read` to determine the start of the value.

Upon completion of this method, `reader` is positioned at the final token in the JSON value. If an exception is thrown or `false`
is returned, the reader is reset to the state it was in when the method was called.

This method makes a copy of the data the reader acted on, so there is no caller requirement to maintain data integrity beyond the return of this method.

</format>

## JsonDocument.WriteTo(Utf8JsonWriter) method

```csharp
public void WriteTo (System.Text.Json.Utf8JsonWriter writer);
```

Writes the document to the provided writer as a JSON value.

Parameters:

- `writer`: The writer to which to write the document.

Exceptions:

- `ArgumentNullException`: The `writer` parameter is `null`.
- `InvalidOperationException`: The `JsonElement.ValueKind` of this `JsonDocument.RootElement` would result in invalid JSON.
- `ObjectDisposedException`: The parent `JsonDocument` has been disposed.

To be added.
