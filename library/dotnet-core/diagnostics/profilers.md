---
title: "Profiling tools in .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/profilers.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET profiling tools

Profilers allow you to analyze your program's performance. By analyzing data on memory usage, CPU usage, call stacks and other information, you can better understand the performance profile of your program.

Microsoft provides a profiler with Visual Studio and through the dotnet-trace tool.

## Visual Studio profiler

**Visual Studio** is an integrated development environment and an excellent choice for developers working on Windows.

- Measure app performance in Visual Studio

## dotnet-trace

`dotnet-trace` is a cross-platform command-line tool that collects diagnostic traces on Windows, Linux, and Mac. You can view these traces in Visual Studio or PerfView.
