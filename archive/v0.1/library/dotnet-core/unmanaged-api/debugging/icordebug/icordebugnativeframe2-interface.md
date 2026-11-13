---
title: "ICorDebugNativeFrame2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugnativeframe2-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugNativeFrame2 Interface

Provides methods that test for child and parent frame relationships.

## Methods

|Method|Description|
|------------|-----------------|
|IsChild Method|Determines whether the current frame is a child frame.|
|IsMatchingParentFrame Method|Determines whether the specified frame is the parent of the current frame.|
|GetStackParameterSize Method|Returns the cumulative size of the parameters on the stack on x86 operating systems.|

## Remarks

This interface logically extends the "ICorDebugNativeFrame" interface.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
