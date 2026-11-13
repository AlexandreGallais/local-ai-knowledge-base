---
title: "ICorDebugClass2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugclass2-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugClass2 Interface

Represents a generic class or a class with a method parameter of type `System.Type`. This interface extends ICorDebugClass.

## Methods

|Method|Description|
|------------|-----------------|
|GetParameterizedType Method|Gets the type declaration for this class.|
|SetJMCStatus Method|For each method of this class, sets a value that indicates whether the method is user-defined code.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- ICorDebugClass Interface
