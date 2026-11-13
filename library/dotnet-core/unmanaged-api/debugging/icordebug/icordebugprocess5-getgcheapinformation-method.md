---
title: "ICorDebugProcess5::GetGCHeapInformation Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess5-getgcheapinformation-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess5::GetGCHeapInformation Method

Provides general information about the garbage collection heap, including whether it is currently enumerable.

## Syntax

```cpp
HRESULT GetGCHeapInformation(
    [out] COR_HEAPINFO *pHeapInfo
);
```

## Parameters

 `pHeapInfo`
 [out] A pointer to a COR_HEAPINFO value that provides general information about the garbage collection heap.

## Remarks

The `ICorDebugProcess5::GetGCHeapInformation` method must be called before enumerating the heap or individual heap regions to ensure that the garbage collection structures in the process are currently valid. The garbage collection heap cannot be walked while a collection is in progress. Otherwise, the enumeration may capture garbage collection structures that are invalid.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugProcess5 Interface
