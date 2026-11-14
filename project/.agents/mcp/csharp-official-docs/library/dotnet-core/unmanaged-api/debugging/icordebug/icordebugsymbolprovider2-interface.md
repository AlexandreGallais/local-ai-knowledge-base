---
title: "ICorDebugSymbolProvider2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugsymbolprovider2-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugSymbolProvider2 Interface

Logically extends the ICorDebugSymbolProvider interface to retrieve additional debug symbol information.

## Methods

|Method|Description|
|------------|-----------------|
|GetFrameProps Method|Returns the method starting relative virtual address of a method and the parent frame given a code relative virtual address.|
|GetGenericDictionaryInfo Method|Retrieves a generic dictionary map.|

## Remarks

> **Note:**
> This interface is available with .NET Native only. If you implement this interface for ICorDebug scenarios outside of .NET Native, the common language runtime will ignore this interface.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugSymbolProvider Interface
