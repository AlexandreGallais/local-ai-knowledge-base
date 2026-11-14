---
title: "ICorProfilerInfo13 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo13-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerInfo13 interface

 A subclass of ICorProfilerInfo12 that provides methods to manage weak, strong, and pinned handles that wrap objects.

## Methods

| Method | Description |
|------------|-----------------|
|CreateHandle Method| Creates a weak, strong, or pinned handle wrapping an object. |
|DestroyHandle Method| Destroys a handle. |
|GetObjectIDFromHandle Method| Gets the object wrapped by a handle. |

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 7.0
