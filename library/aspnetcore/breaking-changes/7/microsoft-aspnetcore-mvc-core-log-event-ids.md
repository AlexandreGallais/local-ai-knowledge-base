---
title: "Breaking change: Event IDs for some Microsoft.AspNetCore.Mvc.Core log messages changed"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/7/microsoft-aspnetcore-mvc-core-log-event-ids.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Event IDs for some Microsoft.AspNetCore.Mvc.Core log messages changed

As part of updating the `Microsoft.AspNetcore.Mvc.Core` assembly to use `Microsoft.Extensions.Logging.LoggerMessageAttribute`, the ASP.NET Core team discovered logger event IDs that were reused within a single log category. Event IDs and names should be unique so that different message types can be identified. These IDs have been updated to ensure that they're unique within a single log category.

## Version introduced

ASP.NET Core 7.0

## Previous behavior

Some logger event IDs within the `Microsoft.AspNetCore.Mvc.Core` assembly were reused within a single log category.

## New behavior

Duplicate logger event IDs within a single log category within the `Microsoft.AspNetCore.Mvc.Core` assembly have been updated.

## Type of breaking change

This change affects binary compatibility.

## Reason for change

Logger event IDs and names should be unique so that different message types can be identified.

## Recommended action

If you have code or configuration that references the old logger event IDs, update those references to use the new IDs.

## Affected APIs

Not detectable via API analysis.
