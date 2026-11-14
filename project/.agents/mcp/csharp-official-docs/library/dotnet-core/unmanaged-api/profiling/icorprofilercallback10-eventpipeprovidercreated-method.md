---
title: "ICorProfilerCallback10::EventPipeProviderCreated Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilercallback10-eventpipeprovidercreated-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerCallback10::EventPipeProviderCreated method

Notifies the profiler whenever an EventPipe provider is created.

## Syntax

```cpp
HRESULT EventPipeProviderCreated([in] EVENTPIPE_PROVIDER provider);
```

## Parameters

`provider`\
[in] The provider that was created.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 5.0

## See also

- ICorProfilerCallback10 Interface
- ICorProfilerInfo12 Interface
- ICorProfilerInfo12.EventPipeAddProviderToSession Method
