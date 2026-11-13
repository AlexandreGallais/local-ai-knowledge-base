---
title: "ICorDebugComObjectValue Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugcomobjectvalue-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugComObjectValue Interface

Provides methods to retrieve information associated with a runtime callable wrapper (RCW).

## Methods

|Method|Description|
|------------|-----------------|
|GetCachedInterfacePointers Method|Gets the raw interface pointers cached on the current RCW.|
|GetCachedInterfaceTypes Method|Provides an enumerator for the interface types that the current object has been cased to or used as.|

## Remarks

To check whether an instance of an "ICorDebugValue" interface represents an RCW, a debugger calls `QueryInterface` on "ICorDebugValue" with `IID_ICorDebugComObjectValue`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
