---
title: "StreamPipeWriterOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipelines/StreamPipeWriterOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StreamPipeWriterOptions class

Namespace: `System.IO.Pipelines`

```csharp
public class StreamPipeWriterOptions
```

Represents a set of options for controlling the creation of the `PipeWriter`.

To be added.

## StreamPipeWriterOptions.StreamPipeWriterOptions(Byte>, Int32, Boolean) constructor

```csharp
public StreamPipeWriterOptions (System.Buffers.MemoryPool<byte>? pool = default, int minimumBufferSize = -1, bool leaveOpen = false);
```

Initializes a `StreamPipeWriterOptions` instance, optionally specifying a memory pool, a minimum buffer size, and whether the underlying stream should be left open after the `PipeWriter` completes.

Parameters:

- `pool`: The memory pool to use when allocating memory. The default value is `null`.
- `minimumBufferSize`: The minimum buffer size to use when renting memory from the `pool`. The default value is 4096.
- `leaveOpen`: `true` to leave the underlying stream open after the `PipeWriter` completes; `false` to close it. The default is `false`.

To be added.

## StreamPipeWriterOptions.LeaveOpen property

```csharp
public bool LeaveOpen { get; }
```

Gets the value that indicates if the underlying stream should be left open after the `PipeWriter` completes.

Returns: `true` if the underlying stream should be left open after the `PipeWriter` completes; otherwise, `false`.

To be added.

## StreamPipeWriterOptions.MinimumBufferSize property

```csharp
public int MinimumBufferSize { get; }
```

Gets the minimum buffer size to use when renting memory from the `StreamPipeWriterOptions.Pool`.

Returns: An integer representing the minimum buffer size.

To be added.

## StreamPipeWriterOptions.Pool property

```csharp
public System.Buffers.MemoryPool<byte> Pool { get; }
```

Gets the `MemoryPool<T>` to use when allocating memory.

Returns: A memory pool instance.

To be added.
