---
title: "StreamPipeExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipelines/StreamPipeExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StreamPipeExtensions class

Namespace: `System.IO.Pipelines`

```csharp
public static class StreamPipeExtensions
```

Provides extension methods for `Stream` that support read and write operations directly into pipes.

To be added.

## StreamPipeExtensions.CopyToAsync(Stream, PipeWriter, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task CopyToAsync (this System.IO.Stream source, System.IO.Pipelines.PipeWriter destination, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads the bytes from the `Stream` and writes them to the specified `PipeWriter`, using a cancellation token.

Parameters:

- `source`: The stream from which the contents of the current stream will be copied.
- `destination`: The writer to which the contents of the source stream will be copied.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous copy operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
