---
title: "ICorProfilerInfo10::EnumerateObjectReferences"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo10-enumerateobjectreferences-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerInfo10::EnumerateObjectReferences method

Given an ObjectID, callback and clientData, enumerates each object reference (if any).

## Syntax

```cpp
HRESULT EnumerateObjectReferences( [in] ObjectID objectId,
                                   [in] ObjectReferenceCallback callback,
                                   [in] void* clientData);
```

## Parameters

`objectId`\
[in] The object to enumerate references on.

`callback`\
[in] The function that will be called with the references for the object.

`clientData`\
[in] Profiler-provided data to pass to the `callback` function.

## Remarks

The `EnumerateObjectReferences` method is similar to ObjectReferences, except that it walks the references on demand for the profiler instead of pre-allocating an array to store the references.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**Library:** CorGuids.lib

**.NET Versions:** Available since .NET Core 3.0

## See also

- ICorProfilerInfo10 Interface
