---
title: "ICorProfilerInfo12 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/profiling/icorprofilerinfo12-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorProfilerInfo12 interface

 A subclass of ICorProfilerInfo11 that provides methods to create EventPipe sessions, events, and providers.

## Methods

| Method | Description |
|------------|-----------------|
|EventPipeStartSession Method| Starts a profiler EventPipe session. |
|EventPipeAddProviderToSession Method| Adds a provider to an existing EventPipe session. |
|EventPipeStopSession Method| Stops an EventPipe session. |
|EventPipeCreateProvider Method| Creates an EventPipe provider. |
|EventPipeGetProviderInfo Method| Gets the name of an EventPipe provider from its ID. |
|EventPipeDefineEvent Method| Defines an event on an existing EventPipe provider. |
|EventPipeWriteEvent Method| Writes an EventPipe event. |

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 5.0

## See also

- EventPipe Overview
- Well Known EventProviders
- ICorProfilerCallback10 Interface
