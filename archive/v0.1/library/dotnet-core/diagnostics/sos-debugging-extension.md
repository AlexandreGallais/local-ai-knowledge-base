---
title: "SOS debugging extension for .NET (part 1 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/sos-debugging-extension.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# SOS debugging extension

The SOS debugging extension lets you view information about code that's running inside the .NET runtime, both on live processes and dumps. The extension is preinstalled with dotnet-dump and Windbg/dbg, and can be downloaded for use with LLDB. You can use the SOS debugging extension to:

- Collect information about the managed heap.
- Look for heap corruptions.
- Display internal data types used by the runtime.
- View information about all managed code running inside the runtime.

## Syntax

On Windows: `![command] [options]`

On Linux and macOS: `sos [command] [options]`

Many of the commands have aliases or shortcuts under lldb: `clrstack [options]`
