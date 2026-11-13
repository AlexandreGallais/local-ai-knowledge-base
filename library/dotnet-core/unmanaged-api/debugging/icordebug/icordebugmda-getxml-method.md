---
title: "ICorDebugMDA::GetXML Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmda-getxml-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugMDA::GetXML Method

Gets the full XML stream associated with the managed debugging assistant (MDA) represented by ICorDebugMDA.

## Syntax

```cpp
HRESULT GetXML (
    [in] ULONG32   cchName,
    [out] ULONG32  *pcchName,
    [out, size_is(cchName), length_is(*pcchName)]
        WCHAR      szName[]
);
```

## Parameters

 `cchName`
 [in] The size of the `szName` array.

 `pcchName`
 [out] A pointer to the length of the XML stream.

 `szName`
 [out] An array in which to store the XML stream. The array may be empty.

## Remarks

The `GetXML` method can potentially affect performance, depending on the size of the associated XML stream.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- ICorDebugMDA Interface
- Diagnose Errors with Managed Debugging Assistants
