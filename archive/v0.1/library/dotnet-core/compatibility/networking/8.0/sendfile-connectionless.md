---
title: "Breaking change: SendFile throws NotSupportedException for connectionless sockets"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/networking/8.0/sendfile-connectionless.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# SendFile throws NotSupportedException for connectionless sockets

The behavior of the `System.Net.Sockets.Socket.SendFile*` method family for connectionless (for example, UDP) sockets is now consistent across all platforms. The affected methods now throw a `System.NotSupportedException` on all platforms.

## Previous behavior

Previously, for a connectionless `System.Net.Sockets.Socket` (for example, UDP), the following behaviors were observed:

- `System.Net.Sockets.Socket.SendFile*` threw a `System.NotSupportedException` on Windows, but not on Unix-like platforms.
- The `System.Threading.Tasks.ValueTask` returned from `System.Net.Sockets.Socket.SendFileAsync*` stored a `System.Net.Sockets.SocketException` on all platforms.
- Calling `System.Net.Sockets.Socket.EndSendFile*` on an `System.IAsyncResult` returned from `System.Net.Sockets.Socket.BeginSendFile*` threw a `System.Net.Sockets.SocketException` on all platforms.

## New behavior

Starting in .NET 8, for a connectionless `System.Net.Sockets.Socket` (for example, UDP), the following behaviors are observed:

- `System.Net.Sockets.Socket.SendFile*` throws a `System.NotSupportedException` on all platforms.
- The `System.Threading.Tasks.ValueTask` returned from `System.Net.Sockets.Socket.SendFileAsync*` stores a `System.NotSupportedException` on all platforms.
- Calling `System.Net.Sockets.Socket.EndSendFile*` on an `System.IAsyncResult` returned from `System.Net.Sockets.Socket.BeginSendFile*` throws a `System.NotSupportedException` on all platforms.

## Version introduced

.NET 8 RC 1

## Type of breaking change

This change is a behavioral change.

## Reason for change

Given that `SendFile` is typically used with large amounts of data, it doesn't make sense to use it with connectionless sockets. In addition, the previous behavior was inconsistent, throwing `SocketException` on some platforms, while succeeding on others with an unpredictable outcome.

## Recommended action

Do not use `SendFile` methods for connectionless sockets.

## Affected APIs

- `System.Net.Sockets.Socket.SendFile*`
- `System.Net.Sockets.Socket.SendFileAsync*`
- `System.Net.Sockets.Socket.EndSendFile*`
