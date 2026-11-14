---
title: "ICorDebugFunctionBreakpoint Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugfunctionbreakpoint-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugFunctionBreakpoint Interface

Extends the ICorDebugBreakpoint interface to support breakpoints within functions.

## Methods

|Method|Description|
|------------|-----------------|
|GetFunction Method|Gets an interface pointer to an ICorDebugFunction that references the function in which the breakpoint is set.|
|GetOffset Method|Gets the offset of the breakpoint within the function.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
