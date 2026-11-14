---
title: "PipeOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipelines/PipeOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeOptions class

Namespace: `System.IO.Pipelines`

```csharp
public class PipeOptions
```

Represents a set of `Pipe` options.

To be added.

## PipeOptions.PipeOptions(Byte>, PipeScheduler, PipeScheduler, Int64, Int64, Int32, Boolean) constructor

```csharp
public PipeOptions (System.Buffers.MemoryPool<byte>? pool = default, System.IO.Pipelines.PipeScheduler? readerScheduler = default, System.IO.Pipelines.PipeScheduler? writerScheduler = default, long pauseWriterThreshold = -1, long resumeWriterThreshold = -1, int minimumSegmentSize = -1, bool useSynchronizationContext = true);
```

Initializes a new instance of the `PipeOptions` class with the specified parameters.

Parameters:

- `pool`: The pool of memory blocks to be used for buffer management.
- `readerScheduler`: The `PipeScheduler` to be used to execute `PipeReader` callbacks and async continuations.
- `writerScheduler`: The `PipeScheduler` used to execute `PipeWriter` callbacks and async continuations.
- `pauseWriterThreshold`: The number of bytes in the `Pipe` before `PipeWriter.FlushAsync` starts blocking. A value of zero prevents `PipeWriter.FlushAsync` from ever blocking, effectively making the number of bytes in the `Pipe` unlimited.
- `resumeWriterThreshold`: The number of bytes in the `Pipe` when `PipeWriter.FlushAsync` stops blocking.
- `minimumSegmentSize`: The minimum size of the segment requested from `pool`.
- `useSynchronizationContext`: `true` if asynchronous continuations should be executed on the `SynchronizationContext` they were captured on; `false` otherwise. This takes precedence over the schedulers specified in `PipeOptions.ReaderScheduler` and `PipeOptions.WriterScheduler`.

To be added.

## PipeOptions.Default property

```csharp
public static System.IO.Pipelines.PipeOptions Default { get; }
```

Gets the default instance of `PipeOptions`.

Returns: A `PipeOptions` object initialized with default parameters.

To be added.

## PipeOptions.MinimumSegmentSize property

```csharp
public int MinimumSegmentSize { get; }
```

Gets the minimum size of the segment requested from the `PipeOptions.Pool`.

Returns: The minimum size of the segment requested from the `PipeOptions.Pool`.

To be added.

## PipeOptions.PauseWriterThreshold property

```csharp
public long PauseWriterThreshold { get; }
```

Gets the number of bytes in the `Pipe` when `PipeWriter.FlushAsync` starts blocking. A value of zero prevents `PipeWriter.FlushAsync` from ever blocking, effectively making the number of bytes in the `Pipe` unlimited.

Returns: The number of bytes in the `Pipe` when `PipeWriter.FlushAsync` starts blocking.

To be added.

## PipeOptions.Pool property

```csharp
public System.Buffers.MemoryPool<byte> Pool { get; }
```

Gets the `MemoryPool<T>` object used for buffer management.

Returns: A pool of memory blocks used for buffer management.

To be added.

## PipeOptions.ReaderScheduler property

```csharp
public System.IO.Pipelines.PipeScheduler ReaderScheduler { get; }
```

Gets the `PipeScheduler` used to execute `PipeReader` callbacks and async continuations.

Returns: A `PipeScheduler` that is used to execute `PipeReader` callbacks and async continuations.

To be added.

## PipeOptions.ResumeWriterThreshold property

```csharp
public long ResumeWriterThreshold { get; }
```

Gets the number of bytes in the `Pipe` when `PipeWriter.FlushAsync` stops blocking.

Returns: The number of bytes in the `Pipe` when `PipeWriter.FlushAsync` stops blocking.

To be added.

## PipeOptions.UseSynchronizationContext property

```csharp
public bool UseSynchronizationContext { get; }
```

Gets a value that determines if asynchronous callbacks and continuations should be executed on the `SynchronizationContext` they were captured on. This takes precedence over the schedulers specified in `PipeOptions.ReaderScheduler` and `PipeOptions.WriterScheduler`.

Returns: `true` if asynchronous callbacks and continuations should be executed on the `SynchronizationContext` they were captured on; otherwise, `false`.

To be added.

## PipeOptions.WriterScheduler property

```csharp
public System.IO.Pipelines.PipeScheduler WriterScheduler { get; }
```

Gets the `PipeScheduler` used to execute `PipeWriter` callbacks and async continuations.

Returns: A `PipeScheduler` object used to execute `PipeWriter` callbacks and async continuations.

To be added.
