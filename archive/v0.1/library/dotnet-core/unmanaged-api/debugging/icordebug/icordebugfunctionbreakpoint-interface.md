---
title: "ICorDebugFunctionBreakpoint Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugfunctionbreakpoint-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
