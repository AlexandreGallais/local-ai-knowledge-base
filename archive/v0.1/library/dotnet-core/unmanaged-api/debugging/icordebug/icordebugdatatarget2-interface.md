---
title: "ICorDebugDataTarget2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugdatatarget2-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugDataTarget2 Interface

Logically extends the ICorDebugDataTargetinterface.

## Methods

|Method|Description|
|------------|-----------------|
|CreateVirtualUnwinder Method|Creates a new stack unwinder that starts unwinding from an initial context (which isn't necessarily the leaf of a thread).|
|EnumerateThreadIDs Method|Returns a list of active thread IDs.|
|GetImageFromPointer Method|Returns the module base address and size from an address in that module.|
|GetImageLocation Method|Returns the path of a module from the module's base address.|
|GetSymbolProviderForImage Method|Returns the symbol-provider for a module from the base address of that module.|

## Remarks

> **Note:**
> This interface is available with .NET Native only. If you implement this interface for ICorDebug scenarios outside of .NET Native, the common language runtime will ignore this interface.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
