---
title: "ICorDebugBlockingObjectEnum Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugblockingobjectenum-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugBlockingObjectEnum Interface

Provides an enumerator for a list of CorDebugBlockingObject structures. This interface is a subclass of the ICorDebugEnum interface.

## Methods

|Method|Description|
|------------|-----------------|
|Next Method|Enumerates through a list of CorDebugBlockingObject structures.|

## Remarks

Each `CorDebugBlockingObject` structure represents an object that is blocking a thread.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
