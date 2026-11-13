---
title: "ICorProfilerInfo12::EventPipeAddProviderToSession Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/profiling/icorprofilerinfo12-eventpipeaddprovidertosession-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorProfilerInfo12::EventPipeAddProviderToSession method

Adds a provider to an existing EventPipe session.

## Syntax

```cpp
    HRESULT EventPipeAddProviderToSession(
        [in] EVENTPIPE_SESSION                 session,
        [in] COR_PRF_EVENTPIPE_PROVIDER_CONFIG providerConfig);
```

## Parameters

`session`\
[in] The ID of the session to add the provider to.

`providerConfig`\
[in] A `COR_PRF_EVENTPIPE_PROVIDER_CONFIG` describing the provider to add to the session.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 5.0

## See also

- EventPipe Overview
- Well Known EventProviders
- ICorProfilerCallback10 Interface
- ICorProfilerInfo12 Interface
- COR_PRF_EVENTPIPE_PROVIDER_CONFIG Structure
