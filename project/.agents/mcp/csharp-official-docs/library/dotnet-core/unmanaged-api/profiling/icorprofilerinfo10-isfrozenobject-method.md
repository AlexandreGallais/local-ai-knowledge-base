---
title: "ICorProfilerInfo10::IsFrozenObject"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo10-isfrozenobject-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerInfo10::IsFrozenObject method

Given an ObjectID, determines whether the object is in a read-only segment.

## Syntax

```cpp
HRESULT IsFrozenObject( [in]  ObjectID objectId,
                        [out] BOOL *pbFrozen);
```

## Parameters

`objectId`\
[in] The object to examine.

`pbFrozen`\
[out] A `BOOL` indicating if the object is in a read-only segment.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**Library:** CorGuids.lib

**.NET Versions:** Available since .NET Core 3.0

## See also

- ICorProfilerInfo10 Interface
