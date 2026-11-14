---
title: "ReadResult struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipelines/ReadResult.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadResult struct

Namespace: `System.IO.Pipelines`

```csharp
public readonly struct ReadResult
```

Represents the result of a `PipeReader.ReadAsync` call.

To be added.

## ReadResult.ReadResult(Byte>, Boolean, Boolean) constructor

```csharp
public ReadResult (System.Buffers.ReadOnlySequence<byte> buffer, bool isCanceled, bool isCompleted);
```

Creates a new instance of `ReadResult` setting `ReadResult.IsCanceled` and `ReadResult.IsCompleted` flags.

Parameters:

- `buffer`: The read-only sequence containing the bytes of data that were read in the `PipeReader.ReadAsync` call.
- `isCanceled`: A flag that indicates if the `PipeReader.ReadAsync` operation that produced this `ReadResult` was canceled by `PipeReader.CancelPendingRead`.
- `isCompleted`: A flag that indicates whether the end of the data stream has been reached.

To be added.

## ReadResult.Buffer property

```csharp
public System.Buffers.ReadOnlySequence<byte> Buffer { get; }
```

Gets the `ReadOnlySequence<T>` that was read.

Returns: A read-only sequence containing the bytes of data that were read in the `PipeReader.ReadAsync` call.

To be added.

## ReadResult.IsCanceled property

```csharp
public bool IsCanceled { get; }
```

Gets a value that indicates whether the current `PipeReader.ReadAsync` operation was canceled by `PipeReader.CancelPendingRead`.

Returns: `true` if the `PipeReader.ReadAsync` operation that produced this `ReadResult` was canceled by `PipeReader.CancelPendingRead`; otherwise, `false`.

To be added.

## ReadResult.IsCompleted property

```csharp
public bool IsCompleted { get; }
```

Gets a value that indicates whether the end of the data stream has been reached.

Returns: `true` if the end of the data stream has been reached; otherwise, `false`.

To be added.
