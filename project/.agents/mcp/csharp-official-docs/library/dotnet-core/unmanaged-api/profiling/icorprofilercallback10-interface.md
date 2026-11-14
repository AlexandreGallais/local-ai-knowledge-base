---
title: "ICorProfilerCallback10 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/icorprofilercallback10-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorProfilerCallback10 interface

A subclass of ICorProfilerCallback9 that provides callback methods to notify the profiler that EventPipe events have been delivered to the profiler's currently active session.

## Methods

| Method | Description |
|------------|-----------------|
|EventPipeEventDelivered Method| Notifies the profiler that an EventPipe event has been delivered to the session that the profiler has open. |
|EventPipeProviderCreated Method| Notifies the profiler that an EventPipe provider has been created, allowing the profiler to add that provider to their session. |

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorProf.idl, CorProf.h

**.NET Versions:** Available since .NET 5.0

## See also

- EventPipe Overview
- Well Known EventProviders
- ICorProfilerInfo12 Interface
- ICorProfilerInfo12.EventPipeStartSession method
- ICorProfilerInfo12.EventPipeStopSession method
