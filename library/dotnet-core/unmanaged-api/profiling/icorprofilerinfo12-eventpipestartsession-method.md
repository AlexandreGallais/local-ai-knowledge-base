---
title: "ICorProfilerInfo12::EventPipeStartSession Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/profiling/icorprofilerinfo12-eventpipestartsession-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorProfilerInfo12::EventPipeStartSession method

Starts an EventPipe session. The session can be used by the profiler to write events which can be listened to by any EventPipe consumer.

## Syntax

```cpp
    HRESULT EventPipeStartSession(
        [in]  UINT32                            cProviderConfigs,
        [in, size_is(cProviderConfigs)]
              COR_PRF_EVENTPIPE_PROVIDER_CONFIG pProviderConfigs[],
        [in]  BOOL                              requestRundown,
        [out] EVENTPIPE_SESSION*                pSession);
```

## Parameters

`cProviderConfigs`\
[in] The number of providers in `pProviderConfigs`.

`pProviderConfigs`\
[in] An array of `COR_PRF_EVENTPIPE_PROVIDER_CONFIG` used to specify what providers should be enabled for the session.

`requestRundown`\
[in] A `BOOL` indicating whether to emit rundown events when the session is closed.

`pSession`\
[out] A caller provided pointer that will be filled with the session ID when the method returns.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 5.0

## See also

- EventPipe Overview
- Well Known EventProviders
- ICorProfilerCallback10 Interface
- ICorProfilerInfo12 Interface
