---
title: "Breaking change: Socket.LocalEndPoint is updated after calling SendToAsync"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/networking/5.0/localendpoint-updated-on-sendtoasync.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Socket.LocalEndPoint is updated after calling SendToAsync

`System.Net.Sockets.Socket.SendToAsync(System.Net.Sockets.SocketAsyncEventArgs)` now updates the value of the `System.Net.Sockets.Socket.LocalEndPoint` property to the socket's local address.

## Version introduced

5.0

## Change description

In previous .NET versions, `System.Net.Sockets.Socket.SendToAsync(System.Net.Sockets.SocketAsyncEventArgs)` does not alter the value of the `System.Net.Sockets.Socket.LocalEndPoint` property on the socket instance. Starting in .NET 5, when `System.Net.Sockets.Socket.SendToAsync(System.Net.Sockets.SocketAsyncEventArgs)` successfully completes, the value of `System.Net.Sockets.Socket.LocalEndPoint` is the implicitly bound socket's local address. This new behavior is consistent with the behavior of `System.Net.Sockets.Socket.SendTo(System.Byte[],System.Net.EndPoint)` and `System.Net.Sockets.Socket.BeginSendTo(System.Byte[],System.Int32,System.Int32,System.Net.Sockets.SocketFlags,System.Net.EndPoint,System.AsyncCallback,System.Object)`/`System.Net.Sockets.Socket.EndSendTo(System.IAsyncResult)`.

## Reason for change

This change fixes a bug and makes the behavior consistent across `SendTo` variants.

## Recommended action

Alter any code that assumes that `System.Net.Sockets.Socket.SendToAsync(System.Net.Sockets.SocketAsyncEventArgs)` won't alter the value of `System.Net.Sockets.Socket.LocalEndPoint`.

## Affected APIs

- `System.Net.Sockets.Socket.SendToAsync(System.Net.Sockets.SocketAsyncEventArgs)`
