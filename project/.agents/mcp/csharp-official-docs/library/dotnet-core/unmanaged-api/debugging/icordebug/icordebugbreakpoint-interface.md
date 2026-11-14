---
title: "ICorDebugBreakpoint Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugbreakpoint-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugBreakpoint Interface

Represents a breakpoint in a function, or a watch point on a value.

## Methods

|Method|Description|
|------------|-----------------|
|Activate Method|Sets the active state of this `ICorDebugBreakpoint`.|
|IsActive Method|Gets a value that indicates whether this `ICorDebugBreakpoint` is active.|

## Remarks

Breakpoints do not directly support conditional expressions. If such functionality is desired, a debugger must implement it on top of `ICorDebugBreakpoint`.

The ICorDebugFunctionBreakpoint interface extends `ICorDebugBreakpoint` to support breakpoints within functions.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
