---
title: "ICorDebugProcess5::GetTypeForTypeID Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess5-gettypefortypeid-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess5::GetTypeForTypeID Method

Converts a type identifier to an ICorDebugType value.

## Syntax

```cpp
HRESULT GetTypeForTypeID(
    [in] COR_TYPEID id, [
    out] ICorDebugType **ppType
);
```

## Parameters

 `id`
 [in] The type identifier.

 `ppType`
 [out] A pointer to the address of an ICorDebugType object.

## Remarks

In some cases, methods that return a type identifier may return a null `COR_TYPEID` value. If this value is passed as the `id` argument, the `GetTypeForTypeID` method will fail and return `E_FAIL`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugProcess5 Interface
