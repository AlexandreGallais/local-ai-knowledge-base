---
title: "Breaking change: SignalR Java Client updated to RxJava3"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/6/signalr-java-client-updated.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# SignalR: Java Client updated to RxJava3

The SignalR Java Client is now RxJava3.

## Version introduced

ASP.NET Core 6.0

## Old behavior

The RxJava package reference in the library was RxJava2.

## New behavior

The RxJava package reference in the library is now RxJava3. For information about what changed in RxJava, see What's different in 3.0.

## Reason for change

The previous dependency (RxJava2) is no longer maintained. Support for RxJava2 ended in February 2021.

## Recommended action

If you were using RxJava2 in your app or library, you might need to update to RxJava3. For more information, see What's different in 3.0.

## Affected APIs

None.
