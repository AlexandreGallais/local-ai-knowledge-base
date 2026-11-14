---
title: "JsonNode class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Nodes/JsonNode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonNode class (part 3 of 3)

## JsonNode.Parse(Stream, JsonNodeOptions>, JsonDocumentOptions) method

```csharp
public static System.Text.Json.Nodes.JsonNode? Parse (System.IO.Stream utf8Json, System.Text.Json.Nodes.JsonNodeOptions? nodeOptions = default, System.Text.Json.JsonDocumentOptions documentOptions = default);
```

Parses a `Stream` as UTF-8-encoded data representing a single JSON value into a `JsonNode`.  The Stream will be read to completion.

Parameters:

- `utf8Json`: JSON text to parse.
- `nodeOptions`: Options to control the node behavior after parsing.
- `documentOptions`: Options to control the document behavior during parsing.

Returns: A `JsonNode` representation of the JSON value, or null if the input represents the null JSON value.

Exceptions:

- `JsonException`: `utf8Json` does not represent a valid single JSON value.

To be added.

## JsonNode.Parse(Byte>, JsonNodeOptions>, JsonDocumentOptions) method

```csharp
public static System.Text.Json.Nodes.JsonNode? Parse (ReadOnlySpan<byte> utf8Json, System.Text.Json.Nodes.JsonNodeOptions? nodeOptions = default, System.Text.Json.JsonDocumentOptions documentOptions = default);
```

Parses text representing a single JSON value.

Parameters:

- `utf8Json`: JSON text to parse.
- `nodeOptions`: Options to control the node behavior after parsing.
- `documentOptions`: Options to control the document behavior during parsing.

Returns: A `JsonNode` representation of the JSON value, or null if the input represents the null JSON value.

Exceptions:

- `JsonException`: `utf8Json` does not represent a valid single JSON value.

To be added.

## JsonNode.Parse(String, JsonNodeOptions>, JsonDocumentOptions) method

```csharp
public static System.Text.Json.Nodes.JsonNode? Parse (string json, System.Text.Json.Nodes.JsonNodeOptions? nodeOptions = default, System.Text.Json.JsonDocumentOptions documentOptions = default);
```

Parses text representing a single JSON value.

Parameters:

- `json`: JSON text to parse.
- `nodeOptions`: Options to control the node behavior after parsing.
- `documentOptions`: Options to control the document behavior during parsing.

Returns: A `JsonNode` representation of the JSON value, or null if the input represents the null JSON value.

Exceptions:

- `ArgumentNullException`: `json` is `null`.
- `JsonException`: `json` does not represent a valid single JSON value.

To be added.

## JsonNode.ParseAsync(Stream, JsonNodeOptions>, JsonDocumentOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Text.Json.Nodes.JsonNode?> ParseAsync (System.IO.Stream utf8Json, System.Text.Json.Nodes.JsonNodeOptions? nodeOptions = default, System.Text.Json.JsonDocumentOptions documentOptions = default, System.Threading.CancellationToken <example-value> = default);
```

Parses a `Stream` as UTF-8 encoded data representing a single JSON value into a `JsonNode`.  The stream will be read to completion.

Parameters:

- `utf8Json`: The JSON text to parse.
- `nodeOptions`: Options to control the node behavior after parsing.
- `documentOptions`: Options to control the document behavior during parsing.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A `Task` to produce either a `JsonNode` representation of the JSON value, or null if the input represents the null JSON value.

Exceptions:

- `JsonException`: `utf8Json` does not represent a valid single JSON value.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## JsonNode.ReplaceWith<T>(T) method

```csharp
public void ReplaceWith<T> (T value);
```

Replaces this node with a new value.

Parameters:

- `T`: The type of value to be replaced.
- `value`: The value that replaces this node.

To be added.

## JsonNode.ToJsonString(JsonSerializerOptions) method

```csharp
public string ToJsonString (System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the current instance to a string in JSON format.

Parameters:

- `options`: Options to control the serialization behavior.

Returns: The JSON representation of the current instance.

`Parse` does not round-trip with this method, because of its behavior on the JSON null value.

## JsonNode.ToString() method

```csharp
public override string ToString ();
```

Gets a string representation for the current value appropriate to the node type.

Returns: A string representation for the current value appropriate to the node type.

To be added.

## JsonNode.WriteTo(Utf8JsonWriter, JsonSerializerOptions) method

```csharp
public abstract void WriteTo (System.Text.Json.Utf8JsonWriter writer, System.Text.Json.JsonSerializerOptions? options = default);
```

Writes the `JsonNode` into the provided `Utf8JsonWriter` as JSON.

Parameters:

- `writer`: The `Utf8JsonWriter`.
- `options`: Options to control the serialization behavior.

Exceptions:

- `ArgumentNullException`: The `writer` parameter is `null`.

To be added.
