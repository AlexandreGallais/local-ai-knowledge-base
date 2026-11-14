---
title: "ICorDebugInstanceFieldSymbol Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebuginstancefieldsymbol-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugInstanceFieldSymbol Interface

Represents the debug symbol information for an instance field.

## Methods

|Method|Description|
|------------|-----------------|
|GetName Method|Gets the name of the instance field.|
|GetOffset Method|Gets the offset in bytes of this instance field in its parent class.|
|GetSize Method|Gets the size in bytes of the instance field.|

## Remarks

The `ICorDebugInstanceFieldSymbol` interface is used to retrieve the debug symbol information for an instance field.

> **Note:**
> This interface is available with .NET Native only. If you implement this interface for ICorDebug scenarios outside of .NET Native, the common language runtime will ignore this interface.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugStaticFieldSymbol Interface
