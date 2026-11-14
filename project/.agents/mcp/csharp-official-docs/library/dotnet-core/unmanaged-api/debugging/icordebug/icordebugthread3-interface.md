---
title: "ICorDebugThread3 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread3-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugThread3 Interface

Provides the entry point to the ICorDebugStackWalk and corresponding interfaces.

## Methods

|Method|Description|
|------------|-----------------|
|CreateStackWalk Method|Creates an ICorDebugStackWalk object for the thread whose stack you want to unwind.|
|GetActiveInternalFrames Method|Returns an array of internal frames (ICorDebugInternalFrame2 objects) on the stack.|

## Remarks

 `ICorDebugThread3` is a logical extension to the ICorDebugThread interface.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
