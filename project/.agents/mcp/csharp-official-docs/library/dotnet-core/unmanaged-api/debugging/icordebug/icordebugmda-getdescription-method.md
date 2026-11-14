---
title: "ICorDebugMDA::GetDescription Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmda-getdescription-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugMDA::GetDescription Method

Gets a string containing the description of the managed debugging assistant (MDA) represented by ICorDebugMDA.

## Syntax

```cpp
HRESULT GetDescription (
    [in] ULONG32   cchName,
    [out] ULONG32  *pcchName,
    [out, size_is(cchName), length_is(*pcchName)]
        WCHAR      szName[]
);
```

## Parameters

 `cchName`
 [in] The size of the string buffer that will store the description.

 `pcchName`
 [out] A pointer to the number of bytes returned in the string buffer.

 `szName`
 [out] A string buffer containing the description of the MDA.

## Remarks

The string can be zero in length.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- ICorDebugMDA Interface
- Diagnose Errors with Managed Debugging Assistants
