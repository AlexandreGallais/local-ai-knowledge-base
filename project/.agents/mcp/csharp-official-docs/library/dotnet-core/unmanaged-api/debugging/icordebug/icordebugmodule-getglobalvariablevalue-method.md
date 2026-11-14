---
title: "ICorDebugModule::GetGlobalVariableValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule-getglobalvariablevalue-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugModule::GetGlobalVariableValue Method

Gets the value of the specified global variable.

## Syntax

```cpp
HRESULT GetGlobalVariableValue(
    [in]  mdFieldDef      fieldDef,
    [out] ICorDebugValue  **ppValue
);
```

## Parameters

 `fieldDef`
 [in] An `mdFieldDef` token that references the metadata describing the global variable.

 `ppValue`
 [out] A pointer to the address of an ICorDebugValue object that represents the value of the specified global variable.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
