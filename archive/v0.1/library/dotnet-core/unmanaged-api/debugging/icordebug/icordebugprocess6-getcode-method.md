---
title: "ICorDebugProcess6::GetCode Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess6-getcode-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
