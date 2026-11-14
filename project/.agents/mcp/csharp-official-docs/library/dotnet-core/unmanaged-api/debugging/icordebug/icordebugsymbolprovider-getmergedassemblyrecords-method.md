---
title: "ICorDebugSymbolProvider::GetMergedAssemblyRecords Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugsymbolprovider-getmergedassemblyrecords-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
