---
title: ".NET debugger extensions (part 1 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/debugger-extensions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET debugger extensions

The .NET debugger extensions let you view information about code that's running inside the .NET runtime, both on live processes and dumps. The extensions work with Windbg and LLDB. You can use the .NET debugger extensions to:

- Collect information about the managed heap.
- Look for heap corruptions.
- Display internal data types used by the runtime.
- View information about all managed code running inside the runtime.

The .NET debugger extensions include commands from the existing dotnet-sos tool as well as new commands. A limited set of commands are also now supported for the Native AOT runtime.

## Install

### Windows

Install Windbg from the Windows SDK. Windbg versions 10.0.18317.1001 and later automatically load the extensions from the Microsoft extension gallery.

### Linux

To install LLDB and the .NET debugger extensions, see Install and use LLDB on Linux.

## Syntax

Under windbg: `![command] [options]`

Under LLDB: `sos [command] [options]`

Many of the commands have aliases or shortcuts under LLDB: `clrstack [options]`
