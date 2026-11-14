---
title: "StreamPipeReaderOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipelines/StreamPipeReaderOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StreamPipeReaderOptions class

Namespace: `System.IO.Pipelines`

```csharp
public class StreamPipeReaderOptions
```

Represents a set of options for controlling the creation of the `PipeReader`.

To be added.

## StreamPipeReaderOptions.StreamPipeReaderOptions(Byte>, Int32, Int32, Boolean) constructor

```csharp
public StreamPipeReaderOptions (System.Buffers.MemoryPool<byte>? pool, int bufferSize, int minimumReadSize, bool leaveOpen);
```

Initializes a `StreamPipeReaderOptions` instance, optionally specifying a memory pool, a minimum buffer size, a minimum read size, and whether the underlying stream should be left open after the `PipeReader` completes.

Parameters:

- `pool`: The memory pool to use when allocating memory. The default value is `null`.
- `bufferSize`: The minimum buffer size to use when renting memory from the `pool`. The default value is 4096.
- `minimumReadSize`: The threshold of remaining bytes in the buffer before a new buffer is allocated. The default value is 1024.
- `leaveOpen`: `true` to leave the underlying stream open after the `PipeReader` completes; `false` to close it. The default is `false`.

To be added.

## StreamPipeReaderOptions.StreamPipeReaderOptions(Byte>, Int32, Int32, Boolean, Boolean) constructor

```csharp
public StreamPipeReaderOptions (System.Buffers.MemoryPool<byte>? pool = default, int bufferSize = -1, int minimumReadSize = -1, bool leaveOpen = false, bool useZeroByteReads = false);
```

Initializes a `StreamPipeReaderOptions` instance, optionally specifying a memory pool, a minimum buffer size, a minimum read size, and whether the underlying stream should be left open after the `PipeReader` completes.

Parameters:

- `pool`: The memory pool to use when allocating memory. The default value is `null`.
- `bufferSize`: The minimum buffer size to use when renting memory from the `pool`. The default value is 4096.
- `minimumReadSize`: The threshold of remaining bytes in the buffer before a new buffer is allocated. The default value is 1024.
- `leaveOpen`: `true` to leave the underlying stream open after the `PipeReader` completes; `false` to close it. The default is `false`.
- `useZeroByteReads`: `true` if reads with an empty buffer should be issued to the underlying stream before allocating memory; otherwise, `false`.

To be added.

## StreamPipeReaderOptions.BufferSize property

```csharp
public int BufferSize { get; }
```

Gets the minimum buffer size to use when renting memory from the `StreamPipeReaderOptions.Pool`.

Returns: The buffer size.

To be added.

## StreamPipeReaderOptions.LeaveOpen property

```csharp
public bool LeaveOpen { get; }
```

Gets the value that indicates if the underlying stream should be left open after the `PipeReader` completes.

Returns: `true` if the underlying stream should be left open after the `PipeReader` completes; otherwise, `false`.

To be added.

## StreamPipeReaderOptions.MinimumReadSize property

```csharp
public int MinimumReadSize { get; }
```

Gets the threshold of remaining bytes in the buffer before a new buffer is allocated.

Returns: The minimum read size.

To be added.

## StreamPipeReaderOptions.Pool property

```csharp
public System.Buffers.MemoryPool<byte> Pool { get; }
```

Gets the `MemoryPool<T>` to use when allocating memory.

Returns: A memory pool instance.

To be added.

## StreamPipeReaderOptions.UseZeroByteReads property

```csharp
public bool UseZeroByteReads { get; }
```

Gets the value that indicates if reads with an empty buffer should be issued to the underlying stream, in order to wait for data to arrive before allocating memory.

Returns: `true` if reads with an empty buffer should be issued to the underlying stream before allocating memory; otherwise, `false`.

To be added.
