---
title: "Breaking change: Kestrel: Log message attributes changed"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/6/kestrel-log-message-attributes-changed.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Kestrel: Log message attributes changed

Kestrel log messages have associated IDs and names. These attributes uniquely identify different kinds of log messages. Some of those IDs and names were incorrectly duplicated. This duplication problem is fixed in ASP.NET Core 6.0.

## Version introduced

ASP.NET Core 6.0

## Old behavior

The following table shows the state of the affected log messages before ASP.NET Core 6.0.

| Message description                   | Name                    | ID |
|---------------------------------------|-------------------------|----|
| HTTP/2 connection closed log messages | `Http2ConnectionClosed` | 36 |
| HTTP/2 frame sending log messages     | `Http2FrameReceived`    | 37 |

## New behavior

The following table shows the state of the affected log messages in ASP.NET Core 6.0.

| Message description                   | Name                    | ID |
|---------------------------------------|-------------------------|----|
| HTTP/2 connection closed log messages | `Http2ConnectionClosed` | 48 |
| HTTP/2 frame sending log messages     | `Http2FrameSending`     | 49 |

## Reason for change

Log IDs and names should be unique so different message types can be identified.

## Recommended action

If you have code or configuration that references the old IDs and names, update those references to use the new IDs and names.
