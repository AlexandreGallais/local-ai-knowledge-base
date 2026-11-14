---
title: "Breaking change: SafeFileHandle.IsAsync and FileStream.IsAsync accurately reflect non-blocking state on Unix"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/11/safefilehandle-isasync-unix.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# SafeFileHandle.IsAsync and FileStream.IsAsync accurately reflect non-blocking state on Unix

On Unix, `Microsoft.Win32.SafeHandles.SafeFileHandle.IsAsync` and `System.IO.FileStream.IsAsync` now accurately reflect whether the underlying file descriptor has the `O_NONBLOCK` flag set. Previously, `IsAsync` unconditionally returned `true` for regular files opened with `System.IO.FileOptions.Asynchronous`, even though regular file I/O on Unix is inherently synchronous at the kernel level.

## Version introduced

.NET 11

## Previous behavior

Previously, `SafeFileHandle.IsAsync` on Unix returned `true` for regular files opened with `FileOptions.Asynchronous`, even though no `O_NONBLOCK` flag was set on the file descriptor (regular file I/O on Unix is inherently synchronous). For file descriptors that were genuinely non-blocking, `IsAsync` incorrectly returned `false` on Unix.

```csharp
using Microsoft.Win32.SafeHandles;

// On Unix, IsAsync was true for regular files opened with FileOptions.Asynchronous,
// even though the file descriptor had no O_NONBLOCK set.
using SafeFileHandle handle = File.OpenHandle("myfile.txt", options: FileOptions.Asynchronous);
Console.WriteLine(handle.IsAsync); // true (misleading; no O_NONBLOCK on regular file)
```

On non-Windows platforms, constructing a `SendPacketsElement` with a non-async `FileStream` threw an `ArgumentException`.

## New behavior

Starting in .NET 11, `SafeFileHandle.IsAsync` on Unix returns `true` only when the underlying file descriptor has the `O_NONBLOCK` flag set, which is possible for pipes and sockets. For regular files, it returns `false`.

```csharp
using Microsoft.Win32.SafeHandles;

// On Unix, IsAsync now reflects the actual
// non-blocking state of the file descriptor.
SafeFileHandle.CreateAnonymousPipe(
    out SafeFileHandle readHandle,
    out SafeFileHandle writeHandle,
    asyncRead: true,
    asyncWrite: false);

Console.WriteLine(readHandle.IsAsync);  // true  (O_NONBLOCK set on read end)
Console.WriteLine(writeHandle.IsAsync); // false (blocking write end)
```

For regular files opened with `FileOptions.Asynchronous`, `IsAsync` correctly returns `false` on Unix because regular file I/O is inherently synchronous at the kernel level.

Additionally, on non-Windows platforms, constructing a `SendPacketsElement` with a `FileStream` no longer throws `ArgumentException`, regardless of whether the stream is async.

## Type of breaking change

This change is a behavioral change.

## Reason for change

The previous behavior was incorrect and misleading. `SafeFileHandle.IsAsync` reported `false` for file descriptors (such as pipes or sockets) that genuinely had `O_NONBLOCK` set. This caused APIs and user code that relied on this property to make incorrect decisions. Accurate `IsAsync` reporting was also a prerequisite for the new `SafeFileHandle.CreateAnonymousPipe` API to correctly expose per-end async semantics on Unix. For more information, see dotnet/runtime#125220.

## Recommended action

Review any code that checks `SafeFileHandle.IsAsync` or `FileStream.IsAsync` on Unix and takes action based on the result:

- If your code assumed `IsAsync` was always `true` on Unix for files opened with `FileOptions.Asynchronous`, update it to account for the fact that regular file handles now return `false`.

- If you wrap a non-blocking `SafeFileHandle` in a `FileStream` (for example, one created via `SafeFileHandle.CreateAnonymousPipe` with `asyncRead: true` or `asyncWrite: true`), `FileStream.IsAsync` might now return `true` where it previously returned `false`. Adjust downstream code accordingly.

- If you construct `SendPacketsElement` with a `FileStream` on a non-Windows platform and previously expected an `ArgumentException` to be thrown for non-async streams, note that the exception is no longer thrown. Guard any such expectation with `OperatingSystem.IsWindows()`.

## Affected APIs

- `Microsoft.Win32.SafeHandles.SafeFileHandle.IsAsync`
- `System.IO.FileStream.IsAsync`
- `System.Net.Sockets.SendPacketsElement.#ctor(System.IO.FileStream,System.Int64,System.Int32)`
- `System.Net.Sockets.SendPacketsElement.#ctor(System.IO.FileStream,System.Int64,System.Int32,System.Boolean)`
