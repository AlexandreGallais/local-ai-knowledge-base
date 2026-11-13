---
title: "ICorProfilerInfo12::EventPipeCreateProvider Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/profiling/icorprofilerinfo12-eventpipecreateprovider-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
