---
title: "ICorDebugModuleDebugEvent Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmoduledebugevent-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugModuleDebugEvent Interface

Extends the ICorDebugDebugEvent interface to support module-level events.

## Methods

|Method|Description|
|------------|-----------------|
|GetModule Method|Gets the merged module that was just loaded or unloaded.|

## Remarks

The MODULE_LOADED and MODULE_UNLOADED event types implement this interface.

> **Note:**
> The interface is available with .NET Native only. Attempting to call `QueryInterface` to retrieve an interface pointer returns `E_NOINTERFACE` for ICorDebug scenarios outside of .NET Native.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
