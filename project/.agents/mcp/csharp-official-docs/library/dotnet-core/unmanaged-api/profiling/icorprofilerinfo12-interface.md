---
title: "ICorProfilerInfo12 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilerinfo12-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
