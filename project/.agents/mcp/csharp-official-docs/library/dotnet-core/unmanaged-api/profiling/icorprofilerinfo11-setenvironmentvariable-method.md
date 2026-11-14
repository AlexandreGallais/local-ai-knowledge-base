---
title: "ICorProfilerInfo11::SetEnvironmentVariable Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo11-setenvironmentvariable-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerInfo11::SetEnvironmentVariable method

Sets an environment variable in the process. On non-Windows platforms the runtime keeps an internal cache of environment variables to ensure thread safety. This means that if the profiler calls `setenv` the new environment variable will not be picked up by managed code running in the process.

## Syntax

```cpp
    HRESULT SetEnvironmentVariable(
                [in, string] const WCHAR *szName,
                [in, string] const WCHAR *szValue);
```

## Parameters

`szName`\
[in] A pointer to a null terminated wide character string containing the name of the environment variable to set.

`szValue`\
[in] A pointer to a null terminated wide character string containing the value of the environment variable to set.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET Core 3.1
