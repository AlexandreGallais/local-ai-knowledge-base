---
title: "ICorProfilerInfo12::EventPipeAddProviderToSession Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo12-eventpipeaddprovidertosession-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
