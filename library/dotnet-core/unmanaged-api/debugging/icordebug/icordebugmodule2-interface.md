---
title: "ICorDebugModule2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule2-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugModule2 Interface

Serves as a logical extension to the ICorDebugModule interface.

## Methods

|Method|Description|
|------------|-----------------|
|ApplyChanges Method|Applies the changes in the metadata and the changes in the common intermediate language (CIL) code to the running process.|
|GetJITCompilerFlags Method|Gets the flags that control the just-in-time (JIT) compilation for this `ICorDebugModule2`.|
|ResolveAssembly Method|Resolves the assembly referenced by the specified metadata token.|
|SetJITCompilerFlags Method|Sets the flags that control the JIT compilation for this `ICorDebugModule2`.|
|SetJMCStatus Method|Sets the Just My Code (JMC) status of all methods of all the classes in this `ICorDebugModule2` to the specified value, except those in the `pTokens` array, which it sets to the opposite value.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
