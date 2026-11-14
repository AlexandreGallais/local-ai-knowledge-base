---
title: "ICorProfilerCallback10::EventPipeEventDelivered Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilercallback10-eventpipeeventdelivered-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerCallback10::EventPipeEventDelivered method

Notifies the profiler whenever an EventPipe event has been delivered to the profiler's currently active session.

## Syntax

```cpp
    HRESULT EventPipeEventDelivered(
        [in] EVENTPIPE_PROVIDER provider,
        [in] DWORD eventId,
        [in] DWORD eventVersion,
        [in] ULONG cbMetadataBlob,
        [in, size_is(cbMetadataBlob)] LPCBYTE metadataBlob,
        [in] ULONG cbEventData,
        [in, size_is(cbEventData)] LPCBYTE eventData,
        [in] LPCGUID pActivityId,
        [in] LPCGUID pRelatedActivityId,
        [in] ThreadID eventThread,
        [in] ULONG numStackFrames,
        [in, length_is(numStackFrames)] UINT_PTR stackFrames[]);
```

## Parameters

`provider`\
[in] The provider that this event originated from.

`eventId`\
[in] The ID of the event being delivered.

`eventVersion`\
[in] The version of the event being delivered.

`cbMetadataBlob`\
[in] The length, in bytes, of `metadataBlob`.

`metadataBlob`\
[in] A pointer to the metadata blob for the event.

`cbEventData`\
[in] The length, in bytes, of `eventData`.

`eventData`\
[in] The payload for the event.

`pActivityId`\
[in] A pointer to the GUID that represents the event's activity ID, or NULL.

`pRelatedActivityId`\
[in] A pointer to the GUID that represents the event's related activity ID, or NULL.

`eventThread`\
[in] The ID of the thread the event occurred on.

`numStackFrames`\
[in] The number of elements in the `stackFrames` array.

`stackFrames`\
[in] An array of code addresses representing the managed callstack of the event.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 5.0

## See also

- ICorProfilerCallback10 Interface
- ICorProfilerInfo12 Interface
- ICorProfilerInfo12.EventPipeStartSession Method
