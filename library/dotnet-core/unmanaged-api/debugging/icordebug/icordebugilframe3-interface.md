---
title: "ICorDebugILFrame3 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugilframe3-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugILFrame3 Interface

Provides a method that encapsulates the return value of a function. `ICorDebugILFrame3` is a logical extension of the ICorDebugILFrame and ICorDebugILFrame2 interfaces.

## Methods

|Method|Description|
|------------|-----------------|
|GetReturnValueForILOffset Method|Gets an ICorDebugValue object that encapsulates the return value of a function.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.1

## See also

- ICorDebugCode3 Interface
