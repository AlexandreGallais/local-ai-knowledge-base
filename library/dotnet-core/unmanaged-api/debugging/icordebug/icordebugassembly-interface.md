---
title: "ICorDebugAssembly Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugassembly-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugAssembly Interface

Represents an assembly.

## Methods

|Method|Description|
|------------|-----------------|
|EnumerateModules Method|Gets an enumerator for the modules contained in the assembly.|
|GetAppDomain Method|Gets an interface pointer to the application domain that contains this `ICorDebugAssembly` instance.|
|GetCodeBase Method|Not implemented.|
|GetName Method|Gets the name of the assembly.|
|GetProcess Method|Gets the ICorDebugProcess instance in which the assembly is running.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
