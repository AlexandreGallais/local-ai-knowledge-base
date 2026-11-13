---
title: "ICorDebugInternalFrame2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebuginternalframe2-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugInternalFrame2 Interface

Provides information about internal frames, including stack address and position in relation to ICorDebugFrame objects.

## Methods

|Method|Description|
|------------|-----------------|
|GetFrameAddress Method|Returns the stack address of the internal frame.|
|IsCloserToLeaf Method|Checks whether the `this` internal frame is closer to the leaf than the specified ICorDebugFrame object.|

## Remarks

This interface extends the ICorDebugInternalFrame interface.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
