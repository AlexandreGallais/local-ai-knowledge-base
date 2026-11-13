---
title: "Breaking change: Socket.End methods don't throw ObjectDisposedException"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/networking/7.0/socket-end-closed-sockets.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Socket.End methods don't throw ObjectDisposedException

`System.Net.Sockets.Socket.End*` methods (for example, `System.Net.Sockets.Socket.EndSend*`) throw a `System.Net.Sockets.SocketException` instead of an `System.ObjectDisposedException` if the socket is closed.

## Previous behavior

Previously, the affected methods threw an `System.ObjectDisposedException` for closed sockets.

## New behavior

Starting in .NET 7, the affected methods throw a `System.Net.Sockets.SocketException` with `System.Net.Sockets.SocketException.SocketErrorCode` set to `System.Net.Sockets.SocketError.OperationAborted` for closed sockets.

## Version introduced

.NET 7

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

The asynchronous programming model (APM) APIs are those named `Begin*` and `End*`. Starting with .NET 6, these legacy APIs are backed with a `Task`-based implementation as part of an effort to consolidate and simplify the `Socket` codebase. Unfortunately, with the 6.0 implementation, unexpected events were sometimes raised on `System.Threading.Tasks.TaskScheduler.UnobservedTaskException`. This happened even when the APIs were used correctly, meaning that the calling code always invoked the `End*` methods, including when the socket was closed.

The change to throw a `System.Net.Sockets.SocketException` was made to ensure that no unobserved exceptions are leaked in such cases.

## Recommended action

If your code catches an `System.ObjectDisposedException` from any of the `Socket.End*` methods, change it to catch `System.Net.Sockets.SocketException` and refer to `System.Net.Sockets.SocketException.SocketErrorCode` to query the underlying reason.

> **Note:**
> APM code should always make sure that `End*` methods are invoked after the corresponding `Begin*` methods, even if the socket is closed.

## Affected APIs

- `System.Net.Sockets.Socket.EndConnect(System.IAsyncResult)`
- `System.Net.Sockets.Socket.EndDisconnect(System.IAsyncResult)`
- `System.Net.Sockets.Socket.EndSend*`
- `System.Net.Sockets.Socket.EndSendFile(System.IAsyncResult)`
- `System.Net.Sockets.Socket.EndSendTo(System.IAsyncResult)`
- `System.Net.Sockets.Socket.EndReceive*`
- `System.Net.Sockets.Socket.EndAccept*`
