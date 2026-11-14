---
title: "ICorProfilerInfo13::DestroyHandle Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo13-destroyhandle-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerInfo13::DestroyHandle method

Destroys a handle that wraps an object.

## Syntax

```cpp
    HRESULT DestroyHandle([in] ObjectHandleID handle);
```

## Parameters

`handle`\
[in] The handle returned by `CreateHandle`.

## Remarks

Once destroyed, a handle can no longer be used.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 7.0

## See also

- ICorProfilerInfo13 Interface
- CreateHandle Method
