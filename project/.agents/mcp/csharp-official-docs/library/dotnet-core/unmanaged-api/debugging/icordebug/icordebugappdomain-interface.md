---
title: "ICorDebugAppDomain Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain Interface

Provides methods for debugging application domains. This interface is a subclass of ICorDebugController.

## Methods

|Method|Description|
|------------|-----------------|
|Attach Method|Attaches the debugger to the application domain.|
|EnumerateAssemblies Method|Gets an enumerator for the assemblies in the application domain.|
|EnumerateBreakpoints Method|Gets an enumerator for all active breakpoints in the application domain.|
|EnumerateSteppers Method|Gets an enumerator for all active steppers in the application domain.|
|GetId Method|Gets the unique ID of the application domain.|
|GetModuleFromMetaDataInterface Method|Gets the ICorDebugModule object with the given metadata interface.|
|GetName Method|Gets the name of the application domain.|
|GetObject Method|Gets an interface pointer to the common language runtime (CLR) application domain.|
|GetProcess Method|Gets the process containing the application domain.|
|IsAttached Method|Determines whether the debugger is attached to the application domain.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
