---
title: "ICorDebugProcess6::GetCode Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess6-getcode-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess6::GetCode Method

Gets information about the managed code at a particular code address.

## Syntax

```cpp
HRESULT GetCode(
    [in] CORDB_ADDRESS codeAddress,
    [out] ICorDebugCode **ppCode);
```

## Parameters

 `codeAddress`
 [in] A CORDB_ADDRESS value that specifies the starting address of the managed code segment.

 `ppCode`
 [out] A pointer to the address of an "ICorDebugCode" object that represents a segment of managed code.

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugProcess6 Interface
