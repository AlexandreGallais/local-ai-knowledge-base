---
title: "JsonContent class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Json/JsonContent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonContent class

Namespace: `System.Net.Http.Json`

```csharp
public sealed class JsonContent : System.Net.Http.HttpContent
```

Provides HTTP content based on JSON.

To be added.

## JsonContent.ObjectType property

```csharp
public Type ObjectType { get; }
```

Gets the type of the `JsonContent.Value` to be serialized by this instance.

Returns: The type of the `JsonContent.Value` to be serialized by this instance.

To be added.

## JsonContent.Value property

```csharp
public object? Value { get; }
```

Gets the value to be serialized and used as the body of the `HttpRequestMessage` that sends this instance.

Returns: The value to be serialized and used as the body of the `HttpRequestMessage` that sends this instance.

To be added.

## JsonContent.Create(Object, JsonTypeInfo, MediaTypeHeaderValue) method

```csharp
public static System.Net.Http.Json.JsonContent Create (object? inputValue, System.Text.Json.Serialization.Metadata.JsonTypeInfo jsonTypeInfo, System.Net.Http.Headers.MediaTypeHeaderValue? mediaType = default);
```

Creates a new instance of the `JsonContent` class that will contain the `inputValue` serialized as JSON.

Parameters:

- `inputValue`: The value to serialize.
- `jsonTypeInfo`: The JsonTypeInfo used to control the serialization behavior.
- `mediaType`: The media type to use for the content.

Returns: A `JsonContent` instance.

To be added.

## JsonContent.Create(Object, Type, MediaTypeHeaderValue, JsonSerializerOptions) method

```csharp
public static System.Net.Http.Json.JsonContent Create (object? inputValue, Type inputType, System.Net.Http.Headers.MediaTypeHeaderValue? mediaType = default, System.Text.Json.JsonSerializerOptions? options = default);
```

Creates a new instance of the `JsonContent` class that will contain the `inputValue` serialized as JSON.

Parameters:

- `inputValue`: The value to serialize.
- `inputType`: The type of the value to serialize.
- `mediaType`: The media type to use for the content.
- `options`: Options to control the behavior during serialization, the default options are `JsonSerializerDefaults.Web`.

Returns: A `JsonContent` instance.

To be added.

## JsonContent.Create<T>(T, MediaTypeHeaderValue, JsonSerializerOptions) method

```csharp
public static System.Net.Http.Json.JsonContent Create<T> (T inputValue, System.Net.Http.Headers.MediaTypeHeaderValue? mediaType = default, System.Text.Json.JsonSerializerOptions? options = default);
```

Creates a new instance of the `JsonContent` class that will contain the `inputValue` serialized as JSON.

Parameters:

- `T`: The type of the value to serialize.
- `inputValue`: The value to serialize.
- `mediaType`: The media type to use for the content.
- `options`: Options to control the behavior during serialization, the default options are `JsonSerializerDefaults.Web`.

Returns: A `JsonContent` instance.

To be added.

## JsonContent.Create<T>(T, JsonTypeInfo<T>, MediaTypeHeaderValue) method

```csharp
public static System.Net.Http.Json.JsonContent Create<T> (T? inputValue, System.Text.Json.Serialization.Metadata.JsonTypeInfo<T> jsonTypeInfo, System.Net.Http.Headers.MediaTypeHeaderValue? mediaType = default);
```

Creates a new instance of the `JsonContent` class that will contain the `inputValue` serialized as JSON.

Parameters:

- `T`: The type of the value to serialize.
- `inputValue`: The value to serialize.
- `jsonTypeInfo`: The JsonTypeInfo used to control the serialization behavior.
- `mediaType`: The media type to use for the content.

Returns: A `JsonContent` instance.

To be added.

## JsonContent.SerializeToStream(Stream, TransportContext, CancellationToken) method

```csharp
protected override void SerializeToStream (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

To be added.

Parameters:

- `stream`: To be added.
- `context`: To be added.
- `cancellationToken`: To be added.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## JsonContent.SerializeToStreamAsync(Stream, TransportContext) method

```csharp
protected override System.Threading.Tasks.Task SerializeToStreamAsync (System.IO.Stream stream, System.Net.TransportContext? context);
```

To be added.

Parameters:

- `stream`: To be added.
- `context`: To be added.

Returns: To be added.

To be added.

## JsonContent.SerializeToStreamAsync(Stream, TransportContext, CancellationToken) method

```csharp
protected override System.Threading.Tasks.Task SerializeToStreamAsync (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

To be added.

Parameters:

- `stream`: To be added.
- `context`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## JsonContent.TryComputeLength(Int64) method

```csharp
protected override bool TryComputeLength (out long length);
```

To be added.

Parameters:

- `length`: To be added.

Returns: To be added.

#### Remarks

This method always returns `false` since `Value` is serialized until `SerializeToStreamAsync` is called.
