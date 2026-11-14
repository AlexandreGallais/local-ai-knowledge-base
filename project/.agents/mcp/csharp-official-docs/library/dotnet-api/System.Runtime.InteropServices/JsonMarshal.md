---
title: "JsonMarshal class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/JsonMarshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonMarshal class

Namespace: `System.Runtime.InteropServices`

```csharp
public static class JsonMarshal
```

An unsafe class that provides a set of methods to access the underlying data representations of JSON types.

To be added.

## JsonMarshal.GetRawUtf8PropertyName(JsonProperty) method

```csharp
public static ReadOnlySpan<byte> GetRawUtf8PropertyName (System.Text.Json.JsonProperty property);
```

Gets a `ReadOnlySpan<T>` view over the raw JSON data of the given `JsonProperty` name.

Parameters:

- `property`: The JSON property from which to extract the span.

Returns: The span containing the raw JSON data of the `property` name. This will not include the enclosing quotes.

Exceptions:

- `ObjectDisposedException`: The underlying `JsonDocument` has been disposed.

While the method itself does check for disposal of the underlying `JsonDocument`, it is possible that it could be disposed after the method returns, which would result in the span pointing to a buffer that has been returned to the shared pool. Callers should take extra care to make sure that such a scenario isn't possible to avoid potential data corruption.

## JsonMarshal.GetRawUtf8Value(JsonElement) method

```csharp
public static ReadOnlySpan<byte> GetRawUtf8Value (System.Text.Json.JsonElement element);
```

Gets a `ReadOnlySpan<T>` view over the raw JSON data of the given `JsonElement`.

Parameters:

- `element`: The JSON element from which to extract the span.

Returns: The span containing the raw JSON data of`element`.

Exceptions:

- `ObjectDisposedException`: The underlying `JsonDocument` has been disposed.

While the method itself does check for disposal of the underlying `JsonDocument`, it is possible that it could be disposed after the method returns, which would result in the span pointing to a buffer that has been returned to the shared pool. Callers should take extra care to make sure that such a scenario isn't possible to avoid potential data corruption.
