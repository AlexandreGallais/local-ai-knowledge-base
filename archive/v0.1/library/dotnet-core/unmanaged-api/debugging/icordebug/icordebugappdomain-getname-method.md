---
title: "ICorDebugAppDomain::GetName Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain-getname-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain::GetName Method

Gets the name of the application domain.

## Syntax

```cpp
HRESULT GetName (
    [in]  ULONG32           cchName,
    [out] ULONG32           *pcchName,
    [out, size_is(cchName), length_is(*pcchName)]
         WCHAR              szName[]
);
```

## Parameters

 `cchName`
 [in] The size of the `szName` array. Set this value to zero to put this method in query mode.

 `pcchName`
 [out] A pointer to the size of the name or the number of characters actually returned in `szName`. In query mode, this value lets the caller know how large a buffer to allocate for the name.

 `szName`
 [out] An array that stores the name of the application domain.

## Remarks

A debugger calls the `GetName` method once to get the size of a buffer needed for the name. The debugger allocates the buffer, and then calls the method a second time to fill the buffer. The first call, to get the size of the name, is referred to as *query mode*.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
