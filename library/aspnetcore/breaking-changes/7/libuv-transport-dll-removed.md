---
title: "Breaking change: Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv and libuv.dll removed"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/7/libuv-transport-dll-removed.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv and libuv.dll removed

Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv and libuv.dll have been removed.

## Version introduced

ASP.NET Core 7.0

## Previous behavior

Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv was obsoleted in ASP.NET Core 5.0. Its functionality was replaced by the Sockets transport.

## New behavior

Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv and its libuv.dll dependency have been removed.

## Type of breaking change

This change affects binary compatibility and source compatibility.

## Reason for change

To eliminate ongoing maintenance costs associated with this obsolete component.

## Recommended action

Remove project references to Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv. Remove code from *Program.cs* that calls `UseLibuv`. The Sockets transport will be used by default.

## Affected APIs

* `Microsoft.AspNetCore.Hosting.WebHostBuilderLibuvExtensions.UseLibuv*`
* `Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv.LibuvTransportOptions`
