---
title: "ICorProfilerInfo13 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/profiling/icorprofilerinfo13-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
