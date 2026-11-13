---
title: "ICorProfilerInfo10::RequestReJITWithInliners"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/profiling/icorprofilerinfo10-requestrejitwithinliners-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorProfilerInfo10::RequestReJITWithInliners method

ReJITs the methods requested, as well as any inliners of the methods requested.

## Syntax

```cpp
HRESULT RequestReJITWithInliners( [in]                       DWORD       dwRejitFlags,
                                  [in]                       ULONG       cFunctions,
                                  [in, size_is(cFunctions)]  ModuleID    moduleIds[],
                                  [in, size_is(cFunctions)]  mdMethodDef methodIds[]);
```

## Parameters

`dwRejitFlags`\
[in] A bitmask of COR_PRF_REJIT_FLAGS.

`cFunctions`\
[in] The number of functions to recompile.

`moduleIds`\
[in] Specifies the `moduleId` portion of the (`module`, `methodDef`) pairs that identify the functions to be recompiled.

`methodIds`\
[in] Specifies the `methodId` portion of the (`module`, `methodDef`) pairs that identify the functions to be recompiled.

## Remarks

RequestReJIT doesn't track inlined methods. The profiler is expected to either block inlining or track inlining and call `RequestReJIT` for all inliners to make sure every instance of an inlined method was ReJITted. This poses a problem with ReJIT on attach, since the profiler is not present to monitor inlining. This method, `RequestReJITWithInliners`, can be called to guarantee that the full set of inliners is ReJITted as well.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**Library:** CorGuids.lib

**.NET Versions:** Available since .NET Core 3.0

## See also

- ICorProfilerInfo10 Interface
