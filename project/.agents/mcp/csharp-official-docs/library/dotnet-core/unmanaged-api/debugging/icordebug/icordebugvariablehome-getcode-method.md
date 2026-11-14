---
title: "ICorDebugVariableHome::GetCode Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablehome-getcode-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
