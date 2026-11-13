---
title: "ICorProfilerCallback10::EventPipeProviderCreated Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/profiling/icorprofilercallback10-eventpipeprovidercreated-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
