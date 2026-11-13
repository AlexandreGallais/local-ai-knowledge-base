---
title: "COR_PRF_HANDLE_TYPE Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/profiling/cor-prf-handle-type-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# COR_PRF_HANDLE_TYPE enumeration

Describes the type of an object handle.

## Syntax

```cpp
typedef enum
{
    COR_PRF_HANDLE_TYPE_WEAK = 0x1,
    COR_PRF_HANDLE_TYPE_STRONG = 0x2,
    COR_PRF_HANDLE_TYPE_PINNED = 0x3
} COR_PRF_HANDLE_TYPE;
```

## Members

| Member | Description |
|------------|-----------------|
| `COR_PRF_HANDLE_TYPE_WEAK` | The handle tracks an object as long as it is alive. It does not act as a root for the garbage collector. |
| `COR_PRF_HANDLE_TYPE_STRONG` | The handle acts as a normal object reference. The object will stay alive and be promoted during the next garbage collection. |
| `COR_PRF_HANDLE_TYPE_PINNED` | The handle acts as a strong handle with an added property to prevent the object from moving in memory during any garbage collection. |

## Remarks

 The `COR_PRF_HANDLE_TYPE` enumeration is used by the ICorProfilerInfo13::CreateHandle method to indicate the type of handle being created.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 7.0

## See also

- ICorProfilerInfo13::CreateHandle
