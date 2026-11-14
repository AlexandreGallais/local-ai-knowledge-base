---
title: "ICorDebugModule::GetName Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-getname-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
