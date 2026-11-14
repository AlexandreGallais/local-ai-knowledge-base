---
title: "Debug Windows dumps"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/debug-windows-dumps.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Debug Windows dumps

**This article applies to: ✔️** .NET Core 3.1 and later versions

## Analyze dumps on Windows

Windows dumps can be analyzed on Windows with Visual Studio, Windbg, or the `dotnet-dump` CLI tool. Visual Studio and Windbg can access both managed and native code and are the recommended tools for a Windows environment. dotnet-dump can only access managed code.
