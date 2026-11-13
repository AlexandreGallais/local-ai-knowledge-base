---
title: "ICorProfilerInfo10::GetLOHObjectSizeThreshold"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/profiling/icorprofilerinfo10-getlohobjectsizethreshold-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorProfilerInfo10::GetLOHObjectSizeThreshold method

Gets the value of the configured large object heap (LOH) threshold.

## Syntax

```cpp
HRESULT GetLOHObjectSizeThreshold( [out] DWORD *pThreshold );
```

## Parameters

`pThreshold`\
[out] The large object heap threshold in bytes.

## Remarks

Objects larger than the large object heap threshold will be allocated on the large object heap. Starting with .NET Core 3.0 the large object heap threshold is configurable, `pThreshold` will contain the active large object heap threshold size in bytes.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**Library:** CorGuids.lib

**.NET Versions:** Available since .NET Core 3.0

## See also

- ICorProfilerInfo10 Interface
