---
title: "Profiling tools in .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/profilers.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
