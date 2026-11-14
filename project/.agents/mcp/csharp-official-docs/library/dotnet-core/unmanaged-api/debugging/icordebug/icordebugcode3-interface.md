---
title: "ICorDebugCode3 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugcode3-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugCode3 Interface

Provides a method that extends "ICorDebugCode" and "ICorDebugCode2" to provide information about a managed return value.

## Methods

|Method|Description|
|------------|-----------------|
|GetReturnValueLiveOffset Method|For a specified IL offset, gets the native offsets where a breakpoint should be placed so that the debugger can obtain the return value from a function.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.1

## See also

- ICorDebugILFrame3 Interface
