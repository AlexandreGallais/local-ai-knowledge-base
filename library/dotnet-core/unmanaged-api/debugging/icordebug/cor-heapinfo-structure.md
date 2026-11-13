---
title: "COR_HEAPINFO Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cor-heapinfo-structure.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# COR_HEAPINFO Structure

Provides general information about the garbage collection heap, including whether it is enumerable.

## Syntax

```cpp
typedef struct _COR_HEAPINFO {
    BOOL areGCStructuresValid;
    DWORD pointerSize;
    DWORD numHeaps;
    BOOL concurrent;
    CorDebugGCType gcType;
} COR_HEAPINFO;
```

## Members

| Member                 | Description                                                    |
|------------------------|----------------------------------------------------------------|
| `areGCStructuresValid` | `true` if garbage collection structures are valid and the heap can be enumerated; otherwise, `false`. |
| `pointerSize`          | The size, in bytes, of pointers on the target architecture.    |
| `numHeaps`             | The number of logical garbage collection heaps in the process. |
| `concurrent`           | `true` if concurrent (background) garbage collection is enabled; otherwise, `false`. |
| `gcType`               | A member of the CorDebugGCType enumeration that indicates whether the garbage collector is running on a workstation or a server. |

## Remarks

 An instance of the `COR_HEAPINFO` structure is returned by calling the ICorDebugProcess5::GetGCHeapInformation method.

 Before enumerating objects on the garbage collection heap, you must always check the `areGCStructuresValid` field to ensure that the heap is in an enumerable state. For more information, see the ICorDebugProcess5::GetGCHeapInformation method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
