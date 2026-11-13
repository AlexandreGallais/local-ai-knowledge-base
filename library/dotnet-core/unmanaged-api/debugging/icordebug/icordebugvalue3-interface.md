---
title: "ICorDebugValue3 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugvalue3-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugValue3 Interface

Extends the "ICorDebugValue" and "ICorDebugValue2" interfaces to provide support for arrays that are larger than 2 GB.

## Methods

|Method|Description|
|------------|-----------------|
|GetSize64 Method|Gets the size, in bytes, of this `ICorDebugValue3` object.|

## Remarks

The ICorDebugValue::GetSize method returns an object size that ranges from 0 to 2,147,483,647 bytes. In .NET Framework 4.5 and later versions, the size of arrays can exceed 2 GB. The `ICorDebugValue3` interface enables you to determine the size of these arrays.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
