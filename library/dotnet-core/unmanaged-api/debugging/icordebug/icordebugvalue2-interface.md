---
title: "ICorDebugValue2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugvalue2-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugValue2 Interface

Extends the "ICorDebugValue" interface to provide support for "ICorDebugType" objects.

## Methods

|Method|Description|
|------------|-----------------|
|GetExactType Method|Gets an interface pointer to an `ICorDebugType` object that represents the `System.Type` of this value.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

- ICorDebugValue3 Interface
