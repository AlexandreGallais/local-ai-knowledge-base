---
title: "ICorProfilerInfo12::EventPipeWriteEvent Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo12-eventpipewriteevent-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerInfo12::EventPipeWriteEvent method

Writes an EventPipe event to any listeners who have enabled this event.

## Syntax

```cpp
    HRESULT EventPipeWriteEvent(
                [in] EVENTPIPE_EVENT    event,
                [in] UINT32             cData,
                [in, size_is(cData)]
                     COR_PRF_EVENT_DATA data[],
                [in] LPCGUID            pActivityId,
                [in] LPCGUID            pRelatedActivityId);
```

## Parameters

`event`\
[in] The ID of the event being written.

`cData`\
[in] The number of elements in `data`.

`data`\
[in] An array of `COR_PRF_EVENT_DATA` containing the event arguments.

`pActivityId`\
[in] A pointer to a GUID specifying the event's activity ID.

`pRelatedActivityId`\
[in] A pointer to a GUID specifying the event's related activity ID.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 5.0

## See also

- ICorProfilerCallback10 Interface
- ICorProfilerInfo12 Interface
- COR_PRF_EVENT_DATA Structure
