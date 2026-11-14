---
title: "System.IO.Pipelines - .NET (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/io/pipelines.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# System.IO.Pipelines

`System.IO.Pipelines` is a library designed to make high-performance I/O in .NET easier. The package targets .NET Standard for broad compatibility, .NET Framework, and modern .NET. In modern .NET versions, `System.IO.Pipelines` is included in the shared framework and doesn't require a separate NuGet package.

The library is also available as the System.IO.Pipelines NuGet package.

## What problem does System.IO.Pipelines solve?

Apps that parse streaming data are composed of boilerplate code having many specialized and unusual code flows. The boilerplate and special case code is complex and difficult to maintain.

`System.IO.Pipelines` was architected to:

* Have high performance parsing streaming data.
* Reduce code complexity.

This code is typical for a TCP server that receives line-delimited messages (delimited by `'\n'`) from a client:

```csharp
async Task ProcessLinesAsync(NetworkStream stream)
{
    var buffer = new byte[1024];
    await stream.ReadAsync(buffer, 0, buffer.Length);

    // Process a single line from the buffer
    ProcessLine(buffer);
}
```

The preceding code has several problems:

* The entire message (end of line) might not be received in a single call to `ReadAsync`.
* It's ignoring the result of `stream.ReadAsync`. `stream.ReadAsync` returns how much data was read.
* It doesn't handle the case where multiple lines are read in a single `ReadAsync` call.
* It allocates a `byte` array with each read.

To fix the preceding problems, make these changes:

* Buffer the incoming data until a new line is found.
* Parse all the lines returned in the buffer.
* The line might be bigger than 1 KB (1024 bytes). The code needs to resize the input buffer until the delimiter is found to fit the complete line inside the buffer.

  * If the buffer is resized, more buffer copies are made as longer lines appear in the input.
  * To reduce wasted space, compact the buffer used for reading lines.

* Consider using buffer pooling to avoid allocating memory repeatedly.
* This code addresses some of these problems:

```csharp
async Task ProcessLinesAsync(NetworkStream stream)
{
    byte[] buffer = ArrayPool<byte>.Shared.Rent(1024);
    var bytesBuffered = 0;
    var bytesConsumed = 0;

    while (true)
    {
        // Calculate the amount of bytes remaining in the buffer.
        var bytesRemaining = buffer.Length - bytesBuffered;

        if (bytesRemaining == 0)
        {
            // Double the buffer size and copy the previously buffered data into the new buffer.
            var newBuffer = ArrayPool<byte>.Shared.Rent(buffer.Length * 2);
            Buffer.BlockCopy(buffer, 0, newBuffer, 0, buffer.Length);
            // Return the old buffer to the pool.
            ArrayPool<byte>.Shared.Return(buffer);
            buffer = newBuffer;
            bytesRemaining = buffer.Length - bytesBuffered;
        }

        var bytesRead = await stream.ReadAsync(buffer, bytesBuffered, bytesRemaining);
        if (bytesRead == 0)
        {
            // EOF
            break;
        }

        // Keep track of the amount of buffered bytes.
        bytesBuffered += bytesRead;
        var linePosition = -1;

        do
        {
            // Look for a EOL in the buffered data.
            linePosition = Array.IndexOf(buffer, (byte)'\n', bytesConsumed,
                                         bytesBuffered - bytesConsumed);

            if (linePosition >= 0)
            {
                // Calculate the length of the line based on the offset.
                var lineLength = linePosition - bytesConsumed;

                // Process the line.
                ProcessLine(buffer, bytesConsumed, lineLength);

                // Move the bytesConsumed to skip past the line consumed (including \n).
                bytesConsumed += lineLength + 1;
            }
        }
        while (linePosition >= 0);
    }
}
```
The previous code is complex and doesn't address all the problems identified. High-performance networking usually means writing complex code to maximize performance. `System.IO.Pipelines` was designed to make writing this type of code easier.

## Pipe

Use the `System.IO.Pipelines.Pipe` class to create a `PipeWriter/PipeReader` pair. All data written into the `PipeWriter` is available in the `PipeReader`:

```csharp
var pipe = new Pipe();
PipeReader reader = pipe.Reader;
PipeWriter writer = pipe.Writer;
```
### Pipe basic usage

```csharp
async Task ProcessLinesAsync(Socket socket)
{
    var pipe = new Pipe();
    Task writing = FillPipeAsync(socket, pipe.Writer);
    Task reading = ReadPipeAsync(pipe.Reader);

    await Task.WhenAll(reading, writing);
}

async Task FillPipeAsync(Socket socket, PipeWriter writer)
{
    const int minimumBufferSize = 512;

    while (true)
    {
        // Allocate at least 512 bytes from the PipeWriter.
        Memory<byte> memory = writer.GetMemory(minimumBufferSize);
        try
        {
            int bytesRead = await socket.ReceiveAsync(memory, SocketFlags.None);
            if (bytesRead == 0)
            {
                break;
            }
            // Tell the PipeWriter how much was read from the Socket.
            writer.Advance(bytesRead);
        }
        catch (Exception ex)
        {
            LogError(ex);
            break;
        }

        // Make the data available to the PipeReader.
        FlushResult result = await writer.FlushAsync();

        if (result.IsCompleted)
        {
            break;
        }
    }

     // By completing PipeWriter, tell the PipeReader that there's no more data coming.
    await writer.CompleteAsync();
}

async Task ReadPipeAsync(PipeReader reader)
{
    while (true)
    {
        ReadResult result = await reader.ReadAsync();
        ReadOnlySequence<byte> buffer = result.Buffer;

        while (TryReadLine(ref buffer, out ReadOnlySequence<byte> line))
        {
            // Process the line.
            ProcessLine(line);
        }

        // Tell the PipeReader how much of the buffer has been consumed.
        reader.AdvanceTo(buffer.Start, buffer.End);

        // Stop reading if there's no more data coming.
        if (result.IsCompleted)
        {
            break;
        }
    }

    // Mark the PipeReader as complete.
    await reader.CompleteAsync();
}

bool TryReadLine(ref ReadOnlySequence<byte> buffer, out ReadOnlySequence<byte> line)
{
    // Look for a EOL in the buffer.
    SequencePosition? position = buffer.PositionOf((byte)'\n');

    if (position == null)
    {
        line = default;
        return false;
    }

    // Skip the line + the \n.
    line = buffer.Slice(0, position.Value);
    buffer = buffer.Slice(buffer.GetPosition(1, position.Value));
    return true;
}
```
Two loops handle the reading and writing:

* `FillPipeAsync` reads from the `Socket` and writes to the `PipeWriter`.
* `ReadPipeAsync` reads from the `PipeReader` and parses incoming lines.

No explicit buffers are allocated. All buffer management is delegated to the `PipeReader` and `PipeWriter` implementations. Delegating buffer management makes it easier for consuming code to focus solely on the business logic.

In the first loop:

* `System.IO.Pipelines.PipeWriter.GetMemory(System.Int32)` is called to get memory from the underlying writer.
* `System.IO.Pipelines.PipeWriter.Advance(System.Int32)`
is called to tell the `PipeWriter` how much data was written to the buffer.
* `System.IO.Pipelines.PipeWriter.FlushAsync*` is called to make the data available to the `PipeReader`.

In the second loop, the `PipeReader` consumes the buffers written by `PipeWriter`. The buffers come from the socket. The call to `System.IO.Pipelines.PipeReader.ReadAsync*`:

* Returns a `System.IO.Pipelines.ReadResult` that contains two important pieces of information:

  * The data that was read in the form of `System.Buffers.ReadOnlySequence`1`.
  * A boolean `IsCompleted` that indicates if the end of data (EOF) has been reached.

After finding the end of line (EOL) delimiter and parsing the line:

* The logic processes the buffer to skip what's already processed.
* `System.IO.Pipelines.PipeReader.AdvanceTo*` is called to tell the `PipeReader` how much data has been consumed and examined.

The reader and writer loops end by calling `System.IO.Pipelines.PipeReader.Complete*` and `System.IO.Pipelines.PipeWriter.Complete*`. Calling `Complete` releases the memory the underlying `Pipe` allocated.

### Backpressure and flow control

Ideally, reading and parsing work together:

* The reading thread consumes data from the network and puts it in buffers.
* The parsing thread is responsible for constructing the appropriate data structures.

Typically, parsing takes more time than just copying blocks of data from the network:

* The reading thread gets ahead of the parsing thread.
* The reading thread has to either slow down or allocate more memory to store the data for the parsing thread.

For optimal performance, there's a balance between frequent pauses and allocating more memory.

To solve the preceding problem, the `Pipe` has two settings to control the flow of data:

* `System.IO.Pipelines.PipeOptions.PauseWriterThreshold`: Determines how much data should be buffered before calls to `System.IO.Pipelines.PipeWriter.FlushAsync*` pause.
* `System.IO.Pipelines.PipeOptions.ResumeWriterThreshold`: Determines how much data the reader has to observe before calls to `System.IO.Pipelines.PipeWriter.FlushAsync*` resume.

`System.IO.Pipelines.PipeWriter.FlushAsync*`:

* Returns an incomplete `ValueTask<FlushResult>` when the amount of data in the `Pipe` crosses `PauseWriterThreshold`.
* Completes `ValueTask<FlushResult>` when it becomes lower than `ResumeWriterThreshold`.

Two values are used to prevent rapid cycling, which can occur if one value is used.

### Examples

```csharp
// The Pipe will start returning incomplete tasks from FlushAsync until
// the reader examines at least 5 bytes.
var options = new PipeOptions(pauseWriterThreshold: 10, resumeWriterThreshold: 5);
var pipe = new Pipe(options);
```

### PipeScheduler

Typically when using `async` and `await`, asynchronous code resumes on either a `System.Threading.Tasks.TaskScheduler` or the current `System.Threading.SynchronizationContext`.

When doing I/O, it's important to have fine-grained control over where the I/O is performed. This control allows taking advantage of CPU caches effectively. Efficient caching is critical for high-performance apps like web servers. `System.IO.Pipelines.PipeScheduler` provides control over where asynchronous callbacks run. By default:

* The current `System.Threading.SynchronizationContext` is used.
* If there's no `SynchronizationContext`, it uses the thread pool to run callbacks.

```csharp
public static void Main(string[] args)
{
    var writeScheduler = new SingleThreadPipeScheduler();
    var readScheduler = new SingleThreadPipeScheduler();

    // Tell the Pipe what schedulers to use and disable the SynchronizationContext.
    var options = new PipeOptions(readerScheduler: readScheduler,
                                  writerScheduler: writeScheduler,
                                  useSynchronizationContext: false);
    var pipe = new Pipe(options);
}

// This is a sample scheduler that async callbacks on a single dedicated thread.
public class SingleThreadPipeScheduler : PipeScheduler
{
    private readonly BlockingCollection<(Action<object> Action, object State)> _queue =
     new BlockingCollection<(Action<object> Action, object State)>();
    private readonly Thread _thread;

    public SingleThreadPipeScheduler()
    {
        _thread = new Thread(DoWork);
        _thread.Start();
    }

    private void DoWork()
    {
        foreach (var item in _queue.GetConsumingEnumerable())
        {
            item.Action(item.State);
        }
    }

    public override void Schedule(Action<object?> action, object? state)
    {
        if (state is not null)
        {
            _queue.Add((action, state));
        }
        // else log the fact that _queue.Add was not called.
    }
}
```
PipeScheduler.ThreadPool is the `System.IO.Pipelines.PipeScheduler` implementation that queues callbacks to the thread pool. `PipeScheduler.ThreadPool` is the default and generally the best choice. PipeScheduler.Inline can cause unintended consequences such as deadlocks.

### Pipe reset

Reusing the `Pipe` object is often efficient. To reset the pipe, call `System.IO.Pipelines.PipeReader` `System.IO.Pipelines.Pipe.Reset*` when both the `PipeReader` and `PipeWriter` are complete.
