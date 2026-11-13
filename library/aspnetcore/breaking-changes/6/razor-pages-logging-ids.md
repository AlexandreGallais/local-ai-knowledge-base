---
title: "Breaking change: Razor: Logging ID changes"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/6/razor-pages-logging-ids.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Razor: Logging ID changes

Razor Pages log messages have associated IDs and names. These are used to uniquely identify different kinds of log messages. Some of those IDs were incorrectly duplicated. This .NET 6 change corrects the duplication.

## Version introduced

ASP.NET Core 6.0 RC1

## Old and new behavior

| Event name | Previous event ID | New event ID |
| - | - |
| `ExecutedHandlerMethod` | 102 | 108 |
| `ExecutingImplicitHandlerMethod` | 103 | 107 |
| `ExecutedImplicitHandlerMethod` | 104 | 109 |
| `NotMostEffectiveFilter` | 1 | 4 |

## Change category

This change affects *binary compatibility*.

## Reason for change

Log IDs should be unique so different message types can be identified.

## Recommended action

If you have code or configuration that references the old IDs, update those references to use the new IDs.

## Affected APIs

N/A.
