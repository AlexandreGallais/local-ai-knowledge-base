---
title: "ICorDebugStackWalk Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugstackwalk-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugStackWalk Interface

Provides methods for getting the managed methods, or frames, on a thread’s stack.

## Methods

|Method|Description|
|------------|-----------------|
|GetContext Method|Returns the context for the current frame in the `ICorDebugStackWalk` object.|
|SetContext Method|Sets the `ICorDebugStackWalk` object’s current context to a valid context for the thread.|
|Next Method|Moves the `ICorDebugStackWalk` object to the next frame.|
|GetFrame Method|Gets the current frame in the `ICorDebugStackWalk` object.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
