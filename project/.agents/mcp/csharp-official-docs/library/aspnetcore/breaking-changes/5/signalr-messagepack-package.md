---
title: "Breaking change: SignalR: MessagePack Hub Protocol moved to MessagePack 2.x package"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/5/signalr-messagepack-package.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# SignalR: MessagePack Hub Protocol moved to MessagePack 2.x package

The ASP.NET Core SignalR MessagePack Hub Protocol uses the MessagePack NuGet package for MessagePack serialization. ASP.NET Core 5.0 upgrades the package from 1.x to the latest 2.x package version.

For discussion on this issue, see dotnet/aspnetcore#18692.

## Version introduced

5.0 Preview 1

## Old behavior

ASP.NET Core SignalR used the MessagePack 1.x package to serialize and deserialize MessagePack messages.

## New behavior

ASP.NET Core SignalR uses the MessagePack 2.x package to serialize and deserialize MessagePack messages.

## Reason for change

The latest improvements in the MessagePack 2.x package add useful functionality.

## Recommended action

This breaking change applies when:

* Setting or configuring values on `Microsoft.AspNetCore.SignalR.MessagePackHubProtocolOptions`.
* Using the MessagePack APIs directly and using the ASP.NET Core SignalR MessagePack Hub Protocol in the same project. The newer version will be loaded instead of the previous version.

For migration guidance from the package authors, see Migrating from MessagePack v1.x to MessagePack v2.x. Some aspects of message serialization and deserialization are affected. Specifically, there are behavioral changes to how DateTime values are serialized.

## Affected APIs

`Microsoft.AspNetCore.SignalR.MessagePackHubProtocolOptions`
