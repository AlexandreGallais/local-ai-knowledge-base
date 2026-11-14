---
title: "COR_PRF_REJIT_FLAGS Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/cor-prf-rejit-flags-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# COR_PRF_REJIT_FLAGS enumeration

Contains values that indicate how the ICorProfilerInfo10::RequestReJITWithInliners API should behave.

## Syntax

```cpp
typedef enum
{
    COR_PRF_REJIT_BLOCK_INLINING = 0x1,
    COR_PRF_REJIT_INLINING_CALLBACKS    = 0x2
} COR_PRF_REJIT_FLAGS;
```

## Members

| Member | Description |
|------------|-----------------|
| `COR_PRF_REJIT_BLOCK_INLINING` | ReJITted methods will be blocked from being inlined in other methods. |
| `COR_PRF_REJIT_INLINING_CALLBACKS` | Receive `GetFunctionParameters` callbacks for any methods that inline the methods requested to be ReJITted. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorProf.idl, CorProf.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Core 3.0
