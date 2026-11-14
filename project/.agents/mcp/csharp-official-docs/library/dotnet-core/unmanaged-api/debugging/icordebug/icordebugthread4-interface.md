---
title: "ICorDebugThread4 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread4-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugThread4 Interface

Provides thread blocking information.

## Methods

|Method|Description|
|------------|-----------------|
|GetBlockingObjects Method|Provides an ordered enumeration of CorDebugBlockingObject structures that provide thread blocking information.|
|HadUnhandledException Method|Indicates whether the thread has ever had an unhandled exception.|
|GetCurrentCustomDebuggerNotification Method|Gets the current ICorDebugManagedCallback3::CustomNotification object on the current thread.|

## Remarks

This interface is a logical extension of the ICorDebugThread, ICorDebugThread2, and ICorDebugThread3 interfaces.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
