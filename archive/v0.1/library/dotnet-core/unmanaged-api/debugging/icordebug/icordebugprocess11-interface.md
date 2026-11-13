---
title: "ICorDebugProcess11 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess11-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess11 Interface

[Supported in .NET 8 through .NET 10.]

Deprecated. Provides a method that enumerates ranges of native memory that are used by the .NET runtime to store internal data structures that describe .NET types and methods. The returned information is the same information that would be shown by using the SOS `eeheap -loader` command.

## Methods

|Method|Description|
|------------|-----------------|
|EnumerateLoaderHeapMemoryRegions Method|Deprecated. Enumerates ranges of native memory that are used by the .NET runtime to store internal data structures that describe .NET types and methods. The information returned is the same information that would be shown by using the SOS `eeheap -loader` command. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET Versions:** Available since .NET Core 5.0
