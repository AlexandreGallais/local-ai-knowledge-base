---
title: "ICorDebugComObjectValue::GetCachedInterfaceTypes Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugcomobjectvalue-getcachedinterfacetypes-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugComObjectValue::GetCachedInterfaceTypes Method

Provides an enumerator for the interface types that the current object has been cast to or used as.

## Syntax

```cpp
HRESULT GetCachedInterfaceTypes(
    [in] BOOL bIInspectableOnly,
    [out] ICorDebugTypeEnum **ppInterfacesEnum);
```

## Parameters

 `bIInspectableOnly`
 [in] A value that indicates whether the method returns only Windows Runtime interfaces (`IInspectable` interfaces) or all COM interfaces cached by the runtime callable wrapper (RCW).

 `ppInterfacesEnum`
 [out] A pointer to the address of an ICorDebugTypeEnum enumerator that provides access to ICorDebugType objects that represent cached interface types filtered according to `bIInspectableOnly`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugComObjectValue Interface
