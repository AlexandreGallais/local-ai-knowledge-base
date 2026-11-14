---
title: ".NET profiling (unmanaged API reference)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/profiling/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET profiling (unmanaged API reference)

The profiling API enables a profiler to monitor a program's execution by the common language runtime (CLR).

These articles describe APIs that were introduced in .NET Core 2.0 and later versions. For .NET Framework-era unmanaged APIs, most of which can also be used to profile .NET (Core) apps, see .NET Framework profiling.

## Structures

- COR_PRF_EVENT_DATA structure
- COR_PRF_EVENTPIPE_PARAM_DESC structure
- COR_PRF_EVENTPIPE_PROVIDER_CONFIG structure

## Enumerations

- COR_PRF_EVENTPIPE_LEVEL enumeration
- COR_PRF_EVENTPIPE_PARAM_TYPE enumeration
- COR_PRF_HANDLE_TYPE enumeration
- COR_PRF_REJIT_FLAGS enumeration

## Interfaces

- ICorProfilerCallback10 interface
- ICorProfilerInfo9 interface
- ICorProfilerInfo10 interface
- ICorProfilerInfo11 interface
- ICorProfilerInfo12 interface
- ICorProfilerInfo13 interface
