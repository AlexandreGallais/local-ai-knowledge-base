---
title: "ICorDebugProcess8 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess8-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess8 Interface

Logically extends the ICorDebugProcess interface to enable or disable certain types of ICorDebugManagedCallback2 exception callbacks.

## Methods

|Method|Description|
|------------|-----------------|
|EnableExceptionCallbacksOutsideOfMyCode Method|Enables or disables certain types of ICorDebugManagedCallback2 exception callbacks.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
