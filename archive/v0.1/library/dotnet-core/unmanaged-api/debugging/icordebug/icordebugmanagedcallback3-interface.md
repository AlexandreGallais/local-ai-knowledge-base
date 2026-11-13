---
title: "ICorDebugManagedCallback3 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback3-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback3 Interface

Provides a callback method that indicates that an enabled custom debugger notification has been raised.

## Methods

|Method|Description|
|------------|-----------------|
|CustomNotification Method|Indicates that an enabled custom debugger notification has been raised.|

## Remarks

This interface is a logical extension of the ICorDebugManagedCallback and ICorDebugManagedCallback2 interfaces.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugManagedCallback Interface
- ICorDebugManagedCallback2 Interface
