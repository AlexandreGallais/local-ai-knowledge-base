---
title: "What's new in .NET libraries for .NET 10 (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-10/libraries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 10 (part 3 of 3)

## ZIP files

- ZipArchive performance and memory improvements
- New async ZIP APIs
- Performance improvement in GZipStream for concatenated streams

### ZipArchive performance and memory improvements

.NET 10 improves the performance and memory usage of `System.IO.Compression.ZipArchive`.

First, the way entries are written to a `ZipArchive` when in `Update` mode has been optimized. Previously, all `System.IO.Compression.ZipArchiveEntry` instances were loaded into memory and rewritten, which could lead to high memory usage and performance bottlenecks. The optimization reduces memory usage and improves performance by avoiding the need to load all entries into memory.

Second, the extraction of `System.IO.Compression.ZipArchive` entries is now parallelized, and internal data structures are optimized for better memory usage. These improvements address issues related to performance bottlenecks and high memory usage, making `ZipArchive` more efficient and faster, especially when dealing with large archives.

### New async ZIP APIs

.NET 10 introduces new asynchronous APIs that make it easier to perform non-blocking operations when reading from or writing to ZIP files. This feature was highly requested by the community.

New `async` methods are available for extracting, creating, and updating ZIP archives. These methods enable developers to efficiently handle large files and improve application responsiveness, especially in scenarios involving I/O-bound operations. These methods include:

- `System.IO.Compression.ZipArchive.CreateAsync(System.IO.Stream,System.IO.Compression.ZipArchiveMode,System.Boolean,System.Text.Encoding,System.Threading.CancellationToken)`
- `System.IO.Compression.ZipArchiveEntry.OpenAsync(System.Threading.CancellationToken)`
- `System.IO.Compression.ZipFile.CreateFromDirectoryAsync*`
- `System.IO.Compression.ZipFile.ExtractToDirectoryAsync*`
- `System.IO.Compression.ZipFile.OpenAsync*`
- `System.IO.Compression.ZipFile.OpenReadAsync(System.String,System.Threading.CancellationToken)`
- `System.IO.Compression.ZipFileExtensions.CreateEntryFromFileAsync*`
- `System.IO.Compression.ZipFileExtensions.ExtractToDirectoryAsync*`
- `System.IO.Compression.ZipFileExtensions.ExtractToFileAsync*`

For examples of using these APIs, see the Preview 4 blog post.

### Performance improvement in GZipStream for concatenated streams

A community contribution improved the performance of `System.IO.Compression.GZipStream` when processing concatenated GZip data streams. Previously, each new stream segment disposed and reallocated the internal `ZLibStreamHandle`, which resulted in additional memory allocations and initialization overhead. With this change, the handle is now reset and reused to reduce both managed and unmanaged memory allocations and improve execution time. The largest impact (~35% faster) is seen when processing a large number of small data streams. This change:

- Eliminates repeated allocation of ~64-80 bytes of memory per concatenated stream, with additional unmanaged memory savings.
- Reduces execution time by approximately 400 ns per concatenated stream.

## Windows process management

### Launch Windows processes in new process group

For Windows, you can now use `System.Diagnostics.ProcessStartInfo.CreateNewProcessGroup` to launch a process in a separate process group. This allows you to send isolated signals to child processes that could otherwise take down the parent without proper handling. Sending signals is convenient to avoid forceful termination.

```csharp
using System;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading;

class Program
{
    static void Main(string[] args)
    {
        bool isChildProcess = args.Length > 0 && args[0] == "child";
        if (!isChildProcess)
        {
            var psi = new ProcessStartInfo
            {
                FileName = Environment.ProcessPath,
                Arguments = "child",
                CreateNewProcessGroup = true,
            };

            using Process process = Process.Start(psi)!;
            Thread.Sleep(5_000);

            GenerateConsoleCtrlEvent(CTRL_BREAK_EVENT, (uint)process.Id);
            process.WaitForExit();

            Console.WriteLine("Child process terminated gracefully, continue with the parent process logic if needed.");
        }
        else
        {
            // CREATE_NEW_PROCESS_GROUP disables CTRL+C handling in the new process group.
            // CTRL+BREAK is not affected, so you don't need to re-enable it with SetConsoleCtrlHandler.
            // If you use CTRL+C instead, re-enable handling by calling SetConsoleCtrlHandler(NULL, FALSE).
            // see https://learn.microsoft.com/windows/win32/api/processthreadsapi/nf-processthreadsapi-createprocessw#remarks

            Console.WriteLine("Greetings from the child process!  I need to be gracefully terminated, send me a signal!");

            bool stop = false;

            var registration = PosixSignalRegistration.Create(PosixSignal.SIGQUIT, ctx =>
            {
                stop = true;
                ctx.Cancel = true;
                Console.WriteLine("Received CTRL+BREAK, stopping...");
            });

            StreamWriter sw = File.AppendText("log.txt");
            int i = 0;
            while (!stop)
            {
                Thread.Sleep(1000);
                sw.WriteLine($"{++i}");
                Console.WriteLine($"Logging {i}...");
            }

            // Clean up
            sw.Dispose();
            registration.Dispose();

            Console.WriteLine("Thanks for not killing me!");
        }
    }

    private const int CTRL_C_EVENT = 0;
    private const int CTRL_BREAK_EVENT = 1;

    [DllImport("kernel32.dll", SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool SetConsoleCtrlHandler(IntPtr handler, [MarshalAs(UnmanagedType.Bool)] bool Add);

    [DllImport("kernel32.dll", SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool GenerateConsoleCtrlEvent(uint dwCtrlEvent, uint dwProcessGroupId);
}
```
## WebSocket enhancements

### WebSocketStream

.NET 10 introduces `System.Net.WebSockets.WebSocketStream`, a new API designed to simplify some of the most common—and previously cumbersome—`System.Net.WebSockets.WebSocket` scenarios in .NET.

Traditional `WebSocket` APIs are low-level and require significant boilerplate: handling buffering and framing, reconstructing messages, managing encoding/decoding, and writing custom wrappers to integrate with streams, channels, or other transport abstractions. These complexities make it difficult to use WebSockets as a transport, especially for apps with streaming or text-based protocols, or event-driven handlers.

`WebSocketStream` addresses these pain points by providing a `System.IO.Stream`-based abstraction over a WebSocket. This enables seamless integration with existing APIs for reading, writing, and parsing data, whether binary or text, and reduces the need for manual plumbing.

`WebSocketStream` enables high-level, familiar APIs for common WebSocket consumption and production patterns. These APIs reduce friction and make advanced scenarios easier to implement.

#### Common usage patterns

Here are a few examples of how `WebSocketStream` simplifies typical `WebSocket` workflows:

##### Streaming text protocol (for example, STOMP)

```csharp
using System.IO;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

// Streaming text protocol (for example, STOMP).
using Stream transportStream = WebSocketStream.Create(
    connectedWebSocket, 
    WebSocketMessageType.Text,
    ownsWebSocket: true);
// Integration with Stream-based APIs.
// Don't close the stream, as it's also used for writing.
using var transportReader = new StreamReader(transportStream, leaveOpen: true); 
var line = await transportReader.ReadLineAsync(cancellationToken); // Automatic UTF-8 and new line handling.
transportStream.Dispose(); // Automatic closing handshake handling on `Dispose`.
```
##### Streaming binary protocol (for example, AMQP)

```csharp
using System;
using System.IO;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

// Streaming binary protocol (for example, AMQP).
Stream transportStream = WebSocketStream.Create(
    connectedWebSocket,
    WebSocketMessageType.Binary,
    closeTimeout: TimeSpan.FromSeconds(10));
await message.SerializeToStreamAsync(transportStream, cancellationToken);
var receivePayload = new byte[payloadLength];
await transportStream.ReadExactlyAsync(receivePayload, cancellationToken);
transportStream.Dispose();
// `Dispose` automatically handles closing handshake.
```
##### Read a single message as a stream (for example, JSON deserialization)

```csharp
using System.IO;
using System.Net.WebSockets;
using System.Text.Json;

// Reading a single message as a stream (for example, JSON deserialization).
using Stream messageStream = WebSocketStream.CreateReadableMessageStream(connectedWebSocket, WebSocketMessageType.Text);
// JsonSerializer.DeserializeAsync reads until the end of stream.
var appMessage = await JsonSerializer.DeserializeAsync<AppMessage>(messageStream);
```
##### Write a single message as a stream (for example, binary serialization)

```csharp
using System;
using System.IO;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

// Writing a single message as a stream (for example, binary serialization).
public async Task SendMessageAsync(AppMessage message, CancellationToken <example-value>)
{
    using Stream messageStream = WebSocketStream.CreateWritableMessageStream(_connectedWebSocket, WebSocketMessageType.Binary);
    foreach (ReadOnlyMemory<byte> chunk in message.SplitToChunks())
    {
        await messageStream.WriteAsync(chunk, cancellationToken);
    }
} // EOM sent on messageStream.Dispose().
```
## TLS enhancements

### TLS 1.3 for macOS (client)

.NET 10 adds client-side TLS 1.3 support on macOS by integrating Apple's Network.framework into `System.Net.Security.SslStream` and `System.Net.Http.HttpClient`. Historically, macOS used Secure Transport which doesn't support TLS 1.3; opting into Network.framework enables TLS 1.3.

#### Scope and behavior

- macOS only, client-side in this release.
- Opt-in. Existing apps continue to use the current stack unless enabled.
- When enabled, older TLS versions (TLS 1.0 and 1.1) might no longer be available via Network.framework.

#### How to enable

Use an AppContext switch in code:

```csharp
// Opt in to Network.framework-backed TLS on Apple platforms.
AppContext.SetSwitch("System.Net.Security.UseNetworkFramework", true);

using var client = new HttpClient();
var html = await client.GetStringAsync("https://example.com");
```

Or use an environment variable:

```bash
# Opt-in via environment variable (set for the process or machine as appropriate)
DOTNET_SYSTEM_NET_SECURITY_USENETWORKFRAMEWORK=1
# or
DOTNET_SYSTEM_NET_SECURITY_USENETWORKFRAMEWORK=true
```

#### Notes

- TLS 1.3 applies to `System.Net.Security.SslStream` and APIs built on it (for example, `System.Net.Http.HttpClient`/`System.Net.Http.HttpMessageHandler`).
- Cipher suites are controlled by macOS via Network.framework.
- Underlying stream behavior might differ when Network.framework is enabled (for example, buffering, read/write completion, cancellation semantics).
- Semantics might differ for zero-byte reads. Avoid relying on zero-length reads for detecting data availability.
- Certain internationalized domain names (IDN) hostnames might be rejected by Network.framework. Prefer ASCII/Punycode (A-label) hostnames or validate names against macOS/Network.framework constraints.
- If your app relies on specific `System.Net.Security.SslStream` edge-case behavior, validate it under Network.framework.
