---
title: "ICorDebugILFrame4 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugilframe4-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugILFrame4 Interface

Provides methods that allow you to access the local variables and code in a stack frame of intermediate language (IL) code. A parameter specifies whether the debugger has access to variables and code added in profiler ReJIT instrumentation.

## Methods

|Method|Description|
|------------|-----------------|
|EnumerateLocalVariablesEx Method|Returns a list of the local variables available in the current frame.|
|GetCodeEx Method|Returns the code that this stack frame is running.|
|GetLocalVariableEx Method|Returns the value of a local variable in the IL frame.|

## Remarks

These methods offer functionality in addition to that provided by the EnumerateLocalVariables, GetCode, and GetLocalVariable methods. Each method includes a `flags` parameter that specifies whether additional local variables or code defined by a profiler's ReJIT request are visible.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2
