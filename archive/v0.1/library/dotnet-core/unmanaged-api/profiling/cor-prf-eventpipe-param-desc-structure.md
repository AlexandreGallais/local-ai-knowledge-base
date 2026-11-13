---
title: "COR_PRF_EVENTPIPE_PARAM_DESC structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/profiling/cor-prf-eventpipe-param-desc-structure.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# COR_PRF_EVENTPIPE_PARAM_DESC structure

Describes the parameter name and type for an EventPipe event.

## Syntax

```cpp
typedef struct
{
    UINT32       type;
    UINT32       elementType;
    const WCHAR *name;
} COR_PRF_EVENTPIPE_PARAM_DESC;
```

## Members

| Member | Description |
|------------|-----------------|
| `type` | The type of the parameter. |
| `elementType` | The element type if this parameter is an array type. |
| `name` | A wide character string containing the name of the parameter. |

## Remarks

 The `COR_PRF_EVENTPIPE_PARAM_DESC` structure is used by the ICorProfilerInfo12::EventPipeDefineEvent method to define the parameter types of the event being defined.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 5.0

## See also

- ICorProfilerInfo12::EventPipeDefineEvent
