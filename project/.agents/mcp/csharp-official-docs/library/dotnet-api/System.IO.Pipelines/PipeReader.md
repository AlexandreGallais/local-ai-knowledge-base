---
title: "PipeReader class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipelines/PipeReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeReader class

Namespace: `System.IO.Pipelines`

```csharp
public abstract class PipeReader
```

Defines a class that provides access to a read side of pipe.

To be added.

## PipeReader.PipeReader() constructor

```csharp
protected PipeReader ();
```

Initializes a new instance of the `PipeReader` class.

To be added.

## PipeReader.AdvanceTo(SequencePosition) method

```csharp
public abstract void AdvanceTo (SequencePosition consumed);
```

Moves forward the pipeline's read cursor to after the consumed data, marking the data as processed.

Parameters:

- `consumed`: Marks the extent of the data that has been successfully processed.

#### Remarks

The memory for the consumed data will be released and no longer available.

The `Buffer` previously returned from `ReadAsync` must not be accessed after this call.

This is equivalent to calling `AdvanceTo` with identical examined and consumed positions.
The examined data communicates to the pipeline when it should signal more data is available.

Because the consumed parameter doubles as the examined parameter, the consumed parameter should be greater than or equal to the examined position in the previous call to `AdvanceTo`. Otherwise, an `InvalidOperationException` is thrown.

## PipeReader.AdvanceTo(SequencePosition, SequencePosition) method

```csharp
public abstract void AdvanceTo (SequencePosition consumed, SequencePosition examined);
```

Moves forward the pipeline's read cursor to after the consumed data, marking the data as processed, read and examined.

Parameters:

- `consumed`: Marks the extent of the data that has been successfully processed.
- `examined`: Marks the extent of the data that has been read and examined.

#### Remarks

The memory for the consumed data will be released and no longer available.

The `Buffer` previously returned from `ReadAsync` must not be accessed after this call.

The examined data communicates to the pipeline when it should signal more data is available.

The examined parameter should be greater than or equal to the examined position in the previous call to `AdvanceTo`. Otherwise, an `InvalidOperationException` is thrown.

## PipeReader.AsStream(Boolean) method

```csharp
public virtual System.IO.Stream AsStream (bool leaveOpen = false);
```

Returns a `Stream` representation of the `PipeReader`.

Parameters:

- `leaveOpen`: An optional flag that indicates whether disposing the returned `Stream` leaves `PipeReader` open (`true`) or completes `PipeReader` (`false`).

Returns: A stream that represents the `PipeReader`.

To be added.

## PipeReader.CancelPendingRead() method

```csharp
public abstract void CancelPendingRead ();
```

Cancels the pending `PipeReader.ReadAsync` operation without causing it to throw and without completing the `PipeReader`. If there is no pending operation, this cancels the next operation.

#### Remarks

The canceled `ReadAsync` operation returns a `ReadResult` where `IsCanceled` is `true`.

## PipeReader.Complete(Exception) method

```csharp
public abstract void Complete (Exception? exception = default);
```

Signals to the producer that the consumer is done reading.

Parameters:

- `exception`: Optional `Exception` indicating a failure that's causing the pipeline to complete.

To be added.

## PipeReader.CompleteAsync(Exception) method

```csharp
public virtual System.Threading.Tasks.ValueTask CompleteAsync (Exception? exception = default);
```

Marks the current pipe reader instance as being complete, meaning no more data will be read from it.

Parameters:

- `exception`: An optional exception that indicates the failure that caused the reader to complete.

Returns: A value task that represents the asynchronous complete operation.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `PipeReader.Complete`.

## PipeReader.CopyToAsync(PipeWriter, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.Task CopyToAsync (System.IO.Pipelines.PipeWriter destination, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads the bytes from the `PipeReader` and writes them to the specified `PipeWriter`, using a specified cancellation token.

Parameters:

- `destination`: The pipe writer to which the contents of the current stream will be copied.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous copy operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## PipeReader.CopyToAsync(Stream, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.Task CopyToAsync (System.IO.Stream destination, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads the bytes from the `PipeReader` and writes them to the specified stream, using a specified cancellation token.

Parameters:

- `destination`: The stream to which the contents of the current stream will be copied.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous copy operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## PipeReader.Create(Byte>) method

```csharp
public static System.IO.Pipelines.PipeReader Create (System.Buffers.ReadOnlySequence<byte> sequence);
```

Creates a `PipeReader` wrapping the specified `ReadOnlySequence<T>`.

Parameters:

- `sequence`: The sequence to wrap.

Returns: A `PipeReader` that wraps the `ReadOnlySequence<T>`.

To be added.

## PipeReader.Create(Stream, StreamPipeReaderOptions) method

```csharp
public static System.IO.Pipelines.PipeReader Create (System.IO.Stream stream, System.IO.Pipelines.StreamPipeReaderOptions? readerOptions = default);
```

Creates a `PipeReader` wrapping the specified `Stream`.

Parameters:

- `stream`: The stream that the pipe reader will wrap.
- `readerOptions`: The options to configure the pipe reader.

Returns: A `PipeReader` that wraps the `Stream`.

To be added.

## PipeReader.OnWriterCompleted(Object>, Object) method

```csharp
public virtual void OnWriterCompleted (Action<Exception?,object?> callback, object? state);
```

Registers a callback that executes when the `PipeWriter` side of the pipe is completed.

Parameters:

- `callback`: The callback to register.
- `state`: The state object to pass to `callback` when it's invoked.

To be added.

## PipeReader.ReadAsync(CancellationToken) method

```csharp
public abstract System.Threading.Tasks.ValueTask<System.IO.Pipelines.ReadResult> ReadAsync (System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads a sequence of bytes from the current `PipeReader`.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests. The default value is `default`.

Returns: A `ValueTask<T>` representing the asynchronous read operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## PipeReader.ReadAtLeastAsync(Int32, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<System.IO.Pipelines.ReadResult> ReadAtLeastAsync (int minimumSize, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads a sequence of bytes from the current `PipeReader`.

Parameters:

- `minimumSize`: The minimum length that needs to be buffered in order for the call to return.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `default`.

Returns: A `ValueTask<T>` representing the asynchronous read operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The call returns if the `PipeReader` has read the `minimumSize` specified, or is cancelled or completed.

## PipeReader.ReadAtLeastAsyncCore(Int32, CancellationToken) method

```csharp
protected virtual System.Threading.Tasks.ValueTask<System.IO.Pipelines.ReadResult> ReadAtLeastAsyncCore (int minimumSize, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads a sequence of bytes from the current `PipeReader`.

Parameters:

- `minimumSize`: The minimum length that needs to be buffered in order for the call to return.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `default`.

Returns: A `ValueTask<T>` representing the asynchronous read operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The call returns if the `PipeReader` has read the `minimumSize` specified, or is cancelled or completed.

## PipeReader.TryRead(ReadResult) method

```csharp
public abstract bool TryRead (out System.IO.Pipelines.ReadResult result);
```

Attempts to synchronously read data the `PipeReader`.

Parameters:

- `result`: When this method returns `true`, this value is set to a `ReadResult` instance that represents the result of the read call; otherwise, this value is set to `default`.

Returns: `true` if data was available, or if the call was canceled or the writer was completed; otherwise, `false`.

#### Remarks

If the pipe returns `false`, there is no need to call `AdvanceTo`.
