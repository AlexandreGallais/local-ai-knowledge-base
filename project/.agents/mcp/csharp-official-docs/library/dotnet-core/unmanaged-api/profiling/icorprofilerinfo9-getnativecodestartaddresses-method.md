---
title: "ICorProfilerInfo9::GetNativeCodeStartAddresses"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo9-getnativecodestartaddresses-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerInfo9::GetNativeCodeStartAddresses method

Given a functionId and rejitId, enumerates the native code start address of all jitted versions of this code that currently exist.

## Syntax

```cpp
HRESULT GetNativeCodeStartAddresses( [in]  FunctionID functionID,
                                     [in]  ReJITID reJitId,
                                     [in]  ULONG32 cCodeStartAddresses,
                                     [out] ULONG32 *pcCodeStartAddresses,
                                     [out] UINT_PTR codeStartAddresses[]);
```

## Parameters

`functionId`\
[in] The ID of the function whose native code start addresses should be returned.

`reJitId`\
[in] The identity of the JIT-recompiled function.

`cCodeStartAddresses`\
[in] The maximum size of the `codeStartAddresses` array.

`pcCodeStartAddresses`\
[out] The number of available addresses.

`codeStartAddresses`\
[out] An array of `UINT_PTR`, each one of which is the start address for a native body for the specified function.

## Remarks

When tiered compilation is enabled, a function may have more than one native code body.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**Library:** CorGuids.lib

**.NET Versions:** Available since .NET Core 2.1

## See also

- ICorProfilerInfo9 Interface
