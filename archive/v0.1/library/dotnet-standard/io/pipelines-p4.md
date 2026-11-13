---
title: "System.IO.Pipelines - .NET (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/pipelines.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# System.IO.Pipelines - .NET (part 4 of 4)

## Streams

When reading or writing stream data, you typically read data using a de-serializer and write data using a serializer. Most of these read and write stream APIs have a `Stream` parameter. To make it easier to integrate with these existing APIs, `PipeReader` and `PipeWriter` expose an `System.IO.Pipelines.PipeReader.AsStream*` method. `System.IO.Pipelines.PipeWriter.AsStream*` returns a `Stream` implementation around the `PipeReader` or `PipeWriter`.

### Stream example

Create `PipeReader` and `PipeWriter` instances using the static `Create` methods given a `System.IO.Stream` object and optional corresponding creation options.

The `System.IO.Pipelines.StreamPipeReaderOptions` allow for control over the creation of the `PipeReader` instance with the following parameters:

- `System.IO.Pipelines.StreamPipeReaderOptions.BufferSize` is the minimum buffer size in bytes used when renting memory from the pool, and defaults to `4096`.
- `System.IO.Pipelines.StreamPipeReaderOptions.LeaveOpen` flag determines whether or not the underlying stream is left open after the `PipeReader` completes, and defaults to `false`.
- `System.IO.Pipelines.StreamPipeReaderOptions.MinimumReadSize` represents the threshold of remaining bytes in the buffer before a new buffer is allocated, and defaults to `1024`.
- `System.IO.Pipelines.StreamPipeReaderOptions.Pool` is the `MemoryPool<byte>` used when allocating memory, and defaults to `null`.

The `System.IO.Pipelines.StreamPipeWriterOptions` allow for control over the creation of the `PipeWriter` instance with the following parameters:

- `System.IO.Pipelines.StreamPipeWriterOptions.LeaveOpen` flag determines whether or not the underlying stream is left open after the `PipeWriter` completes, and defaults to `false`.
- `System.IO.Pipelines.StreamPipeWriterOptions.MinimumBufferSize` represents the minimum buffer size to use when renting memory from the `System.IO.Pipelines.StreamPipeWriterOptions.Pool`, and defaults to `4096`.
- `System.IO.Pipelines.StreamPipeWriterOptions.Pool` is the `MemoryPool<byte>` used when allocating memory, and defaults to `null`.

> **Important:**
> When creating `PipeReader` and `PipeWriter` instances using the `Create` methods, consider the `Stream` object lifetime. If you need access to the stream after the reader or writer is done with it, set the `LeaveOpen` flag to `true` on the creation options. Otherwise, the stream is closed.

This code demonstrates creating `PipeReader` and `PipeWriter` instances using the `Create` methods from a stream.

```csharp
﻿using System.Buffers;
using System.IO.Pipelines;
using System.Text;

class Program
{
    static async Task Main()
    {
        using var stream = File.OpenRead("lorem-ipsum.txt");

        var reader = PipeReader.Create(stream);
        var writer = PipeWriter.Create(
            Console.OpenStandardOutput(), 
            new StreamPipeWriterOptions(leaveOpen: true));

        WriteUserCancellationPrompt();

        var processMessagesTask = ProcessMessagesAsync(reader, writer);
        var userCanceled = false;
        var cancelProcessingTask = Task.Run(() =>
        {
            while (char.ToUpperInvariant(Console.ReadKey().KeyChar) != 'C')
            {
                WriteUserCancellationPrompt();
            }

            userCanceled = true;

            // No exceptions thrown
            reader.CancelPendingRead();
            writer.CancelPendingFlush();
        });

        await Task.WhenAny(cancelProcessingTask, processMessagesTask);

        Console.WriteLine(
            $"\n\nProcessing {(userCanceled ? "cancelled" : "completed")}.\n");
    }

    static void WriteUserCancellationPrompt() =>
        Console.WriteLine("Press 'C' to cancel processing...\n");

    static async Task ProcessMessagesAsync(
        PipeReader reader,
        PipeWriter writer)
    {
        try
        {
            while (true)
            {
                ReadResult readResult = await reader.ReadAsync();
                ReadOnlySequence<byte> buffer = readResult.Buffer;

                try
                {
                    if (readResult.IsCanceled)
                    {
                        break;
                    }

                    if (TryParseLines(ref buffer, out string message))
                    {
                        FlushResult flushResult =
                            await WriteMessagesAsync(writer, message);

                        if (flushResult.IsCanceled || flushResult.IsCompleted)
                        {
                            break;
                        }
                    }

                    if (readResult.IsCompleted)
                    {
                        if (!buffer.IsEmpty)
                        {
                            throw new InvalidDataException("Incomplete message.");
                        }
                        break;
                    }
                }
                finally
                {
                    reader.AdvanceTo(buffer.Start, buffer.End);
                }
            }
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(ex);
        }
        finally
        {
            await reader.CompleteAsync();
            await writer.CompleteAsync();
        }
    }

    static bool TryParseLines(
        ref ReadOnlySequence<byte> buffer,
        out string message)
    {
        SequencePosition? position;
        StringBuilder outputMessage = new();

        while(true)
        {
            position = buffer.PositionOf((byte)'\n');

            if (!position.HasValue)
                break;

            outputMessage.Append(Encoding.ASCII.GetString(buffer.Slice(buffer.Start, position.Value)))
                        .AppendLine();

            buffer = buffer.Slice(buffer.GetPosition(1, position.Value));
        };

        message = outputMessage.ToString();
        return message.Length != 0;
    }

    static ValueTask<FlushResult> WriteMessagesAsync(
        PipeWriter writer,
        string message) =>
        writer.WriteAsync(Encoding.ASCII.GetBytes(message));
}
```
The application uses a `System.IO.StreamReader` to read the *lorem-ipsum.txt* file as a stream, and it must end with a blank line. The `System.IO.FileStream` is passed to `System.IO.Pipelines.PipeReader.Create*`, which instantiates a `PipeReader` object. The console application then passes its standard output stream to `System.IO.Pipelines.PipeWriter.Create*` using `System.Console.OpenStandardOutput`. The example supports cancellation.
