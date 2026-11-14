---
title: "ASPDEPR diagnostics overview"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/diagnostics/aspdepr-ids.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASPDEPR diagnostics overview

ASPDEPR diagnostics are compile-time warnings issued by the .NET compiler when your code uses ASP.NET Core APIs that have been deprecated. Deprecated APIs are still functional but are scheduled for removal in a future release. Addressing these warnings helps keep your code up to date and ensures a smoother upgrade path.

ASPDEPR diagnostics are similar to the `SYSLIB` obsoletions in .NET, but are specific to ASP.NET Core.

> **Note:**
> This article is a work-in-progress. It's not a complete list of deprecation diagnostics.

## ASPDEPR diagnostics

The following table lists the `ASPDEPR` deprecation diagnostics for ASP.NET Core.

| Diagnostic ID                             | Description                 |
|-------------------------------------------|-----------------------------|
| ASPDEPR002 | `WithOpenApi` is deprecated |
