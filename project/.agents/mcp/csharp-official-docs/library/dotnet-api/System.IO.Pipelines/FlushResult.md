---
title: "FlushResult struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipelines/FlushResult.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FlushResult struct

Namespace: `System.IO.Pipelines`

```csharp
public struct FlushResult
```

Result returned by `PipeWriter.FlushAsync` call.

To be added.

## FlushResult.FlushResult(Boolean, Boolean) constructor

```csharp
public FlushResult (bool isCanceled, bool isCompleted);
```

Initializes a new instance of `FlushResult` struct setting the `FlushResult.IsCanceled` and `FlushResult.IsCompleted` flags.

Parameters:

- `isCanceled`: `true` to indicate the current `PipeWriter.FlushAsync` operation that produced this `FlushResult` was canceled by `PipeWriter.CancelPendingFlush`; otherwise, `false`.
- `isCompleted`: `true` to indicate the reader is no longer reading data written to the `PipeWriter`.

To be added.

## FlushResult.IsCanceled property

```csharp
public bool IsCanceled { get; }
```

Gets a value that indicates whether the current `PipeWriter.FlushAsync` operation was canceled by `PipeWriter.CancelPendingFlush`.

Returns: `true` if the current `PipeWriter.FlushAsync` operation was canceled by `PipeWriter.CancelPendingFlush`; otherwise, `false`.

To be added.

## FlushResult.IsCompleted property

```csharp
public bool IsCompleted { get; }
```

Gets a value that indicates the reader is no longer reading data written to the `PipeWriter`.

Returns: `true` if the reader is no longer reading data written to the `PipeWriter`; otherwise, `false`.

To be added.
