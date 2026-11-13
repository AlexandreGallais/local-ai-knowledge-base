---
title: "System.IO.Pipelines - .NET (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/pipelines.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# System.IO.Pipelines - .NET (part 3 of 4)

### PipeReader common problems

* Passing the wrong values to `consumed` or `examined` might result in reading already read data.
* Passing `buffer.End` as examined might result in:

  * Stalled data
  * An eventual out-of-memory (OOM) exception if data isn't consumed. For example, `PipeReader.AdvanceTo(position, buffer.End)` when processing a single message at a time from the buffer.

* Passing the wrong values to `consumed` or `examined` might result in an infinite loop. For example, `PipeReader.AdvanceTo(buffer.Start)` if `buffer.Start` hasn't changed causes the next call to `System.IO.Pipelines.PipeReader.ReadAsync*` to return immediately before new data arrives.
* Passing the wrong values to `consumed` or `examined` might result in infinite buffering (eventual OOM).
* Using `System.Buffers.ReadOnlySequence`1` after calling `System.IO.Pipelines.PipeReader.AdvanceTo*` might result in memory corruption (use after free).
* Failing to call `System.IO.Pipelines.PipeReader.Complete*`/`System.IO.Pipelines.PipeReader.CompleteAsync*` might result in a memory leak.
* Checking `System.IO.Pipelines.ReadResult.IsCompleted` and exiting the reading logic before processing the buffer results in data loss. The loop exit condition should be based on `ReadResult.Buffer.IsEmpty` and `ReadResult.IsCompleted`. Doing this incorrectly could result in an infinite loop.

#### Problematic code

❌ **Data loss**

The `ReadResult` can return the final segment of data when `IsCompleted` is set to `true`. Not reading that data before exiting the read loop results in data loss.

> **Warning:**
> Do **NOT** use the following code. Using this sample will result in data loss, hangs, security issues and should **NOT** be copied. The following sample is provided to explain PipeReader common problems.

```csharp
Environment.FailFast("This code is terrible, don't use it!");
while (true)
{
    ReadResult result = await reader.ReadAsync(cancellationToken);
    ReadOnlySequence<byte> dataLossBuffer = result.Buffer;

    if (result.IsCompleted)
        break;

    Process(ref dataLossBuffer, out Message message);

    reader.AdvanceTo(dataLossBuffer.Start, dataLossBuffer.End);
}
```
> **Warning:**
> Do **NOT** use the preceding code. Using this sample will result in data loss, hangs, security issues and should **NOT** be copied. The preceding sample is provided to explain PipeReader common problems.

❌ **Infinite loop**

The following logic might result in an infinite loop if the `Result.IsCompleted` is `true` but there's never a complete message in the buffer.

> **Warning:**
> Do **NOT** use the following code. Using this sample will result in data loss, hangs, security issues and should **NOT** be copied. The following sample is provided to explain PipeReader common problems.

```csharp
Environment.FailFast("This code is terrible, don't use it!");
while (true)
{
    ReadResult result = await reader.ReadAsync(cancellationToken);
    ReadOnlySequence<byte> infiniteLoopBuffer = result.Buffer;
    if (result.IsCompleted && infiniteLoopBuffer.IsEmpty)
        break;

    Process(ref infiniteLoopBuffer, out Message message);

    reader.AdvanceTo(infiniteLoopBuffer.Start, infiniteLoopBuffer.End);
}
```
> **Warning:**
> Do **NOT** use the preceding code. Using this sample will result in data loss, hangs, security issues and should **NOT** be copied. The preceding sample is provided to explain PipeReader common problems.

Here's another piece of code with the same problem. It's checking for a non-empty buffer before checking `ReadResult.IsCompleted`. Because it's in an `else if`, it loops forever if there's never a complete message in the buffer.

> **Warning:**
> Do **NOT** use the following code. Using this sample will result in data loss, hangs, security issues and should **NOT** be copied. The following sample is provided to explain PipeReader common problems.

```csharp
Environment.FailFast("This code is terrible, don't use it!");
while (true)
{
    ReadResult result = await reader.ReadAsync(cancellationToken);
    ReadOnlySequence<byte> infiniteLoopBuffer = result.Buffer;

    if (!infiniteLoopBuffer.IsEmpty)
        Process(ref infiniteLoopBuffer, out Message message);

    else if (result.IsCompleted)
        break;

    reader.AdvanceTo(infiniteLoopBuffer.Start, infiniteLoopBuffer.End);
}
```
> **Warning:**
> Do **NOT** use the preceding code. Using this sample will result in data loss, hangs, security issues and should **NOT** be copied. The preceding sample is provided to explain PipeReader common problems.

❌ **Unresponsive application**

Unconditionally calling `System.IO.Pipelines.PipeReader.AdvanceTo*` with `buffer.End` in the `examined` position might result in the application becoming unresponsive when parsing a single message. The next call to `System.IO.Pipelines.PipeReader.AdvanceTo*` won't return until:

* There's more data written to the pipe.
* And the new data wasn't previously examined.

> **Warning:**
> Do **NOT** use the following code. Using this sample will result in data loss, hangs, security issues and should **NOT** be copied. The following sample is provided to explain PipeReader common problems.

```csharp
Environment.FailFast("This code is terrible, don't use it!");
while (true)
{
    ReadResult result = await reader.ReadAsync(cancellationToken);
    ReadOnlySequence<byte> hangBuffer = result.Buffer;

    Process(ref hangBuffer, out Message message);

    if (result.IsCompleted)
        break;

    reader.AdvanceTo(hangBuffer.Start, hangBuffer.End);

    if (message != null)
        return message;
}
```
> **Warning:**
> Do **NOT** use the preceding code. Using this sample will result in data loss, hangs, security issues and should **NOT** be copied. The preceding sample is provided to explain PipeReader common problems.

❌ **Out of Memory (OOM)**

With the following conditions, this code keeps buffering until an `System.OutOfMemoryException` occurs:

* There's no maximum message size.
* The data returned from the `PipeReader` doesn't make a complete message. For example, the other side is writing a large message (for example, a 4-GB message).

> **Warning:**
> Do **NOT** use the following code. Using this sample will result in data loss, hangs, security issues and should **NOT** be copied. The following sample is provided to explain PipeReader common problems.

```csharp
Environment.FailFast("This code is terrible, don't use it!");
while (true)
{
    ReadResult result = await reader.ReadAsync(cancellationToken);
    ReadOnlySequence<byte> thisCouldOutOfMemory = result.Buffer;

    Process(ref thisCouldOutOfMemory, out Message message);

    if (result.IsCompleted)
        break;

    reader.AdvanceTo(thisCouldOutOfMemory.Start, thisCouldOutOfMemory.End);

    if (message != null)
        return message;
}
```
> **Warning:**
> Do **NOT** use the preceding code. Using this sample will result in data loss, hangs, security issues and should **NOT** be copied. The preceding sample is provided to explain PipeReader common problems.

❌ **Memory Corruption**

When writing helpers that read the buffer, copy any returned payload before calling `System.IO.Pipelines.PipeWriter.Advance*`. The following example returns memory that the `Pipe` has discarded and might reuse it for the next operation (read/write).

> **Warning:**
> Do **NOT** use the following code. Using this sample will result in data loss, hangs, security issues and should **NOT** be copied. The following sample is provided to explain PipeReader common problems.

```csharp
public class Message
{
    public ReadOnlySequence<byte> CorruptedPayload { get; set; }
}
```
```csharp
    Environment.FailFast("This code is terrible, don't use it!");
    Message message = null;

    while (true)
    {
        ReadResult result = await reader.ReadAsync(cancellationToken);
        ReadOnlySequence<byte> buffer = result.Buffer;

        ReadHeader(ref buffer, out int length);

        if (length <= buffer.Length)
        {
            message = new Message
            {
                // Slice the payload from the existing buffer
                CorruptedPayload = buffer.Slice(0, length)
            };

            buffer = buffer.Slice(length);
        }

        if (result.IsCompleted)
            break;

        reader.AdvanceTo(buffer.Start, buffer.End);

        if (message != null)
        {
            // This code is broken since reader.AdvanceTo() was called with a position *after* the buffer
            // was captured.
            break;
        }
    }

    return message;
}
```
> **Warning:**
> Do **NOT** use the preceding code. Using this sample will result in data loss, hangs, security issues and should **NOT** be copied. The preceding sample is provided to explain PipeReader common problems.

## PipeWriter

The `System.IO.Pipelines.PipeWriter` manages buffers for writing on the caller's behalf. `PipeWriter` implements `IBufferWriter<byte>`. `IBufferWriter<byte>` provides access to buffers to perform writes without extra buffer copies.

```csharp
async Task WriteHelloAsync(PipeWriter writer, CancellationToken <example-value> = default)
{
    // Request at least 5 bytes from the PipeWriter.
    Memory<byte> memory = writer.GetMemory(5);

    // Write directly into the buffer.
    int written = Encoding.ASCII.GetBytes("Hello".AsSpan(), memory.Span);

    // Tell the writer how many bytes were written.
    writer.Advance(written);

    await writer.FlushAsync(cancellationToken);
}
```
The previous code:

* Requests a buffer of at least 5 bytes from the `PipeWriter` using `System.IO.Pipelines.PipeWriter.GetMemory*`.
* Writes bytes for the ASCII string `"Hello"` to the returned `Memory<byte>`.
* Calls `System.IO.Pipelines.PipeWriter.Advance*` to indicate how many bytes were written to the buffer.
* Flushes the `PipeWriter`, which sends the bytes to the underlying device.

The previous method of writing uses the buffers provided by the `PipeWriter`. It also could use `System.IO.Pipelines.PipeWriter.WriteAsync*`, which:

* Copies the existing buffer to the `PipeWriter`.
* Calls `System.IO.Pipelines.PipeWriter.GetSpan*`, `System.IO.Pipelines.PipeWriter.Advance*` as appropriate, and calls `System.IO.Pipelines.PipeWriter.FlushAsync*`.

```csharp
async Task WriteHelloAsync(PipeWriter writer, CancellationToken <example-value> = default)
{
    byte[] helloBytes = Encoding.ASCII.GetBytes("Hello");

    // Write helloBytes to the writer, there's no need to call Advance here
    // (Write does that).
    await writer.WriteAsync(helloBytes, cancellationToken);
}
```
### Cancellation

`System.IO.Pipelines.PipeWriter.FlushAsync*` supports passing a `System.Threading.CancellationToken`. Passing a `CancellationToken` results in an `OperationCanceledException` if the token is canceled while there's a flush pending. `System.IO.Pipelines.PipeWriter.FlushAsync*` supports a way to cancel the current flush operation via `System.IO.Pipelines.PipeWriter.CancelPendingFlush*` without raising an exception. Calling `PipeWriter.CancelPendingFlush` causes the current or next call to `System.IO.Pipelines.PipeWriter.FlushAsync*` or `PipeWriter.WriteAsync` to return a `System.IO.Pipelines.FlushResult` with `IsCanceled` set to `true`. This is useful for halting the yielding flush in a non-destructive and non-exceptional way.

### PipeWriter common problems

* `System.IO.Pipelines.PipeWriter.GetSpan*` and `System.IO.Pipelines.PipeWriter.GetMemory*` return a buffer with at least the requested amount of memory. **Don't** assume exact buffer sizes.
* Successive calls aren't guaranteed to return the same buffer or the same-sized buffer.
* A new buffer must be requested after calling `System.IO.Pipelines.PipeWriter.Advance*` to continue writing more data. The previously acquired buffer can't be written to.
* Calling `System.IO.Pipelines.PipeWriter.GetMemory*` or `System.IO.Pipelines.PipeWriter.GetSpan*` while there's an incomplete call to `System.IO.Pipelines.PipeWriter.FlushAsync*` isn't safe.
* Calling `System.IO.Pipelines.PipeWriter.Complete*` or `System.IO.Pipelines.PipeWriter.CompleteAsync*` while there's unflushed data might result in memory corruption.

## Tips for PipeReader and PipeWriter

Use these tips to successfully use the `System.IO.Pipelines` classes:

* Always complete the PipeReader and PipeWriter, including an exception where applicable.
* Always call `System.IO.Pipelines.PipeReader.AdvanceTo*` after calling `System.IO.Pipelines.PipeReader.ReadAsync*`.
* Periodically `await` `System.IO.Pipelines.PipeWriter.FlushAsync*` while writing, and always check `System.IO.Pipelines.FlushResult.IsCompleted`. Abort writing if `IsCompleted` is `true`, as that indicates the reader is completed and no longer cares about what is written.
* Call `System.IO.Pipelines.PipeWriter.FlushAsync*` after writing something that you want the `PipeReader` to have access to.
* Don't call `FlushAsync` if the reader can't start until `FlushAsync` finishes, as that might cause a deadlock.
* Ensure that only one context "owns" a `PipeReader` or `PipeWriter` or accesses them. These types aren't thread-safe.
* Never access a `System.IO.Pipelines.ReadResult.Buffer*` after calling `System.IO.Pipelines.PipeReader.AdvanceTo*` or completing the `PipeReader`.

## IDuplexPipe

`System.IO.Pipelines.IDuplexPipe` is a contract for types that support both reading and writing. For example, a network connection is represented by an `IDuplexPipe`.

Unlike `Pipe`, which contains a `PipeReader` and a `PipeWriter`, `IDuplexPipe` represents a single side of a full duplex connection. What you write to the `PipeWriter` won't be read from the `PipeReader`.
