---
title: "ICorDebugAppDomain::EnumerateAssemblies Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain-enumerateassemblies-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain::EnumerateAssemblies Method

Gets an enumerator for the assemblies in the application domain.

## Syntax

```cpp
HRESULT EnumerateAssemblies (
    [out] ICorDebugAssemblyEnum  **ppAssemblies
);
```

## Parameters

 `ppAssemblies`
 [out] A pointer to the address of an ICorDebugAssemblyEnum object that is the enumerator for the assemblies in the application domain.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
