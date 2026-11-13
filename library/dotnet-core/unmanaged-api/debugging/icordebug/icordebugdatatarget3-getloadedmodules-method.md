---
title: "ICorDebugDataTarget3::GetLoadedModules Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugdatatarget3-getloadedmodules-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugDataTarget3::GetLoadedModules Method

Gets a list of the modules that have been loaded so far.

## Syntax

```cpp
HRESULT GetLoadedModules(
   [in] ULONG32 cRequestedModules,
   [out] ULONG32 *pcFetchedModules,
   [out, size_is(cRequestedModules), length_is(*pcFetchedModules)] ICorDebugLoadedModule *pLoadedModules[]
);
```

## Parameters

 `cRequestedModules`
 [in] The number of modules for which information is requested.

 `pcFetchedModules`
 [out] A pointer to the number of modules about which information was returned.

 `pLoadedModules`
 [out] A pointer to an array of ICorDebugLoadedModule objects that provide information about loaded modules.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugDataTarget3 Interface
