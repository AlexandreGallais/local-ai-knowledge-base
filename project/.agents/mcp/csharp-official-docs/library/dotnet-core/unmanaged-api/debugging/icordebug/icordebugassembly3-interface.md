---
title: "ICorDebugAssembly3 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugassembly3-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugAssembly3 Interface

Logically extends the ICorDebugAssembly interface to provide support for container assemblies and their contained assemblies.

## Methods

|Method|Description|
|------------|-----------------|
|EnumerateContainedAssemblies Method|Gets an enumerator for the assemblies contained in this assembly.|
|GetContainerAssembly Method|Returns the container assembly of this `ICorDebugAssembly3` object.|

## Remarks

> **Note:**
> The interface is available with .NET Native only. Attempting to call `QueryInterface` to retrieve an interface pointer returns `E_NOINTERFACE` for ICorDebug scenarios outside of .NET Native.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
