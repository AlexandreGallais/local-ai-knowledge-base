---
title: "ICorDebugGuidToTypeEnum Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugguidtotypeenum-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugGuidToTypeEnum Interface

Provides an enumerator that defines the mapping between a set of GUIDs and their corresponding types, which are represented by ICorDebugType instances. This interface inherits the methods from the ICorDebugEnum interface.

## Methods

|Method|Description|
|------------|-----------------|
|ICorDebugGuidToTypeEnum::Next|Gets the specified number of CorDebugGuidToTypeMapping instances that map GUIDs to type information.|

## Remarks

An `ICorDebugGuidToTypeEnum` interface object can be retrieved by calling the ICorDebugAppDomain3::GetCachedWinRTTypes method. A debugger can call this interface's Next method to retrieve CorDebugGuidToTypeMapping objects that represent mappings of managed representations of Windows Runtime types loaded in the application domain used for the call to the ICorDebugAppDomain3::GetCachedWinRTTypes method.

## Requirements

 **Platforms:** Windows Runtime

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
