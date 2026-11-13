---
title: "ICorDebugAssembly3 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugassembly3-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
