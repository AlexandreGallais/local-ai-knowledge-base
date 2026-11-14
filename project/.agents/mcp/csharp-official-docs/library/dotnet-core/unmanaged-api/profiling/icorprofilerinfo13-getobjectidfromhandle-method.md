---
title: "ICorProfilerInfo13::GetObjectIDFromHandle Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo13-getobjectidfromhandle-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerInfo13::GetObjectIDFromHandle method

Returns the object wrapped by a specified handle.

## Syntax

```cpp
    HRESULT GetObjectIDFromHandle(
                [in] ObjectHandleID handle,
                [out] ObjectID*     pObject);
```

## Parameters

`handle`\
[in] The handle wrapping an object.

`pObject`\
[out] A caller-provided pointer that will point to the object wrapped by the specified `handle`.

## Remarks

If `*pObject` is null, the object wrapped by this handle is no longer alive and has been collected.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 7.0

## See also

- ICorProfilerInfo13 Interface
