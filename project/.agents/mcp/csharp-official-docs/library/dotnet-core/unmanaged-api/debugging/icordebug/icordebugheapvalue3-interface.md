---
title: "ICorDebugHeapValue3 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugheapvalue3-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugHeapValue3 Interface

Exposes the monitor lock properties of objects. This interface extends the ICorDebugHeapValue and ICorDebugHeapValue2 interfaces.

## Methods

|Method|Description|
|------------|-----------------|
|GetThreadOwningMonitorLock Method|Returns the managed thread that owns the monitor lock on this object.|
|GetMonitorEventWaitList Method|Provides an ordered list of threads that are queued on the event that is associated with a monitor lock.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
