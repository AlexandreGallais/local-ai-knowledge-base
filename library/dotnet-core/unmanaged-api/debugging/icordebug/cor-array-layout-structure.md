---
title: "COR_ARRAY_LAYOUT Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cor-array-layout-structure.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# COR_ARRAY_LAYOUT Structure

Provides information about the layout of an array object in memory.

## Syntax

```cpp
typedef struct COR_ARRAY_LAYOUT {
    COR_TYPEID componentID;
    CorElementType componentType;
    ULONG32 firstElementOffset;
    ULONG32 elementSize;
    ULONG32 countOffset;
    ULONG32 rankSize;
    ULONG32 numRanks;
    ULONG32 rankOffset;
} COR_ARRAY_LAYOUT;
```

## Members

| Member               | Description                                                    |
|----------------------|----------------------------------------------------------------|
| `componentID`        | The identifier of the type of objects that the array contains. |
| `componentType`      | A CorElementType enumeration value that indicates whether the component is a garbage collection reference, a value class, or a primitive. |
| `firstElementOffset` | The offset to the first element in the array.                  |
| `elementSize`        | The size of each element.                                      |
| `countOffset`        | The offset to the number of elements in the array.             |
| `rankSize`           | The size of the rank, in bytes.                                |
| `numRanks`           | The number of ranks in the array.                              |
| `rankOffset`         | The offset at which the ranks start.                           |

## Remarks

 The `rankSize` field specifies the size of a rank in a multi-dimensional array. It is accurate for single-dimensional arrays as well.

 The value of `numRanks` is 1 for a single-dimensional array and `N` for a multi-dimensional array of `N` dimensions.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
