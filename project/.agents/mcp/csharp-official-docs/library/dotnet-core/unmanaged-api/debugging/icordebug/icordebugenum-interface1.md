---
title: "ICorDebugEnum Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugenum-interface1.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugEnum Interface

Serves as the abstract base interface for the enumerators that are used by a debugging application.

## Methods

| Method                                              | Description                                           |
|-----------------------------------------------------|-------------------------------------------------------|
| Clone Method       | Creates a copy of this `ICorDebugEnum` object.        |
| GetCount Method | Gets the number of items in the enumeration.          |
| Reset Method       | Moves the cursor to the beginning of the enumeration. |
| Skip Method         | Moves the cursor forward in the enumeration by the specified number of items. |

## Remarks

The following enumerators derive from `ICorDebugEnum`:

- `ICorDebugAppDomainEnum`
- `ICorDebugAssemblyEnum`
- ICorDebugBlockingObjectEnum
- `ICorDebugBreakpointEnum`
- `ICorDebugChainEnum`
- `ICorDebugCodeEnum`
- `ICorDebugErrorInfoEnum`
- ICorDebugExceptionObjectCallStackEnum
- `ICorDebugFrameEnum`
- ICorDebugGCReferenceEnum
- ICorDebugGuidToTypeEnum
- ICorDebugHeapEnum
- ICorDebugHeapSegmentEnum
- `ICorDebugModuleEnum`
- `ICorDebugObjectEnum`
- `ICorDebugProcessEnum`
- `ICorDebugStepperEnum`
- `ICorDebugThreadEnum`
- `ICorDebugTypeEnum`
- `ICorDebugValueEnum`
- ICorDebugVariableHomeEnum

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
