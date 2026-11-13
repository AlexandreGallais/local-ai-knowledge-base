---
title: "ICorDebugVariableHome::GetCode Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablehome-getcode-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugVariableHome::GetCode Method

Gets the "ICorDebugCode" instance that contains this ICorDebugVariableHome object.

## Syntax

```cpp
HRESULT GetCode(
    [out] ICorDebugCode **ppCode
);
```

## Parameters

 `ppCode`
 [out] A pointer to the address of the "ICorDebugCode" instance that contains this ICorDebugVariableHome object.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6.2

## See also

- ICorDebugVariableHome Interface
