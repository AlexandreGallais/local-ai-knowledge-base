---
title: "Debug Windows dumps"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/debug-windows-dumps.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Debug Windows dumps

**This article applies to: ✔️** .NET Core 3.1 and later versions

## Analyze dumps on Windows

Windows dumps can be analyzed on Windows with Visual Studio, Windbg, or the `dotnet-dump` CLI tool. Visual Studio and Windbg can access both managed and native code and are the recommended tools for a Windows environment. dotnet-dump can only access managed code.
