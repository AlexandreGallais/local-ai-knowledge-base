---
title: "What's new in .NET libraries for .NET 11 (part 1 of 8)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-11/libraries.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 11

This article describes new features in the .NET libraries for .NET 11. It was last updated for the general availability (GA) release.

## Diagnostics and process execution

- Process API expansion
- Console FORCE_COLOR support

### Process API expansion

`System.Diagnostics.Process` has a substantial set of new APIs that cover common scenarios where you previously had to wire up `System.Diagnostics.Process.OutputDataReceived`/`System.Diagnostics.Process.ErrorDataReceived` events manually or use P/Invoke.

#### Run-and-capture helpers

New one-shot APIs let you launch a process and get its result without manual setup:

```csharp
// One-shot capture: stdout and stderr together, plus exit code.
ProcessTextOutput result = await Process.RunAndCaptureTextAsync(
    "git", ["status", "--porcelain"]);

Console.WriteLine(result.StandardOutput);
Console.WriteLine($"Exit code: {result.ExitStatus.ExitCode}");
```
The full set of helpers includes:

- `System.Diagnostics.Process.Run*` and `System.Diagnostics.Process.RunAsync*` — launch a process and return an exit-status result.
- `System.Diagnostics.Process.RunAndCaptureText*` and `System.Diagnostics.Process.RunAndCaptureTextAsync*` — launch and capture stdout/stderr together with exit code.
- `System.Diagnostics.Process.ReadAllText(System.Nullable{System.TimeSpan})`, `System.Diagnostics.Process.ReadAllBytes(System.Nullable{System.TimeSpan})`, and their async variants — read a child process's standard output in a single call.
- `System.Diagnostics.Process.ReadAllLines(System.Nullable{System.TimeSpan})` — synchronously reads all lines of output from a child process, returning a sequence of `System.Diagnostics.ProcessOutputLine` values that distinguish stdout from stderr.
- `System.Diagnostics.Process.ReadAllLinesAsync(System.Threading.CancellationToken)` — returns a stream of `System.Diagnostics.ProcessOutputLine` values that distinguish stdout from stderr without string parsing.

#### Fire-and-forget launches

- `System.Diagnostics.Process.StartAndForget*` — starts a child process when you don't intend to wait for it; the runtime detaches the handle automatically.
- `System.Diagnostics.ProcessStartInfo.StartDetached` — detaches from the parent's session/console so the child can outlive a terminal exit.
- `System.Diagnostics.ProcessStartInfo.KillOnParentExit` (Windows only) — the child is terminated when the parent process exits.

#### SafeProcessHandle lifecycle methods

`Microsoft.Win32.SafeHandles.SafeProcessHandle` gains lifecycle methods for advanced scenarios:

- `Microsoft.Win32.SafeHandles.SafeProcessHandle.Start(System.Diagnostics.ProcessStartInfo)` and a new `Microsoft.Win32.SafeHandles.SafeProcessHandle.ProcessId` property — launch and identify processes without going through `System.Diagnostics.Process` itself.
- `Microsoft.Win32.SafeHandles.SafeProcessHandle.Kill` and `Microsoft.Win32.SafeHandles.SafeProcessHandle.Signal(System.Runtime.InteropServices.PosixSignal)` — terminate or signal a process by handle.
- `Microsoft.Win32.SafeHandles.SafeProcessHandle.WaitForExit` and `Microsoft.Win32.SafeHandles.SafeProcessHandle.WaitForExitAsync(System.Threading.CancellationToken)` — wait for a process to exit by handle.

#### Tighter handle control

- `System.Diagnostics.ProcessStartInfo.InheritedHandles` — specify exactly which OS handles a child process inherits, instead of using the all-or-nothing `UseShellExecute = false` default.
- `System.Diagnostics.ProcessStartInfo.StandardInputHandle`, `System.Diagnostics.ProcessStartInfo.StandardOutputHandle`, and `System.Diagnostics.ProcessStartInfo.StandardErrorHandle` — supply already-open `Microsoft.Win32.SafeHandles.SafeFileHandle` values for redirection without the framework opening new ones.

#### Suspended starts and process lookup

`System.Diagnostics.Process` adds finer control over starting and finding processes:

- `System.Diagnostics.ProcessStartInfo.StartSuspended` starts a process in a suspended state on Windows and macOS. Pair it with `Microsoft.Win32.SafeHandles.SafeProcessHandle.Resume` to let it run once you've finished any setup, such as attaching a debugger or configuring job objects.
- `System.Diagnostics.Process.TryGetProcessById(System.Int32,System.Diagnostics.Process@)` returns `false` instead of throwing when no process with the given ID exists.
- `Microsoft.Win32.SafeHandles.SafeProcessHandle.Open(System.Int32)` and `Microsoft.Win32.SafeHandles.SafeProcessHandle.TryOpen(System.Int32,Microsoft.Win32.SafeHandles.SafeProcessHandle@)` open a handle to an existing process by ID.

```csharp
var startInfo = new ProcessStartInfo("worker.exe") { StartSuspended = true };
using var process = Process.Start(startInfo)!;

// Attach diagnostics or configure job objects while the process is suspended,
// then call Resume to start execution once your setup is complete.
AttachProfiler(process);
process.SafeHandle.Resume();
```

#### Signal processes and inspect termination status

`System.Diagnostics.Process` exposes process signaling and exit-status APIs directly, without requiring you to work through `Microsoft.Win32.SafeHandles.SafeProcessHandle`:

- `System.Diagnostics.Process.Signal(System.Runtime.InteropServices.PosixSignal)` sends a POSIX signal to the process.
- `System.Diagnostics.Process.WaitForExitStatus`, `System.Diagnostics.Process.TryWaitForExitStatus(System.TimeSpan,System.Diagnostics.ProcessExitStatus@)`, and `System.Diagnostics.Process.WaitForExitStatusAsync(System.Threading.CancellationToken)` return a `System.Diagnostics.ProcessExitStatus`, which distinguishes a normal exit from a signal-based termination.

```csharp
if (OperatingSystem.IsLinux() || OperatingSystem.IsMacOS())
{
    using Process process = Process.Start("sleep", "30")!;
    process.Signal(PosixSignal.SIGTERM);
    ProcessExitStatus status = await process.WaitForExitStatusAsync();
    Console.WriteLine(status);
}
```
### Console FORCE_COLOR support

.NET console output now honors the `FORCE_COLOR` standard alongside the existing `NO_COLOR` support. When `FORCE_COLOR` is set, `System.Console.IsOutputRedirected` no longer suppresses ANSI escape codes. This is useful when you pipe `dotnet run` output through `tee`, into a CI log viewer, or through `less -R`:

```bash
FORCE_COLOR=1 dotnet run | tee build.log
```

## In-memory stream adapters

Four new `Stream` types wrap common in-memory data so you can pass them to any API that expects a `Stream`, without copying into a `MemoryStream` first:

- `ReadOnlyMemoryStream` exposes a `ReadOnlyMemory<byte>` as a read-only stream.
- `WritableMemoryStream` exposes a writable `Memory<byte>` as a fixed-size stream.
- `ReadOnlySequenceStream` exposes a `ReadOnlySequence<byte>` (for example, buffers from `System.IO.Pipelines`) as a stream without flattening it.
- `StringStream` reads a `string` or `ReadOnlyMemory<char>` as a stream using a specified encoding.

```csharp
using System.IO;
using System.Text;

// Pass a string to an API that takes a Stream, with no intermediate byte[] needed.
using Stream config = new StringStream(yamlText, Encoding.UTF8);
var settings = ParseConfiguration(config);

// Expose an existing buffer as a read-only stream, for example as an HTTP request body.
ReadOnlyMemory<byte> payload = GetPayload();
using Stream body = new ReadOnlyMemoryStream(payload);
await httpClient.PostAsync(uri, new StreamContent(body));
```

`ReadOnlySequenceStream` is especially useful with `System.IO.Pipelines`, because it streams directly over the segments of a `ReadOnlySequence<byte>` instead of allocating a contiguous copy.
