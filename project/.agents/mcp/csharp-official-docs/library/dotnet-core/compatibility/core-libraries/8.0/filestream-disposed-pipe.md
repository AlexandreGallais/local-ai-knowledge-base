---
title: ".NET 8 breaking change: FileStream writes when pipe is closed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/8.0/filestream-disposed-pipe.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# FileStream writes when pipe is closed

`System.IO.FileStream` error handling on Windows has been updated to be consistent with `System.IO.Pipes.NamedPipeServerStream`, `System.IO.Pipes.NamedPipeClientStream`, `System.IO.Pipes.AnonymousPipeServerStream`, and `System.IO.Pipes.AnonymousPipeClientStream`.

## Previous behavior

Previously, when writing to a `System.IO.FileStream` that represented a closed or disconnected pipe, the underlying operating system error was ignored and the write was reported as successful. However, nothing was written to the pipe.

## New behavior

Starting in .NET 8, when writing to a `System.IO.FileStream` whose underlying pipe is closed or disconnected, the write fails and an `System.IO.IOException` is thrown.

## Version introduced

.NET 8 Preview 1

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was made to unify the handling of edge cases and avoid silent errors that are difficult to diagnose.

## Recommended action

Close or disconnect the pipe after everything has been written.

## Affected APIs

- `System.IO.FileStream.WriteByte(System.Byte)`
- `System.IO.FileStream.Write*`
- `System.IO.FileStream.WriteAsync*`
