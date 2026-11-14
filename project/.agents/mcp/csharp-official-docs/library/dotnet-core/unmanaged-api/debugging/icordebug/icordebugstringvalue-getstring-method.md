---
title: "ICorDebugStringValue::GetString Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugstringvalue-getstring-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugStringValue::GetString Method

Gets the string referenced by this ICorDebugStringValue.

## Syntax

```cpp
HRESULT GetString (
    [in] ULONG32    cchString,
    [out] ULONG32   *pcchString,
    [out, size_is(cchString), length_is(*pcchString)]
        WCHAR       szString[]
);
```

## Parameters

 `cchString`
 [in] The size of the `szString` array.

 `pcchString`
 [out] A pointer to the number of characters returned in the `szString` array.

 `szString`
 [out] An array that stores the retrieved string.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
