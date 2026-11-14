---
title: "Breaking change: Kestrel: Libuv transport marked as obsolete"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/5/kestrel-libuv-transport-obsolete.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Kestrel: Libuv transport marked as obsolete

Earlier versions of ASP.NET Core used Libuv as an implementation detail of how asynchronous input and output was performed. In ASP.NET Core 2.0, an alternative, `System.Net.Sockets.Socket`-based transport was developed. In ASP.NET Core 2.1, Kestrel switched to using the `Socket`-based transport by default. Libuv support was maintained for compatibility reasons.

At this point, use of the `Socket`-based transport is far more common than the Libuv transport. Consequently, Libuv support is marked as obsolete in .NET 5 and will be removed entirely in .NET 6.0.

As part of this change, Libuv support for new operating system platforms (like Windows Arm64) won't be added in the .NET 5 timeframe.

For discussion on blocking issues that require the use of the Libuv transport, see the GitHub issue at dotnet/aspnetcore#23409.

## Version introduced

5.0 Preview 8

## Old behavior

The Libuv APIs aren't marked as obsolete.

## New behavior

The Libuv APIs are marked as obsolete.

## Reason for change

The `Socket`-based transport is the default. There aren't any compelling reasons to continue using the Libuv transport.

## Recommended action

Discontinue use of the Libuv package and extension methods.

## Affected APIs

- WebHostBuilderLibuvExtensions
- WebHostBuilderLibuvExtensions.UseLibuv
- Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv.LibuvTransportOptions
- Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv.LibuvTransportOptions.ThreadCount
- Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv.LibuvTransportOptions.NoDelay
- Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv.LibuvTransportOptions.MaxWriteBufferSize
- Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv.LibuvTransportOptions.MaxReadBufferSize
- `Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv.LibuvTransportOptions.Backlog`
