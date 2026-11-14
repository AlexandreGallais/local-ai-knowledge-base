---
title: "ICorDebugVariableHomeEnum Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablehomeenum-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugVariableHomeEnum Interface

Provides an enumerator to the local variables and arguments in a function.

## Methods

|Method|Description|
|------------|-----------------|
|Next Method|Gets the specified number of ICorDebugVariableHome instances that contain information about the local variables and arguments in a function.|

## Remarks

The `ICorDebugVariableHomeEnum` interface implements the ICorDebugEnum interface.

An `ICorDebugVariableHomeEnum` instance is populated with ICorDebugVariableHome instances by calling the ICorDebugCode4::EnumerateVariableHomes method. Each ICorDebugVariableHome instance in the collection represents a local variable or argument in a function. The  ICorDebugVariableHome objects in the collection can be enumerated by calling the ICorDebugVariableHomeEnum::Next method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6.2

## See also

- ICorDebugVariableHome Interface
