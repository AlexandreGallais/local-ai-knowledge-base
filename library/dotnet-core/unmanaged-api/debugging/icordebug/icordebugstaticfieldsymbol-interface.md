---
title: "ICorDebugStaticFieldSymbol Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugstaticfieldsymbol-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugStaticFieldSymbol Interface

Represents the debug symbol information for a static field.

## Methods

|Method|Description|
|------------|-----------------|
|GetAddress Method|Gets the address of the static field.|
|GetName Method|Gets the name of the static field.|
|GetSize Method|Gets the size in bytes of the static field.|

## Remarks

The `ICorDebugStaticFieldSymbol` interface is used to retrieve the debug symbol information for a static field.

> **Note:**
> This interface is available with .NET Native only. If you implement this interface for ICorDebug scenarios outside of .NET Native, the common language runtime will ignore this interface.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugInstanceFieldSymbol Interface
