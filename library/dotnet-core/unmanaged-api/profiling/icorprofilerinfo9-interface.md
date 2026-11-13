---
title: "ICorProfilerInfo9 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/profiling/icorprofilerinfo9-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorProfilerInfo9 interface

A subclass of ICorProfilerInfo8 that provides methods to query information about functions with multiple native code versions.

## Methods

| Method | Description |
| ------------|-----------------|
|GetNativeCodeStartAddresses Method| Given a `functionId` and `rejitId`, enumerates the native code start address of all jitted versions of this code that currently exist. |
|GetILToNativeMapping3 Method| Given the native code start address, returns the native to IL mapping information for this jitted version of the code. |
|GetCodeInfo4 Method| Given the native code start address, returns the blocks of virtual memory that store this code. |

## Requirements

**Platforms:** See .NET supported operating systems
**Header:** CorProf.idl, CorProf.h
**.NET Versions:** Available since .NET Core 2.1
