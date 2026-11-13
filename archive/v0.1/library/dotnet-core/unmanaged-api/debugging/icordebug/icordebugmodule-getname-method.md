---
title: "ICorDebugModule::GetName Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-getname-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugModule::GetName Method

Gets the file name of the module.

## Syntax

```cpp
HRESULT GetName(
    [in] ULONG32 cchName,
    [out] ULONG32 *pcchName,
    [out, size_is(cchName), length_is(*pcchName)] WCHAR szName[]
);
```

## Parameters

 `cchname`
 [in] The size of the `szName` array.

 `pcchName`
 [in] A pointer to the length of the returned name.

 `szName`
 [out] An array that stores the returned name.

## Remarks

The `GetName` method returns an S_OK HRESULT if the module's file name matches the name on disk. `GetName` returns an S_FALSE HRESULT if the name is fabricated, such as for a dynamic or in-memory module.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
