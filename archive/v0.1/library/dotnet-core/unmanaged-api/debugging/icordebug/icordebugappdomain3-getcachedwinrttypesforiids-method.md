---
title: "ICorDebugAppDomain3::GetCachedWinRTTypesForIIDs Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain3-getcachedwinrttypesforiids-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain3::GetCachedWinRTTypesForIIDs Method

Gets an enumerator for cached Windows Runtime types in an application domain based on their interface identifiers.

## Syntax

```cpp
HRESULT GetCachedWinRTTypesForIIDs (
    [in]  ULONG32            cReqTypes,
    [in]  GUID                *iidsToResolve,
    [out] ICorDebugTypeEnum   **ppTypesEnum
);
```

## Parameters

 `cReqTypes`
 [in] The number of required types.

 `iidsToResolve`
 [in] A pointer to an array that contains the interface identifiers corresponding to the managed representations of the Windows Runtime types to be retrieved.

 `ppTypesEnum`
 [out] A pointer to the address of an "ICorDebugTypeEnum" interface object that allows enumeration of the cached managed representations of the Windows Runtime types retrieved, based on the interface identifiers in `iidsToResolve`.

## Remarks

If the method fails to retrieve information for a specific interface identifier, the corresponding entry in the "ICorDebugTypeEnum" collection will have a type of `ELEMENT_TYPE_END` for errors due to data retrieval issues, or `ELEMENT_TYPE_VOID` for unknown interface identifiers.

## Requirements

 **Platforms:** Windows Runtime

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugAppDomain3 Interface
