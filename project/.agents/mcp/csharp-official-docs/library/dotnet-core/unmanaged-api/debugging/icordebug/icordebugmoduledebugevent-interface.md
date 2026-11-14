---
title: "ICorDebugModuleDebugEvent Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmoduledebugevent-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
