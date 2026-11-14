---
title: "ICorProfilerInfo12::EventPipeStopSession Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo12-eventpipestopsession-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerInfo12::EventPipeStopSession method

Stops an EventPipe session, preventing any future events from being written to the session.

## Syntax

```cpp
    HRESULT EventPipeStopSession(
        [in] EVENTPIPE_SESSION session);
```

## Parameters

`session`\
[in] The ID of the session to stop.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 5.0

## See also

- ICorProfilerCallback10 Interface
- ICorProfilerInfo12 Interface
