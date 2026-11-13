---
title: "ICorDebugLoadedModule Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugloadedmodule-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugLoadedModule Interface

Provides information about a loaded module.

## Methods

|Method|Description|
|------------|-----------------|
|GetBaseAddress Method|Gets the base address of the loaded module.|
|GetName Method|Gets the name of the loaded module.|
|GetSize Method|Gets the size in bytes of the loaded module.|

## Remarks

The `ICorDebugLoadedModule` interface is implemented by a debugger and is used by the CLR debugging interfaces to get information about the loaded module from the debugger.

> **Note:**
> This interface is available with .NET Native only. If you implement this interface for ICorDebug scenarios outside of .NET Native, the common language runtime will ignore this interface.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
