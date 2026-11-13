---
title: "ICorDebugStringValue::GetLength Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugstringvalue-getlength-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugStringValue::GetLength Method

Gets the number of characters in the string referenced by this ICorDebugStringValue.

## Syntax

```cpp
HRESULT GetLength (
    [out] ULONG32   *pcchString
);
```

## Parameters

 `pcchString`
 [out] A pointer to a value that specifies the length of the string referenced by this `ICorDebugStringValue` object.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
