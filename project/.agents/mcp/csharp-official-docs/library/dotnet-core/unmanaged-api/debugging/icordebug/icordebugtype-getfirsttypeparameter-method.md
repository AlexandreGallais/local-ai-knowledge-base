---
title: "ICorDebugType::GetFirstTypeParameter Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugtype-getfirsttypeparameter-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugType::GetFirstTypeParameter Method

Gets an interface pointer to an ICorDebugType that represents the first `System.Type` parameter of the type represented by this `ICorDebugType`.

## Syntax

```cpp
HRESULT GetFirstTypeParameter (
    [out] ICorDebugType   **value
);
```

## Parameters

 `value`
 [out] A pointer to the address of an `ICorDebugType` object that represents the first parameter.

## Remarks

 `GetFirstTypeParameter` can be called in cases where the additional information about the type involves, at most, one type parameter. In particular, it can be used if the type is an ELEMENT_TYPE_ARRAY, ELEMENT_TYPE_SZARRAY, ELEMENT_TYPE_BYREF, or ELEMENT_TYPE_PTR, as indicated by the ICorDebugType::GetType method.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
