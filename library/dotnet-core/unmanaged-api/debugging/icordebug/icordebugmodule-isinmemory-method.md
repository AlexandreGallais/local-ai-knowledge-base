---
title: "ICorDebugModule::IsInMemory Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-isinmemory-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
