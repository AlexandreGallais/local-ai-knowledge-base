---
title: "ICorDebugAppDomain::GetObject Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain-getobject-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain::GetObject Method

Gets an interface pointer to the common language runtime (CLR) application domain.

## Syntax

```cpp
HRESULT GetObject (
    [out] ICorDebugValue   **ppObject
);
```

## Parameters

 `ppObject`
 [out] A pointer to the address of an ICorDebugValue interface object that represents the CLR application domain.

## Return Value

If a managed `System.AppDomain` object hasn't been constructed for this application domain, the method returns `S_FALSE` and places `NULL` in `*ppObject`.

## Remarks

Each application domain in a process may have a managed `System.AppDomain` object in the runtime that represents it. This function gets an ICorDebugValue interface object that corresponds to this managed `System.AppDomain` object.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
