---
title: "ICorProfilerInfo12::EventPipeCreateProvider Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo12-eventpipecreateprovider-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerInfo12::EventPipeCreateProvider method

Creates an EventPipe provider that the profiler can use to write events for other EventPipe listeners to receive.

## Syntax

```cpp
    HRESULT EventPipeCreateProvider(
                [in, string] const WCHAR    *providerName,
                [out] EVENTPIPE_PROVIDER    *pProvider);
```

## Parameters

`providerName`\
[in] The name of the provider to create.

`pProvider`\
[out] A caller provided pointer that will be filled with the ID of the provider when the function returns.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 5.0

## See also

- EventPipe Overview
- Well Known EventProviders
- ICorProfilerCallback10 Interface
- ICorProfilerInfo12 Interface
