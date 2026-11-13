---
title: "ICorProfilerInfo12::EventPipeGetProviderInfo Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/profiling/icorprofilerinfo12-eventpipegetproviderinfo-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorProfilerInfo12::EventPipeGetProviderInfo method

Creates an EventPipe provider that the profiler can use to write events for other EventPipe listeners to receive.

## Syntax

```cpp
    HRESULT EventPipeGetProviderInfo(
                [in] EVENTPIPE_PROVIDER provider,
                [in]  ULONG      cchName,
                [out] ULONG      *pcchName,
                [out, annotation("_Out_writes_to_(cchName, *pcchName)")]
                      WCHAR      providerName[]);
```

## Parameters

`provider`\
[in] The ID of the provider to provide the name for.

`cchName`\
[in] The size, in characters, of `providerName`.

`pcchName`\
[out] A pointer to the total character length of `providerName`.

`providerName`\
[out] A caller provided wide character buffer. When the function returns the buffer will contain the name of the provider.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 5.0

## See also

- EventPipe Overview
- Well Known EventProviders
- ICorProfilerCallback10 Interface
- ICorProfilerInfo12 Interface
