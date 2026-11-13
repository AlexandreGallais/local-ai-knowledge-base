---
title: "unsupported-culture-log-level"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/localization/unsupported-culture-log-level.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# unsupported-culture-log-level

> **Note:**
> Prior to ASP.NET Core 3.0 web apps write one log of type `LogLevel.Warning` per request if the requested culture is unsupported. Logging one `LogLevel.Warning` per request can make large log files with redundant information. This behavior has been changed in ASP.NET Core 3.0. The `RequestLocalizationMiddleware` writes a log of type `LogLevel.Debug`, which reduces the size of production logs.
