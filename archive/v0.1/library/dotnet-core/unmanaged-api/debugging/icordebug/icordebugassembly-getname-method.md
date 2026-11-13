---
title: "ICorDebugAssembly::GetName Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugassembly-getname-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugAssembly::GetName Method

Gets the name of the assembly that this `ICorDebugAssembly` instance represents.

## Syntax

```cpp
HRESULT GetName (
    [in] ULONG32  cchName,
    [out] ULONG32 *pcchName,
    [out, size_is(cchName), length_is(*pcchName)] WCHAR szName[]
);
```

## Parameters

 `cchName`
 [in] The size of the `szName` array.

 `pcchName`
 [out] A pointer to an integer that specifies the actual length of the name.

 `szName`
 [out] An array that stores the name.

## Remarks

The `GetName` method returns the full path and file name of the assembly.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
