---
title: "ReadOnlyMemoryContent class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/ReadOnlyMemoryContent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlyMemoryContent class

Namespace: `System.Net.Http`

```csharp
public sealed class ReadOnlyMemoryContent : System.Net.Http.HttpContent
```

Provides HTTP content based on a `ReadOnlyMemory<T>`.

To be added.

## ReadOnlyMemoryContent.ReadOnlyMemoryContent(Byte>) constructor

```csharp
public ReadOnlyMemoryContent (ReadOnlyMemory<byte> content);
```

Initializes a new instance of the `ReadOnlyMemoryContent` class.

Parameters:

- `content`: The content used to initialize the `ReadOnlyMemoryContent`.

To be added.

## ReadOnlyMemoryContent.CreateContentReadStream(CancellationToken) method

```csharp
protected override System.IO.Stream CreateContentReadStream (System.Threading.CancellationToken <example-value>);
```

To be added.

Parameters:

- `cancellationToken`: To be added.

Returns: To be added.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## ReadOnlyMemoryContent.CreateContentReadStreamAsync() method

```csharp
protected override System.Threading.Tasks.Task<System.IO.Stream> CreateContentReadStreamAsync ();
```

To be added.

Returns: To be added.

To be added.

## ReadOnlyMemoryContent.SerializeToStream(Stream, TransportContext, CancellationToken) method

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

## ReadOnlyMemoryContent.SerializeToStreamAsync(Stream, TransportContext) method

```csharp
protected override System.Threading.Tasks.Task SerializeToStreamAsync (System.IO.Stream stream, System.Net.TransportContext? context);
```

To be added.

Parameters:

- `stream`: To be added.
- `context`: To be added.

Returns: To be added.

To be added.

## ReadOnlyMemoryContent.SerializeToStreamAsync(Stream, TransportContext, CancellationToken) method

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

## ReadOnlyMemoryContent.TryComputeLength(Int64) method

```csharp
protected internal override bool TryComputeLength (out long length);
```

To be added.

Parameters:

- `length`: To be added.

Returns: To be added.

To be added.
