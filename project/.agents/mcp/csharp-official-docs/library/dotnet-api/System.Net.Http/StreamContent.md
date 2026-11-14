---
title: "StreamContent class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/StreamContent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StreamContent class

Namespace: `System.Net.Http`

```csharp
public class StreamContent : System.Net.Http.HttpContent
```

Provides HTTP content based on a stream.

To be added.

## StreamContent.StreamContent(Stream) constructor

```csharp
public StreamContent (System.IO.Stream content);
```

Creates a new instance of the `StreamContent` class.

Parameters:

- `content`: The content used to initialize the `StreamContent`.

#### Remarks

The `StreamContent` object calls `Dispose` on the provided `Stream` object when `StreamContent.Dispose` is called.

## StreamContent.StreamContent(Stream, Int32) constructor

```csharp
public StreamContent (System.IO.Stream content, int bufferSize);
```

Creates a new instance of the `StreamContent` class.

Parameters:

- `content`: The content used to initialize the `StreamContent`.
- `bufferSize`: The size, in bytes, of the buffer for the `StreamContent`.

Exceptions:

- `ArgumentNullException`: The `content` was `null`.
- `ArgumentOutOfRangeException`: The `bufferSize` was less than or equal to zero.

#### Remarks
The `StreamContent` object calls `Dispose` on the provided `Stream` object when `StreamContent.Dispose` is called.

## StreamContent.CreateContentReadStream(CancellationToken) method

```csharp
protected override System.IO.Stream CreateContentReadStream (System.Threading.CancellationToken <example-value>);
```

Returns the HTTP stream as a read-only stream.

Parameters:

- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The HTTP content stream.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## StreamContent.CreateContentReadStreamAsync() method

```csharp
protected override System.Threading.Tasks.Task<System.IO.Stream> CreateContentReadStreamAsync ();
```

Returns the HTTP stream as a read-only stream as an asynchronous operation.

Returns: The task object representing the asynchronous operation.

To be added.

## StreamContent.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `StreamContent` and optionally disposes of the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to releases only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `StreamContent` references. This method invokes the `Dispose()` method of each referenced object.

## StreamContent.SerializeToStream(Stream, TransportContext, CancellationToken) method

```csharp
protected override void SerializeToStream (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

Serializes the multipart HTTP content to a stream.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport (for example, the channel binding token). This parameter may be `null`.
- `cancellationToken`: The cancellation token to cancel the operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## StreamContent.SerializeToStreamAsync(Stream, TransportContext) method

```csharp
protected override System.Threading.Tasks.Task SerializeToStreamAsync (System.IO.Stream stream, System.Net.TransportContext? context);
```

Serializes the HTTP content to a stream as an asynchronous operation.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport (channel binding token, for example). This parameter may be `null`.

Returns: The task object representing the asynchronous operation.

#### Remarks
This operation will not block. The returned `Task` object will complete after all of the content has been serialized to the target stream.

## StreamContent.SerializeToStreamAsync(Stream, TransportContext, CancellationToken) method

```csharp
protected override System.Threading.Tasks.Task SerializeToStreamAsync (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

Serializes the HTTP content to a stream as an asynchronous operation.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport (channel binding token, for example). This parameter may be `null`.
- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task` object will complete after all of the content has been serialized to the target stream.

## StreamContent.TryComputeLength(Int64) method

```csharp
protected internal override bool TryComputeLength (out long length);
```

Determines whether the stream content has a valid length in bytes.

Parameters:

- `length`: The length in bytes of the stream content.

Returns: `true` if `length` is a valid length; otherwise, `false`.

#### Remarks
The `StreamContent.TryComputeLength` method gives HTTP stream content the ability to calculate the content length. This is useful for content types which are able to easily calculate the content length. If computing the content length is not possible or expensive (would require the system to buffer the whole content where the serialization would be expensive or require the system to allocate a lot of memory), this method can return `false`. If this method returns `false`, this implies that either chunked transfer is needed or the content must get buffered before being sent to the server.
