---
title: "ICorDebugSymbolProvider::GetMergedAssemblyRecords Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugsymbolprovider-getmergedassemblyrecords-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugSymbolProvider::GetMergedAssemblyRecords Method

Gets the symbol records for all the merged assemblies.

## Syntax

```cpp
HRESULT GetMergedAssemblyRecords(
   [in] ULONG32 cRequestedRecords,
   [out] ULONG32 *pcFetchedRecords,
   [out, size_is(cRequestedRecords), length_is(*pcFetchedRecords)] ICorDebugMergedAssemblyRecord *pRecords[]
);
```

## Parameters

 `cRequestedRecords`
 [in] The number of symbol records requested.

 `pcFetchedRecords`
 [out] A pointer to the number of symbol records retrieved by the method.

 `pRecords`
A pointer to an array of ICorDebugMergedAssemblyRecord objects.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugSymbolProvider Interface
