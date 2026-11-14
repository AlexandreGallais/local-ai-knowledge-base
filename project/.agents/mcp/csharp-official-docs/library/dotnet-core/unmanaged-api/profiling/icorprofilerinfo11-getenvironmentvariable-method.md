---
title: "ICorProfilerInfo11::GetEnvironmentVariable Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo11-getenvironmentvariable-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerInfo11::GetEnvironmentVariable method

Gets an environment variable from the process. On non-Windows platforms the runtime keeps an internal cache of environment variables to ensure thread safety. This means that calling `getenv` will not read any new or updated environment variables set by managed code running in the process after startup.

## Syntax

```cpp
    HRESULT GetEnvironmentVariable(
                [in, string] const WCHAR *szName,
                [in]         ULONG cchValue,
                [out]        ULONG *pcchValue,
                [out, annotation("_Out_writes_to_(cchValue, *pcchValue)")]
                             WCHAR szValue[]);
```

## Parameters

`szName`\
[in] A pointer to a null terminated wide character string containing the name of the environment variable to get.

`cchValue`\
[in] The length, in characters, of `szValue`.

`pcchValue`\
[out] A pointer to the total character length of `szValue`.

`szValue`\
[out] A caller provided wide character buffer. When the function returns the buffer will contain the value of the environment variable.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET Core 3.1

## See also

- ICorProfilerInfo11 Interface
