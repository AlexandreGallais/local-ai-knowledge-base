---
title: "ICorDebugMergedAssemblyRecord::GetSimpleName Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmergedassemblyrecord-getsimplename-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugMergedAssemblyRecord::GetSimpleName Method

Gets the simple name of the assembly.

## Syntax

```cpp
HRESULT GetSimpleName(
   [in] ULONG32 cchName,
   [out] ULONG32 *pcchName,
   [out, size_is(cchName), length_is(*pcchName)] WCHAR szName[]
);
```

## Parameters

 `cchName`
 [in] The number of characters in the `szName` buffer.

 `pcchName`
 [out] A pointer to the number of characters actually written to the `szName` buffer.

 `szName`
A pointer to a character array.

## Remarks

This method retrieves the simple name of an assembly (such as "System.Collections"), without a file extension, version, culture, or public key token. It corresponds to the `System.Reflection.AssemblyName.Name` property in managed code.

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugMergedAssemblyRecord Interface
