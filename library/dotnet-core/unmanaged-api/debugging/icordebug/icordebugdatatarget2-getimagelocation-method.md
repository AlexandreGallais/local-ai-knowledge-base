---
title: "ICorDebugDataTarget2::GetImageLocation Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugdatatarget2-getimagelocation-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugDataTarget2::GetImageLocation Method

Returns the path of a module from the module's base address.

## Syntax

```cpp
HRESULT GetImageLocation(    [in] CORDB_ADDRESS baseAddress,
    [in] ULONG32 cchName,
    [out] ULONG32 *pcchName,
    [out, size_is(cchName), length_is(*pcchName)] WCHAR szName[]
);
```

## Parameters

 `baseAddress`
 [in] A CORDB_ADDRESS value that represents the module's base address.

 `cchName`
 [in] The number of characters in the buffer that is to receive the module path.

 `pcchName`
 [out] A pointer to the number of characters written to the `szName` buffer.

 `szName`
 [out] The path of the module.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugDataTarget2 Interface
