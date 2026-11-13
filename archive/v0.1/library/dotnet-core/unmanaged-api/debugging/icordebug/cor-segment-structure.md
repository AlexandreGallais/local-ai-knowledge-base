---
title: "COR_SEGMENT Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cor-segment-structure.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# COR_SEGMENT Structure

Contains information about a region of memory in the managed heap.

## Syntax

```cpp
typedef struct _COR_SEGMENT {
    CORDB_ADDRESS start;
    CORDB_ADDRESS end;
    CorDebugGenerationTypes gen;
    ULONG heap;
} COR_SEGMENT;
```

## Members

| Member  | Description                                |
|---------|--------------------------------------------|
| `start` | The starting address of the memory region. |
| `end`   | The ending address of the memory region.   |
| `gen`   | A CorDebugGenerationTypes enumeration member that indicates the generation of the memory region. |
| `heap`  | The heap number in which the memory region resides. See the Remarks section for more information. |

## Remarks

 The `COR_SEGMENTS` structure represents a region of memory in the managed heap.  `COR_SEGMENTS` objects are members of the ICorDebugHeapRegionEnum collection object, which is populated by calling the ICorDebugProcess5::EnumerateHeapRegions method.

 The `heap` field is the processor number, which corresponds to the heap being reported. For workstation garbage collectors, its value is always zero, because workstations have only one garbage collection heap. For server garbage collectors, its value corresponds to the processor the heap is attached to. Note that there may be more or fewer garbage collection heaps than there are actual processors due to the implementation details of the garbage collector.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
