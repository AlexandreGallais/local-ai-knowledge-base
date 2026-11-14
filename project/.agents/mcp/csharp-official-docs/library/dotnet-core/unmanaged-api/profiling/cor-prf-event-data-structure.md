---
title: "COR_PRF_EVENT_DATA structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/cor-prf-event-data-structure.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
