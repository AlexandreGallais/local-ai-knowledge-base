---
title: "PipeWriter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipelines/PipeWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeWriter class

Namespace: `System.IO.Pipelines`

```csharp
public abstract class PipeWriter : System.Buffers.IBufferWriter<byte>
```

Defines a class that provides a pipeline to which data can be written.

To be added.

## PipeWriter.PipeWriter() constructor

```csharp
protected PipeWriter ();
```

Initializes a new instance of the class.

To be added.

## PipeWriter.CanGetUnflushedBytes property

```csharp
public virtual bool CanGetUnflushedBytes { get; }
```

Gets a value that indicates whether the current `PipeWriter` supports reporting the count of unflushed bytes.

Returns: `true`If a class derived from `PipeWriter` does not support getting the unflushed bytes, calls to `PipeWriter.UnflushedBytes` throw `NotImplementedException`.

To be added.

## PipeWriter.UnflushedBytes property

```csharp
public virtual long UnflushedBytes { get; }
```

When overridden in a derived class, gets the count of unflushed bytes within the current writer.

Returns: To be added.

Exceptions:

- `NotImplementedException`: The `PipeWriter` does not support getting the unflushed byte count.

To be added.

## PipeWriter.Advance(Int32) method

```csharp
public abstract void Advance (int bytes);
```

Notifies the `PipeWriter` that `bytes` bytes were written to the output `Span<T>` or `Memory<T>`. You must call `PipeWriter.GetSpan` or `PipeWriter.GetMemory` again and use the returned buffer to continue writing more data after calling `PipeWriter.Advance`; you cannot write to a previously acquired buffer.

Parameters:

- `bytes`: The number of bytes written to the `Span<T>` or `Memory<T>`.

To be added.

## PipeWriter.AsStream(Boolean) method

```csharp
public virtual System.IO.Stream AsStream (bool leaveOpen = false);
```

Returns a `Stream` representation of the `PipeWriter`.

Parameters:

- `leaveOpen`: An optional flag that indicates whether disposing the returned `Stream` leaves `PipeReader` open (`true`) or completes `PipeReader` (`false`).

Returns: A stream that represents the `PipeWriter`.

To be added.

## PipeWriter.CancelPendingFlush() method

```csharp
public abstract void CancelPendingFlush ();
```

Cancels the pending `PipeWriter.FlushAsync` or `PipeWriter.WriteAsync` operation without causing the operation to throw and without completing the `PipeWriter`. If there is no pending operation, this cancels the next operation.

#### Remarks

The canceled `FlushAsync` or `WriteAsync` operation returns a `FlushResult` where `IsCanceled` is `true`.

## PipeWriter.Complete(Exception) method

```csharp
public abstract void Complete (Exception? exception = default);
```

Marks the `PipeWriter` as being complete, meaning no more items will be written to it.

Parameters:

- `exception`: Optional `Exception` indicating a failure that's causing the pipeline to complete.

To be added.

## PipeWriter.CompleteAsync(Exception) method

```csharp
public virtual System.Threading.Tasks.ValueTask CompleteAsync (Exception? exception = default);
```

Marks the current pipe writer instance as being complete, meaning no more data will be written to it.

Parameters:

- `exception`: An optional exception that indicates the failure that caused the pipeline to complete.

Returns: A value task that represents the asynchronous complete operation.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `PipeWriter.Complete`.

## PipeWriter.CopyFromAsync(Stream, CancellationToken) method

```csharp
protected internal virtual System.Threading.Tasks.Task CopyFromAsync (System.IO.Stream source, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads the bytes from the specified stream and writes them to the `PipeWriter`.

Parameters:

- `source`: The stream from which the contents will be copied.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous copy operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## PipeWriter.Create(Stream, StreamPipeWriterOptions) method

```csharp
public static System.IO.Pipelines.PipeWriter Create (System.IO.Stream stream, System.IO.Pipelines.StreamPipeWriterOptions? writerOptions = default);
```

Creates a `PipeWriter` wrapping the specified `Stream`.

Parameters:

- `stream`: The stream that the pipe writer will wrap.
- `writerOptions`: The options to configure the pipe writer.

Returns: A `PipeWriter` that wraps the `Stream`.

To be added.

## PipeWriter.FlushAsync(CancellationToken) method

```csharp
public abstract System.Threading.Tasks.ValueTask<System.IO.Pipelines.FlushResult> FlushAsync (System.Threading.CancellationToken <example-value> = default);
```

Makes bytes written available to `PipeReader` and runs `PipeReader.ReadAsync` continuation.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents and wraps the asynchronous flush operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## PipeWriter.GetMemory(Int32) method

```csharp
public abstract Memory<byte> GetMemory (int sizeHint = 0);
```

Returns a `Memory<T>` to write to that is at least the requested size, as specified by the `sizeHint` parameter.

Parameters:

- `sizeHint`: The minimum length of the returned `Memory<T>`. If 0, a non-empty memory buffer of arbitrary size is returned.

Returns: A memory buffer of at least `sizeHint` bytes. If `sizeHint` is 0, returns a non-empty buffer of arbitrary size.

Exceptions:

- `OutOfMemoryException`: The requested buffer size is not available.

There is no guarantee that successive calls will return the same buffer or the same-sized buffer.

This method never returns `Empty`, but it throws an `OutOfMemoryException` if the requested buffer size is not available.

You must request a new buffer after calling `PipeWriter.Advance` to continue writing more data; you cannot write to a previously acquired buffer.

## PipeWriter.GetSpan(Int32) method

```csharp
public abstract Span<byte> GetSpan (int sizeHint = 0);
```

Returns a `Span<T>` to write to that is at least the requested size, as specified by the `sizeHint` parameter.

Parameters:

- `sizeHint`: The minimum length of the returned `Span<T>`. If 0, a non-empty buffer of arbitrary size is returned.

Returns: A buffer of at least `sizeHint` bytes. If `sizeHint` is 0, returns a non-empty buffer of arbitrary size.

Exceptions:

- `OutOfMemoryException`: The requested buffer size is not available.

There is no guarantee that successive calls will return the same buffer or the same-sized buffer.

This method never returns `Empty`, but it throws an `OutOfMemoryException` if the requested buffer size is not available.

You must request a new buffer after calling `Advance` to continue writing more data; you cannot write to a previously acquired buffer.

## PipeWriter.OnReaderCompleted(Object>, Object) method

```csharp
public virtual void OnReaderCompleted (Action<Exception?,object?> callback, object? state);
```

Registers a callback that executes when the `PipeReader` side of the pipe is completed.

Parameters:

- `callback`: The callback to register.
- `state`: The state object to pass to `callback` when it's invoked.

To be added.

## PipeWriter.WriteAsync(Byte>, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.ValueTask<System.IO.Pipelines.FlushResult> WriteAsync (ReadOnlyMemory<byte> source, System.Threading.CancellationToken <example-value> = default);
```

Writes the specified byte memory range to the pipe and makes data accessible to the `PipeReader`.

Parameters:

- `source`: The read-only byte memory region to write.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation, and wraps the flush asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
