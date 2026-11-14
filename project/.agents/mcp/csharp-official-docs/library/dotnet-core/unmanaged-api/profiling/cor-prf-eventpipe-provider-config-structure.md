---
title: "COR_PRF_EVENTPIPE_PROVIDER_CONFIG structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/cor-prf-eventpipe-provider-config-structure.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# COR_PRF_EVENTPIPE_PROVIDER_CONFIG structure

Describes the fields necessary to configure an EventPipe provider.

## Syntax

```cpp
typedef struct
{
    const WCHAR* providerName;
    UINT64       keywords;
    UINT32       loggingLevel;
    const WCHAR* filterData;
} COR_PRF_EVENTPIPE_PROVIDER_CONFIG;
```

## Members

| Member | Description |
|------------|-----------------|
| `providerName` | The name of the provider to enable. |
| `keywords` | The keywords to enable on the provider. |
| `loggingLevel` | The level to enable on the provider. |
| `filterData` | A wide character string containing the filterdata to use when enabling the provider. |

## Remarks

 The `COR_PRF_EVENTPIPE_PROVIDER_CONFIG` structure is used by the ICorProfilerInfo12::EventPipeAddProviderToSession method to indicate the configuration for the provider being added to the session.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 5.0

## See also

- ICorProfilerInfo12::EventPipeAddProviderToSession
