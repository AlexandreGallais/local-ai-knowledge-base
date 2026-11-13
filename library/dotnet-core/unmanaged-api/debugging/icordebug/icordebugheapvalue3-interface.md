---
title: "ICorDebugHeapValue3 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugheapvalue3-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
