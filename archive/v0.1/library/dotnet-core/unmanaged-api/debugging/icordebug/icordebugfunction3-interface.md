---
title: "ICorDebugFunction3 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction3-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugFunction3 Interface

Logically extends the ICorDebugFunction interface to provide access to code from a ReJIT request.

## Methods

| Method                                                                                         | Description |
|------------------------------------------------------------------------------------------------|-------------|
| GetActiveReJitRequestILCode Method | Gets an interface pointer to an ICorDebugILCode that contains the IL from an active ReJIT request. |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.2

## See also

- ReJIT: A How-To Guide
