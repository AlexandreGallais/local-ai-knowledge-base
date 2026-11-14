---
title: "ICorDebugModule::IsInMemory Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-isinmemory-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugModule::IsInMemory Method

Gets a value that indicates whether this module exists only in memory.

## Syntax

```cpp
HRESULT IsInMemory(
    [out] BOOL *pInMemory
);
```

## Parameters

 `pInMemory`
 [out] `true` if this module exists only in memory; otherwise, `false`.

## Remarks

The common language runtime (CLR) supports the loading of modules from raw streams of bytes. Such modules are called *in-memory modules* and do not exist on disk.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
