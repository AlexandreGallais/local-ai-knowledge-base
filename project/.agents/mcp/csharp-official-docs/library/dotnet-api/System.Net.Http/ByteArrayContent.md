---
title: "ByteArrayContent class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/ByteArrayContent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ByteArrayContent class

Namespace: `System.Net.Http`

```csharp
public class ByteArrayContent : System.Net.Http.HttpContent
```

Provides HTTP content based on a byte array.

To be added.

## ByteArrayContent.ByteArrayContent(Byte[]) constructor

```csharp
public ByteArrayContent (byte[] content);
```

Initializes a new instance of the `ByteArrayContent` class.

Parameters:

- `content`: The content used to initialize the `ByteArrayContent`.

Exceptions:

- `ArgumentNullException`: The `content` parameter is `null`.

#### Remarks
The `ByteArrayContent` class does not internally copy the provided byte array but keeps a reference to it instead. Callers should not modify the data in the array until after the content is sent.

## ByteArrayContent.ByteArrayContent(Byte[], Int32, Int32) constructor

```csharp
public ByteArrayContent (byte[] content, int offset, int count);
```

Initializes a new instance of the `ByteArrayContent` class.

Parameters:

- `content`: The content used to initialize the `ByteArrayContent`.
- `offset`: The offset, in bytes, in the `content` parameter used to initialize the `ByteArrayContent`.
- `count`: The number of bytes in the `content` starting from the `offset` parameter used to initialize the `ByteArrayContent`.

Exceptions:

- `ArgumentNullException`: The `content` parameter is `null`.
- `ArgumentOutOfRangeException`: The `offset` parameter is less than zero.

-or-

The `offset` parameter is greater than the length of content specified by the `content` parameter.

-or-

The `count` parameter is less than zero.

-or-

The `count` parameter is greater than the length of content specified by the `content` parameter - minus the `offset` parameter.

#### Remarks
The `ByteArrayContent` class does not internally copy the provided byte array but keeps a reference to it instead. Callers should not modify the data in the array until after the content is sent.

Only the range specified by the `offset` parameter and the `count`  parameter is used as content.

## ByteArrayContent.CreateContentReadStream(CancellationToken) method

```csharp
protected override System.IO.Stream CreateContentReadStream (System.Threading.CancellationToken <example-value>);
```

Creates an HTTP content stream for reading. It uses the memory from the `ByteArrayContent` as a backing store.

Parameters:

- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The HTTP content stream.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## ByteArrayContent.CreateContentReadStreamAsync() method

```csharp
protected override System.Threading.Tasks.Task<System.IO.Stream> CreateContentReadStreamAsync ();
```

Creates an HTTP content stream as an asynchronous operation for reading whose backing store is memory from the `ByteArrayContent`.

Returns: The task object representing the asynchronous operation.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after all of the content stream has been created.

## ByteArrayContent.SerializeToStream(Stream, TransportContext, CancellationToken) method

```csharp
protected override void SerializeToStream (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

Serializes and writes the byte array provided in the constructor to an HTTP content stream.

Parameters:

- `stream`: The target stream.
- `context`: Optional information about the transport, like the channel binding token. This parameter can be `null`.
- `cancellationToken`: The cancellation token to cancel the operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## ByteArrayContent.SerializeToStreamAsync(Stream, TransportContext) method

```csharp
protected override System.Threading.Tasks.Task SerializeToStreamAsync (System.IO.Stream stream, System.Net.TransportContext? context);
```

Serializes and writes the byte array provided in the constructor to an HTTP content stream as an asynchronous operation.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport, like channel binding token. This parameter may be `null`.

Returns: The task object representing the asynchronous operation.

#### Remarks
This operation does not block. When the returned `Task` object completes, the whole byte array has been written to the `stream` parameter.

## ByteArrayContent.SerializeToStreamAsync(Stream, TransportContext, CancellationToken) method

```csharp
protected override System.Threading.Tasks.Task SerializeToStreamAsync (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

Serializes and writes the byte array provided in the constructor to an HTTP content stream as an asynchronous operation.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport, like channel binding token. This parameter may be `null`.
- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation does not block. When the returned `Task` object completes, the whole byte array has been written to the `stream` parameter.

## ByteArrayContent.TryComputeLength(Int64) method

```csharp
protected internal override bool TryComputeLength (out long length);
```

Determines whether a byte array has a valid length in bytes.

Parameters:

- `length`: The length in bytes of the byte array.

Returns: `true` if `length` is a valid length; otherwise, `false`.

#### Remarks
The `ByteArrayContent.TryComputeLength` method gives a derived content type the ability to calculate the content length. This is useful for content types which are able to easily calculate the content length. If computing the content length is not possible or expensive (would require the system to buffer the whole content where the serialization would be expensive or require the system to allocate a lot of memory), this method can return `false`. If this method returns `false`, this implies that either chunked transfer is needed or the content must get buffered before being sent to the server.

This method always returned `true` for `ByteArrayContent`.
