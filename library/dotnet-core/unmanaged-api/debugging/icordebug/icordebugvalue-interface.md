---
title: "ICorDebugValue Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugvalue-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugValue Interface

Represents a value in the process being debugged. The value can be a read or a write value.

## Methods

|Method|Description|
|------------|-----------------|
|CreateBreakpoint Method|This method is not currently implemented.|
|GetAddress Method|Gets the address of this `ICorDebugValue` object, which is in the process of being debugged.|
|GetSize Method|Gets the size, in bytes, of this `ICorDebugValue` object.|
|GetType Method|Gets the primitive type of this `ICorDebugValue` object.|

## Remarks

In general, ownership of a value object is passed when it is returned. The recipient is responsible for removing a reference from the object when it is finished with the object.

Depending on where the value was retrieved from, the value may not remain valid after the process is resumed. So, in general, the value shouldn't be held across a call of the ICorDebugController::Continue method.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugValue3 Interface
