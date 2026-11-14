---
title: "ICorProfilerInfo10::SuspendRuntime"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo10-suspendruntime-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerInfo10::SuspendRuntime method

Suspends the runtime without performing a GC.

## Syntax

```cpp
HRESULT SuspendRuntime();
```

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**Library:** CorGuids.lib

**.NET Versions:** Available since .NET Core 3.0

## See also

- ICorProfilerInfo10 Interface
