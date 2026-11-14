---
title: "ICorDebugAppDomain3 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain3-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain3 Interface

Provides methods to retrieve information about the managed representations of Windows Runtime types currently loaded in an application domain. This interface is an extension of the ICorDebugAppDomain and ICorDebugAppDomain2 interfaces.

## Methods

|Method|Description|
|------------|-----------------|
|ICorDebugAppDomain3::GetCachedWinRTTypes|Gets an enumerator for all cached Windows Runtime types.|
|ICorDebugAppDomain3::GetCachedWinRTTypesForIIDs|Gets an enumerator for cached Windows Runtime types in an application domain based on their interface identifiers.|

## Remarks

This interface is meant to be used by a debugger in conjunction with a function evaluation call to `M:System.Runtime.InteropServices.Marshal.GetInspectableIIDs(System.Object)`. When the method retrieves the interface identifiers supported by a Windows Runtime server object, the debugger may use the methods defined in this interface to map them to managed types that correspond to those interfaces.

To retrieve an instance of this interface, run `QueryInterface` on an instance of the ICorDebugAppDomain or ICorDebugAppDomain2 interface.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** Windows Runtime

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
