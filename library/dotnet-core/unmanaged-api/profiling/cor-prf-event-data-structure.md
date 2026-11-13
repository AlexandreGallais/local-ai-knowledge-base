---
title: "COR_PRF_EVENT_DATA structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/profiling/cor-prf-event-data-structure.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# COR_PRF_EVENT_DATA structure

Describes the event data for an EventPipe event being written.

## Syntax

```cpp
typedef struct
{
    UINT64 ptr;
    UINT32 size;
    UINT32 reserved;
} COR_PRF_EVENT_DATA;
```

## Members

| Member | Description |
|------------|-----------------|
| `ptr` | A pointer to the data. |
| `size` | The size of the data pointed to by `ptr`. |
| `reserved` | An reserved implementation specific field. |

## Remarks

 The `COR_PRF_EVENT_DATA` structure is used by the ICorProfilerInfo12::EventPipeWriteEvent method to provide the data payload for the event being written.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 5.0

## See also

- ICorProfilerInfo12::EventPipeWriteEvent
