---
title: "ICorDebugFunction3 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction3-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
