---
title: ".NET Diagnostic tools overview"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/tools-overview.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET diagnostic tools

.NET supports a number of tools that can be used to diagnose your applications.

## IDEs and editors

### Visual Studio

Visual Studio is the most comprehensive IDE for .NET developers on Windows. It includes debugging and performance profiling tools to aid .NET developers in diagnosing their applications.

### Visual Studio Code

Visual Studio Code is a lightweight but powerful source code editor that runs on your desktop and is available for Windows, macOS, and Linux. It supports local and remote debugging for .NET.

## CLI tools

### dotnet-counters

dotnet-counters is a performance monitoring tool for first-level health monitoring and performance investigation. It observes performance counter values published via the `System.Diagnostics.Tracing.EventCounter` API. For example, you can quickly monitor things like the CPU usage or the rate of exceptions being thrown in your .NET Core application.

### dotnet-dump

The dotnet-dump tool is a way to collect and analyze Windows and Linux core dumps without a native debugger.

### dotnet-gcdump

The dotnet-gcdump tool is a way to collect garbage collector (GC) dumps of live .NET processes.

### dotnet-monitor

The dotnet-monitor tool is a way to monitor .NET applications in production environments and to collect diagnostic artifacts (for example, dumps, traces, logs, and metrics) on-demand or using automated rules for collecting under specified conditions.

### dotnet-trace

.NET Core includes `EventPipe`, which exposes diagnostics data. The dotnet-trace tool allows you to consume interesting profiling data from your app that can help in scenarios where you need to root-cause apps running that are running slowly.

### dotnet-stack

The dotnet-stack tool allows you to quickly print the managed stacks for all threads in a running .NET process.

### dotnet-symbol

dotnet-symbol downloads files (for example, symbols, DAC/DBI, and host files) needed to open a core dump or minidump. Use this tool if you need symbols and modules to debug a dump file captured on a different machine.

### dotnet-debugger-extensions

dotnet-debugger-extensions installs the .NET debugger extensions on Linux, macOS, and Windows.  LLDB is required for Linux and macOS, and  Windbg/cdb is needed for Windows.

## Other tools

### PerfCollect

PerfCollect is a bash script you can use to collect traces with `perf` and `LTTng` for a more in-depth performance analysis of .NET apps running on Linux distributions.
