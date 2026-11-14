---
title: "ICorDebugNativeFrame2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugnativeframe2-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
