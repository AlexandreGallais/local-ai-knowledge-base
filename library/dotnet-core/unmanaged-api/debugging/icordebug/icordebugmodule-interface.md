---
title: "ICorDebugModule Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugModule Interface

Represents a common language runtime (CLR) module, which is either an executable file or a dynamic-link library (DLL).

## Methods

|Method|Description|
|------------|-----------------|
|CreateBreakpoint Method|Not implemented.|
|EnableClassLoadCallbacks Method|Determines whether the ICorDebugManagedCallback::LoadClass and ICorDebugManagedCallback::UnloadClass callbacks are called for this module.|
|EnableJITDebugging Method|Determines whether the just-in-time (JIT) compiler preserves debugging information for methods within this module.|
|GetAssembly Method|Gets the containing assembly for this module.|
|GetBaseAddress Method|Gets the base address of the module.|
|GetClassFromToken <example-value>|Gets the ICorDebugClass from the metadata.|
|GetEditAndContinueSnapshot Method|Deprecated.|
|GetFunctionFromRVA Method|Not implemented.|
|GetFunctionFromToken <example-value>|Gets the function that is specified by the metadata token.|
|GetGlobalVariableValue Method|Gets a value object for the specified global variable.|
|GetMetaDataInterface Method|Gets a metadata interface pointer that can be used to examine the metadata for the module.|
|GetName Method|Gets the file name of the module.|
|GetProcess Method|Gets the containing process for this module.|
|GetSize Method|Gets the size of the module in bytes.|
|GetToken <example-value>|Gets the token for the table entry for this module.|
|IsDynamic Method|Indicates whether the module is dynamic.|
|IsInMemory Method|Indicates whether this module exists only in memory.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebug Interface
