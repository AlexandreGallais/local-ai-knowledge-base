---
title: "System.IO.Pipelines - .NET (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/pipelines.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# System.IO.Pipelines - .NET (part 2 of 4)

## PipeReader

`System.IO.Pipelines.PipeReader` manages memory on the caller's behalf. **Always** call `System.IO.Pipelines.PipeReader.AdvanceTo*` after calling `System.IO.Pipelines.PipeReader.ReadAsync*`. This lets the `PipeReader` know when the caller is done with the memory so that it can be tracked. The `System.Buffers.ReadOnlySequence`1` returned from `System.IO.Pipelines.PipeReader.ReadAsync*` is only valid until the call to `System.IO.Pipelines.PipeReader.AdvanceTo*`. It's illegal to use `System.Buffers.ReadOnlySequence`1` after calling `System.IO.Pipelines.PipeReader.AdvanceTo*`.

`System.IO.Pipelines.PipeReader.AdvanceTo*` takes two `System.SequencePosition` arguments:

* The first argument determines how much memory was consumed.
* The second argument determines how much of the buffer was observed.

Marking data as consumed means that the pipe can return the memory to the underlying buffer pool. Marking data as observed controls what the next call to `System.IO.Pipelines.PipeReader.ReadAsync*` does. Marking everything as observed means that the next call to `System.IO.Pipelines.PipeReader.ReadAsync*` won't return until there's more data written to the pipe. Any other value makes the next call to `System.IO.Pipelines.PipeReader.ReadAsync*` return immediately with the observed *and* unobserved data, but not data that has already been consumed.

### Read streaming data scenarios

A couple of typical patterns emerge when reading streaming data:

* Given a stream of data, parse a single message.
* Given a stream of data, parse all available messages.

These examples use the `TryParseLines` method for parsing messages from a `System.Buffers.ReadOnlySequence`1`. `TryParseLines` parses a single message and updates the input buffer to trim the parsed message from the buffer. `TryParseLines` isn't part of .NET; it's a user-written method used in the following sections.

```csharp
bool TryParseLines(ref ReadOnlySequence<byte> buffer, out Message message);
```

### Read a single message

This code reads a single message from a `PipeReader` and returns it to the caller.

```csharp
async ValueTask<Message?> ReadSingleMessageAsync(PipeReader reader,
 CancellationToken cancellationToken = default)
{
    while (true)
    {
        ReadResult result = await reader.ReadAsync(cancellationToken);
        ReadOnlySequence<byte> buffer = result.Buffer;

        // In the event that no message is parsed successfully, mark consumed
        // as nothing and examined as the entire buffer.
        SequencePosition consumed = buffer.Start;
        SequencePosition examined = buffer.End;

        try
        {
            if (TryParseLines(ref buffer, out Message message))
            {
                // A single message was successfully parsed so mark the start of the
                // parsed buffer as consumed. TryParseLines trims the buffer to
                // point to the data after the message was parsed.
                consumed = buffer.Start;

                // Examined is marked the same as consumed here, so the next call
                // to ReadSingleMessageAsync will process the next message if there's
                // one.
                examined = consumed;

                return message;
            }

            // There's no more data to be processed.
            if (result.IsCompleted)
            {
                if (buffer.Length > 0)
                {
                    // The message is incomplete and there's no more data to process.
                    throw new InvalidDataException("Incomplete message.");
                }

                break;
            }
        }
        finally
        {
            reader.AdvanceTo(consumed, examined);
        }
    }

    return null;
}
```
The preceding code:

* Parses a single message.
* Updates the consumed `SequencePosition` and examined `SequencePosition` to point to the start of the trimmed input buffer.

The two `SequencePosition` arguments are updated because `TryParseLines` removes the parsed message from the input buffer. Generally, when parsing a single message from the buffer, the examined position should be one of the following:

* The end of the message.
* The end of the received buffer if no message was found.

The single message case has the most potential for errors. Passing the wrong values to *examined* might result in an out of memory exception or an infinite loop. For more information, see the PipeReader common problems section in this article.

> **Important:**
> `ReadSingleMessageAsync` doesn't call `PipeReader.CompleteAsync`. The caller is responsible for completing the `PipeReader`. Calling `PipeReader.CompleteAsync` inside `ReadSingleMessageAsync` signals that no more data can be read, which prevents reading subsequent messages.

### Read multiple messages

This code reads all messages from a `PipeReader` and calls `ProcessMessageAsync` on each.

```csharp
async Task ProcessMessagesAsync(PipeReader reader, CancellationToken cancellationToken = default)
{
    try
    {
        while (true)
        {
            ReadResult result = await reader.ReadAsync(cancellationToken);
            ReadOnlySequence<byte> buffer = result.Buffer;

            try
            {
                // Process all messages from the buffer, modifying the input buffer on each
                // iteration.
                while (TryParseLines(ref buffer, out Message message))
                {
                    await ProcessMessageAsync(message);
                }

                // There's no more data to be processed.
                if (result.IsCompleted)
                {
                    if (buffer.Length > 0)
                    {
                        // The message is incomplete and there's no more data to process.
                        throw new InvalidDataException("Incomplete message.");
                    }
                    break;
                }
            }
            finally
            {
                // Since all messages in the buffer are being processed, you can use the
                // remaining buffer's Start and End position to determine consumed and examined.
                reader.AdvanceTo(buffer.Start, buffer.End);
            }
        }
    }
    finally
    {
        await reader.CompleteAsync();
    }
}
```
Because `ProcessMessagesAsync` owns the complete message-reading loop, it calls `System.IO.Pipelines.PipeReader.CompleteAsync*` when it's done. Unlike the single-message case, the caller doesn't need to complete the reader. `ProcessMessagesAsync` takes full ownership of the `PipeReader` lifetime.

### Cancellation

`System.IO.Pipelines.PipeReader.ReadAsync*`:

* Supports passing a `System.Threading.CancellationToken`.
* Throws an `System.OperationCanceledException` if the `CancellationToken` is canceled while there's a read pending.
* Supports a way to cancel the current read operation via `System.IO.Pipelines.PipeReader.CancelPendingRead*`, which avoids raising an exception. Calling `PipeReader.CancelPendingRead` causes the current or next call to `System.IO.Pipelines.PipeReader.ReadAsync*` to return a `System.IO.Pipelines.ReadResult` with `IsCanceled` set to `true`. This is useful for halting the existing read loop in a non-destructive and non-exceptional way.

```csharp
private PipeReader reader;

public MyConnection(PipeReader reader)
{
    this.reader = reader;
}

public void Abort()
{
    // Cancel the pending read so the process loop ends without an exception.
    reader.CancelPendingRead();
}

public async Task ProcessMessagesAsync()
{
    try
    {
        while (true)
        {
            ReadResult result = await reader.ReadAsync();
            ReadOnlySequence<byte> buffer = result.Buffer;

            try
            {
                if (result.IsCanceled)
                {
                    // The read was canceled. You can quit without reading the existing data.
                    break;
                }

                // Process all messages from the buffer, modifying the input buffer on each
                // iteration.
                while (TryParseLines(ref buffer, out Message message))
                {
                    await ProcessMessageAsync(message);
                }

                // There's no more data to be processed.
                if (result.IsCompleted)
                {
                    break;
                }
            }
            finally
            {
                // Since all messages in the buffer are being processed, you can use the
                // remaining buffer's Start and End position to determine consumed and examined.
                reader.AdvanceTo(buffer.Start, buffer.End);
            }
        }
    }
    finally
    {
        await reader.CompleteAsync();
    }
}
```
