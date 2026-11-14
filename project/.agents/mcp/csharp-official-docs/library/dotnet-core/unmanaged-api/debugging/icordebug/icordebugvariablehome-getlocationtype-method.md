---
title: "ICorDebugVariableHome::GetLocationType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablehome-getlocationtype-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugVariableHome::GetLocationType Method

Gets the type of the variable's native location.

## Syntax

```cpp
HRESULT GetLocationType(
    [out] VariableLocationType *pLocationType
);
```

## Parameters

 `pLocationType`\
 [out] A pointer to the type of the variable's native location.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6.2

## See also

- ICorDebugVariableHome interface
- VariableLocationType enumeration
