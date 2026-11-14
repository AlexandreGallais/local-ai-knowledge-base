---
title: "ICorProfilerInfo10 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo10-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerInfo10 interface

A subclass of ICorProfilerInfo9 that provides methods to modify function IL, query information from the runtime, and suspend and resume the runtime.

## Methods

| Method | Description |
| ------------|-----------------|
|EnumerateObjectReferences Method|Given an ObjectID, callback and clientData, enumerates each object reference (if any). |
|IsFrozenObject Method|Given an ObjectID, determines whether the object is in a read-only segment. |
|GetLOHObjectSizeThreshold Method|Gets the value of the configured LOH threshold. |
|RequestReJITWithInliners Method| ReJITs the methods requested, as well as any inliners of the methods requested.  |
|SuspendRuntime Method| Suspends the runtime without performing a GC. |
|ResumeRuntime Method| Resumes the runtime without performing a GC. |

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET Core 3.0
